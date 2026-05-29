# Hint 2 — Q1 The Mystery Letter

(Try Hint 1 first. This one is more direct.)

---

## Tab 1 — DNS

Three of the four IPs are public-internet addresses. One is a private IP — the kind that only routes inside a local network. F02 calls these "private ranges."

The private ranges are: `10.x.x.x`, `172.16.x.x` through `172.31.x.x`, and `192.168.x.x`. Of the four options, exactly one matches one of those.

## Tab 2 — port

Four ports. Three of them are for very different services:
- 22 is SSH (remote shells).
- 80 is HTTP (web pages).
- 443 is HTTPS (encrypted web pages).

The fourth — port 25 — is the standard for **SMTP**, the protocol mail servers use.

## Tab 3 — HTTP request

The raw request:

```
POST /letters/sent HTTP/1.1
Host: mail.example.school
```

- **Method** is the first word: `POST` (in capitals — the method is always all-caps).
- **Host header** is the value after `Host: `. It's `mail.example.school` (lowercase).
- **Path** is the second word on the first line: `/letters/sent` (with the leading slash).

If you got the method wrong, double-check capitalization. If you got the path wrong, make sure you included the leading `/`.

## Tab 4 — status code chase

Five responses. Only ONE delivered the letter. Read each status code:

- `301 Moved Permanently` — redirect (try this URL instead).
- `302 Found` — also a redirect (just temporary instead of permanent).
- `401 Unauthorized` — server said no, you don't have permission.
- `401 Unauthorized` — same thing again (someone retried, got rejected again).
- `200 OK` — success. THIS is the one that delivered.

So the answer is `200 — OK`.

But also notice: both the `301` AND every later response point at the same path: `/buildings/A-wing/mailroom`. That's the building the letter ended up at. Save that path for Tab 5.

## Tab 5 — assemble the flag

The path is `/buildings/A-wing/mailroom`.

The instructions said: **drop the `/buildings/` prefix, lowercase, replace `/` and `-` with `_`, wrap in `FLAG{...}`.**

Step by step:
1. Drop the prefix: `A-wing/mailroom`
2. Lowercase: `a-wing/mailroom`
3. Replace `-` with `_`: `a_wing/mailroom`
4. Replace `/` with `_`: `a_wing_mailroom`
5. Wrap: `FLAG{a_wing_mailroom}`

Type that into the submit box at the bottom of the page and press Enter.

---

Still stuck? Read `solution.md` for the full transcript.
