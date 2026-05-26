# Module 04: The Envelope, Not the Letter
## Web requests carry more than just the page.

| | |
|---|---|
| **Difficulty** | Beginner |
| **Time** | ~35 min reading + ~30 min challenge |
| **Prerequisites** | [Module 02 — Browser Inspector](../02-browser-inspector/README.md) |
| **Tools** | Web browser (Chrome or Firefox) + **Python 3** |

> **This module requires a local HTTP server.** See setup instructions below.

---

## What You'll Learn

- Open the Network tab in DevTools to watch HTTP requests happen in real time
- Read request and response headers — the metadata that travels alongside every webpage
- Trace a background `fetch()` request and inspect its response body in the Network tab

---

## Before the Challenge — Start a Local Server

Modules 01–03 worked by opening HTML files directly in your browser (`file://`). This module is different: HTTP headers only exist over real HTTP, so you need to run a local server first.

**One-time setup (requires Python 3):**

Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
cd path/to/IC-Content/modules/04-http-headers/challenge
python3 -m http.server 8080
```

Then visit **`http://localhost:8080`** in your browser — not the file path.

Leave the terminal open while you work. To stop the server, press `Ctrl+C`.

**Don't have Python 3?** Check the [Instructor Guide](../../instructor-guide/deployment-guide.md) for alternative hosting options.

---

## Files in This Module

```
04-http-headers/
├── README.md          ← you are here
├── lesson.md          ← read this first
├── concept-cards.md   ← quick-reference for later
└── challenge/
    ├── index.html     ← the challenge (serve via Python, then visit http://localhost:8080)
    ├── secret.json    ← a resource the page fetches — find it in the Network tab
    ├── hint-1.md      ← read after 10 min of trying
    ├── hint-2.md      ← read after 20 min of trying
    └── solution.md    ← read after you've found the flag (or given up)
```

---

## Quick Start

1. Start the local server (see above)
2. Open `lesson.md` and read it top to bottom
3. Visit `http://localhost:8080` in your browser
4. Find the flag — it looks like `FLAG{...}`

---

[← Module 03: Cookies & Storage](../03-cookies-and-storage/README.md) | [Back to Series](../../README.md) | [Next Module: robots.txt & Hidden Paths →](../05-robots-and-hidden-paths/README.md)
