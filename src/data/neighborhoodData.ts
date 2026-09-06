
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
    ]
};
