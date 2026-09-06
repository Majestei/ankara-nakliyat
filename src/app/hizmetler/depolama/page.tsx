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

import TrustBadgesSection from "@/components/TrustBadgesSection";

export default function DepolamaPage() {
    return (
        <>
            <ServiceSchema serviceName="Ankara Eşya Depolama" serviceDescription="Ankara güvenli eşya depolama hizmeti. 7/24 güvenlik, iklimlendirmeli depo." serviceType="Depolama Hizmeti" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Depolama", href: "/hizmetler/depolama" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Kişiye Özel Kilitli Odalar</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Ankara Eşya <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Depolama</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Eşyalarınız 7/24 güvenlik kameralı, nem kontrollü ve sigortalı modern depolarımızda güvende.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> eşya depolama hizmetiyle, tadilat, yurt dışı görevlendirme veya geçici taşınma süreçlerinizde ev ve ofis eşyalarınızı rutubetsiz, hijyenik ve anahtarı yalnızca sizde olan kilitli depolama odalarında muhafaza ediyoruz.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Eşya Depolama Fiyatları</h2>
                        <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Küçük Hacim</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Kutu & Koli Deposu</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">1.500 - 2.500 ₺ <span className="text-xs font-normal text-slate-500">/ay</span></div>
                                <p className="text-xs text-slate-500">1-5 m³ alan. Sezonluk eşyalar, arşiv evrakları ve tekil koliler için ideal.</p>
                            </div>
                            <div className="p-6 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 relative">
                                <span className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">En Çok Kiralanan</span>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Standart Ev</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">1+1 / 2+1 Eşya Odası</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">3.500 - 6.000 ₺ <span className="text-xs font-normal text-slate-500">/ay</span></div>
                                <p className="text-xs text-slate-500">10-20 m³ alan. Beyaz eşya, mobilya ve yatak odası takımları için kilitli oda.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Büyük Ev & Villa</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">3+1 / 4+1 Villa Deposu</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">7.000 - 12.000 ₺ <span className="text-xs font-normal text-slate-500">/ay</span></div>
                                <p className="text-xs text-slate-500">25-45 m³ alan. Geniş ailelerin tüm ev eşyaları için özel havalandırmalı alan.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Depolama Seçenekleri & Avantajları</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Kısa Süreli Depolama", desc: "1-3 ay arası geçici depolama. Ev tadilatı ve taşınma gecikmelerinde kurtarıcı çözüm." },
                                { title: "Uzun Süreli Depolama", desc: "6 ay ve üzeri depolamalarda özel indirimli fiyat avantajı ve düzenli havalandırma kontrolü." },
                                { title: "İklimlendirme & Nem Kontrolü", desc: "Sıcaklık ve nem sensörleriyle mobilyalarınızın şişmesi veya küflenmesi tamamen engellenir." },
                                { title: "Resmi Yangın & Hırsızlık Sigortası", desc: "Depolanan tüm eşyalar kurumsal sigorta poliçesiyle tam teminat altına alınır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Depo Güvenlik Altyapımız</h2>
                        <ul className="space-y-3">
                            <li>🔒 <strong>7/24 Kapalı Devre Kamera (CCTV):</strong> Tüm koridorlar ve giriş noktaları kesintisiz kayıt altında.</li>
                            <li>🔒 <strong>Biyometrik ve Şifreli Giriş:</strong> Yalnızca yetkili personel ve anahtar sahibi müşteri giriş yapabilir.</li>
                            <li>🔒 <strong>Yangın ve Duman Algılama:</strong> Gazlı otomatik yangın söndürme altyapısı mevcuttur.</li>
                            <li>🔒 <strong>Periyodik İlaçlama:</strong> Haşere, kemirgen ve böceklere karşı Sağlık Bakanlığı onaylı ilaçlama yapılır.</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Eşya Depolama Teklifi & Yer Tahsisi</h3>
                            <p className="mb-6 opacity-90">Eşyalarınızı güvenli, temiz ve kilitli odalarımızda saklamak için hemen rezervasyon yapın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadgesSection />
        </>
    );
}

