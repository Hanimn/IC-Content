# F08 — Hint 2

More specific guidance. Only read this after hint-1.

---

## Part 1 — Full Decode Table

Work through each number in order:

```
70  →  F
76  →  L
65  →  A
71  →  G
123 →  {
97  →  a
115 →  s
99  →  c
105 →  i
105 →  i   (the same value appears twice — that's correct)
95  →  _
97  →  a
110 →  n
100 →  d
95  →  _
```

Put them together in order and you have the first part of the flag.

---

## Part 2 — Finding the Corrupted Character

The corrupted string is: `YmFzZTY0X2RlY29kXWR9`

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
17: X   ← this is the corrupted character
18: W
19: R
20: 9
```

Position 17 is `X`. That is wrong.

The correct base64 string for this fragment starts with: `YmFzZTY0X2RlY29k`

Compare position 17 in `YmFzZTY0X2RlY29kZWR9` (the correct string) — position 17 should be `Z`, not `X`.

Change the `X` at position 17 to `Z`.

Corrected string: `YmFzZTY0X2RlY29kZWR9`

The full base64 alphabet is:
`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`

Paste the corrected string into the on-page decoder. The output should be readable text — enter it into field B.
