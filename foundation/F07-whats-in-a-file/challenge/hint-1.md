# Hint 1 — What's in a File?

Compare each file's opening bytes against the magic bytes table on the page.

The first bytes tell you the truth about what a file really is. Don't trust the filename extension — it's just a label.

For each file, read the first two to four hex bytes and look them up in the reference table. Some formats have ASCII-readable magic bytes (like `%PDF` or `PK`) — if you look at what those bytes mean as ASCII characters, the format name practically spells itself out.

Try translating the hex values to ASCII:
- `25` = `%`, `50` = `P`, `44` = `D`, `46` = `F` — put them together
- `50` = `P`, `4B` = `K` — what does PK stand for?
- `47` = `G`, `49` = `I`, `46` = `F`, `38` = `8` — try reading those as letters

For the non-printable ones (like `FF D8 FF`), you won't get readable text — just check which entry in the reference table starts with those exact bytes.

For the bonus mission: look at the PNG row in the magic bytes reference table. What is the very first byte listed?
