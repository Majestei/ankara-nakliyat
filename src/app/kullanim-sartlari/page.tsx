import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Kullanım Şartları | Ankara Özdemir Nakliyat",
    description: "Ankara Özdemir Nakliyat web sitesi kullanım şartları ve koşulları. Hizmet sözleşmesi, sorumluluk sınırları ve yasal bilgiler.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/kullanim-sartlari" },
};

export default function KullanimSartlariPage() {
    const sections = [
        {
            title: "1. Genel Bilgiler",
            content: `Bu web sitesi (ankaraozdemirnakliyat.com), ${firmaBilgileri.name} tarafından işletilmektedir. Web sitemizi kullanarak aşağıda belirtilen kullanım şartlarını kabul etmiş sayılırsınız. Bu şartları kabul etmiyorsanız, lütfen web sitemizi kullanmayınız.`
        },
        {
            title: "2. Hizmet Tanımı",
            content: `${firmaBilgileri.name}, Ankara merkezli olarak aşağıdaki hizmetleri sunmaktadır:`,
            list: [
                "Evden eve nakliyat (şehir içi ve şehirler arası)",
                "Ofis ve iş yeri taşımacılığı",
                "Asansörlü taşıma hizmetleri",
                "Profesyonel paketleme ve ambalajlama",
                "Parça eşya taşıma",
                "Nakliyat sigortası",
                "Ücretsiz ekspertiz ve fiyat teklifi",
            ]
        },
        {
            title: "3. Fiyatlandırma ve Ödeme",
            content: `Hizmet fiyatlarımız; taşınacak eşyanın miktarı, mesafe, kat durumu, asansör ihtiyacı ve ek hizmetlere göre belirlenir. Nihai fiyat, ekspertiz sonrasında yazılı olarak bildirilir ve taşıma sözleşmesine bağlanır.`,
            list: [
                "Ekspertiz aşamasında belirlenen fiyat, sözleşmede sabittir",
                "Sözleşme dışı ek hizmet talepleri ayrıca fiyatlandırılır",
                "Ödeme, taşıma işlemi tamamlandıktan sonra nakit veya havale ile yapılabilir",
                "Fiyat tekliflerinin geçerlilik süresi 7 (yedi) iş günüdür",
            ]
        },
        {
            title: "4. Taşıma Sözleşmesi",
            content: `Tüm taşıma işlemleri öncesinde detaylı bir taşıma sözleşmesi imzalanır. Bu sözleşme; taşınacak eşyaların listesini, taşıma tarihini, fiyatı, sigorta kapsamını ve tarafların yükümlülüklerini içerir.`
        },
        {
            title: "5. Sigorta ve Sorumluluk",
            content: `Taşıma sürecinde eşya güvenliğine ilişkin sorumluluk ve sigorta koşulları:`,
            list: [
                "Tüm taşıma işlemleri emtea sigortası kapsamındadır",
                "Sigorta kapsamı ve bedeli taşıma sözleşmesinde belirtilir",
                "Hasar tespiti, teslim anında karşılıklı olarak tutanağa bağlanır",
                "Teslim sonrası bildirilen hasarlar sigorta kapsamı dışındadır",
                "Müşteri tarafından paketlenen eşyaların iç hasarlarından şirketimiz sorumlu değildir",
                "Doğal afet, savaş, terör gibi mücbir sebepler sorumluluk dışındadır",
            ]
        },
        {
            title: "6. İptal ve Erteleme",
            content: `Taşıma randevusunun iptali veya ertelenmesi aşağıdaki koşullara tabidir:`,
            list: [
                "Taşıma tarihinden en az 48 saat önce yapılan iptallerde herhangi bir ücret alınmaz",
                "48 saatten daha kısa sürede yapılan iptallerde operasyonel hazırlık bedeli talep edilebilir",
                "Erteleme talepleri, müsaitlik durumuna göre değerlendirilir",
                "Hava koşulları nedeniyle şirketimiz tarafından yapılan ertelemeler ücretsizdir",
            ]
        },
        {
            title: "7. Müşterinin Yükümlülükleri",
            content: `Taşınma sürecinin sorunsuz ilerlemesi için müşterilerimizden beklentilerimiz:`,
            list: [
                "Taşınacak eşyaların doğru ve eksiksiz beyanı",
                "Taşıma günü evde yetkili bir kişinin bulunması",
                "Değerli eşyaların (mücevher, nakit, belge vb.) önceden ayrılması",
                "Bina yönetimi ve komşulara gerekli bildirimlerin yapılması",
                "Taşıma aracının park edebileceği uygun alanın sağlanması",
            ]
        },
        {
            title: "8. Web Sitesi Kullanımı",
            content: `Web sitemizin kullanımına ilişkin koşullar:`,
            list: [
                "Sitedeki tüm içerikler (metin, görsel, logo) telif hakkı ile korunmaktadır",
                "İçeriklerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır",
                "Teklif formunda doğru ve güncel bilgi verilmesi gerekmektedir",
                "Site üzerinden yapılan işlemlerde Türkiye Cumhuriyeti hukuku geçerlidir",
            ]
        },
        {
            title: "9. Fikri Mülkiyet Hakları",
            content: `Web sitemizdeki tüm içerikler, tasarımlar, logolar, görseller ve metinler ${firmaBilgileri.name}'e aittir ve 5846 sayılı Fikir ve Sanat Eserleri Kanunu kapsamında korunmaktadır. İzinsiz kullanım halinde yasal işlem başlatılacaktır.`
        },
        {
            title: "10. Uyuşmazlık Çözümü",
            content: `Bu kullanım şartlarından doğabilecek uyuşmazlıklarda Ankara Mahkemeleri ve İcra Daireleri yetkilidir. Taraflar, uyuşmazlıkların öncelikle karşılıklı iyi niyet çerçevesinde çözülmesini taahhüt eder.`
        },
        {
            title: "11. İletişim",
            content: `Kullanım şartları hakkında sorularınız için:\n\nE-posta: ${firmaBilgileri.email}\nTelefon: ${firmaBilgileri.phone}`
        },
        {
            title: "12. Güncelleme",
            content: `Bu Kullanım Şartları en son Mayıs 2025 tarihinde güncellenmiştir. Şirketimiz, bu şartları önceden bildirmeksizin güncelleme hakkını saklı tutar. Güncel şartlar bu sayfada yayınlanır.`
        },
    ];

    return (
        <div className="bg-slate-50 selection:bg-primary-500 selection:text-white">
            <section className="relative pt-40 pb-20 bg-slate-950 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)",
                        backgroundSize: "80px 80px",
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-600/15 blur-[150px] rounded-full pointer-events-none" />
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                        <span className="text-white font-bold text-[10px] uppercase tracking-[0.3em]">Yasal</span>
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tighter leading-none">
                        Kullanım <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 italic">Şartları</span>
                    </h1>
                    <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">Hizmet koşullarımız ve yasal bilgiler.</p>
                </div>
            </section>

            <section className="py-20 -mt-8 relative z-10">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-16 space-y-12">
                        {sections.map((section, i) => (
                            <div key={i} className="space-y-4">
                                <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{section.title}</h2>
                                <p className="text-slate-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                                {section.list && (
                                    <ul className="space-y-2 pl-1">
                                        {section.list.map((item, j) => (
                                            <li key={j} className="flex items-start gap-3 text-slate-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                                                <span className="leading-relaxed">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}

                        <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                            <Link href="/gizlilik-politikasi" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                Gizlilik Politikası →
                            </Link>
                            <Link href="/kvkk" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                KVKK Aydınlatma Metni →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

