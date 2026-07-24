"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { faqData, faqCategories } from "@/data/faqData";
import { firmaBilgileri, musterıYorumlari } from "@/data/siteData";
import {
    IconChevronRight, IconPhone, IconMail, IconShield, IconCheck,
    IconArrow, IconStar, IconUsers, IconTruck, IconBox, IconClipboard
} from "@/components/Icons";

/* ── Ambient Helpers ── */
const AuroraBlob = ({ className }: { className?: string }) => (
    <div className={`absolute rounded-full blur-[120px] pointer-events-none ${className}`} />
);

const GridOverlay = () => (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
            backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
            backgroundSize: "80px 80px",
            transform: "perspective(1200px) rotateX(60deg) translateY(-250px) scale(3)"
        }}
    />
);

/* ── Stat Pill ── */
const StatPill = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 group hover:bg-white/10 transition-all"
    >
        <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <div className="text-xl font-black text-white tracking-tight">{value}</div>
            <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{label}</div>
        </div>
    </motion.div>
);

/* ── Category Icon Map ── */
function getCategoryIcon(cat: string) {
    const cls = "w-4 h-4";
    switch (cat) {
        case "Fiyatlandırma": return <IconClipboard className={cls} />;
        case "Süreç & Paketleme": return <IconBox className={cls} />;
        case "Sigorta & Güvenlik": return <IconShield className={cls} />;
        case "Asansörlü Taşıma": return <IconTruck className={cls} />;
        default: return null;
    }
}

/* ── MAIN COMPONENT ── */
export default function FaqClient() {
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const categoryImages: Record<string, string> = {
        "Tümü": "/images/genel/sss.webp",
        "Fiyatlandırma": "/images/genel/cta-bg.webp",
        "Süreç & Paketleme": "/images/hizmetler/paketleme.webp",
        "Sigorta & Güvenlik": "/images/hizmetler/sigorta.webp",
        "Asansörlü Taşıma": "/images/hizmetler/asansorlu-tasima.webp"
    };
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const displayFaqs = activeCategory === "Tümü"
        ? faqData
        : faqData.filter(faq => faq.category === activeCategory);

    const trustItems = [
        { icon: <IconShield className="w-6 h-6" />, title: "Tam Kapsamlı Sigorta", desc: "Tüm eşyalarınız A+ sigorta poliçesi ile korunur" },
        { icon: <IconCheck className="w-6 h-6" />, title: "Sözleşmeli Hizmet", desc: "Fiyat garantili resmi taşıma sözleşmesi" },
        { icon: <IconUsers className="w-6 h-6" />, title: "Uzman Kadro", desc: "Eğitimli ve deneyimli profesyonel ekip" },
        { icon: <IconTruck className="w-6 h-6" />, title: "Modern Filo", desc: "GPS takipli kapalı kasa araç filosu" },
    ];

    return (
        <div className="bg-slate-50 selection:bg-primary-500 selection:text-white">

            {/* ═══════════════ HERO ═══════════════ */}
            <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950 text-white">
                {/* BG Image */}
                <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 bg-contain md:bg-cover bg-top md:bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url('${categoryImages[activeCategory] || categoryImages["Tümü"]}')`,
                            }}
                        />
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-slate-950/80" />
                </motion.div>
                <GridOverlay />
                <AuroraBlob className="w-[600px] h-[600px] bg-primary-600/15 top-1/4 -left-40" />
                <AuroraBlob className="w-[500px] h-[500px] bg-orange-500/10 bottom-0 right-0" />

                <motion.div style={{ opacity: heroOpacity }} className="container-custom relative z-10 pt-24 pb-20 md:py-40">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center space-y-10">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-7 py-2.5 rounded-full"
                            >
                                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                                <span className="text-white font-black text-[10px] uppercase tracking-[0.4em]">Bilgi Merkezi</span>
                            </motion.span>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="text-4xl md:text-7xl lg:text-[6.5rem] font-heading font-black leading-[0.95] md:leading-[0.9] tracking-tighter"
                            >
                                Sıkça Sorulan{" "}
                                <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-400 to-primary-600 animate-gradient-x italic">
                                    Sorular
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-base md:text-xl text-white/40 max-w-2xl font-medium leading-relaxed px-4 md:px-0"
                            >
                                Ankara Özdemir Nakliyat olarak şeffaflık ilkemiz gereği taşınma süreciyle ilgili{" "}
                                <span className="text-white">tüm sorularınızı açıkça yanıtlıyoruz.</span>
                            </motion.p>

                            {/* Hero Stats */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.45 }}
                                className="flex flex-wrap justify-center gap-4 pt-6"
                            >
                                <StatPill value="15+" label="Yıl Deneyim" icon={<IconStar className="w-5 h-5" />} />
                                <StatPill value="10K+" label="Mutlu Müşteri" icon={<IconUsers className="w-5 h-5" />} />
                                <StatPill value="%100" label="Sigortalı" icon={<IconShield className="w-5 h-5" />} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-20" />
            </section>

            {/* ═══════════════ FAQ ACCORDION ═══════════════ */}
            <section className="relative z-20 -mt-16 pb-32">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">

                        {/* Category Filters */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10 md:mb-12 px-4"
                        >
                            {faqCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                                    className={`flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${activeCategory === cat
                                            ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-105"
                                            : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-200 hover:border-primary-200 hover:text-primary-600"
                                        }`}
                                >
                                    {getCategoryIcon(cat)}
                                    {cat}
                                </button>
                            ))}
                        </motion.div>

                        {/* Accordion Cards */}
                        <div className="space-y-4">
                            <AnimatePresence initial={false}>
                                {displayFaqs.map((faq, index) => {
                                    const isOpen = openIndex === index;
                                    return (
                                        <motion.div
                                            key={faq.id}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.04, duration: 0.3 }}
                                            className={`rounded-2xl md:rounded-3xl border transition-all duration-500 overflow-hidden group ${isOpen
                                                    ? "bg-white border-primary-200 shadow-xl shadow-primary-500/5"
                                                    : "bg-white/70 border-slate-100 hover:border-slate-200 hover:shadow-lg hover:bg-white"
                                                }`}
                                        >
                                            <button
                                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                                className="w-full flex items-center justify-between p-6 md:p-8 text-left gap-6"
                                            >
                                                <div className="flex items-center gap-5 flex-1 min-w-0">
                                                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen
                                                            ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30 scale-110"
                                                            : "bg-slate-100 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500"
                                                        }`}>
                                                        <span className="text-sm font-black">{String(index + 1).padStart(2, "0")}</span>
                                                    </div>
                                                    <h3 className={`text-sm md:text-lg font-bold tracking-tight transition-colors ${isOpen ? "text-primary-700" : "text-slate-800 group-hover:text-primary-600"
                                                        }`}>
                                                        {faq.question}
                                                    </h3>
                                                </div>
                                                <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-500 ${isOpen
                                                        ? "bg-primary-500 text-white rotate-90 shadow-lg shadow-primary-500/30"
                                                        : "bg-slate-100 text-slate-400 group-hover:bg-primary-50 group-hover:text-primary-500"
                                                    }`}>
                                                    <IconChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                                                </div>
                                            </button>

                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                    >
                                                        <div className="px-6 md:px-8 pb-8">
                                                            <div className="pl-0 md:pl-[4.25rem] pt-4 border-t border-primary-100/50">
                                                                <p className="text-sm md:text-slate-600 font-medium leading-relaxed pt-4">
                                                                    {faq.answer}
                                                                </p>
                                                                {/* Quick Action */}
                                                                <div className="mt-6 flex flex-wrap gap-3">
                                                                    <Link
                                                                        href="/iletisim"
                                                                        className="inline-flex items-center gap-2 text-xs font-bold text-primary-600 bg-primary-50 hover:bg-primary-100 px-4 py-2 rounded-full transition-colors"
                                                                    >
                                                                        <IconPhone className="w-3 h-3" /> Daha fazla bilgi al
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>

                            {displayFaqs.length === 0 && (
                                <div className="text-center py-16 text-slate-400 font-medium">
                                    Bu kategoride henüz soru bulunmamaktadır.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════ TRUST BADGES ═══════════════ */}
            <section className="py-20 md:py-32 bg-white relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-16 md:mb-24"
                    >
                        <span className="text-primary-500 font-black text-[10px] uppercase tracking-[0.5em] bg-primary-50 px-6 py-2.5 rounded-full border border-primary-100">
                            Güvence & Kalite
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-[6.5rem] font-heading font-black text-slate-950 tracking-tighter mt-6 md:mt-8 leading-[1.1] md:leading-none">
                            Neden Bize <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500 italic">Güvenmelisiniz?</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trustItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-slate-50 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary-200 transition-all duration-500 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1"
                            >
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:bg-primary-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-primary-500/30 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ TESTIMONIAL STRIP ═══════════════ */}
            <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-950 tracking-tighter leading-tight">
                            Müşterilerimiz <span className="text-primary-500 italic">Ne Diyor?</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {musterıYorumlari.slice(0, 3).map((yorum, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-3xl p-8 border border-slate-100 hover:shadow-xl hover:border-primary-100 transition-all duration-500 group"
                            >
                                <div className="flex gap-1 mb-4">
                                    {[...Array(yorum.rating)].map((_, j) => (
                                        <IconStar key={j} className="w-4 h-4 text-primary-500" />
                                    ))}
                                </div>
                                <p className="text-slate-600 text-sm font-medium leading-relaxed mb-6">&ldquo;{yorum.comment}&rdquo;</p>
                                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                                    <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-600 font-black text-sm">
                                        {yorum.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-900">{yorum.name}</div>
                                        <div className="text-xs text-slate-400">{yorum.location}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════ FINAL CTA ═══════════════ */}
            <section className="py-20 md:py-32 bg-slate-950 relative overflow-hidden text-white">
                <AuroraBlob className="w-[600px] h-[600px] bg-primary-500/20 top-0 right-0 opacity-30" />
                <AuroraBlob className="w-[400px] h-[400px] bg-orange-500/15 bottom-0 left-0 opacity-20" />
                <GridOverlay />

                <div className="container-custom relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-[1] md:leading-none">
                                Cevabınızı <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-orange-400 italic">
                                    Bulamadınız Mı?
                                </span>
                            </h2>
                            <p className="text-white/40 text-base md:text-xl max-w-xl mx-auto font-medium leading-relaxed px-4 md:px-0">
                                Hemen bizi arayın veya iletişim formunu doldurun.{" "}
                                <span className="text-white">Nakliyat uzmanlarımız anında yanıt versin.</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 pt-6 px-4 md:px-0"
                        >
                            <a
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="w-full sm:w-auto px-10 py-5 bg-white text-slate-950 rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-primary-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 shadow-xl hover:shadow-primary-500/30"
                            >
                                <IconPhone className="w-5 h-5" /> {firmaBilgileri.phone}
                            </a>
                            <Link
                                href="/iletisim"
                                className="w-full sm:w-auto px-10 py-5 bg-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs md:text-sm hover:bg-white/20 transition-all duration-500 border border-white/20 flex items-center justify-center gap-3"
                            >
                                <IconMail className="w-5 h-5" /> İletişim Formu
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

        </div>
    );
}
