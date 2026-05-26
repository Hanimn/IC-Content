# Hint 1

The minimum-length filter is your best friend.

Start at **4** — the default. You'll see a long list of runs. Some are real strings (welcome message, usage line, copyright). Others are short coincidental fragments that happen to land in the printable ASCII range. The flag is in there too, but it's surrounded by noise that makes it harder to spot.

Now click **6**. Watch what disappears. Then click **8**. The list shrinks fast, because most coincidental noise is short — real, intentional strings tend to be longer. By the time you're at min-length 8, you're looking at a small number of clear, deliberate strings. The flag is one of them.

Read the entries that survive. One of them starts with `FLAG{`.

---

*[Back to challenge](index.html) | [Hint 2 →](hint-2.md)*
