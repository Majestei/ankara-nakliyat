import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';

export const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const config = JSON.parse(await readFile(join(root, '.agents/seo.config.json'), 'utf8'));
export const local = existsSync(join(root, '.agents/seo.local.json'))
  ? JSON.parse(await readFile(join(root, '.agents/seo.local.json'), 'utf8')) : {};
export const scope = 'https://www.googleapis.com/auth/webmasters.readonly';
export const runId = new Date().toISOString().replace(/[:.]/g, '-');

export async function save(name, value) {
  const folder = join(root, '.agents/reports', runId);
  await mkdir(folder, { recursive: true });
  const file = join(folder, name);
  await writeFile(file, typeof value === 'string' ? value : JSON.stringify(value, null, 2) + '\n');
  return file;
}

export function chromePath() {
  const candidates = [process.env.CHROME_PATH, local.chromePath,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'];
  const found = candidates.find(p => p && existsSync(p));
  if (!found) throw new Error('CHROME_NOT_FOUND');
  return found;
}

export function targetOrigin() {
  return process.argv.includes('--live') || process.argv.includes('--pagespeed')
    ? config.origin : `http://127.0.0.1:${config.localPort}`;
}

export function errorSummary(error) {
  // OAuth library errors can include tokens in config/headers: never serialize the error itself.
  const data = error.response?.data?.error;
  const reason = typeof data === 'object' ? data.details?.find(d => d.reason)?.reason : undefined;
  const allowed = new Set(['SERVICE_DISABLED', 'USER_PROJECT_DENIED', 'ACCESS_TOKEN_SCOPE_INSUFFICIENT',
    'RATE_LIMIT_EXCEEDED', 'invalid_grant', 'invalid_client', 'access_denied', 'CREDENTIALS_REQUIRED', 'UNSUPPORTED_CREDENTIALS', 'READONLY_SCOPE_REQUIRED', 'PROPERTY_ACCESS_REQUIRED', 'CHROME_NOT_FOUND', 'LIGHTHOUSE_RUNTIME_ERROR', 'PAGESPEED_ACCESS_BLOCKED', 'ENOENT', 'ETIMEDOUT', 'ECONNREFUSED', 'ENOTFOUND', 'PERMISSION_DENIED', 'UNAUTHENTICATED']);
  const code = reason || (typeof data === 'string' ? data : data?.status) || error.code || error.message;
  return { status: error.response?.status || null,
    code: allowed.has(code) ? code : 'REQUEST_FAILED' };
}

export function shiftDate(day, days) {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export async function paginate(query, base, maxRows = 100000) {
  const rows = [];
  const rowLimit = 25000;
  for (let startRow = 0; startRow < maxRows; startRow += rowLimit) {
    const result = await query({ ...base, startRow, rowLimit });
    const batch = result.rows || [];
    rows.push(...batch);
    if (batch.length < rowLimit) return { rows, paginationComplete: true };
  }
  return { rows, paginationComplete: false };
}
