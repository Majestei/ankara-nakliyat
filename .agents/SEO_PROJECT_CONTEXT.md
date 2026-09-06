# SEO Project Context — Ankara Özdemir Nakliyat

İnceleme tarihi: 2026-09-06. Proje kökü: C:/Users/suley/Desktop/Projeler/Nakliye

## Kanıt durumları

SOURCE_OBSERVED: mevcut kodda/site yapılandırmasında görüldü; bağımsız işletme teyidi anlamına gelmez.
VERIFIED: işletmenin güvenilir belgesi veya açık teyidi ile doğrulanmıştır. Bu kurulumda yeni işletme teyidi alınmadı.
UNKNOWN: bilinmiyor; tahmin etmeyin, yeni metin veya schema içinde gerçekmiş gibi yayınlamayın.
Kaynak kodda bir iddia bulunması, iddiayı doğrulanmış yapmaz. Eski pazarlama metinleri aşağıdaki kuralları aşamaz.

## Projede gözlenen kimlik

| Alan | Değer | Kanıt / durum |
| --- | --- | --- |
| Ticari site adı | Ankara Özdemir Nakliyat | src/data/siteData.ts; SOURCE_OBSERVED |
| Resmî ticaret sicil unvanı | UNKNOWN | İşletme teyidi yok |
| Domain / canonical origin | https://ankaraozdemirnakliyat.com | src/app/layout.tsx, src/app/sitemap.ts, next.config.js |
| Telefon | 0545 656 81 03 | src/data/siteData.ts; SOURCE_OBSERVED |
| İkinci telefon | 0541 878 78 60 | src/data/siteData.ts; SOURCE_OBSERVED/UNKNOWN |
| E-posta | bilgi@ankaraozdemirnakliyat.com | src/data/siteData.ts; SOURCE_OBSERVED |
| Adres | Atatürk Mahallesi Mithatpaşa Caddesi, Özmert Apartmanı No: 6/8 (kaynakta yazılı; işletme tarafından doğrulanmadı) | src/data/siteData.ts:267; Sincan/Ankara alanları src/app/layout.tsx |
| Şehir | Ankara | Site kimliği, mevcut Ankara rota yapısı; SOURCE_OBSERVED |
| İşletme türü | Nakliyat / MovingCompany | src/app/layout.tsx; SOURCE_OBSERVED |
| Çalışma saatleri | Pazartesi–Cumartesi 07:00–21:00; Pazar 09:00–18:00 | src/data/siteData.ts; SOURCE_OBSERVED, işletme teyidi yok |

## Hizmetler ve gerçek kapsam

Mevcut hizmet içeriği: evden eve nakliyat, şehir içi/şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, paketleme, parça eşya taşıma.
Kaynaklar: src/data/siteData.ts, src/app/hizmetler, src/app/evden-eve-nakliyat. Bunlar SOURCE_OBSERVED hizmet başlıklarıdır.
Depolama ve uluslararası taşımacılık sayfaları da var; operasyonel kapsam teyidi UNKNOWN.
Gerçekte hizmet verilen il/ilçe/mahalle listesi: UNKNOWN. Mevcut konum rotaları hizmet kanıtı değildir.
Ankara/Sincan sayfası sadece temsilî teknik test örneğidir; o ilçede teyitli faaliyet iddiası oluşturmaz.
Hizmet verilmeyen bölgeler ve sunulmayan hizmetler: UNKNOWN.

## Güven bilgileri

Kuruluş yılı, sektörde yıl, araç/çalışan/müşteri sayısı: UNKNOWN.
Yorum kaynakları/izinleri, Google puanı ve yorum sayısı: UNKNOWN.
Sigorta poliçesi/kapsamı, yetki belgesi, sertifikalar, ödüller, ortaklıklar: UNKNOWN.
Google Business Profile doğrulanmış bağlantısı: UNKNOWN.
Kodda geçen 39.9208,32.8541 genel Ankara koordinatını gerçek işletme konumu kabul etmeyin.
Eski metinlerde geçen sıfır risk, yıllık deneyim, sigortalı/garantili taşıma iddialarını doğrulanmış kabul etmeyin.
Sahte yorum, puan, AggregateRating, sertifika veya rakamsal başarı üretmeyin; iki firmanın bilgilerini birbirine taşımayın.

## Dönüşüm ve SEO odağı

Gözlenen dönüşüm yolları: telefon, WhatsApp ve teklif/iletişim arayüzü. Form gönderme ve müşteri araması test kapsamında otomatik yapılmaz.
Ticari ana konu: Ankara evden eve nakliyat (içerikten çıkarım; arama hacmi/sıralama kanıtı değildir).
Öncelikli URL'ler: /, /evden-eve-nakliyat, /hizmetler, /islemler/ankara/sincan, /blog, /iletisim.
Yeni ilçe sayfası üretmeden, URL birleştirmeden veya toplu noindex uygulamadan gerçek GSC verisi ve sayfa değerini birlikte değerlendirin.

## Teknik yapı

Next.js 14 App Router, React 18, TypeScript, Tailwind; statik üretim ve istemci bileşenleri birlikte kullanılıyor.
Build: npm run build. Sunucu: npm run start -- --hostname 127.0.0.1 --port 3101.
Metadata: src/app/layout.tsx ve sayfa metadata alanları. Sitemap: src/app/sitemap.ts.
Robots: public/robots.txt.
Trailing slash: false; canonical/redirect kurallarını next.config.js ve mevcut middleware ile birlikte koruyun.
Hosting: .vercel bağlantısı ve vercel.json gözlendi; dağıtım yetkisi bu dosyadan çıkarılamaz.
Analitik: Google etiketleri mevcut; GA4 mülkü ve dönüşüm doğruluğu UNKNOWN. Kaynak: src/app/layout.tsx, src/lib/gtag.ts varsa.
Search Console mülkü: https://ankaraozdemirnakliyat.com/; kimlik yenileme çalışıyor, API/IAM engeli INTEGRATION.md içinde.
GSC HTML doğrulama etiketi API erişimi sağlamaz. İçe aktarılan eski ekran özetleri canlı API raporu değildir.

## Çalışma sınırları

Önce git status ve mevcut kullanıcı değişikliklerini inceleyin. Raporları .agents/reports altında tutun.
Yalnız bu site kökünde çalışın; diğer sitedeki scriptleri istemsiz tetiklemeyin.
Özdemir kökündeki eski seo:audit ve seo:stage2 komutları iki siteyi birlikte ele alabilir; bu kurulumun araçları site bazındadır.
Yeni otomasyon veya canlı dağıtım bu kurulumun parçası değildir. Var olan zamanlanmış işleri çoğaltmayın.
Testi çalıştırmadan PASS yazmayın. API engeli ve NOT_TESTED kontrolleri açıkça ayrı raporlayın.
Bağlantı/ölçüm komutları için INTEGRATION.md dosyasını okuyun.

## Kurulum sırasında tespit edilen eski iddialar
ContactClient.tsx:384 içinde https://maps.app.goo.gl/7soWnTCHGLBfguVt9 bağlantısı var (SOURCE_OBSERVED; hedef işletme bağımsız doğrulanmadı). Aynı dosyada 4.9 puan ve 1.250+ Google yorumu sabit metin olarak yazıyor. Bu değerler doğrulanmış değildir; yeni içerik ve schema için kullanmayın. İşletme teyidi/kanıt veya içerik temizliği gerekir.
İletişim sayfasında React 418/423 hataları tekrarlandı. ContactClient.tsx:383 dış motion.a, 443–444 iç tel bağlantılarını sarıyor; iç içe bağlantılar olası HTML/hydration nedenidir. Kaynak bu kurulumdan önce de aynıydı.
