# Solution: F13 — Three Languages, One Page

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

The page looks like a friendly welcome screen for "Layered Labs", but none of the flag is rendered on screen — not in the hero text, not in any of the three column descriptions, not in the button label. The challenge is to read all three layers of the source — HTML, CSS, and JavaScript — and assemble three hidden fragments into one flag.

The only tool you need is **View Source** (`Ctrl+U` / `Cmd+Option+U`). No DevTools required for this module — that's Module 02's skill.

---

## Step-by-Step Walkthrough

### Step 1 — Open View Source

With `challenge/index.html` open in your browser, press:

- **Windows / Linux:** `Ctrl+U`
- **Mac:** `Cmd+Option+U`

A new tab opens showing the raw source code. This is everything the browser received — including the parts it never draws on screen.

### Step 2 — Find Fragment 1 in the HTML

Press `Ctrl+F` in the source tab and search for `Fragment 1`. You'll land near the top of the file, inside the `<head>` section, on a comment that looks like:

```html
<!-- Fragment 1: FLAG{html_ -->
```

The fragment value is **`FLAG{html_`** — the opening of the flag.

This is invisible on the rendered page because HTML comments are skipped during rendering. They are still in the source. This is the same trick used in Module 01 of the main series, and you have just done it for real.

### Step 3 — Find Fragment 2 in the CSS

Keep scrolling down inside the source tab until you reach the `<style>` block. Look for the rule with the selector `.carrier::before`:

```css
.carrier { display: none; }

.carrier::before {
  content: "css_js_";
  color: var(--accent);
}
```

The fragment value is **`css_js_`**.

Two things make this fragment hidden:

1. The text `"css_js_"` only exists inside the CSS rule. It is not in the HTML, so searching the rendered page or even the HTML body alone wouldn't find it.
2. The element it would attach to (`<span class="carrier"></span>`) is set to `display: none`, so even though CSS would normally inject the `::before` text into the page, the browser never renders the carrier element at all.

Result: the fragment is *only* readable by reading the `<style>` block itself.

### Step 4 — Find Fragment 3 in the JavaScript

Scroll further down to the `<script>` block at the bottom of the file. Look for the click handler attached to the "Arm fragment 3" button:

```javascript
btn.addEventListener('click', function () {
  // When the button is clicked, fragment 3 is written here.
  flagPart3 = "three_layers}";
  ...
});
```

The fragment value is **`three_layers}`** — the closing of the flag.

Notice: the variable `flagPart3` starts as an empty string at the top of the script. The string `"three_layers}"` is only assigned *after* the button is clicked. But because View Source shows you the script's text, you don't need to actually click the button to learn what value it would assign — you just read it.

(In a more advanced challenge, you might have to actually trigger the event to observe the value. For F13, reading the source is enough.)

### Step 5 — Assemble the flag

Concatenate the three fragments in the order they appear in the source — top to bottom:

```
FLAG{html_  +  css_js_  +  three_layers}
```

Result:

```
FLAG{html_css_js_three_layers}
```

### Step 6 — Submit

Scroll back to the rendered page tab. In the submission box at the bottom of the page, type:

```
FLAG{html_css_js_three_layers}
```

Click **Submit Flag** (or press Enter).

The input border turns green, the success panel appears, and you'll see a link to Phase 1 Module 01.

---

## The Flag

```
FLAG{html_css_js_three_layers}
```

---

## Why Each Layer Matters

This challenge is designed so that knowing only one or two of the three languages is not enough. Let's check that:

- **If you only knew HTML**, you'd find Fragment 1 in the `<head>` comment and stop. You'd be missing two-thirds of the flag.
- **If you only knew CSS**, you might recognise the `<style>` block but skip the comments and the script. You'd find Fragment 2 alone.
- **If you only knew JavaScript**, you'd jump to the `<script>` block and find Fragment 3, but miss the rest.

Real CTF challenges and real-world security audits work the same way. A flag — or a leaked secret — could be in any of the three layers. A skilled web tester reads all three as a matter of routine. After this module, so do you.

---

## What View Source Did *Not* Show You

In this challenge, View Source revealed everything you needed. But it has one important limit:

> **View Source shows you the original HTML the server sent — not the current state of the page.**

If JavaScript modifies the page after it loads, those changes won't show up in View Source. They live in the **DOM** — the live tree the browser keeps in memory. To see the live DOM, you need a different tool: **DevTools** (`F12` or `Ctrl+Shift+I`).

That's the next skill in the curriculum: [Phase 1 Module 02 — The X-Ray Machine](../../../modules/02-browser-inspector/README.md). For now, View Source has done its job.

---

## Write Your Own Writeup

Good CTF players document their solutions. Here's a template:

---

**Challenge:** F13 — Three Languages, One Page
**Category:** Web / Foundations
**Difficulty:** Easy
**Tools used:** Browser, View Source (`Ctrl+U`), Find-in-page (`Ctrl+F`)

**Approach:**
[How did you tackle this? Did you find one fragment first and work outward?]

**Steps:**
1. Opened View Source on the challenge page.
2. Searched for `Fragment 1` in the source — found it in an HTML comment in the `<head>`.
3. Scrolled to the `<style>` block — found the `content:` value on a `::before` rule.
4. Scrolled to the `<script>` block — found the value assigned to `flagPart3` in a click handler.
5. Concatenated the three fragments in source order and submitted the full flag.

**Flag:** `FLAG{html_css_js_three_layers}`

**What I learned:**
[Why are HTML, CSS, and JS three separate languages? What can each one hide that the others can't?]

---

## Reflection Questions

1. Why is it important that HTML, CSS, and JavaScript each have their own comment syntax? What would happen if you tried to use `<!-- -->` inside a `<script>` block?

2. The page's `.carrier` element is set to `display: none`. If it had been `visibility: hidden` instead, would Fragment 2 still be invisible to a casual visitor? What about `opacity: 0`?

3. The third fragment is only assigned after the button is clicked. If the page were *only* served at runtime (not as a static file you can read) — for example, if `flagPart3` were fetched from a server in response to the click — what tool would you need to capture it?

4. In a real-world security review, why would an auditor check all three layers (HTML, CSS, JS) of a web page rather than just the rendered output?

---

*Great work. You now have the prerequisite for every Web CTF in the curriculum.*

[Back to F13 README](../README.md) | [Next: Phase 1 Module 01 — View Source →](../../../modules/01-view-source/README.md)
