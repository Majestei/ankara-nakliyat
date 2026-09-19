"use client";

import React, { useState } from "react";
import { IconCheck, IconTruck, IconBox, IconShield, IconPhone, IconArrow } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

interface PricingTableProps {
    title?: string;
    subtitle?: string;
    locationName?: string;
}

export default function PricingTable({
    title = "2026 Ankara Evden Eve Nakliyat Fiyatları",
    subtitle = "Oda sayısı tek başına fiyatı belirlemez. Eşya hacmi, mesafe, katlar ve ek hizmetleri paylaşarak güncel teklif alın; dahil hizmetleri yazılı olarak görüşün.",
    locationName = "Ankara",
}: PricingTableProps) {
    const [packageType, setPackageType] = useState<"standart" | "toplamali">("standart");

    const pricingData = {
        standart: [
            {
                type: "1+1 Daire Taşıma",
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Kompakt Kapalı Kasa Araç",
                duration: "Adres ve kapsama göre görüşülür",
                features: [
                    "Mobilya demontaj ve montajı",
                    "Beyaz eşya koruyucu kılıflama",
                    "Büyük mobilyaların patpat sarımı",
                    "Varsa poliçe kapsamını görüşme",
                    "Ufak eşyaları müşteri koliler",
                ],
                popular: false,
            },
            {
                type: "2+1 Daire Taşıma",
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Orta Boy Çelik Kasalı Kamyon",
                duration: "Adres ve kapsama göre görüşülür",
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
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Büyük Boy Geniş Hacimli Filo",
                duration: "Adres ve kapsama göre görüşülür",
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
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Maksimum Boy Çelik Kasa Kamyon",
                duration: "Adres ve kapsama göre görüşülür",
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
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Kompakt Kapalı Kasa Araç",
                duration: "Adres ve kapsama göre görüşülür",
                features: [
                    "A'dan Z'ye tüm evi ekibimiz toplar",
                    "Mutfak eşyaları kraft kağıtla sarılır",
                    "Giysiler askılı dolaplara aktarılır",
                    "Tüm mobilya montajı ve yerleşimi",
                    "Paketleme kapsamını görüşme",
                ],
                popular: false,
            },
            {
                type: "2+1 VIP Anahtar Teslim",
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Orta Boy Çelik Kasalı Kamyon",
                duration: "Adres ve kapsama göre görüşülür",
                features: [
                    "Tüm mutfak, salon ve odalar kutulanır",
                    "Porselen & cam eşyalar özel kolilenir",
                    "Marangozlu gardırop ve baza kurulumu",
                    "Beyaz eşya tesisat bağlantıları",
                    "Paketleme kapsamını görüşme",
                ],
                popular: true,
            },
            {
                type: "3+1 VIP Anahtar Teslim",
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Büyük Boy Geniş Hacimli Filo",
                duration: "Adres ve kapsama göre görüşülür",
                features: [
                    "Eviniz A'dan Z'ye paketlenir ve açılır",
                    "Kıyafetler yeni gardıroba yerleştirilir",
                    "Tüm ambalaj atıkları toplanıp atılır",
                    "Dış cephe asansörü ve çift ekip",
                    "Paketleme kapsamını görüşme",
                ],
                popular: false,
            },
            {
                type: "4+1 & Villa VIP Teslim",
                price: "Teklif alın",
                team: "Eşya listesine göre planlanır",
                vehicle: "Çift Kamyon veya Maksimum Filo",
                duration: "Adres ve kapsama göre görüşülür",
                features: [
                    "Özel ahşap sandıklama ve paketleme",
                    "Avize, perde, tablo montaj uzmanı",
                    "Yerleştirme kapsamını görüşme",
                    "Taşıma sorumlusunu belirleme",
                    "Paketleme kapsamını görüşme",
                ],
                popular: false,
            },
        ],
    };

    const currentTiers = pricingData[packageType];
    const cleanPhone = firmaBilgileri.phone.replace(/\s/g, "");

    return (
        <section className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden" id="fiyat-tablosu">
            {/* Cinematic Perspective Grid & Ambient Aurora */}
            <div
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block opacity-5"
                style={{
                    backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)",
                }}
            />
            <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-orange-500/15 rounded-full blur-[160px] pointer-events-none" />

            <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em]">
                            {locationName} Şeffaf Fiyat Politikası
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] text-white">
                        2026 Nakliyat <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                            Fiyat Tarifesi.
                        </span>
                    </h2>

                    <p className="text-white/40 text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                        {subtitle}
                    </p>

                    {/* Luxury Switcher Pills */}
                    <div className="pt-4">
                        <div className="inline-flex p-1.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
                            <button
                                onClick={() => setPackageType("standart")}
                                className={`px-6 md:px-10 py-3 md:py-3.5 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 ${
                                    packageType === "standart"
                                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                                        : "text-white/50 hover:text-white"
                                }`}
                            >
                                Standart (Toplu) Taşıma
                            </button>
                            <button
                                onClick={() => setPackageType("toplamali")}
                                className={`px-6 md:px-10 py-3 md:py-3.5 rounded-full font-black text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 ${
                                    packageType === "toplamali"
                                        ? "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30"
                                        : "text-white/50 hover:text-white"
                                }`}
                            >
                                <span>Anahtar Teslim VIP</span>
                                <span className="bg-amber-400 text-slate-950 text-[9px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                                    Tavsiye
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-2">
                        <div className="inline-block p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-slate-300 max-w-xl mx-auto leading-relaxed">
                            {packageType === "standart" ? (
                                <span>
                                    💡 <strong className="text-white">Standart Paket:</strong> Ufak tefek kıyafet ve mutfak gereçlerini siz kolilersiniz; mobilyalarınızı, beyaz eşyalarınızı uzman marangozumuz demonte edip koruyucu ambalajla taşır.
                                </span>
                            ) : (
                                <span>
                                    ⭐ <strong className="text-white">Anahtar Teslim VIP:</strong> Paketleme kapsamını görüşme! Tüm mutfak bardakları, elbiseler, kitaplar ve aksesuarlar ekibimizce özel kolilenir ve yeni evde yerleştirilir.
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* 4 Pricing Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
                    {currentTiers.map((tier, index) => (
                        <div
                            key={index}
                            className={`rounded-[2.5rem] p-7 md:p-8 flex flex-col justify-between relative transition-all duration-500 hover:-translate-y-2 group ${
                                tier.popular
                                    ? "bg-gradient-to-b from-primary-950/70 via-slate-900/95 to-slate-950 border-2 border-primary-500 shadow-[0_25px_70px_rgba(249,115,22,0.25)] relative overflow-hidden"
                                    : "bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-primary-500/40 hover:bg-white/[0.07] hover:shadow-2xl hover:shadow-primary-500/10"
                            }`}
                        >
                            {tier.popular && (
                                <div className="absolute top-0 inset-x-0 flex justify-center -translate-y-1/2">
                                    <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-primary-500 to-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-primary-500/40">
                                        ★ En Çok Tercih Edilen
                                    </span>
                                </div>
                            )}

                            <div>
                                <div className="mb-4">
                                    <h3 className="text-xl font-heading font-black text-white group-hover:text-primary-400 transition-colors">
                                        {tier.type}
                                    </h3>
                                    <p className="text-[11px] text-white/40 mt-0.5">Sabit Sözleşmeli Fiyat</p>
                                </div>

                                <div className="text-2xl md:text-3xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary-300 mb-6 tracking-tight">
                                    {tier.price}
                                </div>

                                <div className="space-y-3 text-xs text-slate-300 pb-6 border-b border-white/10 mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                                            <IconTruck className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium">{tier.vehicle}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-7 h-7 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center text-primary-400 shrink-0">
                                            <IconBox className="w-4 h-4" />
                                        </div>
                                        <span className="font-medium">{tier.team}</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {tier.features.map((feat, fi) => (
                                        <li key={fi} className="flex items-start gap-2.5 text-xs text-slate-300">
                                            <IconCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <a
                                href={`tel:${cleanPhone}`}
                                className={`w-full py-4 rounded-full font-black uppercase tracking-wider text-xs text-center transition-all duration-300 flex items-center justify-center gap-2 ${
                                    tier.popular
                                        ? "btn-primary !py-4 shadow-xl shadow-primary-500/30"
                                        : "border border-white/20 text-white hover:bg-white hover:text-slate-950 backdrop-blur-sm"
                                }`}
                            >
                                <span>Fiyat Teklifi Al</span>
                                <IconArrow className="w-4 h-4" />
                            </a>
                        </div>
                    ))}
                </div>

                {/* Criteria & Price Lock Banner */}
                <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
                    <div className="lg:col-span-2 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-[10px] font-bold text-primary-400 uppercase tracking-widest mb-4">
                            Fiyatlandırma Kriterleri
                        </div>
                        <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-8 tracking-tight">
                            {locationName} Fiyatları Neye Göre Belirlenir?
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-8 text-slate-300 text-xs md:text-sm leading-relaxed">
                            <div className="space-y-1.5 border-l-2 border-primary-500/40 pl-4">
                                <h4 className="text-white font-black">1. Kat Durumu & Asansör</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Kat yüksekliği, merdiven genişliği, bina cephesi ve kurulum alanı asansör gereksinimini ve uygulanabilirliğini etkiler.
                                </p>
                            </div>
                            <div className="space-y-1.5 border-l-2 border-primary-500/40 pl-4">
                                <h4 className="text-white font-black">2. Eşya Hacmi (Oda Sayısı)</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Eşyaların toplam metreküp hacmi, tahsis edilecek kamyonun boyutunu ve çalışacak marangozlu personel sayısını belirler.
                                </p>
                            </div>
                            <div className="space-y-1.5 border-l-2 border-primary-500/40 pl-4">
                                <h4 className="text-white font-black">3. Kilometre Mesafesi</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    İki adres arasındaki mesafe ve Ankara çevre yolu bağlantıları hesaplanarak net yakıt ve zaman maliyeti belirlenir.
                                </p>
                            </div>
                            <div className="space-y-1.5 border-l-2 border-primary-500/40 pl-4">
                                <h4 className="text-white font-black">4. Paketleme Kapsamı</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Standart veya Anahtar Teslim seçimine göre kraft kağıt, havalı naylon ve askılı koli malzemesi maliyete dahil edilir.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Fixed Price Guarantee Card */}
                    <div className="bg-gradient-to-br from-primary-950/60 via-slate-900/90 to-slate-950 backdrop-blur-2xl border border-primary-500/30 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between shadow-2xl shadow-primary-500/10">
                        <div className="space-y-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/15 border border-primary-500/30 text-primary-400 flex items-center justify-center shadow-inner">
                                <IconShield className="w-7 h-7" />
                            </div>
                            <h4 className="text-2xl font-heading font-black text-white tracking-tight">
                                Yazılı Teklif Kapsamı
                            </h4>
                            <p className="text-xs text-slate-300 leading-relaxed">
                                Teklifte eşya listesini, adresleri, katları ve dahil hizmetleri belirtin. Kapsam değişirse uygulanacak ücretleri, vergi ve ödeme koşullarını önceden görüşün.
                            </p>
                        </div>
                        <div className="pt-8 border-t border-white/10 mt-8 space-y-3">
                            <a
                                href={`https://api.whatsapp.com/send?phone=905456568103&text=Merhaba,%20${encodeURIComponent(locationName)}%20nakliyat%20fiyatı%20öğrenmek%20istiyorum.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-emerald-500/20"
                            >
                                <span>WhatsApp İle Hızlı Fiyat Al</span>
                                <span>↗</span>
                            </a>
                            <a
                                href={`tel:${cleanPhone}`}
                                className="inline-flex items-center justify-center gap-2 w-full py-3.5 border border-white/20 text-white hover:bg-white hover:text-slate-950 rounded-full text-xs font-black uppercase tracking-wider transition-all"
                            >
                                <IconPhone className="w-4 h-4" />
                                <span>{firmaBilgileri.phone}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

