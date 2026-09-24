import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, appendFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { EventLog } from '../src/core/event-log.mjs';
import { CapabilityRegistry } from '../src/core/capabilities.mjs';
import { authorize } from '../src/core/policy.mjs';
import { routeIntent } from '../src/core/router.mjs';
import { selectTools } from '../src/core/tool-broker.mjs';
import { MemoryStore } from '../src/memory/store.mjs';
import { LearningFederation } from '../src/learning/federation.mjs';
import { NodeRegistry } from '../src/nodes/registry.mjs';
import { validatePluginManifest } from '../src/plugins/manifest.mjs';
import { routeInbound } from '../src/gateway/router.mjs';
import { ConversationLoop } from '../src/voice/conversation-loop.mjs';
import { demoTools } from '../examples/tools.mjs';

test('event log keeps a verified contiguous prefix', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'solaris-public-'));
  const path = join(dir, 'events.jsonl');
  try {
    const log = new EventLog(path);
    await log.append('session.started', { id: 'demo' });
    await log.append('user.message', { text: 'hello' });
    await appendFile(path, '{broken tail');
    const events = await log.read();
    assert.equal(events.length, 2);
  } finally { await rm(dir, { recursive: true, force: true }); }
});

test('capabilities are provider neutral', () => {
  const r = new CapabilityRegistry();
  r.register({ id: 'local', trust: 'local', capabilities: ['model.text.generate'] });
  assert.equal(r.providersFor('model.text.generate', { trust: 'local' }).length, 1);
});

test('approval is exact and not reusable for another payload', () => {
  const base = { capability: 'publish', target: 'site', payloadDigest: 'abc', externalEffects: true };
  const approval = { capability: 'publish', target: 'site', payloadDigest: 'abc', used: false, expiresAt: new Date(Date.now() + 60000).toISOString() };
  assert.equal(authorize(base, { approval }).allowed, true);
  assert.equal(authorize({ ...base, payloadDigest: 'changed' }, { approval }).allowed, false);
});

test('tool broker exposes a small intent-specific subset', () => {
  const intent = routeIntent('build a web app and test it');
  const tools = selectTools({ intent, tools: demoTools });
  assert.equal(intent, 'engineering');
  assert.deepEqual(tools.map(x => x.name), ['read_file', 'find_files', 'run_code', 'run_tests']);
});

test('memory learning advances only one state with evidence', () => {
  const m = new MemoryStore();
  m.propose({ id: 'k1', content: 'A synthetic fact', source: 'demo' });
  assert.throws(() => m.advance('k1', 'verified', 'too far'));
  assert.equal(m.advance('k1', 'validated', 'checked').state, 'validated');
});

test('external teacher output remains candidate', async () => {
  const f = new LearningFederation();
  f.register({ id: 'teacher', supports: i => i === 'explain', execute: async () => ({ text: 'synthetic explanation' }) });
  const result = await f.ask('explain', { topic: 'events' });
  assert.equal(result.state, 'candidate');
});

test('node pairing does not imply generic command execution', () => {
  const n = new NodeRegistry();
  n.pair({ id: 'phone', capabilities: ['notify'], commandAllowlist: ['notify'] });
  assert.equal(n.can('phone', 'notify'), true);
  assert.equal(n.executeAllowed('phone', 'shell'), false);
});

test('plugin manifest is validated before runtime loading', () => {
  const m = validatePluginManifest({ id: 'demo.plugin', capabilities: ['memory.search'], permissions: ['read'] });
  assert.equal(m.id, 'demo.plugin');
  assert.throws(() => validatePluginManifest({ id: '../bad', capabilities: [] }));
});

test('gateway delivery is deterministic', () => {
  const r = routeInbound({ source: 'chat', account: 'main', peer: 'u1', thread: 't1' }, { 'chat:main:u1:*': { profile: 'default', project: 'demo' } });
  assert.equal(r.profile, 'default');
  assert.equal(r.delivery.thread, 't1');
});

test('voice loop supports barge-in state', () => {
  const v = new ConversationLoop();
  v.start();
  v.speechStarted();
  v.speechEnded();
  v.responseReady();
  v.speechStarted();
  assert.equal(v.state, 'interrupted');
});
