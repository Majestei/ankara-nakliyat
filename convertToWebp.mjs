import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirPath = './public/images';

async function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await processDirectory(fullPath);
        } else if (/\.(png|jpe?g|jfif)$/i.test(fullPath)) {
            const parsed = path.parse(fullPath);
            const webpPath = path.join(parsed.dir, parsed.name + '.webp');
            try {
                await sharp(fullPath).webp({ quality: 80 }).toFile(webpPath);
                console.log(`Converted: ${fullPath} -> ${webpPath}`);
                fs.unlinkSync(fullPath); // Delete original to save space and avoid confusion
            } catch (err) {
                console.error(`Error converting ${fullPath}:`, err);
            }
        }
    }
}

processDirectory(dirPath);
