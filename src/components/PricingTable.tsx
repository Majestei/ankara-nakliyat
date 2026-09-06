"use client";

import React from "react";
import { IconCheck, IconTruck, IconBox } from "@/components/Icons";
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
    const pricingTiers = [
        {
            type: "1+1 Daire Taşıma",
            price: "8.000 ₺ – 12.000 ₺",
            team: "2-3 Uzman Personel",
            vehicle: "Kompakt Kapalı Kasa Araç",
            duration: "3 - 5 Saat",
            features: [
                "Mobilya demontaj ve montajı",
                "Çift katlı balonlu ambalajlama",
                "Beyaz eşya koruma kılıfları",
                "Tam kapsamlı emtia sigortası",
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
                "Kraft kağıt ve patpat sarım",
                "Askılı tekstil taşıma dolabı",
                "Asansör kurulumuna uygun",
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
                "A'dan Z'ye anahtar teslim paketleme",
                "Tüm dolap ve ünite demontajı",
                "Özel dış cephe asansörü imkanı",
                "Sıfır risk ve hasar teminatı",
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
                "VIP kişiye özel taşıma planı",
                "Kırılacaklar için özel ahşap sandık",
                "Çift asansör kurulum desteği",
                "Aynı gün kurulum ve yerleşim",
            ],
            popular: false,
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden" id="fiyat-tablosu">
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
            </div>

            <div className="container-custom relative z-10 px-4 md:px-0">
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24 space-y-6">
                    <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] bg-primary-500/10 px-6 py-2 rounded-full border border-primary-500/20">
                        {locationName} Şeffaf Fiyat Politikası
                    </span>
                    <h2 className="text-4xl md:text-7xl font-heading font-black tracking-tight leading-tight">
                        {title}
                    </h2>
                    <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Fiyat Kartları */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {pricingTiers.map((tier, index) => (
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

                {/* Kriterler Kutusu */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-6">
                        {locationName} Nakliyat Fiyatları Neye Göre Hesaplanır?
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300 text-sm leading-relaxed">
                        <div>
                            <h4 className="text-primary-400 font-bold mb-2">1. Kat Durumu & Asansör</h4>
                            <p>Binaların kat yüksekliği ve bina içi asansör kullanım izni önemlidir. Dış cephe modüler asansörü kurulumu maliyeti ve süreyi optimize eder.</p>
                        </div>
                        <div>
                            <h4 className="text-primary-400 font-bold mb-2">2. Eşya Hacmi (Oda Sayısı)</h4>
                            <p>Eşyaların hacmi gereken personel sayısını, ambalaj sarf malzemesini ve nakliyat kamyonunun boyutunu belirleyen birincil etkendir.</p>
                        </div>
                        <div>
                            <h4 className="text-primary-400 font-bold mb-2">3. Ankara İçi Mesafe</h4>
                            <p>İlçeler arası taşıma mesafesi, yakıt sarfiyatı ve trafik durumuna göre rota optimizasyonu yapılarak net fiyat çıkarılır.</p>
                        </div>
                        <div>
                            <h4 className="text-primary-400 font-bold mb-2">4. Özel Montaj ve Eşyalar</h4>
                            <p>Piyano, para kasası veya özel tasarım demonte mobilyalar gibi özel işçilik gerektiren parçalar önceden planlanır.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
