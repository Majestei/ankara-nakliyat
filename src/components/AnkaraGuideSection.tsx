"use client";

import React from "react";
import Link from "next/link";
import { IconMapPin, IconArrow } from "@/components/Icons";

export default function AnkaraGuideSection() {
    const districts = [
        {
            name: "Çankaya, Ayrancı & Dikmen",
            slug: "cankaya",
            tag: "Yokuş & Dar Sokak Uzmanlığı",
            desc: "Dik yokuşlar, dar sokaklar ve yoğun cadde trafiğinde kompakt araçlarımız ve emniyetli dış cephe asansör kurulum planlamamız ile sorunsuz nakliye.",
        },
        {
            name: "Keçiören & Mamak",
            slug: "kecioren",
            tag: "Yüksek Kat & Dikey Lojistik",
            desc: "15+ kata kadar uzanan hidrolik teleskopik asansörlerimiz ile bina içi merdivenleri ve site asansörlerini meşgul etmeden hızlı ve hasarsız tahliye.",
        },
        {
            name: "Yenimahalle, Batıkent & Çayyolu",
            slug: "yenimahalle",
            tag: "Site İçi Yönetim Uyumlu",
            desc: "Geniş site yerleşimlerinde yönetim izinleri, peyzaj koruma ve kapalı otopark giriş saatlerine tam riayet ederek gürültüsüz, düzenli taşınma.",
        },
        {
            name: "Etimesgut, Sincan & Eryaman",
            slug: "etimesgut",
            tag: "Aynı Gün Hızlı Sevkiyat",
            desc: "Merkez filo ve operasyon üssümüze yakınlık avantajıyla aynı gün acil ekspertiz ve dakik araç tahsisi ile en ekonomik fiyat garantisi.",
        },
        {
            name: "Gölbaşı & İncek",
            slug: "golbasi",
            tag: "Villa & Geniş Konutlar",
            desc: "Müstakil konutlar, dubleks daireler ve geniş bahçeli villalar için çoklu kamyon filosu, özel ahşap sandıklama ve VIP paketleme hizmeti.",
        },
        {
            name: "Pursaklar & Akyurt",
            slug: "pursaklar",
            tag: "Havaalanı Yolu & Sanayi Ağı",
            desc: "Hızlı çevre yolu bağlantısı sayesinde hem şehir içi ev taşıma hem de parsiyel parça eşya sevkiyatlarında kesintisiz lojistik destek.",
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
                            Yerel Saha Hakimiyeti
                        </span>
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-tight text-slate-950">
                        Ankara&apos;nın Her İlçesine <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-orange-500 to-amber-600 italic font-normal">
                            Özel Taşınma Çözümleri.
                        </span>
                    </h2>

                    <p className="text-slate-600 text-sm md:text-lg leading-relaxed">
                        Ankara&apos;nın her semtinin kendine has mimari, sokak ve bina koşulları vardır. 15 yılı aşkın başkent tecrübemizle her bölgeye özel lojistik stratejisi uyguluyoruz.
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
