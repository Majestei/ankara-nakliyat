import { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { turkiyeIlleri, civarIller, firmaBilgileri, hizmetler } from "@/data/siteData";
import { IconPhone, IconMobile, IconTruck, IconShield, IconMoney, IconBox, IconSearch, IconHeadset, IconMapPin, IconCog } from "@/components/Icons";
import AnkaraIlceClient from "@/components/AnkaraIlceClient";

interface Props { params: { sehir: string } }

export async function generateStaticParams() { 
    return civarIller.map((il) => ({ sehir: il.slug })); 
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const il = civarIller.find((i) => i.slug === params.sehir);
    if (!il) return {};

    const title = `🥇 Ankara ${il.name} Evden Eve Nakliyat Şirketi | Müşteri Memnuniyeti %100 ✅`;
    const description = `📦 Ankara - ${il.name} arası şehirler arası profesyonel evden eve nakliyat. Asansörlü, ambalajlı ve sigortalı taşımacılık ile eşyalarınız güvende. ☎ Bizi Arayın!`;
    const url = `https://ankaraozdemirnakliyat.com/islemler/${params.sehir}`;

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
    "evden-eve-nakliyat": <IconTruck className="w-7 h-7" />, "sehir-ici-nakliyat": <IconMapPin className="w-7 h-7" />,
    "sehirler-arasi-nakliyat": <IconTruck className="w-7 h-7" />, "ofis-tasima": <IconBox className="w-7 h-7" />,
    "parca-esya-tasima": <IconBox className="w-7 h-7" />, "asansorlu-tasima": <IconCog className="w-7 h-7" />,
};

export default function SehirPage({ params }: Props) {
    const il = civarIller.find((i) => i.slug === params.sehir);
    if (!il) permanentRedirect('/islemler');

    const digerIlceler = civarIller.filter(i => i.slug !== params.sehir).slice(0, 12);

    return <AnkaraIlceClient ilce={il} digerIlceler={digerIlceler} />;
}

