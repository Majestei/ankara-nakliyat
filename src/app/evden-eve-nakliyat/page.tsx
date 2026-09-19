import { Metadata } from "next";
import EvdenEveClient from "@/components/EvdenEveClient";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import ServiceSchema from "@/components/ServiceSchema";

export const metadata: Metadata = {
    title: {
        absolute: "Evden Eve Taşıma Süreci ve Paketleme | Özdemir Nakliyat",
    },
    description: "Ev taşıma süreci, paketleme, söküm ve kurulum ihtiyaçları. Eşya listenizi ve bina erişimini paylaşın; taşıma kapsamını ve teklif koşullarını görüşün.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/evden-eve-nakliyat" },
    openGraph: {
        title: "Evden Eve Taşıma Süreci ve Paketleme | Özdemir Nakliyat",
        description: "Ev taşıma süreci, paketleme, söküm ve kurulum ihtiyaçları. Eşya listenizi ve bina erişimini paylaşın; taşıma kapsamını ve teklif koşullarını görüşün.",
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
        title: "Evden Eve Taşıma Süreci ve Paketleme | Özdemir Nakliyat",
        description: "Ev taşıma süreci, paketleme, söküm ve kurulum ihtiyaçları. Eşya listenizi ve bina erişimini paylaşın; taşıma kapsamını ve teklif koşullarını görüşün.",
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

