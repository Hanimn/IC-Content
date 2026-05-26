# F06 — Solution

## Flag

```
FLAG{0x_bytes_everywhere}
```

---

## Walkthrough

The flag starts at offset `0x20` — that is byte 32 from the start of the file.

In the hex dump, rows 3 and 4 (offsets `0x20` and `0x30`) contain the flag:

```
00000020  46 4C 41 47 7B 30 78 5F  62 79 74 65 73 5F 65 76  FLAG{0x_bytes_ev
00000030  65 72 79 77 68 65 72 65  7D 00 B2 8C 4A F1 71 3E  erywhere}...J.q>
```

**Row 3 (0x20):** The first 16 bytes spell out `FLAG{0x_bytes_ev`
- `46` = F, `4C` = L, `41` = A, `47` = G, `7B` = {
- `30` = 0, `78` = x, `5F` = _, `62` = b, `79` = y, `74` = t, `65` = e, `73` = s, `5F` = _
- `65` = e, `76` = v

**Row 4 (0x30):** Continues with `erywhere}`
- `65` = e, `72` = r, `79` = y, `77` = w, `68` = h, `65` = e, `72` = r, `65` = e
- `7D` = }

Then `00` (null byte) ends the string, followed by more non-printable garbage — shown as dots in the ASCII column.

---

## Why It Works

Hex dumps make the structure of binary data visible. The ASCII column acts as a decoder — any byte in the printable range (`0x20`–`0x7E`) shows up as its character. Bytes outside that range (control codes, high bytes, null bytes) show up as dots and fade into the background.

This is exactly how forensics tools find strings in binary files:

1. Scan the hex dump for runs of printable bytes in the ASCII column
2. Identify the offset where the run begins
3. Read the string

The `strings` command on Linux and Mac automates this process, extracting all runs of 4+ printable characters from a file. But understanding the underlying mechanism — which you just demonstrated — makes you a better user of that tool.

---

## Navigation

[Back to challenge](index.html) | [lesson.md](../lesson.md) | [concept-cards.md](../concept-cards.md)
