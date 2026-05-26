# Solution — F03 Challenge

**Flag:** `FLAG{headers_tell_the_story}`

---

## Step-by-Step Walkthrough

### Question 1: What HTTP method was used in Exchange 2?

**Answer: POST**

The first line of Exchange 2's request reads:

```
POST /login HTTP/1.1
```

The first word is always the HTTP method. `POST` is used when submitting data to the server — login forms, sign-up forms, search boxes. Here, the browser is sending a username and password to the `/login` endpoint.

---

### Question 2: What status code did the server return in Exchange 3?

**Answer: 403**

The first line of Exchange 3's response reads:

```
HTTP/1.1 403 Forbidden
```

The format is always: `HTTP/version  STATUS_CODE  Reason`. The middle number — 403 — is the status code. 403 Forbidden means the server understood the request but is refusing to fulfil it. The user is authenticated (they have a session cookie) but doesn't have permission to access `/admin/reports`.

---

### Question 3: What is the complete flag?

**Answer: FLAG{headers_tell_the_story}**

The flag was split into two fragments hidden in custom `X-` response headers:

In the **Exchange 2 response**:
```
X-Fragment-1: FLAG{headers_
```

In the **Exchange 3 response**:
```
X-Fragment-2: tell_the_story}
```

Joined in order: `FLAG{headers_` + `tell_the_story}` = `FLAG{headers_tell_the_story}`

---

## Why It Works

HTTP headers are plain text, transmitted before the body of every response. `X-` headers are custom, non-standard headers — any application can add them to carry its own metadata. There is no browser warning, no visual indicator, nothing in the rendered page. They are completely invisible to casual browsing.

But in DevTools → Network tab → Headers, every single response header is listed. Security researchers, CTF players, and attackers all check here routinely. Information disclosure vulnerabilities often involve sensitive data appearing in response headers — software versions in `Server:`, internal paths in `X-Powered-By:`, or debug data in custom headers.

The lesson: always check *all* response headers. Not just the ones you expect.

---

[← hint-2.md](hint-2.md) | [← lesson.md](../lesson.md)
