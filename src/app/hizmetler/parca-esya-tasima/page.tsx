import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import TrustBadgesSection from "@/components/TrustBadgesSection";

export const metadata: Metadata = {
    title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
    description: "Ankara parça eşya taşıma için eşya ölçüsü, adet, kat ve adres bilgileriyle teklif alın. Tek eşya ve küçük taşınmalarda tarih ve araç uygunluğunu görüşün.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima" },
    openGraph: {
        title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
        description: "Ankara parça eşya taşıma için eşya ölçüsü, adet, kat ve adres bilgileriyle teklif alın. Tek eşya ve küçük taşınmalarda tarih ve araç uygunluğunu görüşün.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/parca-esya-tasima",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Parça Eşya Taşıma: Küçük Nakliye & Kamyonet Servisi",
        description: "Ankara parça eşya taşıma için eşya ölçüsü, adet, kat ve adres bilgileriyle teklif alın. Tek eşya ve küçük taşınmalarda tarih ve araç uygunluğunu görüşün."
    }
};

export default function ParcaEsyaPage() {
    const parcaFiyatlari = [
        {
            title: "Tek Parça Eşya",
            price: "Teklif İsteyin",
            items: "Buzdolabı, çamaşır makinesi, tekli koltuk veya baza",
            features: ["Ambalaj kapsamını belirtin", "Yükleme desteğini görüşün", "Tarih uygunluğunu teyit edin"],
        },
        {
            title: "2-4 Parça Mobilya",
            price: "Teklif İsteyin",
            items: "Koltuk takımı, TV ünitesi veya yemek masası seti",
            features: ["Söküm ve kurulumu belirtin", "Yüzeye uygun korumayı görüşün", "Taşıma koşullarını görüşün"],
        },
        {
            title: "Öğrenci & Bekar Evi",
            price: "Teklif İsteyin",
            items: "1 oda eşyası, yatak, çalışma masası, mini buzdolabı ve koli",
            features: ["Eşya ölçülerini paylaşın", "Bütçe ve kapsamı karşılaştırın", "İki adresin erişimini belirtin"],
        },
        {
            title: "Saatlik Kamyonet Nakliye",
            price: "Teklif İsteyin",
            items: "Ankara içi araç ve yükleme desteği ihtiyacı",
            features: ["Araç ve yakıt kapsamını sorun", "Bekleme koşullarını görüşün", "Adres ve saat uygunluğunu teyit edin"],
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
                        Tek mobilya, beyaz eşya veya birkaç koli için adet ve ölçüleri paylaşın. Araç seçeneğini, yükleme desteğini ve teslim tarihini iki adresin koşullarına göre görüşelim.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> ile <strong>küçük nakliye</strong> teklifi görüşürken eşyanın yalnız sayısını değil, kapıdan geçecek ölçüsünü ve taşınacağı katları da belirtin. Sadece araç mı, ambalaj ve taşıma desteği de mi gerektiğini açıklayın; teslim gününü önceden netleştirin.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Parça Eşya Taşıma Teklifinde Neler Belirtilmeli?</h2>
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

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Eşya Listenize Neleri Yazabilirsiniz?</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 not-prose">
                            {["Koltuk & Kanepe", "Buzdolabı & Çamaşır Mak.", "Baza & Yatak", "Gardırop (Demonte/Montaj)", "Yemek Masası & Sandalye", "Öğrenci Odası Eşyaları", "Ofis Masası & Sandalyesi", "Piyano & Çelik Kasa", "Koli & Çeyiz Eşyası"].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-medium text-slate-800 text-sm">{item}</div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Tek Parça İçin Teklifleri Nasıl Karşılaştırabilirsiniz?</h2>
                        <ul className="space-y-3">
                            <li>✅ <strong>Araç seçimi:</strong> Paylaşımlı veya ayrı araç seçeneğinin bulunup bulunmadığını sorun. Hacim dışında yol, bekleme ve personel bedellerini de karşılaştırın.</li>
                            <li>✅ <strong>Teslim zamanı:</strong> Aynı gün talebiniz varsa yükleme ve teslim saatlerini ayrı ayrı teyit edin. Adresler arası mesafe tek başına randevu uygunluğunu göstermez.</li>
                            <li>✅ <strong>Koruma kapsamı:</strong> Cam, ahşap ve elektronik yüzeylerin nasıl korunacağını; ambalajı kimin sağlayacağını ve ücretini yazılı teklifte belirtin.</li>
                            <li>✅ <strong>Taşıma Koşulları:</strong> Dahil işleri, teslim planını ve varsa poliçe kapsamını teklif öncesinde yazılı olarak inceleyin.</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-2">Acil Parça Eşya veya Kamyonet Mi Lazım?</h3>
                            <p className="mb-6 opacity-90 text-sm">Eşyanın ölçüsünü, iki adresi ve istediğiniz tarihi paylaşın; araç ve ekip uygunluğunu görüşelim.</p>
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

