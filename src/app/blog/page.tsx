import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
    title: "Blog - Nakliyat Rehberi ve Taşınma İpuçları",
    description: "Evden eve nakliyat, eşya paketleme ve şehirler arası taşımacılık hakkında uzman görüşleri. Sorunsuz taşınma süreci için tüm bilgiler burada.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/blog" },
    openGraph: {
        title: "Blog - Nakliyat Rehberi ve Taşınma İpuçları",
        description: "Evden eve nakliyat, eşya paketleme ve şehirler arası taşımacılık hakkında uzman görüşleri. Sorunsuz taşınma süreci için tüm bilgiler burada.",
        url: "https://ankaraozdemirnakliyat.com/blog",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Blog - Nakliyat Rehberi ve Taşınma İpuçları",
        description: "Evden eve nakliyat, eşya paketleme ve şehirler arası taşımacılık hakkında uzman görüşleri. Sorunsuz taşınma süreci için tüm bilgiler burada.",
    }
};

export default function BlogPage() {
    return <BlogClient />;
}
