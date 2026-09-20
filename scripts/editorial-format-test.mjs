import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile(new URL('../src/lib/editorial-format.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ES2022 } }).outputText;
const { editorialInline, editorialHtml } = await import('data:text/javascript;base64,' + Buffer.from(compiled).toString('base64'));
assert.equal(editorialHtml('## Başlık\n\n### Alt başlık\n\nMetin'), '<h2>Başlık</h2>\n<h3>Alt başlık</h3>\n<p>Metin</p>');
assert.equal(editorialHtml('- Bir\n- İki\n\n1. İlk\n2. Son'), '<ul><li>Bir</li><li>İki</li></ul>\n<ol><li>İlk</li><li>Son</li></ol>');
assert.equal(editorialHtml('## Başlık\nAçıklama'), '<h2>Başlık</h2><p>Açıklama</p>');
assert.equal(editorialInline('[Depo](/hizmetler/depolama) ve **liste**'), '<a href="/hizmetler/depolama">Depo</a> ve <strong>liste</strong>');
assert.equal(editorialInline('[Adres bildirimi](https://www.turkiye.gov.tr/adres-degisikligi-bildirimi)'), '<a href="https://www.turkiye.gov.tr/adres-degisikligi-bildirimi">Adres bildirimi</a>');
assert.ok(!editorialInline('[x](https://www.turkiye.gov.tr.evil.test/path)').includes('<a '));
for (const unsafe of ['[x](javascript:alert(1))', '[x](//evil.test)', '[x](https://evil.test)', '[x](/a" onclick="bad)']) {
    assert.ok(!editorialInline(unsafe).includes('<a '), unsafe);
}
assert.equal(editorialInline('<script>"x"</script> &'), '&lt;script&gt;&quot;x&quot;&lt;/script&gt; &amp;');
console.log('PASS: headings, lists, inline links, escaping and unsafe URL rejection');
