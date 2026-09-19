// Writes an evidence table only. Applying it is a separate, reviewed source change.
import { readFile, writeFile } from 'node:fs/promises';
const base = '.agents/reports/recovery-2026-09-16';
const docs = 'docs/seo/recovery/2026-09-16';
const origin = 'https://ankaraozdemirnakliyat.com';
const crawl = JSON.parse(await readFile(`${base}/baseline/crawl.json`, 'utf8'));
const gsc = JSON.parse(await readFile(`${base}/gsc.json`, 'utf8'));
const articles = JSON.parse(await readFile('src/data/makalelerData.json', 'utf8'));
const by = new Map(crawl.map(p => [new URL(p.url).pathname.replace(/\/$/, '') || '/', p]));
const key = url => new URL(url).pathname.replace(/\/$/, '') || '/';
const metrics = new Map(); const queries = new Map();
for (const row of gsc.periods.history.datasets.page.rows) {
  const path=key(row.keys[0]); const m=metrics.get(path)||{clicks:0,impressions:0};
  m.clicks+=row.clicks;m.impressions+=row.impressions;metrics.set(path,m);
}
for (const row of gsc.periods.history.datasets['page-query'].rows) {
  const path=key(row.keys[0]);queries.set(path,[...(queries.get(path)||[]),row]);
}
const rows=[];
function add(source,destination,reason,group) {
  const target = crawl.find(p=>p.url===origin+destination);
  if(!target || target.status!==200 || !target.indexable || key(target.canonical)!==destination)throw Error(`Invalid target ${destination}`);
  const m=metrics.get(source)||{};const qs=queries.get(source)||[];
  rows.push({source,action:'301',destination,reason,group,clicks:m.clicks??'UNKNOWN',impressions:m.impressions??'UNKNOWN',topQuery:qs[0]?.keys[1]||'UNKNOWN',backlinkRisk:'UNKNOWN; permanent equivalent redirect retains a recovery path',oldStatus:crawl.find(p=>p.url===origin+source)?.status??'UNKNOWN',targetStatus:target.status,approved:false});
}
for (const article of articles) {
  const match=article.slug.match(/^([a-z]+)-(evden-eve-nakliyat|ofis-tasima)-(firmalari|fiyatlari)$/);
  if(!match)continue;
  const source='/makaleler/'+article.slug;const m=metrics.get(source);const qs=queries.get(source)||[];
  // Any returned click, meaningful exposure or top-10 query protects a current URL.
  if(!m||m.clicks>0||m.impressions>=100||qs.some(q=>q.position<=10))continue;
  const [,district,service,variant]=match;
  const destination=`/islemler/ankara/${district}`+(service==='ofis-tasima'?'/ofis-tasima':variant==='fiyatlari'?'/nakliyat-fiyatlari':'');
  add(source,destination,`Same ${district} ${service} intent; ${variant} template provides no distinct comparison or tariff. Returned historical page metrics reviewed; no click/top-10 winner displaced. Target covers planning, scope and quote factors.`, 'current_duplicate');
}
for (const [source,m] of metrics) {
  if(!m.clicks || crawl.find(p=>p.url===origin+source)?.status!==404)continue;
  let destination='';let reason='';
  let match=source.match(/^\/blog\/([a-z]+)-(evden-eve-nakliyat|ofis-tasima)-rehberi(?:-2026)?$/);
  if(match){destination=`/islemler/ankara/${match[1]}`+(match[2]==='ofis-tasima'?'/ofis-tasima':'');reason='Historical clicked district guide is already 404; recover its exact district/service intent into the existing hub.';}
  match=source.match(/^\/blog\/ankara-([a-z]+)-nakliyat-(fiyatlari|rehberi|hatti)$/);
  if(match && crawl.some(p=>p.url===origin+'/islemler/'+match[1]&&p.status===200)){destination='/islemler/'+match[1];reason='Historical clicked Ankara route guide/price URL is already 404; the same Ankara–destination route exists and will include quote and delivery planning.';}
  match=source.match(/^\/makaleler\/([a-z]+)-(evden-eve-nakliyat|ofis-tasima|sehir-ici-nakliyat)(-fiyatlari-ve-yorumlar)?$/);
  if(match){destination=`/islemler/ankara/${match[1]}`+(match[2]==='ofis-tasima'?'/ofis-tasima':match[3]?'/nakliyat-fiyatlari':'');reason='Historical clicked commercial district URL is already 404; exact district and moving/price intent retained at an existing page.';}
  if(destination && crawl.some(p=>p.url===origin+destination&&p.status===200))add(source,destination,reason,'legacy_404_recovery');
}
await writeFile(`${docs}/migration-map.json`,JSON.stringify(rows,null,2)+'\n');
const columns=Object.keys(rows[0]);const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';
await writeFile(`${docs}/migration-map.csv`,'\ufeff'+[columns.join(','),...rows.map(r=>columns.map(k=>cell(r[k])).join(','))].join('\n')+'\n');
console.log(JSON.stringify({count:rows.length,groups:rows.reduce((o,r)=>(o[r.group]=(o[r.group]||0)+1,o),{}),legacyClicks:rows.filter(r=>r.group==='legacy_404_recovery').reduce((s,r)=>s+r.clicks,0)}));
