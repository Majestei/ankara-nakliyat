import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ankaraIlceleri, firmaBilgileri, hizmetler, ilceIcerikleri } from "@/data/siteData";
import { IconPhone, IconMail, IconMobile, IconShield, IconMoney, IconTruck, IconUsers, IconBox, IconCog, IconHeadset, IconCheck, IconMapPin } from "@/components/Icons";

interface Props { params: { ilce: string } }

export async function generateStaticParams() { return ankaraIlceleri.map((ilce) => ({ ilce: ilce.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};
    const pageTitle = `${ilce.name} Evden Eve Nakliyat | Özdemir Nakliyat`;
    const description = `${ilce.name} evden eve nakliyat hizmeti. Eşya miktarı, bina erişimi, paketleme ve taşıma tarihi bilgilerinize göre kapsamı görüşün ve teklif alın.`;
    const url = `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}`;

    return {
        title: {
            absolute: pageTitle,
        },
        description,
        alternates: { canonical: url },
        openGraph: {
            title: pageTitle,
            description,
            url,
            type: "website",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: pageTitle }],
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description,
            images: ["/og-image.jpg"],
        },
    };
}

const serviceIconMap: Record<string, React.ReactNode> = {
    "evden-eve-nakliyat": <IconTruck className="w-7 h-7" />,
    "sehir-ici-nakliyat": <IconMapPin className="w-7 h-7" />,
    "sehirler-arasi-nakliyat": <IconTruck className="w-7 h-7" />,
    "ofis-tasima": <IconBox className="w-7 h-7" />,
    "parca-esya-tasima": <IconBox className="w-7 h-7" />,
    "asansorlu-tasima": <IconCog className="w-7 h-7" />,
};

import AnkaraIlceClient from "@/components/AnkaraIlceClient";

export default function AnkaraIlcePage({ params }: Props) {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) notFound();

    const digerIlceler = ankaraIlceleri.filter((i) => i.slug !== ilce.slug);

    // BreadcrumbList JSON-LD Schema
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
            { "@type": "ListItem", position: 2, name: "İşlemler", item: "https://ankaraozdemirnakliyat.com/islemler" },
            { "@type": "ListItem", position: 3, name: `${ilce.name} Nakliyat`, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}` },
        ],
    };

    // Service JSON-LD Schema
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${ilce.name} Evden Eve Nakliyat`,
        serviceType: "Evden Eve Nakliyat",
        description: `${ilce.name} evden eve nakliyat, ofis taşıma, asansörlü nakliyat hizmetleri. Taşıma kapsamı ve adres bazında planlama.`,
        url: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}`,
        provider: { "@id": "https://ankaraozdemirnakliyat.com/#organization" },
        areaServed: {
            "@type": "AdministrativeArea",
            name: `${ilce.name}, Ankara`,
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${ilce.name} Nakliyat Hizmetleri`,
            itemListElement: hizmetler.slice(0, 6).map((h) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: `${ilce.name} ${h.title}`,
                    description: `${ilce.name}'da ${h.shortDesc.toLowerCase()}`,
                },
            })),
        },
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
            />

            <AnkaraIlceClient ilce={ilce} digerIlceler={digerIlceler} />
        </>
    );
}

