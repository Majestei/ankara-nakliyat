export interface FaqItem {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export const faqCategories = [
    "Tümü",
    "Fiyatlandırma",
    "Süreç & Paketleme",
    "Sigorta & Güvenlik",
    "Asansörlü Taşıma"
];

export const faqData: FaqItem[] = [
    {
        id: "f1",
        category: "Fiyatlandırma",
        question: "Evden eve nakliyat fiyatları neye göre belirleniyor?",
        answer: "Nakliyat fiyatlarımız temelde eşyanızın hacmine (oda sayısı), eski eviniz ile yeni eviniz arasındaki mesafeye ve kat durumuna (asansör ihtiyacı olup olmadığına) göre belirlenir. En doğru fiyatı vermek için ücretsiz ve bağlayıcı olmayan ekspertiz hizmeti sunuyoruz."
    },
    {
        id: "f2",
        category: "Fiyatlandırma",
        question: "Ücretsiz ekspertiz hizmeti nedir?",
        answer: "Taşınma öncesi uzman personelimizin evinize gelerek veya görüntülü arama yoluyla eşyalarınızın durumunu, miktarını ve bina şartlarını incelemesidir. Bu sayede taşıma günü hiçbir sürpriz ek ücretle karşılaşmazsınız."
    },
    {
        id: "f3",
        category: "Fiyatlandırma",
        question: "Taşıma günü anlaşılan fiyata ek bir ücret çıkar mı?",
        answer: "Hayır. Özdemir Nakliyat olarak şeffaf fiyatlandırma politikası uyguluyoruz. Ekspertiz aşamasında belirlenen fiyat, sözleşmeye yazılır ve taşıma günü kesinlikle sürpriz bir ek maliyet çıkarılmaz."
    },
    {
        id: "s1",
        category: "Süreç & Paketleme",
        question: "Eşyaların paketlenmesini siz mi yapıyorsunuz?",
        answer: "Evet, A'dan Z'ye tüm eşyalarınızı biz paketliyoruz. Mobilyalarınız, beyaz eşyalarınız, elektronik aletleriniz ve kırılacak mutfak eşyalarınız profesyonel ekibimiz tarafından darbe emici özel ambalaj malzemeleriyle (patpat naylon, kraft kağıt, streç film) sarılarak güvenle taşınır."
    },
    {
        id: "s2",
        category: "Süreç & Paketleme",
        question: "Mobilyaların söküm ve kurulum işlemleri kime ait?",
        answer: "Evdeki tüm gardırop, yatak, ünite ve yemek masası gibi sökülmesi gereken mobilyalarınız uzman marangoz personelimiz tarafından de-monte edilir. Yeni evinizde ise sizin istediğiniz odalara kurularak teslim edilir."
    },
    {
        id: "s3",
        category: "Süreç & Paketleme",
        question: "Taşınma işlemi ne kadar sürüyor?",
        answer: "Standart 2+1 veya 3+1 bir evin şehir içi taşınma süreci genellikle aynı gün içerisinde sabah başlayıp öğleden sonra veya akşam saatlerinde (ortalama 6-8 saat) tamamlanmaktadır."
    },
    {
        id: "s4",
        category: "Süreç & Paketleme",
        question: "Kıyafetlerim için ayrı bir koli hazırlamam gerekiyor mu?",
        answer: "Hayır. Askılı kıyafetleriniz için araçlarımızda özel portatif askılı dolaplarımız bulunmaktadır. Kıyafetleriniz kırışmadan ve kirlenmeden yeni evinize transfer edilir."
    },
    {
        id: "g1",
        category: "Sigorta & Güvenlik",
        question: "Taşıma sırasında eşyalarıma zarar gelirse ne olur?",
        answer: "Özdemir Nakliyat olarak tüm taşıma işlemlerimizi 'Tam Kapsamlı Nakliyat Emtea Sigortası' ile gerçekleştiriyoruz. Olası bir kaza, hasar veya çizilme durumunda oluşan zararınız sigorta poliçesi kapsamında eksiksiz olarak karşılanır."
    },
    {
        id: "g2",
        category: "Sigorta & Güvenlik",
        question: "Sözleşmeli mi çalışıyorsunuz?",
        answer: "Evet. Taşınma günü öncesinde alınacak hizmetin detaylarını, fiyatı ve sigorta bedelini içeren resmi bir taşıma sözleşmesi imzalıyoruz. Tüm süreç kurumsal güvence altındadır."
    },
    {
        id: "a1",
        category: "Asansörlü Taşıma",
        question: "Dış cephe asansörü her binaya kurulabilir mi?",
        answer: "Modüler dış cephe asansörlerimiz 25. kata kadar ulaşabilmektedir. Kurulum için binanın önünde asansör aracının park edebileceği uygun bir açı ve eşyanın çıkarılacağı uygun bir balkon veya geniş pencere olması yeterlidir. Ekspertiz aşamasında asansör kurulumuna uygunluk kontrol edilir."
    },
    {
        id: "a2",
        category: "Asansörlü Taşıma",
        question: "Asansörlü nakliyatın avantajları nelerdir?",
        answer: "Eşyalarınız bina içi merdivenlerden taşınmadığı için çizilme ve çarpma riski sıfıra iner. Ayrıca apartman sakinlerini rahatsız etmeden, gürültüsüz ve manuel taşımaya göre %50 daha hızlı bir taşıma işlemi gerçekleşir."
    },
    {
        id: "o1",
        category: "Tümü",
        question: "Şehirler arası nakliyat hizmetiniz var mı?",
        answer: "Evet, Ankara merkezli olmak üzere Türkiye'nin 81 iline sigortalı ve profesyonel şehirler arası nakliyat hizmeti sunuyoruz. Şehirler arası taşımalarımızda geniş kapalı kasa araçlarımızı kullanıyoruz."
    },
    {
        id: "o2",
        category: "Tümü",
        question: "Taşınma tarihi için ne kadar önceden randevu almalıyım?",
        answer: "Özellikle hafta sonları ve ay sonları/başları yoğunluk olabildiği için, planladığınız taşınma gününden en az 3 ila 5 gün önce bizimle iletişime geçip rezervasyon yaptırmanızı tavsiye ederiz."
    }
];
