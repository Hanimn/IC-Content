# Hint 1

This challenge has two parts and one final flag. Each part hides one fragment of the flag in a different layer of the image.

## Part 1 — Where to look first

Open the EXIF dump (the button below the photograph). Read every line. EXIF blocks contain a lot of structural information — camera make, exposure settings, GPS — but CTF authors almost always plant clues in the **free-text fields** rather than the technical ones. Scroll past the camera and exposure rows and look for fields that humans write into, like **Comment**, **Description**, or **Author**. One of those rows will contain a fragment of the flag in plain text.

## Part 2 — The hidden message

The second image (the small gradient) has the same trick used in real CTF challenges: the bottom bit of every red pixel is part of an ASCII message. The page already has the extraction tool — click the button. The output appears in three layers:

1. The raw bitstream (lots of 1s and 0s).
2. The same bits grouped into bytes, shown in hex.
3. The decoded ASCII text.

Read the green output line. That's the second fragment.

## Combining the two

Once you have both fragments, paste them into the flag input box **back-to-back, with no extra spaces or punctuation**. Fragment 1 first, then fragment 2.

---

*[Back to challenge](index.html) | [Hint 2 →](hint-2.md)*
