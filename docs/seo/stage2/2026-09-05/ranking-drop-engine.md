# Sıralama Düşüşü Karar Motoru

Bu dosya production değişikliği yapmaz. Her düşüşte aynı kanıt sırasını zorunlu kılar.

1. GSC'de 7/14/28 günlük tıklama, gösterim, CTR ve pozisyon değişimini doğrula.
2. Ankara/Türkiye/Türkçe mobil gerçek SERP'te URL ve rakip hareketini doğrula.
3. Son Git commitlerini, son deployment'ı ve repo–generated–production farkını kontrol et.
4. İç link, title/H1, ana içerik, canonical, robots, sitemap, HTTP ve index durumunu kontrol et.
5. Mobil CWV/performans alan verisini ve aynı sorguya çıkan site içi URL'leri kontrol et.
6. İki marka aynı sorguda görünüyorsa ideal owner domain/page belirle.
7. Olası neden, kanıt, etki, risk ve güven düzeyini `seo-change-log.csv` içine yaz.
8. Güven düşükse değişiklik yapma; ölçümü sürdür. Güven yeterliyse tek hipotezi küçük bir URL grubunda test et.
9. WINNING veya ilk 1–3'teki URL'yi `PROTECTED` işaretle; açık kanıt olmadan title, URL, canonical veya ana içeriğini değiştirme.
10. Sonucu 7 ve 28 gün sonra ölç; başarısız değişikliği geri al veya yeni hipotez üret.

## Durum eşikleri

- `WINNING`: 28 günde en az 10 tıklama, ortalama pozisyon 1–3 ve tıklama kaybı %10'dan az.
- `GROWING`: tıklama en az %20 artmış veya en az 100 gösterimde pozisyon 2+ iyileşmiş.
- `STABLE`: tıklama değişimi ±%15 ve pozisyon değişimi 1,5'tan az.
- `WATCH`: veri yetersiz ya da değişim eşik altında.
- `DECLINING`: tıklama en az %20, gösterim en az %25 düşmüş veya pozisyon 3+ kötüleşmiş.
- `CRITICAL`: önceki dönemde en az 10 tıklama varken tıklama en az %50 düşmüş veya pozisyon 7+ kötüleşmiş.

Bu eşikler başlangıç hipotezidir; ilk gerçek GSC veri seti geldikten sonra site bazında kalibre edilmelidir.

## 5 Eylül 2026 ilk teşhis kuyruğu

1. **Özdemir / site geneli — DECLINING:** Son 28 gün tıklama 250'den 152'ye (%39,2 düşüş), gösterim 54.900'den 19.300'e (%64,8 düşüş), konum 11,5'ten 13,3'e geriledi. Son 7 günde tıklama 23'ten 52'ye toparlandığı için title/içerik değişikliği yapmadan sorgu ve sayfa düzeyinde kayıp kaynağı ayrıştırılmalı.
2. **Özdemir / `ankara evden eve nakliyat` — PROTECTED_OWNER + WATCH:** 90 günde ana sayfa 13 tıklama, 5.667 gösterim, konum 3,7. Sorgu toplam gösterimi son 28 günde 2.029'dan 1.056'ya indi. Ana sayfanın title/H1/ana içeriği korunmalı; ikincil 11 URL'nin aynı sorguya sızması izlenmeli.
3. **Akif / site geneli — DECLINING_14D:** Son 14 gün tıklama 14'ten 8'e, gösterim 1.950'den 1.360'a düştü; ortalama konum 3,4'ten 7,7'ye geriledi. Buna rağmen 28 günlük hacim arttığı için tek bir ani site geneli müdahale yapılmamalı.
4. **Akif / `gölbaşı evden eve nakliyat` — CRITICAL_QUERY_WATCH:** Search Console haftalık önerisi %97 gösterim kaybı gösteriyor; 28 günlük tabloda gösterim 228'den 100'e düştü. Önce owner URL, index/canonical, rakip SERP ve son deployment kontrol edilmeli.
