import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const blogPath = path.join(rootDir, "src/data/blogDataGen.json");
const makalelerPath = path.join(rootDir, "src/data/makalelerData.json");

const blogPosts = JSON.parse(fs.readFileSync(blogPath, "utf-8"));
const makaleler = JSON.parse(fs.readFileSync(makalelerPath, "utf-8"));

console.log(`Mevcut blog sayısı: ${blogPosts.length}`);
console.log(`Mevcut makale sayısı: ${makaleler.length}`);

// Extract district from title/slug/category or fallback
function extractDistrict(item) {
    const text = (item.title + " " + item.slug + " " + (item.location || "")).toLowerCase();
    const districts = [
        "çankaya", "kecioren", "keçiören", "yenimahalle", "mamak", "etimesgut", "sincan", 
        "gölbaşı", "golbasi", "altındağ", "altindag", "pursaklar", "çubuk", "cubuk", 
        "kahramankazan", "kazan", "akyurt", "beypazarı", "beypazari", "elmadağ", "elmadag", 
        "polatlı", "polatli", "kızılcahamam", "kizilcahamam", "haymana", "nallıhan", "nallihan", 
        "şereflikoçhisar", "sereflikochisar", "ayaş", "ayas", "balâ", "bala", "çamlıdere", "camlidere", 
        "kalecik", "güdül", "gudul", "evren"
    ];
    for (const d of districts) {
        if (text.includes(d)) {
            // Capitalize properly
            return d.charAt(0).toUpperCase() + d.slice(1);
        }
    }
    return "Ankara";
}

// 8 Distinct Content Archetypes for rich variety
const ARCHETYPES = [
    {
        id: "operasyonel_rehber",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. ${district} Bölgesinde Taşınma Öncesi Lojistik Planlama`;
            const h2_2 = `2. Kat Yüksekliği ve Dış Cephe Asansörü Gereksinimleri`;
            const h2_3 = `3. Adım Adım Güvenli Yükleme ve Sabitleme Aşamaları`;
            const h2_4 = `4. Yeni Adreste Anahtar Teslim Montaj ve Yerleşim`;
            
            const content = `## ${district} ${topic}: Adım Adım Taşınma Rehberi

${district} genelinde ${topic.toLowerCase()} süreci doğru planlanmadığında hem zaman kaybına hem de yüksek strese yol açabilir. Başarılı bir taşınmanın temeli, ilk andan teslimat anına kadar her aşamanın disiplinle koordine edilmesidir.

### ${h2_1}
Taşınma gününden en az 3-4 gün önce adresinize özel bir lojistik yol haritası çıkarılmalıdır:
- **Sokak ve Araç Keşfi:** ${district} sokaklarındaki sabah parklanma yoğunluğu ve kamyonun binaya en yakın yanaşma açısı tespit edilir.
- **Site ve Bina Yönetimi İletişimi:** Site yönetimine taşınma tarihi bildirilerek araç giriş izni ve bina asansörü kuralları önceden netleştirilir.
- **Elektrik ve Su Abonelikleri:** Yeni adresteki aboneliklerin taşınma gününden 1 gün önce aktif hale getirilmesi tavsiye edilir.

### ${h2_2}
${district} bölgesindeki modern sitelerde ve çok katlı apartmanlarda bina merdivenlerinden eşya taşımak mobilyaların köşelerinin ezilmesine veya apartman duvarlarının çizilmesine neden olabilir. 
- 25. kata kadar ulaşabilen teleskopik dış cephe asansörlerimizle dairenizin balkonundan doğrudan araç kasasına güvenli iniş sağlanır.
- Bu sistem sayesinde geleneksel 8 saat süren merdiven taşımacılığı 3-4 saat gibi kısa bir sürede sıfır hasarla tamamlanır.

### ${h2_3}
1. **Zırhlı Paketleme:** Gardırop kapakları, çekmeceler ve yatak başlıkları kalın patpat naylonlarla sarılır.
2. **Kırılacak Eşya Koruması:** Mutfak porselenleri ve bardaklar gazete kağıdı yerine sıfır beyaz kraft kağıtlara sarılıp özel çift dalgalı kolilere dizilir.
3. **Kamyon İçi Sabitleme:** Araç kasasında özel gergi kayışları ve sünger bariyerler kullanılarak seyir halindeki sarsıntılar tamamen nötrleştirilir.

### ${h2_4}
Yeni evinize ulaşıldığında mobilyalarınız demonte edildiği odaların aynısına taşınır. Kadrolu marangozumuz gardıropları kurar, beyaz eşyalarınızın (çamaşır ve bulaşık makinesi) su tesisatı bağlantıları ek ücret talep edilmeden yapılır.

> [!TIP]
> ${district} lokasyonunda taşınırken sürpriz ek masraflarla karşılaşmamak için mutlaka noter niteliğinde yazılı sözleşme ve Axa/Allianz emtia sigortası talep edin.`;

            return {
                excerpt: `${district} bölgesinde ${topic.toLowerCase()} için hazırladığımız adım adım rehber. Asansör kurulumu, zırhlı paketleme ve marangozlu montaj detayları.`,
                content
            };
        }
    },
    {
        id: "maliyet_tasarruf",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. ${district} Nakliyat Fiyatını Belirleyen 4 Temel Kriter`;
            const h2_2 = `2. Komisyoncu ve Aracı Sitelerin Gizli Maliyet Tuzakları`;
            const h2_3 = `3. Bütçenizi Koruyacak Pratik Taşınma Tasarrufları`;
            const h2_4 = `4. 2026 Sabit Fiyat Sözleşmesi Neden Zorunludur?`;

            const content = `## ${district} ${topic}: Şeffaf Fiyatlandırma ve Bütçe Kılavuzu

Taşınma sürecinde kullanıcıların en çok çekindiği konu, telefonda verilen ucuz teklifin taşınma günü kapıda bahanelerle iki katına çıkarılmasıdır. ${district} bölgesinde ${topic.toLowerCase()} maliyetlerini belirleyen gerçek parametreleri açıklıyoruz.

### ${h2_1}
Net nakliyat fiyatı rastgele değil, şu somut verilere dayanılarak hesaplanır:
- **Eşya Hacmi (Oda Sayısı):** 1+1, 2+1, 3+1 veya villa tipi eşyaların kapladığı metreküp ($m^3$) hacmi araç boyutunu ve personel sayısını belirler.
- **Kat Yükseklikleri:** Eski ve yeni adresteki kat durumları ve dış cephe asansörü gereksinimi.
- **Taşıma Mesafesi:** ${district} içi veya ilçeler arası kilometre bazlı yakıt ve güzergah maliyeti.
- **Paketleme Kapsamı:** Standart taşıma mı yoksa kıyafetlerden mutfak bardaklarına kadar anahtar teslim VIP toplama mı tercih edildiği.

### ${h2_2}
İnternetteki komisyoncu portallar (Armut vb.) genellikle taşıma yapmaz; işi komisyon karşılığı dışarıdaki şahıslara satar. Bu durum şu riskleri doğurur:
- Taşınma günü kapıya gelen nakliyecinin verilen fiyattan habersiz olması ve 'bu paraya bu eşya taşınmaz' demesi.
- K3 Karayolu Yetki Belgesi ve resmi sigorta poliçesinin bulunmaması.

### ${h2_3}
- Taşınmadan önce kullanmadığınız kıyafet ve fazlalık eşyaları ayırarak eşya hacmini %15-20 azaltabilirsiniz.
- Küçük şahsi eşyalarınızı ve değerli takı/evraklarınızı önceden kendi valizinize koyun.
- Hafta içi taşınma randevuları hafta sonuna göre daha ekonomik fiyat avantajları sunabilir.

### ${h2_4}
Ankara Özdemir Nakliyat olarak ${district} genelindeki tüm operasyonlarımızda ekspertiz sonrası yazılı sabit fiyat sözleşmesi düzenliyoruz. Sözleşmedeki tutar KDV, marangoz ve sigorta dahil olup kapıda 1 TL dahi artmaz.

> [!IMPORTANT]
> Yazılı sözleşme ve K3 belgesi sunmayan hiçbir kişi veya aracı kuruluşa kaparo göndermeyiniz.`;

            return {
                excerpt: `${district} ${topic.toLowerCase()} fiyatları nasıl hesaplanır? 2026 sabit fiyat tarifesi, komisyoncu riskleri ve bütçe tasarruf ipuçları.`,
                content
            };
        }
    },
    {
        id: "ambalaj_guvenlik",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. Profesyonel Ambalaj Malzemesi Seçiminin Önemi`;
            const h2_2 = `2. Kırılacak Mutfak ve Cam Eşyaların Zırhlanması`;
            const h2_3 = `3. Mobilya Demontajı ve Köşe Koruma Sistemleri`;
            const h2_4 = `4. Beyaz Eşyaların Özel Muhafazası ve Tesisat Bağlantısı`;

            const content = `## ${district} ${topic}: Eşya Zırhlama ve Paketleme Standartları

Ev veya ofis taşınırken eşyaların çizilmeden, kırılmadan ve deforme olmadan yeni adrese ulaşması tamamen kullanılan ambalaj malzemesinin kalitesine ve paketleme tekniğine bağlıdır. ${district} bölgesinde ${topic.toLowerCase()} standartlarımızı inceliyoruz.

### ${h2_1}
Sıradan battaniyeler ve kalitesiz tek katlı naylonlar taşınma sırasındaki sürtünme darbelerini engelleyemez:
- **Çift Katlı Kraft Havalı Naylon:** Mobilya ve beyaz eşyaların dış yüzeyini darbelere karşı zırhlar.
- **Köşe Koruyucu Profiller:** Masaların ve vitrinlerin sivri köşelerine takılarak darbe kırılmalarını önler.
- **Streç Film Zırhı:** Toz, nem ve dış hava şartlarına karşı nem bariyeri oluşturur.

### ${h2_2}
Mutfak eşyaları taşınmanın en hassas halkasıdır:
- Porselen tabaklar ve kristal bardaklar sıfır beyaz pelür kağıtlarla tek tek sarılır.
- Kolilerin alt ve üst tabanlarına havalı naylon şilteler serilerek sarsıntı anında amortisör etkisi yaratılır.
- Kolilerin üzerine kırmızı zeminli "DİKKAT KIRILACAK" uyarı bantları çekilir.

### ${h2_3}
Büyük gardıroplar, baza başlıkları ve üniteler uzman marangozumuzca numaralandırılarak parçalara ayrılır. Ray sistemleri ve menteşeler özel ambalaj poşetlerinde muhafaza edilerek vidaların kaybolması engellenir.

### ${h2_4}
Buzdolabı, çamaşır makinesi ve kurutma makineleri iç tamburları sabitlenerek özel koruyucu kılıflarla sarılır. Yeni evinizde marangozumuz çamaşır ve bulaşık makinenizin su giriş-çıkış bağlantılarını ücretsiz tamamlayıp test eder.

> [!NOTE]
> Firmamız tüm operasyonlarında sıfır, hijyenik ve çevre dostu paketleme malzemeleri kullanmaktadır.`;

            return {
                excerpt: `${district} ${topic.toLowerCase()} operasyonlarında uygulanan profesyonel paketleme, zırhlı ambalajlama ve marangozlu montaj kriterleri.`,
                content
            };
        }
    },
    {
        id: "dikey_lojistik",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. ${district} Mimarisinde Dış Cephe Asansörünün Rolü`;
            const h2_2 = `2. Modüler ve Teleskopik Asansör Kurulum Kriterleri`;
            const h2_3 = `3. Sıfır Çizik ve %100 Hasarsızlık Güvencesi`;
            const h2_4 = `4. Çevre ve İş Güvenliği Önlemleri`;

            const content = `## ${district} ${topic}: 25. Kata Kadar Asansörlü Lojistik Teknolojisi

Yüksek katlı rezidanslar, dar apartman koridorları ve dik merdivenler geleneksel taşınma yöntemlerini hem riskli hem de yorucu hale getirmektedir. ${district} genelinde sunduğumuz ${topic.toLowerCase()} teknolojisi bu sorunları kökten çözmektedir.

### ${h2_1}
${district} bölgesindeki yapılaşmada kat yükseklikleri 10 ila 25 kat arasına ulaşmaktadır. Çoğu apartman yönetimi ortak alanların yıpranmasını önlemek için bina içi asansörlerin eşya taşımada kullanılmasını yasaklar. 
- Hidrolik raylı dış cephe asansörlerimizle bina ortak alanlarını hiç işgal etmeden dairenizin penceresine veya balkonuna dikey hat kuruyoruz.
- Eşyalar doğrudan evin içinden asansör sepetine konularak saniyeler içinde kamyon kasasına indirilir.

### ${h2_2}
Asansörün güvenli kurulabilmesi için uzman eksperimiz şu teyitleri gerçekleştirir:
- Aracın bina cephesine emniyetli yaklaşabileceği otopark veya sokak alanı.
- Kurulum güzergahında engel teşkil edecek yüksek gerilim elektrik hatlarının bulunmaması.
- Eşyaların rahat geçebileceği uygun bir balkon kapısı veya geniş açılır salon penceresi.

### ${h2_3}
Geleneksel merdiven taşımalarında eşyaların duvarlara, korkuluklara çarpması veya personelin elinden kayması riski vardır. Dış cephe asansöründe ise eşya sepete sabitlenir ve hidrolik fren sistemiyle sarsıntısız iner; bu sayede çizilme ve hasar riski %0'a indirilir.

### ${h2_4}
Asansör kurulum sahası emniyet konileri ve güvenlik şeritleriyle çevrilir. Operasyon süresince yetkili sertifikalı operatör sistemi yönetir, yaya ve araç trafiği güvenliği tam sağlanır.

> [!TIP]
> Bina içi asansör ceza risklerinden ve komşularla yaşanacak sürtüşmelerden kurtulmak için dış cephe asansörlü taşıma tercih ediniz.`;

            return {
                excerpt: `${district} ${topic.toLowerCase()} hizmetinde 25. kata kadar dış cephe modüler asansör teknolojisi. Sıfır hasar ve hızlı taşınma avantajları.`,
                content
            };
        }
    },
    {
        id: "kurumsal_ofis",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. Kurumsal Ofis Taşımalarında Sıfır İş Kaybı Prensibi`;
            const h2_2 = `2. IT Altyapısı, Sunucu ve Hassas Elektronik Güvenliği`;
            const h2_3 = `3. Numaralandırılmış Arşiv ve Klasör Düzenleme Sistemi`;
            const h2_4 = `4. Hafta Sonu ve Mesai Dışı Lojistik Yönetimi`;

            const content = `## ${district} ${topic}: Kurumsal Ofis ve İş Yeri Nakliyatı

Şirketlerin adres değişikliği süreçlerinde en kritik başarı göstergesi, iş akışının, faturalama sisteminin ve müşteri iletişiminin kesintiye uğramamasıdır. ${district} kurumsal şirketlerine özel geliştirdiğimiz ${topic.toLowerCase()} modelini detaylandırıyoruz.

### ${h2_1}
Kurumsal taşımalarda plansızlık günlerce süren iş kayıplarına yol açabilir. Bu sebeple:
- Operasyon öncesi ofis kat planı çıkarılır ve tüm birimler renk kodlarıyla eşleştirilir.
- Personel masaları, sandalyeler ve bilgisayarlar ilgili çalışanın departman koduyla etiketlenir.
- Yeni ofiste her parça önceden belirlenen odaya doğrudan yerleştirilir.

### ${h2_2}
Server odaları, rack kabinler, kurumsal anahtarlar (switch) ve masaüstü bilgisayarlar antistatik hava kanallı malzemelerle sarılır. Darbe emici süngerli bölmeler içeren çelik kasalı araçlarımızda sarsıntısız nakledilir.

### ${h2_3}
Muhasebe, insan kaynakları ve hukuk evraklarının gizliliği ve sırası esastır:
- Klasörler raf sırasına göre numaralı kilitlenebilir plastik güvenlik sandıklarına yerleştirilir.
- Sandıklar mühürlenir ve şirket yetkilisinin gözetiminde araca yüklenir.
- Yeni ofisteki arşiv dolaplarına aynı sıra numarasıyla eksiksiz dizilir.

### ${h2_4}
Taşınma Cuma akşamı saat 18:00'de başlatılır. Hafta sonu gece ve gündüz vardiyalı çalışan uzman ekiplerimiz, Pazar günü akşam saatlerinde tüm mobilya ve bilgisayar kurulumlarını tamamlar. Pazartesi sabahı şirketiniz hiçbir mesai kaybı yaşamadan çalışmaya başlar.

> [!IMPORTANT]
> Kurumsal taşımalarımız Ulaştırma Bakanlığı K3 yetki belgesi ve yüksek teminatlı resmi emtia sigortası ile icra edilmektedir.`;

            return {
                excerpt: `${district} kurumsal ofis ve büro taşımacılığında IT donanım koruması, numaralı arşiv düzeni ve hafta sonu sıfır iş kaybı protokolü.`,
                content
            };
        }
    },
    {
        id: "sehirler_arasi",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. Ankara - 81 İl Arası Güvenli Lojistik Ağı`;
            const h2_2 = `2. Uzun Yol İklim ve Yol Koşullarına Karşı Zırhlama`;
            const h2_3 = `3. Komple ve Parsiyel (Parça Eşya) Taşıma Seçenekleri`;
            const h2_4 = `4. 7/24 GPS Araç Takip Sistemi ve Zamanında Teslimat`;

            const content = `## ${district} ${topic}: Şehirler Arası Sigortalı Sevkiyat Standartları

Şehirler arası taşınma, şehir içi nakliyeye kıyasla yüzlerce kilometrelik yol şartlarını, viraj sarsıntılarını ve değişen hava koşullarını kapsar. ${district} çıkışlı ${topic.toLowerCase()} operasyonlarımızda uyguladığımız güvenlik protokolleri aşağıdadır.

### ${h2_1}
Ankara merkezli filomuzla Türkiye'nin 81 iline kesintisiz çift yönlü seferler düzenliyoruz:
- Özellikle Ankara - İstanbul, Ankara - İzmir ve Ankara - Antalya güzergahlarında haftalık düzenli ring seferlerimiz mevcuttur.
- Eşyalarınız aktarma yapılmadan, yüklendiği araçla doğrudan teslimat adresine sevk edilir.

### ${h2_2}
Uzun yolda araç içi sarsıntılar eşyaların birbirine sürtünmesine neden olabilir. Bunu önlemek için:
- Eşyalar kamyon kasasındaki özel bağlantı raylarına gergi kemerleriyle sabitlenir.
- Ahşap mobilyalar arasına yumuşak koruyucu şilteler yerleştirilir.
- Yağmur, kar ve toza karşı çelik kapalı kasa araçlarımızın sızdırmazlık contaları kontrol edilir.

### ${h2_3}
- **Komple Taşınma:** Aracın tamamı yalnızca sizin eşyalarınıza tahsis edilir; dilediğiniz gün ve saatte teslimat yapılır.
- **Parsiyel (Parça Eşya) Taşınma:** Az miktarda eşyanız varsa aynı güzergahtaki diğer müşterilerimizle araç paylaştırılarak %40'a varan maliyet avantajı sağlanır.

### ${h2_4}
Tüm araçlarımızda uydu destekli 7/24 GPS takip sistemi bulunmaktadır. Eşyalarınızın yolculuğunu ve tahmini varış saatini çağrı merkezimizden anlık olarak takip edebilirsiniz.

> [!TIP]
> Şehirler arası taşınmalarda emtia sigortası zorunludur. Eşyalarınız yola çıkmadan önce poliçe numaranızı mutlaka kontrol ediniz.`;

            return {
                excerpt: `${district} çıkışlı Türkiye geneli şehirler arası nakliyat çözümleri. Uzun yol zırhlı ambalajlama, GPS takibi ve tam kapsamlı emtia sigortası.`,
                content
            };
        }
    },
    {
        id: "depolama_cozumleri",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. Ne Zaman Eşya Depolama Hizmetine İhtiyaç Duyulur?`;
            const h2_2 = `2. Nem, Rutubet ve Sıcaklık Kontrollü Depolama Alanları`;
            const h2_3 = `3. 7/24 Kamera (CCTV) ve Biyometrik Güvenlik Protokolü`;
            const h2_4 = `4. Depolama Öncesi Özel Koruyucu Ambalajlama`;

            const content = `## ${district} ${topic}: Güvenli ve İklimlendirmeli Depolama Çözümleri

Ev tadilatı, geçici yurt dışı görevi, evlilik hazırlıkları veya yeni evin teslimat gecikmesi gibi durumlarda eşyaların güvenle saklanabileceği hijyenik bir depolama alanına ihtiyaç duyulur. ${district} bölgesinde sunduğumuz ${topic.toLowerCase()} imkanlarını aktarıyoruz.

### ${h2_1}
Eşya depolama hizmetimiz şu durumlarda hayat kurtarıcı bir çözüm sunar:
- Evinizde kapsamlı boya, badana ve tadilat varken eşyaların tozdan zarar görmesini engellemek.
- Fazlalık sezonluk eşyaları, hobi ekipmanlarını veya arşiv evraklarını güvenle saklamak.
- Şehir veya ülke değişikliğinde eşyaları değerinin altında satmak yerine muhafaza etmek.

### ${h2_2}
Sıradan nemli bodrum katları ahşap mobilyaların küflenmesine ve elektroniklerin paslanmasına neden olur. Modern depolarımızda:
- Endüstriyel nem alma cihazları ve iklimlendirme sistemleriyle ortam bağıl nemi %45-55 seviyesinde sabit tutulur.
- Sağlık Bakanlığı onaylı periyodik haşere ve kemirgen ilaçlaması yapılır.

### ${h2_3}
Depolama tesislerimiz yüksek güvenlik altyapısıyla korunmaktadır:
- 7/24 kesintisiz yüksek çözünürlüklü kapalı devre kamera sistemi (CCTV) ve gece görüş sensörleri.
- Yangın ve duman algılama sistemleri, otomatik gazlı yangın söndürme altyapısı.
- Size özel tahsis edilen kilitli eşya odasının anahtarı yalnızca sizde kalır.

### ${h2_4}
Depoya kaldırılacak tüm mobilya ve beyaz eşyalar uzun süre saklanmaya uygun hava geçiren özel kılıflarla ambalajlanır ve resmi sigorta poliçesiyle teminat altına alınır.

> [!NOTE]
> 1 aydan başlayan kısa süreli veya 1 yıla varan uzun süreli kiralama seçeneklerimizde peşin ödeme indirimleri mevcuttur.`;

            return {
                excerpt: `${district} eşya depolama hizmetinde 7/24 kameralı, nem kontrollü ve sigortalı kilitli oda çözümleri. Güvenli saklama standartları.`,
                content
            };
        }
    },
    {
        id: "tuketici_haklari",
        getArticle: (district, topic, category) => {
            const h2_1 = `1. Nakliyat Sektöründe Yasal K3 Yetki Belgesinin Önemi`;
            const h2_2 = `2. Nakliyat Emtia Sigortası ile Trafik Sigortası Arasındaki Fark`;
            const h2_3 = `3. Taşıma Sözleşmesinde Mutlaka Bulunması Gereken Maddeler`;
            const h2_4 = `4. Olası Hasar Durumunda Hızlı Tazminat Süreci`;

            const content = `## ${district} ${topic}: Hukuki Güvenceler ve Tüketici Hakları

Taşınma sürecinde mağduriyet yaşamamak ve eşyalarınızı yasal koruma altında taşıtmak için bilmeniz gereken hukuki haklar ve kurumsal standartlar vardır. ${district} bölgesinde ${topic.toLowerCase()} alırken nelere dikkat etmeniz gerektiğini özetliyoruz.

### ${h2_1}
T.C. Ulaştırma ve Altyapı Bakanlığı tarafından ticari eşya taşımacılığı yapan firmalara verilen **K3 Yetki Belgesi**, firmanın yeterli araç filosuna, sermayeye ve yetkin personele sahip olduğunun resmi kanıtıdır. 
- K3 belgesi olmayan kişi veya kamyonetlerle yapılan taşımalarda trafik denetimlerinde araç bağlanabilir ve eşyalarınız günlerce yolda mahsur kalabilir.
- Ankara Özdemir Nakliyat olarak Ulaştırma Bakanlığı onaylı resmi K3 belgemizle yasal taşımacılık yapıyoruz.

### ${h2_2}
Pek çok korsan nakliyeci "aracımızın sigortası var" diyerek müşteriyi yanıltır. Aracın zorunlu trafik sigortası yalnızca trafik kazasında karşı araca verilen zararı karşılar; kasa içindeki eşyalarınızı teminat altına almaz.
- Eşyalarınızın korunması için Axa veya Allianz gibi kurumsal sigorta şirketlerinden adınıza özel düzenlenmiş **"Emtia Taşıma Sigortası Poliçesi"** düzenlenmelidir.

### ${h2_3}
Resmi taşıma sözleşmesinde şu maddeler eksiksiz yer almalıdır:
- Eski ve yeni adres bilgileri, kat durumları ve asansör kullanım maddesi.
- Taşınacak oda sayısı ve dahil olan hizmetler (marangozluk, ambalaj, beyaz eşya tesisatı).
- Belirlenen kesin ücret ve 'kapıda sonradan hiçbir ek bedel talep edilemez' taahhüdü.
- Firmanın vergi dairesi, vergi numarası ve yetkili kaşesi.

### ${h2_4}
Taşıma sırasında meydana gelebilecek en küçük sürtünme veya hasar durumunda dahi eksper raporu düzenlenerek hasar bedeli aynı hafta içinde müşterimize nakden tazmin edilir.

> [!IMPORTANT]
> Hizmet almadan önce firmanın vergi levhasını ve K3 taşıma yetki belgesini görmeyi talep ediniz.`;

            return {
                excerpt: `${district} ${topic.toLowerCase()} sürecinde tüketici hakları, K3 yetki belgesi zorunluluğu, resmi emtia sigortası ve sözleşme güvenceleri.`,
                content
            };
        }
    }
];

function cleanTopic(title, district) {
    let t = title;
    const districts = [
        "çankaya", "kecioren", "keçiören", "yenimahalle", "mamak", "etimesgut", "sincan", 
        "gölbaşı", "golbasi", "altındağ", "altindag", "pursaklar", "çubuk", "cubuk", 
        "kahramankazan", "kazan", "akyurt", "beypazarı", "beypazari", "elmadağ", "elmadag", 
        "polatlı", "polatli", "kızılcahamam", "kizilcahamam", "haymana", "nallıhan", "nallihan", 
        "şereflikoçhisar", "sereflikochisar", "ayaş", "ayas", "balâ", "bala", "çamlıdere", "camlidere", 
        "kalecik", "güdül", "gudul", "evren"
    ];
    districts.forEach(d => {
        t = t.replace(new RegExp(d, "gi"), "");
    });
    t = t.replace(/\bankara\b/gi, "");
    t = t.replace(/(Rehberi|Firmaları|Fiyatları|Hakkında|Nedir|\?|Nasıl Korursunuz|Sırasında|Eşyalarınızı|İçin 5 Altın Tavsiye|İpuçları|Sırları|Zorlukları ve Çözümleri|Sürecinde Dikkat Edilmesi Gerekenler|Ev ve İş Yeri Sahipleri İçin|Uzmanından|Bölgesinde|Sokaklarında|\biçin\b|Taşınma Rehberi:|Taşınma Rehberi|ve Şehirler Arası Nakliyat|\bve\b|En İyi|Tavsiyeleri|Önerileri|Detaylı Analiz)/gi, "");
    t = t.replace(/[:\-–]/g, " ").replace(/\s+/g, " ").trim();
    if (!t || t.length < 3) t = "Evden Eve Nakliyat";
    return t;
}

// Helper to get hash
function getHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

// 1. REGENERATE BLOG POSTS
console.log("Blog yazıları zengin içerikle yeniden üretiliyor...");
const updatedBlogPosts = blogPosts.map((post, index) => {
    const district = extractDistrict(post);
    const topic = cleanTopic(post.title, district);
    const archetypeIndex = (getHash(post.slug) + index) % ARCHETYPES.length;
    const archetype = ARCHETYPES[archetypeIndex];
    
    const generated = archetype.getArticle(district, topic, post.category);
    
    return {
        ...post,
        excerpt: generated.excerpt,
        content: generated.content
    };
});

fs.writeFileSync(blogPath, JSON.stringify(updatedBlogPosts, null, 4), "utf-8");
console.log(`✓ 300 blog yazısı başarıyla güncellendi.`);

// 2. REGENERATE MAKALELER
console.log("Makaleler zengin içerikle yeniden üretiliyor...");
const updatedMakaleler = makaleler.map((makale, index) => {
    const district = extractDistrict(makale);
    const topic = cleanTopic(makale.title, district);
    const archetypeIndex = (getHash(makale.slug) + index + 3) % ARCHETYPES.length;
    const archetype = ARCHETYPES[archetypeIndex];
    
    const generated = archetype.getArticle(district, topic, makale.category);
    
    return {
        ...makale,
        excerpt: generated.excerpt,
        content: generated.content
    };
});

fs.writeFileSync(makalelerPath, JSON.stringify(updatedMakaleler, null, 4), "utf-8");
console.log(`✓ 300 makale başarıyla güncellendi.`);
console.log("TÜM ZENGİN İÇERİK MOTORU TAMAMLANDI!");
