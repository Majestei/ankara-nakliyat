import { Metadata } from "next";
import GaleriClient from "@/components/GaleriClient";

import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Galeri - Nakliyat Fotoğrafları ve Videoları",
    description: "Evden eve nakliyat, ofis taşıma, paketleme ve asansörlü taşıma için kullanılan görselleri inceleyin.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/galeri" },
    openGraph: {
        title: "Galeri - Nakliyat Fotoğrafları ve Videoları",
        description: "Evden eve nakliyat, ofis taşıma, paketleme ve asansörlü taşıma için kullanılan görselleri inceleyin.",
        url: "https://ankaraozdemirnakliyat.com/galeri",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Galeri - Nakliyat Fotoğrafları ve Videoları",
        description: "Evden eve nakliyat, ofis taşıma, paketleme ve asansörlü taşıma için kullanılan görselleri inceleyin.",
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

