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
                "Dikmen, Oran ve Çayyolu gibi eğimli arazilerde ve yüksek katlı site projelerinde ise hem zemin eğimine kilitlenen özel destek ayaklı araçlarımız hem de site yönetim kurallarına uygun sessiz operasyon disiplinimiz devrededir. Eşyalarınızın her biri çift katlı kraft havalı naylonlarla paketlenir.",
                "Büyükelçilik çalışanları, bürokratlar ve üniversite akademisyenlerinin yoğun yaşadığı Çankaya'da gizlilik, dakiklik ve resmi sözleşmeli güvence esastır. Taşınma öncesinde noter tasdikli nitelikte sözleşme düzenlenerek tüm mobilyalarınız Axa ve Allianz emtia sigortası kapsamına alınır."
            ],
            localChallenge: {
                title: "Dar Sokaklar & Dik Eğimler",
                desc: "Ayrancı ve Tunalı'daki dar sokak parklanmaları ile Dikmen yokuşlarında standart kamyonların yanaşma güçlüğü."
            },
            logisticsSolution: {
                title: "Kompakt Araç & 25 Kat Asansör",
                desc: "Manevra kabiliyeti yüksek dar şasili kamyonlar ve 25. kata kadar dikey uzanan teleskopik hidrolik sepet sistemi."
            },
            features: [
                "Ayrancı ve Tunalı dar sokaklarına uygun hidrolik asansör",
                "Çukurambar ve Çayyolu sitelerinde peyzaj korumalı yanaşma",
                "Gardırop, beyaz eşya ve avizelerin ücretsiz demontaj/montajı",
                "Axa/Allianz tam kapsamlı taşınma sigortası poliçesi",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz bağlantısı",
                "Noter niteliğinde yazılı sabit fiyat sözleşmesi"
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
            h1: "Çankaya Ofis ve Büro Taşıma: Söğütözü & Çukurambar Plazalarında Sıfır İş Kaybı",
            description: "Çankaya kurumsal ofis ve büro taşımacılığı. Çukurambar, Söğütözü plazalarında hafta sonu sıfır iş kaybıyla IT sunucu ve numaralı arşiv nakliyesi.",
            intro: "Çankaya; Çukurambar, Söğütözü, Mustafa Kemal ve Armada-Tepe Prime aksıyla Ankara'nın kurumsal iş ve finans merkezidir.",
            paragraphs: [
                "Plaza ve iş merkezlerindeki kurumsal taşınmalarda en kritik unsur şirket operasyonunun kesintiye uğramamasıdır. Ankara Özdemir Nakliyat olarak Çankaya ofis taşıma projelerimizi Cuma günü saat 18:00'de başlatıp, Pazar gecesi tamamlayarak Pazartesi sabahı şirketinizi çalışmaya hazır teslim ediyoruz.",
                "Server odaları, rack kabinler, monitörler ve hassas elektronik altyapı antistatik darbe emici özel baloncuklu koruyucularla zırhlanır. Numaralı plastik kilitli sandık sistemimizle her departmanın klasörleri ve muhasebe arşivleri sıra numarası bozulmadan yeni ofisteki dolaplara aktarılır.",
                "Yönetici masaları, toplantı odası sistemleri ve modüler çalışma istasyonları kadrolu marangozlarımızca sökülüp yeni adreste projesine uygun şekilde monte edilir."
            ],
            localChallenge: {
                title: "Plaza Kuralları & Mesai Kesintisi",
                desc: "Yüksek katlı plazalarda yük asansörü rezervasyon kısıtları ve hafta içi çalışma saatlerindeki gürültü yasakları."
            },
            logisticsSolution: {
                title: "Hafta Sonu Gece Vardiyası",
                desc: "Cuma 18:00 - Pazar 21:00 arası kesintisiz gece vardiyasıyla sıfır iş kaybı ve plaza yönetimi tam uyumu."
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
                    a: "IT ekibinizin yönlendirmesiyle antistatik hava kanallı koruyuculara sarılır ve çelik kasalı araçlarımızdaki süspansiyonlu bölmelerde taşınır."
                },
                {
                    q: "Arşiv dosyalarının karışması nasıl önlenir?",
                    a: "Her klasör ve raf grubu oda/departman koduyla numaralandırılır, yeni ofiste aynı raf sırasıyla yerleştirilir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Çankaya Nakliyat Fiyatları (2026): Sabit Fiyat ve Şeffaf Maliyet Tarifesi",
            description: "2026 Çankaya evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 ve villa taşıma ücretleri, asansör ve marangozluk dahil net maliyet tablosu.",
            intro: "Çankaya genelinde nakliye fiyatları belirlenirken oda sayısı, kat yüksekliği, asansör gereksinimi ve semtler arası mesafe objektif kriterlerle hesaplanır.",
            paragraphs: [
                "Çankaya'da ortalama bir 1+1 daire taşıma ücreti 8.500 ₺ – 12.500 ₺ aralığındayken; 2+1 aile evleri 12.500 ₺ – 17.000 ₺, 3+1 daireler ise 17.500 ₺ – 25.000 ₺ aralığında sabitlenmektedir. Çayyolu, İncek ve Bilkent hattındaki villa ve dubleks konutlarda ise oda ve bahçe mobilyası yoğunluğuna göre özel eksper fiyatı verilir.",
                "Fiyatlarımıza çift katlı ambalajlama sarf malzemesi, gardırop ve yatak demontaj/montajı, beyaz eşyaların sökülüp yeni adreste su tesisatına bağlanması ve resmi Axa/Allianz sigortası dahildir. Kapıda 'eşyanız çokmuş', 'merdiven darmış' gibi bahanelerle ek ücret talep edilmez.",
                "Binanızda asansör kurulması gerekiyorsa bu bedel baştan yazılı teklifte açıkça belirtilir ve taşınma günü sonradan ilave maliyet çıkarılmaz."
            ],
            localChallenge: {
                title: "Belirsiz & Değişken Fiyatlar",
                desc: "Piyasada telefonda ucuz fiyat verip taşınma sabahı kapıda ekstra para isteyen komisyoncu ve aracılar."
            },
            logisticsSolution: {
                title: "Yazılı Noter Niteliğinde Taahhüt",
                desc: "Ücretsiz yerinde veya görüntülü ekspertiz ile sabitlenen, KDV ve montaj dahil değişmez net fiyat garantisi."
            },
            features: [
                "1+1 daireler için 8.500 ₺'den başlayan ekonomik seçenekler",
                "Marangoz, paketleme ve sigorta fiyata dahildir",
                "Çamaşır/bulaşık makinesi tesisat montajı ücretsiz",
                "Resmi sözleşmeli kapıda sürpriz masraf çıkarmama taahhüdü",
                "Kredi kartı veya taksitli ödeme kolaylığı",
                "Ücretsiz yerinde ekspertiz ile kesinleşen maliyet"
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
            description: "Keçiören evden eve nakliyat. Etlik, Subayevleri ve Aktepe'de yüksek katlı binalara 25. kata kadar hidrolik asansörlü, sigortalı ve marangozlu taşımacılık.",
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
                desc: "Doğrudan balkon veya geniş pencereye yanaşan, sıfır sarsıntılı hidrolik sepetli dış cephe asansörü."
            },
            features: [
                "Etlik ve Subayevleri'nde 25. kata kadar asansörlü kurulum",
                "Geniş aile mobilyaları için 2 kıdemli marangoz desteği",
                "Merdivensiz, duvara çarpmayan sıfır hasar protokolü",
                "Axa/Allianz güvencesiyle tam kapsamlı emtia poliçesi",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz montajı",
                "Resmi K3 taşıma yetki belgesi ve kadrolu uzman ekip"
            ],
            faq: [
                {
                    q: "Keçiören'deki yüksek katlı binalarda asansörünüz kaçıncı kata ulaşır?",
                    a: "Hidrolik teleskopik nakliyat asansörümüz 25. kata (yaklaşık 75 metre yükseklik) kadar güvenle ulaşabilmektedir."
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
                "Etlik ve Sanatoryum caddelerindeki mağaza, showroom ve eğitim merkezlerinin taşınması hafta sonu planlanarak eğitim veya ticari akışta tek bir saat bile kayıp yaşanmaz."
            ],
            localChallenge: {
                title: "Hassas Klinik & Büro Donanımı",
                desc: "Medikal cihazların sarsıntıya duyarlılığı ve hasta kayıt evraklarının gizlilik gereksinimi."
            },
            logisticsSolution: {
                title: "Antistatik Paketleme & Kilitli Transfer",
                desc: "Özel koruyucu antistatik balonlu sarım ve numaralı kilitli sandıklarla gizlilik garantili lojistik."
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
                    a: "Hayır, kurumsal müşterilerimize sunduğumuz hafta sonu ofis taşıma hizmetimizde standart sabit fiyat politikamız geçerlidir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Keçiören Nakliyat Fiyatları (2026): Bütçe Dostu Şeffaf Fiyat Listesi",
            description: "2026 Keçiören evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör ve marangozluk dahil güncel net fiyat tablosu.",
            intro: "Keçiören'de ev taşıma maliyetleri, geniş ailelerin bütçesini zorlamayacak şeffaf ve ekonomik paketlerle sunulmaktadır.",
            paragraphs: [
                "Keçiören içi nakliyat fiyatlarımız 1+1 daireler için 8.000 ₺ – 11.500 ₺, 2+1 daireler için 11.500 ₺ – 15.500 ₺, 3+1 geniş aile daireleri için 15.500 ₺ – 22.000 ₺ aralığında değişmektedir. Dubleks ve çok odalı çatı katı dairelerde ise 22.000 ₺'den başlayan fiyatlar uygulanır.",
                "Tüm paketlerimizde profesyonel marangozluk (gardırop söküm ve kurulumu), beyaz eşyaların çizilmez keçe ve balonlu naylonla zırhlanması, su tesisatı bağlantıları ve Axa/Allianz nakliyat emtia sigortası dahildir.",
                "Keçiören'in dik yokuşlu sokaklarında yüksek katlara kurulum yapılacaksa teleskopik asansör maliyeti teklifte açıkça yazılır; kapıda kesinlikle ek masraf talep edilmez."
            ],
            localChallenge: {
                title: "Ek Masraf Sürprizleri",
                desc: "Piyasadaki korsan nakliyecilerin taşınma günü 'kat yüksekmiş', 'mobilya çokmuş' diyerek fiyat artırması."
            },
            logisticsSolution: {
                title: "Sözleşmeli Sabit Fiyat Garantisi",
                desc: "Ekspertiz sonrası yazılı imzalanan ve sonradan 1 TL bile artmayan resmi sözleşmeli net tarife."
            },
            features: [
                "Keçiören içine özel 8.000 ₺'den başlayan şeffaf fiyatlar",
                "Marangoz ve beyaz eşya tesisat bağlantısı ücretsiz",
                "Asansör bedeli sözleşmede şeffafça belirtilir",
                "Öğrenci ve emeklilere özel %10 nakit indirimi",
                "Kredi kartıyla taksitli ödeme seçeneği",
                "Ücretsiz yerinde ve görüntülü keşif imkanı"
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
                "Şentepe, Pamuklar ve Barıştepe gibi eğimli bölgelerde ise dar sokak ve dik rampa manevra kabiliyeti yüksek kompakt çelik kasa araçlarımızı görevlendiriyoruz. Eşyalar sarsıntısız hava süspansiyonlu kasalarda güvenle sevk edilir.",
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
                "Çamaşır ve bulaşık makinesi tesisatı ücretsiz bağlantısı",
                "Axa/Allianz tam kapsamlı emtia taşıma sigortası"
            ],
            faq: [
                {
                    q: "Batıkent'te site yönetimi asansör kullanımına izin vermezse ne yapıyorsunuz?",
                    a: "Önceden keşif yaparak site yönetiminin onaylayacağı dış cephe asansörü konumlandırma noktasını veya bina yük asansörü saatlerini planlıyoruz."
                },
                {
                    q: "Şentepe'deki dar ve eğimli sokaklara kamyon girebilir mi?",
                    a: "Büyük kamyonların giremediği dar sokaklar için filomuzda özel kısa şasili nakliye araçlarımız mevcuttur."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Yenimahalle Ofis ve Sanayi Taşıma: Ostim & İvedik OSB Fabrika ve Atölye Nakliyesi",
            description: "Yenimahalle kurumsal ofis ve fabrika taşımacılığı. Ostim ve İvedik OSB'deki atölye, fabrika ve yönetim ofisleri için ağır yük ve IT nakliyesi.",
            intro: "Yenimahalle; Ostim OSB, İvedik Organize Sanayi ve Macunköy ile Türkiye'nin en büyük üretim ve ticaret merkezlerinden biridir.",
            paragraphs: [
                "Ostim ve İvedik Organize Sanayi bölgelerindeki ticari işletmelerin taşınmasında sadece büro mobilyaları değil; CNC makineleri, laboratuvar test cihazları, ağır yedek parça rafları ve teknik donanımlar yer alır. Ağır yük vinç ve forklift destekli nakliye filomuzla sanayi taşımacılığında tam yetkiniz.",
                "Şirketlerin idari binalarındaki muhasebe evrakları, müşteri dosyaları ve sunucu altyapısı departman bazlı numaralı sandıklarla taşınır. Hafta sonu yürütülen operasyonlarımız sayesinde Pazartesi sabahı üretim ve faturalama kesintisiz devam eder.",
                "T.C. Ulaştırma Bakanlığı K3 ve C2 yetki belgelerimiz ve 5 milyon TL'ye varan ağır sanayi taşıma emtia sigortamızla kurumsal güvence sağlıyoruz."
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
                "Hafta sonu sıfır iş ve üretim kaybı garantisi"
            ],
            faq: [
                {
                    q: "Ostim'deki atölyemizi hafta sonu taşıyabilir misiniz?",
                    a: "Evet; sanayi işletmelerimizi Cuma akşamı başlayıp Pazar günü tamamlayarak Pazartesi sabahı faaliyete hazır hale getiriyoruz."
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
            intro: "Yenimahalle'de daire büyüklüğüne ve semt özelliklerine göre hazırladığımız şeffaf ve sabit fiyat tarifesi aşağıdadır.",
            paragraphs: [
                "Yenimahalle genelinde 1+1 daire nakliyat fiyatları 8.000 ₺ – 12.000 ₺, standart 2+1 daireler 12.000 ₺ – 16.500 ₺, 3+1 site daireleri 16.500 ₺ – 23.000 ₺ aralığındadır. Çakırlar ve Batı Sitesi'ndeki villa ve geniş bahçeli konutlarda ise eşya yoğunluğuna göre 23.000 ₺ – 35.000 ₺ arasında teklif sunulur.",
                "Fiyatlarımıza profesyonel ambalaj sarf malzemeleri, mobilyaların usta marangozlarca sökülmesi ve kurulması, beyaz eşyaların su tesisatı bağlantısı ve Axa/Allianz emtia sigortası dahildir.",
                "Ekspertizimiz yerinde ya da WhatsApp görüntülü görüşme ile eşyalarınızı inceler ve net yazılı sözleşme imzalanır. Taşınma günü hiçbir ek ücret talep edilmez."
            ],
            localChallenge: {
                title: "Geniş Fiyat Yelpazesi & Güvensizlik",
                desc: "Piyasada kalite ve güvence sunmadan çok düşük fiyat verip kapıda sorun çıkaran korsan taşımacılar."
            },
            logisticsSolution: {
                title: "A'dan Z'ye Her Şey Dahil Net Tarife",
                desc: "Marangoz, paketleme, sigorta ve tesisat dahil şeffaf sabit fiyat sözleşmesi."
            },
            features: [
                "1+1 daireler için 8.000 ₺'den başlayan net fiyat",
                "Marangozlu mobilya montajı ve demontajı fiyata dahil",
                "Çamaşır/bulaşık makinesi tesisatı ücretsiz bağlanır",
                "K3 yetki belgeli özmal araçlar ve faturalı kurumsal güvence",
                "Batıkent ve Çakırlar sakinlerine özel indirimli fiyatlar",
                "Ücretsiz yerinde keşif ve sabit fiyat taahhüdü"
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
            h1: "Sincan Evden Eve Nakliyat: Fatih, Yenikent ve Törekent'te Merkez Üssü Gücü",
            description: "Sincan evden eve nakliyat. Merkez ofisimizin bulunduğu Sincan'da Fatih, Törekent, Yenikent'e en hızlı araç tahsisi, asansörlü ve garantili taşıma.",
            intro: "Ankara Özdemir Nakliyat'ın ana operasyon üssü ve araç garajının bulunduğu Sincan'da, hemşehrilerimize en avantajlı fiyat ve en hızlı nakliye hizmetini sunuyoruz.",
            paragraphs: [
                "Fatih, Törekent, Plevne, Selçuklu ve Yenikent mahallelerindeki geniş aile konutları ve yeni site projelerinde yılların tecrübesiyle çalışıyoruz. Araç filomuzun ve ekipman parkımızın Sincan'da yer alması sayesinde aynı gün acil taşınma taleplerine ve ekspertiz çağrılarına 30 dakika içinde yanıt veriyoruz.",
                "Sincan'daki geniş ailelerin çok parçalı salon ve yatak odası takımları için kadrolu marangozlarımız görev yapar. Gardıroplar, baza başlıkları ve çocuk odası üniteleri çizilmez patpat naylonlarla sarılarak hasarsız taşınır.",
                "Yüksek katlı TOKİ ve özel kooperatif sitelerinde 25. kata kadar ulaşabilen teleskopik hidrolik asansörlerimizle merdiven boşluklarını işgal etmeden taşınmayı 4-5 saatte tamamlıyoruz."
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
                "Sincan merkez üssümüzden 30 dakikada adreste ekspertiz",
                "Fatih, Yenikent ve Törekent'te 25. kata kadar asansörlü nakliye",
                "Geniş aile eşyalarına özel maksimum hacimli çelik kasa kamyon",
                "Marangozlu gardırop demontaj ve yeni evde montajı dahil",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz bağlantısı",
                "Axa/Allianz emtia sigortası ve yazılı sözleşme güvencesi"
            ],
            faq: [
                {
                    q: "Sincan'da acil taşınmam gerekirse aynı gün araç bulabilir miyim?",
                    a: "Merkez garajımız Sincan'da olduğu için müsaitlik durumuna göre aynı gün 1-2 saat içinde kapınıza araç ve ekip yönlendirebiliyoruz."
                },
                {
                    q: "Yenikent'teki yeni yüksek katlı sitelere asansörünüz kurulabilir mi?",
                    a: "Evet, 25. kata kadar uzanan hidrolik asansörlerimiz Yenikent'teki tüm yeni konut projelerine tam uyumludur."
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
                desc: "Cuma akşamı başlayıp Pazar tamamlanan, numaralı arşiv ve IT korumalı kurumsal lojistik."
            },
            features: [
                "Sincan 1. OSB ve Başkent OSB işletmelerine yerinde keşif",
                "Fabrika idari ofis ve arşiv nakliyesinde uzman kadro",
                "Antistatik sarımlı sunucu ve teknoloji donanımı taşıması",
                "Numaralı kilitli koli ve sandık sistemi",
                "Geniş kapsamlı kurumsal nakliyat sigortası",
                "Hafta sonu kesintisiz vardiyayla sıfır iş kaybı"
            ],
            faq: [
                {
                    q: "Fabrika ofisimiz için fatura ve resmi sözleşme düzenleniyor mu?",
                    a: "Evet, kurumsal K3 yetki belgemizle resmi sözleşme, emtia sigortası poliçesi ve kurumsal e-fatura düzenliyoruz."
                },
                {
                    q: "Çok katlı fabrika idari binalarına dış asansör kurulabilir mi?",
                    a: "Evet, fabrika sahasındaki araç yanaşma alanlarına hidrolik asansörümüz kurularak eşyalar pencerelerden hızlıca indirilir."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Sincan Nakliyat Fiyatları (2026): En Uygun Merkez Üssü Fiyat Tarifesi",
            description: "2026 Sincan evden eve nakliyat fiyatları. Merkez ofisimizin bulunduğu Sincan'da 1+1, 2+1, 3+1 daireler için en uygun net fiyat listesi.",
            intro: "Araç garajımızın ve merkez üssümüzün Sincan'da olması sayesinde yakıt ve araç intikal maliyetlerini en aza indirerek Sincan halkına en ekonomik nakliyat fiyatlarını sunuyoruz.",
            paragraphs: [
                "Sincan içi evden eve nakliyat fiyatlarımız 1+1 daireler için 7.500 ₺ – 10.500 ₺, standart 2+1 daireler için 10.500 ₺ – 15.000 ₺, 3+1 aile daireleri için ise 15.000 ₺ – 21.000 ₺ aralığındadır. 4+1 ve dubleks daireler 21.000 ₺ – 30.000 ₺ arasında fiyatlandırılır.",
                "Fiyatlarımıza ambalajlama sarf malzemesi, gardırop ve yatak demontaj/montajı, beyaz eşyaların su tesisatı bağlantısı ve Axa/Allianz emtia sigortası dahildir.",
                "Sincan'daki hemşehrilerimize özel hiçbir aracı ve komisyoncu olmadan doğrudan kendi araç ve personelimizle hizmet verdiğimiz için sürpriz masraf yaşamazsınız."
            ],
            localChallenge: {
                title: "Aracı & Komisyoncu Tuzağı",
                desc: "İnternette ucuza ilan verip işi başkasına komisyonla devreden korsan firmaların yarattığı mağduriyetler."
            },
            logisticsSolution: {
                title: "Kendi Özmal Filomuz & Merkez Üs Güvencesi",
                desc: "Doğrudan Sincan Atatürk Mahallesi'ndeki merkez ofisimizden resmi sözleşmeli ve garantili hizmet."
            },
            features: [
                "Sincan içine özel 7.500 ₺'den başlayan en avantajlı fiyatlar",
                "Merkez üssü güvencesiyle sıfır aracı komisyonu",
                "Marangoz, ambalajlama ve sigorta fiyata dahildir",
                "Çamaşır ve bulaşık makinesi montajı ücretsiz",
                "Kredi kartıyla taksit imkanı",
                "Sincan genelinde 30 dakikada ücretsiz ekspertiz"
            ],
            faq: [
                {
                    q: "Sincan içi taşınmalarda fiyat neden diğer ilçelerden daha uygun?",
                    a: "Araç filomuz ve ana personel kadromuz Sincan'da konuşlu olduğu için intikal ve yakıt maliyetimiz düşüktür; bu avantajı doğrudan müşterimize yansıtıyoruz."
                },
                {
                    q: "Fiyatta sonradan değişiklik olur mu?",
                    a: "Kesinlikle hayır; ekspertiz sonrası imzalanan sözleşmedeki rakam sabittir, kapıda 1 TL bile artmaz."
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
                "Elvankent ve Piyade mahallelerindeki taşınmalarda ise marangozlarımız gardıropları ve bazaları titizlikle söküp yeni evinizde dilediğiniz odaya kurar, beyaz eşyalarınızın su tesisatı bağlantılarını ücretsiz tamamlar."
            ],
            localChallenge: {
                title: "Site Kuralları & Yüksek Kat Yükü",
                desc: "Eryaman sitelerindeki katı yönetim kuralları ve Bağlıca'daki lüks mobilyaların hassasiyeti."
            },
            logisticsSolution: {
                title: "VIP Ambalaj & Teleskopik Asansör",
                desc: "Çizilmez koruyucu ambalajlama ve 20+ kat hidrolik dış cephe asansörü kurulumu."
            },
            features: [
                "Eryaman ve Bağlıca'da 20. kata kadar hidrolik asansör",
                "Lüks konut ve villalar için VIP kalın ambalaj paketi",
                "Marangozlu demontaj, montaj ve oda yerleşimi dahil",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz bağlantısı",
                "Axa/Allianz tam kapsamlı nakliyat emtia sigortası",
                "Etimesgut genelinde ücretsiz hızlı keşif ve sabit fiyat"
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
            description: "Etimesgut ofis ve büro taşımacılığı. Bağlıca ve Eryaman'daki kurumsal ofisler, klinikler, mimarlık büroları için hafta sonu sıfır iş kaybıyla taşıma.",
            intro: "Etimesgut ve Bağlıca aksında hızla gelişen iş merkezleri, mimarlık ofisleri, hukuk büroları ve özel klinikler için profesyonel taşıma hizmeti sunuyoruz.",
            paragraphs: [
                "Bağlıca Bulvarı ve Eryaman 1-5 etaplarındaki ticari ofislerin taşınmasında müşteri randevularını ve iş akışını aksatmamak için hafta sonu ekspres nakliye uyguluyoruz. Cuma akşamı paketlenen ofis, Pazar günü yeni adresinde çalışmaya hazır teslim edilir.",
                "Masaüstü bilgisayarlar, çok fonksiyonlu yazıcılar ve ağ anahtarları antistatik malzemelerle ambalajlanır. Numaralandırılmış dayanıklı plastik sandıklarla klasörler ve mali evraklar eksiksiz taşınır.",
                "Toplantı masaları, ofis bölme panelleri ve makam takımları marangozlarımızca sökülüp yeni ofisteki mimari plana göre monte edilir."
            ],
            localChallenge: {
                title: "İş Kaybı & Randevu İptalleri",
                desc: "Taşınma sebebiyle mesai saatlerinde müşterilere hizmet verilememesi riski."
            },
            logisticsSolution: {
                title: "Hafta Sonu Sıfır Mesai Kaybı",
                desc: "Cuma mesai bitiminden Pazar akşamına kadar anahtar teslim ofis kurulumu."
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
            intro: "Etimesgut genelinde sürpriz ek masraf çıkarmayan, marangoz ve sigorta dahil net fiyat tarifemiz aşağıdadır.",
            paragraphs: [
                "Etimesgut içi taşınmalarda 1+1 daireler 8.000 ₺ – 11.500 ₺, 2+1 daireler 11.500 ₺ – 16.000 ₺, 3+1 daireler 16.000 ₺ – 22.500 ₺ aralığındadır. Bağlıca'daki villa ve dubleks konutlar için 22.500 ₺ – 34.000 ₺ arasında net eksper fiyatı verilir.",
                "Fiyatlarımıza kaliteli patpat balonlu naylon ambalaj sarf malzemesi, mobilya söküm ve kurulum marangozluğu, beyaz eşya su tesisatı montajı ve Axa/Allianz nakliyat sigortası dahildir.",
                "Ücretsiz yerinde veya görüntülü ekspertiz hizmetimizle eşyalarınızı inceliyor, net sabit fiyat sözleşmesi imzalıyoruz. Taşınma günü kapıda ilave para talep edilmez."
            ],
            localChallenge: {
                title: "Taşınma Sabahı Ekstra Ücret Talebi",
                desc: "Piyasada ucuz fiyatla anlaşıp taşınma günü 'asansör parası', 'kat parası' adı altında fahiş artış yapanlar."
            },
            logisticsSolution: {
                title: "Sabit Fiyat Taahhütnamesi",
                desc: "Noter onaylı nitelikte yazılı sözleşmeyle kesinleşen, kapıda değişmeyen sabit fiyat garantisi."
            },
            features: [
                "1+1 daireler için 8.000 ₺'den başlayan şeffaf tarife",
                "Marangoz ve beyaz eşya tesisat bağlantısı ücretsiz",
                "Asansör bedeli baştan teklifte net belirtilir",
                "Bağlıca ve Eryaman sakinlerine özel indirimli fiyatlar",
                "Kredi kartıyla ödeme ve taksit kolaylığı",
                "Ücretsiz ekspertiz ile garantili fiyat tespiti"
            ],
            faq: [
                {
                    q: "Etimesgut'tan Çankaya'ya taşınma fiyatı ne kadar fark eder?",
                    a: "İlçeler arası mesafe yakıt farkı olarak eklenir, ortalama ilçe içi fiyata 1.500 - 2.500 ₺ mesafe farkı yansıtılır."
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
                "Durali Alıç, General Zeki Doğan ve Ege Mahallesi'ndeki yeni yüksek katlı konutlarda 25. kata kadar ulaşabilen modüler hidrolik asansörlerimizle eşyalarınızı sıfır hasarla taşıyoruz.",
                "Akdere ve Abidinpaşa'nın dar sokaklarında ise manevra kabiliyeti yüksek kompakt araç filomuzla hizmet veriyor, trafiği kilitlemeden hızlı yükleme sağlıyoruz.",
                "Geniş aile mobilyaları marangozlarımızca sökülür, beyaz eşyalar darbelere karşı çift katlı ambalajlanır ve yeni evinizde su tesisatı bağlantıları ücretsiz tamamlanır."
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
                "Durali Alıç ve TOKİ sitelerinde 25. kata kadar asansör",
                "Akdere ve Abidinpaşa dar sokaklarına uygun kompakt araç",
                "Marangozlu mobilya montaj ve demontajı dahil",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz montajı",
                "Axa/Allianz nakliyat sigortası güvencesi",
                "Mamak genelinde ücretsiz hızlı ekspertiz"
            ],
            faq: [
                {
                    q: "Mamak'taki dar sokaklarda asansör kurulabilir mi?",
                    a: "Sokak genişliği uygunsa kompakt asansörümüz kurulur, aksi takdirde bina merdivenlerinden özel koruma kılıflarıyla taşıma yapılır."
                },
                {
                    q: "Beyaz eşyalar yeni evde bağlanıyor mu?",
                    a: "Evet, çamaşır ve bulaşık makinelerinin temiz ve pis su bağlantıları ücretsiz yapılır."
                }
            ]
        },
        "ofis-tasima": {
            h1: "Mamak Ofis ve İş Yeri Taşıma: Mamak Caddesi & Samsun Yolu Ticari Nakliyesi",
            description: "Mamak ofis ve iş yeri taşıma. Mamak Caddesi, Samsun Yolu showroom, mağaza, büro ve atölyeler için sigortalı kurumsal nakliyat.",
            intro: "Mamak Caddesi ve Samsun Yolu aksında yer alan mağazalar, showroomlar, toptancılar ve bürolar için profesyonel taşıma sunuyoruz.",
            paragraphs: [
                "Ticari işletmelerin taşınmasında ürünlerin ve arşivlerin hasar görmemesi birincil önceliktir. Özel raflı çelik kasalı araçlarımızla ticari ürünlerinizi deforme olmadan yeni adresine taşıyoruz.",
                "Ofis bilgisayarları ve muhasebe arşivleri numaralandırılarak kayıpsız transfer edilir. Hafta sonu operasyonlarımızla ticari faaliyetlerinizde tek bir gün bile kesinti yaşanmaz.",
                "T.C. Ulaştırma Bakanlığı onaylı K3 yetki belgemiz ve resmi kurumsal sigortamızla tüm ticari varlıklarınız güvence altındadır."
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
                    a: "Evet, Cumartesi ve Pazar günleri işletmenizi kapatmadan gece vardiyasında taşıyabiliyoruz."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Mamak Nakliyat Fiyatları (2026): Ekonomik ve Sabit Fiyat Tarifesi",
            description: "2026 Mamak evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör, marangoz ve sigorta dahil güncel maliyet tablosu.",
            intro: "Mamak ilçesinde bütçe dostu, şeffaf ve kapıda sürpriz masraf çıkarmayan güncel nakliyat fiyat tarifemiz aşağıdadır.",
            paragraphs: [
                "Mamak içi evden eve nakliyat fiyatları 1+1 daireler için 7.500 ₺ – 11.000 ₺, 2+1 daireler için 11.000 ₺ – 15.500 ₺, 3+1 daireler için ise 15.500 ₺ – 21.500 ₺ aralığında sabitlenmektedir.",
                "Fiyatlarımıza çift katlı ambalajlama sarf malzemeleri, gardırop ve yatak odası mobilya marangozluğu, beyaz eşyaların su tesisatı montajı ve resmi Axa/Allianz sigortası dahildir.",
                "Ücretsiz yerinde veya görüntülü ekspertiz hizmetimizle eşyalarınızı inceler ve yazılı sabit fiyat sözleşmesi imzalarız. Taşınma günü hiçbir ek ücret çıkmaz."
            ],
            localChallenge: {
                title: "Düşük Fiyat Tuzağı",
                desc: "Piyasada gerçek dışı ucuz fiyat verip eşyayı araca yükledikten sonra fiyat artıran korsanlar."
            },
            logisticsSolution: {
                title: "Resmi Sözleşmeli Garanti",
                desc: "Önceden imzalanan, K3 belgeli ve faturalı değişmez sabit fiyat taahhüdü."
            },
            features: [
                "Mamak içine özel 7.500 ₺'den başlayan fiyatlar",
                "Marangoz ve beyaz eşya tesisatı ücretsiz",
                "Asansör bedeli sözleşmede şeffafça yazılır",
                "Öğrenci ve emeklilere özel %10 indirim",
                "Kredi kartıyla taksit imkanı",
                "Ücretsiz yerinde ekspertiz desteği"
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
                desc: "İncek villalarındaki hassas antika ve masif mobilyaların hasarsız transferi."
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
                "Axa/Allianz yüksek teminatlı villa emtia sigortası",
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
                "Teknokent firmalarının yazılım sunucuları, hassas test cihazları ve AR-GE prototipleri antistatik koruyucu kılıflarla ambalajlanarak sarsıntısız araçlarımızda sevk edilir.",
                "Akademik arşivler, tez kütüphaneleri ve kurumsal evraklar numaralı barkod sistemiyle kodlanarak yeni binadaki odalara eksiksiz dizilir.",
                "Hafta sonu yürütülen esnek operasyonlarımız sayesinde üniversite ve teknoloji şirketlerinde araştırma süreçleri aksamadan taşınma tamamlanır."
            ],
            localChallenge: {
                title: "Hassas AR-GE Cihazları & Gizlilik",
                desc: "Teknokent laboratuvar donanımlarının sarsıntıya duyarlılığı ve veri güvenliği."
            },
            logisticsSolution: {
                title: "Antistatik Paket & Gizlilik Sözleşmesi",
                desc: "Numaralı kilitli sandıklar, antistatik ambalaj ve gizlilik taahhütnamesi."
            },
            features: [
                "Teknokent ve AR-GE ofisleri özel nakliyatı",
                "Antistatik ambalajlı sunucu ve laboratuvar cihazı taşıması",
                "Numaralı kütüphane ve arşiv taşıma sistemi",
                "Hafta sonu sıfır iş kaybı ile anahtar teslim transfer",
                "Yüksek teminatlı kurumsal sigorta poliçesi",
                "Gölbaşı ve tüm Ankara'ya aynı gün teslimat"
            ],
            faq: [
                {
                    q: "AR-GE ve laboratuvar cihazları nasıl taşınır?",
                    a: "Teknik ekibinizle koordineli olarak cihazların sarsıntı emici özel sandıklarda ve hava süspansiyonlu araçlarımızda transferi sağlanır."
                },
                {
                    q: "Gizlilik sözleşmesi imzalıyor musunuz?",
                    a: "Evet, kurumsal ve teknoloji firmalarımızla gizlilik ve veri güvenliği taahhütnamesi imzalıyoruz."
                }
            ]
        },
        "nakliyat-fiyatlari": {
            h1: "Gölbaşı Nakliyat Fiyatları (2026): Daire ve Villa Şeffaf Fiyat Listesi",
            description: "2026 Gölbaşı evden eve nakliyat fiyatları. İncek villaları ve standart daireler için asansörlü güncel net maliyet tablosu.",
            intro: "Gölbaşı ilçesinde standart dairelerden lüks villalara kadar her konut tipine uygun şeffaf fiyatlandırma politikamız aşağıdadır.",
            paragraphs: [
                "Gölbaşı merkezindeki standart 1+1 daireler 8.500 ₺ – 12.000 ₺, 2+1 daireler 12.000 ₺ – 17.000 ₺, 3+1 daireler 17.000 ₺ – 24.000 ₺ aralığındadır. İncek ve Mogan kıyısındaki geniş villa ve malikanelerde ise 23.000 ₺ – 38.000 ₺ arasında özel eksper fiyatı verilir.",
                "Fiyatlarımıza kaliteli ambalajlama malzemeleri, marangozlu söküm ve montaj, beyaz eşya su tesisatı bağlantıları ve Axa/Allianz sigortası dahildir.",
                "Ücretsiz yerinde keşif hizmetimizle eşya hacminizi yerinde görüp net sözleşmeli sabit fiyat teklifimizi sunuyoruz."
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
                "Standart daireler için 8.500 ₺'den başlayan fiyatlar",
                "İncek villalarına özel sabit fiyatlı VIP paket",
                "Marangoz, paketleme ve sigorta fiyata dahildir",
                "Piyano ve kasa için şeffaf fiyatlandırma",
                "Kredi kartıyla ödeme imkanı",
                "Ücretsiz yerinde keşif hizmeti"
            ],
            faq: [
                {
                    q: "Gölbaşı villa taşıma fiyatına kaç araç dahildir?",
                    a: "Ekspertiz raporuna göre 3+1 ve üzeri geniş villalara çift büyük boy kapalı kasa kamyon tahsis edilir ve fiyata dahildir."
                },
                {
                    q: "Taşınma günü ekstra masraf çıkar mı?",
                    a: "Hayır; imzalanan resmi sözleşmedeki tutar kesindir ve sonradan ek ücret talep edilmez."
                }
            ]
        }
    }
};

// Fallback generator for other districts with rich custom facts
export function getDistrictServiceContent(districtSlug: string, serviceSlug: "evden-eve-nakliyat" | "ofis-tasima" | "nakliyat-fiyatlari", districtName: string): DistrictServiceDetail {
    if (districtServiceData[districtSlug] && districtServiceData[districtSlug][serviceSlug]) {
        return districtServiceData[districtSlug][serviceSlug];
    }

    if (serviceSlug === "evden-eve-nakliyat") {
        return {
            h1: `${districtName} Evden Eve Nakliyat: Asansörlü, Sigortalı ve Sabit Fiyatlı Taşıma`,
            description: `${districtName} evden eve nakliyat hizmeti. ${districtName} genelinde 25. kata kadar asansörlü, sigortalı, marangozlu ve anahtar teslim ev taşıma çözümleri.`,
            intro: `${districtName} bölgesinde ev taşıma operasyonlarında 15 yılı aşkın deneyimimiz, uzman kadromuz ve modern araç filomuzla hizmet veriyoruz.`,
            paragraphs: [
                `${districtName} ilçesinde gerçekleştirdiğimiz evden eve nakliyat hizmetlerimizde binaların kat durumu, sokak yapısı ve yol koşullarına uygun araç tahsisi yapıyoruz. Eşyalarınız profesyonel ekibimizce çift katlı darbe emici balonlu naylonlarla ambalajlanarak tam koruma altına alınır.`,
                `${districtName} asansörlü nakliyat çözümlerimizle yüksek katlı apartmanlarda bina merdivenlerine ve asansörlerine zarar vermeden eşyalarınızı doğrudan araç kasasına indiriyoruz. Alanında uzman marangozlarımız gardıroplarınızı demonte edip yeni evinizde monte ederken, beyaz eşyalarınızın su tesisatı bağlantıları ücretsiz yapılmaktadır.`,
                `Taşınma öncesinde noter niteliğinde yazılı sözleşme düzenlenerek tüm eşyalarınız Axa ve Allianz emtia sigortası kapsamına alınır. ${districtName} genelinde kapıda sürpriz masraf çıkarmayan şeffaf sabit fiyat politikamızla güvenle taşınabilirsiniz.`
            ],
            localChallenge: {
                title: `${districtName} Bölgesel Lojistik Koşulları`,
                desc: `${districtName} yerleşim alanlarında kat yükseklikleri, dar sokak manevraları ve eşya güvenliğinin sağlanması.`
            },
            logisticsSolution: {
                title: "Asansörlü & Sigortalı Çözüm",
                desc: "Modüler teleskopik dış cephe asansörü ve çift katlı koruma ambalajı ile sıfır riskli transfer."
            },
            features: [
                `${districtName} genelinde 25. kata kadar asansörlü taşıma`,
                "Marangozlu mobilya söküm ve montajı fiyata dahil",
                "Çamaşır ve bulaşık makinesi su tesisatı ücretsiz bağlantısı",
                "Axa/Allianz tam kapsamlı emtia sigortası poliçesi",
                "Yazılı sözleşmeli sabit fiyat garantisi (kapıda ek ücret yok)",
                "Ücretsiz yerinde ve görüntülü ekspertiz hizmeti"
            ],
            faq: [
                {
                    q: `${districtName} evden eve nakliyat ne kadar sürer?`,
                    a: "Ortalama bir 2+1 veya 3+1 dairenin paketlenmesi, yüklenmesi ve yeni adreste montajı 4 ile 7 saat arasında tamamlanmaktadır."
                },
                {
                    q: `${districtName} taşınmasında mobilya montajını kim yapıyor?`,
                    a: "Ekibimizdeki kadrolu uzman marangoz tüm dolap, gardırop ve yatak demontaj ve montajını eksiksiz tamamlar."
                }
            ]
        };
    } else if (serviceSlug === "ofis-tasima") {
        return {
            h1: `${districtName} Ofis ve İş Yeri Taşıma: Kurumsal & Sıfır İş Kaybı Garantisi`,
            description: `${districtName} ofis ve iş yeri taşımacılığı. ${districtName} bölgesindeki şirketler, bürolar, klinikler ve mağazalar için hafta sonu sigortalı kurumsal nakliyat.`,
            intro: `${districtName} bölgesindeki kurumsal şirketler, bürolar ve ticari işletmeler için iş kaybını sıfıra indiren profesyonel ofis nakliyesi sunuyoruz.`,
            paragraphs: [
                `${districtName} ofis taşıma hizmetlerimizde şirketinizin müşteri iletişimini ve operasyonunu aksatmamak için taşıma sürecini mesai dışı saatlerde veya hafta sonu yürütüyoruz. Cuma akşamı başlayan paketleme süreci Pazar günü tamamlanarak Pazartesi sabahı faaliyete hazır teslim edilir.`,
                `Bilgisayarlar, sunucu kabinleri ve hassas teknolojik cihazlar antistatik koruyucu malzemelerle paketlenir. Şirketinizin muhasebe ve arşiv klasörleri numaralı mühürlü sandık sistemimizle sıra numarası bozulmadan yeni ofise transfer edilir.`,
                `Tüm ofis demirbaşları ve mobilyaları K3 yetki belgemiz ve Axa/Allianz kurumsal emtia poliçesiyle teminat altına alınır. Uzman marangozlarımız çalışma masaları ve toplantı ünitelerini kusursuz monte eder.`
            ],
            localChallenge: {
                title: "Kurumsal Mesai & Veri Güvenliği",
                desc: "Ofis taşınırken iş akışının kesintiye uğramaması ve kurumsal arşivin gizliliğinin korunması."
            },
            logisticsSolution: {
                title: "Hafta Sonu Transfer & Numaralı Arşiv",
                desc: "Hafta sonu kesintisiz vardiya, antistatik IT ambalajı ve numaralandırılmış sandıklama."
            },
            features: [
                `${districtName} şirketlerine hafta sonu kesintisiz nakliye`,
                "Antistatik IT ekipmanı ve sunucu ambalajlama",
                "Numaralı ve kilitli arşiv taşıma sandıkları",
                "Modüler ofis masaları marangozlu söküm ve montajı",
                "Yüksek teminatlı kurumsal nakliyat sigortası",
                "Resmi sözleşmeli ve faturalı kurumsal güvence"
            ],
            faq: [
                {
                    q: `${districtName} ofis taşıması hafta sonu yapılabilir mi?`,
                    a: "Evet, şirketinizin mesaisini aksatmamak için Cuma akşamından Pazar gecesine kadar kesintisiz taşıma yapabiliyoruz."
                },
                {
                    q: "Arşiv dosyalarının karışması nasıl önlenir?",
                    a: "Her klasör departman ve personel koduyla numaralandırılır, yeni ofiste aynı dolap sırasına yerleştirilir."
                }
            ]
        };
    } else {
        return {
            h1: `${districtName} Nakliyat Fiyatları (2026): Şeffaf ve Sabit Fiyat Tarifesi`,
            description: `2026 ${districtName} evden eve nakliyat fiyatları. 1+1, 2+1, 3+1 daireler için asansör, marangoz ve sigorta dahil güncel net fiyat tablosu.`,
            intro: `${districtName} genelinde ev ve ofis taşıma maliyetleri için oda sayısı, kat durumu ve mesafeye göre şeffaf fiyatlandırma tablomuz aşağıdadır.`,
            paragraphs: [
                `${districtName} içi evden eve nakliyat fiyatlarımız 1+1 daireler için 8.000 ₺ – 11.500 ₺, standart 2+1 daireler için 11.500 ₺ – 16.000 ₺, 3+1 aile daireleri için 16.000 ₺ – 22.500 ₺ aralığındadır. Dubleks ve villa tipi konutlar için 22.500 ₺'den başlayan fiyatlar uygulanır.`,
                `Fiyatlarımıza kaliteli patpat naylon sarf malzemesi, gardırop ve yatak demontaj/montaj marangozluğu, beyaz eşyaların su tesisatı bağlantısı ve Axa/Allianz emtia sigortası dahildir.`,
                `Ücretsiz yerinde veya görüntülü ekspertiz hizmetimizle taşınma günü öncesinde net sözleşmeli fiyat verilir. Kapıda ek ücret talep edilmez.`
            ],
            localChallenge: {
                title: "Belirsiz Fiyatlar & Gizli Ek Maliyetler",
                desc: "Piyasada telefonda ucuz söyleyip taşınma günü kapıda bahanelerle fiyat artıran firmalar."
            },
            logisticsSolution: {
                title: "Yazılı Sözleşmeli Sabit Fiyat",
                desc: "Ekspertizle sabitlenen, KDV ve montaj dahil sonradan değişmeyen net taahhüt."
            },
            features: [
                `${districtName} genelinde 8.000 ₺'den başlayan şeffaf fiyatlar`,
                "Marangoz ve beyaz eşya tesisatı ücretsiz",
                "Asansör bedeli teklifte açıkça belirtilir",
                "Öğrenci ve emeklilere özel indirim seçenekleri",
                "Kredi kartıyla taksitli ödeme kolaylığı",
                "Ücretsiz yerinde ekspertiz ve sabit fiyat garantisi"
            ],
            faq: [
                {
                    q: `${districtName} içi taşınmada fiyatı ne belirler?`,
                    a: "Eşya hacmi (oda sayısı), kat yükseklikleri ve dış cephe asansörü gereksinimi en temel maliyet kriterleridir."
                },
                {
                    q: "Kapıda sonradan ek ücret çıkar mı?",
                    a: "Hayır; imzalanan yazılı sözleşmedeki fiyat kesindir ve sonradan hiçbir ek masraf talep edilmez."
                }
            ]
        };
    }
}
