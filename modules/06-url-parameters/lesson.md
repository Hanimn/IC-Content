# Module 06: Talking to the Page
## The URL is a conversation — and you can change what you say.

**Time:** ~30 min reading + ~25 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

You've been shopping online and you click a product. Look at the address bar:

```
https://shop.example.com/product?id=142&category=books
```

The part after the `?` is a message your browser is sending to the page: "Show me product 142, from the books category." The page reads those values and responds accordingly.

Now ask yourself: what happens if you change `id=142` to `id=143`? Or change `category=books` to `category=admin`? You typed the URL — you can edit it. The page receives whatever you send.

Most of the time, the page checks those values and serves appropriate content. But sometimes — especially on sites built quickly, or sites built by developers who assumed users wouldn't think to change the URL — the page trusts whatever the URL says without verifying it. Access level, role, account ID, feature flag, debug mode: any of these might be sitting right there in the address bar, waiting to be changed.

The URL isn't just an address. It's user input. And user input should never be trusted blindly.

---

## The Concept

### What is a query string?

A URL has several parts. Take this example:

```
https://portal.example.com/dashboard?user=guest&view=limited
                            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                                      query string
```

The **query string** starts with `?` and contains one or more **parameters** — name/value pairs separated by `&`. Each parameter is written as `name=value`.

| Part | Value | Meaning |
|------|-------|---------|
| `user` | `guest` | The page knows you as a "guest" |
| `view` | `limited` | You're getting the limited view |

The page's JavaScript reads these values and uses them to decide what to show you. Change `guest` to `admin`, reload — and if the page trusts the URL without checking, you've just told it you're an admin.

### How JavaScript reads URL parameters

JavaScript can read the current URL's query string using `URLSearchParams`:

```javascript
const params = new URLSearchParams(window.location.search);
const user = params.get('user');   // "guest"
const view = params.get('view');   // "limited"
```

The page then uses those values in its logic:

```javascript
if (user === 'admin') {
  showAdminDashboard();
} else {
  showGuestView();
}
```

If that check is the only thing standing between a user and admin access, changing the URL is enough to pass it.

### In Practice

URL parameters appear everywhere. Here are real patterns you'll encounter:

```
?page=2                         ← pagination
?sort=price&order=asc           ← sorting
?lang=en                        ← language selection
?debug=true                     ← enabling a debug mode
?ref=newsletter                 ← tracking where you came from
?user=guest&role=viewer         ← identity and access level
?token=abc123                   ← authentication token in the URL (bad practice)
```

The last two patterns are where things get interesting from a security perspective. Any value that affects what you're allowed to see or do is worth examining.

### Why This Matters (and Why It's a Vulnerability)

URL parameters are visible, editable, and sent by the user. They are the definition of untrusted input. A well-built application reads URL parameters but validates them server-side — it checks your session, your database record, your actual permissions — before deciding what to show you. A poorly built application just trusts the value in the URL.

This class of vulnerability is sometimes called **Insecure Direct Object Reference (IDOR)** when it involves accessing records by ID, or **parameter tampering** more generally. It shows up regularly in real penetration tests and bug bounty programs because it's easy to miss during development: everything works fine when honest users use honest URLs.

That's why CTF challenges use this technique — because it teaches you to read the URL as part of the page, not just as an address to ignore.

---

## Guided Walkthrough

We'll experiment with URL parameters on a safe, public test service.

**Step 1: Open a URL with parameters**

Navigate to:
```
https://httpbin.org/get?name=Alice&role=guest
```

You should see a JSON response showing information about your request. Look for the `"args"` section — it shows the query string parameters your browser sent.

**Step 2: Read the parameters**

In the response, find:
```json
"args": {
  "name": "Alice",
  "role": "guest"
}
```

The server received exactly what the URL said. There was no verification — it just echoed it back.

**Step 3: Change the parameters**

Edit the URL in your address bar. Change `role=guest` to `role=admin` and press Enter.

The `"args"` section now shows `"role": "admin"`. You changed what you "said" to the server by editing the URL. If this were a real application that trusted this value, you'd now be seen as an admin.

**Step 4: Add a new parameter**

Add `&debug=true` to the URL. Reload. The response now includes `"debug": "true"` in args. You've introduced a parameter the URL didn't originally have.

This is how security researchers probe applications — they read the existing parameters, then try changing values and adding new ones to see how the application responds.

---

## Your Challenge

Vaultline is a document management portal used by financial analysts. The application shows different content depending on the `access` level in the URL. Normal users get read-only access to redacted documents. But there's a higher access tier that unlocks the full archive — and its name is sitting in the application's JavaScript, waiting to be discovered.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find and use the right URL parameter value to unlock the restricted archive and retrieve the flag.

**Rules:**
- You may use any technique covered in this module and all previous modules
- No automated tools or scripts
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The page loads with a URL that has no parameters — or parameters that give you a limited view. The page is reading something from the URL to decide what to show you. What does the address bar say? What might happen if it said something different?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Open DevTools → Sources (or use View Source from Module 01) and read the JavaScript. Find where the page reads URL parameters and what values it checks for. Then edit the URL in the address bar to match the value that unlocks the restricted content.

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
| Query string | The part of a URL after `?` — contains key/value parameter pairs |
| URL parameter | A single `name=value` pair in a query string |
| `URLSearchParams` | JavaScript API for reading query string values |
| Parameter tampering | Modifying URL parameters to change application behaviour |
| IDOR | Insecure Direct Object Reference — accessing records you shouldn't by changing an ID |
| Untrusted input | Any value that comes from the user (URL, form, cookie) — must be validated before use |

### URL Anatomy

```
https://example.com/path?param1=value1&param2=value2
                    ^   ^^^^^^^^^^^^^^^^^^^^^^^^^^
                    |   query string (starts with ?)
                    path
```

### Reading Parameters in JavaScript

```javascript
const params = new URLSearchParams(window.location.search);
const val = params.get('param1');  // "value1"
```

### Editing a URL Parameter

1. Click the address bar
2. Find the `?` — everything after it is editable
3. Change a value, add a new `&name=value`, or remove a parameter
4. Press Enter to reload with the new parameters

### Common Mistakes

- **Only looking at the visible page.** The URL is also part of the interface — read it.
- **Not checking the JavaScript.** The JS often reveals which parameter values are checked and what they unlock.
- **Forgetting to reload after editing the URL.** The page re-runs its logic on every load.

---

## Keep Going

**Practice this skill (ethically!) on:**
- [picoCTF](https://picoctf.org) — search "parameter" or "query" in the web category
- [CTFlearn](https://ctflearn.com) — web challenges tagged "URL"

**Next module:** [Module 07 — Hidden Form Fields](../07-hidden-form-fields/README.md) — `<input type="hidden">`, DOM editing, and what happens when you change values the page assumed you'd never touch.

**Extension challenge (optional):** Browse any web application you use. Watch the URL as you navigate — look for parameters that seem to control what you see (pagination, filters, IDs). Pick one and think about: what would happen if you changed that value? What would a server that validates it correctly do vs. one that doesn't?

---

[← Module 05: robots.txt & Hidden Paths](../05-robots-and-hidden-paths/README.md) | [Back to Series](../../README.md) | [Next Module: Hidden Form Fields →](../07-hidden-form-fields/README.md)
