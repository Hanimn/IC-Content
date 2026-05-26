# F13: Three Languages, One Page

> Every webpage is three languages stacked: bones, paint, and brain. If you only see one, you only see a third of the story.

---

## Metadata

| Field | Details |
|---|---|
| **Difficulty** | Beginner |
| **Time** | ~30 min reading + ~20 min challenge |
| **Prerequisites** | F00 — How Computers Actually Work, F03 — The Request and the Response |
| **Tools** | Web browser (Chrome, Firefox, or Edge) |
| **Unlocks** | Phase 1 Module 01 (View Source), Module 02 (Inspector), all Web CTFs |

---

## What You'll Learn

- Identify the three layers that make up every webpage: HTML (structure), CSS (appearance), JavaScript (behavior)
- Read raw HTML tags, attributes, and comments
- Read CSS selectors and properties — and understand how CSS can hide content
- Read simple JavaScript variables, functions, and event listeners
- Understand the DOM — why View Source and the live page can disagree
- Recognise that secrets can hide in any of the three layers

---

## Files

```
F13-three-languages/
├── README.md               ← You are here
├── lesson.md               ← Read this first
├── concept-cards.md        ← Quick reference / key terms
└── challenge/
    ├── index.html          ← The interactive challenge — "Layers"
    ├── hint-1.md           ← Hint 1 (try first without!)
    ├── hint-2.md           ← Hint 2 (if hint 1 wasn't enough)
    └── solution.md         ← Full walkthrough + flag
```

---

## Quick Start

1. Open [`lesson.md`](lesson.md) and read through the bones / paint / brain analogy.
2. Open [`challenge/index.html`](challenge/index.html) in your browser.
3. Capture the flag by reading all three layers of the page.

---

## Why This Module Matters

When you start Phase 1 Module 01 — **View Source** — the very first challenge will throw you into a real webpage with HTML comments, CSS rules, and a `<script>` block. If you've never seen those words before, the source will look like a wall of unfamiliar text.

This module makes sure that doesn't happen. After F13, you can open any webpage's source and recognise exactly what each piece is doing. You won't be guessing.

---

[← F12 — The Computer's Notebook](../F12-computers-notebook/README.md) | [Foundation Track](../README.md) | [Next: F14 →](../F14-one-way-door/README.md)
