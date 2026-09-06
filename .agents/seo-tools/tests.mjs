import test from 'node:test';
import assert from 'node:assert/strict';
import { paginate, errorSummary, shiftDate } from './common.mjs';

test('pagination advances beyond the first 25,000 rows', async () => {
  const offsets = [];
  const result = await paginate(async request => {
    offsets.push(request.startRow);
    return { rows: Array(request.startRow === 0 ? 25000 : 3).fill({ clicks: 1 }) };
  }, { dimensions: ['page', 'query'] });
  assert.deepEqual(offsets, [0, 25000]);
  assert.equal(result.rows.length, 25003);
  assert.equal(result.paginationComplete, true);
});
test('row cap explicitly marks incomplete pagination', async () => {
  const result = await paginate(async () => ({ rows: Array(25000).fill({}) }), {}, 25000);
  assert.equal(result.paginationComplete, false);
});
test('empty API data stays empty', async () => {
  assert.deepEqual((await paginate(async () => ({}), {})).rows, []);
});
test('OAuth failures never expose credentials, request config or raw response', () => {
  const error = { message: 'secret-refresh-token', config: { headers: { authorization: 'secret' } },
    response: { status: 403, data: { error: { details: [{ reason: 'SERVICE_DISABLED' }], access_token: 'secret' } } } };
  assert.deepEqual(errorSummary(error), { status: 403, code: 'SERVICE_DISABLED' });
  assert.equal(JSON.stringify(errorSummary({ message: 'secret-refresh-token' })).includes('secret'), false);
});
test('equal comparison windows survive month and year boundaries', () => {
  assert.equal(shiftDate('2026-01-02', -3), '2025-12-30');
  assert.equal(shiftDate('2024-03-01', -1), '2024-02-29');
});
