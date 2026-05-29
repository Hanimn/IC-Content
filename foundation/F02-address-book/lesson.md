---
title: "The Address Book"
tagline: "Every device on the internet has an address. Two digits from the right tell you if it ever leaves the building."
time: ""
tier: "Fundamentals"
---
> Every device on the internet has an address. Two digits from the right tell you if it ever leaves the building.

---

## The Apartment Building

Imagine a large apartment building in the middle of a city.

From the street, there is **one address**: 42 Cyber Avenue. That is what the city knows. Delivery trucks, taxis, and postal workers all use that address to find the building.

But once you're inside, there are hundreds of apartments. **Apartment 3B. Apartment 12A. Apartment 101.** Each one is different, and the building's mailroom knows how to route a letter once it arrives.

If you live in Apartment 7C and order a package online, the sender writes "42 Cyber Avenue" on the box. The building's front desk (the **router**) signs for it, looks at the name, and sends it up to apartment 7C.

From the outside world's perspective, everyone in that building shares the same address. From the inside, every apartment has its own.

This is almost exactly how the internet works.

---

## What is an IP Address?

An **IP address** (Internet Protocol address) is a number that identifies a device on a network.

The version almost everyone uses today is **IPv4**. It looks like this:

```
192.168.1.1
```

Four numbers, separated by dots. Each number is called an **octet** and can be anywhere from 0 to 255.

The format is: `a . b . c . d`

Because each octet is 0–255, that gives us roughly **4 billion** possible combinations. That sounds like a lot — it used to be enough — but the internet now has more devices than that, which is why a newer system called IPv6 exists. For now, IPv4 is what you'll see in almost every beginner CTF challenge.

Here are some examples of what IPv4 addresses look like:

```
8.8.8.8          — Google's public DNS server
104.20.23.154    — example.com (currently; the value can change)
192.168.1.1      — a typical home router
10.0.0.1         — an internal corporate network gateway
127.0.0.1        — something very special (more on this soon)
```

---

## Private vs. Public IP Ranges

Here is where the apartment analogy pays off.

The internet's governing bodies long ago set aside three blocks of IP addresses and declared: **these are private. They belong to local networks. They will never appear on the public internet.**

The three private ranges are:

```
10.0.0.0   – 10.255.255.255    (Class A — large networks, e.g. big companies)
172.16.0.0 – 172.31.255.255    (Class B — medium networks, e.g. offices)
192.168.0.0 – 192.168.255.255  (Class C — small networks, e.g. home routers)
```

Everything else is **public** — meaning it is directly reachable from anywhere on the internet (assuming a firewall doesn't block it).

**How to spot a private IP in the wild:**

- Starts with `10.` → private, Class A
- Starts with `172.16.` through `172.31.` → private, Class B
- Starts with `192.168.` → private, Class C

**Practical test:** Right now, your laptop or phone is probably assigned a `192.168.x.x` address by your home router. That address is your apartment number. Your router's external address — the one the rest of the internet sees — is something completely different.

Private IPs **cannot be reached from outside the local network** unless the router explicitly forwards traffic. This is why you can't just type your laptop's `192.168.1.42` address into a browser on your phone and reach your laptop — unless you're on the same Wi-Fi.

**Why does this matter for CTFs?**

When a challenge description says "the target is at `10.10.14.20`", you know immediately that it's on a local/VPN network — you need to be connected to that network to reach it. When a target is at `203.0.113.50`, it's a public server anyone can reach.

---

## Localhost — 127.0.0.1

This is the most important IP address you will type during CTF challenges.

`127.0.0.1` is the **loopback address**. It is special because it always means: "this machine, right here, talking to itself."

When you type `http://127.0.0.1` into a browser, the network stack doesn't send traffic out to any router or cable. The connection loops back inside the machine itself and reaches whatever server is running locally.

`127.0.0.1` also has a hostname alias: **`localhost`**. They are interchangeable. `http://localhost` and `http://127.0.0.1` reach the same place.

The full loopback range is `127.0.0.0 – 127.255.255.255`, but in practice you will only ever see `127.0.0.1`.

**Why does this matter constantly in CTFs?**

Many challenges ask you to run a local web server. For example, Module 04 will introduce a command like:

```bash
python3 -m http.server 8080
```

That starts a web server on your own machine. To reach it, you open a browser and go to:

```
http://127.0.0.1:8080
```

Or equivalently:

```
http://localhost:8080
```

The server is only accessible from your own machine — nobody else can reach it. This is useful for safe local testing. It also appears in challenges where a server is intentionally set to only accept loopback connections (making it harder to attack from outside).

A quick way to remember it: **127 is home.**

---

## What Are Ports?

Here's a problem: a single computer can run a web server, a file transfer service, and a remote login service — all at the same time, all on the same IP address. How does the network know which service you're trying to reach?

**Ports.**

Think of the apartment building analogy again, but now zoom into a single apartment. The apartment has multiple doors: a front door, a back door, a mail slot, a window to hand things through. Different people use different entry points for different purposes.

A **port** is a number (0–65535) that identifies a specific service or process on a device. When you connect to an IP address, you're connecting to a specific port on that address.

The colon notation is how you write an IP address and port together:

```
192.168.1.1:8080
```

That means: "IP address 192.168.1.1, port 8080."

In a full URL, it looks like this:

```
http://localhost:8080/index.html
```

**Common ports to memorise:**

| Port | Protocol | What it does |
|------|----------|--------------|
| 80   | HTTP     | Unencrypted web traffic |
| 443  | HTTPS    | Encrypted web traffic |
| 22   | SSH      | Secure shell — remote terminal access |
| 21   | FTP      | File transfer (old, mostly insecure) |
| 8080 | HTTP-alt | Common alternative for development web servers |
| 8000 | HTTP-alt | Another common dev server port (Python's default) |

**Default ports are often hidden.** When you type `https://google.com`, your browser is actually connecting to port 443 — but you never see it because 443 is the default for HTTPS. Type `https://google.com:443` and you get the same result.

When a service runs on a non-standard port, the port number appears explicitly in the URL.

**Why does this matter for CTFs?**

Challenge services almost always run on non-standard ports. You'll see URLs like:

```
http://challenge.ctf.example:31337/
http://target.hackthebox.com:10021/login
```

If you see a `Location:` header in an HTTP response that redirects you to a different port — like `Location: http://target:8443/secret` — you need to recognise that and follow it. Many beginners miss redirects that change the port.

---

## NAT — How the Apartment Building Works

One last concept to tie it together: **NAT**, which stands for **Network Address Translation**.

Your home router has one public IP address assigned by your ISP. But your home might have ten devices: laptops, phones, tablets, smart TVs. They all need internet access, but there's only one public IP.

NAT is the router's trick for solving this. When your laptop (at `192.168.1.42`) sends a request to a web server, the router:

1. Replaces the source address in the packet with its own public IP
2. Notes down: "I forwarded this request on behalf of `192.168.1.42:54321`, so when the reply comes back I can route it correctly"
3. Sends the packet to the internet

The web server sees the request coming from the router's public IP. It has no idea your laptop even exists. When the reply comes back, the router remembers the note it made and forwards the response to your laptop.

That's NAT. It's why you can have hundreds of private devices behind a single public IP — and why the internet hasn't run out of IPv4 addresses quite as fast as it might have.

---

## Why This Matters for CTFs — Summary

Putting it all together:

- **Private ranges (10.x, 172.16–31.x, 192.168.x):** Seeing one of these in a challenge means you're dealing with an internal network. You may need a VPN or a pivot host to reach it.
- **Localhost (127.0.0.1):** Appears constantly when challenges ask you to run local servers. Also appears in server-side request forgery (SSRF) challenges — tricking a server into making a request to its own localhost.
- **Ports:** Challenge services live on non-standard ports. Read URLs carefully. Follow redirects that change ports.
- **NAT:** Explains why you can't reach other people's private IPs directly, and why your private IP looks different from what websites see.

---

## Guided Walkthrough

Let's apply this right now.

### Step 1 — Check if anything is running on localhost

Open your browser's developer tools console (`F12` on Windows/Linux/Chromebook · `Cmd + Option + I` on Mac, then click the **Console** tab) and type:

```javascript
fetch('http://localhost:8080').then(r => console.log('Running! Status:', r.status)).catch(e => console.log('Nothing there:', e.message))
```

If something is running on port 8080, you'll see the status code. If not, you'll see an error — which is normal.

### Step 2 — Find your own private IP

- **Mac:** System Preferences → Network → select your Wi-Fi or Ethernet connection — look for "IP Address"
- **Windows:** Open Command Prompt and type `ipconfig`, then look for "IPv4 Address"
- **Quickest method:** Search "what is my ip" on Google — but note this shows your public IP, not your private one

### Step 3 — Classify it

Does your private IP start with:
- `192.168.` → Class C, home or small office network (most common)
- `10.` → Class A, large network
- `172.16.` through `172.31.` → Class B, medium network

If you're on a university network or VPN, you might see a `10.x.x.x` address.

---

## The Challenge

Head to `challenge/index.html` and complete the **Network Map IP-Matching Puzzle**. You'll be given six machine descriptions and asked to assign the correct IP address to each one.

All the information you need is in this lesson and in the reference panel inside the challenge page. You don't need to memorise anything — you just need to know how to read an IP address.

**Flag:** `FLAG{localhost_is_home_127}` (awarded when all six machines are correctly mapped)

---

## Concept Card (Inline)

| Term | Definition |
|------|-----------|
| **IPv4** | Four decimal octets (0–255) separated by dots: e.g. `192.168.1.1` |
| **Private IP** | Reserved range not routable on the public internet |
| **Public IP** | Routable on the internet; assigned by your ISP |
| **Localhost** | `127.0.0.1` — always means "this machine right now" |
| **Port** | A 0–65535 number identifying a specific service on a device |
| **NAT** | Router trick: many private IPs share one public IP |

---

## Keep Going

You now know how devices are addressed and how ports let a single machine run multiple services simultaneously.

**Next: F03 — The Request and the Response**

Now that you know addresses and ports, let's look at what actually gets sent once you connect. An HTTP request is a text message with a very specific format — and knowing that format is the foundation of every web challenge in this curriculum.

[← F01: The Postman Problem](../F01-internet-works/README.md) | [Foundation Track](../README.md) | [Next: F03 →](../F03-request-response/README.md)
