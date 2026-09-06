"use client";

import React from "react";
import { IconShield, IconTruck, IconWrench, IconClipboard, IconCheck } from "@/components/Icons";

export default function TrustBadgesSection() {
    const badges = [
        {
            icon: <IconClipboard className="w-8 h-8 text-primary-500" />,
            title: "K3 Yetki Belgesi",
            badge: "Resmi Belge",
            desc: "T.C. Ulaştırma ve Altyapı Bakanlığı onaylı yurtiçi ev ve büro eşyası taşımacılığı yasal yetki lisansı.",
        },
        {
            icon: <IconShield className="w-8 h-8 text-primary-500" />,
            title: "%100 Emtia Sigortası",
            badge: "Axa & Allianz",
            desc: "Taşınma anından teslimata kadar tüm mobilya ve beyaz eşyalarınız resmi sigorta poliçesiyle teminat altındadır.",
        },
        {
            icon: <IconTruck className="w-8 h-8 text-primary-500" />,
            title: "Özmal Çelik Filo",
            badge: "Taşeron Yok",
            desc: "Aracı komisyoncu veya yabancı taşeron araçlar değil; firmamıza ait kapalı kasa logolu araçlarımızla hizmet veriyoruz.",
        },
        {
            icon: <IconWrench className="w-8 h-8 text-primary-500" />,
            title: "Kadrolu Marangoz",
            badge: "Usta Ekip",
            desc: "Gardırop, baza ve dolaplarınız uzman marangozlarımızca profesyonelce demonte edilir ve yeni evinizde kurulur.",
        },
    ];

    return (
        <section className="py-16 md:py-24 bg-slate-900 text-white border-y border-white/10 relative overflow-hidden">
            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-4">
                    <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] bg-primary-500/10 px-4 py-1.5 rounded-full border border-primary-500/20">
                        Yasal ve Kurumsal Güvence
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight">
                        Neden Ankara Özdemir Nakliyat?
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base">
                        Korsan ve belgesiz taşımacılara karşı eşyalarınızı resmi güvence ve kurumsal yetki belgeleriyle taşıyoruz.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {badges.map((b, i) => (
                        <div
                            key={i}
                            className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 flex flex-col justify-between hover:bg-white/[0.08] hover:border-primary-500/50 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                        {b.icon}
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-400 bg-primary-500/10 px-3 py-1 rounded-full border border-primary-500/20">
                                        {b.badge}
                                    </span>
                                </div>
                                <h3 className="text-lg md:text-xl font-black text-white mb-2">{b.title}</h3>
                                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{b.desc}</p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-bold text-green-400">
                                <IconCheck className="w-4 h-4" />
                                <span>Doğrulanmış Standart</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
