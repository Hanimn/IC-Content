# F07 — Concept Cards

## Key Terms

---

**Magic Bytes**
The first few bytes of a file that identify its format. Also called a *file signature*. Every valid file of a given format starts with the same signature bytes — this is part of the format specification. Programs and tools read magic bytes to determine the real file type, regardless of the extension.

---

**File Extension**
The part of the filename after the last dot — for example, `.jpg`, `.pdf`, `.exe`. A file extension is a label for humans and for the operating system's default program associations. It is *not* a guarantee of actual file content. An extension can be changed without touching a single byte inside the file.

---

**File Header**
The beginning of a file. The header typically contains the magic bytes plus additional format metadata — things like dimensions (for images), version number (for PDF), or compression settings (for ZIP). The header tells a decoder how to interpret the rest of the file.

---

**Null Byte**
The byte with value `0x00` (zero). Common in binary files as padding, field separators, or string terminators. In C-style strings, a null byte marks the end of the string. Null bytes are invisible in text but appear explicitly in hex dumps as `00`.

---

**Entropy**
A measure of randomness in data. Encrypted or compressed files have high entropy — the byte values are spread out nearly uniformly. Plain text has lower entropy — some bytes (like printable ASCII letters) appear much more often than others. Forensic analysts use entropy to detect encrypted, compressed, or packed data inside files. High-entropy sections of a file that "shouldn't" be compressed are a flag worth investigating.

---

## Magic Bytes Quick Reference

```
Format   Magic Bytes (hex)            ASCII equivalent
------   --------------------------   -----------------
PNG      89 50 4E 47 0D 0A 1A 0A      .PNG....
JPEG     FF D8 FF                     (non-printable)
PDF      25 50 44 46                  %PDF
ZIP      50 4B 03 04                  PK..
GIF      47 49 46 38                  GIF8
ELF      7F 45 4C 46                  .ELF
EXE/PE   4D 5A                        MZ
```

**Notes on each:**
- `PNG` — starts with `89` (non-printable, signals "binary file") then the literal letters PNG
- `JPEG` — starts with two non-printable bytes; no readable text
- `PDF` — starts with `%PDF`, fully readable; often followed by a version like `%PDF-1.7`
- `ZIP` — starts with `PK` (initials of creator Phil Katz)
- `GIF` — starts with `GIF8`, readable; followed by `7a` (GIF87a) or `9a` (GIF89a)
- `ELF` — starts with `7F` (non-printable) then the letters ELF; used by Linux/Unix executables
- `EXE` — starts with `MZ` (initials of creator Mark Zbikowski); all Windows .exe files

---

## Common Mistakes

**Trusting file extensions in a forensics challenge.**
Always verify with magic bytes. The challenge file named `vacation.txt` might be a JPEG. Read the bytes, not the name.

**Forgetting that some magic bytes are readable ASCII.**
PDF starts with `%PDF`. ZIP starts with `PK`. GIF starts with `GIF8`. If you're looking at a hex dump and you see those ASCII characters in the first few bytes, you may already know the format without needing to look it up.

**Assuming corruption only happens at the start.**
Most challenges corrupt magic bytes — but corruption and hidden data can occur anywhere in a file. After fixing the header and getting a file to open, check whether the file contains extra data beyond where it should normally end. Steganography challenges often hide data by appending bytes after the end-of-file marker.

**Confusing hex bytes with ASCII text.**
`89` is a byte value (137 decimal). It is *not* the ASCII character "8" followed by "9". When you read magic bytes, you're reading the raw byte values — not treating them as text. A hex dump shows each byte as two hex digits: `FF` means one byte with value 255, not the letter F twice.
