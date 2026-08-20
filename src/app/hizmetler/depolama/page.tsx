import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Eşya Depolama - Güvenli & Sigortalı Depo",
    description: "Ankara eşya depolama hizmeti. 7/24 güvenlik, iklimlendirmeli depo, sigortalı, kısa ve uzun süreli. Hemen teklif alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/depolama" },
    openGraph: {
        title: "Ankara Eşya Depolama - Güvenli & Sigortalı Depo",
        description: "Ankara eşya depolama hizmeti. 7/24 güvenlik, iklimlendirmeli depo, sigortalı, kısa ve uzun süreli. Hemen teklif alın!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/depolama",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Eşya Depolama - Güvenli & Sigortalı Depo",
        description: "Ankara eşya depolama hizmeti. 7/24 güvenlik, iklimlendirmeli depo, sigortalı, kısa ve uzun süreli. Hemen teklif alın!"
    }
};

export default function DepolamaPage() {
    return (
        <>
            <ServiceSchema serviceName="Ankara Eşya Depolama" serviceDescription="Ankara güvenli eşya depolama hizmeti. 7/24 güvenlik, iklimlendirmeli depo." serviceType="Depolama Hizmeti" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Depolama", href: "/hizmetler/depolama" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Eşya <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Depolama</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Eşyalarınız 7/24 güvenlik ve iklimlendirmeli depolarda sigortalı olarak saklanır.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> eşya depolama hizmetiyle, taşınma sürecinizde veya uzun süreli ihtiyaçlarınızda eşyalarınızı güvenli ve temiz depolarımızda muhafaza ediyoruz.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Depolama Seçenekleri</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Kısa Süreli Depolama", desc: "1-3 ay arası geçici depolama. Taşınma arasında ideal çözüm." },
                                { title: "Uzun Süreli Depolama", desc: "3 aydan fazla depolama. Yurt dışı görevlendirmeler için uygun." },
                                { title: "İklimlendirmeli Depo", desc: "Sıcaklık ve nem kontrollü depolarda hassas eşyalarınız korunur." },
                                { title: "Sigortalı Depolama", desc: "Depodaki tüm eşyalarınız sigorta kapsamındadır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Depo Güvenlik Özellikleri</h2>
                        <ul className="space-y-3">
                            <li>🔒 <strong>7/24 Kamera Sistemi:</strong> Tüm depo alanları sürekli izlenir</li>
                            <li>🔒 <strong>Alarm Sistemi:</strong> Yetkisiz giriş denemelerinde anında uyarı</li>
                            <li>🔒 <strong>Yangın Algılama:</strong> Otomatik yangın söndürme sistemleri</li>
                            <li>🔒 <strong>Nem Kontrolü:</strong> Eşyalarınız küf ve nemden korunur</li>
                            <li>🔒 <strong>Haşere Kontrolü:</strong> Düzenli ilaçlama ve dezenfeksiyon</li>
                        </ul>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Kimler İçin Uygun?</h2>
                        <p>Taşınma sürecinde geçici depolama ihtiyacı olanlar, yurt dışına çıkan ve eşyalarını güvenle saklamak isteyenler, ev tadilat sürecinde eşya depolamak isteyenler ve mevsimlik eşyalarını saklamak isteyenler için idealdir.</p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Depolama Hizmeti Teklifi</h3>
                            <p className="mb-6 opacity-90">Eşyalarınız güvenli depolarımızda sizi beklesin!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

