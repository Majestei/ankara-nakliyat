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
    return score / (oldTokens.length + newTokens.length);
}

const unmappedSlugs = [];

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

    // Define a threshold for "good match". E.g., if bestScore is too low.
    // Score of 0.2 means maybe 1 word matched out of 5.
    if (!bestMatch || bestScore < 0.25) {
        unmappedSlugs.push({ ...oldPage, bestMatch, bestScore });
    }
}

console.log(`Found ${unmappedSlugs.length} old pages with poor matches (score < 0.25).`);
fs.writeFileSync('unmapped-slugs.json', JSON.stringify(unmappedSlugs, null, 2));
