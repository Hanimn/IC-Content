# Q1 — The Mystery Letter

> Trace an anonymous letter back to the building it came from. DNS, IP, HTTP, status codes — all five F00–F04 skills, chained.

> **Before you start:** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet. The skills in this capstone are network-investigation skills. Use them on the simulated traffic in this challenge and on traffic you own. Don't run them against networks or websites you don't have permission to inspect.

---

## Capstone Metadata

| Field | Details |
|---|---|
| **Tier** | Fundamentals |
| **Prerequisites** | F00–F04 (you need at least 3 of the 5 to unlock) |
| **Difficulty** | Multi-step — easier than F11/F14, harder than any single Foundation lesson |
| **Time** | ~25 min |
| **Tools** | Web browser (Chrome 100+, Firefox 100+, Safari 14+) — challenge runs entirely client-side |
| **XP** | 50 (vs 10 for a regular lesson) |

---

## Briefing

A letter arrived this morning at the school office. No return address. The envelope said only: *"Trace me. The flag is the building I came from."* Handwriting unclear. Postmark partially smudged.

Inside the envelope: a printout. Not paper-and-ink — it's a print of someone's browser tabs. Five tabs, in order, from the moment they sent the letter to the moment your school received it. Five computers spoke to each other to make this letter. Each one left a fingerprint.

**Your job:** walk the chain. Each tab gives you a clue to the next. The final tab reveals where the letter came from.

---

## Files

```
Q1-fundamentals/
├── README.md               ← You are here
└── challenge/
    ├── index.html          ← The Mystery Letter — 5-tab simulator
    ├── hint-1.md           ← Meta-strategy nudge per tab
    ├── hint-2.md           ← Tactical: which choice on which tab
    └── solution.md         ← Full transcript walkthrough
```

---

## What you'll prove

By solving Q1 you'll have demonstrated:

- **F00 (computers, files, paths):** reading a URL like a path on a server
- **F01 (DNS):** matching a domain to its actual IP from a list of candidates
- **F02 (IP, ports):** picking the right port for the right service (mail = 25)
- **F03 (HTTP request/response):** dissecting a raw HTTP request — method, host, path
- **F04 (status codes):** following a redirect chain through 301/302/401/200 to find the resource that actually delivered

Not as separate questions, but as one continuous chain — the answer to each tab feeds the next.

---

[← Quartet Capstones](../README.md) | [Foundation Track](../../foundation/README.md)
