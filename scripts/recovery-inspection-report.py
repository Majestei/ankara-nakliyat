"""Join read-only URL Inspection evidence with the immutable baseline crawl."""
import csv,json
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit
from importlib.machinery import SourceFileLoader
root=Path(__file__).resolve().parent.parent
base=root/'.agents/reports/recovery-2026-09-16'
out=root/'docs/seo/recovery/2026-09-16'
audit=SourceFileLoader('recovery_audit',str(root/'scripts/recovery-analyze.py')).load_module()
inspections=json.loads((base/'inspection.json').read_text(encoding='utf8'))
crawl=json.loads((base/'baseline/crawl.json').read_text(encoding='utf8'))
by={r['url']:r for r in crawl};inbound=Counter(u for r in crawl if r['status']==200 for u in r['links'])
rows=[]
for row in inspections:
 s=row.get('indexStatusResult',{});u=row['url'];p=by.get(u,{})
 google=s.get('googleCanonical','');user=s.get('userCanonical','');target=by.get(google,{})
 category='NO_CANONICAL_CONFLICT_REPORTED'
 if 'Duplicate' in s.get('coverageState',''):
  if not google:category='GOOGLE_CANONICAL_NOT_RETURNED'
  elif google.rstrip('/')==user.rstrip('/'):category='TRAILING_SLASH_VARIANT'
  elif urlsplit(google).path.rstrip('/')==urlsplit(user).path.rstrip('/'):category='HOST_OR_SCHEME_VARIANT'
  else:category='DIFFERENT_PATH_REVIEW_INTENT'
 sim=audit.dice(audit.shingles(p.get('editorialText','')),audit.shingles(target.get('editorialText',''))) if p and target else 'NOT_AVAILABLE'
 rows.append({'URL':u,'COVERAGE':s.get('coverageState','ERROR'),'VERDICT':s.get('verdict','UNKNOWN'),'INSPECTED AT':row.get('inspectedAt',''),'LAST GOOGLE CRAWL':s.get('lastCrawlTime','UNKNOWN'),'USER CANONICAL':user or 'NOT_RETURNED','GOOGLE CANONICAL':google or 'NOT_RETURNED','CAUSE CLASSIFICATION':category,'HTTP STATUS':p.get('status','UNKNOWN'),'CURRENT DECLARED CANONICAL':p.get('canonical','UNKNOWN'),'INTERNAL LINKS IN':inbound[u],'SITEMAP':p.get('sitemap',False),'PAIR EDITORIAL SIMILARITY':sim,'QUERY INTENT ACTION':'Preserve GSC winners; review content/intent before any different-path consolidation' if category=='DIFFERENT_PATH_REVIEW_INTENT' else 'Normalize host/slash in one redirect; no indexing requests'})
audit.write_csv(out/'index-inspection.csv',rows)
for term,name in [('Duplicate','canonical-conflicts'),('Discovered','discovered-not-indexed'),('Crawled -','crawled-not-indexed')]:
 audit.write_csv(out/(name+'.csv'),[r for r in rows if term in r['COVERAGE']])
summary={'inspected':len(rows),'coverage':dict(Counter(r['COVERAGE'] for r in rows)),'canonical_classes':dict(Counter(r['CAUSE CLASSIFICATION'] for r in rows if 'Duplicate' in r['COVERAGE'])),'limitation':'966 sitemap URLs inspected, not a property-wide indexed-page export. Missing Google canonical is unknown, not evidence of a selected target. Inspection reports stored index state, not a live crawl.'}
(out/'inspection-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps(summary,ensure_ascii=False))
