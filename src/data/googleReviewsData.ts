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
    owner_reply?: {
        text: string;
        date: string;
    };
}

export interface GoogleReviewsSummary {
    placeName: string;
    rating: number;
    user_ratings_total: number;
    rating_breakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    googleMapsUrl: string;
    writeReviewUrl: string;
    reviews: GoogleReviewItem[];
}

export const googleReviewsData: GoogleReviewsSummary = {
    placeName: "Ankara Özdemir Nakliyat - Ankara Evden Eve Nakliyat",
    rating: 5.0,
    user_ratings_total: 11,
    rating_breakdown: {
        5: 11,
        4: 0,
        3: 0,
        2: 0,
        1: 0
    },
    googleMapsUrl: "https://www.google.com/maps/place/Ankara+%C3%96zdemir+Nakliyat+-+Ankara+Evden+Eve+Nakliyat/@39.7535708,32.1973644,9z/data=!3m1!4b1!4m6!3m5!1s0x6e092525bb874c41:0x3bceb88d30a5fe73!8m2!3d39.75438!4d32.856727!16s%2Fg%2F11zb75hrp0",
    writeReviewUrl: "https://www.google.com/maps/place/Ankara+%C3%96zdemir+Nakliyat+-+Ankara+Evden+Eve+Nakliyat/@39.75438,32.856727,17z/data=!4m8!3m7!1s0x6e092525bb874c41:0x3bceb88d30a5fe73!8m2!3d39.75438!4d32.856727!9m1!1b1!16s%2Fg%2F11zb75hrp0",
    reviews: [
        {
            id: "g-maps-1",
            author_name: "Ali Aksoy",
            author_review_count: 2,
            avatar_color: "from-emerald-600 to-green-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Çok memnun kaldım tavsiye ederim herkese çok güzel taşıma oldu herkesin eline sağlık",
            owner_reply: {
                text: "Teşekkürler efendim sağlıklı günler dileriz",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-2",
            author_name: "Bahar Sarıoğlu",
            author_review_count: 1,
            avatar_color: "from-amber-500 to-orange-600",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Profesyonel Ev Taşıma",
            verifiedGoogle: true,
            text: "Profesyonel bir ekiple taşıma yaptırdık  gayet güzel bir işçilik yaptılar biz memnun kaldık sizlere de tavsiye ederim ellerıne sağlık"
        },
        {
            id: "g-maps-3",
            author_name: "Abdurrahman Akdogan",
            author_review_count: 5,
            photo_count: 20,
            avatar_color: "from-blue-600 to-cyan-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Titiz Ev Paketleme & Taşıma",
            verifiedGoogle: true,
            text: "Paketleme muhteşemdi hersey söyledıkleri gibi yaptılar titizlikle esyamızı tasıdılar ellerine sağlık teşekkür ederim",
            owner_reply: {
                text: "Teşekkür ederim, iyi günler dileriz",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-4",
            author_name: "Berk",
            author_review_count: 2,
            avatar_color: "from-purple-600 to-indigo-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Gayet güzel profesyonel bir ekip memnun kaldım tavsıye ederım taşınacak arkadaşlara"
        },
        {
            id: "g-maps-5",
            author_name: "Yasin Biçer",
            author_review_count: 1,
            photo_count: 1,
            avatar_color: "from-teal-600 to-emerald-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Komple Ev Eşyası Taşıma",
            verifiedGoogle: true,
            text: "Ankara özdemir naklıyatla karşılaşmadınızsa  taşındık saymayın  işinin elmini paketlemeden tut kurukumuna kadar cok ilgili arkadaşlar şimdiden hasan ve hüseyin beye teşekür ederim",
            owner_reply: {
                text: "Teşekkür ederim efendim yeni yuvanızda saglıklı günler dileriz",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-6",
            author_name: "Yasin Cetin",
            author_review_count: 1,
            avatar_color: "from-rose-600 to-pink-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Bina İçi & Kat Taşıma",
            verifiedGoogle: true,
            text: "Hasan beye teşekkür ederim -2. Kattan 3. Kata eşyamızı taşıdılar binamızın içi dar olduğu halde hiç bir şeye zarar vermeden taşıdılar çok memnun kaldık gönül rahatlığıyla eşyanızı taşıtabilirsiniz Hasan bey ve ekibine çok teşekkürlerimizi iletiyoruz.",
            owner_reply: {
                text: "Efendim, güzel yorumlarınız için teşekkürler. İyi günler dileriz. Yeni yuvanızda sağlıcakla kalın.",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-7",
            author_name: "Eren Ekinci",
            author_review_count: 2,
            avatar_color: "from-indigo-600 to-blue-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Zamanında ve Titiz Taşımacılık",
            verifiedGoogle: true,
            text: "Zamanlamalarını ve Eşyayı Taşırken Titizliklerini Çok Beğendim Ellerine Sağlık",
            owner_reply: {
                text: "Teşekkürler efendim, iyi günler dileriz.",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-8",
            author_name: "çelebi aykaç",
            author_review_count: 4,
            avatar_color: "from-amber-600 to-yellow-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Paketleme & Süreç Yönetimi",
            verifiedGoogle: true,
            text: "Her detayı titizlikle yöneten paketlemeden,taşımaya kadar bütün süreçlerde işinin ehli olan ayrıca güleryüzlülügü ve samimiyetiyle süreçleri kolay hale getiren Hasan bey'e teşekkür ederim."
        },
        {
            id: "g-maps-9",
            author_name: "Ahmet Ezer",
            author_review_count: 1,
            avatar_color: "from-sky-600 to-blue-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Çok geçerli tercih ederim"
        },
        {
            id: "g-maps-10",
            author_name: "Miya Selçuk",
            author_review_count: 1,
            avatar_color: "from-violet-600 to-fuchsia-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717200000,
            district: "Ankara",
            service: "Ev Taşıma Hizmeti",
            verifiedGoogle: true,
            text: "Hizmetten ve ilgiden çok memnun kaldık, taşınma sürecinde gösterdikleri özen ve hız için ekibe çok teşekkürler."
        },
        {
            id: "g-maps-11",
            author_name: "Süleyman Karataş",
            avatar_color: "from-purple-600 to-indigo-700",
            rating: 5,
            relative_time_description: "Yakın zamanda",
            time: 1722400000,
            district: "Ankara",
            service: "Asansörlü Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "4. kattan 13.kata taşındık memnunuz paketleme çok iyiydi teşekkürler",
            owner_reply: {
                text: "Süleyman Bey bizi tercih ettiğiniz ve güzel yorumunuz için çok teşekkür ederiz. Yeni yuvanızda ailenizle huzur dileriz.",
                date: "1 ay önce"
            }
        }
    ]
};
