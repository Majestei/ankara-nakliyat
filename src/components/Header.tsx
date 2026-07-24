"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, firmaBilgileri } from "@/data/siteData";
import { IconPhone, IconMail, IconArrow } from "@/components/Icons";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Floating Premium Header */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
                isScrolled 
                    ? "py-2" 
                    : "py-4"
            }`}>
                <div className={`mx-auto transition-all duration-700 ${
                    isScrolled 
                        ? "max-w-full px-0" 
                        : "max-w-7xl px-4"
                }`}>
                    <div className={`transition-all duration-700 ${
                        isScrolled 
                            ? "bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] px-4 md:px-6 lg:px-10" 
                            : "bg-white/70 backdrop-blur-xl border border-white/50 rounded-xl md:rounded-2xl px-4 md:px-6 lg:px-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)]"
                    }`}>
                        <div className="flex items-center justify-between h-14 md:h-20 lg:h-[96px]">
                            {/* Logo */}
                            <Link href="/" className="flex items-center gap-2 xs:gap-5 group relative z-10" title="Ankara Özdemir Nakliyat Ana Sayfa">
                                <motion.div 
                                    whileHover={{ rotate: [0, -5, 5, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className="relative"
                                >
                                    <Image src="/logo.svg" alt="Ankara Özdemir Nakliyat - Ankara Evden Eve Nakliyat" width={80} height={80} className="w-9 h-9 xs:w-14 xs:h-14 lg:w-20 lg:h-20 object-contain" priority />
                                </motion.div>
                                <div className="flex flex-col">
                                    <span className="text-sm xs:text-xl md:text-2xl lg:text-3xl font-heading font-black tracking-tight text-slate-900 leading-tight">
                                        Ankara <span className="text-primary-500">Özdemir</span>
                                    </span>
                                    <span className="text-[8px] xs:text-[10px] md:text-[12px] lg:text-[14px] tracking-[0.2em] md:tracking-[0.25em] uppercase font-bold text-slate-500 leading-none mt-0.5">
                                        Nakliyat & Lojistik
                                    </span>
                                </div>
                            </Link>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center gap-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="group relative px-4 py-2 text-[13px] font-semibold text-slate-600 hover:text-primary-600 transition-colors duration-300"
                                        title={`Ankara Özdemir ${link.name}`}
                                    >
                                        {link.name}
                                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full group-hover:w-3/4 transition-all duration-300" />
                                    </Link>
                                ))}
                            </nav>

                            {/* Right Side */}
                            <div className="flex items-center gap-2 md:gap-3">
                                {/* Phone */}
                                <a
                                    href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                    className="hidden xs:inline-flex items-center gap-2 text-[10px] md:text-xs font-bold py-2 md:py-2.5 px-4 md:px-5 rounded-lg md:rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
                                    title="Hemen Bizi Arayın"
                                    aria-label="Hemen Bizi Arayın"
                                >
                                    <IconPhone className="w-3 md:w-3.5 h-3 md:h-3.5" />
                                    <span className="hidden lg:inline tracking-wide">Hemen Ara</span>
                                    <span className="xs:inline lg:hidden tracking-wide">Ara</span>
                                </a>

                                {/* Mobile Hamburger */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="lg:hidden p-3 md:p-3.5 rounded-lg md:rounded-xl bg-slate-50 border border-slate-200 text-slate-800 hover:bg-slate-100 transition-all"
                                    aria-label="Menü"
                                    title="Mobil Menüyü Aç"
                                    aria-expanded={isMenuOpen}
                                    aria-controls="mobile-menu"
                                >
                                    <div className="w-4 md:w-5 h-3.5 md:h-4 flex flex-col justify-between items-end">
                                        <span className={`block h-[2px] bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? "w-4 md:w-5 rotate-45 translate-y-[6px] md:translate-y-[7px]" : "w-4 md:w-5"}`} />
                                        <span className={`block h-[2px] bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : "w-3 md:w-3.5"}`} />
                                        <span className={`block h-[2px] bg-slate-800 rounded-full transition-all duration-300 ${isMenuOpen ? "w-4 md:w-5 -rotate-45 -translate-y-[6px] md:translate-y-[7px]" : "w-4 md:w-5"}`} />
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu - Full Screen Takeover */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed inset-0 z-[99999]"
                    >
                        {/* Background */}
                        <div className="absolute inset-0 bg-white" />
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.08),transparent_60%)]" />
                        
                        <div className="relative flex flex-col h-[100dvh] p-8 pt-24 overflow-y-auto">
                            {/* Close */}
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-6 right-6 w-12 h-12 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-800 hover:bg-slate-100 transition-all z-50"
                                title="Menüyü Kapat"
                                aria-label="Menüyü Kapat"
                            >
                                <span className="text-lg">✕</span>
                            </button>

                            {/* Navigation Links */}
                            <nav className="flex flex-col gap-2 mt-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="group flex items-center justify-between py-3.5 md:py-4 border-b border-white/5"
                                            title={`Ankara Özdemir ${link.name}`}
                                        >
                                            <span className="text-xl sm:text-3xl font-heading font-black text-slate-900 group-hover:text-primary-500 transition-colors">
                                                {link.name}
                                            </span>
                                            <IconArrow className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Bottom Info */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mt-auto pt-8 space-y-4"
                            >
                                <a
                                    href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                    className="flex items-center gap-3 md:gap-4 p-4 md:p-5 bg-gradient-to-r from-primary-50 to-orange-50 border border-primary-100 rounded-xl md:rounded-2xl group"
                                    title="Hemen Arayın"
                                >
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
                                        <IconPhone className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-primary-600 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em]">7/24 Destek</p>
                                        <p className="text-slate-900 font-black text-base md:text-lg tracking-wide">{firmaBilgileri.phone}</p>
                                    </div>
                                </a>

                                <div className="flex justify-between items-center px-1 pb-4 pt-2">
                                    <div className="flex gap-3">
                                        {Object.entries(firmaBilgileri.social).map(([platform, url]) => (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer nofollow"
                                                className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-primary-500 hover:border-primary-500 transition-all text-[10px] font-black uppercase"
                                                title={`Ankara Özdemir ${platform}`}
                                            >
                                                {platform === 'facebook' ? 'fb' : platform === 'instagram' ? 'ig' : platform === 'twitter' ? 'tw' : platform[0]}
                                            </a>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© Ankara Özdemir</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
