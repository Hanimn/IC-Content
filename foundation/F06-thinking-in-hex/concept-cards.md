# F06 — Concept Cards: Thinking in Hex

---

## Key Terms

---

**Hex Dump**
A display format showing binary data as hex byte pairs + ASCII interpretation. Three columns: offset, hex bytes (16 per row, split 8|8), and ASCII characters. The universal format for inspecting raw binary data.

---

**Offset**
The position of a byte within a file or buffer. Measured from zero (the start). Usually shown in hexadecimal. The offset column in a hex dump tells you where the first byte of each row lives in the file.

---

**Printable ASCII**
Characters in the byte range 0x20–0x7E that display as readable text. Includes letters, digits, punctuation, and space. Bytes outside this range are non-printable and show as `.` in the ASCII column of a hex dump.

---

**Null Byte**
The byte `0x00`. Marks the end of strings in C programs (called a "null terminator"). Appears frequently in binary files as padding. Important in binary exploitation — injecting a null byte can truncate strings in vulnerable programs.

---

**Magic Bytes**
The first few bytes of a file that identify its format. For example, ZIP files start with `50 4B` (`PK`), PNG files start with `89 50 4E 47`. Covered in depth in F07. Readable in a hex dump.

---

**xxd**
A command-line tool on Linux and Mac that generates a hex dump of any file. Output: `xxd filename`. Three columns: offset (with colon), hex bytes (grouped in pairs), ASCII. Standard tool in CTF forensics work.

---

## Quick Reference

```
Hex dump columns:

  OFFSET  |  HEX BYTES (16 per row, split 8|8)  |  ASCII
  --------+--------------------------------------+-------
  00000000  48 65 6C 6C 6F 2C 20 57  6F 72 6C 64  Hello, W
  00000010  ...

Printable ASCII range:
  0x20 (space) — 0x7E (~)
  Everything else → shows as '.' in the ASCII column

FLAG opener in hex:
  46 4C 41 47 7B  →  F L A G {

FLAG closer in hex:
  7D  →  }

Common non-printable bytes (show as '.'):
  0x00  Null byte  (string terminator, padding)
  0x0A  Newline    (line ending on Linux/Mac)
  0x0D  Carriage return (line ending on Windows, with 0x0A)
  0x09  Tab

Offset arithmetic:
  Each row = 16 bytes = 0x10
  Row 1: 0x00–0x0F
  Row 2: 0x10–0x1F
  Row 3: 0x20–0x2F
  Row N: starts at (N-1) × 0x10

Key byte values to recognize:
  0x30–0x39  →  '0'–'9'
  0x41–0x5A  →  'A'–'Z'
  0x5F       →  '_'
  0x61–0x7A  →  'a'–'z'
  0x7B       →  '{'
  0x7D       →  '}'
```

---

## The Three-Column Layout at a Glance

```
00000000  48 65 6C 6C 6F 2C 20 57  6F 72 6C 64 21 0A  Hello, World!.
│         │                                           │
│         │                                           └── ASCII column
│         │                                               (printable chars or '.')
│         └── Hex column
│             (16 bytes per row, split 8|8)
└── Offset column
    (position of first byte in this row, in hex)
```

---

## Navigation

[← lesson.md](lesson.md) | [challenge →](challenge/index.html)
