import test from 'node:test';
import assert from 'node:assert/strict';
import { parseClaimInput, safeReturnPath } from '../apps/web/src/lib/claim-policy.ts';

const vendorId = '12345678-1234-1234-1234-123456789abc';
test('claim accepts and trims meaningful ownership evidence', () => {
  assert.deepEqual(parseClaimInput({ vendorId, evidence: '  I manage the business at example.com.  ' }),
    { vendorId, evidence: 'I manage the business at example.com.' });
});
test('untrusted claim body shapes and malformed IDs fail', () => {
  for (const value of [null, [], 'hello', {}, { vendorId: '../other', evidence: 'I manage this business and its website.' }])
    assert.throws(() => parseClaimInput(value));
});
test('claim evidence bounds apply after trimming', () => {
  for (const evidence of ['', ' '.repeat(30), 'x'.repeat(19), 'x'.repeat(2001), 12])
    assert.throws(() => parseClaimInput({ vendorId, evidence }));
  assert.equal(parseClaimInput({ vendorId, evidence: 'x'.repeat(20) }).evidence.length, 20);
  assert.equal(parseClaimInput({ vendorId, evidence: 'x'.repeat(2000) }).evidence.length, 2000);
});
test('client-supplied owner and approval fields are not accepted into the parsed payload', () => {
  assert.deepEqual(Object.keys(parseClaimInput({ vendorId, evidence: 'I manage this business and website.', userId: 'attacker', status: 'approved' })).sort(),
    ['evidence', 'vendorId']);
});
test('auth callback keeps legitimate internal destinations', () => {
  assert.equal(safeReturnPath('/claim/rare-grower'), '/claim/rare-grower');
  assert.equal(safeReturnPath('/login/reset-password?source=email'), '/login/reset-password?source=email');
  assert.equal(safeReturnPath('/dashboard#profile'), '/dashboard#profile');
});
test('auth callback rejects external and ambiguous destinations', () => {
  for (const value of [null, '', 'https://evil.example', '//evil.example', '/\\\\evil.example', '/\n/evil.example', 'javascript:alert(1)'])
    assert.equal(safeReturnPath(value), '/dashboard');
});
