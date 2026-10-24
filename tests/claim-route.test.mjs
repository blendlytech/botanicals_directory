import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { parseClaimInput } from '../apps/web/src/lib/claim-policy.ts';
const require = createRequire(import.meta.url);
const ts = require(process.env.RPV_TYPESCRIPT_PATH || 'typescript');
const source = fs.readFileSync(new URL('../apps/web/src/app/api/vendor/claim/route.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const vendorId = '12345678-1234-1234-1234-123456789abc';
const evidence = 'I manage this business and its public website.';
function route({ user = { id: 'trusted-session-id', email_confirmed_at: '2026-10-24' }, result = { data: 'claim-id', error: null } } = {}) {
  const calls = [], exports = {};
  const dependencies = {
    'next/server': { NextResponse: { json: (body, options) => Response.json(body, options) } },
    '@/utils/supabase/server': { createClient: () => ({ auth: { getUser: async () => ({ data: { user } }) } }) },
    '@rpv/supabase/admin': { supabaseAdmin: { rpc: async (...args) => { calls.push(args); return result; } } },
    '@/lib/claim-policy': { parseClaimInput },
  };
  vm.runInNewContext(compiled, { exports, require: name => {
    assert.ok(dependencies[name]); return dependencies[name];
  }, URL, console: { error() {} } });
  return { post: exports.POST, calls };
}
function request(body = { vendorId, evidence }, origin = 'https://rareplantvendors.com') {
  return new Request('https://rareplantvendors.com/api/vendor/claim', { method: 'POST',
    headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
}
test('rejects cross-origin requests before database writes', async () => {
  const { post, calls } = route();
  assert.equal((await post(request(undefined, 'https://evil.example'))).status, 403);
  assert.equal(calls.length, 0);
});
test('requires a confirmed authenticated account', async () => {
  for (const user of [null, { id: 'unconfirmed' }]) {
    const { post, calls } = route({ user });
    assert.equal((await post(request())).status, 401); assert.equal(calls.length, 0);
  }
});
test('binds owner to session rather than client fields', async () => {
  const { post, calls } = route();
  const response = await post(request({ vendorId, evidence, userId: 'attacker', status: 'approved' }));
  assert.equal(response.status, 200);
  assert.deepEqual(JSON.parse(JSON.stringify(calls)), [['request_vendor_claim',
    { p_vendor_id: vendorId, p_user_id: 'trusted-session-id', p_evidence: evidence }]]);
});
test('rejects oversized evidence without database writes', async () => {
  const { post, calls } = route();
  assert.equal((await post(request({ vendorId, evidence: 'x'.repeat(13000) }))).status, 400);
  assert.equal(calls.length, 0);
});
test('reports conflicts and hides unexpected database details', async () => {
  const conflict = route({ result: { data: null, error: { code: 'P0001', message: 'Already managed.' } } });
  assert.equal((await conflict.post(request())).status, 409);
  const unavailable = route({ result: { data: null, error: { code: '42883', message: 'internal schema' } } });
  const response = await unavailable.post(request());
  assert.equal(response.status, 503); assert.ok(!(await response.text()).includes('internal schema'));
});
