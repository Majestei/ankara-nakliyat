import Link from "next/link";
import { IconArrow } from "@/components/Icons";

export default function GoogleReviewsHomeSection() {
    return (
        <section className="py-24 md:py-36 bg-slate-50 relative overflow-hidden border-b border-slate-200/60">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-100/50 rounded-full blur-[140px] pointer-events-none" />
            <div className="container-custom relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4 max-w-3xl">
                        <span className="inline-flex px-5 py-2 rounded-full bg-white border border-slate-200/80 text-xs font-bold text-slate-700 shadow-sm">Taşınma öncesi iletişim</span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-slate-900 tracking-tighter leading-tight">
                            Taşınma Planınızı <br />
                            <span className="font-serif text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-orange-500 to-amber-500 italic font-normal">Birlikte Netleştirelim</span>
                        </h2>
                        <p className="text-slate-600 leading-relaxed">Eşya listesi, iki adresin kat bilgisi ve taşınma tarihinizle iletişime geçin. Hizmet kapsamı ve teklif koşullarını taşınma öncesinde görüşün.</p>
                    </div>
                    <Link href="/iletisim" className="btn-primary !py-4 !px-8 rounded-full flex items-center gap-3 text-xs md:text-sm font-black uppercase tracking-wider shadow-lg shadow-primary-500/25 shrink-0">
                        <span>Taşınmayı Görüşün</span><IconArrow className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
