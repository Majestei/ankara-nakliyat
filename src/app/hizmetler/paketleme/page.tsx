import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Profesyonel Paketleme Hizmeti Ankara | Güvenli Ambalaj",
    description: "Ankara profesyonel eşya paketleme hizmeti ✓ Kırılacak eşya koruması ✓ Gardırop kolileri ✓ Elektronik paketleme ✓ Köpük & balonlu ambalaj. ☎ 0545 656 81 03",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/paketleme" },
    openGraph: { title: "Paketleme Hizmeti - Ankara Özdemir", description: "Profesyonel eşya paketleme ve ambalajlama hizmetleri.", url: "https://ankaraozdemirnakliyat.com/hizmetler/paketleme/", type: "website" },
};

export default function PaketlemePage() {
    return (
        <>
            <ServiceSchema serviceName="Profesyonel Paketleme Hizmeti" serviceDescription="Ankara profesyonel eşya paketleme ve ambalajlama. Kırılacak eşya, elektronik, tekstil koruması." serviceType="Paketleme Hizmeti" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Paketleme", href: "/hizmetler/paketleme" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Paketleme</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Eşyalarınızın güvenliği bizim önceliğimiz. Uzman ekibimizle özenle paketliyoruz.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">Doğru paketlenmeyen bir eşya, en iyi nakliyat firması tarafından taşınsa bile hasar görebilir. <strong>Ankara Özdemir Nakliyat</strong> profesyonel paketleme hizmetiyle eşyalarınızı en üst düzeyde koruma altına alıyoruz.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Paketleme Hizmetlerimiz</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Kırılacak Eşya Paketleme", desc: "Bardak, tabak ve cam eşyalar çift kat balonlu naylon ile sarılır." },
                                { title: "Elektronik Cihaz Koruma", desc: "TV, bilgisayar ve oyun konsolları statik korumalı köpükle paketlenir." },
                                { title: "Gardırop Kolileri", desc: "Askılı kıyafetleriniz özel portatif gardırop kolilerinde taşınır." },
                                { title: "Beyaz Eşya Ambalajı", desc: "Buzdolabı, çamaşır makinesi özel streç film ve köşe koruyucularla sarılır." },
                                { title: "Antika Eşya Koruması", desc: "Değerli ve antika eşyalar için özel ahşap sandık ve soft paketleme." },
                                { title: "Vakumlu Tekstil Paketleme", desc: "Yorgan, yastık ve battaniyeler vakumlanarak hacim azaltılır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Kullandığımız Malzemeler</h2>
                        <ul className="space-y-2">
                            <li>📦 Çift cidarlı mukavva koliler (farklı boyutlarda)</li>
                            <li>🫧 Patpat (balonlu) naylon</li>
                            <li>📜 Kraft kağıt ve ambalaj kağıdı</li>
                            <li>🎞️ Streç film ve bantlama malzemeleri</li>
                            <li>🧊 Köpük köşe koruyucular</li>
                            <li>🏷️ Etiketleme sistemi (oda bazlı renk kodlama)</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Paketleme Hizmeti Teklifi</h3>
                            <p className="mb-6 opacity-90">Eşyalarınızın güvenliğini bize bırakın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

