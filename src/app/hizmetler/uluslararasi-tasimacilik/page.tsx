import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Uluslararası Evden Eve Nakliyat - Ankara Özdemir",
    description: "Uluslararası evden eve nakliyat, gümrükleme, zati eşya taşımacılığı ve global lojistik çözümleri hakkında detaylı rehber. Ankara Özdemir güvencesiyle yurtdışına taşının.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/uluslararasi-tasimacilik" },
};

export default function UluslararasiTasimacilikPage() {
    return (
        <>
            {/* Hero */}
            <section className="bg-slate-50 border-b border-slate-200 py-20 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[400px] h-[400px] bg-primary-100 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]"></div>
                </div>
                <div className="container-custom relative z-10 text-center">
                    <span className="inline-block bg-primary-100 text-primary-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 border border-primary-200 shadow-sm">
                        Hizmetlerimiz
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black mb-5 text-slate-900">
                        Uluslararası <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-orange-500">Taşımacılık</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Dünyanın her noktasına güvenli, sigortalı ve profesyonel zati eşya taşımacılığı çözümleri.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">
                        
                        <p className="text-xl font-medium text-slate-800">
                            Yurtdışına taşınmak, yerel bir taşınma sürecine kıyasla çok daha kapsamlı planlama, yasal mevzuat bilgisi ve lojistik altyapı gerektirir. <strong>Ankara Özdemir Nakliyat</strong> olarak, "Uluslararası Evden Eve Nakliyat" alanında yılların getirdiği tecrübemizle, sınır ötesi yolculuğunuzda size uçtan uca destek sağlıyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Zati Eşya Taşımacılığı Nedir?</h2>
                        <p>
                            Zati eşya, kişilerin ticari bir amaç gütmeden kendi kullanımları için sahip oldukları ev eşyalarıdır. Uluslararası zati eşya taşımacılığı, bu eşyaların gümrük vergilerinden muaf veya belirli kurallar çerçevesinde bir ülkeden diğerine taşınması işlemidir. Bu işlem, uluslararası taşımacılık yetki belgesine (C3 Belgesi) sahip profesyonel firmalar tarafından yapılmalıdır.
                        </p>
                        <p>
                            Avrupa ülkeleri başta olmak üzere, Amerika, Asya ve Orta Doğu'ya düzenli seferlerimizle eşyalarınızı kapınızdan alıp, yeni ülkenizdeki evinize kadar (door-to-door) teslim ediyoruz.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Uluslararası Taşımacılık Sürecimiz Nasıl İşler?</h2>
                        
                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 my-8 shadow-sm">
                            <ol className="list-decimal list-inside space-y-4">
                                <li><strong>Ücretsiz Ekspertiz ve Planlama:</strong> Eşyalarınızın hacmi hesaplanır ve taşıma modülü (karayolu, denizyolu, havayolu) belirlenir.</li>
                                <li><strong>Profesyonel Uluslararası Paketleme:</strong> Uzun yol koşullarına dayanıklı, uluslararası standartlarda çift katlı ve darbe emici malzemelerle ambalajlama yapılır.</li>
                                <li><strong>Gümrükleme İşlemleri:</strong> İhracat ve ithalat gümrük işlemleriniz uzman ekiplerimiz tarafından sizin adınıza yürütülür. Gerekli evraklar (pasaport, ikametgah, vekaletname vb.) tarafımızca kontrol edilir.</li>
                                <li><strong>Güvenli Lojistik ve Taşıma:</strong> Eşyalarınız sigortalı olarak yeni ülkeye doğru yola çıkar. Araçlarımızın tamamı GPS sistemiyle anlık olarak takip edilebilir.</li>
                                <li><strong>Teslimat ve Kurulum:</strong> Hedef ülkedeki evinize eşyalarınız ulaştırılır, paketlerden çıkarılır ve mobilyalarınızın montajı gerçekleştirilir.</li>
                            </ol>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Gümrük İşlemleri ve Evrak Yönetimi</h2>
                        <p>
                            Uluslararası evden eve nakliyat sürecinin en kritik aşaması gümrüklemedir. Her ülkenin kendi gümrük mevzuatı farklılık gösterir. Gerekli belgelerin eksik olması veya yanlış beyan, eşyalarınızın gümrükte kalmasına veya yüksek cezalarla karşılaşmanıza neden olabilir. Uzman gümrük danışmanlarımız, gideceğiniz ülkenin konsolosluk ve gümrük şartlarına uygun olarak tüm evrak sürecinizi kusursuz bir şekilde yönetir.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Uluslararası Nakliyat Sigortası</h2>
                        <p>
                            Eşyalarınızın güvenliği bizim için her şeyden önemlidir. Uluslararası taşımacılıkta olası tüm risklere (kaza, doğal afet, hırsızlık) karşı eşyalarınız "Tam Kapsamlı Uluslararası Nakliyat Sigortası" ile güvence altına alınır. Dünyanın önde gelen sigorta şirketleriyle yaptığımız anlaşmalar sayesinde, taşınma sürecinizi sıfır stresle atlatmanızı sağlıyoruz.
                        </p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Uluslararası Taşınma Planınız İçin Teklif Alın</h3>
                            <p className="mb-6 opacity-90">Global nakliyat süreçleri hakkında ücretsiz danışmanlık almak ve fiyat teklifi istemek için hemen uzman ekibimizle iletişime geçin.</p>
                            <a href={`tel:${firmaBilgileri.phone.replace(/\s/g, "")}`} className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-slate-50 transition-all hover:scale-105">
                                Hemen Arayın: {firmaBilgileri.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

