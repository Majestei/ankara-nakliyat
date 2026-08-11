const fs = require('fs');

const districts = [
    "Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", 
    "Sincan", "Altındağ", "Pursaklar", "Gölbaşı", "Polatlı", 
    "Çubuk", "Kahramankazan", "Beypazarı", "Elmadağ", "Şereflikoçhisar", 
    "Akyurt", "Nallıhan", "Haymana", "Kızılcahamam", "Bala", 
    "Kalecik", "Ayaş", "Çamlıdere", "Güdül", "Evren"
];

const services = [
    { key: "Evden Eve Nakliyat", icon: "🚚" },
    { key: "Asansörlü Taşımacılık", icon: "🏗️" },
    { key: "Ofis Taşıma", icon: "🏢" },
    { key: "Parça Eşya Taşıma", icon: "📦" },
    { key: "Şehirler Arası Nakliyat", icon: "🛣️" },
    { key: "Eşya Depolama", icon: "🏭" }
];

const variations = [
    { type: "Firmaları", intent: "Kurumsal ve profesyonel şirket arayışı" },
    { type: "Fiyatları", intent: "Uygun fiyat ve maliyet analizi arayışı" }
];

function generateSlug(text) {
    return text.toLowerCase().replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

let makaleler = [];
let idCounter = 1;

districts.forEach(district => {
    services.forEach(service => {
        variations.forEach(variation => {
            const title = `${district} ${service.key} ${variation.type}`;
            const slug = generateSlug(title);
            
            let content = `## ${title} Rehberi\n\n`;
            content += `Ankara'nın en önemli bölgelerinden biri olan **${district}** ilçesinde profesyonel taşımacılık hizmetleri giderek daha fazla önem kazanmaktadır. Bu rehberimizde, bölgedeki **${service.key}** hizmetlerine dair tüm detayları ve ${variation.type.toLowerCase()} hakkında bilinmesi gerekenleri uzman ekibimizle birlikte derledik.\n\n`;
            
            content += `### Neden Ankara Özdemir Nakliyat?\n\n`;
            content += `${district} bölgesinde uzun yıllardır faaliyet gösteren firmamız, tamamen bölgenin mimari yapısına, trafik saatlerine ve binaların fiziksel koşullarına hakimdir. Özelikle ${service.key.toLowerCase()} ihtiyacınızda, eşyalarınızın güvenliği bizim birincil önceliğimizdir.\n\n`;
            
            if (variation.type === "Fiyatları") {
                content += `### ${district} Bölgesi Nakliye Fiyatları Nasıl Hesaplanır?\n\n`;
                content += `Müşterilerimizin en çok merak ettiği konulardan biri olan maliyetler, tamamen şeffaf bir şekilde hesaplanmaktadır:\n`;
                content += `- **Mesafe ve Konum:** ${district} içi veya şehirler arası mesafelere göre net kilometre hesabı.\n`;
                content += `- **Kat Durumu:** Binanızın kat sayısı ve asansör kurulumunun gerekip gerekmediği.\n`;
                content += `- **Eşya Hacmi:** Taşınacak eşyalarınızın miktarına uygun araç kapasitesi (1+1, 2+1, 3+1 gibi).\n\n`;
                content += `> [!TIP]\n> ${district} bölgesindeki en uygun ve garantili fiyat teklifini almak için ücretsiz ekspertiz hizmetimizden yararlanabilirsiniz. Asla sürpriz maliyetlerle karşılaşmazsınız.\n\n`;
            } else {
                content += `### Güvenilir Firmaları Nasıl Seçmelisiniz?\n\n`;
                content += `Sektörde korsan çalışan birçok kişi bulunmaktadır. ${district} bölgesinde firma seçerken şunlara dikkat etmelisiniz:\n`;
                content += `- **K3 Yetki Belgesi:** Ulaştırma Bakanlığı onaylı resmi taşımacılık belgesine sahip olmalı.\n`;
                content += `- **Sigortalı Taşıma:** Eşyalarınızın taşınma öncesinde ekspertiz ile sigortalanması şarttır.\n`;
                content += `- **Kendi Araç Filosu:** Kiralık araçlarla değil, özmal kapalı kasa araçlarla hizmet verilmelidir.\n\n`;
                content += `> [!IMPORTANT]\n> Ankara Özdemir Nakliyat olarak, ${district} konumundaki tüm operasyonlarımızı kendi kadrolu, uzman personelimiz ve kendi asansörlü araçlarımızla yürütmekteyiz.\n\n`;
            }
            
            content += `### Süreç Nasıl İşliyor?\n\n`;
            content += `1. **Ücretsiz Ekspertiz:** Sizi adresinizde ziyaret ederek eşya analizi yapıyoruz.\n`;
            content += `2. **Profesyonel Ambalajlama:** Patpat naylonlar, streç filmler ve özel kutularla eşyalarınız güvenceye alınıyor.\n`;
            content += `3. **Güvenli Taşıma:** Eğitimli personelimiz ve teknolojik asansörlerimizle hızlı nakliye gerçekleştiriliyor.\n`;
            content += `4. **Kurulum ve Teslimat:** Yeni adresinizde mobilyalarınız demonte edildiği gibi monte ediliyor.\n\n`;
            
            content += `Eşyalarınızın değerini biliyor, onları kendi eşyamız gibi taşıyoruz. ${district} genelinde kusursuz **${service.key}** ayrıcalığıyla tanışmak için hemen çağrı merkezimizi arayın.`;

            makaleler.push({
                id: `makale-seo-${idCounter++}`,
                title: title,
                slug: slug,
                category: service.key,
                location: `Ankara, ${district}`,
                date: new Date().toISOString(),
                excerpt: `${district} bölgesinde ${service.key} ${variation.type.toLowerCase()} hakkında kapsamlı rehber. Ücretsiz ekspertiz ve profesyonel lojistik çözümleri.`,
                content: content,
                keywords: `${district} ${service.key}, ${district} ${service.key.toLowerCase()} ${variation.type.toLowerCase()}, ankara nakliyat`
            });
        });
    });
});

fs.writeFileSync('./src/data/makalelerData.json', JSON.stringify(makaleler, null, 4));
console.log(`Generated ${makaleler.length} strictly formatted local SEO articles.`);
