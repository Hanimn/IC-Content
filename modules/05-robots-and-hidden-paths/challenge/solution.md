# Solution — The Map They Forgot to Hide

**Flag:** `FLAG{robots_txt_is_not_a_fence}`

---

## The Approach

The `robots.txt` file lists paths that the site owner wanted to keep out of search engine results. One of those paths — listed as `Disallow` — leads to an internal tool that was never taken offline. Navigating to it directly bypasses the "do not index" instruction entirely, because `robots.txt` is a request to search engines, not a barrier to access.

---

## Step-by-Step

### Step 1 — Open the challenge

Open `challenge/index.html` in your browser. You'll see the Meridian Publishing Group homepage — a news site with articles, an archive, and a navigation bar. Nothing on the page obviously points to a flag.

### Step 2 — Find robots.txt

Every website has (or can have) a `robots.txt` file at its root. For this challenge, `robots.txt` lives in the same folder as `index.html`.

Navigate to it:
- **If using a local server** (`python3 -m http.server 8080`): visit `http://localhost:8080/robots.txt`
- **If opening via file://**: open the `robots.txt` file in your browser or a text editor directly

### Step 3 — Read the Disallow entries

You'll see the following:

```
User-agent: *
Disallow: /admin/
Disallow: /internal/
Disallow: /archive/staff-notes/
Disallow: /staging/

User-agent: Googlebot
Disallow: /archive/staff-notes/
Disallow: /staging/

# Do not index draft articles
Disallow: /drafts/

# Internal tools — not for public access
Disallow: /tools/flag-retrieval.html
```

That last entry is the one: `/tools/flag-retrieval.html` — listed as an internal tool not meant for public access.

### Step 4 — Navigate to the hidden path

Open the path directly in your browser:

- **If using a local server**: `http://localhost:8080/tools/flag-retrieval.html`
- **If opening via file://**: navigate to `challenge/tools/flag-retrieval.html` in your file browser and open it

### Step 5 — Collect the flag

The page loads — a terminal-style internal tool. The flag is displayed directly:

```
FLAG{robots_txt_is_not_a_fence}
```

---

## Why This Works

`robots.txt` was designed for a cooperative relationship between websites and search engine crawlers. A crawler that sees `Disallow: /tools/flag-retrieval.html` will respectfully skip that path when building its index.

But `robots.txt` is:
- Publicly readable (the crawler has to be able to read it)
- Not enforced by the server (the server still serves the file if you ask for it)
- A list of exactly the paths the site owner considered sensitive

A human navigating directly to the URL bypasses the `robots.txt` instruction entirely. The rule only applies to crawlers that choose to follow it.

This is called **security through obscurity** — relying on something being hard to find, rather than actually protecting it. In this case, the `robots.txt` made the path *easier* to find, not harder.

---

## Defender Fix

If `/tools/flag-retrieval.html` shouldn't be accessible to the public:

1. **Require authentication** — make the path return a login prompt if the user isn't authenticated
2. **Remove the file** — if it's not needed, delete it from the server
3. **Restrict at the server level** — configure the web server to block access with a 403 response

Removing it from `robots.txt` is not sufficient protection. The path was already public; removing the mention just means crawlers won't be politely asked to skip it anymore.

---

## Bonus: Real-World robots.txt

Try reading `robots.txt` on a few real websites — just append `/robots.txt` to any domain. You're reading a public file, exactly as a search engine does.

Common discoveries:
- `/wp-admin/` — indicates the site runs WordPress
- `/staging/` or `/beta/` — staging environments accessible to anyone who finds the URL
- `/api/internal/` — internal API endpoints
- `/backup-*.zip` — backup files left on the server

Each of these is a starting point for further investigation in a real pentest.

---

## Write Your Own Writeup

1. What made `robots.txt` the first thing to check on an unfamiliar site?
2. What's the difference between "not indexed by search engines" and "protected from access"?
3. If you were the developer, what would you do differently to actually protect `/tools/flag-retrieval.html`?
4. Why might a developer choose to list a sensitive path in `robots.txt` at all — what were they trying to accomplish, and why did it backfire?

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Next Module →](../../06-url-parameters/README.md)*
