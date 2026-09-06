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
                        Hizmetlerimiz
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Şehir İçi</span> Nakliyat
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Ankara&apos;nın 25 ilçesinde aynı gün teslimat garantisiyle ekonomik ve güvenli şehir içi nakliyat hizmeti.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            Ankara şehir içi nakliyat hizmetimiz, başkentin her köşesine hızlı ve ekonomik taşıma çözümleri sunar. <strong>Ankara Özdemir Nakliyat</strong> olarak Çankaya&apos;dan Keçiören&apos;e, Yenimahalle&apos;den Etimesgut&apos;a kadar tüm ilçelerde profesyonel ekibimizle hizmetinizdeyiz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Şehir İçi Nakliyat Avantajlarımız</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Aynı Gün Teslimat", desc: "Sabah yükleme, akşam yerleştirme. Ankara içi taşımalarınız aynı gün tamamlanır." },
                                { title: "Ekonomik Fiyatlar", desc: "Şehir içi kısa mesafe avantajıyla bütçe dostu nakliyat fiyatları." },
                                { title: "25 İlçeye Hizmet", desc: "Ankara'nın tüm ilçelerinde aktif araç ve ekiplerimiz bulunmaktadır." },
                                { title: "Sigortalı Taşıma", desc: "Tüm şehir içi taşımalarımız emtia sigortası kapsamındadır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ankara Şehir İçi Nakliyat Süreci</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Ücretsiz Keşif:</strong> Evinize gelerek eşya miktarını ve bina şartlarını inceliyoruz.</li>
                            <li><strong>Sabit Fiyat Teklifi:</strong> Ekspertiz sonrası sürpriz olmayan net fiyat veriyoruz.</li>
                            <li><strong>Profesyonel Paketleme:</strong> Tüm eşyalarınızı özel malzemelerle sarıyoruz.</li>
                            <li><strong>Güvenli Taşıma:</strong> Kapalı kasa araçlarımızla eşyalarınızı yeni adrese taşıyoruz.</li>
                            <li><strong>Yerleştirme ve Montaj:</strong> Mobilyalarınızı istediğiniz odalara kurup teslim ediyoruz.</li>
                        </ol>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Şehir İçi Nakliyat Fiyatları 2026</h2>
                        <p>
                            Ankara şehir içi nakliyat fiyatları; eşya miktarı, kat durumu, asansör ihtiyacı ve ek hizmetlere (paketleme, montaj) göre belirlenir. Kısa mesafe avantajı sayesinde şehir içi fiyatlarımız oldukça ekonomiktir. En doğru fiyat için <strong>ücretsiz ekspertiz</strong> hizmetimizden yararlanın.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hizmet Verdiğimiz Ankara İlçeleri</h2>
                        <p>
                            Çankaya, Keçiören, Yenimahalle, Etimesgut, Mamak, Sincan, Pursaklar, Altındağ, Gölbaşı, Polatlı, Çubuk, Kahramankazan ve diğer tüm Ankara ilçelerinde aktif olarak şehir içi nakliyat hizmeti sunuyoruz.
                        </p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Ücretsiz Keşif ve Fiyat Teklifi</h3>
                            <p className="mb-6 opacity-90">Ankara şehir içi nakliyat fiyatı öğrenmek için hemen arayın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                Hemen Arayın: {firmaBilgileri.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

