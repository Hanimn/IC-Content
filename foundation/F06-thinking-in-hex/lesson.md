---
title: "Thinking in Hex"
tagline: "Two digits in hex can represent anything a byte can hold. That's why everyone in security speaks it."
time: ""
tier: "Data & Encoding"
---
> Two digits in hex can represent anything a byte can hold. That's why everyone in security speaks it.

---

## The Librarian's Scanner

Imagine a librarian who has to catalog a room full of mystery boxes. She can't open them, but she has a special scanner that shows her what's inside — as a stream of numbers. Each number is one byte.

At first the stream looks like noise: `163 127 194 177 142 244 210 12 145 106 63 184 85 45 225 124...` She writes down hundreds of numbers and stares at the page. Nothing obvious.

Then she switches the scanner to a different display mode. Instead of decimal, it shows her each byte as exactly two hexadecimal digits: `A3 7F C2 B1 8E F4 D2 0C 91 6A 3F B8 55 2D E1 7C...` Still looks like noise. But now she notices something. On the right side of her scanner's screen, a second column has appeared. For every byte that falls in a certain range, her scanner shows the corresponding letter or symbol. Most bytes show a dot. But then, at position 32, she sees it: `F L A G {`.

She's learned to read this stream the same way you might learn to read a new language. After enough practice, she sees patterns: the sequence that always starts a ZIP file, the bytes that spell out someone's name, the flag hidden in the middle of what looks like random data. You're going to learn to read the same way.

---

## Why Hex?

A quick recap from F05: computers store everything as bytes. One byte = 8 bits = a number from 0 to 255.

When you need to look at raw bytes, you have three choices for how to display them:

**Binary** is the native language. But 8 zeros and ones per byte is exhausting:

```
01001000 01100101 01101100 01101100 01101111
```

That's just "Hello" — five bytes. Binary is exact but unreadable at scale.

**Decimal** is what humans use every day. But it doesn't map cleanly to bytes:

- The smallest byte value (0) is 1 decimal digit
- A middle value (100) is 3 decimal digits
- The largest byte value (255) is 3 decimal digits

The length varies. You can't look at `72101108108111` and immediately see that it's five bytes. The boundaries are invisible.

**Hexadecimal** is the sweet spot:

- Every byte is exactly 2 hex digits — no exceptions
- The range 0x00 through 0xFF covers all 256 possible byte values
- Reading two digits = reading one byte, always

```
48 65 6C 6C 6F
```

Five pairs. Five bytes. "Hello." The structure is immediately visible.

This is why every security tool, every hex editor, every debugger, every exploit framework uses hex by default. Once you speak hex, you can read the underlying structure of any file, any network packet, any piece of memory — as naturally as reading text.

---

## What Is a Hex Dump?

A hex dump is a standardized way of displaying binary data. Instead of just a wall of hex pairs, it organizes the bytes into three columns:

```
Offset    Hex bytes (16 per row)                       ASCII
00000000  48 65 6C 6C 6F 2C 20 57  6F 72 6C 64 21 0A 00 00  Hello, World!...
00000010  46 4C 41 47 7B 74 65 73  74 7D 0A 00 00 00 00 00  FLAG{test}......
```

This layout is so universal that if you work in security for any length of time, you'll see it in hex editors, forensics tools, debuggers, and CTF writeups. Learning to read it is like learning to read a clock — it feels mechanical at first, then becomes instant.

Let's break down each column.

### Column 1: The Offset

```
00000000
00000010
```

The offset tells you the position of the first byte in that row. It's measured from the start of the file or buffer (position zero) and displayed in hexadecimal.

- Row 1 starts at offset `00000000` — that's byte 0
- Row 2 starts at offset `00000010` — that's byte 16 (0x10 in hex = 16 in decimal)

Each row holds 16 bytes, so offsets increase by 0x10 with each row: `0x00`, `0x10`, `0x20`, `0x30`...

Why show the offset in hex? Because when you're analyzing a large file or memory region, addresses are referenced in hex everywhere else — in disassemblers, in debugger output, in documentation. Keeping offsets in hex means the same number appears consistently across tools.

### Column 2: The Hex Bytes

```
48 65 6C 6C 6F 2C 20 57  6F 72 6C 64 21 0A 00 00
```

This is the raw content of the 16 bytes in that row, shown as hex pairs separated by spaces. Notice the slightly larger gap in the middle — that splits the 16 bytes into two groups of 8. It's just for readability. The data is continuous; the visual split is a convention.

Each two-character group is one byte:
- `48` is one byte (decimal 72)
- `65` is one byte (decimal 101)
- ...and so on

### Column 3: The ASCII Column

```
Hello, World!...
```

This is the same 16 bytes interpreted as ASCII characters. Here's the rule:

- If a byte is in the range 0x20 through 0x7E, it's a printable ASCII character — display it
- If a byte is outside that range (0x00–0x1F or 0x7F–0xFF), it's non-printable — display a dot (`.`)

In the example above, byte `0A` is a newline character — not printable — so it shows as `.` in the ASCII column. Everything else in that row happens to be printable text.

This column is your first filter for finding human-readable data in binary files.

---

## Reading ASCII in Hex Data

Printable ASCII occupies bytes 0x20 through 0x7E. That's the range from space (0x20) to tilde (0x7E). When you scan the hex column and see values in this range, they're almost certainly text.

Some bytes worth memorizing:

| Hex | Dec | Character |
|-----|-----|-----------|
| 0x20 | 32 | space |
| 0x2E | 46 | `.` |
| 0x30–0x39 | 48–57 | `0`–`9` |
| 0x41–0x5A | 65–90 | `A`–`Z` |
| 0x5F | 95 | `_` |
| 0x61–0x7A | 97–122 | `a`–`z` |
| 0x7B | 123 | `{` |
| 0x7D | 125 | `}` |

> **Try It — 20 seconds.** Decode these three hex bytes to ASCII using the table above:
>
> ```
> 48 49 21
> ```
>
> One byte at a time. Range-check each: which row does it fall into?
>
> ---
>
> 0x48 is in the `0x41–0x5A` row → it's a capital letter. 0x48 is 7 past 0x41 (= A), so it's the 8th letter: **H**.
> 0x49 is one past 0x48 → **I**.
> 0x21 isn't in any row above. It's just past 0x20 (space) — the very first printable character after space. That's `!`.
>
> Answer: **`HI!`**
>
> You just did what a hex editor does. Every CTF forensics challenge uses this skill.

For CTF work specifically, there's one sequence worth recognizing on sight:

```
46 4C 41 47 7B
```

That's `F L A G {` — the opening of almost every CTF flag. When you're scanning a hex dump and you see these five bytes together, you've found your target.

**Patterns to watch for:**
- Flags: `46 4C 41 47 7B ... 7D` — runs from F to the closing `}`
- Strings in binaries: runs of printable bytes, often surrounded by `00` null bytes
- Filenames and error messages: readable ASCII embedded in binary formats
- Credentials: if an application stores passwords poorly, they appear as plain ASCII in memory dumps

---

## The `xxd` Command

On Linux and Mac, the `xxd` command generates a hex dump of any file. You'll encounter its output constantly in security work.

```
$ xxd hello.txt
00000000: 4865 6c6c 6f2c 2057  6f72 6c64 210a       Hello, World!.
```

Note that `xxd` uses a slightly different format from the example above — it groups bytes differently and uses a colon after the offset. But the three columns are the same: offset, hex bytes, ASCII. Once you understand one hex dump format, you can read all of them.

In future modules (especially forensics), you'll use `xxd` to inspect files you've captured. For now, understand what the output means so you're not surprised when you see it.

---

## Memory Addresses in Hex

In binary exploitation, you'll see addresses like:

```
0x7fff5fbff830
```

This is a 64-bit memory address — the location of something in a program's memory. It looks intimidating but it's just a big hex number.

Breaking it down:
- `0x` — signals "this is hex"
- `7fff5fbff830` — 12 hex digits = 6 bytes... wait

Actually, count again: `7f ff 5f bf f8 30` — that's 6 bytes, so where are the other 2? A 64-bit address is 8 bytes = 16 hex digits. Leading zeros are often dropped for readability, so `0x00007fff5fbff830` gets abbreviated to `0x7fff5fbff830`.

This matters in binary exploitation because you'll do math on these addresses — adding offsets, subtracting distances between functions. All of that math happens in hex. Two hex digits = one byte, and keeping that equation in your head makes address arithmetic automatic.

---

## Why This Matters for CTFs

Hex dumps appear in every category of CTF challenges:

**Forensics:** When you recover a file, the first thing you do is hex dump it. The first bytes reveal the file type (more on this in F07). Embedded strings, hidden data, and metadata are all visible in the hex dump. The ASCII column becomes a quick scanner for anything human-readable.

**Cryptography:** XOR — the most fundamental operation in cryptographic challenges — is done on bytes. You XOR two hex values together to get a result. Following XOR operations in solver scripts means tracking hex values through each step.

**Binary Exploitation:** Stack addresses, heap addresses, return addresses — all in hex. When you write shellcode (machine instructions you inject into a vulnerable program), you write it as hex bytes. When you overflow a buffer, you overwrite memory at a specific hex offset.

**Reverse Engineering:** The `strings` command extracts printable ASCII runs from binaries. This is the ASCII column logic applied automatically — the same concept you learned above, automated into a tool. Understanding what it's doing makes you a better user of it.

---

## Guided Walkthrough

Let's read the example hex dump from earlier, byte by byte.

```
00000000  48 65 6C 6C 6F 2C 20 57  6F 72 6C 64 21 0A 00 00  Hello, World!...
00000010  46 4C 41 47 7B 74 65 73  74 7D 0A 00 00 00 00 00  FLAG{test}......
```

**Row 1 (offset 0x00000000):**

| Hex | Decimal | ASCII |
|-----|---------|-------|
| 48 | 72 | H |
| 65 | 101 | e |
| 6C | 108 | l |
| 6C | 108 | l |
| 6F | 111 | o |
| 2C | 44 | , |
| 20 | 32 | (space) |
| 57 | 87 | W |
| 6F | 111 | o |
| 72 | 114 | r |
| 6C | 108 | l |
| 64 | 100 | d |
| 21 | 33 | ! |
| 0A | 10 | (newline — shows as `.`) |
| 00 | 0 | (null — `.`) |
| 00 | 0 | (null — `.`) |

That's a full 16 bytes on row 1: the 14-byte `"Hello, World!\n"` payload, followed by two null bytes that pad the rest of the row. `xxd` always shows 16 bytes per row when there's data left in the file — it never leaves blank slots in the middle of a file.

**Row 2 (offset 0x00000010):**

| Hex | Decimal | ASCII |
|-----|---------|-------|
| 46 | 70 | F |
| 4C | 76 | L |
| 41 | 65 | A |
| 47 | 71 | G |
| 7B | 123 | `{` |
| 74 | 116 | t |
| 65 | 101 | e |
| 73 | 115 | s |
| 74 | 116 | t |
| 7D | 125 | `}` |
| 0A | 10 | (newline — `.`) |
| 00 | 0 | (null — `.`) |
| 00 | 0 | (null — `.`) |
| 00 | 0 | (null — `.`) |
| 00 | 0 | (null — `.`) |
| 00 | 0 | (null — `.`) |

Notice: `46 4C 41 47 7B` — that's `FLAG{` right at the start of row 2. Your eye will start catching this pattern automatically. The closing `7D` is `}`. The flag in this example is `FLAG{test}`.

The `0A` (newline) and the three `00` (null) bytes all fall outside the printable range, so the ASCII column shows them as dots.

---

## The Challenge

Open `challenge/index.html` in your web browser.

You'll see a hex dump of a 96-byte "intercepted file." Most of it is non-printable garbage. Your job is to:

1. Find the offset where the flag begins
2. Read the flag from the ASCII column

Tools you may find helpful:
- **CyberChef** at [https://gchq.github.io/CyberChef/](https://gchq.github.io/CyberChef/) — the "From Hex" operation converts hex bytes to ASCII text. Useful for double-checking your reading.
- Your own eyes — the ASCII column in the challenge does the decoding for you if you know where to look.

Refer to [concept-cards.md](concept-cards.md) if you need a quick refresher on the column layout or printable ASCII range.

---

## Keep Going

Check your concept cards before moving to F07.

**Next:** [F07 — What's in a File?](../F07-whats-in-a-file/README.md)

Now that you can read hex dumps, F07 teaches you what the *first* bytes of a file reveal about its type. Those magic bytes are the foundation of forensics file analysis — and you'll be reading them in a hex dump.
