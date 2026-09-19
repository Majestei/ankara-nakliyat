import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createRequire } from 'node:module';
import { config, local, root, scope, paginate, shiftDate, errorSummary } from '../.agents/seo-tools/common.mjs';
const require = createRequire(resolve('.agents/seo-tools/package.json'));
const { OAuth2Client, JWT } = require('google-auth-library');
const out = resolve(process.env.RECOVERY_DIR || '.agents/reports/recovery-2026-09-16');
await mkdir(out, { recursive: true });
const credentials = JSON.parse(await readFile(resolve(root, local.credentialsPath), 'utf8'));
const client = credentials.type === 'authorized_user'
  ? new OAuth2Client(credentials.client_id, credentials.client_secret)
  : new JWT({ email: credentials.client_email, key: credentials.private_key, scopes: [scope] });
if (credentials.type === 'authorized_user') client.setCredentials({ refresh_token: credentials.refresh_token });
const headers = { 'x-goog-user-project': local.quotaProjectId || credentials.quota_project_id };
const access = await client.getAccessToken();
if (!(await client.getTokenInfo(access.token)).scopes.includes(scope)) throw new Error('READONLY_SCOPE_REQUIRED');
const get = async (url, data) => (await client.request({ url, method: data ? 'POST' : 'GET', headers, data, timeout: 45000, retry: false })).data;
const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const endDate = shiftDate(today, -3);
const start = new Date(endDate + 'T12:00:00Z'); start.setUTCMonth(start.getUTCMonth() - 16);
const ranges = {
  history: { startDate: start.toISOString().slice(0, 10), endDate },
  current28: { startDate: shiftDate(endDate, -27), endDate },
  previous28: { startDate: shiftDate(endDate, -55), endDate: shiftDate(endDate, -28) },
  days90: { startDate: shiftDate(endDate, -89), endDate },
  days180: { startDate: shiftDate(endDate, -179), endDate },
};
const api = `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.gscProperty)}`;
const result = { generatedAt: new Date().toISOString(), property: config.gscProperty, periods: {}, limitations: [
  'Final web data, Pacific dates; latest three days excluded. API anonymizes queries and may omit rows. Missing rows are NOT zero demand.',
  'Property totals, page totals and query totals use different aggregation. Multiple pages per query are overlap, not automatic cannibalization.',
] };
if (!process.argv.includes('--inspect-only')) {
  for (const [name, range] of Object.entries(ranges)) {
    const datasets = {};
    for (const dimensions of [[], ['date'], ['page'], ['query'], ['page', 'query'], ['device'], ['country']]) {
      datasets[dimensions.join('-') || 'propertyTotals'] = await paginate(data => get(api + '/searchAnalytics/query', data), {
        ...range, dimensions, type: 'web', dataState: 'final', aggregationType: dimensions.includes('page') ? 'auto' : 'byProperty',
      });
    }
    result.periods[name] = { ...range, datasets };
    await writeFile(resolve(out, 'gsc.json'), JSON.stringify(result));
    console.log(name, JSON.stringify({ totals: datasets.propertyTotals.rows[0], pages: datasets.page.rows.length, pairs: datasets['page-query'].rows.length }));
  }
  result.sitemaps = await get(api + '/sitemaps');
  await writeFile(resolve(out, 'gsc.json'), JSON.stringify(result));
  // Export finest requested grain by month to reduce API row truncation.
  const dates = result.periods.history.datasets.date.rows.map(r => r.keys[0]).sort();
  const months = [...new Set(dates.map(d => d.slice(0, 7)))];
  for (const month of months) {
    const monthDates = dates.filter(d => d.startsWith(month));
    const range = { startDate: monthDates[0], endDate: monthDates.at(-1) };
    const dataset = await paginate(data => get(api + '/searchAnalytics/query', data), {
      ...range, dimensions: ['date', 'query', 'page', 'device', 'country'], type: 'web', dataState: 'final', aggregationType: 'auto',
    });
    await writeFile(resolve(out, `gsc-detail-${month}.json`), JSON.stringify({ ...range, dimensions: ['date', 'query', 'page', 'device', 'country'], ...dataset }));
    console.log('detail', month, dataset.rows.length, dataset.paginationComplete);
  }
}
if (process.argv.includes('--inspect') || process.argv.includes('--inspect-only')) {
  const xml = await (await fetch(config.origin + '/sitemap.xml')).text();
  const urls = [...new Set([...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]))];
  let inspected = [];
  try { inspected = JSON.parse(await readFile(resolve(out, 'inspection.json'), 'utf8')); } catch {}
  const done = new Set(inspected.filter(r => !r.error).map(r => r.url));
  const remaining = urls.filter(u => !done.has(u));
  let cursor = 0;
  await Promise.all(Array.from({ length: 3 }, async () => {
    while (cursor < remaining.length) {
      const url = remaining[cursor++];
      try {
        const response = await get('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', { inspectionUrl: url, siteUrl: config.gscProperty, languageCode: 'en-US' });
        inspected.push({ url, inspectedAt: new Date().toISOString(), ...response.inspectionResult });
      } catch (e) {
        const error = errorSummary(e); inspected.push({ url, error });
        if ([403,429].includes(error.status)) { cursor = remaining.length; }
      }
      if (inspected.length % 50 === 0) {
        console.log('inspected', inspected.length, '/', urls.length);
        await writeFile(resolve(out, `inspection-checkpoint-${inspected.length}.json`), JSON.stringify(inspected));
      }
    }
  }));
  await writeFile(resolve(out, 'inspection.json'), JSON.stringify(inspected));
  console.log('inspection complete', inspected.length);
}
