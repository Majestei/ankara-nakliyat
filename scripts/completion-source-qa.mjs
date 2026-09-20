import { readFile, writeFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const read = async file => JSON.parse((await readFile(file, 'utf8')).replace(/^\uFEFF/, ''));
const reportRoot = 'docs/seo/recovery/2026-09-16';
const base = '.agents/reports/recovery-2026-09-16';
const origin = 'https://ankaraozdemirnakliyat.com';
const backup = await read(`${base}/phase2-backup/freeze.json`);
for (const file of ['src/data/recoveryRedirects.json', 'src/data/redirects.json', 'src/app/page.tsx', 'src/data/blogDataGen.json', 'src/data/makalelerData.json']) {
    const expected = execFileSync('git', ['show', `${backup.commit}:${file}`], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    assert.equal((await readFile(file, 'utf8')).replace(/\r\n/g, '\n'), expected.replace(/\r\n/g, '\n'), `Frozen source: ${file}`);
}
const oldRules = await read('src/data/recoveryRedirects.json');
const rules = [...oldRules, ...await read('src/data/phase2Redirects.json')];
const decisions = [...await read(`${reportRoot}/migration-map.json`), ...await read(`${reportRoot}/phase2-migration/reviewed-map.json`)];
const paths = new Map(rules.map(row => [row.source, row.destination]));
assert.equal(paths.size, rules.length, 'Repeated redirect source');
const live = new Map((await read(`${base}/phase2-live-final/crawl.json`)).map(row => [new URL(row.url).pathname, row]));
const winnerReport = await read(`${reportRoot}/phase2-live-source-winner-check.json`);
const winners = winnerReport.checks.map(row => new URL(row.url).pathname);
for (const path of winners) assert.ok(!paths.has(path), `Winner removal: ${path}`);
for (const row of rules) {
    assert.ok(!paths.has(row.destination), `Redirect chain: ${row.source}`);
    assert.notEqual(row.destination, '/', `Homepage fallback: ${row.source}`);
    const reviewed = decisions.find(item => item.source === row.source);
    assert.ok(reviewed?.approved && reviewed.destination === row.destination, `Unreviewed migration: ${row.source}`);
    if (!oldRules.some(item => item.source === row.source)) assert.ok(live.get(row.destination)?.indexable, `Target not indexable in baseline: ${row.destination}`);
}
const records = new Map();
for (const [file, type] of [['blogDataGen.json', 'blog'], ['makalelerData.json', 'makaleler']]) {
    for (const row of await read(`src/data/${file}`)) records.set(`/${type}/${row.slug}`, { ...row, type });
}
// Read exactly the imports used by the application, including deliberate later revisions.
const aggregate = await readFile('src/data/editorialOverrides.ts', 'utf8');
const revisions = new Map();
for (const match of aggregate.matchAll(/import\s+\w+\s+from\s+'\.\/([^']+\.json)'/g)) {
    for (const row of await read(`src/data/${match[1]}`)) {
        const path = `/${row.type}/${row.slug}`;
        assert.ok(records.has(path), `New editorial route forbidden: ${path}`);
        assert.ok(row.content?.trim() && row.excerpt?.trim(), `Empty revision: ${path}`);
        assert.ok(Object.keys(row).every(key => ['type', 'slug', 'content', 'excerpt'].includes(key)), `Unexpected identity/private field: ${path}`);
        revisions.set(path, row);
    }
}
const brokenLinks = [];
for (const [path, raw] of records) {
    if (paths.has(path)) continue;
    const content = revisions.get(path)?.content || raw.content;
    for (const match of content.matchAll(/\]\((\/[^)]+)\)/g)) {
        const target = match[1].split('#')[0].split('?')[0];
        if (paths.has(target) || !live.get(target)?.indexable) brokenLinks.push({ source: path, target });
    }
}
assert.deepEqual(brokenLinks, [], 'Broken/redirecting editorial links');
const report = { result: 'PASS', frozenWinners: winners.length, originalRulesUnchanged: oldRules.length, totalRules: rules.length,
    revisedPublished: [...revisions.keys()].filter(path => !paths.has(path)).length,
    publishedBlogs: [...records.keys()].filter(path => path.startsWith('/blog/') && !paths.has(path)).length,
    publishedArticles: [...records.keys()].filter(path => path.startsWith('/makaleler/') && !paths.has(path)).length,
    brokenLinks, origin };
await mkdir(`${reportRoot}/completion`, { recursive: true });
await writeFile(`${reportRoot}/completion/source-qa.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report));
