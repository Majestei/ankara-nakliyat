"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { firmaBilgileri, hizmetler, ilceIcerikleri } from "@/data/siteData";
import {
    IconPhone, IconShield, IconTruck,
    IconBox, IconCog, IconArrow, IconStar, IconCheck
} from "@/components/Icons";

// ── SPATIAL UI COMPONENTS ──

const SpatialBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-slate-950" />
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

function PodCard({ item, name, index }: { item: any, name: string, index: number }) {
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
            <div style={{ transform: "translateZ(60px)" }}>
                <div className="w-16 h-16 md:w-20 md:h-20 bg-primary-500 rounded-2xl md:rounded-3xl flex items-center justify-center text-white mb-6 md:mb-10 shadow-[0_0_40px_rgba(249,115,22,0.4)]">
                    <IconBox className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tighter mb-3 md:mb-6">
                    {name} <br />
                    <span className="text-primary-500">{item.title}</span>
                </h3>
            </div>

            <div style={{ transform: "translateZ(40px)" }}>
                <p className="text-white/40 text-lg font-medium leading-relaxed italic mb-8">
                    {item.shortDesc}
                </p>
                <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/10" />
                    <Link href={item.id === 'evden-eve-nakliyat' ? '/evden-eve-nakliyat' : `/hizmetler/${item.id}`} className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400 shrink-0">Kapsamı incele</Link>
                </div>
            </div>

            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-1/2 -right-1/2 w-full h-full border border-primary-500/10 rounded-full"
            />
        </motion.div>
    );
}

// ── MAIN CLIENT COMPONENT ──

interface MahalleClientProps {
    ilce: any;
    mahalle: any;
    digerMahalleler: any[];
    isIstanbul: boolean;
}

export default function MahalleClient({ ilce, mahalle, digerMahalleler, isIstanbul }: MahalleClientProps) {
    const { scrollYProgress } = useScroll();
    const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const titleScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

    const cityName = isIstanbul ? "İstanbul" : "Ankara";
    const displayName = `${mahalle.name}`;

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
                                <span>Mahalle Operasyonları:</span>
                                <span className="text-primary-500">{ilce.name}, {mahalle.name}</span>
                            </div>
                        </MagneticElement>

                        <h1 className="text-5xl md:text-8xl lg:text-[10rem] font-heading font-black text-white leading-[0.9] md:leading-[0.85] tracking-tighter mb-10 md:mb-16">
                            <span className="text-white/10">{ilce.name} {mahalle.name}</span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-orange-500 to-primary-600 animate-gradient-x italic">
                                {(() => {
                                    const options = ["NAKLİYAT", "TAŞIMACILIK", "LOJİSTİK", "EVDEN EVE"];
                                    const hash = mahalle.name.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
                                    return options[hash % options.length];
                                })()}
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

                <div className="absolute bottom-20 left-10 hidden lg:block">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Adres ve Eşya Planı</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                            <span className="text-white/20 font-black text-[8px] uppercase tracking-widest">Region: {mahalle.name}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── SPATIAL PODS GRID ── */}
            <section className="py-24 md:py-40 lg:py-60 relative">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 md:mb-40 gap-8 md:gap-20">
                        <div className="max-w-4xl">
                            <span className="text-primary-500 font-black text-[10px] md:text-xs uppercase tracking-[0.5em] lg:tracking-[1em] mb-4 md:mb-10 block">{mahalle.name} Hizmetleri</span>
                            <h2 className="text-5xl md:text-7xl lg:text-9xl font-heading font-black text-white leading-none tracking-tighter">
                                Taşınma <br /> <span className="text-white/10">Hazırlığı.</span>
                            </h2>
                        </div>
                        <div className="w-full lg:w-1/2 p-6 md:p-10 bg-white/5 border border-white/10 rounded-2xl md:rounded-[3rem] backdrop-blur-3xl space-y-4 text-white/70 text-sm md:text-base leading-relaxed">
                            <p>
                                <strong className="text-white font-bold">{ilce.name} {mahalle.name}</strong> için taşınma planı hazırlarken açık adresi, eşya listesini ve tarihi paylaşın. Mahalle adı tek başına araç erişimini, kat koşullarını veya taşıma süresini belirlemez.
                            </p>
                            <p>
                                Çıkış ve varış için bina girişi, yükleme alanı ve kullanılabilir asansör bilgilerini ayrı hazırlayın. Paketleme, mobilya sökümü ve yeniden kurulum beklentinizi yazın; hizmet uygunluğunu ve dahil işleri teklif görüşmesinde teyit edin.
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-12 mb-24">
                        {hizmetler.slice(0, 6).map((hizmet, i) => (
                            <PodCard key={hizmet.id} item={hizmet} name={displayName} index={i} />
                        ))}
                    </div>

                    {/* ── BÖLGESEL LOJİSTİK VE SAHA ANALİZİ ── */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl md:rounded-[3rem] p-8 md:p-16 mb-24 backdrop-blur-2xl">
                        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                            <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em]">Saha &amp; Operasyon Rehberi</span>
                            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                {mahalle.name} Bölgesinde Taşınma Dinamikleri
                            </h3>
                            <p className="text-slate-400 text-sm md:text-base">
                                Aşağıdaki kontrol, mahallenizdeki her bina için aynı koşulların bulunduğunu varsaymaz. Kendi adresinizin fotoğraf ve ölçülerini kullanarak ihtiyaçları belirleyin.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300 text-sm">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="text-primary-400 font-bold text-base mb-2">1. Sokak &amp; Araç Yanaşması</h4>
                                <p className="text-xs leading-relaxed text-slate-400">
                                    {mahalle.name} adresinizde aracın durabileceği noktayı, kapıya mesafesini ve bina yönetiminin taşıma saatlerini öğrenin. Gerekli izinleri önceden görüşün.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="text-primary-400 font-bold text-base mb-2">2. Dış Cephe Modüler Asansör</h4>
                                <p className="text-xs leading-relaxed text-slate-400">
                                    Asansör kurulumu için kat yüksekliği, zemin, cephe ve yükleme alanının uygunluğu değerlendirilmelidir.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="text-primary-400 font-bold text-base mb-2">3. Site Yönetim Uyumu</h4>
                                <p className="text-xs leading-relaxed text-slate-400">
                                    Site yönetiminden araç giriş saatleri, ortak alan kullanımı ve yükleme kuralları hakkında önceden bilgi alın.
                                </p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <h4 className="text-primary-400 font-bold text-base mb-2">4. Söküm ve Kurulum Kapsamı</h4>
                                <p className="text-xs leading-relaxed text-slate-400">
                                    Mobilya kurulumu ve cihaz bağlantılarının teklif kapsamını görüşün. Gereken işlemler için yetkili servis planlayın.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── 3 ADIMDA MAHALLE TAŞINMA PLANI ── */}
                    <div className="mb-24">
                        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                            <span className="text-primary-500 font-black text-xs uppercase tracking-[0.4em]">Stressiz Transfer</span>
                            <h3 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                3 Adımda {mahalle.name} Taşınması
                            </h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white relative">
                                <span className="text-5xl font-black text-primary-500/30 block mb-4">01</span>
                                <h4 className="text-xl font-bold mb-2">Eşya Listesi ve Teklif</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Eşya ve adres bilgilerini paylaşın. Dahil hizmetleri ve değişiklik koşullarını yazılı olarak görüşün.
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white relative">
                                <span className="text-5xl font-black text-primary-500/30 block mb-4">02</span>
                                <h4 className="text-xl font-bold mb-2">Paketleme ve Söküm Listesi</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Kırılacak parçaları ve sökülecek mobilyaları listeleyin. Malzeme, hazırlık işini yapacak kişi ve kurulum kapsamını ayrı teyit edin.
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-white relative">
                                <span className="text-5xl font-black text-primary-500/30 block mb-4">03</span>
                                <h4 className="text-xl font-bold mb-2">Yükleme ve Teslim Kontrolü</h4>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    Taşıma yöntemi adres uygunluğuna göre belirlenir. Teslimde eşya listesini kontrol edin; varsa eksikleri ve kurulum işlerini kayıt altına alın.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* ── MAHALLEYE ÖZEL SIKÇA SORULAN SORULAR ── */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-24 max-w-4xl mx-auto">
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-8 text-center">
                            {mahalle.name} Sakinlerinin Sıkça Sorduğu Sorular
                        </h3>
                        <div className="space-y-4">
                            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-all text-white">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between text-sm md:text-base">
                                    <span>{mahalle.name}&apos;da taşınma günü ek masraf çıkar mı?</span>
                                    <span className="text-primary-500 group-open:rotate-180 transition-transform text-xl">▾</span>
                                </summary>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                                    Eşya ve adres bilgileriyle teklifi karşılaştırın. Ek işlerin, kapsam değişikliklerinin ve verginin nasıl ücretlendirileceğini önceden görüşün.
                                </p>
                            </details>
                            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-all text-white">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between text-sm md:text-base">
                                    <span>Dar sokaklarda veya yüksek binalarda asansör kurulabilir mi?</span>
                                    <span className="text-primary-500 group-open:rotate-180 transition-transform text-xl">▾</span>
                                </summary>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                                    Uygunluk adrese göre değişir. Kat yüksekliği, yol genişliği, cephe ve zemin bilgilerini paylaşarak kurulum değerlendirmesi isteyin.
                                </p>
                            </details>
                            <details className="group bg-white/5 border border-white/10 rounded-2xl p-6 open:bg-white/10 transition-all text-white">
                                <summary className="font-bold cursor-pointer list-none flex items-center justify-between text-sm md:text-base">
                                    <span>Taşınma ortalama kaç saat sürer?</span>
                                    <span className="text-primary-500 group-open:rotate-180 transition-transform text-xl">▾</span>
                                </summary>
                                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                                    Süre; eşya miktarı, erişim, paketleme ve kurulum ihtiyacına göre değişir. Her iki adresin ayrıntılarıyla bir zaman planı isteyin.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-slate-900 border-t border-white/10">
                <div className="container-custom max-w-4xl text-white space-y-6">
                    <h2 className="text-3xl md:text-4xl font-heading font-black">{ilce.name} {mahalle.name} için teklif hazırlığı</h2>
                    <p className="text-slate-300 leading-relaxed">Eşya listesini, yaklaşık koli sayısını ve iki adresteki katları not edin. Fotoğraflarda kapı, merdiven ve araç durma noktasını gösterin; kişisel belgeleri kadraj dışında tutun. Paketleme ve kurulumdan hangilerini talep ettiğinizi belirtin. Bu bilgiler aynı işi kapsayan teklifleri karşılaştırmanıza yardımcı olur.</p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <Link href={`/islemler/ankara/${ilce.slug}/nakliyat-fiyatlari`} className="p-6 bg-white/5 border border-white/10 rounded-2xl text-primary-300">{ilce.name} fiyat ve kapsam kontrolü</Link>
                        <Link href="/hizmetler/paketleme" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-primary-300">Eşyayı hazırlama ve ambalaj seçimi</Link>
                        <Link href="/hizmetler/nakliyat-sigortasi" className="p-6 bg-white/5 border border-white/10 rounded-2xl text-primary-300">Varsa poliçe ve teslim koşulları</Link>
                    </div>
                    <p className="text-slate-400 text-sm">Mahalle adı kesin hizmet uygunluğu, şube veya depo adresi beyanı değildir. Araç, personel, ekipman ve tarih uygunluğunu açık adresinizle görüşün.</p>
                </div>
            </section>

            {/* ── THE KINETIC HUB (Diğer Mahalleler) ── */}
            <section className="py-24 md:py-40 bg-white border-t border-slate-100">
                <div className="container-custom">
                    <div className="flex flex-col items-center text-center mb-12 md:mb-32 space-y-4 md:space-y-10 px-4">
                        <span className="px-6 py-2 bg-slate-100 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.3em] lg:tracking-[0.5em] text-slate-400">Komşu Bölgeler</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-950 tracking-tighter leading-tight">{ilce.name} <br className="sm:hidden" /> <span className="text-slate-200 italic">Diğer Mahalleleri</span></h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                        {digerMahalleler.slice(0, 18).map((m) => (
                            <Link
                                key={m.slug}
                                href={isIstanbul ? `/islemler/${ilce.slug}/${m.slug}` : `/islemler/ankara/${ilce.slug}/${m.slug}`}
                                className="group relative h-32 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-center overflow-hidden hover:bg-slate-950 transition-all duration-700 p-4 text-center"
                            >
                                <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.1em] text-slate-500 group-hover:text-white transition-colors">{m.name}</span>
                                <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out opacity-10" />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>



            {/* ── FINAL SPATIAL CTA ── */}
            <section className="py-24 md:py-40 text-center relative overflow-hidden bg-white">
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 md:space-y-20"
                    >
                        <h2 className="text-4xl xs:text-5xl md:text-7xl lg:text-[8rem] font-heading font-black text-slate-950 tracking-tighter leading-[0.85]">
                            Yeni Bir <br /> <span className="text-primary-500">Eve</span> Taşının.
                        </h2>
                        <MagneticElement strength={0.6} className="inline-block w-full sm:w-auto">
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 bg-slate-950 text-white px-8 md:px-20 py-6 md:py-10 rounded-2xl lg:rounded-[4rem] text-lg md:text-3xl font-black shadow-[0_50px_100px_rgba(0,0,0,0.3)] hover:bg-primary-500 transition-all duration-700">
                                <IconPhone className="w-8 h-8 lg:w-12 lg:h-12" /> {firmaBilgileri.phone}
                            </a>
                        </MagneticElement>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
