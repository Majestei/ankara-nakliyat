import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import TrustBadgesSection from "@/components/TrustBadgesSection";

export const metadata: Metadata = {
    title: "Ankara Şehirler Arası Nakliyat: 81 İle Sigortalı Taşıma",
    description: "Ankara'dan Türkiye'nin 81 iline sigortalı ve sözleşmeli şehirler arası nakliyat. Kapalı çelik kasalı araçlar ve anlık takip ile hemen sabit fiyat alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/sehirler-arasi-nakliyat" },
    openGraph: {
        title: "Ankara Şehirler Arası Nakliyat: 81 İle Sigortalı Taşıma",
        description: "Ankara'dan Türkiye'nin 81 iline sigortalı ve sözleşmeli şehirler arası nakliyat. Kapalı çelik kasalı araçlar ve anlık takip ile hemen sabit fiyat alın!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/sehirler-arasi-nakliyat",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Şehirler Arası Nakliyat: 81 İle Sigortalı Taşıma",
        description: "Ankara'dan Türkiye'nin 81 iline sigortalı ve sözleşmeli şehirler arası nakliyat. Kapalı çelik kasalı araçlar ve anlık takip ile hemen sabit fiyat alın!",
    }
};

export default function SehirlerArasiPage() {
    return (
        <>
            <ServiceSchema
                serviceName="Şehirler Arası Nakliyat"
                serviceDescription="Ankara'dan Türkiye'nin 81 iline sigortalı şehirler arası nakliyat hizmeti. Parsiyel ve komple taşıma."
                serviceType="Şehirler Arası Nakliyat"
                areaServed="Türkiye"
            />
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hizmetler", href: "/hizmetler" },
                { name: "Şehirler Arası Nakliyat", href: "/hizmetler/sehirler-arasi-nakliyat" },
            ]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Şehirler Arası <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Nakliyat</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Ankara&apos;dan Türkiye&apos;nin 81 iline güvenli, sigortalı ve GPS takipli şehirler arası nakliyat hizmeti.
                    </p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> olarak, Ankara merkezli şehirler arası nakliyat hizmetimizle Türkiye&apos;nin dört bir yanına güvenli taşımacılık sunuyoruz. İstanbul, İzmir, Antalya, Bursa, Konya başta olmak üzere 81 ile düzenli seferler düzenliyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Şehirler Arası Nakliyat Hizmetlerimiz</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Komple Ev Taşıma", desc: "Tüm eşyalarınız tek araçta, kapıdan kapıya güvenli teslimat." },
                                { title: "Parsiyel Taşıma", desc: "Birkaç parça eşya için ekonomik parsiyel taşıma seçeneği." },
                                { title: "GPS Takip", desc: "Araçlarımız anlık GPS ile takip edilir, süreç boyunca bilgilendirilirsiniz." },
                                { title: "Sigortalı Taşıma", desc: "Tüm eşyalarınız yol boyunca emtia sigortası kapsamındadır." },
                                { title: "Profesyonel Paketleme", desc: "Uzun yol şartlarına uygun darbe emici malzemelerle özel paketleme." },
                                { title: "Mobilya Montaj", desc: "Hedef şehirde mobilyalarınız uzman marangozlarımızca kurulur." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Popüler Güzergahlar ve Tahmini Süreler</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm border-collapse">
                                <thead>
                                    <tr className="bg-slate-100">
                                        <th className="text-left p-3 font-bold text-slate-900 rounded-tl-xl">Güzergah</th>
                                        <th className="text-left p-3 font-bold text-slate-900">Mesafe</th>
                                        <th className="text-left p-3 font-bold text-slate-900 rounded-tr-xl">Tahmini Süre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        ["Ankara → İstanbul", "~450 km", "5-6 saat"],
                                        ["Ankara → İzmir", "~600 km", "7-8 saat"],
                                        ["Ankara → Antalya", "~550 km", "6-7 saat"],
                                        ["Ankara → Bursa", "~400 km", "4-5 saat"],
                                        ["Ankara → Konya", "~260 km", "3-4 saat"],
                                        ["Ankara → Eskişehir", "~230 km", "3 saat"],
                                    ].map(([route, dist, time], i) => (
                                        <tr key={i} className="border-b border-slate-100">
                                            <td className="p-3 font-medium text-slate-800">{route}</td>
                                            <td className="p-3 text-slate-600">{dist}</td>
                                            <td className="p-3 text-slate-600">{time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Çıkışlı Şehirler Arası Fiyat Tahminleri</h2>
                        <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Popüler Hat</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Ankara ➔ İstanbul</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">16.000 - 28.000 ₺</div>
                                <p className="text-xs text-slate-500">Marmara bölgesi her gün çift yönlü sefer. Parsiyel 4.500 ₺&apos;den başlar.</p>
                            </div>
                            <div className="p-6 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 relative">
                                <span className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Ege & Akdeniz</span>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Güneş Hattı</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Ankara ➔ İzmir / Antalya</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">18.000 - 34.000 ₺</div>
                                <p className="text-xs text-slate-500">Özel süspansiyonlu uzun yol çelik araçlar, 24 saat içinde kapıda teslim.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Tüm Türkiye</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Diğer 81 İl Seferleri</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">Özel Fiyat</div>
                                <p className="text-xs text-slate-500">Bursa, Adana, Samsun, Trabzon, Diyarbakır ve tüm Anadolu illerine sabit fiyat garantisi.</p>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Şehirler Arası Nakliyat Teklifi Alın</h3>
                            <p className="mb-6 opacity-90">Hangi şehre taşınırsanız taşının, K3 belgeli ve sigortalı güvenceyle taşıyoruz!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
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

