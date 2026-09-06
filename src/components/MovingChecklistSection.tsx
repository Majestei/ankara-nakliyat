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
        desc: "Ankara Özdemir Nakliyat ile iletişime geçerek K3 yetki belgeli, sabit fiyat garantili ve sigortalı taşıma tarihinizi kesinleştirin.",
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
        <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden border-t border-white/10" id="tasinma-rehberi">
            <div className="container-custom px-4 md:px-0 relative z-10">
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16 space-y-4">
                    <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] bg-primary-500/10 px-4 py-1.5 rounded-full border border-primary-500/20">
                        Stressiz Taşınma Rehberi
                    </span>
                    <h2 className="text-3xl md:text-6xl font-heading font-black tracking-tight">
                        Taşınma Öncesi & Sırası Kontrol Listesi
                    </h2>
                    <p className="text-slate-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
                        Taşınma gününün kaosa dönüşmesini engelleyin. 15 yıllık tecrübemizle hazırladığımız interaktif kontrol listesi ile süreci adım adım tamamlayın.
                    </p>

                    {/* İlerleme Çubuğu */}
                    <div className="max-w-md mx-auto pt-4">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-300 mb-2">
                            <span>Hazırlık Durumu: {completedCount} / {checklistItems.length} Madde</span>
                            <span className="text-primary-400 font-black">%{progressPercent} Tamamlandı</span>
                        </div>
                        <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary-500 to-orange-500 transition-all duration-500"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Dönem Sekmeleri */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-2xl md:rounded-full">
                        <button
                            onClick={() => setActiveTab("2_weeks")}
                            className={`px-4 md:px-8 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                                activeTab === "2_weeks" ? "bg-primary-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınmadan 2 Hafta Önce
                        </button>
                        <button
                            onClick={() => setActiveTab("3_days")}
                            className={`px-4 md:px-8 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                                activeTab === "3_days" ? "bg-primary-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınmadan 3 Gün Önce
                        </button>
                        <button
                            onClick={() => setActiveTab("moving_day")}
                            className={`px-4 md:px-8 py-2.5 rounded-xl md:rounded-full text-xs md:text-sm font-black uppercase tracking-wider transition-all ${
                                activeTab === "moving_day" ? "bg-primary-500 text-slate-950 shadow-lg" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Taşınma Günü
                        </button>
                    </div>
                </div>

                {/* Kontrol Listesi Kartları */}
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                    {filteredItems.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer select-none flex items-start gap-4 ${
                                    isChecked
                                        ? "bg-primary-500/10 border-primary-500/50 text-white"
                                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/[0.08]"
                                }`}
                            >
                                <div
                                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                                        isChecked
                                            ? "bg-primary-500 border-primary-500 text-slate-950"
                                            : "border-white/30 bg-white/5"
                                    }`}
                                >
                                    {isChecked && <IconCheck className="w-4 h-4 stroke-[3]" />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className={`text-base font-bold ${isChecked ? "text-primary-300 line-through" : "text-white"}`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Alt Çağrı Kartı */}
                <div className="max-w-4xl mx-auto p-6 md:p-8 bg-white/5 border border-white/10 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                    <div>
                        <h4 className="text-lg font-black text-white">Taşınma Sürecini Profesyonellere Bırakın</h4>
                        <p className="text-xs text-slate-400 mt-1">Ekspertiz ve sabit fiyat teklifi için haftanın 7 günü arayabilirsiniz.</p>
                    </div>
                    <a
                        href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                        className="px-8 py-3.5 bg-primary-500 hover:bg-primary-400 text-slate-950 rounded-xl font-black text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2"
                    >
                        <IconPhone className="w-4 h-4" /> Hemen Ara: {firmaBilgileri.phone}
                    </a>
                </div>
            </div>
        </section>
    );
}
