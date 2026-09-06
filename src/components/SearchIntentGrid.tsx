"use client";

import React from "react";
import Link from "next/link";
import {
    IconTruck, IconCog, IconMapPin, IconGlobe,
    IconBox, IconBuilding, IconShield, IconArrow
} from "@/components/Icons";

const intentCards = [
    {
        icon: <IconTruck className="w-8 h-8 text-primary-500" />,
        badge: "Acil & Günlük Nakliye",
        title: "Ankara Nakliyeci & Kamyonet Nakliye",
        desc: "Ankara genelinde aynı gün acil nakliyeci ihtiyacınız için kapalı çelik kasa kamyonet ve deneyimli taşıma personeli tahsis ediyoruz.",
        queries: ["ankara nakliyeci", "kamyonet nakliye ankara", "acil nakliyeci", "saatlik nakliye"],
        link: "/hizmetler/sehir-ici-nakliyat",
        btnText: "Nakliyeci Çağır",
    },
    {
        icon: <IconCog className="w-8 h-8 text-primary-500" />,
        badge: "25. Kata Kadar Dikey",
        title: "Asansörlü Nakliyat Ankara",
        desc: "Dar apartman merdivenlerine ve bina asansörü yasaklarına son! Balkon veya pencereden modüler hidrolik asansörle sıfır hasarlı taşıma.",
        queries: ["ankara asansörlü nakliyat", "asansörlü ev taşıma", "mobil asansör kiralama"],
        link: "/hizmetler/asansorlu-tasima",
        btnText: "Asansörlü Taşıma",
    },
    {
        icon: <IconBox className="w-8 h-8 text-primary-500" />,
        badge: "Ekonomik & Pratik",
        title: "Parça Eşya & Küçük Nakliye",
        desc: "Tek bir koltuk, buzdolabı, çamaşır makinesi veya öğrenci/bekar evi için komple kamyon tutmanıza gerek yok. Parça eşya tarifesiyle bütçenizi koruyun.",
        queries: ["küçük nakliye ankara", "parça eşya taşıma", "öğrenci evi taşıma ankara", "tek parça nakliye"],
        link: "/hizmetler/parca-esya-tasima",
        btnText: "Parça Eşya Taşı",
    },
    {
        icon: <IconBuilding className="w-8 h-8 text-primary-500" />,
        badge: "Kurumsal & IT Güvenlikli",
        title: "Ofis, Büro & İş Yeri Taşımacılığı",
        desc: "Şirketinizin iş akışını kesintiye uğratmadan mesai dışı veya hafta sonu arşivleme, IT sunucu ve mobilya montaj uzmanlığıyla kurumsal nakliyat.",
        queries: ["ankara ofis taşıma", "büro nakliyat ankara", "kurumsal şirket taşıma"],
        link: "/hizmetler/ofis-tasima",
        btnText: "Ofis Taşıma Çözümleri",
    },
    {
        icon: <IconGlobe className="w-8 h-8 text-primary-500" />,
        badge: "81 İlde Kesintisiz",
        title: "Şehirler Arası Evden Eve Nakliyat",
        desc: "Ankara'dan İstanbul, İzmir, Antalya başta olmak üzere 81 ile kapalı kasa filomuz, GPS araç takibi ve tam kapsamlı emtia poliçesiyle güvenli sevkiyat.",
        queries: ["ankara şehirler arası nakliyat", "ankara istanbul nakliyat", "şehirlerarası ev taşıma"],
        link: "/hizmetler/sehirler-arasi-nakliyat",
        btnText: "Şehirler Arası Rota",
    },
    {
        icon: <IconShield className="w-8 h-8 text-primary-500" />,
        badge: "Kişiye Özel Kilitli Oda",
        title: "Güvenli Eşya Depolama",
        desc: "Tadilat, yurtdışı seyahati veya fazla eşyalarınız için 7/24 kamera kontrollü, nemsiz ve havalandırmalı özel kilitli oda depolama alanları.",
        queries: ["ankara eşya depolama", "kiralık ev eşyası deposu", "güvenli eşya deposu ankara"],
        link: "/hizmetler/depolama",
        btnText: "Depolama Alanları",
    },
];

export default function SearchIntentGrid() {
    return (
        <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden border-t border-white/10" id="hizmet-sorgu-agi">
            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16 space-y-4">
                    <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] bg-primary-500/10 px-4 py-1.5 rounded-full border border-primary-500/20">
                        Ankara Nakliyat Ağı
                    </span>
                    <h2 className="text-3xl md:text-6xl font-heading font-black tracking-tight">
                        Her Taşıma İhtiyacına Özel Profesyonel Çözümler
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Sadece komple ev taşıma değil; acil nakliyeciden parça eşyaya, asansör kiralama ve kurumsal ofis nakliyesine kadar aradığınız her hizmet tek çatı altında.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {intentCards.map((card, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/[0.08] hover:border-primary-500/50 transition-all duration-300 group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500/20 transition-all">
                                        {card.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                                        {card.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl font-black text-white mb-3 group-hover:text-primary-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                                    {card.desc}
                                </p>

                                {/* Arama Niyeti Etiketleri (Search Intent Tags) */}
                                <div className="flex flex-wrap gap-1.5 mb-6 pt-4 border-t border-white/10">
                                    {card.queries.map((q, qi) => (
                                        <span
                                            key={qi}
                                            className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-md"
                                        >
                                            #{q}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link
                                href={card.link}
                                className="w-full py-3.5 bg-white/5 hover:bg-primary-500 text-white hover:text-slate-950 border border-white/10 hover:border-primary-500 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                            >
                                <span>{card.btnText}</span>
                                <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
