import { Metadata } from "next";
import { musterıYorumlari, sss, firmaBilgileri } from "@/data/siteData";
import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/HeroSlider";
import { istatistikler } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Ankara Özdemir Nakliyat | Ankara Evden Eve Nakliyat | #1 Güvenilir Taşımacılık",
    description:
        "Ankara evden eve nakliyat firması. Şehir içi, şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, depolama hizmetleri. Hemen ücretsiz teklif alın ve güvenle taşının!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com" },
    openGraph: {
        title: "Ankara Özdemir Nakliyat | Ankara Evden Eve Nakliyat | #1 Güvenilir Taşımacılık",
        description: "Ankara evden eve nakliyat firması. Şehir içi, şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, depolama hizmetleri.",
        url: "https://ankaraozdemirnakliyat.com/",
        type: "website",
    }
};

// FAQPage JSON-LD Schema
const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sss.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
        },
    })),
};

// AggregateRating JSON-LD Schema
const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": "https://ankaraozdemirnakliyat.com/#organization",
    name: "Ankara Özdemir Nakliyat",
    image: "https://ankaraozdemirnakliyat.com/og-image.jpg",
    url: "https://ankaraozdemirnakliyat.com/",
    telephone: firmaBilgileri.phone.replace(/\s/g, ""),
    address: {
        "@type": "PostalAddress",
        streetAddress: firmaBilgileri.address,
        addressLocality: "Sincan",
        addressRegion: "Ankara",
        postalCode: "06420",
        addressCountry: "TR",
    },
    aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        worstRating: "1",
        ratingCount: "1250",
        reviewCount: "1250",
    },
    review: musterıYorumlari.slice(0, 5).map((yorum) => ({
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
        reviewRating: {
            "@type": "Rating",
            ratingValue: String(yorum.rating),
            bestRating: "5",
            worstRating: "1"
        },
        author: {
            "@type": "Person",
            name: yorum.name,
        },
        reviewBody: yorum.comment,
    })),
};

export default function HomePage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
            />

            <HeroSection phone={firmaBilgileri.phone} stats={istatistikler} />
            <HomeClient />
        </>
    );
}

