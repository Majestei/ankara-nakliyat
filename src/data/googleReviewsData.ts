export interface GoogleReviewItem {
    id: string;
    author_name: string;
    author_url?: string;
    profile_photo_url?: string;
    avatar_color: string;
    rating: number;
    relative_time_description: string;
    time: number;
    district: string;
    service: string;
    text: string;
    verifiedGoogle: boolean;
    author_review_count?: number;
    photo_count?: number;
    owner_reply?: { text: string; date: string };
}

export interface GoogleReviewsSummary {
    placeName: string;
    rating: number | null;
    user_ratings_total: number | null;
    rating_breakdown: Record<1 | 2 | 3 | 4 | 5, number> | null;
    googleMapsUrl: string;
    writeReviewUrl: string;
    reviews: GoogleReviewItem[];
}

// No review provenance or business-profile verification is recorded in the
// project. An unavailable rating is unknown, not a zero-star rating. Only a
// successfully retrieved provider response may populate public review content.
export const googleReviewsData: GoogleReviewsSummary = {
    placeName: "Ankara Özdemir Nakliyat",
    rating: null,
    user_ratings_total: null,
    rating_breakdown: null,
    googleMapsUrl: "",
    writeReviewUrl: "",
    reviews: [],
};
