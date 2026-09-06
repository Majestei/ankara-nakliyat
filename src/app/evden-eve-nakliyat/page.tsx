import { Metadata } from "next";
import EvdenEveClient from "@/components/EvdenEveClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

export const metadata: Metadata = {
    title: {
        absolute: "Ankara Evden Eve Nakliyat & Nakliye: %20 İndirimli Sabit Fiyat",
    },
    description: "Ankara evden eve nakliyat ve nakliye fiyatlarında %20 indirim fırsatı. K3 belgeli, asansörlü, sigortalı, marangoz ve su tesisatı montajı dahil net fiyat teklifi alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat" },
    openGraph: {
        title: "Ankara Evden Eve Nakliyat & Nakliye: %20 İndirimli Sabit Fiyat",
        description: "Ankara evden eve nakliyat ve nakliye fiyatlarında %20 indirim fırsatı. K3 belgeli, asansörlü, sigortalı, marangoz ve su tesisatı montajı dahil net fiyat teklifi alın!",
        url: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat",
        type: "website",
        images: [
            {
                url: "/images/hizmetler/evden-eve-nakliyat.webp",
                width: 1200,
                height: 630,
                alt: "Ankara Evden Eve Nakliyat ve Nakliye Hizmetleri",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Evden Eve Nakliyat & Nakliye: %20 İndirimli Sabit Fiyat",
        description: "Ankara evden eve nakliyat ve nakliye fiyatlarında %20 indirim fırsatı. K3 belgeli, asansörlü, sigortalı, marangoz ve su tesisatı montajı dahil net fiyat teklifi alın!",
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

