# F12: The Computer's Notebook

> Every byte the computer remembers lives at a numbered desk. Sometimes the wrong byte ends up at the wrong desk.

---

## Metadata

| Field | Details |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~25 min challenge |
| **Prerequisites** | F05 (binary), F06 (hex), F10 (XOR), F11 (programs as bytes) |
| **Unlocks** | Binary Exploitation CTFs, Phase 2 BinExp modules |
| **Tools** | Web browser |

---

## What You'll Learn

- Picture computer memory as a giant numbered notebook of bytes
- Read addresses in hex and understand why every byte has one
- Understand the *stack* — the temporary scratch space a function uses while it runs
- See why every function call has a *return address*, and why it lives right next to the function's locals
- Get the picture of a *buffer overflow* — a slot too small for what was written into it, spilling over into something important next door
- Understand integer overflow as the same odometer-rollover idea you already know
- Walk away with the mental model that every binary exploitation CTF assumes you have

This is a picture, not an attack. You won't exploit anything. You'll see why exploits are possible.

---

## Files

```
F12-computer-notebook/
├── README.md               ← You are here
├── lesson.md               ← Read this first
├── concept-cards.md        ← Quick reference / key terms
└── challenge/
    ├── index.html          ← The interactive challenge — three panels
    ├── hint-1.md           ← Hint 1 (try first without!)
    ├── hint-2.md           ← Hint 2 (if hint 1 wasn't enough)
    └── solution.md         ← Full walkthrough + flag
```

---

## Quick Start

1. Read [`lesson.md`](lesson.md) end to end. The walkthrough at the bottom previews the challenge.
2. Open [`challenge/index.html`](challenge/index.html) in your browser.
3. Three panels, in order: the memory grid, the stack visualizer, the overflow demo. Each unlocks the next.
4. Submit the full flag at the bottom.

---

## Why This Module Matters

Every binary exploitation CTF challenge — every single one — assumes you can already picture the stack. They assume you know that local variables and return addresses share the same plate, that "buffer" means a slot of fixed size, that "overflow" means writing past it into whatever was next door.

If you don't have that picture, the challenges read like wizardry. With the picture, they collapse into "find the slot, count the distance, control what spills."

This module gives you the picture. After F12 you don't know how to *write* an exploit yet — that comes later. You know what the slots are, what's in them, and why a slot too small is a security bug. That's the prerequisite.

---

[← F11: From Code to Computer](../F11-code-to-computer/README.md) | [Foundation Track →](../README.md) | [Next: F13 →](../F13-three-languages/README.md)
