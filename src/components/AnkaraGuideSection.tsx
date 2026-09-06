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
        <section className="py-20 md:py-32 bg-slate-50 text-slate-900 relative overflow-hidden border-t border-slate-200">
            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-primary-600 font-black text-xs uppercase tracking-[0.4em] bg-primary-50 px-4 py-1.5 rounded-full border border-primary-200">
                        Yerel Saha Hakimiyeti
                    </span>
                    <h2 className="text-3xl md:text-6xl font-heading font-black tracking-tight text-slate-950">
                        Ankara&apos;nın Her İlçesine Özel Taşınma Çözümleri
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg">
                        Ankara&apos;nın her semtinin kendine has mimari, sokak ve bina koşulları vardır. 15 yılı aşkın başkent tecrübemizle her bölgeye özel strateji uyguluyoruz.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {districts.map((d, i) => (
                        <div
                            key={i}
                            className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between hover:border-primary-500 hover:shadow-xl transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                                        <IconMapPin className="w-5 h-5" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                        {d.tag}
                                    </span>
                                </div>
                                <h3 className="text-xl font-black text-slate-950 mb-3">{d.name}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{d.desc}</p>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                                <Link
                                    href={`/islemler/ankara/${d.slug}`}
                                    className="text-xs font-black text-primary-600 hover:text-primary-700 uppercase tracking-wider flex items-center gap-2 group"
                                >
                                    İlçe Hizmetlerini İncele
                                    <IconArrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
