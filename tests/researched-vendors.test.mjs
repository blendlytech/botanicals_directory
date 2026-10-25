import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { researchedVendors, withResearch, researchForListing } from '../apps/web/src/lib/researched-vendors.ts';
const require = createRequire(import.meta.url);
const ts = require(process.env.RPV_TYPESCRIPT_PATH || 'typescript');
const compile = path => {
  const source = fs.readFileSync(new URL('../' + path, import.meta.url), 'utf8');
  const result = ts.transpileModule(source, { reportDiagnostics: true, compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX
  } });
  assert.equal((result.diagnostics || []).filter(d => d.category === ts.DiagnosticCategory.Error).length, 0, path);
  return result.outputText;
};
test('six distinct profiles link only HTTPS official sources', () => {
  assert.equal(researchedVendors.length, 6);
  assert.equal(new Set(researchedVendors.map(p => p.slug)).size, 6);
  for (const p of researchedVendors) {
    assert.equal(new URL(p.website).protocol, 'https:');
    assert.ok(p.sources.length >= 2);
    for (const s of p.sources) {
      assert.equal(new URL(s.url).protocol, 'https:');
      assert.equal(new URL(s.url).hostname, new URL(p.website).hostname);
    }
  }
});
test('research corrects discovery information without mutating ownership or billing', () => {
  const before = { slug: 'canopy-plant-co', name: 'Canopy', location_city: 'New Orleans', location_state: 'LA',
    user_id: 'existing-owner', account_tier: 'elite', is_verified: true, logo_url: 'unapproved-photo' };
  const after = withResearch(before);
  assert.equal(after.location_city, 'Apopka');
  assert.equal(after.location_state, 'FL');
  assert.equal(after.user_id, before.user_id);
  assert.equal(after.account_tier, before.account_tier);
  assert.equal(after.is_verified, false);
  assert.equal(after.logo_url, null);
  assert.equal(before.location_city, 'New Orleans');
  assert.equal(before.is_verified, true);
});
test('reviewed owner content and unrelated listings retain precedence', () => {
  const claimed = { slug: 'canopy-plant-co', ownership_verified_at: '2026-10-25', name: 'Owner updated name' };
  assert.equal(withResearch(claimed), claimed);
  assert.equal(researchForListing(claimed), undefined);
  const unrelated = { slug: 'another-nursery' };
  assert.equal(withResearch(unrelated), unrelated);
});
const jsx = (type, props) => typeof type === 'function' ? type(props) : { type, props };
const dependencies = {
  'react/jsx-runtime': { jsx, jsxs: jsx },
  'next/link': { default: 'a' },
  './ResearchedVendorProfile.module.css': { default: new Proxy({}, { get: (_, key) => String(key) }) },
};
const moduleExports = {};
vm.runInNewContext(compile('apps/web/src/components/ResearchedVendorProfile.tsx'), {
  exports: moduleExports, URL, require: name => { assert.ok(dependencies[name], name); return dependencies[name]; }
});
const component = moduleExports.default;
test('all profiles render official shop, sources and free claim without fabricated stock or badges', () => {
  for (const p of researchedVendors) {
    const tree = component({ profile: p, managed: false });
    const serialized = JSON.stringify(tree);
    assert.ok(serialized.includes(p.website));
    assert.ok(serialized.includes('/claim/' + p.slug));
    assert.ok(serialized.includes('Independent directory listing'));
    assert.ok(serialized.includes('does not imply a paid membership'));
    assert.ok(!/Identity Verified|Elite Member|5000|No Inventory Listed|Genetic Historian/.test(serialized));
  }
});
test('associated accounts get management rather than a takeover CTA', () => {
  const serialized = JSON.stringify(component({ profile: researchedVendors[0], managed: true }));
  assert.ok(serialized.includes('/dashboard/settings'));
  assert.ok(!serialized.includes('/claim/'));
});
test('changed route and discovery pages transpile without syntax errors', () => {
  for (const path of ['apps/web/src/app/page.tsx', 'apps/web/src/app/vendors/page.tsx', 'apps/web/src/app/vendors/[slug]/page.tsx']) compile(path);
});
