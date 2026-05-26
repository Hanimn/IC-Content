# F03 — Concept Cards

Quick-reference cards for the key terms in this module. Use these while doing the challenge or reviewing for later modules.

---

## Key Terms

**HTTP**
HyperText Transfer Protocol — the language browsers and servers use to exchange web content. HTTP defines the exact format of requests and responses, including how headers are structured, where the body goes, and what status codes mean.

**Request**
A message from client to server. Every HTTP request has: a **method** (what to do), a **path** (which resource), a **protocol version**, **headers** (metadata), and an optional **body** (data being submitted).

**Response**
A message from server to client. Every HTTP response has: a **status line** (code + reason), **headers** (metadata), and a **body** (the actual content — HTML, JSON, an image, etc.).

**Header**
A key-value pair in an HTTP message that carries metadata. Format: `Header-Name: value`. Headers come after the request/status line and before the body, separated from the body by a blank line.

**GET**
HTTP method for retrieving data. The most common method — used every time you load a page, image, stylesheet, or script. GET requests have no body.

**POST**
HTTP method for submitting data to the server. Used for login forms, search queries, sign-up forms, and any time you're sending data rather than just requesting it. POST requests have a body containing the submitted data.

---

## Quick Reference

### Anatomy of an HTTP Request

```
GET /path/to/resource HTTP/1.1
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html
[other headers...]

[optional body — used with POST]
```

- Line 1 is the **request line**: `METHOD  /path  HTTP/version`
- Each following line (until the blank line) is a **header**: `Name: value`
- The **blank line** separates headers from body
- The **body** is optional for GET, required for POST with form data

### Anatomy of an HTTP Response

```
HTTP/1.1 200 OK
Date: Mon, 25 May 2026 10:00:00 GMT
Server: nginx/1.18.0
Content-Type: text/html; charset=utf-8
Content-Length: 1234
[other headers...]

<!DOCTYPE html>
<html>...
```

- Line 1 is the **status line**: `HTTP/version  STATUS_CODE  Reason Phrase`
- Each following line (until the blank line) is a **header**: `Name: value`
- The **blank line** separates headers from body
- The **body** is the actual content — HTML, JSON, binary data, etc.

---

## Common Mistakes

**Thinking headers are the same thing as the HTML body**
Headers come *before* the page content. They're invisible to the casual user but always present. The HTML body is what the browser renders — the headers are the metadata envelope around it.

**Forgetting the blank line**
Headers and body are separated by a blank line (`\r\n\r\n` in the HTTP spec). Both the server and the browser rely on this blank line to know where headers end. Without it, neither side would be able to parse the message correctly.

**Assuming `User-Agent` is verified by the server**
The `User-Agent` header says what browser or client is making the request — but the server almost never checks whether this is true. You can set it to anything. Tools like `curl` let you change it freely. Many web scrapers pretend to be real browsers this way.

**Only looking at common headers**
In CTF challenges (and real security assessments), the important data is often in unusual or custom headers — especially ones starting with `X-`. Always scroll through *all* response headers, not just `Content-Type` and `Server`.

---

## Connections to Other Modules

| Module | How it connects |
|--------|----------------|
| F04 — Status Codes | The middle number in the response status line |
| Web Module 03 — Cookies | `Set-Cookie` (response) and `Cookie` (request) headers |
| Web Module 04 — HTTP Headers | Deep dive into the Network tab and header analysis |
| Web Module 08 — Weak Credentials | Reading POST request bodies during login |

---

[← lesson.md](lesson.md) | [challenge →](challenge/index.html)
