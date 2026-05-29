# Q3 — Extract the Embedded Secret

> **Coming Soon.** This capstone is scaffolded but not yet built.

> **Before you start (when this ships):** read the [Ethical Hacking Pledge](../../ETHICAL-HACKING-PLEDGE.md) if you haven't yet.

Tier 3 · Code & Logic · gates after F09–F11

---

When this capstone is built, it will require you to combine the three Tier 3 skills:

- **F09** — Caesar cipher / ROT13
- **F10** — XOR encryption with a repeating key
- **F11** — extracting strings from a compiled binary

The challenge: a fake compiled program contains an XOR-encrypted payload. The key is hidden in the program's strings, but Caesar-shifted to throw off a casual reader. You'll `strings` the binary, recognize the shifted hint, brute-force or eyeball the Caesar shift, then XOR-decrypt the payload to recover the flag.

For now, [Q1 — The Mystery Letter](../Q1-fundamentals/) is the live capstone. Come back here after the others land.

---

[← Quartet Capstones](../README.md) | [Foundation Track](../../foundation/README.md)
