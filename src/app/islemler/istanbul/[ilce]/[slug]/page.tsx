import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { istanbulIlceleri, firmaBilgileri } from "@/data/siteData";
import { neighborhoodsByDistrict } from "@/data/neighborhoodData";
import { IconPhone, IconCheck, IconMapPin } from "@/components/Icons";
import MahalleClient from "@/components/MahalleClient";

// Hizmet alt sayfa tanımları
const ilceHizmetler = [
    {
        slug: "evden-eve-nakliyat",
        title: "Evden Eve Nakliyat",
        getContent: (ilce: string) => ({
            h1: `${ilce} Evden Eve Nakliyat`,
            description: `${ilce} evden eve nakliyat hizmeti. Profesyonel ekibimizle ${ilce}'da güvenli, sigortalı ve ekonomik evden eve taşımacılık.`,
            paragraphs: [
                `${ilce} evden eve nakliyat hizmetimiz kapsamında eşyalarınızı profesyonel ekibimizle güvenle taşıyoruz. İstanbul'da 15 yılı aşkın deneyimimizle evden eve nakliyat sektöründe hizmet veriyoruz.`,
                `${ilce} evden eve nakliyat fiyatları, taşınacak eşya miktarına, kat durumuna ve mesafeye göre belirlenmektedir. Ücretsiz ekspertiz hizmetimizle ${ilce}'da en uygun nakliyat fiyatını sunuyoruz.`,
                `${ilce} evden eve nakliyat hizmetimiz; profesyonel paketleme, mobilya sökme-kurulum, asansörlü taşıma, sigortalı taşımacılık ve taşınma sonrası yerleştirme hizmetlerini kapsamaktadır. ${ilce}'da evden eve taşınma planınız için hemen bizi arayın.`,
            ],
            features: [
                `${ilce}'da ücretsiz ekspertiz ve fiyat teklifi`,
                `${ilce} evden eve nakliyat sigortası`,
                `${ilce}'da profesyonel paketleme hizmeti`,
                `${ilce} mobilya sökme ve kurulum`,
                `${ilce}'da asansörlü taşıma imkanı`,
                `${ilce} 7/24 müşteri desteği`,
            ],
        }),
    },
    {
        slug: "ofis-tasima",
        title: "Ofis Taşıma",
        getContent: (ilce: string) => ({
            h1: `${ilce} Ofis Taşıma`,
            description: `${ilce} ofis taşıma hizmeti. Kurumsal taşınmalarınızı minimum iş kaybıyla gerçekleştiriyoruz. Profesyonel ofis nakliyat.`,
            paragraphs: [
                `${ilce} ofis taşıma hizmetimizle kurumsal taşınmalarınızı profesyonelce yönetiyoruz. İstanbul'da ofis taşıma sürecinde iş kaybınızı minimuma indirmeyi hedefliyoruz.`,
                `${ilce} ofis taşıma hizmetimiz kapsamında; ofis mobilyaları, elektronik cihazlar, arşiv dosyaları ve IT altyapısı güvenle taşınmaktadır.`,
                `${ilce}'da ofis taşıma fiyatları, ofis büyüklüğüne ve taşınacak eşya miktarına göre belirlenmektedir. ${ilce} kurumsal nakliyat çözümlerimiz hakkında detaylı bilgi almak için bizi arayın.`,
            ],
            features: [
                `${ilce}'da hafta sonu ofis taşıma`,
                `${ilce} ofis mobilya montaj/demontaj`,
                `${ilce}'da elektronik cihaz koruması`,
                `${ilce} arşiv taşımacılığı`,
                `${ilce}'da IT altyapı taşıma desteği`,
                `${ilce} sigortalı ofis taşıma`,
            ],
        }),
    }
];

interface Props {
    params: { ilce: string; slug: string };
}

export async function generateStaticParams() {
    const params: { ilce: string, slug: string }[] = [];
    
    istanbulIlceleri.forEach(ilce => {
        // Hizmetler
        ilceHizmetler.forEach(hizmet => {
            params.push({
                ilce: ilce.slug,
                slug: hizmet.slug
            });
        });

        // Mahalleler
        const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
        mahalleler.forEach(mahalle => {
            params.push({
                ilce: ilce.slug,
                slug: mahalle.slug
            });
        });
    });

    return params.slice(0, 100);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const ilce = istanbulIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    if (hizmet) {
        const content = hizmet.getContent(ilce.name);
        return {
            title: `🏆 ${content.h1} | %20 İndirimli Garantili Hizmet 🚀`,
            description: `📦 ${content.description} ☎ Ücretsiz Ekspertiz ve Fiyat Alın!`,
            alternates: {
                canonical: `https://ankaraozdemirnakliyat.com/islemler/istanbul/${params.ilce}/${params.slug}`,
            },
        };
    }

    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);
    if (mahalle) {
        return {
            title: `🥇 İstanbul ${ilce.name} ${mahalle.name} Evden Eve Nakliyat | Sigortalı Taşıma ✅`,
            description: `🚚 İstanbul ${ilce.name} ${mahalle.name} mahallesinde sigortalı, asansörlü, ambalajlı ve profesyonel evden eve nakliyat. Hemen ücretsiz teklif alın!`,
            alternates: { canonical: `https://ankaraozdemirnakliyat.com/islemler/istanbul/${params.ilce}/${params.slug}` },
            openGraph: {
                title: `🥇 İstanbul ${ilce.name} ${mahalle.name} Evden Eve Nakliyat`,
                description: `🚚 İstanbul ${ilce.name} ${mahalle.name} mahallesinde sigortalı, asansörlü, ambalajlı ve profesyonel evden eve nakliyat.`,
                url: `https://ankaraozdemirnakliyat.com/islemler/istanbul/${params.ilce}/${params.slug}`,
                type: "website",
                images: [{ url: "/og-image.jpg" }]
            },
            twitter: {
                card: "summary_large_image",
                title: `🥇 İstanbul ${ilce.name} ${mahalle.name} Nakliyat`,
                description: `🚚 İstanbul ${ilce.name} ${mahalle.name} mahallesinde sigortalı nakliyat.`,
                images: ["/og-image.jpg"]
            }
        };
    }

    return {};
}

export default function IstanbulCombinedSubPage({ params }: Props) {
    const ilce = istanbulIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) notFound();

    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);

    if (!hizmet && !mahalle) notFound();

    if (mahalle) {
        const digerMahalleler = mahalleler.filter(m => m.slug !== params.slug);
        return <MahalleClient ilce={ilce} mahalle={mahalle} digerMahalleler={digerMahalleler} isIstanbul={true} />;
    }

    if (hizmet) {
        const content = hizmet.getContent(ilce.name);
        const digerHizmetler = ilceHizmetler.filter((h) => h.slug !== hizmet.slug);
        const digerIlceler = istanbulIlceleri.filter((i) => i.slug !== ilce.slug).slice(0, 12);

        return (
            <>
                <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                    <div className="container-custom relative z-10 text-center">
                        <nav className="mb-6">
                            <ol className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                <li><Link href="/">Ana Sayfa</Link></li>
                                <li>/</li>
                                <li><Link href="/islemler">İşlemler</Link></li>
                                <li>/</li>
                                <li><Link href={`/islemler/istanbul/${ilce.slug}`}>{ilce.name}</Link></li>
                                <li>/</li>
                                <li className="text-primary-600 font-bold">{hizmet.title}</li>
                            </ol>
                        </nav>
                        <h1 className="text-4xl md:text-5xl font-heading font-black mb-6 text-slate-900">
                            {ilce.name} <span className="text-primary-600">{hizmet.title}</span>
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">{content.description}</p>
                    </div>
                </section>

                <section className="section-padding bg-white">
                    <div className="container-custom max-w-4xl mx-auto">
                        <div className="prose prose-lg">
                            {content.paragraphs.map((p, i) => (
                                <p key={i} className="mb-6">{p}</p>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section-padding bg-slate-50">
                    <div className="container-custom">
                        <h2 className="text-3xl font-heading font-black text-center mb-12">{ilce.name}&apos;da Hizmet Avantajlarımız</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {content.features.map((f, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
                                    <IconCheck className="text-primary-500 w-6 h-6" />
                                    <span className="font-medium">{f}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return null;
}

