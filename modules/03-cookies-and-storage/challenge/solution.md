# Solution: Module 03 — Digital Breadcrumbs

---

> **Wait.** If you haven't spent at least 15 minutes genuinely trying, go back.
> This module introduces a technique — cookie manipulation — that appears in real security work constantly. Working through the frustration of finding it yourself is how it sticks.
>
> Already tried? Read on.

---

## The Approach

This is a **cookie manipulation + base64 decoding** challenge. The flag is split across two techniques:

1. **Client-side privilege escalation via cookie:** The page checks a `membership` cookie to decide what to show. Since this check happens in JavaScript (client-side), any visitor can change the cookie and bypass it.
2. **Base64-encoded cookie data:** A second cookie carries a base64-encoded JSON payload. It looks like noise but decodes to reveal the second flag half.

A security tester encountering a "locked" dashboard would immediately check what cookies the page sets and whether changing them has any effect. Finding a plaintext `membership=basic` cookie is an immediate red flag.

---

## Step-by-Step Solution

### Part 1: Escalate Your Membership Tier

**Step 1: Open DevTools and navigate to cookies**
Press `F12` (or `Cmd+Option+I` on Mac) to open DevTools. Click the **Application** tab. In the left sidebar, expand **Cookies** and click the domain (it may show as the file path if you're running locally, or as `localhost`).

You'll see two cookies in the table:

| Name | Value |
|------|-------|
| `membership` | `basic` |
| `session_data` | `eyJyb2xl...` (long encoded string) |

**Step 2: Change the membership cookie**
Double-click the **Value** cell next to `membership`. The cell becomes editable. Clear the text, type `premium`, and press Enter.

**Step 3: Reload the page**
Press `F5` or `Ctrl+R` (`Cmd+R` on Mac). The page runs its `checkMembership()` function on load and now reads `membership=premium` from the cookie.

The locked section opens. The Premium dashboard appears, showing:

```
FLAG{cookies_
```

That's Part 1.

---

### Part 2: Decode the Session Cookie

**Step 4: Copy the session_data value**
Still in Application → Cookies, click once on the `session_data` row to select it, then carefully copy the full value from the Value column. It looks like:

```
eyJyb2xlIjoiZ3Vlc3QiLCJzZWNyZXQiOiJhcmVfbm90X3NlY3JldHN9In0=
```

**Step 5: Decode it in the Console**
Click the **Console** tab. Type the following (replacing with the value you copied):

```javascript
atob("eyJyb2xlIjoiZ3Vlc3QiLCJzZWNyZXQiOiJhcmVfbm90X3NlY3JldHN9In0=")
```

Press Enter. The output is:

```
'{"role":"guest","secret":"are_not_secrets}"}'
```

The value of the `"secret"` key is `are_not_secrets}` — that's Part 2.

---

### Combine the Flag

- Part 1 (from the premium dashboard): `FLAG{cookies_`
- Part 2 (from the decoded session_data cookie): `are_not_secrets}`
- Combined: `FLAG{cookies_are_not_secrets}`

---

## The Flag

```
FLAG{cookies_are_not_secrets}
```

---

## Why This Works

### Part 1 — Client-side access control fails

Cookies are stored in the browser and sent to the server. A site that uses a cookie value to grant access — but only checks that value with client-side JavaScript — has no real access control. The JavaScript runs in *your* browser, on *your* machine, checking a cookie *you* control. Changing the cookie before the script runs is trivially easy.

The correct approach is server-side validation: when a request arrives, the *server* looks up the session token in a database and retrieves the user's actual role from its own records. It doesn't trust what the cookie *claims*. If the cookie says "premium" but the database says the account is "basic," access is denied. There's nothing the browser can do to override that.

In real security work, finding a plaintext role cookie like `membership=basic` is immediately suspicious. Testers change it in under a minute. If it works — that's a finding that goes directly into the report.

### Part 2 — Base64 is not encryption

Base64 encoding is a way to represent binary data (or arbitrary text) using only printable ASCII characters. It's used legitimately all the time — for transmitting images, encoding form data, and yes, formatting cookie values. But encoding is not encrypting. There is no key. Anyone who can see the string can decode it. `atob()` — "ASCII to binary" — is built into every browser.

Developers sometimes think that because base64 looks like noise, it provides some protection. It doesn't. The only thing it hides is the immediate human-readability of the value. A security tester will decode every base64 string they encounter, automatically. If your cookie payload contains sensitive data, encoding it in base64 before storing it in a cookie provides essentially zero additional security.

**The fix for Part 2:** Don't store sensitive data in cookies at all. If a cookie must carry structured data, sign it with a secret key (HMAC) so tampering is detectable — and verify that signature server-side on every request.

---

## Write Your Own Writeup

---

**Challenge:** Module 03 — Digital Breadcrumbs
**Category:** Web
**Difficulty:** Easy
**Tools used:** [Application tab, Console tab — what specifically?]

**Approach:**
[How did you know to look at cookies? What told you the access control might be client-side only?]

**Steps:**
1. [Found the cookies]
2. [Changed membership to premium]
3. [Got Part 1]
4. [Decoded session_data]
5. [Got Part 2]
6. [Combined the flag]

**Flag:** `FLAG{cookies_are_not_secrets}`

**What I learned:**
[Why is client-side cookie checking insufficient? What's the difference between base64 and encryption?]

---

*Two techniques, one challenge. On to the next one.*

[← Back to Module](../README.md) | [Next Module: HTTP Headers →](../../04-http-headers/README.md)
