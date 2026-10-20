import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { spawnSync } from 'node:child_process';
import { importProgressBackup } from '../src/offlineSupport.js';

const project = process.cwd();
const m3013 = fs.readFileSync('src/IKR3013.jsx','utf8');
const m3023 = fs.readFileSync('src/IKR3023.jsx','utf8');
const app = fs.readFileSync('src/App.jsx','utf8');
const workerScript = fs.readFileSync('scripts/generate-sw.mjs','utf8');
assert.match(app, /<OfflineLearning\s*\/>/);
assert.match(workerScript, /cache\.addAll\(FILES\)/);
assert.match(workerScript, /LEGACY_PREFIX/);
assert.match(m3013, /<OfflineEmbed/);
assert.match(m3023, /<OfflineEmbed/);
assert.doesNotMatch(m3013 + m3023, /<iframe/);
assert.match(m3013, /openOnlineResource\('https:\/\/pcnexus\.netlify\.app\/', language\)/);
assert.match(m3023, /href="https:\/\/cablelab2026\.netlify\.app\/index\.html"/);
assert.match(m3023, /href="https:\/\/cablelabx\.netlify\.app\/"/);
assert.match(m3023, /disabled=\{!demoMode && unlockedTopicIndex < topics\.length\}/);

const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'emodul-offline-test-'));
try {
  fs.mkdirSync(path.join(temp,'dist','assets'),{recursive:true});
  fs.writeFileSync(path.join(temp,'dist','index.html'),'<html>offline test</html>');
  fs.writeFileSync(path.join(temp,'dist','assets','module3013.js'),'console.log("IKR3013")');
  fs.writeFileSync(path.join(temp,'dist','assets','module3023.js'),'console.log("IKR3023")');
  fs.writeFileSync(path.join(temp,'dist','manifest.webmanifest'),'{}');
  const gen = spawnSync(process.execPath,[path.join(project,'scripts','generate-sw.mjs')],{cwd:temp,encoding:'utf8'});
  assert.equal(gen.status,0,gen.stderr);
  const generated = fs.readFileSync(path.join(temp,'dist','sw.js'),'utf8');
  const syntax = spawnSync(process.execPath,['--check',path.join(temp,'dist','sw.js')],{encoding:'utf8'});
  assert.equal(syntax.status,0,syntax.stderr);
  assert.match(generated,/module3013\.js/);
  assert.match(generated,/module3023\.js/);
  assert.match(generated,/OFFLINE_PREPARE/);
  assert.match(generated,/OFFLINE_STATUS/);
  assert.match(generated,/url\.origin === self\.location\.origin/);

  const callbacks = {};
  const store = new Map();
  const cache = {
    addAll: async files => {for(const file of files) store.set('https://example.org'+file, {status:200,ok:true});},
    keys: async () => [...store.keys()].map(url=>({url})),
    put: async (req, resp) => {store.set(req.url,resp);},
  };
  const caches = {
    open: async () => cache,
    keys: async () => ['emodul-ikr-newic-old', 'emodul-ikr-offline-v2-old'],
    delete: async () => true,
    match: async request => store.get(typeof request==='string'?'https://example.org'+request:request.url),
  };
  const self = {
    location:{origin:'https://example.org'},
    clients:{claim:async()=>{}},
    skipWaiting:async()=>{},
    addEventListener:(type,cb)=>{callbacks[type]=cb;},
  };
  vm.runInNewContext(generated,{self,caches, URL, Response, AbortController, setTimeout, clearTimeout, fetch:async()=>({ok:true,type:'basic',clone(){return this;}})});
  assert.equal(typeof callbacks.install,'function');
  assert.equal(typeof callbacks.fetch,'function');
  let promise;
  callbacks.install({waitUntil:p=>{promise=p;}});
  await promise;
  assert.equal(store.size,4);
  let reply;
  callbacks.message({data:{type:'OFFLINE_STATUS'},ports:[{postMessage:r=>{reply=r;}}],waitUntil:p=>{promise=p;}});
  await promise;
  assert.equal(reply.ready,true);
  assert.equal(reply.cached,4);
  assert.equal(reply.total,4);
  let intercepted=false;
  callbacks.fetch({request:{method:'GET',url:'https://sketchfab.com/embed/abc',mode:'navigate'},respondWith:()=>{intercepted=true;}});
  assert.equal(intercepted,false,'Third-party external media must remain online-only');
  callbacks.fetch({request:{method:'GET',url:'https://example.org/eModul-IKR/assets/module3013.js',mode:'cors'},respondWith:()=>{intercepted=true;}});
  assert.equal(intercepted,true);
  // Import only explicitly whitelisted learner keys; never touch unrelated storage.
  const local = new Map([['unrelated_private_key', 'keep-me']]);
  globalThis.localStorage = {
    setItem: (key, value) => local.set(key, value),
    getItem: key => local.get(key),
  };
  globalThis.window = { confirm: () => true };
  const valid = {
    type: 'emodul-ikr-progress-backup', version: 1,
    progress: { ikr3013_quiz_unlock_v4_7: '4', emodul_ikr_student_number_v1: '7', emodul_ikr_language_v1: 'ms' },
  };
  const restored = await importProgressBackup({size:1024, text:async()=>JSON.stringify(valid)});
  assert.equal(restored,3);
  assert.equal(local.get('unrelated_private_key'),'keep-me');
  assert.equal(local.get('ikr3013_quiz_unlock_v4_7'),'4');
  const invalid = { ...valid, progress: { ikr3013_quiz_unlock_v4_7: '99' } };
  await assert.rejects(() => importProgressBackup({size:1024,text:async()=>JSON.stringify(invalid)}),/tidak sah/);
  console.log('PASS offline asset-cache tests, progress backup validation, SW syntax and external-resource filtering.');
} finally {
  fs.rmSync(temp,{recursive:true,force:true});
}
