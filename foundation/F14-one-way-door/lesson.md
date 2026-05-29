---
title: "The One-Way Door"
tagline: "You get a stained filter and a sad puddle."
time: ""
tier: "Security Concepts"
---
You have a smoothie. Strawberries, banana, a splash of milk, a swirl of honey. You drink half, decide you want the strawberries back, and pour what's left through a coffee filter.

You get a stained filter and a sad puddle.

The strawberries are not coming back. They never were. The blender is a one-way door — easy in one direction, impossible in reverse.

That's hashing.

---

## The story so far

Every cipher you've met until now has been a door with a key. Caesar shifted letters by some number — apply the same shift the other way and the message comes back. XOR mixed plaintext with a key — XOR again with the same key and the plaintext returns. **Encryption is reversible.** That's the whole point of it. You scramble a message, send it, and the person on the other end unscrambles it.

But sometimes you don't want the message back. Sometimes you only want to ask:

> "Is this exactly the same thing I expected?"

For that, you don't need a reversible function. You need something faster, simpler, and more strict — a function that turns any input into a fixed-size fingerprint, the same way every time. Same input, same fingerprint. Different input — even by one bit — totally different fingerprint.

That's a **hash function**.

---

## What a hash function is

A hash function is a recipe with three rules:

1. **Same input → same output.** Hash the word `hello` today; you get a number. Hash it again next year on a different computer; you get the same number.
2. **Output size is fixed.** Hash a single letter or hash the entire works of Shakespeare — both produce a hash of exactly the same length. SHA-256 always produces 256 bits (64 hex characters). MD5 always produces 128 bits (32 hex characters).
3. **One-way.** Given the hash, there is no efficient way to recover the input. None. The function is computable forward in microseconds and unreachable in reverse.

Hashes are usually written as hex (F06). A SHA-256 hash looks like:

```
ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
```

That's 64 hex characters. It's the SHA-256 of the three letters `abc`. Three letters in. Sixty-four hex characters out. Always.

---

## Encryption vs. hashing — the table

| | **Encryption** | **Hashing** |
|---|---|---|
| Reversible? | Yes, with the right key | No — by design |
| Needs a key? | Yes | No |
| Output size | Roughly same as input | Always fixed (depends on the algorithm) |
| Used for | Hiding messages | Fingerprinting data |
| You've seen | Caesar (F09), XOR (F10) | This module |

Both are cryptographic. Both transform data. But they answer different questions.

Encryption answers: *"Can I read this without the key?"*
Hashing answers: *"Has this changed since the last time I looked?"*

---

## The avalanche effect

Here is the strangest property of a hash function. Watch the difference between hashing two inputs that are almost identical:

```
SHA-256("Hello, world.")
  → 315f5bdb76d078c43b8ac0064e4a0164612b1fce77c869345bfc94c75894edd3

SHA-256("Hello, world!")
  → d9014c4624844aa5bac314773d6b689ad467fa4e1d1a50a1b8a99d5a95f72ff5
```

The only difference between the inputs is the period vs. the exclamation mark — one byte. The outputs share **nothing**. Not the first character, not the last, not any pattern. They look like two completely unrelated random strings.

This is called the **avalanche effect**. A tiny ripple at the input cascades into a completely different output. It's a feature, not a bug. It's exactly what makes hashes useful as fingerprints — if one byte of a 10-megabyte file changes, the hash of the file changes everywhere. There's no way to nudge the input a little to get a similar-looking output.

---

## Hash functions you'll meet

A few names you'll see thrown around:

- **MD5** — old, fast, 128 bits (32 hex characters). Mathematicians proved long ago that you can construct two different inputs with the same MD5 hash on purpose, so it's no longer trusted for anything where an attacker controls the input. But it's still everywhere as a quick fingerprint for files where nobody is trying to forge them.
- **SHA-1** — slightly newer, 160 bits. Also broken under attack. Don't use it for security; you might still see it in old systems.
- **SHA-256** — modern standard, 256 bits. Believed strong. Used by Bitcoin, by Git, by software publishers, by certificate authorities, by basically everything.
- **SHA-512** — bigger sibling of SHA-256, 512 bits. Often used when 256 bits feels insufficient.
- **bcrypt / scrypt / argon2** — designed specifically to be *slow*. (You'll see why in a moment.)

When you see a string of hex that's exactly 32 characters long, suspect MD5. 64 characters? Probably SHA-256. The length is the giveaway.

---

## Two stories about why hashing exists

**Story one: file integrity.**

You download a 2 GB Linux distribution from the internet. It traveled through a dozen routers, three internet service providers, and eventually arrived on your laptop. How do you know it wasn't corrupted in transit? Or worse — replaced by an attacker on a coffee-shop network with a malicious version?

The publisher posted a SHA-256 hash next to the download. You compute the SHA-256 of the file you received. If they match, the bytes are exactly identical to what the publisher uploaded. If they don't, something is wrong — even one bit different and the hashes won't match (avalanche effect again).

This is what your computer does, silently, every time you install software signed by the operating system vendor. It's the most common defensive use of hashing, and the one you'll do in today's challenge.

**Story two: passwords.**

When you sign up for a website with a password, what should the website store?

Definitely not the password itself. If a website's database leaks, every user's password is suddenly public. (This actually happens. Often.) So instead, the website stores the *hash* of your password. When you log in next time, the website hashes the password you typed and compares it to the stored hash. If they match, you're in. If a database leaks, attackers see hashes — and hashes don't reverse.

For this to keep working in modern systems, defenders learned to add a **salt** — a random per-user string mixed in before hashing. That way, two users with the same password get different stored hashes, and an attacker can't precompute one hash and reuse it across many accounts. Modern systems also use slow hash functions on purpose (bcrypt, argon2) so that even if an attacker tries millions of guesses, each guess takes meaningful time.

You'll meet salting and slow-hashing properly in Phase 2 (Module 08 already touched on weak credentials). For today, you only need the principle: **hashing exists so that a system can verify "this is the same thing" without ever needing to reveal what the thing actually is.**

---

## Where you'll meet hashes again

- **File downloads** — install a piece of software, the installer page lists a SHA-256 next to the download
- **Git commits** — every commit has a SHA-1 hash. That's how Git knows two commits are the same
- **Forensics** — investigators hash a hard drive image so they can prove in court that the evidence wasn't modified
- **CTF challenges** — "verify this file matches the expected SHA-256" or "what's special about these two files that share an MD5"
- **Blockchain** — every block contains the hash of the previous block. Change one byte anywhere in the chain and every later hash breaks
- **Cryptographic signatures** — sign a hash, not the whole document, because the hash is a fingerprint of the document

---

## Guided walkthrough

Pick any short word. Mentally walk it through SHA-256. You can't actually compute SHA-256 in your head — nobody can — but you can predict what will happen:

1. The output will be 64 hex characters.
2. Hashing the same word again will produce the same 64 characters.
3. Changing one letter (case, punctuation, anything) will produce a totally different 64 characters with no visible pattern in common.
4. There is no path back from the 64 characters to the word.

Now imagine you have two files on your laptop. They look identical when opened. They have the same name, same size, same modification date. Are they exactly the same data?

You hash both. Hashes match → bytes are identical, every single one of them. Hashes don't match → something is different, somewhere, even if you can't see where. That's the entire workflow in two lines.

---

## Your challenge

You've downloaded a software installer. The publisher posted the official SHA-256 hash on their website. Your job is to:

1. Compute the SHA-256 of the file you received
2. Compare it to the published hash
3. Decide whether to trust the file

But this is a multi-file challenge — the publisher offers several files for download, and one of them has been tampered with by an attacker. You need to identify which one is good and which one is bad. The flag is the reward for getting it right.

A live SHA-256 hasher inside the page will compute hashes for you. You bring the judgment.

---

[← Back to README](README.md) | [Open the challenge →](challenge/index.html)
