import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Şehir İçi Nakliyat: Aynı Gün Sigortalı Taşıma",
    description: "Ankara şehir içi nakliyat hizmetinde 25 ilçeye aynı gün teslimat garantisi. Kendi asansörlü araçlarımızla uygun fiyatlı ve sigortalı taşının. Teklif alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/sehir-ici-nakliyat" },
    openGraph: {
        title: "Ankara Şehir İçi Nakliyat: Aynı Gün Sigortalı Taşıma",
        description: "Ankara şehir içi nakliyat hizmetinde 25 ilçeye aynı gün teslimat garantisi. Kendi asansörlü araçlarımızla uygun fiyatlı ve sigortalı taşının. Teklif alın!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/sehir-ici-nakliyat",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Şehir İçi Nakliyat: Aynı Gün Sigortalı Taşıma",
        description: "Ankara şehir içi nakliyat hizmetinde 25 ilçeye aynı gün teslimat garantisi. Kendi asansörlü araçlarımızla uygun fiyatlı ve sigortalı taşının. Teklif alın!",
    }
};

import TrustBadgesSection from "@/components/TrustBadgesSection";

export default function SehirIciNakliyatPage() {
    return (
        <>
            <ServiceSchema
                serviceName="Ankara Şehir İçi Nakliyat"
                serviceDescription="Ankara şehir içi evden eve nakliyat, parça eşya taşıma ve ofis taşıma hizmetleri. Aynı gün teslimat."
                serviceType="Şehir İçi Nakliyat"
            />
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hizmetler", href: "/hizmetler" },
                { name: "Şehir İçi Nakliyat", href: "/hizmetler/sehir-ici-nakliyat" },
            ]} />

            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">
                        25 İlçede Aynı Gün Teslimat
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Şehir İçi</span> Nakliyat
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Ankara&apos;nın 25 ilçesinde kendi özmal çelik filomuz ve kadrolu ekibimizle aynı gün teslimat garantili, sabit fiyatlı şehir içi ev ve ofis taşıma.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            Ankara şehir içi nakliyat hizmetimiz, başkentin her köşesine hızlı, güvenli ve ekonomik taşıma çözümleri sunar. <strong>Ankara Özdemir Nakliyat</strong> olarak Çankaya&apos;dan Keçiören&apos;e, Yenimahalle&apos;den Etimesgut&apos;a kadar tüm ilçelerde komisyonsuz, aracısız ve %100 sigortalı hizmet veriyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Şehir İçi Nakliyat Fiyatları</h2>
                        <div className="grid md:grid-cols-4 gap-4 not-prose mb-8">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">1+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">8.000 - 14.000 ₺</div>
                                <p className="text-[11px] text-slate-500">Kamyonet + 3 Personel</p>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">2+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">12.000 - 18.000 ₺</div>
                                <p className="text-[11px] text-slate-500">Orta Kamyon + 4 Personel</p>
                            </div>
                            <div className="p-5 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 text-center relative">
                                <span className="text-xs font-bold text-primary-600 uppercase">3+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">16.000 - 24.000 ₺</div>
                                <p className="text-[11px] text-slate-500">Büyük Kamyon + 5 Personel</p>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">4+1 & Villa</span>
                                <div className="text-xl font-black text-slate-900 my-2">22.000 - 35.000 ₺</div>
                                <p className="text-[11px] text-slate-500">Mega Kamyon + 6 Personel</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Şehir İçi Nakliyat Avantajlarımız</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Aynı Gün Teslimat", desc: "Sabah 08:30 yükleme, öğleden sonra yeni evinizde anahtar teslim kurulum." },
                                { title: "Aracısız Sabit Fiyat", desc: "Armut veya komisyoncu aracı siteler olmadan doğrudan firma sahibinden net fiyat." },
                                { title: "25 İlçeye Kesintisiz Hizmet", desc: "Ankara'nın tüm merkez ve çevre ilçelerinde aktif hazır araç filosu." },
                                { title: "Kurumsal Emtia Sigortası", desc: "Tüm mobilya ve beyaz eşyalarınız taşıma günü boyunca yasal sigorta teminatında." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ankara Şehir İçi Nakliyat Süreci</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Hızlı WhatsApp / Telefon Keşfi:</strong> Eşyalarınızın fotoğraf ve video analiziyle anında sabit fiyat belirlenir.</li>
                            <li><strong>Yazılı Taşıma Sözleşmesi:</strong> Fiyat, tarih ve ek masraf olmayacağı sözleşmeyle garanti altına alınır.</li>
                            <li><strong>Hijyenik Ambalajlama:</strong> Eşyalarınız sıfır patpat naylon ve kraft kağıtlarla sarılır.</li>
                            <li><strong>Asansörlü Yükleme:</strong> Yüksek katlarda 25. kata kadar hidrolik asansörle hasarsız yükleme yapılır.</li>
                            <li><strong>Montaj ve Yerleşim:</strong> Gardırop, yemek masası ve beyaz eşyalar kurulup çalışır durumda teslim edilir.</li>
                        </ol>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">En Çok Hizmet Verdiğimiz Ankara İlçeleri</h2>
                        <div className="flex flex-wrap gap-2 not-prose mb-8">
                            {[
                                { name: "Çankaya Nakliyat", href: "/islemler/ankara/cankaya" },
                                { name: "Keçiören Nakliyat", href: "/islemler/ankara/kecioren" },
                                { name: "Yenimahalle Nakliyat", href: "/islemler/ankara/yenimahalle" },
                                { name: "Etimesgut Nakliyat", href: "/islemler/ankara/etimesgut" },
                                { name: "Mamak Nakliyat", href: "/islemler/ankara/mamak" },
                                { name: "Sincan Nakliyat", href: "/islemler/ankara/sincan" },
                                { name: "Gölbaşı Nakliyat", href: "/islemler/ankara/golbasi" },
                                { name: "Pursaklar Nakliyat", href: "/islemler/ankara/pursaklar" },
                            ].map((item, i) => (
                                <Link key={i} href={item.href} className="px-4 py-2 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 text-slate-700 font-semibold text-sm rounded-xl border border-slate-200 transition-colors">
                                    📍 {item.name}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Ankara Şehir İçi Nakliyat Rezervasyonu</h3>
                            <p className="mb-6 opacity-90">Sürpriz ek maliyet olmadan, aynı gün temiz taşınmak için hemen arayın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                Hemen Arayın: {firmaBilgileri.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadgesSection />
        </>
    );
}

