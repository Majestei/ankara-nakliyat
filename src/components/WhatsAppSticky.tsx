"use client";

import { useState, useEffect } from "react";
import { firmaBilgileri } from "@/data/siteData";

export default function WhatsAppSticky() {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);

        // Show tooltip after 5 seconds
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
        const hideTooltip = setTimeout(() => setShowTooltip(false), 12000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(tooltipTimer);
            clearTimeout(hideTooltip);
        };
    }, []);

    const phoneClean = firmaBilgileri.phone.replace(/\s/g, "");
    const whatsappUrl = `https://wa.me/9${phoneClean}?text=${encodeURIComponent("Merhaba, nakliyat teklifi almak istiyorum.")}`;

    return (
        <>
            {/* Mobile Sticky Bottom Bar - Only visible on mobile */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-[140] bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] safe-area-bottom">
                <div className="flex items-center gap-2 p-2 px-3">
                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 bg-[#075E54] text-white font-bold py-3 px-2 md:px-4 rounded-xl text-[11px] md:text-sm shadow-lg shadow-[#075E54]/20 active:scale-95 transition-all"
                        title="WhatsApp ile Teklif Alın"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        WhatsApp Teklif
                    </a>
                    <a
                        href={`tel:${phoneClean}`}
                        className="flex-1 flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-primary-500 to-primary-600 text-slate-950 font-black py-3 px-2 md:px-4 rounded-xl text-[11px] md:text-sm shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
                        title="Hemen Arayın"
                    >
                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                        Hemen Ara
                    </a>
                </div>
            </div>

            {/* WhatsApp Tooltip - Desktop & Mobile */}
            {showTooltip && (
                <div className="fixed bottom-[214px] md:bottom-[158px] right-6 z-[145] animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 max-w-[220px] md:max-w-[260px] relative">
                        <button 
                            onClick={() => setShowTooltip(false)}
                            aria-label="Kapat"
                            className="absolute -top-2 -right-2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 text-xs"
                        >
                            ✕
                        </button>
                        <p className="text-sm text-slate-700 font-medium">
                            👋 Merhaba! Nakliyat teklifi almak için bize yazın.
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Genellikle birkaç dakika içinde yanıt veriyoruz.</p>
                        <div className="absolute -bottom-2 right-5 md:right-6 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45" />
                    </div>
                </div>
            )}
        </>
    );
}
