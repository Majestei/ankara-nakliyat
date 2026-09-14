import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { OAuth2Client, JWT } from 'google-auth-library';
import { root, config, local, scope, save, paginate, errorSummary } from './common.mjs';

const result = {
  generatedAt: new Date().toISOString(),
  site: config.site,
  property: config.gscProperty,
  status: 'NOT_TESTED',
  access: 'read-only API operations',
};

try {
  const credentialPath = process.env.SEO_GSC_CREDENTIALS_PATH || local.credentialsPath;
  if (!credentialPath) throw new Error('CREDENTIALS_REQUIRED');
  const credentials = JSON.parse(await readFile(resolve(root, credentialPath), 'utf8'));
  let client;
  if (credentials.type === 'authorized_user' && credentials.refresh_token) {
    client = new OAuth2Client(credentials.client_id, credentials.client_secret);
    client.setCredentials({ refresh_token: credentials.refresh_token });
  } else if (credentials.type === 'service_account' && credentials.private_key) {
    client = new JWT({ email: credentials.client_email, key: credentials.private_key, scopes: [scope] });
  } else {
    throw new Error('UNSUPPORTED_CREDENTIALS');
  }

  const quotaProject = local.quotaProjectId || credentials.quota_project_id;
  const headers = quotaProject ? { 'x-goog-user-project': quotaProject } : {};
  const access = await client.getAccessToken();
  const tokenInfo = await client.getTokenInfo(access.token);
  if (!tokenInfo.scopes.includes(scope)) throw new Error('READONLY_SCOPE_REQUIRED');

  const todayPT = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Los_Angeles', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(new Date());
  const end = new Date(`${todayPT}T12:00:00Z`);
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCMonth(start.getUTCMonth() - 16);
  const range = {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
  };

  const datasets = {};
  for (const dimensions of [[], ['date'], ['page'], ['query'], ['page', 'query'], ['device'], ['country']]) {
    const dataset = await paginate(async (data) => (await client.request({
      url: `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(config.gscProperty)}/searchAnalytics/query`,
      method: 'POST', headers, timeout: 30000, retry: false, data,
    })).data, {
      ...range,
      dimensions,
      type: 'web',
      dataState: 'final',
      aggregationType: dimensions.includes('page') ? 'auto' : 'byProperty',
    });
    datasets[dimensions.join('-') || 'propertyTotals'] = dataset;
  }

  result.status = 'CONNECTED';
  result.range = range;
  result.datasets = datasets;
  result.limitations = [
    'Dates use Pacific time and exclude the most recent three days.',
    'Anonymized queries and API row limits mean query datasets are not complete traffic totals.',
    'Average position is a period aggregate, not a live ranking.',
  ];
} catch (error) {
  result.status = 'BLOCKED';
  result.error = errorSummary(error);
  process.exitCode = 2;
}

console.log(await save('gsc-16-month-report.json', result));
console.log(JSON.stringify({ site: result.site, status: result.status, range: result.range, error: result.error }));
