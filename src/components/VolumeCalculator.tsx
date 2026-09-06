"use client";

import React, { useState } from "react";
import { IconBox, IconTruck, IconCog, IconCheck, IconPhone, IconShield } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

interface RoomOption {
    id: string;
    label: string;
    sublabel: string;
    baseVolume: number; // m3
    truckType: string;
    crew: string;
    basePriceMin: number;
    basePriceMax: number;
}

const ROOM_OPTIONS: RoomOption[] = [
    {
        id: "parca",
        label: "Parça Eşya / Öğrenci",
        sublabel: "1-5 parça veya tek oda",
        baseVolume: 12,
        truckType: "Kamyonet (Panelvan)",
        crew: "2 Uzman Personel",
        basePriceMin: 3500,
        basePriceMax: 6500,
    },
    {
        id: "1plus1",
        label: "1+1 Daire",
        sublabel: "Standart eşya yoğunluğu",
        baseVolume: 25,
        truckType: "Kompakt Çelik Kasa Kamyon",
        crew: "1 Marangoz + 2 Personel",
        basePriceMin: 8000,
        basePriceMax: 12000,
    },
    {
        id: "2plus1",
        label: "2+1 Daire",
        sublabel: "En çok tercih edilen aile evi",
        baseVolume: 42,
        truckType: "Orta Boy Kapalı Kasa Kamyon",
        crew: "1 Marangoz + 3 Personel",
        basePriceMin: 12000,
        basePriceMax: 16500,
    },
    {
        id: "3plus1",
        label: "3+1 Daire",
        sublabel: "Geniş hacimli eşya yoğunluğu",
        baseVolume: 62,
        truckType: "Büyük Boy Geniş Hacimli Filo",
        crew: "1 Marangoz + 4 Personel",
        basePriceMin: 16500,
        basePriceMax: 23000,
    },
    {
        id: "4plus1",
        label: "4+1 & Villa",
        sublabel: "Maksimum kapasite veya dubleks",
        baseVolume: 90,
        truckType: "Mega Kamyon veya Çift Araç",
        crew: "2 Marangoz + 5 Personel",
        basePriceMin: 23000,
        basePriceMax: 35000,
    },
];

const FLOOR_OPTIONS = [
    { id: "low", label: "Zemin - 3. Kat", note: "Bina asansörü veya merdiven uygun", elevatorNeed: false, priceMod: 0 },
    { id: "mid", label: "4 - 8. Kat", note: "Modüler asansör tavsiye edilir", elevatorNeed: true, priceMod: 2500 },
    { id: "high", label: "9 - 15. Kat", note: "Dış cephe asansörü zorunlu", elevatorNeed: true, priceMod: 3500 },
    { id: "veryhigh", label: "16 - 25. Kat", note: "25. kata kadar teleskopik asansör", elevatorNeed: true, priceMod: 5000 },
];

export default function VolumeCalculator() {
    const [selectedRoom, setSelectedRoom] = useState<string>("2plus1");
    const [selectedFloor, setSelectedFloor] = useState<string>("mid");
    const [isVipPacking, setIsVipPacking] = useState<boolean>(false);
    const [hasPianoOrSafe, setHasPianoOrSafe] = useState<boolean>(false);

    const room = ROOM_OPTIONS.find((r) => r.id === selectedRoom) || ROOM_OPTIONS[2];
    const floor = FLOOR_OPTIONS.find((f) => f.id === selectedFloor) || FLOOR_OPTIONS[1];

    // Calculations
    const vipMultiplier = isVipPacking ? 1.35 : 1.0;
    const pianoExtra = hasPianoOrSafe ? 3000 : 0;
    const totalMin = Math.round(room.basePriceMin * vipMultiplier + floor.priceMod + pianoExtra);
    const totalMax = Math.round(room.basePriceMax * vipMultiplier + floor.priceMod + pianoExtra);

    const formatPrice = (num: number) => {
        return num.toLocaleString("tr-TR") + " ₺";
    };

    const whatsappMessage = encodeURIComponent(
        `Merhaba, web sitenizdeki Nakliyat Hesaplama Aracından hesaplama yaptım:\n` +
        `- Ev Tipi: ${room.label}\n` +
        `- Kat Durumu: ${floor.label}\n` +
        `- Paketleme: ${isVipPacking ? "Anahtar Teslim VIP (Toplamalı)" : "Standart (Müşteri Koliler)"}\n` +
        `- Özel Eşya: ${hasPianoOrSafe ? "Piyano/Kasa Var" : "Yok"}\n` +
        `- Tahmini Hacim: ${room.baseVolume} m³\n` +
        `- Hesaplanan Tutar: ${formatPrice(totalMin)} - ${formatPrice(totalMax)}\n` +
        `Uygun bir tarih için net teklif almak istiyorum.`
    );

    return (
        <section className="py-20 md:py-32 bg-slate-900 text-white relative overflow-hidden" id="hesaplama">
            <div className="container-custom max-w-6xl px-4 md:px-0 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <span className="text-primary-400 font-bold text-xs uppercase tracking-[0.3em] bg-primary-500/10 px-4 py-1.5 rounded-full border border-primary-500/20">
                        Akıllı Nakliyat Hesaplayıcı
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight">
                        Eşya Hacim & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400">Kamyon Kapasitesi</span> Hesaplama
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        Evinizin oda sayısını ve kat durumunu seçin; gereken araç boyunu, personel sayısını ve 2026 ortalama taşınma maliyetinizi 10 saniyede görün.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    
                    {/* Input Controls (Left Column) */}
                    <div className="lg:col-span-7 space-y-8 bg-slate-950/60 p-6 md:p-10 rounded-3xl border border-white/10 backdrop-blur-xl shadow-2xl">
                        
                        {/* Step 1: Ev / Oda Tipi */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary-500 text-slate-950 text-xs flex items-center justify-center font-black">1</span>
                                Konut Tipi ve Eşya Yoğunluğu
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {ROOM_OPTIONS.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        onClick={() => setSelectedRoom(opt.id)}
                                        className={`p-4 rounded-2xl text-left border transition-all ${
                                            selectedRoom === opt.id
                                                ? "bg-primary-500/15 border-primary-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                                                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
                                        }`}
                                    >
                                        <div className="font-bold text-sm text-white">{opt.label}</div>
                                        <div className="text-xs text-slate-400 mt-1">{opt.sublabel}</div>
                                        <div className="text-[11px] font-mono text-primary-400 mt-2 font-semibold">~{opt.baseVolume} m³ Hacim</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 2: Kat Durumu */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary-500 text-slate-950 text-xs flex items-center justify-center font-black">2</span>
                                Kat Durumu & Asansör İhtiyacı
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {FLOOR_OPTIONS.map((f) => (
                                    <button
                                        type="button"
                                        key={f.id}
                                        onClick={() => setSelectedFloor(f.id)}
                                        className={`p-4 rounded-2xl text-left border transition-all ${
                                            selectedFloor === f.id
                                                ? "bg-primary-500/15 border-primary-500 text-white shadow-[0_0_20px_rgba(249,115,22,0.2)]"
                                                : "bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-slate-200"
                                        }`}
                                    >
                                        <div className="font-bold text-sm text-white">{f.label}</div>
                                        <div className="text-xs text-slate-400 mt-1">{f.note}</div>
                                        {f.elevatorNeed && (
                                            <div className="text-[10px] uppercase tracking-wider text-orange-400 mt-2 font-bold">
                                                Modüler Asansör Dahil
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Step 3: Paketleme ve Özel İstekler */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-primary-500 text-slate-950 text-xs flex items-center justify-center font-black">3</span>
                                Hizmet Kapsamı & Opsiyonlar
                            </label>
                            <div className="space-y-3">
                                <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={isVipPacking}
                                        onChange={(e) => setIsVipPacking(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-white/20 text-primary-500 focus:ring-primary-500 bg-slate-900 cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-bold text-sm text-white block">
                                            Anahtar Teslim VIP Paketleme (Tüm Eşyaları Biz Kolileyelim)
                                        </span>
                                        <span className="text-xs text-slate-400 block mt-0.5">
                                            Mutfak porselenleri, bardaklar, giysiler ve kitaplar dahil hiçbir şeye dokunmazsınız. Ekibimiz özel kolilerle toplar ve yerleştirir.
                                        </span>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:border-white/20 transition-all">
                                    <input
                                        type="checkbox"
                                        checked={hasPianoOrSafe}
                                        onChange={(e) => setHasPianoOrSafe(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-white/20 text-primary-500 focus:ring-primary-500 bg-slate-900 cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-bold text-sm text-white block">
                                            Ağır Eşya (Kuyruklu/Duvar Piyanosu veya Çelik Kasa)
                                        </span>
                                        <span className="text-xs text-slate-400 block mt-0.5">
                                            Özel kızaklı aparatlar ve takviyeli taşıma personeli tahsis edilir.
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>

                    </div>

                    {/* Result Output Card (Right Column) */}
                    <div className="lg:col-span-5 sticky top-28 bg-gradient-to-b from-slate-950 to-slate-900 border-2 border-primary-500/40 rounded-3xl p-6 md:p-8 shadow-[0_20px_70px_rgba(249,115,22,0.15)] space-y-6">
                        <div className="flex items-center justify-between pb-6 border-b border-white/10">
                            <div>
                                <span className="text-xs font-bold text-primary-400 uppercase tracking-widest block">Öngörülen Maliyet</span>
                                <div className="text-3xl md:text-4xl font-black text-white mt-1">
                                    {formatPrice(totalMin)} – {formatPrice(totalMax)}
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-bold">
                                KDV & Sigorta Dahil
                            </span>
                        </div>

                        {/* Calculated Specifications */}
                        <div className="space-y-4 text-sm">
                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <IconBox className="w-4 h-4 text-primary-400" /> Tahmini Eşya Hacmi:
                                </span>
                                <span className="font-bold text-white font-mono">{room.baseVolume} m³</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <IconTruck className="w-4 h-4 text-primary-400" /> Gerekli Araç:
                                </span>
                                <span className="font-bold text-white text-right text-xs md:text-sm">{room.truckType}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <IconCog className="w-4 h-4 text-primary-400" /> Ekip Dağılımı:
                                </span>
                                <span className="font-bold text-white text-right text-xs md:text-sm">{room.crew}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <IconShield className="w-4 h-4 text-primary-400" /> Dış Cephe Asansörü:
                                </span>
                                <span className="font-bold text-white">
                                    {floor.elevatorNeed ? "Kurulacak (Dahil)" : "Merdiven / İsteğe Bağlı"}
                                </span>
                            </div>
                        </div>

                        {/* Free Extras Guarantee Box */}
                        <div className="bg-primary-500/10 border border-primary-500/20 rounded-2xl p-4 text-xs space-y-2">
                            <div className="font-bold text-primary-300 flex items-center gap-1.5">
                                <IconCheck className="w-4 h-4 text-green-400 shrink-0" /> Fiyata Dahil Ücretsiz Hizmetlerimiz:
                            </div>
                            <ul className="text-slate-300 space-y-1 list-disc list-inside">
                                <li>Kadrolu marangoz ile gardırop & baza montajı</li>
                                <li>Çamaşır ve bulaşık makinesi su tesisat bağlantısı</li>
                                <li>Tüm mobilyaların çift kat patpat naylonla zırhlanması</li>
                                <li>Taşınma anından teslimata Axa/Allianz emtia sigortası</li>
                            </ul>
                        </div>

                        {/* Direct Action Buttons */}
                        <div className="space-y-3 pt-2">
                            <a
                                href={`https://wa.me/90${firmaBilgileri.phone.replace(/\D/g, "")}?text=${whatsappMessage}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-4 bg-green-500 hover:bg-green-600 text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-green-500/20"
                            >
                                WhatsApp ile Bu Fiyata Teklif Al
                            </a>

                            <a
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white font-black text-sm uppercase tracking-wider rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-primary-500/20"
                            >
                                <IconPhone className="w-4 h-4" /> Eksper Çağır: {firmaBilgileri.phone}
                            </a>
                        </div>

                        <p className="text-[11px] text-slate-500 text-center italic">
                            * Kesin fiyat taşınma günü öncesi ücretsiz video veya fiziki ekspertiz ile sabitlenir. Kapıda sürpriz masraf çıkmaz.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}
