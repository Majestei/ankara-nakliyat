import { Metadata } from "next";
import MakalelerClient from "@/components/MakalelerClient";

export const metadata: Metadata = {
    title: "Nakliyat Rehberi ve Bölgesel Hizmetler | Ankara Özdemir Nakliyat",
    description: "Türkiye'nin tüm il ve ilçelerinde sunduğumuz evden eve nakliyat, ofis taşıma ve asansörlü taşıma hizmetleri hakkında detaylı SEO rehberleri.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/makaleler" },
};

export default function MakalelerPage() {
    return <MakalelerClient />;
}
