---
title: "Everything Is a Number"
tagline: "Now imagine a computer is the world's most elaborate flashlight system."
time: ""
tier: "Data & Encoding"
---
---

## The Story

Imagine you're a spy trying to send a message across a dark valley. You can't shout — too risky. You can't write a note — no way to deliver it. All you have is a flashlight. On. Off. On. Off.

So you invent a code. One flash means A. Two flashes means B. Three flashes means C. It's slow, but it works. You've just turned a flashlight — a tool that only knows "on" and "off" — into a communication device that can send any word in the language.

Now imagine a computer is the world's most elaborate flashlight system.

Inside every computer, billions of tiny switches flip on and off billions of times per second. Each switch can only be in one of two states: electricity is flowing (1) or it isn't (0). That's it. No third option. No "kind of on." Just on or off, 1 or 0.

Every single thing your computer does — displaying this text, playing music, storing a photo, running a game — is built from those two states. The letter A is stored as 01000001. The colour red in an image is stored as 11111111 00000000 00000000. The number 42 is stored as 00101010.

This feels strange at first. How can you build anything complicated out of just 1s and 0s? The answer is: by chaining them together. One switch gives you 2 options. Two switches give you 4 options. Eight switches give you 256 options. Thirty-two switches give you over 4 billion options. The complexity comes from scale, not from the individual switch.

Your job today is to learn to read the language that computers actually speak. Not high-level language like Python or English — the raw, underlying language of numbers. Once you can do this, you'll be able to look at raw data from a file, a network packet, or a piece of memory and understand what it's saying. That's a skill that separates someone who uses computers from someone who *understands* computers.

And in CTF challenges, it's often the difference between seeing random nonsense and spotting a hidden flag.

---

## The Concept — Three Number Systems

### Decimal — What You Already Know

You've been using decimal since you could count. Its technical name is **base-10**, and it uses exactly ten digits: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9.

When you run out of digits and need to represent a bigger number, you add a new column to the left. Each column is worth ten times the one to its right. The columns, from right to left, represent powers of 10:

```
... 1000  100   10    1
```

So the number 347 means:

```
(3 × 100) + (4 × 10) + (7 × 1) = 347
```

Simple. You already know this so well that you do it automatically, without thinking. That's the goal with the other systems too — fluency.

---

### Binary — What Computers Use

Computers use **base-2** (binary) because their hardware only has two states. Binary uses exactly two digits: 0 and 1. Each digit in binary is called a **bit** (short for "binary digit").

Just like decimal has columns for powers of 10, binary has columns for powers of 2:

```
128   64   32   16    8    4    2    1
```

These are 2⁷, 2⁶, 2⁵, 2⁴, 2³, 2², 2¹, 2⁰.

To convert a decimal number to binary, you figure out which powers of 2 add up to your number, then put a 1 in each of those columns and a 0 in the rest.

**Example: Convert 42 to binary**

Ask yourself: is 128 too big? Yes (128 > 42), so that column is 0.
Is 64 too big? Yes (64 > 42), so 0.
Is 32 too big? No (32 ≤ 42), so that column is 1. Remaining: 42 − 32 = 10.
Is 16 too big? Yes (16 > 10), so 0.
Is 8 too big? No (8 ≤ 10), so 1. Remaining: 10 − 8 = 2.
Is 4 too big? Yes (4 > 2), so 0.
Is 2 too big? No (2 ≤ 2), so 1. Remaining: 2 − 2 = 0.
Is 1 too big? N/A — remaining is 0, so 0.

```
128  64  32  16   8   4   2   1
  0   0   1   0   1   0   1   0
= 32 + 8 + 2 = 42

Binary: 00101010
```

Check: 32 + 8 + 2 = 42. Correct.

**The byte.** Eight bits grouped together is called a **byte**. A byte can hold values from 00000000 (= 0) to 11111111 (= 255). That's 256 different values. Almost everything in computing is measured in bytes: file sizes, memory, network data.

---

### Hexadecimal — What Programmers Use to Read Binary

Binary is accurate, but it's painful to read. To represent the number 255, you need to write `11111111`. If you're looking at memory with thousands of bytes, that's an ocean of 1s and 0s. Humans are not good at that.

**Hexadecimal** (base-16) is the shortcut. It uses 16 digits:

- 0 through 9 work just like normal
- 10 is written as `A`
- 11 is written as `B`
- 12 is written as `C`
- 13 is written as `D`
- 14 is written as `E`
- 15 is written as `F`

Why 16? Because 16 = 2⁴. That means one hex digit represents exactly 4 binary bits. We call 4 bits a **nibble** (yes, really). And since a byte is 8 bits, one byte = two hex digits. This is the key relationship:

**1 byte = 8 bits = 2 hex digits**

Here's how the mapping works:

```
Decimal  Binary    Hex
      0  0000       0
      9  1001       9
     10  1010       A
     15  1111       F
     16  0001 0000  10
    255  1111 1111  FF
```

So instead of writing `11111111` (eight binary digits for 255), you just write `FF` (two hex digits). Same value, much easier to read.

In security tools and code, hex numbers are often written with a `0x` prefix to make it clear they're hex: `0xFF` means the hex value FF, which is 255 in decimal. Sometimes the prefix is dropped and it's just `FF` — the context tells you it's hex.

---

### ASCII — The Character ↔ Number Mapping

Computers only understand numbers. But you're reading letters right now. How does that work?

The answer is a lookup table called **ASCII** (American Standard Code for Information Interchange). ASCII defines a specific number for every printable character: letters, digits, punctuation, and spaces.

Some key mappings to memorise:

| Character | Decimal | Hex  |
|-----------|---------|------|
| `A`       | 65      | 0x41 |
| `B`       | 66      | 0x42 |
| `Z`       | 90      | 0x5A |
| `a`       | 97      | 0x61 |
| `b`       | 98      | 0x62 |
| `z`       | 122     | 0x7A |
| `0`       | 48      | 0x30 |
| `9`       | 57      | 0x39 |
| `space`   | 32      | 0x20 |
| `{`       | 123     | 0x7B |
| `}`       | 125     | 0x7D |

Notice the pattern: uppercase letters start at 65 (0x41). Lowercase letters start at 97 (0x61). The digits '0'–'9' start at 48 (0x30). The gap between uppercase and lowercase is exactly 32 (0x20).

Here's a compact ASCII table for the printable characters:

```
Hex  Dec  Chr    Hex  Dec  Chr    Hex  Dec  Chr    Hex  Dec  Chr
20   32   SPC    30   48   0      40   64   @      50   80   P
21   33   !      31   49   1      41   65   A      51   81   Q
22   34   "      32   50   2      42   66   B      52   82   R
23   35   #      33   51   3      43   67   C      53   83   S
24   36   $      34   52   4      44   68   D      54   84   T
25   37   %      35   53   5      45   69   E      55   85   U
26   38   &      36   54   6      46   70   F      56   86   V
27   39   '      37   55   7      47   71   G      57   87   W
28   40   (      38   56   8      48   72   H      58   88   X
29   41   )      39   57   9      49   73   I      59   89   Y
2A   42   *      3A   58   :      4A   74   J      5A   90   Z
2B   43   +      3B   59   ;      4B   75   K      5B   91   [
2C   44   ,      3C   60   <      4C   76   L      5C   92   \
2D   45   -      3D   61   =      4D   77   M      5D   93   ]
2E   46   .      3E   62   >      4E   78   N      5E   94   ^
2F   47   /      3F   63   ?      4F   79   O      5F   95   _
60   96   `      70   112  p
61   97   a      71   113  q
62   98   b      72   114  r
63   99   c      73   115  s
64   100  d      74   116  t
65   101  e      75   117  u
66   102  f      76   118  v
67   103  g      77   119  w
68   104  h      78   120  x
69   105  i      79   121  y
6A   106  j      7A   122  z
6B   107  k      7B   123  {
6C   108  l      7C   124  |
6D   109  m      7D   125  }
6E   110  n      7E   126  ~
6F   111  o
```

**Why this matters for CTFs:** When you look at a file in a hex editor, you see raw bytes. If those bytes fall in the range 0x20–0x7E, they're printable ASCII characters — readable text is hiding in the file. CTF flags are almost always stored as ASCII. Knowing the mapping lets you spot them instantly.

---

### Why This Matters for CTFs

Number systems come up in every single CTF category:

**Forensics** — Hex editors show file contents as bytes. When you see `46 4C 41 47`, that's ASCII for `FLAG`. Raw binary files are full of text hiding in plain sight. The `strings` command extracts it automatically — but you need to understand why it works.

**Cryptography** — XOR encryption operates on raw bytes, mixing two numbers together at the bit level. Caesar ciphers shift ASCII values up or down. Base64 encoding converts binary data into printable characters. All of this makes no sense unless you know the underlying number systems.

**Binary Exploitation** — Memory addresses are displayed in hex (e.g. `0x7fff5fbff830`). Buffer overflow offsets are calculated in bytes. Shellcode is written in hex bytes. You'll be reading and writing raw hex constantly.

**Reverse Engineering** — String values stored in binary executables are ASCII. Function addresses are hex. Constants are hex. The entire binary is ultimately bytes you need to read.

---

## Guided Walkthrough — Decode a Hex Message

Let's decode the hex sequence: `48 65 6C 6C 6F`

For each byte, convert from hex to decimal, then look up the ASCII character.

**Step 1:** `48` hex
- `4` × 16 = 64
- `8` × 1 = 8
- Total: 64 + 8 = **72 decimal**
- ASCII 72 = **'H'**

**Step 2:** `65` hex
- `6` × 16 = 96
- `5` × 1 = 5
- Total: 96 + 5 = **101 decimal**
- ASCII 101 = **'e'**

**Step 3:** `6C` hex
- `6` × 16 = 96
- `C` = 12, so 12 × 1 = 12
- Total: 96 + 12 = **108 decimal**
- ASCII 108 = **'l'**

**Step 4:** `6C` hex → same as above → **'l'**

**Step 5:** `6F` hex
- `6` × 16 = 96
- `F` = 15, so 15 × 1 = 15
- Total: 96 + 15 = **111 decimal**
- ASCII 111 = **'o'**

**Result:** `H`, `e`, `l`, `l`, `o` → **"Hello"**

**The shortcut to know:** Hex values in the range `0x40`–`0x7F` cover most printable ASCII characters. If you see a hex byte starting with `4`, `5`, `6`, or `7`, it's almost certainly a readable character.

Specifically: `46 4C 41 47` — those four bytes are hex for `F`, `L`, `A`, `G`. Any time you see those four bytes in a CTF, you've found a flag marker.

---

## Your Challenge

Your training terminal has three panels. Each one tests a different part of the number system. Complete all three to decode the flag and prove you're ready to handle raw data.

Open `challenge/index.html` in your web browser. The panels unlock in order — you must solve each one before the next appears.

- **Panel 1:** Set binary bits to represent a decimal number
- **Panel 2:** Convert a binary number to hexadecimal
- **Panel 3:** Decode a sequence of hex bytes to ASCII — and find the flag

---

## Concept Card

**Key Terms**

| Term | Definition |
|------|-----------|
| Bit | The smallest unit of data; a single 0 or 1 |
| Byte | 8 bits; can hold values 0–255 (0x00–0xFF) |
| Binary | Base-2 number system; only digits 0 and 1; what computers use natively |
| Hexadecimal (hex) | Base-16 number system; digits 0–9 and A–F; 2 hex digits = 1 byte |
| ASCII | A standard mapping between numbers and printable characters (A=65, a=97, 0=48) |
| Nibble | 4 bits; exactly one hex digit (0x0 through 0xF) |

See `concept-cards.md` for the full quick reference.

---

## Keep Going

- **Convert numbers online:** https://www.rapidtables.com/convert/number/hex-to-ascii.html
- **CyberChef** — https://gchq.github.io/CyberChef/ — select "From Hex", "To Decimal", and dozens of other operations. This is one of the most useful tools in CTF work.

**Coming up:** F06 — Thinking in Hex goes deeper on reading full hex dumps. You'll learn to identify file types from their first few bytes (called "magic bytes"), and to navigate a hex editor efficiently. Everything you learned today is the foundation for that.
