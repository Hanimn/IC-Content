---
title: "The Envelope, Not the Letter"
tagline: "*Before you start:* This module requires a local HTTP server. See the setup instructions in `README.md`."
time: "~35 min reading + ~30 min challenge"
tier: "Tier 1: Discovery"
---
## Web requests carry more than just the page.

**Time:** ~35 min reading + ~30 min challenge
**Tools needed:** Web browser (Chrome or Firefox) + Python 3

> **Before you start:** This module requires a local HTTP server. See the setup instructions in `README.md`.

---

## The Story

You've been looking inside things. The HTML source. The DOM. The cookies. All of it sitting in the browser, waiting to be read or changed.

But there's a layer you haven't looked at yet — and it's the one that carries everything else.

When you type a URL and press Enter, your browser doesn't just receive a file. It has a *conversation* with a server. "I'd like this page. Here's who I am, what browser I'm using, where I came from." The server replies: "Here it is. Here's what type of file it is, how long to keep it, and a few other things I'd like you to know." Both sides of this conversation carry *headers* — name/value pairs wrapped around every request and response like information printed on an envelope.

Think of it this way: a letter has two parts. There's the letter inside — the words, the message, the content. Then there's the envelope — the addressee, the return address, the postmark, the customs stickers. If you only read the letter, you've missed everything the envelope was saying. HTTP works the same way. You've been reading the letter. The Network tab shows you the envelope.

Real-world impact: security researchers regularly find sensitive information in HTTP headers that developers added for debugging and never removed — internal server names, framework versions, API endpoint URLs, staging environment addresses. In 2020, a researcher found a custom response header on a major tech company's API that revealed the exact version of an internal service with a known vulnerability. The information was there on every response, invisible to anyone who wasn't looking at headers.

---

## The Concept

### What Is HTTP?

HTTP stands for HyperText Transfer Protocol — the language browsers and servers use to communicate. When you visit a webpage:

1. Your browser sends an **HTTP request** to the server: "Give me `/index.html`."
2. The server sends back an **HTTP response**: "Here it is. Status: 200 OK."

Both the request and the response have two parts: **headers** (metadata, formatted as `Name: Value` pairs) and a **body** (the actual content — HTML, JSON, an image, etc.).

```
GET /index.html HTTP/1.1          ← request line (method, path, version)
Host: example.com                 ← request header
User-Agent: Mozilla/5.0 ...       ← request header
Accept: text/html                 ← request header
                                  ← blank line separates headers from body
                                  ← (GET requests typically have no body)
```

```
HTTP/1.1 200 OK                   ← response status line
Content-Type: text/html           ← response header
Content-Length: 1256              ← response header
Server: Apache/2.4.51             ← response header
                                  ← blank line
<!DOCTYPE html>...                ← response body (the actual HTML)
```

Every single request your browser makes follows this pattern. Images, CSS files, JavaScript, API calls — all of them are HTTP requests with headers.

### Request Headers vs. Response Headers

**Request headers** are sent *by your browser* with every request. Common ones:

| Header | What It Says |
|--------|-------------|
| `Host` | Which domain you're requesting |
| `User-Agent` | Your browser name and version |
| `Cookie` | Your cookies for that domain |
| `Referer` | The page you came from |
| `Accept` | What content types you can handle |

**Response headers** are sent *by the server* with every response. Common ones:

| Header | What It Says |
|--------|-------------|
| `Content-Type` | What kind of data is in the body (`text/html`, `application/json`, etc.) |
| `Set-Cookie` | Instruction to store a new cookie |
| `Server` | What software the server is running |
| `Cache-Control` | How long the browser should cache this response |
| `X-*` | Custom headers — developers can add any `X-` prefixed header they want |

Those `X-` headers are particularly interesting. They're a developer convention for custom metadata. Legitimate uses include `X-Request-ID` (a unique ID for tracking requests through logs) and `X-RateLimit-Remaining` (how many API calls you have left). But developers also add `X-Debug-Info`, `X-Internal-Endpoint`, `X-Build-Version` — and sometimes forget those are visible to everyone.

### Using the Network Tab

The DevTools Network tab records every HTTP request the page makes — the main HTML, CSS, JavaScript, images, and any background `fetch()` calls your browser initiates. It's a live log of the conversation.

**To use it:**
1. Open DevTools (`F12` or `Cmd+Option+I`)
2. Click the **Network** tab
3. **Reload the page** — the Network tab only records requests made while it's open
4. You'll see a list of all requests. Click any one to see its details.

When you click a request, you get several subtabs:

- **Headers** — request headers (what your browser sent) and response headers (what the server replied with)
- **Preview** — the response body formatted nicely (good for JSON)
- **Response** — the raw response body text
- **Timing** — how long each phase took

The **Headers** subtab is divided into two sections: **Response Headers** (top) and **Request Headers** (bottom). Both are worth checking.

### Why This Module Requires a Real Server

Modules 01–03 worked because the flag was in the HTML, the DOM, or cookies — all of which exist locally in your browser, even when you open a file directly (`file://`).

HTTP headers don't work that way. They only exist as part of an actual HTTP request-response exchange. When you open a file with `file://`, your browser reads directly from disk — there's no server, no HTTP request, and therefore no headers. To see headers, you need to make a real HTTP request. That's why this module uses Python's built-in HTTP server: `python3 -m http.server 8080` turns your computer into a simple web server, and visiting `http://localhost:8080` makes a real HTTP request to it.

This is also your first look at what it means to "serve" a webpage — a skill that matters in later modules and in real web development.

### In Practice

Here's what a background API fetch looks like in JavaScript:

```javascript
fetch('/api/status.json')
  .then(response => response.json())
  .then(data => {
    console.log(data.status);  // "operational"
    // display data.status on the page...
    // but what about data.internalRef? Never displayed.
  });
```

On screen, you'd see "operational." In the Network tab, you'd see the full response body — including `internalRef` and anything else the server returned, whether or not the page chose to display it.

### Why This Matters (and Why It's a Vulnerability)

HTTP is a transparent protocol. Anyone between your browser and a server can see the headers — which is why HTTPS exists (to encrypt the whole conversation). But even with HTTPS, the *developer* can put things in headers that shouldn't be there. The server version string, internal service names, API versions with known vulnerabilities, debug flags left on in production.

From a security tester's perspective, headers are always the first thing to check. A `Server: Apache/2.2.14` header tells you the server is running a version from 2010 with dozens of known vulnerabilities. An `X-Powered-By: PHP/5.6` tells you the PHP version. A custom `X-Admin-Token: abc123` tells you someone made a serious mistake. All of this is visible to anyone with a Network tab and one page load.

---

## Guided Walkthrough

`httpbin.org` is a free public API designed specifically for learning HTTP — it echoes back information about your request, making it perfect for this walkthrough.

**Step 1: Open httpbin and DevTools**
Navigate to `https://httpbin.org/get` in your browser. Open DevTools (`F12`) and click the **Network** tab. If the list is already populated, click the clear button (🚫) to empty it.

**Step 2: Reload to capture the request**
Press `F5` to reload the page. The Network tab captures the request for `/get` and any other resources.

**Step 3: Click the main request**
In the Network tab list, click the `get` request (or the first entry). It opens the detail panel on the right.

**Step 4: Explore the Headers subtab**
The **Headers** subtab is already selected. Scroll down to find:
- **Response Headers** section — look for `Content-Type: application/json` and `Access-Control-Allow-Origin: *`
- **Request Headers** section — find your own `User-Agent` header. It shows your exact browser name and version.

**Step 5: Explore the Preview subtab**
Click **Preview**. You'll see the JSON body of the response, formatted nicely. It shows the headers your browser sent — `httpbin.org` echoes them back. Notice your `Host`, `User-Agent`, and other request headers appear in the response body.

**Step 6: Look for the server header**
Back in the Headers subtab, find `Server` in the Response Headers section. What software is httpbin.org running? This is the kind of information security testers immediately note — it can narrow down which vulnerabilities to check.

You've just done a complete analysis of one HTTP request: headers, body, server info. That's the Network tab workflow.

---

## Your Challenge

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

**First: Make sure your server is running.**
Open a terminal, navigate to this module's `challenge/` folder, and run:
```
python3 -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

---

Nexus Systems was running a staging API server during development. It was supposed to be taken offline when the project shipped. It wasn't. You've found it.

The page loads and shows you something. But the server is doing more than just serving the HTML — it's fetching additional data in the background. The Network tab will tell you exactly what that data contains.

**Visit:** `http://localhost:8080` (with your server running)

**Your mission:** Find the complete flag. Part of it is visible on the page. The rest requires the Network tab.

**Rules:**
- Use the Network tab in DevTools — that's the tool for this module
- You must be visiting `http://localhost:8080`, not a `file://` path
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The page is making more than one HTTP request. When a browser loads a webpage, it often fetches additional resources in the background — scripts, stylesheets, data files — each as a separate HTTP request.

Open the Network tab in DevTools (`F12` → Network) and **reload the page**. The Network tab only records requests made while it's open. How many requests do you see after reloading?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

After reloading with the Network tab open, you should see at least two requests: one for the main page and one for a file called `secret.json`.

Click `secret.json` in the Network tab list. Then click the **Preview** or **Response** subtab (not Headers). You'll see the JSON data the server returned. One field in that JSON has a value that looks encoded.

Try running `atob("that_value_here")` in the Console tab.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete walkthrough.

</details>

---

## Concept Card

### Key Terms

| Term | What It Means |
|------|---------------|
| HTTP | HyperText Transfer Protocol — the request/response language browsers and servers speak |
| Request | A message from browser to server: "give me this resource" |
| Response | A message from server to browser: "here it is" (with status, headers, and body) |
| Header | A name/value metadata pair sent alongside a request or response |
| `User-Agent` | Request header identifying the browser making the request |
| `Content-Type` | Response header describing what kind of data is in the body |
| `X-*` headers | Custom headers — can carry any information a developer chooses to add |
| Network tab | DevTools panel that records every HTTP request the page makes, in real time |

### Network Tab Navigation

```
F12 → Network tab → reload page → click a request → explore subtabs:
  ├── Headers    → request headers (what you sent) + response headers (what server sent)
  ├── Preview    → response body formatted (great for JSON)
  ├── Response   → response body raw text
  └── Timing     → how long each phase took
```

### Common Mistakes

- **Opening Network tab after page loads.** The Network tab only records requests made *while it's open*. Always reload after opening it — or open DevTools before navigating to the page.
- **Visiting `file://` instead of `http://localhost:8080`.** The challenge won't work correctly without a running server. Double-check your browser's address bar.
- **Looking only at the main HTML request.** Background `fetch()` calls appear as separate entries in the Network tab list. Scroll through the full list — the interesting data is often in a secondary request.

---

## Keep Going

**Practice this skill on:**
- [httpbin.org](https://httpbin.org) — explore all the endpoints; each one reveals different aspects of HTTP
- [picoCTF Gym](https://play.picoctf.org/practice) — search for "headers" tagged web challenges

**Next module:** [Module 05 — robots.txt & Hidden Paths](../05-robots-and-hidden-paths/README.md) — back to Tier A (no server needed). You'll learn how websites accidentally publish maps to their own hidden directories.

**Extension challenge (optional):** Visit any major website with the Network tab open. Look at the response headers on the main page request. Find:
1. The `Server` header — what software is it running?
2. Any `X-*` custom headers — what do they reveal?
3. Does it have a `Content-Security-Policy` header? (This is a good security header — its presence or absence tells you something about how security-conscious the team is.)

---

[← Module 03: Cookies & Storage](../03-cookies-and-storage/README.md) | [Back to Series](../../README.md) | [Next Module: robots.txt & Hidden Paths →](../05-robots-and-hidden-paths/README.md)
