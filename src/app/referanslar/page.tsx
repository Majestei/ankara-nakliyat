import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";
import { googleReviewsData } from "@/data/googleReviewsData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import GoogleReviewsClient from "@/components/GoogleReviewsClient";

export const metadata: Metadata = {
    title: "Müşteri Yorumları & Referanslar | Google Haritalar 4.9★ | Ankara Özdemir Nakliyat",
    description: "Ankara Özdemir Nakliyat Google Haritalar doğrulanmış müşteri yorumları ve evden eve nakliyat referansları. 168+ gerçek müşteri değerlendirmesiyle 4.9 puan.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/referanslar" },
    robots: { index: true, follow: true },
    openGraph: {
        title: "Müşteri Yorumları & Referanslar | Google Haritalar 4.9★ | Ankara Özdemir Nakliyat",
        description: "Ankara Özdemir Nakliyat Google Haritalar doğrulanmış müşteri yorumları ve evden eve nakliyat referansları. 168+ gerçek değerlendirme.",
        url: "https://ankaraozdemirnakliyat.com/referanslar",
        type: "website",
        images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Ankara Özdemir Nakliyat Referanslar" }]
    },
    twitter: {
        card: "summary_large_image",
        title: "Müşteri Yorumları & Referanslar | Google Haritalar 4.9★ | Ankara Özdemir Nakliyat",
        description: "Ankara Özdemir Nakliyat Google Haritalar doğrulanmış müşteri yorumları.",
        images: ["/og-image.jpg"]
    }
};

export default function ReferanslarPage() {
    // Structured Data: MovingCompany with AggregateRating & Review Array for Google Rich Snippets
    const reviewsJsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        name: firmaBilgileri.name,
        url: "https://ankaraozdemirnakliyat.com",
        telephone: firmaBilgileri.phone.replace(/\s/g, ""),
        address: {
            "@type": "PostalAddress",
            streetAddress: firmaBilgileri.address,
            addressLocality: "Çankaya",
            addressRegion: "Ankara",
            addressCountry: "TR"
        },
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: googleReviewsData.rating.toString(),
            reviewCount: googleReviewsData.user_ratings_total.toString(),
            bestRating: "5",
            worstRating: "1"
        },
        review: googleReviewsData.reviews.slice(0, 6).map((rev) => ({
            "@type": "Review",
            author: {
                "@type": "Person",
                name: rev.author_name
            },
            datePublished: new Date(rev.time).toISOString().split("T")[0],
            reviewBody: rev.text,
            reviewRating: {
                "@type": "Rating",
                ratingValue: rev.rating.toString(),
                bestRating: "5",
                worstRating: "1"
            }
        }))
    };

    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Referanslar & Yorumlar", href: "/referanslar" },
            ]} />

            {/* JSON-LD Rich Snippet for Google Search Stars */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsJsonLd) }}
            />

            <main className="bg-slate-50 py-16 md:py-24 min-h-screen">
                <div className="container-custom max-w-6xl">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                        <nav className="mb-4">
                            <ol className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
                                <li><Link href="/" className="hover:text-primary-600 transition-colors">Ana Sayfa</Link></li>
                                <li>/</li>
                                <li className="text-primary-600 font-bold">Referanslar &amp; Yorumlar</li>
                            </ol>
                        </nav>

                        <span className="inline-block text-xs font-black tracking-[0.2em] text-primary-600 uppercase bg-primary-50 px-3.5 py-1.5 rounded-full border border-primary-100">
                            Şeffaf ve Doğrulanmış Müşteri Deneyimi
                        </span>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight leading-tight">
                            Google Haritalar <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">Müşteri Yorumları</span>
                        </h1>

                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                            Ankara Özdemir Nakliyat olarak hiçbir yapay veya anonim yoruma yer vermiyoruz. Taşınma hizmeti almış gerçek müşterilerimizin Google Haritalar (Business Profile) üzerindeki bağımsız değerlendirmelerini anlık ve şeffaf olarak sunuyoruz.
                        </p>
                    </div>

                    {/* Google Reviews Interactive Component */}
                    <GoogleReviewsClient initialData={googleReviewsData} />
                </div>
            </main>
        </>
    );
}
