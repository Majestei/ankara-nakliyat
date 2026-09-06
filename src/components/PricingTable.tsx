"use client";

import React, { useState } from "react";
import { IconCheck, IconTruck, IconBox, IconShield } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

interface PricingTableProps {
    title?: string;
    subtitle?: string;
    locationName?: string;
}

export default function PricingTable({
    title = "2026 Ankara Evden Eve Nakliyat Fiyatları",
    subtitle = "Ankara içi taşınmalarda sürpriz ek masraflarla karşılaşmamanız için oda sayısına ve hizmet kapsamına göre şeffaf ortalama fiyatlandırma tablomuz. Tüm fiyatlarımıza KDV, marangozluk ve sigorta dahildir.",
    locationName = "Ankara",
}: PricingTableProps) {
    const [packageType, setPackageType] = useState<"standart" | "toplamali">("standart");

    const pricingData = {
        standart: [
            {
                type: "1+1 Daire Taşıma",
                price: "8.000 ₺ – 12.000 ₺",
                team: "2-3 Uzman Personel",
                vehicle: "Kompakt Kapalı Kasa Araç",
                duration: "3 - 5 Saat",
                features: [
                    "Mobilya demontaj ve montajı",
                    "Beyaz eşya koruyucu kılıflama",
                    "Büyük mobilyaların patpat sarımı",
                    "Tam kapsamlı emtia sigortası",
                    "Ufak eşyaları müşteri koliler",
                ],
                popular: false,
            },
            {
                type: "2+1 Daire Taşıma",
                price: "12.000 ₺ – 16.500 ₺",
                team: "3-4 Uzman Personel",
                vehicle: "Orta Boy Çelik Kasalı Kamyon",
                duration: "4 - 6 Saat",
                features: [
                    "Profesyonel marangoz desteği",
                    "Kraft kağıt ve patpat zırhlama",
                    "Askılı tekstil taşıma dolabı",
                    "Asansör kurulumuna uygun araç",
                    "Ufak eşyaları müşteri koliler",
                ],
                popular: true,
            },
            {
                type: "3+1 Daire Taşıma",
                price: "16.500 ₺ – 23.000 ₺",
                team: "4-5 Uzman Personel",
                vehicle: "Büyük Boy Geniş Hacimli Filo",
                duration: "5 - 8 Saat",
                features: [
                    "Tüm oda mobilyalarının montajı",
                    "Çift kat patpat ambalajlama",
                    "Modüler dış cephe asansörü imkanı",
                    "Resmi poliçeli hasar teminatı",
                    "Ufak eşyaları müşteri koliler",
                ],
                popular: false,
            },
            {
                type: "4+1 & Villa Taşıma",
                price: "23.000 ₺ – 35.000 ₺",
                team: "5-6 Kıdemli Personel",
                vehicle: "Maksimum Boy Çelik Kasa Kamyon",
                duration: "Tam Gün Operasyon",
                features: [
                    "Kişiye özel operasyon planı",
                    "Ağır mobilya ve piyano taşıma",
                    "Çift asansör kurulum desteği",
                    "Aynı gün montaj ve yerleşim",
                    "Ufak eşyaları müşteri koliler",
                ],
                popular: false,
            },
        ],
        toplamali: [
            {
                type: "1+1 VIP Anahtar Teslim",
                price: "11.500 ₺ – 15.500 ₺",
                team: "3-4 Uzman Personel",
                vehicle: "Kompakt Kapalı Kasa Araç",
                duration: "4 - 6 Saat",
                features: [
                    "A'dan Z'ye tüm evi ekibimiz toplar",
                    "Mutfak eşyaları kraft kağıtla sarılır",
                    "Giysiler askılı dolaplara aktarılır",
                    "Tüm mobilya montajı ve yerleşimi",
                    "Elinizi hiçbir şeye sürmezsiniz",
                ],
                popular: false,
            },
            {
                type: "2+1 VIP Anahtar Teslim",
                price: "16.500 ₺ – 22.500 ₺",
                team: "4-5 Uzman Personel",
                vehicle: "Orta Boy Çelik Kasalı Kamyon",
                duration: "5 - 7 Saat",
                features: [
                    "Tüm mutfak, salon ve odalar kutulanır",
                    "Porselen & cam eşyalar özel kolilenir",
                    "Marangozlu gardırop ve baza kurulumu",
                    "Beyaz eşya tesisat bağlantıları",
                    "Elinizi hiçbir şeye sürmezsiniz",
                ],
                popular: true,
            },
            {
                type: "3+1 VIP Anahtar Teslim",
                price: "22.500 ₺ – 31.000 ₺",
                team: "5-6 Uzman Personel",
                vehicle: "Büyük Boy Geniş Hacimli Filo",
                duration: "Tam Gün VIP Operasyon",
                features: [
                    "Eviniz A'dan Z'ye paketlenir ve açılır",
                    "Kıyafetler yeni gardıroba yerleştirilir",
                    "Tüm ambalaj atıkları toplanıp atılır",
                    "Dış cephe asansörü ve çift ekip",
                    "Elinizi hiçbir şeye sürmezsiniz",
                ],
                popular: false,
            },
            {
                type: "4+1 & Villa VIP Teslim",
                price: "32.000 ₺ – 48.000 ₺",
                team: "6-8 Kıdemli Personel",
                vehicle: "Çift Kamyon veya Maksimum Filo",
                duration: "1-2 Günlük Özel Operasyon",
                features: [
                    "Özel ahşap sandıklama ve paketleme",
                    "Avize, perde, tablo montaj uzmanı",
                    "Eksiksiz anahtar teslim yerleşim",
                    "Vip koordinatör eşliğinde taşıma",
                    "Elinizi hiçbir şeye sürmezsiniz",
                ],
                popular: false,
            },
        ],
    };

    const currentTiers = pricingData[packageType];

    return (
        <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden" id="fiyat-tablosu">
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
            </div>

            <div className="container-custom relative z-10 px-4 md:px-0">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-6">
                    <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] bg-primary-500/10 px-6 py-2 rounded-full border border-primary-500/20">
                        {locationName} Şeffaf Fiyat Politikası
                    </span>
                    <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
                        {subtitle}
                    </p>

                    {/* Paket Seçim Sekmeleri (Toplu vs Toplamalı Anahtar Teslim) */}
                    <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-2xl md:rounded-full mt-4">
                        <button
                            onClick={() => setPackageType("standart")}
                            className={`px-6 md:px-10 py-3 rounded-xl md:rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all ${
                                packageType === "standart"
                                    ? "bg-primary-500 text-slate-950 shadow-lg"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Standart (Toplu) Taşıma
                        </button>
                        <button
                            onClick={() => setPackageType("toplamali")}
                            className={`px-6 md:px-10 py-3 rounded-xl md:rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all flex items-center gap-2 ${
                                packageType === "toplamali"
                                    ? "bg-primary-500 text-slate-950 shadow-lg"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            <span>Anahtar Teslim (Toplamalı) VIP</span>
                            <span className="bg-orange-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase">
                                Tavsiye
                            </span>
                        </button>
                    </div>

                    <p className="text-xs text-slate-400 max-w-xl mx-auto">
                        {packageType === "standart" ? (
                            <span>
                                💡 <strong>Standart Paket:</strong> Ufak tefek kıyafet ve mutfak gereçlerini siz kolilersiniz; mobilyalarınızı, beyaz eşyalarınızı uzman marangozumuz demonte edip koruyucu ambalajla taşır.
                            </span>
                        ) : (
                            <span>
                                ⭐ <strong>Anahtar Teslim (Toplamalı) Paket:</strong> Elinizi hiçbir şeye sürmezsiniz! Tüm mutfak bardakları, elbiseler, kitaplar ve aksesuarlar ekibimizce özel kolilenir ve yeni evde yerleştirilir.
                            </span>
                        )}
                    </p>
                </div>

                {/* Fiyat Kartları */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {currentTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                                tier.popular
                                    ? "bg-gradient-to-b from-primary-950/80 to-slate-900 border-2 border-primary-500 shadow-[0_20px_60px_rgba(249,115,22,0.2)]"
                                    : "bg-white/5 border border-white/10 hover:border-white/20"
                            }`}
                        >
                            {tier.popular && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-500 text-slate-950 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                                    En Çok Tercih Edilen
                                </span>
                            )}
                            <div>
                                <h3 className="text-xl font-black text-white mb-2">{tier.type}</h3>
                                <div className="text-2xl md:text-3xl font-black text-primary-400 mb-6">{tier.price}</div>

                                <div className="space-y-3 text-xs text-slate-300 pb-6 border-b border-white/10 mb-6">
                                    <div className="flex items-center gap-2">
                                        <IconTruck className="w-4 h-4 text-primary-500 shrink-0" />
                                        <span>{tier.vehicle}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <IconBox className="w-4 h-4 text-primary-500 shrink-0" />
                                        <span>{tier.team}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-2.5 text-xs text-slate-300">
                                            <IconCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-wider text-xs text-center transition-all ${
                                    tier.popular
                                        ? "bg-primary-500 text-slate-950 hover:bg-primary-400"
                                        : "bg-white/10 text-white hover:bg-white/20"
                                }`}
                            >
                                Fiyat Teklifi Al
                            </a>
                        </div>
                    ))}
                </div>

                {/* Kriterler ve Bilgilendirme Kutusu */}
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10">
                        <h3 className="text-xl md:text-2xl font-black text-white mb-6">
                            {locationName} Nakliyat Fiyatları Neye Göre Hesaplanır?
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6 text-slate-300 text-xs md:text-sm leading-relaxed">
                            <div>
                                <h4 className="text-primary-400 font-bold mb-1">1. Kat Durumu & Asansör</h4>
                                <p>Binaların kat yüksekliği ve bina içi asansör izinleri incelenir. 15+ kata kadar modüler dış cephe asansörü kullanılarak eşyalar çizilmeden transfer edilir.</p>
                            </div>
                            <div>
                                <h4 className="text-primary-400 font-bold mb-1">2. Eşya Hacmi (Oda Sayısı)</h4>
                                <p>Eşyaların kapladığı metreküp hacmi, tahsis edilecek kamyonetin/kamyonun boyutunu ve çalışacak profesyonel personel sayısını belirler.</p>
                            </div>
                            <div>
                                <h4 className="text-primary-400 font-bold mb-1">3. Kilometre Mesafesi</h4>
                                <p>İki adres arasındaki mesafe ve Ankara içi çevre yolu bağlantıları hesaplanarak net akaryakıt ve zaman maliyeti belirlenir.</p>
                            </div>
                            <div>
                                <h4 className="text-primary-400 font-bold mb-1">4. Paketleme Kapsamı</h4>
                                <p>Standart (Toplu) veya Anahtar Teslim (Toplamalı) seçimine göre kraft kağıt, havalı naylon ve askılı koli malzemesi maliyete dahil edilir.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary-950/50 to-slate-900 border border-primary-500/30 rounded-3xl p-8 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/20 text-primary-400 flex items-center justify-center mb-4">
                                <IconShield className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-black text-white mb-2">Sabit Fiyat Taahhüdü</h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Taşınma günü kapıda &ldquo;eşya çok çıktı&rdquo; veya &ldquo;kat zormuş&rdquo; gibi bahanelerle ek ücret talep etmiyoruz. Keşif sonrası verilen fiyat yazılı sözleşmeyle sabitlenir.
                            </p>
                        </div>
                        <div className="pt-6 border-t border-white/10 mt-6">
                            <a
                                href={`https://api.whatsapp.com/send?phone=905324567890&text=Merhaba,%20${encodeURIComponent(locationName)}%20nakliyat%20fiyatı%20öğrenmek%20istiyorum.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg"
                            >
                                WhatsApp İle Hızlı Fiyat Al
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

