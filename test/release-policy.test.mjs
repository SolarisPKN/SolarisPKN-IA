import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluatePublication, evaluatePublicationSet, publicationEntry } from '../src/security/publication-gate.mjs';
import { selectContext } from '../src/memory/context-budget.mjs';
import { checkMaintenanceWindow } from '../src/security/maintenance-window.mjs';

const digest = 'a'.repeat(64);
const original = () => ({ ...publicationEntry('src/security/example.mjs', digest, 'Reviewed original implementation with public-only data'), reviewed: true });

test('new publication declarations are never preapproved', () => {
  const draft = publicationEntry('src/security/example.mjs', digest, 'Original sample requires an explicit reviewer');
  assert.equal(draft.reviewed, false);
  assert.equal(evaluatePublication(draft).allowed, false);
});

test('publication gate allows an attested original public implementation', () => {
  assert.deepEqual(evaluatePublication(original()), { allowed: true, reasons: [] });
});

test('publication gate requires proof and rejects private or third-party code', () => {
  const cases = [
    { authorship: 'unknown' }, { authorship: 'third-party' },
    { dataClass: 'personal' }, { dataClass: 'secret' },
    { copiedThirdPartySource: true }, { containsCredentials: true },
    { hasPersonalization: true }, { requiresPrivateRuntime: true },
    { thirdPartyAssets: true }, { reviewed: false },
    { reviewEvidence: 'short' }, { sha256: 'not-a-digest' },
    { license: 'unverified' }, { kind: 'binary' },
    { path: '../vault/user.json' }, { path: 'C:/Users/user/file.mjs' },
    { path: '.env' }, { path: 'src/../../private/file.mjs' },
    { path: 'src/file' + String.fromCharCode(0) + '.mjs' }
  ];
  for (const attributes of cases) {
    const result = evaluatePublication({ ...original(), ...attributes });
    assert.equal(result.allowed, false, JSON.stringify(attributes));
    assert.ok(result.reasons.length);
  }
});

test('publication manifest prevents duplicate destinations', () => {
  const repeated = original();
  assert.equal(evaluatePublicationSet([repeated, { ...repeated, path: repeated.path.toUpperCase() }]).allowed, false);
  assert.equal(evaluatePublicationSet([]).allowed, false);
  assert.equal(evaluatePublicationSet([original()]).allowed, true);
});

test('GitHub workflow YAML can be attested, other hidden paths cannot', () => {
  assert.equal(evaluatePublication({ ...original(), path: '.github/workflows/ci.yml' }).allowed, true);
  assert.equal(evaluatePublication({ ...original(), path: '.ssh/config.md' }).allowed, false);
});

test('context planner is deterministic, enforces classification and priority', () => {
  const items = [
    { id: 'a', text: 'one', dataClass: 'public', priority: 1 },
    { id: 'b', text: 'two', dataClass: 'public', priority: 4 },
    { id: 'secret', text: 'hidden', dataClass: 'personal', priority: 99 },
    { id: 'b', text: 'duplicate', dataClass: 'public', priority: 3 },
    { id: 'c', text: 'much larger content', dataClass: 'public', priority: 2 }
  ];
  const result = selectContext({ items, maxChars: 6, maxItems: 2 });
  assert.deepEqual(result.selected.map(x => x.id), ['b', 'a']);
  assert.equal(result.remainingChars, 0);
  assert.ok(result.rejected.some(x => x.id === 'secret' && x.reason === 'data-boundary'));
  assert.ok(result.rejected.some(x => x.id === 'b' && x.reason === 'duplicate-id'));
  assert.deepEqual(items[0], { id: 'a', text: 'one', dataClass: 'public', priority: 1 });
});

test('context planner rejects invalid budgets and unknown classification by default', () => {
  assert.throws(() => selectContext({ maxChars: -1 }), RangeError);
  assert.throws(() => selectContext({ maxItems: 1.3 }), RangeError);
  assert.deepEqual(selectContext({ items: [{ id: 'x', text: 'sample' }] }).selected, []);
  assert.deepEqual(selectContext({ maxChars: 0, items: [{ id: 'x', text: 'a', dataClass: 'public' }] }).selected, []);
});

test('maintenance window requires owner authorization, exact operation and expiry', () => {
  const now = Date.parse('2026-01-02T00:20:00Z');
  const lease = {
    authorized: true, issuedAt: '2026-01-02T00:00:00Z', expiresAt: '2026-01-02T01:00:00Z',
    scope: 'project', operationDigest: digest, destructiveApproved: false
  };
  const action = { scope: 'project', digest, destructive: false };
  assert.equal(checkMaintenanceWindow(lease, action, { now }).allowed, true);
  assert.equal(checkMaintenanceWindow({ ...lease, authorized: false }, action, { now }).allowed, false);
  assert.equal(checkMaintenanceWindow(lease, { ...action, digest: 'b'.repeat(64) }, { now }).allowed, false);
  assert.equal(checkMaintenanceWindow(lease, action, { now: Date.parse(lease.expiresAt) }).allowed, false);
  assert.equal(checkMaintenanceWindow(lease, { ...action, kind: 'admin' }, { now }).allowed, false);
  assert.equal(checkMaintenanceWindow(lease, { ...action, destructive: true }, { now }).allowed, false);
  assert.equal(checkMaintenanceWindow(lease, { ...action, requiresCredential: true }, { now }).allowed, false);
  assert.equal(checkMaintenanceWindow({ ...lease, expiresAt: '2026-01-04T01:00:00Z' }, action, { now }).allowed, false);
});

test('maintenance policy has no system actions and fails closed for absent lease', () => {
  const result = checkMaintenanceWindow(null, { scope: 'host', digest }, { now: 1000 });
  assert.equal(result.allowed, false);
  assert.ok(result.reasons.includes('no-owner-authorization'));
});
