import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Nakliyat Sigortası Ankara | Tam Kapsamlı Eşya Güvencesi",
    description: "Nakliyat sigortası ile eşyalarınız tam güvende ✓ Tam kapsamlı koruma ✓ Hızlı hasar tespit ✓ Adil tazminat. Sigortalı taşımacılık için arayın! ☎ 0545 656 81 03",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/nakliyat-sigortasi" },
    openGraph: { title: "Nakliyat Sigortası - Ankara Özdemir", description: "Tam kapsamlı nakliyat sigortası ile eşyalarınızı güvence altına alın.", url: "https://ankaraozdemirnakliyat.com/hizmetler/nakliyat-sigortasi/", type: "website" },
};

export default function NakliyatSigortasiPage() {
    return (
        <>
            <ServiceSchema serviceName="Nakliyat Sigortası" serviceDescription="Tam kapsamlı nakliyat emtia sigortası. Taşıma sürecinde eşyalarınız güvence altında." serviceType="Nakliyat Sigortası" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Nakliyat Sigortası", href: "/hizmetler/nakliyat-sigortasi" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Nakliyat <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Sigortası</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Taşıma sürecinde eşyalarınız tam kapsamlı sigorta ile güvence altındadır.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> olarak tüm taşıma operasyonlarımızı &quot;Tam Kapsamlı Nakliyat Emtia Sigortası&quot; ile gerçekleştiriyoruz. Olası hasar, kaza veya kayıp durumlarında eşyalarınızın değeri eksiksiz karşılanır.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Sigorta Türlerimiz</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { title: "Tam Kapsamlı Sigorta", desc: "Tüm eşyalarınız için uçtan uca koruma. Kaza, devrilme, yangın, hırsızlık dahil." },
                                { title: "Kısmi Sigorta", desc: "Sadece belirli değerli eşyalarınız (antika, elektronik vb.) için özel poliçe." },
                                { title: "Değer Bazlı Sigorta", desc: "Eşyalarınızın beyan edilen piyasa değeri üzerinden poliçe düzenlenir." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Sigorta Kapsamı</h2>
                        <ul className="space-y-3">
                            <li>🛡️ <strong>Taşıma sırasında oluşan hasarlar:</strong> Çizilme, kırılma, ezilme</li>
                            <li>🛡️ <strong>Trafik kazası:</strong> Yolda oluşabilecek kaza durumları</li>
                            <li>🛡️ <strong>Doğal afet:</strong> Sel, deprem, fırtına gibi doğa olayları</li>
                            <li>🛡️ <strong>Hırsızlık:</strong> Taşıma sürecindeki güvenlik riskleri</li>
                            <li>🛡️ <strong>Yangın:</strong> Araç yangını veya depo yangını</li>
                        </ul>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hasar Tazminat Süreci</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Hasar Bildirimi:</strong> Taşıma tamamlandıktan sonra 24 saat içinde hasar bildirimi yapılır.</li>
                            <li><strong>Eksper İncelemesi:</strong> Sigorta şirketi eksperi hasarı yerinde inceler ve raporlar.</li>
                            <li><strong>Değerlendirme:</strong> Hasar miktarı ve tazminat bedeli belirlenir.</li>
                            <li><strong>Ödeme:</strong> Onaylanan tazminat bedeli hesabınıza aktarılır.</li>
                        </ol>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Sigortalı Taşımacılık İçin Arayın</h3>
                            <p className="mb-6 opacity-90">Eşyalarınızı %100 güvence altında taşıyoruz!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

