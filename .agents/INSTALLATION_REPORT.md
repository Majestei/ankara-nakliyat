# Antigravity SEO Team kurulum raporu

6 Eylül 2026 — iki siteye kurulum tamamlandı. Search Console entegrasyonu Google hesabı/proje yetkilendirme adımına kadar hazırlandı; API verileri henüz alınamıyor.

## Kurulum yerleri

- Ankara Özdemir Nakliyat: C:\Users\suley\Desktop\Projeler\Nakliye\.agents
- Akif Nakliyat: C:\Users\suley\Desktop\Projeler\Nakliyev5\Nakliye\.agents
- Nakliyev5 üst klasöründe .agents bağlantısı aynı Akif kurulumunu gösteriyor. Böylece üst klasör açıldığında da keşif yolu bulunuyor. Site build komutları içteki Nakliye klasöründe çalıştırılmalı.

Her sitede önceki ZIP paketinin 5 ajanı ve 5 skill'i kuruldu:

- seo-orchestrator: denetim, uzman koordinasyonu ve sonuç doğrulaması.
- technical-seo: taranabilirlik, canonical, robots, sitemap, yönlendirme ve schema.
- local-seo: firma kimliği, hizmet bölgeleri ve yerel içerik doğruluğu.
- content-seo: arama niyeti, sorgu/sayfa ilişkisi ve içerik önerileri.
- performance-seo: build, tarayıcı kontrolleri ve Lighthouse.

SEO_PROJECT_CONTEXT.md iki firma için ayrı dolduruldu. Telefon/e-posta/domain gibi kaynakta gözlenen değerler kaynaklarıyla belirtildi; bunların bağımsız işletme teyidi olmadığı açıklandı. Adres, sigorta, kuruluş yılı, sertifika, puan ve hizmet kapsamı gibi doğrulanamayan alanlar UNKNOWN veya teyit bekleyen olarak işaretlendi.

START_SEO_AUDIT.txt, INTEGRATION.md, siteye özel seo.config.json ve çalıştırılabilir SEO araçları eklendi. Kimlik dosyaları mevcut konumlarında kaldı. Yerel kimlik ayarları, raporlar ve araç bağımlılıkları Git dışında tutuluyor.

## Keşif doğrulaması

Her iki kurulumda .agents/agents/<name>/agent.md ve .agents/skills/<name>/SKILL.md yolları, YAML alanları, ajan rolleri, skill bağlantıları ve gizli/yerel dosya dışlamaları PASS.
10 skill'in tamamı skill-creator quick_validate.py denetiminden geçti. Antigravity 2.12.2 kurulu olduğu gözlendi.
Antigravity'nin kendi /agents arayüzünde listeleme bu oturumda kontrol edilemedi; yapısal doğrulama ile uygulama içi doğrulama birbirinden ayrıdır.
Resmî keşif biçimi: [Antigravity ajan belgeleri](https://antigravity.google/docs/subagents/), [skill belgeleri](https://antigravity.google/docs/skills/).

## Çalıştırılan kontroller

| Site | Production build | Araç testleri | Mobil tarayıcı kontrolleri | Robots/sitemap/404/redirect | Search Console |
| --- | --- | --- | --- | --- | --- |
| Ankara Özdemir Nakliyat | PASS — 993 sayfa | 5/5 test | 5/6 sayfa | 5/5 | SERVICE_DISABLED |
| Akif Nakliyat | PASS — 507 sayfa | 5/5 test | 6/6 sayfa | 4/4 | USER_PROJECT_DENIED |


Araç testleri 25.000 satırdan sonra sayfalama, veri sınırında eksik veri işareti, boş verinin korunması, OAuth hatalarında gizli bilgilerin saklanması ve tarih karşılaştırmasını kapsar.
Tarayıcı kontrolü başlık, açıklama, canonical, robots, H1, JSON-LD sözdizimi, iç bağlantılar, yatay taşma ve çalışma anı hatalarını inceler. Altı temsilî rota: ana sayfa, evden eve nakliyat, hizmetler, Sincan, blog ve iletişim.
Tam site taraması, gerçek form gönderimi, telefon/WhatsApp mesajı, canlı yayın ve bağımsız gerçek kullanıcı CWV ölçümü yapılmadı.

Kaynak dosyaları + root package.json/package-lock.json/next.config.js karşılaştırması: Özdemir 80/80, Akif 72/72 dosya birebir korundu. Önceden var olan kullanıcı değişiklikleri korunmuştur. Kurulum .agents dosyaları ve .gitignore ekleriyle sınırlıdır.
Build sırasında Akif projesinin mevcut ESM/module-type uyarısı görüldü; build başarılı tamamlandı. Ayrı bir lint yapılandırması oluşturulmadı. git diff --check geçti.

## Lighthouse ölçümleri

Yerel production sunucusu, Lighthouse 13.4.1; tek çalışma ölçümleri. Canlı CDN/DNS/sunucu gecikmesi ve saha INP/CWV sonucu değildir.

| Site | Sayfa | Cihaz | Performans | Erişilebilirlik | İyi uygulamalar | Lighthouse SEO |
| --- | --- | --- | ---: | ---: | ---: | ---: |
| Ankara Özdemir Nakliyat | / | mobile | 66 | 92 | 73 | 100 |
| Ankara Özdemir Nakliyat | / | desktop | 96 | 92 | 73 | 100 |
| Ankara Özdemir Nakliyat | /evden-eve-nakliyat | mobile | 75 | 92 | 73 | 100 |
| Ankara Özdemir Nakliyat | /evden-eve-nakliyat | desktop | 99 | 92 | 73 | 100 |
| Akif Nakliyat | / | mobile | 70 | 94 | 77 | 100 |
| Akif Nakliyat | / | desktop | 96 | 94 | 77 | 100 |
| Akif Nakliyat | /evden-eve-nakliyat/ | mobile | 68 | 96 | 77 | 100 |
| Akif Nakliyat | /evden-eve-nakliyat/ | desktop | 94 | 96 | 77 | 100 |


Lighthouse SEO=100 yalnız o aracın sınırlı teknik kontrolleridir; sitenin tüm SEO sorunlarının çözüldüğü veya sıralama garantisi anlamına gelmez. TBT, saha INP'sinin yerine kullanılamaz.
PageSpeed Insights her iki sitede HTTP 429 kota hatası verdi. Canlı PageSpeed puanı üretilmedi; araç engeli kaydedip durdu. Ham Lighthouse HTML/JSON çıktıları her sitenin .agents/reports klasöründe saklandı.

## Tespit edilen mevcut sorunlar

1. Özdemir /iletisim sayfasında React 418/423 görüntüleme/hydration hataları iki kez tekrarlandı. ContactClient.tsx:383 dış motion.a, 443–444 iç tel bağlantılarını sarıyor; iç içe bağlantılar olası nedendir. Kaynak bu kurulumdan önce de aynıydı. Diğer beş Özdemir sayfası ve altı Akif sayfası testten geçti.
2. Özdemir ContactClient.tsx içinde 4.9 puan / 1.250+ Google yorumu ve işletme doğrulama iddiaları sabit metin olarak bulunuyor. Bunların doğruluğu teyit edilmedi. Ajan bağlamına mevcut iddia/teyit kuyruğu olarak eklendi; yeni metin veya schema için kullanılmamalı.
3. İki sitede de eski sigorta/garanti/deneyim/kapsam iddiaları işletme kanıtıyla doğrulanmalı. Genel Ankara koordinatları gerçek işletme konumu sayılmamalı.
4. Mobil Lighthouse performansı iyileştirme alanı gösteriyor. Bunlar sonraki SEO denetiminin başlangıç ölçümleridir.

## Search Console için kalan adım

Her iki kayıtlı OAuth kimliği yenileniyor ve webmasters.readonly kapsamına sahip. Bağlantı aracı site kimliklerini ayrı kullanıyor; tokenları rapora yazmıyor.

- Özdemir: boxwood-atom-507718-b0 projesinde Search Console API etkinleştirilmeli.
- Akif: aynı projede serviceusage.services.use izni sağlanmalı (Service Usage Consumer) veya yetkili olduğu, API açık bir quota projesi seçilmeli.
- Google Cloud tarayıcı oturumu zorunlu iki adımlı doğrulama ekranında duruyor. Bu güvenlik adımını hesap sahibi tamamlamalı; ardından proje yetkilisi API/IAM ayarlarını tamamlayabilir.

[Search Console API ayarı](https://console.cloud.google.com/apis/library/searchconsole.googleapis.com?project=boxwood-atom-507718-b0) · [Proje izinleri](https://console.cloud.google.com/iam-admin/iam?project=boxwood-atom-507718-b0)

Yetkilendirme sonrası her sitenin gerçek proje kökünde:

~~~powershell
npm --prefix .agents/seo-tools run gsc:check
npm --prefix .agents/seo-tools run gsc:report
~~~

GSC raporu eşit 28 günlük iki dönem için mülk toplamı, tarih, sayfa, sorgu, sayfa+sorgu, cihaz ve ülke verisini alacak. Şu an bağlantı engeli nedeniyle bu veri aktarımı uçtan uca doğrulanmış değildir. API anonim sorgu/veri sınırları sonuçta açıkça belirtilir. [Google API referansı](https://developers.google.com/webmaster-tools/v1/searchanalytics/query)

## Kullanım

Antigravity'de istediğin site klasörünü aç, /agents içinden seo-orchestrator seç ve .agents/START_SEO_AUDIT.txt içeriğini gönder.
Akif için build/çalıştırma kökü Nakliyev5\Nakliye klasörüdür. Ayrıntılı komutlar ve bağlantı hazırlığı her sitede .agents/INTEGRATION.md içindedir.

Kurulum herhangi bir sıralama garantisi vermez ve kendiliğinden yeni periyodik görev başlatmaz. Var olan SEO görevleri çoğaltılmadı.
