"use client";

import React from "react";
import { IconShield, IconCheck, IconTruck, IconClipboard } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

export default function ContractGuaranteeSection() {
    return (
        <section className="py-20 md:py-32 bg-slate-950 text-white relative overflow-hidden border-t border-white/10">
            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                    
                    {/* Sol Metin / Karşılaştırma Alanı */}
                    <div className="lg:col-span-7 space-y-6">
                        <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] bg-primary-500/10 px-4 py-1.5 rounded-full border border-primary-500/20">
                            Güvenli Nakliyat Rehberi
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight">
                            Neden Aracı Komisyoncular Değil, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-500">
                                K3 Belgeli Özmal Firma?
                            </span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                            İnternette veya aracı platformlarda (komisyoncu siteler) verilen düşük fiyatlara kanıp taşınma günü kapıda &ldquo;eşya çok çıktı, kat zormuş&rdquo; diyerek 2 katı para talep edilen mağduriyetleri her gün duyuyoruz. <strong>Ankara Özdemir Nakliyat</strong> olarak bu tuzaklara son veriyoruz.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 space-y-3">
                                <h3 className="text-red-400 font-bold text-sm flex items-center gap-2">
                                    <span>❌</span> Belgesiz & Komisyoncu Siteler
                                </h3>
                                <ul className="text-xs text-slate-400 space-y-2">
                                    <li>• İş komisyon karşılığı tanınmayan şahıslara devredilir</li>
                                    <li>• Taşınma günü kapıda keyfi fiyat artırılır</li>
                                    <li>• Resmi K3 belgesi ve nakliyat sigortası yoktur</li>
                                    <li>• Eşya kırıldığında muhatap bulunamaz</li>
                                </ul>
                            </div>

                            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 space-y-3">
                                <h3 className="text-emerald-400 font-bold text-sm flex items-center gap-2">
                                    <span>✅</span> Ankara Özdemir Nakliyat
                                </h3>
                                <ul className="text-xs text-slate-300 space-y-2">
                                    <li>• Kendi logolu özmal çelik kasa filomuz gelir</li>
                                    <li>• İmzalı yazılı sözleşme ile fiyat kesinlikle sabittir</li>
                                    <li>• Ulaştırma Bakanlığı onaylı K3 taşımacılık lisansı</li>
                                    <li>• Allianz/Axa resmi emtia nakliyat sigortası</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sağ Sözleşme Güvencesi Rozet Kartı */}
                    <div className="lg:col-span-5">
                        <div className="p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 space-y-6 relative overflow-hidden">
                            <div className="w-14 h-14 rounded-2xl bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400">
                                <IconClipboard className="w-8 h-8" />
                            </div>

                            <div>
                                <h3 className="text-2xl font-black text-white tracking-tight mb-2">
                                    Yazılı Sözleşme & Sabit Fiyat Garantisi
                                </h3>
                                <p className="text-xs text-slate-300 leading-relaxed">
                                    Taşınma gününden önce adresinizde veya dijital ekspertizle belirlenen tüm koşullar (araç plakası, personel sayısı, taşınma tarihi/saati ve net tutar) ıslak imzalı veya dijital onaylı sözleşmemize yazılır.
                                </p>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                                <div className="flex items-center gap-3">
                                    <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Sürpriz ve gizli ek masraf yok</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>T.C. Ulaştırma Bakanlığı K3 Yetki Lisansı</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Axa / Allianz tam kapsamlı emtia poliçesi</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Kadrolu marangoz ve tesisat ustası desteği</span>
                                </div>
                            </div>

                            <div className="pt-2">
                                <a
                                    href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                    className="w-full py-4 bg-primary-500 hover:bg-primary-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                                >
                                    Sözleşmeli Taşıma Teklifi Al
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
