import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Ankara Ofis Taşıma - Kurumsal Nakliyat Hizmeti",
    description: "Ankara ofis taşıma hizmeti. IT altyapı güvenliği, arşiv taşıma, hafta sonu hizmet, sigortalı. Minimum iş kaybıyla taşının!",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima" },
    openGraph: {
        title: "Ankara Ofis Taşıma - Kurumsal Nakliyat Hizmeti",
        description: "Ankara ofis taşıma hizmeti. IT altyapı güvenliği, arşiv taşıma, hafta sonu hizmet, sigortalı. Minimum iş kaybıyla taşının!",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/ofis-tasima",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Ofis Taşıma - Kurumsal Nakliyat Hizmeti",
        description: "Ankara ofis taşıma hizmeti. IT altyapı güvenliği, arşiv taşıma, hafta sonu hizmet, sigortalı. Minimum iş kaybıyla taşının!",
    }
};

export default function OfisTasimaPage() {
    return (
        <>
            <ServiceSchema serviceName="Ankara Ofis Taşıma" serviceDescription="Ankara kurumsal ofis taşıma, IT altyapı güvenliği, arşiv ve mobilya taşıma hizmeti." serviceType="Ofis Taşıma" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Ofis Taşıma", href: "/hizmetler/ofis-tasima" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Ankara <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Ofis Taşıma</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Kurumsal ofisinizi minimum iş kaybı ile profesyonelce taşıyoruz.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800">
                            <strong>Ankara Özdemir Nakliyat</strong> olarak kurumsal ofis taşıma hizmetimizle şirketinizin taşınma sürecini en az kesinti ile yönetiyoruz. Bilgisayar, sunucu, arşiv dosyaları ve ofis mobilyalarınız uzman ekibimizle güvende.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşıma Hizmet Kapsamımız</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { title: "IT Altyapı Güvenliği", desc: "Bilgisayar, sunucu ve hassas elektronik cihazlar statik korumalı malzemelerle taşınır." },
                                { title: "Arşiv Yönetimi", desc: "Dosyalar numaralandırılarak yeni ofiste aynı düzende yerleştirilir." },
                                { title: "Mobilya Demontaj/Montaj", desc: "Ofis masaları, bölme sistemleri ve dolaplar uzman ekibimizce sökülüp kurulur." },
                                { title: "Hafta Sonu / Gece Taşıma", desc: "İş kaybını önlemek için mesai dışı saatlerde taşıma imkanı." },
                                { title: "Departman Etiketleme", desc: "Her departmanın eşyası ayrı renklerle etiketlenerek karışıklık önlenir." },
                                { title: "Sigortalı Taşıma", desc: "Kurumsal eşyalarınızın tamamı emtia sigortası kapsamındadır." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Ofis Taşıma Sürecimiz</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Ön Planlama:</strong> Ofisinizi ziyaret ederek taşıma planı ve zaman çizelgesi hazırlıyoruz.</li>
                            <li><strong>Etiketleme:</strong> Tüm eşyalar departman bazlı etiketlenir.</li>
                            <li><strong>Paketleme:</strong> Elektronikler statik korumalı, dosyalar özel kolilerde paketlenir.</li>
                            <li><strong>Taşıma:</strong> Kapalı kasa araçlarla güvenli taşıma gerçekleştirilir.</li>
                            <li><strong>Kurulum:</strong> Yeni ofiste mobilyalar kurulur, IT ekibinizle koordineli yerleştirme yapılır.</li>
                        </ol>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Kurumsal Ofis Taşıma Teklifi</h3>
                            <p className="mb-6 opacity-90">Ofisinizi minimum kesinti ile taşımak için hemen arayın!</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                Hemen Arayın: {firmaBilgileri.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

