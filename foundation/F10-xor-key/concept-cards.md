# F10 Concept Cards — The XOR Key

*Quick reference — keep this handy during the challenge.*

---

## Card 1: XOR (Exclusive Or)

**What it is:** A bitwise logic operation with two inputs and one output.

**The rule:** Output is **1** when the two inputs are *different*. Output is **0** when the two inputs are the *same*.

| Input A | Input B | A ⊕ B |
|---------|---------|-------|
| 0 | 0 | **0** |
| 0 | 1 | **1** |
| 1 | 0 | **1** |
| 1 | 1 | **0** |

*Memory aid: "Different → 1, Same → 0." Do not confuse with regular OR — XOR returns 0 when both inputs are 1.*

---

## Card 2: The Self-Inverse Property

**Statement:** `A ⊕ B ⊕ B = A` for any values A and B.

**Why:** `B ⊕ B = 0` always (any bit XORed with itself is 0), and `A ⊕ 0 = A` always (XOR with 0 changes nothing).

**What it means for encryption:** The same key that encrypts a message will decrypt it. There is no separate encrypt and decrypt function — they are identical.

```
Encrypt: plaintext  ⊕ key = ciphertext
Decrypt: ciphertext ⊕ key = plaintext
```

**Example:**
```
5 ⊕ 3 = 6      (101 ⊕ 011 = 110)
6 ⊕ 3 = 5      (110 ⊕ 011 = 101)  ← back to start
```

---

## Card 3: Byte XOR

**What it is:** XOR applied to each corresponding bit pair across two 8-bit bytes.

**How it works:** Align the two bytes, then XOR bit-by-bit in each of the 8 positions.

```
H  = 0x48 = 0100 1000
!  = 0x21 = 0010 0001
            ---------
XOR         0110 1001 = 0x69 = 'i'
```

**Verify in the browser console:** `(0x48 ^ 0x21).toString(16)` → `"69"`

**And back:** `(0x69 ^ 0x21).toString(16)` → `"48"` — self-inverse confirmed.

---

## Card 4: XOR Encryption and Decryption

**Single-byte key cipher:** XOR every byte of the plaintext with the same key byte.

```python
# Encrypt
ciphertext = [plaintext_byte ^ key for plaintext_byte in message]

# Decrypt (identical operation)
plaintext  = [ciphertext_byte ^ key for ciphertext_byte in ciphertext]
```

**Security requirement:** The key must be secret. Without the key, an attacker can only try all 256 possible key values — which takes a computer less than a millisecond.

**In JavaScript:**
```javascript
let key = 0x21;
let decoded = cipherBytes.map(b => b ^ key);
let text = decoded.map(b => String.fromCharCode(b)).join('');
```

---

## Card 5: Key Reuse Vulnerability

**The attack:** If the same key K is used to encrypt two messages P1 and P2:

```
C1 = P1 ⊕ K
C2 = P2 ⊕ K

C1 ⊕ C2 = (P1 ⊕ K) ⊕ (P2 ⊕ K) = P1 ⊕ P2
```

The key K cancels out entirely. The attacker has `P1 ⊕ P2` — the XOR of the two plaintexts — and can use frequency analysis to recover both messages.

**The one-time pad exception:** If the key is (1) as long as the message, (2) truly random, and (3) *never* reused, XOR encryption is mathematically unbreakable. Reuse any of those three constraints and security collapses.

**Defender fix:** Never use single-byte or short repeated keys. Use authenticated encryption (AES-GCM or ChaCha20-Poly1305) with freshly generated keys.

---

## Quick Lookup

```
XOR symbol: ⊕ (mathematics), ^ (code)

ASCII values useful for XOR:
  '!' = 0x21 = 33 decimal
  'A' = 0x41 = 65 decimal
  'a' = 0x61 = 97 decimal

Brute-force single-byte XOR (browser console):
  for (let k=0; k<256; k++) {
    let out = cipherBytes.map(b => b^k);
    let s = out.map(b => String.fromCharCode(b)).join('');
    if (s.startsWith('FLAG')) console.log(k, s);
  }
```

---

## Common Mistakes

- Thinking `1 ⊕ 1 = 1` — it does not; same inputs always produce 0 in XOR
- Treating XOR encryption as strong on its own — it is a building block, not a complete cipher; key length, randomness, and non-reuse matter entirely
- Forgetting that `String.fromCharCode()` may produce strange characters for non-printable bytes — display these as dots (`·`) or hex when decoding ciphertexts

---

*Full lesson: [lesson.md](lesson.md) | [Back to Foundation Track](../README.md)*
