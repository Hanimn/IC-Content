# Module 02 Concept Card: Browser Inspector

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| DOM | Document Object Model — the browser's live, built representation of the page after processing HTML and JS |
| DevTools | Browser developer tools (F12) — contains Elements, Console, Network, Application, and other panels |
| Elements panel | DevTools tab showing the live DOM tree; lets you read and edit every element and attribute |
| `display: none` | CSS that makes an element invisible and layout-absent — but it's still fully in the DOM |
| `visibility: hidden` | CSS that makes an element transparent while keeping its space — still in the DOM |
| `data-*` attribute | Custom HTML attribute like `data-curator="..."` — stores data, never renders visually |
| CSS | Controls presentation only — has no effect on what data exists in the page |

---

## Keyboard Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| Open DevTools | `F12` or `Ctrl+Shift+I` | `Cmd+Option+I` |
| Activate inspect cursor | `Ctrl+Shift+C` | `Cmd+Shift+C` |
| Inspect a specific element | Right-click it → **Inspect** | Right-click it → **Inspect Element** |
| Search within DOM tree | `Ctrl+F` (inside DevTools) | `Cmd+F` (inside DevTools) |

---

## Finding Hidden Elements

**Method 1 — DOM search:**
Open Elements panel → press `Ctrl+F` inside DevTools → search for `display: none` or `visibility: hidden`

**Method 2 — Inspect and check styles:**
Click any element in the DOM tree → look at the **Styles** panel on the right → see if `display: none` appears

**Method 3 — Right-click shortcut:**
Right-click any element on the visible page → "Inspect" → DevTools jumps directly to that element

---

## Reading `data-*` Attributes

Click an element in the DOM tree. The opening tag shows all its attributes:

```html
<figure data-curator="inspect_beyond" class="exhibit-image">
```

The full value of `data-curator` is visible right there — no extra steps needed.

---

## Common Mistakes

- **Editing the DOM and expecting it to save.** Changes you make in the Elements panel only affect your local browser copy. Reloading the page resets everything. This is by design — you're not changing the server.
- **Using browser find-in-page instead of DevTools search.** `Ctrl+F` on the regular page only searches visible, rendered text. You need `Ctrl+F` *inside the DevTools panel* to search the full DOM including hidden elements.
- **Only looking at visible content.** The whole point of the Inspector is that things present in the DOM don't have to be visible. Expand every node in the DOM tree — not just the ones that correspond to what you see.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
