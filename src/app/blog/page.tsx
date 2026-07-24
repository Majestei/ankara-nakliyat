import { Metadata } from "next";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
    title: "Blog | Nakliyat Rehberi ve Taşınma İpuçları | Ankara Özdemir Nakliyat",
    description:
        "Evden eve nakliyat, eşya paketleme ve şehirler arası taşımacılık hakkında uzman görüşleri. Sorunsuz bir taşınma süreci için ihtiyacınız olan tüm bilgiler burada.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/blog" },
    openGraph: {
        title: "Nakliyat Blog ve Rehber | Ankara Özdemir Nakliyat",
        description: "Taşınma sürecinizi kolaylaştıracak profesyonel ipuçları ve güncel sektör haberleri.",
        url: "https://ankaraozdemirnakliyat.com/blog/",
        type: "website",
    }
};

export default function BlogPage() {
    return <BlogClient />;
}
