import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { firmaBilgileri } from "@/data/siteData";
import { IconCheck, IconPhone, IconChat, IconArrow } from "@/components/Icons";

export const metadata: Metadata = {
    title: "Teşekkürler | Talebiniz Alındı",
    description: "Teklif talebiniz başarıyla alındı. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function TesekkurlerPage() {
    const phoneClean = firmaBilgileri.phone.replace(/\D/g, "");
    const whatsappNumber = phoneClean.startsWith("0") ? `90${phoneClean.slice(1)}` : (phoneClean.startsWith("90") ? phoneClean : `90${phoneClean}`);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center relative overflow-hidden">
            {/* Google Ads Event snippet for Kişi conversion page */}
            <Script id="google-ads-conversion-page" strategy="afterInteractive">
                {`
                    if (typeof gtag === 'function') {
                        gtag('event', 'conversion', {'send_to': 'AW-18303925044/7zuMCPrFg-ccELT2_pdE'});
                    }
                `}
            </Script>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-500/10 blur-[180px] rounded-full pointer-events-none" />

            <div className="container-custom relative z-10 max-w-2xl text-center px-4">
                <div className="w-24 h-24 bg-emerald-500/20 border-2 border-emerald-500/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20 animate-bounce-short">
                    <IconCheck className="w-12 h-12 text-emerald-400" />
                </div>

                <span className="inline-block px-5 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-black uppercase tracking-widest mb-6">
                    Talebiniz Başarıyla İletildi
                </span>

                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                    Teşekkür Ederiz!
                </h1>

                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                    Nakliyat teklif talebiniz operasyon ekibimize ulaştı. Müşteri temsilcimiz ortalama <strong className="text-white">10-15 dakika içinde</strong> sizi arayarak en uygun fiyat teklifini sunacaktır.
                </p>

                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <a
                        href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`}
                        className="btn-primary flex items-center justify-center gap-3 py-4 px-8 text-base shadow-xl shadow-primary-500/20 hover:scale-105 transition-transform"
                    >
                        <IconPhone className="w-5 h-5" />
                        Hemen Bizi Arayın: {firmaBilgileri.phone}
                    </a>
                    <a
                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Merhaba, web sitenizden teklif formu gönderdim, bilgi alabilir miyim?")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 px-8 rounded-2xl md:rounded-full flex items-center justify-center gap-3 text-base shadow-xl shadow-[#25D366]/20 hover:scale-105 transition-transform"
                    >
                        <IconChat className="w-5 h-5" />
                        WhatsApp&apos;tan Yazın
                    </a>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors"
                >
                    <IconArrow className="w-4 h-4 rotate-180" />
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}
