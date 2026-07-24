"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconArrow, IconHome, IconTruck, IconMobile, IconUsers } from "./Icons";

const steps = [
    { id: 1, title: "Eşya Miktarı", icon: <IconHome /> },
    { id: 2, title: "Kat & Asansör", icon: <IconTruck /> },
    { id: 3, title: "İletişim", icon: <IconMobile /> },
];

export default function QuoteStepper() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        rooms: "2+1",
        fromFloor: "1",
        toFloor: "1",
        elevator: "Evet",
        name: "",
        phone: "",
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to an API
        alert("Teklif isteğiniz alındı! Size en kısa sürede dönüş yapacağız.");
    };

    return (
        <div className="bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
                {/* Progress Header */}
                <div className="flex justify-between items-center mb-12">
                    {steps.map((step) => (
                        <div key={step.id} className="flex flex-col items-center gap-3 relative">
                            <div 
                                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-sm ${
                                    currentStep >= step.id 
                                    ? "bg-primary-500 text-white shadow-primary-200 shadow-lg" 
                                    : "bg-slate-100 text-slate-400"
                                }`}
                            >
                                {currentStep > step.id ? <IconCheck className="w-6 h-6" /> : step.icon}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= step.id ? "text-primary-600" : "text-slate-400"}`}>
                                {step.title}
                            </span>
                            {step.id < steps.length && (
                                <div className="absolute top-6 left-16 w-full h-[2px] bg-slate-100 hidden md:block">
                                    <motion.div 
                                        className="h-full bg-primary-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: currentStep > step.id ? "100%" : "0%" }}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Eşya Miktarınızı Seçin</h3>
                                    <p className="text-slate-500 text-sm">Size en uygun aracı belirlememize yardımcı olun.</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {["1+0", "1+1", "2+1", "3+1", "4+1+", "Ofis"].map((room) => (
                                        <button
                                            key={room}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, rooms: room })}
                                            className={`py-5 rounded-2xl font-black text-sm transition-all border ${
                                                formData.rooms === room 
                                                ? "bg-primary-500 border-primary-500 text-white shadow-xl scale-[1.02]" 
                                                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-primary-200"
                                            }`}
                                        >
                                            {room}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-primary-500 transition-all group"
                                >
                                    Sonraki Adım <IconArrow className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">Kat ve Asansör Bilgisi</h3>
                                    <p className="text-slate-500 text-sm">Fiyatlandırma için detayları girin.</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nereden (Kat)</label>
                                        <input 
                                            type="number" 
                                            value={formData.fromFloor}
                                            onChange={(e) => setFormData({ ...formData, fromFloor: e.target.value })}
                                            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Nereye (Kat)</label>
                                        <input 
                                            type="number" 
                                            value={formData.toFloor}
                                            onChange={(e) => setFormData({ ...formData, toFloor: e.target.value })}
                                            className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Asansör Gerekiyor mu?</p>
                                    <div className="flex gap-4">
                                        {["Evet", "Hayır"].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, elevator: opt })}
                                                className={`flex-1 py-5 rounded-2xl font-black text-sm transition-all border ${
                                                    formData.elevator === opt 
                                                    ? "bg-primary-500 border-primary-500 text-white shadow-xl" 
                                                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-white"
                                                }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-6 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-200 transition-all"
                                    >
                                        Geri
                                    </button>
                                    <button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex-[2] py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 hover:bg-primary-500 transition-all group"
                                    >
                                        Sonraki Adım <IconArrow className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="text-center md:text-left">
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">İletişim Bilgileri</h3>
                                    <p className="text-slate-500 text-sm">Teklifinizi iletmemiz için bilgilerinizi girin.</p>
                                </div>
                                <div className="space-y-5">
                                    <input 
                                        type="text" 
                                        placeholder="Adınız Soyadınız"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold"
                                    />
                                    <input 
                                        type="tel" 
                                        placeholder="Telefon Numaranız"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all font-bold"
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={prevStep}
                                        className="flex-1 py-6 bg-slate-100 text-slate-900 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] hover:bg-slate-200 transition-all"
                                    >
                                        Geri
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] py-6 bg-primary-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-4 shadow-xl shadow-primary-500/20 hover:bg-primary-600 transition-all group"
                                    >
                                        Teklif Al <IconCheck className="w-5 h-5 group-hover:scale-125 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </div>
    );
}
