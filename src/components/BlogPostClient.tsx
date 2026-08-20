"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";
import { firmaBilgileri } from "@/data/siteData";
import { IconPhone, IconTruck } from "@/components/Icons";

interface Props {
    post: BlogPost;
    relatedPosts: BlogPost[];
    toc: string[];
}

export default function BlogPostClient({ post, relatedPosts, toc }: Props) {
    // Scroll progress for the reading bar and Parallax
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax transforms for Hero
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    return (
        <div className="bg-[#f8fafc] min-h-screen selection:bg-[#0055FF] selection:text-white relative overflow-hidden">
            
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0055FF] via-cyan-400 to-[#0055FF] bg-[length:200%_100%] animate-[gradient_2s_linear_infinite] transform origin-left z-50 shadow-[0_0_20px_rgba(0,85,255,0.8)]"
                style={{ scaleX }}
            />

            {/* Ultra-Premium Infinite Mesh Background */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-multiply opacity-50">
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[160px] bg-gradient-to-br from-blue-300 to-cyan-200" 
                />
                <motion.div 
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }} 
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] right-[-20%] w-[70vw] h-[70vw] rounded-full blur-[200px] bg-gradient-to-tl from-[#0055FF]/20 to-purple-300/30" 
                />
            </div>

            {/* Parallax Editorial Hero */}
            <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center px-6 md:px-12 lg:px-24 z-10 perspective-1000">
                <motion.div 
                    style={{ y: heroY, opacity: heroOpacity }}
                    className="max-w-7xl mx-auto relative text-center w-full"
                >
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center justify-center gap-4 mb-10"
                    >
                        <span className="hidden md:inline-block text-[#0055FF] font-black text-xs uppercase tracking-[0.4em] bg-white/40 px-6 py-2.5 rounded-full border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                            {post.category}
                        </span>
                        <span className="text-slate-500 font-mono text-xs tracking-widest uppercase px-5 py-2.5 border border-white/60 rounded-full backdrop-blur-xl bg-white/20">
                            {post.date}
                        </span>
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-6xl sm:text-8xl md:text-[7rem] lg:text-[8rem] font-black text-slate-900 leading-[0.95] tracking-tighter mb-10 drop-shadow-sm"
                    >
                        {post.title}
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-slate-600 text-2xl md:text-3xl lg:text-4xl leading-snug max-w-5xl mx-auto font-light tracking-tight"
                    >
                        {post.excerpt}
                    </motion.p>
                </motion.div>
            </section>

            {/* Main Content & Floating Sidebars */}
            <section className="py-20 relative z-10 -mt-20">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                        
                        {/* Left Sidebar - Author & TOC (Floating Glass) */}
                        <aside className="lg:col-span-3 hidden lg:block">
                            <motion.div 
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="sticky top-32 space-y-12"
                            >
                                {/* Author Glass Profile */}
                                <motion.div 
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="bg-white/40 backdrop-blur-3xl rounded-[2.5rem] p-8 border-2 border-white shadow-[0_8px_30px_rgb(0,0,0,0.04),inset_0_0_20px_rgb(255,255,255,0.8)]"
                                >
                                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#0055FF] to-cyan-300 flex items-center justify-center mb-6 shadow-[0_10px_30px_rgba(0,85,255,0.4)]">
                                        <span className="text-white font-black text-3xl">CG</span>
                                    </div>
                                    <h3 className="font-black text-slate-900 text-xl mb-1 tracking-tight">Ankara Özdemir Nakliyat</h3>
                                    <p className="text-sm text-slate-500 mb-8 leading-relaxed font-semibold">Uzman Lojistik Operasyon Ekibi</p>
                                    <div className="flex gap-4">
                                        {["Fb", "Tw", "In"].map((platform, i) => (
                                            <button key={i} className="flex-1 h-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center text-slate-600 hover:bg-[#0055FF] hover:text-white transition-all duration-300 text-xs font-black border border-white shadow-sm hover:shadow-[0_5px_15px_rgba(0,85,255,0.3)]">
                                                {platform}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Floating TOC */}
                                {toc.length > 0 && (
                                    <div className="pl-6 border-l-4 border-white shadow-[inset_2px_0_0_rgba(255,255,255,0.5)]">
                                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Hızlı Gezinme</h4>
                                        <ul className="space-y-6">
                                            {toc.map((heading, i) => (
                                                <li key={i} className="text-sm font-bold text-slate-500 hover:text-[#0055FF] transition-colors cursor-pointer group flex items-center gap-4">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#0055FF] opacity-0 group-hover:opacity-100 transition-all duration-300 scale-0 group-hover:scale-100 shadow-[0_0_10px_rgba(0,85,255,0.5)]"></div>
                                                    <span className="leading-snug -ml-2 group-hover:ml-0 transition-all duration-300">{heading}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        </aside>

                        {/* Center Article Body (Glassmorphism + Drop Cap) */}
                        <main className="lg:col-span-6">
                            <motion.div 
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="bg-white/40 backdrop-blur-[40px] rounded-[3.5rem] p-8 md:p-16 lg:p-20 shadow-[0_30px_60px_rgba(0,0,0,0.05),inset_0_0_40px_rgba(255,255,255,0.8)] border-2 border-white relative"
                            >
                                <article className="prose prose-slate prose-xl md:prose-2xl max-w-none 
                                    prose-headings:font-black prose-headings:text-slate-900 prose-headings:tracking-tighter 
                                    prose-p:text-slate-800 prose-p:leading-[2.1] prose-p:font-medium md:prose-p:text-xl
                                    prose-strong:text-slate-900 prose-strong:font-black
                                    prose-a:text-[#0055FF] prose-a:font-black prose-a:no-underline hover:prose-a:underline
                                    prose-li:text-slate-800 prose-li:text-lg md:prose-li:text-xl prose-ul:list-none prose-ul:pl-0">
                                    
                                    {post.content.split("\n\n").map((paragraph, i) => {
                                        // H2 Headings
                                        if (paragraph.startsWith("## ")) {
                                            return (
                                                <motion.h2 
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true, margin: "-100px" }}
                                                    transition={{ duration: 0.8 }}
                                                    key={i} 
                                                    className="text-4xl md:text-5xl mt-28 mb-10 text-slate-900 tracking-tighter"
                                                >
                                                    {paragraph.replace("## ", "")}
                                                </motion.h2>
                                            );
                                        }
                                        
                                        // Bullet Lists
                                        if (paragraph.startsWith("- ")) {
                                            const items = paragraph.split("\n").filter((l) => l.startsWith("- "));
                                            return (
                                                <motion.div 
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8 }}
                                                    key={i} 
                                                    className="my-16 p-10 md:p-14 bg-white/60 backdrop-blur-xl border-2 border-white rounded-[3rem] shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
                                                >
                                                    <ul className="space-y-8">
                                                        {items.map((item, j) => (
                                                            <li key={j} className="flex gap-6 items-start text-slate-700">
                                                                <span className="w-3 h-3 mt-3 rounded-full bg-gradient-to-tr from-[#0055FF] to-cyan-300 shrink-0 shadow-[0_0_15px_rgba(0,85,255,0.5)]"></span>
                                                                <span className="leading-relaxed font-bold text-xl">{item.replace("- ", "")}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            );
                                        }

                                        // Numbered Lists
                                        if (paragraph.match(/^\d+\./)) {
                                            const items = paragraph.split("\n").filter((l) => l.match(/^\d+\./));
                                            return (
                                                <div key={i} className="my-24 space-y-16">
                                                    {items.map((item, j) => (
                                                        <motion.div 
                                                            initial={{ opacity: 0, y: 20 }}
                                                            whileInView={{ opacity: 1, y: 0 }}
                                                            viewport={{ once: true }}
                                                            transition={{ duration: 0.8, delay: j * 0.1 }}
                                                            key={j} 
                                                            className="flex gap-8 group items-start"
                                                        >
                                                            <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-300 to-slate-100 group-hover:from-[#0055FF] group-hover:to-cyan-400 transition-all duration-700 leading-[0.8] shrink-0 tracking-tighter">
                                                                0{j + 1}
                                                            </span>
                                                            <div className="pt-2">
                                                                <p className="m-0 leading-[1.8] text-slate-700 font-medium" dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            );
                                        }

                                        // Standard Paragraphs (Apply Drop Cap)
                                        const isFirstParagraph = i === 0 || (i === 1 && post.content.split("\n\n")[0].startsWith("##"));
                                        
                                        return (
                                            <motion.p 
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1 }}
                                                key={i} 
                                                className={`text-slate-700 ${isFirstParagraph ? "first-letter:text-[120px] md:first-letter:text-[140px] first-letter:font-black first-letter:text-transparent first-letter:bg-clip-text first-letter:bg-gradient-to-br first-letter:from-[#0055FF] first-letter:to-cyan-400 first-letter:mr-6 first-letter:float-left first-letter:leading-[0.8]" : ""}`} 
                                                dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} 
                                            />
                                        );
                                    })}
                                </article>

                                {/* Premium Tags Area */}
                                <div className="mt-28 pt-12 border-t-2 border-white">
                                    <div className="flex flex-wrap gap-4">
                                        {post.tags.map((tag, i) => (
                                            <span key={i} className="bg-white/80 backdrop-blur-xl text-slate-700 px-8 py-4 rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#0055FF] hover:text-white transition-all duration-500 cursor-default border-2 border-white shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,85,255,0.3)] hover:-translate-y-1">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </main>

                        {/* Right Sidebar - Floating CTA */}
                        <aside className="lg:col-span-3">
                            <motion.div 
                                initial={{ opacity: 0, x: 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="sticky top-32 space-y-12 mt-16 lg:mt-0"
                            >
                                
                                {/* 3D Glass Call to Action */}
                                <motion.div 
                                    whileHover={{ scale: 1.02, rotateY: -5, rotateX: 5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="p-10 bg-gradient-to-br from-[#0055FF] to-blue-700 rounded-[3rem] text-white relative overflow-hidden group shadow-[0_30px_60px_rgba(0,85,255,0.3)] perspective-1000 transform-style-preserve-3d border border-white/20"
                                >
                                    <div className="absolute -top-20 -right-20 p-4 opacity-10 group-hover:scale-150 group-hover:-rotate-45 transition-all duration-1000 ease-out">
                                        <IconTruck className="w-64 h-64" />
                                    </div>
                                    <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20 mix-blend-overlay"></div>
                                    
                                    <div className="relative z-10 transform translate-z-10">
                                        <h3 className="text-4xl font-black mb-6 tracking-tighter leading-none">VIP<br/>Taşıma.</h3>
                                        <p className="text-blue-100 text-base mb-10 leading-relaxed font-semibold">Nakliyatta First-Class deneyim. Eşyalarınız maksimum güvenceyle taşınsın.</p>
                                        <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-3 w-full py-5 bg-white text-[#0055FF] rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-900 hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                                            <IconPhone className="w-4 h-4" /> Bize Ulaşın
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Floating Related Posts */}
                                <div className="pl-6 border-l-4 border-white shadow-[inset_2px_0_0_rgba(255,255,255,0.5)] mb-12">
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Benzer Yazılar</h3>
                                    <div className="flex flex-col gap-8">
                                        {relatedPosts.map((rp) => (
                                            <Link key={rp.id} href={`/blog/${rp.slug}`} className="group block">
                                                <span className="text-[10px] font-black text-[#0055FF] uppercase tracking-[0.2em] block mb-2">{rp.category}</span>
                                                <h4 className="text-sm font-black text-slate-800 group-hover:text-[#0055FF] transition-colors leading-tight tracking-tight">{rp.title}</h4>
                                                <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#0055FF] to-cyan-400 transition-all duration-700 mt-3 rounded-full"></div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Related Services */}
                                <div className="pl-6 border-l-4 border-white shadow-[inset_2px_0_0_rgba(255,255,255,0.5)]">
                                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Hizmetlerimiz</h3>
                                    <div className="flex flex-col gap-8">
                                        <Link href="/evden-eve-nakliyat" className="group block">
                                            <span className="text-[10px] font-black text-[#0055FF] uppercase tracking-[0.2em] block mb-2">Popüler</span>
                                            <h4 className="text-sm font-black text-slate-800 group-hover:text-[#0055FF] transition-colors leading-tight tracking-tight">Ankara Evden Eve Nakliyat</h4>
                                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#0055FF] to-cyan-400 transition-all duration-700 mt-3 rounded-full"></div>
                                        </Link>
                                        <Link href="/hizmetler/asansorlu-tasima" className="group block">
                                            <span className="text-[10px] font-black text-[#0055FF] uppercase tracking-[0.2em] block mb-2">Hızlı</span>
                                            <h4 className="text-sm font-black text-slate-800 group-hover:text-[#0055FF] transition-colors leading-tight tracking-tight">Asansörlü Nakliyat Çözümleri</h4>
                                            <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-[#0055FF] to-cyan-400 transition-all duration-700 mt-3 rounded-full"></div>
                                        </Link>
                                    </div>
                                </div>

                            </motion.div>
                        </aside>

                    </div>
                </div>
            </section>
        </div>
    );
}
