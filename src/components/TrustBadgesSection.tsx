"use client";

import React from "react";
import { IconShield, IconTruck, IconWrench, IconClipboard, IconCheck } from "@/components/Icons";

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

export default function TrustBadgesSection() {
    const badges = [
        {
            icon: <IconClipboard className="w-7 h-7 text-primary-400" />,
            title: "K3 Yetki Belgesi",
            badge: "Resmi Belge",
            desc: "T.C. Ulaştırma ve Altyapı Bakanlığı onaylı yurtiçi ev ve büro eşyası taşımacılığı yasal yetki lisansı.",
        },
        {
            icon: <IconShield className="w-7 h-7 text-primary-400" />,
            title: "%100 Emtia Sigortası",
            badge: "Axa & Allianz",
            desc: "Taşınma anından teslimata kadar tüm mobilya ve beyaz eşyalarınız resmi sigorta poliçesiyle teminat altındadır.",
        },
        {
            icon: <IconTruck className="w-7 h-7 text-primary-400" />,
            title: "Özmal Çelik Filo",
            badge: "Taşeron Yok",
            desc: "Aracı komisyoncu veya yabancı taşeron araçlar değil; firmamıza ait kapalı kasa logolu araçlarımızla hizmet veriyoruz.",
        },
        {
            icon: <IconWrench className="w-7 h-7 text-primary-400" />,
            title: "Kadrolu Marangoz",
            badge: "Usta Ekip",
            desc: "Gardırop, baza ve dolaplarınız uzman marangozlarımızca profesyonelce demonte edilir ve yeni evinizde kurulur.",
        },
    ];

    return (
        <section className="py-20 md:py-32 bg-slate-950 text-white border-y border-white/10 relative overflow-hidden">
            <PerspectiveGrid opacity="0.05" color="#fff" />

            {/* Ambient Aurora Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18 space-y-4">
                    <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                            Yasal ve Kurumsal Güvence
                        </span>
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black tracking-tighter leading-tight text-white">
                        Neden Ankara <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                            Özdemir Nakliyat?
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        Korsan ve belgesiz taşımacılara karşı eşyalarınızı resmi güvence ve kurumsal yetki belgeleriyle taşıyoruz.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((b, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] p-7 md:p-8 flex flex-col justify-between hover:bg-white/[0.07] hover:border-primary-500/50 hover:-translate-y-2 transition-all duration-500 group shadow-xl relative overflow-hidden"
                        >
                            {/* Card Top Accent Glow */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary-500/20 group-hover:border-primary-500/40 transition-all duration-300">
                                        {b.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20 backdrop-blur-md">
                                        {b.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-white mb-2.5 tracking-tight group-hover:text-primary-400 transition-colors">{b.title}</h3>
                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                            </div>

                            <div className="mt-6 pt-5 border-t border-white/10 flex items-center">
                                <span className="inline-flex items-center gap-2 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                                    <IconCheck className="w-3.5 h-3.5" />
                                    <span>Doğrulanmış Standart</span>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
