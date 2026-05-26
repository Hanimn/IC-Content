# Solution: F09 — Shifting Secrets

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

This challenge is a **Caesar cipher** (substitution cipher) challenge. Both ciphertexts are encoded with a shift of 13 — also known as **ROT13**. A solver working through this would notice that the decoded output panel starts showing recognizable English words when the slider reaches 13, and that applying the same shift to the second ciphertext reveals a string in `FLAG{...}` format.

---

## Step-by-Step Solution

**Step 1: Try the frequency analysis**
Click **Analyze Ciphertext** in the Frequency Analysis panel. The bar chart shows that **V** is the most common letter in Transmission 1. In English, E is most common (position 4). V is position 21. The gap: 21 − 4 = **17**... but wait, frequency analysis gives you a starting point, not a guaranteed answer. The panel itself suggests trying shift 17 — but if that doesn't produce English, try adjacent values. The lesson here is that frequency analysis narrows the search; it doesn't always land exactly right on short texts.

*You see: a bar chart with V highlighted as most frequent, and a suggestion to try shift 17.*

**Step 2: Try the suggested shift, then adjust**
Set the slider to 17. The output doesn't look like clean English yet. The next most common letters in English after E are T, A, O, I — so try the shifts implied by each. Or just sweep the slider slowly.

*Alternatively: because this is a short message, sweep the slider from 0 to 25 and watch the Decoded Output. At shift 13, the text snaps into English.*

**Step 3: Set the slider to 13**
Move the slider to **13**. The Decoded Output for Transmission 1 shows:

```
CONGRATULATIONS AGENT YOUR FIRST MISSION IS COMPLETE THE CIPHER SHIFT IS THIRTEEN
```

The text turns green — the decoder recognizes English words. The message even tells you: the shift is thirteen.

*You see: decoded plaintext in green, confirming shift 13.*

**Step 4: Read Transmission 2 at shift 13**
With the slider still at 13, look at the **Second Transmission** section. Transmission 2 is:
```
SYNT{ebgngr_naq_erirny_13}
```

Decoded at shift 13:
```
FLAG{rotate_and_reveal_13}
```

The box turns green. Only the letters shift — the `{`, `}`, `_`, and `13` pass through unchanged.

*You see: FLAG{rotate_and_reveal_13} in green.*

**Step 5: Submit the flag**
Type `FLAG{rotate_and_reveal_13}` into the flag input and click Submit (or press Enter).

*You see: "Access granted. Credentials verified. Mission complete."*

---

## The Flag

```
FLAG{rotate_and_reveal_13}
```

---

## Why ROT13 Is Self-Inverse

The English alphabet has 26 letters. A shift of 13 is exactly halfway around. So if you shift a letter by 13 and then shift the result by 13 again, you've moved 26 positions — which wraps back to where you started.

```
ROT13(ROT13('A')) = ROT13('N') = 'A'   ✓
ROT13(ROT13('Z')) = ROT13('M') = 'Z'   ✓
```

This means **the same operation encodes and decodes**. There's no separate decode step — just apply ROT13 again. This property makes ROT13 convenient for hiding spoilers in online forums, obfuscating joke punchlines, and as a trivial "don't read this yet" marker in software. It is not secure in any meaningful sense.

---

## Why Frequency Analysis Worked (Partially)

The bar chart showed which ciphertext letter appeared most often. Caesar cipher preserves the *frequency distribution* of letters — it just relabels them. In plaintext, E is most common; in the ciphertext, whatever E was shifted to is most common.

For Transmission 1, the message is short (~80 characters), so frequency analysis gives a strong hint but not a perfect answer — short texts have statistical noise. On a longer ciphertext (hundreds of characters), frequency analysis alone would identify the shift with near certainty.

---

## The Defender's Perspective

Caesar cipher has only 25 possible keys. A computer running at modern speeds can decrypt all 25 and present every candidate plaintext before you blink. There is nothing a developer can do to make Caesar cipher secure — the key space is simply too small.

Real encryption (AES, RSA, ChaCha20) uses keys with 128 to 256 bits of entropy. That means 2^128 to 2^256 possible keys — numbers so large that trying them all would take longer than the age of the universe even with every computer on Earth working simultaneously.

Frequency analysis fails against ciphers that change the substitution at each position (like the Vigenère cipher) or that use mathematical operations instead of simple shifts (like XOR with a random key). The Caesar cipher is broken by design — it was a good idea in 58 BCE, and a toy example in the modern era.

---

## Write Your Own Writeup

Good CTF players document their solutions. Here's a template — fill it in:

---

**Challenge:** F09 — Shifting Secrets
**Category:** Cryptography
**Difficulty:** Easy
**Tools used:** Browser, cipher wheel slider, frequency analysis panel

**Approach:**
[How did you approach this? Did you use frequency analysis, brute-force the slider, or recognize ROT13?]

**Steps:**
1. [What you tried first]
2. [How you identified the shift]
3. [How you decoded Transmission 2 to get the flag]

**Flag:** `FLAG{rotate_and_reveal_13}`

**What I learned:**
[What does this challenge teach you about the limits of simple substitution ciphers? Why isn't frequency analysis a perfect attack on short messages?]

---

## Reflection Questions

1. Caesar cipher has 25 possible keys. If a computer can test 1 billion keys per second, how long would it take to try all Caesar keys? How does that compare to AES-128 (2^128 keys)?

2. ROT13 is self-inverse because 13 + 13 = 26 ≡ 0 (mod 26). What other shifts have interesting properties? (Hint: what about shift 0? Shift 26?)

3. Frequency analysis works on Caesar because every E always maps to the same ciphertext letter. What would happen if you used a *different* shift for each letter in the message? Would frequency analysis still work? (This is the idea behind the Vigenère cipher — research it if you're curious.)

---

*Great work. On to the next one.*

[Back to Module](../README.md) | [F10 — XOR Cipher →](../../F10-xor-cipher/README.md)
