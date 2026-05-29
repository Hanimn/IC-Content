# Concept Cards — F17: Wrapped in Wrappers

Quick reference for the five encodings, the chain rule, and the four ways every kid trips on their first attempt. Flip back here any time during the challenge.

---

## The Five Encodings — Recognition Cheat Sheet

| Encoding | Alphabet | Shape clue | Worked example |
|---|---|---|---|
| **URL-encoding** | digits, `%`, a-fA-F, plus the original safe chars | `%xx` triplets sprinkled through readable text | `Hello%2C%20World%21` → `Hello, World!` |
| **Base64** | A-Z, a-z, 0-9, `+`, `/`, with `=` padding | usually long; length divisible by 4; often ends in `=` or `==` | `SGVsbG8h` → `Hello!` |
| **Hex** | 0-9 + a-fA-F only | length divisible by 2; no other chars; lowercase or grouped pairs | `48656c6c6f` → `Hello` |
| **ROT13** | English letters | reads as garbled English; same letter frequency as plain English | `Uryyb!` → `Hello!` |
| **HTML entity** | starts with `&`, ends with `;` | `&...;` patterns repeating | `&#x48;&#x69;` → `Hi` |

---

## Quick Recognition Flow

When you meet a wrapped string, ask in this order:

1. Does it have `%xx` triplets? → **URL-encoded.**
2. Does it have `&...;` patterns? → **HTML entity.**
3. Does it have *only* `0-9a-fA-F`, length divisible by 2? → **Hex.**
4. Does it have `=` padding, or `+`/`/`, or uppercase + lowercase mixed, length divisible by 4? → **Base64.**
5. Does it look like garbled English with no special chars? → **ROT13.**
6. None of the above? → Either it's a layer deeper than you can see (decode the outer wrap and try again), or it's not encoded at all.

---

## The Chain Rule

> **Wrap order is forward. Unwrap order is backward.**
>
> The last layer applied is the first layer you remove.

You always peel **outside in**. The outermost layer is whatever the recognition table tells you the surface looks like. Decode that. Then run recognition again on the result. Repeat until you hit plaintext.

If your decoder spits out gibberish, you're probably trying to decode in the wrong order — or with the wrong decoder for that layer.

---

## Three Worked Chains

**One layer (URL only):**

```
%66%6c%61%67    →  URL-decode  →  flag
```

**Two layers (Base64 wrapping URL):**

```
JTQ4JWk=     →  Base64-decode  →  %48%i (close — actually %48%69)
%48%69       →  URL-decode     →  Hi
```

**Three layers (Base64 wrapping hex wrapping URL):**

```
NDg2NTZjNmM2Zg==              →  Base64-decode  →  48656c6c6f
48656c6c6f                    →  hex-decode     →  Hello
Hello                         →  plaintext, stop
```

(Notice that "stop when it's plaintext" is the rule — there's no fixed depth. Some payloads are one layer; some are five.)

---

## Common Mistakes

These are the four ways every kid trips on their first attempt. Read these before starting the challenge.

1. **Confusing URL-decode and HTML-entity-decode.** Both have a "marker char + numeric code" shape. URL uses `%xx` (exactly two hex digits, no separator). HTML entities use `&...;` (variable length, ends with semicolon). If you URL-decode `&#x48;&#x69;` you get back `&#x48;&#x69;` (no `%` for it to grab) — looks like the decoder did nothing, which is the clue you picked the wrong tool.

2. **Forgetting that hex bytes pair up.** `%4` is incomplete; you need `%48`. `48656c6c6` is incomplete; you need `48656c6c6f`. If your input has an odd number of hex digits, something got chopped off.

3. **Trying to Base64-decode something that's actually hex** (or vice versa). Both alphabets are subsets of `[A-Za-z0-9]`. The tells: hex has *only* `0-9a-f` (no `g`-`z`, no `+`/`/`, no `=`); Base64 reaches uppercase, includes `+` and `/`, and often ends with `=` padding. If you see a `Z`, a `+`, or an `=`, it's Base64 — not hex.

4. **Decoding in the wrong order — inside-out instead of outside-in.** A payload encoded as `Base64( URL-encode( plaintext ) )` will only decode if you apply Base64-decode *first*, then URL-decode. If you try URL-decode first on the Base64 string, the `%xx` triplets aren't there yet, so URL-decode finds nothing to do and returns the input unchanged. If your decoder seems to have done nothing, the decoder isn't broken — you picked the wrong decoder for that layer.

5. **Trying to URL-decode something that's already plaintext.** If a string has no `%` characters in it at all, URL-decoding will return it unchanged. The `%` should be the clue: no `%`, no need to URL-decode. (The same applies to the other decoders — each has a signature, and the signature has to be present.)

6. **Double-encoded surprise.** Sometimes a URL is URL-encoded *twice* (once by the user's browser, once by the form on the server). You'll see `%2520` (which decodes to `%20`, which decodes to ` `). If you decode and your output *still* has `%xx` triplets, you've found a doubly-encoded layer. Decode again.

---

## The Four Decoder Blocks (challenge interface)

The challenge gives you exactly four decoder blocks. They are:

| Block | What it does | When to use |
|---|---|---|
| **URL-decode** | Replaces every `%xx` with the byte `0xXX` | When the input has `%xx` triplets |
| **Base64-decode** | Reads 4 chars at a time, decodes to 3 bytes | When alphabet is `[A-Za-z0-9+/=]` and length is divisible by 4 |
| **Hex-decode** | Reads 2 chars at a time, decodes to 1 byte | When alphabet is `[0-9a-fA-F]` only and length is divisible by 2 |
| **HTML-entity-decode** | Replaces `&#x48;`, `&#65;`, `&amp;`, etc. with their characters | When input has `&...;` patterns |

ROT13 is *not* a decoder block in this challenge — it's mentioned in the lesson because you should be able to recognize it, but the challenge focuses on the four primary encodings.

---

## When You're Stuck

- **Re-read the encoded string out loud, character by character.** What's the alphabet? Any `%`? Any `&`? Any `=`? Any uppercase letters?
- **Try the most likely decoder first.** If the alphabet is hex-only, try hex-decode first. If there's `=` padding, try Base64.
- **If the decoder produces gibberish, undo and pick a different one.** Don't keep stacking decoders on top of a wrong first decode — start over.
- **A wrong chain order produces gibberish; a right chain order produces plaintext.** When you see plaintext, stop.

---

[← Lesson](lesson.md) | [Challenge →](challenge/index.html) | [Foundation Track](../README.md)
