import Link from "next/link";
import { IconSearch } from "@/components/Icons";
import { firmaBilgileri } from "@/data/siteData";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-6 py-24 relative overflow-hidden">
            {/* Arka Plan Dekorasyonu */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-100/50 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <div className="relative inline-block mb-8">
                    <h1 className="text-[150px] md:text-[200px] font-black leading-none text-primary-100">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-primary-500/10 border border-slate-200">
                             <div className="w-20 h-20 bg-primary-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-4 rotate-3 shadow-md">
                                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                             </div>
                        </div>
                    </div>
                </div>
                
                <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 mb-6">Aradığınız Sayfa <br /><span className="text-primary-500">Bulunamadı!</span></h2>
                <p className="text-slate-600 text-lg mb-10 leading-relaxed">
                    Aradığınız adres değişmiş veya tamamen kaldırılmış olabilir. <br className="hidden md:block" /> 
                    Endişelenmeyin, sizi doğru adrese taşıyabiliriz.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/" className="btn-primary w-full sm:w-auto !py-4 !px-8 text-lg flex items-center justify-center gap-2" title="Ana Sayfaya Geri Dön">
                        Ana Sayfaya Dön
                    </Link>
                    <Link href="/hizmetler" className="btn-outline-dark w-full sm:w-auto !py-4 !px-8 text-lg" title="Hizmetlerimize Göz At">
                        Hizmetlerimize Göz At
                    </Link>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-200">
                    <p className="text-slate-500 text-sm mb-4 italic">Yardıma mı ihtiyacınız var?</p>
                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="text-xl font-bold text-slate-900 hover:text-primary-600 transition-colors" title="Bizi Arayın">
                        {firmaBilgileri.phone}
                    </a>
                </div>
            </div>
        </div>
    );
}

