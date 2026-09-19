"""Observed query families; candidate grouping, never proof of harmful cannibalization."""
import csv,json,re,unicodedata
from collections import defaultdict
from pathlib import Path
root=Path(__file__).resolve().parent.parent;base=root/'.agents/reports/recovery-2026-09-16';out=root/'docs/seo/recovery/2026-09-16'
g=json.loads((base/'gsc.json').read_text(encoding='utf8'))
def norm(s):
 s=unicodedata.normalize('NFKD',s.lower().replace('ı','i'))
 return ' '.join(re.findall('[a-z0-9]+',''.join(c for c in s if not unicodedata.combining(c))))
places={'ankara'}
for file in ['src/data/siteData.ts','src/data/neighborhoodsData.ts']:
 p=root/file
 if p.exists():places.update(norm(n) for n in re.findall(r'name:\s*"([^"]+)"',p.read_text(encoding='utf8')))
places=sorted(places,key=len,reverse=True)
def family(query):
 q=norm(query);place=next((p for p in places if p!='ankara' and (' '+p+' ') in (' '+q+' ')), 'ankara' if 'ankara' in q else 'location_unspecified')
 service=next((s for s,pattern in [('asansor',r'asansor'),('ofis',r'ofis|buro|is yeri'),('depolama',r'depo'),('parca',r'parca|tek esya|kamyonet'),('sigorta',r'sigorta'),('paketleme',r'paket|ambalaj'),('sehirler_arasi',r'sehirler arasi|sehirlerarasi'),('ev_tasima',r'evden eve|ev tasima|nakliyat|nakliye|tasimacilik')] if re.search(pattern,q)), 'other')
 intent='price' if re.search(r'fiyat|ucret|maliyet|ne kadar',q) else 'provider_selection' if re.search(r'firma|sirket|tavsiye|yorum|en iyi',q) else 'guide' if re.search(r'nasil|rehber|ipuc|hazirlik|dikkat',q) else 'commercial_or_unspecified'
 return f'{place} / {service} / {intent}'
groups=defaultdict(lambda:defaultdict(lambda:{'clicks':0,'impressions':0,'weighted':0,'queries':set()}))
for row in g['periods']['current28']['datasets']['page-query']['rows']:
 u,q=row['keys'];u=u.rstrip('/') if u.rstrip('/')!='https://ankaraozdemirnakliyat.com' else 'https://ankaraozdemirnakliyat.com/'
 v=groups[family(q)][u];v['clicks']+=row['clicks'];v['impressions']+=row['impressions'];v['weighted']+=row['impressions']*row['position'];v['queries'].add(q)
rows=[]
for f,values in groups.items():
 ranked=sorted(values.items(),key=lambda item:(item[1]['clicks'],item[1]['impressions']),reverse=True);u,v=ranked[0]
 rows.append({'FAMILY':f,'PRIMARY OWNER CANDIDATE':u,'BASIS':'current28 returned page-query clicks then impressions','OWNER CLICKS':v['clicks'],'OWNER IMPRESSIONS':v['impressions'],'OWNER POSITION':v['weighted']/v['impressions'],'OBSERVED QUERY COUNT':len(set().union(*(x['queries'] for x in values.values()))),'URL COUNT':len(values),'SECONDARY URLS':' | '.join(u for u,_ in ranked[1:]),'QUERIES':' | '.join(sorted(set().union(*(x['queries'] for x in values.values())))),'ACTION':'Keep observed winner; manual family/intent review before consolidation'})
rows.sort(key=lambda r:(r['OWNER CLICKS'],r['OWNER IMPRESSIONS']),reverse=True)
with (out/'query-family-ownership.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=list(rows[0]));w.writeheader();w.writerows(rows)
summary={'candidate_families':len(rows),'multi_url_families':sum(r['URL COUNT']>1 for r in rows),'limitations':['Rule-based service/location/intent grouping requires editorial review. Similar spelling or one family does not establish semantic equivalence.','Owner uses returned current28 page-query metrics. Anonymous or omitted queries are unknown. Summed page impressions are not property totals.','Multiple family URLs are overlap, not automatically harmful cannibalization. No redirect or noindex is applied by this script.']}
(out/'query-family-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(summary,ensure_ascii=False))
