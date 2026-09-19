import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import http from 'node:http';
import https from 'node:https';

const args = process.argv.slice(2);
const option = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const origin = option('--origin', 'http://127.0.0.1:3101');
const canonicalOrigin = 'https://ankaraozdemirnakliyat.com';
const output = resolve(option('--out', 'docs/seo/recovery/2026-09-16/redirect-qa-local.json'));
const isLocal = /^(localhost|127\.0\.0\.1)$/.test(new URL(origin).hostname);
const readJson = async path => JSON.parse(await readFile(path, 'utf8'));
const migrations = await readJson('docs/seo/recovery/2026-09-16/migration-map.json');
const configured = await readJson('src/data/recoveryRedirects.json');
const historic = await readJson('src/data/redirects.json');
const aliases = [
  { source: '/hizmetler/evden-eve-nakliyat', destination: '/evden-eve-nakliyat' },
  { source: '/hizmetler/sigorta', destination: '/hizmetler/nakliyat-sigortasi' },
  { source: '/sitemap-2.xml', destination: '/sitemap.xml' },
  { source: '/sitemap-3.xml', destination: '/sitemap.xml' },
  { source: '/islemler/ankara', destination: '/islemler' },
];
const expected = [...configured, ...historic, ...aliases];
const normalize = path => path.replace(/\/+$/, '') || '/';
const canonicalEquals = (value, expected) => {
  try { return new URL(value).href === new URL(expected).href; } catch { return false; }
};
const mapping = new Map(expected.map(row => [row.source, row.destination]));
const query = '?utm_source=recovery-qa&test=1&encoded=Ankara%20nakliyat';
const report = {
  generatedAt: new Date().toISOString(), origin, node: process.version,
  mapChecks: [], redirectChecks: [], targetChecks: [], winnerChecks: [], normalizationChecks: [],
  limitations: [
    'HTTP-to-HTTPS normalization at Cloudflare edge is NOT TESTED by a local HTTP origin.',
    'Local www tests inject Host and inspect Location; final target content is tested on the local origin.',
    'Search Analytics omits some query rows; absent data is not treated as zero demand.',
    'Sitemap XML targets require HTTP 200 and valid URL-set content, not HTML canonical metadata.',
  ],
};
const requests = new Map();
async function fetchPage(path, host) {
  const key = `${host || ''}|${path}`;
  if (!requests.has(key)) requests.set(key, (async () => {
    const headers = { 'user-agent': 'NakliyeRecoveryRedirectQA/1.0' };
    if (host) headers.host = host;
    // Node fetch does not forward an overridden Host reliably; use native HTTP.
    const url = new URL(path, origin);
    const response = await new Promise((resolve, reject) => {
      const req = (url.protocol === 'https:' ? https : http).get(url, { headers }, res => {
        const chunks = []; res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve({ status: res.statusCode, headers: new Headers(res.headers), html: Buffer.concat(chunks).toString() }));
      });
      req.setTimeout(20000, () => req.destroy(new Error('REQUEST_TIMEOUT')));
      req.on('error', reject);
    });
    const html = response.html;
    const tags = html.match(/<(?:meta|link)\b[^>]*>/gi) || [];
    const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, 'i'))?.[1];
    const canonical = tags.filter(tag => attribute(tag, 'rel') === 'canonical').map(tag => attribute(tag, 'href'));
    const robots = tags.filter(tag => ['robots', 'googlebot'].includes(attribute(tag, 'name')?.toLowerCase())).map(tag => attribute(tag, 'content'));
    return { status: response.status, location: response.headers.get('location'), canonical, noindex: robots.some(value => /(?:^|[,\s])(noindex|none)(?:$|[,\s])/i.test(value || '')) || /noindex|none/i.test(response.headers.get('x-robots-tag') || ''), sitemap: /<urlset\b/.test(html), robots };
  })());
  return requests.get(key);
}
async function workers(items, fn, concurrency = 4) {
  let next = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (next < items.length) {
      const item = items[next++];
      await fn(item);
    }
  }));
}
function finalDestination(source) {
  const seen = new Set();
  let target = source;
  while (mapping.has(target)) {
    if (seen.has(target)) return { loop: true, chain: [...seen, target] };
    seen.add(target);
    target = mapping.get(target);
  }
  return { target, hops: seen.size, chain: [...seen, target] };
}
for (const row of expected) {
  const result = finalDestination(row.source);
  const approved = migrations.find(m => m.source === row.source);
  const issues = [];
  if (result.loop) issues.push('MAP_LOOP');
  if (result.hops > 1) issues.push('MAP_CHAIN');
  if (configured.some(m => m.source === row.source) && (!approved?.approved || approved.destination !== row.destination || approved.action !== '301')) issues.push('UNAPPROVED_OR_MISMATCHED_MIGRATION');
  report.mapChecks.push({ ...row, result: issues.length ? 'FAIL' : 'PASS', issues, ...result });
}
const redirectCases = expected.flatMap(row => [
  { name: 'normal', suffix: '' }, { name: 'slash', suffix: '/' },
  { name: 'query', suffix: query }, { name: 'slash-query', suffix: '/' + query },
].flatMap(variant => [false, true].map(www => ({ ...row, variant: variant.name, path: row.source + variant.suffix, www }))));
await workers(redirectCases, async test => {
  try {
    const response = await fetchPage(test.path, test.www ? 'www.ankaraozdemirnakliyat.com' : undefined);
    const location = response.location ? new URL(response.location, origin) : null;
    const expectedQuery = test.variant.includes('query') ? query : '';
    const issues = [];
    if (response.status !== 301) issues.push('EXPECTED_301');
    if (location?.pathname !== test.destination) issues.push('WRONG_DESTINATION');
    if (new URLSearchParams(location?.search || '').toString() !== new URLSearchParams(expectedQuery).toString()) issues.push('QUERY_NOT_PRESERVED');
    if (test.www && location?.origin !== canonicalOrigin) issues.push('WWW_NOT_NORMALIZED');
    let follow = null;
    if (location) {
      // Inspect the returned target path on this build, never accidentally follow onto live production.
      follow = await fetchPage(location.pathname + location.search);
      if (follow.status >= 300 && follow.status < 400) {
        issues.push('REDIRECT_CHAIN');
        const next = follow.location ? new URL(follow.location, origin) : null;
        if (next?.pathname === location.pathname && next?.search === location.search) issues.push('REDIRECT_LOOP');
      } else if (follow.status !== 200) issues.push('TARGET_NOT_200');
    }
    report.redirectChecks.push({ source: test.source, variant: test.variant, host: test.www ? 'www' : 'apex-or-local', requestedPath: test.path, status: response.status, location: response.location, targetStatus: follow?.status, result: issues.length ? 'FAIL' : 'PASS', issues });
  } catch (error) {
    report.redirectChecks.push({ ...test, result: 'FAIL', issues: ['REQUEST_ERROR'], error: error.message });
  }
});
await workers([...new Set(expected.map(row => row.destination))], async path => {
  try {
    const response = await fetchPage(path);
    const issues = [];
    if (response.status !== 200) issues.push('TARGET_NOT_200');
    if (path.endsWith('.xml')) { if (!response.sitemap) issues.push('INVALID_SITEMAP_XML'); }
    else {
      if (response.canonical.length !== 1 || !canonicalEquals(response.canonical[0], canonicalOrigin + path)) issues.push('TARGET_NOT_SELF_CANONICAL');
      if (response.noindex) issues.push('TARGET_NOINDEX');
    }
    report.targetChecks.push({ path, ...response, result: issues.length ? 'FAIL' : 'PASS', issues });
  } catch (error) { report.targetChecks.push({ path, result: 'FAIL', issues: ['REQUEST_ERROR'], error: error.message }); }
});
const protectedQueries = new Set(['incek nakliye', 'atakent nakliyat', 'etimesgut evden eve nakliyat']);
const protectedPaths = new Map([
  ['/', ['Explicit flagship / GSC local-query winner']],
  ['/evden-eve-nakliyat', ['Explicit existing service owner']],
  ['/islemler/ankara/golbasi/incek', ['Explicit Incek winner protection']],
  ['/islemler/ankara/etimesgut', ['Explicit Etimesgut winner protection']],
  ['/islemler/ankara/etimesgut/evden-eve-nakliyat', ['GSC Etimesgut service clicks']],
  ['/blog/etimesgut-evden-eve-nakliyat-rehberi', ['GSC Etimesgut blog clicks']],
]);
try {
  const gsc = await readJson('.agents/reports/recovery-2026-09-16/gsc.json');
  for (const period of ['current28', 'days90', 'days180']) {
    const rows = gsc.periods[period]?.datasets?.['page-query']?.rows || [];
    for (const row of rows) {
      const [url, term] = row.keys || [];
      if (!protectedQueries.has(term) || !(row.clicks > 0 || row.position <= 10)) continue;
      const path = normalize(new URL(url).pathname);
      if (!protectedPaths.has(path)) protectedPaths.set(path, []);
      protectedPaths.get(path).push({ period, query: term, clicks: row.clicks, impressions: row.impressions, position: row.position });
    }
  }
} catch (error) { report.limitations.push(`GSC winner supplementation unavailable: ${error.message}`); }
await workers([...protectedPaths], async ([path, reasons]) => {
  try {
    const response = await fetchPage(path);
    const issues = [];
    const recovery = migrations.find(row => row.source === path && row.oldStatus === 404 && row.group === 'legacy_404_recovery' && row.approved);
    let protection;
    if (recovery) {
      const target = response.location ? new URL(response.location, origin) : null;
      const final = await fetchPage(recovery.destination);
      if (response.status !== 301 || target?.pathname !== recovery.destination) issues.push('HISTORICAL_WINNER_NOT_RECOVERED');
      if (final.status !== 200 || final.noindex || final.canonical.length !== 1 || !canonicalEquals(final.canonical[0], canonicalOrigin + recovery.destination)) issues.push('HISTORICAL_WINNER_TARGET_INVALID');
      protection = { disposition: 'RECOVER_ALREADY_404', oldStatus: 404, destination: recovery.destination, targetStatus: final.status, targetCanonical: final.canonical };
    } else {
      if (response.status !== 200) issues.push('WINNER_NOT_200');
      if (response.location) issues.push('WINNER_REDIRECTED');
      if (response.noindex) issues.push('WINNER_NOINDEX');
      if (response.canonical.length !== 1 || !canonicalEquals(response.canonical[0], new URL(path, canonicalOrigin).href)) issues.push('WINNER_CANONICAL_CHANGED');
      protection = { disposition: 'KEEP_200_INDEXABLE_SELF_CANONICAL' };
    }
    report.winnerChecks.push({ path, reasons, ...response, protection, result: issues.length ? 'FAIL' : 'PASS', issues });
  } catch (error) { report.winnerChecks.push({ path, reasons, result: 'FAIL', issues: ['REQUEST_ERROR'], error: error.message }); }
});
for (const path of ['/evden-eve-nakliyat/', '/islemler/ankara/sincan/']) {
  const response = await fetchPage(path);
  const target = response.location ? new URL(response.location, origin) : null;
  const next = target ? await fetchPage(target.pathname) : null;
  const issues = [];
  if (response.status !== 301 || target?.pathname !== normalize(path)) issues.push('SLASH_NORMALIZATION');
  if (next?.status !== 200) issues.push('NORMALIZATION_TARGET_NOT_200');
  report.normalizationChecks.push({ path, ...response, targetStatus: next?.status, result: issues.length ? 'FAIL' : 'PASS', issues });
}
report.environment = isLocal ? 'local production build; Cloudflare HTTPS edge not exercised' : 'production origin';
for (const key of ['mapChecks', 'redirectChecks', 'targetChecks', 'winnerChecks', 'normalizationChecks']) report[key].sort((a, b) => (a.source || a.path || '').localeCompare(b.source || b.path || ''));
report.summary = Object.fromEntries(['mapChecks', 'redirectChecks', 'targetChecks', 'winnerChecks', 'normalizationChecks'].map(key => [key, { total: report[key].length, failed: report[key].filter(row => row.result === 'FAIL').length }]));
report.result = Object.values(report.summary).some(section => section.failed) ? 'FAIL' : 'PASS';
await mkdir(resolve(output, '..'), { recursive: true });
await writeFile(output, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ result: report.result, summary: report.summary, output }));
if (report.result === 'FAIL') process.exitCode = 1;
