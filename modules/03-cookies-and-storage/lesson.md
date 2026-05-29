---
title: "Digital Breadcrumbs"
tagline: "### What Are Cookies?"
time: "~30 min reading + ~25 min challenge"
tier: "Tier 1: Discovery"
---
## Every visit leaves a trace — and that trace can be changed.

**Time:** ~30 min reading + ~25 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

When you walk into a library and borrow a book, the librarian gives you a membership card. You keep it in your wallet. Next time you visit, you show the card — the librarian knows who you are without asking for your name again. You don't need to prove your identity from scratch on every visit. The card does it for you.

Websites work the same way. When you log in, the server gives your browser a small piece of text to remember — a *cookie*. Your browser stores it and sends it back automatically with every future request to that site. "Hi, I'm still me. Here's the note you gave me." The server reads the note and knows who's asking.

The problem with this system is exactly what you'd expect: your browser keeps that note in *your* wallet. And unlike a physical wallet, you can open it, read every note inside, change what they say, and add new ones. If the website trusts the note without verifying it, you control what the note says — and therefore what the website thinks you are.

Real-world hook: security researchers regularly find sites that store user roles in plain cookies. A cookie named `isAdmin` with the value `false` is an invitation. Change it to `true`, reload the page, and you're an admin. No password. No special tools. Just the Application tab.

---

## The Concept

### What Are Cookies?

A cookie is a small piece of text — a name and a value — that a server asks your browser to store. Your browser saves it and sends it back automatically on every subsequent request to that domain. That's it. That's the whole system.

```
Cookie: membership=basic; session_id=a3f9c1
```

There are two broad types:

**Session cookies** expire when you close the browser. They typically hold short-lived state like "you're currently logged in." They have no expiry date set.

**Persistent cookies** have an expiry date — they stick around across browser sessions. Preferences, saved logins, tracking identifiers.

A useful analogy: cookies are like wristbands at a music festival. When you arrive and show your ticket, staff put a wristband on you. For the rest of the day, every time you walk past a gate, staff check the wristband — they don't ask you to show your ticket again. It's fast and convenient. But the whole system assumes wristbands can't be faked. In web security, they often can be.

### Reading Cookies with DevTools

You already know the Application tab exists — Module 02 used it briefly for storage. In this module, we'll focus on the Cookies section.

**To find cookies in DevTools:**
1. Open DevTools (`F12` or `Cmd+Option+I`)
2. Click the **Application** tab (may be hidden — click the `>>` arrow in the tab bar)
3. In the left sidebar, expand **Cookies** → click the domain

You'll see a table with columns:
- **Name** — the cookie's identifier (e.g., `membership`, `session_id`)
- **Value** — what it's set to (e.g., `basic`, `a3f9c1...`)
- **Domain** — which site it belongs to
- **Expires / Max-Age** — when it expires (blank = session cookie)
- **HttpOnly** — if checked, JavaScript can't read this cookie (only the browser sends it automatically)
- **Secure** — if checked, cookie is only sent over HTTPS, never over plain HTTP

You can also read cookies from the **Console** tab:
```javascript
document.cookie
// Returns: "membership=basic; session_id=a3f9c1"
```

Note: `document.cookie` only shows cookies that *don't* have the `HttpOnly` flag. HttpOnly cookies are still sent to the server — they're just hidden from JavaScript (and from `document.cookie`). The Application tab shows them all.

### Base64 — The Disguise That Isn't One

Sometimes a cookie value looks like this:

```
eyJyb2xlIjoiZ3Vlc3QiLCJzZWNyZXQiOiJoZWxsbyJ9
```

That's not encrypted. It's not a secure token. It's **base64-encoded** text — meaning ordinary text that has been converted into a format safe to transmit over HTTP, using only letters, numbers, and a few symbols.

Base64 is completely reversible without any key. It's a *encoding*, not *encryption*. Think of it as a different alphabet for the same words — the words don't become secret just because they're written in a different script.

**How to recognise base64:**
- Uses only `A–Z`, `a–z`, `0–9`, `+`, `/`
- Often ends with `=` or `==` (padding characters)
- Length is always a multiple of 4 characters

**How to decode it:**
In the browser Console tab:
```javascript
atob("eyJyb2xlIjoiZ3Vlc3QiLCJzZWNyZXQiOiJoZWxsbyJ9")
// Returns: '{"role":"guest","secret":"hello"}'
```

Or paste it into [CyberChef](https://gchq.github.io/CyberChef/) and use the "From Base64" recipe.

The reverse — encoding text to base64 — uses `btoa()`:
```javascript
btoa('{"role":"admin"}')
// Returns: "eyJyb2xlIjoiYWRtaW4ifQ=="
```

Developers often base64-encode cookie values to avoid special characters breaking the cookie format. It's not a security measure. Finding a base64-encoded cookie in the wild means the data inside is one `atob()` call away.

### In Practice

Here's what client-side cookie-based access control looks like — and why it fails:

```javascript
// On page load, check what membership tier the cookie says
function checkAccess() {
  const cookies = document.cookie.split('; ');
  const memberCookie = cookies.find(c => c.startsWith('membership='));
  const tier = memberCookie ? memberCookie.split('=')[1] : 'basic';

  if (tier === 'premium') {
    document.getElementById('premium-content').style.display = 'block';
  } else {
    document.getElementById('locked-message').style.display = 'block';
  }
}
```

This code reads a cookie value and shows or hides content based on it. Can you see the problem? The cookie value comes from the visitor's browser. The visitor can change it. The moment someone opens the Application tab and changes `membership` from `basic` to `premium`, this check passes — and the "premium content" appears. Nothing was verified. Nothing was validated. The server just trusted what the browser said.

### Why This Matters (and Why It's a Vulnerability)

Cookies are a browser-side storage mechanism. The browser sends them to the server, but the browser also lets the user read and modify them. Any access control that relies purely on a cookie value — checked only by client-side JavaScript — is not real security. It's a locked door where the key is taped to the door.

The correct pattern is **server-side validation**: when a request comes in with a cookie, the server checks that cookie against its own records — a database of valid sessions, authenticated users, and their real roles. The server doesn't trust what the cookie *says* about the user's role. It looks up what the user's actual role *is*.

Cookie flags like `HttpOnly` and `Secure` reduce certain risks (they stop JavaScript from stealing cookies, and prevent cookies from being intercepted on HTTP connections). But neither stops a user from simply editing the cookie's value in the Application tab. Only server-side validation does that.

---

## Guided Walkthrough

Let's explore cookies on a real website. Pick any news site, or use `bbc.com` — it sets several cookies.

**Step 1: Open the site and DevTools**
Navigate to the site. Open DevTools with `F12` (or `Cmd+Option+I` on Mac).

**Step 2: Open the Application tab**
Click the **Application** tab in the DevTools toolbar. If you don't see it, click the `»` button to find hidden tabs. It's to the right of the Network tab.

**Step 3: Find the Cookies section**
In the left sidebar, click **Cookies** to expand it, then click the domain name underneath. You'll see a table of all cookies this site has stored in your browser.

**Step 4: Inspect the columns**
Look at each column. Note the **HttpOnly** and **Secure** checkboxes — a tick there means the cookie has that protection. Look at the **Value** column — some values will be recognisable, others will look like random strings or encoded data.

**Step 5: Read cookies from the Console**
Click the **Console** tab. Type `document.cookie` and press Enter. You'll see a string of all cookies that are *not* HttpOnly, formatted as `name=value` pairs separated by semicolons. Compare this to what the Application tab showed — if there were any HttpOnly cookies, they won't appear here.

**Step 6: Edit a cookie (just to see how it works)**
Back in the Application tab, double-click any cookie's **Value** field. It becomes editable. Type something different and press Enter. You've changed it. Reload the page — the site will send your modified cookie back to its server on the next request.

(On a real site this may or may not do anything interesting — the server may reject an invalid session cookie, or may not care about a preference cookie. But the mechanic is real.)

---

## Your Challenge

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

Thornwood Coffee recently launched a members portal with a Basic tier (free) and a Premium tier (paid). You've been asked to check whether the site's access controls are properly implemented. You have a Basic membership. The flag is locked behind the Premium dashboard.

Your job: find out whether the access control is enforced properly — and if it isn't, prove it by retrieving the flag.

There's a second part too. One of the cookies on this page has an encoded value. It's not encrypted — just disguised. Decode it to find the rest of the flag.

**Open:** `challenge/index.html` in your browser

**Your mission:** Get past the Basic tier restriction and decode the hidden cookie. Combine what you find for the complete flag.

**Rules:**
- Use the Application tab and Console in DevTools only
- No editing the HTML or JavaScript source
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The page shows different content depending on your "membership tier." But your tier is stored somewhere in your browser — not verified by a server. Open DevTools and look for where that information lives.

Once you find it: if the page trusts what it says, what happens when you change what it says?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Open DevTools → **Application** tab → **Cookies** (in the left sidebar) → click the domain.

You'll see two cookies. One controls your membership tier — double-click its value and change it to `premium`, then reload the page.

For the second part: look at the other cookie's value closely. Does it end in `=` or `==`? That's a sign it's base64-encoded. Open the Console tab and try:
```javascript
atob("paste_the_cookie_value_here")
```
Read the result carefully — something inside it is the second half of the flag.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete step-by-step walkthrough.

</details>

---

## Concept Card

### Key Terms

| Term | What It Means |
|------|---------------|
| Cookie | A name=value pair stored in the browser; sent automatically to the server on every request to that domain |
| Session cookie | A cookie with no expiry date; deleted when the browser closes |
| Persistent cookie | A cookie with an expiry date; survives across browser sessions |
| Base64 | A reversible text encoding (not encryption) — recognisable by `=` padding and the limited character set |
| `HttpOnly` flag | Prevents JavaScript from reading the cookie; it's still sent by the browser automatically |
| `Secure` flag | Cookie is only sent over HTTPS, never over plain HTTP |

### Keyboard Shortcuts & Navigation

| Action | Steps |
|--------|-------|
| Open Application tab | F12 → click **Application** (or `»` to find it) |
| Find cookies | Application → **Cookies** (left sidebar) → click domain |
| Edit a cookie | Double-click the **Value** field in the cookies table |
| Read cookies via JS | Console tab → type `document.cookie` → Enter |
| Decode base64 | Console tab → type `atob("value")` → Enter |
| Encode to base64 | Console tab → type `btoa("text")` → Enter |

### Quick Commands

```javascript
// Read all non-HttpOnly cookies as a string
document.cookie

// Decode a base64 string
atob("eyJyb2xlIjoiZ3Vlc3QifQ==")
// → '{"role":"guest"}'

// Encode text to base64
btoa('{"role":"admin"}')
// → "eyJyb2xlIjoiYWRtaW4ifQ=="

// Set a cookie manually (from the Console)
document.cookie = "membership=premium; path=/"
```

---

## Keep Going

**Practice this skill on:**
- [picoCTF Gym](https://play.picoctf.org/practice) — search for "cookie" tagged web challenges
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/) — Session Management section (free, runs locally)

**Next module:** [Module 04 — HTTP Headers](../04-http-headers/README.md) — you'll use the Network tab to inspect the envelopes that carry web requests, including custom response headers that can hide flags.

**Extension challenge (optional):** Open three websites you use regularly. Check their Application tab cookies. For each site: How many cookies are set? Which have `HttpOnly`? Which have `Secure`? Are any values obviously base64-encoded? What does the name of each cookie suggest about its purpose?

---

[← Module 02: Browser Inspector](../02-browser-inspector/README.md) | [Back to Series](../../README.md) | [Next Module: HTTP Headers →](../04-http-headers/README.md)
