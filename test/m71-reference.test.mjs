import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {selectRouter} from '../src/providers/router-profile.mjs';
import {MarkdownMind,wikilinks,suggestConnection} from '../src/mind/markdown-mind.mjs';
import {affectState,applyAffect} from '../src/cognitive/affect.mjs';
import {reflect} from '../src/cognitive/dream.mjs';
import {avatarState} from '../src/embodiment/avatar-state.mjs';

test('router profile fails closed for incompatible private context',()=>{
 const out=selectRouter({profile:'balanced',privacy:'PRIVATE',profiles:{balanced:['r']},bridges:[{id:'r',enabled:true,healthy:true,endpoint:'http://127.0.0.1:1',privacyModes:['PUBLIC_ONLY']}]});
 assert.equal(out.selected,null);
});
test('dual mind keeps owner read-only and assistant writes date-sharded Markdown',async()=>{
 const root=await mkdtemp(join(tmpdir(),'solaris-public-mind-'));
 try{
  const owner=new MarkdownMind({root:join(root,'owner'),writable:false});
  await assert.rejects(owner.write({slug:'x',text:'no'}),/read-only/);
  const assistant=new MarkdownMind({root:join(root,'assistant'),writable:true});
  const rel=await assistant.write({slug:'reflection',text:'See [[Evidence Board]]',at:new Date('2026-09-24T00:00:00Z')});
  assert.equal(rel,'2026/09/24/reflection.md');
  assert.deepEqual(wikilinks(await assistant.read(rel)),['Evidence Board']);
 }finally{await rm(root,{recursive:true,force:true});}
});
test('cross-mind connection is explicitly a suggestion',()=>assert.equal(suggestConnection('alpha beta gamma project','beta gamma other').status,'suggestion-not-fact'));
test('functional affect never changes truth or authority',()=>{const x=applyAffect(affectState(),'failure');assert.equal(x.authorityChanged,false);assert.equal(x.truthChanged,false);});
test('dream creates a candidate rather than durable truth',()=>assert.equal(reflect({recentEvents:['test passed']}).durablePromotion,false));
test('avatar state is presentation-only',()=>{const x=avatarState({affect:{curiosity:90}});assert.equal(x.presentationOnly,true);assert.equal(x.cameraAuthority,false);assert.equal(x.inputInjectionAuthority,false);});
