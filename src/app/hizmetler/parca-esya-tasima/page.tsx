import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Parça Eşya Taşıma Ankara | Ekonomik Tekli Taşıma",
    description: "Ankara parça eşya taşıma hizmeti ✓ Tek parçadan taşıma ✓ Ekonomik fiyat ✓ Sigortalı ✓ Aynı gün teslimat. Hemen arayın! ☎ 0545 656 81 03",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima" },
    openGraph: { title: "Parça Eşya Taşıma - Ankara Özdemir", description: "Tek parça eşyadan komple eve. Ekonomik ve güvenli parça eşya taşıma.", url: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima/", type: "website" },
};

export default function ParcaEsyaPage() {
    return (
        <>
            <ServiceSchema serviceName="Parça Eşya Taşıma" serviceDescription="Ankara parça eşya taşıma hizmeti. Tek parçadan komple eve ekonomik çözümler." serviceType="Parça Eşya Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Parça Eşya Taşıma", href: "/hizmetler/parca-esya-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Parça Eşya <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Taşıma</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Sadece birkaç parça eşyanız mı var? Ekonomik fiyatlarla güvenle taşıyoruz.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">Tüm evinizi taşımak zorunda değilsiniz. <strong>Ankara Özdemir Nakliyat</strong> parça eşya taşıma hizmetiyle, sadece bir koltuk, buzdolabı veya yatak odası takımınızı bile güvenle taşıyoruz. Küçük araç filomuz ile dar sokaklara da kolayca erişim sağlıyoruz.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hangi Eşyaları Taşıyoruz?</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {["Koltuk Takımı", "Buzdolabı", "Çamaşır Makinesi", "Yatak & Baza", "Gardırop", "Yemek Masası", "Televizyon", "Piyano", "Spor Aletleri"].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-medium text-slate-800 text-sm">{item}</div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Parça Eşya Taşıma Avantajları</h2>
                        <ul className="space-y-3">
                            <li>✅ <strong>Ekonomik fiyatlar:</strong> Sadece taşıdığınız eşya kadar ödeme yaparsınız.</li>
                            <li>✅ <strong>Hızlı teslimat:</strong> Şehir içinde aynı gün teslimat imkanı.</li>
                            <li>✅ <strong>Paketleme dahil:</strong> Eşyanızı profesyonelce paketleyip taşıyoruz.</li>
                            <li>✅ <strong>Sigortalı taşıma:</strong> Tek parça bile olsa sigorta kapsamında.</li>
                            <li>✅ <strong>Küçük araç seçeneği:</strong> Dar sokaklar ve düşük katlar için pratik çözüm.</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Parça Eşya Taşıma Fiyat Teklifi</h3>
                            <p className="mb-6 opacity-90">Tek parça eşya bile olsa profesyonelce taşıyoruz!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

