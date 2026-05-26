# Hint 2

If hint 1 wasn't enough, here are more specific nudges.

## Part 1 — The specific field

The EXIF block contains a **Comment** field. In the dump, it is the last row and is highlighted in green. Read it carefully. The field's value contains the literal string `fragment 1 = "..."` — and the contents inside the quotes are exactly the first half of the flag. Copy what is between the quotes. It begins with `FLAG{` and ends with an underscore.

In a real CTF, you would have run:

```
exiftool anonymous_tip.jpg | grep -i comment
```

and the same string would have appeared.

## Part 2 — How the LSB extraction works

The button **Extract Hidden Message** runs this algorithm:

1. Reads every pixel of the small gradient image with `canvas.getImageData()`.
2. For each pixel, takes only the lowest bit of the red channel: `R & 1`.
3. Collects those bits in scan order (left-to-right, top-to-bottom).
4. Groups every 8 bits into one byte (most-significant bit first).
5. Decodes each byte as ASCII.
6. Stops at the first null byte (`0x00`).

The output text is the second fragment of the flag. It begins with `metadata` and ends with a closing brace `}`.

If the button shows nothing or shows garbage, refresh the page so the image is redrawn — the encode step happens once when the page loads.

## Part 3 — Combining

The full flag is:

```
[fragment 1][fragment 2]
```

No space, no comma, no separator. Just the two strings concatenated. The result starts with `FLAG{look_in_the_` and ends with `_pixels}`. The total length is the sum of the two fragments' lengths.

If the submission is being rejected:
- Check capitalisation. Flags are case-sensitive.
- Check that you used underscores (`_`), not hyphens or spaces.
- Make sure there is exactly one `{` and one `}`.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
