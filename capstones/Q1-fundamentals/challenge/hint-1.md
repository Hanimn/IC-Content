# Hint 1 — Q1 The Mystery Letter

(Try the chain with no hints first. The whole capstone is solvable in ~25 minutes if you treat each tab as one of the F0X lessons you already know.)

---

The five tabs map directly to the five Fundamentals lessons:

- **Tab 1** is F01 (DNS). One IP from a list of four matches the school's *internal* domain. Three of the four are decoys from elsewhere on the internet.
- **Tab 2** is F02 (IP & ports). Mail-sending has a standard, textbook port number. SSH, web, and HTTPS all have different ones.
- **Tab 3** is F03 (HTTP request). The first line of an HTTP request is three space-separated words: METHOD PATH VERSION. The Host: header is the next line.
- **Tab 4** is F04 (status codes). One of the five responses is a 200 — only one. The others are redirects or rejections.
- **Tab 5** is F00 (paths & files). Take the building path from Tab 4 and turn it into a flag string by following the worked example.

If you're stuck on any one tab, re-read the corresponding F0X lesson — the answer is right there.

---

If you've tried each tab and you're still stuck, check `hint-2.md`.
