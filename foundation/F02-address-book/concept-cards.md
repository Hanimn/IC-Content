# F02: Concept Cards — The Address Book

Quick-reference definitions and cheat sheet. Keep this open while working through the challenge.

---

## Key Terms

### IPv4 Address
A 32-bit number written as four decimal groups (octets), each 0–255, separated by dots.
- Format: `a.b.c.d`
- Example: `192.168.1.1`
- Total possible addresses: ~4.3 billion

---

### Private IP
An address in one of three reserved ranges that are **not routable on the public internet**. Used inside local networks (homes, offices, data centres).

| Range | Class | Typical use |
|-------|-------|-------------|
| `10.0.0.0 – 10.255.255.255` | A | Large corporate networks |
| `172.16.0.0 – 172.31.255.255` | B | Medium-sized networks |
| `192.168.0.0 – 192.168.255.255` | C | Home routers, small offices |

Rule of thumb: if the first octet is `10`, or the first two octets are `172.16`–`172.31`, or the first two octets are `192.168` — it's private.

---

### Public IP
An IP address that **is** routable on the public internet — meaning anyone can send packets to it directly (subject to firewalls). Assigned by your Internet Service Provider (ISP).

Example: `203.0.113.50` (this specific range is reserved for documentation, but represents a public-style address).

---

### Localhost
The address `127.0.0.1` — always refers to **the current machine itself**. Traffic sent to this address never leaves the device; it loops back internally.

- Hostname alias: `localhost`
- `http://127.0.0.1` = `http://localhost` (identical)
- The full loopback range is `127.0.0.0 – 127.255.255.255`, but `127.0.0.1` is the one you'll always use
- Memory hook: **127 is home.**

---

### Port
A number from **0 to 65535** that identifies a specific service or process on a device. Written after the IP address with a colon: `IP:PORT`.

Example: `192.168.1.1:8080` means "the service on port 8080 at that IP address."

In a URL: `http://localhost:8080/index.html`

---

### NAT (Network Address Translation)
The mechanism routers use to let many devices with private IP addresses share a single public IP. The router rewrites the source address on outgoing packets and tracks the mapping so replies can be forwarded back to the right internal device.

---

## Quick Reference Cheat Sheet

```
┌─────────────────────────────────────────────────────────────┐
│                   IP ADDRESS CHEAT SHEET                    │
├─────────────────────────────────────────────────────────────┤
│  PRIVATE RANGES (not reachable from internet)               │
│    10.x.x.x          — Class A (large networks)             │
│    172.16–31.x.x     — Class B (medium networks)            │
│    192.168.x.x       — Class C (home / small office)        │
├─────────────────────────────────────────────────────────────┤
│  SPECIAL                                                    │
│    127.0.0.1         — Localhost (loopback, "this machine") │
│    localhost         — Hostname alias for 127.0.0.1         │
├─────────────────────────────────────────────────────────────┤
│  COMMON PORTS                                               │
│    80                — HTTP  (unencrypted web)              │
│    443               — HTTPS (encrypted web)                │
│    22                — SSH   (remote terminal)              │
│    21                — FTP   (file transfer)                │
│    8080              — HTTP-alt (dev web server)            │
│    8000              — HTTP-alt (Python default)            │
├─────────────────────────────────────────────────────────────┤
│  FORMAT                                                     │
│    IP:PORT  →  192.168.1.1:8080                             │
│    URL      →  http://localhost:8080/path                   │
└─────────────────────────────────────────────────────────────┘
```

---

## How to Classify Any IP Address

```
Is it 127.x.x.x?
  YES → Loopback / localhost

Is it 10.x.x.x?
  YES → Private, Class A

Is the first two octets 172.16 through 172.31?
  YES → Private, Class B

Is the first two octets 192.168?
  YES → Private, Class C

None of the above?
  → Public IP
```

---

[← Lesson](lesson.md) | [Challenge →](challenge/index.html) | [F03 →](../F03-request-response/README.md)
