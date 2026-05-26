# Solution — Everything Is a Number

**Flag:** `FLAG{b1n4ry_1s_b4s1c}`

---

## Panel 1: Decimal → Binary (target: 42)

42 = 32 + 8 + 2

In binary (8-bit):
```
128  64  32  16   8   4   2   1
  0   0   1   0   1   0   1   0
```

Answer: `00101010`

The bit-toggle challenge validates when the sum of toggled bits equals 42.

---

## Panel 2: Binary → Hex (input: 10110100)

Split into two nibbles:
- High nibble: `1011` = 11 decimal = **B** hex
- Low nibble: `0100` = 4 decimal = **4** hex

Answer: `B4` (or `b4` or `0xB4`)

---

## Panel 3: Hex Bytes → ASCII → Flag

```
46 → 70 decimal → 'F'
4C → 76 decimal → 'L'
41 → 65 decimal → 'A'
47 → 71 decimal → 'G'
7B → 123 decimal → '{'
62 → 98 decimal → 'b'
31 → 49 decimal → '1'
6E → 110 decimal → 'n'
34 → 52 decimal → '4'
72 → 114 decimal → 'r'
79 → 121 decimal → 'y'
5F → 95 decimal → '_'
31 → 49 decimal → '1'
73 → 115 decimal → 's'
5F → 95 decimal → '_'
62 → 98 decimal → 'b'
34 → 52 decimal → '4'
73 → 115 decimal → 's'
31 → 49 decimal → '1'
63 → 99 decimal → 'c'
7D → 125 decimal → '}'
```

Full decoded string: `FLAG{b1n4ry_1s_b4s1c}`

---

## Why It Works

ASCII is a fixed mapping between numbers and characters. If you know the table, any sequence of bytes in the ASCII range (0x20–0x7E) can be read as text. CTF flags are almost always stored as ASCII. This is how forensics tools, hex editors, and the Unix `strings` command extract readable text from binary files.

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Foundation Track →](../../README.md)*
