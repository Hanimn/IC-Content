---
title: "Three Languages, One Page"
tagline: "Every webpage is three layers cooperating:"
time: ""
tier: "Security Concepts"
---
You've been looking at webpages your whole life. Login forms, news articles, video players, games, school portals — all of it lives in your browser. They look like very different things on screen. But under the hood, every single webpage in the world is built out of the same three languages, stacked on top of each other.

Once you can tell those three languages apart, the entire web stops feeling magical and starts feeling readable. That's the goal of this module.

---

## Bones, Paint, Brain

Every webpage is three layers cooperating:

- **HTML** — the **bones**. The structure of the page. What elements exist, in what order, nested how.
- **CSS** — the **paint**. How the page looks. Colours, fonts, sizes, spacing, what's hidden, what's shown.
- **JavaScript** — the **brain**. What happens when you click, type, hover, or load. The behaviour.

Bones, paint, brain. Remember that.

If a webpage was a building: HTML is the steel frame, CSS is the wallpaper and lighting, and JavaScript is the elevator that actually takes you somewhere when you press a button.

You can write a webpage with only HTML. It will work — it'll just look raw and won't do anything interactive. You can add CSS to make it pretty. You can add JavaScript to make it react. Most pages use all three.

When a CTF challenge hides a flag in a webpage, it can hide it in **any** of these three layers. If you only know how to read one, you'll miss two-thirds of the hiding places.

---

## Layer 1 — HTML: The Bones

HTML stands for **HyperText Markup Language**. The "markup" part is the important word. HTML doesn't *do* anything — it just labels what's what. It says "this part is a heading", "this part is a paragraph", "this part is a button".

It does this with **tags**. Tags wrap content in angle brackets:

```html
<p>Hello, world.</p>
<h1>This is a heading</h1>
<button>Click me</button>
```

Most tags come in pairs. An opening tag like `<p>` says "a paragraph starts here". A closing tag like `</p>` says "the paragraph ends here". The slash in the closing tag is what makes it a closing tag.

Some tags are self-closing — they don't wrap anything, they just exist:

```html
<img src="cat.png" alt="A cat">
<br>
<input type="text">
```

### Attributes

Tags can carry extra information called **attributes**. Attributes go inside the opening tag and look like `name="value"`:

```html
<a href="https://example.com">Click here</a>
<img src="logo.png" alt="Company logo">
<div class="login-box" id="main-form">...</div>
```

- `href="..."` on an `<a>` tag tells the browser where the link goes.
- `src="..."` on an `<img>` tells it which image file to load.
- `class="..."` and `id="..."` are labels CSS and JavaScript can use to find this element later. We'll come back to those.

### Nesting

Tags can sit inside other tags. This is called **nesting**, and it's how you build complex pages out of simple pieces:

```html
<div class="card">
  <h2>Welcome</h2>
  <p>This is a <strong>nested</strong> paragraph.</p>
</div>
```

That `<strong>` tag is inside the `<p>` tag, which is inside the `<div>` tag. They all close in the reverse order they opened — like nested boxes.

### HTML comments

This part matters for CTFs. HTML has **comments** — sections of code the browser completely ignores when rendering. They look like this:

```html
<!-- This is a comment. The browser will not display it. -->
```

Anything between `<!--` and `-->` is invisible on screen. But here's the key thing:

> **HTML comments are NOT in the rendered page. They ARE in the source.**

That means if you press **Ctrl+U** (or `Cmd + Option + U` on Chrome/Safari Mac, `Cmd + U` on Firefox Mac) you can read every comment the developer left in their HTML — even though none of them appear on the page itself. Developers leave all sorts of things in comments: notes to themselves, TODO reminders, old code they meant to delete. Sometimes things they really shouldn't have left behind. (For brevity the rest of this lesson just says "Ctrl+U" — substitute the Mac shortcut if that's what you have.)

Module 01 of the main series is built entirely around this idea. F13 is preparing you for it.

> **Try It — HTML sandbox.** Suppose this is the source of a page you opened with Ctrl+U:
>
> ```html
> <!DOCTYPE html>
> <html>
> <head><title>Welcome</title></head>
> <body>
>   <h1>Welcome to the demo</h1>
>   <!-- TODO: remove before launch -->
>   <!-- admin password reset URL: /admin?token=ABC123 -->
>   <p>Please log in to continue.</p>
> </body>
> </html>
> ```
>
> What do you see on the rendered page?
> What can you find in the source that the rendered page doesn't show?
>
> ---
>
> Rendered: `Welcome to the demo` (h1) and `Please log in to continue.` (p). Two lines of text, nothing else.
> Source: those plus two HTML comments. The first is a harmless TODO. The second is the kind of comment that ends careers.

---

## Layer 2 — CSS: The Paint

HTML alone gives you ugly grey text on a white background. **CSS** (**Cascading Style Sheets**) is what makes the web look like the web.

CSS works by **selecting** elements and giving them **styles**. A CSS rule has two parts:

```css
selector {
  property: value;
  property: value;
}
```

Here are three real rules:

```css
p {
  color: red;
  font-size: 18px;
}

.login {
  background: blue;
  padding: 20px;
}

#title {
  font-size: 32px;
  text-align: center;
}
```

Let's read those.

- **`p { ... }`** — selects every `<p>` tag on the page.
- **`.login { ... }`** — the dot means "class". This selects every element with `class="login"`.
- **`#title { ... }`** — the hash means "id". This selects the (one and only) element with `id="title"`.

Inside the curly braces are **properties** like `color`, `font-size`, `background`, `padding`. Each one controls one aspect of how the element looks.

### Where CSS lives

CSS can sit in three places:

1. Inside a `<style>` tag at the top of an HTML file (most common in small pages and CTF challenges).
2. In a separate `.css` file linked from the HTML with `<link rel="stylesheet" href="styles.css">`.
3. Directly on an element using a `style="..."` attribute (called "inline" CSS).

When you press **Ctrl+U** on a CTF page, the `<style>` block is right there in the source for you to read.

### CSS can hide things

This is the security-relevant part. CSS has several ways to make text invisible — but the text is still in the page. It's just hidden visually.

```css
.secret {
  display: none;          /* completely removed from layout */
}

.also-secret {
  visibility: hidden;     /* takes up space but you can't see it */
}

.white-on-white {
  color: white;
  background: white;      /* readable text — wrong colour */
}

.off-screen {
  position: absolute;
  left: -9999px;          /* pushed off the side of the screen */
}
```

All four of these tricks make content invisible on the rendered page, but the content is still in the HTML source. Press Ctrl+U and you'll see it. CTF challenges love these tricks.

### CSS comments

CSS has comments too, but they look different from HTML comments:

```css
/* This is a CSS comment. It only works inside CSS. */
```

You can't use `<!-- -->` in CSS, and you can't use `/* */` in HTML. Each language has its own comment syntax. Remember that — it'll come up in the challenge.

### Pseudo-elements and `content:`

One more CSS trick worth knowing. CSS has things called **pseudo-elements**, written with two colons: `::before` and `::after`. They let CSS *create* content that wasn't in the HTML at all. The most common way is the `content:` property:

```css
.warning::before {
  content: "WARNING: ";
  color: red;
}
```

That rule says: before every element with class `warning`, insert the text "WARNING: " in red. The text "WARNING: " doesn't exist anywhere in the HTML — it's invented by CSS at render time.

This means **CSS can contain text that View Source on the HTML alone wouldn't reveal**. You have to also read the `<style>` block. The challenge in this module uses this trick.

> **Try It — CSS sandbox.** Source of another page:
>
> ```html
> <!DOCTYPE html>
> <html>
> <head>
> <style>
>   .label::before { content: "VIP-"; }
>   .secret { display: none; }
>   .ghost::before { content: "FLAG{the_paint_speaks}"; opacity: 0.01; }
> </style>
> </head>
> <body>
>   <div class="label">Visitor</div>
>   <div class="secret">backup admin code: 4982</div>
>   <span class="ghost"></span>
> </body>
> </html>
> ```
>
> What does the kid SEE on the rendered page? What's actually IN the source?
>
> ---
>
> Rendered: `VIP-Visitor` (the `::before` adds the prefix). Nothing else — `.secret` is hidden by `display: none`, and `.ghost`'s content is so transparent (opacity 0.01) it's invisible.
> Source: the visible text PLUS the `backup admin code: 4982` (it's in the HTML, just hidden), PLUS the `FLAG{the_paint_speaks}` literal in the CSS itself. **None of those would show up if you only looked at the rendered page or only Ctrl+F'd it.**
> The whole point of this lesson: each layer can hide something the others can't reveal.

---

## Layer 3 — JavaScript: The Brain

HTML is structure. CSS is appearance. **JavaScript** (often shortened to **JS**) is what makes a page *do* things. It runs when the page loads, and it can run again whenever something happens — a click, a key press, a timer firing.

Here's the smallest useful JS snippet:

```javascript
let secret = "abc123";
console.log(secret);
```

Two lines. Let's read them.

- `let secret = "abc123";` — this creates a **variable** called `secret` and gives it the value `"abc123"`. Variables are named boxes that hold values.
- `console.log(secret);` — this prints the variable's value to the developer console (which we'll meet properly in Module 02).

### Functions

Code that does a specific job is wrapped in a **function**:

```javascript
function reveal() {
  document.body.style.background = "yellow";
}
```

That defines a function called `reveal` that, if you call it, turns the page's background yellow. Defining the function alone doesn't do anything — somebody has to actually call `reveal()` to run it.

### Event listeners

JS becomes interactive through **event listeners**. An event listener says "when X happens, run Y":

```javascript
const button = document.getElementById('myButton');
button.addEventListener('click', function() {
  console.log("The button was clicked!");
});
```

Reading that:

1. Get the element with `id="myButton"`. Call it `button`.
2. Tell `button` to listen for `click` events.
3. When a click happens, run this function — which logs a message.

This is the pattern almost every interactive page uses. A CTF challenge might define a flag *only after* a button is clicked — meaning if you don't click the button, the flag isn't there yet. Or the flag value might be assigned inside the click handler, hidden from you until you trigger the event.

### Where JS lives

Like CSS, JS can sit in a `<script>` tag inside the HTML, or be loaded from a separate `.js` file. In CTF challenges, it's almost always right there in a `<script>` block, readable in View Source.

### JS comments

JavaScript has two comment styles:

```javascript
// Single-line comment — everything after the // is ignored
let x = 5;  // can also go at the end of a line

/* Multi-line comment.
   Useful for longer notes
   or temporarily disabling code. */
```

Same `/* */` syntax as CSS, plus the `//` shortcut for single lines.

> **Try It — JS sandbox.** One more source listing:
>
> ```html
> <!DOCTYPE html>
> <html>
> <body>
>   <h1>Coming soon</h1>
>   <script>
>     // dev note: don't ship this
>     const ADMIN_TOKEN = "T0K3N_dev_only_4982";
>     /* The launch flag for QA:
>        FLAG{js_holds_secrets_too} */
>     console.log("Page loaded.");
>   </script>
> </body>
> </html>
> ```
>
> What does the kid see on the rendered page? What does Ctrl+U show?
>
> ---
>
> Rendered: just `Coming soon`. The `<script>` block doesn't render anything visible — `console.log` writes to the dev console (which the kid would only see in DevTools), and the rest is comments and a const that nothing displays.
> Source: everything above. Both the admin token and the FLAG are sitting plainly in the script, readable to anyone who hits Ctrl+U.
>
> Three sandboxes. Three layers. Three places a flag could hide. The challenge below uses *all three* — one fragment per layer.

---

## The DOM — Why Source and Page Can Disagree

There's one more concept you need before the challenge. It's called the **DOM** — the **Document Object Model**.

When the browser loads a page, it doesn't just render the HTML once and forget about it. It builds a **live tree** of all the elements in memory. JavaScript can read that tree and change it on the fly: add new elements, remove old ones, change text, change colours, move things around.

This means:

> **What View Source shows you may differ from what the page currently looks like.**

View Source shows the *original* HTML the server sent. The DOM shows the *current* state, including everything JavaScript has changed since the page loaded. They're often the same. But on dynamic sites, they can be very different.

In this lesson you'll be using **View Source (Ctrl+U)** because it shows you what the server actually sent — and that's where every fragment of this challenge lives. **DevTools** (`F12` on Win/Linux/Chromebook, `Cmd + Option + I` on Mac) is a separate, more powerful tool that lets you inspect the *live* DOM and watch JavaScript reshape the page in real time. We'll go deep on DevTools in the main web series — Module 02 is built around it. If you already know F12, that's great; you'll use it constantly. For *this* challenge, View Source alone is enough, because all three fragments are baked into the source the server sends. Save the DevTools muscle for when the page is doing something at runtime that View Source can't see.

---

## Why This Matters for Security

All three layers can hide secrets. A real CTF challenge — or a real-world security oversight — could put a flag, a password, or an internal URL in any of them:

**Hidden in HTML:**
- Inside an HTML comment (`<!-- FLAG{...} -->`)
- In a hidden input: `<input type="hidden" value="...">`
- As an attribute on an unused element: `<div data-secret="...">`

**Hidden in CSS:**
- Text revealed by `content:` on a `::before` or `::after` pseudo-element
- An element that has the secret in it but is marked `display: none`
- Text that's the same colour as the background
- Content positioned off-screen with `left: -9999px`

**Hidden in JavaScript:**
- A variable holding the flag: `let flag = "FLAG{...}"`
- A function that builds the flag from pieces
- A flag that's only assigned after a specific event (a click, a delay, a key press)
- A flag stored inside a comment in the script

A skilled attacker reads all three layers as a matter of routine. After this module, so can you.

---

## Quick Reference — Three Comment Syntaxes

This catches everyone the first time. Each language has its own comment syntax, and they don't interchange:

| Language | Comment syntax |
|---|---|
| HTML | `<!-- this is a comment -->` |
| CSS | `/* this is a comment */` |
| JavaScript | `// single-line` &nbsp;or&nbsp; `/* multi-line */` |

If you see `<!--` you know you're looking at HTML. If you see `/* */` it could be CSS or JS — context (a `<style>` block vs a `<script>` block) tells you which.

---

## Your Challenge

Open [`challenge/index.html`](challenge/index.html) in your browser. The challenge is called **Layers**.

You'll see a page that looks innocent — a "Welcome to Layered Labs" landing page describing HTML, CSS, and JavaScript. Beneath the friendly surface, the flag is **split into three pieces**, one buried in each language.

To assemble the full flag, you'll need to:

1. Press **Ctrl+U** to open the page source in a new tab.
2. Read the HTML comments at the top of the page — find Fragment 1.
3. Scroll down to the `<style>` block — find Fragment 2 inside a CSS rule.
4. Scroll down to the `<script>` block — find Fragment 3 in a JavaScript variable.
5. Concatenate them in order and submit the full flag in the box at the bottom of the page.

The fragments will fit together to form a flag of the shape `FLAG{...}`.

**Tools:** **View Source** (Ctrl+U) is the right tool here — every fragment is in the source the server sends, so the live-DOM view DevTools provides isn't needed. If you happen to already know DevTools and open it instead, that's fine — you'll see the same fragments. The lesson uses View Source because it's the simplest path to the answer for a kid who's brand new to web inspection.

---

## Concept Card

Review [`concept-cards.md`](concept-cards.md) any time a tag, selector, or syntax feels unclear.

---

## Keep Going

Once you've captured this flag, you're ready for the main web series:

- **Phase 1 Module 01 — View Source** — practises HTML comment hunting on a single-layer page. You're already prepared after F13.
- **Phase 1 Module 02 — The X-Ray Machine** — introduces DevTools and the live DOM. The DOM section above is exactly what makes this module click.
- Every Web CTF challenge from this point forward assumes you can read all three languages. You can.

[← F12 — The Computer's Notebook](../F12-computer-notebook/README.md) | [Foundation Track](../README.md) | [Next: F14 →](../F14-one-way-door/README.md)
