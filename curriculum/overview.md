# Curriculum Overview: Web Recon — Phase 1

## What This Series Teaches

This series teaches the web security skills needed to compete in beginner CTF (Capture the Flag) competitions. By the end of Phase 1, students can:

- Read and interpret raw HTML source
- Use browser DevTools to inspect and modify live pages
- Understand how cookies, HTTP headers, and URL parameters work
- Identify common misconfigurations that leak information
- Think like an attacker testing authentication systems

These are real skills used by professional penetration testers, bug bounty hunters, and security researchers.

---

## Skill Tree

```
PHASE 1: WEB RECON

Tier 1 — Discovery (look and find, don't touch)
  │
  ├── Module 00: Orientation
  │     What is a CTF? Flag format. Ethical rules.
  │     Prerequisite for everything.
  │
  ├── Module 01: View Source
  │     Reading raw HTML. Finding hidden comments. Keyboard shortcuts.
  │     Prerequisite: Module 00
  │
  ├── Module 02: Browser Inspector
  │     DevTools Elements panel. DOM tree. CSS visibility tricks.
  │     Prerequisite: Module 01
  │
  ├── Module 03: Cookies & Storage
  │     Reading and modifying cookies. Application tab. Base64 basics.
  │     Prerequisite: Module 02
  │
  ├── Module 04: HTTP Headers
  │     Network tab. Request vs. response headers. Custom headers.
  │     Prerequisite: Module 02
  │     Note: requires HTTP server (see Module 04 README)
  │
  └── Module 05: robots.txt & Hidden Paths
        robots.txt syntax. Directory inference. Security through obscurity.
        Prerequisite: Module 01

Tier 2 — Manipulation (change what the page sees)
  │
  ├── Module 06: URL Parameters
  │     Query string anatomy. URLSearchParams. Enumeration.
  │     Prerequisite: Modules 01–02
  │
  └── Module 07: Hidden Form Fields
        input type="hidden". Editing before submit. Client-side trust fallacy.
        Prerequisite: Module 02

Tier 3 — Authentication (test login systems)
  │
  └── Module 08: Weak Credentials
        Common passwords. Default credentials. Manual credential testing.
        Prerequisite: Modules 01–07 (builds on the mindset from all prior modules)
```

---

## Recommended Module Order

For most students, follow the numbered sequence: 00 → 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08.

**Instructor reordering options:**
- Modules 03, 04, and 05 can be taught in any order after Module 02.
- Modules 06 and 07 pair well together in a single session (both cover client-side input manipulation).
- Module 08 works best at the end — it benefits from the "trust nothing the client tells you" mindset built across all prior modules.

---

## Prerequisites Per Module

| Module | Hard Prerequisites | Helpful Background |
|--------|-------------------|-------------------|
| 00 | None | None |
| 01 | Module 00 | Basic HTML (optional) |
| 02 | Module 01 | Module 01 |
| 03 | Module 02 | Module 02 |
| 04 | Module 02 | Module 01–02 |
| 05 | Module 01 | Module 01 |
| 06 | Modules 01–02 | Module 02 |
| 07 | Module 02 | Module 06 (helpful) |
| 08 | Modules 01–07 | All Phase 1 modules |

---

## Phase 2 Preview (Planned)

Phase 2 teaches injection and client-side attack concepts. These require more careful ethical framing and are appropriate after completing all Phase 1 modules.

| Module | Topic | Key Concepts |
|--------|-------|-------------|
| 09 | SQL Injection — First Steps | Single-quote test, SQL error messages, WHERE clause logic |
| 10 | SQL Injection — UNION Attacks | Database enumeration, UNION SELECT, column matching |
| 11 | Reflected XSS | `<script>` injection, alert boxes, the browser as victim |
| 12 | Cookie Theft via XSS | `document.cookie`, how XSS connects to session hijacking |
| 13 | Path Traversal | `../` sequences, reading files outside webroot |
| 14 | JWT Manipulation | Token structure, algorithm confusion, unsigned tokens |

Phase 2 content is not yet available.

---

## Connection to Real-World CTF Categories

This series maps directly to the **Web** category in competitions like picoCTF, CTFlearn, and Hacker101.

| Real CTF Challenge Type | Covered In |
|------------------------|-----------|
| "Find the flag in the source" | Module 01 |
| "Inspect element to find hidden content" | Module 02 |
| "Modify a cookie to get admin access" | Module 03 |
| "Check the response headers" | Module 04 |
| "What does robots.txt say?" | Module 05 |
| "Change the user ID in the URL" | Module 06 |
| "Edit the hidden price field" | Module 07 |
| "Find the weak login credentials" | Module 08 |
| "SQL injection login bypass" | Phase 2 — Module 09 |
| "XSS to steal the admin's cookie" | Phase 2 — Modules 11–12 |
