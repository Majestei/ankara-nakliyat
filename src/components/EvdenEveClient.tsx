"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { firmaBilgileri, ankaraIlceleri, turkiyeIlleri, toplamIlSayisi } from "@/data/siteData";
import { 
    IconBox, IconShield, IconWrench, IconCog, IconTruck, 
    IconClipboard, IconPhone, IconHome, IconCheck, IconMapPin,
    IconArrow, IconPlus, IconStar
} from "@/components/Icons";

// ── 3D UTILS & SUB-COMPONENTS ──

const PerspectiveGrid = () => (
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none overflow-hidden hidden md:block">
        <div className="absolute inset-0" 
             style={{ 
                backgroundImage: "linear-gradient(to right, rgba(249,115,22,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(249,115,22,0.1) 1px, transparent 1px)", 
                backgroundSize: "80px 80px",
                transform: "perspective(1200px) rotateX(65deg) translateY(-200px) scale(3)" 
             }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950" />
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

// FAQ Data
const evdenEveFaq = [
    { q: "Evden eve nakliyat kaç saat sürer?", a: "Ortalama bir 2+1 dairenin taşınması, eşya yoğunluğu ve kat durumuna bağlı olarak 4 ile 7 saat arasında tamamlanmaktadır." },
    { q: "Mobilyaların sökülüp kurulması kime ait?", a: "Alanında uzman marangozlarımız tüm mobilyalarınızın demontaj ve yeni evinizde montaj işlemlerini profesyonelce gerçekleştirmektedir." },
    { q: "Şehirler arası nakliyat yapıyor musunuz?", a: "Evet, Ankara merkezli olarak Türkiye'nin 81 iline sigortalı ve garantili şehirler arası evden eve nakliyat hizmeti sunuyoruz." },
    { q: "Asansörlü nakliyat ücretli mi?", a: "Asansör kullanımı binanın kat durumuna göre belirlenir. Toplam teklifimizde asansör maliyeti açıkça belirtilir, sonradan ek ücret talep edilmez." }
];

function HologramCard({ children }: { children: React.ReactNode }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]));
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]));

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <div className="perspective-2000">
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl md:rounded-[4rem] p-8 md:p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden"
            >
                <div style={{ transform: "translateZ(80px)" }}>{children}</div>
                {/* Dynamic light effect */}
                <motion.div 
                    style={{ 
                        left: useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]),
                        top: useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]),
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/20 blur-[100px] pointer-events-none"
                />
            </motion.div>
        </div>
    );
}

function FeatureCard3D({ item, index }: { item: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, type: "spring" }}
            className="group relative h-full bg-slate-50 border border-slate-100 rounded-3xl md:rounded-[3rem] p-8 md:p-10 hover:bg-white hover:border-primary-500 hover:-translate-y-4 transition-all duration-700 shadow-sm hover:shadow-[0_40px_80px_rgba(249,115,22,0.15)]"
        >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center text-primary-500 mb-8 md:mb-10 shadow-xl border border-slate-50 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                {React.cloneElement(item.icon as React.ReactElement, { className: "w-8 h-8 md:w-10 md:h-10" })}
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-950 mb-4 md:mb-6 tracking-tight">{item.title}</h3>
            <p className="text-sm md:text-lg leading-relaxed mb-6 md:mb-8 font-medium italic opacity-70 group-hover:opacity-100 transition-opacity text-slate-500">&ldquo;{item.desc}&rdquo;</p>
            <div className="pt-8 border-t border-slate-200/50 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{item.detail}</span>
                <IconCheck className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
        </motion.div>
    );
}

// ── MAIN COMPONENT ──

export default function EvdenEveClient() {
    // FAQPage JSON-LD Schema
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: evdenEveFaq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.a,
            },
        })),
    };

    const evdenEveOzellikleri = [
        { icon: <IconBox className="w-10 h-10" />, title: "Profesyonel Paketleme", desc: "Kırılacak eşyalarınız için çift katlı balonlu naylon ve özel köpük sistemleri kullanıyoruz.", detail: "Tam Koruma" },
        { icon: <IconShield className="w-10 h-10" />, title: "Tam Kapsamlı Sigorta", desc: "Taşınma öncesi eşyalarınızın ekspertizi yapılarak gerçek değerinde sigortalanır.", detail: "Axa & Allianz" },
        { icon: <IconWrench className="w-10 h-10" />, title: "Uzman Marangozluk", desc: "Gardırop, beyaz eşya ve avizelerinizin söküm ve montajı profesyonellerce yapılır.", detail: "Söküm & Montaj" },
        { icon: <IconCog className="w-10 h-10" />, title: "Modüler Asansör", desc: "15. kata kadar ulaşabilen modüler asansörlerimizle eşyalarınız çizilmeden taşınır.", detail: "Dikey Lojistik" },
        { icon: <IconTruck className="w-10 h-10" />, title: "Çelik Kasalı Filo", desc: "Hava süspansiyonlu, içi mobilya taşımaya uygun tasarlanmış özel araçlar.", detail: "Modern Filo" },
        { icon: <IconClipboard className="w-10 h-10" />, title: "Ücretsiz Ekspertiz", desc: "Taşınma günü sürpriz maliyetlerle karşılaşmamanız için yerinde ücretsiz keşif.", detail: "Sıfır Sürpriz" },
    ];

    return (
        <div className="bg-white overflow-x-hidden selection:bg-primary-500 selection:text-white font-sans">
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            
            {/* ── CINEMATIC 3D HERO ── */}
            <section className="relative min-h-[85dvh] md:min-h-screen flex items-center justify-center pt-24 md:pt-32 pb-20 overflow-hidden bg-slate-950">
                <PerspectiveGrid />
                
                {/* Layered Background Scenes */}
                <div className="absolute inset-0 z-0 scale-110 blur-sm opacity-30 grayscale pointer-events-none">
                    <Image src="/images/hizmetler/evden-eve-nakliyat.webp" alt="Ankara Evden Eve Nakliyat Hizmeti" fill priority sizes="100vw" className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/40 to-slate-950" />

                <div className="container-custom relative z-10 py-10 md:py-20">
                    <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
                        <div className="lg:w-3/5 text-center lg:text-left order-2 lg:order-1">
                            <motion.div
                                initial={{ opacity: 0, x: -100 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="inline-flex items-center gap-4 px-6 md:px-8 py-3 bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full mb-8 md:mb-12 shadow-2xl">
                                    <motion.span 
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-3 h-3 bg-primary-500 rounded-full" 
                                    />
                                    <span className="text-white font-black text-[9px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em]">Premium Deneyim Sanatı</span>
                                </div>
                                
                                <h1 className="text-5xl md:text-8xl lg:text-[8rem] font-heading font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter mb-8 md:mb-10">
                                    Ankara <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary-400 via-orange-500 to-primary-600">
                                        Evden Eve
                                    </span> <br />
                                    <span className="text-white/20">Nakliyat</span>
                                </h1>
                                
                                <p className="text-white/40 text-base md:text-3xl font-medium max-w-2xl leading-relaxed mb-12 md:mb-16 mx-auto lg:mx-0 px-4 md:px-0">
                                    Lojistiğin geleceğini bugünden inşa ediyoruz. <br />
                                    <span className="text-white">Sigortalı, asansörlü ve ultra profesyonel taşınma.</span>
                                </p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-6 md:gap-10 px-4 md:px-0">
                                    <MagneticButton 
                                        isAnchor
                                        href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                        className="px-10 md:px-16 py-6 md:py-8 bg-primary-500 text-white rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] md:text-sm shadow-[0_30px_60px_rgba(249,115,22,0.4)] hover:shadow-[0_40px_80px_rgba(249,115,22,0.6)]"
                                    >
                                        Hemen Arayın <IconPhone className="inline-block ml-4 w-5 h-5 md:w-6 md:h-6" />
                                    </MagneticButton>
                                    
                                    <MagneticButton 
                                        href="/iletisim"
                                        className="px-10 md:px-16 py-6 md:py-8 bg-white/5 border border-white/10 text-white backdrop-blur-3xl rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-[0.3em] text-[10px] md:text-sm hover:bg-white/10"
                                    >
                                        Teklif Alın
                                    </MagneticButton>
                                </div>
                            </motion.div>
                        </div>

                        <div className="lg:w-2/5 order-1 lg:order-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotateY: 30 }}
                                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                                transition={{ duration: 1.5, delay: 0.2 }}
                            >
                                <HologramCard>
                                    <div className="text-center text-white py-6 md:py-10">
                                        <div className="text-7xl md:text-9xl font-black mb-2 md:mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">15+</div>
                                        <div className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.8em] text-primary-400">Yıllık Güven</div>
                                        <div className="mt-8 md:mt-12 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                        <p className="mt-6 md:mt-8 text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-loose">
                                            Ankara&apos;nın her köşesinde <br /> binlerce mutlu yuva.
                                        </p>
                                    </div>
                                </HologramCard>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <motion.div animate={{ y: [0, -40, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-[20%] left-[5%] w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />
                <motion.div animate={{ y: [0, 40, 0] }} transition={{ duration: 7, repeat: Infinity }} className="absolute bottom-[20%] right-[5%] w-64 h-64 bg-orange-500/10 blur-3xl rounded-full" />
            </section>

            {/* ── INTERACTIVE FEATURES GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-white relative">
                <div className="container-custom">
                    <div className="text-center mb-16 md:mb-32 space-y-6 md:space-y-8 px-4">
                        <motion.span 
                            initial={{ opacity: 0 }} 
                            whileInView={{ opacity: 1 }}
                            className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em]"
                        >
                            Uzmanlık Alanlarımız
                        </motion.span>
                        <h2 className="text-5xl md:text-9xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                            Standartları <br /> <span className="text-slate-200 italic">Biz Belirliyoruz.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {evdenEveOzellikleri.map((item, i) => (
                            <FeatureCard3D key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SMART PRICING DASHBOARD ── */}
            <section className="py-24 md:py-40 lg:py-60 bg-slate-950 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
                    <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary-500 to-transparent" />
                </div>
                
                <div className="container-custom relative z-10">
                    <div className="grid lg:grid-cols-2 gap-32 items-center">
                        <div className="space-y-10 md:space-y-12 text-center lg:text-left px-4 md:px-0">
                            <h2 className="text-5xl md:text-8xl font-heading font-black text-white leading-[0.95] md:leading-[0.85] tracking-tighter">
                                Şeffaf <br />
                                <span className="text-primary-500">Fiyatlandırma</span>
                            </h2>
                            <p className="text-white/40 text-lg md:text-2xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Hiçbir sürpriz maliyetle karşılaşmamanız için her adımı dijital ortamda planlıyoruz.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                {[
                                    { text: "Eşya Hacmi", icon: <IconBox className="w-5 h-5 md:w-6 md:h-6" /> },
                                    { text: "Asansör İhtiyacı", icon: <IconCog className="w-5 h-5 md:w-6 md:h-6" /> },
                                    { text: "Lojistik Mesafe", icon: <IconTruck className="w-5 h-5 md:w-6 md:h-6" /> },
                                    { text: "Paketleme Düzeyi", icon: <IconCheck className="w-5 h-5 md:w-6 md:h-6" /> }
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] flex flex-col items-center gap-3 md:gap-4 hover:bg-white/10 transition-all">
                                        <div className="text-primary-500">{item.icon}</div>
                                        <span className="text-white font-black uppercase tracking-widest text-[9px] md:text-[10px] text-center">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <HologramCard>
                            <div className="space-y-10">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-3xl font-black text-white">Ekspertiz Talebi</h3>
                                    <div className="px-4 py-1 bg-primary-500 text-white text-[8px] font-black uppercase tracking-widest rounded-full animate-pulse">Live</div>
                                </div>
                                <p className="text-white/60 text-lg leading-relaxed">
                                    Ankara geneline aynı gün profesyonel keşif ekiplerimizi ücretsiz yönlendiriyoruz.
                                </p>
                                <div className="space-y-4">
                                    <MagneticButton 
                                        isAnchor
                                        href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                        className="w-full py-8 bg-white text-slate-950 rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 hover:bg-primary-500 hover:text-white transition-all"
                                    >
                                        <IconPhone className="w-5 h-5" /> {firmaBilgileri.phone}
                                    </MagneticButton>
                                    <Link href="/iletisim" className="block w-full py-8 border border-white/20 text-white rounded-3xl font-black uppercase tracking-[0.4em] text-[10px] text-center hover:bg-white/5">
                                        Detaylı Teklif Al
                                    </Link>
                                </div>
                            </div>
                        </HologramCard>
                    </div>
                </div>
            </section>

            {/* ── THE SPOTLIGHT REVIEW ── */}
            <section className="py-32 md:py-60 lg:py-80 bg-white relative overflow-hidden">
                <div className="container-custom relative z-10 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-6xl mx-auto space-y-16"
                    >
                        <div className="flex justify-center gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <motion.div key={i} animate={{ rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}>
                                    <IconStar className="w-12 h-12 text-orange-400" />
                                </motion.div>
                            ))}
                        </div>
                        
                        <h2 className="text-4xl md:text-9xl font-heading font-black text-slate-950 leading-[1] md:leading-[0.95] tracking-tighter px-4 md:px-0">
                            &ldquo;Taşınmanın <span className="text-primary-500">Sanata</span> Dönüştüğü Tek Adres.&rdquo;
                        </h2>
                        
                        <div className="flex flex-col items-center gap-8">
                            <div className="relative">
                                <div className="w-24 h-24 rounded-full border-4 border-white shadow-2xl overflow-hidden relative">
                                    <Image 
                                        src="/images/yorumlar/mert-yilmaz.webp" 
                                        alt="Mert Yılmaz" 
                                        fill 
                                        sizes="96px"
                                        className="object-cover" 
                                    />
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full shadow-xl">
                                    <IconCheck className="w-4 h-4" />
                                </div>
                            </div>
                            <div>
                                <p className="text-slate-950 font-black uppercase tracking-[0.5em] text-sm">Mert Yılmaz</p>
                                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Elite Müşteri & Yerel Rehber</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
                
                {/* Background Text Decor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black text-slate-50 -z-10 select-none pointer-events-none opacity-50 tracking-tighter">
                    TRUST
                </div>
            </section>

            {/* ── DISTRICT EXPLORER GRID ── */}
            <section className="py-24 md:py-60 bg-slate-50">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-center justify-between mb-16 md:mb-32 gap-10 px-4">
                        <div className="max-w-2xl text-center lg:text-left">
                            <h2 className="text-4xl md:text-7xl font-heading font-black text-slate-950 tracking-tighter leading-none mb-6 md:mb-8">
                                Ankara&apos;nın <br /> <span className="text-primary-500">Her Köşesindeyiz.</span>
                            </h2>
                            <p className="text-slate-500 text-lg md:text-xl font-medium">Hizmet ağımızı her gün genişletiyor, Ankara&apos;nın nabzını tutuyoruz.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="px-6 md:px-10 py-4 md:py-5 bg-white border border-slate-200 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-sm">{ankaraIlceleri.length}+ İlçe</div>
                            <div className="px-6 md:px-10 py-4 md:py-5 bg-primary-500 text-white rounded-2xl md:rounded-3xl font-black uppercase tracking-widest text-[9px] md:text-[10px] shadow-xl">{toplamIlSayisi} İl</div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {ankaraIlceleri.map((ilce, i) => (
                            <Link 
                                key={ilce.slug} 
                                href={`/islemler/ankara/${ilce.slug}`} 
                                className="group relative bg-white border border-slate-100 rounded-2xl md:rounded-[3rem] p-4 md:p-12 text-center hover:bg-slate-950 hover:border-slate-950 transition-all duration-700 shadow-sm hover:shadow-2xl hover:-translate-y-3 flex flex-col items-center justify-center h-full"
                            >
                                <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-8 bg-slate-50 rounded-xl md:rounded-2xl flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-500">
                                    <IconMapPin className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <span className="text-[10px] md:text-xs font-black text-slate-950 uppercase tracking-[0.1em] md:tracking-[0.2em] group-hover:text-white transition-colors break-words w-full">{ilce.name}</span>
                                <div className="mt-2 md:mt-4 text-[8px] font-bold text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Hemen Keşfet &rarr;</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ ACCORDION ── */}
            <section className="py-24 md:py-60 bg-white px-4">
                <div className="container-custom max-w-5xl">
                    <div className="text-center mb-16 md:mb-32 space-y-6 md:space-y-8">
                        <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.8em]">Sıkça Sorulanlar</span>
                        <h2 className="text-5xl md:text-9xl font-heading font-black text-slate-950 leading-none tracking-tighter">
                            Merak <br /> <span className="text-slate-200">Edilenler.</span>
                        </h2>
                    </div>
                    <div className="space-y-8">
                        {evdenEveFaq.map((item, i) => (
                            <details key={i} className="group bg-slate-50 rounded-2xl md:rounded-[3.5rem] border border-slate-100 overflow-hidden hover:bg-white hover:border-primary-500 transition-all duration-500 shadow-sm hover:shadow-2xl">
                                <summary className="flex items-center justify-between p-6 md:p-12 cursor-pointer font-black text-slate-950 uppercase tracking-[0.3em] text-[10px] md:text-[11px] list-none">
                                    <span className="pr-4">{item.q}</span>
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl md:rounded-[1.5rem] flex items-center justify-center text-primary-500 group-open:rotate-45 transition-transform shadow-sm shrink-0">
                                        <IconPlus className="w-5 h-5 md:w-6 md:h-6" />
                                    </div>
                                </summary>
                                <div className="px-6 md:px-12 pb-8 md:pb-12 text-base md:text-xl text-slate-500 font-medium leading-relaxed border-t border-slate-100/50 pt-6 md:pt-10">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FINAL CINEMATIC CTA ── */}
            <section className="relative py-32 md:py-60 lg:py-80 bg-slate-950 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.2),transparent_70%)]" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-5xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-[12rem] font-heading font-black text-white mb-12 md:mb-20 leading-[1] md:leading-[0.8] tracking-tighter">
                            Yeni Bir <br /> 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 italic">Başlangıca</span> <br />
                            Adım Atın.
                        </h2>
                        <MagneticButton 
                            isAnchor
                            href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-6 md:gap-8 bg-white text-slate-950 hover:bg-primary-500 hover:text-white font-black rounded-3xl md:rounded-[4rem] px-12 md:px-24 py-6 md:py-12 text-xl md:text-3xl shadow-[0_50px_100px_rgba(255,255,255,0.1)] transition-all"
                        >
                            <IconPhone className="w-8 h-8 md:w-12 md:h-12" /> Hemen Başlayın
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
