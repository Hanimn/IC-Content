# F02 Challenge — Hint 2

**More explicit guidance — try Hint 1 first if you haven't.**

---

## Per-Machine Guidance

Here is which IP range each machine falls into. The specific address is given in the form `x.x.x.x` with the actual digits blanked — you just need to work out what makes sense.

---

**HOME-ROUTER**
Falls in the **Class C private range**: `192.168.x.x`
The most common default for home routers is the `.1` address of the subnet — the gateway is usually the first usable address.
→ Range: `192.168.1.x` — router is at `.1`

---

**YOUR-LAPTOP**
Also on the **Class C home network** as HOME-ROUTER — same first three octets.
Your laptop was assigned an address by the router. The address provided in the challenge is a typical device address on that same subnet.
→ Range: `192.168.1.x` — device address, not `.1` (that's the router)

---

**LOOPBACK**
Not a private range at all. This is the **loopback / localhost address**.
There is only one address you need to know here, and it's mentioned in the lesson title, the concept cards, and the reference panel on the page.
→ The loopback address starts with `127`

---

**PUBLIC-SERVER**
The description says "anyone on the internet can reach" it — so it **cannot** be a private range address.
All the private ranges (10.x, 172.16–31.x, 192.168.x) and loopback (127.x) are taken by other machines.
The public IP in this challenge starts with `203` — this is the TEST-NET-3 range used in documentation to represent a real-looking public address.
→ Starts with `203.0.113.`

---

**INTERNAL-DB**
Corporate database servers that are "never exposed to the internet" use the **Class A private range**: `10.x.x.x`
This is the range large companies use for internal networks.
→ Starts with `10.0.0.`

---

**BRANCH-OFFICE-PC**
A medium-sized company branch office uses the **Class B private range**: `172.16.x.x` through `172.31.x.x`
The specific address in this challenge starts at `172.16.` (the first block in the Class B range).
→ Starts with `172.16.`

---

## Still Not Enough?

If you've read both hints and still can't complete the puzzle, the full walkthrough with every answer is in `solution.md`. But give it one more try first — you're probably closer than you think.

[← Hint 1](hint-1.md) | [Back to Challenge](index.html) | [Solution →](solution.md)
