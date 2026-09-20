"""Read-only Phase 2 query evidence review; never changes routing or page content.

Keeps the original 282 overlaps and 171 candidate families auditable. Historical
query rows are attributed both to their requested path and today's live canonical
destination; that attribution is not a claim that redirects existed historically.
"""
import csv
import json
import re
import unicodedata
from collections import Counter, defaultdict
from datetime import date, timedelta
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent
BASE = ROOT / '.agents/reports/recovery-2026-09-16'
DOC = ROOT / 'docs/seo/recovery/2026-09-16'
OUT = DOC / 'phase2-query'
ORIGIN = 'https://ankaraozdemirnakliyat.com'
HOME = ORIGIN + '/'


def read(path):
    return json.loads(path.read_text(encoding='utf8'))


def csvread(path):
    return list(csv.DictReader(path.open(encoding='utf-8-sig')))


def writecsv(name, rows):
    if not rows:
        (OUT / name).write_text('NO_RETURNED_ROWS\n', encoding='utf-8-sig')
        return
    with (OUT / name).open('w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0]))
        writer.writeheader()
        writer.writerows(rows)


def norm(value):
    value = unicodedata.normalize('NFKD', value.lower().replace('ı', 'i'))
    return ' '.join(re.findall('[a-z0-9]+', ''.join(c for c in value if not unicodedata.combining(c))))


def urlkey(value):
    return ORIGIN + (urlsplit(value).path.rstrip('/') or '/')


def empty():
    return {'clicks': 0, 'impressions': 0, 'weighted': 0}


def add(target, row):
    target['clicks'] += row['clicks']
    target['impressions'] += row['impressions']
    target['weighted'] += row['position'] * row['impressions']


def metric(item):
    imp = item['impressions']
    return {'clicks': item['clicks'], 'impressions': imp,
            'position': round(item['weighted'] / imp, 4) if imp else None,
            'ctr': round(item['clicks'] / imp, 6) if imp else None}


def total(items):
    result = empty()
    for item in items:
        for key in result:
            result[key] += item[key]
    return metric(result)


OUT.mkdir(parents=True, exist_ok=True)
gsc = read(BASE / 'release-benchmark/gsc.json')
live = read(BASE / 'phase2-live-baseline/crawl.json')
by = {r['url']: r for r in live}
indexable = {urlkey(r['url']): r for r in live if r['indexable']}


def canonical(url):
    current = urlkey(url)
    seen = set()
    while current not in seen:
        seen.add(current)
        row = by.get(current, {})
        if row.get('location'):
            current = urlkey(row['location'])
        elif row.get('indexable') and row.get('canonical'):
            return urlkey(row['canonical'])
        else:
            break
    return current


# Location vocabulary comes only from existing route segments, never generic
# siteData name fields (the old candidate grouper mistook services for places).
service_slugs = {'evden-eve-nakliyat', 'nakliyat-fiyatlari', 'ofis-tasima', 'parca-esya-tasima',
                 'sehirler-arasi-nakliyat', 'asansorlu-tasima', 'depolama'}
place_routes = defaultdict(list)
for u in indexable:
    parts = urlsplit(u).path.strip('/').split('/')
    if parts[0] == 'islemler' and len(parts) >= 2 and parts[-1] not in service_slugs:
        place_routes[norm(parts[-1])].append(u)
places = sorted(set(place_routes) | {'ankara'}, key=len, reverse=True)
SERVICE = {'asansor': '/hizmetler/asansorlu-tasima', 'ofis': '/hizmetler/ofis-tasima',
           'depolama': '/hizmetler/depolama', 'parca': '/hizmetler/parca-esya-tasima',
           'sigorta': '/hizmetler/nakliyat-sigortasi', 'paketleme': '/hizmetler/paketleme',
           'sehirler_arasi': '/hizmetler/sehirler-arasi-nakliyat',
           'sehir_ici': '/hizmetler/sehir-ici-nakliyat', 'uluslararasi': '/hizmetler/uluslararasi-tasimacilik'}
patterns = [('uluslararasi', r'uluslararasi|yurtdisi|international|overseas'),
            ('sigorta', r'sigorta'), ('ofis', r'ofis|buro|is yeri|isyeri'),
            ('depolama', r'depo'), ('asansor', r'asansor|liftli'),
            ('parca', r'parca|tek esya|kamyonet|az esya|kucuk nakli|ceyiz'),
            ('paketleme', r'paket|ambalaj'), ('sehirler_arasi', r'sehirler arasi|sehirlerarasi|sehir disi'),
            ('sehir_ici', r'sehir ici|sehirici|ankara ici'),
            ('ev_tasima', r'evden eve|ev tasima|nakli|tasimaci')]


def intent(query):
    q = norm(query).replace('kahraman kazan', 'kahramankazan')
    found = [p for p in places if ' ' + p + ' ' in ' ' + q + ' ']
    place = next((p for p in found if p not in ('ankara', 'istanbul')), found[0] if found else 'unspecified')
    service = next((s for s, pattern in patterns if re.search(pattern, q)), 'other')
    purpose = 'price' if re.search(r'fiyat|ucret|maliyet|ne kadar|kac lira', q) else 'guide' if re.search(r'nasil|rehber|ipuc|hazirlik|dikkat', q) else 'provider_selection' if re.search(r'firma|sirket|tavsiye|yorum|en iyi', q) else 'commercial'
    if 'ozdemir' in q:
        return ('brand', 'ev_tasima', 'navigation')
    return place, service, purpose


def semantics(query):
    place, service, purpose = intent(query)
    if place == 'brand':
        return [HOME], 'Brand navigation; homepage remains owner'
    if purpose == 'guide':
        return [], 'Informational query needs a matching guide; do not assign a commercial landing by keywords alone'
    if place in ('ankara', 'unspecified'):
        target = HOME if service in ('ev_tasima', 'other') else ORIGIN + SERVICE.get(service, '')
        if purpose == 'price' and service in ('ev_tasima', 'other'):
            return [], 'No verified distinct Ankara-wide price route; do not invent an owner'
        return ([target] if target in indexable else []), 'Existing Ankara service scope; unspecified location remains ambiguous'
    roots = place_routes.get(place, [])
    if len(roots) != 1:
        return [], 'Place has zero or multiple existing routes; disambiguation required'
    base = roots[0]
    if service in ('ev_tasima', 'other', 'sehir_ici'):
        target = base + '/nakliyat-fiyatlari' if purpose == 'price' else base
    elif service == 'ofis':
        target = base + '/ofis-tasima'
    else:
        return [], 'No exact existing location/service landing route established; district hub and relevant service are supporting only'
    return ([target] if target in indexable else []), 'Exact existing location/service route' if target in indexable else 'Requested exact route does not exist; do not create a URL'


periods = {}
raw_periods = {}
for period in ['current28', 'previous28', 'days90', 'history']:
    groups = defaultdict(lambda: defaultdict(empty))
    raw = defaultdict(lambda: defaultdict(empty))
    for r in gsc['periods'][period]['datasets']['page-query']['rows']:
        u, q = r['keys']
        add(groups[q][canonical(u)], r)
        add(raw[q][urlkey(u)], r)
    periods[period] = groups
    raw_periods[period] = raw

end = date.fromisoformat(gsc['periods']['current28']['endDate'])
start = end - timedelta(days=55)
weekly = defaultdict(lambda: defaultdict(lambda: defaultdict(empty)))
detail_metadata = []
for file in sorted((BASE / 'release-benchmark').glob('gsc-detail-*.json')):
    data = read(file)
    detail_metadata.append({'file': file.name, 'rows': len(data['rows']), 'paginationComplete': data.get('paginationComplete'), 'dimensions': data['dimensions']})
    for r in data['rows']:
        d, q, u, device, country = r['keys']
        day = date.fromisoformat(d)
        if not start <= day <= end:
            continue
        week = (day - start).days // 7
        add(weekly[(q, 'ALL')][week][canonical(u)], r)
        if device == 'MOBILE' and country == 'tur':
            add(weekly[(q, 'MOBILE_TUR')][week][canonical(u)], r)


def trend(query, segment='ALL'):
    series = []
    for week in range(8):
        values = weekly[(query, segment)].get(week, {})
        summed = total(values.values())
        ranked = sorted(values, key=lambda u: (values[u]['impressions'], values[u]['clicks']), reverse=True)
        owner = ranked[0] if ranked else ''
        share = values[owner]['impressions'] / summed['impressions'] if owner else 0
        series.append({'week': week, 'start': (start + timedelta(days=7 * week)).isoformat(),
                       'end': (start + timedelta(days=7 * week + 6)).isoformat(), **summed,
                       'owner': owner, 'owner_share': round(share, 4), 'urls': len(values)})
    adequate = [s for s in series if s['impressions'] >= 20]
    switches = sum(a['owner'] != b['owner'] for a, b in zip(adequate, adequate[1:]))
    stable = len(adequate) >= 4 and switches == 0 and all(s['owner_share'] >= .8 for s in adequate)
    return series, adequate, switches, stable


def ranked(values):
    return sorted(values, key=lambda u: (values[u]['clicks'], values[u]['impressions']), reverse=True)


overlaps = [r for r in csvread(DOC / 'baseline/query-ownership.csv') if int(r['current_url_count']) > 1]
assert len(overlaps) == 282
query_rows, weekly_rows = [], []
for original in overlaps:
    q = original['query']
    current, previous = periods['current28'][q], periods['previous28'][q]
    raw = raw_periods['current28'][q]
    candidates = ranked(current)
    owner = candidates[0] if candidates else ''
    series, adequate, switches, stable = trend(q)
    mobile_series, mobile_adequate, mobile_switches, mobile_stable = trend(q, 'MOBILE_TUR')
    current_total, previous_total = total(current.values()), total(previous.values())
    performance_decline = bool(current_total['impressions'] >= 100 and previous_total['impressions'] >= 100 and
                               ((current_total['position'] or 0) - (previous_total['position'] or 0) >= 2) and
                               previous_total['clicks'] >= 5 and current_total['ctr'] < previous_total['ctr'] * .7)
    if current and len(raw) >= 2 and len(current) == 1:
        classification = 'BENIGN_OVERLAP'
        reason = 'Current live-canonical normalization collapses returned URLs to one destination; historical causality not inferred'
    elif stable and mobile_stable and adequate[0]['owner'] == mobile_adequate[0]['owner'] and not performance_decline:
        classification = 'BENIGN_OVERLAP'
        reason = 'One stable >=80% impression owner across >=4 adequate weeks, also in MOBILE/TUR; no qualifying combined decline'
    else:
        classification = 'INSUFFICIENT_DATA'
        reason = 'Overlap alone cannot establish harm; inadequate weekly evidence or changing owners require manual causal review'
    suspicious = len(adequate) >= 4 and switches >= 2 and mobile_switches >= 2 and performance_decline
    if suspicious:
        reason = 'Switching plus decline signal needs page-intent and causal validation; not automatically harmful cannibalization'
    semantic, semantic_reason = semantics(q)
    row = {'QUERY': q, 'CLASSIFICATION': classification, 'REASON': reason,
           'ORIGINAL URL COUNT': original['current_url_count'], 'CURRENT RAW URL COUNT': len(raw),
           'CURRENT CANONICAL URL COUNT': len(current), 'OBSERVED OWNER': owner,
           'OWNER LIVE STATUS': by.get(owner, {}).get('status', 'NO_RETURNED_ROW'),
           'CURRENT TOTAL': json.dumps(current_total), 'PREVIOUS TOTAL': json.dumps(previous_total),
           'CURRENT PAGE EVIDENCE': json.dumps({u: metric(v) for u, v in current.items()}, ensure_ascii=False),
           'ADEQUATE WEEKS (20+IMP)': len(adequate), 'WEEKLY OWNER SWITCHES': switches,
           'MOBILE TUR ADEQUATE WEEKS': len(mobile_adequate), 'MOBILE TUR OWNER SWITCHES': mobile_switches,
           'DECLINE SIGNAL': performance_decline, 'SUSPECTED HARM REQUIRES MANUAL PROOF': suspicious,
           'SEMANTIC CANDIDATE': ' | '.join(semantic), 'SEMANTIC LIMITATION': semantic_reason,
           'ACTION': 'Freeze homepage/winners; observe trend; no destructive action from overlap alone'}
    query_rows.append(row)
    for segment, items in [('ALL', series), ('MOBILE_TUR', mobile_series)]:
        for item in items:
            weekly_rows.append({'query': q, 'segment': segment, **item})
writecsv('282-query-classification.csv', query_rows)
writecsv('282-query-weekly-trends.csv', weekly_rows)

families = csvread(DOC / 'query-family-ownership.csv')
assert len(families) == 171
family_rows, membership = [], []
for row in families:
    qs = row['QUERIES'].split(' | ')
    values = defaultdict(empty)
    corrected = defaultdict(list)
    semantic_urls = set()
    for q in qs:
        signature = ' / '.join(intent(q))
        corrected[signature].append(q)
        sem, reason = semantics(q)
        semantic_urls.update(sem)
        current = periods['current28'][q]
        current_owner = ranked(current)[0] if current else ''
        membership.append({'ORIGINAL FAMILY': row['FAMILY'], 'QUERY': q, 'CORRECTED SUBFAMILY': signature,
                           'OBSERVED OWNER': current_owner, 'SEMANTIC CANDIDATE': ' | '.join(sem),
                           'LIMITATION': reason, 'CURRENT GSC': json.dumps(total(current.values()))})
        for u, value in current.items():
            for key in value:
                values[u][key] += value[key]
    order = ranked(values)
    observed = order[0] if order else ''
    mixed = len(corrected) > 1
    strong = bool(observed and (values[observed]['clicks'] > 0 or values[observed]['impressions'] >= 100 or
                               (values[observed]['impressions'] >= 5 and metric(values[observed])['position'] <= 10)))
    observed_valid = observed in indexable
    # No ownership transfer for sparse/unrelated observed winners. The semantic
    # alternative is a proposal, not evidence of current Google ownership.
    primary = observed if observed_valid else ''
    supporting, competing, unrelated = [], [], []
    for u in order:
        if u == primary or u not in indexable:
            continue
        if u in semantic_urls:
            supporting.append(u)
        else:
            page_signature = intent(indexable[u]['title'])
            if any(page_signature[:2] == intent(q)[:2] for q in qs):
                competing.append(u)
            else:
                unrelated.append(u)
    action = 'KEEP observed winner; validate content intent before any consolidation' if strong else 'INSUFFICIENT ownership evidence; improve exact semantic landing only after page review'
    if mixed:
        action = 'SPLIT ANALYTICAL FAMILY: mixed locations/services/intents; no single semantic owner assigned; preserve observed winners'
    if observed == HOME:
        action += '; HOMEPAGE FROZEN'
    family_rows.append({'FAMILY': row['FAMILY'], 'PRIMARY OWNER': primary, 'PRIMARY BASIS': 'Observed latest returned clicks then impressions; not a semantic endorsement',
                        'OBSERVED GSC OWNER': observed, 'OBSERVED OWNER STATUS': by.get(observed, {}).get('status', 'NO_RETURNED_ROW'),
                        'OBSERVED OWNER FROZEN': strong or observed == HOME, 'RECOMMENDED SEMANTIC OWNER': ' | '.join(sorted(semantic_urls)) if not mixed else '',
                        'SUPPORTING URLS': ' | '.join(supporting), 'COMPETING URLS (UNPROVEN HARM)': ' | '.join(competing),
                        'UNRELATED OR UNVERIFIED OBSERVED URLS': ' | '.join(unrelated),
                        'GSC EVIDENCE': json.dumps({u: metric(v) for u, v in values.items()}, ensure_ascii=False),
                        'CORRECTED SUBFAMILY COUNT': len(corrected), 'CORRECTED SUBFAMILIES': ' | '.join(sorted(corrected)),
                        'REVIEW STATUS': 'MIXED_ORIGINAL_GROUP' if mixed else 'RULE_REVIEW_EXISTING_LIVE_ROUTES', 'ACTION': action})
writecsv('171-family-ownership-review.csv', family_rows)
writecsv('family-query-membership.csv', membership)

opportunities = []
for q, urls in periods['current28'].items():
    for u, value in urls.items():
        m = metric(value)
        if m['impressions'] >= 100 and 3 <= m['position'] <= 12 and m['ctr'] < .01:
            opportunities.append({'QUERY': q, 'URL': u, **m, 'LIVE STATUS': by.get(u, {}).get('status'),
                                  'CURRENT TITLE': indexable.get(u, {}).get('title', ''),
                                  'FROZEN': True, 'ACTION': 'Content/snippet intent review only; no title/H1/canonical/slug edit authorized by this report'})
opportunities.sort(key=lambda r: r['impressions'], reverse=True)
writecsv('low-ctr-position-3-12.csv', opportunities)

# Explicit human-reviewed scope: eight user-named commercial queries and the
# current 25 Ankara district hubs. These notes do not claim deep body QA.
major = [
    ('ankara evden eve nakliyat', HOME, 'Keep homepage commercial owner; /evden-eve-nakliyat supports moving process, not ownership transfer'),
    ('ankara nakliyat', HOME, 'Broad city service query stays with homepage; sparse alternative service appearance is not harm'),
    ('ankara ev taşıma', HOME, 'Homepage remains primary; article listing is not an equivalent commercial landing'),
    ('ankara asansörlü nakliyat', ORIGIN + SERVICE['asansor'], 'Specific service landing covers setup, floors and access; keep homepage ranking; unrelated Ayaş article is not Ankara-wide owner'),
    ('ankara şehirler arası nakliyat', ORIGIN + SERVICE['sehirler_arasi'], 'Homepage winner stays frozen; service landing supports route, dates and quote scope'),
    ('ankara ofis taşıma', ORIGIN + SERVICE['ofis'], 'Service page fits office/equipment/archive intent; homepage has stronger position but fewer impressions; no ownership transfer by low-volume rank alone'),
    ('ankara parça eşya', ORIGIN + SERVICE['parca'], 'Exact query has no returned current row; parça eşya taşıma variants evaluated separately; no zero-demand claim'),
    ('ankara eşya depolama', ORIGIN + SERVICE['depolama'], 'Depolama service page is semantic fit, low-volume homepage observation is weak ownership evidence; verify storage availability before stronger claims'),
]
manual = []
for q, semantic, note in major:
    exact = periods['current28'][q]
    observed = ranked(exact)[0] if exact else ''
    manual.append({'QUERY': q, 'OBSERVED OWNER': observed, 'OBSERVED EVIDENCE': json.dumps({u: metric(v) for u, v in exact.items()}, ensure_ascii=False),
                   'SEMANTIC LANDING': semantic, 'LIVE STATUS': indexable.get(semantic, {}).get('status'),
                   'TITLE': indexable.get(semantic, {}).get('title'), 'REVIEW': note,
                   'PRIMARY OWNER DECISION': HOME if observed == HOME or semantic == HOME else observed or 'INSUFFICIENT_DATA',
                   'ACTION': 'Preserve live URLs and homepage; improve content and contextual support, no new redirect decision'})
writecsv('8-commercial-manual-review.csv', manual)
district_notes = {
    'akyurt': 'Business entry/loading-hour constraints; home and office separated', 'altindag': 'Door/vehicle distance and access photos; named neighborhoods support addresses',
    'ayas': 'Furniture dismantling and passage dimensions', 'bala': 'Full address/location and approach restrictions', 'beypazari': 'Door/stair dimensions and fragile items',
    'camlidere': 'Item list and keyholder/timing; storage only conditional', 'cankaya': 'Named address, floor and vehicle access; office child can support separate task',
    'cubuk': 'Large items, boxes and entry restrictions', 'elmadag': 'Route and delivery/building hours', 'etimesgut': 'Block/entry/floor and common-area rules; homepage exact query winner frozen',
    'evren': 'Two addresses, floors and route planning', 'golbasi': 'Site entrance and multi-floor inventory; Incek homepage query winner frozen',
    'gudul': 'Entrance and vehicle photos, building working hours', 'haymana': 'Address/loading limits and comparable quote scopes',
    'kahramankazan': 'Home/office/storage task separation and equipment inventory', 'kalecik': 'Full home versus item-level scope and quotes',
    'kecioren': 'Carry path and large-item dimensions', 'kizilcahamam': 'Delivery/access and conditional rescheduling',
    'mamak': 'Vehicle approach, slope/parking only if reported by address', 'nallihan': 'Volume, route and delivery scope',
    'polatli': 'Local/intercity distinction and flexible delivery dates', 'pursaklar': 'Elevator permission and building hours',
    'sereflikochisar': 'Item quantity, packing and no assumed guaranteed delivery time', 'sincan': 'Neighborhood address, schedule and home/office distinction',
    'yenimahalle': 'Site-to-building distance and office inventory',
}
district_rows = []
for u, page in sorted(indexable.items()):
    if page['type'] != 'district_ankara':
        continue
    slug = urlsplit(u).path.rsplit('/', 1)[-1]
    qs = [q for q in periods['current28'] if intent(q)[0] == norm(slug)]
    exact = defaultdict(empty)
    for q in qs:
        for owner, val in periods['current28'][q].items():
            for key in val:
                exact[owner][key] += val[key]
    owner = ranked(exact)[0] if exact else ''
    district_rows.append({'DISTRICT': slug, 'SEMANTIC DISTRICT OWNER': u, 'LIVE STATUS': page['status'],
                          'OBSERVED ALL-SERVICE DISTRICT OWNER': owner, 'GSC EVIDENCE': json.dumps({x: metric(v) for x, v in exact.items()}, ensure_ascii=False),
                          'MANUAL INTRO REVIEW': district_notes[slug], 'REVIEW SCOPE': 'Title, H1 and first ~75 words read; not full-body uniqueness proof',
                          'ACTION': 'Keep district hub; separate price/office child task; preserve homepage and all query winners; review duplicate article body before merge'})
writecsv('25-district-manual-review.csv', district_rows)

summary = {'current_period': {k: gsc['periods']['current28'][k] for k in ['startDate', 'endDate']},
           'weekly_start': start.isoformat(), 'weekly_end': end.isoformat(), 'detail_files': detail_metadata,
           'original_multi_url_queries': len(query_rows), 'classifications': dict(Counter(r['CLASSIFICATION'] for r in query_rows)),
           'suspected_harm_signals': sum(r['SUSPECTED HARM REQUIRES MANUAL PROOF'] for r in query_rows),
           'original_families': len(family_rows), 'mixed_original_families': sum(r['CORRECTED SUBFAMILY COUNT'] > 1 for r in family_rows),
           'corrected_subfamilies': len({r['CORRECTED SUBFAMILY'] for r in membership}),
           'queries_in_original_family_rows': len(membership), 'low_ctr_candidates': len(opportunities),
           'manual_commercial_reviews': len(manual), 'manual_district_intro_reviews': len(district_rows),
           'mutations': 'No content, title, H1, canonical, redirect, sitemap or hosting changes',
           'limitations': ['BENIGN means no qualifying harm signal in this review or canonical collapse; not a universal causal proof.',
                          'No HARMFUL label without intent evidence and comparable performance decline; insufficient data is retained.',
                          'Page-level impression sums are not property impressions; fine-grain anonymized rows can be omitted despite complete pagination.',
                          'Current canonical normalization does not rewrite history or prove historic redirect state.',
                          'Unrelated observed URLs are not recommended owners. Mixed original groups remain split analytically.',
                          'All semantic candidate URLs must be existing live indexable routes; title-based overlap candidates need body validation.']}
(OUT / 'summary.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2), encoding='utf8')
benign = '\n'.join('- `' + r['QUERY'] + '`' for r in query_rows if r['CLASSIFICATION'] == 'BENIGN_OVERLAP')
commercial = '\n'.join('| ' + r['QUERY'] + ' | ' + (r['OBSERVED OWNER'].replace(ORIGIN, '') or 'Veri yetersiz') + ' | ' + r['SEMANTIC LANDING'].replace(ORIGIN, '') + ' | ' + r['REVIEW'] + ' |' for r in manual)
report = f'''# Phase 2 sorgu ve sahiplik incelemesi

Orijinal **282 çoklu URL sorgusunun tamamı** sınıflandırıldı: **{summary['classifications'].get('BENIGN_OVERLAP', 0)} BENIGN_OVERLAP, {summary['classifications'].get('INSUFFICIENT_DATA', 0)} INSUFFICIENT_DATA, 0 kanıtlanmış HARMFUL_CANNIBALIZATION**. Bu sonuç 278 sorguda sorun olmadığı anlamına gelmez; zararı kanıtlayacak karşılaştırılabilir sinyal ve nedensellik yetersizdir. Bu rapor tek başına hiçbir URL'yi birleştirme gerekçesi değildir.

## Veri ve kurallar

- Son GSC snapshot: 19 Eylül 2026, current28 = 20 Ağustos–16 Eylül 2026. Karşılaştırma önceki eşit 28 gün.
- Haftalık inceleme: 23 Temmuz–16 Eylül arasında sekiz eşit 7 gün. Beş aylık date/query/page/device/country dosyası okundu; tümü paginationComplete=true. Satır gizlenmesi ve anonim sorgular yine mümkündür.
- Hem tüm cihaz/ülkeler hem MOBILE/TUR segmenti ayrı değerlendirilir. İkinci segment örneklem karışımından kaynaklanan sahte dönüşümleri azaltır; tüm karıştırıcı etkenleri ortadan kaldırmaz.
- Yeterli hafta eşiği 20 gösterimdir. BENIGN için aynı URL'nin en az dört yeterli hafta boyunca en az %80 gösterim payını koruması, iki segmentte de aynı owner olması ve birleşik düşüş sinyali bulunmaması gerekir. Tek bir gün/sıralama hareketi cannibalization değildir.
- Düşüş adayı: iki dönemde en az 100 gösterim, önceki dönemde en az 5 tıklama, ortalama konumda en az 2 basamak kötüleşme ve CTR'de en az %30 düşüş. Buna iki segmentte tekrarlanan owner değişimi eklense bile intent ve nedensellik manuel kanıtı gerekir. Bu veri setinde bu birleşik aday sayısı {summary['suspected_harm_signals']}.
- Güncel canlı 301/canonical hedefleriyle slash/host/alias varyantları normalize edilir. Bu, o yönlendirmelerin geçmişte var olduğunu iddia etmez. Ham URL adedi ve bugünkü canonical adedi ayrı sütunlardır.
- Sayfa+sorgu gösterimlerinin toplamı property gösterimi değildir. Veri gelmemesi sıfır talep veya sıfır geçmiş demek değildir.

Gözlenen istikrarlı owner nedeniyle BENIGN sınıfı verilen sorgular:

{benign}

## 171 eski query-family adayı

171 satırın tamamı `171-family-ownership-review.csv` içinde tutuldu. Gözlenen GSC owner ile önerilen semantik hedef ayrı sütunlardır. Owner sadece tıklama/gösterim sıralamasıdır; ilgili intentin doğru sahibi olduğuna tek başına kanıt değildir. Ana sayfa ve mevcut winner'lar dondurulmuştur. Öneriler yalnız canlı 200 ve indekslenebilir mevcut rotalardan seçilmiştir; çok anlamlı konum, eksik rota veya informational intent varsa semantik aday boş bırakılmıştır.

Eski grouper `siteData` içindeki bütün `name` değerlerini konum kabul ediyordu; bu yüzden `evden eve nakliyat` ve `ankara ozdemir nakliyat` gibi servis/marka değerleri konum olmuştu. Eski 171 satırın **{summary['mixed_original_families']} tanesi farklı yer/hizmet/intentleri karıştırıyor**. Bunlara tek bir sahibi zorlamak yanlış olur. 1.110 sorgu üyeliği ayrı incelenerek **{summary['corrected_subfamilies']} düzeltilmiş analiz alt ailesi** üretildi. Bunlar yeni URL veya içerik üretimi değildir. Eski family adları kanıt zinciri için korunmuştur.

SUPPORTING ve COMPETING sütunları ayrı tutulmuştur. Competing, aynı kapsamı hedefleyebilen mevcut URL adayıdır; kanıtlanmış zarar etiketi değildir. İlgisiz gözlenen URL'ler ayrıca listelenmiştir. Zayıf ya da farklı niyetli GSC owner, otomatik biçimde semantik owner yapılmamıştır. Düzeltilmiş eşleşmeler `family-query-membership.csv` dosyasındadır.

## Sekiz ticari sorgunun manuel kararı

| Sorgu | Gözlenen owner | Semantik hizmet sayfası | Karar |
|---|---|---|---|
{commercial}

Ana sayfanın mevcut güçlü sorgu sahipliği değiştirilmez. Özellikle asansör/şehirler arası/depolama için semantik hizmet sayfası, ana sayfayı yönlendirmek veya title/H1 intentini değiştirmek için gerekçe değildir. Parça eşya tam sorgusunun eksik satırı sıfır talep sayılmaz; varyasyonlar family üyeliklerinde bulunur.

25 Ankara ilçe hub'ının başlığı, H1'i ve ilk yaklaşık 75 kelimesi tek tek okundu. `25-district-manual-review.csv` her ilçe için somut giriş kapsamını ve gözlenen ilçe sorgusu owner'ını kaydeder. Bu, 25 sayfanın tüm gövdesinde özgünlük denetimi yapıldığı iddiası değildir. Etimesgut ve İncek ana sayfa kazananları korunur; ofis/fiyat alt görevleri ayrı mevcut sayfalarda desteklenebilir.

## CTR inceleme adayları

Current28 döneminde en az 100 gösterim, ortalama konum 3–12 ve CTR %1 altında olan **{len(opportunities)} sayfa+sorgu çifti** bulundu. `low-ctr-position-3-12.csv` ölçüm, mevcut title ve canlı durum içerir. %1 eşiği bir öncelik filtresidir, evrensel hedef veya tıklama artışı vaadi değildir. Title/H1/canonical/slug değiştirilmedi; ana sayfa ve winner freeze geçerlidir.

## Dosyalar

- `282-query-classification.csv`: her eski sorguya karar, gerekçe, dönemler, sayfa kanıtı, haftalık örneklem yeterliliği.
- `282-query-weekly-trends.csv`: 282 × 8 hafta × 2 segment = 4.512 satır.
- `171-family-ownership-review.csv`: owner/supporting/competing/GSC/action.
- `family-query-membership.csv`: 1.110 özgün family-sorgu üyeliği ve düzeltilmiş kapsam.
- `8-commercial-manual-review.csv`, `25-district-manual-review.csv`, `low-ctr-position-3-12.csv`, `summary.json`.

Çalıştırma: `python scripts/phase2-query-review.py`. Script yalnız yeni analiz dosyaları üretir. Eski 72 migration kararı, içerik, yönlendirme, metadata, sitemap ve hosting değiştirilmedi.
'''
(OUT / 'query-review-report.md').write_text(report, encoding='utf8')
print(json.dumps({k: v for k, v in summary.items() if k not in ['detail_files', 'limitations']}, ensure_ascii=False))
