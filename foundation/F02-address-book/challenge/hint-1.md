# F02 Challenge — Hint 1

**Use this if you've tried the challenge and are stuck. Read only as much as you need.**

---

## Gentle Nudges

### On private IP ranges

There are three groups of IP addresses that are reserved for local networks — they can never be reached directly from the public internet.

Ask yourself about each machine: is this device something that could be reached from anywhere on the internet, or is it only on a local network?

- Home devices (laptops, routers in your house) → local network → private IP
- A server that "anyone on the internet" can reach → public IP
- A server that is "never exposed to the internet" → private IP

### On the loopback address

One of the machines is described as "never leaving the machine" and "only talks to itself." This is a very specific, special IP address — not a private range at all. It has its own reserved block.

The lesson has a section called **"Localhost — 127.0.0.1"** dedicated to this address. If you haven't read it yet, that's the answer to one of the machines.

### On finding the right private range

There are three private ranges. The clues tell you which *class* of network each private-IP machine belongs to:

- A home network → the most common small-office/home range
- A large corporate network → the range used by big companies
- A medium-sized company branch office → the middle range

Each range has a distinct pattern for the first octet (or first two octets). Look at the reference panel on the challenge page.

### On the public server

The only IP address provided that doesn't match any private range or loopback is the public server. Once you've assigned addresses to all the private machines and the loopback, the public server address becomes obvious — it's the one that doesn't fit any private pattern.

---

Still stuck? Try **hint-2.md** for more specific guidance.

[← Back to Challenge](index.html) | [Hint 2 →](hint-2.md) | [Solution →](solution.md)
