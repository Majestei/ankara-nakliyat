"use client";

import React from "react";
import { IconShield, IconCheck, IconTruck, IconClipboard } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

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

export default function ContractGuaranteeSection() {
    return (
        <section className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
            <PerspectiveGrid opacity="0.05" color="#fff" />

            {/* Ambient Aurora Glow */}
            <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-500/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Sol Metin / Karşılaştırma Alanı */}
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                            <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                                Güvenli Nakliyat Rehberi
                            </span>
                        </span>

                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter leading-tight text-white">
                            Neden Aracı Komisyoncular Değil, <br />
                            <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                                K3 Belgeli Özmal Firma?
                            </span>
                        </h2>

                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            İnternette veya aracı platformlarda verilen düşük fiyatlara kanıp taşınma günü kapıda &ldquo;eşya çok çıktı, kat zormuş&rdquo; denilerek 2 katı para talep edilen mağduriyetlere son veriyoruz. <strong>Ankara Özdemir Nakliyat</strong> olarak kurumsal sözleşmemizle sabit fiyat garantisi veriyoruz.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-2">
                            {/* Korsan / Aracı Tuzağı */}
                            <div className="p-6 rounded-[2rem] bg-red-950/20 border border-red-500/30 backdrop-blur-xl space-y-3 relative overflow-hidden group hover:border-red-500/50 transition-all">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-red-400 font-bold text-sm flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center text-xs">✕</span>
                                        <span>Belgesiz & Komisyoncu</span>
                                    </h3>
                                </div>
                                <ul className="text-xs text-slate-400 space-y-2.5 pt-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>İş komisyon karşılığı tanınmayan şahıslara devredilir</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Taşınma günü kapıda keyfi fiyat artırılır</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Resmi K3 belgesi ve nakliyat sigortası yoktur</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400">•</span>
                                        <span>Eşya kırıldığında muhatap ve tazminat bulunamaz</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Özdemir Nakliyat Kurumsal Güvence */}
                            <div className="p-6 rounded-[2rem] bg-emerald-950/20 border border-emerald-500/40 backdrop-blur-xl space-y-3 relative overflow-hidden group hover:border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.08)] transition-all">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-xs">✓</span>
                                        <span>Ankara Özdemir Nakliyat</span>
                                    </h3>
                                </div>
                                <ul className="text-xs text-slate-300 space-y-2.5 pt-1">
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400">•</span>
                                        <span>Kendi logolu özmal çelik kasa filomuz gelir</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400">•</span>
                                        <span>İmzalı yazılı sözleşme ile fiyat kesinlikle sabittir</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400">•</span>
                                        <span>Ulaştırma Bakanlığı onaylı K3 taşımacılık lisansı</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-emerald-400">•</span>
                                        <span>Allianz/Axa resmi emtia nakliyat sigortası</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Sözleşme Güvencesi Rozet Kartı */}
                    <div className="lg:col-span-5">
                        <div className="p-8 md:p-10 rounded-[2.5rem] bg-white/[0.04] border border-white/10 backdrop-blur-2xl space-y-6 relative overflow-hidden shadow-2xl group hover:border-primary-500/40 transition-all duration-500">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-orange-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
                                <IconClipboard className="w-8 h-8" />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                                    Yazılı Sözleşme & Sabit Fiyat Garantisi
                                </h3>
                                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                                    Taşınma gününden önce adresinizde veya dijital ekspertizle belirlenen tüm koşullar (araç plakası, personel sayısı, taşınma tarihi/saati ve net tutar) ıslak imzalı veya dijital onaylı sözleşmemize yazılır.
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/10 text-xs md:text-sm text-slate-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span>Sürpriz ve gizli ek masraf yok</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span>T.C. Ulaştırma Bakanlığı K3 Yetki Lisansı</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span>Axa / Allianz tam kapsamlı emtia poliçesi</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                                        <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    </div>
                                    <span>Kadrolu marangoz ve tesisat ustası desteği</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-400 hover:to-orange-400 text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-primary-500/25 group-hover:scale-[1.02]"
                                >
                                    <span>Sözleşmeli Taşıma Teklifi Al</span>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
