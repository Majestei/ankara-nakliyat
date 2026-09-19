import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
// Test Wrangler's bundled worker so JSON module behavior matches deployment.
const worker = (await import(pathToFileURL(resolve(process.argv[2] || '.agents/reports/recovery-2026-09-16/edge-build/worker.js')))).default;
const recovery = JSON.parse(await readFile('src/data/recoveryRedirects.json', 'utf8'));
let checks = 0;
for (const origin of ['http://ankaraozdemirnakliyat.com', 'http://www.ankaraozdemirnakliyat.com', 'https://www.ankaraozdemirnakliyat.com']) {
  for (const rule of [...recovery, {source:'/',destination:'/'}, {source:'/blog',destination:'/blog'}, {source:'/hizmetler/sigorta',destination:'/hizmetler/nakliyat-sigortasi'}]) {
    for (const suffix of ['', '/']) {
      const response = await worker.fetch(new Request(origin + rule.source + suffix + '?a=Ankara%20nakliyat&a=2'));
      assert.equal(response.status, 301);
      const target = new URL(response.headers.get('location'));
      assert.equal(target.origin, 'https://ankaraozdemirnakliyat.com');
      assert.equal(target.pathname, rule.destination);
      assert.deepEqual(target.searchParams.getAll('a'), ['Ankara nakliyat','2']);
      checks++;
    }
  }
}
console.log(JSON.stringify({edgeRedirectCases:checks,result:'PASS'}));
