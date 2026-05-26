# F11: From Code to Computer

> A program is words you can read. A binary is the same words after a translator gets done with them — but pieces always slip through.

---

## Metadata

| Field | Details |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~20 min challenge |
| **Prerequisites** | F05 (binary/hex), F06 (hex dumps), F08 (ASCII) |
| **Unlocks** | Reverse Engineering CTFs, Phase 2 RE modules |
| **Tools** | Web browser |

---

## What You'll Learn

- Understand what *compilation* is: turning human-readable source code into bytes a CPU can execute
- See why a compiled binary still leaks readable text — strings survive the translation
- Use the same logic the real Unix `strings` tool uses — by hand — to extract hidden text from a fake binary
- Recognise that running `strings` is the very first move on any unknown executable in a CTF

---

## Files

```
F11-code-to-computer/
├── README.md               ← You are here
├── lesson.md               ← Read this first
├── concept-cards.md        ← Quick reference / key terms
└── challenge/
    ├── index.html          ← The interactive challenge
    ├── hint-1.md           ← Hint 1 (try first without!)
    ├── hint-2.md           ← Hint 2 (if hint 1 wasn't enough)
    └── solution.md         ← Full walkthrough + flag
```

---

## Quick Start

Open [`lesson.md`](lesson.md) and read through, then open [`challenge/index.html`](challenge/index.html) in your browser.

---

[← F10: XOR Key](../F10-xor-key/README.md) | [Foundation Track →](../README.md) | [Next: F12 →](../F12-the-computers-notebook/README.md)
