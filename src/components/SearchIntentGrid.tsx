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
        desc: "Ankara içindeki taşımanız için eşya miktarını, iki adresi ve tarihi paylaşın; araç ve zaman uygunluğunu önceden görüşün.",
        link: "/hizmetler/sehir-ici-nakliyat",
        btnText: "Nakliyeci Çağır",
    },
    {
        icon: <IconCog className="w-8 h-8 text-primary-500" />,
        badge: "Kurulum Uygunluğu",
        title: "Asansörlü Nakliyat Ankara",
        desc: "Kat yüksekliği, merdiven ölçüleri, cephe ve zemin bilgilerini paylaşarak dış cephe asansörünün kuruluma uygunluğunu değerlendirin.",
        link: "/hizmetler/asansorlu-tasima",
        btnText: "Asansörlü Taşıma",
    },
    {
        icon: <IconBox className="w-8 h-8 text-primary-500" />,
        badge: "Ekonomik & Pratik",
        title: "Parça Eşya & Küçük Nakliye",
        desc: "Tek bir koltuk, buzdolabı, çamaşır makinesi veya öğrenci/bekar evi için komple kamyon tutmanıza gerek yok. Parça eşya tarifesiyle bütçenizi koruyun.",
        link: "/hizmetler/parca-esya-tasima",
        btnText: "Parça Eşya Taşı",
    },
    {
        icon: <IconBuilding className="w-8 h-8 text-primary-500" />,
        badge: "Kurumsal & IT Güvenlikli",
        title: "Ofis, Büro & İş Yeri Taşımacılığı",
        desc: "Arşiv, mobilya ve elektronik ekipman listesini hazırlayın. İş takvimi, erişim saatleri ve kurulum sorumluluklarını teklif öncesinde görüşün.",
        link: "/hizmetler/ofis-tasima",
        btnText: "Ofis Taşıma Çözümleri",
    },
    {
        icon: <IconGlobe className="w-8 h-8 text-primary-500" />,
        badge: "Rota ve Tarih Planı",
        title: "Şehirler Arası Evden Eve Nakliyat",
        desc: "Ankara çıkışlı şehirler arası taşınmada varış adresi, eşya miktarı ve teslim takvimine göre rota uygunluğunu ve taşıma koşullarını görüşün.",
        link: "/hizmetler/sehirler-arasi-nakliyat",
        btnText: "Şehirler Arası Rota",
    },
    {
        icon: <IconShield className="w-8 h-8 text-primary-500" />,
        badge: "Depolama Koşulları",
        title: "Güvenli Eşya Depolama",
        desc: "Geçici depolama ihtiyacında eşya miktarı, süre, alan uygunluğu, erişim ve koruma koşulları hakkında bilgi isteyin.",
        link: "/hizmetler/depolama",
        btnText: "Depolama Alanları",
    },
];

const PerspectiveGrid = ({ opacity = "0.05", color = "#fff" }: { opacity?: string; color?: string }) => (
    <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block"
        style={{
            backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)",
            opacity: opacity,
        }}
    />
);

export default function SearchIntentGrid() {
    return (
        <section className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden border-t border-white/10" id="hizmet-sorgu-agi">
            <PerspectiveGrid opacity="0.05" color="#fff" />

            {/* Ambient Aurora Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-5">
                    <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                            Ankara Nakliyat Ağı
                        </span>
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-tight">
                        Her Taşıma İhtiyacına <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                            Özel Çözümler.
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Komple ev, parça eşya veya ofis taşımanız için ilgili hizmeti inceleyin. Araç, asansör ve tarih uygunluğunu adres bilgilerinize göre görüşün.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {intentCards.map((card, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-9 flex flex-col justify-between hover:bg-white/[0.07] hover:border-primary-500/50 hover:-translate-y-2 transition-all duration-500 group shadow-2xl relative overflow-hidden"
                        >
                            {/* Card Top Accent Glow */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary-400 group-hover:scale-110 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 group-hover:text-primary-300 transition-all duration-300">
                                        {card.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-500/10 px-3.5 py-1.5 rounded-full border border-primary-500/20 backdrop-blur-md">
                                        {card.badge}
                                    </span>
                                </div>

                                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-primary-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-6">
                                    {card.desc}
                                </p>
                            </div>

                            <Link
                                href={card.link}
                                className="w-full py-4 bg-white/5 hover:bg-gradient-to-r hover:from-primary-500 hover:to-orange-500 text-white hover:text-slate-950 border border-white/10 hover:border-transparent rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 group-hover:shadow-lg group-hover:shadow-primary-500/20"
                            >
                                <span>{card.btnText}</span>
                                <IconArrow className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
