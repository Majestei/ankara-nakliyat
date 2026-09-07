"use client";

import React, { useState } from "react";
import { IconBox, IconTruck, IconCog, IconCheck, IconPhone, IconShield, IconArrow } from "@/components/Icons";
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
        <section className="py-24 md:py-36 bg-slate-950 text-white relative overflow-hidden" id="hesaplama">
            {/* Cinematic Perspective Grid & Ambient Glow */}
            <div
                className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block opacity-5"
                style={{
                    backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                    transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)",
                }}
            />
            <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary-500/15 rounded-full blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-orange-500/15 rounded-full blur-[160px] pointer-events-none" />

            <div className="container-custom max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6">
                    <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full backdrop-blur-xl shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em]">
                            Akıllı Kapasite ve Hacim Motoru
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black tracking-tighter leading-[0.95] text-white">
                        Eşya Hacmi & <br />
                        <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-amber-400 italic font-normal">
                            Kamyon Kapasitesi.
                        </span>
                    </h2>

                    <p className="text-white/40 text-base md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                        Evinizin oda sayısını ve kat durumunu seçin; gereken araç boyunu, personel sayısını ve 2026 ortalama taşınma maliyetinizi saniyeler içinde hesaplayın.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Input Controls (Left Column) */}
                    <div className="lg:col-span-7 space-y-8 bg-white/[0.03] backdrop-blur-2xl p-6 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
                        {/* Step 1: Ev / Oda Tipi */}
                        <div>
                            <label className="block text-xs font-black text-white/80 mb-4 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500 to-orange-600 text-white text-xs flex items-center justify-center font-black shadow-md shadow-primary-500/30">
                                    1
                                </span>
                                <span>Konut Tipi & Eşya Yoğunluğu</span>
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3.5">
                                {ROOM_OPTIONS.map((opt) => {
                                    const isSelected = selectedRoom === opt.id;
                                    return (
                                        <button
                                            type="button"
                                            key={opt.id}
                                            onClick={() => setSelectedRoom(opt.id)}
                                            className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group ${
                                                isSelected
                                                    ? "bg-gradient-to-br from-primary-500/20 via-primary-500/10 to-transparent border-primary-500 shadow-xl shadow-primary-500/20"
                                                    : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-500 text-slate-950 flex items-center justify-center text-xs font-black">
                                                    ✓
                                                </div>
                                            )}
                                            <div className="font-heading font-black text-base text-white group-hover:text-primary-300 transition-colors">
                                                {opt.label}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-1">{opt.sublabel}</div>
                                            <div className="inline-block px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-primary-400 mt-3 font-semibold">
                                                ~{opt.baseVolume} m³ Hacim
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 2: Kat Durumu */}
                        <div>
                            <label className="block text-xs font-black text-white/80 mb-4 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500 to-orange-600 text-white text-xs flex items-center justify-center font-black shadow-md shadow-primary-500/30">
                                    2
                                </span>
                                <span>Kat Durumu & Asansör İhtiyacı</span>
                            </label>
                            <div className="grid sm:grid-cols-2 gap-3.5">
                                {FLOOR_OPTIONS.map((f) => {
                                    const isSelected = selectedFloor === f.id;
                                    return (
                                        <button
                                            type="button"
                                            key={f.id}
                                            onClick={() => setSelectedFloor(f.id)}
                                            className={`p-5 rounded-2xl text-left border transition-all duration-300 relative overflow-hidden group ${
                                                isSelected
                                                    ? "bg-gradient-to-br from-primary-500/20 via-primary-500/10 to-transparent border-primary-500 shadow-xl shadow-primary-500/20"
                                                    : "bg-white/[0.02] border-white/10 text-slate-400 hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-primary-500 text-slate-950 flex items-center justify-center text-xs font-black">
                                                    ✓
                                                </div>
                                            )}
                                            <div className="font-heading font-black text-base text-white group-hover:text-primary-300 transition-colors">
                                                {f.label}
                                            </div>
                                            <div className="text-xs text-slate-400 mt-1">{f.note}</div>
                                            {f.elevatorNeed && (
                                                <div className="inline-block text-[10px] uppercase tracking-wider text-amber-400 mt-2.5 font-bold">
                                                    ★ Modüler Asansör Dahil
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Step 3: Paketleme ve Özel İstekler */}
                        <div>
                            <label className="block text-xs font-black text-white/80 mb-4 uppercase tracking-widest flex items-center gap-3">
                                <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-primary-500 to-orange-600 text-white text-xs flex items-center justify-center font-black shadow-md shadow-primary-500/30">
                                    3
                                </span>
                                <span>Hizmet Kapsamı & Opsiyonel Seçimler</span>
                            </label>
                            <div className="space-y-3.5">
                                <label className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                    isVipPacking
                                        ? "bg-primary-500/10 border-primary-500/60 shadow-lg shadow-primary-500/10"
                                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                }`}>
                                    <input
                                        type="checkbox"
                                        checked={isVipPacking}
                                        onChange={(e) => setIsVipPacking(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded-md border-white/20 text-primary-500 focus:ring-primary-500 bg-slate-900 cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-black text-sm text-white block">
                                            Anahtar Teslim VIP Paketleme (Tüm Evi Ekibimiz Toplasın)
                                        </span>
                                        <span className="text-xs text-slate-400 block mt-1 leading-relaxed">
                                            Mutfak porselenleri, bardaklar, giysiler ve kitaplar dahil hiçbir şeye dokunmazsınız. Ekibimiz özel kolilerle toplar ve yeni evinizde yerleştirir.
                                        </span>
                                    </div>
                                </label>

                                <label className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
                                    hasPianoOrSafe
                                        ? "bg-primary-500/10 border-primary-500/60 shadow-lg shadow-primary-500/10"
                                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                                }`}>
                                    <input
                                        type="checkbox"
                                        checked={hasPianoOrSafe}
                                        onChange={(e) => setHasPianoOrSafe(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded-md border-white/20 text-primary-500 focus:ring-primary-500 bg-slate-900 cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-black text-sm text-white block">
                                            Ağır Eşya & Özel Yük (Kuyruklu/Duvar Piyanosu veya Çelik Kasa)
                                        </span>
                                        <span className="text-xs text-slate-400 block mt-1 leading-relaxed">
                                            Özel kızaklı taşıma aparatları ve deneyimli ağır yük personeli tahsis edilir.
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Result Output Card (Right Column) */}
                    <div className="lg:col-span-5 sticky top-28 bg-gradient-to-b from-primary-950/70 via-slate-900/95 to-slate-950 border-2 border-primary-500 rounded-[2.5rem] p-7 md:p-10 shadow-[0_25px_70px_rgba(249,115,22,0.25)] space-y-6 relative overflow-hidden backdrop-blur-2xl">
                        {/* Top glow pill */}
                        <div className="flex items-center justify-between pb-6 border-b border-white/10">
                            <div>
                                <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest block">
                                    Öngörülen Taşınma Tutarı
                                </span>
                                <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-primary-300 mt-1 tracking-tight">
                                    {formatPrice(totalMin)} – {formatPrice(totalMax)}
                                </div>
                            </div>
                            <span className="px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-[11px] font-bold">
                                KDV &amp; Sigorta Dahil
                            </span>
                        </div>

                        {/* Live Volume Meter Bar */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-semibold">
                                <span className="text-slate-400">Kamyon Doluluk Oranı</span>
                                <span className="text-primary-400 font-mono font-bold">~{room.baseVolume} m³ / 90 m³</span>
                            </div>
                            <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5">
                                <div
                                    className="h-full bg-gradient-to-r from-primary-500 via-orange-500 to-amber-400 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]"
                                    style={{ width: `${Math.min(100, Math.round((room.baseVolume / 90) * 100))}%` }}
                                />
                            </div>
                        </div>

                        {/* Calculated Specifications */}
                        <div className="space-y-3.5 text-xs sm:text-sm pt-2">
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
                                <span className="font-bold text-white text-right text-xs sm:text-sm">{room.truckType}</span>
                            </div>

                            <div className="flex items-center justify-between py-2 border-b border-white/5">
                                <span className="text-slate-400 flex items-center gap-2">
                                    <IconCog className="w-4 h-4 text-primary-400" /> Ekip Dağılımı:
                                </span>
                                <span className="font-bold text-white text-right text-xs sm:text-sm">{room.crew}</span>
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
                        <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-4 text-xs space-y-2">
                            <div className="font-bold text-primary-300 flex items-center gap-1.5">
                                <IconCheck className="w-4 h-4 text-emerald-400 shrink-0" /> Fiyata Dahil Ücretsiz Hizmetlerimiz:
                            </div>
                            <ul className="text-slate-300 space-y-1 list-disc list-inside text-[11px] leading-relaxed">
                                <li>Kadrolu marangoz ile gardırop &amp; baza montajı</li>
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
                                className="inline-flex items-center justify-center gap-3 w-full py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-emerald-500/20"
                            >
                                <span>WhatsApp İle Bu Fiyata Teklif Al</span>
                                <span>↗</span>
                            </a>

                            <a
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="btn-primary !w-full !py-4 text-xs font-black uppercase tracking-widest text-center flex items-center justify-center gap-3 shadow-xl shadow-primary-500/30"
                            >
                                <IconPhone className="w-4 h-4" />
                                <span>Eksper Çağır: {firmaBilgileri.phone}</span>
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
