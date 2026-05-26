# Hint 2

**Part 1 — Change the membership cookie:**

Open DevTools → **Application** tab → **Cookies** (left sidebar) → click the domain.

Find the cookie named `membership`. Its value is currently `basic`. Double-click the value field, type `premium`, and press Enter. Then **reload the page**. (The page reads cookies on load — the change doesn't take effect until you reload.)

**Part 2 — Decode the second cookie:**

There's a second cookie called `session_data`. Its value is a long string that ends in `=`. That's a sign it's **base64-encoded** — not encrypted, just encoded. It decodes instantly.

Open the **Console** tab and run:
```javascript
atob("paste_the_session_data_value_here")
```

Read the result carefully. It's a JSON object. One of the fields in it contains the second half of the flag.

Combine what you find on screen (Part 1) with what you decode from the cookie (Part 2).

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
