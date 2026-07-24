"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { firmaBilgileri, hizmetler, ilceIcerikleri } from "@/data/siteData";
import { 
    IconPhone, IconShield, IconTruck, 
    IconBox, IconCog, IconArrow, IconStar 
} from "@/components/Icons";

// ── SPATIAL UI COMPONENTS ──

const SpatialBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-slate-950" />
        <motion.div 
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary-600/30 blur-[150px] rounded-full hidden md:block" 
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
                opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-orange-600/20 blur-[150px] rounded-full hidden md:block" 
        />
        <div className="absolute inset-0 opacity-10 hidden md:block" 
             style={{ 
                backgroundImage: "radial-gradient(circle at 2px 2px, rgba(249,115,22,0.3) 1px, transparent 0)", 
                backgroundSize: "40px 40px",
                perspective: "1000px",
                transform: "rotateX(20deg)"
             }} 
        />
    </div>
);

function MagneticElement({ children, strength = 0.3, className }: { children: React.ReactNode, strength?: number, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15 });
    const springY = useSpring(y, { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((e.clientX - centerX) * strength);
        y.set((e.clientY - centerY) * strength);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ x: springX, y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

function PodCard({ item, name, index }: { item: any, name: string, index: number }) {
    const podRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]));

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!podRef.current) return;
        const rect = podRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={podRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 1, type: "spring" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative h-[380px] md:h-[450px] bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl md:rounded-[4rem] p-8 md:p-12 hover:bg-white/10 transition-colors duration-500 overflow-hidden flex flex-col justify-between"
        >
            <div style={{ transform: "translateZ(60px)" }}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-6 md:mb-10 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    <IconBox className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter mb-3 md:mb-6">
                    {name} <br />
                    <span className="text-primary-500">{item.title}</span>
                </h3>
            </div>
            
            <div style={{ transform: "translateZ(40px)" }}>
                <p className="text-white/40 text-lg font-medium leading-relaxed italic mb-8">
                    &ldquo;{name}&apos;da {item.shortDesc.toLowerCase()}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 shrink-0">Premium Service</span>
                </div>
            </div>

            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full border border-primary-500/10 rounded-full"
            />
        </motion.div>
    );
}

// ── MAIN CLIENT COMPONENT ──

interface MahalleClientProps {
    ilce: any;
    mahalle: any;
    digerMahalleler: any[];
    isIstanbul: boolean;
}

export default function MahalleClient({ ilce, mahalle, digerMahalleler, isIstanbul }: MahalleClientProps) {
    const { scrollYProgress } = useScroll();
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    const cityName = isIstanbul ? "İstanbul" : "Ankara";
    const displayName = `${mahalle.name}`;

    return (
        <div className="bg-slate-950 overflow-hidden selection:bg-primary-500 selection:text-white font-sans">
            
            {/* ── SPATIAL KINETIC HERO ── */}
            <section className="relative min-h-[75dvh] md:min-h-screen flex items-center justify-center py-20 md:py-40">
                <SpatialBackground />
                
                <div className="container-custom relative z-10">
                    <motion.div 
                        style={{ opacity: titleOpacity, scale: titleScale }}
                        className="text-center"
                    >
                        <MagneticElement className="inline-block mb-12">
                            <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-6 md:px-10 py-3 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl md:rounded-full text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] shadow-2xl text-center">
                                <span>Mahalle Operasyonları:</span>
                                <span className="text-primary-500">{ilce.name}, {mahalle.name}</span>
                            </div>
                        </MagneticElement>
                        
                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 md:mb-16">
                            <span className="text-white/10">{ilce.name} {mahalle.name}</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x italic">
                                NAKLİYAT
                            </span>
                        </h1>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-12">
                            <MagneticElement strength={0.5} className="w-full sm:w-auto">
                                <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="group w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-primary-500 text-white rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs shadow-[0_40px_100px_rgba(249,115,22,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-6">
                                    <IconPhone className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-12 transition-transform" /> {firmaBilgileri.phone}
                                </a>
                            </MagneticElement>
                            <MagneticElement strength={0.5} className="w-full sm:w-auto">
                                <Link href="/iletisim" className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-white/5 border border-white/10 text-white backdrop-blur-3xl rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[10px] md:text-xs hover:bg-white/10 transition-all flex items-center justify-center gap-6">
                                    Teklif Al <IconArrow className="w-4 h-4 md:w-5 md:h-5 rotate-[-45deg]" />
                                </Link>
                            </MagneticElement>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-20 left-10 hidden lg:block">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Active Units: 14+</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Region: {mahalle.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SPATIAL PODS GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 relative">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">{mahalle.name} Hizmetleri</span>
                            <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter">
                                Yerel <br /> <span className="text-white/10">Uzmanlık.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/3 p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl md:rounded-[3rem] backdrop-blur-3xl">
                            <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed">
                                {ilceIcerikleri[ilce.slug as keyof typeof ilceIcerikleri] || `Sokağınızı biliyoruz. ${ilce.name} ${mahalle.name}'da asansörlü ve sigortalı profesyonel nakliyat hizmeti.`}
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                        {hizmetler.slice(0, 6).map((hizmet, i) => (
                            <PodCard key={hizmet.id} item={hizmet} name={displayName} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── KEYWORD GARDEN ── */}
            <section className="py-24 md:py-40 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
                        <span className="text-primary-500 font-black text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 block">Popüler Aramalar</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                            {mahalle.name} <br /> <span className="text-slate-200">İşlem Rehberi.</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                        {[
                            `${mahalle.name} nakliyat`, `${ilce.name} ${mahalle.name} nakliyat`, `${mahalle.name} evden eve nakliyat`, 
                            `${mahalle.name} nakliyat fiyatları`, `${mahalle.name} nakliyat firmaları`, `${mahalle.name} ucuz nakliyat`,
                            `${mahalle.name} ofis taşıma`, `${mahalle.name} asansörlü nakliyat`, `${mahalle.name} eşya taşıma`,
                            `${ilce.name} ${mahalle.name} evden eve`, `${cityName} ${mahalle.name} nakliyat`, 
                            `en iyi ${mahalle.name.toLowerCase()} nakliyat firması`
                        ].map((keyword, i) => (
                            <motion.span
                                key={i}
                                whileHover={{ scale: 1.1, backgroundColor: "#f97316", color: "#fff", borderColor: "#f97316" }}
                                className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 cursor-default transition-all duration-300"
                            >
                                {keyword}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── THE KINETIC HUB (Diğer Mahalleler) ── */}
            <section className="py-24 md:py-40 bg-white border-t border-slate-100">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-12 md:mb-32 space-y-4 md:space-y-10 px-4">
                        <span className="px-6 py-2 bg-slate-100 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-slate-400">Komşu Bölgeler</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-950 tracking-tighter leading-tight">{ilce.name} <br className="sm:hidden" /> <span className="text-slate-200 italic">Diğer Mahalleleri</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {digerMahalleler.slice(0, 18).map((m) => (
                            <Link 
                                key={m.slug} 
                                href={isIstanbul ? `/islemler/${ilce.slug}/${m.slug}` : `/islemler/ankara/${ilce.slug}/${m.slug}`} 
                                className="group relative h-32 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center overflow-hidden hover:bg-slate-950 transition-all duration-700 p-4 text-center"
                            >
                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 group-hover:text-white transition-colors">{m.name}</span>
                                <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-10" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS SECTION ── */}
            <section className="py-24 md:py-40 bg-slate-50 overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-24 px-4">
                        <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">Müşteri Deneyimi</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-950 tracking-tighter italic">Referanslarımız.</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { name: "Ayşe K.", comment: `${mahalle.name} bölgesinde asansörlü taşımacılık ile harikalar yarattılar. Eşyalarım hiç zarar görmedi.`, img: "/images/testimonials/selin_demir.webp" },
                            { name: "Mustafa B.", comment: "Eşyalarım çok özenli paketlendi. Ekip çok güler yüzlü ve profesyoneldi. Kesinlikle tavsiye ederim.", img: "/images/testimonials/ahmet_yilmaz.webp" },
                            { name: "Kemal Y.", comment: "Fiyat/performans olarak mükemmel. Zamanında gelip, hızlıca işlemi tamamladılar.", img: "/images/testimonials/mehmet_kaya.webp" }
                        ].map((review, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 lg:p-12 bg-white border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[4rem] space-y-6 lg:space-y-8"
                            >
                                <div className="flex items-center gap-4 lg:gap-6">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl">
                                        <Image src={review.img} alt={review.name} width={80} height={80} className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-950 text-lg lg:text-xl">{review.name}</p>
                                        <div className="flex text-primary-500">
                                            {[1,2,3,4,5].map(s => <IconStar key={s} className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed italic px-2">&ldquo;{review.comment}&rdquo;</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL SPATIAL CTA ── */}
            <section className="py-24 md:py-40 text-center relative overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 md:space-y-20"
                    >
                        <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-[8rem] font-heading font-black text-slate-950 tracking-tighter leading-[0.85]">
                            Yeni Bir <br /> <span className="text-primary-500">Eve</span> Taşının.
                        </h2>
                        <MagneticElement strength={0.6} className="inline-block w-full sm:w-auto">
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 bg-slate-950 text-white px-8 md:px-20 py-6 md:py-10 rounded-2xl lg:rounded-[4rem] text-lg md:text-3xl font-black shadow-[0_50px_100px_rgba(0,0,0,0.3)] hover:bg-primary-500 transition-all duration-700">
                                <IconPhone className="w-8 h-8 lg:w-12 lg:h-12" /> {firmaBilgileri.phone}
                            </a>
                        </MagneticElement>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
