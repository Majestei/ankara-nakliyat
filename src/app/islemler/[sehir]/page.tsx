import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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

    return {
        title: `🥇 Ankara ${il.name} Evden Eve Nakliyat Şirketi | Müşteri Memnuniyeti %100 ✅`,
        description: `📦 Ankara - ${il.name} arası şehirler arası profesyonel evden eve nakliyat. Asansörlü, ambalajlı ve sigortalı taşımacılık ile eşyalarınız güvende. ☎ Bizi Arayın!`,
        alternates: { canonical: `https://ankaraozdemirnakliyat.com/islemler/${params.sehir}` },
    };
}

const serviceIconMap: Record<string, React.ReactNode> = {
    "evden-eve-nakliyat": <IconTruck className="w-7 h-7" />, "sehir-ici-nakliyat": <IconMapPin className="w-7 h-7" />,
    "sehirler-arasi-nakliyat": <IconTruck className="w-7 h-7" />, "ofis-tasima": <IconBox className="w-7 h-7" />,
    "parca-esya-tasima": <IconBox className="w-7 h-7" />, "asansorlu-tasima": <IconCog className="w-7 h-7" />,
};

export default function SehirPage({ params }: Props) {
    const il = civarIller.find((i) => i.slug === params.sehir);
    if (!il) notFound();

    const digerIlceler = civarIller.filter(i => i.slug !== params.sehir).slice(0, 12);

    return <AnkaraIlceClient ilce={il} digerIlceler={digerIlceler} />;
}

