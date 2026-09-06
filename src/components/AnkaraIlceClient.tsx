"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { firmaBilgileri, hizmetler, ilceIcerikleri, ankaraIlceleri } from "@/data/siteData";
import { neighborhoodsByDistrict } from "@/data/neighborhoodData";
import { 
    IconPhone, IconShield, IconMoney, IconTruck, 
    IconBox, IconCog, IconMapPin, IconArrow, IconPlus, IconStar, IconCheck 
} from "@/components/Icons";
import { IlceInternalLinks, HizmetInternalLinks } from "@/components/InternalLinks";
import PricingTable from "@/components/PricingTable";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ContractGuaranteeSection from "@/components/ContractGuaranteeSection";
import MovingChecklistSection from "@/components/MovingChecklistSection";

// ── SPATIAL UI COMPONENTS ──

const SpatialBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-slate-950" />
        {/* Animated Aurora Glows */}
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
        {/* Perspective Grid with Warp */}
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

function PodCard({ item, ilceName, ilceSlug, index }: { item: any, ilceName: string, ilceSlug: string, index: number }) {
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
            {(() => {
                const cardHref = (item.id === "evden-eve-nakliyat" || item.id === "ofis-tasima")
                    ? `/islemler/ankara/${ilceSlug}/${item.id}`
                    : `/hizmetler/${item.id}`;
                return <Link href={cardHref} className="absolute inset-0 z-20" aria-label={`${ilceName} ${item.title}`} />;
            })()}
            <div style={{ transform: "translateZ(60px)" }} className="relative z-10 pointer-events-none">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-6 md:mb-10 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    <IconBox className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter mb-3 md:mb-6">
                    {ilceName} <br />
                    <span className="text-primary-500">{item.title}</span>
                </h3>
            </div>
            
            <div style={{ transform: "translateZ(40px)" }} className="relative z-10 pointer-events-none">
                <p className="text-white/40 text-lg font-medium leading-relaxed italic mb-8">
                    &ldquo;{ilceName}&apos;da {item.shortDesc.toLowerCase()}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 shrink-0">Premium Service</span>
                </div>
            </div>

            {/* Glowing Orbit */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full border border-primary-500/10 rounded-full"
            />
        </motion.div>
    );
}

function DistrictGuideSection({ ilce }: { ilce: { name: string; slug: string } }) {
    const content = ilceIcerikleri[ilce.slug] || [
        `${ilce.name} evden eve nakliyat hizmetlerimizde, bölgenin sokak yapısına ve mimari özelliklerine uygun geniş araç filomuz ve kadrolu ekibimizle profesyonel çözümler sunuyoruz.`,
        `${ilce.name}'da yüksek katlı siteler ve müstakil yerleşimler için geliştirdiğimiz 25. kata kadar erişen modüler asansör sistemimizle eşyalarınızı bina merdivenlerine temas etmeden, sıfır hasar riskiyle taşıyoruz.`,
        `Taşınma öncesinde ücretsiz ekspertiz yaparak sabit fiyat sözleşmesi imzalıyor, ambalajlamadan montaja kadar süreci anahtar teslim olarak tamamlıyoruz.`
    ];

    const highlights = [
        {
            title: "Dar Sokak & Yokuş Manevrası",
            desc: `${ilce.name}'nın dik yokuşlarına, yoğun cadde trafiğine ve dar sokaklarına uygun manevra kabiliyeti yüksek kapalı çelik kasa araç filosu.`
        },
        {
            title: "25. Kata Kadar Modüler Asansör",
            desc: `${ilce.name}'daki yüksek katlı rezidans ve sitelerde bina merdivenlerini ve apartman asansörünü işgal etmeden dış cepheden hızlı yükleme.`
        },
        {
            title: "Site & Rezidans Yönetim Uyumu",
            desc: `Toplu konut sitelerinde yönetim kuralları, peyzaj koruma, otopark saatleri ve yük asansörü protokollerine %100 profesyonel uyum.`
        },
        {
            title: "Sözleşmeli Sabit Fiyat Güvencesi",
            desc: `Taşınma günü kapıda ek masraf veya sürpriz fiyat artışı yok. K3 lisansı, emtia sigortası ve imzalı sözleşmeyle güvencedesiniz.`
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
            <div className="container-custom max-w-5xl px-4">
                <div className="text-center mb-14 space-y-4">
                    <span className="text-primary-600 font-bold text-xs uppercase tracking-[0.3em] bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                        Bölgesel Saha Tecrübesi
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight">
                        {ilce.name} Evden Eve Nakliyat & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">
                            Saha Lojistiği Rehberi
                        </span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        {ilce.name} ilçesinde taşınırken sokak yapısından site izinlerine, asansör kurulumundan mobilya montajına kadar bilmeniz gereken tüm operasyonel detaylar.
                    </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 mb-12 space-y-6 shadow-sm">
                    {content.map((p, idx) => (
                        <p
                            key={idx}
                            className="text-slate-700 text-base md:text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: p.replace(/\*\*(.*?)\*\*/g, "<strong class='text-slate-900 font-bold bg-primary-100/50 px-1 py-0.5 rounded'>$1</strong>")
                            }}
                        />
                    ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                    {highlights.map((h, i) => (
                        <div key={i} className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl shadow-sm hover:border-primary-500/50 hover:bg-primary-50/20 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center font-black text-base mb-4 border border-primary-200">
                                0{i + 1}
                            </div>
                            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">{h.title}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">{h.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function DistrictFaqAccordion({ ilceName }: { ilceName: string }) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            q: `${ilceName}'da evden eve nakliyat fiyatları ne kadar?`,
            a: `${ilceName} nakliyat fiyatları 2026 yılı için ortalama 1+1 daireler için 8.000 - 12.000 ₺, 2+1 daireler için 12.000 - 16.500 ₺, 3+1 daireler için 16.500 - 23.000 ₺ aralığındadır. Fiyat; kat durumu, asansör gereksinimi ve seçilen pakete (Standart veya Anahtar Teslim VIP) göre netleşir.`
        },
        {
            q: `${ilceName}'da asansörlü nakliyat kurulumu için cadde veya sokak izni gerekiyor mu?`,
            a: `Modüler dış cephe asansörlerimiz araç üstü hidrolik sistem olduğu için çoğu sokakta trafiği tıkamadan 20-30 dakikada kurulur. Dar sokaklarda veya ana arterlerde gerekirse zabıta ve belediye izin süreçlerini önceden koordine ediyoruz.`
        },
        {
            q: `${ilceName} taşınma süreci ortalama kaç saat sürer?`,
            a: `${ilceName} içi taşımalarda 4-5 kişilik kadrolu ekibimiz ve dış cephe asansörümüz sayesinde sabah 08:30'da başlayan bir 3+1 daire taşınması ortalama 4-6 saat içinde yeni evinizde mobilyalarınız monte edilmiş olarak teslim edilir.`
        },
        {
            q: `Mobilya demontaj, montaj ve beyaz eşya bağlantıları fiyata dahil mi?`,
            a: `Evet. Ekibimizdeki kadrolu marangoz gardırop, baza, masa ve üniteleri söker; yeni evinizde dilediğiniz odaya kurar. Çamaşır ve bulaşık makinelerinizin su tesisat bağlantıları da fiyata dahildir.`
        },
        {
            q: `Taşınma günü sürpriz fiyat artışı veya ek masraf çıkar mı?`,
            a: `Asla. Taşıma öncesi WhatsApp video keşfi veya fiziki ekspertiz ile sabit fiyat sözleşmesi imzalanır. Sözleşmede yazan rakam haricinde tek bir kuruş ek ücret talep edilmez.`
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white border-t border-slate-200">
            <div className="container-custom max-w-4xl px-4">
                <div className="text-center mb-12 space-y-4">
                    <span className="text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                        Merak Edilenler
                    </span>
                    <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">
                        {ilceName} Nakliyat Sıkça Sorulan Sorular
                    </h2>
                    <p className="text-slate-600 text-sm md:text-base">
                        {ilceName} bölgesindeki taşınma süreçleriyle ilgili müşterilerimizin en çok sorduğu sorular ve şeffaf yanıtlarımız.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-primary-600 transition-colors"
                            >
                                <span className="text-base md:text-lg">{faq.q}</span>
                                <span className={`text-xl font-black transition-transform duration-200 text-primary-500 shrink-0 ${openIndex === i ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            {openIndex === i && (
                                <div className="px-6 pb-6 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-200/60 pt-4">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── MAIN CLIENT COMPONENT ──

export default function AnkaraIlceClient({ ilce, digerIlceler }: { ilce: any, digerIlceler: any[] }) {
    const { scrollYProgress } = useScroll();
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    const keywords = [
        `${ilce.name} nakliyat`, `${ilce.name} evden eve`, `${ilce.name} fiyatları`,
        `${ilce.name} firmaları`, `${ilce.name} asansörlü`, `${ilce.name} sigortalı`
    ];

    const isAnkara = ankaraIlceleri.some(i => i.slug === ilce.slug);
    const isIstanbul = false; // Istanbul is completely removed
    const cityName = isAnkara ? "Ankara" : (isIstanbul ? "İstanbul" : ilce.name);

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
                                <span>Bölge Kontrol Merkezi:</span>
                                <span className="text-primary-500">{ilce.name}</span>
                            </div>
                        </MagneticElement>
                        
                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 md:mb-16">
                            <span className="text-white/10">{ilce.name}</span> <br />
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

                {/* Floating Metrics */}
                <div className="absolute bottom-20 left-10 hidden lg:block">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Active Units: 42+</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Region: {ilce.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DISTRICT LOGISTICS & FIELD GUIDE ── */}
            <DistrictGuideSection ilce={ilce} />

            {/* ── SPATIAL PODS GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 relative">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">Operasyonel Yetkinlik</span>
                            <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter">
                                Bölgesel <br /> <span className="text-white/10">Güç.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/3 p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl md:rounded-[3rem] backdrop-blur-3xl">
                            <p className="text-white/50 text-base md:text-xl font-medium leading-relaxed">
                                Lojistiği bir algoritma gibi kusursuz işliyoruz. <span className="text-white">{ilce.name}&apos;da her sokak bizim kontrolümüzde.</span>
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12">
                        {hizmetler.slice(0, 6).map((hizmet, i) => (
                            <PodCard key={hizmet.id} item={hizmet} ilceName={ilce.name} ilceSlug={ilce.slug} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── NEIGHBORHOODS SECTION ── */}
            {neighborhoodsByDistrict[ilce.slug] && (
                <section className="py-24 bg-slate-50 relative overflow-hidden">
                    <div className="container-custom relative z-10 px-4 md:px-0">
                        <div className="text-center mb-12 md:mb-16 space-y-4">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-widest">Hizmet Alanı</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                                {ilce.name} Mahalleleri
                            </h2>
                            <p className="text-slate-500 max-w-2xl mx-auto font-medium text-sm md:text-base">
                                {ilce.name} ilçesinin tüm mahallelerinde profesyonel asansörlü nakliyat ve paketleme hizmeti sunuyoruz.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {neighborhoodsByDistrict[ilce.slug].map((mahalle, i) => {
                                const isIstanbul = false;
                                const baseUrl = isIstanbul ? "/islemler/istanbul" : "/islemler/ankara";
                                return (
                                    <Link href={`${baseUrl}/${ilce.slug}/${mahalle.slug}`} key={mahalle.slug} className="block group">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="p-5 md:p-6 bg-white border border-slate-100 rounded-2xl md:rounded-3xl text-center group-hover:border-primary-500 transition-all shadow-sm group-hover:shadow-xl group-hover:shadow-primary-500/10 h-full flex items-center justify-center"
                                    >
                                        <span className="text-slate-700 font-bold group-hover:text-primary-600 transition-colors block text-sm truncate w-full">
                                            {mahalle.name}
                                        </span>
                                    </motion.div>
                                </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── DIGITAL TERMINAL DASHBOARD ── */}
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
                                    { t: "Asansör Kat", d: "15. kata kadar dikey lojistik desteği", i: <IconCog className="w-6 h-6" /> },
                                    { t: "KM Mesafe", d: `${cityName} içi ve 81 il arası km bazlı`, i: <IconTruck className="w-6 h-6" /> }
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
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter">Tam Kapsamlı Güvence</h3>
                                <p className="text-white/40 text-base md:text-lg lg:text-xl font-medium leading-relaxed italic px-4">
                                    &ldquo;{ilce.name}&apos;da taşınan her eşya bizim için birer emanettir.&rdquo;
                                </p>
                                <div className="pt-6 md:pt-10 border-t border-white/10 flex flex-col gap-4 lg:gap-6">
                                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="py-5 md:py-8 bg-white text-slate-950 rounded-xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] lg:text-xs">
                                        Hemen Bağlan: {firmaBilgileri.phone}
                                    </a>
                                    <Link href="/iletisim" className="py-5 md:py-8 border border-white/20 text-white rounded-xl md:rounded-[2rem] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] lg:text-xs hover:bg-white/5 transition-all">
                                        Süreci Başlat
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 2026 DISTRICT PRICING TABLE ── */}
            <PricingTable 
                title={`${ilce.name} Nakliyat Fiyatları (2026)`}
                subtitle={`${ilce.name} genelinde ve tüm mahallelerinde geçerli, sürpriz masrafsız şeffaf evden eve nakliyat fiyat tarifesi. Fiyatlarımıza KDV, marangozluk ve sigorta dahildir.`}
                locationName={ilce.name}
            />

            {/* ── MOVING CHECKLIST SECTION ── */}
            <MovingChecklistSection />

            {/* ── CONTRACT GUARANTEE SECTION ── */}
            <ContractGuaranteeSection />

            {/* ── INSTITUTIONAL TRUST BADGES (K3 & RESMİ GÜVENCE) ── */}
            <TrustBadgesSection />

            {/* ── DISTRICT FAQ ACCORDION ── */}
            <DistrictFaqAccordion ilceName={ilce.name} />

            {/* ── THE KINETIC HUB ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-12 md:mb-32 space-y-4 md:space-y-10 px-4">
                        <span className="px-6 py-2 bg-slate-100 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-slate-400">Bölgesel Hizmet Ağı</span>
                        <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading font-black text-slate-950 tracking-tighter leading-tight">{cityName} <br className="sm:hidden" /> <span className="text-slate-200 italic">İşlem Merkezi</span></h2>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {digerIlceler.map((i) => (
                            <Link 
                                key={i.slug} 
                                href={isAnkara ? `/islemler/ankara/${i.slug}` : (isIstanbul ? `/islemler/istanbul/${i.slug}` : `/islemler/${i.slug}`)} 
                                className="group relative h-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] flex items-center justify-center overflow-hidden hover:bg-slate-950 transition-all duration-700"
                            >
                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 group-hover:text-white transition-colors">{i.name}</span>
                                <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-10" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS SECTION ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white overflow-hidden">
                <div className="container-custom">
                    <div className="text-center mb-12 md:mb-32 px-4">
                        <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">Müşteri Deneyimi</span>
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-heading font-black text-slate-950 tracking-tighter italic">Referanslarımız.</h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {[
                            { name: "Burak K.", service: "Evden Eve Taşıma", comment: `${ilce.name}'da sabah vaktinde tam saatinde geldiler. Gardırop montajı ve ambalajlama son derece temiz yapıldı, çiziksiz taşındık.` },
                            { name: "Ayşe T.", service: "Asansörlü Nakliyat", comment: `${ilce.name}'daki 8. kat dairemize modüler asansör kurarak 2 saatte tüm eşyaları indirdiler. Merdiven ve komşular rahatsız olmadan bitti.` },
                            { name: "Murat S.", service: "Sabit Fiyat Güvencesi", comment: `Taşınma öncesi anlaşılan sözleşmeli fiyata harfiyen uyuldu. Hiçbir ek masraf veya sürpriz olmadan güvenle taşındık.` }
                        ].map((review, i) => (
                            <motion.div 
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-8 lg:p-12 bg-slate-50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] lg:rounded-[4rem] space-y-6 lg:space-y-8"
                            >
                                <div className="flex items-center gap-4 lg:gap-6">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center font-black text-xl">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-slate-950 text-lg lg:text-xl">{review.name}</p>
                                        <p className="text-xs text-primary-600 font-bold">{review.service}</p>
                                    </div>
                                </div>
                                <div className="flex text-amber-400">
                                    {[1,2,3,4,5].map(s => <IconStar key={s} className="w-4 h-4 fill-current" />)}
                                </div>
                                <p className="text-slate-600 text-sm lg:text-base font-medium leading-relaxed italic">&ldquo;{review.comment}&rdquo;</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INTERNAL LINKS (SEO) ── */}
            <section className="py-24 bg-white border-t border-slate-100 relative z-10">
                <div className="container-custom">
                    <div className="mb-16">
                        <h3 className="text-2xl md:text-4xl font-heading font-black text-slate-900 mb-8 tracking-tight">Ankara&apos;nın Diğer İlçeleri</h3>
                        <IlceInternalLinks currentSlug={ilce.slug} maxItems={25} />
                    </div>
                    <div>
                        <h3 className="text-2xl md:text-4xl font-heading font-black text-slate-900 mb-8 tracking-tight">Nakliyat Hizmetlerimiz</h3>
                        <HizmetInternalLinks />
                    </div>
                </div>
            </section>

            {/* ── FINAL SPATIAL CTA ── */}
            <section className="py-24 md:py-40 lg:py-60 text-center relative overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 md:space-y-20"
                    >
                        <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-[10rem] font-heading font-black text-slate-950 tracking-tighter leading-[0.85]">
                            Yeni Bir <br /> <span className="text-primary-500">Türkiye&apos;ye</span> <br /> Taşının.
                        </h2>
                        <MagneticElement strength={0.6} className="inline-block w-full sm:w-auto">
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 bg-slate-950 text-white px-8 md:px-20 py-6 md:py-10 rounded-2xl lg:rounded-[4rem] text-lg md:text-3xl font-black shadow-[0_50px_100px_rgba(0,0,0,0.3)] hover:bg-primary-500 transition-all duration-700">
                                <IconPhone className="w-8 h-8 lg:w-12 lg:h-12" /> {firmaBilgileri.phone}
                            </a>
                        </MagneticElement>
                    </motion.div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-slate-50 -z-10 select-none pointer-events-none opacity-50 tracking-tighter">
                    {ilce.name.toUpperCase()}
                </div>
            </section>
        </div>
    );
}
