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
                const cardHref = ankaraIlceleri.some(district => district.slug === ilceSlug) && (item.id === "evden-eve-nakliyat" || item.id === "ofis-tasima")
                    ? `/islemler/ankara/${ilceSlug}/${item.id}`
                    : item.id === "evden-eve-nakliyat" ? "/evden-eve-nakliyat" : `/hizmetler/${item.id}`;
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
        `${ilce.name} için evden eve nakliyat planlarken iki adresin bina erişimini, eşya hacmini ve taşınma tarihini birlikte değerlendirin.`,
        `${ilce.name} için asansör gereksinimi, kat yüksekliği, zemin ve bina cephesinin uygunluğu adres özelinde değerlendirilmelidir.`,
        `Paketleme, söküm ve kurulum ihtiyaçlarını önceden paylaşın; fiyata dahil olan işleri ve ek hizmet koşullarını yazılı olarak netleştirin.`
    ];

    const highlights = [
        {
            title: "Dar Sokak & Yokuş Manevrası",
            desc: `${ilce.name} içindeki iki adreste sokak genişliği, eğim ve aracın yanaşabileceği yükleme alanı ayrı ayrı kontrol edilmelidir.`
        },
        {
            title: "Asansör Kurulum Uygunluğu",
            desc: `Dış cephe asansörü gereksinimi; eşya boyutu, kat yüksekliği, zemin ve kurulum alanına göre değerlendirilir.`
        },
        {
            title: "Site & Rezidans Yönetim Uyumu",
            desc: `Site yönetiminden yükleme saatleri, ortak alan kullanımı ve asansör kuralları hakkında önceden bilgi alın.`
        },
        {
            title: "Teklif ve Hizmet Kapsamı",
            desc: `Teklifin hangi işleri kapsadığını, ek hizmetlerin nasıl ücretlendirileceğini ve varsa poliçe koşullarını yazılı olarak görüşün.`
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white border-b border-slate-200 relative overflow-hidden">
            <div className="container-custom max-w-5xl px-4">
                <div className="text-center mb-14 space-y-4">
                    <span className="text-primary-600 font-bold text-xs uppercase tracking-[0.3em] bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                        Adres Bazında Planlama
                    </span>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight">
                        {ilce.name} Evden Eve Nakliyat & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">
                            Taşınma Hazırlık Rehberi
                        </span>
                    </h2>
                    <p className="text-slate-600 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                        {ilce.name} için taşınma planında bina erişimini, varsa site kurallarını, paketleme ve kurulum ihtiyaçlarını önceden değerlendirin.
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
                <div className="mt-12 space-y-8 text-slate-700 leading-relaxed">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Taşıma firmalarını hangi bilgilerle karşılaştırmalısınız?</h3>
                        <p>
                            {ilce.name} için teklif isterken her firmaya aynı eşya listesini, iki adresi, katları ve tercih ettiğiniz tarihi verin.
                            Paketleme, mobilya sökümü, kurulum, asansör ve yükleme yardımının fiyata dahil olup olmadığını ayrı ayrı sorun.
                            Firma bilgilerini, varsa taşıma yetki belgesini ve poliçenin kapsamını inceleyin; yalnız toplam tutarı karşılaştırmayın.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">Nakliyat fiyatını belirleyen koşullar</h3>
                        <p>
                            Oda sayısı başlangıç bilgisi verir; koli sayısı, büyük mobilyalar, sökülecek parçalar ve özel koruma isteyen eşyalar da önemlidir.
                            Araç ile bina arasındaki taşıma mesafesini, her iki adreste kat ve asansör durumunu, yönetimin izin verdiği saatleri belirtin.
                            Adres veya eşya listesi değişirse ücretin nasıl güncelleneceğini ve vergi koşullarını teklifte netleştirin.
                        </p>
                        {ankaraIlceleri.some(district => district.slug === ilce.slug) && (
                            <Link href={`/islemler/ankara/${ilce.slug}/nakliyat-fiyatlari`} className="inline-block mt-3 font-semibold text-primary-600 hover:underline">
                                {ilce.name} için fiyat teklifi hazırlığı
                            </Link>
                        )}
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Ofis ve iş yeri taşınması</h3>
                            <p>
                                Masa ve dolapları, elektronik cihazları ve arşiv kolilerini bölüm bazında listeleyin. Yeni adreste yerleşim sırasını ve teslim alacak kişiyi belirleyin.
                                Bilgisayar yedekleme, ağ bağlantısı ve cihaz kurulumunu kimin üstleneceğini taşıma işinden ayrı olarak görüşün.
                                Mesai dışı planın uygunluğunu ve olası bekleme süresini önceden teyit edin.
                            </p>
                            <Link href={ankaraIlceleri.some(district => district.slug === ilce.slug) ? `/islemler/ankara/${ilce.slug}/ofis-tasima` : "/hizmetler/ofis-tasima"} className="inline-block mt-3 font-semibold text-primary-600 hover:underline">
                                Ofis taşıma kapsamını inceleyin
                            </Link>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">Parça eşya ve şehirler arası seçenekler</h3>
                            <p>
                                Birkaç eşya için adet, yaklaşık ölçü, fotoğraf ve yükleme yardımına ihtiyaç olup olmadığını paylaşın.
                                Başka şehre taşınırken teslim tarihinin kesin mi esnek mi olduğunu, aktarma veya ortak araç planı bulunup bulunmadığını sorun.
                                Tam ev ile parça eşya teklifinin kapsamını eşya listesine göre karşılaştırın; düzenli sefer veya aynı gün teslim varsaymayın.
                            </p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                <Link href="/hizmetler/parca-esya-tasima" className="font-semibold text-primary-600 hover:underline">Parça eşya taşıma</Link>
                                <Link href="/hizmetler/sehirler-arasi-nakliyat" className="font-semibold text-primary-600 hover:underline">Şehirler arası planlama</Link>
                            </div>
                        </div>
                    </div>
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
            a: `${ilceName} için fiyat; eşya miktarı, iki adres arasındaki mesafe, katlar, bina erişimi ve paketleme kapsamına göre belirlenir. Güncel teklif için bu bilgileri paylaşın.`
        },
        {
            q: `${ilceName}'da asansörlü nakliyat kurulumu için cadde veya sokak izni gerekiyor mu?`,
            a: `İzin gereksinimi ve asansör kurulumu, adresin yol ve zemin koşullarına bağlıdır. Planlama sırasında site yönetimiyle ve gerektiğinde ilgili yerel birimlerle uygunluğu teyit edin.`
        },
        {
            q: `${ilceName} taşınma süreci ortalama kaç saat sürer?`,
            a: `Taşıma süresi; eşya miktarı, erişim, paketleme ve kurulum ihtiyacına göre değişir. ${ilceName} içindeki adreslerin ayrıntılarıyla bir zaman planı isteyin.`
        },
        {
            q: `Mobilya demontaj, montaj ve beyaz eşya bağlantıları fiyata dahil mi?`,
            a: `Söküm, kurulum ve cihaz bağlantılarını ayrı ayrı teklif sırasında belirtin. Hangi işlerin dahil olduğunu ve hangi işlemler için yetkili servis gerektiğini teyit edin.`
        },
        {
            q: `Taşınma günü sürpriz fiyat artışı veya ek masraf çıkar mı?`,
            a: `Eşya ve adres bilgilerini eksiksiz paylaşın. Fiyata dahil işler ile kapsam değişirse uygulanacak koşulları taşıma öncesinde yazılı olarak görüşün.`
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
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Adres Bazında Planlama</span>
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
                                Taşınma koşulları her adreste değişir. <span className="text-white">{ilce.name} için eşya ve bina bilgilerinizi paylaşın, taşıma kapsamını birlikte değerlendirelim.</span>
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
                                {ilce.name} için mevcut mahalle rehberlerini inceleyin. Taşıma ve asansör uygunluğunu açık adresinizle görüşün.
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
                                    { t: "Asansör Kat", d: "Kat ve kurulum alanına göre değerlendirme", i: <IconCog className="w-6 h-6" /> },
                                    { t: "KM Mesafe", d: `${cityName} çıkışlı rota ve mesafeye göre`, i: <IconTruck className="w-6 h-6" /> }
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
                                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tighter">Taşıma Kapsamını Netleştirin</h3>
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
                subtitle={`${ilce.name} için eşya, erişim ve mesafe bilgilerinizi paylaşarak güncel teklif isteyin. Dahil hizmetleri ve vergi koşullarını yazılı olarak netleştirin.`}
                locationName={ilce.name}
            />

            {/* ── MOVING CHECKLIST SECTION ── */}
            <MovingChecklistSection />

            {/* ── CONTRACT GUARANTEE SECTION ── */}
            <ContractGuaranteeSection />

            {/* ── SERVICE PLANNING ── */}
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
