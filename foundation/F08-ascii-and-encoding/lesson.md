---
title: "ASCII All the Way Down"
tagline: "### Key Ranges to Memorise"
time: ""
tier: "Data & Encoding"
---
## The Story Behind Every Character

Every message you've ever typed — every text, every email, every line of code — is stored as a list of numbers. `H` is 72. `e` is 101. `l` is 108. The word "Hello" is stored as `72 101 108 108 111`.

When computers send text over networks, they agree on a shared table of these number-to-character mappings. Without the table, a sequence of numbers is meaningless. With it, everything becomes readable.

Learning to use this table is one of the most frequently-needed skills in CTF competitions. You will use it in almost every category: forensics, cryptography, reverse engineering, and web. Let's learn it properly.

---

## The ASCII Table

**ASCII** stands for **American Standard Code for Information Interchange**. It was standardised in 1963 — long before the internet as we know it — and it defines 128 characters, numbered 0 through 127.

The printable characters (the ones you can actually see) run from **32** (space) to **126** (the `~` tilde). Everything below 32 is a control character — things like newline (`\n` = 10), tab (`\t` = 9), and carriage return (`\r` = 13).

### Key Ranges to Memorise

These ranges appear in CTF after CTF. You don't need to memorise every individual character — just these anchors:

```
48–57   →  '0' through '9'   (the digit characters)
65–90   →  'A' through 'Z'   (uppercase letters)
97–122  →  'a' through 'z'   (lowercase letters)
32      →  space
123     →  {
125     →  }
95      →  _
```

The curly braces and underscore matter because CTF flags almost always look like `FLAG{some_thing_here}`.

### Full Printable ASCII Table (Decimal 32–126)

| Dec | Hex | Chr | Dec | Hex | Chr | Dec | Hex | Chr |
|-----|-----|-----|-----|-----|-----|-----|-----|-----|
| 32  | 20  | (space) | 33  | 21  | !   | 34  | 22  | "   |
| 35  | 23  | #   | 36  | 24  | $   | 37  | 25  | %   |
| 38  | 26  | &   | 39  | 27  | '   | 40  | 28  | (   |
| 41  | 29  | )   | 42  | 2A  | *   | 43  | 2B  | +   |
| 44  | 2C  | ,   | 45  | 2D  | -   | 46  | 2E  | .   |
| 47  | 2F  | /   | 48  | 30  | 0   | 49  | 31  | 1   |
| 50  | 32  | 2   | 51  | 33  | 3   | 52  | 34  | 4   |
| 53  | 35  | 5   | 54  | 36  | 6   | 55  | 37  | 7   |
| 56  | 38  | 8   | 57  | 39  | 9   | 58  | 3A  | :   |
| 59  | 3B  | ;   | 60  | 3C  | `<` | 61  | 3D  | =   |
| 62  | 3E  | `>` | 63  | 3F  | ?   | 64  | 40  | @   |
| 65  | 41  | A   | 66  | 42  | B   | 67  | 43  | C   |
| 68  | 44  | D   | 69  | 45  | E   | 70  | 46  | F   |
| 71  | 47  | G   | 72  | 48  | H   | 73  | 49  | I   |
| 74  | 4A  | J   | 75  | 4B  | K   | 76  | 4C  | L   |
| 77  | 4D  | M   | 78  | 4E  | N   | 79  | 4F  | O   |
| 80  | 50  | P   | 81  | 51  | Q   | 82  | 52  | R   |
| 83  | 53  | S   | 84  | 54  | T   | 85  | 55  | U   |
| 86  | 56  | V   | 87  | 57  | W   | 88  | 58  | X   |
| 89  | 59  | Y   | 90  | 5A  | Z   | 91  | 5B  | [   |
| 92  | 5C  | \   | 93  | 5D  | ]   | 94  | 5E  | ^   |
| 95  | 5F  | _   | 96  | 60  | `   | 97  | 61  | a   |
| 98  | 62  | b   | 99  | 63  | c   | 100 | 64  | d   |
| 101 | 65  | e   | 102 | 66  | f   | 103 | 67  | g   |
| 104 | 68  | h   | 105 | 69  | i   | 106 | 6A  | j   |
| 107 | 6B  | k   | 108 | 6C  | l   | 109 | 6D  | m   |
| 110 | 6E  | n   | 111 | 6F  | o   | 112 | 70  | p   |
| 113 | 71  | q   | 114 | 72  | r   | 115 | 73  | s   |
| 116 | 74  | t   | 117 | 75  | u   | 118 | 76  | v   |
| 119 | 77  | w   | 120 | 78  | x   | 121 | 79  | y   |
| 122 | 7A  | z   | 123 | 7B  | `{` | 124 | 7C  | \|  |
| 125 | 7D  | `}` | 126 | 7E  | ~   |     |     |     |

Keep this table open when you work CTF challenges. With practice, you'll start to recognise the key values automatically.

---

## ASCII and Hex

Because each ASCII value fits in one byte (values 0–127, well within the 0–255 range of a byte), ASCII values are very often written in hexadecimal.

Some quick examples:
- `A` = decimal 65 = hex `0x41`
- `a` = decimal 97 = hex `0x61`
- `0` (the digit zero) = decimal 48 = hex `0x30`

Notice something interesting: the difference between uppercase `A` (0x41) and lowercase `a` (0x61) is exactly **0x20** — which is 32 in decimal, the same as the ASCII value for space.

This pattern holds for every letter pair:
- `B` = 0x42, `b` = 0x62 (difference: 0x20)
- `Z` = 0x5A, `z` = 0x7A (difference: 0x20)

This isn't a coincidence. In some encoding and cipher challenges, you can flip between uppercase and lowercase by XORing a character's ASCII value with `0x20` (32). You'll see this pattern again in the XOR module.

---

## What Is Encoding?

Before we get to base64, let's be precise about the word **encoding**.

Encoding means **transforming data into a different format for a practical reason** — to make it easier to transmit, store, or process. The key features of encoding:

1. **No secret key required.** Anyone who knows the encoding scheme can decode it.
2. **Purpose is compatibility**, not secrecy.
3. **Completely reversible** with the right tool.

This is completely different from encryption.

**Encoding vs. Encryption — the critical distinction:**

| | Encoding | Encryption |
|---|---|---|
| Key required? | No | Yes |
| Purpose | Compatibility / transport | Secrecy |
| Anyone can decode? | Yes | Only with the key |
| Examples | Base64, URL encoding, hex | AES, RSA, XOR with key |

**Base64 is not encryption.** This is the single most important fact in this lesson. If you see base64 and think "this is secret", you are wrong. Anyone can decode it in seconds. Never use base64 to protect sensitive data.

---

## Base64 — The Why

In the early days of the internet, email systems were designed to carry **printable text** only. They literally could not handle raw binary data (the kind that makes up image files, documents, executables, and most other files).

If you wanted to send a file as an email attachment — a photo, a PDF, anything — you had a problem: how do you transmit binary data through a system that only understands text?

The solution was **base64**: a way of converting any sequence of bytes into a string that contains only **safe, printable characters**.

Specifically, base64 uses exactly **64 characters**:
- 26 uppercase letters: `A–Z`
- 26 lowercase letters: `a–z`
- 10 digits: `0–9`
- Two symbols: `+` and `/`

With these 64 characters (plus `=` for padding), any binary data can be represented as a printable string. That string can travel through any text-based system safely, and be decoded back to the original binary on the other end.

---

## Base64 — How It Works (Conceptual)

You don't need to do base64 arithmetic by hand in CTF competitions (tools exist), but understanding the mechanism helps you recognise base64 and reason about errors.

Here's the conceptual process:

1. Take your input bytes, **three at a time**. (3 bytes = 24 bits)
2. Split those 24 bits into **four groups of 6 bits** each. (4 × 6 = 24)
3. Each 6-bit group has a value from 0 to 63. Map each value to one of the 64 base64 characters.
4. If the input length isn't a multiple of 3 bytes, **pad** the output with `=` characters.

This is why base64 has some predictable properties:
- **Output is always 4/3 longer than the input** — 3 bytes become 4 characters
- **Often ends in `=` or `==`** — the padding when input isn't divisible by 3
- **Only contains** A-Z, a-z, 0-9, +, / (and `=` only at the very end)
- **Length is always a multiple of 4** — groups of 4 output characters

---

## Recognising Base64

These three clues will tell you something is probably base64:

**Clue 1 — The alphabet.** Only contains `A-Z`, `a-z`, `0-9`, `+`, `/`. No spaces, no punctuation except those symbols, and `=` only at the very end.

**Clue 2 — Padding.** Ends in `=` or `==`. (Some implementations strip the padding, but it's a strong signal when present.)

**Clue 3 — Length.** The string length is always a multiple of 4.

### Examples You'll See

| Original text | Base64 encoded |
|---|---|
| `FLAG{test}` | `RkxBR3t0ZXN0fQ==` |
| `Hello` | `SGVsbG8=` |
| `admin:password` | `YWRtaW46cGFzc3dvcmQ=` |

Notice how `admin:password` is a common HTTP Basic Authentication format. When you log in to a website with HTTP Basic Auth, your browser sends `admin:password` encoded as base64 in the request headers — not encrypted, just encoded. Anyone intercepting the request can decode it instantly.

---

## Where Base64 Appears in CTFs

Once you know what to look for, you'll spot base64 everywhere:

**HTTP Basic Authentication:** The `Authorization` header contains credentials base64-encoded. The format is `username:password`, base64-encoded, sent as `Authorization: Basic YWRtaW46cGFzc3dvcmQ=`.

**Cookies with encoded data:** Many web apps store data in cookies as base64-encoded JSON. A cookie value like `eyJyb2xlIjoiZ3Vlc3QifQ==` looks like gibberish until you decode it: `{"role":"guest"}`. You'll work with exactly this in the main web series.

**JWT tokens:** JSON Web Tokens (used for authentication in modern web apps) have three parts separated by dots. The middle section is the **payload** — base64url-encoded (a variant of base64 that uses `-` instead of `+` and `_` instead of `/`). Decoding the payload reveals what claims the token makes about the user.

**Embedded data in files:** Binary files sometimes contain base64-encoded strings embedded in them. Forensic tools like `strings` can extract them. Files hiding data (steganography) often base64-encode the hidden content before embedding it.

**Challenge text:** CTF challenges frequently encode clues, flags, or partial flags in base64 as a layer of obscurity (not security) to stop you from just grepping for `FLAG{`.

---

## Guided Walkthrough: CyberChef

CyberChef is a free, browser-based tool built by GCHQ (British intelligence agency) for encoding, decoding, and analysing data. It's one of the most useful tools in a CTF player's toolkit.

Let's try it now.

**Step 1:** Open [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/)

**Step 2:** In the "Recipe" panel (middle column), click "From Base64" — you can search for it in the search box at the top of the Operations panel.

**Step 3:** In the "Input" box (top right), paste:
```
RkxBR3t0ZXN0fQ==
```

**Step 4:** The "Output" box (bottom right) should immediately show:
```
FLAG{test}
```

**Step 5:** Try it in reverse. Click the arrows icon to swap Input/Output direction. Or add "To Base64" to the recipe. Type any text in the Input and watch it get encoded.

**Step 6:** Try decoding `YWRtaW46cGFzc3dvcmQ=`. What does it say?

Once you understand what base64 looks like and how to decode it, you're ready for the challenge.

---

## Summary

- **ASCII** maps numbers to characters. The table hasn't changed since 1963, and knowing the key ranges (65-90 for A-Z, 97-122 for a-z, 48-57 for 0-9) is fundamental to CTF work.
- **Encoding** transforms data for compatibility. No key needed. Anyone can reverse it.
- **Encryption** protects data with a key. Only the keyholder can reverse it.
- **Base64** is an encoding — not encryption. It makes binary data transmittable as text.
- Recognise base64 by: only A-Z/a-z/0-9/+/ characters, ends in = or ==, length divisible by 4.
- Base64 appears in HTTP auth headers, cookies, JWT tokens, and CTF challenges constantly.

Next up: the challenge. You'll decode an ASCII transmission, repair a corrupted base64 string, and retrieve the full flag.
