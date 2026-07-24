const fs = require('fs');
const path = require('path');

const oldSlugsPath = path.join('..', 'nakliyeeski', 'old-slugs.json');
const oldSlugs = JSON.parse(fs.readFileSync(oldSlugsPath, 'utf-8'));

const newMakaleler = JSON.parse(fs.readFileSync('./src/data/makalelerData.json', 'utf-8'));
const newBlogs = JSON.parse(fs.readFileSync('./src/data/blogDataGen.json', 'utf-8'));

const allNewPages = [
    ...newMakaleler.map(m => ({ slug: m.slug, type: 'makaleler', title: m.title })),
    ...newBlogs.map(b => ({ slug: b.slug, type: 'blog', title: b.title }))
];

function tokenize(text) {
    if (!text) return [];
    return text.toLowerCase().replace(/[-_]/g, ' ').split(/\s+/).filter(Boolean);
}

function calculateScore(oldTokens, newTokens) {
    let score = 0;
    for (const token of oldTokens) {
        if (newTokens.includes(token)) score += 1;
    }
    // Penalize if the new slug has completely unrelated words, or favor exact matches
    return score / (oldTokens.length + newTokens.length);
}

const redirects = [];

for (const oldPage of oldSlugs) {
    const oldTokens = tokenize(oldPage.slug).filter(t => t !== '2026' && t !== '2025');
    
    let bestMatch = null;
    let bestScore = -1;

    for (const newPage of allNewPages) {
        const newTokens = tokenize(newPage.slug);
        const score = calculateScore(oldTokens, newTokens);

        if (score > bestScore) {
            bestScore = score;
            bestMatch = newPage;
        }
    }

    if (bestMatch && bestScore > 0) {
        // Ensure destination starts with /
        const sourcePath = `/${oldPage.type}/${oldPage.slug}`;
        const destPath = `/${bestMatch.type}/${bestMatch.slug}`;
        
        if (sourcePath !== destPath) {
            redirects.push({
                source: sourcePath,
                destination: destPath,
                permanent: true
            });
        }
    }
}

console.log(`Generated ${redirects.length} specific redirects.`);

// Update vercel.json
const vercelJsonPath = './vercel.json';
const vercelJson = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf-8'));

// Remove old generic rules
vercelJson.redirects = vercelJson.redirects.filter(r => !r.source.includes('(.*)-2026') && !r.source.includes('(.*)-evden-eve-nakliyat-rehberi') && !r.source.includes('(.*)-nakliyat-fiyatlari-2026') && !r.source.includes('(.*)-asansorlu-nakliyat') && !r.source.includes('blog/(.*)-evden-eve-nakliyat'));

// Add specific rules
// Vercel limit is 1024, so if redirects is > 1000, we might need to truncate, but 600 is fine.
vercelJson.redirects = [...redirects, ...vercelJson.redirects];

fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelJson, null, 2));
console.log('Successfully updated vercel.json with AI-supported exact redirects.');
