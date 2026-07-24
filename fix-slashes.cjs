const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx')) results.push(file);
        }
    });
    return results;
}

const files = walk('src/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    // Replace: canonical: "https://ankaraozdemirnakliyat.com/blog/" with canonical: "https://ankaraozdemirnakliyat.com/blog"
    // Also works with backticks: canonical: `https://ankaraozdemirnakliyat.com/blog/` with canonical: `https://ankaraozdemirnakliyat.com/blog`
    const newContent = content.replace(/canonical:\s*([`"'])((?:https:\/\/ankaraozdemirnakliyat\.com)(?:(?:(?!\1).)*?))\/?\1/g, 'canonical: $1$2$1');
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
    }
});
