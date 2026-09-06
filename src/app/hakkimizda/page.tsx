import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri, istatistikler } from "@/data/siteData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Hakkımızda",
    description: "Ankara Özdemir Nakliyat'ın evden eve, ofis ve şehirler arası taşıma hizmetleri ile çalışma yaklaşımı hakkında bilgi alın.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hakkimizda" },
    openGraph: {
        title: "Hakkımızda | Ankara Özdemir Nakliyat",
        description: "Taşıma seçeneklerimizi, planlama yaklaşımımızı ve iletişim kanallarımızı inceleyin.",
        url: "https://ankaraozdemirnakliyat.com/hakkimizda",
        type: "website",
        images: [{ url: "https://ankaraozdemirnakliyat.com/og-image.jpg" }],
    },
};

const principles = [
    {
        title: "İhtiyacı netleştirme",
        description: "Adres, kat, eşya hacmi, tarih ve ek hizmet beklentileri teklif öncesinde birlikte değerlendirilir.",
    },
    {
        title: "Taşıma planı",
        description: "Ev, ofis veya parça eşya ihtiyacına göre paketleme ve taşıma adımları belirlenir.",
    },
    {
        title: "Açık iletişim",
        description: "Hizmet kapsamı ve iletişim bilgileri, karar vermeden önce müşteriye açık biçimde sunulur.",
    },
    {
        title: "Doğrulanabilir bilgi",
        description: "Belge, sigorta, fiyat veya garanti gibi ayrıntılar yalnızca doğrulanmış kapsamıyla paylaşılır.",
    },
];

export default function HakkimizdaPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Hakkımızda", href: "/hakkimizda" },
            ]} />

            <main>
                <section className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-20 md:py-28">
                    <div className="container-custom relative z-10 text-center">
                        <p className="mb-4 text-xs font-bold uppercase tracking-wider text-primary-700">Bizi tanıyın</p>
                        <h1 className="mb-5 text-4xl font-black text-slate-900 md:text-6xl">
                            Ankara Özdemir Nakliyat
                        </h1>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-slate-600">
                            Ankara&apos;daki evden eve, ofis, parça eşya ve şehirler arası taşıma talepleri için planlama ve iletişim desteği sunuyoruz.
                        </p>
                    </div>
                </section>

                <section className="border-b border-slate-100 bg-white py-14">
                    <div className="container-custom grid grid-cols-2 gap-8 md:grid-cols-4">
                        {istatistikler.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="mb-2 text-2xl font-black text-primary-600 md:text-4xl">{stat.value}</div>
                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="bg-white py-20 md:py-28">
                    <div className="container-custom max-w-5xl">
                        <div className="mb-14 max-w-3xl">
                            <h2 className="mb-5 text-3xl font-black text-slate-900 md:text-5xl">Çalışma yaklaşımımız</h2>
                            <p className="text-lg leading-relaxed text-slate-600">
                                Her taşınma farklıdır. Bu nedenle hizmet kapsamını, eşya ve adres koşullarını öğrenmeden kesin sonuç, süre veya fiyat iddiasında bulunmuyoruz.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {principles.map((item) => (
                                <article key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                                    <h3 className="mb-3 text-xl font-bold text-slate-900">{item.title}</h3>
                                    <p className="leading-relaxed text-slate-600">{item.description}</p>
                                </article>
                            ))}
                        </div>

                        <div className="mt-14 rounded-3xl bg-gradient-to-br from-primary-600 to-orange-600 p-8 text-center text-white shadow-xl md:p-12">
                            <h2 className="mb-4 text-3xl font-bold">Taşınma ihtiyacınızı konuşalım</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-white/85">
                                Kapsam ve teklif bilgisi için telefonla ulaşabilir veya iletişim formunu kullanabilirsiniz.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="rounded-full bg-white px-8 py-4 font-bold text-primary-700">
                                    {firmaBilgileri.phone}
                                </a>
                                <Link href="/iletisim" className="rounded-full border border-white/30 px-8 py-4 font-bold text-white hover:bg-white/10">
                                    İletişim formu
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
