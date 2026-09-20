"""Read-only sitemap + href + build + GSC crawl. Preserves slash/query variants.
Usage: python scripts/recovery-crawl.py --phase baseline [--origin http://127.0.0.1:3101]
Raw HTML/GSC stay in ignored .agents/reports. No URL is deleted by this script.
"""
import argparse, concurrent.futures, gzip, hashlib, json, os, re, time
from collections import Counter, deque
from html import unescape
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, build_opener, HTTPRedirectHandler
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit, urlunsplit

ROOT = Path(__file__).resolve().parent.parent
ORIGIN = 'https://ankaraozdemirnakliyat.com'
BASE = ROOT / '.agents/reports/recovery-2026-09-16'

class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None

class Page(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.title=[]; self.h1=[]; self.current_h1=None; self.metas={}; self.canonicals=[]
        self.links=set(); self.full=[]; self.editorial=[]; self.schema=[]; self.script=None; self.blocks=[]; self.block=None
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='meta': self.metas[a.get('name',a.get('property','')).lower()]=a.get('content','')
        if tag=='link' and 'canonical' in a.get('rel','').split(): self.canonicals.append(a.get('href',''))
        if tag=='a' and a.get('href'): self.links.add(a['href'])
        if tag=='h1': self.current_h1=[]
        if tag=='script' and a.get('type')=='application/ld+json': self.script=[]
        if tag in ('p','li','h1','h2','h3','h4'): self.block=[]
        if tag not in ('meta','link','img','br','hr','input','source','area','base','wbr','embed','param'): self.stack.append(tag)
    def handle_endtag(self, tag):
        if tag=='h1' and self.current_h1 is not None:
            self.h1.append(' '.join(self.current_h1)); self.current_h1=None
        if tag=='script' and self.script is not None:
            try: self.schema.append(json.loads(''.join(self.script)))
            except: self.schema.append({'PARSE_ERROR':True})
            self.script=None
        if tag in ('p','li','h1','h2','h3','h4') and self.block:
            self.blocks.append(' '.join(self.block)); self.block=None
        if tag in self.stack:
            i=len(self.stack)-1-self.stack[::-1].index(tag); self.stack=self.stack[:i]
    def handle_data(self, data):
        if self.script is not None: self.script.append(data)
        if 'title' in self.stack: self.title.append(data)
        if self.current_h1 is not None: self.current_h1.append(data)
        if any(t in self.stack for t in ('script','style','svg','noscript')): return
        value=' '.join(data.split())
        if not value: return
        if 'body' in self.stack: self.full.append(value)
        if 'main' in self.stack and not any(t in self.stack for t in ('nav','footer','header','aside','button','form')):
            self.editorial.append(value)
            if self.block is not None: self.block.append(value)

def normalize(url):
    p=urlsplit(url)
    return urlunsplit((p.scheme,p.netloc,p.path or '/',p.query,''))

def family(url):
    s=urlsplit(url).path.strip('/').split('/')
    if s==['']: return 'home'
    if s[0] in ('blog','makaleler'): return s[0] if len(s)>1 else s[0]+'_listing'
    if s[0]=='islemler':
        if len(s)==2:return 'city'
        if len(s)==3:return 'district_'+s[1]
        if len(s)>3:return 'local_child_'+s[1]
    if s[0]=='hizmetler' and len(s)>1:return 'service'
    return 'static_or_legacy'

def fetch(url):
    opener=build_opener(NoRedirect)
    for attempt in range(3):
        try:
            try: res=opener.open(Request(url,headers={'User-Agent':'OzdemirRecoveryAudit/1.0','Accept':'text/html,application/xml'}),timeout=35)
            except HTTPError as e: res=e
            return res.code,dict(res.headers),res.read()
        except Exception as e:
            if attempt==2:return 0,{},str(type(e).__name__).encode()
            time.sleep(.4*(attempt+1))

def crawl(args):
    directory=BASE/args.phase; directory.mkdir(parents=True,exist_ok=True)
    html_dir=directory/'html'; html_dir.mkdir(exist_ok=True)
    sitemap=set(); sitemap_files={}
    def sitemap_read(url):
        status,headers,body=fetch(url.replace(ORIGIN,args.origin,1)); xml=body.decode('utf-8','replace'); sitemap_files[url]={'status':status,'xml':xml}
        locs=[unescape(u) for u in re.findall(r'<loc>(.*?)</loc>',xml)]
        if '<sitemapindex' in xml:
            for loc in locs:sitemap_read(loc)
        else:sitemap.update(normalize(u) for u in locs)
    sitemap_read(ORIGIN+'/sitemap.xml')
    (directory/'sitemaps.json').write_text(json.dumps(sitemap_files,ensure_ascii=False),encoding='utf8')
    (directory/'robots.txt').write_bytes(fetch(args.origin+'/robots.txt')[2])
    seeds=set(sitemap)|{ORIGIN+'/',ORIGIN+'/makaleler',ORIGIN+'/referanslar',ORIGIN+'/seo-recovery-404-check'}
    baseline=BASE/'baseline/crawl.json'
    if args.phase!='baseline' and baseline.exists():
        seeds.update(r['url'] for r in json.loads(baseline.read_text(encoding='utf8')))
    gsc_file=BASE/'gsc.json'
    if gsc_file.exists():
        gsc=json.loads(gsc_file.read_text(encoding='utf8'))
        for period in gsc.get('periods',{}).values():
            seeds.update(r['keys'][0] for r in period['datasets']['page']['rows'])
    manifest=ROOT/'.next/prerender-manifest.json'
    if manifest.exists():
        routes=json.loads(manifest.read_text(encoding='utf8')).get('routes',{})
        seeds.update(ORIGIN+p for p in routes if not p.startswith('/_') and not p.endswith(('.xml','.txt')))
        (directory/'build-routes.json').write_text(json.dumps(list(routes)),encoding='utf8')
    redirects=json.loads((ROOT/'src/data/redirects.json').read_text(encoding='utf8'))
    recovery=ROOT/'src/data/recoveryRedirects.json'
    if recovery.exists():redirects+=json.loads(recovery.read_text(encoding='utf8'))
    phase2=ROOT/'src/data/phase2Redirects.json'
    if phase2.exists():redirects+=json.loads(phase2.read_text(encoding='utf8'))
    (directory/'redirects-source.json').write_text(json.dumps(redirects,ensure_ascii=False),encoding='utf8')
    for r in redirects:seeds.update((ORIGIN+r['source'],ORIGIN+r['destination']))
    seeds.update(ORIGIN+p for p in ['/hizmetler/evden-eve-nakliyat','/hizmetler/sigorta','/sitemap-2.xml','/sitemap-3.xml'])
    # Include exact HTTP/www variants; follow destinations without flattening the evidence.
    if args.origin==ORIGIN:
        seeds.update(['http://ankaraozdemirnakliyat.com/','http://www.ankaraozdemirnakliyat.com/','https://www.ankaraozdemirnakliyat.com/'])
    else:
        # A local crawl must never mix live host variants with the release candidate.
        seeds={s for s in seeds if s.startswith(ORIGIN)}
    rows={}; cache=directory/'crawl.json'
    if cache.exists() and not args.fresh:rows={r['url']:r for r in json.loads(cache.read_text(encoding='utf8')) if r['status']}
    pending=set(normalize(s) for s in seeds)-set(rows)
    def one(url):
        actual=url.replace(ORIGIN,args.origin,1) if url.startswith(ORIGIN) else url
        status,headers,body=fetch(actual)
        header={k.lower():v for k,v in headers.items()}
        p=Page(); is_html='text/html' in header.get('content-type','')
        if is_html:p.feed(body.decode('utf8','replace'))
        links=[]
        for href in p.links:
            target=normalize(urljoin(url,href)).replace(args.origin,ORIGIN,1)
            parsed=urlsplit(target)
            if parsed.hostname in ('ankaraozdemirnakliyat.com','www.ankaraozdemirnakliyat.com') and not re.search(r'\.(?:webp|png|jpg|jpeg|svg|pdf|ico|zip|mp4|woff2?)$',parsed.path,re.I):links.append(target)
        name=hashlib.sha256(url.encode()).hexdigest()
        if is_html:(html_dir/(name+'.html.gz')).write_bytes(gzip.compress(body))
        robots=p.metas.get('robots','')+','+p.metas.get('googlebot','')+','+header.get('x-robots-tag','')
        location=urljoin(url,header.get('location','')) if header.get('location') else ''
        if args.origin != ORIGIN:
            location=location.replace(args.origin,ORIGIN,1)
            location=location.replace(args.origin.replace('127.0.0.1','localhost'),ORIGIN,1)
        return {'url':url,'type':family(url),'status':status,'contentType':header.get('content-type',''),'location':location,
          'canonical':p.canonicals[0] if p.canonicals else '', 'canonicalCount':len(p.canonicals),'title':' '.join(p.title),
          'meta':p.metas.get('description',''),'h1':p.h1,'robots':robots,'indexable':status==200 and is_html and 'noindex' not in robots.lower(),
          'sitemap':url in sitemap,'fullText':' '.join(p.full),'editorialText':' '.join(p.editorial),'blocks':p.blocks,
          'wordCount':len(' '.join(p.editorial).split()),'contentBytes':len(body),'links':sorted(set(links)),'schema':p.schema,
          'htmlFile':str(html_dir/(name+'.html.gz')) if is_html else '', 'fetchedAt':time.strftime('%Y-%m-%dT%H:%M:%SZ',time.gmtime())}
    with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
        while pending:
            batch=list(sorted(pending))[:args.workers*8]; pending.difference_update(batch)
            for row in pool.map(one,batch):
                rows[row['url']]=row
                for url in row['links']+([row['location']] if row['location'] else []):
                    if urlsplit(url).hostname in ('ankaraozdemirnakliyat.com','www.ankaraozdemirnakliyat.com') and url not in rows:pending.add(url)
            pending.difference_update(rows)
            cache.write_text(json.dumps(list(rows.values()),ensure_ascii=False),encoding='utf8')
            print(f'{args.phase}: {len(rows)} crawled, {len(pending)} pending',flush=True)
    print(json.dumps({'urls':len(rows),'statuses':dict(Counter(r['status'] for r in rows.values())),'sitemap':len(sitemap),'indexable':sum(r['indexable'] for r in rows.values())}))

if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--phase',default='baseline'); parser.add_argument('--origin',default=ORIGIN);parser.add_argument('--workers',type=int,default=12);parser.add_argument('--fresh',action='store_true')
    crawl(parser.parse_args())
