import { Metadata } from "next";
import EvdenEveClient from "@/components/EvdenEveClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

export const metadata: Metadata = {
    title: "Ankara Evden Eve Nakliyat | Sigortalı & Asansörlü Ev Taşıma",
    description:
        "Ankara'da profesyonel evden eve nakliyat hizmeti. 15+ yıllık tecrübe, sigortalı taşımacılık, uzman marangozlar ve asansörlü nakliyat çözümleriyle yanınızdayız. Hemen ücretsiz fiyat teklifi alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat" },
    openGraph: {
        title: "Ankara Evden Eve Nakliyat - Ankara Özdemir",
        description: "Güvenilir, sigortalı ve profesyonel ev taşıma hizmeti. Ankara'nın her yerine 7/24 hizmet.",
        url: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat/",
        type: "website",
        images: [
            {
                url: "/images/hizmetler/evden-eve-nakliyat.webp",
                width: 1200,
                height: 630,
                alt: "Ankara Evden Eve Nakliyat Hizmetleri",
            },
        ],
    }
};

export default function EvdenEveNakliyatPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Evden Eve Nakliyat", href: "/evden-eve-nakliyat" },
            ]} />
            <ServiceSchema
                serviceName="Ankara Evden Eve Nakliyat"
                serviceDescription="Ankara evden eve nakliyat hizmeti. 15+ yıllık tecrübe, sigortalı taşımacılık, asansörlü nakliyat."
                serviceType="Evden Eve Nakliyat"
            />
            <EvdenEveClient />
        </>
    );
}

