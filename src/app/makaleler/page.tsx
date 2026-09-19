import { Metadata } from "next";
import MakalelerClient from "@/components/MakalelerClient";
import { publishedArticles as makalelerData } from "@/data/publishedArticles";

export const metadata: Metadata = {
    title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
    description: "Ankara ilçelerinde taşınma planlaması, hizmet seçimi ve fiyatı etkileyen koşullar hakkında yazılar.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/makaleler" },
    openGraph: {
        title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
        description: "Ankara ilçelerinde taşınma planlaması, hizmet seçimi ve fiyatı etkileyen koşullar hakkında yazılar.",
        url: "https://ankaraozdemirnakliyat.com/makaleler",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
        description: "Ankara ilçelerinde taşınma planlaması, hizmet seçimi ve fiyatı etkileyen koşullar hakkında yazılar.",
    }
};

export default function MakalelerPage() {
    const summaries = makalelerData.map(({ id, slug, title, category, location, date }) => ({
        id, slug, title, category, location, date,
    }));
    return <MakalelerClient posts={summaries} />;
}
