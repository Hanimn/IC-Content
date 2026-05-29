---
title: "The Picture That Knew Too Much"
tagline: "You save it. You move on."
time: ""
tier: "Security Concepts"
---
## A Photo From a Stranger

A photo arrives from someone you don't know. It's just a picture — a sunny street, a coffee shop, a person leaning against a wall. Nothing unusual.

You save it. You move on.

But that file is not just the picture you can see. Tucked invisibly behind it is a small notebook with notes about how the picture was made — the make and model of the camera, the lens, the time of day the shutter clicked, sometimes the exact GPS coordinates where the photographer was standing. And inside the picture itself — woven through the very pixels you're looking at — there might be a hidden message. A short sentence. A password. A flag.

The photo knew more than it told you. This module teaches you how to make it talk.

---

## A One-Page Pause Before You Start

This is the most powerful single skill in the Foundation track. By the end of this lesson you'll be able to pull GPS coordinates out of a photo someone took, and read messages hidden inside ordinary-looking images. That ability is exactly what investigators, journalists, and forensics analysts use to do real-world good — and exactly what stalkers and abusers use to hurt people.

The line between those two outcomes is consent. Practise on your own photos. Practise on the demonstration files in this challenge and on public CTF datasets that exist for this purpose. **Don't** run `exiftool` on photos a friend or classmate sent you, on Instagram or TikTok or Discord posts, or on photos you found online of someone who didn't agree to be looked at — even if it's "just curiosity," even if "they posted it publicly," even if you're "not going to do anything with it." That's what doxxing is. The pledge you signed at the start of the curriculum applies hardest right here:

> [ETHICAL-HACKING-PLEDGE](../../ETHICAL-HACKING-PLEDGE.md) — read or re-read it before continuing.

If at any point in the next 2,200 words you feel the impulse to "try this on a real person's photo to see what happens," that's the impulse the pledge is talking about. Stop, close the tab, do something else for ten minutes, and come back when the curiosity points at your own files instead.

---

---

## Data About Data: Metadata

Every file you've ever opened carries a small bundle of notes that describe the file itself. These notes are called **metadata** — literally "data about data."

Metadata is the stuff next to the content, not the content itself:

- A song file knows the artist's name, the album, the track number, the year.
- A PDF file knows who created it, in what software, when, and sometimes every revision that was made to it.
- A Word document knows every author who edited it, the comments they left in the margins, and the changes they accepted or rejected.
- A JPEG photo knows the camera, the lens, the ISO setting, the exposure time, and — sometimes — the exact place on Earth where it was taken.

The user sees a filename and a picture. Underneath, the file has a tiny biography of itself. Most people never read it. Forensic investigators always do.

This is the first rule of file forensics: **on any unfamiliar file, the first thing you check is the metadata.**

---

## EXIF: The Photo's Notebook

For images — especially JPEGs straight from phones and cameras — the metadata format is called **EXIF** (Exchangeable Image File Format). EXIF is a small block of structured fields embedded inside the image file itself, separate from the picture data. The image viewer just shows you the picture and ignores the EXIF block. A specialist tool reads it.

A typical EXIF block looks something like this:

```
Camera        : iPhone 13 Pro
Lens          : 26 mm f/1.5
ISO           : 100
Shutter       : 1/250 s
Aperture      : f/1.5
Date Taken    : 2024-08-15 14:23:11
GPS Latitude  : 37.7749 N
GPS Longitude : 122.4194 W
Software      : iOS 17.4
Orientation   : Rotate 90 CW
```

That last block — the GPS coordinates — is the famous one. If location services were on when the picture was taken, the phone wrote down where you were, to within a few metres, and then quietly stuck the answer inside the file.

This has caused real-world problems. There are documented cases of:

- **Soldiers** being located by enemies after photos were posted from a forward base, because the EXIF GPS gave the precise coordinates of the position.
- **Activists and journalists** being tracked because a photo of a "safe house" carried the safe house's coordinates inside it.
- **Anonymous tipsters** being identified after sending a photo that turned out to embed the date, time, and place where the tipster was standing.

Because of this, military and intelligence organisations routinely "strip" EXIF from any image they publish. Big social-media platforms (Facebook, Twitter/X, Instagram) also strip EXIF before serving the photo to other users — but the original upload, sitting on the company's servers, often still has it. Email attachments, files sent over chat apps, and direct downloads keep the EXIF intact.

For a CTF player, EXIF is the first stop on every image-based challenge. Half the time, the answer is just *sitting there* in a `Comment` or `Description` field, waiting to be read.

---

## EXIF Lives Beyond Photos

EXIF is the most famous metadata standard, but the same idea — invisible notes inside the file — appears everywhere.

- **PDF** files have a metadata dictionary that records the author, creation tool, modification date, and (in many cases) the entire edit history of the document. Pull a "redacted" PDF apart and you can sometimes recover the redacted text.
- **Microsoft Word** files store revisions, comments, and the names of every person who edited the file. There is a famous story of a UK government dossier in 2003 whose Word metadata revealed the chain of authors and edits, contradicting the official narrative of how the document was produced.
- **MP3** audio files have ID3 tags — artist, album, year, lyrics, sometimes embedded comments.
- **Office documents** can carry "fast save" data that retains text the user thought they had deleted.

Different formats, same idea: behind every file, a small notebook.

---

## The Tools

The classic tool for reading metadata is `exiftool`, a command-line program by Phil Harvey. It reads metadata from over a hundred file formats — not just JPEG. On a Linux or macOS terminal, you'd type:

```
exiftool mystery.jpg
```

…and watch a long printout scroll by. Every field, every value. CTF players keep `exiftool` permanently installed.

In the browser, JavaScript libraries like `exif-js` or `piexif` can read EXIF directly from a file the user uploads. In Python, `Pillow.Image._getexif()` does the same job in three lines.

For this module's challenge, we will *simulate* an EXIF reveal. The image you'll see is drawn live by JavaScript on a canvas — so it has no real EXIF block. Instead, the page holds a fake EXIF dictionary in JavaScript and renders it on demand. The point is the *idea*: a button labelled "Read Metadata" pulls out the photo's secret notebook. In a real CTF, the button would be the `exiftool` command, run on a real photo.

---

## Steganography: Hiding Inside the Picture

Metadata is one secret. There is a second, more clever secret a picture can carry: a message hidden inside the visible image data itself, where you cannot see it. This technique is called **steganography** — Greek for *covered writing*.

The difference matters:

- **Metadata** lives *next to* the picture — a notebook tucked behind it.
- **Steganography** lives *inside* the picture — woven into the pixels so the image still looks normal but holds a payload underneath.

Steganography is older than computers. People have hidden messages in wax tablets, in invisible ink between the lines of innocent letters, on the shaved scalps of messengers (the hair grew back over the message). The digital version simply moves the trick into pixels.

---

## Pixels, Bits, and the Idea Behind LSB

Stop and remember what an image actually is.

A digital colour image is a grid of pixels. Each pixel has three numbers — Red, Green, Blue — each in the range **0 to 255**. That's eight bits per channel, three channels per pixel, so each pixel takes 24 bits.

Now, a question: if you change one pixel's red value from `200` to `201`, can your eye see the difference?

The answer is no. Not even close. The change is one part in 256, in only one of three channels, in one of (probably) tens of thousands of pixels. The picture looks identical.

That tiny, invisible change is the trick. **The lowest bit of each colour channel barely matters to the appearance.** Flipping it shifts the value by exactly 1 — a difference no human eye, and almost no image-quality test, can detect. So you can *use* that lowest bit to store something else: a bit of a hidden message.

This technique is called **LSB steganography** — Least Significant Bit steganography. It is the most common stego method in CTF challenges, and you will meet it again and again.

The maths is friendly:

- One pixel has three channels (R, G, B).
- Each channel donates its lowest bit.
- Three hidden bits per pixel.
- A 100×100 image has 10,000 pixels = 30,000 bits = **3,750 bytes** of hidden capacity.

A 1000×1000 photo has room for nearly half a megabyte of hidden text. That is plenty of room to hide a flag, a password, an entire short story.

---

## How LSB Encoding Looks

Suppose the next byte of your hidden message is `01000001` — the ASCII letter `A`. You take the next 8 pixel-channels in scan order (one bit each) and replace each channel's lowest bit with the next bit of your message.

Imagine three pixels with channel values:

```
Pixel 1: R=200 (11001000)  G=150 (10010110)  B=100 (01100100)
Pixel 2: R=210 (11010010)  G=160 (10100000)  B=110 (01101110)
Pixel 3: R=220 (11011100)  G=170 (10101010)  B=120 (01111000)
```

You want to embed the bit pattern `01000001`. Replace the lowest bit of each channel in order:

```
Pixel 1: R=11001000 (last bit → 0)  G=10010111 (last bit → 1)  B=01100100 (last bit → 0)
Pixel 2: R=11010010 (last bit → 0)  G=10100000 (last bit → 0)  B=01101110 (last bit → 0)
Pixel 3: R=11011100 (last bit → 0)  G=10101011 (last bit → 1)  B=...
```

After embedding, R-channel of pixel 1 is still `11001000` (its last bit was already 0 — no change). G-channel of pixel 1 was `10010110` and is now `10010111` — that's one more, value 151 instead of 150. Invisible.

The image still looks the same. But the lowest bits, read in order, now spell out the bits of `A`.

To **extract**, you reverse the process: read every channel value, mask off everything except the last bit (`value & 1`), collect bits in order, group into bytes, and decode as ASCII. If the result is readable text, you've found the hidden message.

---

## A Tiny Worked Example

Here is a 2-pixel image carrying a hidden message:

```
Pixel 1:  R=153  G=99   B=240
Pixel 2:  R=10   G=176  B=33
```

Pull out the lowest bit of each channel:

```
153 = 10011001 → last bit = 1
 99 = 01100011 → last bit = 1
240 = 11110000 → last bit = 0
 10 = 00001010 → last bit = 0
176 = 10110000 → last bit = 0
 33 = 00100001 → last bit = 1
```

Bitstream: `110001`

Six bits — not yet a full byte, so this two-pixel example doesn't decode to a character. With three more pixels (nine more channels), we'd have a complete byte plus a few bits to start the next one. With thirty pixels we'd have a full ten-character word.

That is the entire LSB extraction algorithm. It looks slow on paper. A computer does it on a 1000×1000 image in milliseconds.

---

## How LSB Stego Is Found in CTF

When a CTF challenge gives you an image, the standard checklist is:

1. **`exiftool image.png`** — read the metadata. The flag is sometimes literally in a Comment field.
2. **`file image.png`** and **`xxd image.png | head`** — confirm the magic bytes (F07). Sometimes the file is mislabelled.
3. **`strings -n 8 image.png`** — pull out long runs of printable text. Sometimes a flag is embedded as plain ASCII somewhere in the bytes.
4. **`zsteg image.png`** — automatic LSB scanner for PNG and BMP. It will try every common LSB extraction strategy and surface anything that decodes as readable text.
5. **`steghide extract -sf image.jpg`** — for JPEG, try to extract a payload (sometimes password-protected).
6. **Open in `stegsolve`** — a viewer that lets you flip through individual bit planes, channel by channel. A hidden message often appears as readable text on bit-plane 0.

Behind every one of those tools is the same idea you just learned: read low-order bits, group into bytes, decode as ASCII.

---

## Other Steganography You'll Meet

LSB is the most common, but it is not the only kind:

- **Append-after-end-of-file.** A JPEG ends with the bytes `FF D9` (its end marker). You can paste an entire ZIP archive, or any other file, *after* those bytes. Image viewers stop at `FF D9` and never see the extra. A hex editor or `binwalk` reveals everything tacked on the end. This is why F07's magic-bytes lesson matters here: you find the end marker, and you check what's past it.

- **Audio LSB.** WAV files store sound samples as numbers. Flip the lowest bit of each sample and it changes the audio so subtly that you cannot hear it. Same trick, different medium.

- **Whitespace stego.** Hide bits in trailing spaces, tabs, or non-breaking-space characters in a text file. Each space-or-tab is one bit. Hilariously easy to overlook.

- **Polyglot files.** A single file that is *both* a valid PNG and a valid ZIP, depending on which parser reads it. Forensics CTFs love these.

The unifying idea: **every format has unused space, and unused space can carry a payload.**

---

## The Challenge Briefing

The challenge for this module has two parts.

**Part 1 — The Metadata Reveal.** The page shows a small drawing on a canvas — a sky, a sun, a horizon. It looks like a normal picture. A button labelled "Read Metadata" reveals a (simulated) EXIF dump showing camera, GPS, timestamp, and a `Comment` field that contains the first half of the flag.

**Part 2 — The LSB Extract.** A second tiny canvas holds an LSB-encoded message in the lowest bit of every red channel. Click "Extract Hidden Message," the page reads the canvas pixels with `getImageData`, masks off everything but the last bit, groups the resulting bitstream into bytes, decodes ASCII, and prints the second half of the flag.

Combine the two halves into the full flag, paste it into the submission box, and you've completed the module.

The tools you'll use mirror what real CTF forensics looks like: read the metadata, look below the visible pixels, assemble the answer from the two layers.

---

## Keep Going

**Reference:** ExifTool — https://exiftool.org/ — the universal metadata reader. Bookmark it; you will use it.

**What unlocks next:** Phase 2 Forensics modules dive deeper into file-level investigation — recovering deleted files, parsing packet captures, breaking apart malware samples. The picture-investigation skills you've started here scale up directly.

The next time you take a photo, you'll know there's a notebook tucked invisibly behind it. The next time you post one, you'll know what's in that notebook before the strangers do. Use the skills on your own files, on public CTF datasets, on the demonstration challenge below — never on someone who didn't agree to be looked at. That's the whole job.

---

*Prerequisites: F05 — Number Systems, F06 — Thinking in Hex, F07 — What's in a File?, F08 — ASCII All the Way Down*
