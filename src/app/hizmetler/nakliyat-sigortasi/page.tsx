import { Metadata } from "next";
import { firmaBilgileri } from "@/data/siteData";
import ServiceSchema from "@/components/ServiceSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Nakliyat Sigortası Ankara: Poliçe ve Kapsam",
    description: "Nakliyat sigortasında teklif öncesi poliçe kapsamı, limitler, istisnalar ve hasar bildirimi koşullarını görüşün. Taşıma planınız için bilgi alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/nakliyat-sigortasi" },
    openGraph: {
        title: "Nakliyat Sigortası Ankara: Poliçe ve Kapsam",
        description: "Nakliyat sigortasında teklif öncesi poliçe kapsamı, limitler, istisnalar ve hasar bildirimi koşullarını görüşün. Taşıma planınız için bilgi alın.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/nakliyat-sigortasi",
        type: "website"
    },
    twitter: {
        card: "summary_large_image",
        title: "Nakliyat Sigortası Ankara: Poliçe ve Kapsam",
        description: "Nakliyat sigortasında teklif öncesi poliçe kapsamı, limitler, istisnalar ve hasar bildirimi koşullarını görüşün. Taşıma planınız için bilgi alın."
    }
};

export default function NakliyatSigortasiPage() {
    return (
        <>
            <ServiceSchema serviceName="Nakliyat Sigortası" serviceDescription="Taşıma öncesinde varsa nakliyat poliçesinin kapsamı, limitleri ve istisnalarının görüşülmesi." serviceType="Nakliyat Sigortası" />
            <BreadcrumbSchema items={[{ name: "Ana Sayfa", href: "/" }, { name: "Hizmetler", href: "/hizmetler" }, { name: "Nakliyat Sigortası", href: "/hizmetler/nakliyat-sigortasi" }]} />

            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none"><div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div></div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">Hizmetlerimiz</span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">Nakliyat <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Sigortası</span></h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">Taşıma öncesinde varsa poliçenin hangi eşyaları ve aşamaları kapsadığını, limitlerini ve istisnalarını inceleyin.</p>
                </div>
            </section>

            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        <p className="text-xl font-medium text-slate-800"><strong>Ankara Özdemir Nakliyat</strong> ile teklif görüşmesinde poliçe sunulup sunulmadığını ve kapsamını sorun. Bir taşıma teklifi, tek başına bütün eşya ve risklerin sigorta kapsamında olduğu anlamına gelmez; koşulları poliçe üzerinden teyit edin.</p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Poliçede Görüşülecek Başlıklar</h2>
                        <div className="grid md:grid-cols-3 gap-4">
                            {[
                                { title: "Kapsanan Riskler", desc: "Hangi risk ve taşıma aşamalarının poliçede yer aldığını ve hangi durumların hariç tutulduğunu sorun." },
                                { title: "Eşya Listesi", desc: "Hassas veya değerli eşyaları önceden bildirin; kabul koşullarını poliçeden inceleyin." },
                                { title: "Değer ve Limitler", desc: "Beyan edilecek değerleri, teminat limitlerini ve varsa muafiyetleri poliçe düzenleyeniyle görüşün." },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Kapsamı Teyit Edilecek Riskler</h2>
                        <ul className="space-y-3">
                            <li>🛡️ <strong>Taşıma sırasında oluşan hasarlar:</strong> Çizilme, kırılma, ezilme</li>
                            <li>🛡️ <strong>Trafik kazası:</strong> Yolda oluşabilecek kaza durumları</li>
                            <li>🛡️ <strong>Doğal afet:</strong> Sel, deprem, fırtına gibi doğa olayları</li>
                            <li>🛡️ <strong>Hırsızlık:</strong> Taşıma sürecindeki güvenlik riskleri</li>
                            <li>🛡️ <strong>Yangın:</strong> Araç yangını veya depo yangını</li>
                        </ul>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Hasar Tazminat Süreci</h2>
                        <ol className="list-decimal list-inside space-y-4 bg-slate-50 p-8 rounded-2xl border border-slate-200">
                            <li><strong>Hasar Bildirimi:</strong> Bildirim süresini ve istenecek belgeleri geçerli sözleşme ve poliçeden kontrol edin.</li>
                            <li><strong>Eksper İncelemesi:</strong> İnceleme ve belge sürecini poliçeyi düzenleyen kuruluşla görüşün.</li>
                            <li><strong>Değerlendirme:</strong> Talebin kapsam ve koşullara göre nasıl değerlendirileceğini öğrenin.</li>
                            <li><strong>Ödeme:</strong> Varsa kabul edilen talebin ödeme koşullarını ilgili kuruluştan teyit edin.</li>
                        </ol>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Poliçe Koşullarını Görüşün</h3>
                            <p className="mb-6 opacity-90">Teklifiniz için poliçe sunulup sunulmadığını, kapsamı ve istisnaları önceden sorun.</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">Hemen Arayın: {firmaBilgileri.phone}</a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

