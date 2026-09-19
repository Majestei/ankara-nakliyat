"""Compare every known historical winner that was indexable before the release."""
import json,sys
from pathlib import Path
from urllib.parse import urlsplit
root=Path(__file__).resolve().parent.parent;base=root/'.agents/reports/recovery-2026-09-16';out=root/'docs/seo/recovery/2026-09-16'
phase=sys.argv[1] if len(sys.argv)>1 else 'local-final'
before=json.loads((base/'baseline/crawl.json').read_text(encoding='utf8'));after=json.loads((base/phase/'crawl.json').read_text(encoding='utf8'))
latest=base/'release-benchmark/gsc.json'
g=json.loads((latest if latest.exists() else base/'gsc.json').read_text(encoding='utf8'))
key=lambda u:urlsplit(u).path.rstrip('/') or '/'
m={}
for row in g['periods']['history']['datasets']['page']['rows']:
 v=m.setdefault(key(row['keys'][0]),{'clicks':0,'impressions':0,'top10':False});v['clicks']+=row['clicks'];v['impressions']+=row['impressions']
for row in g['periods']['history']['datasets']['page-query']['rows']:
 if row['position']<=10:m.setdefault(key(row['keys'][0]),{'clicks':0,'impressions':0,'top10':False})['top10']=True
by={r['url']:r for r in after};checks=[]
for row in before:
 v=m.get(key(row['url']),{})
 if not row['indexable'] or not (v.get('clicks',0)>0 or v.get('impressions',0)>=100 or v.get('top10')):continue
 final=by.get(row['url'],{});checks.append({'url':row['url'],'clicks':v.get('clicks',0),'impressions':v.get('impressions',0),'top10':v.get('top10',False),'status':final.get('status'),'PASS':final.get('indexable',False) and key(final.get('canonical',''))==key(row['url'])})
report={'phase':phase,'protected_live_pages':len(checks),'failed':[r for r in checks if not r['PASS']],'checks':checks}
(out/f'winner-regression-{phase}.json').write_text(json.dumps(report,indent=2,ensure_ascii=False),encoding='utf8')
print(json.dumps({k:v for k,v in report.items() if k!='checks'}));sys.exit(bool(report['failed']))
