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
    const title = `${ilce.name} Evden Eve Nakliyat - Asansörlü & Sigortalı`;
    const description = `${ilce.name} evden eve nakliyat ve profesyonel nakliyeci hizmeti. Kırılmaya karşı tam sigortalı, marangozlu montaj ve sabit net fiyatla hemen teklif alın.`;
    const url = `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            title,
            description,
            url,
            type: "website",
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: "summary_large_image",
            title,
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
            { "@type": "ListItem", position: 3, name: "Ankara", item: "https://ankaraozdemirnakliyat.com/islemler/ankara" },
            { "@type": "ListItem", position: 4, name: `${ilce.name} Nakliyat`, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}` },
        ],
    };

    // LocalBusiness JSON-LD Schema
    const localBusinessJsonLd = {
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        name: `Ankara Özdemir Nakliyat - ${ilce.name}`,
        description: `${ilce.name} evden eve nakliyat, ofis taşıma, asansörlü nakliyat hizmetleri. Sigortalı ve profesyonel taşımacılık.`,
        url: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}`,
        telephone: "05456568103",
        address: {
            "@type": "PostalAddress",
            streetAddress: "Atatürk Mah. Mithatpaşa Cad. Özmert Apt. No:6/8",
            addressLocality: "Sincan",
            addressRegion: "Ankara",
            postalCode: "06930",
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: "39.9575",
            longitude: "32.5835",
        },
        areaServed: {
            "@type": "AdministrativeArea",
            name: `${ilce.name}, Ankara`,
        },
        priceRange: "$$",
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

    // FAQ JSON-LD Schema
    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": `${ilce.name} nakliyat fiyatları ne kadar?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `${ilce.name} nakliyat fiyatları eşya miktarı, kat durumu ve mesafeye göre değişmektedir. Ortalama fiyatlarımızı öğrenmek için fiyat hesaplayıcımızı kullanabilir veya bizi arayabilirsiniz.`
                }
            },
            {
                "@type": "Question",
                "name": `${ilce.name} asansörlü taşıma hizmetiniz var mı?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Evet, ${ilce.name}'da 15. kata kadar ulaşabilen modern asansörlü taşıma sistemlerimizle hizmet veriyoruz.`
                }
            },
            {
                "@type": "Question",
                "name": `${ilce.name} evden eve nakliyat sigortalı mı?`,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": `Tüm nakliyat hizmetlerimiz tam kapsamlı sigorta poliçesi ile güvence altına alınmaktadır.`
                }
            }
        ]
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
                dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />

            <AnkaraIlceClient ilce={ilce} digerIlceler={digerIlceler} />
        </>
    );
}

