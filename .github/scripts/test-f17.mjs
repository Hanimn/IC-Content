// F17 functional test — verifies the challenge HTML's anti-shortcut
// property and that the puzzle data + chain logic produce the design's
// expected sub-flag pieces and final flag.
//
// Run from repo root:  node .github/scripts/test-f17.mjs
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const CHALLENGE = path.join(ROOT, 'foundation', 'F17-wrapped-in-wrappers', 'challenge', 'index.html');
const html = readFileSync(CHALLENGE, 'utf8');

const FINAL_FLAG = 'FLAG{unwrap_one_layer_at_a_time_meet_entity_first_b64_always_peel_outside}';

let pass = true;
function fail(msg) { console.error('FAIL ' + msg); pass = false; }
function ok(msg)   { console.log('OK   ' + msg); }

// 1. anti-shortcut
if (html.indexOf(FINAL_FLAG) !== -1) fail('literal final flag string found in source HTML');
else ok('literal final flag string is NOT in source');

// 2. parse PUZZLES literal
const puzzleRe = /\{\s*n:\s*(\d+),\s*encoded:\s*'([^']*)',\s*expected:\s*'([^']*)',[\s\S]*?\}/g;
const puzzles = [];
let m;
while ((m = puzzleRe.exec(html)) !== null) {
  puzzles.push({ n: parseInt(m[1], 10), encoded: m[2], expected: m[3] });
}
if (puzzles.length !== 6) {
  fail(`expected 6 puzzles parsed from HTML, got ${puzzles.length}`);
  process.exit(1);
}
ok(`parsed ${puzzles.length} puzzles from HTML`);

// 3. decoders
function urlDecode(input) {
  let out = '';
  let i = 0;
  while (i < input.length) {
    if (input.charAt(i) === '%' && i + 2 < input.length) {
      const hex = input.substr(i + 1, 2);
      if (/^[0-9A-Fa-f]{2}$/.test(hex)) {
        out += String.fromCharCode(parseInt(hex, 16));
        i += 3;
        continue;
      }
    }
    out += input.charAt(i);
    i += 1;
  }
  return out;
}
function base64Decode(input) {
  const s = input.replace(/\s+/g, '');
  if (!/^[A-Za-z0-9+/]*=?=?$/.test(s)) return null;
  if (s.length === 0 || s.length % 4 !== 0) return null;
  try { return Buffer.from(s, 'base64').toString('latin1'); }
  catch (e) { return null; }
}
function hexDecode(input) {
  const s = input.replace(/\s+/g, '');
  if (s.length === 0 || s.length % 2 !== 0) return null;
  if (!/^[0-9A-Fa-f]+$/.test(s)) return null;
  let out = '';
  for (let i = 0; i < s.length; i += 2) {
    out += String.fromCharCode(parseInt(s.substr(i, 2), 16));
  }
  return out;
}
const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function htmlEntityDecode(input) {
  return input.replace(/&(#x[0-9A-Fa-f]+|#\d+|[a-zA-Z]+);/g, (mtch, body) => {
    if (body.charAt(0) === '#') {
      if (body.charAt(1) === 'x' || body.charAt(1) === 'X') {
        return String.fromCharCode(parseInt(body.substr(2), 16));
      }
      return String.fromCharCode(parseInt(body.substr(1), 10));
    }
    if (Object.prototype.hasOwnProperty.call(NAMED, body)) return NAMED[body];
    return mtch;
  });
}

const DECODERS = {
  'URL-decode': urlDecode,
  'Base64-decode': base64Decode,
  'Hex-decode': hexDecode,
  'HTML-entity-decode': htmlEntityDecode,
};

function runChain(encoded, chain) {
  let cur = encoded;
  for (let i = 0; i < chain.length; i++) {
    const r = DECODERS[chain[i]](cur);
    if (r === null) return { ok: false, failedAt: i };
    cur = r;
  }
  return { ok: true, output: cur };
}

// 4. correct chains
const CORRECT = [
  ['URL-decode'],
  ['Base64-decode'],
  ['Hex-decode'],
  ['HTML-entity-decode'],
  ['Base64-decode', 'URL-decode'],
  ['Hex-decode', 'Base64-decode', 'URL-decode'],
];

for (let i = 0; i < puzzles.length; i++) {
  const p = puzzles[i];
  const r = runChain(p.encoded, CORRECT[i]);
  if (r.ok && r.output === p.expected) {
    ok(`P${p.n} correct chain produces ${JSON.stringify(r.output)}`);
  } else {
    fail(`P${p.n} correct chain failed: got=${JSON.stringify(r)} expected=${p.expected}`);
  }
}

// 5. wrong chains
const WRONG = [
  ['Base64-decode'],
  ['Hex-decode'],
  ['URL-decode'],
  ['URL-decode'],
  ['URL-decode', 'Base64-decode'],
  ['URL-decode', 'Hex-decode', 'Base64-decode'],
];

for (let i = 0; i < puzzles.length; i++) {
  const p = puzzles[i];
  const r = runChain(p.encoded, WRONG[i]);
  if (r.ok && r.output === p.expected) {
    fail(`P${p.n} WRONG chain accidentally produced correct sub-flag (anti-shortcut broken)`);
  } else {
    const summary = r.ok ? `output=${JSON.stringify(r.output).slice(0, 40)}` : `rejected at step ${r.failedAt + 1}`;
    ok(`P${p.n} wrong chain rejected (${summary})`);
  }
}

// 6. final flag derivation
const builtFlag = 'FLAG{' + puzzles.map(p => p.expected).join('_') + '}';
if (builtFlag === FINAL_FLAG) ok(`built flag matches design: ${builtFlag}`);
else fail(`built flag mismatch: got ${builtFlag} expected ${FINAL_FLAG}`);

if (!pass) process.exit(1);
console.log('\nALL TESTS PASSED');
