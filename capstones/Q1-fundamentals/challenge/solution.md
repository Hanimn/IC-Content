# Solution — Q1 The Mystery Letter

**Flag:** `FLAG{a_wing_mailroom}`

The flag is built at submit time from the building name discovered in Tab 4. The literal flag string never appears in the page's JavaScript — it's assembled only after the kid solves Tab 4 and earns the building name.

---

## Step-by-step walkthrough

### Tab 1 — DNS lookup

The browser tried to resolve `mail.example.school`. Four candidate IPs:
- `142.250.190.46` — public Google service
- `104.20.23.154` — public website (example.com on Cloudflare)
- `10.0.0.42` — **private subnet (10.x.x.x range — F02 covered this)**
- `127.0.0.1` — loopback

The school's mail server is internal. Internal addresses come from the RFC1918 private ranges: `10.x`, `172.16-31.x`, or `192.168.x`. **`10.0.0.42`** is the only one that fits.

✓ Tab 1 solved. Pip 1 turns green.

### Tab 2 — IP and port

Now we know `10.0.0.42`. Which port?

- 22 — SSH (remote shells). Wrong.
- 25 — **SMTP (mail-sending). Right.**
- 80 — HTTP (web). Wrong category.
- 443 — HTTPS (secure web). Same category as 80.

The textbook mail-sending port is 25. ✓ Tab 2 solved.

### Tab 3 — HTTP request

The raw request:

```
POST /letters/sent HTTP/1.1
Host: mail.example.school
User-Agent: PostBot/1.0
Content-Type: text/plain
Content-Length: 42
```

Three answers needed:
- **Method:** `POST` (the first word of line 1, all-caps).
- **Host header:** `mail.example.school` (the value after `Host: `).
- **Path:** `/letters/sent` (the second word of line 1, with its leading slash).

Type those in, click Check. ✓ Tab 3 solved.

### Tab 4 — status code chase

The chain:

```
1.  301 Moved Permanently
    Location: /buildings/A-wing/mailroom
2.  302 Found
    Location: /buildings/A-wing/mailroom?retry=1
3.  401 Unauthorized
4.  401 Unauthorized
5.  200 OK
    delivered to /buildings/A-wing/mailroom
```

The `200 OK` is the response that actually delivered. The others are redirects or rejections.

But also notice that both the `301` Location header AND the body of the `200` point to `/buildings/A-wing/mailroom`. That's the building the letter went to. The challenge captures this path internally when Tab 4 solves.

✓ Tab 4 solved. Submit box unlocks.

### Tab 5 — build the flag

The path is `/buildings/A-wing/mailroom`. The instructions:

1. Drop the `/buildings/` prefix → `A-wing/mailroom`
2. Lowercase → `a-wing/mailroom`
3. Replace `-` with `_` → `a_wing/mailroom`
4. Replace `/` with `_` → `a_wing_mailroom`
5. Wrap → `FLAG{a_wing_mailroom}`

Type into the submit box. Press Enter. **Flag accepted.** Pip 5 turns green. Discoveries strip reads "5 of 5 tabs walked." Success card scrolls into view.

---

## What the kid just did

This was their first chained multi-skill capstone. Each tab tested one Fundamentals lesson (F01–F04 and F00 in reverse order), but the answers had to thread together — Tab 1's IP fed Tab 2's port; Tab 3's request was the one that triggered Tab 4's chain; Tab 4's discovered path became Tab 5's flag-building input.

Every real CTF works this way. Multi-step. Multi-skill. Each step's answer is the next step's input. After Q1, "I've done a real CTF" stops being aspirational.

---

## Things to try after solving

- **Inspect the page source** (Ctrl+U / Cmd+Option+U). Confirm: the literal flag string `FLAG{a_wing_mailroom}` does NOT appear anywhere in the source. The building name is set in JS only when Tab 4 solves.
- Try entering the flag with `FLAG{` already at 4/5 — the submit button is disabled until 4/5. That's deliberate.
- Try running this challenge for a friend who's done F00–F04 but no Q1 yet. Watch which tab they get stuck on. That tells you where their corresponding Foundation lesson left a gap.
