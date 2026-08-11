import { Metadata } from "next";
import Link from "next/link";
import { permanentRedirect } from "next/navigation";
import { ankaraIlceleri, firmaBilgileri } from "@/data/siteData";
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
                `${ilce} evden eve nakliyat hizmetimiz kapsamında eşyalarınızı profesyonel ekibimizle güvenle taşıyoruz. ${ilce}'da 15 yılı aşkın deneyimimizle evden eve nakliyat sektöründe hizmet veriyoruz.`,
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
                `${ilce} ofis taşıma hizmetimizle kurumsal taşınmalarınızı profesyonelce yönetiyoruz. ${ilce}'da ofis taşıma sürecinde iş kaybınızı minimuma indirmeyi hedefliyoruz.`,
                `${ilce} ofis taşıma hizmetimiz kapsamında; ofis mobilyaları, elektronik cihazlar, arşiv dosyaları ve IT altyapısı güvenle taşınmaktadır. ${ilce}'da hafta sonu ofis taşıma seçeneği ile iş günü kaybınızı sıfıra indirebilirsiniz.`,
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
    },
    {
        slug: "nakliyat-fiyatlari",
        title: "Nakliyat Fiyatları",
        getContent: (ilce: string) => ({
            h1: `${ilce} Nakliyat Fiyatları`,
            description: `${ilce} nakliyat fiyatları 2024. ${ilce}'da evden eve nakliyat, ofis taşıma, asansörlü taşıma fiyatları. Ücretsiz teklif alın.`,
            paragraphs: [
                `${ilce} nakliyat fiyatları, taşınacak eşya miktarı, mesafe, kat durumu ve tercih edilen ek hizmetlere göre belirlenmektedir. ${ilce}'da en uygun nakliyat fiyatlarını sunmak için ücretsiz ekspertiz hizmetimizden yararlanabilirsiniz.`,
                `${ilce} evden eve nakliyat fiyatları genellikle 1+1 daireler için uygun fiyatlarla başlamaktadır. ${ilce}'da 2+1, 3+1 ve daha büyük daireler için fiyatlar eşya miktarına göre artmaktadır. Asansörlü taşıma, paketleme ve sigorta gibi ek hizmetler fiyata dahil edilebilir.`,
                `${ilce} nakliyat fiyatları hakkında en doğru bilgiyi almak için ücretsiz yerinde ekspertiz hizmetimizi kullanmanızı öneriyoruz. ${ilce}'da nakliyat fiyat teklifi almak için hemen bizi arayın.`,
            ],
            features: [
                `${ilce}'da ücretsiz ekspertiz ve keşif`,
                `${ilce} en uygun nakliyat fiyatları`,
                `${ilce}'da fiyat garantisi`,
                `${ilce} ek hizmet seçenekleri`,
                `${ilce}'da taksit imkanı`,
                `${ilce} şeffaf fiyatlandırma`,
            ],
        }),
    },
];

interface Props {
    params: { ilce: string; slug: string };
}

export async function generateStaticParams() {
    const params: { ilce: string, slug: string }[] = [];
    
    ankaraIlceleri.forEach(ilce => {
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
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    if (hizmet) {
        const content = hizmet.getContent(ilce.name);
        return {
            title: `🏆 ${content.h1} | %20 İndirimli Garantili Hizmet 🚀`,
            description: `📦 ${content.description} ☎ Ücretsiz Ekspertiz ve Fiyat Alın!`,
            alternates: {
                canonical: `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}`,
            },
            openGraph: {
                title: `🏆 ${content.h1} | %20 İndirimli Garantili Hizmet 🚀`,
                description: `📦 ${content.description} ☎ Ücretsiz Ekspertiz ve Fiyat Alın!`,
                type: "website",
            },
        };
    }

    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);
    if (mahalle) {
        return {
            title: `🥇 Ankara ${ilce.name} ${mahalle.name} Evden Eve Nakliyat | %20 İndirimli Sigortalı Taşıma ✅`,
            description: `🚚 Ankara ${ilce.name} ${mahalle.name} mahallesinde asansörlü, ambalajlı ve sigortalı profesyonel evden eve nakliyat. Hemen arayın, uygun fiyatları kaçırmayın!`,
            alternates: { canonical: `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}` },
            openGraph: {
                title: `🥇 Ankara ${ilce.name} ${mahalle.name} Evden Eve Nakliyat`,
                description: `🚚 Ankara ${ilce.name} ${mahalle.name} mahallesinde asansörlü, ambalajlı ve sigortalı profesyonel nakliyat.`,
                url: `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}`,
                type: "website",
                images: [{ url: "/og-image.jpg" }]
            },
            twitter: {
                card: "summary_large_image",
                title: `🥇 Ankara ${ilce.name} ${mahalle.name} Nakliyat`,
                description: `🚚 Ankara ${ilce.name} ${mahalle.name} mahallesinde sigortalı nakliyat.`,
                images: ["/og-image.jpg"]
            }
        };
    }

    return {};
}

export default function CombinedIlceSubPage({ params }: Props) {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) permanentRedirect('/islemler');

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    
    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);

    if (!hizmet && !mahalle) permanentRedirect(`/islemler/ankara/${params.ilce}`);

    // If it's a mahalle, return the MahalleClient
    if (mahalle) {
        const digerMahalleler = mahalleler.filter(m => m.slug !== params.slug);
        return <MahalleClient ilce={ilce} mahalle={mahalle} digerMahalleler={digerMahalleler} isIstanbul={false} />;
    }

    // If it's a hizmet, return the Hizmet page layout
    if (hizmet) {
        const content = hizmet.getContent(ilce.name);
        const digerHizmetler = ilceHizmetler.filter((h) => h.slug !== hizmet.slug);
        const digerIlceler = ankaraIlceleri.filter((i) => i.slug !== ilce.slug).slice(0, 12);

        // BreadcrumbList JSON-LD
        const breadcrumbJsonLd = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
                { "@type": "ListItem", position: 2, name: "İşlemler", item: "https://ankaraozdemirnakliyat.com/islemler" },
                { "@type": "ListItem", position: 3, name: `${ilce.name}`, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}` },
                { "@type": "ListItem", position: 4, name: content.h1, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}/${hizmet.slug}` },
            ],
        };

        // Service JSON-LD
        const serviceJsonLd = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: content.h1,
            description: content.description,
            provider: {
                "@type": "MovingCompany",
                name: "Ankara Özdemir Nakliyat",
                telephone: "05456568103",
            },
            areaServed: {
                "@type": "City",
                name: ilce.name,
                containedInPlace: { "@type": "State", name: "Ankara" },
            },
            serviceType: hizmet.title,
        };

        return (
            <>
                {/* JSON-LD */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

                {/* Hero */}
                <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <nav className="mb-6">
                                <ol className="flex items-center justify-center gap-2 text-sm text-slate-500 flex-wrap">
                                    <li><Link href="/" className="hover:text-primary-600 transition-colors" title="Ana Sayfa">Ana Sayfa</Link></li>
                                    <li>/</li>
                                    <li><Link href="/islemler" className="hover:text-primary-600 transition-colors" title="Tüm İşlemler">İşlemler</Link></li>
                                    <li>/</li>
                                    <li><Link href={`/islemler/ankara/${ilce.slug}`} className="hover:text-primary-600 transition-colors" title={`${ilce.name} Nakliyat Hizmetleri`}>{ilce.name}</Link></li>
                                    <li>/</li>
                                    <li className="text-primary-600 font-bold">{hizmet.title}</li>
                                </ol>
                            </nav>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-6 text-slate-900">
                                {ilce.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">{hizmet.title}</span>
                            </h1>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-10">
                                {content.description}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="btn-primary text-lg !py-4 !px-10 flex items-center justify-center gap-3 shadow-lg shadow-primary-500/20" title="Bizi Hemen Arayın">
                                    <IconPhone className="w-5 h-5" /> Hemen Ara
                                </a>
                                <Link href="/iletisim" className="btn-outline text-lg !py-4 !px-10 text-center" title="Online Fiyat Teklifi Alın">
                                    Ücretsiz Teklif Al
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="section-padding bg-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <div className="prose prose-lg max-w-none">
                                {content.paragraphs.map((p, i) => (
                                    <p key={i} className="text-slate-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{
                                        __html: p.replace(
                                            new RegExp(`(${ilce.name} ${hizmet.title.toLowerCase()}|${ilce.name} nakliyat|${ilce.name} evden eve nakliyat)`, "gi"),
                                            "<strong class='text-slate-900'>$1</strong>"
                                        )
                                    }} />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="section-padding bg-slate-50">
                    <div className="container-custom">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-4">
                                {ilce.name}&apos;da {hizmet.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Avantajlarımız</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {content.features.map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 shrink-0">
                                        <IconCheck className="w-5 h-5" />
                                    </div>
                                    <span className="text-sm font-medium text-slate-700">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="section-padding bg-gradient-to-br from-primary-600 to-orange-600 text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    </div>
                    <div className="container-custom text-center relative z-10">
                        <h2 className="text-3xl md:text-4xl font-heading font-black mb-4">
                            {ilce.name}&apos;da {hizmet.title} İçin Teklif Alın
                        </h2>
                        <p className="text-primary-100 mb-8 max-w-xl mx-auto">
                            Ücretsiz ekspertiz ve fiyat teklifi için hemen arayın.
                        </p>
                        <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="bg-white text-primary-600 text-lg !py-5 !px-12 inline-flex items-center gap-3 rounded-2xl font-black shadow-xl hover:bg-slate-50 transition-colors animate-pulse-glow" title="Müşteri Hizmetlerini Arayın">
                            <IconPhone className="w-5 h-5" /> {firmaBilgileri.phone}
                        </a>
                    </div>
                </section>

                {/* Diğer Hizmetler */}
                <section className="section-padding bg-white border-b border-slate-100">
                    <div className="container-custom">
                        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
                            {ilce.name}&apos;da Diğer Hizmetlerimiz
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {digerHizmetler.map((h) => (
                                <Link
                                    key={h.slug}
                                    href={`/islemler/ankara/${ilce.slug}/${h.slug}`}
                                    className="bg-slate-50 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-xl p-4 text-center transition-all font-medium text-slate-600 hover:text-primary-700"
                                    title={`${ilce.name} ${h.title}`}
                                >
                                    {ilce.name} {h.title}
                                </Link>
                            ))}
                            <Link
                                href={`/islemler/ankara/${ilce.slug}`}
                                className="bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-xl p-4 text-center transition-all font-medium text-primary-700"
                                title={`Tüm ${ilce.name} Nakliyat Hizmetleri`}
                            >
                                Tüm {ilce.name} Nakliyat Hizmetleri →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Diğer İlçeler */}
                <section className="section-padding bg-slate-50">
                    <div className="container-custom">
                        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 text-center">
                            Diğer İlçelerde {hizmet.title}
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {digerIlceler.map((i) => (
                                <Link
                                    key={i.slug}
                                    href={`/islemler/ankara/${i.slug}/${hizmet.slug}`}
                                    className="bg-white hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-xl p-3 text-center transition-all text-sm font-medium text-slate-600 hover:text-primary-700"
                                    title={`${i.name} ${hizmet.title}`}
                                >
                                    <IconMapPin className="w-4 h-4 mx-auto mb-1 text-primary-500" />
                                    {i.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SEO Content */}
                <section className="section-padding bg-white border-t border-slate-100">
                    <div className="container-custom max-w-4xl">
                        <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 line-decoration">
                            {ilce.name} {hizmet.title} Hakkında
                        </h2>
                        <div className="prose text-slate-600 leading-relaxed space-y-4 mt-8">
                            <p>
                                <strong className="text-slate-900">{ilce.name} {hizmet.title.toLowerCase()}</strong> hizmetimiz,
                                Ankara Özdemir Nakliyat&apos;ın {ilce.name} ilçesindeki profesyonel taşımacılık çözümlerinden biridir.
                                <strong className="text-slate-900"> {ilce.name} nakliyat</strong> sektöründe 15 yılı aşkın deneyimimizle
                                müşterilerimize en kaliteli hizmeti sunmaktayız.
                            </p>
                            <p>
                                <strong className="text-slate-900">{ilce.name}</strong>&apos;da{" "}
                                <strong className="text-slate-900">{hizmet.title.toLowerCase()}</strong> hizmeti almak için
                                hemen bizi arayabilir veya online teklif formunu doldurabilirsiniz.{" "}
                                <strong className="text-slate-900">{ilce.name} {hizmet.title.toLowerCase()} fiyatları</strong> hakkında
                                detaylı bilgi almak için ücretsiz ekspertiz hizmetimizden yararlanabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return null;
}

