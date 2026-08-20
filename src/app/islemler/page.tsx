import { Metadata } from "next";
import IslemlerClient from "@/components/IslemlerClient";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
    description: "Ankara'nın 25 ilçesinde ve Türkiye'nin 81 ilinde profesyonel lojistik hizmeti sunuyoruz. Şehir içi ve şehirler arası sigortalı taşımacılık.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/islemler" },
    openGraph: {
        title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
        description: "Ankara'nın 25 ilçesinde ve Türkiye'nin 81 ilinde profesyonel lojistik hizmeti sunuyoruz. Şehir içi ve şehirler arası sigortalı taşımacılık.",
        url: "https://ankaraozdemirnakliyat.com/islemler",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
        description: "Ankara'nın 25 ilçesinde ve Türkiye'nin 81 ilinde profesyonel lojistik hizmeti sunuyoruz. Şehir içi ve şehirler arası sigortalı taşımacılık.",
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

