# Solution: F15 — The Picture That Knew Too Much

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

This challenge mirrors a standard CTF forensics pattern: every image has two layers worth checking — the **metadata** that lives next to the picture, and the **steganographic payload** that lives inside the picture's bytes. Both layers carry one fragment of the flag. You need to recover both and concatenate them.

A solver working through this should:

1. Run a metadata reader against the photograph (here, the "Read Metadata" button; in real life, `exiftool`).
2. Read every field carefully and notice the Comment field contains a flag fragment in plain text.
3. Run an LSB extractor against the second image (here, the "Extract Hidden Message" button; in real life, `zsteg` or a custom Python script).
4. Combine the two fragments into the full flag.

---

## Step-by-Step Solution

### Step 1 — Read the EXIF metadata

Click **Read Metadata (exiftool)**. The EXIF dump appears, listing 16 fields. Most of them are routine technical data — camera make, lens focal length, ISO, shutter speed, aperture, GPS coordinates, timestamp, software version.

The last row is highlighted: it is the **Comment** field. Its value is:

```
fragment 1 = "FLAG{look_in_the_"  (look closer)
```

So **fragment 1** is `FLAG{look_in_the_`.

In a real CTF the equivalent terminal command would be:

```
exiftool anonymous_tip.jpg
```

…and you would scroll through the output looking for non-technical fields like `Comment`, `Description`, `Author`, `XPComment`, or `UserComment`.

*You see: a long EXIF dump with the last row highlighted in green, value `fragment 1 = "FLAG{look_in_the_"`.*

### Step 2 — Extract the LSB-encoded message

Click **Extract Hidden Message**. The page reads every pixel of the small gradient image, takes the lowest bit of each red channel, and decodes the resulting byte stream as ASCII.

The output panel shows three rows:

**Row 1 — Raw bits.** The first 240 bits, shown in groups of 8. They look like a stream of binary digits — for example: `01101101 01100101 01110100 ...`.

**Row 2 — Bytes in hex.** The same bits grouped into bytes: `6D 65 74 61 64 61 74 61 5F 61 6E 64 5F 62 65 6C ...`. If you decode `6D 65 74 61 64 61 74 61` as ASCII you get `metadata` (since `m=0x6D, e=0x65, t=0x74, a=0x61, d=0x64`).

**Row 3 — Decoded text.** In green: `metadata_and_below_the_pixels}`.

So **fragment 2** is `metadata_and_below_the_pixels}`.

In a real CTF the equivalent command for a PNG would be:

```
zsteg gradient.png
```

`zsteg` automatically tries every common LSB strategy (R-only, G-only, B-only, RGB-combined, MSB-first, LSB-first, ascending or descending pixel order, etc.) and prints any decoded text that looks meaningful. For a more manual approach in Python:

```python
from PIL import Image

img = Image.open('gradient.png').convert('RGB')
w, h = img.size
bits = []
for y in range(h):
    for x in range(w):
        r, g, b = img.getpixel((x, y))
        bits.append(r & 1)

text = ''
for i in range(0, len(bits), 8):
    byte = 0
    for k in range(8):
        byte = (byte << 1) | bits[i + k]
    if byte == 0:
        break
    text += chr(byte)

print(text)
```

This script does exactly what the challenge page's button does. Run it on a real PNG and it would print `metadata_and_below_the_pixels}`.

*You see: the extraction panel showing bits, hex bytes, and the decoded green text.*

### Step 3 — Combine and submit

Take fragment 1 (`FLAG{look_in_the_`) and immediately follow it with fragment 2 (`metadata_and_below_the_pixels}`). The full flag is:

```
FLAG{look_in_the_metadata_and_below_the_pixels}
```

Type that into the flag input box and press Enter or click **Submit Flag**.

*You see: input box turns green, success message appears, and the flag terminal slides into view.*

---

## The Flag

```
FLAG{look_in_the_metadata_and_below_the_pixels}
```

The flag itself is the lesson: **look in the metadata, and look below the pixels.** Every image you encounter in forensics carries both kinds of secret.

---

## Why LSB Stego Is Invisible

Each pixel in the gradient image has a red value somewhere in the range 60–230. The LSB encoding flips at most one bit — changing the red value by 1 (e.g. from 184 to 185 or vice versa). To the human eye, that is undetectable. The two reds look identical, even side by side, because:

- The eye's cone cells are far less sensitive to a 1/256 change in intensity than a 1/16 or 1/8 change.
- Any image-quality variation due to compression, monitor calibration, or ambient light is many times larger than 1/256.
- Even mathematical image-quality measures (PSNR, SSIM) report scores indistinguishable from a perfect copy when only LSBs are touched.

This is why LSB is a forensics workhorse. The image looks fine; the message is invisible to the naked eye and to most automated viewers; only a tool that explicitly inspects the lowest bit will surface the payload.

---

## Why JPEG Would Have Failed

Notice that the LSB challenge image was rendered as a PNG (lossless). If the same encoding had been applied to a JPEG, the message would have been **destroyed** by JPEG compression. Here is why.

JPEG uses lossy compression — it quantises the image data, throwing away small variations to save space. The "small variations" it discards include exactly the lowest bit of each colour channel. Save an LSB-encoded image as JPEG, reload it, and the message is gone.

**Rules of thumb for image stego:**
- LSB stego lives in **PNG, BMP, TIFF, GIF** (lossless formats).
- For JPEG, attackers use **DCT-coefficient stego** (e.g. F5, JSteg) or **payload appended after the FF D9 end marker** instead.

---

## The Defender's Perspective

If you publish images and want to avoid leaking metadata or revealing hidden payloads injected by your tools, do the following:

1. **Strip EXIF before publishing.** Use `exiftool -all= image.jpg` or `mogrify -strip image.jpg` to remove every metadata field. Most social media platforms do this automatically for the public version, but not for the original upload stored on their servers.

2. **Re-encode through a lossy filter.** Saving an image as a JPEG with quality 85 will destroy any LSB payload while preserving visual quality. This is not foolproof against all stego techniques, but it stops casual LSB attackers.

3. **Don't accept images at face value.** When investigating an incident, run every image through `exiftool`, `binwalk`, and `zsteg` before assuming it is "just a picture."

4. **Be aware of polyglot files.** A file that opens as a PNG can also be a valid ZIP. Magic bytes (F07) are the entry point, but they are not the whole truth.

---

## Real-World EXIF Leaks

A few documented incidents to anchor the lesson:

- **2007 — Iraq.** US Army helicopters were destroyed at a base after soldiers posted photos online; the photos' EXIF GPS revealed the helicopters' location to the enemy. After this, official policy required EXIF stripping before publication.
- **2012 — John McAfee.** While in hiding, the Vice journalists who interviewed him posted a photo. The photo's EXIF GPS revealed his location to within a few metres, and he was arrested.
- **2003 — UK government dossier.** A "redacted" Word document on Iraq was published with metadata that included the chain of authors and edits, undermining the official narrative.

The pattern is consistent: people share files thinking only of the visible content; the metadata always knows more than they intended.

---

## Write Your Own Writeup

Good CTF players document their solutions. Here's a template — fill it in:

---

**Challenge:** F15 — The Picture That Knew Too Much
**Category:** Forensics
**Difficulty:** Intermediate
**Tools used:** Browser dev tools, simulated `exiftool`, simulated `zsteg`-style LSB extractor

**Approach:**
[How did you approach this? Did you immediately think "metadata first, then stego"? Did you spot the Comment field on first read?]

**Steps:**
1. [How you opened and read the EXIF block]
2. [How you found fragment 1]
3. [How you understood the LSB algorithm and ran the extractor]
4. [How you found fragment 2]
5. [How you concatenated them into the final flag]

**Flag:** `FLAG{look_in_the_metadata_and_below_the_pixels}`

**What I learned:**
[What does this challenge teach you about image forensics? Why is "metadata first" the universal first step?]

---

## Reflection Questions

1. The lesson said a 100×100 image has 30,000 hidden bits using full LSB. How long a message could you hide in a 1000×1000 photo? In a 4000×3000 phone photo?

2. JPEG compression destroys LSB payloads. What does that tell you about how JPEG decides which pixel-level information is "important"?

3. The Comment field in this challenge contained the flag fragment in plain text. In a harder challenge, the comment might contain a base64 string, a hex blob, or a coordinate that points to an LSB region. How would each of those hide the flag better than plain text?

4. EXIF is only one metadata standard. PDF, Word, and MP3 all have their own. Pick one of those formats and research what fields it carries. Where would *you* hide a flag in it?

---

*Great work. The full forensics toolkit — magic bytes (F07), encoding (F08), metadata, and stego — is now in your hands. On to Phase 2.*

[Back to Module](../README.md) | [Foundation Track →](../../README.md)
