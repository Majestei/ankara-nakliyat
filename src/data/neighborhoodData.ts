
export interface Neighborhood {
    name: string;
    slug: string;
}

export const neighborhoodsByDistrict: Record<string, Neighborhood[]> = {
    // ANKARA (25 Districts)
    "akyurt": [
        { name: "Yıldırım", slug: "yildirim" }, { name: "Beyazıt", slug: "beyazit" }, { name: "Balıkhisar", slug: "balikhisar" }, { name: "Büğdüz", slug: "bugduz" }, { name: "Güzelhisar", slug: "guzelhisar" }
    ],
    "altindag": [
        { name: "Aydınlıkevler", slug: "aydinlikevler" }, { name: "Karapürçek", slug: "karapurcek" }, { name: "Önder", slug: "onder" }, { name: "Siteler", slug: "siteler" }, { name: "Ulus", slug: "ulus" }, { name: "Zübeyde Hanım", slug: "zubeyde-hanim" }, { name: "Doğantepe", slug: "dogantepe" }, { name: "Feridun Çelik", slug: "feridun-celik" }, { name: "Güneşevler", slug: "gunesevler" }, { name: "Hacettepe", slug: "hacettepe" }
    ],
    "ayas": [
        { name: "Hacımemi", slug: "hacimemi" }, { name: "Ömeroğlu", slug: "omeroglu" }, { name: "Camiatik", slug: "camiatik" }, { name: "Feruz", slug: "feruz" }
    ],
    "bala": [
        { name: "Şentepe", slug: "sentepe" }, { name: "Kartaltepe", slug: "kartaltepe" }, { name: "Göztepe", slug: "goztepe" }, { name: "Ergin", slug: "ergin" }
    ],
    "beypazari": [
        { name: "Kurtuluş", slug: "kurtulus" }, { name: "Rüstempaşa", slug: "rustempasa" }, { name: "Başağaç", slug: "basagac" }, { name: "Ayvaşık", slug: "ayvasik" }
    ],
    "camlidere": [
        { name: "Körler", slug: "korler" }, { name: "Beyler", slug: "beyler" }, { name: "Yayalar", slug: "yayalar" }
    ],
    "cankaya": [
        { name: "Ayrancı", slug: "ayranci" }, { name: "Bahçelievler", slug: "bahcelievler" }, { name: "Balgat", slug: "balgat" }, { name: "Beysukent", slug: "beysukent" }, { name: "Beytepe", slug: "beytepe" }, { name: "Birlik", slug: "birlik" }, { name: "Cebeci", slug: "cebeci" }, { name: "Çayyolu", slug: "cayyolu" }, { name: "Çukurambar", slug: "cukurambar" }, { name: "Dikmen", slug: "dikmen" }, { name: "Esat", slug: "esat" }, { name: "Gaziosmanpaşa", slug: "gaziosmanpasa" }, { name: "Kavaklıdere", slug: "kavaklidere" }, { name: "Kırkkonaklar", slug: "kirkkonaklar" }, { name: "Kızılay", slug: "kizilay" }, { name: "Maltepe", slug: "maltepe" }, { name: "Oran", slug: "oran" }, { name: "Öveçler", slug: "ovecler" }, { name: "Söğütözü", slug: "sogutozu" }, { name: "Yıldız", slug: "yildiz" }, { name: "Yüzüncüyıl", slug: "yuzuncuyil" }, { name: "Ümitköy", slug: "umitkoy" }, { name: "Yaşamkent", slug: "yasamkent" }, { name: "Mustafa Kemal", slug: "mustafa-kemal" }, { name: "Mürsel Uluç", slug: "mursel-uluc" }, { name: "Malazgirt", slug: "malazgirt" }, { name: "Keklik Pınarı", slug: "keklik-pinari" }, { name: "Akpınar", slug: "akpinar" }
    ],
    "cubuk": [
        { name: "Yavuz Selim", slug: "yavuz-selim" }, { name: "Cumhuriyet", slug: "cumhuriyet" }, { name: "Yıldırım Beyazıt", slug: "yildirim-beyazit" }, { name: "Barbaros", slug: "barbaros" }
    ],
    "elmadag": [
        { name: "Yenimahalle", slug: "yenimahalle" }, { name: "Tatlıca", slug: "tatlica" }, { name: "Hasanoğlan", slug: "hasanoglan" }, { name: "Lalabel", slug: "lalabel" }
    ],
    "etimesgut": [
        { name: "Eryaman", slug: "eryaman" }, { name: "Bağlıca", slug: "baglica" }, { name: "Elvankent", slug: "elvankent" }, { name: "Güzelkent", slug: "guzelkent" }, { name: "Şeker", slug: "seker" }, { name: "Piyade", slug: "piyade" }, { name: "Topçu", slug: "topcu" }, { name: "Ayyıldız", slug: "ayyildiz" }, { name: "Yapracık", slug: "yapracik" }, { name: "30 Ağustos", slug: "30-agustos" }, { name: "Alsancak", slug: "alsancak" }, { name: "İstasyon", slug: "istasyon" }, { name: "Kazım Karabekir", slug: "kazim-karabekir" }
    ],
    "evren": [
        { name: "Modern", slug: "modern" }, { name: "Çıkinağıl", slug: "cikinagil" }
    ],
    "golbasi": [
        { name: "İncek", slug: "incek" }, { name: "Tuluntaş", slug: "tuluntas" }, { name: "Kızılcaşar", slug: "kizilcasar" }, { name: "Karşıyaka", slug: "karsiyaka" }, { name: "Eymir", slug: "eymir" }, { name: "Şafak", slug: "safak" }, { name: "Seğmenler", slug: "segmenler" }, { name: "Gaziosmanpaşa", slug: "gaziosmanpasa" }, { name: "Bahçelievler", slug: "bahcelievler" }
    ],
    "gudul": [
        { name: "Aşağı", slug: "asagi" }, { name: "Yukarı", slug: "yukari" }, { name: "Yeni", slug: "yeni" }
    ],
    "haymana": [
        { name: "Seyran", slug: "seyran" }, { name: "Medrese", slug: "medrese" }, { name: "Çaldağ", slug: "caldag" }
    ],
    "kahramankazan": [
        { name: "Satıkadın", slug: "satikadin" }, { name: "Kayı", slug: "kayi" }, { name: "Atatürk", slug: "ataturk" }, { name: "Fatih", slug: "fatih" }
    ],
    "kalecik": [
        { name: "Ahikemal", slug: "ahikemal" }, { name: "Yenice", slug: "yenice" }, { name: "Çaykaya", slug: "caykaya" }
    ],
    "kecioren": [
        { name: "Etlik", slug: "etlik" }, { name: "İncirli", slug: "incirli" }, { name: "Ayvalı", slug: "ayvali" }, { name: "Aktepe", slug: "aktepe" }, { name: "Bağlum", slug: "baglum" }, { name: "Kalaba", slug: "kalaba" }, { name: "Kuşcağız", slug: "kuscagiz" }, { name: "Sanatoryum", slug: "sanatoryum" }, { name: "Şefkat", slug: "sefkat" }, { name: "Tepebaşı", slug: "tepebasi" }, { name: "Ufuktepe", slug: "ufuktepe" }, { name: "Yükseltepe", slug: "yukseltepe" }, { name: "Ovacık", slug: "ovacik" }, { name: "Esertepe", slug: "esertepe" }, { name: "23 Nisan", slug: "23-nisan" }, { name: "Adnan Menderes", slug: "adnan-menderes" }, { name: "Atapark", slug: "atapark" }, { name: "Bademlik", slug: "bademlik" }, { name: "Hasköy", slug: "haskoy" }, { name: "Hisar", slug: "hisar" }, { name: "Kanuni", slug: "kanuni" }, { name: "Karargahtepe", slug: "karargahtepe" }, { name: "Köşk", slug: "kosk" }, { name: "Osmangazi", slug: "osmangazi" }, { name: "Pınarbaşı", slug: "pinarbasi" }, { name: "Sancaktepe", slug: "sancaktepe" }, { name: "Şehitkubilay", slug: "sehitkubilay" }, { name: "Yayla", slug: "yayla" }, { name: "Yeşiltepe", slug: "yesiltepe" }
    ],
    "kizilcahamam": [
        { name: "Yenice", slug: "yenice" }, { name: "Akçay", slug: "akcay" }, { name: "Karşıyaka", slug: "karsiyaka" }, { name: "İsmetpaşa", slug: "ismetpasa" }
    ],
    "mamak": [
        { name: "Akdere", slug: "akdere" }, { name: "Boğaziçi", slug: "bogazici" }, { name: "Ege Mahallesi", slug: "ege-mahallesi" }, { name: "Nato Yolu", slug: "nato-yolu" }, { name: "Abidinpaşa", slug: "abidinpasa" }, { name: "Tuzluçayır", slug: "tuzlucayir" }, { name: "Saimekadın", slug: "saimekadin" }, { name: "Lalahan", slug: "lalahan" }, { name: "Kıbrıs Köyü", slug: "kibris-koyu" }, { name: "Bahçeleriçi", slug: "bahcelerici" }, { name: "Balkiraz", slug: "balkiraz" }, { name: "Başak", slug: "basak" }, { name: "Demirlibahçe", slug: "demirlibahce" }, { name: "Derbent", slug: "derbent" }, { name: "Dostlar", slug: "dostlar" }, { name: "Durali Alıç", slug: "durali-alic" }, { name: "Fahri Korutürk", slug: "fahri-koruturk" }, { name: "Gökçeyurt", slug: "gokceyurt" }, { name: "Gülveren", slug: "gulveren" }, { name: "Harman", slug: "harman" }, { name: "Hürel", slug: "hurel" }, { name: "Hüseyingazi", slug: "huseyingazi" }, { name: "Kartaltepe", slug: "kartaltepe" }, { name: "Kayaş", slug: "kayas" }, { name: "Kazım Orbay", slug: "kazim-orbay" }, { name: "Köstence", slug: "kostence" }, { name: "Küçük Kayaş", slug: "kucuk-kayas" }, { name: "Mutlu", slug: "mutlu" }, { name: "Şafaktepe", slug: "safaktepe" }, { name: "Şahap Gürler", slug: "sahap-gurler" }, { name: "Şahintepe", slug: "sahintepe" }, { name: "Tepecik", slug: "tepecik" }, { name: "Türközü", slug: "turkozu" }, { name: "Üreğil", slug: "uregil" }, { name: "Yeşilbayır", slug: "yesilbayir" }
    ],
    "nallihan": [
        { name: "Nasuhpaşa", slug: "nasuhpasa" }, { name: "Aliağa", slug: "aliaga" }, { name: "Yazı", slug: "yazi" }
    ],
    "polatli": [
        { name: "Gülveren", slug: "gulveren" }, { name: "Cumhuriyet", slug: "cumhuriyet" }, { name: "Şehitlik", slug: "sehitlik" }, { name: "Fatih", slug: "fatih" }, { name: "Yeni", slug: "yeni" }, { name: "Basri", slug: "basri" }
    ],
    "pursaklar": [
        { name: "Saray", slug: "saray" }, { name: "Altınova", slug: "altinova" }, { name: "Mimar Sinan", slug: "mimar-sinan" }, { name: "Yavuz Selim", slug: "yavuz-selim" }, { name: "Merkez", slug: "merkez" }, { name: "Fatih", slug: "fatih" }, { name: "Yunus Emre", slug: "yunus-emre" }
    ],
    "sincan": [
        { name: "Fatih", slug: "fatih" }, { name: "Yenikent", slug: "yenikent" }, { name: "Törekent", slug: "torekent" }, { name: "Plevne", slug: "plevne" }, { name: "İstasyon", slug: "istasyon" }, { name: "Mevlana", slug: "mevlana" }, { name: "Ulubatlı Hasan", slug: "ulubatli-hasan" }, { name: "Akşemsettin", slug: "aksemsettin" }, { name: "Andiçen", slug: "andicen" }, { name: "Atatürk", slug: "ataturk" }, { name: "Cumhuriyet", slug: "cumhuriyet" }, { name: "Gökçek", slug: "gokcek" }, { name: "Malazgirt", slug: "malazgirt" }, { name: "Maraşal Çakmak", slug: "marasal-cakmak" }, { name: "Osmanlı", slug: "osmanli" }, { name: "Pınarbaşı", slug: "pinarbasi" }, { name: "Selçuklu", slug: "selcuklu" }, { name: "Tandoğan", slug: "tandogan" }
    ],
    "sereflikochisar": [
        { name: "Sanayi", slug: "sanayi" }, { name: "İstiklal", slug: "istiklal" }, { name: "Ekici", slug: "ekici" }, { name: "Kale", slug: "kale" }
    ],
    "yenimahalle": [
        { name: "Batıkent", slug: "batikent" }, { name: "Demetevler", slug: "demetevler" }, { name: "İvedik", slug: "ivedik" }, { name: "Ostim", slug: "ostim" }, { name: "Şentepe", slug: "sentepe" }, { name: "Çayyolu 2", slug: "cayyolu-2" }, { name: "Beştepe", slug: "bestepe" }, { name: "Gayret", slug: "gayret" }, { name: "Macunköy", slug: "macunkoy" }, { name: "Varlık", slug: "varlik" }, { name: "Kardelen", slug: "kardelen" }, { name: "Uğur Mumcu", slug: "ugur-mumcu" }, { name: "Anadolu", slug: "anadolu" }, { name: "Avcılar", slug: "avcilar" }, { name: "Burç", slug: "burc" }, { name: "Çiğdemtepe", slug: "cigdemtepe" }, { name: "Ergazi", slug: "ergazi" }, { name: "Ergenekon", slug: "ergenekon" }, { name: "İlkyerleşim", slug: "ilkyerlesim" }, { name: "İnönü", slug: "inonu" }, { name: "Işınlar", slug: "isinlar" }, { name: "İvedikosb", slug: "ivedikosb" }, { name: "Kaletepe", slug: "kaletepe" }, { name: "Karşıyaka", slug: "karsiyaka" }, { name: "Kayalar", slug: "kayalar" }, { name: "Kentkoop", slug: "kentkoop" }, { name: "Kuzey Yıldızı", slug: "kuzey-yildizi" }, { name: "Mehmet Akif Ersoy", slug: "mehmet-akif-ersoy" }, { name: "Memlik", slug: "memlik" }, { name: "Pamuklar", slug: "pamuklar" }, { name: "Susuz", slug: "susuz" }, { name: "Tepealtı", slug: "tepealti" }, { name: "Turgut Özal", slug: "turgut-ozal" }, { name: "Yakacık", slug: "yakacik" }, { name: "Yuva", slug: "yuva" }
    ],

    // ISTANBUL (39 Districts)
    "adalar": [
        { name: "Büyükada", slug: "buyukada" }, { name: "Heybeliada", slug: "heybeliada" }, { name: "Burgazada", slug: "burgazada" }, { name: "Kınalıada", slug: "kinaliada" }
    ],
    "arnavutkoy": [
        { name: "Hadımköy", slug: "hadimkoy" }, { name: "Haraççı", slug: "haracci" }, { name: "Taşoluk", slug: "tasoluk" }, { name: "Bolluca", slug: "bolluca" }
    ],
    "atasehir": [
        { name: "Batı Ataşehir", slug: "bati-atasehir" }, { name: "İçerenköy", slug: "icerenkoy" }, { name: "Kayışdağı", slug: "kayisdagi" }, { name: "Küçükbakkalköy", slug: "kucukbakkalkoy" }, { name: "Örnek", slug: "ornek" }, { name: "Yeni Sahra", slug: "yeni-sahra" }, { name: "Ferhatpaşa", slug: "ferhatpasa" }, { name: "Mevlana", slug: "mevlana" }, { name: "Mimar Sinan", slug: "mimar-sinan" }
    ],
    "avcilar": [
        { name: "Ambarlı", slug: "ambarli" }, { name: "Cihangir", slug: "cihangir" }, { name: "Denizköşkler", slug: "denizkoskler" }, { name: "Firuzköy", slug: "firuzkoy" }, { name: "Gümüşpala", slug: "gumuspala" }, { name: "Mustafa Kemalpaşa", slug: "mustafa-kemalpasa" }, { name: "Tahtakale", slug: "tahtakale" }
    ],
    "bagcilar": [
        { name: "Güneşli", slug: "gunesli" }, { name: "Mahmutbey", slug: "mahmutbey" }, { name: "Kirazlı", slug: "kirazli" }, { name: "Yenimahalle", slug: "yenimahalle" }, { name: "Hürriyet", slug: "hurriyet" }, { name: "Barbaros", slug: "barbaros" }
    ],
    "bahcelievler": [
        { name: "Yenibosna", slug: "yenibosna" }, { name: "Şirinevler", slug: "sirinevler" }, { name: "Kocasinan", slug: "kocasinan" }, { name: "Cumhuriyet", slug: "cumhuriyet" }, { name: "Fevzi Çakmak", slug: "fevzi-cakmak" }, { name: "Hürriyet", slug: "hurriyet" }
    ],
    "bakirkoy": [
        { name: "Ataköy", slug: "atakoy" }, { name: "Florya", slug: "florya" }, { name: "Yeşilköy", slug: "yesilkoy" }, { name: "Yeşilyurt", slug: "yesilyurt" }, { name: "Zuhuratbaba", slug: "zuhuratbaba" }, { name: "Kartaltepe", slug: "kartaltepe" }, { name: "Osmaniye", slug: "osmaniye" }, { name: "Cevizlik", slug: "cevizlik" }
    ],
    "basaksehir": [
        { name: "Bahçeşehir", slug: "bahcesehir" }, { name: "Kayaşehir", slug: "kayasehir" }, { name: "Ispartakule", slug: "ispartakule" }, { name: "Altınşehir", slug: "altinsehir" }, { name: "Güvercintepe", slug: "guvercintepe" }, { name: "Şahintepe", slug: "sahintepe" }, { name: "Ziya Gökalp", slug: "ziya-gokalp" }
    ],
    "bayrampasa": [
        { name: "Altıntepsi", slug: "altintepsi" }, { name: "Cevatpaşa", slug: "cevatpasa" }, { name: "Kartaltepe", slug: "kartaltepe" }, { name: "Muratpaşa", slug: "muratpasa" }, { name: "Yenidoğan", slug: "yenidogan" }
    ],
    "besiktas": [
        { name: "Akatlar", slug: "akatlar" }, { name: "Arnavutköy", slug: "arnavutkoy" }, { name: "Bebek", slug: "bebek" }, { name: "Etiler", slug: "etiler" }, { name: "Gayrettepe", slug: "gayrettepe" }, { name: "Levent", slug: "levent" }, { name: "Ortaköy", slug: "ortakoy" }, { name: "Ulus", slug: "ulus" }, { name: "Yıldız", slug: "yildiz" }, { name: "Levazım", slug: "levazim" }, { name: "Mecidiye", slug: "mecidiye" }, { name: "Muradiye", slug: "muradiye" }, { name: "Sinanpaşa", slug: "sinanpasa" }, { name: "Türkali", slug: "turkali" }, { name: "Vişnezade", slug: "visnezade" }
    ],
    "beykoz": [
        { name: "Acarkent", slug: "acarkent" }, { name: "Kavacık", slug: "kavacik" }, { name: "Kanlıca", slug: "kanlica" }, { name: "Paşabahçe", slug: "pasabahce" }, { name: "Çubuklu", slug: "cubuklu" }, { name: "Anadolu Hisarı", slug: "anadolu-hisari" }
    ],
    "beylikduzu": [
        { name: "Adnan Kahveci", slug: "adnan-kahveci" }, { name: "Barış", slug: "baris" }, { name: "Cumhuriyet", slug: "cumhuriyet" }, { name: "Gürpınar", slug: "gurpinar" }, { name: "Kavaklı", slug: "kavakli" }, { name: "Yakuplu", slug: "yakuplu" }, { name: "Dereağzı", slug: "dereagzi" }, { name: "Marmara", slug: "marmara" }, { name: "Sahil", slug: "sahil" }
    ],
    "beyoglu": [
        { name: "Cihangir", slug: "cihangir" }, { name: "Galata", slug: "galata" }, { name: "Karaköy", slug: "karakoy" }, { name: "Taksim", slug: "taksim" }, { name: "Tarlabaşı", slug: "tarlabasi" }, { name: "Kasımpaşa", slug: "kasimpasa" }, { name: "Sütlüce", slug: "sutluce" }
    ],
    "buyukcekmece": [
        { name: "Mimaroba", slug: "mimaroba" }, { name: "Sinanoba", slug: "sinanoba" }, { name: "Kumburgaz", slug: "kumburgaz" }, { name: "Tepecik", slug: "tepecik" }, { name: "Celaliye", slug: "celaliye" }
    ],
    "catalca": [
        { name: "Ferhatpaşa", slug: "ferhatpasa" }, { name: "Kaleici", slug: "kaleici" }, { name: "Binkılıç", slug: "binkilic" }
    ],
    "cekmekoy": [
        { name: "Alemdağ", slug: "alemdag" }, { name: "Taşdelen", slug: "tasdelen" }, { name: "Ömerli", slug: "omerli" }, { name: "Hamidiye", slug: "hamidiye" }
    ],
    "esenler": [
        { name: "Birlik", slug: "birlik" }, { name: "Havaalanı", slug: "havaalani" }, { name: "Menderes", slug: "menderes" }, { name: "Turgutreis", slug: "turgutreis" }
    ],
    "esenyurt": [
        { name: "Akçaburgaz", slug: "akcaburgaz" }, { name: "Kıraç", slug: "kirac" }, { name: "Mehterçeşme", slug: "mehtercesme" }, { name: "Saadetdere", slug: "saadetdere" }, { name: "Piri Reis", slug: "piri-reis" }, { name: "Yeşilkent", slug: "yesilkent" }
    ],
    "eyupsultan": [
        { name: "Göktürk", slug: "gokturk" }, { name: "Kemerburgaz", slug: "kemerburgaz" }, { name: "Alibeyköy", slug: "alibeykoy" }, { name: "Yeşilpınar", slug: "yesilpinar" }
    ],
    "fatih": [
        { name: "Aksaray", slug: "aksaray" }, { name: "Balat", slug: "balat" }, { name: "Beyazıt", slug: "beyazit" }, { name: "Eminönü", slug: "eminonu" }, { name: "Fener", slug: "fener" }, { name: "Sultanahmet", slug: "sultanahmet" }
    ],
    "gaziosmanpasa": [
        { name: "Bağlarbaşı", slug: "baglarbasi" }, { name: "Karadeniz", slug: "karadeniz" }, { name: "Küçükköy", slug: "kucukkoy" }, { name: "Yıldıztabya", slug: "yildiztabya" }
    ],
    "gungoren": [
        { name: "Haznedar", slug: "haznedar" }, { name: "Merter", slug: "merter" }, { name: "Tozkoparan", slug: "tozkoparan" }, { name: "Güven", slug: "guven" }
    ],
    "kadikoy": [
        { name: "Bostancı", slug: "bostanci" }, { name: "Caddebostan", slug: "caddebostan" }, { name: "Erenköy", slug: "erenkoy" }, { name: "Fenerbahçe", slug: "fenerbahce" }, { name: "Feneryolu", slug: "feneryolu" }, { name: "Göztepe", slug: "goztepe" }, { name: "Kozyatağı", slug: "kozyatagi" }, { name: "Moda", slug: "moda" }, { name: "Suadiye", slug: "suadiye" }, { name: "Zühtüpaşa", slug: "zuhtupasa" }, { name: "Acıbadem", slug: "acibadem" }, { name: "Caferağa", slug: "caferaga" }, { name: "Fikirtepe", slug: "fikirtepe" }, { name: "Hasanpaşa", slug: "hasanpasa" }, { name: "Sahrayıcedit", slug: "sahrayicedit" }
    ],
    "kagithane": [
        { name: "Çeliktepe", slug: "celiktepe" }, { name: "Gültepe", slug: "gultepe" }, { name: "Seyrantepe", slug: "seyrantepe" }, { name: "Emniyetevleri", slug: "emniyetevleri" }
    ],
    "kartal": [
        { name: "Atalar", slug: "atalar" }, { name: "Cevizli", slug: "cevizli" }, { name: "Dragos", slug: "dragos" }, { name: "Soğanlık", slug: "soganlik" }, { name: "Uğur Mumcu", slug: "ugur-mumcu" }, { name: "Yakacık", slug: "yakacik" }
    ],
    "kucukcekmece": [
        { name: "Atakent", slug: "atakent" }, { name: "Halkalı", slug: "halkali" }, { name: "İkitelli", slug: "ikitelli" }, { name: "Sefaköy", slug: "sefakoy" }, { name: "Cennet", slug: "cennet" }, { name: "Kanarya", slug: "kanarya" }
    ],
    "maltepe": [
        { name: "Altıntepe", slug: "altintepe" }, { name: "İdealtepe", slug: "idealtepe" }, { name: "Küçükyalı", slug: "kucukyali" }, { name: "Zümrütevler", slug: "zumrutevler" }, { name: "Başıbüyük", slug: "basibuyuk" }, { name: "Cevizli", slug: "cevizli" }
    ],
    "pendik": [
        { name: "Kurtköy", slug: "kurtkoy" }, { name: "Kaynarca", slug: "kaynarca" }, { name: "Yenişehir", slug: "yenisehir" }, { name: "Güzelyalı", slug: "guzelyali" }, { name: "Çamlık", slug: "camlik" }
    ],
    "sancaktepe": [
        { name: "Samandıra", slug: "samandira" }, { name: "Sarıgazi", slug: "sarigazi" }, { name: "Yenidoğan", slug: "yenidogan" }, { name: "Paşaköy", slug: "pasakoy" }
    ],
    "sariyer": [
        { name: "Ayazağa", slug: "ayazaga" }, { name: "Bahçeköy", slug: "bahcekoy" }, { name: "Emirgan", slug: "emirgan" }, { name: "İstinye", slug: "istinye" }, { name: "Maslak", slug: "maslak" }, { name: "Tarabya", slug: "tarabya" }, { name: "Zekeriyaköy", slug: "zekeriyakoy" }, { name: "Reşitpaşa", slug: "resitpasa" }, { name: "Yeniköy", slug: "yenikoy" }
    ],
    "silivri": [
        { name: "Selimpaşa", slug: "selimpasa" }, { name: "Gümüşyaka", slug: "gumusyaka" }, { name: "Çanta", slug: "canta" }, { name: "Ortaköy", slug: "ortakoy" }
    ],
    "sultanbeyli": [
        { name: "Abdurrahmangazi", slug: "abdurrahmangazi" }, { name: "Hamidiye", slug: "hamidiye" }, { name: "Mecidiye", slug: "mecidiye" }, { name: "Yavuz Selim", slug: "yavuz-selim" }
    ],
    "sultangazi": [
        { name: "Habibler", slug: "habibler" }, { name: "Gazi", slug: "gazi" }, { name: "Cebeci", slug: "cebeci" }, { name: "Yunus Emre", slug: "yunus-emre" }
    ],
    "sile": [
        { name: "Ağva", slug: "agva" }, { name: "Kumbaba", slug: "kumbaba" }, { name: "Çavuş", slug: "cavus" }
    ],
    "sisli": [
        { name: "Mecidiyeköy", slug: "mecidiyekoy" }, { name: "Nişantaşı", slug: "nisantasi" }, { name: "Teşvikiye", slug: "tesvikiye" }, { name: "Feriköy", slug: "ferikoy" }, { name: "Kurtuluş", slug: "kurtulus" }, { name: "Bomonti", slug: "bomonti" }, { name: "Okmeydanı", slug: "okmeydani" }, { name: "Esentepe", slug: "esentepe" }, { name: "Kuştepe", slug: "kustepe" }, { name: "Fulya", slug: "fulya" }, { name: "Halaskargazi", slug: "halaskargazi" }, { name: "Harbiye", slug: "harbiye" }, { name: "İzzetpaşa", slug: "izzetpasa" }, { name: "Pangaltı", slug: "pangalti" }
    ],
    "tuzla": [
        { name: "Aydınlı", slug: "aydinli" }, { name: "İçmeler", slug: "icmeler" }, { name: "Orhanlı", slug: "orhanli" }, { name: "Postane", slug: "postane" }, { name: "Şifa", slug: "sifa" }
    ],
    "umraniye": [
        { name: "Atakent", slug: "atakent" }, { name: "Ihlamurkuyu", slug: "ihlamurkuyu" }, { name: "Namık Kemal", slug: "namik-kemal" }, { name: "Şerifali", slug: "serifali" }, { name: "Tepeüstü", slug: "tepeustu" }, { name: "Yukarı Dudullu", slug: "yukari-dudullu" }, { name: "Çakmak", slug: "cakmak" }
    ],
    "uskudar": [
        { name: "Acıbadem", slug: "acibadem" }, { name: "Altunizade", slug: "altunizade" }, { name: "Beylerbeyi", slug: "beylerbeyi" }, { name: "Çengelköy", slug: "cengelkoy" }, { name: "Kandilli", slug: "kandilli" }, { name: "Kuzguncuk", slug: "kuzguncuk" }, { name: "Kısıklı", slug: "kisikli" }, { name: "Libadiye", slug: "libadiye" }, { name: "Yavuztürk", slug: "yavuzturk" }, { name: "Bahçelievler", slug: "bahcelievler" }, { name: "Bulgurlu", slug: "bulgurlu" }, { name: "Burhaniye", slug: "burhaniye" }, { name: "Kirazlıtepe", slug: "kirazlitepe" }, { name: "Selimiye", slug: "selimiye" }, { name: "Zeynep Kamil", slug: "zeynep-kamil" }
    ],
    "zeytinburnu": [
        { name: "Merkezefendi", slug: "merkezefendi" }, { name: "Telsiz", slug: "telsiz" }, { name: "Veliefendi", slug: "veliefendi" }, { name: "Beştelsiz", slug: "bestelsiz" }
    ]
};
