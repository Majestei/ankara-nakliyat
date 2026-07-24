# 🚀 ANKARA NAKLİYAT - SEO UÇURMA STRATEJİSİ

## 📊 MEVCUT DURUM ANALİZİ

### ✅ Zaten Yapılanlar
- 130+ benzersiz sayfa (25 Ankara ilçesi + 81 il + 20 blog + sabit sayfalar)
- JSON-LD MovingCompany schema markup
- Otomatik sitemap.xml ve robots.txt
- Dinamik meta tags (title, description, keywords)
- Canonical URL'ler
- Open Graph ve Twitter Cards
- Her sayfada anahtar kelime yoğunluğu

### ❌ Eksikler ve Yapılması Gerekenler
Aşağıda sıralanan adımlar uygulandığında Google'da nakliyat ile ilgili her aramada üst sıralarda çıkma potansiyeli dramatik şekilde artacaktır.

---

## 🎯 FAZA 1: TEKNİK SEO GÜÇLENDİRME

### 1.1 Gelişmiş Schema Markup
Mevcut JSON-LD'ye ek olarak şu schema'lar eklenecek:

- **FAQPage Schema** → SSS bölümü için (Google arama sonuçlarında FAQ snippet'i gösterir)
- **BreadcrumbList Schema** → İlçe ve şehir sayfalarında breadcrumb
- **LocalBusiness Schema** → Ankara bazlı yerel iş
- **Service Schema** → Her hizmet için ayrı servis schema'sı
- **Review/AggregateRating Schema** → Müşteri yorumları için
- **Article Schema** → Blog yazıları için

**Dosyalar:** `src/app/layout.tsx`, `src/app/page.tsx`, her sayfa için ayrı JSON-LD

### 1.2 Core Web Vitals Optimizasyonu
- Next.js Image optimize (lazy loading, blur placeholder)
- Font optimizasyonu (next/font kullanımı)
- CSS purge ve minification
- JavaScript bundle analizi ve splitting
- Server-side rendering (SSR) vs Static Site Generation (SSG) optimizasyonu

**Dosyalar:** `next.config.js`, `src/app/layout.tsx`

### 1.3 Sayfa Hızı
- Resimleri WebP/AVIF formatına çevirme
- Critical CSS inline
- Preconnect/Prefetch linkler
- Lazy load bileşenler (dynamic import)

---

## 🎯 FAZA 2: MEGA İÇERİK STRATEJİSİ

### 2.1 Blog İçerik Patlaması (500-800 Blog Yazısı)

Her blog yazısı farklı anahtar kelimeleri hedefleyecek. Kategoriler:

#### A) Ankara İlçe Bazlı Blog Yazıları (25 ilçe × 8 konu = 200 yazı)
Her ilçe için:
1. `{ilce} evden eve nakliyat rehberi`
2. `{ilce} nakliyat fiyatları 2024`
3. `{ilce} en iyi nakliyat firmaları`
4. `{ilce} taşınma ipuçları`
5. `{ilce} ofis taşıma rehberi`
6. `{ilce} asansörlü nakliyat`
7. `{ilce}'dan şehir dışı nakliyat`
8. `{ilce} ucuz nakliyat`

#### B) Şehirler Arası Blog Yazıları (81 il × 3 konu = 243 yazı)
Her il için:
1. `Ankara {il} arası nakliyat rehberi`
2. `Ankara {il} nakliyat fiyatları`
3. `{il} evden eve nakliyat`

#### C) Genel Nakliyat Rehberleri (50+ yazı)
- "Evden eve nakliyat nasıl yapılır?"
- "Nakliyat sigortası nedir?"
- "Taşınırken dikkat edilmesi gerekenler"
- "Eşya paketleme teknikleri"
- "Nakliyat firması nasıl seçilir?"
- "Ofis taşıma kontrol listesi"
- "Piyano taşıma rehberi"
- "Beyaz eşya taşıma ipuçları"
- "Antika eşya taşıma"
- vs.

#### D) Mevsimsel ve Güncel İçerikler (30+ yazı)
- "2024 nakliyat fiyatları ne kadar?"
- "Yaz aylarında taşınma ipuçları"
- "Kış aylarında nakliyat"
- "Bayram döneminde taşınma"

### 2.2 İlçe Alt Sayfaları Genişletme
Her ilçe sayfasına alt sayfalar eklenecek:
- `/islemler/ankara/cankaya/evden-eve-nakliyat`
- `/islemler/ankara/cankaya/ofis-tasima`
- `/islemler/ankara/cankaya/nakliyat-fiyatlari`

Bu, 25 ilçe × 3 alt sayfa = **75 ek sayfa** demek.

---

## 🎯 FAZA 3: ON-PAGE SEO OPTİMİZASYONU

### 3.1 Internal Linking (İç Bağlantı) Stratejisi
- Her blog yazısından ilgili hizmet sayfasına link
- Her ilçe sayfasından komşu ilçe sayfalarına link
- Her şehir sayfasından blog yazılarına link
- Footer'da en önemli 20 sayfa linki
- "İlgili Yazılar" bölümü (her blog yazısında)
- Breadcrumb navigasyonu (tüm sayfalarda)

### 3.2 Anahtar Kelime Optimizasyonu
Her sayfada hedeflenen:
- **H1**: Tek ve benzersiz, ana anahtar kelime içerir
- **H2-H3**: Uzun kuyruk anahtar kelimeler
- **Meta Title**: 50-60 karakter, anahtar kelime başta
- **Meta Description**: 150-160 karakter, CTA içerir
- **URL yapısı**: Kısa, Türkçe karakter içermeyen slug
- **Alt text**: Tüm resimlerde açıklayıcı alt text
- **İlk paragraf**: Ana anahtar kelime ilk 100 kelimede

### 3.3 İçerik Kalitesi
- Minimum 800 kelime (blog yazıları)
- Minimum 500 kelime (hizmet sayfaları)
- Minimum 300 kelime (ilçe/şehir sayfaları)
- Benzersiz içerik (duplicate content yok)
- LSI anahtar kelimeler kullanımı

---

## 🎯 FAZA 4: OFF-PAGE SEO

### 4.1 Google İş Kaydı
- Google Business Profile oluşturma
- NAP tutarlılığı (İsim, Adres, Telefon)
- Google Maps'e işaretleme
- Müşteri yorumları toplama

### 4.2 Yerel Dizinler
- Yandex Maps kaydı
- Bing Places kaydı
- Türkiye yerel dizinler (rehber.com, ssk.gov.tr vb.)
- Sektörel dizinler (nakliyat portalleri)

### 4.3 Backlink Stratejisi
- Yerel basın ve haber siteleri
- İş ortaklıkları (emlak siteleri, taşıma şirketleri)
- Misafir blog yazıları
- Sosyal medya profilleri (Facebook, Instagram, LinkedIn)
- YouTube kanalı (nakliyat videoları)

---

## 🎯 FAZA 5: TEKNİK UYGULAMA DETAYLARI

### 5.1 Dosya Değişiklikleri

| Dosya | Değişiklik |
|-------|-----------|
| `src/app/layout.tsx` | FAQ Schema, BreadcrumbList Schema, LocalBusiness Schema ekleme |
| `src/app/page.tsx` | FAQPage JSON-LD, AggregateRating schema |
| `src/app/blog/[slug]/page.tsx` | Article Schema, BlogPosting JSON-LD |
| `src/app/hizmetler/page.tsx` | Service Schema her hizmet için |
| `src/app/islemler/ankara/[ilce]/page.tsx` | BreadcrumbList + LocalBusiness JSON-LD |
| `src/data/blogData.ts` | 500+ blog yazısı ekleme |
| `src/app/sitemap.ts` | Depolama sayfası kaldırma, yeni sayfalar ekleme |
| `next.config.js` | Performans header'ları, compression |
| `src/app/layout.tsx` | Google Analytics + Search Console meta tag |
| Yeni: `src/app/islemler/ankara/[ilce]/[hizmet]/page.tsx` | İlçe bazlı hizmet alt sayfaları |

### 5.2 Yeni Blog Yazısı Şablonu
Her blog yazısı şu yapıda olacak:
- SEO optimize edilmiş başlık
- 800+ kelime benzersiz içerik
- H2/H3 alt başlıklar
- İç linkler (ilgili hizmet ve ilçe sayfalarına)
- Anahtar kelime yoğunluğu (%2-3)
- CTA bölümü (telefon numarası)
- İlgili yazılar bölümü

---

## 📈 HEDEF ANAHTAR KELİMELER (Öncelik Sırası)

### Yüksek Öncelikli (Ana Hedefler)
1. ankara nakliyat
2. ankara evden eve nakliyat
3. evden eve nakliyat ankara
4. ankara nakliyat firmaları
5. ankara nakliyat fiyatları

### Orta Öncelikli (İlçe Bazlı)
6. çankaya nakliyat / çankaya evden eve nakliyat
7. keçiören nakliyat / keçiören evden eve nakliyat
8. yenimahalle nakliyat
9. etimesgut nakliyat
10. mamak nakliyat
11. sincan nakliyat
12. pursaklar nakliyat

### Uzun Kuyruk (Long Tail)
13. ankara istanbul nakliyat
14. ankara izmir nakliyat
15. ankara ofis taşıma
16. ankara asansörlü nakliyat
17. ankara nakliyat sigorta
18. ankara ucuz nakliyat
19. ankara güvenilir nakliyat firması

---

## 🔄 UYGULAMA ÖNCELİK SIRASI

```
1. Gelişmiş Schema Markup ekleme (hemen yapılabilir)
2. Blog yazılarını 500+ yapma (otomatik üretim)
3. İlçe alt sayfaları oluşturma (75 ek sayfa)
4. Internal linking sistemi kurma
5. Core Web Vitals optimizasyonu
6. Google Business Profile + Search Console
7. Backlink kampanyası başlatma
```

---

## 📊 BEKLENEN SONUÇLAR

| Süre | Beklenen Sonuç |
|------|---------------|
| 1. Ay | Google index'leme, 500+ sayfa taranır |
| 2-3. Ay | Uzun kuyruk anahtar kelimelerde ilk sayfa |
| 3-6. Ay | İlçe bazlı aramalarda ilk 3 |
| 6-12. Ay | Ana anahtar kelimelerde ilk sayfa |
| 12+ Ay | "ankara nakliyat" için ilk 3 |

---

*Bu plan onaylandıktan sonra Code moduna geçerek uygulamaya başlayabilirim.*
