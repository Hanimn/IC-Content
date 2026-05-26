# Concept Cards — F15: The Picture That Knew Too Much

Quick reference for the key terms and ideas in this module.

---

## Key Terms

| Term | Definition |
|---|---|
| **Metadata** | "Data about data." Notes embedded in a file describing the file itself — author, software, timestamp, GPS, settings. |
| **EXIF** | Exchangeable Image File Format. The standard metadata block embedded in JPEG and TIFF photos by phones and cameras. |
| **GPS Tagging** | The practice of writing location coordinates into a photo's EXIF block when location services are on. |
| **EXIF Stripping** | Removing the EXIF block before publishing an image to prevent location and device leaks. |
| **Steganography** | "Covered writing" — hiding a message inside other content so the existence of the message is itself secret. |
| **LSB Steganography** | Hiding bits of a message in the **least-significant bit** of each pixel's colour channel. The image looks identical; the lowest bits carry the payload. |
| **Pixel** | A single dot in a digital image. Holds three numbers — Red, Green, Blue — each in the range 0–255 (8 bits each). |
| **Channel** | One of the colour components (R, G, or B) of a pixel. |
| **Bit Plane** | All the bits at one position across an entire image. The "bit-0 plane" is the lowest bit of every channel of every pixel — where LSB stego lives. |
| **Polyglot File** | A file that is simultaneously valid in two formats (e.g. a valid PNG that is also a valid ZIP archive). |

---

## EXIF Fields You'll See in CTF

```
Camera         : iPhone 13 Pro
Lens           : 26 mm f/1.5
ISO            : 100
Shutter        : 1/250 s
Aperture       : f/1.5
Date Taken     : 2024-08-15 14:23:11
GPS Latitude   : 37.7749 N
GPS Longitude  : 122.4194 W
Software       : iOS 17.4
Comment        : (often where flags hide)
Description    : (also a frequent flag location)
Author         : (CTF authors love to slip clues here)
```

The `Comment`, `Description`, and `Author` fields are the most common places for CTF authors to plant clues or full flags. Always check them first.

---

## The LSB Encode / Decode Loop

```
ENCODE (writer):
  for each bit b of the message:
    take next pixel channel value v
    new_v = (v AND 11111110) OR b      # clear the last bit, set it to b
    write new_v back into the pixel

DECODE (reader):
  bits = []
  for each pixel channel value v in scan order:
    bits.append(v AND 1)                # mask off everything but the last bit
  group bits into bytes (8 at a time)
  decode bytes as ASCII
```

In JavaScript, reading the canvas pixels looks like this:

```javascript
const data = ctx.getImageData(0, 0, w, h).data;
// data is [R, G, B, A, R, G, B, A, ...]
let bits = [];
for (let i = 0; i < data.length; i += 4) {
  bits.push(data[i] & 1);     // R-channel LSB only
}
// then group into bytes and decode
```

---

## The CTF Forensics Checklist for an Unknown Image

When a CTF gives you an image, run through this list in order:

```
1.  exiftool image.png              # read all metadata fields
2.  file image.png                  # confirm magic bytes (F07)
3.  xxd image.png | less            # inspect raw bytes, look for surprises
4.  strings -n 8 image.png          # any printable runs of 8+ characters
5.  binwalk image.png               # extract appended/embedded files
6.  zsteg image.png                 # automatic LSB scanner (PNG/BMP)
7.  steghide extract -sf image.jpg  # JPEG-specific payload extractor
8.  stegsolve image.png             # interactive bit-plane viewer
```

Three out of four CTF image challenges are solved by step 1, 5, or 6.

---

## Common Mistakes

- **Trusting that "the photo is just a photo."** Every JPEG from a phone embeds device, software, and frequently GPS data. Treat every image as a small information leak.

- **Confusing metadata with steganography.** Metadata is *next to* the picture (a separate block in the file). Steganography is *inside* the picture (woven into the pixel values). Different problems, different tools.

- **Looking at LSB on a JPEG.** JPEG is a *lossy* format — its compression actively destroys low-order bit information. LSB stego therefore lives almost exclusively in **PNG, BMP, and other lossless formats**. If the file is a JPEG, run `steghide` instead, or look for data appended after the `FF D9` end marker.

- **Forgetting the alpha channel exists.** Many PNGs have an A (alpha) channel making 4 channels per pixel. Some stego tools embed in alpha as well. When reading `getImageData`, remember the array layout is `[R, G, B, A, R, G, B, A, ...]`.

- **Reading bits in the wrong order.** The two common conventions are MSB-first (bit 7 is the first bit of the byte) and LSB-first (bit 0 is the first bit of the byte). Most CTF challenges use MSB-first within each byte. If your decoded bytes look like garbage, try reversing each group of 8.

---

## Numbers to Know

| Value | What It Means |
|---|---|
| `8 bits` | One channel of a pixel (R, G, or B), range 0–255 |
| `24 bits` | One pixel (R + G + B) |
| `3 bits` | Hidden capacity per pixel using full LSB-on-all-channels |
| `1 bit` | Hidden capacity per pixel using R-channel-only LSB (this challenge) |
| `100 × 100 = 30,000 bits = 3,750 bytes` | Capacity of a 100×100 image with 3-channel LSB |
| `FF D9` | JPEG end-of-image marker. Anything appended after it is suspicious. |
| `89 50 4E 47` | PNG magic bytes (F07). Confirm before LSB extraction. |

---

## Tools to Bookmark

| Tool | What it does |
|---|---|
| **ExifTool** (https://exiftool.org/) | Universal metadata reader for 100+ formats |
| **zsteg** (https://github.com/zed-0xff/zsteg) | Automatic LSB stego scanner for PNG/BMP |
| **steghide** | JPEG-focused stego extractor; supports passwords |
| **Stegsolve** | Interactive bit-plane viewer; click through 0–7 on each channel |
| **binwalk** | Finds embedded files and signatures inside other files |
| **CyberChef** | Browser swiss-army knife for encoding/decoding |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
