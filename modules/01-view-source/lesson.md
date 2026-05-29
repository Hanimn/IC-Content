---
title: "The Page Behind the Page"
tagline: "Every website is hiding more than it shows. The trick is knowing how to look."
time: "~25 min reading + ~20 min challenge"
tier: "Tier 1: Discovery"
---
## Every website is hiding more than it shows.

**Time:** ~25 min reading + ~20 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

You open a website. You see a login form, some images, a navigation bar. It looks finished — polished, intentional. But what you're seeing is the *output*. Somewhere underneath it, there's a blueprint.

Every webpage you've ever visited was built from raw text — instructions that a browser reads and turns into what you see. That raw text is always there, always accessible, always transmitted to your computer the moment you visit a page. The browser renders it into something pretty. But the original is still sitting right underneath.

You're about to become a digital archaeologist. Instead of digging through dirt to find what's buried, you're going to look past the polished surface to the raw material underneath. And here's the thing about raw material: people leave stuff in it. Notes to themselves. Reminders. Things they meant to clean up. Sometimes, things they really shouldn't have left behind.

---

## The Concept

### What Is HTML Source?

When you visit a website, your browser sends a request to a server. The server sends back a text file — raw HTML — and your browser reads it, interprets it, and draws the result on screen. That drawing process is called *rendering*.

Think of it like a printed book versus the author's original manuscript with all their margin notes. The printed book is what readers see: clean, formatted, intentional. The manuscript has crossed-out sentences, scribbled ideas, and sticky notes that were never meant to go to print. A browser renders the book. View Source shows you the manuscript.

Here's the key insight: **your browser already has the full manuscript**. The server sent it to you the moment you loaded the page. View Source doesn't make a new request — it just shows you what your browser already received.

### HTML Comments

HTML has a feature called *comments* — sections of code that the browser completely ignores when rendering. They're invisible on screen. They don't affect how the page looks or works. But they're in the source.

Comments look like this:

```html
<!-- This is a comment. The browser ignores it. -->
```

Everything between `<!--` and `-->` is a comment. You can put anything in there.

Developers use comments all the time for legitimate reasons: leaving notes for teammates, temporarily disabling a block of code, marking sections of a large file. Most of the time, comments are harmless. But developers are human. They forget things. Sometimes a comment contains something it shouldn't — a password, an internal URL, a note that reads "TODO: remove before launch" that never got removed.

### In Practice

Here's what the source of a fictional online shop might look like:

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Created by dev team, Jan 2024 -->
  <!-- TODO: update logo before launch -->
  <!-- Staging server: http://10.0.0.14/admin — do not share -->
  <title>Pixel Shop</title>
</head>
<body>
  <h1>Welcome to Pixel Shop</h1>
  <p>Your cart is empty.</p>
</body>
</html>
```

On screen, visitors see "Welcome to Pixel Shop" and "Your cart is empty." That's it.

But in the source? There's a staging server address that was never meant to be public — `http://10.0.0.14/admin`. Anyone who clicks View Source can see it. Security researchers (and attackers) look for exactly this kind of oversight.

### Why This Matters (and Why It's a Vulnerability)

HTML is a *client-side* technology — it runs in the visitor's browser, not on the server. That means everything in your HTML is sent to every visitor, whether you want them to see it or not. There is no way to hide part of an HTML file from someone who knows how to look.

This is why developers are taught: **never put sensitive information in HTML**. Passwords, API keys, internal server addresses, access tokens — none of it belongs in client-side code. A comment doesn't make it more hidden. It just makes it slightly less obvious to someone who's only looking at the rendered page.

CTF challenges hide flags in HTML comments to teach this exact lesson: what you see on screen is not the whole picture. If you're looking for something a developer left behind, the source is the first place to check.

---

## Guided Walkthrough

Let's practice on a real website that's safe to inspect and will never have anything sensitive in it: `example.com`. This site is maintained by IANA specifically as a harmless demo domain.

**Step 1: Open example.com**
Navigate to `https://example.com` in your browser. You'll see a simple page with a heading and a paragraph of text. Nothing exciting — that's the point.

**Step 2: Open View Source**
- **Windows / Linux:** Press `Ctrl+U`
- **Mac:** Press `Cmd+Option+U`
- **Alternative (any OS):** Right-click anywhere on the page → "View Page Source"

A new tab opens. You're now looking at the raw HTML that your browser received from the server. Everything you see here was sent to your computer — the browser just normally doesn't show it to you this way.

**Step 3: Orient yourself**
You'll see something like this near the top:

```html
<!doctype html>
<html>
<head>
    <title>Example Domain</title>
    ...
```

The `<head>` section contains metadata — page title, CSS links, scripts. The `<body>` section contains the visible content. HTML comments (`<!-- ... -->`) can appear anywhere in either section.

**Step 4: Search the source**
Press `Ctrl+F` (Win/Linux) or `Cmd+F` (Mac) to open find-in-page, and search for the word `comment`. You'll see if there are any. On example.com there probably aren't — it's a very minimal page. But on real sites, you'll often find several.

**Step 5: Try it on a bigger site**
Open a new tab, go to any website you visit regularly (a news site, a game site, your school's website), and press `Ctrl+U`. Search for `<!--` to find all the comments. How many are there? What do they say?

You've just done something that every web security professional does as a first step when investigating a site. It takes two seconds and sometimes reveals a lot.

---

## Your Challenge

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

A student at Westfield Academy discovered a forgotten webpage on the school's old web server. The IT administrator who built the site retired three years ago and never fully cleaned up their work. The page looks completely empty — nothing visible on screen at all. But "empty" webpages still have source code.

Your mission: find whatever the administrator left behind.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find the flag hidden in this page.

**Rules:**
- You may only use browser features (no special software)
- Don't look at the file in a text editor — open it in a browser like a real webpage
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The page looks empty, but an empty page still has source code — and source code can contain things that never appear on screen.

What is the difference between what you *see* on a webpage and what is actually *in* it?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Use View Source: `Ctrl+U` on Windows/Linux, `Cmd+Option+U` on Mac.

Once the source is open, press `Ctrl+F` and search for the word `FLAG`. Developers often leave notes to themselves in the source — look for HTML comment syntax (`<!--`) as well.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete walkthrough.

</details>

---

## Concept Card

*Keep this handy — the shortcuts especially.*

### Key Terms

| Term | What It Means |
|------|---------------|
| HTML | HyperText Markup Language — the text format used to build webpages |
| Source code | The raw HTML file that a browser receives from a server |
| Rendering | The process of a browser turning raw HTML into the visual page you see |
| HTML comment | Code inside `<!-- -->` that browsers ignore when rendering; invisible on screen but present in source |
| Client-side | Code that runs in the visitor's browser (as opposed to server-side code that stays on the server) |

### Keyboard Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| View Page Source | `Ctrl+U` | `Cmd+Option+U` |
| Find in page | `Ctrl+F` | `Cmd+F` |
| Open DevTools | `F12` | `Cmd+Option+I` |

### Quick Reference

```html
<!-- This is an HTML comment. Invisible on screen. Always in the source. -->
```

---

## Keep Going

**Practice this skill on:**
- [picoCTF Gym](https://play.picoctf.org/practice) — search for challenges tagged "source" or "web"
- [HackThisSite](https://www.hackthissite.org/missions/basic/) — Basic web missions, especially missions 1–3

**Next module:** [Module 02 — The X-Ray Machine](../02-browser-inspector/README.md) — you'll go deeper with DevTools to find content that View Source alone can't reveal.

**Extension challenge (optional):** Pick any three websites you use regularly. Open View Source on each one and find every HTML comment. Make a list: what kinds of things do developers leave in comments? Any surprises? (Remember: you're observing only — don't interact with anything you find.)

---

[← Module 00](../00-orientation/README.md) | [Back to Series](../../README.md) | [Next Module: Browser Inspector →](../02-browser-inspector/README.md)
