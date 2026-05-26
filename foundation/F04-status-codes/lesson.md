# F04 Lesson — The Status Code Switchboard

---

## The Instrument Panel

Every time your browser talks to a server, the server replies with a three-digit number *before* it says anything else.

These numbers are like a mood ring for the internet. They tell you immediately whether your request succeeded, failed, redirected, or hit a wall. Professionals glance at these codes like experienced pilots reading instrument panels — a single number tells the whole story before a word of content arrives.

You've probably seen a 404 page. Maybe a 403. After this lesson, you'll know what every code group means and how to use that knowledge in a CTF challenge.

---

## The Five Families of Status Codes

All HTTP status codes fall into five groups, defined by their first digit:

```
1xx — Informational  (rarely seen in practice)
2xx — Success        ← this is what you want
3xx — Redirection    ← follow the arrows
4xx — Client error   ← you did something wrong (or aren't allowed)
5xx — Server error   ← the server broke
```

You don't need to memorise every code in every group. You need to know the pattern: the first digit tells you the *category*, the last two digits tell you the *specifics*.

When you're scanning a list of HTTP responses in a CTF, you can immediately triage them: 2xx = interesting, 3xx = follow it, 4xx = blocked or missing, 5xx = something crashed.

---

## The Six You'll See in Every CTF

### 200 OK

**Success.** The request worked, and the response body contains the content you asked for.

This is the most common code on the web. Every normal page load you've ever done returned a 200. But "success" just means the server answered — it doesn't tell you whether there's anything *interesting* in the response. That's your job to find out.

CTF relevance: a 200 from an unusual or guessed path means something is there. The server served it. That's your signal to look deeper.

---

### 301 Moved Permanently

**Redirect — forever.** The URL you requested has moved to a new location, and this change is permanent. The server sends a `Location:` header pointing to the new URL.

Browsers cache 301 redirects, which means after visiting once, your browser goes straight to the new URL without asking the server again. This is why site migrations use 301 — once you've been redirected, the old URL is essentially gone from the browser's perspective.

CTF relevance: if a challenge URL 301s you somewhere, check *where* it's sending you. The `Location:` header is part of the response, even if you never read it directly.

---

### 302 Found (Moved Temporarily)

**Redirect — but not permanent.** The server is sending you to a different URL, but the original URL still technically exists. This is NOT cached by the browser.

This code is extremely common after form submissions: you fill in a login form, the server processes it, then sends a `302 → /dashboard` to bounce you to the next page. The "Post/Redirect/Get" pattern uses 302 deliberately to prevent duplicate form submissions on browser refresh.

CTF relevance: sometimes a 302 redirects you to a flag page, but you need to follow the redirect manually to see it. If you're using a tool like `curl`, it won't follow redirects unless you tell it to (`-L` flag). Always check both the page that *sent* the redirect and the page it redirected *to*.

---

### 403 Forbidden

**You're not allowed here.** The server understood your request and can see who you are (or aren't), but you simply don't have permission to access this resource.

Important distinction: **403 is not the same as 401 (Unauthorized).** 401 means "I don't know who you are — log in first." 403 means "I know exactly who you are, and the answer is still no."

CTF relevance: a 403 is a strong signal that something *exists* at that path. The server didn't say "this doesn't exist" (that's 404) — it said "this is here and you can't have it." That's worth probing further. Sometimes misconfigurations let you bypass 403s with header tricks, different HTTP methods, or path variations.

---

### 404 Not Found

**The resource doesn't exist at this URL.** The server has no content at the path you requested.

Or does it? Servers sometimes return 404 *intentionally* even when a resource exists — this is called "security through obscurity." A server might return 404 for `/admin` even though the admin panel is there, to make it harder to discover.

CTF relevance: directory enumeration tools (like `gobuster` or `dirbuster`) scan for responses that *aren't* 404. They fire thousands of requests at guessed paths and flag anything that returns 200, 301, 302, or 403 — because those responses mean *something is there*. Module 05 of the main series covers this technique directly.

---

### 500 Internal Server Error

**The server crashed while handling your request.** The server received your request and tried to process it, but something went wrong internally. This is a generic catch-all for server-side failures.

CTF relevance: triggering a 500 by sending unexpected input — a single quote `'`, a very long string, an unexpected character — often *confirms* a vulnerability exists. The server wasn't expecting that input and didn't handle it gracefully. Security tools look for inputs that change a response from 200 to 500, because the change in behavior indicates the input is being processed in an interesting way.

---

## Status Codes in CTF Challenges

Here's how to think about codes when you're actively working a challenge:

**A 200 response to an unusual path** = something is there. Examine the response body carefully — look at headers, look at comments, look at scripts.

**A 302 to an unexpected location** = check the `Location` header. What's at that URL? Was the redirect intentional, or is there something on the original page worth examining before following?

**A 403** = something exists but is protected. This is worth more investigation than a 404. Ask: can I reach it with different credentials? A different HTTP method? A modified path?

**A 500 from unexpected input** = the input you sent caused a crash. This is one of the clearest signals that a parameter is worth fuzzing further. Note exactly what input triggered it.

**Tools like dirbusting** scan for non-404 responses to enumerate hidden paths — if a path returns *anything* other than 404, something is there. Module 05 of the main series covers this technique in detail.

---

## The View Source Connection

Here's something important that connects status codes to your next skill.

In web CTFs, information is sometimes hidden not in the visible page content, but in the HTML source — in comments, hidden elements, or scripts. Developers leave notes for themselves. Flags get buried in JavaScript comments. Configuration details end up in metadata.

The browser shows you a rendered view — styled, formatted, visual. But the *source* contains everything the server sent. When a server returns **200**, it means the full page source is available to you. The browser is choosing what to display; you get to choose what to read.

Knowing that 200 = success is the first step. Knowing to look *deeper* in the source is the next skill — and that's exactly what **Module 01** of the main series teaches.

In the challenge for this module, you'll need to use this exact technique to find the flag.

---

## Guided Walkthrough — Watching Codes in the Wild

Try these in your browser with DevTools open (F12 → Network tab):

**Step 1:** Navigate to `https://httpbin.org/status/404`  
Open the Network tab before you load the page. You'll see the request and a **404** response. The page might show an error or be blank — but the code tells the story.

**Step 2:** Navigate to `https://httpbin.org/status/200`  
Same setup. You'll see **200**. The response body might be minimal, but the server is saying "I'm here, this worked."

**Step 3:** Navigate to `https://httpbin.org/redirect/1`  
Watch the Network tab carefully. You'll see **two** requests: first a **302**, then a **200**. The browser followed the redirect automatically. If you weren't watching the Network tab, you'd never know the redirect happened.

**The key takeaway:** The browser hides a lot from you. It follows redirects silently, it caches 301s, it renders HTML into pixels. The Network tab is your window into what's actually happening at the protocol level.

---

## Summary

```
Code  Meaning            What it tells you
200   Success            The request worked — look at what you got
301   Perm redirect      Moved forever — check where to
302   Temp redirect      Moved for now — check both the before and after
403   Forbidden          Something is there, you can't have it (yet)
404   Not found          Nothing here — or the server is lying
500   Server error       The server crashed — interesting if you caused it
```

The server is always talking. These three-digit numbers are its first word. After this lesson, you know how to listen.

---

**Up next:** The challenge. Six scenarios, six codes. And one flag that's in the page — but not on it.
