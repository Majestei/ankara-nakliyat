import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import HomeClient from "@/components/HomeClient";
import HeroSection from "@/components/HeroSlider";
import { istatistikler } from "@/data/siteData";

export const metadata: Metadata = {
    title: {
        absolute: "Ankara Evden Eve Nakliyat | Özdemir Nakliyat",
    },
    description: "Ankara evden eve nakliyat ve ofis taşıma için eşya, kat ve adres bilgilerinizi paylaşın. Paketleme, asansör ihtiyacı ve taşıma kapsamına göre teklif alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com" },
    openGraph: {
        title: "Ankara Evden Eve Nakliyat | Özdemir Nakliyat",
        description: "Ankara evden eve nakliyat ve ofis taşıma için eşya, kat ve adres bilgilerinizi paylaşın. Paketleme, asansör ihtiyacı ve taşıma kapsamına göre teklif alın.",
        url: "https://ankaraozdemirnakliyat.com",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Evden Eve Nakliyat | Özdemir Nakliyat",
        description: "Ankara evden eve nakliyat ve ofis taşıma. Eşya, kat ve adres bilgilerinize göre taşıma kapsamını görüşüp teklif alın.",
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

