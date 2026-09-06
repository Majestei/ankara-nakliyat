import Link from "next/link";
import Image from "next/image";
import { firmaBilgileri, navLinks, ankaraIlceleri, hizmetler } from "@/data/siteData";
import { IconMapPin, IconPhone, IconMail, IconClock, IconChat, IconArrow, IconStar, IconShield, IconTruck } from "@/components/Icons";
import { FooterSeoLinks } from "@/components/InternalLinks";

export default function Footer() {
    return (
        <footer className="bg-slate-50 text-slate-600 relative overflow-hidden border-t border-slate-200">
            {/* Top CTA Band */}
            <div className="relative bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 py-12 md:py-16 overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.05&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
                <div className="container-custom relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl md:text-4xl font-heading font-black text-white mb-3 md:mb-2 leading-tight">
                                Taşınma Planınız mı Var?
                            </h3>
                            <p className="text-white/80 text-sm md:text-lg">Ücretsiz keşif ve fiyat teklifi için hemen arayın.</p>
                        </div>
                        <div className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-row gap-3 md:gap-4 w-full lg:w-auto px-4 md:px-0">
                            <a 
                                href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                                className="group flex items-center gap-3 bg-white text-primary-600 font-black py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 text-xs md:text-sm uppercase tracking-wider justify-center"
                                title="Hemen Arayın"
                            >
                                <IconPhone className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                                {firmaBilgileri.phone}
                            </a>
                            <a 
                                href={`tel:${firmaBilgileri.phoneSecondary.replace(/\s/g, "")}`}
                                className="group flex items-center gap-3 bg-white text-primary-600 font-black py-4 px-6 md:px-8 rounded-xl md:rounded-2xl hover:bg-gray-100 transition-all shadow-xl hover:-translate-y-1 text-xs md:text-sm uppercase tracking-wider justify-center"
                                title="Hemen Arayın"
                            >
                                <IconPhone className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                                {firmaBilgileri.phoneSecondary}
                            </a>
                            <Link 
                                href="/iletisim"
                                className="flex items-center gap-3 bg-white/10 backdrop-blur-xl text-white font-black py-4 px-6 md:px-8 rounded-xl md:rounded-2xl border border-white/20 hover:bg-white/20 transition-all text-xs md:text-sm uppercase tracking-wider justify-center sm:col-span-2 lg:col-auto"
                                title="Online Teklif Al"
                            >
                                Online Teklif <IconArrow className="w-3 h-3 md:w-4 md:h-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="pt-16 md:pt-20 pb-12 md:pb-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-16">
                        {/* Brand Column */}
                        <div className="lg:col-span-4 space-y-6">
                            <Link href="/" className="flex items-center gap-3 xs:gap-5 group" title="Ankara Özdemir Nakliyat Ana Sayfa">
                                <Image src="/logo.svg" alt="Ankara Özdemir Nakliyat" width={80} height={80} className="w-12 h-12 xs:w-16 xs:h-16 lg:w-20 lg:h-20 object-contain" />
                                <div>
                                    <h3 className="text-xl md:text-3xl font-heading font-black text-slate-900 leading-tight">Ankara <span className="text-primary-500">Özdemir</span></h3>
                                    <p className="text-[10px] md:text-[14px] text-slate-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Premium Lojistik</p>
                                </div>
                            </Link>
                            <p className="text-sm leading-relaxed text-slate-600 max-w-sm">
                                Ankara&apos;nın öncü lojistik markası olarak, 15 yıldır evden eve taşımacılıkta 
                                <strong className="text-slate-900"> teknoloji ve güveni</strong> harmanlıyoruz.
                            </p>
                            
                            {/* Contact Cards */}
                            <div className="space-y-3">
                                <div className="flex flex-col gap-2 p-3 bg-white rounded-xl border border-slate-200 shadow-sm group hover:border-primary-200 hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all">
                                            <IconPhone className="w-4 h-4" />
                                        </div>
                                        <div className="flex flex-col">
                                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors" title="Bizi Arayın">{firmaBilgileri.phone}</a>
                                            <a href={`tel:${firmaBilgileri.phoneSecondary.replace(/\s/g, "")}`} className="text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors" title="Bizi Arayın">{firmaBilgileri.phoneSecondary}</a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                                    <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center text-primary-500">
                                        <IconMail className="w-4 h-4" />
                                    </div>
                                    <a href={`mailto:${firmaBilgileri.email}`} className="text-sm font-bold text-slate-700 hover:text-primary-600 transition-colors">{firmaBilgileri.email}</a>
                                </div>

                            </div>

                            <div className="flex gap-2 pt-2">
                                {Object.entries(firmaBilgileri.social).map(([platform, url]) => (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer nofollow"
                                        className="w-10 h-10 bg-white hover:bg-primary-500 rounded-xl flex items-center justify-center transition-all duration-300 border border-slate-200 hover:border-primary-500 hover:scale-110 group shadow-sm"
                                        title={`Ankara Özdemir ${platform} Profilimiz`}
                                    >
                                        <span className="text-[10px] font-black uppercase text-slate-500 group-hover:text-white transition-colors">{platform[0]}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Services */}
                        <nav aria-label="Hizmetlerimiz" className="lg:col-span-3">
                            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-primary-500 rounded-full" />
                                Hizmetlerimiz
                            </h4>
                            <ul className="space-y-1">
                                {hizmetler.map((hizmet) => (
                                    <li key={hizmet.id}>
                                        <Link
                                            href={hizmet.id === "evden-eve-nakliyat" ? "/evden-eve-nakliyat" : `/hizmetler/${hizmet.id}`}
                                            className="text-sm text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group py-2"
                                            title={`Ankara ${hizmet.title} Hizmetleri`}
                                        >
                                            <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-primary-500 group-hover:w-3 transition-all duration-300" />
                                            {hizmet.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Regions */}
                        <nav aria-label="Hizmet Bölgeleri" className="lg:col-span-3">
                            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-primary-500 rounded-full" />
                                Hizmet Bölgeleri
                            </h4>
                            <ul className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2">
                                {ankaraIlceleri.map((ilce) => (
                                    <li key={ilce.slug}>
                                        <Link
                                            href={`/islemler/ankara/${ilce.slug}`}
                                            className="text-xs md:text-sm text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-1.5 group py-2"
                                            title={`${ilce.name} Nakliyat Çözümleri`}
                                        >
                                            <IconMapPin className="w-2.5 h-2.5 text-slate-400 group-hover:text-primary-500 transition-colors" />
                                            {ilce.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/islemler" className="inline-flex items-center gap-2 text-xs font-bold text-primary-500 hover:text-primary-600 mt-6 uppercase tracking-widest transition-colors" title="Tüm Bölgeleri Gör">
                                Tümünü Gör <IconArrow className="w-3 h-3" />
                            </Link>
                        </nav>

                        {/* Trust / Quick Links */}
                        <nav aria-label="Kurumsal Bağlantılar" className="lg:col-span-2">
                            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.4em] mb-8 flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-primary-500 rounded-full" />
                                Kurumsal
                            </h4>
                            <ul className="space-y-3">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <Link href={link.href} className="text-sm text-slate-600 hover:text-primary-600 transition-colors block py-2" title={link.name}>
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {/* Trust Badges */}
                            <div className="mt-8 space-y-3">
                                {[
                                    { icon: <IconShield className="w-4 h-4" />, text: "%100 Sigortalı" },
                                    { icon: <IconTruck className="w-4 h-4" />, text: "K3 Belgeli" },
                                    { icon: <IconClock className="w-4 h-4" />, text: "7/24 Destek" },
                                ].map((badge, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600">
                                        <span className="text-primary-500">{badge.icon}</span>
                                        <span className="font-bold">{badge.text}</span>
                                    </div>
                                ))}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>

            {/* SEO İç Linkleri */}
            <div className="py-8 bg-slate-100 border-t border-slate-200">
                <div className="container-custom">
                    <FooterSeoLinks />
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-200 py-6 bg-white">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-xs text-slate-600">
                                © {new Date().getFullYear()} Ankara Özdemir Nakliyat. Tüm hakları saklıdır.
                            </p>
                            <div className="hidden sm:flex items-center gap-0.5 text-secondary-500">
                                {[1,2,3,4,5].map(s => <IconStar key={s} className="w-2.5 h-2.5" />)}
                            </div>
                        </div>
                        <nav aria-label="Yasal Bağlantılar" className="flex gap-3 md:gap-6 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 flex-wrap justify-center">
                            <Link href="/gizlilik-politikasi" className="hover:text-primary-500 transition-colors py-2" title="Gizlilik Politikası">Gizlilik</Link>
                            <Link href="/kullanim-sartlari" className="hover:text-primary-500 transition-colors py-2" title="Kullanım Şartları">Şartlar</Link>
                            <Link href="/kvkk" className="hover:text-primary-500 transition-colors py-2" title="KVKK Metni">KVKK</Link>
                            <Link href="/site-haritasi" className="hover:text-primary-500 transition-colors py-2" title="Site Haritası">Site Haritası</Link>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Floating Contact Buttons - Desktop Only */}
            <div className="hidden md:flex fixed bottom-6 right-6 flex-col gap-3 z-[150]">
                <a
                    href={`https://wa.me/${firmaBilgileri.phone.replace(/\D/g, "").replace(/^0/, "90")}`}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="w-14 h-14 bg-[#25D366] text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-[#25D366]/30 hover:scale-110 hover:-translate-y-1 transition-all"
                    title="WhatsApp ile İletişime Geçin"
                    aria-label="WhatsApp ile İletişime Geçin"
                >
                    <IconChat className="w-7 h-7" />
                </a>
                <a
                    href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                    className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/30 hover:scale-110 hover:-translate-y-1 transition-all"
                    title="Hemen Bizi Arayın"
                    aria-label="Hemen Bizi Arayın"
                >
                    <IconPhone className="w-6 h-6" />
                </a>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary-500/3 rounded-full blur-[150px] pointer-events-none" />
        </footer>
    );
}
