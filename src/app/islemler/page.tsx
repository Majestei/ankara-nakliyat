import { Metadata } from "next";
import IslemlerClient from "@/components/IslemlerClient";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
    description: "Ankara ilçeleri ve mevcut şehirler arası rotalar için taşınma planı. Adres, eşya, kat ve tarih bilgileriyle hizmet uygunluğunu görüşün.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/islemler" },
    openGraph: {
        title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
        description: "Ankara ilçeleri ve mevcut şehirler arası rotalar için taşınma planı. Adres, eşya, kat ve tarih bilgileriyle hizmet uygunluğunu görüşün.",
        url: "https://ankaraozdemirnakliyat.com/islemler",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
        description: "Ankara ilçeleri ve mevcut şehirler arası rotalar için taşınma planı. Adres, eşya, kat ve tarih bilgileriyle hizmet uygunluğunu görüşün.",
    }
};

export default function IslemlerPage() {
    const breadcrumbItems = [
        { name: "Ana Sayfa", href: "https://ankaraozdemirnakliyat.com" },
        { name: "Hizmet Bölgeleri (İşlemler)", href: "https://ankaraozdemirnakliyat.com/islemler" }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <IslemlerClient />
        </>
    );
}

