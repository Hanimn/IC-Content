# Solution — The Envelope, Not the Letter

**Flag:** `FLAG{network_tab_reveals_all}`

---

## Before You Begin

This challenge requires a real HTTP server. If you're reading a static file, go back and start the server first:

```bash
cd modules/04-http-headers/challenge
python3 -m http.server 8080
```

Then visit **`http://localhost:8080`** in your browser — not `file://`.

---

## The Approach

The page makes two HTTP requests when it loads: one for itself, and one for a background data file called `secret.json`. The flag's second half is inside that JSON response — but the page intentionally doesn't display it on screen. The only way to see the full response is to watch it happen in the Network tab.

---

## Step-by-Step

### Part 1 — Confirm the server is running

1. With `python3 -m http.server 8080` running, visit `http://localhost:8080`
2. The Nexus Systems staging page loads
3. In the **Security Audit — Reference** panel, you'll see the first half of the flag displayed directly:

   ```
   FLAG{network_tab_
   ```

   This confirms the server is running and you're at the right place.

---

### Part 2 — Find the hidden JSON data

4. Open DevTools — press **F12** (Windows/Linux) or **Cmd+Option+I** (Mac)
5. Click the **Network** tab
6. **Reload the page** (F5 or Cmd+R) — the Network tab only records requests made while it's open

7. You'll now see at least two requests in the list:
   - `localhost` (or `index.html`) — the main page
   - `secret.json` — a background data fetch

8. Click **`secret.json`** in the list

9. In the right panel, click the **Preview** or **Response** subtab (not Headers)

10. You'll see the full JSON the server returned:

    ```json
    {
      "status": "operational",
      "version": "0.4.2-staging",
      "data": "cmV2ZWFsc19hbGx9",
      "last_updated": "2024-08-14T09:22:00Z"
    }
    ```

    The page only displayed `status` and `version`. The `data` field was silently ignored — but it's right there in the response.

11. That `data` value looks like random characters, but it's base64. Open the **Console** tab and run:

    ```javascript
    atob("cmV2ZWFsc19hbGx9")
    ```

    Output: `reveals_all}`

---

### Combine the parts

```
Part 1:  FLAG{network_tab_
Part 2:  reveals_all}
──────────────────────────
Flag:    FLAG{network_tab_reveals_all}
```

---

## Bonus: Check the Headers Tab

While you have `secret.json` selected in the Network tab, click the **Headers** subtab. Scroll down to the **Response Headers** section. You'll see something like:

```
Server: SimpleHTTP/0.6 Python/3.x.x
```

In a real pentest, this is an **information disclosure finding** — the server is advertising exactly what software it's running, including the version. An attacker can look up known vulnerabilities for that exact version. A hardened server either removes the `Server` header or replaces it with a generic value.

---

## Why This Works

HTTP is a transparent protocol. Every request your browser makes — including background `fetch()` calls from JavaScript — is a real HTTP transaction with a full request and response. The Network tab is a real-time log of all of them.

Developers sometimes fetch sensitive data via JavaScript and assume "it's not displayed on screen" means "it's hidden." It isn't. Anyone with DevTools can see every fetch request, every response body, and every header. The Network tab is always watching.

Base64 looks like encryption but requires no key. It's a data encoding format — one call to `atob()` in the browser console is all it takes to reverse it.

---

## Defender Fix

The real vulnerability here is that `secret.json` is publicly accessible without any authentication. Any visitor — not just the developer's JavaScript — can request it directly by typing the URL. Try it: visit `http://localhost:8080/secret.json` directly in your address bar.

**What should be done instead:**
- API endpoints that return sensitive data should require authentication (tokens, session cookies verified server-side)
- Don't assume that "the URL isn't linked anywhere" is protection — it isn't (this is called security through obscurity, and it doesn't work)
- Sensitive fields in API responses should only be included when the authenticated user has permission to see them

---

## Write Your Own Writeup

A good CTF writeup explains your reasoning, not just the steps. Try answering:

1. What clued you in that the page was making more than one request?
2. What's the difference between the Preview/Response subtab and the Headers subtab in the Network panel?
3. Why did the page fail (or behave differently) when you opened it as `file://` instead of `http://localhost:8080`?
4. If you were the developer who built this staging server, what's one change you'd make before deploying it to production?

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Next Module →](../../05-robots-txt/README.md)*
