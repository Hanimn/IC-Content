# Hint 1 — Read the board

Stuck on Part 2? Take a breath and look at what the page is actually offering you.

The publisher posted an **official** SHA-256 hash for every file in their release. You can see those hashes already — they're stored inside the page. Your job isn't to guess. It's to **compare**.

For each file:
1. Click the file row to compute its SHA-256
2. The page shows you both the **computed** hash (from the file you have) and the **official** hash (from the publisher)
3. If they match exactly, the file is genuine
4. If they don't match — even by one character — somebody changed the file

You don't need to memorize 64-character hex strings. The page will color-code them: green for match, red for mismatch.

There are five files. Four of them are fine. One is not.

Click them all.

---

[← Back to challenge](index.html) | [Hint 2 →](hint-2.md)
