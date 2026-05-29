# F16 — The Terminal Is Just A Text Box

> Six tiny commands that crack half of all CTF challenges.

> **Before you start:** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet. The commands in this lesson — `file`, `strings`, `cat`, `grep`, `find`, `xxd` — are dual-use. They're how forensics analysts find evidence and how journalists verify documents. Use them on files you own, on the demonstration challenge below, and on public CTF datasets that exist for this purpose. Not on someone else's machine without permission.

---

## Module Metadata

| Field | Details |
|---|---|
| **Difficulty** | Intermediate |
| **Time** | ~30 min reading + ~30 min challenge |
| **Prerequisites** | F00 (computers), F06 (hex), F07 (file formats), F11 (strings) |
| **Unlocks** | Forensics CTFs, Reverse Engineering CTFs, Phase 2 modules |
| **Tools** | Web browser (Chrome 100+, Firefox 100+, Safari 14+) — the terminal is simulated in the page, no install needed |

---

## What You'll Learn

- What a "shell" or "terminal" actually is (a text box that reads commands and runs programs — there's no magic console)
- Six commands that show up in nearly every Forensics, Reverse Engineering, and Binary Exploitation CTF challenge: `file`, `strings`, `cat`, `grep`, `find`, `xxd`
- Why every word a kid types into the terminal is the name of a real program
- How to combine commands with pipes (`|`) — the single piece of shell syntax most CTF writeups assume you know
- How to find a flag hidden three different ways across an unfamiliar filesystem

---

## Files

```
F16-terminal-is-just-a-text-box/
├── README.md               ← You are here
├── lesson.md               ← Read this first (~2,000 words)
├── concept-cards.md        ← Quick reference / six-command cheat sheet
└── challenge/
    ├── index.html          ← Mystery USB — an in-browser shell with 15 files
    ├── hint-1.md           ← Meta-strategy nudge (try first without!)
    ├── hint-2.md           ← Tactical: which command, on which file
    └── solution.md         ← Full transcript of solving each hide
```

---

## Quick Start

1. Read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet.
2. Read `lesson.md` end-to-end. Don't skip the two **Try It** boxes — they're 60 seconds each.
3. Skim `concept-cards.md` to anchor the six commands.
4. Open `challenge/index.html` in your browser. The challenge runs entirely from `file://` — no server needed. The terminal accepts commands; type `help` if stuck.
5. Find all three flag pieces. Submit the combined flag.

---

## Why This Module Exists

The earlier lessons gestured at command-line tools: F07 mentions `file vacation.txt`, F11 walks you through what `strings` does, F14 references `sha256sum`, F15 talks about `exiftool`. Every one of those was an honest gesture — *here's a tool that does this for real* — but the curriculum never put you in front of a terminal to actually run them.

After F16, those references land. Every CTF beyond the most beginner web challenge assumes you can open a shell and type these six commands. picoCTF assumes it from problem 1. F16 is the bridge.

---

[← F15 — The Picture That Knew Too Much](../F15-picture-knew-too-much/README.md) | [Foundation Track](../README.md)
