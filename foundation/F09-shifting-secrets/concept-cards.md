# F09 Concept Card: Shifting Secrets

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| Caesar Cipher | A substitution cipher that shifts every letter by a fixed number (the key). "HELLO" with shift 3 becomes "KHOOR". |
| ROT13 | Caesar cipher with shift 13. Self-inverse: applying ROT13 twice returns the original message. Commonly used to hide spoilers online. |
| Frequency Analysis | Counting how often each letter appears in ciphertext. In English, E is most common (~13%). A Caesar shift doesn't change frequencies — just relabels which letter is most common. |
| Brute Force | Trying all possible keys until one works. Caesar only has 25 keys, so a computer cracks it instantly. Real encryption requires key spaces with billions of possibilities. |
| Substitution Cipher | Any cipher that replaces each letter with another. Caesar is the simplest: the substitution follows a fixed shift pattern. |

---

## Caesar Cipher Formulas

| Operation | Formula (A=0, Z=25) |
|-----------|---------------------|
| Encode letter at position P, shift S | `(P + S) mod 26` |
| Decode letter at position P, shift S | `(P − S + 26) mod 26` |
| ROT13 (encode = decode) | `(P + 13) mod 26` |

---

## English Letter Frequency (Top 6)

```
E  ~13%   ████████████
T   ~9%   █████████
A   ~8%   ████████
O   ~7.5% ███████
I   ~7%   ███████
N   ~6.7% ██████
```

The shift doesn't change *how often* letters appear — just *which letter* is most common.

---

## Quick Reference: Decoding Steps

```
1. Count letters in ciphertext → find most frequent letter X
2. Assume X = E  →  shift = (position of X) − 4
3. Apply that shift to decode
4. If output looks like English → correct!
   If not → try the next most common letter
```

---

## Common Mistakes

- Wrap-around: Z (pos 25) + shift 3 = C (pos 2), not pos 28. Always use `mod 26`.
- Wrong direction: to *decode*, subtract the shift (or add 26 first to avoid negatives).
- ROT13 confusion: encoding and decoding are identical — just apply the same operation twice to get back to the original.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
