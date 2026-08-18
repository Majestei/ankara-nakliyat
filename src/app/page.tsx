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

export default function HomePage() {
    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <HeroSection phone={firmaBilgileri.phone} stats={istatistikler} />
            <HomeClient />
        </>
    );
}

