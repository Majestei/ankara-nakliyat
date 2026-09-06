import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ankaraIlceleri, firmaBilgileri, ilceIcerikleri } from "@/data/siteData";
import { neighborhoodsByDistrict } from "@/data/neighborhoodData";
import { IconPhone, IconCheck, IconMapPin } from "@/components/Icons";
import MahalleClient from "@/components/MahalleClient";
import PricingTable from "@/components/PricingTable";
import TrustBadgesSection from "@/components/TrustBadgesSection";
import ContractGuaranteeSection from "@/components/ContractGuaranteeSection";
import MovingChecklistSection from "@/components/MovingChecklistSection";

// Hizmet alt sayfa tanımları
const ilceHizmetler = [
    {
        slug: "evden-eve-nakliyat",
        title: "Evden Eve Nakliyat",
        getContent: (ilce: string, ilceSlug: string) => {
            const customParagraphs = ilceIcerikleri[ilceSlug];
            return {
                h1: `${ilce} Evden Eve Nakliyat`,
                description: `${ilce} evden eve nakliyat ve nakliye hizmeti. Profesyonel ekibimizle ${ilce}'da asansörlü, sigortalı, marangozlu ve ekonomik taşımacılık.`,
                paragraphs: customParagraphs && customParagraphs.length >= 3 ? customParagraphs : [
                    `${ilce} evden eve nakliyat hizmetimiz kapsamında eşyalarınızı kadrolu uzman ekibimiz, modern çelik kasalı araçlarımız ve dış cephe asansörlerimizle güvenle taşıyoruz.`,
                    `${ilce} nakliyat operasyonlarında eşyalarınız çift katlı balonlu naylonlarla paketlenir, marangozumuz mobilyalarınızı söker ve yeni evinizde montajını tamamlar.`,
                    `${ilce} taşınma sürecinde sürpriz ek masraflarla karşılaşmamanız için ücretsiz ekspertiz sonrasında noter onaylı nitelikte sabit fiyat sözleşmesi imzalanır.`,
                ],
                features: [
                    `${ilce}'da ücretsiz yerinde/video ekspertiz`,
                    `${ilce} tam kapsamlı emtia sigortası`,
                    `${ilce}'da marangozlu demontaj & montaj`,
                    `${ilce} su tesisatı ve beyaz eşya bağlantısı`,
                    `${ilce}'da 25. kata kadar modüler asansör`,
                    `${ilce} sabit fiyat & yazılı sözleşme güvencesi`,
                ],
            };
        },
    },
    {
        slug: "ofis-tasima",
        title: "Ofis Taşıma",
        getContent: (ilce: string, ilceSlug: string) => {
            const districtSpecificNotes: Record<string, string[]> = {
                "cankaya": [
                    "Çankaya ofis taşıma hizmetlerimizde, **Kızılay, Tunalı, Gaziosmanpaşa, Söğütözü ve Çukurambar** plazalarındaki şirket merkezleri, avukatlık büroları ve elçilik temsilcilikleri için kurumsal lojistik sağlıyoruz.",
                    "Hafta sonu veya mesai bitimi operasyonlarımızla, şirketinizin çalışma temposunu ve müşteri iletişimini aksatmadan Cuma akşamı başlayıp Pazartesi sabahı anahtar teslim kurulum yapıyoruz.",
                    "Sunucu kabinleri, IT donanımları ve masaüstü bilgisayarlar antistatik ambalajlarla korunurken, klasör ve arşiv evraklarınız numaralı kolilerle departman sırasına göre dizilir."
                ],
                "yenimahalle": [
                    "Yenimahalle ofis taşıma servisimizle, **Ostim Sanayi, İvedik Organize Sanayi ve Batı Sitesi** iş merkezlerindeki işletmeler, mühendislik ofisleri ve üretim atölyeleri için hızlı çözümler sunuyoruz.",
                    "Ağır sanayi parçaları, hassas test cihazları ve ofis mobilyaları çelik kasalı araçlarımız ve forklift/asansör desteğimizle güvenle sevk edilir.",
                    "Yenimahalle genelinde kurumsal faturalı, K3 yetki belgeli ve tam teminatlı sigorta güvencesiyle sıfır iş kaybı taahhüt ediyoruz."
                ],
                "sincan": [
                    "Sincan kurumsal taşıma hizmetlerimiz, **Sincan 1. Organize Sanayi Bölgesi (ASO) ve Törekent** fabrikalarının idari yönetim ofisleri ile muhasebe birimlerinin taşınmasında uzmanlaşmıştır.",
                    "Sanayi bölgesinin yoğun sevkiyat saatlerine uyumlu çalışma planı hazırlayarak tesis içi operasyonlarınızı aksatmadan taşınmayı tamamlıyoruz.",
                    "Büro mobilyalarının demontajı, arşivleme raflarının sökümü ve montajı profesyonel marangoz ekibimiz tarafından titizlikle yürütülür."
                ],
                "altindag": [
                    "Altındağ ofis taşımacılığında, **Siteler mobilya imalatçıları ve mağazaları, Ulus tarihi iş hanları ve toptancılar** için güvenli kurumsal nakliyat yapıyoruz.",
                    "Dar sokaklar ve tarihi yapıların merdiven koşullarına uygun kompakt nakliye araçlarımız ve modüler dış cephe asansörlerimiz devreye girer.",
                    "Resmi kurum evrakları, muhasebe kayıtları ve mağaza demirbaşları tam kapsamlı sigorta poliçesi ile teminat altındadır."
                ],
                "etimesgut": [
                    "Etimesgut ofis taşıma operasyonlarımızda, **Bağlıca, Eryaman ve Elvankent** bölgelerindeki poliklinikler, özel okullar, etüt merkezleri ve yerel işletmeler için hizmet sunuyoruz.",
                    "Eğitim ve sağlık kurumlarının hassas mobilya ve teknolojik cihazları özel patpat naylonlarla ambalajlanarak taşınır.",
                    "Aynı gün içinde hızlı ve düzenli yerleşim sağlayarak iş yerinizin kesintisiz hizmet vermesine destek oluyoruz."
                ]
            };

            const paragraphs = districtSpecificNotes[ilceSlug] || [
                `${ilce} ofis taşıma hizmetimizle kurumsal iş yerinizin taşınma sürecini profesyonel bir takvimle yönetiyor, mesai kaybınızı sıfıra indiriyoruz.`,
                `${ilce} bölgesindeki bürolar, klinikler ve işletmeler için arşiv dosyaları numaralı kutulara yerleştirilir, bilgisayar ve elektronik cihazlar antistatik korumayla ambalajlanır.`,
                `Hafta sonu veya mesai dışı çalışma opsiyonumuz sayesinde Cuma akşamı başlayan taşınmanız Pazartesi sabahı şirketiniz çalışmaya hazır şekilde teslim edilir.`
            ];

            return {
                h1: `${ilce} Ofis Taşıma`,
                description: `${ilce} kurumsal ofis ve büro taşıma hizmeti. IT donanım güvenliği, numaralı arşivleme ve hafta sonu taşıma ile sıfır iş kaybı.`,
                paragraphs,
                features: [
                    `${ilce}'da hafta sonu sıfır iş kaybı ile taşıma`,
                    `${ilce} IT & sunucu antistatik paketleme`,
                    `${ilce}'da numaralı arşiv kolileme sistemi`,
                    `${ilce} kurumsal sözleşmeli sabit fiyat`,
                    `${ilce}'da demonte & anahtar teslim montaj`,
                    `${ilce} tam kapsamlı kurumsal sigorta poliçesi`,
                ],
            };
        },
    },
    {
        slug: "nakliyat-fiyatlari",
        title: "Nakliyat Fiyatları",
        getContent: (ilce: string, ilceSlug: string) => ({
            h1: `${ilce} Nakliyat Fiyatları (2026)`,
            description: `${ilce} nakliyat fiyatları 2026 listesi. ${ilce}'da 1+1, 2+1, 3+1 ev taşıma, asansörlü nakliye ve marangozluk dahil şeffaf sabit fiyat teklifi.`,
            paragraphs: [
                `${ilce} nakliyat fiyatları 2026 yılı için dairenin oda sayısına (1+1, 2+1, 3+1, 4+1), kat yüksekliğine ve eşya hacmine göre şeffaf olarak hesaplanmaktadır. Fiyatlarımıza KDV, marangozluk, ambalajlama ve sigorta dahildir.`,
                `Sincan merkez operasyon üssümüzden ${ilce} ilçesine sağladığımız doğrudan lojistik güzergahlar sayesinde gereksiz aracı komisyonlarını ortadan kaldırıyor, bölge halkına en rekabetçi sabit fiyatları sunuyoruz.`,
                `${ilce} içi ve ilçeler arası taşınmalarda sürpriz masraflarla karşılaşmamanız için ücretsiz video veya fiziki ekspertiz ile sabit fiyat sözleşmesi imzalıyoruz. Kapıda asla fiyat artışı yapılmaz.`,
            ],
            features: [
                `${ilce}'da sürpriz masrafsız sabit fiyat taahhüdü`,
                `${ilce} 1+1'den villaya şeffaf fiyat skalası`,
                `${ilce}'da Standart ve Toplamalı VIP paket seçenekleri`,
                `${ilce} marangozluk ve ambalajlama fiyata dahil`,
                `${ilce}'da ücretsiz keşif ve ekspertiz imkanı`,
                `${ilce} K3 yetki belgeli resmi faturalı hizmet`,
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

    return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const ilce = ankaraIlceleri.find((i) => i.slug === params.ilce);
    if (!ilce) return {};

    // Check if it's a hizmet
    const hizmet = ilceHizmetler.find((h) => h.slug === params.slug);
    if (hizmet) {
        const content = hizmet.getContent(ilce.name, ilce.slug);
        const title = `${content.h1} | Garantili Hizmet`;
        const description = `${content.description} Ücretsiz Ekspertiz ve Fiyat Alın!`;
        const isCanonicalToDistrict = params.slug === "evden-eve-nakliyat" || params.slug === "nakliyat-fiyatlari";
        const url = isCanonicalToDistrict
            ? `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}`
            : `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}/${params.slug}`;

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

    // Check if it's a mahalle
    const mahalleler = neighborhoodsByDistrict[ilce.slug] || [];
    const mahalle = mahalleler.find(m => m.slug === params.slug);
    if (mahalle) {
        const title = `Ankara ${ilce.name} ${mahalle.name} Evden Eve Nakliyat`;
        const description = `Ankara ${ilce.name} ${mahalle.name} mahallesinde asansörlü, ambalajlı ve sigortalı profesyonel evden eve nakliyat. Hemen arayın, uygun fiyatları kaçırmayın!`;
        // Canonical points directly to district hub; noindex, follow passes authority while eliminating doorway risk
        const url = `https://ankaraozdemirnakliyat.com/islemler/ankara/${params.ilce}`;

        return {
            title,
            description,
            robots: {
                index: false,
                follow: true,
            },
            alternates: { canonical: url },
            openGraph: {
                title,
                description,
                url,
                type: "website",
                images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: title }]
            },
            twitter: {
                card: "summary_large_image",
                title,
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
            description: `${ilce.name} ${mahalle.name} mahallesinde asansörlü, ambalajlı ve sigortalı profesyonel evden eve nakliyat.`,
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
        const content = hizmet.getContent(ilce.name, ilce.slug);
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

                {/* 2026 District Service Pricing Table */}
                <PricingTable 
                    title={`${ilce.name} ${hizmet.title} Fiyatları (2026)`}
                    subtitle={`${ilce.name} genelinde geçerli şeffaf fiyat tarifemiz. K3 lisansı, tam kapsamlı sigorta ve profesyonel montaj dahildir.`}
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

