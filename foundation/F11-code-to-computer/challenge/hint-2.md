# Hint 2

Try the **Show only printable runs** toggle.

When it's on, the hex dump dims everything that isn't a long-enough run of printable bytes, and highlights the runs that survive in pale blue. With the min-length set to 6 or 8, the noise rows go faint and the embedded strings glow.

Scroll the dump. Most rows are dim. A few rows light up with continuous highlighted bytes — those are the strings. One of them begins with the bytes `46 4C 41 47 7B`. From F06 you should recognise that pattern instantly: those are the ASCII codes for `F`, `L`, `A`, `G`, `{`.

Read the rest of that highlighted run from the ASCII column on the right, byte for byte, until you hit a `}`. That whole run — from `F` to `}` — is the flag.

You can also just copy the string directly out of the **Extracted Strings** panel. The flag is the entry whose text starts with `FLAG{`.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
