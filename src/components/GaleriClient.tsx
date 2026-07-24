"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { galeriItems } from "@/data/galeriData";
import { firmaBilgileri } from "@/data/siteData";
import {
    IconCamera,
    IconPlay,
    IconX,
    IconChevronLeft,
    IconChevronRight,
    IconZoomIn,
    IconPhone,
    IconHome,
    IconBuilding,
    IconShield,
    IconCheck,
    IconTruck,
    IconArrow,
    IconGlobe
} from "@/components/Icons";

// ── SHARED PREMIUM COMPONENTS ──

const PerspectiveGrid = () => (
    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
            backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "100px 100px",
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

function GalleryCard3D({ item, index, onClick }: { item: any, index: number, onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]));
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]));

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
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: index * 0.05, duration: 0.8 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            onClick={onClick}
            className="group relative aspect-[4/5] rounded-[3rem] overflow-hidden cursor-pointer bg-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
        >
            <div className="absolute inset-0 w-full h-full">
                {item.type === "video" ? (
                    <>
                        <video src={item.src} muted playsInline preload="metadata" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                                <IconPlay className="w-8 h-8 ml-1" />
                            </div>
                        </div>
                    </>
                ) : (
                    <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                )}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500" style={{ transform: "translateZ(30px)" }}>
                    <p className="text-primary-500 text-[10px] font-black uppercase tracking-widest mb-2">{item.category}</p>
                    <h3 className="text-white font-heading font-black text-2xl leading-tight tracking-tighter">{item.title}</h3>
                </div>
            </div>
        </motion.div>
    );
}

// ── MAIN CLIENT COMPONENT ──

export default function GaleriClient() {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [filter, setFilter] = useState("all");
    const { scrollYProgress } = useScroll();

    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const filteredItems = filter === "all"
        ? galeriItems
        : galeriItems.filter(item => item.category.toLowerCase().includes(filter.toLowerCase()) || item.type === filter);

    const openLightbox = (index: number) => setSelectedImage(index);
    const closeLightbox = () => setSelectedImage(null);

    const goToPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage === null) return;
        setSelectedImage(selectedImage === 0 ? filteredItems.length - 1 : selectedImage - 1);
    };

    const goToNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage === null) return;
        setSelectedImage(selectedImage === filteredItems.length - 1 ? 0 : selectedImage + 1);
    };

    return (
        <div className="bg-white selection:bg-primary-500 selection:text-white">

            {/* ── CINEMATIC GALLERY HERO ── */}
            <section className="relative min-h-[60vh] md:min-h-[90vh] flex items-center pt-24 md:pt-32 pb-16 md:pb-20 overflow-hidden bg-slate-950">
                <PerspectiveGrid />

                <div className="container-custom relative z-10 text-center">
                    <motion.div style={{ opacity: heroOpacity, scale: heroScale }}>
                        <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 md:px-8 py-3 rounded-full mb-8 md:mb-12">
                            <IconCamera className="w-4 h-4 text-primary-500" />
                            <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em]">Görsel Kanıt Merkezi</span>
                        </span>

                        <h1 className="text-5xl md:text-9xl lg:text-[12rem] font-heading font-black text-white mb-8 md:mb-12 leading-[0.85] md:leading-[0.8] tracking-tighter">
                            Nakliyat <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x">
                                Galerisi
                            </span>
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mt-12 md:mt-20 max-w-6xl mx-auto">
                            {[
                                { val: "10K+", label: "BAŞARILI TAŞINMA", i: <IconHome /> },
                                { val: "50+", label: "ARAÇ FİLOSU", i: <IconTruck /> },
                                { val: "%100", label: "GÜVENCE SİGORTASI", i: <IconShield /> }
                            ].map((stat, i) => (
                                <div key={i} className="px-8 md:px-10 py-6 md:py-8 bg-white/5 border border-white/10 rounded-2xl md:rounded-[3rem] backdrop-blur-xl group hover:bg-white/10 transition-all flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-2">
                                    <div className="flex items-center justify-center gap-3 md:gap-4 sm:mb-2">
                                        <div className="text-primary-500 group-hover:scale-110 transition-transform">{stat.i}</div>
                                        <p className="text-3xl md:text-4xl font-black text-white leading-none">{stat.val}</p>
                                    </div>
                                    <p className="text-[7px] md:text-[8px] font-black text-white/40 uppercase tracking-widest">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── INTERACTIVE GALLERY GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white relative">
                <div className="container-custom">
                    {/* Modern Glass Filters */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-20 md:mb-32 sticky top-[70px] md:top-24 z-40 bg-white/95 backdrop-blur-2xl py-4 -mx-4 px-4 md:mx-0 md:px-0 md:bg-transparent md:backdrop-blur-none border-b border-slate-100 md:border-none shadow-sm md:shadow-none">
                        {["all", "video", "evden eve", "ofis", "asansörlü"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 md:px-10 py-3 md:py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${filter === f
                                        ? "bg-slate-950 text-white shadow-xl scale-105 md:scale-110"
                                        : "bg-white text-slate-500 border border-slate-200 hover:border-primary-500 shadow-sm"
                                    }`}
                            >
                                {f === "all" ? "TÜMÜ" : f.toUpperCase()}
                            </button>
                        ))}
                    </div>

                        <motion.div
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredItems.map((item, index) => (
                                    <GalleryCard3D key={item.id} item={item} index={index} onClick={() => openLightbox(index)} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                </div>
            </section>

            {/* ── EDITORIAL INTELLIGENCE SECTION ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-50 overflow-hidden">
                <div className="container-custom">
                    <div className="bg-white rounded-3xl md:rounded-[5rem] p-8 md:p-24 lg:p-32 shadow-3xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[100px] pointer-events-none" />

                        <div className="relative z-10 grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
                            <div className="space-y-16">
                                <h2 className="text-5xl md:text-8xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                                    Paketleme <br />
                                    <span className="text-primary-500 italic">Sanatımız.</span>
                                </h2>
                                <div className="space-y-10 text-slate-500 text-xl font-medium leading-relaxed">
                                    <p>
                                        Galerimizde gördüğünüz her kare, <strong className="text-slate-950">Ankara Özdemir Nakliyat</strong> ekiplerinin
                                        gerçek iş sahalarında, en zorlu koşullarda bile taviz vermediği kalite standardını yansıtır.
                                    </p>
                                    <p>
                                        <strong className="text-slate-950">Paketleme disiplinimiz</strong>, eşyanın ömrünü koruyan bir mühendislik sürecidir.
                                        Patpatlı naylonlardan, özel köşebentlere kadar her detay sıfır hasar vizyonumuzun bir parçasıdır.
                                    </p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
                                {[
                                    { title: "Steril Filo", desc: "Her taşıma sonrası dezenfekte edilen kapalı kasa araçlar.", i: <IconTruck /> },
                                    { title: "Uzman Kadro", desc: "Taşıma, marangozluk ve paketleme uzmanı sabit personel.", i: <IconCheck /> },
                                    { title: "Modern Sistem", desc: "Çizilmelere karşı özel köşebent ve askılı dolap sistemleri.", i: <IconShield /> },
                                    { title: "Hassas Lojistik", desc: "Antika ve değerli eşyalar için özel aparatlı taşıma çözümleri.", i: <IconGlobe /> }
                                ].map((box, i) => (
                                    <div key={i} className="p-8 md:p-10 bg-slate-50 border border-slate-100 rounded-3xl md:rounded-[3rem] hover:border-primary-500 transition-all group">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-8 text-primary-500 shadow-xl group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            {box.i}
                                        </div>
                                        <h4 className="text-lg md:text-xl font-black mb-3 md:mb-4 text-slate-950 tracking-tight">{box.title}</h4>
                                        <p className="text-xs md:text-sm text-slate-500 leading-relaxed font-medium">{box.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-32 flex flex-wrap justify-center gap-4 border-t border-slate-100 pt-16">
                            {[
                                "Asansörlü Nakliyat", "Eşya Paketleme", "Ankara Nakliye",
                                "Ofis Taşıma", "Evden Eve Videoları", "Sigortalı Taşımacılık"
                            ].map((tag, i) => (
                                <span key={i} className="text-[10px] font-black text-slate-400 hover:text-primary-500 uppercase tracking-[0.4em] px-8 py-4 bg-slate-50 rounded-full cursor-default transition-all">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LIGHTBOX: CINEMATIC LIGHTROOM ── */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-3xl flex items-center justify-center p-4 md:p-10"
                        onClick={closeLightbox}
                    >
                        <button onClick={closeLightbox} className="absolute top-4 md:top-8 right-4 md:right-8 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center text-white transition-all z-[110] border border-white/20 shadow-xl">
                            <IconX className="w-6 h-6 md:w-8 md:h-8" />
                        </button>

                        <button onClick={goToPrev} className="absolute left-2 md:left-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110] group border border-white/20 backdrop-blur-xl shadow-xl">
                            <IconChevronLeft className="w-8 h-8 md:w-12 md:h-12 group-hover:-translate-x-1 md:group-hover:-translate-x-2 transition-transform" />
                        </button>

                        <button onClick={goToNext} className="absolute right-2 md:right-10 top-1/2 -translate-y-1/2 w-12 h-12 md:w-20 md:h-20 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110] group border border-white/20 backdrop-blur-xl shadow-xl">
                            <IconChevronRight className="w-8 h-8 md:w-12 md:h-12 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 50, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-[75vh] md:h-[75vh] w-full rounded-2xl md:rounded-[4rem] overflow-hidden bg-black shadow-3xl border border-white/10">
                                {filteredItems[selectedImage].type === "video" ? (
                                    <video src={filteredItems[selectedImage].src} controls autoPlay playsInline className="w-full h-full object-contain md:object-contain" />
                                ) : (
                                    <Image src={filteredItems[selectedImage].src} alt={filteredItems[selectedImage].alt} fill className="object-contain" unoptimized />
                                )}
                            </div>
                            <div className="mt-6 md:mt-12 text-center space-y-2 md:space-y-4">
                                <h3 className="text-white font-heading font-black text-2xl md:text-5xl tracking-tighter">{filteredItems[selectedImage].title}</h3>
                                <p className="text-primary-500 font-black uppercase tracking-[0.5em] text-[10px]">{filteredItems[selectedImage].category}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                        className="max-w-5xl mx-auto space-y-12 md:space-y-20"
                    >
                        <h2 className="text-5xl md:text-[10rem] font-heading font-black text-white leading-[0.9] md:leading-[0.8] tracking-tighter">
                            Geleceğinizi <br /> <span className="text-primary-500">Kuralım.</span>
                        </h2>
                        <p className="text-white/40 text-lg md:text-2xl font-medium max-w-2xl mx-auto px-4">
                            Görsellerimizdeki kaliteyi bizzat deneyimlemek için hemen ücretsiz ekspertiz randevusu alın.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10">
                            <MagneticButton
                                isAnchor
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="w-full sm:w-auto px-10 md:px-20 py-6 md:py-10 bg-white text-slate-950 rounded-2xl md:rounded-[3rem] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-lg md:text-xl shadow-3xl hover:bg-primary-500 hover:text-white transition-all flex items-center justify-center gap-6"
                            >
                                <IconPhone className="w-6 h-6 md:w-8 md:h-8" /> {firmaBilgileri.phone}
                            </MagneticButton>
                            <Link href="/iletisim" className="w-full sm:w-auto text-white font-black text-xs uppercase tracking-[0.6em] border border-white/20 rounded-2xl md:rounded-[3rem] px-12 py-8 hover:bg-white/10 transition-all flex items-center justify-center gap-4 group">
                                Online Teklif Al <IconArrow className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
