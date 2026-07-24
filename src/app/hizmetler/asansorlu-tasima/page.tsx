import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Asansörlü Nakliyat Ankara | Yüksek Kat Taşıma Çözümü",
    description: "Ankara asansörlü nakliyat hizmeti ✓ 25. kata kadar ✓ Dış cephe asansörü ✓ Hasarsız taşıma ✓ %50 daha hızlı. Hemen teklif alın! ☎ 0545 656 81 03",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/asansorlu-tasima" },
    openGraph: { title: "Asansörlü Nakliyat Ankara - Ankara Özdemir", description: "25. kata kadar dış cephe asansörlü nakliyat hizmeti.", url: "https://ankaraozdemirnakliyat.com/hizmetler/asansorlu-tasima/", type: "website" },
};

export default function AsansorluTasimaPage() {
    return (
        <>
            <ServiceSchema serviceName="Asansörlü Nakliyat Ankara" serviceDescription="Ankara asansörlü evden eve nakliyat. 25. kata kadar dış cephe asansörü ile güvenli taşıma." serviceType="Asansörlü Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Asansörlü Taşıma", href: "/hizmetler/asansorlu-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Asansörlü <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Nakliyat</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Yüksek katlar ve dar merdivenler artık sorun değil! 25. kata kadar asansörlü taşıma.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> modüler dış cephe asansör sistemleriyle, eşyalarınızı bina dışından güvenle indirip yüklüyoruz. Dar merdivenlerden eşya geçirmek zorunda kalmadan, çizilme ve hasar riski sıfır ile taşınma yaparsınız.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Asansörlü Nakliyat Avantajları</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "25. Kata Kadar Erişim", desc: "Modüler asansör sistemlerimiz en yüksek katlara bile ulaşır." },
                                { title: "%50 Daha Hızlı", desc: "Manuel merdivenle taşımaya göre yarı yarıya süre tasarrufu." },
                                { title: "Sıfır Hasar Riski", desc: "Eşyalar merdivenden geçmediği için çizilme/çarpma riski ortadan kalkar." },
                                { title: "Komşulara Saygı", desc: "Apartman içi gürültü ve rahatsızlık minimuma iner." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Asansör Kurulumu İçin Gerekli Şartlar</h2>
                        <ul className="space-y-3">
                            <li>✅ Binanın önünde asansör aracının park edebileceği alan</li>
                            <li>✅ Eşyanın çıkarılacağı uygun balkon veya geniş pencere</li>
                            <li>✅ Binanın dış cephe yapısının asansör montajına uygunluğu</li>
                        </ul>
                        <p className="text-sm text-slate-500 italic">* Ekspertiz aşamasında asansör kurulumuna uygunluk kontrol edilir.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Asansörlü Nakliyat Ne Zaman Gereklidir?</h2>
                        <p>Bina asansörü yoksa veya dar ise, merdiven boşluğu eşya geçişine uygun değilse, ağır ve büyük eşyalar (piyano, amerikan kapı buzdolabı vb.) taşınacaksa asansörlü nakliyat en doğru tercihtir.</p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Asansörlü Nakliyat Teklifi</h3>
                            <p className="mb-6 opacity-90">Yüksek katlarda güvenle taşınmak için bizi arayın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

