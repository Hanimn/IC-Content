# F07 — What's in a File?

> Your computer doesn't trust the filename. It reads the first few bytes instead.

> **Before you start:** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet. The skills in this lesson (file inspection, magic-byte detection) work the same way whether the file is yours or somebody else's. Use them on your own files.

## Module Info

| Field | Value |
|---|---|
| Difficulty | Beginner |
| Reading time | ~25 min |
| Challenge time | ~25 min |
| Prerequisites | [F05 — Everything Is a Number](../F05-everything-is-a-number/README.md), [F06 — Thinking in Hex](../F06-thinking-in-hex/README.md) |
| Tools | Web browser |
| Unlocks | Forensics track (file carving, magic bytes, steganography detection) |

## What You'll Learn

- Identify common file formats by their magic byte signatures
- Explain why file extensions are labels, not guarantees of file type
- Find and correct a corrupted file signature by its expected magic bytes

## Contents

| File | Description |
|---|---|
| [lesson.md](lesson.md) | Core concepts: files as bytes, magic bytes, how the OS uses them, why attackers care |
| [concept-cards.md](concept-cards.md) | Key terms and magic bytes quick reference |
| [challenge/index.html](challenge/index.html) | Interactive File Disguise Detector + Corrupted File Repair bonus |
| [challenge/hint-1.md](challenge/hint-1.md) | Hint 1 — how to approach the challenge |
| [challenge/hint-2.md](challenge/hint-2.md) | Hint 2 — narrowed clues for each file |
| [challenge/solution.md](challenge/solution.md) | Full solution with explanations |

## How to Run the Challenge

Open `challenge/index.html` directly in a web browser. No server required.

---

[← F06](../F06-thinking-in-hex/README.md) | [Foundation Track](../README.md) | [Next: F08 →](../F08-ascii-and-encoding/README.md)
