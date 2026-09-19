"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GoogleReviewsSummary } from "@/data/googleReviewsData";
import { firmaBilgileri } from "@/data/siteData";
import { IconPhone } from "@/components/Icons";

export default function GoogleReviewsClient({ initialData }: { initialData: GoogleReviewsSummary }) {
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const controller = new AbortController();
        fetch("/api/google-reviews", { signal: controller.signal })
            .then(response => response.ok ? response.json() : null)
            .then(result => {
                if (result?.source === "google_places_live" && result.data) setData(result.data);
            })
            .catch(() => { /* Keep the unavailable state if the provider cannot respond. */ });
        return () => controller.abort();
    }, []);

    return (
        <div className="space-y-12">
            <section className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-slate-200/80 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100/40 via-orange-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Müşteri değerlendirmeleri</h2>
                    {data.rating !== null && data.user_ratings_total !== null ? (
                        <p className="text-slate-600"><strong className="text-4xl font-black text-slate-900">{data.rating.toFixed(1)} / 5</strong> · Google&apos;da {data.user_ratings_total} değerlendirme</p>
                    ) : (
                        <p className="text-slate-600 leading-relaxed">Müşteri değerlendirmeleri şu anda bu sayfada görüntülenemiyor. Taşınma süreci ve hizmet kapsamıyla ilgili sorularınız için bizimle iletişime geçebilirsiniz.</p>
                    )}
                    {data.googleMapsUrl && <a href={data.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex text-primary-600 font-bold underline">Değerlendirmeleri Google Haritalar&apos;da inceleyin</a>}
                </div>
            </section>
            {data.reviews.length > 0 && (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" aria-label="Google değerlendirmeleri">
                    {data.reviews.map(review => (
                        <article key={review.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-200/80 shadow-sm">
                            <div className="flex items-center gap-3.5 mb-4">
                                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${review.avatar_color} text-white font-black flex items-center justify-center shrink-0`}>{review.author_name.charAt(0)}</div>
                                <div>
                                    <h3 className="font-bold text-slate-900">{review.author_url ? <a href={review.author_url} target="_blank" rel="noopener noreferrer" className="underline">{review.author_name}</a> : review.author_name}</h3>
                                    <p className="text-xs text-slate-500">Google · {review.relative_time_description}</p>
                                </div>
                            </div>
                            <p className="text-amber-600 font-bold mb-3">{review.rating} / 5</p>
                            <p className="text-slate-600 text-sm leading-relaxed">{review.text}</p>
                        </article>
                    ))}
                </section>
            )}
            <section className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                    <h2 className="text-2xl sm:text-3xl font-black">Taşınma detaylarını görüşün</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">Eşya miktarı, bina erişimi ve tarih bilgisiyle size uygun taşıma kapsamı hakkında bilgi alın.</p>
                </div>
                <div className="flex flex-col gap-4 shrink-0">
                    <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="btn-primary !py-4 !px-8 flex items-center justify-center gap-3 text-sm font-bold"><IconPhone className="w-5 h-5" />{firmaBilgileri.phone}</a>
                    <Link href="/iletisim" className="text-center text-sm font-bold underline">İletişim Formu</Link>
                </div>
            </section>
        </div>
    );
}
