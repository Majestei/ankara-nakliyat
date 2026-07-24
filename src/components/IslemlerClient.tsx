"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { ankaraIlceleri, turkiyeIlleri, istanbulIlceleri, civarIller, firmaBilgileri } from "@/data/siteData";
import {
    IconMapPin,
    IconTruck,
    IconGlobe,
    IconArrow,
    IconPhone,
    IconCheck,
    IconShield,
    IconBox,
    IconCog,
    IconMoney
} from "@/components/Icons";

// ── SHARED PREMIUM COMPONENTS ──

const PerspectiveGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
            backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)"
        }}
    />
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

function DistrictCard3D({ item, index }: { item: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["10deg", "-10deg"]));
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-10deg", "10deg"]));

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.02, duration: 0.8 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="group relative"
        >
            <Link href={`/islemler/ankara/${item.slug}`}>
                <div className="bg-white border border-slate-100 p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col items-center justify-center text-center h-full">
                    <div style={{ transform: "translateZ(30px)" }} className="relative z-10 w-full">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-primary-500 mb-3 md:mb-4 group-hover:bg-primary-500 group-hover:text-white transition-all mx-auto">
                            <IconMapPin className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <h3 className="text-[10px] md:text-xs font-black text-slate-950 uppercase tracking-[0.1em] md:tracking-[0.2em] break-words">{item.name}</h3>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            </Link>
        </motion.div>
    );
}

// ── MAIN CLIENT COMPONENT ──

export default function IslemlerClient() {
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="bg-white selection:bg-primary-500 selection:text-white">

            {/* ── CINEMATIC HUB HERO ── */}
            <section className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-slate-950">
                <PerspectiveGrid />

                <div className="container-custom relative z-10 text-center lg:text-left">
                    <motion.div style={{ scale: heroScale, opacity: heroOpacity }}>
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-full mb-12">
                            <IconGlobe className="w-4 h-4 text-primary-500 animate-spin-slow" />
                            <span className="text-white font-black text-[10px] uppercase tracking-[0.5em]">Global Lojistik Ağı</span>
                        </span>

                        <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-heading font-black text-white mb-8 md:mb-12 leading-[0.85] md:leading-[0.8] tracking-tighter">
                            Hizmet <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x">
                                Bölgelerimiz
                            </span>
                        </h1>

                        <div className="grid lg:grid-cols-2 gap-10 md:gap-20 items-center lg:items-end">
                            <p className="text-white/40 text-base md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 px-4 md:px-0">
                                Ankara&apos;nın her mahallesinden Türkiye&apos;nin her iline uzanan <br />
                                <span className="text-white">kusursuz bir lojistik köprüsü inşa ettik.</span>
                            </p>
                            <div className="flex flex-wrap gap-4 md:gap-6 justify-center lg:justify-end">
                                <div className="text-right px-6 md:px-10 py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] backdrop-blur-xl group hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                                        <IconMapPin className="w-6 h-6 md:w-8 md:h-8 text-primary-500 group-hover:scale-110 transition-transform" />
                                        <p className="text-3xl md:text-5xl font-black text-white leading-none">{ankaraIlceleri.length}</p>
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest">Ankara İlçesi</p>
                                </div>
                                <div className="text-right px-6 md:px-10 py-4 md:py-6 bg-white/5 border border-white/10 rounded-2xl md:rounded-[2rem] backdrop-blur-xl group hover:bg-white/10 transition-colors">
                                    <div className="flex items-center justify-end gap-3 md:gap-4 mb-1 md:mb-2">
                                        <IconGlobe className="w-6 h-6 md:w-8 md:h-8 text-primary-500 group-hover:rotate-12 transition-transform" />
                                        <p className="text-3xl md:text-5xl font-black text-white leading-none">100+</p>
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest">Hizmet Noktası</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── ANKARA DISTRICTS: THE LOCAL CORE ── */}
            <section className="py-20 md:py-40 lg:py-60 bg-white relative">
                <div className="container-custom">
                    <div className="text-center mb-16 md:mb-32 space-y-4 md:space-y-8">
                        <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.8em]">Lokal Operasyon</span>
                        <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black text-slate-950 tracking-tighter leading-none">
                            Ankara İçi <br /> <span className="text-slate-200 italic">Gücümüz</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {ankaraIlceleri.map((ilce, i) => (
                            <DistrictCard3D key={ilce.slug} item={ilce} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ISTANBUL NETWORK: DISTRICTS & METROPOL ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-50 relative overflow-hidden">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.8em] mb-4 md:mb-10 block">İstanbul Operasyon</span>
                            <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading font-black text-slate-950 tracking-tighter leading-none">
                                İstanbul <br /> <span className="text-slate-200">Bölgeler.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/3 p-6 md:p-12 bg-white rounded-2xl md:rounded-[3rem] border border-slate-100 shadow-xl">
                            <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed">
                                İstanbul&apos;un tüm ilçelerinde 39 noktada <br />
                                <span className="text-slate-950 font-black underline decoration-primary-500 decoration-4">7/24 aktif</span> lojistik destek sağlıyoruz.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {istanbulIlceleri.map((ilce, i) => (
                            <motion.div
                                key={ilce.slug}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.01 }}
                            >
                                <Link
                                    href={`/islemler/istanbul/${ilce.slug}`}
                                    className="group relative h-24 bg-white border border-slate-100 rounded-2xl p-6 flex flex-col justify-center hover:bg-slate-950 transition-all duration-500 overflow-hidden"
                                >
                                    <h3 className="text-[10px] font-black text-slate-700 group-hover:text-white transition-colors uppercase tracking-[0.2em] relative z-10 text-center">
                                        {ilce.name}
                                    </h3>
                                    <div className="absolute inset-0 bg-primary-500 opacity-0 group-hover:opacity-10 transition-opacity" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SURROUNDING CITIES: ANKARA-ISTANBUL AXIS ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white relative overflow-hidden">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] md:tracking-[0.8em] mb-4 md:mb-10 block">Metropol Bağlantı</span>
                            <h2 className="text-4xl md:text-7xl lg:text-9xl font-heading font-black text-slate-950 tracking-tighter leading-none">
                                Çevre <br /> <span className="text-slate-200">İller.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/3 p-6 md:p-12 bg-slate-50 rounded-2xl md:rounded-[3rem] border border-slate-100 shadow-xl">
                            <p className="text-slate-500 text-base md:text-xl font-medium leading-relaxed">
                                Ankara-İstanbul güzergahındaki tüm <br />
                                <span className="text-slate-950 font-black underline decoration-primary-500 decoration-4">çevre illere</span> günlük seferler.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                        {civarIller.map((il, i) => (
                            <motion.div
                                key={il.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link
                                    href={`/islemler/${il.slug}`}
                                    className="group relative bg-white border border-slate-200 rounded-[2rem] p-10 flex flex-col items-center justify-center hover:border-primary-500 transition-all duration-500"
                                >
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-primary-500 group-hover:text-white transition-all mb-6">
                                        <IconTruck className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">
                                        {il.name}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LOGISTICS INTELLIGENCE ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white">
                <div className="container-custom">
                    <div className="bg-slate-950 rounded-3xl md:rounded-[5rem] p-8 md:p-24 lg:p-32 text-white relative overflow-hidden shadow-3xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/10 to-transparent pointer-events-none" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-32">
                            <div className="space-y-16">
                                <h2 className="text-4xl md:text-7xl font-heading font-black leading-none tracking-tighter">
                                    Türkiye&apos;nin <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-500">Lojistik Kalbi:</span> <br className="sm:hidden" /> Ankara
                                </h2>
                                <div className="space-y-10 text-white/40 text-xl font-medium leading-relaxed">
                                    <p>
                                        Ankara Özdemir Nakliyat, Ankara&apos;nın stratejik konumunu kullanarak tüm Türkiye&apos;ye yayılan bir
                                        lojistik ağı kurmuştur. <strong className="text-white">Ankara-İstanbul</strong> hattımızda
                                        her gün karşılıklı araçlarımız bulunmaktadır.
                                    </p>
                                    <p>
                                        <strong className="text-white">Ege, Akdeniz ve Marmara</strong> rotalarımızda
                                        50+ araçlık filomuzla kesintisiz yanıt veriyoruz.
                                        Karadeniz&apos;den Doğu Anadolu&apos;ya kadar her coğrafi bölgede
                                        deneyimli ekiplerimizle yanınızdayız.
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                                {[
                                    { title: "Hızlı Teslimat", desc: "Şehirler arası rotalarda 24-48 saat içinde anahtar teslim.", i: <IconTruck /> },
                                    { title: "Dijital Takip", desc: "Araçlarımızı GPS üzerinden anlık olarak takip edebilirsiniz.", i: <IconGlobe /> },
                                    { title: "Ekonomik Çözüm", desc: "Az miktardaki eşyalarınız için parsiyel taşıma desteği.", i: <IconMoney /> },
                                    { title: "Dönüş Araçları", desc: "Dönüş yükü sistemiyle %30'a varan maliyet avantajı.", i: <IconCheck /> }
                                ].map((box, i) => (
                                    <div key={i} className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl md:rounded-[3rem] hover:border-primary-500 transition-colors group">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-white shadow-3xl group-hover:scale-110 transition-transform">
                                            {box.i}
                                        </div>
                                        <h4 className="text-lg md:text-xl font-black mb-3 md:mb-4 text-white tracking-tight">{box.title}</h4>
                                        <p className="text-xs md:text-sm text-white/40 leading-relaxed font-medium">{box.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-32 flex flex-wrap justify-center gap-4 border-t border-white/10 pt-16">
                            {[
                                "Ankara İstanbul Nakliyat", "Ankara İzmir Nakliyat", "Ankara Antalya Nakliyat",
                                "Ankara Bursa Nakliyat", "Ankara Adana Nakliyat", "Ankara Samsun Nakliyat"
                            ].map((route, i) => (
                                <span key={i} className="text-[10px] font-black text-white/20 hover:text-primary-400 uppercase tracking-[0.4em] px-8 py-4 bg-white/5 rounded-full cursor-default transition-all">
                                    {route}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FINAL PREMIUM CTA ── */}
            <section className="relative py-24 md:py-40 lg:py-60 bg-slate-950 overflow-hidden text-center text-white">
                <div className="absolute inset-0 z-0 opacity-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500 blur-[150px] rounded-full" />
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto space-y-16"
                    >
                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter">
                            Nereye Taşınmak <br /> <span className="text-primary-500">İstersiniz?</span>
                        </h2>
                        <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl mx-auto">
                            Hemen ücretsiz ekspertiz randevusu oluşturun, mesafe gözetmeksizin size en uygun teklifi hazırlayalım.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 pt-6 md:pt-10">
                            <MagneticButton
                                isAnchor
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="w-full sm:w-auto px-12 md:px-20 py-6 md:py-10 bg-white text-slate-950 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-lg md:text-xl shadow-3xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center gap-6"
                            >
                                <IconPhone className="w-6 h-6 md:w-8 md:h-8" /> {firmaBilgileri.phone}
                            </MagneticButton>
                            <Link href="/iletisim" className="w-full sm:w-auto text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] md:tracking-[0.6em] border border-white/20 rounded-2xl md:rounded-[3rem] px-10 md:px-12 py-6 md:py-8 hover:bg-white/10 transition-all flex items-center justify-center gap-4 group text-center">
                                İletişim Formu <IconArrow className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
