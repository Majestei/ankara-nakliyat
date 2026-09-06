import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Ofis Taşıma: Kurumsal & Sigortalı Nakliyat",
    description: "Ankara ofis ve iş yeri taşıma hizmeti. IT altyapı güvenliği, arşiv kolileme ve hafta sonu taşıma ile sıfır iş kaybı. Hemen kurumsal teklif alın!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima" },
    openGraph: {
        title: "Ankara Ofis Taşıma: Kurumsal & Sigortalı Nakliyat",
        description: "Ankara ofis ve iş yeri taşıma hizmeti. IT altyapı güvenliği, arşiv kolileme ve hafta sonu taşıma ile sıfır iş kaybı. Hemen kurumsal teklif alın!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Ofis Taşıma: Kurumsal & Sigortalı Nakliyat",
        description: "Ankara ofis ve iş yeri taşıma hizmeti. IT altyapı güvenliği, arşiv kolileme ve hafta sonu taşıma ile sıfır iş kaybı. Hemen kurumsal teklif alın!",
    }
};

import TrustBadgesSection from "@/components/TrustBadgesSection";

export default function OfisTasimaPage() {
    return (
        <>
            <ServiceSchema serviceName="Ankara Ofis Taşıma" serviceDescription="Ankara kurumsal ofis taşıma, IT altyapı güvenliği, arşiv ve mobilya taşıma hizmeti." serviceType="Ofis Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Ofis Taşıma", href: "/hizmetler/ofis-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Kurumsal Çözüm & Sıfır İş Kaybı</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Ofis & Büro Taşıma</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Kurumsal şirketinizi, IT altyapınızı ve arşivinizi hafta sonu veya mesai dışı saatlerde sıfır iş kaybı ile taşıyoruz.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> olarak kurumsal ofis taşıma hizmetimizle şirketinizin taşınma sürecini en az kesinti ile yönetiyoruz. Bilgisayar, sunucu kabinleri, muhasebe evrakları, arşiv dosyaları ve modüler ofis mobilyalarınız kadrolu uzman ekibimizle güvende.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">2026 Ankara Kurumsal Ofis Taşıma Fiyatlandırması</h2>
                        <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Küçük İş Yeri</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">1 - 5 Çalışanlı Ofis</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">12.000 - 18.000 ₺</div>
                                <p className="text-xs text-slate-500">Masa takımları, koltuklar, temel arşiv kolileme ve demonte/monte dahil.</p>
                            </div>
                            <div className="p-6 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 relative">
                                <span className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Popüler Kurumsal</span>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Orta Ölçek</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">6 - 15 Çalışanlı Ofis</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">20.000 - 38.000 ₺</div>
                                <p className="text-xs text-slate-500">Departman bazlı renkli etiketleme, IT altyapı koruma ve hafta sonu taşıma.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Büyük Kurumsal</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Plaza & Şirket Merkezi</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">Özel Keşif</div>
                                <p className="text-xs text-slate-500">Ücretsiz fiziki keşif, detaylı iş planı, sözleşmeli sabit fiyat teklifi.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşıma Hizmet Kapsamımız</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "IT Altyapı ve Sunucu Güvenliği", desc: "Bilgisayar, sunucu ve hassas elektronik cihazlar antistatik hava kanallı korumalarla paketlenir." },
                                { title: "Numaralı Arşiv Yönetimi", desc: "Dosyalar departman ve raf sırasına göre numaralandırılarak yeni ofiste eksiksiz dizilir." },
                                { title: "Mobilya Demontaj & Montaj", desc: "Ofis masaları, yönetici takımları ve bölme paneller profesyonel marangozlarımızca sökülüp kurulur." },
                                { title: "Hafta Sonu / Gece Taşıma", desc: "Şirketinizin mesaisini ve müşteri iletişimini aksatmamak için Cuma akşamı başlayıp Pazartesi sabahı bitiriyoruz." },
                                { title: "Departman Bazlı Etiketleme", desc: "Her departmanın eşyası ve kolisi ayrı renk kodlarıyla etiketlenir, karışıklık yaşanmaz." },
                                { title: "Geniş Teminatlı Kurumsal Sigorta", desc: "Tüm mobilya, teknolojik cihaz ve demirbaşlar taşıma süresince resmi sigorta poliçesi altındadır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşıma Sürecimiz</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Ön Planlama & Keşif:</strong> Ofisinizi ziyaret ederek eşya hacmini, kat durumunu ve zaman çizelgesini belirliyoruz.</li>
                            <li><strong>Etiketleme & Kodlama:</strong> Tüm masa, dolap ve koliler ilgili personelin ismi ve departman koduyla etiketlenir.</li>
                            <li><strong>Profesyonel Paketleme:</strong> Elektronikler statik korumalı balonlu naylonla, dosyalar kilitli kolilerle ambalajlanır.</li>
                            <li><strong>Güvenli Lojistik:</strong> Çelik kapalı kasa araçlarımız ve modüler asansörlerimizle hasarsız taşıma yapılır.</li>
                            <li><strong>Anahtar Teslim Kurulum:</strong> Yeni ofiste mobilyalar monte edilir, masalar yerleştirilir ve kullanıma hazır teslim edilir.</li>
                        </ol>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Kurumsal Ofis Taşıma Teklifi Alın</h3>
                            <p className="mb-6 opacity-90">İş kaybı yaşamadan, profesyonel sözleşmeli ofis taşımacılığı için kurumsal temsilcimizi arayın!</p>
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

