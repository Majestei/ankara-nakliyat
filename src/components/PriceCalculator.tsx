"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    IconTruck, 
    IconBox, 
    IconHome, 
    IconMoney, 
    IconArrow, 
    IconCog, 
    IconCheck,
    IconPlus,
    IconMobile
} from "./Icons";

export default function PriceCalculator() {
    const [roomCount, setRoomCount] = useState("2+1");
    const [distance, setDistance] = useState(10);
    const [fromFloor, setFromFloor] = useState(1);
    const [toFloor, setToFloor] = useState(1);
    const [elevator, setElevator] = useState(true);
    const [packing, setPacking] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    const roomFactors: Record<string, number> = {
        "Stüdyo": 2500,
        "1+1": 3500,
        "2+1": 5500,
        "3+1": 7500,
        "4+1+": 10000,
        "Ofis": 4500
    };

    useEffect(() => {
        let base = roomFactors[roomCount] || 5000;
        let distCost = distance * 25;
        let floorCost = (fromFloor + toFloor) * 200;
        let serviceCost = (elevator ? 1500 : 0) + (packing ? 2000 : 0);
        
        setTotalPrice(base + distCost + floorCost + serviceCost);
    }, [roomCount, distance, fromFloor, toFloor, elevator, packing]);

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50" id="hesaplama">
            {/* Ultra Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary-100 blur-[150px] rounded-full animate-blob"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-100 blur-[150px] rounded-full animate-blob delay-500"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            <div className="container-custom relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-6 py-2 rounded-full bg-white border border-primary-200 text-primary-600 text-sm font-black uppercase tracking-[0.4em] mb-6 shadow-sm"
                        >
                            Akıllı Fiyatlandırma
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-heading font-black text-slate-900 mb-8 leading-tight"
                        >
                            Taşınma Maliyetini <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Hemen Hesapla</span>
                        </motion.h2>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">
                        {/* Control Panel */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-7 bg-white/80 backdrop-blur-3xl border border-slate-200 rounded-[3.5rem] p-8 md:p-14 shadow-xl relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent rounded-[3.5rem] pointer-events-none"></div>
                            
                            <div className="relative z-10 space-y-12">
                                {/* Room Count Selection */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                                            <IconHome className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900">Eşya Miktarı</h3>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                        {Object.keys(roomFactors).map((room) => (
                                            <button
                                                key={room}
                                                onClick={() => setRoomCount(room)}
                                                className={`relative group overflow-hidden py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-500 border ${
                                                    roomCount === room 
                                                    ? "bg-primary-500 border-primary-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.3)] scale-[1.02]" 
                                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:border-primary-200 hover:bg-white"
                                                }`}
                                            >
                                                <span className="relative z-10">{room}</span>
                                                {roomCount === room && (
                                                    <motion.div layoutId="activeRoom" className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Distance Section */}
                                <div className="space-y-8">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                                                <IconTruck className="w-5 h-5" />
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900">Mesafe</h3>
                                        </div>
                                        <div className="px-6 py-2 rounded-full bg-slate-50 border border-slate-200">
                                            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">{distance} KM</span>
                                        </div>
                                    </div>
                                    <div className="relative pt-4">
                                        <input 
                                            type="range" min="1" max="1000" value={distance} 
                                            onChange={(e) => setDistance(parseInt(e.target.value))}
                                            className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-primary-500"
                                        />
                                        <div className="flex justify-between mt-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
                                            <span>Şehir İçi</span>
                                            <span>Şehirler Arası</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Toggles */}
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <button 
                                        onClick={() => setElevator(!elevator)}
                                        className={`group p-6 rounded-[2rem] border transition-all duration-500 flex items-center justify-between ${
                                            elevator ? "bg-primary-50 border-primary-200" : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl transition-colors ${elevator ? "bg-primary-500 text-slate-900" : "bg-white text-slate-400 shadow-sm"}`}>
                                                <IconCog className="w-6 h-6 animate-spin-slow" />
                                            </div>
                                            <div className="text-left">
                                                <p className={`text-sm font-black uppercase tracking-widest ${elevator ? "text-primary-600" : "text-slate-500"}`}>Asansörlü</p>
                                                <p className="text-sm font-bold text-slate-700">Dış Cephe</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${elevator ? "bg-primary-500 border-primary-500" : "border-slate-300 bg-white"}`}>
                                            {elevator && <IconCheck className="w-4 h-4 text-white" />}
                                        </div>
                                    </button>

                                    <button 
                                        onClick={() => setPacking(!packing)}
                                        className={`group p-6 rounded-[2rem] border transition-all duration-500 flex items-center justify-between ${
                                            packing ? "bg-orange-50 border-orange-200" : "bg-slate-50 border-slate-200"
                                        }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`p-3 rounded-xl transition-colors ${packing ? "bg-orange-500 text-white" : "bg-white text-slate-400 shadow-sm"}`}>
                                                <IconBox className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <p className={`text-sm font-black uppercase tracking-widest ${packing ? "text-orange-600" : "text-slate-500"}`}>Paketleme</p>
                                                <p className="text-sm font-bold text-slate-700">Full Hizmet</p>
                                            </div>
                                        </div>
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${packing ? "bg-orange-500 border-orange-500" : "border-slate-300 bg-white"}`}>
                                            {packing && <IconCheck className="w-4 h-4 text-white" />}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Result Section */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-5"
                        >
                            <div className="h-full bg-gradient-to-br from-primary-600 via-primary-500 to-orange-500 rounded-[3.5rem] p-10 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.3)] border border-primary-400">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                                <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-300/30 rounded-full blur-[100px] -ml-40 -mb-40"></div>
                                
                                <div className="relative z-10 text-center lg:text-left">
                                    <span className="inline-block text-primary-100 text-xs font-black uppercase tracking-[0.5em] mb-8">Tahmini Nakliye Ücreti</span>
                                    
                                    <div className="mb-12">
                                        <AnimatePresence mode="wait">
                                            <motion.div 
                                                key={totalPrice}
                                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="text-7xl md:text-8xl font-black tracking-tighter text-white"
                                            >
                                                {totalPrice.toLocaleString('tr-TR')}
                                                <span className="text-3xl font-bold text-orange-200 ml-4">TL</span>
                                            </motion.div>
                                        </AnimatePresence>
                                        <p className="text-primary-100/80 text-xs font-bold uppercase tracking-widest mt-4">KDV DAHİL FİYATTIR</p>
                                    </div>

                                    <div className="space-y-5 py-10 border-y border-white/20">
                                        {[
                                            { label: "Seçilen Paket", value: `${roomCount} Ev Taşıma` },
                                            { label: "Hesaplanan Mesafe", value: `${distance} KM` },
                                            { label: "Ekstralar", value: `${elevator ? "Asansör" : ""} ${packing ? "+ Paketleme" : ""}` || "Yok" }
                                        ].map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center">
                                                <span className="text-primary-100 text-sm font-bold uppercase tracking-widest">{item.label}</span>
                                                <span className="text-white font-bold">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-16 space-y-6 relative z-10">
                                    <motion.a 
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href="https://wa.me/905456568103" 
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="w-full py-7 bg-white text-primary-600 rounded-2xl font-black text-sm uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-xl hover:bg-slate-50 transition-colors"
                                        title="WhatsApp Üzerinden Hızlı Teklif Alın"
                                    >
                                        WhatsApp Teklifi Al <IconMobile className="w-5 h-5" />
                                    </motion.a>
                                    <div className="flex items-center justify-center gap-4 opacity-80">
                                        <IconCheck className="w-4 h-4 text-emerald-300" />
                                        <span className="text-xs font-bold text-white uppercase tracking-widest">Anında Geri Dönüş</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.6 }}
                        className="text-center text-slate-500 text-xs font-medium mt-12 max-w-2xl mx-auto uppercase tracking-widest"
                    >
                        * Hesaplanan tutar piyasa ortalamaları baz alınarak sunulan bir öngörüdür. 
                        Kesin fiyat için eşyalarınızın yerinde görülmesi veya resimlerinin incelenmesi gerekmektedir.
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
