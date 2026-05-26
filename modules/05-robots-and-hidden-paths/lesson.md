# Module 05: The Map They Forgot to Hide
## Some doors aren't locked — they're just not on the map.

**Time:** ~30 min reading + ~25 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

Imagine you're a new detective arriving at a building you've never visited before. The front desk has a directory of every room — but certain rooms aren't listed. "Staff only," they say. "Not for guests." The directory tells you what's in the building but politely asks you not to go to certain places.

Here's the thing about a polite request: it's not a lock.

Websites have something like that directory. It's called `robots.txt`, and it lives at a predictable location on almost every website. It was designed to tell automated web crawlers — the bots that index sites for search engines like Google — which pages to skip. "Don't include this admin page in search results. Don't index our draft articles." It's not a security barrier. It's a notice posted on the front door. And unlike a locked room, a `robots.txt` file is publicly readable by anyone.

The irony is sharp: a file designed to hide content from search engines works by listing exactly which paths should be ignored. It's a map of the places the site owner didn't want you to find — and it's sitting in plain sight.

---

## The Concept

### What is robots.txt?

`robots.txt` is a plain text file that websites place at the root of their domain. Its format is simple: a series of rules telling web crawlers which paths they're allowed to visit and which to skip.

```
User-agent: *
Disallow: /admin/
Disallow: /internal/
Disallow: /secret-data/
```

`User-agent: *` means "this applies to all bots." `Disallow: /admin/` means "don't crawl anything under the `/admin/` path." That's the entire syntax for the most common use case.

To find a site's `robots.txt`, you just append `/robots.txt` to the domain. For `example.com`, that's `https://www.example.com/robots.txt`. It's always in the same place, it's always publicly accessible, and it has to be — otherwise the crawlers couldn't read it.

### The Misunderstanding

Developers sometimes confuse "not indexed by search engines" with "not accessible to people." They're not the same thing. A search engine won't crawl a `Disallowed` path, so it won't appear in Google results. But a `Disallow` rule doesn't stop a human (or a tool) from navigating to that path directly. The files are still there. Anyone who knows the URL can visit them.

Security researchers check `robots.txt` routinely because it can reveal:
- Admin panel paths (`/admin/`, `/dashboard/`)
- Internal tools or APIs (`/api/internal/`, `/debug/`)
- Staging or test environments (`/staging/`, `/dev/`)
- Backup files or configuration exports
- Anything a developer wanted to keep out of search results for reasons they considered non-obvious

### In Practice

Here's a real `robots.txt` from a fictional company (the kind you might encounter):

```
User-agent: *
Disallow: /admin/
Disallow: /wp-admin/
Disallow: /backup-2024-01.zip
Disallow: /internal-api/v2/

User-agent: Googlebot
Disallow: /staging/
```

Reading this tells you: there's an admin panel, something built on WordPress, a backup zip file sitting in the root directory, an internal API, and a staging environment. None of those are accessible via search — but every one of those paths is a direct URL you could type into a browser.

### Why This Matters (and Why It's a Vulnerability)

`robots.txt` was designed for a cooperative relationship between websites and search engines. It was never designed as a security boundary. Treating it as one is a common mistake.

In real penetration tests, reviewing `robots.txt` is one of the first steps — it often reveals more about a site's structure in ten seconds than hours of guessing. Admin panels, staging servers, old backup files, and forgotten internal tools frequently appear in `Disallow` entries because the developer wanted to keep them out of search results without realising that made their locations public.

The correct approach: if a path should be inaccessible, protect it with authentication. Don't rely on not listing it.

---

## Guided Walkthrough

We'll practice reading `robots.txt` on a real public website. Many large sites have interesting ones.

**Step 1: Visit a large website's robots.txt**

Open your browser and go to: `https://www.bbc.com/robots.txt`

You should see a plain text file — no styling, no images. Just lines of text with `User-agent:` and `Disallow:` entries.

**Step 2: Read through the Disallow entries**

Scroll through the file. Notice:
- How many `Disallow` entries there are (often dozens)
- Some entries are paths you'd expect (`/admin/`, `/search/`)
- Others reveal structure you might not have guessed from the public site

**Step 3: Pick one Disallowed path and visit it**

Copy one of the `Disallow:` paths and append it to `https://www.bbc.com`. Navigate to it. You'll likely get a 404 (not found) or a 403 (forbidden) — but notice: the server responded. The page exists (or existed). The `robots.txt` entry told you it was there.

**Step 4: Compare to a smaller site**

Try any news site or company website you use. Append `/robots.txt` to their domain. Do they have one? What does it reveal about how their site is structured?

---

## Your Challenge

Meridian Publishing Group runs a news website. Their web team recently reorganised the archive and left a note about which areas of the site they wanted to keep out of search results. They used `robots.txt` for this — a file that's publicly accessible and lists every path they considered sensitive.

One of those paths leads to an internal tool that should have been taken offline months ago. It's still there. It has something inside it.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find the flag hidden in an unlisted section of the Meridian Publishing site.

**Rules:**
- You may use any technique covered in this module and all previous modules
- No automated tools or scripts
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The main page looks like a normal news site. But every website has a file that maps what's on it — including the parts the owner wanted to keep quiet.

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Find and read the `robots.txt` file for this challenge. Read all the `Disallow:` entries carefully. One of them is a path you can navigate to directly — and something is waiting there.

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
| `robots.txt` | A plain text file at a website's root that tells web crawlers which paths to skip |
| `User-agent` | Specifies which crawler the rule applies to (`*` means all crawlers) |
| `Disallow` | Tells a crawler not to index a specific path |
| Directory enumeration | The technique of guessing or discovering paths on a web server |
| Security through obscurity | Relying on secrecy of location (not authentication) for protection — this doesn't work |

### Where to Find robots.txt

```
https://example.com/robots.txt
http://localhost:8080/robots.txt
file:///path/to/challenge/robots.txt    ← for local file challenges
```

For local file challenges, `robots.txt` lives in the same folder as `index.html`.

### Common Mistakes

- **Assuming Disallow means inaccessible.** It doesn't. It only asks crawlers to skip the path.
- **Not checking robots.txt at all.** It's one of the first things security researchers look at.
- **Only looking at the first few entries.** The interesting paths are often buried further down.

---

## Keep Going

**Practice this skill (ethically!) on:**
- [picoCTF](https://picoctf.org) — search for "robots" in the web category
- Any website you're curious about — try appending `/robots.txt` to the domain. You're reading a public file, exactly as a search engine would.

**Next module:** [Module 06 — URL Parameters](../06-url-parameters/README.md) — Query strings, `URLSearchParams`, and what happens when you change the values in a URL.

**Extension challenge (optional):** Pick five websites you use regularly. Find their `robots.txt` files. Write down every `Disallow` entry that surprises you — paths you wouldn't have guessed existed. What does the list tell you about how each site is structured?

---

[← Module 04: HTTP Headers](../04-http-headers/README.md) | [Back to Series](../../README.md) | [Next Module: URL Parameters →](../06-url-parameters/README.md)
