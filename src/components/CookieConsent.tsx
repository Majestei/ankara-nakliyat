"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { IconShield, IconCheck } from "./Icons";

export default function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-[450px] z-[200]"
                >
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 backdrop-blur-xl relative overflow-hidden">
                        {/* Background Decoration */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-100 rounded-full blur-3xl -z-10"></div>
                        
                        <div className="flex items-start gap-6 relative z-10">
                            <div className="w-14 h-14 bg-primary-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary-500/20 flex-shrink-0">
                                <IconShield className="w-7 h-7" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-heading font-black text-slate-900 mb-1">Deneyiminizi İyileştiriyoruz</h4>
                                    <p className="text-xs text-slate-600 leading-relaxed">
                                        Size en iyi nakliyat deneyimini sunmak için çerezleri kullanıyoruz. Sitemizi kullanarak 
                                        <Link href="/gizlilik-politikasi" className="text-primary-600 hover:underline font-bold mx-1" title="Gizlilik Politikası">Gizlilik Politikamızı</Link> 
                                        kabul etmiş sayılırsınız.
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        id="cookie-accept"
                                        onClick={handleAccept}
                                        className="flex-grow py-3 px-6 bg-primary-500 hover:bg-primary-600 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-md shadow-primary-500/20 flex items-center justify-center gap-2"
                                        title="Çerezleri Kabul Et"
                                    >
                                        <IconCheck className="w-4 h-4" /> Kabul Et
                                    </button>
                                    <button
                                        id="cookie-decline"
                                        onClick={handleDecline}
                                        className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-slate-200"
                                        title="Çerezleri Reddet"
                                    >
                                        Reddet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
