# Hint 2 — What's in a File?

Here are the first identifying bytes for each file to help you narrow down:

**vacation.txt** — starts with `FF D8 FF`
Only one format in the table starts with two `FF` bytes. It's a photo format.

**report.png** — starts with `25 50 44 46`
In ASCII, that's `%PDF`. The format name is right there in the bytes.

**archive.jpg** — starts with `50 4B`
In ASCII, that's `PK`. These are the initials of Phil Katz, who created this compression format.

**image.pdf** — starts with `89 50 4E 47`
The `89` is non-printable, but the next three bytes (`50 4E 47`) spell `PNG` in ASCII.

**document.zip** — starts with `47 49 46 38`
In ASCII: `GIF8`. This format announces itself clearly.

**notes.gif** — starts with `7F 45 4C 46`
The `7F` is non-printable (like PNG's `89`), then `45 4C 46` = `ELF` in ASCII. This is a Linux/Unix executable format.

---

**For the bonus mission:**

Look at the PNG row in the reference table. The first byte shown is `89`. That's what the corrupted byte should be. Enter `89` in the repair input box.

After entering the correct value, the file's recovered contents will appear — including the flag.
