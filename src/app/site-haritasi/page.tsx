import { Metadata } from "next";
import Link from "next/link";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Site Haritası | Ankara Özdemir Nakliyat",
    description: "Ankara Özdemir Nakliyat web sitesindeki tüm sayfalara hızlı erişim sağlayan site haritası sayfası.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/site-haritasi" },
};

const sitemapData = [
    {
        title: "Kurumsal",
        links: [
            { name: "Ana Sayfa", url: "/" },
            { name: "Hakkımızda", url: "/hakkimizda" },
            { name: "Referanslar", url: "/referanslar" },
            { name: "Galeri", url: "/galeri" },
            { name: "İletişim", url: "/iletisim" },
        ]
    },
    {
        title: "Hizmetlerimiz",
        links: [
            { name: "Tüm Hizmetler", url: "/hizmetler" },
            { name: "Evden Eve Nakliyat", url: "/evden-eve-nakliyat" },
            { name: "Şehir İçi Nakliyat", url: "/hizmetler/sehir-ici-nakliyat" },
            { name: "Şehirler Arası Nakliyat", url: "/hizmetler/sehirler-arasi-nakliyat" },
            { name: "Ofis Taşıma", url: "/hizmetler/ofis-tasima" },
            { name: "Asansörlü Taşıma", url: "/hizmetler/asansorlu-tasima" },
            { name: "Parça Eşya Taşıma", url: "/hizmetler/parca-esya-tasima" },
            { name: "Eşya Paketleme", url: "/hizmetler/paketleme" },
            { name: "Eşya Depolama", url: "/hizmetler/depolama" },
            { name: "Nakliyat Sigortası", url: "/hizmetler/nakliyat-sigortasi" },
        ]
    },
    {
        title: "Bilgi Merkezi",
        links: [
            { name: "Sıkça Sorulan Sorular", url: "/sss" },
            { name: "Nakliyat Blog ve Rehberi", url: "/blog" },
            { name: "Nakliyat Makaleleri", url: "/makaleler" },
        ]
    },
    {
        title: "Hizmet Bölgeleri",
        links: [
            { name: "Tüm Hizmet Bölgeleri", url: "/islemler" },
            { name: "Ankara İçi Nakliyat Bölgeleri", url: "/islemler/ankara" },
            { name: "Ankara İlçeleri", url: "/islemler/ankara#ilceler" },
        ]
    },
    {
        title: "Yasal Bilgiler",
        links: [
            { name: "Gizlilik Politikası", url: "/gizlilik-politikasi" },
            { name: "Kullanım Şartları", url: "/kullanim-sartlari" },
            { name: "KVKK Aydınlatma Metni", url: "/kvkk" },
        ]
    }
];

export default function SiteHaritasiPage() {
    const breadcrumbItems = [
        { name: "Ana Sayfa", href: "https://ankaraozdemirnakliyat.com" },
        { name: "Site Haritası", href: "https://ankaraozdemirnakliyat.com/site-haritasi" }
    ];

    return (
        <>
            <BreadcrumbSchema items={breadcrumbItems} />
            <div className="bg-slate-50 min-h-screen py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
                <div className="container-custom relative z-10">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4">
                            Site <span className="text-primary-500">Haritası</span>
                        </h1>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            Web sitemizdeki tüm içeriklere hızlıca ulaşmak için aşağıdaki kategorileri kullanabilirsiniz.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {sitemapData.map((category, index) => (
                            <div key={index} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
                                <h2 className="text-xl font-black text-slate-900 mb-6 pb-4 border-b border-slate-100 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-primary-500 rounded-full inline-block"></span>
                                    {category.title}
                                </h2>
                                <ul className="space-y-4">
                                    {category.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link 
                                                href={link.url} 
                                                className="text-slate-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-2 group"
                                            >
                                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full group-hover:bg-primary-500 transition-colors"></span>
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

