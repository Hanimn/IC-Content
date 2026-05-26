# Solution: F10 — The XOR Key

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

This challenge is a **single-byte XOR cipher** challenge. The flag was encrypted by XOR-ing each character's ASCII value with the key byte `0x21` (the `!` character, decimal 33). Because XOR is self-inverse — `(plaintext XOR key) XOR key = plaintext` — the exact same operation decrypts the message. A solver working through this challenge would notice that the key clue gives the decimal value 33, recognise that as the ASCII code for `!`, and apply it to the ciphertext.

---

## Step-by-Step Solution

### Level 1: XOR Truth Table

The rule for XOR: **output is 1 when the two inputs are different, 0 when they are the same**.

Click each output square to set the correct value:

| Input A | Input B | Correct Output |
|---------|---------|----------------|
| 0       | 0       | **0** (same → 0) |
| 0       | 1       | **1** (different → 1) |
| 1       | 0       | **1** (different → 1) |
| 1       | 1       | **0** (same → 0) |

Click "Check Answers". All four outputs correct unlocks Level 2.

### Level 2: Byte XOR — 0x48 ⊕ 0x21

Convert both bytes to binary, then XOR each bit pair using the Level 1 rule:

```
H  = 0x48 = 0  1  0  0  1  0  0  0
!  = 0x21 = 0  0  1  0  0  0  0  1
            --  --  --  --  --  --  --  --
Result:     0  1  1  0  1  0  0  1  = 0110 1001 = 0x69
```

Work through each of the 8 columns:
- Column 1: 0 ⊕ 0 = **0** (same)
- Column 2: 1 ⊕ 0 = **1** (different)
- Column 3: 0 ⊕ 1 = **1** (different)
- Column 4: 0 ⊕ 0 = **0** (same)
- Column 5: 1 ⊕ 0 = **1** (different)
- Column 6: 0 ⊕ 0 = **0** (same)
- Column 7: 0 ⊕ 0 = **0** (same)
- Column 8: 0 ⊕ 1 = **1** (different)

Result: `0110 1001` = `0x69` = `i` in ASCII.

Click the output bits to set `0 1 1 0 1 0 0 1`, then "Check Answers". Level 3 unlocks.

### Level 3: Decrypt the Message

**Step 1: Identify the key.**
The clue says decimal 33. Look up ASCII 33: that is the `!` character (also written `0x21` in hex).

**Step 2: Enter the key.**
Type `!` in the key input field and click **Decode**.

**Step 3: See the decrypted output.**
The page XORs every ciphertext byte with `0x21` and displays:
- Hex output: `46 4C 41 47 7B 78 6F 72 5F 75 6E 64 6F 65 73 5F 69 74 73 65 6C 66 5F 30 78 32 31 7D`
- ASCII output: `FLAG{xor_undoes_itself_0x21}`

**Step 4: Submit the flag.**
The flag input auto-fills. Click "Submit Flag" to confirm.

---

## The Flag

```
FLAG{xor_undoes_itself_0x21}
```

---

## Why This Works

### The Self-Inverse Property

XOR has a mathematical property that makes it perfect for simple encryption: applying XOR with the same value twice always returns the original. In algebra:

```
A ⊕ K ⊕ K = A ⊕ (K ⊕ K) = A ⊕ 0 = A
```

This is because `K ⊕ K = 0` for any K (a bit XORed with itself is always 0), and `A ⊕ 0 = A` (XOR with 0 is a no-op). So there is no separate encryption and decryption function — they are identical.

### Why Single-Byte XOR Is Weak

A one-byte key has only 256 possible values (0x00 through 0xFF). An attacker can try all 256 in milliseconds. For each candidate key, they decrypt the ciphertext and check if the output looks like readable text (contains `FLAG{`, or has high frequency of common ASCII letters). This brute-force attack always succeeds for single-byte XOR.

### The Key Reuse Catastrophe

If the same key K is used to encrypt two different messages P1 and P2:

```
C1 = P1 ⊕ K
C2 = P2 ⊕ K

C1 ⊕ C2 = (P1 ⊕ K) ⊕ (P2 ⊕ K) = P1 ⊕ P2
```

The key cancels out entirely. The attacker has P1 ⊕ P2 — the XOR of both plaintexts. If both messages are in English, known-plaintext and frequency attacks can recover both messages from this. This applies to any key length, not just single-byte — reuse is always fatal.

### The Defender Fix

Never use single-byte or short repeated keys. Modern authenticated encryption (AES-GCM, ChaCha20-Poly1305) uses XOR internally — but with 128-bit or 256-bit keys, properly managed nonces, and authentication tags that detect tampering. The XOR building block is the same. The key management is what makes it secure.

---

## Reflection Questions

Think through these before moving on — no solutions provided:

1. You have two ciphertexts, both encrypted with the same unknown single-byte key. You know the first plaintext starts with `Hi`. How much of the key can you recover? What about the rest of the second message?

2. What is a one-time pad? Why is it theoretically unbreakable, and why is it impractical for most real-world use?

3. XOR is used inside AES (the encryption standard protecting your banking and messaging apps). Why is AES secure when single-byte XOR is trivially broken? What does AES add that raw XOR lacks?

---

## Write Your Own Writeup

**Challenge:** F10 — The XOR Key
**Category:** Crypto / Foundation
**Difficulty:** Beginner–Intermediate
**Tools used:** [List the browser tools you used]

**Approach:**
[How did you approach finding the key? Did you recognise the decimal 33 hint immediately, or did you try other values first?]

**Steps:**
1. [Level 1 — what you did]
2. [Level 2 — how you computed the byte XOR]
3. [Level 3 — how you identified the key and decoded the message]

**Flag:** `FLAG{xor_undoes_itself_0x21}`

**What I learned:**
[What does the self-inverse property mean? Why is key reuse dangerous? What would you do differently as a developer?]

---

*Great work. The XOR key is yours.*

[← Back to Module](../README.md) | [Foundation Track →](../../README.md)
