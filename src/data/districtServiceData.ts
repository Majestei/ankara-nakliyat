export interface DistrictServiceDetail {
    h1: string;
    description: string;
    intro: string;
    paragraphs: string[];
    localChallenge: {
        title: string;
        desc: string;
    };
    logisticsSolution: {
        title: string;
        desc: string;
    };
    features: string[];
    faq: { q: string; a: string }[];
}

export interface DistrictServiceData {
    "evden-eve-nakliyat": DistrictServiceDetail;
    "ofis-tasima": DistrictServiceDetail;
    "nakliyat-fiyatlari": DistrictServiceDetail;
}

export const districtServiceData: Record<string, DistrictServiceData> = {
    "cankaya": {
        "evden-eve-nakliyat": {
            h1: "Çankaya Evden Eve Nakliyat: Ayrancı, Tunalı ve Dikmen Yokuşlarında Uzman Taşıma",
            description: "Çankaya evden eve nakliyat hizmeti. Ayrancı, Tunalı dar sokakları ve Dikmen yokuşlarına uygun hidrolik asansörlü, sigortalı ve marangozlu taşımacılık.",
            intro: "Ankara'nın kalbi ve en yoğun nüfuslu ilçesi olan Çankaya'da ev taşımak, kendine has mimari ve trafik dinamiklerine hakim olmayı gerektirir.",
            paragraphs: [
                "Ayrancı, Tunalı Hilmi, Gaziosmanpaşa ve Küçükesat gibi Çankaya'nın köklü semtlerinde 4-5 katlı eski binaların çoğunda bina içi yük asansörü bulunmamaktadır. Ankara Özdemir Nakliyat olarak bu bölgelerde geniş cadde veya sokak cephesine kurduğumuz dış cephe hidrolik asansörlerimizle eşyalarınızı bina merdivenlerine sürtmeden doğrudan dairenizin balkonundan araç kasasına indiriyoruz.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            localChallenge: {
                title: "Dar Sokaklar & Dik Eğimler",
                desc: "Ayrancı ve Tunalı'daki dar sokak parklanmaları ile Dikmen yokuşlarında standart kamyonların yanaşma güçlüğü."
            },
            logisticsSolution: {
                title: "Erişim ve Hizmet Kapsamı",
                desc: "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin."
            },
            features: [
                "Ayrancı ve Tunalı dar sokaklarına uygun hidrolik asansör",
                "Çukurambar ve Çayyolu sitelerinde peyzaj korumalı yanaşma",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            ],
            faq: [
                {
                    q: "Tunalı veya Ayrancı'da sokak dar ise asansör nasıl kurulur?",
                    a: "Operasyon öncesi sokak keşfi yapılarak trafiği aksatmayacak saatler (genelde sabah 07:30-09:00 arası) planlanır ve aracımız bina cephesine emniyet şeritleriyle yanaştırılır."
                },
                {
                    q: "Çankaya'daki sitelerde yönetim izinlerini kim koordine eder?",
                    a: "Uzman eksperimiz site yönetiminin belirlediği taşınma saatleri ve asansör kullanım kurallarına uygun randevu planını sizin adınıza organize eder."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Çankaya Ofis ve Büro Taşıma: Söğütözü & Çukurambar Plazalarında İş Sürekliliği Planı",
            description: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            intro: "Çankaya; Çukurambar, Söğütözü, Mustafa Kemal ve Armada-Tepe Prime aksıyla Ankara'nın kurumsal iş ve finans merkezidir.",
            paragraphs: [
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Server odaları, rack kabinler, monitörler ve hassas elektronik altyapı antistatik darbe emici özel baloncuklu koruyucularla zırhlanır. Numaralı plastik kilitli sandık sistemimizle her departmanın klasörleri ve muhasebe arşivleri sıra numarası bozulmadan yeni ofisteki dolaplara aktarılır.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
            ],
            localChallenge: {
                title: "Plaza Kuralları & Mesai Kesintisi",
                desc: "Yüksek katlı plazalarda yük asansörü rezervasyon kısıtları ve hafta içi çalışma saatlerindeki gürültü yasakları."
            },
            logisticsSolution: {
                title: "Hafta Sonu Gece Vardiyası",
                desc: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            },
            features: [
                "Söğütözü & Çukurambar plazalarında hafta sonu taşıma",
                "Antistatik IT donanımı ve sunucu kabini koruma ambalajı",
                "Numaralı ve kilitli arşiv taşıma sandıkları",
                "Modüler ofis masaları marangozlu söküm ve kurulumu",
                "Geniş teminatlı kurumsal emtia ve sorumluluk poliçesi",
                "Departman bazlı renkli barkodlama ve etiketleme"
            ],
            faq: [
                {
                    q: "Ofis bilgisayarları ve sunucular nasıl taşınır?",
                    a: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
                },
                {
                    q: "Arşiv dosyalarının karışması nasıl önlenir?",
                    a: "Her klasör ve raf grubu oda/departman koduyla numaralandırılır, yeni ofiste aynı raf sırasıyla yerleştirilir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            description: "2026 Çankaya evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 ve villa taşıma ücretleri, asansör ve marangozluk dahil net maliyet tablosu.",
            intro: "Çankaya genelinde nakliye fiyatları belirlenirken oda sayısı, kat yüksekliği, asansör gereksinimi ve semtler arası mesafe objektif kriterlerle hesaplanır.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Binanızda asansör kurulması gerekiyorsa bu bedel baştan yazılı teklifte açıkça belirtilir ve taşınma günü sonradan ilave maliyet çıkarılmaz."
            ],
            localChallenge: {
                title: "Belirsiz & Değişken Fiyatlar",
                desc: "Piyasada telefonda ucuz fiyat verip taşınma sabahı kapıda ekstra para isteyen komisyoncu ve aracılar."
            },
            logisticsSolution: {
                title: "Erişim ve Hizmet Kapsamı",
                desc: "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Marangoz, paketleme ve sigorta fiyata dahildir",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Çankaya içi taşınmada fiyatı en çok ne etkiler?",
                    a: "Eşya hacmi (oda sayısı), kat yüksekliği ve binada dış cephe asansörü kullanım ihtiyacı en temel maliyet faktörleridir."
                },
                {
                    q: "Verilen fiyata montaj ve ambalaj dahil midir?",
                    a: "Evet; tüm mobilyaların sökülüp takılması, beyaz eşya tesisat bağlantısı ve paketleme sarf malzemeleri fiyata dahildir."
                }
            ]
        }
    },
    "kecioren": {
        "evden-eve-nakliyat": {
            h1: "Keçiören Evden Eve Nakliyat: Etlik, Subayevleri ve Aktepe'de Asansörlü Güven",
            description: "Keçiören evden eve nakliyat. Eşya, adres ve hizmet kapsamına göre taşıma planını görüşün.",
            intro: "Ankara'nın en yüksek apartman yoğunluğuna sahip ilçelerinden biri olan Keçiören'de taşınma operasyonları dikey lojistik uzmanlığı gerektirir.",
            paragraphs: [
                "Etlik, Esertepe, Uyanış ve Atapark gibi Keçiören semtlerinde binaların büyük çoğunluğu 6 ila 14 kat arasındadır. Bu binalarda bina içi asansörlerin eşya taşımada kullanılması apartman yönetimlerince genellikle yasaklanmıştır. Ankara Özdemir Nakliyat olarak modüler teleskopik dış cephe asansörlerimizle eşyalarınızı doğrudan balkon veya pencereden araca indiriyoruz.",
                "Keçiören'in geniş aile yapısına uygun olarak taşınmalarda 2 usta marangoz görevlendirilir. 6 kapılı büyük gardıroplar, genç odası ranza sistemleri ve salon vitrinleri vida yuvaları yıpratılmadan numaralandırılarak sökülür ve yeni evinizde aynı titizlikle kurulur.",
                "Kalabalık cadde ve sokaklarda çocuk ve çevre güvenliğini sağlamak için asansör kurulum alanı emniyet konileri ve ikaz şeritleriyle koruma çemberine alınır."
            ],
            localChallenge: {
                title: "Yüksek Katlar & Yönetim Yasakları",
                desc: "10-15 katlı apartmanlarda bina asansörünün kullandırılmaması ve dar merdiven boşluklarında mobilya ezilmeleri."
            },
            logisticsSolution: {
                title: "Sepetli Teleskopik Asansör",
                desc: "Eşyanın hassasiyetine göre ambalaj, yükleme ve sabitleme yöntemini önceden görüşün."
            },
            features: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Geniş aile mobilyaları için 2 kıdemli marangoz desteği",
                "Eşyanın hassasiyetine göre ambalaj, yükleme ve sabitleme yöntemini önceden görüşün.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin."
            ],
            faq: [
                {
                    q: "Keçiören'deki yüksek katlı binalarda asansörünüz kaçıncı kata ulaşır?",
                    a: "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin."
                },
                {
                    q: "Büyük gardırobum sökülüp tekrar kurulabilir mi?",
                    a: "Evet, ekibimizdeki profesyonel marangoz raylı veya kapaklı tüm gardırop sistemlerini demonte edip yeni evinizde eksiksiz kurar."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Keçiören Ofis ve İş Yeri Taşıma: Klinik, Muayenehane ve Yerel İşletme Nakliyesi",
            description: "Keçiören ofis ve iş yeri taşıma hizmeti. Etlik Şehir Hastanesi çevresi klinikler, muayenehaneler, bürolar ve mağazalar için sigortalı profesyonel nakliyat.",
            intro: "Keçiören merkez ve Etlik Şehir Hastanesi aksında faaliyet gösteren sağlık klinikleri, danışmanlık ofisleri ve eğitim kurumları için profesyonel taşımacılık sunuyoruz.",
            paragraphs: [
                "Etlik Şehir Hastanesi'nin açılmasıyla birlikte Keçiören bölgesinde özel klinikler, tıp merkezleri, diş hekimliği muayenehaneleri ve medikal ofisler hızla artmıştır. Bu kurumlardaki hassas cihazların taşınması sıradan mobilya nakliyesinden tamamen farklı bir uzmanlık ister.",
                "Medikal cihazlar, dijital görüntüleme ekranları ve laboratuvar donanımları özel antistatik havalı ambalajlarla sarılarak darbe emici süngerli kasalarımızda sevk edilir. Hasta ve müşteri kayıt arşivleri gizlilik protokolü kapsamında kilitli mühürlü kolilerle taşınır.",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            ],
            localChallenge: {
                title: "Hassas Klinik & Büro Donanımı",
                desc: "Medikal cihazların sarsıntıya duyarlılığı ve hasta kayıt evraklarının gizlilik gereksinimi."
            },
            logisticsSolution: {
                title: "Antistatik Paketleme & Kilitli Transfer",
                desc: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            },
            features: [
                "Klinik, muayenehane ve laboratuvar donanımları özel taşımacılığı",
                "Mühürlü ve numaralı evrak/arşiv taşıma sandıkları",
                "Hafta sonu mesai dışı hızlı transfer planlaması",
                "Ofis mobilyaları ve bekleme salonu takımları marangozlu montajı",
                "Geniş kapsamlı kurumsal sigorta poliçesi",
                "25 ilçeye aynı gün ekspres ticari nakliye"
            ],
            faq: [
                {
                    q: "Klinik cihazları taşıma sigortasına dahil midir?",
                    a: "Evet, ön ekspertiz sırasında cihazların fatura ve beyan değerleri poliçeye işlenerek tam kapsamlı teminat sağlanır."
                },
                {
                    q: "Hafta sonu taşıma için ekstra ücret alınıyor mu?",
                    a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Keçiören Nakliyat Fiyatları (2026): Bütçe Dostu Şeffaf Fiyat Listesi",
            description: "2026 Keçiören evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör ve marangozluk dahil güncel net fiyat tablosu.",
            intro: "Keçiören'de ev taşıma maliyetleri, geniş ailelerin bütçesini zorlamayacak şeffaf ve ekonomik paketlerle sunulmaktadır.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Ek Masraf Sürprizleri",
                desc: "Piyasadaki korsan nakliyecilerin taşınma günü 'kat yüksekmiş', 'mobilya çokmuş' diyerek fiyat artırması."
            },
            logisticsSolution: {
                title: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                desc: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör bedeli sözleşmede şeffafça belirtilir",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi ve ücretini önceden görüşün imkanı"
            ],
            faq: [
                {
                    q: "Keçiören içi mesafe fiyatta büyük fark yaratır mı?",
                    a: "İlçe içi semtler arası mesafeler (örneğin Etlik'ten Aktepe'ye) standart tarife içinde kalır, fiyatta belirleyici olan eşya hacmi ve kattır."
                },
                {
                    q: "Asansör kurulamazsa fiyatta indirim olur mu?",
                    a: "Bina asansörü kullanımına izin veriliyorsa ve dış asansör gereksinimi kalmıyorsa maliyet düşürülerek faturanıza yansıtılır."
                }
            ]
        }
    },
    "yenimahalle": {
        "evden-eve-nakliyat": {
            h1: "Yenimahalle Evden Eve Nakliyat: Batıkent, Çakırlar ve Şentepe'de Profesyonel Lojistik",
            description: "Yenimahalle evden eve nakliyat. Batıkent geniş siteleri, Çakırlar villaları ve Şentepe yamaçlarına özel asansörlü, sigortalı, marangozlu taşımacılık.",
            intro: "Yenimahalle; Batıkent'in planlı geniş siteleri, Çakırlar'ın modern villaları ve Şentepe'nin dik yamaçlarıyla birbirinden çok farklı lojistik yaklaşımlar gerektiren bir ilçedir.",
            paragraphs: [
                "Batıkent ve Ergazi gibi toplu konut sitelerinde peyzaj alanları, site giriş güvenlikleri ve ortak alan kuralları çok katıdır. Ankara Özdemir Nakliyat olarak site yönetimleriyle önceden iletişime geçerek araç yanaşma saatlerini ve çim alanlara zarar vermeyecek asansör kurulum noktalarını belirliyoruz.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Çakırlar ve Batı Sitesi gibi villa ve dubleks konut bölgelerinde geniş bahçe yanaşmaları için çift araç ve 6 kişilik kıdemli personel desteği sunarak taşınmayı tek günde anahtar teslim tamamlıyoruz."
            ],
            localChallenge: {
                title: "Farklı Yerleşim Dokuları",
                desc: "Batıkent'teki site güvenlik ve peyzaj kısıtlamaları ile Şentepe'nin dik yamaçları."
            },
            logisticsSolution: {
                title: "Bölgeye Özel Araç & Yönetim Koordinasyonu",
                desc: "Site yönetim izinleri tam uyumlu, kompakt araç ve hidrolik asansör kombinasyonu."
            },
            features: [
                "Batıkent sitelerinde peyzaj korumalı asansör yanaşması",
                "Şentepe dik yokuşlarına uygun güçlü şasili filo",
                "Çakırlar villa taşımalarına özel VIP çift araç desteği",
                "Gardırop, baza ve ünitelerin marangozlu montajı",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            faq: [
                {
                    q: "Batıkent'te site yönetimi asansör kullanımına izin vermezse ne yapıyorsunuz?",
                    a: "Önceden keşif yaparak site yönetiminin onaylayacağı dış cephe asansörü konumlandırma noktasını veya bina yük asansörü saatlerini planlıyoruz."
                },
                {
                    q: "Şentepe'deki dar ve eğimli sokaklara kamyon girebilir mi?",
                    a: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Yenimahalle Ofis ve Sanayi Taşıma: Ostim & İvedik OSB Fabrika ve Atölye Nakliyesi",
            description: "Yenimahalle kurumsal ofis ve fabrika taşımacılığı. Ostim ve İvedik OSB'deki atölye, fabrika ve yönetim ofisleri için ağır yük ve IT nakliyesi.",
            intro: "Yenimahalle; Ostim OSB, İvedik Organize Sanayi ve Macunköy ile Türkiye'nin en büyük üretim ve ticaret merkezlerinden biridir.",
            paragraphs: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Şirketlerin idari binalarındaki muhasebe evrakları, müşteri dosyaları ve sunucu altyapısı departman bazlı numaralı sandıklarla taşınır. Hafta sonu yürütülen operasyonlarımız sayesinde Pazartesi sabahı üretim ve faturalama kesintisiz devam eder.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            localChallenge: {
                title: "Ağır Sanayi Ekipmanı & Üretim Kesintisi",
                desc: "Büro mobilyasıyla birlikte sanayi demirbaşlarının aynı anda taşınması ve mesai aksaması."
            },
            logisticsSolution: {
                title: "Forklift/Vinç Destekli Ağır Nakliyat",
                desc: "Hafta sonu mesai dışı operasyon, forklift yükleme ve numaralı arşiv transferi."
            },
            features: [
                "Ostim ve İvedik OSB işletmelerine aynı gün ekspertiz",
                "Sanayi demirbaşları, atölye ve ofis kombine taşımacılığı",
                "Antistatik ambalajlı kurumsal IT ve sunucu nakliyesi",
                "Arşivleme, kilitli sandıklama ve raf montaj desteği",
                "Ağır sanayi teminatlı yüksek bedelli nakliyat sigortası",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            ],
            faq: [
                {
                    q: "Ostim'deki atölyemizi hafta sonu taşıyabilir misiniz?",
                    a: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
                },
                {
                    q: "Ağır sanayi makineleri için vinç sağlıyor musunuz?",
                    a: "Gereken tonajdaki hidrolik vinç veya forklift ekipmanını operasyon planına dahil ederek tek elden çözüyoruz."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Yenimahalle Nakliyat Fiyatları (2026): Batıkent & Çakırlar Net Fiyat Tablosu",
            description: "2026 Yenimahalle evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler, dubleks ve villa taşımaları için asansörlü şeffaf maliyet tablosu.",
            intro: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Geniş Fiyat Yelpazesi & Güvensizlik",
                desc: "Piyasada kalite ve güvence sunmadan çok düşük fiyat verip kapıda sorun çıkaran korsan taşımacılar."
            },
            logisticsSolution: {
                title: "A'dan Z'ye Her Şey Dahil Net Tarife",
                desc: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Marangozlu mobilya montajı ve demontajı fiyata dahil",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin.",
                "Batıkent ve Çakırlar sakinlerine özel indirimli fiyatlar",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            faq: [
                {
                    q: "Batıkent içinde iki sokak arası taşınmada fiyat düşer mi?",
                    a: "Kamyon yakıtı azalsa da personel işçiliği, marangozluk ve ambalajlama aynı emek gerektirdiği için taban fiyattan indirimli özel teklif sunulur."
                },
                {
                    q: "Beyaz eşya bağlantıları fiyata dahil midir?",
                    a: "Evet; çamaşır makinesi, bulaşık makinesi ve buzdolabı bağlantıları ek ücret talep edilmeden usta ekibimizce yapılır."
                }
            ]
        }
    },
    "sincan": {
        "evden-eve-nakliyat": {
            h1: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            description: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            intro: "Ankara Özdemir Nakliyat'ın ana operasyon üssü ve araç garajının bulunduğu Sincan'da, hemşehrilerimize en avantajlı fiyat ve en hızlı nakliye hizmetini sunuyoruz.",
            paragraphs: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin."
            ],
            localChallenge: {
                title: "Geniş Eşya Hacmi & Kalabalık Siteler",
                desc: "Sincan ailelerinin yoğun mobilya ve eşya hacminin tek seferde güvenle taşınması gereksinimi."
            },
            logisticsSolution: {
                title: "Merkez Üs Avantajı & Büyük Kasa Kamyon",
                desc: "Sincan merkezli geniş hacimli özmal kamyon filosu, 2 marangoz ve anında araç takviyesi imkanı."
            },
            features: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Geniş aile eşyalarına özel maksimum hacimli çelik kasa kamyon",
                "Marangozlu gardırop demontaj ve yeni evde montajı dahil",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            faq: [
                {
                    q: "Sincan'da acil taşınmam gerekirse aynı gün araç bulabilir miyim?",
                    a: "Merkez garajımız Sincan'da olduğu için müsaitlik durumuna göre aynı gün 1-2 saat içinde kapınıza araç ve ekip yönlendirebiliyoruz."
                },
                {
                    q: "Yenikent'teki yeni yüksek katlı sitelere asansörünüz kurulabilir mi?",
                    a: "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Sincan Ofis ve Fabrika Taşıma: 1. OSB & Başkent OSB Kurumsal Lojistik",
            description: "Sincan kurumsal ofis ve sanayi nakliyesi. Sincan 1. OSB ve Başkent OSB'deki fabrika idari binaları, laboratuvar ve arşiv nakliyesi.",
            intro: "Sincan 1. Organize Sanayi Bölgesi ve Başkent OSB'deki sanayi devleri ve yan sanayi işletmeleri için kurumsal taşıma çözümleri sunuyoruz.",
            paragraphs: [
                "Sincan Organize Sanayi Bölgesi'ndeki fabrikaların idari büroları, teknik çizim ofisleri ve muhasebe arşivleri kurumsal operasyon ekibimiz tarafından taşınır. İşletmenin vardiya düzenine göre planlama yapılarak hafta sonu taşınma tamamlanır.",
                "Server kabinleri, mühendislik bilgisayarları ve teknik laboratuvar cihazları antistatik hava kabarcıklı ambalajlarla korunur. Klasörler numaralandırılarak yeni fabrikadaki idari ofise birebir yerleştirilir.",
                "Fabrika içi showroom ve müşteri karşılama alanlarındaki özel tasarım mobilyalar uzman marangozlarımızca demontaj ve montajdan geçirilir."
            ],
            localChallenge: {
                title: "Büyük Ölçekli Sanayi Taşınması",
                desc: "Fabrika idari ofisleri ve arşivlerinin mesaiyi aksatmadan hızla yeni tesise aktarılması."
            },
            logisticsSolution: {
                title: "Vardiyalı Kurumsal Proje Yönetimi",
                desc: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            },
            features: [
                "Sincan 1. OSB ve Başkent OSB işletmelerine yerinde keşif",
                "Fabrika idari ofis ve arşiv nakliyesinde uzman kadro",
                "Antistatik sarımlı sunucu ve teknoloji donanımı taşıması",
                "Numaralı kilitli koli ve sandık sistemi",
                "Geniş kapsamlı kurumsal nakliyat sigortası",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            ],
            faq: [
                {
                    q: "Fabrika ofisimiz için fatura ve resmi sözleşme düzenleniyor mu?",
                    a: "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
                },
                {
                    q: "Çok katlı fabrika idari binalarına dış asansör kurulabilir mi?",
                    a: "Evet, fabrika sahasındaki araç yanaşma alanlarına hidrolik asansörümüz kurularak eşyalar pencerelerden hızlıca indirilir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            description: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            intro: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
            ],
            localChallenge: {
                title: "Aracı & Komisyoncu Tuzağı",
                desc: "İnternette ucuza ilan verip işi başkasına komisyonla devreden korsan firmaların yarattığı mağduriyetler."
            },
            logisticsSolution: {
                title: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                desc: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Marangoz, ambalajlama ve sigorta fiyata dahildir",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
            ],
            faq: [
                {
                    q: "Sincan içi taşınmalarda fiyat neden diğer ilçelerden daha uygun?",
                    a: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
                },
                {
                    q: "Fiyatta sonradan değişiklik olur mu?",
                    a: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
                }
            ]
        }
    },
    "etimesgut": {
        "evden-eve-nakliyat": {
            h1: "Etimesgut Evden Eve Nakliyat: Eryaman, Bağlıca ve Elvankent'te VIP Taşımacılık",
            description: "Etimesgut evden eve nakliyat. Eryaman yüksek katlı siteleri, Bağlıca lüks konutları ve Elvankent'te asansörlü, sigortalı, marangozlu taşımacılık.",
            intro: "Etimesgut; Eryaman'ın yüksek katlı rezidansları, Bağlıca'nın modern lüks konutları ve Elvankent'in köklü aile siteleriyle hızlı büyüyen modern bir ilçedir.",
            paragraphs: [
                "Eryaman ve Göksu bölgelerindeki yüksek katlı sitelerde 20. kata kadar ulaşabilen teleskopik hidrolik asansörlerimizle eşyalarınızı bina asansörlerine ve merdiven boşluklarına temas ettirmeden doğrudan dairenizin balkonundan araç kasasına yüklüyoruz.",
                "Bağlıca bölgesindeki villa, çatı dubleksi ve geniş metrekareli lüks konutlarda VIP taşıma paketimiz devreye girer. Özel tasarım lake mobilyalar, kristal avizeler ve hassas mermer masalar kalın kraft balonlu naylonlar ve köşe koruyucularla zırhlanır.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
            ],
            localChallenge: {
                title: "Site Kuralları & Yüksek Kat Yükü",
                desc: "Eryaman sitelerindeki katı yönetim kuralları ve Bağlıca'daki lüks mobilyaların hassasiyeti."
            },
            logisticsSolution: {
                title: "VIP Ambalaj & Teleskopik Asansör",
                desc: "Eşyanın hassasiyetine göre ambalaj, yükleme ve sabitleme yöntemini önceden görüşün."
            },
            features: [
                "Eryaman ve Bağlıca'da 20. kata kadar hidrolik asansör",
                "Lüks konut ve villalar için VIP kalın ambalaj paketi",
                "Marangozlu demontaj, montaj ve oda yerleşimi dahil",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            faq: [
                {
                    q: "Eryaman'daki sitemizde bina asansörü kullandırılmıyor, ne yapacaksınız?",
                    a: "Dış cephe modüler asansörümüzü dairenizin balkonuna veya uygun penceresine kurarak tüm eşyaları bina dışından indirip yüklüyoruz."
                },
                {
                    q: "Bağlıca'daki villamız için kaç personel görevlendiriyorsunuz?",
                    a: "Villa ve geniş konutlarda taşınmanın tek günde bitmesi için 5-6 kişilik kıdemli personel ve 2 marangoz görevlendiriyoruz."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Etimesgut Ofis Taşıma: Bağlıca Bulvarı & Eryaman Ticari Merkez Nakliyesi",
            description: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            intro: "Etimesgut ve Bağlıca aksında hızla gelişen iş merkezleri, mimarlık ofisleri, hukuk büroları ve özel klinikler için profesyonel taşıma hizmeti sunuyoruz.",
            paragraphs: [
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Masaüstü bilgisayarlar, çok fonksiyonlu yazıcılar ve ağ anahtarları antistatik malzemelerle ambalajlanır. Numaralandırılmış dayanıklı plastik sandıklarla klasörler ve mali evraklar eksiksiz taşınır.",
                "Toplantı masaları, ofis bölme panelleri ve makam takımları marangozlarımızca sökülüp yeni ofisteki mimari plana göre monte edilir."
            ],
            localChallenge: {
                title: "İş Kaybı & Randevu İptalleri",
                desc: "Taşınma sebebiyle mesai saatlerinde müşterilere hizmet verilememesi riski."
            },
            logisticsSolution: {
                title: "Hafta Sonu Sıfır Mesai Kaybı",
                desc: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            },
            features: [
                "Bağlıca ve Eryaman ofislerine hafta sonu kesintisiz taşıma",
                "Antistatik IT ekipmanı ve sunucu ambalajı",
                "Numaralı klasör ve arşiv taşıma sandıkları",
                "Modüler ofis mobilyaları marangozlu montajı",
                "Kurumsal emtia sigortası ve yazılı sözleşme",
                "Etimesgut içi ve ilçeler arası aynı gün teslimat"
            ],
            faq: [
                {
                    q: "Ofis dosyalarımızın gizliliği nasıl korunur?",
                    a: "Evraklar numaralı ve kilitlenebilir güvenlik sandıklarına doldurulur, anahtarlar şirket yetkilinizde kalır."
                },
                {
                    q: "Ofis taşımalarında sigorta kapsamı nedir?",
                    a: "Elektronik cihazlardan mobilyalara kadar tüm ofis demirbaşları resmi kurumsal poliçe ile teminat altındadır."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Etimesgut Nakliyat Fiyatları (2026): Eryaman & Bağlıca Şeffaf Fiyat Listesi",
            description: "2026 Etimesgut evden eve nakliyat fiyatları. Eryaman, Bağlıca, Elvankent 1+1, 2+1, 3+1 ve dubleks daire güncel nakliye fiyat tablosu.",
            intro: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Taşınma Sabahı Ekstra Ücret Talebi",
                desc: "Piyasada ucuz fiyatla anlaşıp taşınma günü 'asansör parası', 'kat parası' adı altında fahiş artış yapanlar."
            },
            logisticsSolution: {
                title: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                desc: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör bedeli baştan teklifte net belirtilir",
                "Bağlıca ve Eryaman sakinlerine özel indirimli fiyatlar",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            faq: [
                {
                    q: "Etimesgut'tan Çankaya'ya taşınma fiyatı ne kadar fark eder?",
                    a: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
                },
                {
                    q: "Fiyata ambalaj malzemesi dahil midir?",
                    a: "Evet, balonlu patpat naylon, kraft kağıt, streç film ve bant dahil tüm sarf malzemeleri fiyata dahildir."
                }
            ]
        }
    },
    "mamak": {
        "evden-eve-nakliyat": {
            h1: "Mamak Evden Eve Nakliyat: Akdere, Durali Alıç ve Ege Mahallesi'nde Güvenli Taşıma",
            description: "Mamak evden eve nakliyat. Akdere, Durali Alıç kentsel dönüşüm bölgeleri ve TOKİ konutlarında asansörlü, sigortalı, marangozlu taşımacılık.",
            intro: "Mamak; kentsel dönüşümle inşa edilen modern TOKİ konutları, Durali Alıç siteleri ve Akdere'nin dar sokaklarıyla karmaşık bir kentsel dokuya sahiptir.",
            paragraphs: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
            ],
            localChallenge: {
                title: "Kentsel Dönüşüm & Dar Sokak Geçişleri",
                desc: "Akdere ve Abidinpaşa sokak darlığı ile yeni sitelerin yüksek katları."
            },
            logisticsSolution: {
                title: "Kompakt Şasi & Dış Cephe Asansörü",
                desc: "Dar sokaklara giren manevralı araçlar ve yüksek katlara hidrolik asansör."
            },
            features: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Akdere ve Abidinpaşa dar sokaklarına uygun kompakt araç",
                "Marangozlu mobilya montaj ve demontajı dahil",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Mamak'taki dar sokaklarda asansör kurulabilir mi?",
                    a: "Sokak genişliği uygunsa kompakt asansörümüz kurulur, aksi takdirde bina merdivenlerinden özel koruma kılıflarıyla taşıma yapılır."
                },
                {
                    q: "Beyaz eşyalar yeni evde bağlanıyor mu?",
                    a: "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Mamak Ofis ve İş Yeri Taşıma: Mamak Caddesi & Samsun Yolu Ticari Nakliyesi",
            description: "Mamak ofis ve iş yeri taşıma. Mamak Caddesi, Samsun Yolu showroom, mağaza, büro ve atölyeler için sigortalı kurumsal nakliyat.",
            intro: "Mamak Caddesi ve Samsun Yolu aksında yer alan mağazalar, showroomlar, toptancılar ve bürolar için profesyonel taşıma sunuyoruz.",
            paragraphs: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Ofis bilgisayarları ve muhasebe arşivleri numaralandırılarak kayıpsız transfer edilir. Hafta sonu operasyonlarımızla ticari faaliyetlerinizde tek bir gün bile kesinti yaşanmaz.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            localChallenge: {
                title: "Ticari Malların Korunması & Trafik",
                desc: "Samsun Yolu trafiğinde ticari ürünlerin sarsıntısız ve zamanında sevk edilmesi."
            },
            logisticsSolution: {
                title: "Raflı Süspansiyonlu Kasa",
                desc: "Özel raflı kapalı araçlar ve numaralı koli transferi."
            },
            features: [
                "Showroom, mağaza ve büro taşımacılığı",
                "Numaralı arşiv ve evrak sandıklama",
                "Antistatik ambalajlı IT ve elektronik transferi",
                "Hafta sonu mesai dışı hızlı taşınma",
                "Kurumsal emtia sigortası poliçesi",
                "Marangozlu ofis mobilyası montajı"
            ],
            faq: [
                {
                    q: "Mağazamızdaki ticari ürünler sigortalanıyor mu?",
                    a: "Evet, irsaliye veya fatura beyanıyla tüm ticari demirbaş ve ürünler emtia sigortası kapsamına alınır."
                },
                {
                    q: "Hafta sonu mağaza taşıması yapabilir misiniz?",
                    a: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            description: "2026 Mamak evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör, marangoz ve sigorta dahil güncel maliyet tablosu.",
            intro: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Düşük Fiyat Tuzağı",
                desc: "Piyasada gerçek dışı ucuz fiyat verip eşyayı araca yükledikten sonra fiyat artıran korsanlar."
            },
            logisticsSolution: {
                title: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                desc: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör bedeli sözleşmede şeffafça yazılır",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Mamak içi taşınmada fiyatı ne belirler?",
                    a: "Oda sayısı (eşya hacmi), kat durumları ve dış cephe asansörü kurulum ihtiyacı temel kriterlerdir."
                },
                {
                    q: "Verilen fiyata marangoz dahil midir?",
                    a: "Evet, gardırop ve yatak demontaj/montajı için ayrı bir marangoz ücreti ödemezsiniz."
                }
            ]
        }
    },
    "golbasi": {
        "evden-eve-nakliyat": {
            h1: "Gölbaşı Evden Eve Nakliyat: İncek, Mogan ve Taşpınar'da Villa ve VIP Taşımacılık",
            description: "Gölbaşı evden eve nakliyat. İncek lüks villaları, Mogan Gölü çevresi ve Taşpınar konutlarında VIP paketleme, çift araç ve marangozlu nakliyat.",
            intro: "Gölbaşı; İncek ve Mogan kıyısındaki geniş villaları, bahçeli müstakil malikaneleri ve Taşpınar'ın lüks rezidanslarıyla Ankara'nın en prestijli konut bölgelerindendir.",
            paragraphs: [
                "İncek ve Gölbaşı villalarında taşınma standart ev nakliyesinden çok farklıdır. Antika konsollar, masif meşe yemek masaları, kristal avizeler ve değerli sanat eserleri için özel ahşap sandıklama ve kalın hava kabarcıklı koruma zırhı uyguluyoruz.",
                "Geniş bahçe nizami ve çok katlı müstakil yapılarda eşyaların hızla ve yorulmadan taşınması için 6-8 kişilik uzman kadro ve çift büyük boy çelik kasa kamyon tahsis ediyoruz.",
                "Piyano, ağır para kasası ve bahçe mobilyaları için özel hidrolik taşıma ekipmanlarımız ve profesyonel taşıma personellerimiz görev yapmaktadır."
            ],
            localChallenge: {
                title: "Lüks Mobilyalar & Geniş Hacim",
                desc: "Eşyanın hassasiyetine göre ambalaj, yükleme ve sabitleme yöntemini önceden görüşün."
            },
            logisticsSolution: {
                title: "VIP Sandıklama & Çoklu Ekip",
                desc: "Özel ahşap sandıklar, kalın balonlu patpat naylonlar ve çift araçlı operasyon."
            },
            features: [
                "İncek ve Mogan villalarına özel VIP çift araç ve 8 kişilik ekip",
                "Antika, piyano ve para kasası özel taşıma donanımı",
                "Kristal avize ve cam mobilyalar için ahşap sandıklama",
                "Bahçe mobilyaları ve teras eşyaları özel ambalajı",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Marangozlu kusursuz montaj ve anahtar teslim yerleşim"
            ],
            faq: [
                {
                    q: "İncek'teki villamızın taşınması kaç gün sürer?",
                    a: "Çift araç ve 8 kişilik ekibimizle sabah erken başlayarak aynı gün akşam saatlerinde anahtar teslim tamamlıyoruz."
                },
                {
                    q: "Kuyruklu piyano veya çelik kasa taşınabiliyor mu?",
                    a: "Evet, piyanolar ve ağır çelik kasalar için özel hidrolik kaldırma kızakları ve askı sistemleri kullanıyoruz."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Gölbaşı Ofis Taşıma: Teknokent & Üniversite Yerleşkelerinde Kurumsal Nakliye",
            description: "Gölbaşı ofis ve laboratuvar taşımacılığı. Gölbaşı Teknokent, üniversiteler ve kurumsal tesisler için hassas cihaz ve IT altyapı nakliyesi.",
            intro: "Gölbaşı Teknokent, üniversite kampüsleri ve kurumsal araştırma merkezlerindeki teknoloji ofisleri ve laboratuvarlar için özel taşımacılık sunuyoruz.",
            paragraphs: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Akademik arşivler, tez kütüphaneleri ve kurumsal evraklar numaralı barkod sistemiyle kodlanarak yeni binadaki odalara eksiksiz dizilir.",
                "Hafta sonu yürütülen esnek operasyonlarımız sayesinde üniversite ve teknoloji şirketlerinde araştırma süreçleri aksamadan taşınma tamamlanır."
            ],
            localChallenge: {
                title: "Hassas AR-GE Cihazları & Gizlilik",
                desc: "Teknokent laboratuvar donanımlarının sarsıntıya duyarlılığı ve veri güvenliği."
            },
            logisticsSolution: {
                title: "Antistatik Paket & Gizlilik Sözleşmesi",
                desc: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            },
            features: [
                "Teknokent ve AR-GE ofisleri özel nakliyatı",
                "Antistatik ambalajlı sunucu ve laboratuvar cihazı taşıması",
                "Numaralı kütüphane ve arşiv taşıma sistemi",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Yüksek teminatlı kurumsal sigorta poliçesi",
                "Gölbaşı ve tüm Ankara'ya aynı gün teslimat"
            ],
            faq: [
                {
                    q: "AR-GE ve laboratuvar cihazları nasıl taşınır?",
                    a: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün."
                },
                {
                    q: "Gizlilik sözleşmesi imzalıyor musunuz?",
                    a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Gölbaşı Nakliyat Fiyatları (2026): Daire ve Villa Şeffaf Fiyat Listesi",
            description: "2026 Gölbaşı evden eve nakliyat fiyatları. İncek villaları ve standart daireler için asansörlü güncel net maliyet tablosu.",
            intro: "Gölbaşı ilçesinde standart dairelerden lüks villalara kadar her konut tipine uygun şeffaf fiyatlandırma politikamız aşağıdadır.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Villa ve Malikane Maliyet Belirsizliği",
                desc: "Standart kamyonun yetmeyeceği büyük konutlarda sonradan çıkarılan fahiş ek faturalar."
            },
            logisticsSolution: {
                title: "Yerinde Detaylı Ekspertiz & Sabit Teklif",
                desc: "Çift araç, personel ve sandıklama maliyetinin baştan belirlendiği net sözleşme."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                "Marangoz, paketleme ve sigorta fiyata dahildir",
                "Piyano ve kasa için şeffaf fiyatlandırma",
                "Kredi kartıyla ödeme imkanı",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Gölbaşı villa taşıma fiyatına kaç araç dahildir?",
                    a: "Ekspertiz raporuna göre 3+1 ve üzeri geniş villalara çift büyük boy kapalı kasa kamyon tahsis edilir ve fiyata dahildir."
                },
                {
                    q: "Taşınma günü ekstra masraf çıkar mı?",
                    a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
                }
            ]
        }
    },
    "altindag": {
        "evden-eve-nakliyat": {
            h1: "Altındağ Evden Eve Nakliyat: Siteler Mobilya Montajı & Dar Sokak Uzmanlığı",
            description: "Altındağ evden eve nakliyat hizmeti. Aydınlıkevler, Siteler, Karapürçek ve Ulus'ta asansörlü, sigortalı, Siteler imalatı mobilya montajı dahil ev taşıma.",
            intro: "Ankara'nın köklü ilçelerinden Altındağ'da ev taşımak; Siteler mobilya merkezinin ahşap inceliklerine hakimiyeti, Aydınlıkevler ve Örnek mahallelerindeki 4-5 katlı eski binaların dar dik merdivenlerini yönetebilmeyi gerektirir.",
            paragraphs: [
                "Altındağ; Aydınlıkevler, Dışkapı ve Örnek gibi tarihi ve köklü mahallelerde bina içi yük asansörü bulunmayan 40-50 yıllık apartmanlarla doludur. Bu binalarda bina içi merdivenlerden büyük gardırop ve köşe takımlarını indirmek hem bina duvarlarını çizer hem mobilyayı yıpratır. Ankara Özdemir Nakliyat olarak dar sokaklara rahatça yanaşabilen kompakt şasili teleskopik dış cephe asansörlerimizle balkon veya geniş salon pencerelerinden eşyaları doğrudan kapalı kasa kamyonumuza alıyoruz.",
                "Siteler Mobilyacılar Çarşısı'nın Altındağ sınırlarında yer alması sebebiyle bölgedeki müşterilerimizin pek çoğu masif, lake ve özel tasarım ağır ahşap mobilyalara sahiptir. Kadrolu kıdemli marangozlarımız Siteler işçiliği gardıropları, oymalı konsolları ve yemek masalarını numaralandırarak söker, çift katlı kraft balonlu patpatlarla sarar ve yeni evinizde fabrikasyon hassasiyetiyle monte eder.",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin."
            ],
            localChallenge: {
                title: "Siteler Ahşap Mobilyaları & Dar Sokak Merdivenleri",
                desc: "Aydınlıkevler'deki dar sokak parklanmaları ile Siteler üretimi ağır özel tasarım mobilyaların demontaj hassasiyeti."
            },
            logisticsSolution: {
                title: "Siteler Usta Marangozluğu & Kompakt Dış Asansör",
                desc: "Özel mobilya marangozları, çift katlı kraft koruma ve dar sokaklara yanaşabilen hidrolik dış cephe asansörü."
            },
            features: [
                "Siteler üretimi özel tasarım mobilyalara uzman marangoz montajı",
                "Aydınlıkevler ve Örnek dar sokaklarına manevralı kompakt araçlar",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            ],
            faq: [
                {
                    q: "Aydınlıkevler'deki dar sokaklarda asansör kurulabilir mi?",
                    a: "Evet, dar sokaklara özel tasarlanmış kompakt sepetli asansörümüz sayesinde araç trafiğini tıkamadan bina balkonuna kurulum yapabiliyoruz."
                },
                {
                    q: "Siteler'den yeni aldığımız mobilyaları da taşıyıp monte ediyor musunuz?",
                    a: "Evet, Siteler'deki atölye veya mağazalardan alınan demonte mobilyaların teslim alınıp yeni evinize taşınması ve montajı hizmetimiz mevcuttur."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Altındağ Ofis ve Mağaza Taşıma: Ulus, Siteler & Rüzgarlı Ticari Nakliyat",
            description: "Altındağ ofis, mağaza ve atölye taşımacılığı. Ulus büroları, Siteler imalathaneleri ve Rüzgarlı yapı marketleri için hafta sonu sigortalı ticari nakliye.",
            intro: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            paragraphs: [
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Eşyanın hassasiyetine göre ambalaj, yükleme ve sabitleme yöntemini önceden görüşün.",
                "Arşiv klasörleri ve kurumsal evraklar departman kodlu kilitli güvenlik sandıklarında taşınarak evrak sırasının bozulması kesin olarak önlenir."
            ],
            localChallenge: {
                title: "Ulus Trafiği & Tarihi İş Hanları",
                desc: "Tarihi iş hanlarının dar koridorları ve Ulus merkezindeki gündüz trafik kısıtlamaları."
            },
            logisticsSolution: {
                title: "Gece / Hafta Sonu Vardiyası",
                desc: "Trafiğin sakin olduğu mesai dışı saatlerde hızlı yükleme ve numaralı arşiv transferi."
            },
            features: [
                "Ulus ve Rüzgarlı iş merkezlerine hafta sonu kesintisiz taşıma",
                "Siteler mağaza ve showroom demirbaşları özel nakliyesi",
                "Numaralı ve kilitli arşiv taşıma sandığı güvencesi",
                "Antistatik ambalajlı sunucu ve bilgisayar nakli",
                "Geniş teminatlı kurumsal emtia poliçesi",
                "Resmi faturalı ve yazılı sözleşmeli taşımacılık"
            ],
            faq: [
                {
                    q: "Ulus'taki tarihi hanlarda eşya nasıl indirilir?",
                    a: "Merdiven boşlukları elverişli değilse cephe pencerelerinden mobil dış asansör veya askılı sistemler kullanılır."
                },
                {
                    q: "Ofis dosyaları karışır mı?",
                    a: "Her klasör ve dolap numaralandırılarak yeni ofiste aynı sıra düzeniyle yerleştirilir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Altındağ Nakliyat Fiyatları (2026): Siteler & Aydınlıkevler Net Fiyat Tarifesi",
            description: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            intro: "Altındağ genelinde bütçenizi zorlamayan, kapıda sonradan ilave ücret çıkarmayan fiyatı etkileyen koşullar ve teklif öncesi hazırlık bilgileri aşağıdadır.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Düşük Fiyat Verip Kapıda Artıranlar",
                desc: "Piyasada telefonda ucuz söyleyip taşınma sabahı 'merdiven dar', 'mobilya ağır' diyerek ek ücret talep eden korsanlar."
            },
            logisticsSolution: {
                title: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                desc: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör ücreti baştan sözleşmede açıkça belirtilir",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Altındağ içi nakliyatta fiyatı ne belirler?",
                    a: "Oda sayısı, eşya yoğunluğu, binanın katı ve dış cephe asansörü gereksinimi ana maliyet unsurlarıdır."
                },
                {
                    q: "Taşınma günü ekstra ücret çıkar mı?",
                    a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
                }
            ]
        }
    },
    "akyurt": {
        "evden-eve-nakliyat": {
            h1: "Akyurt Evden Eve Nakliyat: Esenboğa Aksı, TOKİ & Müstakil Konut Taşımacılığı",
            description: "Akyurt evden eve nakliyat. Eşya, adres ve hizmet kapsamına göre taşıma planını görüşün.",
            intro: "Ankara'nın kuzeydoğu giriş kapısı olan Akyurt; Esenboğa Havalimanı yakınlığı, Çankırı Yolu sanayi tesisleri, yeni TOKİ blokları ve geniş bahçeli müstakil konutlarıyla kendine özgü bir lojistik planlama gerektirir.",
            paragraphs: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Saracalar, Büğdüz ve Balıkhisar gibi kırsal ve müstakil mahallelerdeki geniş bahçeli evler, villalar ve çiftlik tipi konutlar için geniş hacimli çelik kasa kamyonlar tahsis ediyoruz. Bahçe mobilyaları, atölye aletleri ve kiler eşyaları özel dayanıklı kolilerle paketlenir.",
                "Akyurt - Ankara şehir merkezi arasındaki 35 kilometrelik güzergahta, eşyalarınızın yol sarsıntısından etkilenmemesi için araç kasasında gergi kemerleri ve strafor sünger bariyerler kullanılarak seyir güvenliği sağlanır."
            ],
            localChallenge: {
                title: "35 km Şehir İntikali & Müstakil Konut Hacmi",
                desc: "Ankara merkezine olan mesafe, Çankırı yolu ağır vasıta trafiği ve müstakil evlerdeki yoğun eşya hacmi."
            },
            logisticsSolution: {
                title: "Geniş Hacimli Çelik Kasa & Çift Marangoz",
                desc: "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            },
            features: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Müstakil ve bahçeli evler için ekstra geniş hacimli araçlar",
                "Esenboğa ve Çankırı Yolu sanayi personeline özel indirimler",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Marangozlu gardırop demontaj ve montajı fiyata dahil",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın."
            ],
            faq: [
                {
                    q: "Akyurt'tan Ankara merkeze taşınma kaç saat sürer?",
                    a: "Sabah 08:00'de başlayan paketleme ve yükleme, 35 km'lik intikal ve yeni adreste montaj dahil ortalama 5-6 saatte tamamlanır."
                },
                {
                    q: "Köy ve çiftlik evlerindeki bahçe eşyaları da taşınıyor mu?",
                    a: "Evet, bahçe oturma grupları, çim biçme makineleri ve kiler malzemeleri özel sarımla güvenle nakledilir."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Akyurt Fabrika ve Ofis Taşıma: Sanayi Bölgesi & Lojistik Depo Nakliyesi",
            description: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            intro: "Akyurt Sanayi Bölgesi ve Çankırı Yolu üzerindeki imalat tesisleri, lojistik antrepolar ve fabrika idari ofisleri için endüstriyel kurumsal taşıma çözümleri sunuyoruz.",
            paragraphs: [
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Server odaları, IT anahtarlama ekipmanları ve hassas test aygıtları antistatik hava kanallı malzemelerle zırhlanır. Kurumsal arşiv klasörleri numaralı mühürlü plastik kasalarla sıra bozulmadan taşınır.",
                "Yönetici odaları, modüler toplantı masaları ve showroom üniteleri usta marangozlarımızca sökülüp yeni fabrika idari binasında projesine uygun kurulur."
            ],
            localChallenge: {
                title: "Sanayi Mesaisi & Ağır Ekipmanlar",
                desc: "Üretim vardiyalarının bölünmemesi ve teknik cihazların toz/darbe koruması."
            },
            logisticsSolution: {
                title: "Hafta Sonu Endüstriyel Nakliye",
                desc: "Mesai dışı kesintisiz operasyon, antistatik koruma ve numaralı arşiv sistemi."
            },
            features: [
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün.",
                "Hafta sonu mesai kaybı olmadan anahtar teslim fabrika ofis nakli",
                "Antistatik IT ekipmanı ve sunucu ambalajlama",
                "Numaralı kilitli arşiv taşıma sandığı güvencesi",
                "Yüksek teminatlı kurumsal emtia taşıma poliçesi",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin."
            ],
            faq: [
                {
                    q: "Fabrika ofisimiz için kurumsal fatura kesiliyor mu?",
                    a: "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
                },
                {
                    q: "Ağır ofis kasaları taşınabilir mi?",
                    a: "Evet, ağır çelik kasalar hidrolik kızaklı özel ekipmanlarımızla taşınır."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            description: "2026 Akyurt evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 ve müstakil konutlar için asansör, marangoz ve sigorta dahil güncel net fiyat tablosu.",
            intro: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: {
                title: "Mesafe Bahanesiyle Fiyat Artırma",
                desc: "Akyurt'un merkeze mesafesini gerekçe gösterip taşınma ortasında ilave para isteyen nakliyeciler."
            },
            logisticsSolution: {
                title: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                desc: "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin."
            },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Mesafe farkı sözleşmede şeffafça netleştirilir",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin.",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün."
            ],
            faq: [
                {
                    q: "Akyurt'tan Ankara içine nakliyat fiyatı neye göre hesaplanır?",
                    a: "Eşya hacmi, kat durumu, asansör ihtiyacı ve gidilecek ilçenin km mesafesi baştan şeffafça hesaplanır."
                },
                {
                    q: "Kapıda sonradan ek ücret çıkar mı?",
                    a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
                }
            ]
        }
    },
    "pursaklar": {
        "evden-eve-nakliyat": {
            h1: "Pursaklar Evden Eve Nakliyat: Saray, Tevfik İleri & Protokol Yolu Taşımacılığı",
            description: "Pursaklar evden eve nakliyat. Eşya, adres ve hizmet kapsamına göre taşıma planını görüşün.",
            intro: "Protokol Yolu üzerinde hızla gelişen Pursaklar'da geniş aile daireleri ve modern kooperatif siteleri için uzman nakliye hizmeti veriyoruz.",
            paragraphs: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün."
            ],
            localChallenge: { title: "Protokol Yolu Trafiği & Yüksek Siteler", desc: "Sabah saatlerindeki havalimanı trafiği ve yüksek katlı site bloklarında eşya indirme güçlüğü." },
            logisticsSolution: { title: "Erken Sevkiyat & Dış Cephe Asansörü", desc: "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin." },
            features: [
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Marangozlu gardırop demontaj ve montajı fiyata dahil",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            faq: [
                { q: "Pursaklar'da asansör kurulurken site yönetimi izin veriyor mu?", a: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün." },
                { q: "Mobilyalarım garantili mi?", a: "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün." }
            ]
        },
        "ofis-tasima": {
            h1: "Pursaklar Ofis Taşıma: Saray Sanayi & Ticari İş Yeri Nakliyesi",
            description: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            intro: "Pursaklar ve Saray Sanayi aksındaki ticari ofisler için hızlı ve sigortalı kurumsal taşımacılık çözümleri sunuyoruz.",
            paragraphs: [
                "İşletmenizin faaliyetini aksatmamak amacıyla mesai dışı saatlerde veya hafta sonu taşıma gerçekleştiriyoruz.",
                "Bilgisayarlar ve teknolojik aletler antistatik koruyucularla sarılır; klasörler numaralandırılır.",
                "Ofis masaları ve üniteleri marangozumuzca sökülüp yeni adreste hızla kurulur."
            ],
            localChallenge: { title: "Mesai Sürekliliği", desc: "Ofis taşınırken müşteri iletişiminin ve işlerin aksamaması." },
            logisticsSolution: { title: "Hafta Sonu Transferi", desc: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün." },
            features: [
                "Hafta sonu mesai dışı taşıma desteği",
                "Antistatik IT ekipmanı paketleme",
                "Numaralı arşiv taşıma sandıkları",
                "Kurumsal nakliyat sigortası poliçesi",
                "Marangozlu ofis montajı",
                "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin."
            ],
            faq: [
                { q: "Arşiv dosyaları karışır mı?", a: "Numaralandırılmış kilitli sandıklarla her klasör aynı sırayla yeni ofise aktarılır." },
                { q: "Fatura kesiliyor mu?", a: "Evet, tüm kurumsal taşımalarda resmi e-fatura düzenlenir." }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            description: "2026 Pursaklar evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör ve marangoz dahil güncel maliyet tablosu.",
            intro: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            localChallenge: { title: "Fiyat Belirsizliği", desc: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin." },
            logisticsSolution: { title: "Erişim ve Hizmet Kapsamı", desc: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin." },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Asansör bedeli sözleşmede şeffafça yazılır",
                "Ödeme yöntemini ve koşullarını teklif sırasında görüşün.",
                "Keşif yöntemi, uygun tarih ve varsa ücretini randevu öncesinde görüşün.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            faq: [
                { q: "Fiyata montaj dahil midir?", a: "Evet, gardırop ve yatak demontaj/montajı fiyata dahildir." },
                { q: "Kapıda sonradan fiyat artar mı?", a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin." }
            ]
        }
    },
    "polatli": {
        "evden-eve-nakliyat": {
            h1: "Polatlı Evden Eve Nakliyat: Ankara - Polatlı Hattında Güvenli Lojistik",
            description: "Polatlı evden eve nakliyat. Eşya, adres ve hizmet kapsamına göre taşıma planını görüşün.",
            intro: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
            paragraphs: [
                "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün.",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Ankara merkez ile Polatlı arasındaki 75 km'lik intikal güzergahında eşyalarınız darbe emici süngerler ve gergi halatlarıyla sarsıntısız sevk edilir."
            ],
            localChallenge: { title: "75 km Şehirler Arası Standart & Geniş Hacim", desc: "Ankara merkez mesafesi ve geniş aile evlerinin yoğun eşya yükü." },
            logisticsSolution: { title: "Süspansiyonlu Kamyon & Sabitleme", desc: "Adres erişimini, eşya ölçülerini ve tarihi paylaşarak araç ve ekip uygunluğunu görüşün." },
            features: [
                "Ankara - Polatlı arası günlük düzenli sefer",
                "Asansör kurulumu için kat yüksekliği, bina cephesi, zemin ve yükleme alanının uygunluğunu adres özelinde değerlendirin.",
                "Marangozlu mobilya demontaj ve montajı dahil",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün.",
                "Söküm, kurulum ve cihaz bağlantısının kapsamını ayrı ayrı görüşün; gerektiğinde yetkili servisle planlayın.",
                "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin."
            ],
            faq: [
                { q: "Polatlı'dan Ankara içine taşınma ne kadar sürer?", a: "Yükleme, 75 km yol ve boşaltma dahil aynı gün içinde 6-7 saatte anahtar teslim bitirilir." },
                { q: "Geniş ev eşyaları tek araca sığar mı?", a: "Geniş hacimli büyük boy çelik kasa kamyonlarımız sayesinde tüm eşyalar tek seferde taşınır." }
            ]
        },
        "ofis-tasima": {
            h1: "Polatlı Ofis Taşıma: Çarşı & Sanayi İş Yeri Nakliyatı",
            description: "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
            intro: "Polatlı merkez çarşı ve sanayi bölgesindeki ticari işletmeler için hızlı ve sigortalı kurumsal nakliyat sunuyoruz.",
            paragraphs: [
                "Ofis mobilyaları, teknik cihazlar ve muhasebe evrakları özel koruyucu kılıflarla ambalajlanarak güvenle aktarılır.",
                "Çalışma takvimi, bina giriş saatleri ve teslim sırasına göre ofis taşıma planını önceden görüşün.",
                "Varsa sigorta poliçesinin teminatlarını, limitlerini ve istisnalarını inceleyin. Paketleme ve teslim koşullarını yazılı hizmet kapsamıyla birlikte görüşün."
            ],
            localChallenge: { title: "Ticari Kesinti Riski", desc: "Taşınma esnasında işletmenin müşteri hizmetlerinin durmaması." },
            logisticsSolution: { title: "Mesai Dışı Transfer", desc: "Hafta sonu veya akşam saatlerinde hızlı ve planlı yerleşim." },
            features: [
                "Hafta sonu kesintisiz taşıma imkanı",
                "Numaralı klasör ve arşiv sandıklama",
                "Antistatik IT ekipmanı ambalajı",
                "Kurumsal emtia sigortası",
                "Marangozlu ofis mobilyası montajı",
                "Faturalı ve sözleşmeli kurumsal güvence"
            ],
            faq: [
                { q: "Ofis eşyaları sigortalanıyor mu?", a: "Evet, tüm ofis demirbaşları kurumsal poliçe ile teminat altındadır." },
                { q: "Hafta sonu ekstra ücret var mı?", a: "Teklifte dahil işleri ve kapsam değişikliği koşullarını yazılı olarak kontrol edin." }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Polatlı Nakliyat Fiyatları (2026): Net ve Şeffaf Fiyat Listesi",
            description: "2026 Polatlı evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler ve Ankara intikali için güncel maliyet tablosu.",
            intro: "Polatlı ilçe içi ve Ankara merkez bağlantılı taşınmalar için fiyatı etkileyen koşullar ve teklif öncesi hazırlık bilgileri aşağıdadır.",
            paragraphs: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "İntikal maliyeti baştan sözleşmede açıkça belirtilir, yol, yakıt ve ek hizmet bedellerinin dahil olup olmadığını kontrol edin."
            ],
            localChallenge: { title: "Yol ve Yakıt Sürprizleri", desc: "Mesafeyi bahane ederek taşınma günü fiyat artıran fırsatçılar." },
            logisticsSolution: { title: "Yazılı Teklif Kapsamı", desc: "Taşımayı yapacak firma bilgilerini ve hizmetle ilgili belgeleri inceleyin; eşya listesi, adresler ve teklif koşullarını yazılı olarak netleştirin." },
            features: [
                "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün.",
                "Ankara - Polatlı mesafesi için teklif kapsamı",
                "Montaj ve cihaz bağlantısının kapsamını görüşün",
                "Asansör bedeli sözleşmede açıkça yazılır",
                "Ödeme yöntemlerini teklif öncesinde görüşün",
                "Keşif yöntemi ve ücretini önceden görüşün"
            ],
            faq: [
                { q: "Polatlı'dan Ankara merkeze fiyat ne kadar?", a: "Eşya hacmi, mesafe, katlar, paketleme ve kurulum ihtiyaçlarını paylaşarak teklif alın. Dahil işleri, vergi ve ek hizmet koşullarını yazılı olarak görüşün." },
                { q: "Kapıda sonradan ek masraf çıkar mı?", a: "Dahil işler ve kapsam değişikliği koşullarını yazılı teklifte kontrol edin." }
            ]
        }
    }
};

// Fallback generator for other districts with rich custom facts
export function getDistrictServiceContent(districtSlug: string, serviceSlug: "evden-eve-nakliyat" | "ofis-tasima" | "nakliyat-fiyatlari", districtName: string): DistrictServiceDetail {
    if (districtServiceData[districtSlug] && districtServiceData[districtSlug][serviceSlug]) {
        const content = districtServiceData[districtSlug][serviceSlug];
        const serviceLabel = serviceSlug === "ofis-tasima" ? "ofis taşıma" : serviceSlug === "nakliyat-fiyatlari" ? "nakliyat fiyatları" : "evden eve nakliyat";
        return { ...content,
            h1: `${districtName} ${serviceLabel.charAt(0).toLocaleUpperCase("tr-TR") + serviceLabel.slice(1)}: Hazırlık ve Teklif`,
            description: districtSlug === 'akyurt' && serviceSlug === 'nakliyat-fiyatlari'
                ? 'Akyurt evden eve nakliyat fiyatını hangi işler belirler? Eşya hacmi, kat, paketleme ve kurulum kapsamıyla teklifleri karşılaştırın; güncel bedeli görüşün.'
                : `${districtName} ${serviceLabel} için eşya, adres, kat ve tarih bilgileriyle planlama. Dahil işleri ve teklif koşullarını önceden görüşün.`
        };
    }

    const shared = {
        localChallenge: { title: "Adres ve Erişim", desc: `${districtName} için çıkış ve varış adresinin kat, park, bina girişi ve yükleme mesafesini birlikte değerlendirin.` },
        logisticsSolution: { title: "Teklif Öncesi Plan", desc: "Eşya listesi, tarih, paketleme, söküm ve kurulum kapsamını yazılı olarak netleştirin." },
    };
    if (serviceSlug === "evden-eve-nakliyat") return {
        ...shared,
        h1: `${districtName} Evden Eve Nakliyat: Hazırlık ve Taşıma Planı`,
        description: `${districtName} evden eve nakliyat için eşya listesi, bina erişimi, paketleme ve montaj hazırlığı. Adres ve tarihe göre hizmet kapsamını görüşün.`,
        intro: `${districtName} içinde veya ilçeyle bağlantılı bir taşınmada, iki adreste de yapılacak işleri aynı eşya listesi üzerinden planlayın.`,
        paragraphs: [
            "Oda sayısı tek başına yeterli değildir. Büyük mobilyaların ölçülerini, beyaz eşyaları, kolileri ve hassas eşyaları listeleyin. Taşınmayacak eşyaları listeden ayırın.",
            "Merdiven ve kapı ölçülerini, bina asansörünün kullanım koşullarını ve aracın park edebileceği alanı bildirin. Dış cephe asansörü gerekiyorsa kurulum alanı ile ekipman uygunluğunu önceden değerlendirin.",
            "Sökülecek mobilyalar ve cihaz bağlantıları için sorumluluğu ayrı ayrı görüşün. Teknik veya garanti kapsamındaki cihaz işlemlerinde yetkili servis gerekip gerekmediğini kontrol edin."
        ],
        features: ["İki adres için kat ve erişim bilgisi", "Ölçülü eşya ve koli listesi", "Paketleme malzemesi ve iş paylaşımı", "Mobilya söküm ve kurulum kapsamı", "Yükleme ve teslim zaman aralığı", "Varsa poliçenin kapsam ve istisnaları"],
        faq: [
            { q: `${districtName} evden eve nakliyat ne kadar sürer?`, a: "Eşya miktarı, erişim, mesafe, paketleme ve montaj süresi birlikte değerlendirilir. Adres bilgileriyle başlangıç ve teslim aralığını görüşün." },
            { q: "Mobilya kurulumu teklife dahil mi?", a: "Kurulum gerektiren parçaları listede belirtin; hangi işlemlerin dahil olduğunu teklif üzerinde kontrol edin." }
        ]
    };
    if (serviceSlug === "ofis-tasima") return {
        ...shared,
        h1: `${districtName} Ofis Taşıma: Envanter ve Teslim Planı`,
        description: `${districtName} ofis taşıma için departman envanteri, arşiv, bilgisayar ve mobilya hazırlığı. Çalışma takvimi ve teslim sorumluluklarını görüşün.`,
        intro: `${districtName} ofis taşınmasında iş sürekliliği için taşıma sırasını, çalışanların ihtiyaçlarını ve yeni ofisin yerleşim planını birlikte hazırlayın.`,
        paragraphs: [
            "Her departmanın cihaz, mobilya ve arşiv listesine bir sorumlu atayın. Koli ve cihazları yeni ofiste yerleşecekleri oda ya da masa koduyla etiketleyin.",
            "Veri yedeklerini ve sistemlerin kapatma/açma işlemlerini kendi teknik ekibinizle planlayın. Taşıma hizmeti ile bilişim kurulumu aynı iş değildir; sorumlulukları yazılı olarak ayırın.",
            "Mesai dışı çalışma gerekiyorsa bina giriş saatlerini, güvenlik iznini ve taşıma ekibinin uygunluğunu önceden görüşün. Kritik cihazlar için teslim sırasını belirleyin."
        ],
        features: ["Departman ve oda bazında envanter", "Arşivlerin etiketlenmesi ve erişim kontrolü", "Hassas cihazlar için ambalaj planı", "Söküm ve kurulum işlerinin listesi", "Bina yönetimiyle yükleme saatleri", "Teslim kontrolü ve sorumlu kişiler"],
        faq: [
            { q: `${districtName} ofis taşıması hafta sonu yapılabilir mi?`, a: "İstenen gün ve saat için ekip uygunluğunu ve her iki binanın giriş koşullarını önceden teyit edin." },
            { q: "Arşiv dosyalarının karışması nasıl önlenir?", a: "Koli içerik listesini ve departman kodlarını hazırlayın. Teslimde bu liste üzerinden sayım yapacak kişileri belirleyin." }
        ]
    };
    return {
        ...shared,
        h1: `${districtName} Nakliyat Fiyatları: Maliyet Etkenleri ve Teklif`,
        description: `${districtName} nakliyat fiyatlarını etkileyen eşya hacmi, mesafe, kat ve ek hizmetler. Aynı kapsamla yazılı teklifleri karşılaştırmak için kontrol listesi.`,
        intro: `${districtName} nakliyat fiyatını değerlendirmek için yalnız oda sayısını değil, taşınacak eşya ve yapılacak işlerin tamamını belirtin.`,
        paragraphs: [
            "Teklif talebine iki adresi, katları, bina asansörü bilgisini, araca kadar yükleme mesafesini ve tercih edilen tarihi ekleyin. Büyük mobilya ölçüleri ve fotoğraflar eşya listesini tamamlar.",
            "Paketleme, mobilya sökümü, kurulum, dış cephe asansörü ve varsa depolama işlemlerini ayrı başlıklar halinde görüşün. Parça eşya taşınmasında teslim aralığı ve aynı güzergâhta araç uygunluğunu ayrıca belirtin.",
            "Teklifleri aynı iş listesi üzerinden karşılaştırın. Vergi, yol, otopark, bekleme ve kapsam değişikliği koşullarının yazılı olup olmadığını kontrol edin; rakamın hangi işleri kapsadığını netleştirin."
        ],
        features: ["Ölçülü eşya listesi", "Adres, mesafe ve kat bilgisi", "Paketleme ve kurulumun kapsamı", "Asansör uygunluğu ve ayrı bedeli", "Tarih ve teslim aralığı", "Vergi ve ek hizmet koşulları"],
        faq: [
            { q: `${districtName} içi taşınmada fiyatı ne belirler?`, a: "Eşya hacmi, iki adresteki erişim, mesafe, tarih ve dahil işlemler birlikte değerlendirilir." },
            { q: "Sonradan ek ücret çıkar mı?", a: "Teklifin hangi eşya ve hizmet listesini kapsadığını kontrol edin. Adres, eşya veya hizmet değişirse uygulanacak koşulları işlem öncesinde görüşün." }
        ]
    };
}
