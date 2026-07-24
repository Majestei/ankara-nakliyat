"use client";

import { motion, useAnimationControls, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IconStar, IconArrow } from "@/components/Icons";

const allReviews = [
// ... (rest of the file remains same, I'll use multi_replace if needed but for now just showing intent)
    { name: "Selin Demir", location: "Çankaya, Ankara", rating: 5, comment: "Eşyalarım çok özenli paketlendi. Asansörlü sistem gerçekten çok hızlı. Teşekkürler!", role: "Asansörlü Taşıma", img: "/images/testimonials/selin_demir.webp" },
    { name: "Ahmet Yılmaz", location: "Etimesgut, Ankara", rating: 5, comment: "İstanbul Beşiktaş'tan taşınırken Ankara Özdemir ile çalıştım. Profesyonel ekip ve harika hizmet.", role: "Ev Taşıma Müşterisi", img: "/images/testimonials/ahmet_yilmaz.webp" },
    { name: "Mehmet Kaya", location: "Yenimahalle, Ankara", rating: 5, comment: "Ankara içi ofis taşımamızda çok yardımcı oldular. Zamanında ve sorunsuz teslimat.", role: "Ofis Taşıma Müşterisi", img: "/images/testimonials/mehmet_kaya.webp" },
    { name: "Hüseyin Demir", location: "Mamak, Ankara", rating: 5, comment: "Mamak'ın dik yokuşlarında bile araçları çok stabildi. Paketleme hizmeti gerçekten harika.", role: "Ev Taşıma Müşterisi" },
    { name: "Elif Arslan", location: "Sincan, Ankara", rating: 5, comment: "Eşyalarımızı depolama hizmeti için verdik. 6 ay sonra aldığımızda her şey bıraktığımız gibi tertemizdi.", role: "Depolama Hizmeti" },
    { name: "Osman Yıldız", location: "Pursaklar, Ankara", rating: 5, comment: "Ankara içi nakliyat fiyatları konusunda en uygun ve en kaliteli hizmeti veren firma diyebilirim.", role: "Şehir İçi Taşıma" },
    { name: "Zeynep Çelik", location: "Keçiören, Ankara", rating: 5, comment: "Etlik bölgesindeki evimize asansörlü taşıma ile 2 saatte yerleştik. Ekip çok saygılı ve dikkatli çalıştı.", role: "Asansörlü Taşıma" },
    { name: "Bünyamin Öztürk", location: "Gölbaşı, Ankara", rating: 5, comment: "Villa taşıma konusunda gerçekten uzmanlar. İncek'teki yeni evimize eşyaları büyük bir titizlikle taşıdılar.", role: "Villa Taşıma" },
    { name: "Derya Korkmaz", location: "Altındağ, Ankara", rating: 5, comment: "Eski evimiz çok dardı ama ekip dar merdivenlerden bile eşyaları ustalıkla indirdi. Çok memnun kaldık.", role: "Ev Taşıma Müşterisi" },
    { name: "Mehmet Aksoy", location: "Kızılay, Ankara", rating: 5, comment: "Şehir merkezindeki ofis taşıma işimizi pazar günü sessizce hallettiler. Gerçekten kurumsal bir firma.", role: "Ofis Taşıma Müşterisi" },
    { name: "Ayşe Kara", location: "Çankaya, Ankara", rating: 5, comment: "Kırılacak eşyalarım için özel paketleme yaptılar. Anneannemden kalma kristal takım eksiksiz ulaştı!", role: "Paketleme Hizmeti" },
    { name: "Tarık Şahin", location: "Etimesgut, Ankara", rating: 5, comment: "İzmir'e şehirlerarası taşıma yaptırdım. GPS ile takip ettim, zamanında kapıya geldi. Mükemmel hizmet.", role: "Şehirlerarası Taşıma" },
    { name: "Gül Öztürk", location: "Keçiören, Ankara", rating: 5, comment: "3+1 dairemi 5 saatte taşıdılar. Mobilyaların söküm montajı dahil. Fiyat performans mükemmel.", role: "Ev Taşıma Müşterisi" },
    { name: "İbrahim Yurt", location: "Sincan, Ankara", rating: 5, comment: "Piyanomu taşımalarını hiç beklemiyordum ama özel ekipmanla harika taşıdılar. Çok teşekkürler!", role: "Özel Eşya Taşıma" },
    { name: "Süleyman Özdemir", location: "Çankaya, Ankara", rating: 5, comment: "Çankaya'nın dar sokaklarına rağmen ekibiniz çok hızlıydı. Eşyalarımızda tek bir çizik bile yok. Teşekkürler!", role: "Ev Taşıma Müşterisi" },
];

function ReviewCard({ review, index }: { review: typeof allReviews[0]; index: number }) {
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
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / rect.width - 0.5;
        const yPct = mouseY / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="relative flex-shrink-0 w-[350px] md:w-[420px] bg-white rounded-[2.5rem] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_rgba(249,115,22,0.1)] transition-all duration-500 p-10 mx-5 group overflow-hidden"
        >
            {/* Holographic Quote Mark */}
            <motion.div 
                style={{ transform: "translateZ(-40px)" }}
                className="absolute top-8 right-10 text-[10rem] font-black text-primary-500/5 leading-none select-none pointer-events-none"
            >
                &ldquo;
            </motion.div>

            <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
                {/* Rating Stars */}
                <div className="flex gap-1.5 mb-6">
                    {Array.from({ length: 5 }).map((_, s) => (
                        <IconStar key={s} className="w-4 h-4 text-primary-500 fill-current" />
                    ))}
                </div>

                {/* Comment */}
                <p className="text-slate-900 font-medium leading-relaxed text-base mb-8 italic">
                    &ldquo;{review.comment}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    {review.img ? (
                        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg shadow-primary-500/10 border-2 border-white">
                            <Image src={review.img} alt={review.name} width={48} height={48} className="object-cover w-full h-full" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-orange-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary-500/20">
                            {review.name[0]}
                        </div>
                    )}
                    <div>
                        <div className="font-black text-slate-950 text-base">{review.name}</div>
                        <div className="text-xs font-bold text-primary-500/70 uppercase tracking-widest">{review.role}</div>
                    </div>
                </div>
            </div>

            {/* Premium Glow Decor */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors duration-700" />
        </motion.div>
    );
}

export default function TestimonialsCarousel() {
    const [isPaused, setIsPaused] = useState(false);
    const row1Ref = useRef<HTMLDivElement>(null);
    const row2Ref = useRef<HTMLDivElement>(null);
    const pos1 = useRef(0);
    const pos2 = useRef(0);
    const SPEED = 0.6; 

    useEffect(() => {
        const el1 = row1Ref.current;
        const el2 = row2Ref.current;
        if (!el1 || !el2) return;

        const halfWidth1 = el1.scrollWidth / 2;
        const halfWidth2 = el2.scrollWidth / 2;

        let rafId: number;
        const animate = () => {
            if (!isPaused) {
                pos1.current -= SPEED;
                pos2.current += SPEED;

                if (Math.abs(pos1.current) >= halfWidth1) pos1.current = 0;
                if (pos2.current >= 0) pos2.current = -halfWidth2;

                if (el1) el1.style.transform = `translateX(${pos1.current}px)`;
                if (el2) el2.style.transform = `translateX(${pos2.current}px)`;
            }
            rafId = requestAnimationFrame(animate);
        };

        pos2.current = -halfWidth2 / 2;
        rafId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(rafId);
    }, [isPaused]);

    const row1 = [...allReviews.slice(0, 7), ...allReviews.slice(0, 7)];
    const row2 = [...allReviews.slice(7), ...allReviews.slice(7)];

    return (
        <section className="py-40 bg-white relative overflow-hidden">
            {/* Background Perspective Grid */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
                 style={{ 
                    backgroundImage: "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)", 
                    backgroundSize: "80px 80px",
                    transform: "perspective(1000px) rotateX(60deg) translateY(-200px) scale(2.5)" 
                 }} 
            />

            <div className="container-custom relative z-10 mb-24">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl text-left"
                    >
                        <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em] mb-4 bg-primary-500/10 px-6 py-2 rounded-full inline-block">Müşteri Yorumları</span>
                        <h2 className="text-6xl md:text-8xl font-heading font-black text-slate-950 tracking-tighter leading-[0.9]">
                            Onlar <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-600">Anlattı</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-slate-950 p-8 rounded-[3rem] border border-white/10 shadow-2xl flex items-center gap-8"
                    >
                        <div className="flex flex-col">
                            <div className="flex gap-1.5 text-amber-400 mb-2">
                                {[1,2,3,4,5].map(s => <IconStar key={s} className="w-5 h-5 fill-current" />)}
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-white font-black text-4xl tracking-tighter">4.9</span>
                                <div className="h-8 w-px bg-white/20" />
                                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Google Puanı</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div
                className="relative z-10 perspective-1000"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

                <div className="overflow-hidden mb-10">
                    <div ref={row1Ref} className="flex will-change-transform py-10">
                        {row1.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
                    </div>
                </div>

                <div className="overflow-hidden">
                    <div ref={row2Ref} className="flex will-change-transform py-10">
                        {row2.map((r, i) => <ReviewCard key={i} review={r} index={i} />)}
                    </div>
                </div>
            </div>

            {/* Floating Stats Cluster */}
            <div className="container-custom mt-32 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { val: "%100", label: "Müşteri Memnuniyeti", desc: "Sıfır Hata Politikası" },
                        { val: "10K+", label: "Tamamlanan İş", desc: "Mutlu Yuvalar" },
                        { val: "4.9/5", label: "Ortalama Puan", desc: "Google & Sosyal Medya" },
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white/80 backdrop-blur-xl border border-slate-200/60 p-10 rounded-[3rem] text-center shadow-xl hover:shadow-primary-500/10 transition-all duration-500"
                        >
                            <div className="text-5xl font-black text-slate-950 mb-3 tracking-tighter">{item.val}</div>
                            <div className="text-xs font-black uppercase tracking-[0.2em] text-primary-500 mb-1">{item.label}</div>
                            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{item.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
