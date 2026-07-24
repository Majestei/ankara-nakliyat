const fs = require('fs');
const path = require('path');

function walk(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            next();
          });
        } else {
          if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.json')) {
            results.push(file);
          }
          next();
        }
      });
    })();
  });
}

walk(path.join(__dirname, 'src'), function(err, results) {
  if (err) throw err;
  let count = 0;
  for (const file of results) {
    let content = fs.readFileSync(file, 'utf-8');
    let newContent = content
        .replace(/Akif Nakliyat/g, 'Ankara Özdemir Nakliyat')
        .replace(/akif nakliyat/g, 'ankara özdemir nakliyat');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf-8');
        console.log(`Updated ${file}`);
        count++;
    }
  }
  console.log(`Replaced in ${count} files.`);
});
