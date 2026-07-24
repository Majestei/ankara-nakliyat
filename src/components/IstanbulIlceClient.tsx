"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { firmaBilgileri, hizmetler, ilceIcerikleri } from "@/data/siteData";
import { neighborhoodsByDistrict } from "@/data/neighborhoodData";
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
            className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary-600/30 blur-[150px] rounded-full" 
        />
        <motion.div 
            animate={{ 
                scale: [1.2, 1, 1.2],
                rotate: [0, -90, 0],
                opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-orange-600/20 blur-[150px] rounded-full" 
        />
        <div className="absolute inset-0 opacity-10" 
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

function PodCard({ item, ilceName, index }: { item: any, ilceName: string, index: number }) {
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
                    {ilceName} <br />
                    <span className="text-primary-500">{item.title}</span>
                </h3>
            </div>
            
            <div style={{ transform: "translateZ(40px)" }}>
                <p className="text-white/40 text-lg font-medium leading-relaxed italic mb-8">
                    &ldquo;{ilceName}&apos;da {item.shortDesc.toLowerCase()}&rdquo;
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

export default function IstanbulIlceClient({ ilce, digerIlceler }: { ilce: any, digerIlceler: any[] }) {
    const { scrollYProgress } = useScroll();
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    return (
        <div className="bg-slate-950 overflow-hidden selection:bg-primary-500 selection:text-white font-sans">
            
            <section className="relative min-h-[75dvh] md:min-h-screen flex items-center justify-center py-20 md:py-40">
                <SpatialBackground />
                
                <div className="container-custom relative z-10">
                    <motion.div 
                        style={{ opacity: titleOpacity, scale: titleScale }}
                        className="text-center"
                    >
                        <MagneticElement className="inline-block mb-12">
                            <div className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-6 md:px-10 py-3 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl md:rounded-full text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.8em] shadow-2xl text-center">
                                <span>Bölge Operasyonu:</span>
                                <span className="text-primary-500">{ilce.name}</span>
                            </div>
                        </MagneticElement>
                        
                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 md:mb-16">
                            <span className="text-white/10">{ilce.name}</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x italic">
                                NAKLİYAT
                            </span>
                        </h1>

                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 md:gap-12">
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
            </section>

            <section className="py-24 md:py-40 lg:py-60 relative">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">İstanbul Yetkinlik</span>
                            <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter">
                                Metropol <br /> <span className="text-white/10">Güç.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/3 p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl md:rounded-[3rem] backdrop-blur-3xl">
                            <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed">
                                İstanbul trafiğini ve sokaklarını bir algoritma gibi çözüyoruz. <span className="text-white">{ilce.name}&apos;da profesyonel lojistik deneyimi.</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                        {hizmetler.slice(0, 6).map((hizmet, i) => (
                            <PodCard key={hizmet.id} item={hizmet} ilceName={ilce.name} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NEIGHBORHOODS SECTION ── */}
            {neighborhoodsByDistrict[ilce.slug] && (
                <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="container-custom relative z-10 px-4 md:px-0">
                        <div className="text-center mb-12 md:mb-16 space-y-4">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-widest">Metropol Hizmet Ağı</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                                {ilce.name} Mahalleleri
                            </h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">
                                İstanbul {ilce.name} ilçesinin her sokağında tecrübeli ekibimiz ve modern araç filomuzla hizmetinizdeyiz.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {neighborhoodsByDistrict[ilce.slug].map((mahalle, i) => (
                                <Link href={`/islemler/${ilce.slug}/${mahalle.slug}`} key={mahalle.slug} className="block group">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-5 md:p-6 bg-white border border-slate-100 rounded-2xl md:rounded-3xl text-center group-hover:border-primary-500 transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary-500/10 h-full flex items-center justify-center"
                                    >
                                        <span className="text-slate-700 font-bold group-hover:text-primary-600 transition-colors block text-sm">
                                            {mahalle.name}
                                        </span>
                                    </motion.div>
                                </Link>

                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-24 md:py-40 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16 md:mb-24 space-y-6 md:space-y-8">
                        <span className="text-primary-500 font-black text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 block">Popüler Aramalar</span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                            {ilce.name} <br /> <span className="text-slate-200">İşlem Rehberi.</span>
                        </h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto">
                        {[
                            `${ilce.name} nakliyat`, `${ilce.name} evden eve nakliyat`, `${ilce.name} nakliyat fiyatları`,
                            `${ilce.name} nakliyat firmaları`, `${ilce.name} nakliyat firması`, `${ilce.name} ucuz nakliyat`,
                            `${ilce.name} güvenilir nakliyat`, `${ilce.name} ofis taşıma`, `${ilce.name} ev taşıma`,
                            `${ilce.name} asansörlü nakliyat`, `${ilce.name} asansörlü taşıma`, `${ilce.name} eşya taşıma`,
                            `${ilce.name} parça eşya taşıma`, `${ilce.name} şehir içi nakliyat`, `${ilce.name} şehirler arası nakliyat`,
                            `${ilce.name} depolama`, `${ilce.name} paketleme hizmeti`, `${ilce.name} sigortalı nakliyat`,
                            `${ilce.name} taşımacılık`, `${ilce.name} nakliye`, `${ilce.name} taşıma fiyatları`,
                            `${ilce.name} ev nakliyat`, `${ilce.name} mobilya taşıma`, `${ilce.name} beyaz eşya taşıma`,
                            `istanbul ${ilce.name.toLowerCase()} nakliyat`, `istanbul ${ilce.name.toLowerCase()} evden eve`,
                            `istanbul ${ilce.name.toLowerCase()} taşıma`, `${ilce.name}'da nakliyat firması`,
                            `${ilce.name} nakliyat telefon`, `en iyi ${ilce.name.toLowerCase()} nakliyat`,
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

            <section className="py-24 md:py-40 bg-white rounded-t-[2.5rem] md:rounded-t-[5rem] lg:rounded-[10rem] relative z-10 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-20 lg:gap-40 items-center">
                        <div className="space-y-12 lg:space-y-16">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                                Fiyat <br /> <span className="text-slate-200">Algoritması</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { t: "Eşya Hacmi", d: "1+1'den 4+1'e kadar tüm kapasiteler", i: <IconBox className="w-6 h-6" /> },
                                    { t: "Asansör Kat", d: "20. kata kadar dikey lojistik desteği", i: <IconCog className="w-6 h-6" /> },
                                    { t: "KM Mesafe", d: `İstanbul içi ve 81 il arası km bazlı`, i: <IconTruck className="w-6 h-6" /> }
                                ].map((item, i) => (
                                    <motion.div 
                                        key={i}
                                        whileHover={{ x: 20 }}
                                        className="flex items-center gap-6 md:gap-8 p-6 md:p-10 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-[3rem] group hover:bg-slate-950 transition-all duration-500"
                                    >
                                        <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl flex items-center justify-center text-primary-500 shadow-xl group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            {item.i}
                                        </div>
                                        <div>
                                            <p className="text-lg md:text-xl font-black text-slate-950 group-hover:text-white transition-colors">{item.t}</p>
                                            <p className="text-xs md:text-sm text-slate-500 font-medium group-hover:text-white/40 transition-colors">{item.d}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 blur-[150px] opacity-10" />
                            <div className="relative bg-slate-950 p-8 md:p-12 lg:p-20 rounded-[2.5rem] md:rounded-[3rem] lg:rounded-[5rem] shadow-3xl text-center space-y-8 md:space-y-12">
                                <IconShield className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 text-primary-500 mx-auto" />
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter">Premium Güvence</h3>
                                <p className="text-white/40 text-base md:text-lg lg:text-xl font-medium leading-relaxed italic px-4">
                                    &ldquo;{ilce.name}&apos;da taşınan her eşya bizim için birer emanettir.&rdquo;
                                </p>
                                <div className="pt-6 md:pt-10 border-t border-white/10 flex flex-col gap-4 lg:gap-6">
                                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="py-5 md:py-8 bg-white text-slate-950 rounded-xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] lg:text-xs text-center">
                                        Hemen Bağlan: {firmaBilgileri.phone}
                                    </a>
                                    <Link href="/iletisim" className="py-5 md:py-8 border border-white/20 text-white rounded-xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] lg:text-xs hover:bg-white/5 transition-all text-center">
                                        Süreci Başlat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-40 lg:py-60 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-12 md:mb-32 space-y-4 md:space-y-10 px-4">
                        <span className="px-6 py-2 bg-slate-100 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-slate-400">Metropol Hizmet Ağı</span>
                        <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading font-black text-slate-950 tracking-tighter leading-tight">İstanbul <br className="sm:hidden" /> <span className="text-slate-200 italic">Operasyon Merkezi</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {digerIlceler.map((i) => (
                            <Link 
                                key={i.slug} 
                                href={`/islemler/${i.slug}`} 
                                className="group relative h-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center overflow-hidden hover:bg-slate-950 transition-all duration-700"
                            >
                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors text-center px-4">{i.name}</span>
                                <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-10" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-40 lg:py-60 bg-slate-950 relative overflow-hidden">
                <div className="container-custom max-w-6xl relative z-10">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-12">
                            <div className="w-24 h-px bg-primary-500" />
                             <h2 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter leading-[0.9] md:leading-none">
                                {ilce.name} <br /> <span className="text-white/20 italic">Analizi.</span>
                            </h2>
                            <div className="prose prose-invert prose-2xl text-white/40 leading-relaxed space-y-10 font-medium">
                                {ilceIcerikleri[ilce.slug] ? (
                                    ilceIcerikleri[ilce.slug].map((text: string, idx: number) => (
                                        <p key={idx} dangerouslySetInnerHTML={{ __html: text.replace(/\*\*(.*?)\*\*/g, "<strong class='text-primary-500'>$1</strong>") }} />
                                    ))
                                ) : (
                                    <p>{ilce.name} bölgesinde 15 yıllık tecrübemizle lojistik standartlarını belirliyoruz. Profesyonel kadromuz ve modern araç filomuzla yanınızdayız.</p>
                                )}
                            </div>
                        </div>
                        <div className="relative aspect-[3/4] bg-white/5 border border-white/10 rounded-[5rem] overflow-hidden group shadow-3xl">
                            <Image src="/images/hizmetler/evden-eve-nakliyat.webp" alt={ilce.name} fill className="object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                            <div className="absolute bottom-12 left-12 right-12 text-center">
                                <p className="text-white font-black text-4xl tracking-tighter uppercase">{ilce.name}</p>
                                <p className="text-primary-500 text-[10px] font-black uppercase tracking-[0.5em] mt-2">VIP Istanbul Nakliyat</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-40 lg:py-60 bg-white overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-32 px-4">
                        <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">Müşteri Deneyimi</span>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-slate-950 tracking-tighter italic text-center">Referanslarımız.</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { name: "Selin Demir", comment: "Eşyalarım çok özenli paketlendi. Asansörlü sistem gerçekten çok hızlı. Teşekkürler!", img: "/images/testimonials/selin_demir.webp" },
                            { name: "Ahmet Yılmaz", comment: "İstanbul Beşiktaş'tan taşınırken Ankara Özdemir ile çalıştım. Profesyonel ekip ve harika hizmet.", img: "/images/testimonials/ahmet_yilmaz.webp" },
                            { name: "Mehmet Kaya", comment: "Ofis taşımamızda çok yardımcı oldular. Zamanında ve sorunsuz teslimat.", img: "/images/testimonials/mehmet_kaya.webp" }
                        ].map((review, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 lg:p-12 bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[4rem] space-y-6 lg:space-y-8"
                            >
                                <div className="flex items-center gap-4 lg:gap-6">
                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                                        <Image src={review.img} alt={review.name} width={80} height={80} className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-950 text-lg lg:text-xl">{review.name}</p>
                                        <div className="flex text-primary-500">
                                            {[1,2,3,4,5].map(s => <IconStar key={s} className="w-3 h-3 lg:w-4 lg:h-4 fill-current" />)}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-base lg:text-lg font-medium leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 md:py-40 lg:py-60 text-center relative overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 md:space-y-20"
                    >
                        <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-[10rem] font-heading font-black text-slate-950 tracking-tighter leading-[0.8]">
                            Yeni Bir <br /> <span className="text-primary-500">Hayata</span> <br /> Taşının.
                        </h2>
                        <MagneticElement strength={0.6} className="inline-block w-full sm:w-auto">
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-10 bg-slate-950 text-white px-8 md:px-20 py-6 md:py-10 rounded-2xl lg:rounded-[4rem] text-lg md:text-3xl font-black shadow-[0_50px_100px_rgba(0,0,0,0.3)] hover:bg-primary-500 transition-all duration-700">
                                <IconPhone className="w-8 h-8 lg:w-12 lg:h-12" /> {firmaBilgileri.phone}
                            </a>
                        </MagneticElement>
                    </motion.div>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-slate-50 -z-10 select-none pointer-events-none opacity-50 tracking-tighter">
                    {ilce.name.toUpperCase()}
                </div>
            </section>
        </div>
    );
}
