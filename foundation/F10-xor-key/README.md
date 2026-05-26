# F10 — The XOR Key

> XOR is the Swiss Army knife of cryptography. Apply it twice and you're back where you started. That's either a superpower or a fatal flaw.

---

## Module Metadata

| Field | Details |
|---|---|
| **Difficulty** | Beginner–Intermediate |
| **Time** | ~35 min reading + ~30 min challenge |
| **Prerequisites** | F05 (Everything Is a Number), F06 (Thinking in Hex), F09 (Shifting Secrets) |
| **Tools** | Web browser |

---

## What You'll Learn

- Read and complete the XOR truth table from first principles
- Apply XOR bit-by-bit across two bytes to compute the result
- Decrypt a single-byte XOR cipher by finding and applying the key
- Explain the self-inverse property — why the same operation both encrypts and decrypts
- Describe why key reuse destroys XOR security

---

## Contents

| File | Description |
|---|---|
| `lesson.md` | Core lesson covering XOR logic, byte XOR, encryption, and key reuse |
| `concept-cards.md` | Quick-reference cards and key term definitions |
| `challenge/index.html` | Interactive three-level XOR challenge |
| `challenge/hint-1.md` | Hint 1 (directional, no spoilers) |
| `challenge/hint-2.md` | Hint 2 (more specific guidance) |
| `challenge/solution.md` | Full walkthrough and flag |

---

## Flag

`FLAG{xor_undoes_itself_0x21}`

---

## Dependency Context

F10 is the **final module of the Foundation Track**. Completing it unlocks:

- **Cryptography challenges** — XOR encryption and single-byte key recovery are among the most common crypto challenge types in beginner CTFs. You'll use exactly what you learned here.
- **Binary Exploitation** — XOR masking appears in shellcode and obfuscated payloads. Recognising it is a prerequisite for many pwn challenges.
- **Forensics** — XOR-obfuscated files (malware, embedded data) are a standard forensics technique. The same decryption logic applies at file scale.

XOR is also a building block inside modern encryption standards like AES. Understanding it at the bit level gives you a foundation for everything that follows in the full curriculum.

---

[← F09](../F09-shifting-secrets/README.md) | [Foundation Track](../README.md) | [F11 — From Code to Computer →](../F11-code-to-computer/README.md)
