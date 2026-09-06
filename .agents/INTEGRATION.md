# SEO Team — kullanım ve bağlantılar

Bu dizin önceki antigravity-seo-team.zip paketinden kuruldu. Site kodundan ve site bağımlılıklarından ayrı çalışır.
Komutları package.json bulunan site kökünde çalıştırın. Node >=22.19 ve Chrome gerekir.

## Keşif

Antigravity'de site kökünü açın. /agents menüsünde seo-orchestrator seçin; dört uzman subagent olarak kullanılabilir.
Dosyalar .agents/agents/<name>/agent.md ve .agents/skills/<name>/SKILL.md düzenindedir.
npm --prefix .agents/seo-tools run verify yapısal keşfi, YAML alanlarını ve skill bağlantılarını kontrol eder.
Bu kontrol Antigravity arayüzünde ajanların gerçekten listelendiğini kanıtlamaz; arayüz kontrolünü ayrı raporlayın.

## Komutlar

~~~powershell
npm --prefix .agents/seo-tools ci
npm --prefix .agents/seo-tools run verify
npm --prefix .agents/seo-tools test
npm --prefix .agents/seo-tools run gsc:check
npm --prefix .agents/seo-tools run gsc:report
npm run build
# Aşağıdaki portu seo.config.json içindeki localPort ile eşleştirin:
npm run start -- --hostname 127.0.0.1 --port 3101
# Ayrı terminalde:
npm --prefix .agents/seo-tools run smoke
npm --prefix .agents/seo-tools run lighthouse
npm --prefix .agents/seo-tools run pagespeed
~~~

smoke ve lighthouse varsayılan olarak yerel production sunucusunu kullanır; -- --live eklerseniz canlı siteyi ölçer.
pagespeed her zaman canlı origin'i Google'a gönderir. Özel yerel URL'ler gönderilmez.
Her komut .agents/reports/<UTC timestamp>/ altında kanıt kaydeder. Bu dizin ve yerel kimlik ayarları Git dışında tutulur.
Build/lint sırasında ESLint yapılandırma sorusu çıkarsa mevcut projede lint yapılandırılmamıştır; bunu PASS saymayın.
Build'in kendi TypeScript/lint sonucu ile ayrı lint komutunun durumunu karıştırmayın.

## Search Console

Google'ın resmî google-auth-library paketi kullanılır; kapsam webmasters.readonly olmalıdır.
Her site yalnız .agents/seo.local.json içindeki credentialsPath kimliğini kullanır. Başka siteye veya global ADC'ye otomatik geçiş yoktur.
Kimlik dosyaları var olan korumalı konumlarında kalır; token/refresh token çıktıya veya Git'e yazılmaz.
Yetki sınaması yalnız sites.list çağırır. Rapor yalnız Search Analytics okuma sorguları kullanır.
Yeni kimlik gerekiyorsa Google Cloud'da bu hesaba ait bir proje ve Desktop OAuth istemcisiyle read-only yetki oluşturun.
Mevcut kimlikler bu makinede token yenileyebiliyor; yeniden Google oturumu açmak ilk çözüm değildir.

İlk sınama (2026-09-06):
- Özdemir: boxwood-atom-507718-b0 projesinde Search Console API kapalı (SERVICE_DISABLED).
- Akif: aynı quota projesinde serviceusage.services.use izni yok (USER_PROJECT_DENIED).

Gerekli ayarlar:
1. Proje yetkilisi Search Console API'yi etkinleştirir:
   https://console.cloud.google.com/apis/library/searchconsole.googleapis.com?project=boxwood-atom-507718-b0
2. Akif kimliğinin o projeyi kullanmasına izin verilir (Service Usage Consumer rolü) veya Akif hesabının yetkili olduğu, API açık başka bir projenin kimliği .agents/seo.local.json içindeki quotaProjectId alanına yazılır.
   https://console.cloud.google.com/iam-admin/iam?project=boxwood-atom-507718-b0
3. gsc:check tekrar çalıştırılır. PROPERTY_ACCESS_REQUIRED çıkarsa Search Console mülkü için okuma erişimi ve seo.config.json içindeki birebir mülk kimliği kontrol edilir. URL-prefix ve sc-domain mülkleri birbirinin yerine varsayılmaz.
4. CONNECTED görüldükten sonra gsc:report çalıştırılır.

Rapor eşit 28 günlük iki dönem için toplam, tarih, sayfa, sorgu, sayfa+sorgu, cihaz ve ülke kırılımlarını ayrı alır.
Tarihler Pacific saatine göre, dataState=final ve son üç gün hariç hesaplanır. Her kırılım sayfalanır; 100.000 satır sınırına varılırsa paginationComplete=false yazılır.
API üst satırları döndürür ve anonim sorguları gizler. Sorgu toplamlarını mülk toplamı gibi kullanmayın; satır yokluğu sıfır talep kanıtı değildir.
Ortalama konum canlı SERP sırası değildir. Aynı sorguda iki sayfa görünmesi tek başına cannibalization kanıtı değildir.
Toplu URL Inspection ve index kaldırma bu araçların parçası değildir.

## Lighthouse / PageSpeed

Mobil ve masaüstü; ana sayfa ve ana hizmet sayfası ölçülür. Ham JSON, HTML ve özet saklanır.
Lighthouse bir laboratuvar ölçümüdür. TBT, gerçek kullanıcı INP'si değildir. CWV/INP için CrUX API veya Search Console saha verisini ayrıca kullanın.
Yerel Lighthouse, canlı sunucu/CDN/DNS hızını ölçmez. Skor eşiği geçilmesi sıralama veya saha CWV başarısı anlamına gelmez.
PageSpeed 429/403 dönerse ölçülmedi olarak raporlanır ve aynı çalışmada tekrar yük bindirilmez.
Gerekirse PAGESPEED_API_KEY ortam değişkenini kullanın; anahtarı tarayıcı/site koduna koymayın.
Telefon, WhatsApp, form, mobil menü ve gerçek dönüşüm akışları korunmalıdır; test sırasında form göndermeyin veya müşteri araması başlatmayın.

## Resmî kaynaklar (2026-09-06 kontrolü)

- https://antigravity.google/docs/subagents/
- https://antigravity.google/docs/skills/
- https://developers.google.com/webmaster-tools/v1/how-tos/authorizing
- https://developers.google.com/webmaster-tools/v1/searchanalytics/query
- https://developers.google.com/identity/protocols/oauth2/native-app
- https://developers.google.com/speed/docs/insights/v5/get-started
- https://developer.chrome.com/docs/lighthouse/overview

## Google Cloud tarayıcı erişimi
2026-09-06 tarihinde mevcut tarayıcı oturumu Google Cloud tarafından zorunlu iki adımlı doğrulama (2SV/MFA) kurulumu ekranına yönlendirildi. Hesap sahibi bu güvenlik adımını kendisi tamamlamalıdır. Bu engel API/IAM hata nedenlerinden ayrıdır; ardından yukarıdaki proje ayarları tamamlanmalıdır.
