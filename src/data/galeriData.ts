// Galeri verileri - fotoğraf ve videoları public/images/galeri/ klasörüne ekleyin
export interface GaleriItem {
    id: string;
    src: string;
    thumbnail?: string; // Video için thumbnail resmi
    alt: string;
    title: string;
    category: string;
    type: "image" | "video"; // Medya türü
}

export const galeriKategorileri = [
    "Tümü",
    "Evden Eve Nakliyat",
    "Ofis Taşıma",
    "Asansörlü Taşıma",
    "Paketleme",
    "Araç Filosu",
    "Ekibimiz",
];

export const galeriItems: GaleriItem[] = [
    { id: "1", src: "/images/galeri/1.webp", alt: "Araç Filomuz", title: "Geniş Araç Filosu", category: "Araç Filosu", type: "image" },
    { id: "2", src: "/images/galeri/2.webp", alt: "Eşya paketleme hizmeti", title: "Eşya Koruma", category: "Paketleme", type: "image" },

    { id: "4", src: "/images/galeri/4.webp", alt: "Nakliyat paketleme süreci", title: "Paketleme Süreci", category: "Paketleme", type: "image" },
    { id: "5", src: "/images/galeri/5.webp", alt: "Profesyonel eşya ambalajlama", title: "Ambalajlama", category: "Paketleme", type: "image" },
    { id: "6", src: "/images/galeri/6.webp", alt: "Özenli eşya taşıma", title: "Özenli Taşıma", category: "Evden Eve Nakliyat", type: "image" },
    { id: "7", src: "/images/galeri/7.webp", alt: "Eşya taşıma hazırlığı", title: "Taşıma Hazırlığı", category: "Evden Eve Nakliyat", type: "image" },
    { id: "8", src: "/images/galeri/8.webp", alt: "Güvenli eşya taşıma", title: "Güvenli Taşıma", category: "Evden Eve Nakliyat", type: "image" },
    { id: "9", src: "/images/galeri/9.webp", alt: "Mobilya paketleme ve koruma", title: "Mobilya Koruma", category: "Paketleme", type: "image" },
    { id: "10", src: "/images/galeri/10.webp", alt: "Nakliyat eşyaları hazır", title: "Taşımaya Hazır", category: "Paketleme", type: "image" },
    { id: "11", src: "/images/galeri/11.webp", alt: "Eşya taşıma operasyonu", title: "Taşıma Operasyonu", category: "Evden Eve Nakliyat", type: "image" },
    { id: "12", src: "/images/galeri/12.webp", alt: "Profesyonel nakliyat hizmeti", title: "Profesyonel Hizmet", category: "Evden Eve Nakliyat", type: "image" },

    { id: "15", src: "/images/galeri/15.webp", alt: "Kapalı kasa araç yükleme", title: "Araç İçi Yükleme", category: "Araç Filosu", type: "image" },
    { id: "16", src: "/images/galeri/16.webp", alt: "Dolap paketleme", title: "Mobilya Paketleme", category: "Paketleme", type: "image" },
    { id: "17", src: "/images/galeri/17.webp", alt: "Beyaz eşya koruması", title: "Eşya Koruma", category: "Paketleme", type: "image" },
    { id: "18", src: "/images/galeri/18.webp", alt: "Araç içi eşya istifi", title: "Düzenli İstifleme", category: "Araç Filosu", type: "image" },
    { id: "19", src: "/images/galeri/19.webp", alt: "Yüksek hacimli eşya", title: "Büyük Eşya Taşıma", category: "Evden Eve Nakliyat", type: "image" },
    { id: "20", src: "/images/galeri/20.webp", alt: "Mobilya söküm ve paket", title: "Mobilya Taşıma", category: "Evden Eve Nakliyat", type: "image" },
    { id: "21", src: "/images/galeri/21.webp", alt: "Nakliye Kamyonumuz", title: "Nakliyat Aracı", category: "Araç Filosu", type: "image" },

    { id: "24", src: "/images/galeri/24.webp", alt: "Masa paketleme", title: "Masa Taşıma", category: "Paketleme", type: "image" },
    { id: "25", src: "/images/galeri/25.webp", alt: "Geniş koltuk takımı", title: "Oturma Grubu Taşıma", category: "Evden Eve Nakliyat", type: "image" },
    { id: "26", src: "/images/galeri/26.webp", alt: "Modern asansörlü sistem", title: "Asansörlü Taşıma", category: "Asansörlü Taşıma", type: "image" },
    
    // Videolar
    { id: "v1", src: "/images/galeri/video.mp4", alt: "Asansörlü taşıma süreci", title: "Asansörlü Taşımacılık", category: "Asansörlü Taşıma", type: "video" },
    { id: "v2", src: "/images/galeri/video-2.mp4", alt: "Eşya paketleme operasyon videosu", title: "Paketleme Operasyonu", category: "Paketleme", type: "video" },
];
