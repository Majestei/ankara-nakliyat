import { Metadata } from "next";
import { firmaBilgileri, istatistikler } from "@/data/siteData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Hakkımızda | Ankara Özdemir Nakliyat - 15+ Yıllık Deneyim",
    description:
        "Ankara Özdemir Nakliyat hakkında. 15+ yıllık deneyim, 10.000+ başarılı taşıma, profesyonel ekip. Ankara'nın güvenilir nakliyat firması hakkında bilgi alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hakkimizda" },
    openGraph: {
        title: "Hakkımızda - Ankara Özdemir Nakliyat",
        description: "15 yılı aşkın deneyimimiz, profesyonel kadromuz ve müşteri odaklı yaklaşımımızla Ankara'nın güvenilir nakliyat firmasıyız.",
        url: "https://ankaraozdemirnakliyat.com/hakkimizda",
        type: "website",
        images: [{ url: "https://ankaraozdemirnakliyat.com/og-image.jpg" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "Hakkımızda - Ankara Özdemir Nakliyat",
        description: "15 yılı aşkın deneyimimiz, profesyonel kadromuz ve müşteri odaklı yaklaşımımızla Ankara'nın güvenilir nakliyat firmasıyız.",
        images: ["https://ankaraozdemirnakliyat.com/og-image.jpg"],
    },
};

export default function HakkimizdaPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hakkımızda", href: "/hakkimizda" },
            ]} />

            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary-100 rounded-full blur-[120px]"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">
                        Bizi Tanıyın
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara Özdemir <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Nakliyat</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        2009&apos;dan bu yana Ankara&apos;nın güvenilir nakliyat markası. 15+ yıllık tecrübe, 10.000+ başarılı taşıma.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-white border-b border-slate-100">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {istatistikler.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl md:text-5xl font-heading font-black text-primary-500 mb-2">{stat.value}</div>
                                <div className="text-sm font-bold text-slate-600 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hikayemiz</h2>
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong>, 2009 yılında Ankara&apos;da küçük bir aile işletmesi olarak kuruldu. Kurucumuzun &quot;Her eşyayı kendi eşyam gibi taşı&quot; felsefesiyle yola çıktık. Bugün 10+ araçlık filomuz, 50-100 kişilik profesyonel ekibimiz ve 10.000&apos;i aşkın başarılı taşıma operasyonuyla Ankara&apos;nın en güvenilir nakliyat firmalarından biri haline geldik.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Misyonumuz</h2>
                        <p>
                            Taşınma sürecini stresli bir deneyimden, güvenli ve keyifli bir geçiş sürecine dönüştürmek. Her müşterimize özel çözümler üreterek, eşyalarını güvenle yeni adreslerine ulaştırmak.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Vizyonumuz</h2>
                        <p>
                            Teknoloji ve müşteri memnuniyetini harmanlanarak Türkiye&apos;nin en güvenilir lojistik markası olmak. Sektörde standartları belirleyen, çevreye duyarlı ve sürdürülebilir bir nakliyat anlayışı geliştirmek.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Neden Biz?</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "🏆 15+ Yıl Deneyim", desc: "2009'dan bu yana kesintisiz, profesyonel nakliyat hizmeti." },
                                { title: "🛡️ %100 Sigortalı", desc: "Tüm taşımalarımız emtia sigortası kapsamındadır." },
                                { title: "📋 K3 Belgeli", desc: "T.C. Ulaştırma Bakanlığı onaylı yetki belgemiz mevcuttur." },
                                { title: "👥 Profesyonel Ekip", desc: "Sürekli eğitim alan, alanında uzman taşıma personeli." },
                                { title: "🚛 Modern Araç Filosu", desc: "GPS takipli, kapalı kasa, bakımlı araçlar." },
                                { title: "⭐ 4.9/5 Google Puanı", desc: "1250+ Google değerlendirmesinde 4.9 ortalama puan." },
                                { title: "📞 7/24 Destek", desc: "Hafta içi, hafta sonu ve tatil günlerinde ulaşılabilir ekip." },
                                { title: "💰 Şeffaf Fiyatlandırma", desc: "Sürpriz ek ücret yok. Ekspertiz sonrası sabit fiyat." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hizmet Alanlarımız</h2>
                        <p>
                            Ankara&apos;nın 25 ilçesinde (Çankaya, Keçiören, Yenimahalle, Etimesgut, Mamak, Sincan, Pursaklar, Altındağ, Gölbaşı ve diğerleri) şehir içi nakliyat hizmetleri veriyoruz. Ayrıca Türkiye&apos;nin 81 iline şehirler arası nakliyat ve uluslararası taşımacılık hizmetleri sunuyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Belgelerimiz ve Sertifikalarımız</h2>
                        <ul className="space-y-3">
                            <li>📋 <strong>K3 Yetki Belgesi:</strong> T.C. Ulaştırma ve Altyapı Bakanlığı onaylı</li>
                            <li>📋 <strong>Ticaret Sicil Kaydı:</strong> Ankara Ticaret Odası üyesi</li>
                            <li>📋 <strong>Vergi Levhası:</strong> Kurumsal vergi mükellefiyeti</li>
                            <li>📋 <strong>Sigorta Anlaşmaları:</strong> Anlaşmalı sigorta şirketleri ile poliçe</li>
                        </ul>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Bize Ulaşın</h3>
                            <p className="mb-6 opacity-90">Taşınma planınız hakkında konuşalım. Ücretsiz keşif ve fiyat teklifi için hemen arayın!</p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                    ☎ {firmaBilgileri.phone}
                                </a>
                                <a href={`tel:${firmaBilgileri.phoneSecondary.replace(/\s/g, "")}`} className="inline-block bg-white/10 backdrop-blur text-white font-bold px-8 py-4 rounded-full border border-white/20 hover:bg-white/20 transition-all">
                                    ☎ {firmaBilgileri.phoneSecondary}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

