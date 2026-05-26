# F06 — Hint 1

You're looking for the flag `FLAG{...}` hidden in the hex dump.

- The flag always starts with the characters `F`, `L`, `A`, `G`, `{`
- In hex: `F` is `0x46`, `L` is `0x4C`, `A` is `0x41`, `G` is `0x47`, `{` is `0x7B`
- Look at the hex column and find the sequence `46 4C 41 47 7B`

These five bytes will be highlighted in the hex column. Once you find them, look at the ASCII column in the same row — the flag characters will be readable there.

Count up from offset `0x00` to find which row the sequence appears in. Each row spans 16 bytes (0x10 in hex).
