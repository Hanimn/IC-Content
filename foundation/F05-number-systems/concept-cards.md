# F05 Concept Cards — Everything Is a Number

---

## Key Terms

| Term | Definition |
|------|-----------|
| **Bit** | The smallest unit of data; a single 0 or 1 |
| **Byte** | 8 bits; can hold values 0–255 (0x00–0xFF) |
| **Binary** | Base-2 number system; only digits 0 and 1; what computers use natively |
| **Hexadecimal (hex)** | Base-16 number system; digits 0–9 and A–F; 2 hex digits = 1 byte |
| **ASCII** | A standard mapping between numbers and printable characters (A=65, a=97, 0=48) |
| **Nibble** | 4 bits; exactly one hex digit (0x0 through 0xF) |

---

## Quick Reference

```
Powers of 2:  128  64  32  16   8   4   2   1
Hex digits:   0-9, A=10, B=11, C=12, D=13, E=14, F=15
1 byte = 8 bits = 2 hex digits
Useful ASCII: A=0x41  a=0x61  0=0x30  space=0x20
FLAG in hex:  46 4C 41 47
{ in hex:     7B     } in hex: 7D
```

---

## Number System Cheat Sheet

| Decimal | Binary    | Hex |
|---------|-----------|-----|
| 0       | 0000 0000 | 00  |
| 10      | 0000 1010 | 0A  |
| 15      | 0000 1111 | 0F  |
| 16      | 0001 0000 | 10  |
| 42      | 0010 1010 | 2A  |
| 65      | 0100 0001 | 41  |
| 127     | 0111 1111 | 7F  |
| 255     | 1111 1111 | FF  |

---

## How to Convert

**Decimal → Binary**
Find which powers of 2 add up to your number.
Put 1 in each column you use, 0 in the rest.
Check: add your 1-columns to verify.

**Binary → Hex**
Split the bits into groups of 4 (nibbles), right to left.
Look up each nibble in this table:

```
0000=0  0001=1  0010=2  0011=3
0100=4  0101=5  0110=6  0111=7
1000=8  1001=9  1010=A  1011=B
1100=C  1101=D  1110=E  1111=F
```

**Hex → ASCII**
Convert hex to decimal: (first digit × 16) + second digit.
Look up that decimal number in an ASCII table.
Range 0x20–0x7E = printable characters.

---

## Common Mistakes

- **Confusing `0` (zero) with `O` (letter O) in hex** — in most security tools the font makes them look similar. Pay attention. `0` is a number; `O` is never a valid hex digit.
- **Forgetting hex is case-insensitive** — `FF`, `ff`, and `Ff` are all the same value (255). Capitalization doesn't change the number.
- **Thinking hex is encryption** — it isn't. Hex is just a different way to write the same number. `0xFF` and `255` and `11111111` are all the same value, just written in different bases. There's nothing hidden or scrambled.
- **Forgetting ASCII '0' ≠ 0** — The character '0' is ASCII value 48 (0x30). The number 0 is a null byte (0x00). They are completely different things.

---

## ASCII Reference (Printable Characters)

```
Hex  Chr  |  Hex  Chr  |  Hex  Chr  |  Hex  Chr
20   SPC  |  30   0    |  40   @    |  50   P
21   !    |  31   1    |  41   A    |  51   Q
22   "    |  32   2    |  42   B    |  52   R
23   #    |  33   3    |  43   C    |  53   S
24   $    |  34   4    |  44   D    |  54   T
25   %    |  35   5    |  45   E    |  55   U
26   &    |  36   6    |  46   F    |  56   V
27   '    |  37   7    |  47   G    |  57   W
28   (    |  38   8    |  48   H    |  58   X
29   )    |  39   9    |  49   I    |  59   Y
2A   *    |  3A   :    |  4A   J    |  5A   Z
2B   +    |  3B   ;    |  4B   K    |  5B   [
2C   ,    |  3C   <    |  4C   L    |  5C   \
2D   -    |  3D   =    |  4D   M    |  5D   ]
2E   .    |  3E   >    |  4E   N    |  5E   ^
2F   /    |  3F   ?    |  4F   O    |  5F   _
60   `    |  70   p
61   a    |  71   q
62   b    |  72   r
63   c    |  73   s
64   d    |  74   t
65   e    |  75   u
66   f    |  76   v
67   g    |  77   w
68   h    |  78   x
69   i    |  79   y
6A   j    |  7A   z
6B   k    |  7B   {
6C   l    |  7C   |
6D   m    |  7D   }
6E   n    |  7E   ~
6F   o    |
```
