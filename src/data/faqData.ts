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
        answer: "Fiyat; eşya listesi, iki adres arasındaki mesafe, katlar, araç erişimi ve paketleme ya da montaj kapsamına göre değerlendirilir. Bu bilgileri aynı biçimde paylaşarak yazılı teklifleri karşılaştırabilirsiniz."
    },
    {
        id: "f2",
        category: "Fiyatlandırma",
        question: "Taşınma öncesi ekspertiz nedir?",
        answer: "Ekspertiz, eşya miktarının ve bina erişiminin yerinde veya uzaktan değerlendirilmesidir. İncelemenin yöntemi, ücreti ve teklif kapsamını randevu öncesinde teyit edin."
    },
    {
        id: "f3",
        category: "Fiyatlandırma",
        question: "Taşıma günü anlaşılan fiyata ek bir ücret çıkar mı?",
        answer: "Teklifin hangi eşya listesi ve işlemleri kapsadığını yazılı olarak kontrol edin. Sonradan eklenen eşya, değişen adres veya ek hizmet varsa fiyat üzerindeki etkisini işlem öncesinde görüşün."
    },
    {
        id: "s1",
        category: "Süreç & Paketleme",
        question: "Eşyaların paketlenmesini siz mi yapıyorsunuz?",
        answer: "Paketlenmesini istediğiniz eşyaları teklif talebinde belirtin. Kırılacaklar, elektronikler ve mobilyalar için malzeme ile sorumluluk kapsamını ayrı ayrı netleştirin; kişisel belgelerinizi ve değerli küçük eşyalarınızı kendiniz ayırın."
    },
    {
        id: "s2",
        category: "Süreç & Paketleme",
        question: "Mobilyaların söküm ve kurulum işlemleri kime ait?",
        answer: "Söküm ve kurulum gerektiren mobilyaların listesini önceden paylaşın. Montajın teklife dahil olup olmadığını, özel bağlantı veya duvar sabitlemesi gerekip gerekmediğini görüşün."
    },
    {
        id: "s3",
        category: "Süreç & Paketleme",
        question: "Taşınma işlemi ne kadar sürüyor?",
        answer: "Süre; eşya miktarı, paketleme, katlar, yükleme erişimi, mesafe ve montaja göre değişir. Planlanan başlangıç ve teslim aralığını teklif aşamasında görüşün."
    },
    {
        id: "s4",
        category: "Süreç & Paketleme",
        question: "Kıyafetlerim için ayrı bir koli hazırlamam gerekiyor mu?",
        answer: "Askılı kıyafetlerinizi nasıl hazırlayacağınızı ve taşıma için hangi ambalajın kullanılacağını önceden sorun. Kendi kolilerinizi hazırlıyorsanız içeriği ve ait olduğu odayı etiketleyin."
    },
    {
        id: "g1",
        category: "Sigorta & Güvenlik",
        question: "Taşıma sırasında eşyalarıma zarar gelirse ne olur?",
        answer: "Hasarı fotoğraflarla kaydedin ve teslim sırasında yazılı olarak bildirin. Sigorta varsa teminat, istisnalar, limitler ve başvuru süreci ilgili poliçeye göre değerlendirilir; bütün hasarların otomatik karşılanacağı varsayılmamalıdır."
    },
    {
        id: "g2",
        category: "Sigorta & Güvenlik",
        question: "Sözleşmeli mi çalışıyorsunuz?",
        answer: "Taşıma öncesinde eşya listesi, adresler, tarih, fiyat ve dahil işlemlerin yazılı olarak netleştirilmesini isteyin. Varsa sigorta poliçesini ve sorumluluk şartlarını ayrıca inceleyin."
    },
    {
        id: "a1",
        category: "Asansörlü Taşıma",
        question: "Dış cephe asansörü her binaya kurulabilir mi?",
        answer: "Her bina uygun değildir. Kat yüksekliği, bina cephesi, zemin, araç park alanı, çevredeki engeller ve gerekli izinler birlikte değerlendirilmelidir. Kurulum uygunluğu ve ekipman kapasitesi önceden teyit edilir."
    },
    {
        id: "a2",
        category: "Asansörlü Taşıma",
        question: "Asansörlü nakliyatın avantajları nelerdir?",
        answer: "Uygun binalarda dış cephe asansörü, büyük eşyaların dar merdivenlerden geçirilme ihtiyacını azaltabilir. Güvenli kurulum, eşyanın sabitlenmesi ve hava koşullarının değerlendirilmesi yine gerekir."
    },
    {
        id: "o1",
        category: "Tümü",
        question: "Şehirler arası nakliyat hizmetiniz var mı?",
        answer: "Ankara çıkışlı şehirler arası taşınma için varış adresini, eşya listesini ve tercih ettiğiniz tarihi paylaşabilirsiniz. Güzergâh uygunluğu, araç planı ve teslim aralığı teklif öncesinde teyit edilir."
    },
    {
        id: "o2",
        category: "Tümü",
        question: "Taşınma tarihi için ne kadar önceden randevu almalıyım?",
        answer: "Tarihiniz belli olur olmaz iletişime geçin. Özellikle bina yönetimi izni, asansör kurulumu veya şehirler arası plan gerektiren taşınmalarda uygunluğu erken görüşmek hazırlık için zaman sağlar."
    }
];
