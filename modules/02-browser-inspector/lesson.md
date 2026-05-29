---
title: "The X-Ray Machine"
tagline: "View Source shows you what the server sent. The Inspector shows you what's actually there right now — and the difference is where security flaws hide."
time: "~30 min reading + ~25 min challenge"
tier: "Tier 1: Discovery"
---
## See the bones of any webpage.

**Time:** ~30 min reading + ~25 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

In Module 01, you learned to see what a server sent — the raw HTML as it arrived, frozen at the moment of delivery. That was powerful. But it's only half the picture.

By the time you see a webpage, the browser has already done a lot of work. It parsed the HTML, built a structure out of it, ran any JavaScript, applied styles. What's on your screen isn't the raw file anymore — it's a living, constructed thing. And the tool for examining that living thing isn't View Source. It's the Inspector.

Think of it this way: View Source shows you the architectural blueprints. The Inspector shows you the actual building — and hands you a set of tools to reach in and move the walls.

This matters more than it might seem. Developers don't just hide things in comments. They hide things by making them invisible: text the same color as the background, elements set to not display, data tucked into attributes that never appear on screen. All of it is in the page. All of it is in the Inspector. And with a few clicks, all of it can be revealed.

---

## The Concept

### View Source vs. the Inspector — What's the Difference?

You might wonder: if View Source already shows you the HTML, why do you need the Inspector?

The answer is that they show you different things.

**View Source** shows you the HTML file exactly as the server sent it — before the browser touched it. It's a frozen snapshot. If JavaScript later modifies the page (adds elements, changes text, loads content dynamically), View Source won't show those changes. It shows the original.

**The Inspector** (the Elements panel in DevTools) shows you the *live DOM* — the Document Object Model, which is the browser's internal representation of the page after all processing. It updates in real time. It shows the page as it actually is right now, including anything JavaScript added or changed. And unlike View Source, you can interact with it: expand nodes, edit content, change styles — all without reloading the page.

The analogy: View Source is the blueprint a contractor receives. The Inspector is the actual building once it's been constructed — and it comes with a set of tools for poking at the walls.

For this module, you'll mostly use the Inspector the same way you used View Source in Module 01: looking for things that are present but hidden. The difference is *how* they're hidden.

### CSS Hiding Tricks

CSS is the language that controls how a page looks. Developers can use it to make elements present in the DOM but invisible to visitors. Three common techniques:

**`display: none`** — The element exists in the DOM but is completely removed from the visual layout. It takes up no space and renders nothing. From a visitor's perspective, it doesn't exist. From the Inspector's perspective, it's right there.

```css
.secret-panel {
  display: none;  /* invisible, but in the DOM */
}
```

**`visibility: hidden`** — The element exists and takes up space in the layout, but is transparent — nothing is drawn. Less common for hiding sensitive content, more common for animation effects.

```css
.placeholder {
  visibility: hidden;  /* space is reserved, but nothing shows */
}
```

**Color camouflage** — Text the same color as the background. White text on a white background is completely invisible to the naked eye. One second in the Inspector reveals it.

```css
.invisible-text {
  color: #ffffff;
  background: #ffffff;  /* white on white — looks empty, isn't */
}
```

All three of these are invisible on screen. All three are immediately readable in the Inspector. You can find them, read their content, and even undo the hiding (change `display: none` to `display: block`, for example) with a double-click.

### `data-*` Attributes

HTML elements can carry arbitrary data in *data attributes* — custom attributes that start with `data-` followed by any name you choose.

```html
<figure data-curator="left half of a secret" data-id="42">
  <img src="painting.jpg" alt="Landscape">
  <figcaption>Untitled, 1887</figcaption>
</figure>
```

The `data-curator` attribute never appears on screen. There's no CSS rule for it, no JavaScript that displays it, nothing that would show a visitor it exists. But it's fully readable in the Inspector — just click the element and look at its attributes in the DOM tree.

Developers use `data-*` attributes legitimately all the time: storing IDs, configuration values, state information for JavaScript to read. The problem arises when someone stores something sensitive there, assuming "it's not visible so it's not accessible." The Inspector is always accessible.

### In Practice

Here's a snippet from a fictional library catalog site:

```html
<!-- Museum Archive — Collections Database -->
<section class="gallery-items">
  <article class="exhibit" data-internal-ref="EXH-2019-114">
    <h3>The Weaver's Cottage</h3>
    <p>Oil on canvas, 1923. Acquired 2019.</p>
  </article>

  <!-- Curator's working note — not ready for public -->
  <div class="curator-draft" style="display: none;">
    <p>Provenance under review — do not display until authentication complete.</p>
  </div>
</section>
```

On screen, visitors see the exhibit card with its title and description. The curator's note is invisible. But in the Inspector, you'd see the `div.curator-draft` sitting right below the exhibit — and a glance at the `article` tag's attributes would show `data-internal-ref="EXH-2019-114"`.

### Why This Matters (and Why It's a Vulnerability)

CSS is a *presentation layer*. It controls how things look. It has no power over what exists in the page or what gets sent to the browser. An element with `display: none` is still transmitted to every visitor. A `data-*` attribute with sensitive content is transmitted to every visitor.

A developer who hides a price field, a user role, an admin button, or an access token with CSS has not protected it — they've just made it less obvious. The Inspector makes it trivially readable in seconds.

In real-world security testing, inspecting hidden elements is one of the first things a penetration tester does. Real findings have included: hidden "admin" buttons that, when un-hidden and clicked, actually worked; pricing tiers stored in `data-*` attributes that could be read and submitted instead of the real price; user role flags like `data-role="guest"` that could be changed in the DOM (though changing the DOM never changes what the server trusts — that's a lesson for a later module).

CSS does not equal security. Never use it as one.

---

## Guided Walkthrough

Let's practice on Wikipedia — a dense, real site with plenty of elements to explore.

**Step 1: Open a Wikipedia article**
Go to `https://en.wikipedia.org/wiki/Internet` in your browser. You'll see a long article with many sections.

**Step 2: Open DevTools**
- **Windows / Linux:** Press `F12` or `Ctrl+Shift+I`
- **Mac:** Press `Cmd+Option+I`
- **Alternative:** Right-click anywhere on the page → "Inspect" or "Inspect Element"

DevTools opens. It may dock to the bottom or the side. The **Elements** tab should be selected by default — if not, click it.

**Step 3: Orient yourself**
The Elements panel has two main areas:
- **Left (DOM tree):** The live HTML structure of the page. You can expand and collapse nodes using the arrow (▶) on the left.
- **Right (Styles panel):** The CSS rules applied to whatever element is currently selected.

**Step 4: Select an element by clicking it on the page**
Click the inspect cursor icon — it looks like a cursor with a box around it, in the top-left of the DevTools toolbar. Now hover over different parts of the Wikipedia page and watch the DOM tree highlight the corresponding element. Click on the page title — the DOM tree jumps to and highlights the `<h1>` element for it.

**Step 5: Edit an element (just to see how it works)**
In the DOM tree, double-click on the text content inside the `<h1>` — it becomes editable. Type something and press Enter. The page title changes on your screen. Notice: this is *only on your screen*. No one else sees this. Nothing was sent to Wikipedia's server. When you reload the page, it goes back to normal.

This is what editing the DOM means: you're changing your local, in-browser copy of the page. The server's copy is untouched.

**Step 6: Find a hidden element**
Press `Ctrl+F` inside the DevTools panel (not the browser's usual find — the DevTools has its own search). Type `display: none` and see if any elements in the DOM tree match. Wikipedia almost certainly has some — navigation elements, tooltips, or UI components that are hidden until needed.

**Step 7: Try right-click → Inspect**
Close DevTools, then right-click on any specific word or image on the Wikipedia page and choose "Inspect" (Chrome) or "Inspect Element" (Firefox). DevTools reopens directly focused on that element in the DOM tree. This is the fastest way to jump straight to a specific element.

---

## Your Challenge

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

The Harrington Museum launched a digital archive of its collection last year. One of the curators was still working on internal notes and accidentally left something behind in the page — a message that was never meant to be public. It doesn't appear anywhere on screen. You can't find it with View Source alone.

Open the Inspector and look deeper. The flag is split across two hidden locations. You'll need to find both halves and combine them.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find both hidden pieces of the flag using DevTools and combine them.

**Rules:**
- Use the Elements panel in DevTools — no other tools needed
- Try for at least 10 minutes before opening a hint
- Don't look at the file in a text editor — open it in a browser

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

There's content on this page that isn't shown on screen — but it's present in the DOM. View Source from Module 01 would show you the raw HTML. The Inspector shows you the live structure, element by element.

Open DevTools (F12) and look through the Elements panel. The flag is in two pieces. Think about the CSS tricks covered in the lesson: what are the different ways an element can be present in the DOM but invisible on screen?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Two specific things to look for in the Elements panel:

1. **An element with `display: none`** — select elements in the DOM tree and check the right-hand Styles panel. One element that looks structural (not obviously named "hidden" or "flag") is set to `display: none`. Its text content holds the first half.

2. **A `data-*` attribute on a visible element** — click through the visible elements in the DOM tree and look at their opening tags in the HTML. One decorative element has a `data-curator` attribute that doesn't display anywhere on screen. That attribute holds the second half.

Combine the two halves to get the full flag.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete step-by-step walkthrough.

</details>

---

## Concept Card

### Key Terms

| Term | What It Means |
|------|---------------|
| DOM | Document Object Model — the browser's live internal representation of the page, built from HTML |
| DevTools | Browser developer tools — opened with F12; contains Elements, Console, Network, and other panels |
| Elements panel | The DevTools tab showing the live DOM tree; lets you inspect and edit every element on the page |
| `display: none` | A CSS property that makes an element invisible and removes it from the layout — but it's still in the DOM |
| `data-*` attribute | A custom HTML attribute (e.g., `data-curator="..."`) for storing extra information — never rendered visually |
| CSS | Cascading Style Sheets — controls how HTML elements look; has no power over what data is present |

### Keyboard Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Inspect element (mode) | `Ctrl+Shift+C` | `Cmd+Shift+C` |
| Inspect specific element | Right-click → Inspect | Right-click → Inspect Element |
| Search in DOM tree | `Ctrl+F` inside DevTools | `Cmd+F` inside DevTools |

### How to Find `display: none` Elements

1. Open Elements panel
2. Use DOM search (`Ctrl+F` inside DevTools) and type `display: none`
3. Or: click elements one by one and check the Styles panel on the right

### How to Read `data-*` Attributes

In the DOM tree, click any element. Look at the opening tag in the HTML — attributes appear after the tag name:
```html
<figure data-curator="flag_half_two" class="exhibit-image">
```
The full attribute value is visible directly in the DOM.

---

## Keep Going

**Practice this skill on:**
- [picoCTF Gym](https://play.picoctf.org/practice) — search for "inspector" tagged web challenges
- [HackThisSite](https://www.hackthissite.org/missions/basic/) — Basic missions 5 and 6 involve page inspection

**Next module:** [Module 03 — Cookies & Storage](../03-cookies-and-storage/README.md) — you'll use the Application panel in DevTools to read and modify cookies, which control things like whether you're logged in.

**Extension challenge (optional):** Open any website you use regularly in DevTools. Search the DOM for `display: none` and list what you find — navigation menus, modals, tooltips, and cookie banners are common. Then check 5 visible elements for `data-*` attributes. What information do sites store there?

---

[← Module 01: View Source](../01-view-source/README.md) | [Back to Series](../../README.md) | [Next Module: Cookies & Storage →](../03-cookies-and-storage/README.md)
