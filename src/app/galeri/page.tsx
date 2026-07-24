import { Metadata } from "next";
import GaleriClient from "@/components/GaleriClient";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Galeri | Nakliyat Fotoğrafları ve Videoları | Ankara Özdemir",
    description:
        "Ankara evden eve nakliyat, ofis taşıma ve asansörlü nakliyat projelerimizden gerçek fotoğraflar ve videolar. Eşya paketleme standartlarımızı ve profesyonel araç filomuzu yakından inceleyin.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/galeri" },
    openGraph: {
        title: "Nakliyat Galerisi | Ankara Özdemir",
        description: "Tamamlanan işlerimizden profesyonel kareler. Güvenilir taşımacılığın görsel kanıtı.",
        url: "https://ankaraozdemirnakliyat.com/galeri/",
        type: "website",
    }
};

export default function GaleriPage() {
    const breadcrumbItems = [
        { name: "Ana Sayfa", href: "https://ankaraozdemirnakliyat.com" },
        { name: "Galeri", href: "https://ankaraozdemirnakliyat.com/galeri" }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <GaleriClient />
        </>
    );
}

