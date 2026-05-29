# F09 — Shifting Secrets
## Julius Caesar encrypted his battle plans with a shift. Modern computers crack it in milliseconds. Let's learn why.

| | |
|---|---|
| **Difficulty** | Beginner |
| **Time** | ~25 min reading + ~30 min challenge |
| **Prerequisites** | [F05 — Number Systems](../F05-number-systems/README.md), [F08 — ASCII and Encoding](../F08-ascii-and-encoding/README.md) |
| **Tools** | Web browser (Chrome or Firefox) |

---

## What You'll Learn

- Understand how the Caesar cipher works — shift each letter by a fixed number (the key)
- Encode and decode messages using a cipher wheel and a shift value
- Apply frequency analysis to identify the shift without knowing the key
- Recognize ROT13 as a special self-inverse case of Caesar cipher
- Explain why Caesar cipher is trivially broken by brute force or frequency analysis

---

## Files in This Module

```
F09-shifting-secrets/
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
3. Open `challenge/index.html` in your browser
4. Find the flag — it looks like `FLAG{...}`

**Stuck?** Wait 10 minutes before opening hints. Struggling is part of learning.

---

## Why This Module Matters

The Caesar cipher is the foundation of all substitution ciphers — and the perfect example of why a secret algorithm isn't enough. The shift is the *key*, but there are only 25 possible keys. A computer can try all of them before you finish reading this sentence. Even a human analyst can crack it in minutes using frequency analysis.

Understanding why Caesar fails teaches you the properties that *real* encryption must have: a key space too large to brute-force, and ciphertext that doesn't leak the statistical patterns of the plaintext.

**This module unlocks:**
- Cryptography track — substitution ciphers, Vigenère cipher, one-time pad
- Reverse engineering track — recognizing obfuscated strings in code (ROT13 is still used in software to obscure text)

---

[← F08 — ASCII and Encoding](../F08-ascii-and-encoding/README.md) | [Back to Series](../../README.md) | [F10 — The XOR Key →](../F10-xor-key/README.md)
