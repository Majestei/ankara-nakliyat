const fs = require('fs');
const path = require('path');

const extractedPath = path.join('..', 'nakliyeeski', 'extracted-unmapped-posts.json');
const extractedPosts = JSON.parse(fs.readFileSync(extractedPath, 'utf-8'));

const makalelerPath = './src/data/makalelerData.json';
const blogsPath = './src/data/blogDataGen.json';

const makalelerData = JSON.parse(fs.readFileSync(makalelerPath, 'utf-8'));
const blogsData = JSON.parse(fs.readFileSync(blogsPath, 'utf-8'));

let makalelerAdded = 0;
let blogsAdded = 0;

for (const post of extractedPosts) {
    const { originalType, type, ...rest } = post;
    
    // We map old properties to new ones to ensure they don't break TS interfaces.
    // Ensure we don't duplicate
    if (originalType === 'makaleler' || originalType === 'makale') {
        if (!makalelerData.find(m => m.slug === post.slug)) {
            // Generate an ID if needed or keep existing
            makalelerData.push(post);
            makalelerAdded++;
        }
    } else {
        if (!blogsData.find(b => b.slug === post.slug)) {
            blogsData.push(post);
            blogsAdded++;
        }
    }
}

fs.writeFileSync(makalelerPath, JSON.stringify(makalelerData, null, 2));
fs.writeFileSync(blogsPath, JSON.stringify(blogsData, null, 2));

console.log(`Integrated ${makalelerAdded} posts into makalelerData.json`);
console.log(`Integrated ${blogsAdded} posts into blogDataGen.json`);
