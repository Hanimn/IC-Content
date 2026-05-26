# Solution: F11 — From Code to Computer

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

The challenge simulates running the Unix `strings` tool on a compiled binary called `orion`. The full file is shown as a 584-byte hex dump. Most bytes are non-printable noise (representing machine instructions and pointer values). Scattered through the noise are runs of consecutive printable ASCII bytes — exactly what `strings` looks for. One of those runs is the flag.

Your job is to filter out the noise until the real strings stand out, then read the one that looks like a flag.

---

## Step-by-Step Solution

**Step 1: Look at the dump with default settings**

Open `index.html`. You see a hex dump and a filter panel. The min-length is set to 4. Scroll the **Extracted Strings** panel — you'll see ~10 entries. Some are obvious strings (welcome message, usage text). Some are short fragments (`init`, `DEBUG`, `v1.0`) that look like compiled-in identifiers but might be coincidence. The flag is in the list, but it's not the only thing.

*You see: 10 strings. Skimming, one of them starts with `FLAG{`.*

**Step 2: Raise the minimum length**

Click the `6` button under **Min length**. The short fragments disappear. Now you have around 7 strings — all clearly intentional, all multi-word or URL-shaped. Click `8`. The `__main` entry drops out (it's only 6 chars long). You're left with 6 substantial strings:

- `Welcome to OrionScan v1.0`
- `Usage: orion [options]`
- `FLAG{strings_survive_compilation}`
- `ERROR: file not found`
- `https://debug.orion.local/api`
- `(c) 2024 Orion Systems`

That's the kind of list you'd see if you ran `strings -n 8 ./orion` on a real binary. One of them is obviously the flag.

*You see: 6 strings. The third one is `FLAG{strings_survive_compilation}`.*

**Step 3: Confirm by looking at the hex dump**

Scroll the hex dump to offset `0x000000E0`. Look at the bytes:

```
000000E0  46 4C 41 47 7B 73 74 72  69 6E 67 73 5F 73 75 72  FLAG{strings_sur
000000F0  76 69 76 65 5F 63 6F 6D  70 69 6C 61 74 69 6F 6E  vive_compilation
00000100  7D 00 ...                                          }.
```

The ASCII column on the right reads `FLAG{strings_survive_compilation}`. The `46 4C 41 47 7B` opening sequence — `F L A G {` — is the giveaway you trained your eye on in F06. The `7D` (`}`) at the start of row `0x100` closes the flag.

*Optional: turn on the highlight toggle. The flag bytes glow pale blue against the dimmed noise.*

**Step 4: Submit the flag**

Type `FLAG{strings_survive_compilation}` into the **Submit Flag** input and press Enter (or click Submit).

*You see: green confirmation banner, the flag displayed in a glowing box, and a "Continue to F12" link.*

---

## The Flag

```
FLAG{strings_survive_compilation}
```

---

## Why This Works

**Compilation does not erase text.** When the C compiler builds a binary from source code, it has to put any text the program needs to display, log, or compare *somewhere*. The standard answer is: in a read-only data section, stored as raw ASCII bytes. The instructions reference those bytes by address whenever they need to use them.

**`strings` is a shockingly simple tool.** Its entire algorithm is: walk the file byte by byte, find runs of consecutive printable ASCII (`0x20`–`0x7E`) of at least N bytes, print them. The default N is 4 because shorter runs occur by chance in random binary data — the Birthday Problem on a small alphabet.

**The minimum-length filter is the key knob.** At N=4, you see real strings and a lot of noise. At N=6 or N=8, the noise drops out (since random byte sequences hitting 6+ consecutive printable bytes is rare), but real intentional strings — error messages, URLs, copyright lines — almost always survive because they're long. Bumping the threshold is the standard CTF technique.

---

## What `strings` Would Look Like For Real

If `orion` were a real binary on a Linux machine, you'd run:

```
$ strings -n 6 ./orion
Welcome to OrionScan v1.0
Usage: orion [options]
FLAG{strings_survive_compilation}
__main
ERROR: file not found
https://debug.orion.local/api
(c) 2024 Orion Systems
```

That's it. One command, and the flag is on screen. This challenge gave you the by-hand version of that command so you understand what it's doing under the hood.

---

## The Defender's Perspective

If you're shipping a binary and you don't want strings to leak, you can:

- **Encrypt or obfuscate** sensitive strings — store them as XOR'd or base64-encoded bytes, decode at runtime. Some malware does this to evade `strings`-based detection.
- **Avoid embedding secrets in the binary at all** — read them from a config file, an environment variable, or a server. (Hardcoded secrets are a top reason CTF flags get leaked.)
- **Strip debug strings** — release builds often have debug symbols and verbose logging removed.

But for a normal program, none of this is worth doing. The error message has to be in some readable form to actually display. Real software ships with strings intact, every day, all over the world.

---

## Write Your Own Writeup

Good CTF players document their solutions. Here's a template — fill it in:

---

**Challenge:** F11 — From Code to Computer
**Category:** Reverse Engineering / Foundation
**Difficulty:** Intermediate
**Tools used:** Browser, in-page strings filter

**Approach:**
[How did you approach this? Did you raise min-length, use the highlight toggle, eyeball the ASCII column?]

**Steps:**
1. [What you tried first]
2. [How you narrowed down to the flag]
3. [How you confirmed it]

**Flag:** `FLAG{strings_survive_compilation}`

**What I learned:**
[Why are strings still readable in a compiled binary? Why is `strings` always the first move on an unknown executable?]

---

## Reflection Questions

1. The default min-length for `strings` is 4. If a program had a 3-character string you wanted to find, what could you do? What's the trade-off?

2. The flag in this challenge is `FLAG{strings_survive_compilation}`. If you were the developer of `orion` and wanted to hide that string from a casual `strings` scan, what's one technique you could use? (Hint: think back to F10 — XOR.)

3. Real Linux binaries contain hundreds of strings — function names from libc, error messages, locale data. Most of those aren't a flag. How would you triage a `strings` output of, say, 5,000 lines to find the interesting ones?

---

*Great work. On to the next one.*

[Back to Module](../README.md) | [F12 — The Computer's Notebook →](../../F12-the-computers-notebook/README.md)
