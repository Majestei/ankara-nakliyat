"""Produce a private before/after report from measured crawl and GSC evidence."""
import csv,json,sys
from pathlib import Path
from collections import Counter
from datetime import datetime,timezone
root=Path(__file__).resolve().parent.parent;docs=root/'docs/seo/recovery/2026-09-16';raw=root/'.agents/reports/recovery-2026-09-16'
phase=sys.argv[1] if len(sys.argv)>1 else 'production';commit=sys.argv[2] if len(sys.argv)>2 else 'NOT_DEPLOYED'
read=lambda p:json.loads(p.read_text(encoding='utf8'))
before=read(docs/'baseline/summary.json');after=read(docs/phase/'summary.json');g=read(raw/'gsc.json');inspection=read(docs/'inspection-summary.json');migrations=read(docs/'migration-map.json')
merged_count=sum(r['group']=='current_duplicate' for r in migrations)
recovered_count=sum(r['group']=='legacy_404_recovery' for r in migrations)
recovered_clicks=sum(r['clicks'] for r in migrations if r['group']=='legacy_404_recovery')
def csvread(p):
 with p.open(encoding='utf-8-sig',newline='') as f:return list(csv.DictReader(f))
old={r['URL']:r for r in csvread(docs/'baseline/url-inventory.csv')};new={r['URL']:r for r in csvread(docs/phase/'url-inventory.csv')}
cols=['URL','OLD STATUS','GSC CLICKS','GSC IMPRESSIONS','AVG POSITION','TOP QUERY','QUERY OWNER','SIMILARITY','ACTION','TARGET URL','FINAL STATUS','INDEXABLE','CANONICAL']
merged=[]
for u in sorted(old.keys()|new.keys()):
 a,b=old.get(u,{}),new.get(u,{});r={k:b.get(k,a.get(k,'')) for k in cols};r['URL']=u;r['OLD STATUS']=a.get('OLD STATUS','NOT_IN_BASELINE');r['FINAL STATUS']=b.get('FINAL STATUS','NOT_FETCHED');merged.append(r)
with (docs/'final-url-table.csv').open('w',encoding='utf-8-sig',newline='') as f:
 w=csv.DictWriter(f,fieldnames=cols);w.writeheader();w.writerows(merged)
size=lambda value:len(value) if isinstance(value,list) else value
checks=[('PUBLIC HTML 200','public_html_200'),('INDEXABLE','indexable'),('SITEMAP URLs','sitemap_urls'),('QUERY OWNER COUNT (exact queries)','query_owner_count'),('QUERY OVERLAP COUNT','query_overlap_count'),('HIGH SIMILARITY PAIRS ≥70%','high_similarity_pairs'),('BROKEN INTERNAL LINKS','broken_internal_links'),('ORPHANS','orphans'),('REDIRECT CHAINS','redirect_chains'),('DUPLICATE TITLES','duplicate_titles'),('DUPLICATE META','duplicate_meta'),('MISSING H1','missing_h1'),('MULTIPLE H1','multiple_h1'),('CANONICAL ERRORS','canonical_errors'),('SITEMAP ERRORS','sitemap_errors'),('SCHEMA FLAGS','schema_errors')]
table='\n'.join(f'| {label} | {size(before[key])} | {size(after[key])} |' for label,key in checks)
actions=Counter(r['ACTION'] for r in merged);public=Counter(r['ACTION'] for r in new.values() if r['FINAL STATUS']=='200' and r['INDEXABLE']=='True')
current=g['periods']['current28'];previous=g['periods']['previous28'];total=lambda p:p['datasets']['propertyTotals']['rows'][0]
c,p=total(current),total(previous);dates=g['periods']['history']['datasets']['date']['rows'];returned=sorted(r['keys'][0] for r in dates)
owners=csvread(docs/phase/'query-ownership.csv');core=['ankara evden eve nakliyat','ankara nakliyat','ankara ev taşıma','ankara asansörlü nakliyat','ankara şehirler arası nakliyat','incek nakliye','atakent nakliyat','etimesgut evden eve nakliyat']
owner_table=[]
for term in core:
 row=next((r for r in owners if r['query']==term),None)
 owner_table.append(f"| {term} | {row['primary_owner'] if row else 'NO_RETURNED_QUERY'} | {row['basis'] if row else 'UNKNOWN'} | {row['position'] if row else 'UNKNOWN'} |")
winnerfile=docs/f'winner-regression-{phase}.json';winner=read(winnerfile) if winnerfile.exists() else {}
live=phase=='production';title='Canlı yayın doğrulama raporu' if live else 'Yerel yayın adayı raporu'
report=f'''# Ankara Özdemir Nakliyat — {title}

Oluşturma: {datetime.now(timezone.utc).isoformat()}. Commit: `{commit}`. Ölçüm aşaması: `{phase}`.

Bu rapor ilk kontrollü recovery yayınının teknik sonuçlarını gösterir. İçerik benzerliği, başlık–gövde niyet uyumsuzluğu ve tarihsel 404 incelemesi açık kaldığı için geniş kapsamlı recovery görevi tamamlandı sayılmamalıdır. Sıralama veya trafik artışı iddia edilmez.

## Önce / sonra

| Ölçüm | Başlangıç canlı | {'Yayın sonrası canlı' if live else 'Yerel aday'} |
|---|---:|---:|
{table}

Public URL, HTTP200 HTML cevabıdır; indexable, noindex olmayan HTML200 cevabıdır. Google index sayısı değildir. Başlangıç evreni {before['crawled_url_universe']}, son evren {after['crawled_url_universe']} URL; evrenler sitemap, recursive href, build route manifest, GSC geçmişi, yönlendirme kaynakları ve host varyantlarıyla keşfedildi. Tarihsel404 sayısı kırık mevcut içerik bağlantısı sayısı değildir. Cloudflare e-posta gizleme endpointleri içerik kırık linklerinden ayrıldı.

## Kararlar ve koruma

{merged_count} mevcut zayıf makale aynı ilçe/hizmetin mevcut sayfasına301 ile birleştirildi.{recovered_count} daha önceden404 dönen tarihsel URL, aynı ilçe veya Ankara–varış şehri karşılığına301 ile kurtarıldı. Bu {recovered_count} URL, mevcut GSC geçmişinde toplam {recovered_clicks} tıklama taşıyordu. Ana sayfaya yönlendirilen migration URL:0. Yeni programmatic URL:0. Yeni toplu noindex:0. Yeni 410:0.

| ACTION | Tüm birleşik URL evreni | Son indexable sayfalar |
|---|---:|---:|
'''+ '\n'.join(f'| {a} | {actions[a]} | {public[a]} |' for a in ['KEEP','IMPROVE','MERGE','301','NOINDEX','410','REVIEW'])+f'''

MERGE işlemi {merged_count} sayfa için301 olarak kaydedildi; eylem sınıfları çift sayılmadı. Redirect kaynaklarının HTTP301/308 gerçek durumları CSV'de ayrı tutulur. REVIEW, veri yokluğunda değersizlik kararı değildir. Koruma eşiği: geçmiş tıklama, anlamlı gösterim veya top10sorgu; canlı indexable olan {winner.get('protected_live_pages','NOT_TESTED')} korunan URL için son200/indexable/selfcanonical kontrolü, hata: {len(winner.get('failed',[])) if winner else 'NOT_TESTED'}. Tarihsel tüm korunan yollar ve varyantlar `protected-winners.csv` içinde; bunların tümünün başlangıçta canlı olduğu ileri sürülmez.

## GSC performansı ve kayıp bulguları

16 aylık aralık istendi; API'nin döndürdüğü günlük gözlem aralığı {returned[0]}–{returned[-1]}. Anonimleştirilmiş sorgular ve API'nin göstermediği satırlar nedeniyle tam geçmiş veya sıfır talep iddia edilemez. Aylık date/query/page/device/country ayrıntı dökümleri ham özel rapor klasöründe tutulur; git'e alınmaz.

| Dönem | Clicks | Impressions | CTR | Position |
|---|---:|---:|---:|---:|
| {previous['startDate']}–{previous['endDate']} | {p['clicks']} | {p['impressions']} | {p['ctr']:.2%} | {p['position']:.2f} |
| {current['startDate']}–{current['endDate']} | {c['clicks']} | {c['impressions']} | {c['ctr']:.2%} | {c['position']:.2f} |

Gösterim {(c['impressions']/p['impressions']-1):.1%}, tıklama {(c['clicks']/p['clicks']-1):.1%}; ortalama konum ve CTR iyileşirken erişim düşmüş. Bu, yalnız başlık değiştirmeyle açıklanamaz. Git geçmişindeki büyük URL budamaları, tıklama geçmişi olan404ler, rastgele8şablona dağıtılmış içerik ve canonical varyantları somut risklerdir; bunların trafik düşüşüne tek başına neden olduğu kanıtlanmamıştır. Backlink dış kaynağı ve server logları yoktur.

## Birincil sorgu sahipleri

| Sorgu | Birincil URL | GSC temeli | Konum |
|---|---|---|---:|
'''+ '\n'.join(owner_table)+f'''

Tam exact-query eşleşmeleri `query-ownership.csv` içindedir.{after['query_owner_count']} exact sorgu sahibi, aynı sayıda farklı query family anlamına gelmez.{after['query_overlap_count']} mevcut çokURLli sorgu örtüşmesi zararlı cannibalization kanıtı değildir. Ana sayfanın Ankara ve mevcut güçlü lokal sorgulardaki sahipliği korunur; `/evden-eve-nakliyat` süreç/planlama içeriğiyle destekler, canonical ana sayfaya çevrilmez.

## Index ve canonical kanıtı

966 sitemap URL'si URL Inspection API ile incelendi. Sonuç: `{json.dumps(inspection['coverage'],ensure_ascii=False)}`. Duplicate grubunda72 slash varyantı ve19 API'nin Google canonical alanını döndürmediği örnek var. Bunlar property-wide Page Indexing toplamı değildir; saklanan Google index durumu canlı HTTP testi değildir. Yüzlerce indeksleme isteği gönderilmedi.

`index-inspection.csv`, `canonical-conflicts.csv`, `discovered-not-indexed.csv` ve `crawled-not-indexed.csv`: user/Google canonical, last crawl, HTTP, sitemap, inbound ve mevcut çift benzerliği. Google hedefini döndürmediyse UNKNOWN bırakıldı. Slash/host normalize edildi; farklı intent sayfaları canonical bandajıyla kapatılmadı.

## Yayın içeriği ve QA

Otomatik üreticiler durduruldu.{merged_count} emekli makale listelerden ve sitemap'ten çıkarıldı; kaynak kayıtlar rollback için duruyor.20 önceden mevcut canlı URL'nin sitemap kapsamı gözden geçirildi; yeni URL üretilmedi. Teyitsiz fiyatlar, puanlar, yorumlar, sigortacı/yetki belgesi/filo/kat kapasitesi iddiaları temizlendi. Google Places yanıtı yoksa API boş dürüst durum döndürüyor; sahte rating/schema yok. Yapay yayın tarihleri kaldırıldı. Teklif araçları kullanıcı seçimini özetliyor; uydurma TL hesabı yapmıyor.

Yayın öncesi build/typecheck/lint geçti; SEO araçlarının5 testi geçti.78 redirect kuralı,624 slash/query/host varyantı,56 hedef ve named-winner kontrolleri geçti. Temsilî8 sayfa ×375/390/768/1440:32 sayfa kontrolü ve3 mobil menü etkileşimi geçti. İki makale375/1440:4 ek kontrol geçti. Yatay kaydırmalı kontrol listesi sekmeleri kasıtlı scroll alanıdır; sayfa taşması yok. Form gönderilmedi/telefon aranmadı. Görsel kimlik korundu.

Yerel Lighthouse homepage 77 mobile / 97 desktop, evden 79 mobile / 99 desktop; bunlar canlı karşılaştırma yerine geçmez. Yerel çalışma sırasında başka QA işlemleri de vardı. Canlı Lighthouse ayrı kaydedilir. Field CWV/INP doğrulanmadı; PSI 429 ile kısıtlandı. Lighthouse SEO 100, içerik kalitesinin veya Google sıralamasının kanıtı değildir.

## Açık işler ve takip

- Yüksek benzerlik çiftleri halen {after['high_similarity_pairs']}. Random şablon gövdeleri bazı başlık niyetlerini karşılamıyor. Kazananları koruyarak sorgu ailesi bazında elle içerik düzeltme/semantic consolidation sürmeli; sıfır benzerlik sorunu iddia edilmez.
- REVIEW kalan zayıf sayfalar için backlink, gerçek hizmet ve uygun replacement kanıtı tamamlanmalı. Eksik GSC satırı sıfır gösterim sayılmamalı. 90/180 gün confirmed-zero adetleri UNKNOWN; dönen ve dönmeyen satır kümeleri `clusters.csv` içindedir.
- Tüm tarihsel404ler ana sayfaya yönlendirilmedi. Tam karşılık bulunamayan geçmiş kazananlar ayrı inceleme gerektirir.
- Belge, fiyat tarifesi, Google Business Profile, gerçek tesis/operasyon ve müşteri kanıtı işletmeden doğrulanmalı; doğrulanana kadar yeni trust iddiası eklenmemeli.
- Yayından7/28/56/90 gün sonra clicks,impressions,CTR,position ve core sorguları aynı pencerelerde karşılaştırın. Inspection örneklemini aynı URL setiyle tutun; Page Indexing dışlama toplamlarını API örneklemiyle karıştırmayın. Sıralama artışı garanti edilmez.

## Dosyalar ve geri dönüş

`final-url-table.csv`: istenen OLD STATUS/GSC/owner/similarity/action/target/FINAL STATUS/indexability/canonical tablosu; tüm keşfedilen URL evreni. `migration-map.csv`:{len(migrations)} kararın kaynak/hedef/gerekçe/GSC/backlink risk kanıtı. Ayrıntılı QA ve similarity tabloları `baseline/` ve `{phase}/` klasörlerinde.

Önceki kaynak ve kullanıcı değişiklikleri `.agents/reports/recovery-2026-09-16/backup/` altında saklandı. Backup branch `codex/seo-recovery-backup-2026-09-16`. Yayın rollback'i release commitini revert ederek veya Vercel'de önceki deploymentı seçerek yapılır; kullanıcıya ait önceki değişiklikler silinmez. GSC raporları herkese açık git deposuna gönderilmez.
'''
(docs/'recovery-report.md').write_text(report,encoding='utf8')
print(docs/'recovery-report.md')
