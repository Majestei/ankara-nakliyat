import { NextResponse } from "next/server";
import { googleReviewsData, GoogleReviewItem, GoogleReviewsSummary } from "@/data/googleReviewsData";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export async function GET() {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const placeId = process.env.GOOGLE_PLACE_ID;
    if (apiKey && placeId) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        try {
            const query = new URLSearchParams({ place_id: placeId, fields: "name,rating,user_ratings_total,reviews,url", language: "tr", key: apiKey });
            const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${query}`, { signal: controller.signal, cache: "no-store" });
            const body = response.ok ? await response.json() : null;
            if (body?.status === "OK" && body.result) {
                const result = body.result;
                const reviews: GoogleReviewItem[] = (result.reviews || [])
                    .filter((review: { rating?: number; time?: number; author_name?: string }) =>
                        Number.isFinite(review.rating) && Number.isFinite(review.time) && typeof review.author_name === "string")
                    .map((review: { author_name: string; author_url?: string; profile_photo_url?: string; rating: number; relative_time_description?: string; time: number; text?: string }, index: number) => ({
                        id: `google-${review.time}-${index}`, author_name: review.author_name,
                        author_url: review.author_url, profile_photo_url: review.profile_photo_url,
                        avatar_color: "from-blue-600 to-indigo-700", rating: review.rating,
                        relative_time_description: review.relative_time_description || "",
                        time: review.time * 1000, district: "", service: "", text: review.text || "",
                        verifiedGoogle: false,
                    }));
                const data: GoogleReviewsSummary = {
                    placeName: result.name || googleReviewsData.placeName,
                    rating: Number.isFinite(result.rating) ? result.rating : null,
                    user_ratings_total: Number.isFinite(result.user_ratings_total) ? result.user_ratings_total : null,
                    rating_breakdown: null,
                    googleMapsUrl: result.url || "", writeReviewUrl: "", reviews,
                };
                return NextResponse.json({ success: true, source: "google_places_live", lastSynced: new Date().toISOString(), data }, {
                    headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=3600" },
                });
            }
        } catch {
            // An unavailable provider must not become a fabricated rating or review.
        } finally { clearTimeout(timeout); }
    }
    return NextResponse.json({ success: false, source: "unavailable", lastSynced: null, data: googleReviewsData }, {
        headers: { "Cache-Control": "no-store" },
    });
}
