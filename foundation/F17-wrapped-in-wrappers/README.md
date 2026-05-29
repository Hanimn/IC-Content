# F17 — Wrapped in Wrappers

> Base64 inside hex inside URL-encoding — peel the onion.

> **Before you start:** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet. The decoders in this lesson — URL-decode, Base64-decode, hex-decode, HTML-entity-decode — are how every browser, every API client, and every CTF tool reads "wrapped" data. They are also how a forensic analyst peels apart suspicious payloads. Use them on data you own and on the demonstration challenge below. Not on someone else's traffic without permission.

---

## Module Metadata

| Field | Details |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~30 min challenge |
| **Prerequisites** | F06 (hex), F08 (Base64 + ASCII), F09 (Caesar / ROT13 — optional but helpful) |
| **Unlocks** | Web CTFs (every URL is wrapped), Forensics CTFs (every captured payload is wrapped), Crypto CTFs (every chained-encoding warm-up) |
| **Tools** | Web browser (Chrome 100+, Firefox 100+, Safari 14+) — the decoder pipeline is simulated in the page, no install needed |

---

## What You'll Learn

- What "wrapping" data even means — and why a string of 200 jibber-jabber characters is *almost never* random
- **URL-encoding** (`%xx`): the single most common encoding on the modern web — every browser uses it constantly
- **HTML entities** (`&amp;`, `&#x27;`): the same idea wearing a different costume
- How to *recognize* an encoding by its alphabet and shape — five encodings, five distinctive looks
- **The chain rule:** when payloads are wrapped in layers, you decode from the outside in (last wrap on, first wrap off)
- How to assemble a multi-step decoder pipeline and watch a payload peel back to plaintext

---

## Files

```
F17-wrapped-in-wrappers/
├── README.md               ← You are here
├── lesson.md               ← Read this first (~2,100 words)
├── concept-cards.md        ← Recognition cheat sheet + Common Mistakes
└── challenge/
    ├── index.html          ← Decoder Pipeline — six puzzles of escalating depth
    ├── hint-1.md           ← Meta-strategy nudge (try first without!)
    ├── hint-2.md           ← Tactical: which decoders, what order
    └── solution.md         ← Full transcript of solving each puzzle
```

---

## Quick Start

1. Read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet.
2. Read `lesson.md` end-to-end. Don't skip the two **Try It** boxes — they're 60 seconds each.
3. Skim `concept-cards.md` — especially the recognition cheat sheet and the Common Mistakes list.
4. Open `challenge/index.html` in your browser. The challenge runs entirely from `file://` — no server needed. Six pipelines wait for you; only Pipeline 1 is unlocked at the start.
5. Solve all six pipelines to discover the six pieces of the flag, then assemble them.

---

## Why This Module Exists

After F08 you can decode Base64. After F06 you can read hex. But every real CTF challenge layers these — Base64 wrapped around hex wrapped around URL-encoding — and the curriculum never showed you a chained payload, never introduced URL-encoding at all (the most common encoding on the entire internet), and never built the *recognition* skill that lets you look at a string and say "that's hex, not Base64."

CyberChef exists because chained encodings are everywhere. F17 teaches you to think like CyberChef — which encoding is this, what order do I peel, what does each layer reveal — without the GUI. Once you've solved six pipelines by hand, every wrapped payload you meet from now on will fall apart in your head before you finish reading it.

---

[← F16 — The Terminal Is Just A Text Box](../F16-terminal-is-just-a-text-box/README.md) | [Foundation Track](../README.md)
