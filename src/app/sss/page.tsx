import { Metadata } from "next";
import FaqClient from "@/components/FaqClient";
import { faqData } from "@/data/faqData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular",
    description: "Ankara evden eve nakliyat, fiyatlandırma, paketleme, asansörlü taşıma ve sigorta süreçleri hakkında aklınıza takılan tüm soruların cevapları.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/sss" },
    openGraph: {
        title: "Sıkça Sorulan Sorular",
        description: "Ankara evden eve nakliyat, fiyatlandırma, paketleme, asansörlü taşıma ve sigorta süreçleri hakkında aklınıza takılan tüm soruların cevapları.",
        url: "https://ankaraozdemirnakliyat.com/sss",
        type: "website",
        images: [{ url: "https://ankaraozdemirnakliyat.com/og-image.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Sıkça Sorulan Sorular",
        description: "Ankara evden eve nakliyat, fiyatlandırma, paketleme, asansörlü taşıma ve sigorta süreçleri hakkında aklınıza takılan tüm soruların cevapları.",
        images: ["https://ankaraozdemirnakliyat.com/og-image.jpg"],
    }
};

export default function FaqPage() {
    // Generate JSON-LD for FAQPage
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqData.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };

    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Sıkça Sorulan Sorular", href: "/sss" },
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <FaqClient />
        </>
    );
}

