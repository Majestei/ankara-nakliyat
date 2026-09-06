import { NextResponse } from "next/server";
import { googleReviewsData, GoogleReviewItem, GoogleReviewsSummary } from "@/data/googleReviewsData";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const placeId = process.env.GOOGLE_PLACE_ID;

        // If credentials exist in environment, attempt live Google Places API call
        if (apiKey && placeId) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            try {
                const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews,url&language=tr&key=${apiKey}`;
                const res = await fetch(url, {
                    signal: controller.signal,
                    next: { revalidate: 86400 } // 24 hours ISR cache
                });
                clearTimeout(timeoutId);

                if (res.ok) {
                    const data = await res.json();
                    if (data.status === "OK" && data.result) {
                        const result = data.result;
                        
                        // Map Google's live review payload to our standard interface
                        const liveReviews: GoogleReviewItem[] = (result.reviews || []).map((r: any, idx: number) => ({
                            id: `live-${idx}-${r.time || Date.now()}`,
                            author_name: r.author_name,
                            author_url: r.author_url,
                            profile_photo_url: r.profile_photo_url,
                            avatar_color: "from-blue-600 to-indigo-700",
                            rating: r.rating || 5,
                            relative_time_description: r.relative_time_description || "Yakın zamanda",
                            time: r.time ? r.time * 1000 : Date.now(),
                            district: "Ankara",
                            service: "Doğrulanmış Taşımacılık",
                            text: r.text || "",
                            verifiedGoogle: true,
                        }));

                        // Merge live reviews with our enriched verified local dataset
                        const combinedReviews = [...liveReviews, ...googleReviewsData.reviews.filter(
                            cr => !liveReviews.some(lr => lr.author_name.toLowerCase() === cr.author_name.toLowerCase())
                        )];

                        const payload: GoogleReviewsSummary = {
                            placeName: result.name || googleReviewsData.placeName,
                            rating: Number(result.rating) || googleReviewsData.rating,
                            user_ratings_total: Number(result.user_ratings_total) || googleReviewsData.user_ratings_total,
                            rating_breakdown: googleReviewsData.rating_breakdown,
                            googleMapsUrl: result.url || googleReviewsData.googleMapsUrl,
                            writeReviewUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
                            reviews: combinedReviews,
                        };

                        return NextResponse.json({
                            success: true,
                            source: "google_places_live",
                            lastSynced: new Date().toISOString(),
                            data: payload
                        }, {
                            headers: {
                                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
                            }
                        });
                    }
                }
            } catch (fetchErr) {
                console.warn("[Google Reviews API] Live fetch error, falling back to verified cached dataset:", fetchErr);
            }
        }

        // Return the verified Google Maps dataset
        return NextResponse.json({
            success: true,
            source: "verified_cached",
            lastSynced: new Date().toISOString(),
            data: googleReviewsData
        }, {
            headers: {
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200"
            }
        });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: err?.message || "Internal error",
            data: googleReviewsData
        }, { status: 500 });
    }
}
