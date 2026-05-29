# Quartet Capstones

**Four mini-CTF events that gate after each foundation tier.**

Each capstone is a single chained challenge that requires combining ALL the skills from a foundation tier — not "pick one technique," but "do A then B then C then D, where the answer to A is the input to B." This is the format real CTFs use: multi-step, multi-skill, narrative-shaped.

---

## What's in here

| Capstone | Tier | Prerequisites | Status |
|---|---|---|---|
| [Q1 — The Mystery Letter](Q1-fundamentals/) | Fundamentals | F00–F04 | Live |
| [Q2 — Repair the Artifact](Q2-data-and-encoding/) | Data & Encoding | F05–F08 | Coming Soon |
| [Q3 — Extract the Embedded Secret](Q3-code-and-logic/) | Code & Logic | F09–F11 | Coming Soon |
| [Q4 — The Final Drive](Q4-security-concepts/) | Security Concepts | F12–F16 | Coming Soon |

---

## How they work

A capstone unlocks when you've completed a soft-prerequisite share of its tier — specifically, ⌈ tier-size × 0.6 ⌉ lessons at COMPLETED or MASTERED. So for Q1 (5 lessons), you need 3 of F00-F04 done. For Q3 (3 lessons), you need 2 of F09-F11 done. The skill tree on the IC-Page learn hub uses the same rule.

Each capstone is a self-contained `challenge/index.html` that runs from `file://` — same shape as every other foundation challenge. Open it in your browser, work through the chained sub-steps, submit the flag at the end.

Capstones earn 50 XP (vs 10 for a regular lesson) — the reward signals that you actually did a real CTF event. They show as a fifth tier on the foundation skill tree (in v2 — for now they live on a dedicated `/capstones` page).

---

## Why capstones exist

The 2026-05-29 curriculum audit identified the single biggest engagement vulnerability: every lesson is "read 1500-3000 words → do one challenge at the end." For 11-14yos that pacing is wrong-shaped. Capstones address the *between-lessons* side by giving the kid a "you actually did a CTF" beat after every thematic tier. Multi-skill chained puzzles are the highest-retention format in CTF education.

The audit projected a 30-40% retention lift through F15 vs the linear-only path, because each capstone gives a "I did a real thing" dopamine spike that pure read-then-quiz pacing never quite delivers.

---

[Foundation Track](../foundation/) | [Web Modules](../modules/) | [ETHICAL-HACKING-PLEDGE](../ETHICAL-HACKING-PLEDGE.md)
