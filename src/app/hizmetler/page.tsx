import { Metadata } from "next";
import HizmetlerClient from "@/components/HizmetlerClient";
import { hizmetler } from "@/data/siteData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Hizmetlerimiz | Ankara Evden Eve Nakliyat & Uluslararası Taşımacılık",
    description:
        "Ankara'nın en iyi nakliyat firması Ankara Özdemir'den profesyonel hizmetler: Evden eve nakliyat, asansörlü taşıma, şehirler arası nakliyat ve uluslararası zati eşya taşımacılığı. 15+ yıl deneyim, sigortalı ve garantili çözümler.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler" },
    openGraph: {
        title: "Profesyonel Nakliyat Hizmetleri | Ankara Özdemir",
        description: "Ankara içi ve dışı tüm taşımacılık ihtiyaçlarınızda profesyonel, sigortalı ve asansörlü çözümler.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler",
        type: "website",
    }
};

export default function HizmetlerPage() {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "Moving and Logistics",
        "provider": {
            "@type": "MovingCompany",
            "name": "Ankara Özdemir Nakliyat"
        },
        "areaServed": {
            "@type": "State",
            "name": "Ankara"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Nakliyat Hizmetleri",
            "itemListElement": hizmetler.map(h => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": h.title,
                    "description": h.shortDesc
                }
            }))
        }
    };

    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hizmetler", href: "/hizmetler" },
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />
            <HizmetlerClient />
        </>
    );
}

