# F01: The Postman Problem — Lesson

---

## The Story

Picture yourself in a library. Not a small one — an enormous one, with floor-to-ceiling shelves stretching in every direction, millions of books filed in an order only the building itself understands.

You walk up to the desk and say: "I'd like *The Hitchhiker's Guide to the Galaxy*, please."

The librarian nods. They open a long wooden drawer and flip through a card catalogue — each card listing a book's title, author, and a code that maps to a specific shelf, row, and position. They find the card. They note down the code: `Section 7, Shelf 14, Row C, Position 22`. They walk across the building, pull the book off the shelf, and bring it back to you.

You never had to know the shelf number. You never had to navigate the building. You gave a human-readable name — a title — and the system converted it into a precise location and retrieved exactly what you needed.

The internet works exactly this way.

When you type `www.google.com` into your browser, you're giving the internet a title, not an address. Behind the scenes, something very much like a librarian springs into action — a system called **DNS**. It takes your human-friendly label, looks it up in a distributed catalogue, finds the precise numerical address of the computer you want to reach, and hands it back to your browser. All of this happens before your browser even sends the first byte of a request.

By the time the page starts loading, a small miracle has already occurred. Your computer figured out which of the billions of machines on the internet you were asking for, opened a connection to it, and began a polite conversation in a language called HTTP.

The remarkable part? It took about 50 milliseconds.

You didn't notice. That's the point. But when you're doing web security, you need to notice — because every vulnerability, every clever attack, every defence mechanism lives somewhere in this chain. Before you can understand how web requests can be manipulated, redirected, or inspected, you need to understand what a web request actually *is*.

That starts here. Let's follow the letter.

---

## The Concept — How the Internet Works

### What is an IP address?

Every device connected to the internet has a numerical address. It looks something like this: `142.250.80.46`.

That number is an **IP address** — short for *Internet Protocol address*. Think of it like a postal address for your computer. Packets of data travel across the internet to specific IP addresses, the same way letters travel to specific houses.

The problem is that humans are terrible at remembering numbers. You can remember "google.com". You probably can't remember `142.250.80.46`.

So the internet invented **domain names** — human-readable labels that map to IP addresses. `google.com` is a domain name. `example.com` is a domain name. They're like the name "Mum" in your phone contacts: it's a friendly label that points to an actual phone number. You tap "Mum" and your phone dials the number underneath. You type `google.com` and your computer fetches the IP underneath.

The domain name and the IP address are **not the same thing**. They're linked, but separate. This distinction matters enormously in web security — as you'll see in later modules.

---

### What is DNS?

**DNS** stands for *Domain Name System*. It's often called the "phone book of the internet", but it's more accurate to say it's a distributed, hierarchical catalogue — the library card catalogue from our story.

When you type a URL, your computer doesn't automatically know the IP address. Instead, it asks a **DNS resolver** — usually a server run by your internet provider, or a public one like Google's (`8.8.8.8`). The question is simple: "What's the IP address for `www.example.com`?"

If the resolver has recently answered this question (or if your computer has it cached from a previous visit), the answer comes back immediately. But if it's a fresh lookup, the resolver has to ask around. Here's the chain it follows:

```
You type: www.example.com
    ↓
Your computer asks: DNS Resolver
    ↓ (resolver doesn't know — asks upstream)
Root Nameserver: "Try the .com nameserver"
    ↓
.com Nameserver: "Try example.com's nameserver at 205.251.196.1"
    ↓
example.com Nameserver: "The IP is 93.184.216.34"
    ↓
Your browser connects to 93.184.216.34
```

Each step in the chain is a referral — "I don't know, but I know who does." The **root nameservers** are the top of the hierarchy: there are only 13 sets of them in the world, and they know which nameservers handle each top-level domain (`.com`, `.org`, `.uk`, etc.). The **TLD nameservers** (Top-Level Domain) know which nameservers handle each domain within their zone. The **authoritative nameserver** for a specific domain knows the exact IP addresses for that domain's hosts.

The whole chain completes in milliseconds, and the result is cached so it doesn't need to repeat on every page load.

---

### What are packets?

Here's a question: how does a web page — potentially many megabytes of text, images, and video — travel across thousands of kilometres of cable and arrive on your screen intact?

The answer is: it doesn't travel as one thing. It gets **split into small chunks called packets**.

Imagine you want to mail a 500-page book to someone. You could try to cram the whole thing into one enormous envelope — but that's unwieldy, slow, and if it gets lost, you've lost everything. Instead, imagine tearing out every page, putting each one in its own small envelope, numbering them, and posting them separately. Each envelope travels independently, possibly by different routes. When they all arrive, the recipient reassembles them in order.

That's exactly what happens with internet data. Your computer breaks large files into small packets — typically around 1,500 bytes each. Each packet contains a header (metadata: source IP, destination IP, packet number) and a payload (the actual data). Packets travel across the network independently, routed by machines called **routers** that read the destination address and forward the packet toward its target.

At the destination, a protocol called **TCP** (Transmission Control Protocol) reassembles the packets in order. TCP also handles the messy real-world problems: packets arriving out of order, packets getting lost in transit, packets that need to be re-requested. TCP is the reason you don't end up with scrambled web pages.

---

### What is HTTP?

Once your browser has the IP address (thanks to DNS) and opens a connection (using TCP), it can start the actual conversation. That conversation happens in **HTTP** — HyperText Transfer Protocol.

HTTP is a simple request-and-response language. Your browser sends a **request**:

```
GET /index.html HTTP/1.1
Host: www.example.com
```

The server sends back a **response**:

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>...the page content...</html>
```

The request has a **method** (`GET` — I want to fetch something), a **path** (`/index.html` — which resource), and **headers** (extra information like which host you're connecting to, what kind of response your browser accepts, and more). The response has a **status code** (`200` means success), headers, and a **body** (the actual content).

This exchange — HTTP request and response — is the layer that Modules 01–08 in the main series focus on. When you learn about cookies, authentication vulnerabilities, hidden endpoints, and request manipulation, you're working at this layer. DNS gets you to the server. TCP keeps the connection stable. HTTP is the language they speak once they're talking.

---

### Why This Matters for CTFs

In web CTF challenges, you will constantly encounter:

- **IP addresses** — knowing that `127.0.0.1` means "this machine" (localhost) lets you interpret lab environments correctly
- **Ports** — a port is like a room number on a building. Port `80` is the default for HTTP, port `443` for HTTPS. When a challenge URL says `:8080`, that's a non-standard port
- **HTTP request and response structure** — when Module 04 says "open the Network tab and look at the response headers", you need to know what a response is, and that headers and body are separate parts of it
- **DNS behaviour** — some CTF challenges involve DNS manipulation or subdomains (like `admin.example.com` vs `example.com`). Knowing DNS is hierarchical helps you reason about these

None of the attack techniques in later modules make sense without understanding what's being attacked. The web is a stack — DNS, TCP, HTTP, application code — and vulnerabilities appear at every layer. This module is the map that shows you the territory.

---

## Guided Walkthrough — See It Yourself

You can watch DNS in action right now, in your browser, without any special tools.

**Step 1:** Open a new browser tab.

**Step 2:** Go to [https://dnschecker.org](https://dnschecker.org). In the search box, type `example.com` and press Enter. You'll see a list of DNS servers around the world, each reporting the IP address they have on record for that domain. The address you'll see is `93.184.216.34` — that's the actual server behind example.com, maintained by IANA as a demonstration domain.

**Step 3:** In your browser's address bar, try typing `93.184.216.34` directly — just the number, no `www` or `.com`. Press Enter. You should see the same example.com page load. You just bypassed the DNS lookup entirely. The browser connected directly to the IP address. The domain name was just a convenient label.

**Step 4:** Think about what just happened. When you typed `example.com`, your computer:
1. Checked its local cache (probably empty)
2. Asked a DNS resolver for the IP
3. Got back `93.184.216.34`
4. Opened a TCP connection to that address on port 80
5. Sent an HTTP `GET /` request
6. Received an HTTP response with the HTML
7. Rendered the page

And you saw step 3 (the IP) directly when you used dnschecker.org. The rest is invisible — but it happened, every time, in about 50 milliseconds.

---

## Your Challenge

Agent — your first training exercise is a simulation.

The agency has built a replica of the DNS lookup process. Your job is to walk through it step by step, answer the questions correctly, and prove you understand how a domain name becomes a connection. The flag is waiting at the end of the chain.

- Open `challenge/index.html` in your browser
- Work through the DNS simulation — five steps, one question at a time
- The flag is revealed when you complete the chain
- Hints are available if you get stuck: `hint-1.md` after 10 minutes, `hint-2.md` after 20
- Rules: browser only. Try before hints. The quiz tests understanding, not guessing — if you read the lesson, you'll know the answers.

---

## Concept Card

*This is a quick-reference summary. The full version is in `concept-cards.md`.*

| Term | Definition |
|---|---|
| **IP Address** | A unique number that identifies a device on a network (e.g. `192.168.1.1`) |
| **Domain Name** | A human-readable label for an IP address (e.g. `google.com`) |
| **DNS** | Domain Name System — the distributed "phone book" that translates domain names to IPs |
| **DNS Resolver** | The first stop in a DNS lookup; typically run by your ISP or a public provider (`8.8.8.8`) |
| **Packet** | A small chunk of data; large files are split into packets for transmission and reassembled at the destination |
| **HTTP** | HyperText Transfer Protocol — the language browsers and servers use to exchange web pages |

**DNS Lookup Chain:**
```
You type URL → DNS Resolver → Root NS → TLD NS → Authoritative NS → IP returned → TCP connect → HTTP request
```

---

## Keep Going

**Try these tools:**

- [https://dnschecker.org](https://dnschecker.org) — look up any real domain and see the IPs reported from servers around the world
- [https://www.nslookup.io](https://www.nslookup.io) — see full DNS chains and all record types for a domain

**Coming up next:**

Once you have an IP address, what does it actually *mean*? Not all IP addresses are equal — some belong to the public internet, some are reserved for private networks, and some refer to your own machine. **F02 — The Address Book** goes deeper on IPs, private networks, subnets, and ports. It's the context you need for every module that mentions a server address.
