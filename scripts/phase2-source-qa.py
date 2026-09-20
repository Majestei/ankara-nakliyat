"""Guard the reviewed content batch against migration and identity regressions."""
import csv
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DOC = ROOT / 'docs/seo/recovery/2026-09-16'
def read(path):
    return json.loads(path.read_text(encoding='utf-8-sig'))

freeze = read(ROOT / '.agents/reports/recovery-2026-09-16/phase2-backup/freeze.json')
for name in ['src/data/recoveryRedirects.json', 'src/data/redirects.json', 'src/app/page.tsx', 'src/data/blogDataGen.json', 'src/data/makalelerData.json']:
    assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == freeze['sourceHashes'][name], name
baseline = {r['url']: r for r in read(ROOT / '.agents/reports/recovery-2026-09-16/phase2-live-baseline/crawl.json')}
origin = 'https://ankaraozdemirnakliyat.com'
inventory = list(csv.DictReader((DOC / 'phase2-content/url-inventory.csv').open(encoding='utf-8-sig')))
winners = {r['URL'] for r in inventory if r['WINNER FREEZE'] == 'True'}
rules = read(ROOT / 'src/data/phase2Redirects.json')
old_rules = read(ROOT / 'src/data/recoveryRedirects.json')
sources = {r['source'] for r in rules}
all_sources = {r['source'] for r in rules + old_rules}
assert len(rules) == len(sources)
assert len(all_sources) == len(rules) + len(old_rules), 'Overlapping migration sources'
assert not (winners & {origin + s for s in sources}), 'Winner removed'
for rule in rules:
    target = baseline[origin + rule['destination']]
    assert target['indexable'] and target['status'] == 200 and target['canonical'] == target['url'], rule
    assert rule['destination'] not in all_sources and rule['destination'] != '/', rule
source = {}
for file, kind in [('blogDataGen.json', 'blog'), ('makalelerData.json', 'makaleler')]:
    for row in read(ROOT / 'src/data' / file):
        source[f"/{kind}/{row['slug']}"] = row
revisions = []
for file in sorted((ROOT / 'src/data').glob('phase2*Overrides*.json')) + [ROOT / 'src/data/phase2AdditionalBlog.json']:
    for row in read(file):
        path = f"/{row['type']}/{row['slug']}"
        assert path in source and path not in all_sources, path
        assert set(row) <= {'type', 'slug', 'content', 'excerpt', 'reviewReason'}, path
        assert len(row['content'].split()) >= 220, path
        assert '## ' in row['content'] and row['excerpt'].strip(), path
        assert not re.search(r'<\s*(script|iframe|style)\b', row['content'], re.I), path
        links = re.findall(r'\]\(([^)]+)\)', row['content'])
        for link in links:
            assert link.startswith('/') and not link.startswith('//'), (path, link)
            target = baseline.get(origin + link)
            assert target and target['indexable'] and link not in all_sources, (path, link)
        revisions.append({'path': path, 'title': source[path]['title'], 'words': len(row['content'].split()), 'sha256': hashlib.sha256(row['content'].encode()).hexdigest()})
assert len(revisions) == len({r['path'] for r in revisions}), 'Duplicate revision'
revised_paths = {r['path'] for r in revisions}
clear = [r for r in inventory if r['PRIORITY'] in ('P0', 'P1') and r['TITLE/BODY MATCH'] == 'CLEAR_MISMATCH']
unhandled = [r['URL'] for r in clear if r['URL'].removeprefix(origin) not in sources | revised_paths]
assert not unhandled, unhandled
report = {'result': 'PASS', 'frozen_winners': len(winners), 'unchanged_original_migrations': len(old_rules), 'new_rules': len(rules), 'revised_pages': len(revisions), 'original_p0_p1_clear_mismatches': len(clear), 'unhandled_clear_mismatches': unhandled, 'revisions': revisions}
(DOC / 'phase2-source-qa.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
print(json.dumps({k: v for k, v in report.items() if k != 'revisions'}))
