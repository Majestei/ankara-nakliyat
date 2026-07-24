import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | Ankara Özdemir Nakliyat",
    description: "Ankara Özdemir Nakliyat KVKK aydınlatma metni. 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınız.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/kvkk" },
};

export default function KvkkPage() {
    const sections = [
        {
            title: "1. Veri Sorumlusu",
            content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla ${firmaBilgileri.name} tarafından aşağıda açıklanan kapsamda işlenebilecektir.\n\nTelefon: ${firmaBilgileri.phone}\nE-posta: ${firmaBilgileri.email}`
        },
        {
            title: "2. Kişisel Verilerin İşlenme Amacı",
            content: `Toplanan kişisel verileriniz, KVKK'nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları dahilinde aşağıdaki amaçlarla işlenmektedir:`,
            list: [
                "Nakliyat hizmetlerinin planlanması, organizasyonu ve sunulması",
                "Teklif hazırlanması ve sözleşme süreçlerinin yürütülmesi",
                "Müşteri ilişkileri yönetimi ve iletişim faaliyetlerinin yürütülmesi",
                "Nakliyat sigortası işlemlerinin gerçekleştirilmesi",
                "Faturalandırma ve muhasebe işlemlerinin yürütülmesi",
                "Hizmet kalitesinin ölçülmesi, değerlendirilmesi ve iyileştirilmesi",
                "Yasal düzenlemeler ve mevzuattan kaynaklanan yükümlülüklerin yerine getirilmesi",
                "Talep ve şikâyet süreçlerinin yönetilmesi",
                "İş sağlığı ve güvenliği faaliyetlerinin yürütülmesi",
            ]
        },
        {
            title: "3. İşlenen Kişisel Veri Kategorileri",
            content: `Hizmetlerimiz kapsamında işlenen kişisel veri kategorileri:`,
            list: [
                "Kimlik bilgileri: Ad, soyad, T.C. kimlik numarası (sözleşme için)",
                "İletişim bilgileri: Telefon numarası, e-posta adresi, adres",
                "Müşteri işlem bilgileri: Taşıma talep detayları, eşya envanteri",
                "Fiziksel mekân güvenliği: Güvenlik kamerası görüntüleri (depo alanlarında)",
                "İşlem güvenliği: IP adresi, log kayıtları, çerez bilgileri",
                "Finansal bilgiler: Fatura bilgileri, ödeme kayıtları",
                "Görsel ve işitsel kayıtlar: Telefon görüşme kayıtları, fotoğraflar",
            ]
        },
        {
            title: "4. Kişisel Verilerin Aktarılması",
            content: `KVKK'nın 8. ve 9. maddelerine uygun olarak, kişisel verileriniz aşağıdaki taraflara aktarılabilir:`,
            list: [
                "Sigorta şirketleri: Nakliyat emtea sigortası poliçesi düzenlenmesi amacıyla",
                "İş ortakları: Hizmetin ifası için zorunlu hallerde alt yüklenici firmalar",
                "Kamu kurum ve kuruluşları: Yasal yükümlülükler gereği (Vergi Dairesi, SGK vb.)",
                "Hukuk danışmanları: Hukuki süreçlerin yönetimi amacıyla",
                "Denetim firmaları: Yasal denetim yükümlülükleri kapsamında",
            ]
        },
        {
            title: "5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi",
            content: `Kişisel verileriniz; web sitesi iletişim formu, telefon görüşmeleri, e-posta yazışmaları, yüz yüze görüşmeler ve ekspertiz ziyaretleri aracılığıyla, otomatik ve otomatik olmayan yollarla toplanmaktadır.\n\nVerileriniz KVKK'nın 5. maddesinde belirtilen aşağıdaki hukuki sebeplere dayalı olarak işlenmektedir:`,
            list: [
                "Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması",
                "Veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi",
                "Bir hakkın tesisi, kullanılması veya korunması için zorunlu olması",
                "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri",
                "İlgili kişinin açık rızasının bulunması",
            ]
        },
        {
            title: "6. Veri Saklama Süreleri",
            content: `Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanır:`,
            list: [
                "Sözleşme bilgileri: Sözleşme süresince ve sona ermesinden itibaren 10 yıl",
                "Fatura ve muhasebe kayıtları: 10 yıl (Vergi mevzuatı gereği)",
                "İletişim kayıtları: 3 yıl",
                "Web sitesi çerez verileri: Maksimum 2 yıl",
                "Kamera kayıtları: 30 gün",
                "Telefon görüşme kayıtları: 1 yıl",
            ]
        },
        {
            title: "7. Veri Sahiplerinin Hakları",
            content: `KVKK'nın 11. maddesi gereğince, kişisel veri sahipleri olarak aşağıdaki haklara sahipsiniz:`,
            list: [
                "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
                "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
                "Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme",
                "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme",
                "Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme",
                "KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme",
                "Düzeltme, silme ve yok etme işlemlerinin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme",
                "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
                "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
            ]
        },
        {
            title: "8. Başvuru Yöntemi",
            content: `Yukarıda belirtilen haklarınızı kullanmak için aşağıdaki yöntemlerle bize başvurabilirsiniz:\n\n• E-posta ile: ${firmaBilgileri.email} adresine "KVKK Bilgi Talebi" konulu e-posta göndererek\n• Şahsen: Kimliğinizi ibraz ederek şirketimize bizzat başvurarak\n\nBaşvurularınız en geç 30 (otuz) gün içinde ücretsiz olarak sonuçlandırılacaktır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde, Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınacaktır.`
        },
        {
            title: "9. Güncelleme",
            content: `Bu KVKK Aydınlatma Metni en son Mayıs 2025 tarihinde güncellenmiştir. Şirketimiz, yasal düzenlemelerdeki değişikliklere bağlı olarak bu metni güncelleme hakkını saklı tutar.`
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
                        KVKK <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 italic">Aydınlatma Metni</span>
                    </h1>
                    <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında haklarınız.</p>
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
                            <Link href="/kullanim-sartlari" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                Kullanım Şartları →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

