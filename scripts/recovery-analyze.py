"""Join crawl, read-only GSC and inspection evidence; never infer zero demand.
Outputs CSV decisions, query owners, similarity pairs and graph QA, with raw
evidence in ignored reports. No source or URL mutations are performed.
"""
import argparse, csv, json, re, unicodedata
from collections import Counter, defaultdict, deque
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parent.parent
BASE=ROOT/'.agents/reports/recovery-2026-09-16'
DOC=ROOT/'docs/seo/recovery/2026-09-16'
ORIGIN='https://ankaraozdemirnakliyat.com'
def key(url): return url.rstrip('/') if url.rstrip('/')!=ORIGIN else ORIGIN+'/'
def write_csv(path,rows,fields=None):
 if not rows and fields is None:return
 with path.open('w',encoding='utf-8-sig',newline='') as f:
  w=csv.DictWriter(f,fieldnames=fields or list(rows[0]),extrasaction='ignore');w.writeheader();w.writerows(rows)
def norm(s):return ' '.join(re.findall(r'\w+',unicodedata.normalize('NFKC',s).lower().replace('ı','i'),re.UNICODE))
def shingles(s):
 words=norm(s).split();return set(tuple(words[i:i+5]) for i in range(max(0,len(words)-4)))
def dice(a,b):return 2*len(a&b)/(len(a)+len(b)) if a and b else 0
def flatten_schema(item):
 if isinstance(item,list):
  for x in item:yield from flatten_schema(x)
 elif isinstance(item,dict):
  yield item
  for x in item.values():
   if isinstance(x,(dict,list)):yield from flatten_schema(x)

def analyze(phase,similarity):
 DOC.mkdir(parents=True,exist_ok=True);out=DOC/phase;out.mkdir(exist_ok=True)
 rows=json.loads((BASE/phase/'crawl.json').read_text(encoding='utf8'));by={r['url']:r for r in rows}
 g=json.loads((BASE/'gsc.json').read_text(encoding='utf8'))
 metrics={}; queries=defaultdict(list)
 for name,p in g['periods'].items():
  m={}
  for r in p['datasets']['page']['rows']:
   item=m.setdefault(key(r['keys'][0]),{'clicks':0,'impressions':0,'weighted':0,'rawUrls':[]})
   item['clicks']+=r['clicks'];item['impressions']+=r['impressions'];item['weighted']+=r['impressions']*r['position'];item['rawUrls'].append(r['keys'][0])
  for item in m.values():item['position']=item['weighted']/item['impressions'] if item['impressions'] else None;item['ctr']=item['clicks']/item['impressions'] if item['impressions'] else None
  metrics[name]=m
 for r in g['periods']['history']['datasets']['page-query']['rows']:queries[key(r['keys'][0])].append(r)
 # Exact queries: choose page by current clicks, then current impressions; preserve historical owner as evidence.
 querysets={}
 for name in ('history','current28','previous28'):
  qm=defaultdict(dict)
  for r in g['periods'][name]['datasets']['page-query']['rows']:
   u,q=r['keys'];v=qm[q].setdefault(key(u),{'url':key(u),'clicks':0,'impressions':0,'weighted':0})
   v['clicks']+=r['clicks'];v['impressions']+=r['impressions'];v['weighted']+=r['impressions']*r['position']
  querysets[name]=qm
 ownerrows=[];ownerbyurl=defaultdict(list)
 for q,hist in querysets['history'].items():
  current=querysets['current28'].get(q,{})
  candidates=sorted((current or hist).values(),key=lambda x:(x['clicks'],x['impressions']),reverse=True)
  winner=candidates[0];ownerbyurl[winner['url']].append(q)
  ownerrows.append({'query':q,'primary_owner':winner['url'],'basis':'current28' if current else 'history','clicks':winner['clicks'],'impressions':winner['impressions'],'position':winner['weighted']/winner['impressions'],'secondary_supporting_urls':' | '.join(v['url'] for v in candidates[1:]),'old_competing_urls':' | '.join(u for u in hist if u!=winner['url']),'current_url_count':len(current),'history_url_count':len(hist),'action':'PROTECT owner; inspect intent before consolidation' if len(hist)>1 else 'PROTECT'})
 write_csv(out/'query-ownership.csv',ownerrows)
 # Inbound links and depth use href graph only, not sitemap discovery.
 inbound=defaultdict(set)
 for r in rows:
  if r['status']==200:
   for u in r['links']:inbound[u].add(r['url'])
 depth={ORIGIN+'/':0};queue=deque([ORIGIN+'/'])
 while queue:
  u=queue.popleft();r=by.get(u,{})
  for v in r.get('links',[])+([r['location']] if r.get('location') else []):
   if v not in depth:depth[v]=depth[u]+1;queue.append(v)
 indexable=[r for r in rows if r['indexable']]
 valid=[r for r in rows if r['status']==200 and 'text/html' in r['contentType']]
 duplicate=lambda field:[{'value':v,'urls':urls,'count':len(urls)} for v,urls in group(field).items() if v and len(urls)>1]
 def group(field):
  d=defaultdict(list)
  for r in indexable:d[r[field]].append(r['url'])
  return d
 chains=[]
 for r in rows:
  if r['location']:
   seen={r['url']};chain=[r['url']];n=r
   while n.get('location'):
    dest=n['location'];chain.append(dest)
    if dest in seen:break
    seen.add(dest);n=by.get(dest,{})
   if len(chain)>2 or chain[-1] in chain[:-1]:chains.append({'source':r['url'],'chain':chain,'loop':chain[-1] in chain[:-1],'final_status':by.get(chain[-1],{}).get('status')})
 infrastructure=[{'source':r['url'],'target':u} for r in valid for u in r['links'] if '/cdn-cgi/' in u]
 broken=[{'source':r['url'],'target':u,'status':by.get(u,{}).get('status','NOT_FETCHED')} for r in valid for u in r['links'] if '/cdn-cgi/' not in u and (by.get(u,{}).get('status',0)>=400 or not by.get(u,{}).get('status'))]
 canonical=[{'url':r['url'],'canonical':r['canonical'],'count':r['canonicalCount'],'targetStatus':by.get(r['canonical'],{}).get('status')} for r in indexable if not r['canonical'] or key(r['canonical'])!=key(r['url']) or r['canonicalCount']!=1 or (r['canonical'] in by and by[r['canonical']]['status']!=200)]
 schemaerrors=[]
 for r in valid:
  nodes=list(flatten_schema(r['schema']));faq=[n for n in nodes if n.get('@type')=='FAQPage']
  errors=[]
  if any(n.get('PARSE_ERROR') for n in nodes):errors.append('JSON parse')
  if len(faq)>1:errors.append('duplicate FAQPage')
  if any(n.get('@type') in ('Review','AggregateRating') for n in nodes):errors.append('review provenance requires evidence')
  if r['type'].startswith('local_') or r['type'].startswith('district_'):
   if any(n.get('@type')=='MovingCompany' and n.get('address') for n in nodes):errors.append('embedded address requires verified single business entity')
  for faqnode in faq:
   for question in faqnode.get('mainEntity',[]):
    if norm(question.get('name','')) not in norm(r['fullText']) or norm(question.get('acceptedAnswer',{}).get('text','')) not in norm(r['fullText']):errors.append('FAQ differs from visible content');break
  if errors:schemaerrors.append({'url':r['url'],'errors':errors})
 nearest={};pairs=[]
 if similarity:
  frequency=Counter(norm(b) for r in indexable for b in set(r['blocks']))
  common={b for b,n in frequency.items() if n>=max(20,len(indexable)*.6)}
  full=[shingles(r['fullText']) for r in indexable]
  editorial=[shingles(' '.join(b for b in r['blocks'] if norm(b) not in common)) for r in indexable]
  for i,a in enumerate(indexable):
   for j in range(i+1,len(indexable)):
    b=indexable[j];ed=dice(editorial[i],editorial[j])
    for x,y in ((a,b),(b,a)):
     if ed>nearest.get(x['url'],{}).get('editorial',0):nearest[x['url']]={'url':y['url'],'editorial':ed,'full':dice(full[i],full[j])}
    if ed>=.5:pairs.append({'url_a':a['url'],'url_b':b['url'],'editorial_similarity':round(ed,5),'full_body_similarity':round(dice(full[i],full[j]),5),'severity':'CRITICAL_REVIEW' if ed>=.7 else 'MANUAL_REVIEW'})
  write_csv(out/'similarity-pairs.csv',pairs,['url_a','url_b','editorial_similarity','full_body_similarity','severity'])
  (out/'similarity-nearest.json').write_text(json.dumps(nearest,ensure_ascii=False),encoding='utf8')
 else:
  p=out/'similarity-nearest.json'
  if p.exists():nearest=json.loads(p.read_text(encoding='utf8'))
 migration_path=DOC/'migration-map.json';migration=json.loads(migration_path.read_text(encoding='utf8')) if migration_path.exists() else []
 phase2=DOC/'phase2-migration/reviewed-map.json'
 if phase2.exists():migration+=json.loads(phase2.read_text(encoding='utf8'))
 planned={key(ORIGIN+r['source']):r for r in migration if r.get('approved')}
 inventory=[];winners=[]
 for r in rows:
  u=key(r['url']);m=metrics['history'].get(u,{});n=nearest.get(r['url'],{});qs=sorted(queries[u],key=lambda q:(q['clicks'],q['impressions']),reverse=True)
  protected=m.get('clicks',0)>0 or m.get('impressions',0)>=100 or any(q['position']<=10 and q['impressions']>=5 for q in qs)
  target='';reason='Needs intent, query and historical/backlink review'
  if u in planned:action=planned[u]['action'];target=ORIGIN+planned[u]['destination'];reason=planned[u]['reason']
  elif r['location']:action='301';target=r['location'];reason='Existing permanent redirect; actual HTTP code retained separately'
  elif 'noindex' in r['robots'].lower() and r['status']==200:action='NOINDEX';reason='Observed noindex; not newly applied by audit'
  elif protected:action='IMPROVE' if n.get('editorial',0)>=.5 or r['status']!=200 else 'KEEP';reason='Protect historical clicks / meaningful impressions / top-10 query'
  else:action='REVIEW'
  item={'URL':r['url'],'TYPE':r['type'],'OLD STATUS':r['status'],'GSC CLICKS':m.get('clicks','UNKNOWN'),'GSC IMPRESSIONS':m.get('impressions','UNKNOWN'),'AVG POSITION':m.get('position','UNKNOWN'),'GSC CTR':m.get('ctr','UNKNOWN'),'TOP QUERY':qs[0]['keys'][1] if qs else 'UNKNOWN','QUERY OWNER':' | '.join(ownerbyurl[u][:10]),'SIMILARITY':n.get('editorial','NOT_TESTED'),'FULL BODY SIMILARITY':n.get('full','NOT_TESTED'),'NEAREST URL':n.get('url',''),'ACTION':action,'TARGET URL':target,'REASON':reason,'FINAL STATUS':r['status'],'INDEXABLE':r['indexable'],'CANONICAL':r['canonical'],'TITLE':r['title'],'META':r['meta'],'H1':' | '.join(r['h1']),'H1 COUNT':len(r['h1']),'WORDS':r['wordCount'],'CONTENT BYTES':r['contentBytes'],'INTERNAL LINKS IN':len(inbound[r['url']]),'INTERNAL LINKS OUT':len(r['links']),'DEPTH':depth.get(r['url'],'UNREACHABLE'),'SITEMAP':r['sitemap'],'SCHEMA':' | '.join(sorted({str(n.get('@type')) for n in flatten_schema(r['schema']) if n.get('@type')})),'PROTECTED':protected,'BACKLINK RISK':'UNKNOWN','GSC 90D IMPRESSIONS':metrics['days90'].get(u,{}).get('impressions','NO_RETURNED_ROW'),'GSC 180D IMPRESSIONS':metrics['days180'].get(u,{}).get('impressions','NO_RETURNED_ROW')}
  inventory.append(item)
  if protected:winners.append(item)
 write_csv(out/'url-inventory.csv',inventory);write_csv(out/'protected-winners.csv',winners)
 clusters=[]
 for fam in sorted({r['type'] for r in rows}):
  urls={key(r['url']) for r in rows if r['type']==fam and r['status']==200};vals=[metrics['history'].get(u,{}) for u in urls]
  clusters.append({'type':fam,'public_200_urls':len(urls),'with_clicks':sum(v.get('clicks',0)>0 for v in vals),'with_impressions':sum(v.get('impressions',0)>0 for v in vals),'no_returned_90d_row':sum(u not in metrics['days90'] for u in urls),'no_returned_180d_row':sum(u not in metrics['days180'] for u in urls),'confirmed_zero_impressions_90_180':'UNKNOWN: absence is not zero demand'})
 write_csv(out/'clusters.csv',clusters)
 summary={'phase':phase,'crawled_url_universe':len(rows),'public_html_200':len(valid),'indexable':len(indexable),'sitemap_urls':sum(r['sitemap'] for r in rows),'status_counts':dict(Counter(r['status'] for r in rows)),'action_counts':dict(Counter(r['ACTION'] for r in inventory)),'query_owner_count':len(ownerrows),'distinct_owner_urls':sum(bool(qs) for qs in ownerbyurl.values()),'query_overlap_count':sum(r['current_url_count']>1 for r in ownerrows),'confirmed_cannibalization_count':'NOT_ESTABLISHED','high_similarity_pairs':sum(p['editorial_similarity']>=.7 for p in pairs) if similarity else 'NOT_RECOMPUTED','broken_internal_links':len(broken),'cdn_email_obfuscation_href_occurrences':len(infrastructure),'orphans':[r['url'] for r in indexable if not inbound[r['url']] and r['url']!=ORIGIN+'/'],'unreachable_indexable':[r['url'] for r in indexable if r['url'] not in depth],'redirect_chains':len(chains),'duplicate_titles':duplicate('title'),'duplicate_meta':duplicate('meta'),'missing_h1':[r['url'] for r in indexable if not r['h1']],'multiple_h1':[r['url'] for r in indexable if len(r['h1'])>1],'canonical_errors':canonical,'sitemap_errors':[r['url'] for r in rows if r['sitemap'] and (not r['indexable'] or key(r['canonical'])!=key(r['url']))],'schema_errors':schemaerrors,'preserved_winner_paths':len({key(r['URL']) for r in winners}),'gsc_periods':{name:{'startDate':p['startDate'],'endDate':p['endDate'],'totals':p['datasets']['propertyTotals']['rows']} for name,p in g['periods'].items()},'limitations':['Crawl covers sitemap, recursive internal href, generated route manifest, historical GSC URLs and redirect source list. No server logs/backlink export.','200 non-noindex means technically indexable, not proof of Google indexing. robots saved; current robots allows all.','Classification REVIEW is intentionally retained when demand, backlink or semantic equivalence is unknown.']}
 for name,data in [('summary',summary),('broken-links',broken),('redirect-chains',chains)]: (out/(name+'.json')).write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf8')
 print(json.dumps({k:v for k,v in summary.items() if not isinstance(v,(list,dict))},ensure_ascii=False))

if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('--phase',default='baseline');p.add_argument('--similarity',action='store_true');a=p.parse_args();analyze(a.phase,a.similarity)
