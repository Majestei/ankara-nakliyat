import { Metadata } from "next";
import IslemlerClient from "@/components/IslemlerClient";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Nakliyat Hizmet Bölgeleri | Ankara ve 81 İl Taşımacılık Ağı",
    description:
        "Ankara Özdemir Nakliyat olarak Ankara'nın 25 ilçesinde ve Türkiye'nin 81 ilinde profesyonel lojistik hizmeti sunuyoruz. Çankaya, Keçiören, Yenimahalle ve tüm şehirler arası rotalarda sigortalı taşımacılık.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/islemler" },
    openGraph: {
        title: "Nakliyat Hizmet Bölgelerimiz | Ankara Özdemir",
        description: "Ankara'dan tüm Türkiye'ye uzanan profesyonel ve güvenilir taşımacılık ağı.",
        url: "https://ankaraozdemirnakliyat.com/islemler/",
        type: "website",
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

