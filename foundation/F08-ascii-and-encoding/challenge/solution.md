# F08 — Solution

**Flag:** `FLAG{ascii_and_base64_decoded}`

---

## Part 1 — ASCII Decimal Decode

The transmission `70 76 65 71 123 97 115 99 105 105 95 97 110 100 95` decodes as follows:

```
70  →  F   (ASCII 70 = uppercase F)
76  →  L
65  →  A
71  →  G
123 →  {   (the opening curly brace — appears in every CTF flag)
97  →  a   (lowercase a, the start of the a-z range at 97)
115 →  s   (97 + 18 = 115, or count: a=97 … s=115)
99  →  c
105 →  i
105 →  i   (same value again — the sequence has two i's in a row)
95  →  _   (underscore — appears in most CTF flag bodies)
97  →  a
110 →  n
100 →  d
95  →  _
```

Decoded: `FLAG{ascii_and_`

This is the first half of the flag.

---

## Part 2 — Repair and Decode the Base64 Fragment

**Corrupted base64:** `YmFzZTY0X2RlY29kXWR9`

**Step 1: Find the corruption**

Count character by character from position 1:

```
 1: Y
 2: m
 3: F
 4: z
 5: Z
 6: T
 7: Y
 8: 0
 9: X
10: 2
11: R
12: l
13: Y
14: 2
15: 9
16: k
17: X   ← corrupted character
18: W
19: R
20: 9
```

Position 17 is `X`. The correct character at this position is `Z`.

**Step 2: Fix it**

Change position 17 from `X` to `Z`:

Corrected: `YmFzZTY0X2RlY29kZWR9`

**Step 3: Decode**

Using `atob('YmFzZTY0X2RlY29kZWR9')` in the browser console, or pasting into the on-page decoder:

Output: `base64_decoded}`

---

## Full Flag

Part 1: `FLAG{ascii_and_`
Part 2: `base64_decoded}`

**Combined:** `FLAG{ascii_and_base64_decoded}`

---

## Why This Matters — Base64 in Real Web CTFs

The `atob()` function in JavaScript decodes base64 natively — no external tools needed.

In many web CTF challenges (and in real-world web applications), session data is stored in cookies as base64-encoded JSON. For example, if you open browser DevTools and inspect a cookie, you might find a value like:

`eyJyb2xlIjoiZ3Vlc3QifQ==`

Run `atob('eyJyb2xlIjoiZ3Vlc3QifQ==')` in the browser console and you get: `{"role":"guest"}`

You can then modify that JSON to `{"role":"admin"}`, re-encode it with `btoa('{"role":"admin"}')`, and replace the cookie value. If the server trusts the cookie without proper cryptographic validation, you just escalated your privileges.

This is a real technique used in the main web security series (Module 03). Understanding that base64 is encoding — not encryption — is what makes this attack visible. If that cookie value looked like random noise, many people would assume it was encrypted and leave it alone. Knowing what base64 looks like means you always check.

The lesson: when something looks like base64, decode it. You will often find readable data that the developer assumed was "hidden."
