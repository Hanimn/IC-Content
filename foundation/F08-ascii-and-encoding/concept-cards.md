# F08 — Concept Cards

Quick-reference cards for ASCII, encoding, and base64. Keep these open during the challenge.

---

## Key Terms

**ASCII**
A 128-character standard (standardised 1963) mapping numbers to letters, digits, and symbols. A=65, a=97, 0=48. Every character you type has an ASCII value.

**Encoding**
Transforming data into a different format for compatibility — not for secrecy. No secret key is used. Anyone who knows the scheme can decode it. Examples: base64, URL encoding, hex.

**Encryption**
Scrambling data with a secret key so only those with the correct key can read it. Without the key, the data is unreadable. Examples: AES, RSA, XOR with a secret key.

**Base64**
An encoding that converts binary data to printable text using exactly 64 safe characters: A-Z, a-z, 0-9, +, /. Output is always 4/3 longer than input. Commonly used in HTTP, cookies, JWT tokens.

**Padding**
The `=` or `==` characters at the end of a base64 string. Added when the input length isn't a multiple of 3 bytes. Signals the end of the encoded data.

**Base64url**
A variant of base64 that uses `-` instead of `+` and `_` instead of `/`. Used in JWT tokens and URLs where `+` and `/` would cause problems. Padding is often stripped.

---

## Quick Reference

### ASCII Ranges
```
65–90   →  A–Z   (uppercase letters)
97–122  →  a–z   (lowercase letters)
48–57   →  0–9   (digit characters)
32      →  space
123     →  {
125     →  }
95      →  _
```

### Key Flag Characters
```
F = 70    L = 76    A = 65    G = 71
{ = 123   } = 125   _ = 95
```

### Full flag start in ASCII decimal
`FLAG{` = `70 76 65 71 123`

### Base64 Recognition Signs
```
Characters:  Only A-Z, a-z, 0-9, +, /  (and = at end only)
Padding:     Ends in = or ==
Length:      Always divisible by 4
```

### Known Base64 Examples
```
FLAG{test}      →  RkxBR3t0ZXN0fQ==
Hello           →  SGVsbG8=
admin:password  →  YWRtaW46cGFzc3dvcmQ=
```

### Decode Tool
[https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/) → add "From Base64" to recipe

---

## Encoding vs. Encryption — Side by Side

| Question | Encoding | Encryption |
|---|---|---|
| Needs a secret key? | No | Yes |
| Anyone can reverse it? | Yes | No (without key) |
| Purpose | Compatibility / transport | Secrecy |
| Base64 is this? | YES | No |
| AES is this? | No | YES |

**Bottom line:** Base64 offers zero security. Never use it to hide sensitive information.

---

## Common Mistakes

**Confusing encoding with encryption.** Base64 looks like random text, but it is completely reversible with no key. It offers zero security. Don't mistake "unreadable" for "secret".

**Forgetting base64url.** In JWT tokens, base64url replaces `+` with `-` and `/` with `_`, and often strips `=` padding. If you're decoding a JWT payload and getting errors, try base64url decoding instead.

**Assuming `=` padding is always present.** Some implementations strip the trailing `=` padding. A base64 string without `=` at the end is still valid — just check if the length is divisible by 4 after you add the padding back.

**Off-by-one errors when counting characters.** When a challenge says "the 15th character is wrong", remember to count from 1, not 0.

---

## ASCII Hex Connection

Because ASCII values fit in one byte, they map directly to hex:

```
A = decimal 65  = hex 0x41
a = decimal 97  = hex 0x61
Difference:     = hex 0x20  (= decimal 32 = space)
```

Uppercase and lowercase letters differ by exactly 0x20. XORing any letter's ASCII value with 0x20 flips its case. This trick appears in XOR cipher challenges.
