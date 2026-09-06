"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import makalelerData from "@/data/makalelerData.json";
import { 
    IconArrow, 
    IconStar
} from "@/components/Icons";

export default function MakalelerClient() {
    // Pagination state
    const itemsPerPage = 30;
    const [visibleCount, setVisibleCount] = useState(itemsPerPage);
    const [searchQuery, setSearchQuery] = useState("");

    // Reset pagination when search query changes
    useEffect(() => {
        setVisibleCount(itemsPerPage);
    }, [searchQuery]);

    // State to track which post is currently being hovered
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Mouse tracking values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring physics for the floating image
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 225); 
            mouseY.set(e.clientY - 140); 
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const normalizeText = (text: string) => {
        if (!text) return "";
        return text.toLocaleLowerCase('tr-TR')
            .replace(/ğ/g, 'g')
            .replace(/ü/g, 'u')
            .replace(/ş/g, 's')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ç/g, 'c')
            .replace(/â/g, 'a')
            .replace(/î/g, 'i')
            .replace(/û/g, 'u');
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "";
        const parts = dateStr.slice(0, 10).split("-");
        return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateStr;
    };

    const searchTerms = normalizeText(searchQuery).split(' ').filter(term => term.trim() !== '');

    const filteredMakaleler = makalelerData.filter(post => {
        if (searchTerms.length === 0) return true;
        const searchTarget = normalizeText(`${post.title} ${post.location || ''} ${post.category || ''}`);
        return searchTerms.every(term => searchTarget.includes(term));
    });

    const visibleMakaleler = filteredMakaleler.slice(0, visibleCount);
    const hasMore = visibleCount < filteredMakaleler.length;

    const loadMore = () => {
        setVisibleCount(prev => prev + itemsPerPage);
    };

    return (
        <div className="bg-[#010204] min-h-screen font-sans selection:bg-[#F5B913] selection:text-black pt-32 pb-32 overflow-hidden relative">
            
            {/* Ambient Background Glow */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[150px] opacity-10 bg-gradient-to-tr from-white to-transparent" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[180px] opacity-10 bg-gradient-to-bl from-[#F5B913] to-transparent" />
            </div>

            {/* Framer Style Floating Image Container */}
            <motion.div
                className="fixed top-0 left-0 w-[450px] h-[280px] rounded-[2rem] overflow-hidden pointer-events-none z-[100] shadow-[0_30px_100px_rgba(0,0,0,0.9)] border border-white/10 bg-[#050813]"
                style={{
                    x: springX,
                    y: springY,
                    opacity: hoveredIndex !== null ? 1 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.8,
                    rotate: hoveredIndex !== null ? (springX.getVelocity() * 0.005) : 0,
                }}
                transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
            >
                {hoveredIndex !== null && visibleMakaleler[hoveredIndex] && (
                    <motion.div
                        className="w-full h-full relative"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <div className="absolute inset-0 flex items-center justify-center bg-[#02040A]">
                            <span className="text-[#F5B913]/30 font-black uppercase tracking-[0.3em] text-sm text-center px-4">
                                {visibleMakaleler[hoveredIndex].location} <br/> {visibleMakaleler[hoveredIndex].category}
                            </span>
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Ultra Minimal Editorial Hero Section */}
            <section className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-5xl"
                >
                    <p className="text-[#F5B913] font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 flex items-center gap-4">
                        <span className="w-12 h-[2px] bg-[#F5B913]" />
                        Bölgesel Nakliyat Çözümleri
                    </p>
                    <h1 className="text-6xl sm:text-8xl md:text-[8rem] lg:text-[10rem] font-black text-white leading-[0.9] tracking-tighter mb-8">
                        Nakliyat <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-transparent">Makaleleri.</span>
                    </h1>
                    <p className="text-[#8892B0] text-lg sm:text-xl font-light leading-relaxed max-w-3xl mb-12">
                        Türkiye&apos;nin dört bir yanındaki ilçelerde sunduğumuz evden eve nakliyat, asansörlü taşıma ve depolama hizmetleri hakkında detaylı SEO analizleri ve rehberler. Toplam {makalelerData.length} lokasyon kaydı.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                            <svg className="w-5 h-5 text-white/40 group-focus-within:text-[#F5B913] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Şehir, ilçe veya hizmet türü ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-full py-5 pl-14 pr-6 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 focus:border-[#F5B913]/50 transition-all shadow-[inset_0_2px_20px_rgba(0,0,0,0.5)] backdrop-blur-md"
                        />
                    </div>
                </motion.div>
            </section>

            {/* Magnetic Editorial List (Rows) */}
            <section className="relative z-10 w-full border-t border-white/10">
                {visibleMakaleler.map((post, index) => (
                    <Link href={`/makaleler/${post.slug}`} key={post.id} className="block group">
                        <div 
                            className="w-full border-b border-white/5 transition-colors duration-500 group-hover:bg-white/[0.02]"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 py-10 md:py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
                                
                                {/* Background Highlight on Hover */}
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5B913] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />

                                {/* Meta Information */}
                                <div className="flex flex-row md:flex-col gap-4 md:gap-2 w-full md:w-56 shrink-0 md:opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                    <span className="text-[#8892B0] group-hover:text-white font-mono text-[10px] uppercase tracking-widest transition-colors duration-500">
                                        {formatDate(post.date)}
                                    </span>
                                    <span className="text-[#F5B913] font-black text-[11px] uppercase tracking-[0.2em]">
                                        {post.location}
                                    </span>
                                </div>

                                {/* Title */}
                                <div className="flex-1 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-4 md:group-hover:translate-x-10">
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/80 group-hover:text-white tracking-tight leading-tight transition-colors duration-500">
                                        {post.title}
                                    </h2>
                                </div>

                                {/* Arrow & Interaction Hint */}
                                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-white/5">
                                    <IconArrow className="w-5 h-5 text-[#F5B913] -rotate-45" />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>

            {/* Pagination / Load More */}
            {hasMore && (
                <div className="max-w-[100rem] mx-auto px-6 mt-16 flex justify-center relative z-10">
                    <button 
                        onClick={loadMore}
                        className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 hover:border-white/40 transition-all font-mono tracking-widest text-xs uppercase"
                    >
                        Daha Fazla Yükle ({makalelerData.length - visibleCount} makale kaldı)
                    </button>
                </div>
            )}

            {/* Tüm Makaleler - SEO */}
            <section className="mt-16 border-t border-slate-200 pt-8 max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 pb-16 relative z-10">
                <h2 className="text-xl font-semibold text-slate-400 mb-4">Tüm Makaleler</h2>
                <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
                    {makalelerData.map((post) => (
                        <Link key={`all-${post.slug}`} href={`/makaleler/${post.slug}`} className="block text-sm text-slate-500 hover:text-white py-1 break-inside-avoid transition-colors">
                            {post.title}
                        </Link>
                    ))}
                </div>
            </section>

        </div>
    );
}
