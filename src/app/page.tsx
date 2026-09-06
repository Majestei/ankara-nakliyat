import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/HeroSlider";
import { istatistikler } from "@/data/siteData";

export const metadata: Metadata = {
    title: {
        absolute: "Ankara Nakliyat ve Nakliyeci: Sigortalı & Asansörlü Taşıma",
    },
    description: "Ankara nakliyat ve profesyonel nakliyeci hizmeti. Kendi asansörlü araç filomuzla %100 sigortalı, sözleşmeli evden eve taşıma. Sürpriz fiyatsız hemen teklif alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com" },
    openGraph: {
        title: "Ankara Nakliyat ve Nakliyeci: Sigortalı & Asansörlü Taşıma",
        description: "Ankara nakliyat ve profesyonel nakliyeci hizmeti. Kendi asansörlü araç filomuzla %100 sigortalı, sözleşmeli evden eve taşıma. Sürpriz fiyatsız hemen teklif alın!",
        url: "https://ankaraozdemirnakliyat.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Nakliyat ve Nakliyeci: Sigortalı & Asansörlü Taşıma",
        description: "Ankara nakliyat ve profesyonel nakliyeci hizmeti. Kendi asansörlü araç filomuzla %100 sigortalı, sözleşmeli evden eve taşıma. Sürpriz fiyatsız hemen teklif alın!",
    }
};

export default function HomePage() {
    return (
        <>
            <HeroSection phone={firmaBilgileri.phone} stats={istatistikler} />
            <HomeClient />
        </>
    );
}

