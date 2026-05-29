# Concept Cards — F01: The Postman Problem

Quick reference for the key terms and ideas in this module.

---

## Key Terms

| Term | Definition |
|---|---|
| **IP Address** | A unique number that identifies a device on a network (e.g. `192.168.1.1`) |
| **Domain Name** | A human-readable label for an IP address (e.g. `google.com`) |
| **DNS** | Domain Name System — the distributed "phone book" that translates domain names to IPs |
| **DNS Resolver** | The first stop in a DNS lookup; typically run by your ISP or a public provider (`8.8.8.8`) |
| **Packet** | A small chunk of data; large files are split into packets for transmission and reassembled at the destination |
| **HTTP** | HyperText Transfer Protocol — the language browsers and servers use to exchange web pages |

---

## DNS Lookup Chain (Quick Reference)

```
You type URL → DNS Resolver → Root NS → TLD NS → Authoritative NS → IP returned → TCP connect → HTTP request
```

Each step in more detail:

```
You type: www.example.com
    ↓
Your computer asks: DNS Resolver (e.g. 8.8.8.8)
    ↓ (resolver doesn't know — asks upstream)
Root Nameserver: "Try the .com nameserver"
    ↓
.com Nameserver: "Try example.com's nameserver at 205.251.196.1"
    ↓
example.com Nameserver: "The IP is 104.20.23.154"
    ↓
Your browser connects to 104.20.23.154
    ↓
TCP handshake → HTTP request → page loads
```

---

## Common Mistakes

- **Confusing the domain name with the IP address.** `google.com` and `142.250.80.46` are related but not the same thing. The domain is a label; the IP is the actual network address. You can have multiple IPs for one domain, and the IP can change without the domain changing.

- **Thinking DNS is "slow."** In practice a DNS lookup takes under 50ms, and results are cached by your browser, operating system, and resolver. Most page loads don't trigger a full lookup chain — only the first visit to a domain does.

- **Forgetting that HTTP only starts after TCP.** The sequence is: DNS (get the IP) → TCP (open the connection) → HTTP (make the request). If you're debugging a connection problem, it might be a DNS failure, a TCP failure, or an HTTP failure — they're different layers with different error messages.

---

## Numbers to Know

| Value | What It Means |
|---|---|
| `127.0.0.1` | Localhost — your own machine |
| `8.8.8.8` | Google's public DNS resolver |
| `1.1.1.1` | Cloudflare's public DNS resolver |
| `104.20.23.154` | An IP currently behind `example.com` (Cloudflare-hosted; the exact value can change) |
| Port `80` | Default port for HTTP |
| Port `443` | Default port for HTTPS |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
