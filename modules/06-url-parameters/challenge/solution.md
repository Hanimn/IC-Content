# Solution — Talking to the Page

**Flag:** `FLAG{query_strings_are_user_input}`

---

## The Approach

The Vaultline portal reads an `access` parameter from the URL and uses it to decide what content to display. The page's JavaScript defines three tiers — `guest`, `analyst`, and `vault` — and shows or hides content based on which one matches. Since this check runs entirely in the browser, any user can supply any value they like by editing the URL.

---

## Step-by-Step

### Step 1 — Open the challenge and observe

Open `challenge/index.html` in your browser. The URL has no parameters (or the page defaults to `guest` access).

You'll see:
- A red "restricted" banner
- Several documents listed as **Locked** or **Redacted**
- The access level shown as `guest` in the top badge and the info panel

### Step 2 — Read the URL

Look at the address bar. It shows something like:

```
file:///path/to/challenge/index.html
```

No parameters yet. The page is reading an `access` parameter and defaulting to `guest` when it's absent.

### Step 3 — Add the access parameter

Click the address bar and add `?access=analyst` to the end of the URL:

```
file:///path/to/challenge/index.html?access=analyst
```

Press Enter. The page reloads. Now you'll see:
- The restricted banner is gone
- The access badge changes to **ANALYST**
- Two documents unlock
- A new panel appears, mentioning a higher tier with the codename: `vault`

### Step 4 — Find the vault tier (two paths)

**Path A — read the hint on screen:**
The analyst panel directly tells you: *"a higher access tier exists for the full unredacted archive. Internal codename: `vault`."*

**Path B — read the JavaScript source:**
Use View Source (Ctrl+U / Cmd+Option+U) or DevTools → Sources tab. Search for `ACCESS_LEVELS`. You'll find:

```javascript
const ACCESS_LEVELS = {
  guest:   0,
  analyst: 1,
  vault:   2,
};
```

The three tier names are right there.

### Step 5 — Use the vault tier

Change the URL parameter to `vault`:

```
file:///path/to/challenge/index.html?access=vault
```

Press Enter. The page reloads with vault access:
- All documents unlock
- A green panel appears with the flag

```
FLAG{query_strings_are_user_input}
```

---

## Why This Works

The page reads `access` from the URL using:

```javascript
const params = new URLSearchParams(window.location.search);
const rawAccess = (params.get('access') || 'guest').toLowerCase();
```

The URL is user-supplied input. The page trusts it completely — there's no session, no server-side check, no verification that the person visiting is actually entitled to `vault` access. Changing the URL is changing what you tell the page about yourself.

This pattern shows up in real applications when developers use URL parameters to pass state — current page, selected tab, user role, feature flags — without validating them against a server-side record of what the user is actually allowed to do.

---

## Defender Fix

Access control must happen server-side. The correct pattern:

1. User logs in — server creates a session and records their access level in a database
2. Every request from the browser includes a session cookie
3. The server checks the session cookie against the database to determine access level
4. The server returns only the content the user's *server-verified* role permits

In this model, it doesn't matter what the URL says — the server ignores a `?access=vault` parameter because it checks the session, not the URL. The URL parameter might still exist for routing purposes, but it never grants permissions by itself.

---

## Write Your Own Writeup

1. What in the page's visible UI gave you the first clue that access level was controlled by the URL?
2. The `analyst` tier revealed the name of the `vault` tier. Was that intentional design, or a mistake? How would you fix it?
3. What's the difference between this challenge and Module 03's cookie manipulation? Both changed a value to escalate access — what's different about *where* the value was stored?
4. If you were a developer reviewing this code, what single change would prevent this vulnerability?

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Next Module →](../../07-hidden-form-fields/README.md)*
