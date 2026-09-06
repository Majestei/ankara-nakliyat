import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OAuth2Client, JWT } from 'google-auth-library';
import { root, config, local, scope, save, shiftDate, paginate, errorSummary } from './common.mjs';

const result = { generatedAt: new Date().toISOString(), site: config.site,
  property: config.gscProperty, status: 'NOT_TESTED', access: 'read-only API operations' };
try {
  // Deliberately no fallback to a different site's identity or global ADC.
  const credentialPath = process.env.SEO_GSC_CREDENTIALS_PATH || local.credentialsPath;
  if (!credentialPath) throw new Error('CREDENTIALS_REQUIRED');
  const credentials = JSON.parse(await readFile(resolve(root, credentialPath), 'utf8'));
  let client;
  if (credentials.type === 'authorized_user' && credentials.refresh_token) {
    client = new OAuth2Client(credentials.client_id, credentials.client_secret);
    client.setCredentials({ refresh_token: credentials.refresh_token });
  } else if (credentials.type === 'service_account' && credentials.private_key) {
    client = new JWT({ email: credentials.client_email, key: credentials.private_key, scopes: [scope] });
  } else throw new Error('UNSUPPORTED_CREDENTIALS');
  const quotaProject = local.quotaProjectId || credentials.quota_project_id;
  const headers = quotaProject ? { 'x-goog-user-project': quotaProject } : {};
  result.quotaProject = quotaProject || null;
  const access = await client.getAccessToken();
  const tokenInfo = await client.getTokenInfo(access.token);
  result.oauthScope = tokenInfo.scopes.includes(scope) ? 'webmasters.readonly' : 'OTHER';
  if (result.oauthScope !== 'webmasters.readonly') throw new Error('READONLY_SCOPE_REQUIRED');
  const sites = await client.request({ url: 'https://www.googleapis.com/webmasters/v3/sites',
    headers, timeout: 25000, retry: false });
  const property = sites.data.siteEntry?.find(p => p.siteUrl === config.gscProperty && p.permissionLevel !== 'siteUnverifiedUser');
  if (!property) throw new Error('PROPERTY_ACCESS_REQUIRED');
  result.permissionLevel = property.permissionLevel;
  result.status = 'CONNECTED';
  if (!process.argv.includes('--check')) {
    const todayPT = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Los_Angeles',
      year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
    const endDate = shiftDate(todayPT, -3);
    result.periods = {};
    for (const [name, range] of Object.entries({
      current: { startDate: shiftDate(endDate, -27), endDate },
      previous: { startDate: shiftDate(endDate, -55), endDate: shiftDate(endDate, -28) }
    })) {
      const sets = {};
      for (const dimensions of [[], ['date'], ['page'], ['query'], ['page', 'query'], ['device'], ['country']]) {
        const dataset = await paginate(async data => (await client.request({
          url: `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.gscProperty)}/searchAnalytics/query`,
          method: 'POST', headers, timeout: 30000, retry: false, data
        })).data, { ...range, dimensions, type: 'web', dataState: 'final',
          aggregationType: dimensions.includes('page') ? 'auto' : 'byProperty' });
        sets[dimensions.join('-') || 'propertyTotals'] = dataset;
      }
      result.periods[name] = { ...range, datasets: sets };
    }
    result.limitations = [
      'Dates use Pacific time. Only final web-search data is requested; recent three days are excluded.',
      'Anonymized queries and internal API row limits mean page-query rows are not complete traffic totals.',
      'Use propertyTotals for site totals, not the sum of query rows. Empty rows mean no returned data, not proof of zero demand.',
      'Average position is a period aggregate, not a live Google ranking. Overlapping query pages alone do not prove cannibalization.',
      'No bulk URL Inspection, URL removal, sitemap submission or site write operation is performed.'
    ];
  }
} catch (error) {
  result.status = 'BLOCKED';
  result.error = errorSummary(error);
  result.nextStep = 'Read .agents/INTEGRATION.md. Resolve Google API/IAM access, then rerun gsc:check.';
  process.exitCode = 2;
}
console.log(await save(process.argv.includes('--check') ? 'gsc-check.json' : 'gsc-report.json', result));
console.log(JSON.stringify({ site: config.site, status: result.status, error: result.error }));
