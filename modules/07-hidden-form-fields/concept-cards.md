# Module 07 Concept Card: Hidden Form Fields

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| `<input type="hidden">` | A form input that submits data without displaying anything on screen |
| Form submission | When submitted, all inputs — including hidden ones — are sent as `name=value` pairs |
| Parameter tampering | Modifying submitted values to change what the server receives |
| Client-side trust | Trusting data from the browser without server-side verification — a vulnerability |
| DOM | The live, editable structure of a page — includes all elements, hidden or not |

---

## What a Hidden Field Looks Like

```html
<!-- In the page source / DOM: -->
<input type="hidden" name="price" value="4999">
<input type="hidden" name="role"  value="customer">

<!-- What gets submitted when the form is sent: -->
price=4999&role=customer
```

You see nothing on screen. The DOM has the element. You can edit it.

---

## Finding Hidden Inputs in DevTools

```
F12  →  Elements tab  →  Ctrl+F (search)
Type: type="hidden"
→ Highlights every hidden input in the page
```

---

## Editing a Hidden Input

```
1. Find <input type="hidden" name="..." value="..."> in the Elements panel
2. Double-click the value="..." attribute
3. Type the new value
4. Press Enter  ← critical — the change won't stick without this
5. Submit the form
```

---

## `type="hidden"` vs `display:none` — Not the Same

| | `type="hidden"` | `display:none` |
|---|---|---|
| **What it is** | An input field | A CSS style rule |
| **Renders on screen?** | Never | No, but takes DOM space |
| **Submits with form?** | Yes — always | Only if it's an input |
| **How to find it** | Search DOM for `type="hidden"` | Look for CSS `display:none` in styles panel |

---

## Common Mistakes

- **Editing the visible price label** — that's a `<p>` tag, not a form input. It doesn't affect submission.
- **Forgetting to press Enter** after editing — the value won't update.
- **Not resubmitting** — you must submit the form again after editing for the change to take effect.
- **Thinking hidden = protected** — it isn't. Any DOM element is readable and editable in DevTools.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
