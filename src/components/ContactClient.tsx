"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity } from "framer-motion";
import { firmaBilgileri } from "@/data/siteData";
import {
    IconMapPin, IconPhone, IconMail, IconArrow, IconShield, IconTruck, IconStar, IconCheck, IconBox, IconGlobe, IconChat
} from "@/components/Icons";
import { trackConversion } from "@/lib/gtag";

// ── ADVANCED SPATIAL COMPONENTS ──

const PerspectiveGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none overflow-hidden hidden md:block" 
         style={{ 
            backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", 
            backgroundSize: "80px 80px",
            transform: "perspective(1000px) rotateX(60deg) translateY(-200px) translateZ(-500px) scale(3)",
            maskImage: "radial-gradient(ellipse at center, black, transparent 80%)"
         }} 
    />
);

const AuroraBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary-500/20 blur-[150px] rounded-full hidden md:block" 
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.15, 0.1],
                rotate: [0, -90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -right-[10%] w-[100%] h-[100%] bg-orange-500/10 blur-[150px] rounded-full hidden md:block" 
        />
    </div>
);

function MagneticPod({ children, className }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 100, damping: 20 });
    const springY = useSpring(y, { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: springX, y: springY, transformStyle: "preserve-3d" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

// ── TECHNICAL STEPPER ──

function SmartLogisticsForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        from: "",
        to: "",
        service: "Evden Eve",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = (e: React.MouseEvent) => {
        e.preventDefault();
        // Basit validasyon
        if (step === 1 && (!formData.name || !formData.phone)) {
            alert("Lütfen adınızı ve telefonunuzu giriniz.");
            return;
        }
        if (step === 2 && (!formData.from || !formData.to)) {
            alert("Lütfen nereden nereye taşınacağınızı belirtiniz.");
            return;
        }
        setStep(s => Math.min(s + 1, 3));
    };
    const prevStep = () => setStep(s => Math.max(s - 1, 1));

    return (
        <div className="relative w-full max-w-2xl group">
            {/* Holographic Border Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/30 via-orange-500/30 to-primary-600/30 rounded-[4rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="relative bg-slate-900/40 backdrop-blur-3xl border border-white/10 rounded-3xl md:rounded-[4rem] p-8 md:p-12 lg:p-16 overflow-hidden shadow-3xl">
                {/* Step Indicators (Nodes) */}
                <div className="flex items-center justify-center gap-4 mb-10 md:mb-20">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <motion.div 
                                animate={{ 
                                    scale: step === s ? 1.2 : 1,
                                    backgroundColor: step >= s ? "rgb(249 115 22)" : "rgba(255,255,255,0.1)"
                                }}
                                className="w-4 h-4 rounded-full border border-white/10 relative"
                            >
                                {step === s && <motion.div layoutId="node-glow" className="absolute -inset-2 bg-primary-500/40 blur-md rounded-full" />}
                            </motion.div>
                            {s < 3 && <div className="w-12 h-[1px] bg-white/10" />}
                        </React.Fragment>
                    ))}
                </div>

                <form 
                    onKeyDown={(e) => { if (e.key === 'Enter' && step < 3) e.preventDefault(); }}
                    onSubmit={(e) => { 
                        if (step < 3) {
                            e.preventDefault();
                        } else {
                            setIsSubmitting(true);
                            trackConversion();
                        }
                    }}
                    action="https://formsubmit.co/bilgi@ankaraozdemirnakliyat.com" 
                    method="POST" 
                    className="min-h-[400px] md:min-h-[450px] flex flex-col justify-between"
                >
                    <input type="hidden" name="_subject" value="Ankara Özdemir Nakliyat - Yeni Teklif Talebi" />
                    <input type="hidden" name="_next" value="https://ankaraozdemirnakliyat.com/tesekkurler" />
                    <input type="hidden" name="_captcha" value="false" />
                    {/* DOM'dan silinen verilerin FormSubmit'e gidebilmesi için gizli alanlar */}
                    <input type="hidden" name="name" value={formData.name} />
                    <input type="hidden" name="phone" value={formData.phone} />
                    <input type="hidden" name="from" value={formData.from} />
                    <input type="hidden" name="to" value={formData.to} />
                    <input type="hidden" name="service" value={formData.service} />
                    
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="s1"
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                className="space-y-10"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-white tracking-tighter">Kimlik Bilgileri</h3>
                                    <p className="text-white/40 text-sm font-medium">Operasyon ekibimizin size hitap edebilmesi için.</p>
                                </div>
                                <div className="space-y-8 md:space-y-12">
                                    <div className="group/field relative">
                                        <input type="text" name="name" required value={formData.name} onChange={handleInputChange} aria-label="Ad Soyad veya Kurum" className="w-full bg-transparent border-b-2 border-white/10 py-4 md:py-6 focus:border-primary-500 outline-none text-xl md:text-2xl font-black text-white transition-all placeholder:text-white/10" placeholder="Ad Soyad veya Kurum" />
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-focus-within/field:w-full transition-all duration-700" />
                                    </div>
                                    <div className="group/field relative">
                                        <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} aria-label="İletişim Numarası" className="w-full bg-transparent border-b-2 border-white/10 py-4 md:py-6 focus:border-primary-500 outline-none text-xl md:text-2xl font-black text-white transition-all placeholder:text-white/10" placeholder="İletişim Numarası" />
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-focus-within/field:w-full transition-all duration-700" />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="s2"
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                className="space-y-10"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-white tracking-tighter">Lojistik Planı</h3>
                                    <p className="text-white/40 text-sm font-medium">Güzergah ve hizmet türünü belirleyelim.</p>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-10">
                                    <div className="group/field relative">
                                        <input type="text" name="from" required value={formData.from} onChange={handleInputChange} aria-label="Nereden" className="w-full bg-transparent border-b-2 border-white/10 py-6 focus:border-primary-500 outline-none text-xl font-black text-white transition-all placeholder:text-white/10" placeholder="Nereden" />
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-focus-within/field:w-full transition-all duration-700" />
                                    </div>
                                    <div className="group/field relative">
                                        <input type="text" name="to" required value={formData.to} onChange={handleInputChange} aria-label="Nereye" className="w-full bg-transparent border-b-2 border-white/10 py-6 focus:border-primary-500 outline-none text-xl font-black text-white transition-all placeholder:text-white/10" placeholder="Nereye" />
                                        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-focus-within/field:w-full transition-all duration-700" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {["Evden Eve", "Ofis"].map((type) => (
                                        <label key={type} className="cursor-pointer group/radio">
                                            <input type="radio" name="service" value={type} checked={formData.service === type} onChange={handleInputChange} className="peer sr-only" />
                                            <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/5 bg-white/5 text-white/40 font-black text-[10px] md:text-xs uppercase tracking-widest group-hover/radio:bg-white/10 transition-all peer-checked:bg-primary-500 peer-checked:text-slate-900 peer-checked:border-primary-500 text-center">
                                                {type}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="s3"
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                className="space-y-10"
                            >
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-black text-white tracking-tighter">Son Detaylar</h3>
                                    <p className="text-white/40 text-sm font-medium">Eklemek istediğiniz özel bir not var mı?</p>
                                </div>
                                <div className="group/field relative">
                                    <textarea name="message" value={formData.message} onChange={handleInputChange} rows={4} aria-label="Notlarınız veya Tarih Tercihiniz" className="w-full bg-transparent border-b-2 border-white/10 py-6 focus:border-primary-500 outline-none text-xl font-black text-white transition-all placeholder:text-white/10 resize-none" placeholder="Notlarınız veya Tarih Tercihiniz"></textarea>
                                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary-500 group-focus-within/field:w-full transition-all duration-700" />
                                </div>
                                <div className="flex items-center gap-4 md:gap-6 p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2.5rem]">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500/20 rounded-xl md:rounded-2xl flex items-center justify-center text-primary-500 shrink-0">
                                        <IconShield className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                    <p className="text-[10px] md:text-xs text-white/60 font-bold leading-relaxed">Verileriniz askeri düzeyde SSL ile korunur ve sadece teklif için kullanılır.</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="flex items-center justify-between mt-20">
                        {step > 1 ? (
                            <button type="button" onClick={prevStep} className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 hover:text-white transition-colors">Geri Dön</button>
                        ) : <div />}
                        
                        {step < 3 ? (
                            <button 
                                type="button"
                                onClick={(e) => nextStep(e)}
                                className="px-8 md:px-16 py-5 md:py-8 bg-white text-slate-950 rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-primary-500 hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-4 md:gap-6"
                            >
                                Devam Et <IconArrow className="w-5 h-5" />
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className="px-8 md:px-16 py-5 md:py-8 bg-primary-500 text-slate-900 rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-[10px] hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-4 md:gap-6 disabled:opacity-50"
                            >
                                {isSubmitting ? "Gönderiliyor..." : "Sisteme Gönder"} <IconArrow className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── MAIN CLIENT COMPONENT ──

export default function ContactClient() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();
    
    // Kinetic transform effects
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.85]);
    const gridY = useTransform(scrollYProgress, [0, 1], [0, 500]);

    return (
        <div className="bg-slate-950 selection:bg-primary-500 selection:text-white min-h-screen relative overflow-hidden">
            <PerspectiveGrid />
            <AuroraBackground />

            {/* ── CINEMATIC HUB HERO ── */}
            <section className="relative min-h-[85dvh] md:min-h-screen flex items-center pt-24 pb-20 md:pt-32 md:pb-40 z-10">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        
                        {/* Left: Branding & 3D Pods */}
                        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="space-y-20 text-center lg:text-left">
                            <div className="space-y-12">
                                <span className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full">
                                    <IconGlobe className="w-4 h-4 text-primary-500 animate-spin-slow" />
                                    <span className="text-white font-black text-[10px] uppercase tracking-[0.6em]">Dijital Lojistik Ağı</span>
                                </span>
                                
                                <h1 className="text-5xl md:text-[10rem] font-heading font-black text-white leading-[0.85] md:leading-[0.75] tracking-tighter">
                                    İletişim <br />
                                </h1>
                                
                                <p className="text-white/30 text-base md:text-3xl font-medium leading-tight max-w-xl px-4 md:px-0">
                                    Gelecek nesil lojistik operasyonunuzu <br />
                                    <span className="text-white">şimdi buradan başlatın.</span>
                                </p>
                            </div>

                             <div className="grid sm:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0">
                                <MagneticPod className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl md:rounded-[4rem] group hover:bg-primary-500 transition-all duration-700 shadow-2xl backdrop-blur-xl">
                                    <IconPhone className="w-10 h-10 md:w-12 md:h-12 text-primary-500 group-hover:text-white mb-8 md:mb-10 transition-transform duration-500 group-hover:scale-110" />
                                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2 group-hover:text-white/60">Operasyon Hattı</h4>
                                    <div className="flex flex-col gap-1">
                                        <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="text-xl md:text-2xl font-black text-white hover:underline">{firmaBilgileri.phone}</a>
                                        <a href={`tel:${firmaBilgileri.phoneSecondary.replace(/\s/g, "")}`} className="text-xl md:text-2xl font-black text-white hover:underline">{firmaBilgileri.phoneSecondary}</a>
                                    </div>
                                </MagneticPod>
                                <MagneticPod className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl md:rounded-[4rem] group hover:bg-primary-500 transition-all duration-700 shadow-2xl backdrop-blur-xl">
                                    <IconMail className="w-10 h-10 md:w-12 md:h-12 text-primary-500 group-hover:text-white mb-8 md:mb-10 transition-transform duration-500 group-hover:scale-110" />
                                    <h4 className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2 group-hover:text-white/60">Dijital Yazışma</h4>
                                    <a href={`mailto:${firmaBilgileri.email}`} className="text-xs md:text-sm font-black text-white break-all hover:underline">{firmaBilgileri.email}</a>
                                </MagneticPod>
                            </div>
                        </motion.div>

                        {/* Right: Technical Form */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50, rotateY: 20 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            transition={{ duration: 1.2, ease: "circOut" }}
                            className="perspective-2000"
                        >
                            <SmartLogisticsForm />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── STORYTELLING SCROLL SECTION ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white rounded-t-[2.5rem] md:rounded-t-[10rem] relative z-20">
                <div className="container-custom">
                    <div className="text-center mb-16 md:mb-40 space-y-4 md:space-y-8 px-4">
                        <h2 className="text-4xl md:text-8xl font-heading font-black text-slate-950 tracking-tighter leading-none">
                            Güven Üzerine <br /> <span className="text-primary-500">İnşa Ettik.</span>
                        </h2>
                        <p className="text-slate-400 text-base md:text-xl font-medium max-w-2xl mx-auto">
                            Tüm taşımacılık operasyonlarımız şeffaflık, teknoloji ve %100 sigorta güvencesiyle yönetilir.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            { title: "Merkez Üssü", desc: firmaBilgileri.address, i: <IconMapPin />, delay: 0.1 },
                            { title: "Güvenlik Katmanı", desc: "A Sınıfı HDI Sigorta ile tüm eşyalarınız koruma kalkanımız altında.", i: <IconShield />, delay: 0.2 },
                            { title: "Zirve Memnuniyet", desc: "Google MyBusiness üzerinde %100 gerçek kullanıcı onayı.", i: <IconStar />, delay: 0.3 }
                        ].map((box, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: box.delay }}
                                className="p-10 md:p-16 bg-slate-50 border border-slate-100 rounded-3xl md:rounded-[5rem] group hover:bg-slate-950 transition-all duration-700"
                            >
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-[2rem] flex items-center justify-center text-primary-500 mb-8 md:mb-12 shadow-2xl group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                                    {box.i}
                                </div>
                                <h3 className="text-2xl md:text-3xl font-black text-slate-950 mb-4 md:mb-6 group-hover:text-white transition-colors">{box.title}</h3>
                                <p className="text-sm md:text-lg text-slate-500 group-hover:text-white/40 transition-colors leading-relaxed font-medium">{box.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Google Maps + Business Profile */}
                    <div className="mt-24 md:mt-60 space-y-8 md:space-y-12">



                        {/* Google Business Profile Card */}
                        {/* Google Business Profile Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.15 }}
                            whileHover={{ y: -6, transition: { duration: 0.3 } }}
                            className="flex flex-col md:flex-row items-stretch gap-0 bg-white border border-slate-100 rounded-3xl md:rounded-[4rem] overflow-hidden shadow-2xl hover:shadow-primary-500/20 hover:border-primary-200 transition-all duration-500 group"
                        >
                            {/* Left: Google branding strip */}
                            <a 
                                href="https://maps.app.goo.gl/7soWnTCHGLBfguVt9"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05] md:w-64 flex flex-col items-center justify-center p-10 md:p-12 gap-4 shrink-0 hover:opacity-95 transition-opacity"
                            >
                                <svg viewBox="0 0 48 48" className="w-14 h-14 drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M43.6 20.5H24v7.5h11.3C33.8 33 29.5 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.3-5.3C33.8 7.1 29.2 5 24 5 13.5 5 5 13.5 5 24s8.5 19 19 19c9.5 0 18-7 18-19 0-1.2-.1-2.3-.4-3.5z" fill="white"/>
                                </svg>
                                <span className="text-white font-black text-xs uppercase tracking-widest text-center">Google&apos;da Görüntüle</span>
                            </a>

                            {/* Right: Business info */}
                            <div className="flex-1 p-8 md:p-12 flex flex-col justify-between gap-8">
                                <div className="space-y-3">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-950 tracking-tight leading-tight group-hover:text-primary-600 transition-colors duration-300">
                                            Ankara Özdemir Nakliyat
                                        </h3>
                                        <span className="shrink-0 bg-green-50 border border-green-200 text-green-700 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full">Açık</span>
                                    </div>
                                    <p className="text-slate-400 text-sm font-semibold">Nakliyat Şirketi · Sincan, Ankara</p>

                                    {/* Star Rating */}
                                    <div className="flex items-center gap-3 pt-1">
                                        <span className="text-3xl font-black text-slate-950">4.9</span>
                                        <div className="flex gap-1">
                                            {[1,2,3,4,5].map(s => (
                                                <svg key={s} className="w-5 h-5 text-[#FBBC05]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-slate-400 text-sm font-semibold">Müşteri Memnuniyeti</span>
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                                            <IconMapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Adres</p>
                                            <p className="text-sm font-bold text-slate-700 leading-relaxed">Atatürk Mah. Mithatpaşa Cad. Özmert Apt. No:6/8, Sincan / Ankara</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                                            <IconPhone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Telefon</p>
                                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="text-sm font-bold text-slate-700 hover:text-primary-600 block">{firmaBilgileri.phone}</a>
                                            <a href={`tel:${firmaBilgileri.phoneSecondary.replace(/\s/g, "")}`} className="text-sm font-bold text-slate-700 hover:text-primary-600 block">{firmaBilgileri.phoneSecondary}</a>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                                            <IconStar className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Çalışma Saatleri</p>
                                            <p className="text-sm font-bold text-slate-700">Pzt–Cmt: 07:00–21:00</p>
                                            <p className="text-sm font-bold text-slate-700">Pazar: 09:00–18:00</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary-500 shrink-0 mt-0.5">
                                            <IconCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Doğrulandı</p>
                                            <p className="text-sm font-bold text-slate-700">Google İşletme Profili</p>
                                            <p className="text-xs text-green-600 font-bold">✓ Doğrulanmış Firma</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                    <span className="text-xs text-slate-400 font-semibold">ankaraozdemirnakliyat.com</span>
                                    <a 
                                        href="https://maps.app.goo.gl/7soWnTCHGLBfguVt9"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-primary-500 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all duration-300"
                                    >
                                        Google&apos;da Gör <IconArrow className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
