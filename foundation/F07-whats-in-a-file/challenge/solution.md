# Solution — F07: What's in a File?

## Flag

```
FLAG{magic_bytes_never_lie}
```

---

## Part 1 — File Disguise Detector

Match each file to its real format by reading the magic bytes:

| # | Filename | First Bytes (hex) | ASCII Reading | Real Format |
|---|---|---|---|---|
| 1 | `vacation.txt` | `FF D8 FF E0` | (non-printable) | **JPEG** |
| 2 | `report.png` | `25 50 44 46` | `%PDF` | **PDF** |
| 3 | `archive.jpg` | `50 4B 03 04` | `PK..` | **ZIP** |
| 4 | `image.pdf` | `89 50 4E 47` | `.PNG` | **PNG** |
| 5 | `document.zip` | `47 49 46 38` | `GIF8` | **GIF** |
| 6 | `notes.gif` | `7F 45 4C 46` | `.ELF` | **ELF** |

### Why each answer is correct

**vacation.txt → JPEG**
The bytes `FF D8 FF` are the JPEG magic bytes. JPEG uses non-printable values (255, 216, 255 in decimal), so there's no readable text — but only one format in the table starts with `FF D8 FF`.

**report.png → PDF**
`25 50 44 46` in ASCII is `%PDF`. PDF files were designed with a human-readable header — you can literally read the format name. The full signature is often `%PDF-1.x` (the `2D 31 2E 78` continuing the header).

**archive.jpg → ZIP**
`50 4B` is `PK` in ASCII — the initials of Phil Katz, creator of the ZIP format. He embedded his initials in every ZIP file ever created. `03 04` is the local file header marker that follows.

**image.pdf → PNG**
`89 50 4E 47` — the `89` is non-printable (value 137 decimal), followed by `50 4E 47` which is `PNG` in ASCII. The full PNG signature is 8 bytes: `89 50 4E 47 0D 0A 1A 0A`.

**document.zip → GIF**
`47 49 46 38` = `GIF8` in ASCII. All GIF files start with either `GIF87a` or `GIF89a` — both begin with `GIF8`.

**notes.gif → ELF**
`7F 45 4C 46` — the `7F` is non-printable (value 127 decimal), then `45 4C 46` = `ELF` in ASCII. ELF (Executable and Linkable Format) is used by Linux and Unix executables, shared libraries, and core dumps.

---

## Part 2 — Corrupted File Repair (Bonus Mission)

**File:** `evidence.png`
**Corrupted bytes shown:** `?? 50 4E 47 0D 0A 1A 0A`
**Correct first byte:** `89`

Enter `89` in the repair input to restore the PNG signature.

### Why the PNG first byte is 89

The value `0x89` (137 decimal) is deliberately non-printable ASCII. This was a design decision by the PNG specification authors:

- If PNG files started with printable ASCII like `PNG`, an old text editor or email system might try to open or transmit them as plain text — and corrupt the binary data in the process
- The byte `0x89` (value 137) is above the 7-bit ASCII range (0–127), immediately signaling "this is a binary file, not text"
- The same logic applies to ELF (`7F`) and JPEG (`FF D8 FF`) — all use values that fall outside printable text ranges

The rest of the PNG signature (`50 4E 47` = `PNG`) makes the format human-identifiable in a hex editor, while `0D 0A` (Windows line ending) and `0A` (Unix line ending) in the remaining bytes help detect if a file was corrupted during a text-mode transfer that converts line endings.

The 8-byte PNG signature is one of the most carefully designed file signatures in existence.

---

## Key Takeaways

1. File extensions are labels. They can be changed without touching the file's content.
2. Magic bytes are in the file itself — they cannot be faked by renaming.
3. Security scanners, the `file` command, and forensic tools all use magic bytes, not extensions.
4. Some magic bytes are readable ASCII (%PDF, PK, GIF8, MZ) — others are deliberately non-printable to prevent text tools from corrupting binary files.
5. When a file "won't open," the first thing to check is whether the magic bytes are correct.
