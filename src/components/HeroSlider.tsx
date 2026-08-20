"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { IconPhone, IconStar, IconTruck, IconClock, IconUsers, IconShield, IconArrow, IconMapPin, IconGlobe } from "@/components/Icons";

const heroSlides = [
    {
        image: "/images/genel/hero-bg-1.webp",
        tag: "Profesyonel Lojistik",
        title1: "Ankara Evden Eve",
        titleHighlight: "Nakliyat",
        title2: "Şehirler Arası Uzmanlık",
        description: "Ankara'nın her noktasından Türkiye'nin 20 iline uzanan sigortalı ve garantili şehirler arası nakliyat hizmeti. Modern araç filomuzla eşyalarınız güvende.",
    },
    {
        image: "/images/genel/hero-bg-2.webp",
        tag: "Modern Taşımacılık",
        title1: "Asansörlü ve",
        titleHighlight: "Güvenli",
        title2: "Eşya Paketleme Desteği",
        description: "Yüksek katlara asansörlü nakliyat ve Avrupa standartlarında profesyonel paketleme çözümleri. 15 yıllık tecrübemizle eşyalarınızı özenle taşıyoruz.",
    },
    {
        image: "/images/genel/hero-bg-3.webp",
        tag: "Kurumsal Çözümler",
        title1: "Ofis Taşıma ve",
        titleHighlight: "Parsiyel",
        title2: "Lojistik Hizmetleri",
        description: "Kurumsal ofis taşıma ve parça eşya taşımacılığında Ankara'nın lider markası. Tam kapsamlı sigorta ve anlık operasyon takibi ile sorunsuz taşının.",
    },
];

// ── SHARED PREMIUM COMPONENTS ──

const AuroraBackground = () => {
    const shouldReduceMotion = useReducedMotion();
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <motion.div 
                animate={shouldReduceMotion ? {} : { 
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05],
                    rotate: [0, 45, 0]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary-500/30 blur-[150px] rounded-full hidden md:block" 
            />
            <motion.div 
                animate={shouldReduceMotion ? {} : { 
                    scale: [1.2, 1, 1.2],
                    opacity: [0.05, 0.08, 0.05],
                    rotate: [0, -45, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] bg-orange-500/20 blur-[150px] rounded-full hidden md:block" 
            />
        </div>
    );
};

const PerspectiveGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none hidden md:block" 
         style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)", 
            backgroundSize: "40px 40px",
            transform: "perspective(1000px) rotateX(60deg) translateY(-100px) translateZ(0)",
            maskImage: "linear-gradient(to bottom, transparent, black, transparent)"
         }} 
    />
);

const CinematicOverlay = () => (
    <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-500/20 blur-[120px] rounded-full mix-blend-screen hidden md:block animate-pulse" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-500/10 blur-[120px] rounded-full mix-blend-screen hidden md:block animate-pulse" style={{ animationDelay: '2s' }} />
    </div>
);

function MagneticButton({ children, className, href, isAnchor = false }: { children: React.ReactNode, className?: string, href?: string, isAnchor?: boolean }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.3);
        y.set((clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const content = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );

    if (isAnchor && href) return <a href={href}>{content}</a>;
    if (href) return <Link href={href}>{content}</Link>;
    return content;
}

interface HeroSectionProps {
    phone: string;
    stats: { value: string; label: string }[];
}

export default function HeroSection({ phone, stats }: HeroSectionProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMounted, setIsMounted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (shouldReduceMotion || isHovered) return;
        
        timerRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 8000);
    }, [shouldReduceMotion, isHovered]);

    useEffect(() => {
        if (!isMounted) return;
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isMounted, resetTimer]);

    const handleSlideClick = useCallback((index: number) => {
        setCurrentSlide(index);
        resetTimer();
    }, [resetTimer]);

    const activeSlideData = heroSlides[currentSlide];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const xPct = (clientX / window.innerWidth - 0.5) * 50;
        const yPct = (clientY / window.innerHeight - 0.5) * 50;
        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const { scrollY } = useScroll();
    const parallaxY = useTransform(scrollY, [0, 1000], [0, 300]);

    return (
        <section 
            className="relative min-h-[100dvh] w-full flex items-center overflow-hidden bg-slate-950 selection:bg-primary-500/30 pt-32 pb-24 md:pt-40 md:pb-32"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <PerspectiveGrid />
            <AuroraBackground />
            <CinematicOverlay />

            {/* Background Images with Cinematic Blur */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        style={{ y: parallaxY }}
                        className="absolute inset-0 transform-gpu"
                    >
                        <Image
                            src={activeSlideData.image}
                            alt={`${activeSlideData.title1} ${activeSlideData.titleHighlight}`}
                            fill
                            sizes="100vw"
                            className="object-cover object-center brightness-[0.7] md:brightness-[0.85] contrast-[1.05]"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/60 md:via-slate-950/40 to-transparent z-10 opacity-70 md:opacity-100" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10 opacity-80 md:opacity-100" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Interactive Content */}
            <div className="container-custom relative z-20">
                <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-center">
                    
                    {/* Left: Cinematic Typography & CTAs */}
                    <div className="flex flex-col items-start lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-4 bg-white/5 border border-white/10 backdrop-blur-xl px-6 md:px-8 py-3 rounded-full mb-8 md:mb-12"
                        >
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={currentSlide}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-white font-black text-[10px] uppercase tracking-[0.6em]"
                                >
                                    {activeSlideData.tag}
                                </motion.span>
                            </AnimatePresence>
                        </motion.div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 80, skewY: 5 }}
                                animate={{ opacity: 1, y: 0, skewY: 0 }}
                                exit={{ opacity: 0, y: -40, skewY: -5 }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="space-y-10 overflow-visible"
                            >
                                <h1 className="flex flex-col text-5xl md:text-8xl lg:text-[clamp(6rem,10vw,9rem)] font-heading font-black text-white tracking-tighter overflow-visible z-10 relative">
                                    <motion.span 
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                        className="leading-none md:leading-[0.9] pr-4"
                                    >
                                        {activeSlideData.title1}
                                    </motion.span>
                                    <div className="relative overflow-visible z-20 py-2 md:py-2">
                                        <motion.span 
                                            initial={{ opacity: 0, scale: 0.9, rotateX: -20 }}
                                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                                            transition={{ duration: 1, delay: 0.2, ease: "circOut" }}
                                            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x italic py-2 md:py-4 pr-16 md:-my-4 text-6xl md:text-[clamp(6rem,10vw,9rem)] leading-none"
                                        >
                                            {activeSlideData.titleHighlight}
                                        </motion.span>
                                    </div>
                                    <motion.span 
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.8, delay: 0.4 }}
                                        className="text-lg md:text-[0.4em] text-white/50 tracking-wide font-medium leading-none mt-2 md:mt-4 flex items-center gap-4 md:gap-6"
                                    >
                                        <div className="h-[2px] w-12 md:w-20 bg-gradient-to-r from-primary-500/50 to-transparent" />
                                        {activeSlideData.title2}
                                    </motion.span>
                                </h1>
                                <p className="text-white/50 text-base md:text-2xl leading-relaxed max-w-xl font-medium mt-6">
                                    {activeSlideData.description}
                                </p>
                                <div className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                    <Link href="/iletisim" className="w-full sm:w-auto">
                                        <MagneticButton className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-primary-500 text-slate-900 rounded-2xl md:rounded-full text-sm md:text-lg font-black flex items-center justify-center gap-3 md:gap-4 hover:bg-primary-600 transition-all shadow-2xl shadow-primary-500/30 group">
                                            Ücretsiz Teklif Al <IconArrow className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-4 transition-transform" />
                                        </MagneticButton>
                                    </Link>
                                    <Link href={`tel:${phone.replace(/\s/g, "")}`} className="w-full sm:w-auto px-6 md:px-10 py-4 md:py-5 bg-white/5 border border-white/10 backdrop-blur-xl text-white rounded-2xl md:rounded-full text-sm md:text-lg font-black hover:bg-white/10 transition-all flex items-center justify-center gap-3 md:gap-4">
                                        <IconPhone className="w-5 h-5 md:w-6 md:h-6" /> {phone}
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* RIGHT CONTENT: THE COMMAND PODS */}
                    <div className="hidden lg:flex items-center justify-center relative h-[700px] perspective-2000 w-full max-w-[600px] mx-auto lg:col-span-5">
                        {/* 3D Rotating Globe Background Decor */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                            <IconGlobe className="w-[600px] h-[600px] text-white animate-spin-slow" />
                        </div>

                        {/* Grid Layout for Pods to prevent overlap */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-16 w-full relative z-20">
                            {[
                                { stat: stats[1], icon: <IconTruck />, delay: 0.2, yOffset: "-translate-y-8" },
                                { stat: stats[0], icon: <IconClock />, delay: 0.4, yOffset: "translate-y-12" },
                                { stat: { value: "4.9", label: "GOOGLE SCORE" }, icon: <IconStar />, delay: 0.6, yOffset: "-translate-y-4" },
                                { stat: stats[3], icon: <IconShield />, delay: 0.8, yOffset: "translate-y-16" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    style={{ x: mouseXSpring, y: mouseYSpring }}
                                    className={`relative ${item.yOffset} flex justify-center`}
                                    whileHover={{ scale: 1.05, z: 50 }}
                                >
                                    <motion.div
                                        animate={{ 
                                            y: [0, i % 2 === 0 ? -12 : 12, 0],
                                            rotateZ: [0, i % 2 === 0 ? 1.5 : -1.5, 0],
                                            rotateY: [0, i % 2 === 0 ? 10 : -10, 0]
                                        }}
                                        transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                                        className="p-8 bg-white/[0.03] border border-white/10 backdrop-blur-3xl rounded-[3.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col items-center w-full max-w-[220px] group hover:bg-white/[0.08] hover:border-primary-500/50 transition-all duration-700 cursor-default relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                        
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl group-hover:rotate-[10deg] transition-transform duration-500 relative z-10">
                                            {item.icon}
                                            <div className="absolute inset-0 bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        
                                        <div className="text-5xl font-black text-white mb-1 tracking-tighter group-hover:scale-110 transition-transform duration-500 relative z-10">
                                            {item.stat.value}
                                        </div>
                                        <div className="text-[9px] font-black text-white/40 uppercase tracking-widest group-hover:text-primary-400 transition-colors relative z-10">
                                            {item.stat.label}
                                        </div>

                                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary-500/10 blur-3xl rounded-full" />
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider Navigation Nodes */}
            <div className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-10 bottom-10 z-30 flex flex-row md:flex-col gap-6 md:gap-4">
                {heroSlides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => handleSlideClick(i)}
                        aria-label={`Slayt ${i + 1}'e git`}
                        className="group relative flex items-center gap-4 md:gap-6"
                    >
                        <span className={`text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${currentSlide === i ? "text-white" : "text-white/60 group-hover:text-white/80"}`}>
                            0{i + 1}
                        </span>
                        <div className="relative w-8 md:w-12 h-[2px] bg-white/20 overflow-hidden rounded-full">
                            <motion.div 
                                initial={false}
                                animate={{ scaleX: currentSlide === i ? 1 : 0 }}
                                className="h-full bg-primary-500 origin-left"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}
