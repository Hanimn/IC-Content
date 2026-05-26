# Web Recon: A CTF Skills Series for Ages 11–14

You've seen websites before. But have you ever looked *inside* them?

This series teaches you the skills used by cybersecurity professionals — through puzzles called **CTF challenges** (Capture the Flag). Each module teaches one real technique, then gives you a hands-on challenge to practice it. Solve the challenge, find the flag, level up.

No prior experience needed. Just a browser and curiosity.

---

## Before You Start

**Read this first:** [Ethical Hacking Pledge](ETHICAL-HACKING-PLEDGE.md)

This is not optional. Cybersecurity skills are powerful. This pledge explains how to use them responsibly and legally. It takes 5 minutes to read.

---

## The Modules

| # | Title | Topic | Time | Key Skill |
|---|-------|-------|------|-----------|
| 00 | Welcome to the Hunt | Orientation | 20 min | What is a CTF? Flag format, ethics |
| 01 | The Page Behind the Page | View Source | 30 min | Ctrl+U, HTML comments, raw source |
| 02 | The X-Ray Machine | Browser Inspector | 35 min | DevTools Elements, hidden CSS, DOM editing |
| 03 | Digital Breadcrumbs | Cookies & Storage | 35 min | Application tab, `document.cookie`, base64 |
| 04 | The Envelope, Not the Letter | HTTP Headers | 40 min | Network tab, response headers, `fetch()` |
| 05 | The Map They Forgot to Hide | robots.txt & Hidden Paths | 30 min | robots.txt, directory enumeration |
| 06 | Talking to the Page | URL Parameters | 30 min | Query strings, `URLSearchParams`, enumeration |
| 07 | The Form's Secret Life | Hidden Form Fields | 30 min | `<input type="hidden">`, DOM editing, forms |
| 08 | The Lock With No Key | Weak Credentials | 35 min | Default passwords, manual credential testing |

**Total Phase 1:** ~5 hours of content. Can be split across sessions.

---

## What You'll Need

- A web browser (Chrome or Firefox recommended)
- **Module 04 only:** Python 3 installed (for a one-line local server) — or your instructor can host it

That's it. No special software, no installs, no accounts required for Modules 00–03, 05–08.

---

## Flag Format

Every flag in this series looks like this:

```
FLAG{something_in_here}
```

Flags use lowercase letters, numbers, and underscores. When you find one, you've completed the challenge.

---

## Who This Is For

**Students (ages 11–14):** Start at Module 00 and work through in order. Each module builds on the last.

**Instructors and parents:** See the [Instructor Guide](instructor-guide/README.md) for classroom setup, assessment rubrics, and deployment instructions.

**Self-directed learners:** You can jump around after Module 02, but 00 → 01 → 02 is the required foundation.

---

## Progression Path

```
Tier 1: Discovery
  Module 00 → 01 → 02 → 03 → 04 → 05
  (Look, inspect, find — no modification yet)

Tier 2: Manipulation
  Module 06 → 07
  (Change what the page sees and does)

Tier 3: Authentication
  Module 08
  (Think like an attacker testing login systems)

Phase 2 (coming): SQL Injection · XSS · Path Traversal · JWT Manipulation
```

---

## After This Series

Once you've completed all 8 modules, you're ready to try real beginner CTF competitions:

- **[picoCTF](https://picoctf.org)** — the best beginner competition, free, runs year-round
- **[CTFlearn](https://ctflearn.com)** — community challenges at all skill levels
- **[Hacker101 CTF](https://ctf.hacker101.com)** — challenges by the HackerOne security platform

---

*Series version: 1.0 — Phase 1 Web*
