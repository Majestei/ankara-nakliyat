# İkinci Aşama SEO Kanıt Raporu — 5 Eylül 2026

## Yönetici özeti

İki sitede toplam **1.464 sitemap URL'si** canlıdan tarandı. Tam teknik kontrolde HTTP/canonical/H1/robots/sitemap düzeyinde **0 hata ve 0 uyarı** görüldü; iki production derlemesi de başarıyla tamamlandı. Bununla birlikte içerik kalitesi tarafında ciddi ölçek riski var: **333 yüksek benzerlikli/duplicate aday**, **241 doorway adayı**, **408 ince içerik adayı** ve bu üç kümenin birleşiminde **683 riskli URL** bulunuyor.

Bu rapor aşamasında hiçbir toplu içerik, title, canonical, noindex, redirect veya URL silme değişikliği production'a gönderilmedi. `MERGE` kararları uygulama emri değil, GSC verisiyle doğrulanması gereken adaylardır.

İki Search Console mülkü doğru hesaplarda mevcut ve oturum açılmış arayüzden 7/14/28/90 günlük gerçek metrikler alındı. Özdemir'de 28 günlük gösterim %64,8 ve tıklama %39,2 düşmüş olsa da son 7 günde tıklama 23'ten 52'ye toparlandı. Akif'te 28 günlük tıklama %69,2 ve gösterim %31,3 arttı; buna karşı son 14 günde tıklama %42,9, gösterim %30,3 düştü ve ortalama konum 3,4'ten 7,7'ye geriledi. Tam API dışa aktarımı ve mobil SERP geçmişi için OAuth/SERP sağlayıcı kimliği hâlâ eksik; görünmeyen satırlar uydurulmadı.

## 1. Production gerçeklik kontrolü

| Kontrol | Ankara Özdemir | Akif Nakliyat |
|---|---:|---:|
| Sitemap URL | 965 | 499 |
| Canlı on-page indexable | 965 | 499 |
| Repo production build | Başarılı, 993 statik çıktı | Başarılı, 507 statik çıktı |
| Sitemap URL'si generated HTML ile eşleşti | 965/965 | 499/499 |
| Title/H1 farkı | 0 | 0 |
| Ham body farkı | 5 | 15 |

Özdemir'deki 5 ham fark gerçek deployment sapması değil: Cloudflare'ın e-posta adresini `[email protected]` biçiminde gizlemesi ve tarayıcı/derleme saat diliminin blog tarihlerini bir gün farklı biçimlendirmesi. Ana içerik, title ve H1 aynı.

Akif'teki 15 fark gerçek fakat sürüm/cache problemi değil. `src/data/seoTags.ts` içindeki `Math.random()` her şehir sayfasında 100 “Hızlı Erişim Etiketi”nin `Ankara → şehir` veya `şehir → Ankara` sırasını her derlemede rastgele değiştiriyor. Bu, production HTML'ini deterministik olmaktan çıkarıyor ve anahtar kelime doldurma/scaled-content riski yaratıyor.

Sonuç: repo ile production arasında eksik deployment kanıtı yok. Farkların nedeni runtime/CDN dönüşümü ve kasıtlı fakat riskli rastgele içerik üretimi.

## 2. Doğrulanmamış iddialar

| İfade | Canlı sayfa | Repo kaynağı | Generated çıktı | Değerlendirme |
|---|---:|---|---|---|
| `10.000+` | 2 | Özdemir 1 dosya; Akif 2 dosya | Özdemir 1; Akif 1 sayfa | Her iki `/hizmetler` sayfasında; kanıt dosyası yok |
| `10K+` | 3 | Özdemir 3; Akif 1 dosya | Özdemir 3; Akif 0 sayfa | Özdemir galeri/SSS/hizmetler; kanıt yok |
| `15+ yıl` | 98 | Özdemir 1; Akif 3 dosya | Özdemir 0; Akif 15 sayfa | Özdemir'de ayrıca bileşenler arası ayrı `15+` gösterimi var; kuruluş kanıtı yok |
| `4.9 Google` | 1 | Özdemir hizmetler bileşenindeki ayrık değer/etiket | Özdemir 1 sayfa | Canlı `/hizmetler`; doğrulanmış profil/yorum kaynağı yok |
| `10+ araç` | 1 | Özdemir hizmetler bileşenindeki ayrık değer/etiket | Özdemir 1 sayfa | Canlı `/hizmetler`; filo kanıtı yok |
| `K3` | 241 | Özdemir 5; Akif 3 dosya | Özdemir 989; Akif 1 generated dosya | Bazıları tavsiye metni; ancak Özdemir footer `K3 Belgeli`, Akif ana hizmet sayfası `K3 Yetki Belgesi` şirket iddiası olarak görünüyor |
| `HDI` | 1 | Özdemir 1 dosya | Özdemir `/iletisim` | `A Sınıfı HDI Sigorta` iddiası; poliçe/ilişki kanıtı yok |
| `sertifikalı ekip` | 0 | 0 | 0 | Bulunmadı |

Dar liste dışında canlıda **1.216 benzersiz sayısal/güven iddiası adayı** yakalandı. En yaygın kümeler: “tüm taşımalar sigortalı” (300 sayfa), “Türkiye'nin lider sigorta şirketleri/emtia sigortası” (100), “kadrolu ve eğitimli ekip” (64), “Allianz güvencesi” (64), “kapsamlı yol sigortası” (64), “sıfır risk/hasar garantisi”, `ISO 9001:2015`, `AXA`, “askeri düzey SSL” ve çeşitli yüzde/deneyim/filo ifadeleri. Bunların tamamı `claims.json` içinde sayfa örnekleriyle kayıtlıdır. Gerçek poliçe, belge, kuruluş ve filo kanıtı gelmeden şirket iddiası olarak kullanılmamalıdır.

## 3. 1.464 URL kalite sınıflandırması

| Sınıf | Toplam | Özdemir | Akif |
|---|---:|---:|---:|
| KEEP | **141** | 77 | 64 |
| IMPROVE | **917** | 626 | 291 |
| MERGE adayı | **333** | 199 | 134 |
| MANUAL_REVIEW | **73** | 63 | 10 |
| NOINDEX | 0 | 0 | 0 |
| REDIRECT | 0 | 0 | 0 |
| REMOVE | 0 | 0 | 0 |

Risk görünümü:

- Yüksek semantik benzerlik/duplicate: **333** URL; bunların **288'i** aynı site içindeki başka bir sayfayla ölçümde tamamen aynı içerik şablonuna sahip.
- Doorway/scaled-content: **241** URL.
- 220 kelimenin altında: **408** URL.
- En az bir risk taşıyan benzersiz URL: **683** (Özdemir 323, Akif 360).

En belirgin kümeler:

- Özdemir `/makaleler`: 300 sayfanın 120'si MERGE adayı. Kalecik/Evren/Haymana gibi ilçe + hizmet + “firma/fiyat” kombinasyonlarında içerik ölçümü 1,00'a kadar çıkıyor.
- Özdemir mahalle sayfaları: 319 sayfanın 44'ü MERGE, 63'ü MANUAL_REVIEW; yalnızca yer adı değiştirme riski yüksek.
- Akif Ankara ilçe + hizmet: 125 sayfanın 40'ı MERGE, 80'i IMPROVE, 5'i MANUAL_REVIEW. Çok sayıda sayfa 159–200 kelime ve 1,00 benzerlikte.
- Akif İstanbul ilçe + hizmet: 195 sayfanın 60'ı MERGE, 130'u IMPROVE, 5'i MANUAL_REVIEW.
- Akif şehirlerarası 15 şehir sayfasının 11'i MERGE adayı ve tamamında rastgele 100 etiket bloğu var.

Her URL'nin ölçümü ve gerekçesi `url-quality.csv` içindedir. Search Console arayüzünden doğrulanabilen ana sorgu/sayfa sahipliği aşağıda ayrıca işlendi; 1.464 URL'nin tamamına ait GSC alanları API erişimi olmadan hâlâ `UNKNOWN` bırakıldı.

## 4. Search Console intelligence

Doğrulanmış hesap–mülk eşleşmesi:

- `mehmetkaratasbey4@gmail.com` → `https://ankaraozdemirnakliyat.com/`
- `k.suleymanks@gmail.com` → `https://www.ankaraakifnakliyat.com/`

Mülkler zaten vardı; yeni mülk eklenmedi, DNS veya sahiplik ayarı değiştirilmedi. Okuma işlemleri oturum açılmış Search Console arayüzünde 3 Eylül 2026'ya kadar kesinleşmiş veriyle yapıldı.

### Dönem karşılaştırmaları

| Site / dönem | Tıklama şimdi → önceki | Gösterim şimdi → önceki | TO şimdi → önceki | Konum şimdi → önceki | Yorum |
|---|---:|---:|---:|---:|---|
| Özdemir 7 gün | 52 → 23 | 4.390 → 4.840 | %1,2 → %0,5 | 12,7 → 14,4 | Kısa vadeli toparlanma; hacim hâlâ düşük |
| Özdemir 14 gün | 75 → 77 | 9.240 → 10.100 | %0,8 → %0,8 | 13,6 → 13,0 | STABLE/WATCH |
| Özdemir 28 gün | 152 → 250 | 19.300 → 54.900 | %0,8 → %0,5 | 13,3 → 11,5 | **DECLINING**; ana alarm |
| Özdemir 90 gün | 859 | 136.000 | %0,6 | 10,5 | Tam 6 Haziran–3 Eylül baseline |
| Akif 7 gün | 5 → 3 | 643 → 716 | %0,8 → %0,4 | 8,8 → 6,8 | WATCH; tıklama artarken konum geriledi |
| Akif 14 gün | 8 → 14 | 1.360 → 1.950 | %0,6 → %0,7 | 7,7 → 3,4 | **DECLINING** |
| Akif 28 gün | 22 → 13 | 3.310 → 2.520 | %0,7 → %0,5 | 5,2 → 3,4 | Hacim büyüyor; konum riski var |
| Akif 90 gün isteği | 35 | 5.820 | %0,6 | 4,4 | Mülkte veri 23 Temmuz'da başladığı için 43 günlük kısmi baseline |

Konumda daha düşük sayı daha iyidir. Yüzdeler: Özdemir 28 günde tıklama −%39,2, gösterim −%64,8; Akif 14 günde tıklama −%42,9, gösterim −%30,3 ve konum 4,3 sıra kötüleşti.

### Güçlü sorgular, fırsatlar ve sayfa sahipliği

Özdemir'in gerçek 90 günlük en güçlü sorguları: `özdemir nakliyat ankara` (39 tıklama, 117 gösterim, konum 1,3), `ankara özdemir nakliyat` (38/148/1,3), `özdemir nakliyat` (16/334/2,6), `ankara evden eve nakliyat` (14/5.769/4,9) ve `çankaya evden eve nakliyat` (11/1.708/10,4). Akif'in mevcut veri aralığındaki en güçlü sorguları: `gölbaşı evden eve nakliyat` (2/328/1,3), `çayyolu nakliyat` (2/217/2,3), `ankara evden eve nakliyat` (1/871/6,8), `etimesgut evden eve nakliyat` (1/211/1,4) ve `çayyolu evden eve nakliyat` (1/167/1,7).

İlk doğrulanmış 4–20 fırsatları:

- Özdemir: `ankara evden eve nakliyat` 4,9; `kahramankazan evden eve nakliyat` 8,7; `etimesgut evden eve nakliyat` 9,5; `çankaya evden eve nakliyat` 10,4; `asansörlü nakliyat` 10,5; `ankara izmir nakliye` 11,3; `etimesgut nakliyat` 17,8.
- Akif: `evden eve nakliyat` 4,6; `ankara evden eve nakliyat` 6,8; `evden eve nakliyat ankara` 9,0.

`ankara evden eve nakliyat` sorgusunda iki domain de görünüyor; ancak net owner sinyali Özdemir ana sayfasında. Özdemir ana sayfası 13 tıklama, 5.667 gösterim ve 3,7 konumla sorgu trafiğinin neredeyse tamamını alıyor; aynı domainde sorguyla eşleşen toplam 12 URL var. Bu ana sayfa **PROTECTED** olmalı. Akif'te aynı sorgu 1 tıklama, 871 gösterim ve 6,8 konumla yalnızca ana sayfada anlamlı hacim üretiyor; diğer iki URL'nin toplam iki gösterimi var. İki site arasında bu sorgunun öncelikli owner'ı şimdilik **Özdemir ana sayfası** olarak belirlenmiştir.

Özdemir'in 28 günlük ana sorgu gösterimi 2.029'dan 1.056'ya düştü. Akif'te GSC ayrıca `gölbaşı evden eve nakliyat` için 20–26 Ağustos'ta önceki haftaya göre %97 gösterim kaybı uyarısı verdi; 28 günlük tabloda da gösterim 228'den 100'e indi. Bunlar ilk düşüş teşhis kuyruğudur.

Arayüzde görülen tüm metrikler `gsc-ui-snapshot.json` dosyasına kaydedildi. Yerel ortamda iki hesabın tam Search Console OAuth/service-account kimliği yok; bu yüzden bütün sorguları, bütün sayfa+sorgu çiftlerini ve URL Inspection sonuçlarını otomatik dışa aktarmak henüz mümkün değil.

Hazırlanan `seo-gsc-report.mjs` bağlandıktan sonra şunları üretir:

- 7 gün / önceki 7, 14 / önceki 14, 28 / önceki 28 ve 90 günlük baseline;
- URL + sorgu düzeyinde clicks, impressions, CTR, average position;
- `WINNING`, `GROWING`, `STABLE`, `WATCH`, `DECLINING`, `CRITICAL` durumları;
- en hızlı düşen 20 sorgu, 4–20 pozisyonundaki 20 fırsat ve iki site ortak sorguları;
- istenirse 1.464 URL'nin URL Inspection index/canonical/crawl durumu.

Google, Search Analytics API'de sayfa/sorgu satırlarının iç sınırlamalar nedeniyle eksik olabileceğini ve en çok 25.000 satır döndürüldüğünü belirtiyor; çıktı bu sınırı raporlar. Kaynak: [Google Search Analytics API](https://developers.google.com/webmaster-tools/v1/searchanalytics/query) ve [URL Inspection API](https://developers.google.com/webmaster-tools/v1/urlInspection.index/inspect).

Arayüz ilk görünür satırlardaki güçlü sorguları, ilk düşüşleri ve ilk 4–20 fırsatlarını doğruladı. Tam “ilk 20” listeleri ile 1.464 URL'nin durum matrisi API dışa aktarımına kadar kısmi kabul edilmelidir.

## 5. Gerçek SERP ve rakip istihbaratı

Tek seferlik canlı Google doğrulaması `Ankara evden eve nakliyat` sorgusunda `hl=tr`, `gl=tr`, `pws=0` ve IP tabanlı `06980, Ankara` konumuyla yapıldı. Google “Sonuçlar kişiselleştirilmemiş” mesajı gösterdi. Bu masaüstü snapshot'tır; mobil sağlayıcı geçmişi değildir.

İlk organik görünüm:

1. Sahibinden
2. Armut
3. [Anadolu Nakliyat](https://www.anadolunakliyat.gen.tr/)
4. Instagram/Europatrans
5. [Ankara Evden Eve Nakliyat](https://www.ankaraevdenevenakliyat.com.tr/)
6. [ProTrans](https://www.protrans.com.tr/)
7. [Deha Nakliyat](https://www.dehanakliyat.com.tr/)
8. Yandex yerel profil
9. Facebook

İki sitemiz de bu snapshot'ta ilk 10 organik sonuçta ve üçlü yerel pakette görünmedi. Bu tek sorgudan “genel sıralama” sonucu çıkarılmamalıdır.

Gerçek organik ve yakın ticari SERP'lerden 10 sayfalık teknik snapshot alındı. Öne çıkan nedenler:

| Rakip | İçerik/bağlantı gözlemi | Güçlü taraf |
|---|---|---|
| Anadolu | 1.212 kelime, güncel fiyat tablosu, adım adım süreç, Ankara ilçe koşulları, FAQ, MovingCompany | Tek sayfada yerel + ticari + bilgilendirici niyeti karşılıyor |
| ProTrans | 3.023 kelime, 34 iç link, hizmet ve çok şehir mimarisi | Uzun dönem konu/marka otoritesi ve derin hizmet ağı |
| Deha | 1.570 kelime, 47 iç link, FAQ/LocalBusiness/AggregateRating şemaları | Fiyat, süreç, yerel bölgeler ve güven sinyallerini birlikte sunuyor |
| Ankara Evden Eve Nakliyat | 804 kelime, 45 iç link, hizmet/blog/referans ağı | Eski marka anlatısı ve geniş servis navigasyonu; fakat alınan HTML'de açık H1/schema zayıf |
| Exper | 1.026 kelime, 27 iç link, hizmet silosu, yorumlar, form | Net Ankara hizmet mimarisi ve dönüşüm öğeleri |
| Otaş | 2.648 kelime, 66 iç link, fiyat/FAQ/ilçe/tayin/depoma konuları | Çok güçlü konu kapsamı ve yerel niyet eşlemesi |

GSC alan CWV verisinde Özdemir mobil için 0 iyi, 56 iyileştirme gerektiren, 0 kötü URL grubu gösteriyor; masaüstünde veri yok. Akif'te mobil ve masaüstü alan verisi yok. PageSpeed public API kotası HTTP 429 döndürdü. `fetchMs` tek seferlik yanıt süreleri `competitor-snapshot.csv` içinde tutuldu, fakat bunlar Core Web Vitals olarak sunulmadı.

Mobil Ankara SERP takibi için `seo-serp-report.mjs` hazır. SerpApi'nin `location`, `gl`, `hl` ve `device=mobile` parametreleri kullanılacak; anahtar olmadığı için ücretli istek çalıştırılmadı. Kaynak: [SerpApi Google Search API](https://serpapi.com/search-api).

## 6. SERP war room

İlk war-room kaydı `serp-war-room.csv` içinde. Tek seferlik gerçek Google masaüstü Ankara sorgusunda iki marka da ilk 10 dışında; GSC ise sorgu ortalamalarını Özdemir için 4,9, Akif için 6,8 gösteriyor. Bu fark çelişki değildir: GSC 90/kısmi dönem ortalamasıdır; manuel SERP yalnızca 5 Eylül anlık masaüstü snapshot'ıdır. Canlı anlık durum gerileme sinyali olarak ele alınmalıdır.

Rakiplerin görülen avantajı: platform otoritesi ve yorum hacmi; gerçek yerel detay; güncel fiyat bilgisi; süreç açıklaması; adres/telefon/belge gibi güven öğeleri; FAQ ve LocalBusiness/MovingCompany şeması. Bizde eksik olanın “daha fazla sayfa” olmadığı açık: önce gerçek GSC sorgusu, ideal owner sayfa ve doğrulanabilir işletme kanıtı gerekiyor.

## 7. İki site kanibalizasyonu

- İki sitede **118 aynı pathname/intent çifti** var.
- On-page title/body ölçümünde **71 çift aynı sorgu niyetine güçlü aday**.
- Çakışan aileler: ana sayfa, `/evden-eve-nakliyat`, hizmet sayfaları ve aynı Ankara ilçe + hizmet URL'leri.
- Aynı veya çok yakın güven/yerel metinleri iki markada da kullanılıyor; örneğin bazı Mamak ve Yenimahalle cümleleri 37 sayfaya yayılmış.
- İlk gerçek ortak sorgu doğrulandı: `ankara evden eve nakliyat`. Özdemir 14 tıklama/5.769 gösterim/4,9; Akif 1/871/6,8. Özdemir ana sayfası bu sorgu için öncelikli owner, Akif ana sayfası ikincil rakip konumundadır.
- Diğer 70 on-page çakışma adayının gerçek sorgu ve ideal owner kararı tam GSC API matrisi gelene kadar verilmedi. `cross-site-overlap.json` bu aday listesidir.

İki marka aynı metin şablonuyla büyütülmemeli. Sonraki karar, sorgu bazında birincil owner seçip diğer markayı farklı hizmet/konum/marka kanıtı ekseninde konumlandırmaktır.

## 8. İlk yapılması gereken 20 SEO aksiyonu

1. Mevcut mülkleri koru; duplicate property ekleme. Doğru eşleşme: Özdemir → `mehmetkaratasbey4@gmail.com`, Akif → `k.suleymanks@gmail.com`.
2. Her hesap için ayrı Search Console read-only OAuth/API bağlantısını oluştur; arayüzde alınan 7/14/28/90 baseline'ı tam sorgu+sayfa dışa aktarımıyla tamamla.
3. 1.464 URL için URL Inspection çalıştır; indexed, discovered, crawled-not-indexed ve canonical farklarını kaydet.
4. SerpApi anahtarını güvenli `.env.seo.local` dosyasına bağla; Ankara/Türkiye/Türkçe mobil ilk baseline'ı al.
5. 10 çekirdek sorguyu, Google ilgili aramalarını ve GSC sorgularını birleştirerek anahtar kelime kümesini genişlet; günlük/haftalık history başlat.
6. Özdemir ana sayfasını `ankara evden eve nakliyat` sorgusu için hemen `PROTECTED` işaretle; diğer 1–3 sorgularında page breakdown alıp koruma listesini genişlet.
7. Akif şehir sayfalarındaki rastgele 100 etiket bloğunu kaldırma önerisini önce GSC/index verisiyle doğrula; ardından tek kontrollü deployment olarak uygula.
8. 4.9 puan, 10.000+/10K+, 15+ yıl, 10+ araç, K3, HDI, Allianz, AXA, ISO ve benzeri iddialar için işletme kanıt paketi iste.
9. Kanıtlanamayan şirket iddialarını sayfa ailesi bazında küçük partiler halinde kaldır; her parti öncesi/sonrası sorgu metriğini kaydet.
10. Özdemir `/makaleler` içindeki 120 MERGE adayını GSC trafiği ve backlink sinyaliyle eşleştir; sıfır değerli olanları tek güçlü rehbere yönlendirme planına al.
11. Akif Ankara ilçe+hizmet içindeki 40 MERGE adayını gerçek ilçe bilgisi yoksa konsolide et; güçlü sorgusu olanı koru.
12. Akif İstanbul ilçe+hizmet içindeki 60 MERGE adayını ayrı değerlendir; Ankara markasının gerçek İstanbul hizmet/operasyon kanıtı yoksa kapsamı daralt.
13. 241 doorway adayını kullanıcı değeri, yerel operasyon kanıtı ve sorgu talebine göre sırala; otomatik noindex uygulama.
14. 408 ince sayfada “kelime ekleme” yapma; gerekli olmayanları birleştir, gerekli olanlara gerçek süreç/fiyat/erişim/yerel kısıt bilgisi ekle.
15. 71 potansiyel iki-site niyet çakışmasında ideal owner belirle; owner olmayan sayfanın açısını marka/hizmet düzeyinde farklılaştır.
16. İlk 4–20 fırsat listesi geldikten sonra yalnız bu URL'lerde title/snippet, intent ve iç link boşluklarını test et.
17. Rakiplerin güçlü taraflarını kopyalamadan; doğrulanabilir fiyat hesaplama kriteri, taşıma kontrol listesi, gerçek operasyon görseli, poliçe/belge açıklaması ve yerel süreç kanıtı üret.
18. Local Pack için iki markanın Google Business Profile NAP, kategori, hizmet alanı, yorum ve landing-page tutarlılığını ayrı ayrı denetle.
19. Her düşüşte `ranking-drop-engine.md` sırasını uygula; probable cause ve confidence olmadan title/içerik değiştirme.
20. Her değişikliği `seo-change-log.csv` içine kaydet; 7 ve 28 gün sonra sonucu ölç, başarısız hipotezi geri al veya yeniden kur.

## 9. Üretilen kanıt dosyaları

- `summary.json`: ana sayımlar ve metodoloji
- `url-quality.csv` / `.json`: 1.464 URL sınıflandırması
- `production-diff.json`: generated–production eşleşmesi
- `claims.json`: source/generated/live iddia envanteri
- `cross-site-overlap.json`: 118 aynı niyet/path çifti
- `manual-google-serp.json`: canlı Google snapshot'ı
- `gsc-ui-snapshot.json`: iki mülkün gerçek 7/14/28/90 metrikleri, ilk sorgular ve ana sorgu sayfa sahipliği
- `competitor-snapshot.csv` / `.json`: 10 rakip sayfa ölçümü
- `serp-war-room.csv`: ilk karar masası
- `ranking-drop-engine.md`: düşüş teşhis akışı
- `seo-change-log.csv`: kanıt/etki/risk/ölçüm kaydı

## Karar

Toplu SEO değişikliği için henüz yeşil ışık yok. Search Console mülkleri ve ilk `PROTECTED`/owner kararı artık doğrulandı; fakat 28 günlük sert hacim değişimleri nedeniyle önce tam API matrisi ve Ankara/Türkiye/Türkçe mobil SERP baseline'ı tamamlanmalı. Şimdilik yalnızca Özdemir ana sayfası koruma altına alınmalı; 333 MERGE adayı, 241 doorway adayı ve rastgele etiket bloğu toplu biçimde değiştirilmemelidir.
