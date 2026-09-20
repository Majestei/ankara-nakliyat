"""Read-only Phase 2 content inventory, template evidence and similarity graph.

Only writes ignored audit files. Source Markdown is used for the 600 raw records;
rendered crawl blocks are used for other pages. A missing GSC row is UNKNOWN.
Run again after a batch with --phase <new-crawl-phase> --output <new-folder>.
"""
import argparse
import csv
import hashlib
import json
import re
import unicodedata
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / '.agents/reports/recovery-2026-09-16'
DOC = ROOT / 'docs/seo/recovery/2026-09-16'
ORIGIN = 'https://ankaraozdemirnakliyat.com'


def norm(text):
    text = unicodedata.normalize('NFKD', text.lower().replace('ı', 'i'))
    return ' '.join(re.findall(r'[a-z0-9]+', ''.join(c for c in text if not unicodedata.combining(c))))


def key(url):
    return ORIGIN + (unquote(urlsplit(url).path).rstrip('/') or '/')


def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))


def csvwrite(path, rows, fields=None):
    with path.open('w', encoding='utf-8-sig', newline='') as stream:
        writer = csv.DictWriter(stream, fieldnames=fields or list(rows[0]), extrasaction='ignore')
        writer.writeheader()
        writer.writerows(rows)


# Each signature uses all four subject-bearing H3 sections, never the padded H2.
TEMPLATES = {
    'T01': ('home_move', ['bolgesinde tasinma oncesi lojistik planlama', 'kat yuksekligi ve dis cephe asansoru gereksinimleri', 'adim adim guvenli yukleme ve sabitleme asamalari', 'yeni adreste anahtar teslim montaj ve yerlesim']),
    'T02': ('pricing', ['nakliyat fiyatini belirleyen 4 temel kriter', 'teklif veren ve tasimayi yapan firmayi netlestirme', 'butcenizi koruyacak pratik tasinma tasarruflari', 'yazili teklifte hangi bilgiler bulunmali']),
    'T03': ('packing', ['profesyonel ambalaj malzemesi seciminin onemi', 'kirilacak mutfak ve cam esyalarin zirhlanmasi', 'mobilya demontaji ve kose koruma sistemleri', 'beyaz esyalarin ozel muhafazasi ve tesisat baglantisi']),
    'T04': ('lift', ['mimarisinde dis cephe asansorunun rolu', 'moduler ve teleskopik asansor kurulum kriterleri', 'yukleme ve esya sabitleme onlemleri', 'cevre ve is guvenligi onlemleri']),
    'T05': ('office', ['kurumsal ofis tasimalarinda is kesintisini planlama', 'it altyapisi sunucu ve hassas elektronik guvenligi', 'numaralandirilmis arsiv ve klasor duzenleme sistemi', 'hafta sonu ve mesai disi lojistik yonetimi']),
    'T06': ('storage', ['ne zaman esya depolama hizmetine ihtiyac duyulur', 'nem rutubet ve sicaklik kontrollu depolama alanlari', 'erisim guvenlik ve teslim kosullari', 'depolama oncesi ozel koruyucu ambalajlama']),
    'T07': ('intercity', ['ankara cikisli guzergah ve teslimat plani', 'uzun yol iklim ve yol kosullarina karsi zirhlama', 'komple ve parsiyel parca esya tasima secenekleri', 'sevkiyat bilgilendirmesi ve teslimat']),
    'T08': ('insurance_contract', ['firma bilgileri ve hizmet kapsamini inceleme', 'nakliyat emtia sigortasi ile trafik sigortasi arasindaki fark', 'tasima sozlesmesinde mutlaka bulunmasi gereken maddeler', 'teslim kontrolu ve hasar bildirimi']),
}
PATTERNS = {
    'office': r'ofis|buro|is yeri|kurumsal|arsiv|sunucu|departman',
    'storage': r'depola|depo alan|depo kosul|depo guven',
    'lift': r'asansor|teleskopik|dis cephe|sepetli',
    'partload': r'parca esya|tek esya|parsiyel|az esya',
    'intercity': r'sehirler arasi|sehirlerarasi|sehir disi|uzun yol|sehirlerarasi',
    'insurance_contract': r'sigorta|police|hasar|tazmin|sozlesme',
    'packing': r'paketle|ambalaj|koli|cam esya|kirilacak|beyaz esya|buzdolabi',
    'pricing': r'fiyat|ucret|butce|maliyet|teklif|ne kadar',
    'home_move': r'evden eve|ev tasima|ev tasin|nakliyat|nakliye|tasima|tasinma',
}


def intent(text):
    n = norm(text)
    subjects = [topic for topic, pattern in PATTERNS.items() if re.search(pattern, n)]
    # Separate the requested service from its price/provider/guide modifier.
    service = next((s for s in subjects if s not in ('pricing', 'home_move')), 'home_move' if 'home_move' in subjects else 'other')
    modifier = 'price' if re.search(r'fiyat|ucret|maliyet|ne kadar', n) else 'provider_selection' if re.search(r'firma|sirket|en iyi|tavsiye|yorum', n) else 'informational' if re.search(r'nasil|rehber|ipuc|hazirlik|dikkat|sirlar|korursunuz|avantaj|tasinmadan', n) else 'commercial_or_unspecified'
    return {'service': service, 'modifier': modifier, 'topics': subjects}


def dominant(text):
    n = norm(text)
    scores = {topic: len(re.findall(pattern, n)) for topic, pattern in PATTERNS.items() if topic != 'home_move'}
    highest = max(scores.values(), default=0)
    return max(scores, key=scores.get) if highest >= 2 else intent(text)['service']


def template(content):
    headings = re.findall(r'^###\s+(.+)$', content, flags=re.M)
    normalized = [norm(h) for h in headings]
    matches = [(tid, sum(any(anchor in h for h in normalized) for anchor in anchors)) for tid, (_, anchors) in TEMPLATES.items()]
    tid, count = max(matches, key=lambda pair: pair[1])
    return (tid if count == 4 else 'CUSTOM_OR_UNCLASSIFIED'), headings


def title_body_match(title_info, tid, body_intent):
    service, modifier = title_info['service'], title_info['modifier']
    if tid == 'CUSTOM_OR_UNCLASSIFIED':
        return 'REVIEW', 'No complete four-section legacy template match; editorial reading required.'
    if service == body_intent or (service == 'home_move' and body_intent == 'home_move'):
        if modifier == 'price' and body_intent != 'pricing':
            return 'PARTIAL_COVERAGE', 'Service topic matches; no dedicated price-factor/quote-comparison section in this template.'
        return 'TOPIC_ALIGNED_TEMPLATE', 'Four section subjects support the title topic; this does not establish unique value or full intent satisfaction.'
    if service == 'home_move' and body_intent in ('packing', 'pricing', 'insurance_contract', 'lift', 'intercity'):
        return 'PARTIAL_COVERAGE', 'General moving title, but all four sections focus on one supporting subtopic.'
    if body_intent == 'pricing':
        return 'PARTIAL_COVERAGE', 'The body covers generic moving costs; service-specific requirements need editorial review before calling this a direct topic contradiction.'
    if service == 'partload' and body_intent == 'intercity':
        return 'PARTIAL_COVERAGE', 'One section covers part-load options; three sections focus on intercity transport.'
    if service == 'other':
        return 'REVIEW', 'Title subject not resolved by the conservative service vocabulary.'
    return 'CLEAR_MISMATCH', f'Title requests {service}; all four principal body sections form the {body_intent} template.'


def run(args):
    out = DOC / args.output
    evidence = BASE / args.output
    out.mkdir(parents=True, exist_ok=True)
    evidence.mkdir(parents=True, exist_ok=True)
    crawl_path, gsc_path = BASE / args.phase / 'crawl.json', BASE / 'release-benchmark/gsc.json'
    crawl, gsc = read(crawl_path), read(gsc_path)
    live = {key(r['url']): r for r in crawl if r['indexable']}
    source = {}
    for filename, prefix in [('blogDataGen.json', 'blog'), ('makalelerData.json', 'makaleler')]:
        for record in read(ROOT / 'src/data' / filename):
            source[ORIGIN + '/' + prefix + '/' + record['slug']] = dict(record, source_file=filename, type=prefix)
    if args.reviewed:
        aggregate = (ROOT / 'src/data/editorialOverrides.ts').read_text(encoding='utf-8')
        files = re.findall(r"import\s+\w+\s+from\s+'\./([^']+\.json)'", aggregate)
        for filename in [ROOT / 'src/data' / name for name in files]:
            for revision in read(filename):
                u = ORIGIN + '/' + revision['type'] + '/' + revision['slug']
                if u not in source:
                    raise ValueError('Override must refer to an existing source: ' + u)
                source[u].update(content=revision['content'], excerpt=revision['excerpt'], source_file=filename.name)

    metrics, queries, query_owners = {}, {}, {}
    frozen = set()
    freeze_reasons = defaultdict(set)
    for name, period in gsc['periods'].items():
        byurl, byquery, bypagequery = {}, defaultdict(dict), defaultdict(dict)
        for r in period['datasets']['page']['rows']:
            u = key(r['keys'][0])
            item = byurl.setdefault(u, {'clicks': 0, 'impressions': 0, 'weighted': 0})
            item['clicks'] += r['clicks']
            item['impressions'] += r['impressions']
            item['weighted'] += r['impressions'] * r['position']
        for u, item in byurl.items():
            item['position'] = item['weighted'] / item['impressions'] if item['impressions'] else None
            if item['clicks'] > 0 or item['impressions'] >= 100:
                frozen.add(u)
                freeze_reasons[u].add(name + ': clicks>0 or impressions>=100')
        for r in period['datasets']['page-query']['rows']:
            u, q = key(r['keys'][0]), r['keys'][1]
            item = bypagequery[u].setdefault(q, {'query': q, 'url': u, 'clicks': 0, 'impressions': 0, 'weighted': 0})
            item['clicks'] += r['clicks']
            item['impressions'] += r['impressions']
            item['weighted'] += r['impressions'] * r['position']
            # Each returned raw row gets protection; aggregation must not hide top-10.
            if r['impressions'] > 0 and r['position'] <= 10:
                frozen.add(u)
                freeze_reasons[u].add(name + ': positive-impression top10 query')
        for u, vals in bypagequery.items():
            for q, item in vals.items():
                item['position'] = item['weighted'] / item['impressions'] if item['impressions'] else None
                byquery[q][u] = item
        query_owners[name] = {q: sorted(vals.values(), key=lambda r: (-r['clicks'], -r['impressions'], r['url']))[0]['url'] for q, vals in byquery.items()}
        metrics[name], queries[name] = byurl, bypagequery
    existing = read(DOC / 'winner-regression-handoff-candidate.json')
    for row in existing['checks']:
        frozen.add(key(row['url']))
        freeze_reasons[key(row['url'])].add('Existing 215-page handoff freeze')

    inbound = defaultdict(set)
    for row in crawl:
        if row['status'] == 200:
            for target in row['links']:
                inbound[key(target)].add(key(row['url']))

    similarity_path = DOC / args.phase / 'similarity-pairs.csv'
    if not similarity_path.exists():
        similarity_path = DOC / 'handoff-candidate/similarity-pairs.csv'
    parent = {u: u for u in live}
    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]
            u = parent[u]
        return u
    edge_rows = []
    nearest = defaultdict(float)
    with similarity_path.open(encoding='utf-8-sig') as stream:
        for pair in csv.DictReader(stream):
            a, b, score = key(pair['url_a']), key(pair['url_b']), float(pair['editorial_similarity'])
            if a not in live or b not in live:
                continue
            nearest[a], nearest[b] = max(nearest[a], score), max(nearest[b], score)
            if score >= .7:
                parent[find(a)] = find(b)
                edge_rows.append((a, b, score))
    components = defaultdict(list)
    for u in live:
        components[find(u)].append(u)
    components = sorted((sorted(v) for v in components.values()), key=lambda v: (-len(v), v[0]))
    cluster_by = {u: f'SC{i:03d}' for i, members in enumerate(components, 1) for u in members}

    # Existing family labels are candidates only; the root's review owns final decisions.
    query_family = {}
    family_path = DOC / 'query-family-ownership.csv'
    with family_path.open(encoding='utf-8-sig') as stream:
        for row in csv.DictReader(stream):
            for q in row['QUERIES'].split(' | '):
                query_family[q] = row['FAMILY']

    raw_inventory, inventory = [], []
    for u, record in source.items():
        tid, headings = template(record['content'])
        title_info = intent(record['title'])
        body = TEMPLATES[tid][0] if tid in TEMPLATES else dominant(record['content'])
        match, reason = title_body_match(title_info, tid, body)
        first = ' '.join(re.sub(r'[#*>`]', '', record['content']).split()[:200])
        raw_inventory.append({'URL': u, 'TYPE': record['type'], 'PUBLISHED': u in live, 'SOURCE FILE': record['source_file'], 'TEMPLATE': tid, 'TITLE': record['title'], 'TITLE INTENT': title_info['service'] + ' / ' + title_info['modifier'], 'BODY INTENT': body, 'TITLE/BODY MATCH': match, 'REASON': reason, 'SECTION HEADINGS': ' | '.join(headings), 'FIRST 200 WORDS': first, 'BODY SHA256': hashlib.sha256(record['content'].encode()).hexdigest()})
    raw_by = {r['URL']: r for r in raw_inventory}

    for u, row in sorted(live.items()):
        record, info = source.get(u), raw_by.get(u)
        title_info, h1_info = intent(row['title'].split(' | ')[0]), intent(' '.join(row['h1']))
        if info:
            body_intent, match, reason, tid = info['BODY INTENT'], info['TITLE/BODY MATCH'], info['REASON'], info['TEMPLATE']
            first = info['FIRST 200 WORDS']
        else:
            # Only main/editorial crawl blocks; never nav or footer text.
            first = ' '.join(' '.join(row['blocks']).split()[:200])
            # Hubs repeat service cards/FAQ labels: term counts would incorrectly
            # label almost every location page as pricing. Preserve broad purpose.
            body_intent = ('local_move_planning_and_service_directory' if row['type'] in ('city', 'district_ankara', 'local_child_ankara') else
                           'guide_directory' if row['type'] in ('blog_listing', 'makaleler_listing') else
                           title_info['service'] + '_service_planning' if row['type'] in ('home', 'service') else
                           'MIXED_PAGE_COMPONENT_REQUIRES_READING')
            tid = 'PAGE_COMPONENT:' + row['type']
            match, reason = 'REVIEW', 'Rendered page component; service-keyword counts are descriptive evidence, not a mismatch verdict.'
        current = sorted(queries['current28'].get(u, {}).values(), key=lambda r: (-r['clicks'], -r['impressions'], r['query']))
        historical = sorted(queries['history'].get(u, {}).values(), key=lambda r: (-r['clicks'], -r['impressions'], r['query']))
        top = current or historical
        q = top[0]['query'] if top else ''
        hist, m28, m90 = metrics['history'].get(u), metrics['current28'].get(u), metrics['days90'].get(u)
        protected = u in frozen
        observed_low = bool(hist and hist['clicks'] == 0 and hist['impressions'] < 100 and not protected)
        demand = bool(m28 and (m28['clicks'] > 0 or m28['impressions'] >= 20) or m90 and (m90['clicks'] > 0 or m90['impressions'] >= 50))
        path = urlsplit(u).path
        core = path in ('/', '/evden-eve-nakliyat', '/hizmetler') or row['type'] == 'service'
        priority = 'P0' if core else 'P1' if protected or demand else 'P2' if hist else 'P3'
        if protected:
            action = 'PRESERVE_URL_IMPROVE_INTENT' if match in ('CLEAR_MISMATCH', 'PARTIAL_COVERAGE') else 'PRESERVE_URL_REVIEW_CONTENT'
        elif observed_low and nearest[u] >= .7:
            action = 'REVIEW_SEMANTIC_CONSOLIDATION'
        elif match == 'CLEAR_MISMATCH' and demand:
            action = 'IMPROVE_INTENT'
        else:
            action = 'REVIEW_DEMAND_AND_UNIQUE_INTENT'
        metric = lambda m, field: round(m[field], 5) if m and isinstance(m.get(field), float) else m[field] if m and field in m else 'NO_RETURNED_ROW'
        item = {'URL': u, 'TYPE': row['type'], 'CLICKS 28D': metric(m28, 'clicks'), 'CLICKS 90D': metric(m90, 'clicks'), 'IMPRESSIONS 28D': metric(m28, 'impressions'), 'IMPRESSIONS 90D': metric(m90, 'impressions'), 'AVG POSITION': metric(m28, 'position'), 'TOP QUERIES': ' | '.join(f"{x['query']} [clicks={x['clicks']}, imp={x['impressions']}, pos={x['position']:.2f}]" for x in top[:5]), 'TOP QUERY PERIOD': 'current28' if current else 'history' if historical else 'UNKNOWN', 'QUERY FAMILY': query_family.get(q, 'UNMAPPED / REVIEW'), 'CURRENT OWNER': query_owners['current28'].get(q, query_owners['history'].get(q, 'UNKNOWN')), 'BODY INTENT': body_intent, 'TITLE INTENT': title_info['service'] + ' / ' + title_info['modifier'], 'TITLE/BODY MATCH': match, 'SIMILARITY CLUSTER': cluster_by[u], 'INTERNAL LINKS IN': len(inbound[u]), 'ACTION': action, 'PRIORITY': priority, 'WINNER FREEZE': protected, 'WINNER REASONS': ' | '.join(sorted(freeze_reasons[u])), 'HISTORICAL CLICKS': metric(hist, 'clicks'), 'HISTORICAL IMPRESSIONS': metric(hist, 'impressions'), 'OBSERVED LOW VALUE': observed_low, 'DEMAND DATA STATUS': 'RETURNED_PAGE_ROW' if hist else 'UNKNOWN_NO_RETURNED_PAGE_ROW', 'BACKLINK/HISTORY EXTERNAL': 'UNKNOWN_NO_BACKLINK_EXPORT', 'TEMPLATE': tid, 'NEAREST EDITORIAL SIMILARITY': nearest[u], 'TITLE': row['title'], 'H1': ' | '.join(row['h1']), 'H1 INTENT': h1_info['service'] + ' / ' + h1_info['modifier'], 'FIRST 200 WORD INTENT': dominant(first), 'FIRST 200 WORDS': first, 'GSC TOP QUERY': q or 'UNKNOWN', 'MISMATCH REASON': reason, 'BODY EVIDENCE': info['SECTION HEADINGS'] if info else ' | '.join(row['blocks'][:12])}
        inventory.append(item)
    byurl = {r['URL']: r for r in inventory}
    cluster_rows = []
    for i, members in enumerate(components, 1):
        items = [byurl[u] for u in members]
        templates = Counter(r['TEMPLATE'] for r in items)
        body_topics = Counter(r['BODY INTENT'] for r in items)
        cluster_rows.append({'CLUSTER ID': f'SC{i:03d}', 'TEMPLATE': json.dumps(templates, ensure_ascii=False), 'URL COUNT': len(members), 'MAIN INTENT': json.dumps(body_topics, ensure_ascii=False), 'GSC VALUE': json.dumps({'returned_current28_clicks': sum(metrics['current28'].get(u, {}).get('clicks', 0) for u in members), 'returned_current28_impressions': sum(metrics['current28'].get(u, {}).get('impressions', 0) for u in members), 'returned_history_clicks': sum(metrics['history'].get(u, {}).get('clicks', 0) for u in members)}, ensure_ascii=False), 'WINNERS': sum(r['WINNER FREEZE'] for r in items), 'LOSERS': 'NOT_ESTABLISHED', 'OBSERVED LOW VALUE CANDIDATES': sum(r['OBSERVED LOW VALUE'] for r in items), 'UNKNOWN HISTORY ROWS': sum(r['DEMAND DATA STATUS'].startswith('UNKNOWN') for r in items), 'HIGH SIMILARITY EDGES': sum(a in members and b in members for a, b, _ in edge_rows), 'TOPIC MIXED': len(body_topics) > 1, 'DECISION': 'Graph component is not an equivalence class. Review semantic targets within each topic; freeze winners; missing rows remain unknown.' if len(body_topics) > 1 else 'Review shared sections and distinct user need; no automatic redirect approval.', 'URLS': ' | '.join(members)})
    template_rows = []
    for tid, (topic, anchors) in TEMPLATES.items():
        members = [r for r in raw_inventory if r['TEMPLATE'] == tid]
        published = [r for r in members if r['PUBLISHED']]
        titletypes = Counter(r['TITLE INTENT'] for r in members)
        repetitions = Counter(section for r in members for section in r['SECTION HEADINGS'].split(' | '))
        template_rows.append({'TEMPLATE': tid, 'BODY INTENT': topic, 'RAW URL COUNT': len(members), 'PUBLISHED URL COUNT': len(published), 'BLOG COUNT': sum(r['TYPE'] == 'blog' for r in members), 'ARTICLE COUNT': sum(r['TYPE'] == 'makaleler' for r in members), 'TITLE TYPES': json.dumps(titletypes, ensure_ascii=False), 'CLEAR MISMATCH RAW': sum(r['TITLE/BODY MATCH'] == 'CLEAR_MISMATCH' for r in members), 'CLEAR MISMATCH PUBLISHED': sum(r['TITLE/BODY MATCH'] == 'CLEAR_MISMATCH' for r in published), 'REPEATED SECTION EVIDENCE': json.dumps(repetitions, ensure_ascii=False), 'URLS': ' | '.join(r['URL'] for r in members)})

    csvwrite(out / 'url-inventory.csv', inventory)
    csvwrite(out / 'raw-600-template-membership.csv', raw_inventory)
    csvwrite(out / 'similarity-clusters.csv', cluster_rows)
    csvwrite(out / 'content-templates.csv', template_rows)
    csvwrite(out / 'winner-freeze.csv', [r for r in inventory if r['WINNER FREEZE']])
    csvwrite(out / 'p0-p1-intent-review.csv', [r for r in inventory if r['PRIORITY'] in ('P0', 'P1')])
    mismatches = [r for r in inventory if r['TITLE/BODY MATCH'] == 'CLEAR_MISMATCH']
    csvwrite(out / 'clear-mismatches.csv', mismatches, list(inventory[0]))
    candidate = sorted([r for r in mismatches if r['PRIORITY'] in ('P0', 'P1')], key=lambda r: (-metrics['current28'].get(r['URL'], {}).get('impressions', 0), -metrics['history'].get(r['URL'], {}).get('clicks', 0), r['URL']))
    first_batch = [r for r in candidate if r['WINNER FREEZE']][:11]
    restored_office = byurl.get(ORIGIN + '/makaleler/cankaya-ofis-tasima-firmalari')
    if restored_office and restored_office['WINNER FREEZE'] and restored_office not in first_batch:
        first_batch.append(restored_office)
    csvwrite(out / 'next-small-batch-candidates.csv', first_batch, list(inventory[0]))
    summary = {'generated_at': datetime.now(timezone.utc).isoformat(), 'crawl_phase': args.phase, 'gsc_generated_at': gsc['generatedAt'], 'indexable': len(inventory), 'raw_records': len(raw_inventory), 'templates_detected': sum(bool(r['RAW URL COUNT']) for r in template_rows), 'raw_unclassified': sum(r['TEMPLATE'] == 'CUSTOM_OR_UNCLASSIFIED' for r in raw_inventory), 'similarity_high_pairs': len(edge_rows), 'similarity_components_including_singletons': len(components), 'similarity_non_singleton_components': sum(len(m) > 1 for m in components), 'similarity_singleton_urls': sum(len(m) == 1 for m in components), 'preserved_winner_count_all_exported_periods': sum(r['WINNER FREEZE'] for r in inventory), 'existing_freeze_count': len(existing['checks']), 'priority_counts': dict(Counter(r['PRIORITY'] for r in inventory)), 'title_body_status_counts': dict(Counter(r['TITLE/BODY MATCH'] for r in inventory)), 'p0_p1_title_body_status_counts': dict(Counter(r['TITLE/BODY MATCH'] for r in inventory if r['PRIORITY'] in ('P0', 'P1'))), 'p1_clear_mismatch_by_type': dict(Counter(r['TYPE'] for r in candidate)), 'observed_low_value_candidates': sum(r['OBSERVED LOW VALUE'] for r in inventory), 'unknown_historical_page_rows': sum(r['DEMAND DATA STATUS'].startswith('UNKNOWN') for r in inventory), 'source_files': {'crawl': str(crawl_path), 'gsc': str(gsc_path), 'similarity': str(similarity_path)}, 'limitations': ['NO_RETURNED_ROW is unknown, not zero demand. Observed-low-value only denotes returned history clicks=0, aggregate impressions<100 and no protected period.', 'Protection uses all five period datasets, every positive-impression raw top10 page-query row, slash-normalized clicks/impressions, and the existing 215-page freeze. No source URL is removed by this analysis.', 'Template topic alignment is not unique value. CLEAR_MISMATCH requires a specific title service versus four different-topic template sections; partial coverage and unclassified templates require reading.', 'TITLE, H1, first200 and body are separate evidence fields. First200 intent is lexical screening only and cannot establish mismatch.', 'Similarity connected components can bridge unrelated templates through repeated scaffolding. Components must not be treated as redirect-equivalent groups.', 'Query family labels are inherited unreviewed candidates. Current owner is the leading observed exact query URL, not a proven exclusive semantic owner.', 'Only saved read-only GSC data, source Markdown and captured production HTML are used; no new backlink facts, user research or local facts are invented.']}
    (out / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf8')
    (evidence / 'analysis-provenance.json').write_text(json.dumps({'summary': summary, 'source_hashes': {str(p): hashlib.sha256(p.read_bytes()).hexdigest() for p in (crawl_path, gsc_path, similarity_path, ROOT / 'src/data/blogDataGen.json', ROOT / 'src/data/makalelerData.json')}}, ensure_ascii=False, indent=2), encoding='utf8')
    (evidence / 'inventory.json').write_text(json.dumps(inventory, ensure_ascii=False, indent=2), encoding='utf8')
    print(json.dumps({k: v for k, v in summary.items() if k not in ('limitations', 'source_files')}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--phase', default='phase2-live-baseline')
    parser.add_argument('--output', default='phase2-content')
    parser.add_argument('--reviewed', action='store_true', help='Use published manual revisions, preserving baseline raw-template analysis by default')
    run(parser.parse_args())
