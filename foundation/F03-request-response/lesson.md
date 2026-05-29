---
title: "The Request and the Response"
tagline: "This is what Module 04 in the main series is all about. But first, you need to understand the format itself."
time: ""
tier: "Fundamentals"
---
You've been sending letters your whole life without reading the envelope. Every time your browser loads a page, it sends a formal, text-based message to a server — and the server sends one back. These messages have a very specific format. Once you can read them, a whole new layer of the web becomes visible.

This is what Module 04 in the main series is all about. But first, you need to understand the format itself.

---

## The HTTP Request

When you type a URL into your browser and press Enter, your browser doesn't just shout "give me that website." It sends a carefully structured text message called an **HTTP request**.

Every HTTP request has three parts:

1. **Request line** — the method, the path, and the HTTP version
2. **Headers** — key-value pairs that carry metadata
3. **Body** — optional content (used for things like login form data)

Here is what a real GET request looks like:

```
GET /index.html HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0 (compatible; student browser)
Accept: text/html,application/xhtml+xml
Connection: keep-alive
```

Let's read it line by line.

**Line 1: `GET /index.html HTTP/1.1`**

This is the request line. It has three parts separated by spaces:

- `GET` — the **method**. GET means "please give me this resource." It's the most common method — used whenever you load a page, an image, a stylesheet, anything.
- `/index.html` — the **path**. This is the specific file or resource being requested on the server. Not the full URL — just the part after the domain.
- `HTTP/1.1` — the **protocol version**. This tells the server which version of HTTP you're speaking. HTTP/1.1 is the version we'll keep using throughout this curriculum because it's plain text and easy to read by eye. In real browser traffic in 2026 most page loads are HTTP/2 or HTTP/3 — newer versions that compress headers and pack many requests into a single connection — but the *concepts* (methods, paths, headers, status codes) are identical across versions. Learn HTTP/1.1 and HTTP/2 reads the same way once a tool decodes it for you.

**Line 2: `Host: www.example.com`**

This header tells the server *which website* you want. Why does this matter? Because many websites can run on the same server at the same IP address. The server looks at the `Host` header to figure out which one to send back.

**Line 3: `User-Agent: Mozilla/5.0 (compatible; student browser)`**

This header identifies what kind of browser or software is making the request. Servers sometimes use this to send different content to mobile vs desktop browsers. Important for CTFs: this value is **not verified**. You can set it to anything.

**Line 4: `Accept: text/html,application/xhtml+xml`**

This header tells the server what content formats the browser is able to handle. The server uses this to decide what format to send back.

**Line 5: `Connection: keep-alive`**

In HTTP/1.1 the connection between your browser and the server stays open by default after each request — that's "keep-alive." It's there so that when your browser needs more resources from the same site (images, stylesheets, scripts, an extra page), it can re-use the connection instead of paying the cost of a new TCP+TLS handshake every time. The header is technically redundant in HTTP/1.1 (it's already the default), but a lot of clients still send it explicitly to be clear. To explicitly *close* the connection, you'd send `Connection: close`. In HTTP/2 and HTTP/3 this control is taken out of the headers entirely — the protocol multiplexes many requests over one long-lived connection by design.

---

## HTTP Methods

You'll see four methods everywhere:

| Method | What it means |
|--------|--------------|
| **GET** | Request data — loading a page, an image, any file |
| **POST** | Submit data — login forms, search boxes, signing up |
| **PUT** | Update a resource that already exists |
| **DELETE** | Delete a resource |

GET is by far the most common. When you're just browsing, almost every request is a GET. When you fill out a form and click Submit, that's usually a POST.

---

## The HTTP Response

After receiving your request, the server sends back an **HTTP response**. Like the request, it has three parts:

1. **Status line** — the protocol version, a status code, and a reason phrase
2. **Headers** — metadata about the response
3. **Body** — the actual content (the HTML page, the image, the JSON data)

Here is what a real response looks like:

```
HTTP/1.1 200 OK
Date: Mon, 25 May 2026 10:00:00 GMT
Server: Apache/2.4.54
Content-Type: text/html; charset=UTF-8
Content-Length: 1234
Set-Cookie: session=abc123; HttpOnly; Secure

<!DOCTYPE html>
<html>
<head><title>Example</title></head>
...
```

Let's read it line by line.

**Line 1: `HTTP/1.1 200 OK`**

This is the status line. It has three parts:

- `HTTP/1.1` — the protocol version (same as the request)
- `200` — the **status code**. 200 means success. You'll learn many more in F04.
- `OK` — the **reason phrase**. A human-readable label that goes with the status code.

**Line 2: `Date: Mon, 25 May 2026 10:00:00 GMT`**

When the response was generated. Useful for caching and debugging.

**Line 3: `Server: Apache/2.4.54`**

What web server software is running — and which version. This is an **information disclosure** header. A careful attacker can use it to look up known vulnerabilities in that exact version. Many security teams disable or obscure this header.

**Line 4: `Content-Type: text/html; charset=UTF-8`**

What format the body is in. `text/html` means it's an HTML page. `charset=UTF-8` tells the browser how to decode the text characters. Other common values: `application/json` (API data), `image/png` (an image), `text/css` (a stylesheet).

**Line 5: `Content-Length: 1234`**

How many bytes the body contains. The browser uses this to know when the response is complete.

**Line 6: `Set-Cookie: session=abc123; HttpOnly; Secure`**

The server is asking your browser to store a cookie called `session` with the value `abc123`. `HttpOnly` means JavaScript can't read it. `Secure` means it should only be sent over HTTPS. Cookies are covered in depth in Module 03 of the main series.

**The blank line**

Notice the empty line between the last header and `<!DOCTYPE html>`. That blank line (technically `\r\n\r\n` in the HTTP spec) is how the server and browser know where the headers end and the body begins. Without it, the browser wouldn't know when to stop reading headers and start rendering the page.

---

## Common Headers Worth Knowing

| Header | Direction | What It Means |
|--------|-----------|---------------|
| `Host` | Request | Which website you want (one server can host many) |
| `User-Agent` | Request | Browser/client identifier |
| `Cookie` | Request | Cookies sent to the server |
| `Authorization` | Request | Credentials for authenticated requests |
| `Content-Type` | Both | Format of the body (text/html, application/json, etc.) |
| `Set-Cookie` | Response | Server asking browser to store a cookie |
| `Location` | Response | Redirect destination (used with 3xx status codes) |
| `Server` | Response | Web server software and version |
| `X-*` headers | Both | Custom headers — CTF challenges love hiding flags in these |

The `X-` prefix indicates a custom, non-standard header. Applications use them to pass their own metadata. There's no official list — anyone can invent one. In CTF challenges, you will frequently find flags or important clues hidden in `X-` headers like `X-Flag` or `X-Secret`. They're invisible to casual browsing but immediately visible in the Network tab of DevTools.

---

## Why This Matters for CTFs

Every module in the main series connects back to this format:

- **Module 04 (HTTP Headers)** teaches the Network tab — what you see there *is* this request/response format, rendered in a GUI.
- **Module 03 (Cookies)** — cookies are set via `Set-Cookie` response headers and sent back to the server via `Cookie` request headers.
- **Module 08 (Weak Credentials)** — when a login form submits, it sends a POST request with username and password in the body. Being able to read that request is essential.
- **CTF flags in headers** — challenges routinely hide flags in custom response headers. If you're stuck on a CTF web challenge, check every response header, not just the ones you expect.
- **Information disclosure** — the `Server:` header leaking software version and the `X-Powered-By:` header leaking frameworks are considered real vulnerabilities in web security assessments.

---

## Guided Walkthrough

Let's use your browser's built-in developer tools to see a real HTTP exchange.

**In Chrome, Firefox, or Edge:**

1. Press **F12** to open DevTools (or right-click anywhere on a page → Inspect).
2. Click the **Network** tab at the top.
3. In your address bar, navigate to **https://example.com**.
4. In the Network panel, click the first entry — it should say `example.com` or similar.
5. Click the **Headers** subtab on the right panel.

You'll see two sections: **Request Headers** and **Response Headers**.

Look for these in the **Response Headers**:
- `Server:` — what software answered your request
- `Content-Type:` — what format the body is in
- `Content-Length:` — how many bytes the body is

Look at the **Request Headers**:
- What method did the browser use? (Hint: check the very top — it shows "Request Method: GET")
- Can you find the `Host:` header? What value does it have?

**Questions to think about:**
- Why does the response have a `Content-Length` but the GET request doesn't?
- What does the `User-Agent` in your request reveal about your browser?
- Is there a `Server:` header? What software is running example.com?

---

## Challenge

You've learned to read HTTP request and response messages. Now it's time to prove it.

Open **challenge/index.html** in your browser. You'll be shown three intercepted HTTP exchanges. Your job is to read them carefully and answer questions about what you see.

If you get stuck:
- **hint-1.md** — gentle nudges
- **hint-2.md** — more specific hints
- **solution.md** — full walkthrough with explanations

---

## Concept Card

Review **concept-cards.md** any time a term feels unclear.

---

## Keep Going

Once you've captured the flag here, you're ready for the main web series:

- **Module 01** — the web's request/response cycle in action
- **Module 04** — the Network tab in depth (this is where you'll use everything from this lesson)

[← F02 — The Address Book](../F02-address-book/README.md) | [Foundation Track](../README.md) | [Next: F04 →](../F04-status-codes/README.md)
