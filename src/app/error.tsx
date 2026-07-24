"use client";

import { useEffect } from "react";
import Link from "next/link";
import { IconArrow } from "@/components/Icons";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
            <span className="text-primary-500 font-black text-sm uppercase tracking-[0.4em] mb-6 bg-primary-500/5 px-6 py-2 rounded-full border border-primary-500/10">Sistem Hatası</span>
            <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-6 tracking-tighter">
                Bir Şeyler <span className="text-primary-500 italic font-serif font-normal">Ters Gitti.</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-md mb-10 leading-relaxed">
                İşleminizi gerçekleştirirken beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className="px-8 py-4 bg-primary-500 text-white rounded-full font-bold hover:bg-primary-600 transition-colors shadow-lg shadow-primary-500/30"
                >
                    Tekrar Dene
                </button>
                <Link
                    href="/"
                    className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-3"
                >
                    Ana Sayfaya Dön
                    <IconArrow className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
