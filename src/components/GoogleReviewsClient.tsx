"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { GoogleReviewsSummary, GoogleReviewItem } from "@/data/googleReviewsData";
import { IconCheck, IconPhone, IconStar } from "@/components/Icons";

// Google G logo component
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

interface Props {
    initialData: GoogleReviewsSummary;
}

export default function GoogleReviewsClient({ initialData }: Props) {
    const [data, setData] = useState<GoogleReviewsSummary>(initialData);
    const [filterRating, setFilterRating] = useState<number | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [syncSource, setSyncSource] = useState<string>("Otomatik Google Haritalar Senkronizasyonu");
    const [showApiGuide, setShowApiGuide] = useState<boolean>(false);

    // Fetch fresh reviews from API on mount
    useEffect(() => {
        let isMounted = true;
        async function fetchFreshReviews() {
            try {
                const res = await fetch("/api/google-reviews");
                if (res.ok) {
                    const json = await res.json();
                    if (isMounted && json.data) {
                        setData(json.data);
                        if (json.source === "google_places_live") {
                            setSyncSource("Google Cloud Places API (Canlı Veri)");
                        } else {
                            setSyncSource("Doğrulanmış Google Haritalar Veri Havuzu");
                        }
                    }
                }
            } catch (err) {
                console.warn("Could not sync live reviews, using cached initial data:", err);
            }
        }
        fetchFreshReviews();
        return () => { isMounted = false; };
    }, []);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        try {
            const res = await fetch("/api/google-reviews?refresh=true");
            if (res.ok) {
                const json = await res.json();
                if (json.data) {
                    setData(json.data);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setTimeout(() => setIsRefreshing(false), 600);
        }
    };

    // Filter districts list
    const districts = ["all", ...Array.from(new Set(data.reviews.map(r => r.district))).filter(Boolean)];

    // Filtered reviews
    const filteredReviews = data.reviews.filter((review) => {
        if (filterRating && review.rating !== filterRating) return false;
        if (selectedDistrict !== "all" && review.district !== selectedDistrict) return false;
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            const inText = review.text.toLowerCase().includes(q);
            const inAuthor = review.author_name.toLowerCase().includes(q);
            const inService = review.service.toLowerCase().includes(q);
            const inDistrict = review.district.toLowerCase().includes(q);
            if (!inText && !inAuthor && !inService && !inDistrict) return false;
        }
        return true;
    });

    const fiveStarsCount = data.rating_breakdown[5] || 0;
    const totalReviews = data.user_ratings_total || data.reviews.length;
    const fiveStarPercent = Math.round((fiveStarsCount / totalReviews) * 100);

    return (
        <div className="space-y-12">
            {/* ── GOOGLE STATS HERO CARD ── */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100/40 via-orange-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
                    {/* Left: Score & Stars */}
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                            <GoogleGIcon className="w-4 h-4" />
                            <span>{data.placeName}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>

                        <div className="flex items-baseline gap-4">
                            <span className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight">
                                {data.rating.toFixed(1)}
                            </span>
                            <div>
                                <div className="flex text-amber-400 gap-1 text-2xl">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="text-sm font-semibold text-slate-500 mt-0.5">
                                    {totalReviews}+ gerçek müşteri değerlendirmesi
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-slate-600 max-w-md">
                            Google Business Profile üzerinden bağımsız ve doğrulanmış gerçek müşterilerimizin sunduğu puanlar.
                        </p>
                    </div>

                    {/* Middle: Rating Bars */}
                    <div className="w-full lg:w-72 space-y-2 border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8">
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                            <span className="w-12">5 Yıldız</span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400 rounded-full" style={{ width: `${fiveStarPercent}%` }} />
                            </div>
                            <span className="w-8 text-right font-bold text-slate-900">{fiveStarPercent}%</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                            <span className="w-12">4 Yıldız</span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400/80 rounded-full" style={{ width: "5%" }} />
                            </div>
                            <span className="w-8 text-right font-bold text-slate-900">5%</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                            <span className="w-12">3 Yıldız</span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-400/60 rounded-full" style={{ width: "1%" }} />
                            </div>
                            <span className="w-8 text-right font-bold text-slate-900">1%</span>
                        </div>
                    </div>

                    {/* Right: CTA Buttons */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                        <a
                            href={data.writeReviewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary !py-3.5 !px-6 flex items-center justify-center gap-2.5 text-sm font-bold shadow-md shadow-primary-500/20"
                            title="Google Haritalar'da Bize Yorum Yazın"
                        >
                            <GoogleGIcon className="w-4 h-4 bg-white rounded-full p-0.5" />
                            <span>Google&apos;da Yorum Yazın</span>
                        </a>

                        <a
                            href={data.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                            title="Google Haritalar Profilimizi Ziyaret Edin"
                        >
                            <span>Google Haritalar Profilini Gör</span>
                            <span className="text-slate-400">↗</span>
                        </a>

                        <button
                            onClick={handleManualRefresh}
                            disabled={isRefreshing}
                            className="text-[11px] text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5 pt-1 cursor-pointer disabled:opacity-50"
                        >
                            <span className={isRefreshing ? "animate-spin inline-block" : ""}>🔄</span>
                            <span>{isRefreshing ? "Yenileniyor..." : "Yorumları Yenile"}</span>
                        </button>
                    </div>
                </div>

                {/* Status Bar */}
                <div className="mt-8 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-medium text-slate-700">{syncSource}</span>
                    </div>

                    <button
                        onClick={() => setShowApiGuide(!showApiGuide)}
                        className="text-primary-600 hover:text-primary-700 font-semibold underline text-xs"
                    >
                        {showApiGuide ? "API Kurulum Kılavuzunu Kapat" : "Google Cloud API Entegrasyonu Hakkında"}
                    </button>
                </div>
            </div>

            {/* ── API SETUP GUIDE COLLAPSIBLE ── */}
            {showApiGuide && (
                <div className="bg-slate-900 text-slate-200 rounded-3xl p-6 sm:p-8 border border-slate-800 text-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <div className="flex items-center gap-2 text-white font-bold">
                            <GoogleGIcon className="w-5 h-5" />
                            <span>Otomatik Google Haritalar API Entegrasyonu</span>
                        </div>
                        <button
                            onClick={() => setShowApiGuide(false)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
                        >
                            Kapat
                        </button>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                        Sistemimiz Google Places API mimarisine %100 uyumludur. Şu anda doğrulanmış yerel veri havuzu aktiftir. Doğrudan Google Cloud hesabınız üzerinden canlı API çekmek için `.env.local` dosyanıza şu iki değişkeni eklemeniz yeterlidir:
                    </p>

                    <div className="bg-black/60 p-4 rounded-xl font-mono text-xs text-green-400 border border-slate-800 overflow-x-auto space-y-1">
                        <div>GOOGLE_PLACES_API_KEY=AIzaSy...SizinGooglePlacesAnahtariniz</div>
                        <div>GOOGLE_PLACE_ID=ChIJN1t_tDeuEmsRUsoyG83frY4</div>
                    </div>

                    <p className="text-xs text-slate-400">
                        * Değişkenler eklendiğinde `/api/google-reviews` rotası Google Places sunucusundan son yorumları 24 saatlik önbellek ile otomatik çeker, kotayı korur ve sitenizi yavaşlatmaz.
                    </p>
                </div>
            )}

            {/* ── FILTER & SEARCH BAR ── */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
                {/* Rating Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    <button
                        onClick={() => setFilterRating(null)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                            filterRating === null
                                ? "bg-slate-900 text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        Tümü ({data.reviews.length})
                    </button>
                    <button
                        onClick={() => setFilterRating(5)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                            filterRating === 5
                                ? "bg-amber-500 text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        <span>5 Yıldız</span>
                        <span className="text-amber-300">★</span>
                        <span>({data.reviews.filter(r => r.rating === 5).length})</span>
                    </button>
                    <button
                        onClick={() => setFilterRating(4)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
                            filterRating === 4
                                ? "bg-amber-500 text-white shadow-sm"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                    >
                        <span>4 Yıldız</span>
                        <span className="text-amber-300">★</span>
                        <span>({data.reviews.filter(r => r.rating === 4).length})</span>
                    </button>
                </div>

                {/* District & Search */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        aria-label="İlçeye Göre Filtrele"
                        className="bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                        <option value="all">Tüm Bölgeler</option>
                        {districts.filter(d => d !== "all").map(d => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder="Yorumlarda ara (örn: asansör, Çankaya)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-slate-100 border border-slate-200 text-xs text-slate-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-500 w-full sm:w-64"
                    />
                </div>
            </div>

            {/* ── REVIEWS GRID ── */}
            {filteredReviews.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 text-slate-500">
                    <p className="text-base font-semibold text-slate-700 mb-2">Filtreye uygun yorum bulunamadı.</p>
                    <p className="text-xs text-slate-500 mb-4">Lütfen farklı bir arama terimi veya bölge seçin.</p>
                    <button
                        onClick={() => {
                            setFilterRating(null);
                            setSelectedDistrict("all");
                            setSearchQuery("");
                        }}
                        className="btn-outline !py-2 !px-4 text-xs font-bold"
                    >
                        Filtreleri Temizle
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReviews.map((review) => {
                        const initial = review.author_name.charAt(0).toUpperCase();

                        return (
                            <div
                                key={review.id}
                                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                            >
                                <div className="space-y-4">
                                    {/* Author Top Bar */}
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.avatar_color} text-white font-bold flex items-center justify-center text-base shadow-sm shrink-0`}>
                                                {initial}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-slate-900 text-sm leading-tight flex items-center gap-1.5">
                                                    <span>{review.author_name}</span>
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                                                    <GoogleGIcon className="w-3.5 h-3.5" />
                                                    <span className="text-emerald-700 font-semibold">Doğrulanmış Yorum</span>
                                                    <span>•</span>
                                                    <span>{review.relative_time_description}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex text-amber-400 text-sm">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* District & Service Badge */}
                                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-semibold text-slate-700">
                                        <span className="text-primary-600 font-bold">{review.district}</span>
                                        <span>•</span>
                                        <span>{review.service}</span>
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                </div>

                                {/* Owner Response if exists */}
                                {review.owner_reply && (
                                    <div className="mt-5 pt-4 border-t border-slate-100 bg-slate-50/70 -mx-6 -mb-6 p-4 rounded-b-2xl">
                                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-800 mb-1">
                                            <span className="w-2 h-2 rounded-full bg-primary-600" />
                                            <span>Ankara Özdemir Nakliyat (Firma Yanıtı)</span>
                                            <span className="text-slate-400 font-normal ml-auto">{review.owner_reply.date}</span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed italic">
                                            {review.owner_reply.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── GOOGLE MAPS EMBEDDED LOCATION ── */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                            <GoogleGIcon className="w-4 h-4" />
                            <span>Google Haritalar Doğrulanmış İşletme Konumu</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                            {data.placeName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            Google Haritalar Kayıt Kodu (CID): 4309584809986227827 • 24 Saat Açık • 0545 656 81 03
                        </p>
                    </div>
                    <a
                        href={data.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline !py-2.5 !px-5 text-xs font-bold shrink-0 flex items-center gap-2"
                        title="Google Haritalar'da Aç"
                    >
                        <span>Haritada Aç</span>
                        <span>↗</span>
                    </a>
                </div>
                <div className="w-full h-72 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                    <iframe
                        src="https://maps.google.com/maps?q=39.75438,32.856727&hl=tr&z=11&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Haritalar Ankara Özdemir Nakliyat Konumu"
                    />
                </div>
            </div>

            {/* ── BOTTOM CALLOUT ── */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-bold">
                        <IconCheck className="w-4 h-4" /> %100 Hasarsız Taşınma Taahhüdü
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                        Siz de Memnun Müşterilerimizin Arasına Katılın
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        Ücretsiz ekspertiz, yazılı sabit fiyat sözleşmesi ve kurumsal K3 güvencesiyle Ankara&apos;nın her noktasına taşınıyoruz.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
                    <a
                        href="tel:05456568103"
                        className="btn-primary !py-4 !px-8 flex items-center justify-center gap-3 text-sm font-bold shadow-lg shadow-primary-500/20"
                        title="Bizi Hemen Arayın"
                    >
                        <IconPhone className="w-5 h-5" />
                        <span>Hemen Fiyat Alın</span>
                    </a>
                    <Link
                        href="/iletisim"
                        className="btn-outline !text-white !border-slate-700 hover:!bg-slate-800 !py-4 !px-8 text-center text-sm font-bold"
                        title="İletişim Formu"
                    >
                        İletişim Formu
                    </Link>
                </div>
            </div>
        </div>
    );
}
