# Concept Cards — F14

## Key Terms

| Term | Definition |
|------|-----------|
| **Hash function** | A one-way function that turns any input into a fixed-size fingerprint |
| **Hash / digest / checksum** | The fixed-size output of a hash function (different names, same thing) |
| **Avalanche effect** | Property where a tiny input change causes a totally different output |
| **Collision** | Two different inputs that produce the same hash |
| **Preimage resistance** | Given a hash, no efficient way to find an input that produces it |
| **Encryption** | A reversible transform — uses a key, can be undone |
| **Hashing** | A non-reversible transform — no key, no undo |
| **Salt** | A random per-record value mixed into a password before hashing |
| **MD5** | Old hash function — 128 bits, 32 hex chars. Broken under attack but still used as a non-security checksum |
| **SHA-256** | Modern standard — 256 bits, 64 hex chars. Used by Git, Bitcoin, software publishers, certificates |
| **bcrypt / argon2** | Hash functions designed to be slow on purpose, used for password storage |

---

## Hash sizes at a glance

| Algorithm | Output bits | Output hex characters | Status |
|-----------|-------------|----------------------|--------|
| MD5 | 128 | 32 | Broken for security, fine as a non-adversarial checksum |
| SHA-1 | 160 | 40 | Broken — avoid |
| SHA-256 | 256 | 64 | Modern standard |
| SHA-512 | 512 | 128 | Bigger SHA — same family |

**Tip:** When you see a hex string in a CTF challenge, count the characters. The length names the algorithm.

---

## Encryption vs. Hashing

| Question | Encryption | Hashing |
|---|---|---|
| Reversible? | Yes (with key) | No |
| Needs a key? | Yes | No |
| Output size? | ~Same as input | Fixed |
| Used for? | Hiding messages | Fingerprinting data |

---

## The avalanche effect (concrete)

```
SHA-256("Hello, world.") =
  f8c3bf62a9aa3e6fc1619c250e48abe7519373d3edf41be62eb5dc45199af2ef

SHA-256("Hello, world!") =
  315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3
```

One byte different. Outputs share zero structure.

---

## File integrity workflow

```
Publisher                          You
─────────                          ───
1. Build the file                  
2. Compute SHA-256                 
3. Post file + SHA-256 ──────►  4. Download the file
                                5. Compute SHA-256 of what you got
                                6. Compare to the posted SHA-256
                                   ├─ Match → file is genuine
                                   └─ Mismatch → file is corrupted or tampered
```

---

## Common Mistakes

- **"Hashes are encryption."** No. Encryption is reversible; hashing isn't.
- **"If I hash my password, no one can ever recover it."** Mostly true, but if your password is short or common, an attacker can guess it, hash each guess, and check for a match. Length and uniqueness matter.
- **"MD5 is broken so I should never use it."** Broken for security where an attacker controls the input. Fine for a quick fingerprint where nobody is trying to forge.
- **"The hash function is secret."** No — hash algorithms are public and standardized. The strength comes from the math, not from secrecy.
- **"Two different inputs can never produce the same hash."** They absolutely can — that's a collision. For SHA-256 it's just astronomically rare. For MD5 it's been done deliberately.

---

## Quick recognition

- Hex string, 32 characters → likely MD5
- Hex string, 40 characters → SHA-1
- Hex string, 64 characters → SHA-256
- Hex string, 128 characters → SHA-512
- Starts with `$2a$` or `$2b$` → bcrypt
- Starts with `$argon2` → argon2

---

[← Back to lesson](lesson.md) | [Back to README](README.md) | [Open the challenge →](challenge/index.html)
