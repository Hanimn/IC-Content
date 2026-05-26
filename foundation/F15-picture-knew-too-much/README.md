# F15: The Picture That Knew Too Much

> A photo is more than what you see. There's a notebook tucked behind it, and sometimes a message hidden inside it.

---

## Metadata

| Field | Details |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~25 min challenge |
| **Prerequisites** | F05 (binary), F06 (hex), F07 (file formats), F08 (ASCII) |
| **Tools** | Web browser |
| **Unlocks** | Forensics CTFs, Phase 2 Forensics modules |

---

## What You'll Learn

- Read EXIF metadata embedded in image files and explain why GPS coordinates have leaked the location of soldiers, journalists, and activists
- Explain the difference between metadata (notes next to the file) and steganography (data hidden inside the file's content)
- Trace the LSB (least-significant-bit) algorithm: pixels become bits, bits become bytes, bytes become ASCII text
- Recognise the standard CTF forensics checklist for any unknown image: exiftool, file, strings, zsteg, steghide, stegsolve

---

## Files

```
F15-picture-knew-too-much/
├── README.md               ← You are here
├── lesson.md               ← Read this first (~2,200 words)
├── concept-cards.md        ← Quick reference / key terms
└── challenge/
    ├── index.html          ← The interactive two-part challenge
    ├── hint-1.md           ← Hint 1 (try first without!)
    ├── hint-2.md           ← Hint 2 (if hint 1 wasn't enough)
    └── solution.md         ← Full walkthrough + flag
```

---

## Quick Start

1. Read `lesson.md` end-to-end.
2. Skim `concept-cards.md` to anchor the terms.
3. Open `challenge/index.html` in your browser. The challenge runs entirely from `file://` — no server needed.
4. Find both flag fragments. Submit the combined flag.

---

## The Big Idea

Every image file carries two kinds of secret. The first is **metadata** — a small notebook tucked behind the picture, recording what camera took it, when, and sometimes exactly where. The second is **steganography** — data woven inside the visible pixels themselves, where the eye cannot detect it.

This module teaches you to read both kinds of secret. By the end you'll know why a photo posted to social media can compromise a hidden location, why CTF forensics challenges always start with `exiftool`, and how to write a few lines of JavaScript that pull a hidden message out of an image one bit at a time.

---

[← Foundation Track](../README.md) | [← Previous: F08 — ASCII All the Way Down](../F08-ascii-and-encoding/README.md) | [Next: Phase 2 Forensics →](../README.md)
