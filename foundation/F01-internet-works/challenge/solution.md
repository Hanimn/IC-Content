# Solution — The Postman Problem

**Flag:** `FLAG{packets_find_the_way}`

---

## The Approach

This is a guided simulation — there's no hidden flag to discover. The flag is earned by correctly answering all five questions about how DNS works. The answers follow logically from understanding the DNS lookup chain.

---

## Step-by-Step

**Question 1:** Before connecting, your browser needs the **IP address** of the server. Domain names are labels for humans; computers route by IP.

**Question 2:** When the DNS resolver doesn't know the answer, it **asks the root nameserver** — the top of the DNS hierarchy.

**Question 3:** The root nameserver doesn't know the IP directly, but it knows who does — it returns a **referral to the .com nameserver**.

**Question 4:** The .com nameserver similarly refers you to **example.com's own authoritative nameserver** — the server that knows everything about that specific domain.

**Question 5:** The authoritative nameserver returns the **IP address: 93.184.216.34** — the actual network location of the server.

After all five correct answers, the flag is displayed:

```
FLAG{packets_find_the_way}
```

---

## Why This Matters

Every web CTF challenge involves URLs, domains, and connections. When Module 04 asks you to "check the response headers in the Network tab", the HTTP response you're looking at only exists because DNS already ran and TCP already connected. Understanding the layers makes everything else make sense.

The flag is also visible in the page's JavaScript source as a comment — if you opened View Source instead of going through the quiz, you might have found it that way. That's intentional: it previews the skill you'll learn in Module 01.

---

## The DNS Chain (Summary)

```
You type www.example.com
    ↓ (browser checks local cache first, then asks DNS resolver)
DNS Resolver → Root NS → .com NS → example.com NS
    ↓
IP: 93.184.216.34
    ↓
TCP connection → HTTP request → page loads
```

---
*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Foundation Track →](../../README.md)*
