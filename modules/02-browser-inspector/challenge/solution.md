# Solution: Module 02 — The X-Ray Machine

---

> **Wait.** If you haven't spent at least 15 minutes genuinely trying, go back.
> The Inspector is one of the most useful tools you'll use in every future module.
> Struggling through this challenge is how you learn to use it instinctively.
>
> Already tried? Read on.

---

## The Approach

This is a **CSS/DOM hiding** challenge with two separate techniques. The flag is split across:
1. A `display:none` element — present in the DOM, invisible on screen
2. A `data-*` attribute — present on a visible element, never rendered

A CTF player encountering a page with "not much to see" would open DevTools immediately and scan the DOM tree for elements that don't correspond to anything visible. Finding the hidden div is usually fast. The data attribute requires looking more carefully at individual element tags.

---

## Step-by-Step Solution

**Step 1: Open DevTools**
- **Windows / Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`

The Elements panel should open by default. If not, click the **Elements** tab.

**Step 2: Find the hidden div (Part 1)**
In the Elements panel, search the DOM tree for the hidden element. Press `Ctrl+F` (or `Cmd+F`) inside the DevTools panel and search for `archive-note`.

You'll find:

```html
<div class="archive-note">
  <p>Curator's working note: FLAG{inspect_beyond</p>
</div>
```

This element has `display: none` set in its CSS. Select it in the DOM tree and look at the Styles panel on the right — you'll see the `display: none` rule. The text content is the first half of the flag: `FLAG{inspect_beyond`

**Step 3: Find the data attribute (Part 2)**
In the DOM tree, look at the gallery section. Expand the first `.exhibit-card` and click on its `<figure>` element. Look at the opening tag in the DOM:

```html
<figure data-curator="the_surface}" data-accession="HMA-1923-07">
```

The `data-curator` attribute holds the second half: `the_surface}`

**Step 4: Combine the halves**
- Part 1 (from the hidden div): `FLAG{inspect_beyond`
- Part 2 (from the data-curator attribute): `the_surface}`
- Combined: `FLAG{inspect_beyond_the_surface}`

(The underscore connecting the two halves comes from the end of Part 1 and the start of Part 2.)

Wait — re-read both carefully:
- Part 1 ends with: `inspect_beyond`
- Part 2 starts with: `the_surface}`
- So the full flag is: `FLAG{inspect_beyond_the_surface}`

---

## The Flag

```
FLAG{inspect_beyond_the_surface}
```

---

## Why This Works

CSS is a presentation layer. Its job is to control how things look — nothing more. When you apply `display: none` to an element, the browser stops rendering it, but the element is still there in the DOM. It was still transmitted to your browser. It still exists in memory. The DevTools Inspector can read it because the Inspector reads the DOM directly, not the rendered output.

The same principle applies to `data-*` attributes. They were designed as a way for developers to attach extra information to elements — information that JavaScript can read but that doesn't need to appear on screen. There's nothing wrong with `data-*` attributes themselves. The problem arises when someone stores sensitive information in one, assuming "it's not visible so it's not accessible." Every visitor to the page has that attribute in their browser's memory the moment the page loads.

In real penetration testing engagements, testers routinely find: admin panels hidden with `display:none` that still accept input and fire server requests when their visibility is restored; pricing data in `data-*` attributes that can be read and submitted in crafted requests; user role identifiers (`data-role="guest"`) that reveal the site's access control model. CSS is not a security boundary. The server is.

**The fix:** Never rely on CSS to hide security-sensitive information. If a user shouldn't have access to something, don't send it to their browser in the first place. Access control is a server-side responsibility. If data needs to be in the DOM for JavaScript to use, treat it as public — because it is.

---

## Write Your Own Writeup

---

**Challenge:** Module 02 — The X-Ray Machine
**Category:** Web
**Difficulty:** Easy
**Tools used:** [What panels did you use in DevTools?]

**Approach:**
[How did you approach this? What did you try first when you opened the Inspector?]

**Steps:**
1. [What you did]
2. [What you found — Part 1]
3. [What you found — Part 2]
4. [How you combined them]

**Flag:** `FLAG{inspect_beyond_the_surface}`

**What I learned:**
[What's the difference between what CSS shows you and what's actually in the DOM? When would this matter on a real site?]

---

*Good work — two techniques in one challenge. On to the next one.*

[← Back to Module](../README.md) | [Next Module: Cookies & Storage →](../../03-cookies-and-storage/README.md)
