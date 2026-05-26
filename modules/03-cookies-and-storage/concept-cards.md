# Module 03 Concept Card: Cookies & Storage

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| Cookie | A name=value pair stored in your browser; sent automatically to the server on every request to that domain |
| Session cookie | No expiry date — deleted when the browser closes |
| Persistent cookie | Has an expiry date — survives across browser sessions |
| Base64 | A reversible text *encoding* (not encryption) — looks scrambled but decodes instantly with no key |
| `HttpOnly` flag | Cookie cannot be read by JavaScript; still sent automatically by the browser to the server |
| `Secure` flag | Cookie only sent over HTTPS, never over plain HTTP |
| `document.cookie` | JavaScript property that reads all non-HttpOnly cookies as a `name=value; name=value` string |

---

## Navigating to Cookies in DevTools

```
F12 → Application tab → Cookies (left sidebar) → click the domain
```

If you don't see Application, click the `»` overflow button in the DevTools tab bar.

---

## Key Actions

| Action | How |
|--------|-----|
| Read all cookies | Application → Cookies → domain |
| Read non-HttpOnly cookies via JS | Console: `document.cookie` |
| Edit a cookie value | Double-click the **Value** cell in the cookies table |
| Delete a cookie | Right-click the row → Delete |
| Set a cookie from Console | `document.cookie = "name=value; path=/"` |

---

## Base64 Quick Reference

```javascript
// Decode base64 → readable text
atob("eyJyb2xlIjoiZ3Vlc3QifQ==")
// → '{"role":"guest"}'

// Encode readable text → base64
btoa('{"role":"admin"}')
// → "eyJyb2xlIjoiYWRtaW4ifQ=="
```

**How to spot base64:**
- Only uses `A–Z`, `a–z`, `0–9`, `+`, `/`
- Often ends with `=` or `==`
- Length is a multiple of 4 characters

---

## Common Mistakes

- **Changing the cookie but not reloading.** The page reads cookies on load. Edit the cookie in the Application tab, *then* reload — changes only take effect on the next page load.
- **Confusing base64 with encryption.** Base64 requires no key to decode. Anyone with `atob()` can read it. It's encoding for compatibility, not security.
- **Forgetting that HttpOnly cookies still exist.** `document.cookie` only shows non-HttpOnly cookies. The Application tab shows all of them — use it when you need the full picture.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
