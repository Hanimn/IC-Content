# F02 Challenge — Solution

**Full walkthrough. Only read this after attempting the challenge.**

---

## The Flag

```
FLAG{localhost_is_home_127}
```

You earn this flag by correctly assigning all six IP addresses in the challenge.

---

## Complete Answer Key

### 1. HOME-ROUTER → `192.168.1.1`

**Why:** The description says "gateway between your home network and the internet" and "has a private-side address." Home networks use the **Class C private range**: `192.168.0.0 – 192.168.255.255`. The most common default subnet is `192.168.1.x`, and routers are conventionally assigned `.1` (the first address in the subnet) — so `192.168.1.1` is the textbook home router address. If you look at your own router's admin page, it's almost certainly at this address.

---

### 2. YOUR-LAPTOP → `192.168.1.42`

**Why:** Your laptop is on the same home network as the router — same `192.168.1.x` subnet. The description says "assigned a private address by the router." Home routers hand out addresses starting around `.100` through `.254` via DHCP, but any address in the `192.168.1.2 – 192.168.1.254` range is valid. The challenge uses `.42` as a recognisable example. The key insight: it's on the same **Class C private subnet** as the router, just a different host address.

---

### 3. LOOPBACK → `127.0.0.1`

**Why:** The description is the giveaway: "never leaves the machine" and "only talks to itself." This is the **loopback interface** — a virtual network interface that exists entirely inside the operating system. Traffic sent to `127.0.0.1` never touches the network card, never passes through a router, and is invisible to any other device. The entire `127.0.0.0 – 127.255.255.255` range is reserved for loopback, but `127.0.0.1` is the one you use. It also has the hostname alias `localhost`.

The flag itself references this: `localhost_is_home_127` — 127 is the first octet of the loopback range, and "home" is a way of remembering that loopback means "right here."

---

### 4. PUBLIC-SERVER → `203.0.113.50`

**Why:** The description says "anyone on the internet can reach" it — which means it cannot be a private IP (private IPs are not routable on the public internet) and cannot be loopback (loopback never leaves the machine). After assigning all five private/special addresses to the other machines, the public server gets the one address that doesn't match any reserved range: `203.0.113.50`.

The `203.0.113.0/24` range (TEST-NET-3) is technically reserved for documentation — you'll see it in textbooks and examples to represent a "real-looking" public IP without accidentally using a real server's address. In a real scenario, this would be an ISP-assigned address like `104.21.48.2` or `185.230.63.171`.

---

### 5. INTERNAL-DB → `10.0.0.15`

**Why:** "A database server inside a large corporate network. Never exposed to the internet." Large organisations use the **Class A private range**: `10.0.0.0 – 10.255.255.255`. This is the biggest private range (16 million addresses) and is used by companies, universities, and cloud providers for their internal networks. The address `10.0.0.15` is well within that range. The key identifier: starts with `10.`

---

### 6. BRANCH-OFFICE-PC → `172.16.5.20`

**Why:** "A medium-sized company's branch office. Uses a Class B private range." The **Class B private range** is `172.16.0.0 – 172.31.255.255`. Medium-sized businesses and office branches commonly use this range. The `172.16` block is the start of it. The address `172.16.5.20` puts this machine on subnet `172.16.5.x`, which is a typical internal branch office assignment.

The Class B range trips people up because it's not just `172.x.x.x` — only `172.16` through `172.31` are private. `172.15.x.x` and `172.32.x.x` are public.

---

## Recap Table

| Machine | IP | Range / Type | Why |
|---------|-----|-------------|-----|
| HOME-ROUTER | `192.168.1.1` | Class C private | Home gateway, first address in subnet |
| YOUR-LAPTOP | `192.168.1.42` | Class C private | Device on same home subnet |
| LOOPBACK | `127.0.0.1` | Loopback | Never leaves the machine |
| PUBLIC-SERVER | `203.0.113.50` | Public | Reachable from internet, not in any private range |
| INTERNAL-DB | `10.0.0.15` | Class A private | Large corporate internal network |
| BRANCH-OFFICE-PC | `172.16.5.20` | Class B private | Medium company, Class B range |

---

## Why the Flag Says What It Says

`FLAG{localhost_is_home_127}`

- **localhost** is the hostname alias for `127.0.0.1`
- **is home** — the loopback address is "home base"; it always means the current machine
- **127** — the first octet of the loopback range, the part you need to recognise

When you see `127.0.0.1` or `localhost` in a CTF challenge, it means a server is running on the same machine you're using. You'll encounter this constantly — from Module 01 onwards, many challenges ask you to run a local server and connect to it via `http://localhost:PORT`.

---

## What's Next

Now that you can classify any IP address at a glance, the next module covers what actually travels over those connections.

**F03 — The Request and the Response:** You'll learn the structure of an HTTP request — the text message your browser sends when it connects to an address and port. Every web challenge in this curriculum involves reading, crafting, or manipulating HTTP requests.

[← Hint 2](hint-2.md) | [Back to Challenge](index.html) | [Foundation Track](../README.md) | [Next: F03 →](../../F03-request-response/README.md)
