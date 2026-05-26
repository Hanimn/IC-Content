# F14 — The One-Way Door
## Encryption is a door with a key. Hashing is a door with no door.

| | |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~20 min challenge |
| **Prerequisites** | [F05 — Number Systems](../F05-number-systems/README.md), [F06 — Thinking in Hex](../F06-thinking-in-hex/README.md), [F08 — ASCII and Encoding](../F08-ascii-and-encoding/README.md) |
| **Tools** | Modern web browser (Chrome 100+, Firefox 100+, Safari 14+) |

---

## What You'll Learn

- Understand the difference between encryption (reversible) and hashing (one-way)
- Recognize the avalanche effect — how tiny input changes produce totally different hashes
- Read a hash as a "fingerprint" of data, not a "lock" on data
- Use file checksums to verify a download wasn't tampered with
- Explain why MD5 and SHA-256 each have their place in modern systems

---

## Files in This Module

```
F14-one-way-door/
├── README.md          ← you are here
├── lesson.md          ← read this first
├── concept-cards.md   ← quick-reference for later
└── challenge/
    ├── index.html     ← the challenge (open in browser)
    ├── hint-1.md      ← read after 10 min of trying
    ├── hint-2.md      ← read after 20 min of trying
    └── solution.md    ← read after you've found the flag (or given up)
```

---

## Quick Start

1. Read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet
2. Open `lesson.md` and read it top to bottom
3. Open `challenge/index.html` in your browser (Chrome / Firefox / Safari, recent version)
4. Find the flag — it looks like `FLAG{...}`

**Stuck?** Wait 10 minutes before opening hints. Struggling is part of learning.

---

## Why This Module Matters

Every cipher you've learned so far has been reversible: Caesar (F09), XOR (F10). Apply the same key the right way and the message comes back. Hashing is different — it's the first cryptographic primitive you'll meet that has **no reverse function at all**. You can hash a thing. You can never un-hash it.

That sounds useless until you realize the question isn't "what was the original?" — it's "is this exactly the same thing I expected?" Software publishers post hashes next to downloads so you can verify nobody tampered with the file in transit. Git stores a hash of every commit so it can detect a single byte changed. Your password manager stores hashes, not passwords. The entire blockchain is hashes pointing at hashes.

Hashing isn't a lock. It's a fingerprint.

**This module unlocks:**
- Cryptography track — file integrity, hash recognition, modern crypto primitives
- Forensics track — verifying evidence wasn't modified, file fingerprinting
- Phase 2 modules where hashing appears alongside other primitives

---

[← F13 — Three Languages, One Page](../F13-three-languages/README.md) | [Back to Foundation](../README.md) | [F15 — The Picture That Knew Too Much →](../F15-picture-knew-too-much/README.md)
