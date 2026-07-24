const fs = require('fs');

const files = [
    './src/app/blog/page.tsx',
    './src/app/makaleler/page.tsx',
    './src/app/makaleler/[slug]/page.tsx'
];

for (const file of files) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf-8');
    
    // Replace known mojibake
    content = content
        .replace(/Ta\u00C3\u0178\u00C4\u00B1nma/g, 'Taşınma')
        .replace(/Ta\u00C3\u0178\u00C4\u00B1mac\u00C4\u00B1l\u00C4\u00B1k/g, 'Taşımacılık')
        .replace(/Ta\u00C3\u0178\u00C4\u00B1ma/g, 'Taşıma')
        .replace(/ta\u00C3\u0178\u00C4\u00B1nma/g, 'taşınma')
        .replace(/ta\u00C3\u0178\u00C4\u00B1mac\u00C4\u00B1l\u00C4\u00B1k/g, 'taşımacılık')
        .replace(/ta\u00C3\u0178\u00C4\u00B1ma/g, 'taşıma')
        .replace(/\u00C4\u00B0pu\u00C3\u00A7lar\u00C4\u00B1/g, 'İpuçları')
        .replace(/ipu\u00C3\u00A7lar\u00C4\u00B1/g, 'ipuçları')
        .replace(/g\u00C3\u0153r\u00C3\u0153\u00C3\u0178leri/g, 'görüşleri')
        .replace(/g\u00C3\u0153r\u00C3\u0153\u00C5\u0178leri/g, 'görüşleri')
        .replace(/s\u00C3\u0153reci/g, 'süreci')
        .replace(/s\u00C3\u0153recinizi/g, 'sürecinizi')
        .replace(/g\u00C3\u0153ncel/g, 'güncel')
        .replace(/sekt\u00C3\u00B6r/g, 'sektör')
        .replace(/T\u00C3\u0153rkiye'nin/g, 'Türkiye\'nin')
        .replace(/sundu\u00C4\u017Eumuz/g, 'sunduğumuz')
        .replace(/b\u00C3\u00B6lgesel/g, 'Bölgesel')
        .replace(/B\u00C3\u00B6lgesel/g, 'Bölgesel')
        .replace(/b\u00C3\u00B6lgesinde/g, 'bölgesinde')
        .replace(/\u00C3\u00B6zel/g, 'özel')
        .replace(/fiyatland\u00C4\u00B1rma/g, 'fiyatlandırma')
        .replace(/\u00C3\u00BCcretsiz/g, 'ücretsiz')
        .replace(/avantaj\u00C4\u00B1ndan/g, 'avantajından')
        .replace(/yararlan\u00C4\u00B1n/g, 'yararlanın')
        .replace(/Al\u00C4\u00B1n/g, 'Alın')
        .replace(/\u00C4\u00B0leti\u00C5\u0178ime Ge\u00C3\u00A7/g, 'İletişime Geç')
        .replace(/e\u00C5\u0178ya/g, 'eşya')
        .replace(/i\u00C3\u00A7in/g, 'için')
        .replace(/hakk\u00C4\u00B1nda/g, 'hakkında')
        .replace(/detayl\u00C4\u00B1/g, 'detaylı')
        .replace(/il\u00C3\u00A7elerinde/g, 'ilçelerinde')
        .replace(/asans\u00C3\u00B6rl\u00C3\u00BC/g, 'asansörlü')
        .replace(/t\u00C3\u00BCm/g, 'tüm')
        .replace(/T\u00C3\u00BCrkiye/g, 'Türkiye');
        
    // Just overwrite it with safe string replace since regex mojibake can be flaky
    if (file.includes('makaleler/[slug]/page.tsx')) {
        content = content.replace(/Hemen Teklif Al.*/g, 'Hemen Teklif Alın</h3>');
        content = content.replace(/\{post\.location\}.*yararlan.*/g, '{post.location} bölgesinde size özel fiyatlandırma ve ücretsiz ekspertiz avantajından yararlanın.');
        content = content.replace(/.*leti.*ime Ge.*/g, '                            İletişime Geç');
    }

    if (file.includes('blog/page.tsx')) {
        content = content.replace(/Blog \| Nakliyat Rehberi ve Ta.*nma .pu.*lar. \| Ankara Özdemir Nakliyat/g, 'Blog | Nakliyat Rehberi ve Taşınma İpuçları | Ankara Özdemir Nakliyat');
        content = content.replace(/Evden eve nakliyat, e.*ya paketleme ve .ehirler aras. ta.*mac.*l.*k hakk.nda uzman g.r..leri. Sorunsuz bir ta.*nma s.reci i.in ihtiyac.n.z olan t.m bilgiler burada./g, 'Evden eve nakliyat, eşya paketleme ve şehirler arası taşımacılık hakkında uzman görüşleri. Sorunsuz bir taşınma süreci için ihtiyacınız olan tüm bilgiler burada.');
        content = content.replace(/Ta.*nma s.recinizi kolayla.*t.racak profesyonel ipu.*lar. ve g.ncel sekt.r haberleri./g, 'Taşınma sürecinizi kolaylaştıracak profesyonel ipuçları ve güncel sektör haberleri.');
    }
    
    if (file.includes('makaleler/page.tsx')) {
        content = content.replace(/Nakliyat Rehberi ve B.*lgesel Hizmetler \| Ankara Özdemir Nakliyat/g, 'Nakliyat Rehberi ve Bölgesel Hizmetler | Ankara Özdemir Nakliyat');
        content = content.replace(/T.*rkiye'nin t.*m il ve il.*elerinde sundu.*umuz evden eve nakliyat, ofis ta.*ma ve asans.rl. ta.*ma hizmetleri hakk.nda detayl. SEO rehberleri./g, 'Türkiye\'nin tüm il ve ilçelerinde sunduğumuz evden eve nakliyat, ofis taşıma ve asansörlü taşıma hizmetleri hakkında detaylı SEO rehberleri.');
    }

    fs.writeFileSync(file, content, 'utf-8');
    console.log('Fixed', file);
}
