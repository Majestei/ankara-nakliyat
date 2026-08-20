"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { hizmetler, firmaBilgileri } from "@/data/siteData";
import {
    IconTruck, IconMapPin, IconBuilding, IconBox, IconShield,
    IconCog, IconPhone, IconCheck, IconArrow, IconGlobe,
    IconStar
} from "@/components/Icons";
import { AnimatePresence } from "framer-motion";

const serviceImages: Record<string, string> = {
    "evden-eve-nakliyat": "/images/hizmetler/evden-eve-nakliyat.webp",
    "sehir-ici-nakliyat": "/images/hizmetler/sehir-ici-nakliyat.webp",
    "sehirler-arasi-nakliyat": "/images/hizmetler/sehirler-arasi-nakliyat.webp",
    "ofis-tasima": "/images/hizmetler/ofis-tasima.webp",
    "parca-esya-tasima": "/images/hizmetler/parca-esya-tasima.webp",
    "asansorlu-tasima": "/images/hizmetler/asansorlu-tasima.webp",
    "depolama": "/images/hizmetler/paketleme.webp",
    "paketleme": "/images/hizmetler/paketleme.webp",
    "nakliyat-sigortasi": "/images/hizmetler/sigorta.webp",
    "sigorta": "/images/hizmetler/sigorta.webp",
};

function getServiceIcon(id: string) {
    const cls = "w-10 h-10";
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
        default: return <IconTruck className={cls} />;
    }
}

function AnimatedIconCycle() {
    const icons = [
        <IconTruck key="truck" className="w-64 h-64" />,
        <IconBox key="box" className="w-64 h-64" />,
        <IconBuilding key="building" className="w-64 h-64" />,
        <IconCog key="cog" className="w-64 h-64" />,
        <IconShield key="shield" className="w-64 h-64" />,
        <IconMapPin key="map" className="w-64 h-64" />
    ];
    
    const [index, setIndex] = React.useState(0);
    
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % icons.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [icons.length]);
    
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.5, rotate: 20 }}
                transition={{ duration: 0.8, ease: "anticipate" }}
                className="text-white drop-shadow-2xl flex items-center justify-center"
            >
                {icons[index]}
            </motion.div>
        </AnimatePresence>
    );
}

function getServiceDetails(id: string) {
    switch (id) {
        case "evden-eve-nakliyat":
            return { tag: "Anahtar Teslim Taşınma", badgeTitle: "VIP Paketleme", badgeDesc: "Beyaz Eşya & Mobilya Koruma" };
        case "sehir-ici-nakliyat":
            return { tag: "Aynı Gün Teslimat", badgeTitle: "Hızlı Lojistik", badgeDesc: "Ankara'nın Her Köşesine Erişim" };
        case "sehirler-arasi-nakliyat":
            return { tag: "81 İlde Hizmet Ağı", badgeTitle: "Rota Güvencesi", badgeDesc: "GPS Takip & Sigortalı Yolculuk" };
        case "ofis-tasima":
            return { tag: "İş Sürekliliği Garantisi", badgeTitle: "IT & Arşiv Koruma", badgeDesc: "Hassas Ekipman Taşımacılığı" };
        case "parca-esya-tasima":
            return { tag: "Ekonomik Çözümler", badgeTitle: "Parsiyel Lojistik", badgeDesc: "Küçük Hacimli Eşya Güvencesi" };
        case "asansorlu-tasima":
            return { tag: "Dikey Lojistik Çözümü", badgeTitle: "15. Kat Erişimi", badgeDesc: "Dar Merdivenlere Modern Çözüm" };
        case "paketleme":
            return { tag: "Sıfır Hasar Politikası", badgeTitle: "Ultra Koruma", badgeDesc: "Profesyonel Ambalaj Teknikleri" };
        case "nakliyat-sigortasi":
        case "sigorta":
            return { tag: "Maddi Risk Koruması", badgeTitle: "Kapsamlı Poliçe", badgeDesc: "Taşıma Boyunca %100 Teminat" };
        default:
            return { tag: "Premium Servis", badgeTitle: "Kurumsal Güvence", badgeDesc: "Profesyonel Hizmet Garantisi" };
    }
}

function FloatingShape({ color, size, top, left, delay }: { color: string; size: string; top: string; left: string; delay: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.1, 1]
            }}
            transition={{ duration: 10 + Math.random() * 5, repeat: Infinity, delay }}
            className={`absolute ${size} ${color} rounded-full blur-3xl opacity-20 pointer-events-none -z-10 hidden md:block`}
            style={{ top, left }}
        />
    );
}

function ServiceSection({ hizmet, index }: { hizmet: any; index: number }) {
    const isEven = index % 2 === 0;
    const details = getServiceDetails(hizmet.id);
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <section id={hizmet.id} className="relative py-24 md:py-32 lg:py-40 first:pt-16 md:first:pt-20 border-b border-slate-100 last:border-0 overflow-hidden">
            <div className="container-custom relative z-10">
                <div className={`flex flex-col lg:flex-row items-center gap-12 md:gap-20 lg:gap-32 ${isEven ? "" : "lg:flex-row-reverse"}`}>

                    {/* Content Side */}
                    <div className="lg:w-1/2 space-y-8 md:space-y-10 text-center lg:text-left px-4 md:px-0">
                        <motion.div
                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center gap-4 px-6 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-primary-500">
                                <span className="w-8 h-px bg-primary-500/30" />
                                {details.tag}
                            </div>

                            <h2 className="text-5xl md:text-7xl font-heading font-black text-slate-950 leading-[0.9] tracking-tighter">
                                {hizmet.title}
                            </h2>

                            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
                                {hizmet.description}
                            </p>
                        </motion.div>

                        <motion.ul
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            {hizmet.features.map((feature: string, i: number) => (
                                <li key={i} className="flex items-center gap-4 bg-white border border-slate-100 p-5 rounded-[2rem] shadow-sm hover:shadow-md hover:border-primary-200 transition-all group">
                                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-500 flex items-center justify-center group-hover:bg-primary-500 group-hover:text-white transition-all">
                                        <IconCheck className="w-5 h-5" />
                                    </div>
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-widest leading-none">{feature}</span>
                                </li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="pt-6"
                        >
                            <Link href="/iletisim" className="group relative inline-flex items-center gap-4 px-12 py-5 bg-slate-950 text-white rounded-3xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                                <span className="relative z-10 font-black uppercase tracking-widest text-xs flex items-center gap-3">
                                    Hemen Teklif Al <IconArrow className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Side (3D) */}
                    <div className="lg:w-1/2 w-full perspective-2000 mt-12 lg:mt-0">
                        <motion.div
                            ref={cardRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={() => { x.set(0); y.set(0); }}
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            initial={{ opacity: 0, scale: 0.9, rotateY: isEven ? 10 : -10 }}
                            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square w-full rounded-3xl md:rounded-[4rem] overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,0.12)]"
                        >
                            <Image
                                src={serviceImages[hizmet.id] || "/images/hizmetler/evden-eve-nakliyat.webp"}
                                alt={hizmet.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-white/10" />

                            {/* Floating Glass Badge */}
                            <motion.div
                                style={{ transform: "translateZ(80px)" }}
                                className="absolute bottom-6 md:bottom-12 right-6 md:right-12 bg-white/20 backdrop-blur-3xl border border-white/30 p-4 md:p-8 rounded-2xl md:rounded-[3rem] text-white shadow-2xl"
                            >
                                <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/20 flex items-center justify-center">
                                        <IconShield className="w-4 h-4 md:w-6 md:h-6" />
                                    </div>
                                    <span className="font-black text-lg md:text-xl tracking-tight">{details.badgeTitle}</span>
                                </div>
                                <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">{details.badgeDesc}</p>
                            </motion.div>

                            {/* Floating Icon Pop-out */}
                            <motion.div
                                style={{ transform: "translateZ(120px)" }}
                                className="absolute top-12 left-12 w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white shadow-3xl rotate-12"
                            >
                                {getServiceIcon(hizmet.id)}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Decorations */}
            <FloatingShape color="bg-primary-500" size="w-96 h-96" top="10%" left={isEven ? "80%" : "-10%"} delay={0} />
            <FloatingShape color="bg-orange-500" size="w-64 h-64" top="60%" left={isEven ? "-5%" : "70%"} delay={2} />
        </section>
    );
}

export default function HizmetlerClient() {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* ── NEW PREMIUM HERO ── */}
            <section className="relative min-h-[70vh] md:min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden">
                {/* 3D Perspective Grid Background */}
                <div className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                        transform: "perspective(1000px) rotateX(60deg) translateY(-100px) scale(2)"
                    }}
                />

                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <div className="lg:w-3/5 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="inline-flex items-center gap-3 bg-primary-50 border border-primary-100 px-6 py-2 rounded-full mb-8">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                    </span>
                                    <span className="text-primary-600 font-black text-[10px] uppercase tracking-[0.4em]">Kurumsal Güç & Güven</span>
                                </span>

                                <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-heading font-black text-slate-950 mb-8 md:mb-10 leading-[0.9] md:leading-[0.85] tracking-tighter">
                                    Nakliyat <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-600">
                                        Hizmetlerimiz
                                    </span>
                                </h1>

                                <p className="text-slate-500 text-lg md:text-2xl font-medium max-w-2xl leading-relaxed mb-10 md:mb-12 mx-auto lg:mx-0 px-4 md:px-0">
                                    Lojistiğin geleceğini bugünden inşa ediyoruz.
                                    Siz sadece yeni adresinizin keyfini sürün, biz tüm <span className="text-slate-950 font-black italic">stresi süpürelim.</span>
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="px-10 py-5 bg-slate-950 text-white rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-primary-500 transition-all shadow-2xl hover:scale-105 active:scale-95">
                                        Hemen Arayın
                                    </a>
                                    <Link href="/iletisim" className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-3xl font-black uppercase tracking-widest text-xs hover:border-primary-500 transition-all hover:bg-slate-50">
                                        Teklif İsteyin
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/5 hidden lg:flex justify-end pr-10">
                            <motion.div
                                animate={{ y: [0, -40, 0], rotate: [0, 8, 0] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                                className="relative w-80 h-80 bg-gradient-to-br from-primary-500 to-orange-600 rounded-[5rem] shadow-[0_50px_100px_rgba(249,115,22,0.3)] p-1 items-center justify-center flex overflow-hidden group"
                            >
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                                <AnimatedIconCycle />
                                
                                {/* Decorative elements inside the box */}
                                <div className="absolute top-8 left-8 w-4 h-4 rounded-full bg-white/20 blur-sm" />
                                <div className="absolute bottom-12 right-12 w-8 h-8 rounded-full bg-white/10 blur-md" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ── STICKY CAPSULE NAVIGATION ── */}
            <nav aria-label="Hızlı Hizmet Menüsü" className="sticky top-20 md:top-24 z-50 px-4">
                <div className="container-custom max-w-5xl">
                    <ul className="bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-2xl md:rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.12)] p-4 flex justify-start md:justify-between items-center overflow-x-auto hide-scrollbar gap-8 md:gap-10 m-0 list-none">
                        {hizmetler.map((hizmet) => (
                            <li key={hizmet.id} className="shrink-0">
                                <Link href={`#${hizmet.id}`} className="whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-primary-500 transition-all hover:scale-110 block py-2">
                                    {hizmet.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* ── SERVICES CONTENT ── */}
            {hizmetler.map((hizmet, i) => (
                <ServiceSection key={hizmet.id} hizmet={hizmet} index={i} />
            ))}

            {/* ── FINAL TRUST BANNER ── */}
            <section className="py-24 md:py-40 bg-slate-50 relative overflow-hidden">
                <div className="container-custom text-center relative z-10 px-4 md:px-0">
                    <h3 className="text-4xl md:text-7xl font-heading font-black text-slate-950 mb-12 md:mb-20 tracking-tighter">Bize Güvenen 10.000+ Mutlu Yuva</h3>
                    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Yıllık Deneyim", val: "15+", icon: <IconShield /> },
                            { label: "Tamamlanan İş", val: "10K+", icon: <IconTruck /> },
                            { label: "Google Puanı", val: "4.9", icon: <IconStar /> },
                            { label: "Araç Filosu", val: "10+", icon: <IconBox /> },
                        ].map((stat, i) => (
                            <motion.li
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[3.5rem] border border-slate-100 shadow-xl flex flex-col items-center group"
                            >
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary-50 text-primary-500 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                                    <div className="w-6 h-6 md:w-8 md:h-8">{stat.icon}</div>
                                </div>
                                <div className="text-3xl md:text-4xl font-black text-slate-950 mb-1">{stat.val}</div>
                                <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
