"use client";

import React, { useState } from "react";
import { IconCheck, IconClipboard, IconPhone } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

interface ChecklistItem {
    id: string;
    stage: "2_weeks" | "3_days" | "moving_day";
    title: string;
    desc: string;
}

const checklistItems: ChecklistItem[] = [
    // 2 Hafta Önce
    {
        id: "c1",
        stage: "2_weeks",
        title: "Bina Yöneticisi ve Asansör Rezervasyonu",
        desc: "Hem taşınacağınız hem de ayrılacağınız bina yönetimlerine taşınma tarihini bildirip araç park yeri ve yük asansörü izni alın.",
    },
    {
        id: "c2",
        stage: "2_weeks",
        title: "Fazlalık Eşyaları Ayrıştırma & Hafifleme",
        desc: "Kullanılmayan, eskiyen eşyaları ayırın veya bağışlayın. Taşınacak eşya hacmi ne kadar az olursa nakliye masrafınız o kadar düşer.",
    },
    {
        id: "c3",
        stage: "2_weeks",
        title: "Resmi Sözleşmeli Nakliyat Rezervasyonu",
        desc: "Ankara Özdemir Nakliyat ile tarih ve adres uygunluğunu görüşün. Dahil hizmetleri, fiyat koşullarını ve varsa poliçe kapsamını yazılı olarak netleştirin.",
    },
    {
        id: "c4",
        stage: "2_weeks",
        title: "Abonelik İptal ve Nakil Başvuruları",
        desc: "Elektrik, su, doğalgaz ve ev interneti aboneliklerinizin nakil veya kapatma randevularını taşınma gününe göre ayarlayın.",
    },

    // 3 Gün Önce
    {
        id: "c5",
        stage: "3_days",
        title: "Buzdolabını Boşaltma ve Eritme",
        desc: "Buzdolabı ve derin dondurucudaki gıdaları tüketin. Taşınmadan 24 saat önce fişini çekerek içindeki buzların erimesini sağlayın.",
    },
    {
        id: "c6",
        stage: "3_days",
        title: "Kişisel Değerli Eşya Çantası Hazırlığı",
        desc: "Ziynet eşyaları, nakit para, tapu, pasaport, dizüstü bilgisayar ve özel evrakları nakliye aracına vermeyip yanınıza alacağınız çantada toplayın.",
    },
    {
        id: "c7",
        stage: "3_days",
        title: "İlk Gece Acil İhtiyaç Çantası",
        desc: "Taşınma gecesi ve ertesi sabah için giysi, havlu, şarj aleti, temel ilaçlar ve tuvalet kağıdı gibi eşyaları ayrı bir bavulda tutun.",
    },
    {
        id: "c8",
        stage: "3_days",
        title: "Yeni Evin Temizlik ve Anahtar Kontrolü",
        desc: "Eşyalar girmeden önce yeni evin zemin ve dolap temizliğini tamamlayın, tüm kapı ve kilitlerin çalıştığından emin olun.",
    },

    // Taşınma Günü
    {
        id: "c9",
        stage: "moving_day",
        title: "Sayaçların Son Endeks Fotoğraflarını Çekin",
        desc: "Eski evinizden ayrılmadan önce elektrik, su ve doğalgaz sayaçlarının net fotoğraflarını çekerek güvenceye alın.",
    },
    {
        id: "c10",
        stage: "moving_day",
        title: "Ekip Şefi İle Odaların Planlanması",
        desc: "Gelen marangoz ve taşıma ekibimize hangi mobilyanın yeni evde hangi odaya kurulacağını kısaca tarif edin.",
    },
    {
        id: "c11",
        stage: "moving_day",
        title: "Tüm Dolap ve Kilerleri Son Kez Tarayın",
        desc: "Balkon, mutfak dolapları, kiler ve vestiyerde unutulan eşya kalmadığından emin olmak için son bir tur atın.",
    },
    {
        id: "c12",
        stage: "moving_day",
        title: "Montaj ve Beyaz Eşya Kontrolü İle Teslim Alın",
        desc: "Gardırop kapakları, baza mekanizmaları ve çamaşır/bulaşık makinesi bağlantılarını yerinde test edip teslim tutanağını imzalayın.",
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

export default function MovingChecklistSection() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState<"2_weeks" | "3_days" | "moving_day">("2_weeks");

    const toggleItem = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    const progressPercent = Math.round((completedCount / checklistItems.length) * 100);

    const filteredItems = checklistItems.filter((item) => item.stage === activeTab);

    return (
        <section className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden border-t border-white/10" id="tasinma-rehberi">
            <PerspectiveGrid opacity="0.05" color="#fff" />

            {/* Ambient Aurora Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[400px] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20 space-y-5">
                    <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-xl">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em]">
                            Stressiz Taşınma Rehberi
                        </span>
                    </span>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white tracking-tighter leading-tight">
                        Taşınma Öncesi & Sırası <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                            Kontrol Listesi.
                        </span>
                    </h2>

                    <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Taşınma gününün kaosa dönüşmesini engelleyin. Bu interaktif kontrol listesi ile süreci adım adım tamamlayın.
                    </p>

                    {/* İlerleme Çubuğu - Neon Glow & Frosted Card */}
                    <div className="max-w-lg mx-auto pt-4">
                        <div className="p-4 md:p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-xl">
                            <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2.5">
                                <span className="flex items-center gap-2">
                                    <IconClipboard className="w-4 h-4 text-primary-400" />
                                    <span>Hazırlık Durumu: <strong>{completedCount}</strong> / {checklistItems.length} Madde</span>
                                </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400 font-black text-sm">
                                    %{progressPercent}
                                </span>
                            </div>
                            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 via-orange-400 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.6)]"
                                    style={{ width: `${progressPercent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dönem Sekmeleri - Frosted Glass Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-2xl shadow-xl max-w-full overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("2_weeks")}
                            className={`px-5 sm:px-8 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                activeTab === "2_weeks"
                                    ? "bg-gradient-to-r from-primary-500 to-orange-500 text-slate-950 shadow-lg shadow-primary-500/25 scale-100"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınmadan 2 Hafta Önce
                        </button>
                        <button
                            onClick={() => setActiveTab("3_days")}
                            className={`px-5 sm:px-8 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                activeTab === "3_days"
                                    ? "bg-gradient-to-r from-primary-500 to-orange-500 text-slate-950 shadow-lg shadow-primary-500/25 scale-100"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınmadan 3 Gün Önce
                        </button>
                        <button
                            onClick={() => setActiveTab("moving_day")}
                            className={`px-5 sm:px-8 py-3 rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                                activeTab === "moving_day"
                                    ? "bg-gradient-to-r from-primary-500 to-orange-500 text-slate-950 shadow-lg shadow-primary-500/25 scale-100"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınma Günü
                        </button>
                    </div>
                </div>

                {/* Kontrol Listesi Kartları */}
                <div className="grid md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto mb-14">
                    {filteredItems.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-6 sm:p-7 rounded-[2rem] border transition-all duration-300 cursor-pointer select-none flex items-start gap-4 md:gap-5 backdrop-blur-xl group hover:-translate-y-1 ${
                                    isChecked
                                        ? "bg-primary-500/10 border-primary-500/50 shadow-[0_0_25px_rgba(249,115,22,0.15)]"
                                        : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06] hover:border-white/20"
                                }`}
                            >
                                <div
                                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border transition-all duration-300 ${
                                        isChecked
                                            ? "bg-gradient-to-br from-primary-500 to-orange-500 border-primary-400 text-slate-950 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                                            : "border-white/20 bg-white/5 group-hover:border-primary-500/40"
                                    }`}
                                >
                                    {isChecked && <IconCheck className="w-4 h-4 stroke-[3]" />}
                                </div>
                                <div className="space-y-1.5 flex-1">
                                    <h3 className={`text-base font-bold transition-colors ${isChecked ? "text-primary-300 line-through opacity-80" : "text-white group-hover:text-primary-400"}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Alt Çağrı Kartı - Ultra-luxury Glass Bar */}
                <div className="max-w-5xl mx-auto p-8 md:p-10 bg-white/[0.04] border border-white/10 backdrop-blur-2xl rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-1">
                        <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-primary-400 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Profesyonel Destek</span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">Taşınma Sürecini Profesyonellere Bırakın</h4>
                        <p className="text-xs md:text-sm text-slate-400">Adres, eşya ve tarih bilgilerinizle hizmet kapsamını ve güncel teklifi görüşebilirsiniz.</p>
                    </div>
                    <a
                        href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                        className="relative z-10 px-8 py-4 bg-gradient-to-r from-primary-500 to-orange-500 hover:from-primary-400 hover:to-orange-400 text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all shrink-0 flex items-center gap-3 shadow-lg shadow-primary-500/25 group-hover:scale-105"
                    >
                        <IconPhone className="w-4 h-4" />
                        <span>Hemen Ara: {firmaBilgileri.phone}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
