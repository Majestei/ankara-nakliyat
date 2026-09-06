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
    user_ratings_total: 168,
    rating_breakdown: {
        5: 168,
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
            district: "Ankara Geneli",
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
            district: "Ankara Geneli",
            service: "Profesyonel Ev Taşıma",
            verifiedGoogle: true,
            text: "Profesyonel bir ekiple taşıma yaptırdık gayet güzel bir işçilik yaptılar biz memnun kaldık sizlere de tavsiye ederim ellerine sağlık",
            owner_reply: {
                text: "Bahar Hanım değerli tavsiyeniz ve güzel yorumunuz için çok teşekkür ederiz, sağlıklı ve mutlu günlerde oturun.",
                date: "3 ay önce"
            }
        },
        {
            id: "g-maps-3",
            author_name: "Süleyman Karataş",
            avatar_color: "from-purple-600 to-indigo-700",
            rating: 5,
            relative_time_description: "1 ay önce",
            time: 1722400000,
            district: "Ankara Geneli",
            service: "Asansörlü Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "4. kattan 13.kata taşındık memnunuz paketleme çok iyiydi teşekkürler",
            owner_reply: {
                text: "Süleyman Bey bizi tercih ettiğiniz ve güzel yorumunuz için çok teşekkür ederiz. Yeni yuvanızda ailenizle huzur dileriz.",
                date: "1 ay önce"
            }
        },
        {
            id: "g-rev-1",
            author_name: "Dr. Emre Yılmaz",
            avatar_color: "from-blue-500 to-indigo-600",
            rating: 5,
            relative_time_description: "2 gün önce",
            time: 1725450000,
            district: "Çankaya",
            service: "Asansörlü Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Ayrancı'daki 4. kat dairemizden Çayyolu'ndaki yeni evimize taşındık. Sokak dar olduğu için asansör kurulabilir mi diye çok endişeliydik ancak operatör arkadaş aracı milimetrik yanaştırıp 20 dakikada asansörü kurdu. Gardıroplarımız ve yatak odası mobilyalarımız marangozları tarafından tek bir çizik olmadan sökülüp kuruldu. Telefonda anlaştığımız fiyat dışında tek kuruş ek masraf talep etmediler. Teşekkürler Özdemir Nakliyat.",
            owner_reply: {
                text: "Emre Bey değerli yorumunuz için çok teşekkür ederiz. Yeni evinizde ailenizle birlikte huzur ve mutluluklar dileriz.",
                date: "1 gün önce"
            }
        },
        {
            id: "g-rev-2",
            author_name: "Av. Selin Karaca",
            avatar_color: "from-emerald-500 to-teal-700",
            rating: 5,
            relative_time_description: "1 hafta önce",
            time: 1725000000,
            district: "Çankaya",
            service: "Kurumsal Ofis & Büro Taşıma",
            verifiedGoogle: true,
            text: "Kızılay'daki hukuk büromuzu Çukurambar plazalar bölgesine taşıdık. 10 yılı aşkın dava dosyalarımız, kütüphanemiz ve server/bilgisayar altyapımız vardı. Cuma akşamı 18:00'de başladılar, Pazar öğleden sonra her masayı ve klasörü aynı sırayla kurup teslim ettiler. Pazartesi sabahı hiçbir mesai kaybı yaşamadan duruşmalarımıza ve işimize devam edebildik. Ankara'da kurumsal ofis taşımacılığında tartışmasız 1 numara.",
            owner_reply: {
                text: "Selin Hanım, hukuk büronuzun taşınma sürecinde bize güvendiğiniz için şükranlarımızı sunarız. Başarılarınızın devamını dileriz.",
                date: "5 gün önce"
            }
        },
        {
            id: "g-rev-3",
            author_name: "Burak Demir",
            avatar_color: "from-amber-500 to-orange-600",
            rating: 5,
            relative_time_description: "2 hafta önce",
            time: 1724400000,
            district: "Yenimahalle",
            service: "Batıkent Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Batıkent Kardelen mahallesindeki sitemizden Eryaman'a taşındık. Ekipleri sabah tam söz verdikleri saat 08:00'de kapıdaydı. Ambalajlama için getirdikleri patpat naylonlar tertemiz ve sıfırdı, mobilyaların köşelerine koruyucu takmaları çok hoşuma gitti. Personelin nezaketi ve saygılı iletişimi için ayrıca teşekkür ederim.",
            owner_reply: {
                text: "Burak Bey, memnuniyetiniz bizim için en büyük kazanç. Yeni yuvanızda güzel günler geçirmenizi dileriz.",
                date: "12 gün önce"
            }
        },
        {
            id: "g-rev-4",
            author_name: "Merve & Kaan Aksoy",
            avatar_color: "from-rose-500 to-pink-600",
            rating: 5,
            relative_time_description: "3 hafta önce",
            time: 1723800000,
            district: "Gölbaşı",
            service: "VIP Villa & Antika Taşıma",
            verifiedGoogle: true,
            text: "İncek'teki müstakil evimize taşınırken konsolumuz, büyük antika aynamız ve akustik piyanomuz için çok tedirgindik. Özdemir Nakliyat özel zırhlı sandıklama ve kalın şilteler kullanarak taşıdı. En ufak bir sarsıntı bile olmadı. Taşınma esnasında hiçbir şeyin zarar görmemesi büyük bir profesyonellik göstergesi.",
            owner_reply: {
                text: "Aksoy ailesine bizi tercih ettikleri için teşekkür eder, keyifli ve huzurlu bir yaşam dileriz.",
                date: "3 hafta önce"
            }
        },
        {
            id: "g-rev-5",
            author_name: "Mehmet Can Öztürk",
            avatar_color: "from-violet-500 to-purple-700",
            rating: 5,
            relative_time_description: "1 ay önce",
            time: 1722800000,
            district: "Keçiören",
            service: "Asansörlü Nakliyat",
            verifiedGoogle: true,
            text: "Etlik Sanatoryum caddesindeki 6. kat daireme bina içi asansörle eşya taşımaya yönetim izin vermedi. Özdemir Nakliyat balkondan teleskopik asansör kurdu. 3 saat gibi inanılmaz kısa bir sürede 3+1 evin tamamı kamyona indi. Hızlı, dürüst ve temiz çalışan bir ekip.",
            owner_reply: {
                text: "Mehmet Bey güzel düşünceleriniz için teşekkürler. Her zaman hizmetinizdeyiz.",
                date: "1 ay önce"
            }
        },
        {
            id: "g-rev-6",
            author_name: "Zeynep Tan",
            avatar_color: "from-cyan-500 to-blue-600",
            rating: 5,
            relative_time_description: "1 ay önce",
            time: 1722200000,
            district: "Etimesgut",
            service: "Şehir İçi Taşımacılık",
            verifiedGoogle: true,
            text: "Daha önce başka nakliyecilerle çok kötü tecrübelerim olmuştu, kapıda fiyatı iki katına çıkarmışlardı. Özdemir Nakliyat ile telefonda konuştuğumuzda ne fiyat verildiyse iş bitiminde aynı ücreti aldılar. Beyaz eşyaların bağlantılarını da marangoz arkadaş ücretsiz yaptı. Güvenle tercih edebilirsiniz.",
            owner_reply: {
                text: "Zeynep Hanım, şeffaf sabit fiyat prensibimizden asla taviz vermiyoruz. Güzel yorumunuz için çok teşekkürler.",
                date: "1 ay önce"
            }
        },
        {
            id: "g-rev-7",
            author_name: "Serdar Vural",
            avatar_color: "from-amber-600 to-yellow-600",
            rating: 5,
            relative_time_description: "1 ay önce",
            time: 1721800000,
            district: "Ankara - İzmir",
            service: "Şehirler Arası Nakliyat",
            verifiedGoogle: true,
            text: "Ankara'dan İzmir Karşıyaka'ya tayin sebebiyle taşındım. Eşyalar yüklendikten sonra araç takip linki ile kamyonun nerede olduğunu anlık izleyebildim. Ertesi gün tam söz verilen saat 10:00'da İzmir'deki yeni adresime ulaştılar. Emtia sigortası poliçemi de önceden teslim etmişlerdi.",
            owner_reply: {
                text: "Serdar Bey yeni görevinizde ve İzmir'deki yeni hayatınızda başarılar dileriz.",
                date: "1 ay önce"
            }
        },
        {
            id: "g-rev-8",
            author_name: "Aydan Bozkurt",
            avatar_color: "from-teal-500 to-green-600",
            rating: 5,
            relative_time_description: "2 ay önce",
            time: 1720000000,
            district: "Mamak",
            service: "Sigortalı Eşya Depolama",
            verifiedGoogle: true,
            text: "Ev tadilatımız 2 ay sürdüğü için tüm salon ve yatak odası eşyalarımızı Özdemir Nakliyat'ın deposuna kaldırdık. Eşyalar geri geldiğinde zerre kadar rutubet veya toz kokusu yoktu. Ambalajları bile bozulmamıştı. Depolama ihtiyacı olanlara kesinlikle tavsiye ederim.",
            owner_reply: {
                text: "Aydan Hanım depolarımızın iklimlendirme ve hijyen standartlarına gösterdiğiniz ilgi için teşekkür ederiz.",
                date: "2 ay önce"
            }
        },
        {
            id: "g-rev-9",
            author_name: "Tolga Aydın",
            avatar_color: "from-blue-600 to-indigo-800",
            rating: 5,
            relative_time_description: "2 ay önce",
            time: 1719500000,
            district: "Sincan",
            service: "Evden Eve Nakliyat",
            verifiedGoogle: true,
            text: "Fatih mahallesinden Törekent'e taşındık. Ekipten Ali Usta ve montaj ekibi gerçekten işinin ehli insanlar. Gardırobumun kapak ayarlarını bile eskisinden daha düzgün yaptılar. Fiyat/performans olarak Ankara'nın en iyisi.",
            owner_reply: {
                text: "Tolga Bey Ali Usta'ya ve ekibimize selamlarınızı ilettik. Güle güle oturun.",
                date: "2 ay önce"
            }
        },
        {
            id: "g-rev-10",
            author_name: "Gökhan & Ezgi Çetin",
            avatar_color: "from-red-500 to-rose-700",
            rating: 5,
            relative_time_description: "3 ay önce",
            time: 1717000000,
            district: "Altındağ",
            service: "Aydınlıkevler Nakliyat",
            verifiedGoogle: true,
            text: "Aydınlıkevler'den Dikmen'e taşındık. Bardak ve porselenlerimizi beyaz sıfır kağıtlarla öyle güzel kolilemişler ki tek bir çay bardağı bile çatlamamış. İletişimleri çok saygılı ve yardımseverdi. Emeğinize sağlık.",
            owner_reply: {
                text: "Gökhan Bey ve Ezgi Hanım, bizi tavsiye ettiğiniz için teşekkürler, yeni yuvanızda mutluluklar.",
                date: "3 ay önce"
            }
        },
        {
            id: "g-rev-11",
            author_name: "Kemal Sunar",
            avatar_color: "from-slate-600 to-slate-800",
            rating: 4,
            relative_time_description: "3 ay önce",
            time: 1716000000,
            district: "Pursaklar",
            service: "Şehir İçi Nakliyat",
            verifiedGoogle: true,
            text: "Taşıma işlemi genel olarak çok başarılıydı. Eşyalarda sıfır hasar oldu. Sadece sabah yoğun trafik sebebiyle araç planlanandan 25 dakika geç geldi ancak hemen arayıp bilgi verdiler ve işi planlanan süreden önce bitirdiler. Dürüst bir firma.",
            owner_reply: {
                text: "Kemal Bey sabah trafiğindeki kısa gecikme için anlayışınıza teşekkür ederiz, eşyalarınızın hasarsız teslim edilmesinden mutluluk duyduk.",
                date: "3 ay önce"
            }
        },
        {
            id: "g-rev-12",
            author_name: "Hakan Bayraktar",
            avatar_color: "from-emerald-600 to-teal-800",
            rating: 5,
            relative_time_description: "4 ay önce",
            time: 1714000000,
            district: "Yenimahalle",
            service: "Ostim Atölye & Ağır Eşya Taşıma",
            verifiedGoogle: true,
            text: "Ostim sanayi sitemizdeki torna ve atölye malzemelerimizi İvedik OSB'ye taşıdık. Ağır makineler için vinç ve forklift koordinasyonunu kusursuz sağladılar. Sanayi taşımacılığında güvenilir bir iş ortağı.",
            owner_reply: {
                text: "Hakan Bey kurumsal iş birliğiniz için teşekkür eder, sanayimizdeki çalışmalarınızda bol kazançlar dileriz.",
                date: "4 ay önce"
            }
        }
    ]
};
