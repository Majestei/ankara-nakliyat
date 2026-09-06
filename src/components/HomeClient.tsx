"use client";

import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
    hizmetler,
    firmaBilgileri,
    ankaraIlceleri,
    sss,
} from "@/data/siteData";
import {
    IconTruck, IconShield, IconBox, IconHome, IconUsers, IconStar,
    IconCheck, IconArrow, IconClipboard, IconCog, IconMapPin,
    IconPhone, IconGlobe, IconBuilding, IconChat, IconPlus
} from "@/components/Icons";

const ServiceCard3D = dynamic(() => import("./ServiceCard3D"), { ssr: false });
import PricingTable from "@/components/PricingTable";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import AnkaraGuideSection from "@/components/AnkaraGuideSection";
import SearchIntentGrid from "@/components/SearchIntentGrid";
import ContractGuaranteeSection from "@/components/ContractGuaranteeSection";
import MovingChecklistSection from "@/components/MovingChecklistSection";

// ── SHARED PREMIUM COMPONENTS ──

const PerspectiveGrid = ({ opacity = "0.05", color = "#000" }) => (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden hidden md:block"
        style={{
            backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
            transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)",
            opacity: opacity
        }}
    />
);

const AuroraBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            animate={{
                scale: [1, 1.2, 1],
                opacity: [0.05, 0.1, 0.05],
                rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -left-[10%] w-[100%] h-[100%] bg-primary-500/20 blur-[150px] rounded-full hidden md:block"
        />
        <motion.div
            animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.05, 0.08, 0.05],
                rotate: [0, -45, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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

function getServiceIcon(id: string) {
    const cls = "w-8 h-8";
    switch (id) {
        case "evden-eve-nakliyat": return <IconTruck className={cls} />;
        case "sehir-ici-nakliyat": return <IconMapPin className={cls} />;
        case "sehirler-arasi-nakliyat": return <IconGlobe className={cls} />;
        case "ofis-tasima": return <IconBuilding className={cls} />;
        case "parca-esya-tasima": return <IconBox className={cls} />;
        case "asansorlu-tasima": return <IconCog className={cls} />;
        case "depolama": return <IconShield className={cls} />;
        case "paketleme": return <IconBox className={cls} />;
        case "nakliyat-sigortasi":
        case "sigorta": return <IconShield className={cls} />;
        case "uluslararasi-tasimacilik": return <IconGlobe className={cls} />;
        default: return <IconTruck className={cls} />;
    }
}

const steps = [
    { num: "01", title: "Ücretsiz Yerinde Keşif", desc: "Uzman ekibimiz adresinize gelerek taşınma planınızı en doğru şekilde yerinde analiz eder.", icon: <IconClipboard />, image: "/images/genel/hero-bg-2.webp" },
    { num: "02", title: "Premium Paket", desc: "Eşyalarınız için özel üretilen, darbe emici materyallerle paketleme.", icon: <IconBox />, image: "/images/hizmetler/paketleme.webp" },
    { num: "03", title: "Güvenli Sevkiyat", desc: "A+ sigorta koruması ve anlık takip sistemli kapalı kasa transfer.", icon: <IconTruck />, image: "/images/hizmetler/sehirler-arasi-nakliyat.webp" },
    { num: "04", title: "Eksiksiz Teslim", desc: "Yeni adresinizde uzman marangoz ekibimizle anahtar teslim kurulum.", icon: <IconHome />, image: "/images/hizmetler/evden-eve-nakliyat.webp" },
];

// ── MAIN CLIENT COMPONENT ──

export default function HomeClient() {
    const [activeStep, setActiveStep] = useState(0);
    const visionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: visionScroll } = useScroll({ target: visionRef, offset: ["start end", "end start"] });

    const visionY = useTransform(visionScroll, [0, 1], [0, 150]);
    const visionScale = useTransform(visionScroll, [0, 0.5], [0.95, 1]);

    return (
        <div className="bg-white selection:bg-primary-500 selection:text-white overflow-hidden">

            {/* ── VISION: THE COMMAND CENTER INTRO ── */}
            <section ref={visionRef} className="relative py-32 md:py-40 lg:py-80 overflow-hidden bg-slate-950">
                <PerspectiveGrid opacity="0.07" color="#fff" />
                <AuroraBackground />

                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-32 items-center">
                        <motion.div style={{ scale: visionScale }} className="space-y-12 md:space-y-16 text-center lg:text-left">
                            <div className="space-y-8 md:space-y-12">
                                <span className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 md:px-8 py-3 rounded-full">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                                    <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em]">Gelecek Nesil Lojistik</span>
                                </span>

                                <h2 className="text-5xl md:text-8xl lg:text-[9rem] font-heading font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter">
                                    Lojistikte <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x italic">
                                        Premium
                                    </span> <br />
                                    <span className="text-white/40">Dönem.</span>
                                </h2>

                                <p className="text-white/30 text-base md:text-3xl font-medium leading-tight max-w-xl mx-auto lg:mx-0 px-4">
                                    Sadece eşya taşımıyoruz — hayatınızın yeni sayfasına geçerken <br />
                                    <span className="text-white">kusursuz bir deneyim inşa ediyoruz.</span>
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 lg:gap-10 mt-10 md:mt-16 px-4 md:px-0">
                                <Link href="/iletisim" className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-8 bg-white text-slate-950 rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-sm md:text-lg shadow-3xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center gap-4 md:gap-6 whitespace-nowrap">
                                    Hemen Teklif Al <IconArrow className="w-5 h-5 md:w-6 md:h-6" />
                                </Link>
                                <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="w-full sm:w-auto text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.6em] border border-white/10 px-6 md:px-10 py-4 md:py-8 rounded-xl md:rounded-[2.5rem] hover:bg-white/5 transition-all text-center whitespace-nowrap">
                                    Operasyon Hattı: {firmaBilgileri.phone}
                                </a>
                            </div>
                        </motion.div>

                        <div className="relative h-[450px] lg:h-[700px] perspective-2000 flex items-center justify-center mt-12 lg:mt-0 w-full">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[500px] aspect-[4/5]">
                                <motion.div
                                    initial={{ opacity: 0, x: 50, rotateY: 20 }}
                                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5 }}
                                    className="relative w-full h-full rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-3xl border border-white/5"
                                >
                                    <motion.div className="absolute inset-[-10%]" style={{ y: useTransform(useScroll().scrollY, [0, 2000], [0, 100]) }}>
                                        <Image src="/images/genel/neden-biz.webp" alt="Premium Lojistik" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover brightness-75 contrast-110" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                                </motion.div>

                                {/* Floating Trust Badges - Moved outside overflow-hidden */}
                                <MagneticPod className="absolute -top-4 lg:-top-6 xl:-top-12 -right-4 lg:-right-6 xl:-right-12 p-4 lg:p-6 xl:p-10 bg-white/[0.08] backdrop-blur-3xl border border-white/20 rounded-[1.5rem] lg:rounded-[2.5rem] xl:rounded-[3.5rem] shadow-3xl text-center min-w-[120px] lg:min-w-[180px] xl:min-w-[220px] group hover:bg-white/15 transition-all duration-500 z-30">
                                    <IconStar className="w-5 h-5 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-primary-500 mb-2 lg:mb-4 xl:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500" />
                                    <div className="text-xl lg:text-3xl xl:text-4xl font-black text-white tracking-tighter group-hover:text-primary-400 transition-colors">Planlı</div>
                                    <div className="text-[7px] lg:text-[9px] xl:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors mt-1">Taşıma Süreci</div>
                                </MagneticPod>

                                <MagneticPod className="absolute -bottom-4 lg:-bottom-6 xl:-bottom-12 -left-4 lg:-left-6 xl:-left-12 p-4 lg:p-6 xl:p-10 bg-slate-950/95 backdrop-blur-3xl border border-white/10 rounded-[1.5rem] lg:rounded-[2.5rem] xl:rounded-[3.5rem] shadow-3xl text-center min-w-[120px] lg:min-w-[180px] xl:min-w-[220px] group hover:bg-white/5 transition-all duration-500 z-30">
                                    <IconUsers className="w-5 h-5 lg:w-8 lg:h-8 xl:w-10 xl:h-10 text-primary-500 mb-2 lg:mb-4 xl:mb-6 mx-auto group-hover:scale-110 transition-transform duration-500" />
                                    <div className="text-xl lg:text-3xl xl:text-4xl font-black text-white tracking-tighter group-hover:text-primary-400 transition-colors">Ankara</div>
                                    <div className="text-[7px] lg:text-[9px] xl:text-[10px] font-black text-white/40 uppercase tracking-[0.3em] group-hover:text-white transition-colors mt-1">Yerel Hizmet</div>
                                </MagneticPod>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST & E-E-A-T BADGES: K3 & RESMİ GÜVENCE ── */}
            <TrustBadgesSection />

            {/* ── SERVICES: THE FEATURE HUB ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white relative">
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none z-10" />
                <div className="container-custom relative z-10">
                    <div className="flex flex-col items-center text-center mb-24 md:mb-40">
                        <span className="text-primary-500 font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] mb-6 md:mb-8 bg-primary-500/5 px-6 md:px-8 py-3 rounded-full border border-primary-500/10">Nakliyat Hizmetleri</span>
                        <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading font-black text-slate-950 leading-none tracking-tighter mb-8 md:mb-12">
                            Hizmet <br /> <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-600 italic font-normal">Evrenimiz.</span>
                        </h2>
                        <p className="text-slate-400 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed">
                            Lojistik standartlarını yeniden tanımlayan, her biri alanında uzmanlaşmış özel taşıma birimlerimizle tanışın.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                        {hizmetler.slice(0, 6).map((hizmet, i) => (
                            <ServiceCard3D
                                key={hizmet.id}
                                index={i}
                                title={hizmet.title}
                                description={hizmet.description}
                                icon={getServiceIcon(hizmet.id)}
                                href={hizmet.id === "evden-eve-nakliyat" ? "/evden-eve-nakliyat" : `/hizmetler/${hizmet.id}`}
                            />
                        ))}
                    </div>

                    <div className="mt-32 flex justify-center">
                        <Link href="/hizmetler" className="text-slate-950 font-black text-xs uppercase tracking-[0.6em] border border-slate-200 rounded-full px-16 py-8 hover:bg-slate-950 hover:text-white transition-all flex items-center gap-6 group">
                            Tüm Çözümleri Gör <IconArrow className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── SEARCH INTENT & SERVICE MATRIX (NAKLİYECİ, ASANSÖRLÜ, PARÇA EŞYA, OFİS, DEPO) ── */}
            <SearchIntentGrid />

            {/* ── PROCESS: TECHNICAL NODES ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-50 relative overflow-hidden">
                <PerspectiveGrid opacity="0.03" color="#000" />
                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-40 items-center">
                        <div className="space-y-10 md:space-y-16">
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                                Kusursuz <br />
                                <span className="font-serif text-primary-500 italic font-normal">Algoritma.</span>
                            </h2>
                            <div className="space-y-8 md:space-y-10">
                                {steps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -50 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        onMouseEnter={() => setActiveStep(i)}
                                        onClick={() => setActiveStep(i)}
                                        className={`flex flex-col sm:flex-row gap-6 md:gap-10 p-6 md:p-10 rounded-2xl md:rounded-[3rem] border transition-all cursor-default ${activeStep === i ? "bg-white border-primary-500 shadow-3xl scale-105" : "bg-transparent border-transparent grayscale opacity-40 hover:opacity-100 hover:grayscale-0"}`}
                                    >
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 transition-all ${activeStep === i ? "bg-primary-500 text-white shadow-xl" : "bg-slate-200 text-slate-400"}`}>
                                            {step.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <span className="text-primary-500 font-black text-[10px] tracking-widest">{step.num}</span>
                                            <h3 className="text-2xl font-black text-slate-950 tracking-tight">{step.title}</h3>
                                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="relative h-[400px] lg:h-[800px] flex items-center justify-center mt-12 lg:mt-0 w-full perspective-1000">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                                    className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[500px] aspect-square rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-3xl border-4 lg:border-8 border-white"
                                >
                                    <Image
                                        src={steps[activeStep].image}
                                        alt={steps[activeStep].title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-primary-500/10" />
                                    <div className="absolute bottom-3 lg:bottom-12 left-3 lg:left-12 right-3 lg:right-12 p-4 lg:p-10 bg-white/80 backdrop-blur-2xl rounded-[1.5rem] lg:rounded-[3rem] border border-white text-center lg:text-left">
                                        <h3 className="text-base sm:text-lg lg:text-3xl font-black text-slate-950 tracking-tighter mb-1 lg:mb-2 leading-tight">{steps[activeStep].title}</h3>
                                        <p className="text-[10px] sm:text-xs lg:text-sm text-slate-500 font-medium leading-snug lg:leading-normal">{steps[activeStep].desc}</p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2026 PRICING TABLE (1+1, 2+1, 3+1, 4+1) ── */}
            <PricingTable 
                title="2026 Ankara Evden Eve Nakliyat Fiyatları" 
                subtitle="Ankara içi ve ilçeler arası taşınmalarda sürpriz ek masrafsız, oda sayısına ve hizmet kapsamına göre şeffaf ortalama fiyatlandırma tablomuz. Fiyatlarımıza KDV, profesyonel marangozluk ve sigorta dahildir."
                locationName="Ankara"
            />

            {/* ── CONTRACT & FIXED PRICE GUARANTEE (KOMİSYONCU / ARACI TUZAĞINA SON) ── */}
            <ContractGuaranteeSection />

            {/* ── ANKARA DISTRICT LOGISTICS GUIDE ── */}
            <AnkaraGuideSection />

            {/* ── DISTRICT HUB: THE DIGITAL GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-950 relative overflow-hidden">
                <AuroraBackground />
                <div className="container-custom relative z-10 text-center">
                    <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter mb-10 md:mb-12">
                        Ankara <span className="font-serif text-primary-500 italic font-normal">Network.</span>
                    </h2>
                    <p className="text-white/30 text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-20 md:mb-32 leading-tight">
                        Şehrin her hücresinde, 25 ilçede aktif operasyon ağıyla <br />
                        <span className="text-white">yerel lojistik gücümüzü hissedin.</span>
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {ankaraIlceleri.slice(0, 15).map((ilce, i) => (
                            <Link
                                key={ilce.slug}
                                href={`/islemler/ankara/${ilce.slug}`}
                                className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2.5rem] group hover:bg-primary-500 transition-all duration-500 flex flex-col justify-center"
                            >
                                <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity block mb-1 md:mb-2 truncate">{ilce.slug}</span>
                                <h3 className="text-base sm:text-lg md:text-xl font-black text-white tracking-tighter group-hover:scale-105 transition-transform break-words">{ilce.name}</h3>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-32">
                        <Link href="/islemler" className="text-white font-black text-xs uppercase tracking-[0.6em] border border-white/10 rounded-full px-16 py-8 hover:bg-white hover:text-slate-950 transition-all">
                            Tüm Operasyon Noktaları
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── INTERACTIVE MOVING CHECKLIST (STRESSİZ TAŞINMA REHBERİ) ── */}
            <MovingChecklistSection />

            {/* ── HOME FAQ SECTION (Point 1) ── */}
            <section className="py-24 md:py-40 bg-white relative overflow-hidden">
                {/* Decorative background for FAQ */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-50/50 rounded-full blur-[120px] -mr-300 -mt-300" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/30 rounded-full blur-[120px] -ml-300 -mb-300" />

                <div className="container-custom relative z-10">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
                            <div className="space-y-4">
                                <span className="text-primary-600 font-black text-xs uppercase tracking-[0.5em] block">Bilgi Merkezi</span>
                                <h2 className="text-5xl md:text-8xl font-heading font-black text-slate-900 tracking-tighter leading-none">
                                    Sıkça Sorulan <br /> <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500 italic font-normal">Sorular.</span>
                                </h2>
                            </div>
                            <p className="text-slate-400 text-base md:text-xl font-medium max-w-sm border-l-2 border-primary-500 pl-8">
                                Taşınma sürecine dair aklınıza takılan tüm teknik detayları burada bulabilirsiniz.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-1 gap-6">
                            {sss.slice(0, 5).map((item, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <details className="group/item bg-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] overflow-hidden hover:border-primary-200 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500">
                                        <summary className="flex items-center justify-between p-8 md:p-12 cursor-pointer list-none">
                                            <div className="flex items-center gap-6 md:gap-10">
                                                <span className="text-2xl md:text-4xl font-black text-slate-100 group-hover/item:text-primary-100 transition-colors">0{i+1}</span>
                                                <h3 className="text-lg md:text-2xl font-black text-slate-900 pr-8">{item.question}</h3>
                                            </div>
                                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] bg-slate-50 flex items-center justify-center group-open/item:bg-primary-500 group-open/item:text-white transition-all duration-500">
                                                <IconPlus className="w-6 h-6 group-open/item:rotate-45 transition-transform duration-500" />
                                            </div>
                                        </summary>
                                        <div className="px-8 md:px-32 pb-12 text-slate-500 text-base md:text-xl font-medium leading-relaxed border-t border-slate-50 pt-10">
                                            {item.answer}
                                        </div>
                                    </details>
                                </motion.div>
                            ))}
                        </div>
                        
                        <div className="mt-20 flex justify-center">
                            <Link href="/sss" className="group flex items-center gap-4 px-10 py-5 bg-slate-900 text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-primary-500 transition-all shadow-2xl">
                                Tümünü Gör <IconArrow className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── TRUST & CERTIFICATES BAR (Point 4) ── */}
            <section className="py-24 md:py-32 bg-white relative overflow-hidden">
                {/* Cinematic Background Elements */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                     style={{ 
                        backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)", 
                        backgroundSize: "60px 60px",
                        transform: "perspective(1000px) rotateX(20deg) translateY(-50px) scale(1.5)",
                     }} 
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(249,115,22,0.05)_0%,_transparent_70%)] pointer-events-none" />

                <div className="container-custom relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
                        {[
                            { title: "Planlı Taşıma", desc: "İhtiyaca göre hazırlanan süreç", icon: <IconClipboard className="w-10 h-10" />, color: "from-orange-500 to-primary-500" },
                            { title: "Eşya Koruma", desc: "Paketleme seçenekleri", icon: <IconShield className="w-10 h-10" />, color: "from-blue-500 to-indigo-500" },
                            { title: "Taşıma Seçenekleri", desc: "Ev, ofis ve parça eşya", icon: <IconTruck className="w-10 h-10" />, color: "from-emerald-500 to-teal-500" },
                            { title: "Teklif Desteği", desc: "Telefon ve iletişim formu", icon: <IconUsers className="w-10 h-10" />, color: "from-purple-500 to-pink-500" }
                        ].map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ 
                                    y: -10,
                                    rotateX: 5,
                                    rotateY: -5,
                                    transition: { duration: 0.4, ease: "easeOut" }
                                }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative perspective-1000"
                            >
                                {/* Card Body - Glassmorphism */}
                                <div className="h-full p-8 md:p-10 bg-white border border-slate-100 rounded-[2.5rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
                                    {/* Hover Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 opacity-100 transition-opacity" />
                                    
                                    {/* Icon Container */}
                                    <div className="relative z-10 mb-8">
                                        <div className={`w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-white transition-all duration-500 relative`}>
                                            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500 shadow-xl`} />
                                            <span className="relative z-10 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                {item.icon}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="relative z-10 space-y-3">
                                        <h3 className="text-sm md:text-base font-black text-slate-900 uppercase tracking-[0.2em]">{item.title}</h3>
                                        <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-[0.3em] leading-relaxed px-4 opacity-70 group-hover:opacity-100 transition-opacity">
                                            {item.desc}
                                        </p>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${item.color} group-hover:w-1/3 transition-all duration-700 rounded-full mb-4`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL SPATIAL CTA ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-950 text-center relative overflow-hidden text-white">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500 blur-[200px] rounded-full" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 md:space-y-20"
                    >
                        <h2 className="text-4xl xs:text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.85] tracking-tighter">
                            Geleceğe <br /> <span className="text-primary-500 italic">Yol Alın.</span>
                        </h2>
                        <p className="text-white/40 text-base md:text-2xl font-medium max-w-2xl mx-auto px-4">
                            Eşyalarınızın yolculuğu profesyonel bir imza ile başlasın.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
                            <Link href="/iletisim" className="w-full sm:w-auto px-12 md:px-20 py-6 md:py-10 bg-white text-slate-950 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-lg md:text-xl shadow-3xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center gap-6">
                                Teklif Formu <IconArrow className="w-8 h-8" />
                            </Link>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="w-full sm:w-auto text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] border border-white/20 rounded-2xl md:rounded-[3rem] px-10 md:px-12 py-6 md:py-8 hover:bg-white/10 transition-all text-center">
                                {firmaBilgileri.phone}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
