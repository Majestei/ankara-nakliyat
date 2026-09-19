import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { firmaBilgileri } from "@/data/siteData";

export const metadata: Metadata = {
    title: "Uluslararası Evden Eve Nakliyat",
    description: "Uluslararası taşınma için varış ülkesi, eşya listesi ve tarih bilgisiyle hizmet uygunluğunu görüşün. Taşıma, gümrük ve teslim kapsamını önceden netleştirin.",
    alternates: { canonical: "https://ankaraozdemirnakliyat.com/hizmetler/uluslararasi-tasimacilik" },
    openGraph: {
        title: "Uluslararası Evden Eve Nakliyat",
        description: "Uluslararası taşınma için varış ülkesi, eşya listesi ve tarih bilgisiyle hizmet uygunluğunu görüşün. Taşıma, gümrük ve teslim kapsamını önceden netleştirin.",
        url: "https://ankaraozdemirnakliyat.com/hizmetler/uluslararasi-tasimacilik",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Uluslararası Evden Eve Nakliyat",
        description: "Uluslararası taşınma için varış ülkesi, eşya listesi ve tarih bilgisiyle hizmet uygunluğunu görüşün. Taşıma, gümrük ve teslim kapsamını önceden netleştirin.",
    }
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
                        Yurt dışı taşınma planınız için ülke, tarih ve eşya bilgilerinizi paylaşın; güzergâhın ve hizmet kapsamının uygunluğunu önceden teyit edin.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="section-padding bg-white">
                <div className="container-custom max-w-4xl">
                    <div className="prose prose-lg text-slate-600 leading-relaxed space-y-8">

                        <p className="text-xl font-medium text-slate-800">
                            Yurt dışı taşınma planınızı <strong>Ankara Özdemir Nakliyat</strong> ile görüşürken varış ülkesini, iki adresi, eşya listesini ve tarih aralığını paylaşın. Bu güzergâhta hizmet verilip verilemediğini, taşımayı yapacak tarafı ve teslim kapsamını teklif öncesinde teyit edin.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Zati Eşya Taşımacılığı Nedir?</h2>
                        <p>
                            Taşınacak kişisel eşyalarınızın listesini, adetlerini ve ölçülerini hazırlayın. Varış ülkesinin güncel eşya kabul ve gümrük koşullarını ilgili resmî makamdan teyit ederek taşıma planına dahil edin.
                        </p>
                        <p>
                            Çıkış ve varıştaki hizmetler ayrı ayrı netleştirilmelidir. Kapıdan teslim, terminal teslimi, gümrük işlemleri ve kurulumun teklife dahil olup olmadığını sorun.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Uluslararası Taşınmada Neler Görüşülmeli?</h2>

                        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 my-8 shadow-sm">
                            <ol className="list-decimal list-inside space-y-4">
                                <li><strong>Eşya Listesi ve Planlama:</strong> Eşya hacmini ve güzergâha uygun taşıma seçeneklerini teklifi sunan tarafla görüşün.</li>
                                <li><strong>Profesyonel Uluslararası Paketleme:</strong> Yol koşulları ve eşya hassasiyetine uygun paketleme yöntemini ve malzemeleri netleştirin.</li>
                                <li><strong>Gümrükleme İşlemleri:</strong> İşlemleri kimin yürüteceğini, istenen belgeleri ve masrafların teklif kapsamını ilgili taraflarla teyit edin.</li>
                                <li><strong>Güvenli Lojistik ve Taşıma:</strong> Yükleme, takip iletişimi ve teslim takvimini; varsa poliçenin coğrafi ve operasyonel kapsamını görüşün.</li>
                                <li><strong>Teslimat ve Kurulum:</strong> Teslim adresi, erişim, boşaltma ve kurulum işlerinin hangi tarafça yapılacağını belirleyin.</li>
                            </ol>
                        </div>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Gümrük İşlemleri ve Evrak Yönetimi</h2>
                        <p>
                            Gümrük işlemleri ve evrak sorumlulukları teklifin ayrı bir başlığı olmalıdır. Güncel belge listesini, eşya kabul koşullarını ve ilgili ücretleri varış ülkesinin resmî makamlarından veya yetkili danışmandan teyit edin.
                        </p>

                        <h2 className="text-3xl font-heading font-bold text-slate-900 mt-12 mb-6">Uluslararası Nakliyat Sigortası</h2>
                        <p>
                            Varsa poliçenin geçerli olduğu ülkeleri, taşıma aşamalarını, eşya türlerini, limitlerini ve istisnalarını inceleyin. Paketleme, depolama ve aktarma aşamalarının dahil olup olmadığını poliçeyi düzenleyen tarafla görüşün.
                        </p>

                        <div className="mt-12 p-8 bg-gradient-to-br from-primary-600 to-orange-600 rounded-3xl text-white text-center shadow-xl">
                            <h3 className="text-2xl font-bold mb-4">Uluslararası Taşınma Planınız İçin Teklif Alın</h3>
                            <p className="mb-6 opacity-90">Ülke, tarih ve eşya bilgisiyle hizmet uygunluğunu ve teklif kapsamını görüşmek için iletişime geçin.</p>
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

