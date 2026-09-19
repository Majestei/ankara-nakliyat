import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ankaraIlceleri, firmaBilgileri } from "@/data/siteData";
import { neighborhoodsByDistrict } from "@/data/neighborhoodData";
import { IconPhone, IconCheck, IconMapPin } from "@/components/Icons";
import MahalleClient from "@/components/MahalleClient";
import PricingTable from "@/components/PricingTable";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ContractGuaranteeSection from "@/components/ContractGuaranteeSection";
import MovingChecklistSection from "@/components/MovingChecklistSection";
import { getDistrictServiceContent } from "@/data/districtServiceData";

// Existing route names only; editorial content comes from districtServiceData.
const ilceHizmetler = [
    { slug: "evden-eve-nakliyat", title: "Evden Eve Nakliyat" },
    { slug: "ofis-tasima", title: "Ofis Taşıma" },
    { slug: "nakliyat-fiyatlari", title: "Nakliyat Fiyatları" },
];

interface Props {
    params: { ilce: string; slug: string };
}

export const dynamicParams = false;

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

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    if (hizmet) {
        const content = getDistrictServiceContent(ilce.slug, hizmet.slug as any, ilce.name);
        const pageTitle = `${ilce.name} ${hizmet.title}${hizmet.slug === "evden-eve-nakliyat" ? ": Taşıma Süreci" : ""} | Özdemir Nakliyat`;
        const description = content.description;
        const url = `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}`;

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

    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);
    if (mahalle) {
        const pageTitle = `${ilce.name} ${mahalle.name} Nakliyat | Özdemir Nakliyat`;
        const description = `${mahalle.name}, ${ilce.name} evden eve nakliyat için eşya miktarı, kat ve bina erişimine göre taşıma planı. Paketleme kapsamını görüşün, güncel teklif alın.`;
        const url = `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}`;

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
                images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: pageTitle }]
            },
            twitter: {
                card: "summary_large_image",
                title: pageTitle,
                description,
                images: ["/og-image.jpg"]
            }
        };
    }

    return {};
}

export default function CombinedIlceSubPage({ params }: Props) {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) notFound();

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);

    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);

    if (!hizmet && !mahalle) notFound();

    // If it's a mahalle, return the MahalleClient with full JSON-LD structured data
    if (mahalle) {
        const digerMahalleler = mahalleler.filter(m => m.slug !== params.slug);
        const mahalleBreadcrumbJsonLd = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
                { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
                { "@type": "ListItem", position: 2, name: "İşlemler", item: "https://ankaraozdemirnakliyat.com/islemler" },
                { "@type": "ListItem", position: 3, name: `${ilce.name}`, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}` },
                { "@type": "ListItem", position: 4, name: `${mahalle.name} Nakliyat`, item: `https://ankaraozdemirnakliyat.com/islemler/ankara/${ilce.slug}/${mahalle.slug}` },
            ],
        };
        const mahalleServiceJsonLd = {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${ilce.name} ${mahalle.name} Evden Eve Nakliyat`,
            description: `${mahalle.name}, ${ilce.name} için eşya miktarı, kat, bina erişimi ve paketleme ihtiyacına göre evden eve taşıma planlaması.`,
            provider: {
                "@type": "MovingCompany",
                name: "Ankara Özdemir Nakliyat",
                telephone: "05456568103",
                url: "https://ankaraozdemirnakliyat.com",
            },
            areaServed: {
                "@type": "AdministrativeArea",
                name: `${mahalle.name}, ${ilce.name}, Ankara`,
            },
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(mahalleBreadcrumbJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(mahalleServiceJsonLd) }}
                />
                <MahalleClient ilce={ilce} mahalle={mahalle} digerMahalleler={digerMahalleler} isIstanbul={false} />
            </>
        );
    }

    // If it's a hizmet, return the Hizmet page layout
    if (hizmet) {
        const content = getDistrictServiceContent(ilce.slug, hizmet.slug as any, ilce.name);
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

        // FAQPage JSON-LD
        const faqJsonLd = content.faq && content.faq.length > 0 ? {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: content.faq.map(item => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: item.a
                }
            }))
        } : null;

        return (
            <>
                {/* JSON-LD */}
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
                {faqJsonLd && (
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
                )}

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
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black mb-6 text-slate-900 leading-tight">
                                {content.h1}
                            </h1>
                            <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
                                {content.intro}
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

                            {hizmet.slug === "nakliyat-fiyatlari" && (
                                <div className="mt-8 space-y-5 text-slate-600 leading-relaxed">
                                    <h2 className="text-2xl font-bold text-slate-900">Hizmet türüne göre teklifi karşılaştırın</h2>
                                    <p>
                                        Ev taşımasında eşya hacmi, katlar, paketleme ve söküm-kurulum kapsamı birlikte değerlendirilir.
                                        Asansör ihtiyacında yalnız kat sayısını belirtmek yeterli değildir: tek veya iki adreste kurulum,
                                        bina cephesi, yükleme alanı ve kullanım süresi teklifin kapsamını etkiler.
                                    </p>
                                    <p>
                                        Parça eşya için oda sayısı yerine eşyanın adedini, ölçüsünü ve fotoğrafını paylaşın.
                                        Yükleme yardımı, ambalaj ve teslimde yerleştirmenin fiyata dahil olup olmadığını sorun.
                                        Şehirler arası taşınmada iki açık adresi ve teslim tarihini belirtin; tam araç veya ortak araç planı,
                                        olası bekleme ve varsa aktarma koşullarını karşılaştırın.
                                    </p>
                                    <p>
                                        Ofis taşınmasında bölüm ve cihaz envanteri, arşiv koli sayısı, çalışma saatleri ve yeniden kurulum
                                        sorumlulukları ayrıca görüşülmelidir. Her firmadan aynı liste ve tarihle teklif isteyin;
                                        vergi, ek iş ve kapsam değişikliği koşullarını yazılı olarak değerlendirin.
                                    </p>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                                        <Link href="/hizmetler/asansorlu-tasima" className="font-semibold text-primary-600 hover:underline">Asansör uygunluğu</Link>
                                        <Link href="/hizmetler/parca-esya-tasima" className="font-semibold text-primary-600 hover:underline">Parça eşya kapsamı</Link>
                                        <Link href="/hizmetler/sehirler-arasi-nakliyat" className="font-semibold text-primary-600 hover:underline">Şehirler arası taşıma</Link>
                                    </div>
                                </div>
                            )}

                            {/* Bölgesel Zorluk & Çözüm Kartları */}
                            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
                                <div className="p-6 bg-red-50/70 border border-red-200/80 rounded-2xl">
                                    <span className="text-xs font-bold uppercase tracking-wider text-red-600 block mb-2">Bölgesel Zorluk</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{content.localChallenge.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{content.localChallenge.desc}</p>
                                </div>
                                <div className="p-6 bg-green-50/70 border border-green-200/80 rounded-2xl">
                                    <span className="text-xs font-bold uppercase tracking-wider text-green-600 block mb-2">Özdemir Lojistik Çözümü</span>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{content.logisticsSolution.title}</h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">{content.logisticsSolution.desc}</p>
                                </div>
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

                {/* FAQ Accordion Section */}
                {content.faq && content.faq.length > 0 && (
                    <section className="section-padding bg-white border-t border-slate-100">
                        <div className="container-custom max-w-4xl">
                            <div className="text-center mb-12">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary-600 block mb-2">Merak Edilenler</span>
                                <h2 className="text-3xl font-heading font-black text-slate-900">
                                    {ilce.name} {hizmet.title} Sıkça Sorulan Sorular
                                </h2>
                            </div>
                            <div className="space-y-4">
                                {content.faq.map((item, fi) => (
                                    <details key={fi} className="group bg-slate-50 border border-slate-200 rounded-2xl p-6 open:bg-white open:shadow-md transition-all">
                                        <summary className="font-bold text-slate-900 cursor-pointer list-none flex items-center justify-between">
                                            <span>{item.q}</span>
                                            <span className="text-primary-500 group-open:rotate-180 transition-transform text-xl">▾</span>
                                        </summary>
                                        <p className="text-slate-600 text-sm leading-relaxed mt-4 pt-4 border-t border-slate-100">
                                            {item.a}
                                        </p>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* 2026 District Service Pricing Table */}
                <PricingTable
                    title={`${ilce.name} ${hizmet.title} Fiyatları (2026)`}
                    subtitle={`${ilce.name} için eşya, mesafe, kat ve hizmet kapsamına göre güncel teklif isteyin. Dahil işleri, ek hizmetleri ve vergi koşullarını yazılı olarak netleştirin.`}
                    locationName={`${ilce.name}`}
                />

                {/* Moving Checklist */}
                <MovingChecklistSection />

                {/* Contract Guarantee */}
                <ContractGuaranteeSection />

                {/* Institutional Trust Badges */}
                <TrustBadgesSection />

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

            </>
        );
    }

    return null;
}

