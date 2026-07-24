import { Metadata } from "next";
import { notFound } from "next/navigation";
import { istanbulIlceleri, firmaBilgileri, hizmetler } from "@/data/siteData";
import AnkaraIlceClient from "@/components/AnkaraIlceClient";

interface Props { params: { ilce: string } }

export async function generateStaticParams() { return istanbulIlceleri.map((ilce) => ({ ilce: ilce.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const ilce = istanbulIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};
    return {
        title: `🏆 ${ilce.name} Evden Eve Nakliyat | Garantili & Kurumsal Taşıma ✅`,
        description: `🚚 ${ilce.name} için en iyi nakliye firması! Hasarsızlık garantisi, asansörlü sistemler ve uygun fiyatlarla eşyalarınızı güvenle taşıyoruz. ☎ Hemen Teklif Alın!`,
        alternates: { canonical: `https://ankaraozdemirnakliyat.com/islemler/istanbul/${params.ilce}` },
    };
}

export default function IstanbulIlcePage({ params }: Props) {
    const ilce = istanbulIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) notFound();

    const digerIlceler = istanbulIlceleri.filter((i) => i.slug !== ilce.slug).slice(0, 15);

    // BreadcrumbList JSON-LD Schema
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
            { "@type": "ListItem", position: 2, name: "İşlemler", item: "https://ankaraozdemirnakliyat.com/islemler" },
            { "@type": "ListItem", position: 3, name: "İstanbul", item: "https://ankaraozdemirnakliyat.com/islemler" },
            { "@type": "ListItem", position: 4, name: `İstanbul ${ilce.name} Nakliyat`, item: `https://ankaraozdemirnakliyat.com/islemler/istanbul/${ilce.slug}` },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <AnkaraIlceClient ilce={ilce} digerIlceler={digerIlceler} />
        </>
    );
}

