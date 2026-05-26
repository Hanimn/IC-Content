# Hint 2

You're in View Source. Now you need to know exactly where each of the three fragments lives. Here is a guided tour — one fragment per layer.

---

## Fragment 1 — HTML (the bones)

Look near the very top of the source, inside the `<head>` section. There's an HTML comment that starts with `<!--` and ends with `-->`. Inside is the first piece of the flag, written in plain text.

Remember:

```html
<!-- this is an HTML comment -->
```

Browsers don't render comments, but View Source shows them. Search the source for `Fragment 1`.

---

## Fragment 2 — CSS (the paint)

Scroll down to the `<style>` block. Inside the style block, look for a CSS rule that uses `content:` on a `::before` pseudo-element. The value of `content:` is a string in quotes — that string is the second fragment of the flag.

The CSS rule looks something like:

```css
.something::before {
  content: "????????";
}
```

Why isn't this fragment visible on the page? Because the element it attaches to is also styled with `display: none` — so the browser never draws it. The text only exists in the CSS source. Search the source for `::before` or `content:` to find it fast.

---

## Fragment 3 — JavaScript (the brain)

Scroll further to the `<script>` block at the bottom of the file. Find the click handler that's attached to the "Arm fragment 3" button. Inside that handler, there's a line that assigns a string to a variable called `flagPart3`. That string is the third fragment.

The line looks like:

```javascript
flagPart3 = "????????";
```

You don't actually need to click the button to read the value — once you can see the source, you can just read what the click handler will assign. Search the source for `flagPart3 =`.

---

## Putting it together

The fragments are in the source in this order:

1. HTML comment in `<head>` — starts with `FLAG{`
2. CSS `content:` value — middle piece, ends with an underscore
3. JavaScript variable assignment — ends with `}`

Concatenate them in that order with no spaces between, and you have the full flag. Type it into the submission box at the bottom of the page and press Submit.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
