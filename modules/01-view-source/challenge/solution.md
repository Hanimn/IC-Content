# Solution: Module 01 — The Page Behind the Page

---

> **Wait.** If you haven't spent at least 15 minutes trying, go back and try again.
> The struggle is part of the learning — your brain needs to work through the problem to remember the solution.
>
> Already tried and want to understand what you missed? Keep reading.

---

## The Approach

This is an **information disclosure** challenge — the flag is hidden in the raw HTML source, not visible on the rendered page. An HTML comment was left in the `<head>` section of the page, which is invisible when browsing normally but fully readable in the source.

A CTF player encountering a "nothing to see here" maintenance page would immediately try View Source. Blank or minimal pages are classic hiding spots because people assume no one will look.

---

## Step-by-Step Solution

**Step 1: Open the page in your browser**
Open `challenge/index.html`. You see a dark maintenance screen: "Nothing to see here." There's no visible content to inspect, no buttons to click, no forms to fill.

**Step 2: Open View Source**
- **Windows / Linux:** Press `Ctrl+U`
- **Mac:** Press `Cmd+Option+U`
- **Alternative:** Right-click the page → "View Page Source"

A new tab opens showing the raw HTML.

**Step 3: Search for the flag**
Press `Ctrl+F` (Win/Linux) or `Cmd+F` (Mac) and search for `FLAG`.

You'll jump to a line inside the `<head>` section that looks like this:

```html
<!-- FLAG{source_is_never_secret} -->
```

That's the flag.

**Step 4: Read the other comments (optional but educational)**
While you're there, notice the other comments around it:
- Some are normal developer notes (last updated date, webmaster name, server info)
- One contains a long string of letters and numbers — `aGVsbG8gZnJvbSB0aGUgcGFzdCAtIG5pY2UgdHJ5IQ==`

That string is base64-encoded. If you decode it (paste it into [CyberChef](https://gchq.github.io/CyberChef/) or type `atob("aGVsbG8gZnJvbSB0aGUgcGFzdCAtIG5pY2UgdHJ5IQ==")` in your browser console), you get: **"hello from the past - nice try!"**

Red herrings are common in CTF challenges. Learning to recognize what the real flag looks like — `FLAG{...}` — helps you skip past them quickly.

---

## The Flag

```
FLAG{source_is_never_secret}
```

---

## Why This Works

HTML is a client-side technology. When you visit a webpage, the server sends the complete HTML file to your browser. The browser chooses what to *render* — but it received everything. HTML comments are part of that "everything." They're ignored during rendering, but they're present in every copy of the file that gets transmitted.

There's no way to send HTML to a browser while keeping parts of it secret. If it's in the HTML, the visitor has it. A comment doesn't encrypt it, obfuscate it, or protect it in any way — it just makes it slightly less obvious to someone only looking at the rendered page.

In real security work, this kind of oversight has caused genuine incidents. Developers have accidentally left database passwords, API keys, internal server addresses, and staging environment URLs in HTML comments on production websites. Bug bounty hunters regularly find these by running automated source-code scanners — or just pressing `Ctrl+U`.

**The fix:** Never put sensitive information in HTML comments. Use server-side comments (in PHP, Python, etc.) — those stay on the server and are never transmitted. Or better: don't put secrets in source code at all. Secrets belong in environment variables and secrets managers, not in any kind of code comment.

---

## Write Your Own Writeup

Document your solve. This is what real CTF players do — and it builds your skills faster than anything else.

---

**Challenge:** Module 01 — The Page Behind the Page
**Category:** Web
**Difficulty:** Easy
**Tools used:** [What did you actually use?]

**Approach:**
[In your own words: how did you approach this challenge? What did you try first?]

**Steps:**
1. [What you did]
2. [What you did]
3. [Found the flag]

**Flag:** `FLAG{source_is_never_secret}`

**What I learned:**
[What technique did this teach you? When would you use this in a real CTF?]

---

*Nice work. On to the next one.*

[← Back to Module](../README.md) | [Next Module: Browser Inspector →](../../02-browser-inspector/README.md)
