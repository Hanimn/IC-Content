---
title: "What's in a File?"
tagline: "Later, at headquarters, they tear it open — and find a map."
time: ""
tier: "Data & Encoding"
---
## The Spy and the Envelope

A spy intercepts an envelope. The outside says "Birthday Card." They tuck it under their arm and carry it across the border without a second glance.

Later, at headquarters, they tear it open — and find a map.

The label on the outside meant nothing. What was inside was the truth.

Files work exactly the same way.

The extension `.txt` on a filename — like `report.txt` — is just a label stuck to the outside. It tells the operating system and other humans "this is probably a text file." But it guarantees nothing. If you rename `photo.jpg` to `photo.txt`, not a single byte inside the file changes. The photo is still a photo. The computer knows this. When it needs to figure out what a file *really is*, it ignores the name and reads the first few bytes.

Those first few bytes are called **magic bytes**. This module explains what they are, why they exist, and why they matter in computer security.

---

## Files Are Just Bytes

Before we get to magic bytes, let's make sure the foundation is solid.

A file is nothing more than a sequence of bytes stored on a disk. A text file is bytes. An image is bytes. A program is bytes. A video is bytes. They're all bytes — the only difference is how those bytes are arranged and what they mean according to the format.

Here is a key insight: **the filename and extension are metadata stored separately from the file's contents.** The directory (the folder) records the name. The file itself contains only the bytes. If you rename the file, you change the directory entry — not a single byte inside the file is touched.

This means:
- Renaming `malware.exe` to `invoice.pdf` changes nothing about its contents
- A JPEG file named `notes.txt` is still a JPEG
- A ZIP archive named `photo.jpg` is still a ZIP

The bytes inside tell the real story.

---

## Magic Bytes (File Signatures)

So if extensions can't be trusted, how does the computer know what a file really is?

The answer: the first few bytes.

When a format is designed, the designers put a **signature** — a specific pattern of bytes — at the very beginning of every file in that format. This is called a **file signature** or **magic bytes** (the name "magic" comes from old Unix systems, where a "magic file" was used to store these patterns).

The key property: magic bytes are fixed and known in advance. Every valid PNG image in the world starts with the same 8 bytes. Every JPEG starts with the same 3 bytes. Every PDF starts with the same 4 bytes. This is part of the format specification.

Here are the magic bytes for the most common formats:

```
Format     Magic Bytes (hex)            ASCII column
------     -------------------------    ----------------
PNG        89 50 4E 47 0D 0A 1A 0A      .PNG....
JPEG       FF D8 FF                     ...
PDF        25 50 44 46                  %PDF
ZIP        50 4B 03 04                  PK..
GIF        47 49 46 38                  GIF8
ELF        7F 45 4C 46                  .ELF
PE/EXE     4D 5A                        MZ
```

Let's look at a few of these up close.

**PNG** starts with `89 50 4E 47 0D 0A 1A 0A`. The first byte is `89` — value 137 in decimal, which is not a printable ASCII character (it shows as `.` in a hex dump). After that comes `50 4E 47`, which is the ASCII encoding of the letters `P`, `N`, `G`. The remaining bytes (`0D 0A 1A 0A`) were chosen to catch file corruption — they include a Windows line ending, a Unix line ending, and another non-printable value. The designers of PNG chose the opening bytes *very deliberately*.

Why does PNG start with `89` instead of just `P`? Because `89` is outside the printable ASCII range. Old text editors and email systems that couldn't handle binary files would immediately know: "this is not plain text." That's intentional. The byte 0x89 acts as a flag that says "binary file ahead."

**JPEG** starts with `FF D8 FF`. Both `FF` and `D8` are non-printable values. Every JPEG image you've ever seen, from your family photos to profile pictures, starts with these three bytes.

**PDF** starts with `25 50 44 46`, which is the ASCII text `%PDF`. You can actually see this if you open a PDF in a text editor — the very first characters will be `%PDF` followed by a version number like `-1.7`. PDF designers chose printable ASCII on purpose, so the file header is human-readable.

**ZIP** starts with `50 4B 03 04`, which spells `PK` in ASCII. The `PK` stands for **Phil Katz**, the programmer who created the ZIP format in the late 1980s. He put his initials in every ZIP file ever made. This is a tradition in software — leaving a small signature in your work.

**GIF** starts with `47 49 46 38`, which is `GIF8` in ASCII. Like PDF, it's designed to be partially readable.

**ELF** starts with `7F 45 4C 46`. The `7F` is non-printable (like PNG's `89`), followed by `E`, `L`, `F` in ASCII. ELF is the executable format used by Linux and most Unix-like systems. Any program you run on Linux starts with these four bytes.

**PE/EXE** starts with `4D 5A`, which is `MZ` in ASCII. This is the format for Windows executables (.exe files). The `MZ` stands for **Mark Zbikowski**, an engineer at Microsoft who designed the format in the early 1980s. Another set of engineer initials, another tradition.

---

## How the OS Uses Magic Bytes

When you double-click a file, your operating system (or file manager) reads the first few bytes to determine the real type, then selects the right program to open it. The extension helps suggest the right program, but the magic bytes confirm the actual format.

The `file` command on Linux and macOS does exactly this. You can run:

```
file vacation.txt
```

And if `vacation.txt` is actually a JPEG, the output will say something like:

```
vacation.txt: JPEG image data, JFIF standard 1.01
```

It ignores the `.txt` extension entirely. It reads the bytes.

Most security tools — antivirus scanners, firewalls that inspect uploads, forensic analysis tools — do the same thing. They don't trust extensions. They check signatures.

---

## Why Attackers Care

Understanding magic bytes is part of understanding how attackers think. Consider a few scenarios:

**Bypassing upload filters.** A website allows users to upload images. The server checks: "does the file end in `.jpg` or `.png`?" An attacker renames `malware.exe` to `malware.jpg` and uploads it. If the server only checks the extension, the malicious file gets through. A properly built server checks the magic bytes — it reads the first few bytes and verifies they match a real image format before accepting the upload.

**Disguising executables.** An attacker emails someone `invoice.pdf`. The victim opens it, expecting a PDF. But if the file is actually a Windows executable (`4D 5A` magic bytes), and their system runs it instead of rendering it, the attacker has code execution. Modern email scanners check magic bytes, not just extensions.

**File carving in forensics.** Investigators recovering files from a damaged or wiped drive look for magic byte signatures in raw data. Even when the file system is completely destroyed, files can be reconstructed by scanning the raw bytes for known signatures. This is called "file carving."

**Steganography detection.** Data can be hidden *inside* a valid file. An image might have hidden data appended after the formal end of the image data. A hex editor or forensic tool will reveal bytes after the normal end-of-file markers. Magic bytes are the entry point for this analysis — first confirm the format, then look for anomalies.

---

## What a Corrupted File Looks Like

In CTF challenges, you will often encounter a file that "won't open." The error might say the file is invalid, corrupted, or an unrecognized format. The first thing to check: **are the magic bytes correct?**

If a PNG has `00 50 4E 47 0D 0A 1A 0A` instead of `89 50 4E 47 0D 0A 1A 0A`, the first byte is wrong. The image viewer sees `00` and says "this doesn't start with `89`, so it's not a PNG." Fix that one byte, and the file works perfectly.

Common corrupted file scenarios:
- First byte changed to `00` or some other value
- First few bytes scrambled
- Magic bytes from a *different* format prepended (the file looks like one thing, is actually another)

The repair technique: look up the correct magic bytes for the expected format, compare to what the file actually starts with, and patch the wrong bytes.

---

## Reading Magic Bytes

Here is a Python one-liner you can run later to inspect any file's first bytes:

```python
python3 -c "with open('mystery.jpg', 'rb') as f: print(f.read(8).hex())"
```

This opens the file in **binary mode** (`'rb'` means "read binary"), reads the first 8 bytes, and prints them as a hex string. For a valid JPEG, you'd see `ffd8ffe0...` or similar.

On Linux and macOS, the `file` command does the same identification automatically:

```
$ file mystery.jpg
mystery.jpg: JPEG image data, JFIF standard 1.01, aspect ratio, density 1x1, segment length 16, baseline, precision 8, 1280x720, components 3
```

For now, you'll work with hex bytes shown directly on the challenge page. The concept is the same: read the opening bytes, compare to the reference table, identify the format.

---

## The Challenge

In the challenge for this module, you'll see six files with misleading names. Each file's actual first 8 bytes are shown. Your job:

1. Read the bytes shown for each file
2. Look them up in the magic bytes reference table on the page
3. Match each file to its real format using the dropdown

After matching all six correctly, a bonus mission appears: a seventh file with a corrupted first byte. You'll use the reference table to determine what the first byte should be and repair it. The repaired file's contents reveal the flag.

---

## Keep Going

**Reference:** Gary Kessler's comprehensive file signatures database — https://www.garykessler.net/library/file_sigs.html — lists magic bytes for thousands of file formats. Bookmark this; you'll use it in forensics challenges.

**What unlocks next:** F08 explores encoding — how text data is represented in bytes, transmitted across networks, and sometimes hidden inside other data. Understanding encoding is essential for web security and cryptography challenges.

This module and the next two (F08, F09) are the last "how computers store things" foundation modules before the curriculum moves into hands-on web security topics: HTTP, cookies, authentication, and injection attacks.

---

*Prerequisites: F05 — Everything Is a Number, F06 — Thinking in Hex*
