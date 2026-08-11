import Link from "next/link";
import { ankaraIlceleri, hizmetler } from "@/data/siteData";

interface InternalLinksProps {
    currentPage?: string;
    variant?: "ilceler" | "hizmetler" | "mixed";
    maxItems?: number;
    title?: string;
}

// İlçe bazlı internal linkler
export function IlceInternalLinks({ currentSlug, maxItems = 10 }: { currentSlug?: string; maxItems?: number }) {
    const filteredIlceler = currentSlug
        ? ankaraIlceleri.filter((i) => i.slug !== currentSlug)
        : ankaraIlceleri;

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredIlceler.slice(0, maxItems).map((ilce) => (
                <Link
                    key={ilce.slug}
                    href={`/islemler/ankara/${ilce.slug}`}
                    className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-colors p-2 bg-primary-50 rounded-lg text-center"
                    title={`${ilce.name} Nakliyat Hizmetleri`}
                >
                    {ilce.name} Nakliyat
                </Link>
            ))}
        </div>
    );
}

// Hizmet bazlı internal linkler
export function HizmetInternalLinks({ currentId }: { currentId?: string }) {
    const filteredHizmetler = currentId
        ? hizmetler.filter((h) => h.id !== currentId)
        : hizmetler;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {filteredHizmetler.map((hizmet) => (
                <Link
                    key={hizmet.id}
                    href={hizmet.id === "evden-eve-nakliyat" ? "/evden-eve-nakliyat" : `/hizmetler/${hizmet.id}`}
                    className="text-sm text-primary-600 hover:text-primary-800 hover:underline transition-colors p-3 bg-primary-50 rounded-lg"
                    title={`Ankara ${hizmet.title} Hizmetleri`}
                >
                    Ankara {hizmet.title}
                </Link>
            ))}
        </div>
    );
}

// Blog yazılarına eklenecek ilgili sayfa linkleri
export function RelatedPageLinks({ ilce, sehir }: { ilce?: string; sehir?: string }) {
    const links: { href: string; text: string }[] = [];

    if (ilce) {
        const ilceData = ankaraIlceleri.find((i) => i.name.toLowerCase() === ilce.toLowerCase());
        if (ilceData) {
            links.push(
                { href: `/islemler/ankara/${ilceData.slug}`, text: `${ilceData.name} Nakliyat Hizmetleri` },
                { href: `/islemler/ankara/${ilceData.slug}/evden-eve-nakliyat`, text: `${ilceData.name} Evden Eve Nakliyat` },
                { href: `/islemler/ankara/${ilceData.slug}/nakliyat-fiyatlari`, text: `${ilceData.name} Nakliyat Fiyatları` }
            );
        }
    }

    // Her zaman ana hizmet sayfalarına link ekle
    links.push(
        { href: "/hizmetler", text: "Tüm Nakliyat Hizmetleri" },
        { href: "/evden-eve-nakliyat", text: "Evden Eve Nakliyat" },
        { href: "/iletisim", text: "İletişim & Teklif Al" }
    );

    return (
        <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-heading font-bold text-slate-900 mb-4">İlgili Sayfalar</h3>
            <div className="flex flex-wrap gap-2">
                {links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.href}
                        className="text-sm bg-white border border-slate-200 hover:border-primary-300 hover:bg-primary-50 text-slate-600 hover:text-primary-700 px-4 py-2 rounded-lg transition-all"
                        title={link.text}
                    >
                        {link.text}
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Footer için önemli iç linkler
export function FooterSeoLinks() {
    const onemliIlceler = ankaraIlceleri.slice(0, 10);

    return (
        <div className="space-y-6">
            <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Ankara İlçeleri</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {onemliIlceler.map((ilce) => (
                        <Link
                            key={ilce.slug}
                            href={`/islemler/ankara/${ilce.slug}`}
                            className="text-xs text-slate-600 hover:text-primary-600 transition-colors py-1"
                            title={`${ilce.name} Nakliyat Hizmetleri`}
                        >
                            {ilce.name} Nakliyat
                        </Link>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Hizmetlerimiz</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                    {hizmetler.map((hizmet) => (
                        <Link
                            key={hizmet.id}
                            href={hizmet.id === "evden-eve-nakliyat" ? "/evden-eve-nakliyat" : `/hizmetler/${hizmet.id}`}
                            className="text-xs text-slate-600 hover:text-primary-600 transition-colors py-1"
                            title={`Ankara ${hizmet.title} Çözümleri`}
                        >
                            {hizmet.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
