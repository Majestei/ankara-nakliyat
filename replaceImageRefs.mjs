import fs from 'fs';
import path from 'path';

const srcDir = './src';
const publicDir = './public'; // also update manifest or any other json if needed, but let's stick to src and app

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (/\.(ts|tsx|js|jsx)$/.test(fullPath)) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace /images/.*.(png|jpg|jpeg|jfif) with .webp
            const regex = /(\/images\/[^"'\s]+)\.(png|jpg|jpeg|jfif)/gi;
            const newContent = content.replace(regex, '$1.webp');

            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Updated references in: ${fullPath}`);
            }
        }
    }
}

processDirectory(srcDir);
// Let's also check layout.tsx and any root config files if they have images. They are inside src/app/ so they are covered.
