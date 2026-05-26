# F08 — Hint 1

Use this if you've been stuck for a few minutes and want a nudge. No spoilers — just direction.

---

## Part 1 — ASCII Decimal Decode

The ASCII table on the challenge page is your main tool. Each decimal number in the transmission maps to exactly one character.

Start simple: look up the first number, 70, in the table. Find the row where the decimal column says 70. What character is in that row?

A few values worth knowing because they appear in every CTF flag format:
- 123 and 125 are the curly braces `{` and `}`
- 95 is the underscore `_`
- Capital letters start at 65 (`A`) and run to 90 (`Z`)
- Lowercase letters start at 97 (`a`) and run to 122 (`z`)

Work through the numbers one at a time and write down each character as you find it.

---

## Part 2 — Base64 with a Corrupted Character

The base64 string you've been given has exactly one wrong character. It has been corrupted in transit.

First, paste the string as-is into the on-page decoder and click Decode. You should see garbled or unexpected output — that's because one character is wrong.

Next, re-read the clue. It tells you exactly which position contains the error (counting from 1). Count to that position in the string and look at what character is there.

Remember: valid base64 only uses these characters: `A-Z`, `a-z`, `0-9`, `+`, `/`

The character at that position is one that does appear in those valid characters — it just isn't the right one. You need to find which similar-looking character should be there instead.

Try changing just that one character, then paste the updated string into the decoder again. When you get readable English text as output, you've found the right fix.
