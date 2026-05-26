# F06 — Hint 2

The flag starts at offset `0x20`.

**How to find offset 0x20 in the dump:**

Each row covers 16 bytes (= 0x10 in hex). That means:

| Row | Offset range |
|-----|-------------|
| Row 1 | `0x00` – `0x0F` |
| Row 2 | `0x10` – `0x1F` |
| Row 3 | `0x20` – `0x2F` ← **flag starts here** |
| Row 4 | `0x30` – `0x3F` |

Look at the offset column on the left — the row that starts with `00000020` is row 3.

The flag spans **two rows**. Read the ASCII column starting from row 3, continuing into row 4, until you see the closing `}`.

The answer to Q1 is: `20` (or `0x20`)
