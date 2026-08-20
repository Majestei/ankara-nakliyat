import { Metadata } from "next";
import MakalelerClient from "@/components/MakalelerClient";

export const metadata: Metadata = {
    title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
    description: "Türkiye'nin tüm il ve ilçelerinde sunduğumuz evden eve nakliyat, ofis taşıma ve asansörlü taşıma hizmetleri hakkında detaylı SEO rehberleri.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/makaleler" },
    openGraph: {
        title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
        description: "Türkiye'nin tüm il ve ilçelerinde sunduğumuz evden eve nakliyat, ofis taşıma ve asansörlü taşıma hizmetleri hakkında detaylı SEO rehberleri.",
        url: "https://ankaraozdemirnakliyat.com/makaleler",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Nakliyat Rehberi ve Bölgesel Hizmetler",
        description: "Türkiye'nin tüm il ve ilçelerinde sunduğumuz evden eve nakliyat, ofis taşıma ve asansörlü taşıma hizmetleri hakkında detaylı SEO rehberleri.",
    }
};

export default function MakalelerPage() {
    return <MakalelerClient />;
}
