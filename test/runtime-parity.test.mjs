import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {ApprovalLedger} from '../src/core/approval-ledger.mjs';
import {JobLedger} from '../src/executive/job-ledger.mjs';
import {assessConsensus} from '../src/consensus/fabric.mjs';
import {deriveFunctionalState} from '../src/telemetry/functional-state.mjs';
import {authorizeEgress} from '../src/security/egress.mjs';
import {exposeTools,publicServerDescriptor} from '../src/mcp/exposure.mjs';

test('critical approval is exact-bound and one-shot',()=>{
  const digest='a'.repeat(64),ledger=new ApprovalLedger();
  const pending=ledger.request({id:'r1',operationDigest:digest,now:1000,ttlMs:10000});assert.equal(pending.state,'pending');
  const granted=ledger.grant({id:'r1',operationDigest:digest,actorId:'paired-device',proof:'ok',now:2000,verifyProof:(statement,proof)=>statement.operationDigest===digest&&proof==='ok'});assert.equal(granted.state,'granted');
  assert.throws(()=>ledger.consume({id:'r1',operationDigest:'b'.repeat(64),now:3000}));
  assert.equal(ledger.consume({id:'r1',operationDigest:digest,now:3000}).state,'consumed');assert.throws(()=>ledger.consume({id:'r1',operationDigest:digest,now:4000}));
});

test('jobs expose ready nodes and reject stale revisions',()=>{
  const jobs=new JobLedger();let job=jobs.submit({id:'j1',nodes:[{id:'inspect'},{id:'change',dependsOn:['inspect']}]});
  assert.deepEqual(jobs.ready('j1'),['inspect']);job=jobs.startNode({id:'j1',nodeId:'inspect',expectedRevision:job.revision});
  assert.throws(()=>jobs.finishNode({id:'j1',nodeId:'inspect',resultDigest:'x',expectedRevision:1}));
  job=jobs.finishNode({id:'j1',nodeId:'inspect',resultDigest:'x',expectedRevision:job.revision});assert.deepEqual(jobs.ready('j1'),['change']);
});

test('consensus requires evidence and reviewer-family diversity',()=>{
  const weak=assessConsensus({reviews:[{id:'a',family:'same',verdict:'accept',confidence:.9,evidence:['e1']},{id:'b',family:'same',verdict:'accept',confidence:.8,evidence:['e2']}]});assert.equal(weak.state,'inconclusive');
  const strong=assessConsensus({reviews:[{id:'a',family:'local',verdict:'accept',confidence:.9,evidence:['e1']},{id:'b',family:'remote',verdict:'accept',confidence:.8,evidence:['e2']}]});assert.equal(strong.state,'verified');assert.equal(strong.verdict,'accept');
});

test('telemetry can change functional pacing but not authority or truth',()=>{
  const state=deriveFunctionalState({cpuPercent:96,ramPercent:80,gpuPercent:40,temperatureC:85,taskProgress:50});assert.equal(state.functional.pace,'degraded');assert.equal(state.authorityChanged,false);assert.equal(state.truthChanged,false);
});

test('egress requires both policy and exact token when configured',()=>{
  const req={url:'https://example.test/v1',method:'POST',payloadDigest:'abc',privateData:false};assert.equal(authorizeEgress(req,{policy:{allow:false}}).allowed,false);
  const policy={allow:true,hosts:['example.test'],methods:['POST'],requireToken:true},token={host:'example.test',method:'POST',payloadDigest:'abc',used:false,expiresAt:new Date(Date.now()+60000).toISOString()};
  assert.equal(authorizeEgress(req,{policy,token}).allowed,true);assert.equal(authorizeEgress({...req,payloadDigest:'changed'},{policy,token}).allowed,false);
});

test('MCP public descriptor exposes keys and policy, not secret values',()=>{
  const tools=exposeTools({tools:[{name:'read',capability:'fs.read',description:'read',inputSchema:{type:'object'}},{name:'shell',capability:'shell',description:'shell'}],allowedCapabilities:['fs.read']});assert.deepEqual(tools.map(x=>x.name),['read']);
  const d=publicServerDescriptor({id:'demo',transport:'http',env:{TOKEN:'secret'},headers:{Authorization:'secret'},toolPolicy:{allow:['read'],deny:['shell']}});assert.deepEqual(d.envKeys,['TOKEN']);assert.deepEqual(d.headerKeys,['Authorization']);assert.equal(JSON.stringify(d).includes('secret'),false);
});

test('public manifest records operational snapshot without claiming full implementation',async()=>{
  const manifest=JSON.parse(await readFile(new URL('../public-manifest.json',import.meta.url),'utf8'));assert.equal(manifest.operationalSnapshot.totalRepresented,793);assert.equal(manifest.operationalSnapshot.covered,93);assert.equal(manifest.operationalSnapshot.partial,548);assert.equal(manifest.operationalSnapshot.blockedExternal,19);
});
