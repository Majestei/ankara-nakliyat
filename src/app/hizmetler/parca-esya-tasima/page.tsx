import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import TrustBadgesSection from "@/components/TrustBadgesSection";

export const metadata: Metadata = {
    title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
    description: "Ankara parça eşya taşıma ve küçük nakliye hizmeti. Tek koltuk, beyaz eşya, öğrenci evi ve kamyonet nakliye ihtiyaçlarınıza aynı gün sabit fiyatlı çözüm!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima" },
    openGraph: {
        title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
        description: "Ankara parça eşya taşıma ve küçük nakliye hizmeti. Tek koltuk, beyaz eşya, öğrenci evi ve kamyonet nakliye ihtiyaçlarınıza aynı gün sabit fiyatlı çözüm!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
        description: "Ankara parça eşya taşıma ve küçük nakliye hizmeti. Tek koltuk, beyaz eşya, öğrenci evi ve kamyonet nakliye ihtiyaçlarınıza aynı gün sabit fiyatlı çözüm!"
    }
};

export default function ParcaEsyaPage() {
    const parcaFiyatlari = [
        {
            title: "Tek Parça Eşya",
            price: "2.000 ₺ – 3.500 ₺",
            items: "Buzdolabı, çamaşır makinesi, tekli koltuk veya baza",
            features: ["Ambalajlama dahil", "1-2 personel desteği", "Aynı gün teslimat"],
        },
        {
            title: "2-4 Parça Mobilya",
            price: "3.500 ₺ – 5.500 ₺",
            items: "Koltuk takımı, TV ünitesi veya yemek masası seti",
            features: ["Marangozlu demontaj/montaj", "Patpat balonlu koruma", "Sigortalı transfer"],
        },
        {
            title: "Öğrenci & Bekar Evi",
            price: "5.500 ₺ – 8.500 ₺",
            items: "1 oda eşyası, yatak, çalışma masası, mini buzdolabı ve koli",
            features: ["Kompakt kamyonet tahsisi", "Ekonomik öğrenci indirimi", "Kapıdan kapıya taşıma"],
        },
        {
            title: "Saatlik Kamyonet Nakliye",
            price: "3.000 ₺ – 5.000 ₺",
            items: "Ankara içi acil şoförlü kapalı kasa araç",
            features: ["Trafik ve yakıt dahil", "Hızlı yükleme ve boşaltma", "25 ilçeye anında erişim"],
        },
    ];

    return (
        <>
            <ServiceSchema serviceName="Parça Eşya ve Küçük Nakliye Ankara" serviceDescription="Ankara parça eşya taşıma, küçük nakliye, kamyonet kiralama ve öğrenci evi taşıma çözümleri." serviceType="Parça Eşya Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Parça Eşya Taşıma", href: "/hizmetler/parca-esya-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Ekonomik Taşıma</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara Parça Eşya & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Küçük Nakliye</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Tek bir parça mobilya veya birkaç koli için komple kamyon tutmanıza gerek yok. Kamyonet filomuzla bütçe dostu, aynı gün parça eşya nakliyesi.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> olarak Ankara&apos;nın 25 ilçesinde tek bir koltuktan birkaç parça beyaz eşyaya, bekar evi taşımacılığından acil kamyonet ihtiyacına kadar her ölçekte <strong>küçük nakliye</strong> hizmeti sunuyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Parça Eşya Taşıma Fiyatları</h2>
                        <div className="grid sm:grid-cols-2 gap-6 not-prose mb-8">
                            {parcaFiyatlari.map((tier, i) => (
                                <div key={i} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{tier.title}</h3>
                                        <div className="text-2xl font-black text-primary-600 mb-3">{tier.price}</div>
                                        <p className="text-xs text-slate-500 mb-4">{tier.items}</p>
                                        <ul className="text-xs text-slate-600 space-y-1.5">
                                            {tier.features.map((f, fi) => (
                                                <li key={fi} className="flex items-center gap-2">
                                                    <span className="text-green-500 font-bold">✓</span> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-primary-500 text-white rounded-xl text-xs font-bold text-center transition-all">
                                        Fiyat Teklifi Al
                                    </a>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hangi Eşyaları Taşıyoruz?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 not-prose">
                            {["Koltuk & Kanepe", "Buzdolabı & Çamaşır Mak.", "Baza & Yatak", "Gardırop (Demonte/Montaj)", "Yemek Masası & Sandalye", "Öğrenci Odası Eşyaları", "Ofis Masası & Sandalyesi", "Piyano & Çelik Kasa", "Koli & Çeyiz Eşyası"].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-medium text-slate-800 text-sm">{item}</div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Neden Ankara Küçük Nakliye Hizmetimiz?</h2>
                        <ul className="space-y-3">
                            <li>✅ <strong>Bütçe Dostu:</strong> Sadece taşınan eşya hacmi kadar ödeme yaparsınız, komple araç parası vermezsiniz.</li>
                            <li>✅ <strong>Aynı Gün Teslimat:</strong> Çankaya, Keçiören, Yenimahalle, Mamak ve Etimesgut başta olmak üzere 2 saat içinde araç tahsisi.</li>
                            <li>✅ <strong>Profesyonel Ambalaj:</strong> Tek parça bile olsa kraft kağıt ve patpat naylon ile sarılmadan araca yüklenmez.</li>
                            <li>✅ <strong>K3 Lisansı ve Sigorta:</strong> Korsan nakliyecilerin aksine tüm yükleriniz resmi poliçe güvencesindedir.</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-2">Acil Parça Eşya veya Kamyonet Mi Lazım?</h3>
                            <p className="mb-6 opacity-90 text-sm">Hemen arayın, en yakın mobil ekibimizi adresinize yönlendirelim.</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-3.5 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                Hemen Arayın: {firmaBilgileri.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadgesSection />
        </>
    );
}

