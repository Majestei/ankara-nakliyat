import { Metadata } from "next";
import Link from "next/link";
import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Gizlilik Politikası | Ankara Özdemir Nakliyat",
    description: "Ankara Özdemir Nakliyat gizlilik politikası. Kişisel verilerinizin nasıl toplandığını, işlendiğini ve korunduğunu öğrenin.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
    const sections = [
        {
            title: "1. Giriş",
            content: `${firmaBilgileri.name} ("Şirket", "biz") olarak, web sitemizi (ankaraozdemirnakliyat.com) ziyaret eden ve hizmetlerimizden yararlanan kullanıcılarımızın ("siz", "kullanıcı") gizliliğine büyük önem veriyoruz. Bu Gizlilik Politikası, kişisel verilerinizin nasıl toplandığını, işlendiğini, saklandığını ve korunduğunu açıklamaktadır.`
        },
        {
            title: "2. Toplanan Veriler",
            content: `Hizmetlerimizi sunabilmek amacıyla aşağıdaki kişisel verileri toplayabiliriz:`,
            list: [
                "Ad, soyad ve iletişim bilgileri (telefon numarası, e-posta adresi)",
                "Adres bilgileri (taşınma yapılacak mevcut ve yeni adres)",
                "Taşınacak eşya bilgileri ve fotoğrafları",
                "Teklif talep formunda paylaşılan bilgiler",
                "Web sitesi kullanım verileri (çerezler, IP adresi, tarayıcı bilgileri)",
                "Telefon görüşmesi kayıtları (hizmet kalitesi amacıyla)",
            ]
        },
        {
            title: "3. Verilerin Kullanım Amaçları",
            content: `Topladığımız kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:`,
            list: [
                "Nakliyat hizmetlerinin planlanması ve yürütülmesi",
                "Fiyat teklifi hazırlanması ve ekspertiz hizmeti sunulması",
                "Müşteri ile iletişim kurulması ve bilgilendirme yapılması",
                "Sigorta işlemlerinin gerçekleştirilmesi",
                "Yasal yükümlülüklerin yerine getirilmesi",
                "Hizmet kalitesinin artırılması ve müşteri memnuniyeti analizi",
                "Web sitesi deneyiminin iyileştirilmesi",
            ]
        },
        {
            title: "4. Verilerin Paylaşılması",
            content: `Kişisel verileriniz, aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:`,
            list: [
                "Sigorta şirketleri (nakliyat sigortası işlemleri için)",
                "Yasal zorunluluklar gereği yetkili kamu kurum ve kuruluşları",
                "Hizmetin ifası için zorunlu olan iş ortakları (alt yükleniciler)",
                "Açık rızanızın bulunduğu durumlar",
            ]
        },
        {
            title: "5. Çerezler (Cookies)",
            content: `Web sitemizde kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanılmaktadır. Çerezler, tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. Kullandığımız çerez türleri:`,
            list: [
                "Zorunlu çerezler: Sitenin düzgün çalışması için gerekli çerezler",
                "Analitik çerezler: Ziyaretçi istatistiklerini ölçmek için kullanılan çerezler",
                "İşlevsel çerezler: Tercihlerinizi hatırlamak için kullanılan çerezler",
            ]
        },
        {
            title: "6. Veri Güvenliği",
            content: `Kişisel verilerinizin güvenliğini sağlamak için endüstri standartlarına uygun teknik ve idari tedbirler alınmaktadır. Verileriniz, yetkisiz erişim, kayıp veya değiştirilmeye karşı SSL şifreleme, güvenlik duvarları ve erişim kontrol mekanizmaları ile korunmaktadır.`
        },
        {
            title: "7. Veri Saklama Süresi",
            content: `Kişisel verileriniz, toplama amacının gerektirdiği süre boyunca ve yasal yükümlülüklerimiz çerçevesinde saklanmaktadır. Saklama süresinin sona ermesinin ardından verileriniz güvenli bir şekilde silinir veya anonim hale getirilir.`
        },
        {
            title: "8. Haklarınız",
            content: `6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aşağıdaki haklara sahipsiniz:`,
            list: [
                "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
                "İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
                "Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme",
                "Eksik veya yanlış işlenmiş verilerin düzeltilmesini isteme",
                "Verilerin silinmesini veya yok edilmesini isteme",
                "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
                "Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme",
            ]
        },
        {
            title: "9. İletişim",
            content: `Gizlilik politikamız hakkında sorularınız veya talepleriniz için bizimle iletişime geçebilirsiniz:\n\nE-posta: ${firmaBilgileri.email}\nTelefon: ${firmaBilgileri.phone}`
        },
        {
            title: "10. Politika Güncellemeleri",
            content: `Bu Gizlilik Politikası en son Mayıs 2025 tarihinde güncellenmiştir. Politikamızda yapılacak değişiklikler bu sayfada yayınlanacaktır. Önemli değişiklikler hakkında kullanıcılarımız bilgilendirilecektir.`
        },
    ];

    return (
        <div className="bg-slate-50 selection:bg-primary-500 selection:text-white">
            {/* Hero */}
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
                        Gizlilik <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600 italic">Politikası</span>
                    </h1>
                    <p className="text-slate-400 mt-6 text-lg max-w-2xl mx-auto">Kişisel verilerinizin korunması bizim için önceliktir.</p>
                </div>
            </section>

            {/* Content */}
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
                            <Link href="/kullanim-sartlari" className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors">
                                Kullanım Şartları →
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

