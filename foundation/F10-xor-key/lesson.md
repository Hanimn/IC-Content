# F10 — The XOR Key
## XOR is the Swiss Army knife of cryptography. Apply it twice and you're back where you started. That's either a superpower or a fatal flaw.

**Time:** ~35 min reading + ~30 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

Imagine a padlock with a very strange property: the same combination that locks it also unlocks it. You spin the dial to 42 to close it. You spin the dial to 42 again to open it. There is no separate "lock" and "unlock" — one motion, one combination, both directions. Anyone who knows the combination can open the lock. But without the combination, the box is sealed.

That padlock is not fiction. It is how XOR encryption works, and it is one of the most important ideas in all of cryptography. Unlike Caesar ciphers, which shift letters around a known alphabet, XOR operates at the level of individual bits — the raw ones and zeros that all data is made of. The same key that scrambles a message will unscramble it. The encryption algorithm and the decryption algorithm are identical.

This simplicity is both XOR's greatest strength and its most dangerous weakness. In the right hands, with the right key, it is theoretically unbreakable — the one-time pad, proven secure by Shannon's theorem, is just XOR with a truly random key as long as the message. In the wrong hands, with a reused or short key, it crumbles instantly. Understanding exactly why will make you a sharper cryptographer and a better defender.

---

## The Concept

### XOR: Exclusive Or

XOR stands for *exclusive or*. It is a logical operation that takes two inputs — each a single bit (0 or 1) — and produces one output. The rule is beautifully simple:

**The output is 1 if the inputs are *different*. The output is 0 if the inputs are the *same*.**

That is the entire rule. Here is the truth table:

| Input A | Input B | A ⊕ B |
|---------|---------|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

The symbol ⊕ is the standard notation for XOR. Read it as "A XOR B."

Compare this to regular OR (which outputs 1 if *either* input is 1 — including when both are 1). XOR is *exclusive* or: only one input can be 1. If both are 1, the output is 0. Same inputs → 0. Different inputs → 1.

### The Self-Inverse Property

Here is the insight that makes XOR useful for encryption. Try this with numbers:

```
5 in binary: 101
3 in binary: 011

5 XOR 3:
  1 0 1
  0 1 1
  -----
  1 1 0  = 6
```

So `5 XOR 3 = 6`. Now XOR the result with the key again:

```
6 XOR 3:
  1 1 0
  0 1 1
  -----
  1 0 1  = 5
```

`6 XOR 3 = 5`. We got back to where we started.

This is the **self-inverse property**: `A XOR B XOR B = A`. Applying XOR with the same value twice always returns the original. Why? Because `B XOR B = 0` for any value of B (every bit XORed with itself is 0). And `A XOR 0 = A` (XOR with 0 leaves the value unchanged). So:

```
A XOR B XOR B
= A XOR (B XOR B)
= A XOR 0
= A
```

The key cancels itself out. This is not a trick or a special case — it is a mathematical property of XOR that holds for any bit, any byte, any number.

### Byte-Level XOR

A byte is 8 bits. XOR applied to two bytes works exactly like applying XOR to each corresponding bit pair independently. Let's work through a real example.

Take the letter `H`. In ASCII, `H` = decimal 72 = `0x48` = binary `0100 1000`.

Take the key character `!`. In ASCII, `!` = decimal 33 = `0x21` = binary `0010 0001`.

XOR each bit pair:

```
H  = 0x48 = 0  1  0  0  1  0  0  0
!  = 0x21 = 0  0  1  0  0  0  0  1
                -------------------------
XOR:        0  1  1  0  1  0  0  1  = 0110 1001 = 0x69
```

`0x69` in ASCII is the letter `i`. So `H XOR ! = i`.

Now apply the key again: `i XOR ! = ?`

```
i  = 0x69 = 0  1  1  0  1  0  0  1
!  = 0x21 = 0  0  1  0  0  0  0  1
                -------------------------
XOR:        0  1  0  0  1  0  0  0  = 0100 1000 = 0x48 = H
```

`i XOR ! = H`. We are back to the original letter. The same key, the same operation, in both directions.

### XOR as Encryption

Once you understand byte-level XOR, building a simple cipher is straightforward:

- **Encrypt:** For each byte of your message, XOR it with the corresponding byte of the key. The result is the ciphertext.
- **Decrypt:** For each byte of the ciphertext, XOR it with the same key byte. The result is the original message.

For a single-byte key (the simplest case), every byte of the message is XORed with the same one byte:

```
plaintext:  FLAG{secret}
key:        !!!!!!!!!!!   (same '!' repeated)

encrypt:  F XOR ! = g
          L XOR ! = m
          A XOR ! = `
          ... and so on
```

The ciphertext is a sequence of scrambled bytes. Without knowing the key (`!` = `0x21`), a casual observer cannot read the message. With the key, decryption is identical to encryption — XOR every ciphertext byte with `0x21` and the plaintext reappears.

### In Practice

Here is a Python snippet showing single-byte XOR encryption and decryption:

```python
# Encrypt
message = b"HELLO"
key = 0x21
ciphertext = bytes([b ^ key for b in message])
print(ciphertext.hex())  # → 6944 4d4d 4e

# Decrypt — identical operation
plaintext = bytes([b ^ key for b in ciphertext])
print(plaintext.decode())  # → HELLO
```

The encryption and decryption loops are exactly the same code. That is not a bug — it is the self-inverse property in action.

### Why Key Reuse Is Catastrophic

Single-byte XOR looks like encryption, but it is trivially breakable in practice. Consider why.

**Attack 1: Key space is tiny.** There are only 256 possible one-byte keys (0x00 through 0xFF). An attacker can try all 256 in milliseconds. For each candidate key, decrypt the ciphertext and check if the result looks like readable text. This is called a brute-force attack, and it succeeds instantly on single-byte XOR.

**Attack 2: The two-ciphertext attack.** This is more elegant and applies to *any* key length if the key is reused. Suppose an attacker intercepts two messages encrypted with the same key K:

```
C1 = P1 XOR K
C2 = P2 XOR K
```

The attacker XORs the two ciphertexts together:

```
C1 XOR C2 = (P1 XOR K) XOR (P2 XOR K)
           = P1 XOR P2 XOR K XOR K
           = P1 XOR P2 XOR 0
           = P1 XOR P2
```

The key K completely disappears. The attacker is left with `P1 XOR P2` — the XOR of the two plaintexts. If both messages are in English, the attacker can use frequency analysis and known-text attacks to recover both messages. This attack is why even the theoretically perfect one-time pad becomes completely broken the moment the key is reused.

**The one-time pad.** If you use a key that is (1) as long as the message, (2) truly random, and (3) never reused, then XOR encryption is provably unbreakable — even by an attacker with unlimited computation. This is the *one-time pad*, and it has been proven mathematically secure. The catch is the constraints. A truly random key as long as every message is impractical for most uses. And "never reused" is an absolute requirement, not a guideline.

### Why This Matters (and Why It's a Vulnerability)

Single-byte XOR appears constantly in CTF challenges and in real-world malware. Malware authors often obfuscate strings — API function names, domain names, IP addresses — by XORing them with a single byte to evade antivirus scanners. The scanner sees scrambled bytes instead of the string `CreateRemoteThread` and may not flag it. But a security researcher who recognises the pattern can brute-force all 256 possible keys in seconds and recover the hidden strings.

In CTF forensics challenges, XOR obfuscation appears in binary files, packet captures, and memory dumps. In crypto challenges, the task is often "given a ciphertext encrypted with an unknown single-byte key, find the flag." The technique is always the same: try all 256 keys, check for `FLAG{` in the output.

The defender takeaway: never use single-byte or short repeated keys. Modern authenticated encryption — AES-GCM, ChaCha20-Poly1305 — uses XOR internally (along with other operations), but with keys that are 128 or 256 bits long and never reused. The XOR building block is the same. The key management is entirely different. Security comes not from hiding the algorithm but from the strength and freshness of the key.

---

## Guided Walkthrough

Let's manually XOR two bytes and verify the self-inverse property using nothing but pencil-and-paper arithmetic (or a browser console).

**Step 1: Convert to binary**

Pick two values: `A = 0xAC` and `K = 0x55`.

```
0xAC = 1010 1100
0x55 = 0101 0101
```

Remember from F06: each hex digit maps to exactly 4 bits. `A` = `1010`, `C` = `1100`, `5` = `0101`, `5` = `0101`.

**Step 2: XOR each bit pair**

Work left to right, applying the rule: same → 0, different → 1.

```
1 0 1 0 1 1 0 0
0 1 0 1 0 1 0 1
-----------------
1 1 1 1 1 0 0 1  = 0xF9
```

So `0xAC XOR 0x55 = 0xF9`.

**Step 3: Verify in the browser console**

Open your browser, press F12, click the Console tab, and type:

```javascript
(0xAC ^ 0x55).toString(16)
```

You should see `"f9"`. The `^` operator in JavaScript is XOR. The `toString(16)` converts the result to hexadecimal.

**Step 4: Confirm the self-inverse property**

```javascript
(0xF9 ^ 0x55).toString(16)
```

You should see `"ac"`. `0xF9 XOR 0x55 = 0xAC`. We are back to where we started.

**Step 5: Try breaking a tiny cipher**

Type this into the console:

```javascript
// Ciphertext: a single XOR-encrypted byte
let cipher = 0x2A;
// Try all 256 possible keys, print any that produce printable ASCII
for (let key = 0; key < 256; key++) {
  let plain = cipher ^ key;
  if (plain >= 32 && plain <= 126) {
    console.log(`Key 0x${key.toString(16).padStart(2,'0')} → '${String.fromCharCode(plain)}'`);
  }
}
```

You'll see all the printable ASCII characters that `0x2A` could be XORed with. This is exactly the brute-force that CTF tools automate — there are only 95 printable ASCII keys to consider, and a human can scan the output in seconds.

---

## Your Challenge

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

An intercepted transmission arrived encrypted — scrambled beyond immediate recognition. The analyst who decrypted the last layer says the payload was XOR'd with a single ASCII character before transmission. The character is known only by its decimal value: 33. Your job is to complete the three training exercises that prove you understand the XOR cipher, then decrypt the message and recover the flag.

**Open:** `challenge/index.html` in your browser

**Your mission:** Complete all three XOR training levels and decrypt the intercepted ciphertext to find the flag.

**Rules:**
- Work through the levels in order — each one teaches something the next level needs
- You may use the browser console for arithmetic, but try the interactive exercises first
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

XOR is all about the bits. Level 1 asks you to fill in the truth table — the rule is simple: the output is 1 when the two inputs are *different*. 0 and 0 are the same, so output is 0. 0 and 1 are different, so output is 1. Apply that rule to each row.

For Level 3, the clue on the page tells you the key's decimal value. Try converting that to a character — what ASCII character has a decimal value of 33?

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

For Level 3: the key is the `!` character. ASCII decimal 33, hex `0x21`. Type `!` in the key input and click Decode — XOR will undo itself and reveal the message. The same key that encrypted it will decrypt it. That is the self-inverse property in action.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete step-by-step walkthrough.

</details>

---

## Concept Card

*Keep this handy during the challenge.*

### Key Terms

| Term | What It Means |
|------|---------------|
| XOR (⊕) | Exclusive or — output is 1 only when the two input bits *differ* |
| Self-inverse | A XOR B XOR B = A — applying XOR with the same key twice returns the original |
| One-time pad | XOR encryption with a key as long as the message, truly random, never reused — provably secure |
| Key reuse | Using the same key for multiple messages — allows C1 XOR C2 to cancel the key entirely |

### Quick Reference

```
XOR truth table:
  0 ⊕ 0 = 0   (same → 0)
  0 ⊕ 1 = 1   (different → 1)
  1 ⊕ 0 = 1   (different → 1)
  1 ⊕ 1 = 0   (same → 0)

Self-inverse: A ⊕ K ⊕ K = A

Byte XOR example:
  0x48 (H) ⊕ 0x21 (!) = 0x69 (i)
  0x69 (i) ⊕ 0x21 (!) = 0x48 (H)

JavaScript XOR: a ^ b
```

### Common Mistakes

- Confusing XOR (⊕) with OR (∨) — OR outputs 1 when *either* input is 1 (including both); XOR outputs 1 only when exactly *one* input is 1
- Thinking 1 ⊕ 1 = 1 — it does not; same inputs always produce 0
- Forgetting that the key must be secret for XOR encryption to provide any security — the algorithm is public; only the key matters

---

## Keep Going

**Practice this skill on:**
- [picoCTF Gym](https://play.picoctf.org/practice) — search for challenges tagged `crypto` or `xor`; many beginner crypto challenges use single-byte XOR
- [cryptopals.com](https://cryptopals.com/) — Set 1 challenges build from single-byte XOR to repeating-key XOR to breaking full AES modes

**Extension challenge (optional):** Write a loop in your browser console that tries all 256 possible single-byte keys on the ciphertext from Level 3, and prints every decryption that starts with a printable ASCII character. Notice how one key produces clearly readable English while all the others produce garbage. This is how automated XOR-key recovery tools work in CTF competitions.

---

[← F09](../F09-shifting-secrets/README.md) | [Foundation Track](../README.md) | [Advanced Track →](../../advanced/README.md)
