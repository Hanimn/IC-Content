# F04 Concept Cards — HTTP Status Codes

Quick-reference cards for the key terms and codes in this module.

---

## Key Terms

**Status Code**
A three-digit number in an HTTP response indicating whether the request succeeded, failed, redirected, or errored. The first digit defines the category; the last two give the specific reason.

---

**200 OK**
The request succeeded and the response body contains the requested content. The most common code on the web. A 200 on an unexpected path means something is there — worth examining.

---

**301 Moved Permanently**
The resource has moved to a new URL, forever. The server sends a `Location:` header with the new address. Browsers cache this redirect, so the old URL effectively disappears from the browser's memory.

---

**302 Found (Moved Temporarily)**
Redirect to a new URL, but the original URL still exists. Not cached. Commonly used after form submissions (Post/Redirect/Get pattern). Always check what's at *both* URLs when you see a 302 in a CTF.

---

**403 Forbidden**
The server understands the request and knows who you are — it just refuses to fulfill it. Something exists at this path but you don't have permission. Not the same as 401 (which means "I don't know who you are"). A 403 is worth probing further.

---

**404 Not Found**
The requested resource doesn't exist at this URL — or the server is pretending it doesn't (security through obscurity). Directory enumeration tools specifically look for responses that *aren't* 404.

---

**500 Internal Server Error**
The server encountered an unexpected error while processing the request. If your input triggered a 500, that's significant — the server wasn't expecting what you sent. A strong signal for further fuzzing.

---

## The Five Groups

| Group | Meaning         | Example |
|-------|-----------------|---------|
| 1xx   | Informational   | 100 Continue |
| 2xx   | Success         | 200 OK |
| 3xx   | Redirection     | 301 Moved Permanently |
| 4xx   | Client error    | 403 Forbidden, 404 Not Found |
| 5xx   | Server error    | 500 Internal Server Error |

---

## CTF Quick-Reference Table

| Code | Meaning             | CTF Response                                    |
|------|---------------------|-------------------------------------------------|
| 200  | Success             | Check the body — flag might be here (or in the source) |
| 301  | Permanent redirect  | Follow the `Location` header                    |
| 302  | Temporary redirect  | Follow `Location`; check both pages             |
| 403  | Forbidden           | Something's there — probe further               |
| 404  | Not found           | Move on, or try path variations                 |
| 500  | Server error        | Note what input triggered it — may be exploitable |

---

## The View Source Bridge

> The server returns **200** → the full page source is available.  
> The browser renders a *view*. You can read the *source*.  
> Flags hide in HTML comments, JS comments, and hidden elements — never visible on screen.

This is the core skill taught in **Module 01** of the main series.
