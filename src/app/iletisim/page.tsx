import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "İletişim | Ankara Özdemir Nakliyat - Profesyonel Nakliye Teklifi Alın",
    description: `Ankara nakliyat iletişim ve ücretsiz teklif formu. Evden eve nakliyat, asansörlü taşıma ve şehirler arası taşımacılık için bize ulaşın. ☎ ${firmaBilgileri.phone}`,
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/iletisim" },
    openGraph: {
        title: "İletişim | Ankara Özdemir Nakliyat - Profesyonel Nakliye Teklifi Alın",
        description: `Ankara nakliyat iletişim ve ücretsiz teklif formu. Evden eve nakliyat, asansörlü taşıma ve şehirler arası taşımacılık için bize ulaşın.`,
        url: "https://ankaraozdemirnakliyat.com/iletisim",
        type: "website",
        images: [{ url: "https://ankaraozdemirnakliyat.com/og-image.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "İletişim | Ankara Özdemir Nakliyat - Profesyonel Nakliye Teklifi Alın",
        description: `Ankara nakliyat iletişim ve ücretsiz teklif formu. Evden eve nakliyat, asansörlü taşıma ve şehirler arası taşımacılık için bize ulaşın.`,
        images: ["https://ankaraozdemirnakliyat.com/og-image.jpg"],
    }
};

const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Ankara Özdemir Nakliyat İletişim",
    "description": "Ankara Özdemir Nakliyat iletişim bilgileri ve ücretsiz teklif formu",
    "mainEntity": {
        "@type": "Organization",
        "name": "Ankara Özdemir Nakliyat",
        "telephone": firmaBilgileri.phone.replace(/\s/g, ""),
        "email": firmaBilgileri.email,
    }
};

export default function IletisimPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
            />
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "İletişim", href: "/iletisim/" },
            ]} />
            <ContactClient />
        </>
    );
}

