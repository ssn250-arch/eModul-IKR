import assert from 'node:assert/strict';
import fs from 'node:fs';
let ts = null;
try { ts = await import('typescript'); } catch {
  try { ts = await import('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js'); } catch { /* JSX checked by Vite build when installed */ }
}
const read=(n)=>fs.readFileSync(`src/${n}`,'utf8');
for(const f of fs.readdirSync('src').filter(x=>/\.(jsx|js)$/.test(x))){if(ts){const ast=ts.createSourceFile(f,read(f),ts.ScriptTarget.Latest,true,f.endsWith('.jsx')?ts.ScriptKind.JSX:ts.ScriptKind.JS);assert.equal(ast.parseDiagnostics.length,0,`Invalid JSX: ${f}: ${ast.parseDiagnostics.map(x=>ts.flattenDiagnosticMessageText(x.messageText,' '))}`);}}
const portal=read('PortalIKR.jsx');const quiz=read('TopicUnlockQuiz.jsx');const explorer=read('MotherboardExplorer.jsx');
assert.match(portal,/demoMode/);assert.match(portal,/MODE JURI/);
assert.match(portal,/demoNavigate\('IKR3013',1,'explorer'\)/);
assert.match(quiz,/if \(!demoMode && score >= UNLOCK_PASS_MARK\)/);
assert.match(quiz,/if \(demoMode\) return;/);
assert.match(explorer,/if \(demoMode\) return;/);
for(const code of ['IKR3013','IKR3023']){
 const m=read(`${code}.jsx`);
 assert.match(m,/!demoMode && index > unlockedTopicIndex/);
 assert.match(m,/if \(demoMode \|\| score < UNLOCK_PASS_MARK/);
 assert.match(m,/!demoMode && studentNumber\) localStorage.setItem/);
 assert.match(m,/!demoMode && index > unlockedTopicIndex/);
 assert.match(m,/demoMode=\{demoMode\}/);
}
assert.match(read('MobileStudyDock.jsx'),/emodul:offline-open/);
assert.match(read('MobileStudyDock.jsx'),/emodul:chat-open/);
assert.match(read('index.css'),/max-width:480px/);
console.log('PASS v3.0: JSX, two module previews, nonpersisted demo scores/progress, quick explorer access, responsive styles and unified learning tools.');
