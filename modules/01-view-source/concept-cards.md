# Module 01 Concept Card: View Source

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| HTML | HyperText Markup Language — the text format used to build webpages |
| Source code | The raw HTML file a browser receives from a server |
| Rendering | A browser turning raw HTML into the visual page you see on screen |
| HTML comment | Code inside `<!-- -->` — ignored by the browser, invisible on screen, but always in the source |
| Client-side | Code that runs in the visitor's browser (not on the server — the visitor can always see it) |

---

## Keyboard Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| View Page Source | `Ctrl+U` | `Cmd+Option+U` |
| Find in page | `Ctrl+F` | `Cmd+F` |
| Right-click → View Page Source | works on any OS | works on any OS |

---

## What an HTML Comment Looks Like

```html
<!-- This is a comment. The browser ignores it when rendering. -->

<!-- Multi-line comments work too:
     Created: 2021-03-14
     Author: admin@westfield.edu
     TODO: remove test credentials before launch
-->
```

---

## Common Mistakes

- **Searching the rendered page instead of the source.** Find-in-page (`Ctrl+F`) on the visible page only searches what's rendered — not comments or hidden elements. Open View Source first, *then* search.
- **Forgetting that View Source opens a new tab.** The source tab looks different from a normal webpage. Don't close it thinking something went wrong.
- **Only scanning the `<body>`.** Important comments are often in the `<head>` section — check both. Flags and developer notes appear anywhere.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
