# Module 04 Concept Card: HTTP Headers

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| HTTP | HyperText Transfer Protocol — the request/response language browsers and servers use |
| Request | Browser → server: "give me this resource, here's metadata about me" |
| Response | Server → browser: "here it is, here's metadata about it" |
| Header | A `Name: Value` metadata pair carried alongside a request or response |
| `User-Agent` | Request header: your browser name and version |
| `Content-Type` | Response header: type of data in the body (`text/html`, `application/json`, etc.) |
| `Server` | Response header: what server software is running (can reveal version info) |
| `X-*` headers | Custom headers — any `X-` prefixed header a developer adds |
| Network tab | DevTools panel logging every HTTP request the page makes in real time |

---

## Network Tab Workflow

```
1. Open DevTools (F12 or Cmd+Option+I)
2. Click the Network tab
3. Reload the page (F5) — captures all requests from scratch
4. Click any request in the list
5. Use the subtabs:
   ├── Headers  → request headers + response headers
   ├── Preview  → formatted response body (JSON, HTML)
   ├── Response → raw response body text
   └── Timing   → request phase breakdown
```

---

## Response Headers vs. Request Headers (in the Headers subtab)

| Section | Who sends it | What's in it |
|---------|-------------|--------------|
| **Response Headers** | Server | `Content-Type`, `Set-Cookie`, `Server`, `X-*` custom headers |
| **Request Headers** | Your browser | `User-Agent`, `Host`, `Cookie`, `Accept`, `Referer` |

---

## Common HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200 OK` | Success — the resource was returned |
| `301 / 302` | Redirect — go to a different URL |
| `403 Forbidden` | You don't have permission |
| `404 Not Found` | Resource doesn't exist |
| `500 Server Error` | Something went wrong on the server |

---

## Common Mistakes

- **Network tab is empty after loading the page.** It only records requests made *while it's open* — open it first, then reload.
- **Visiting `file://` instead of `http://localhost:8080`.** HTTP headers require a real HTTP server. Check your address bar.
- **Missing background requests.** After reloading, scroll through the full Network tab list — `fetch()` calls to secondary resources appear as separate entries, not just the main HTML.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
