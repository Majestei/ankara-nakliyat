"use client";

import React from "react";
import Link from "next/link";
import { IconMapPin, IconArrow } from "@/components/Icons";

export default function AnkaraGuideSection() {
    const districts = [
        {
            name: "Çankaya, Ayrancı & Dikmen",
            slug: "cankaya",
            tag: "Dar Sokak ve Erişim Planı",
            desc: "Yokuş, dar sokak ve yoğun trafik bulunan adreslerde araç durma noktasını, bina girişini ve gerekirse dış cephe ekipmanı uygunluğunu önceden değerlendirin.",
        },
        {
            name: "Keçiören & Mamak",
            slug: "kecioren",
            tag: "Yüksek Kat & Dikey Lojistik",
            desc: "Yüksek katlarda merdiven ölçüsü, bina asansörünün kullanım izni ve dış cephe ekipmanının kurulum alanı birlikte değerlendirilmelidir.",
        },
        {
            name: "Yenimahalle, Batıkent & Çayyolu",
            slug: "yenimahalle",
            tag: "Site Girişi ve Saat Planı",
            desc: "Site yönetiminin taşıma saati, araç girişi, ortak alan ve kapalı otopark koşullarını iki adres için de önceden öğrenin.",
        },
        {
            name: "Etimesgut, Sincan & Eryaman",
            slug: "etimesgut",
            tag: "Tarih ve Araç Planı",
            desc: "Adres, eşya listesi ve tercih edilen tarihi paylaşarak araç uygunluğunu görüşün. Site giriş koşulları ile yükleme mesafesini önceden belirtin.",
        },
        {
            name: "Gölbaşı & İncek",
            slug: "golbasi",
            tag: "Büyük Eşya ve Erişim",
            desc: "Müstakil veya çok katlı konutlarda katları, bahçe geçişini, büyük eşyaları ve gereken paketleme işlerini teklif öncesi listeleyin.",
        },
        {
            name: "Pursaklar & Akyurt",
            slug: "pursaklar",
            tag: "Rota ve Teslim Planı",
            desc: "Şehir içi veya parça eşya talebinde çıkış ve varış adresini, teslim aralığını ve güncel rota koşullarını birlikte görüşün.",
        },
    ];

    return (
        <section className="py-24 md:py-36 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-100/50 rounded-full blur-[140px] pointer-events-none" />

            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-5">
                    <span className="inline-flex items-center gap-3 bg-white border border-slate-200/80 px-6 py-2 rounded-full shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                        <span className="text-slate-700 font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                            İlçe Bazlı Planlama
                        </span>
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-tight text-slate-950">
                        Ankara&apos;nın Her İlçesine <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-orange-500 to-amber-600 italic font-normal">
                            Özel Taşınma Çözümleri.
                        </span>
                    </h2>

                    <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                        Ankara&apos;nın her semtinin kendine has mimari, sokak ve bina koşulları vardır. Taşınma planını iki adresin erişim koşulları ve eşya bilgilerine göre oluşturmak gerekir.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {districts.map((d, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200/80 rounded-[2.5rem] p-8 md:p-9 flex flex-col justify-between hover:border-primary-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden"
                        >
                            {/* Card Top Accent Glow */}
                            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-500 via-orange-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div>
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-primary-50 border border-primary-100/80 text-primary-600 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300 shadow-sm">
                                        <IconMapPin className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200/60 px-3.5 py-1.5 rounded-full">
                                        {d.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl md:text-2xl font-black text-slate-950 mb-3 tracking-tight group-hover:text-primary-600 transition-colors">
                                    {d.name}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-600 leading-relaxed mb-6">
                                    {d.desc}
                                </p>
                            </div>

                            <div className="mt-4 pt-6 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                    href={`/islemler/ankara/${d.slug}`}
                                    className="rounded-full px-5 py-2.5 bg-slate-100 group-hover:bg-primary-500 group-hover:text-white text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-sm"
                                >
                                    <span>İlçe Hizmetlerini İncele</span>
                                    <IconArrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
