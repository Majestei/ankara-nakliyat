import React from "react";
import Link from "next/link";
import { googleReviewsData } from "@/data/googleReviewsData";
import { IconArrow } from "@/components/Icons";

const GoogleGIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24">
        <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24Z"
        />
        <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
        />
        <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
        />
    </svg>
);

export default function GoogleReviewsHomeSection() {
    const featuredReviews = googleReviewsData.reviews.slice(0, 3);

    return (
        <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden border-b border-slate-200/60">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary-100/40 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-sm">
                            <GoogleGIcon className="w-4 h-4" />
                            <span>Ankara Özdemir Nakliyat - Google Haritalar</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-slate-900 tracking-tight">
                            Müşterilerimiz Bizim İçin <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-orange-500">
                                Ne Diyor?
                            </span>
                        </h2>
                    </div>

                    {/* Quick Stat Pill */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-5 shrink-0">
                        <div className="text-3xl font-black text-slate-900">5.0</div>
                        <div>
                            <div className="flex text-amber-400 text-lg">★★★★★</div>
                            <p className="text-xs font-bold text-slate-500">Google Haritalar Puanı</p>
                        </div>
                    </div>
                </div>

                {/* 3 Featured Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {featuredReviews.map((review) => {
                        const initial = review.author_name.charAt(0).toUpperCase();

                        return (
                            <div
                                key={review.id}
                                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${review.avatar_color} text-white font-bold flex items-center justify-center text-sm shadow-sm`}>
                                                {initial}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm">{review.author_name}</h3>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                    <GoogleGIcon className="w-3 h-3" />
                                                    <span className="text-emerald-700 font-semibold">Doğrulanmış Müşteri</span>
                                                    {review.author_review_count && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-slate-600 font-medium">{review.author_review_count} yorum</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex text-amber-400 text-sm">★★★★★</div>
                                    </div>

                                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-700">
                                        <span className="text-primary-600">{review.district}</span>
                                        <span>•</span>
                                        <span>{review.service}</span>
                                    </div>

                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-4">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
                                    <span>Google Haritalar</span>
                                    <span>{review.relative_time_description}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom CTA Row */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/referanslar"
                        className="btn-primary !py-3.5 !px-8 flex items-center gap-3 text-sm font-bold shadow-lg shadow-primary-500/20"
                        title="Tüm Müşteri Yorumlarını Gör"
                    >
                        <span>Tüm 168+ Google Yorumunu İnceleyin</span>
                        <IconArrow className="w-4 h-4" />
                    </Link>

                    <a
                        href={googleReviewsData.writeReviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                        title="Google Haritalar'da Bize Puan Verin"
                    >
                        <GoogleGIcon className="w-4 h-4" />
                        <span>Google&apos;da Puan Verin</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
