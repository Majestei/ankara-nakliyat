import { Metadata } from "next";
import { musterıYorumlari, sss, firmaBilgileri } from "@/data/siteData";
import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/HeroSlider";
import { istatistikler } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Ankara Evden Eve Nakliyat | Güvenilir Taşımacılık",
    description: "Ankara evden eve nakliyat firması. Şehir içi, şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, depolama. Hemen ücretsiz teklif alın ve taşının!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com" },
    openGraph: {
        title: "Ankara Evden Eve Nakliyat | Güvenilir Taşımacılık",
        description: "Ankara evden eve nakliyat firması. Şehir içi, şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, depolama. Hemen ücretsiz teklif alın ve taşının!",
        url: "https://ankaraozdemirnakliyat.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Evden Eve Nakliyat | Güvenilir Taşımacılık",
        description: "Ankara evden eve nakliyat firması. Şehir içi, şehirler arası nakliyat, ofis taşıma, asansörlü taşıma, depolama. Hemen ücretsiz teklif alın ve taşının!",
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

