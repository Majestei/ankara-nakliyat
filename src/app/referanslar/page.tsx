import { Metadata } from "next";
import { firmaBilgileri, musterıYorumlari } from "@/data/siteData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Müşteri Referansları | Ankara Özdemir Nakliyat Yorumları",
    description:
        "Ankara Özdemir Nakliyat müşteri referansları ve yorumları. 4.9/5 Google puanı, 1250+ değerlendirme. Gerçek müşteri deneyimlerini okuyun.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/referanslar" },
    openGraph: {
        title: "Müşteri Referansları - Ankara Özdemir Nakliyat",
        description: "Gerçek müşterilerimizin deneyimlerini ve yorumlarını keşfedin.",
        url: "https://ankaraozdemirnakliyat.com/referanslar/",
        type: "website",
        images: [{ url: "https://ankaraozdemirnakliyat.com/og-image.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Müşteri Referansları - Ankara Özdemir Nakliyat",
        description: "Gerçek müşterilerimizin deneyimlerini ve yorumlarını keşfedin.",
        images: ["https://ankaraozdemirnakliyat.com/og-image.jpg"],
    },
};

export default function ReferanslarPage() {
    const reviewJsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "@id": "https://ankaraozdemirnakliyat.com/#organization",
        name: "Ankara Özdemir Nakliyat",
        url: "https://ankaraozdemirnakliyat.com/",
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            bestRating: "5",
            worstRating: "1",
            ratingCount: "1250",
            reviewCount: "1250",
        },
        review: musterıYorumlari.map((yorum) => ({
            "@type": "Review",
            itemReviewed: {
                "@type": "MovingCompany",
                name: "Ankara Özdemir Nakliyat",
                image: "https://ankaraozdemirnakliyat.com/og-image.jpg",
                telephone: "05456568103",
                priceRange: "$$",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Ankara",
                    addressCountry: "TR"
                }
            },
            reviewRating: { "@type": "Rating", ratingValue: String(yorum.rating), bestRating: "5", worstRating: "1" },
            author: { "@type": "Person", name: yorum.name },
            reviewBody: yorum.comment,
        })),
    };

    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Referanslar", href: "/referanslar" },
            ]} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />

            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">
                        Müşteri Memnuniyeti
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Müşteri <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Referansları</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        10.000+ mutlu müşterimizin deneyimlerini okuyun. Google&apos;da 4.9/5 ortalama puan.
                    </p>
                    <div className="flex items-center justify-center gap-1 mt-6">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <svg key={s} className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        ))}
                        <span className="text-2xl font-black text-slate-900 ml-3">4.9/5</span>
                        <span className="text-sm text-slate-500 ml-2">(1250+ değerlendirme)</span>
                    </div>
                </div>
            </section>

            {/* Reviews Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {musterıYorumlari.map((yorum, i) => (
                            <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
                                <div className="flex items-center gap-1 mb-3">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <svg key={s} className={`w-4 h-4 ${s <= yorum.rating ? 'text-yellow-400' : 'text-slate-300'} fill-current`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                                    ))}
                                </div>
                                <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{yorum.comment}&rdquo;</p>
                                <div className="flex items-center gap-3 border-t border-slate-200 pt-4">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                                        {yorum.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm">{yorum.name}</p>
                                        <p className="text-xs text-slate-500">{yorum.location}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="mt-16 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Siz de Mutlu Müşterilerimizden Biri Olun!</h2>
                        <p className="mb-6 opacity-90 max-w-xl mx-auto">10.000&apos;den fazla ailenin güvendiği Ankara Özdemir Nakliyat ile güvenle taşının.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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

