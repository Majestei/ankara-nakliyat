import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Asansörlü Nakliyat: 25. Kata Kadar Hızlı Taşıma",
    description: "Ankara asansörlü nakliyat hizmeti. 25. kata kadar modüler dış cephe asansörüyle çiziksiz, sıfır hasarlı hızlı taşıma. Hemen net fiyat teklifi alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/asansorlu-tasima" },
    openGraph: {
        title: "Ankara Asansörlü Nakliyat: 25. Kata Kadar Hızlı Taşıma",
        description: "Ankara asansörlü nakliyat hizmeti. 25. kata kadar modüler dış cephe asansörüyle çiziksiz, sıfır hasarlı hızlı taşıma. Hemen net fiyat teklifi alın!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/asansorlu-tasima",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Asansörlü Nakliyat: 25. Kata Kadar Hızlı Taşıma",
        description: "Ankara asansörlü nakliyat hizmeti. 25. kata kadar modüler dış cephe asansörüyle çiziksiz, sıfır hasarlı hızlı taşıma. Hemen net fiyat teklifi alın!"
    }
};

import TrustBadgesSection from "@/components/TrustBadgesSection";
import Link from "next/link";

export default function AsansorluTasimaPage() {
    return (
        <>
            <ServiceSchema serviceName="Asansörlü Nakliyat Ankara" serviceDescription="Ankara asansörlü evden eve nakliyat. 25. kata kadar dış cephe asansörü ile güvenli taşıma." serviceType="Asansörlü Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Asansörlü Taşıma", href: "/hizmetler/asansorlu-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">25. Kata Kadar Hidrolik Sistem</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Ankara Asansörlü <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Nakliyat</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Yüksek katlar ve dar merdivenler artık sorun değil! 25. kata kadar modüler dış cephe asansörlerimizle çiziksiz ve %100 güvenli taşıma.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> modüler ve hidrolik dış cephe asansör filosuyla, ev ve ofis eşyalarınızı bina dışından doğrudan araç kasasına indirip yüklüyor. Dar apartman merdivenleri, site bina yönetim yasakları veya küçük bina asansörleri taşınmanıza engel olamaz.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Asansörlü Nakliyat & Kiralama Fiyatları</h2>
                        <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Standart Katlar</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">1 - 5. Kat Arası</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">+2.500 - 3.500 ₺</div>
                                <p className="text-xs text-slate-500">Ev taşıma fiyatına ek asansör bedeli veya saatlik tek seferlik kurulum.</p>
                            </div>
                            <div className="p-6 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 relative">
                                <span className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">En Çok Tercih Edilen</span>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Yüksek Katlar</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">6 - 15. Kat Arası</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">+3.500 - 5.500 ₺</div>
                                <p className="text-xs text-slate-500">Teleskopik 45 metre hidrolik sepetli asansör, operatör dahil.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Ultra Yüksek</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">16 - 25. Kat Arası</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">+5.500 - 8.000 ₺</div>
                                <p className="text-xs text-slate-500">70 metreye kadar erişen ağır yük asansörü ve çift emniyet halatı.</p>
                            </div>
                        </div>

                        <div className="p-6 bg-amber-50 border border-amber-200 rounded-2xl not-prose mb-8">
                            <h3 className="text-lg font-bold text-amber-900 mb-2">🏗️ Mobil Asansör Kiralama Hizmeti</h3>
                            <p className="text-sm text-amber-800 leading-relaxed">
                                Sadece asansör kiralama mı istiyorsunuz? Ankara genelinde mobilya montajcıları, beyaz eşya bayileri, inşaat ustaları veya kendi aracını kiralayan vatandaşlar için <strong>saatlik ve günlük operatörlü mobil nakliyat asansörü kiralama</strong> hizmeti sunuyoruz.
                            </p>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Asansörlü Taşımanın Sağladığı 4 Temel Avantaj</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "25. Kata Kadar Erişim", desc: "Modüler hidrolik ray sistemimiz en dar sokaklardaki rezidans ve yüksek binalara dahi kurulur." },
                                { title: "%50 Daha Hızlı Süreç", desc: "Geleneksel merdiven taşımacılığı 6 saat sürerken asansör sistemiyle 2-3 saatte tamamlanır." },
                                { title: "Sıfır Çizik & Çarpma Garantisi", desc: "Eşyalar bina içi duvarlara ve merdiven korkuluklarına değmediği için hasar sıfırlanır." },
                                { title: "Site Yönetimi ve Komşularla Sorunsuz", desc: "Apartman ortak alanları, bina asansörü ve merdiven boşluğu işgal edilmez, şikayet oluşmaz." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Dış Cephe Asansörü Kurulum Şartları</h2>
                        <ul className="space-y-3">
                            <li>✅ Asansör aracının yanaşabileceği uygun sokak veya site içi otopark alanı</li>
                            <li>✅ Eşyaların geçebileceği uygun balkon kapısı veya geniş açılır salon penceresi</li>
                            <li>✅ Kurulum güzergahında engel teşkil etmeyen yüksek gerilim hattı olmaması</li>
                        </ul>
                        <p className="text-sm text-slate-500 italic">* Ücretsiz ekspertizimiz ile taşınma öncesinde asansör kurulumunun uygunluğu fotoğraflarla ya da yerinde teyit edilir.</p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Ankara Asansörlü Nakliyat Rezervasyonu</h3>
                            <p className="mb-6 opacity-90">Yüksek katlarda sıfır hasar ve sabit fiyat garantisiyle taşınmak için hemen arayın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>

            <TrustBadgesSection />
        </>
    );
}

