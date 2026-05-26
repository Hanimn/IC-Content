# Hint 2

Open DevTools with **F12** (or **Cmd+Option+I** on Mac) and go to the **Elements** panel.

There are two specific things to look for:

**Part 1 — a hidden element:**
Scan the DOM tree for an element that doesn't correspond to anything on screen. It might have `display: none` set in its styles. Click elements in the DOM tree and check the Styles panel on the right — if you see `display: none`, you've found something worth reading. Look at the element's *text content*, not just its tag.

**Part 2 — a data attribute:**
Click through the visible elements (especially image or figure elements) and look at their opening tags in the DOM tree. One of them has a `data-curator` attribute that doesn't appear anywhere on the rendered page. The full value is visible right there in the tag.

Combine both pieces to get the complete flag.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
