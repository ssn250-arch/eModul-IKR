import assert from 'node:assert/strict';
import handler from '../netlify/functions/chat.mjs';

const post = (question, extra = {}, origin = 'https://ssn250-arch.github.io') => new Request('https://test.netlify.app/.netlify/functions/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Origin: origin },
  body: JSON.stringify({ moduleCode: 'IKR3013', question, context: 'CPU memproses arahan komputer.', history: [], ...extra })
});

let ran = 0;
const key = process.env.OPENAI_API_KEY;
const originalFetch = globalThis.fetch;
try {
  delete process.env.OPENAI_API_KEY;
  let res = await handler(post('Apakah CPU?'));
  assert.equal(res.status, 503, 'Should make missing configuration explicit'); ran++;

  res = await handler(post('Apakah CPU?', {}, 'https://example-spam.site'));
  assert.equal(res.status, 403, 'Should reject unexpected CORS origins'); ran++;

  process.env.OPENAI_API_KEY = 'fake-secret-only-test';
  let requested;
  globalThis.fetch = async (url, opts) => {
    assert.equal(url, 'https://api.openai.com/v1/responses');
    requested = JSON.parse(opts.body);
    return new Response(JSON.stringify({ output: [{ type: 'message', content: [{ type: 'output_text', text: 'CPU memproses arahan.', annotations: [] }] }] }), {status: 200, headers: {'Content-Type': 'application/json'}});
  };
  res = await handler(post('Apakah fungsi CPU?'));
  assert.equal(res.status, 200);
  assert.equal((await res.json()).answer, 'CPU memproses arahan.');
  assert.equal(requested.tools, undefined, 'General answer should not force paid web search'); ran++;

  globalThis.fetch = async (_url, opts) => {
    requested = JSON.parse(opts.body);
    return new Response(JSON.stringify({ output: [{ type: 'message', content: [{ type: 'output_text', text: 'Piawaian ini dikemas kini.', annotations: [{ type: 'url_citation', url: 'https://example.org/piawaian', title: 'Piawaian rasmi' }] }] }] }), {status: 200, headers: {'Content-Type': 'application/json'}});
  };
  res = await handler(post('Apakah piawaian PCIe terkini 2026?'));
  const data = await res.json();
  assert.equal(data.webChecked, true);
  assert.equal(requested.tools[0].type, 'web_search_preview');
  assert.equal(data.sources[0].title, 'Piawaian rasmi'); ran++;

  res = await handler(post('Hi', {moduleCode:'BAD'}));
  assert.equal(res.status, 400); ran++;
  console.log(`LULUS: ${ran} ujian backend chatbot (konfigurasi, CORS, AI, web citation, validation).`);
} finally {
  globalThis.fetch = originalFetch;
  if (key) process.env.OPENAI_API_KEY = key;
  else delete process.env.OPENAI_API_KEY;
}
