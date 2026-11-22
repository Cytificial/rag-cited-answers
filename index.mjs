import fs from 'fs';

const root = new URL('./', import.meta.url);
const docs = JSON.parse(fs.readFileSync(new URL('data/docs.json', root), 'utf8'));
const evals = JSON.parse(fs.readFileSync(new URL('data/evals.json', root), 'utf8'));

const STOP = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'for', 'with', 'of', 'and', 'or', 'is', 'are', 'to', 'near', 'under', 'over', 'sq', 'ft']);
function tokens(s) { return (s.toLowerCase().match(/[a-z0-9]+/g) || []).filter(t => !STOP.has(t)); }
function termFreq(ts) { const m = new Map(); for (const t of ts) m.set(t, (m.get(t) || 0) + 1); return m; }

const N = docs.length;
const DF = new Map();
for (const d of docs) for (const t of new Set(tokens(d.text))) DF.set(t, (DF.get(t) || 0) + 1);
function idf(t) { return Math.log(1 + N / (1 + (DF.get(t) || 0))); }
function vec(text) {
  const out = new Map();
  for (const [t, c] of termFreq(tokens(text))) out.set(t, (1 + Math.log(c)) * idf(t));
  return out;
}
function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (const x of a.values()) na += x * x;
  for (const x of b.values()) nb += x * x;
  for (const [k, x] of a) dot += x * (b.get(k) || 0);
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}
function retrieve(query, k = 3) {
  const q = vec(query);
  return docs.map(d => ({ doc: d, score: cosine(q, vec(d.text)) }))
    .sort((a, b) => b.score - a.score).slice(0, k);
}
function answer(query) {
  const hits = retrieve(query);
  const top = hits[0].doc;
  const q = new Set(tokens(query));
  const sentences = top.text.split(/(?<=[.!?])\s+/);
  const best = sentences.sort((a, b) =>
    tokens(b).filter(t => q.has(t)).length - tokens(a).filter(t => q.has(t)).length)[0] || sentences[0];
  return {
    answer: `${best} ${hits.map(h => `[${h.doc.id}]`).join(' ')}`.trim(),
    sources: hits.map(h => ({ id: h.doc.id, title: h.doc.title, score: Number(h.score.toFixed(3)) }))
  };
}
function evaluate() {
  let pass = 0;
  for (const e of evals) {
    const got = answer(e.question).sources.map(s => s.id);
    const ok = e.expected.some(id => got.includes(id));
    if (ok) pass++;
    console.log(`${ok ? 'PASS' : 'FAIL'} | ${e.question} | expected ${e.expected.join(',')} | got ${got.join(',')}`);
  }
  console.log(`\nCitation recall: ${pass}/${evals.length}`);
}

const arg = process.argv.slice(2).join(' ');
if (arg === 'eval') evaluate();
else console.log(JSON.stringify(answer(arg || 'apartment in Dubai Marina'), null, 2));
