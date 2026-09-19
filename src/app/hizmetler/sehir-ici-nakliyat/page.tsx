import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Şehir İçi Nakliyat: Ev ve Ofis Taşıma",
    description: "Ankara şehir içi nakliyat için eşya, kat, erişim ve mesafeye göre taşıma planı. Adres ve tarih uygunluğunu görüşerek güncel teklif alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/sehir-ici-nakliyat" },
    openGraph: {
        title: "Ankara Şehir İçi Nakliyat: Ev ve Ofis Taşıma",
        description: "Ankara şehir içi nakliyat için eşya, kat, erişim ve mesafeye göre taşıma planı. Adres ve tarih uygunluğunu görüşerek güncel teklif alın.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/sehir-ici-nakliyat",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Şehir İçi Nakliyat: Ev ve Ofis Taşıma",
        description: "Ankara şehir içi nakliyat için eşya, kat, erişim ve mesafeye göre taşıma planı. Adres ve tarih uygunluğunu görüşerek güncel teklif alın.",
    }
};

import TrustBadgesSection from "@/components/TrustBadgesSection";

export default function SehirIciNakliyatPage() {
    return (
        <>
            <ServiceSchema
                serviceName="Ankara Şehir İçi Nakliyat"
                serviceDescription="Ankara şehir içi ev, parça eşya ve ofis taşımaları için adres ve tarih bilgisine göre planlama."
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
                        Adres ve Tarihe Göre Planlama
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Şehir İçi</span> Nakliyat
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Ankara içindeki iki adres, eşya miktarı ve tarih bilgisiyle taşıma kapsamını belirleyin. Araç, ekip ve teslim uygunluğunu teklif öncesinde görüşün.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            Şehir içi taşınmada kısa mesafe kadar bina erişimi ve eşya hacmi de önemlidir. <strong>Ankara Özdemir Nakliyat</strong> ile görüşürken katları, asansör ölçülerini, yükleme alanını ve istenen paketleme kapsamını paylaşın.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Şehir İçi Nakliyat Fiyatları</h2>
                        <div className="grid md:grid-cols-4 gap-4 not-prose mb-8">
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">1+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">Teklif İsteyin</div>
                                <p className="text-[11px] text-slate-500">Eşya ve erişime göre planlama</p>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">2+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">Teklif İsteyin</div>
                                <p className="text-[11px] text-slate-500">Eşya ve erişime göre planlama</p>
                            </div>
                            <div className="p-5 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 text-center relative">
                                <span className="text-xs font-bold text-primary-600 uppercase">3+1 Daire</span>
                                <div className="text-xl font-black text-slate-900 my-2">Teklif İsteyin</div>
                                <p className="text-[11px] text-slate-500">Eşya ve erişime göre planlama</p>
                            </div>
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                                <span className="text-xs font-bold text-primary-600 uppercase">4+1 & Villa</span>
                                <div className="text-xl font-black text-slate-900 my-2">Teklif İsteyin</div>
                                <p className="text-[11px] text-slate-500">Eşya ve erişime göre planlama</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Şehir İçi Nakliyat Avantajlarımız</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Teslim Takvimi", desc: "Başlangıç ve teslim saatlerini eşya, trafik ve kurulum ihtiyaçlarıyla birlikte görüşün." },
                                { title: "Teklif Kapsamı", desc: "Dahil hizmetleri, ek işlerin ücretini ve ödeme koşullarını yazılı olarak netleştirin." },
                                { title: "Adres Uygunluğu", desc: "İki adresi ve taşınma tarihini paylaşarak araç ve ekip uygunluğunu öğrenin." },
                                { title: "Poliçe Koşulları", desc: "Varsa poliçenin kapsamını, limitlerini ve istisnalarını taşıma öncesinde inceleyin." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ankara Şehir İçi Nakliyat Süreci</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Hızlı WhatsApp / Telefon Keşfi:</strong> Eşya fotoğrafları, iki adres ve kat bilgisiyle teklif hazırlığı yapılır.</li>
                            <li><strong>Yazılı Taşıma Sözleşmesi:</strong> Fiyat, tarih, dahil hizmetler ve kapsam değişikliğinin koşulları yazılı olarak görüşülür.</li>
                            <li><strong>Hijyenik Ambalajlama:</strong> Eşyalarınız sıfır patpat naylon ve kraft kağıtlarla sarılır.</li>
                            <li><strong>Asansörlü Yükleme:</strong> Dış cephe asansörü gereksinimi ve kurulum uygunluğu adres özelinde kontrol edilir.</li>
                            <li><strong>Montaj ve Yerleşim:</strong> Gardırop, yemek masası ve beyaz eşyalar kurulup çalışır durumda teslim edilir.</li>
                        </ol>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ankara İlçelerinde Taşınma Rehberleri</h2>
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
                            <p className="mb-6 opacity-90">Taşınma tarihiniz ve adresleriniz için uygunluğu, dahil hizmetleri ve güncel teklifi görüşün.</p>
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

