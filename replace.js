const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
  });
}

function processFiles() {
  const srcDir = path.join(__dirname, 'src');
  
  walkDir(srcDir, (filePath) => {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let originalContent = content;
      
      content = content.replace(/Ankara Nakliyat/g, "Coşar Global Nakliyat");
      content = content.replace(/ankaranakliyat\.com/g, "cosarglobalnakliyat.com");
      content = content.replace(/0312 000 00 00/g, "+90 541 647 87 27");
      content = content.replace(/\+903120000000/g, "+905416478727");
      content = content.replace(/info@ankaranakliyat\.com/g, "info@cosarglobalnakliyat.com");
      content = content.replace(/Global Coşar/g, "Coşar Global");
      content = content.replace(/golbalcosarnakliyat@outlook\.com/g, "info@cosarglobalnakliyat.com");
      content = content.replace(/globalcosarnakliyat\.com/g, "cosarglobalnakliyat.com");

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Updated:', filePath);
      }
    }
  });
}

processFiles();
