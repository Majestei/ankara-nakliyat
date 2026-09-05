import { Metadata } from "next";
import EvdenEveClient from "@/components/EvdenEveClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

export const metadata: Metadata = {
    title: "Ankara Evden Eve Nakliyat ve Taşıma Hizmeti",
    description: "Ankara'da evden eve nakliyat, paketleme ve asansörlü taşıma seçenekleri hakkında bilgi ve teklif alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat" },
    openGraph: {
        title: "Ankara Evden Eve Nakliyat ve Taşıma Hizmeti",
        description: "Ankara'da evden eve nakliyat, paketleme ve asansörlü taşıma seçenekleri hakkında bilgi ve teklif alın.",
        url: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat",
        type: "website",
        images: [
            {
                url: "/images/hizmetler/evden-eve-nakliyat.webp",
                width: 1200,
                height: 630,
                alt: "Ankara Evden Eve Nakliyat Hizmetleri",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Evden Eve Nakliyat ve Taşıma Hizmeti",
        description: "Ankara'da evden eve nakliyat, paketleme ve asansörlü taşıma seçenekleri hakkında bilgi alın.",
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
                serviceDescription="Ankara evden eve nakliyat, paketleme ve asansörlü taşıma seçenekleri."
                serviceType="Evden Eve Nakliyat"
            />
            <EvdenEveClient />
        </>
    );
}

