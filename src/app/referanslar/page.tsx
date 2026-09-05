import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";

export const metadata: Metadata = {
    title: "Doğrulanmış Müşteri Yorumları",
    description: "Ankara Özdemir Nakliyat yalnızca kaynağı ve yayın izni doğrulanmış müşteri yorumlarını yayımlar.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/referanslar" },
    robots: { index: false, follow: true },
};

export default function ReferanslarPage() {
    return (
        <>
            <BreadcrumbSchema items={[
                { name: "Ana Sayfa", href: "/" },
                { name: "Referanslar", href: "/referanslar" },
            ]} />

            <main className="bg-slate-50 py-24 md:py-32 min-h-[70vh]">
                <div className="container-custom max-w-3xl text-center">
                    <p className="text-primary-600 text-sm font-bold uppercase tracking-wider mb-4">
                        Şeffaf yayın politikası
                    </p>
                    <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-950 mb-6">
                        Doğrulanmış müşteri yorumları
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed mb-5">
                        Bu sayfada yalnızca kaynağı doğrulanabilen ve yayın izni bulunan değerlendirmelere yer verilir.
                        Şu anda yayımlanmış bir değerlendirme bulunmuyor.
                    </p>
                    <p className="text-slate-500 leading-relaxed mb-10">
                        İsim, puan veya taşıma sonucu gibi doğrulanmamış bilgiler yayımlamıyoruz.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                            className="rounded-full bg-primary-600 px-7 py-4 font-bold text-white hover:bg-primary-700 transition-colors"
                        >
                            {firmaBilgileri.phone}
                        </a>
                        <Link
                            href="/iletisim"
                            className="rounded-full border border-slate-300 bg-white px-7 py-4 font-bold text-slate-900 hover:border-primary-400 transition-colors"
                        >
                            İletişime geçin
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
