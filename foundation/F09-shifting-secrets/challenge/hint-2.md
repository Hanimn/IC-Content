# Hint 2

The **Frequency Analysis** panel can help you narrow it down without trying every shift.

Click **Analyze Ciphertext** and look at the bar chart. Find the letter with the longest bar — the one that appears most often in the ciphertext. In English, the letter **E** is usually the most common (roughly 13% of all letters in a typical message).

A Caesar shift doesn't change *how often* letters appear — it just relabels them. So the most frequent ciphertext letter is probably the encrypted form of **E**. Count the gap between that letter and E in the alphabet: that's the shift.

The frequency panel will even calculate this for you and suggest a shift to try.

One more nudge: **ROT13** is a famous special case of the Caesar cipher. It has a shift that is exactly halfway around the 26-letter alphabet — and it's its own inverse (applying it twice gets you back to where you started). This shift is used so often in puzzles and software that it's worth remembering.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
