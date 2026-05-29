# Solution — F14

**Flag:** `FLAG{75236d9b9eb82460}`

> The flag is derived at success time from `SHA-256("orion-gui-binary")`,
> truncated to the first 16 hex characters. The literal flag string never
> appears in the page's source — that's the entire point of the redesign.

---

## The tampered file

The bad file is **`orion-gui-binary`**.

When you click it, the page computes its SHA-256 and compares it to the publisher's official hash:

```
computed: d0f14968d97b38ca04227e7283ef4a58f98c4ba46ad077f39bf26db10eeac0a4
official: 9f08b15672630bd44d4adf4624bd1a0716e3e5fe21baed4610492fb9ad86edae
```

These don't share a single matching character at any position. They look like two unrelated random strings. That's the avalanche effect doing its job.

The other four files (`orion-installer-1.0.0.tar.gz`, `release-notes-1.0.0.txt`, `orion-cli-binary`, `README.md`) all hash to exactly the value the publisher posted. They are genuine.

---

## Why this works

Inside the challenge, the content of `orion-gui-binary` looks normal at first glance:

```
ORION-GUI-EXECUTABLE
Magic: 0x4D5A9000
Arch: x86_64
Version: 1.0.0
Build-Date: 2024-09-15T08:32:00Z
INJECTED: backdoor_payload_v3
```

That last line is the only difference between this file and the genuine version the publisher built. One added line. A few dozen extra bytes in a 2.7 MB binary.

But SHA-256 doesn't care that 99.99% of the file is unchanged. Any difference at all — one bit anywhere — produces a completely different fingerprint. The hash of the tampered file shares **no structure** with the hash of the original. There's no way to "almost match." It either matches exactly, or it's a different file.

That is exactly the property that makes hashes useful for integrity. An attacker can't tweak a file slightly to fool the check. They'd have to find a different file that produces the *exact* same SHA-256 hash — which, for SHA-256, no one on Earth knows how to do.

---

## Part 1 — Why it asked for three distinct inputs

The avalanche demo at the top of the page wasn't filler. It was teaching you the property you needed for Part 2.

If you typed `Hello`, then `hello`, then `Hello!`, you saw three completely unrelated 64-character outputs. That's not a coincidence — it's the entire reason hashing works as a fingerprint. Your eyes learned what "the same" looks like (identical strings) and what "different" looks like (visual chaos), so when you got to Part 2 you could spot the mismatch instantly.

---

## Why this is the real workflow

Every time you install software signed by Apple, Microsoft, or any Linux distribution maintainer, your computer is doing this exact comparison silently in the background. Every time `git fetch` pulls commits from a remote, Git verifies SHA-1 hashes (now SHA-256 in newer repos). Every time a certificate authority signs a TLS certificate, they're signing a hash of the certificate, not the certificate itself.

The whole structure depends on one fact: **a tiny change in the input produces a totally different output, and you cannot run the function backwards**.

A hash is not a lock. A lock keeps people out. A hash just tells you, with mathematical certainty, whether the thing in front of you is the same thing you expected.

---

## What to take with you

- **A hash is a fingerprint, not a lock.** It doesn't hide data. It identifies data.
- **One byte different → totally different hash.** This is the avalanche effect, and it's the whole reason this works.
- **The publisher's hash is the source of truth.** You only trust your file if its hash matches what the publisher posted on a channel you trust (their website over HTTPS, their GPG-signed key, etc.).
- **Hashing is one-way.** You computed hashes for these files. You could not, even in principle, run that backwards to recover the original content from a hash alone.

You'll see this pattern again in:
- **Forensics CTFs** — verifying that a disk image hasn't been modified since seizure
- **Crypto CTFs** — recognizing hash algorithms by output length, cracking weak hashes (Phase 2)
- **Web CTFs** — Subresource Integrity (`<script integrity="sha384-...">`)
- **Real life** — every download page on the internet that lists a checksum next to a file

---

## Up next

[F15 — The Picture That Knew Too Much →](../../F15-picture-knew-too-much/README.md)

A photo isn't just pixels. There's a whole notebook of metadata behind it, and sometimes a hidden message *inside* the pixels themselves. Same idea — surface vs. structure — applied to images.

---

[← Back to challenge](index.html) | [Back to F14 README](../README.md)
