import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Ofis Taşıma: Ekipman, Arşiv ve Planlama",
    description: "Ankara ofis taşıma için mobilya, elektronik ekipman ve arşiv listesini hazırlayın. İş takvimi, erişim ve kurulum kapsamına göre teklif alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima" },
    openGraph: {
        title: "Ankara Ofis Taşıma: Ekipman, Arşiv ve Planlama",
        description: "Ankara ofis taşıma için mobilya, elektronik ekipman ve arşiv listesini hazırlayın. İş takvimi, erişim ve kurulum kapsamına göre teklif alın.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Ofis Taşıma: Ekipman, Arşiv ve Planlama",
        description: "Ankara ofis taşıma için mobilya, elektronik ekipman ve arşiv listesini hazırlayın. İş takvimi, erişim ve kurulum kapsamına göre teklif alın.",
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
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">İş Takvimine Göre Planlama</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Ofis & Büro Taşıma</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Ofis mobilyaları, elektronik ekipman ve arşivlerin taşınmasını iş takviminiz, bina erişimi ve kurulum ihtiyaçlarıyla birlikte planlayın.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> ile ofis taşıma planını görüşmeden önce masa ve dolap sayısını, elektronik cihazları ve arşiv kolilerini listeleyin. İşin hangi bölümlerinin ne zaman durabileceğini, bina giriş saatlerini ve yeni ofiste teslimi kontrol edecek kişiyi belirleyin.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Envanterine Göre Teklif Kapsamı</h2>
                        <div className="grid md:grid-cols-3 gap-6 not-prose mb-8">
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Küçük İş Yeri</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">1 - 5 Çalışanlı Ofis</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">Teklif İsteyin</div>
                                <p className="text-xs text-slate-500">Masa, koltuk ve arşiv miktarını belirtin; kolileme, söküm ve kurulumun dahil olup olmadığını sorun.</p>
                            </div>
                            <div className="p-6 bg-primary-50/50 rounded-2xl border-2 border-primary-500/30 relative">
                                <span className="absolute -top-3 right-4 bg-primary-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full">Teklif Kapsamı</span>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Orta Ölçek</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">6 - 15 Çalışanlı Ofis</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">Teklif İsteyin</div>
                                <p className="text-xs text-slate-500">Bölüm bazlı etiketleme, elektroniklerin teslim sorumlusu ve mesai dışı erişim koşullarını planlayın.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">Büyük Kurumsal</span>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Plaza & Şirket Merkezi</h3>
                                <div className="text-2xl font-black text-slate-900 mb-2">Özel Keşif</div>
                                <p className="text-xs text-slate-500">Eşya envanteri, erişim ve zaman planına göre kapsamı ve fiyatı görüşün.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşımasında Kapsamı Netleştirin</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "Elektronik Cihazların Hazırlığı", desc: "Cihaz kapatma, yedekleme ve tekrar devreye alma işlerini kendi IT sorumlunuzla planlayın. Fiziksel taşıma ile teknik kurulumu ayrı işler olarak tekliflendirin." },
                                { title: "Numaralı Arşiv Yönetimi", desc: "Klasörleri raf ve bölüm kodlarıyla listeleyin. Hassas evrakın paketleme, teslim ve erişim sorumlusunu belirleyin." },
                                { title: "Mobilya Demontaj & Montaj", desc: "Sökülecek mobilyaları işaretleyin; tekrar kurulacak parçaların bağlantı elemanlarını ve yeni yerleşim ölçülerini birlikte değerlendirin." },
                                { title: "Hafta Sonu / Gece Taşıma", desc: "Mesai dışı veya hafta sonu taşıma için bina yönetimi, ekip ve tarih uygunluğunu önceden teyit edin." },
                                { title: "Departman Bazlı Etiketleme", desc: "Koliye eski bölüm, yeni oda ve envanter numarası yazın. Renk kodunu yazılı listeyle destekleyin; kişisel verileri dış etikette paylaşmayın." },
                                { title: "Poliçe Kapsamı", desc: "Elektronik cihazlar ve demirbaşlar için varsa poliçenin kapsamını, limitlerini ve istisnalarını inceleyin." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşıma Sürecimiz</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Ön Planlama & Keşif:</strong> Envanter, kat ve erişim bilgilerini paylaşın; yerinde inceleme gerekip gerekmediğini ve koşullarını görüşün.</li>
                            <li><strong>Etiketleme & Kodlama:</strong> Masa, dolap ve kolileri yeni yerleşim planındaki bölüm ve oda kodlarıyla eşleştirin.</li>
                            <li><strong>Profesyonel Paketleme:</strong> Elektronik ve arşiv için uygun ambalajı, malzeme sorumlusunu ve paketleme takvimini önceden belirleyin.</li>
                            <li><strong>Güvenli Lojistik:</strong> Araç ve yükleme yöntemi; eşya hacmi, hassasiyet ve bina erişimine göre görüşülür.</li>
                            <li><strong>Teslim Kontrolü:</strong> Koli ve mobilyaları envanterle karşılaştırın. Kurulum kapsamını ve elektroniklerin çalıştırılma sorumluluğunu ayrı kontrol edin.</li>
                        </ol>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl not-prose">
                            <h3 className="text-2xl font-bold mb-4">Kurumsal Ofis Taşıma Teklifi Alın</h3>
                            <p className="mb-6 opacity-90">Ofis envanteriniz ve iş takviminizle taşıma kapsamını, teslim planını ve güncel fiyatı görüşün.</p>
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

