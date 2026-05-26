# F04 Challenge — Solution

## Flag

```
FLAG{200_ok_youre_in}
```

---

## Part 1 — The Matchups

| Situation | Correct Code | Reasoning |
|-----------|-------------|-----------|
| "Page loaded perfectly, server sent back HTML" | **200** | 2xx = success. 200 is the standard response for a successful GET request. |
| "Moved to new domain, will work forever" | **301** | 3xx = redirect. 301 = *permanent* — browsers cache this and will always go to the new URL. |
| "After login form, only until session expires" | **302** | 3xx = redirect. 302 = *temporary* — not cached, used for Post/Redirect/Get after form submissions. |
| "/admin, not allowed in" | **403** | 4xx = client-side issue. 403 = Forbidden — the server knows you're there and explicitly refuses. Different from 404, which says "nothing here." |
| "Link from old post, page was deleted" | **404** | 4xx = client-side issue. 404 = Not Found — the resource no longer exists at that URL. |
| "Long string crashed the server" | **500** | 5xx = server error. 500 = Internal Server Error — the server failed to handle your request. |

---

## Part 2 — Finding the Flag

After matching all six correctly, the page shows a success message that tells you the flag is in the source — but not visible on screen.

**Steps:**

1. Press **Ctrl+U** (Windows/Linux) or **Cmd+Option+U** (Mac)
2. A new browser tab opens showing the raw HTML source of the page
3. Press **Ctrl+F** and search for: `flag`
4. You'll find it in a JavaScript comment near the top of the `<script>` block:

```javascript
// CHALLENGE COMPLETE
// If you found this by reading the source — you're ready for Module 01.
// Flag: FLAG{200_ok_youre_in}
```

The flag was there the whole time — the browser just never rendered it. It lived in a JS comment in the source.

---

## Why This Matters

The server returned **200** for this page. That means "here is everything I have." Everything includes:

- The visible page content
- HTML comments (`<!-- like this -->`)
- JavaScript comments (`// and // this`)
- Hidden form fields
- Script contents
- Metadata

The browser renders a polished view. The source tells the full story.

This is the exact technique taught in **Module 01** of the main series — View Source. This challenge was designed to plant that seed: the flag was accessible the whole time, because the server sent a 200.

Status codes don't just tell you whether a request succeeded. They tell you *what's available*. A 200 means everything in the source is yours to read.
