---
title: "Wrapped in Wrappers"
tagline: "Base64 inside hex inside URL-encoding — peel the onion."
time: "~30 min reading + ~30 min challenge"
tier: "Data & Encoding"
---
## The String That Looks Like Nothing

Here is a real CTF puzzle. Someone posts this in a channel and says *"there's a flag in here":*

```
JTRDJTYxJTcwJTc0JTc1JTcyJTY1JTVm
```

That's it. No instructions. No file. No alphabet to map. Just thirty-two characters of jibber-jabber and a smug emoji.

The first instinct is to stare at it. Then to count characters. Then to wonder if it's an MD5 hash, or maybe random gibberish someone copy-pasted by accident. Then to give up.

What that string actually is, though, is a *parcel*. Someone took a short readable phrase, wrapped it in URL-encoding, then wrapped that in Base64, and posted the package. To get to the readable phrase, you have to unwrap it — and you have to unwrap it in the right order. Two layers, exactly. Once you know that, the puzzle dissolves in about ten seconds.

This lesson is about the unwrapping. After it you'll meet **URL-encoding** (the most common encoding in the entire internet, which the curriculum has never shown you), refresh **Base64** and **hex**, meet **HTML entities**, and — most importantly — learn to *recognize* an encoding by its alphabet and *order* a chain of decoders so each output flows into the next input.

The skill is meta. The encodings are tools. The order matters.

---

## The Onion

Forget code for a second. You've ordered a fragile glass thing online. The package shows up at the door. You open it like this:

1. Cut the tape on the cardboard box. Pull it open.
2. Inside is a layer of bubble wrap. Unwrap it.
3. Inside the bubble wrap is a paper sleeve. Slide the thing out.
4. Now you have the glass thing.

Three layers. Bubble wrap, sleeve, cardboard. Notice the order: the *last* layer the warehouse worker added was the cardboard outer box. So the *first* layer **you** have to remove is the cardboard. The first thing they wrapped — the paper sleeve, snug against the glass — is the last thing you peel.

This is the rule for every wrapped payload, ever:

> **Wrap order is forward. Unwrap order is backward.**
>
> The last layer applied is the first layer you remove.

Programmers say "outside in" — peel the outermost layer, then the next, then the next, until you hit plaintext. If you try to peel from the *inside* (which is impossible — you can't get to the inside without going through the outside first), the decoder produces gibberish, and you correctly conclude you've started in the wrong place.

The whole game in this lesson is: *what's the outer wrap, and what's underneath it?*

---

## URL-Encoding — The Sneaky One

URL-encoding is the encoding you see every single day and have probably never noticed.

Here's why it exists. A URL has structure. The `?` separates the path from the query. The `&` separates one query parameter from the next. The `/` separates folders. The `#` marks a fragment. Spaces aren't allowed at all.

So what happens if you want to *put* a space, or an `&`, or a `?`, into a URL — say, in a search query? You can't put it raw, because the browser will misread it as the structural punctuation. The URL would break.

The trick: replace each problem character with a `%` followed by two hex digits that spell out its byte value.

- A space is byte `0x20`. URL-encoded: `%20`.
- A `?` is byte `0x3F`. URL-encoded: `%3F`.
- An `&` is byte `0x26`. URL-encoded: `%26`.

So the search "Where's Wally?" becomes the URL fragment `Where%27s%20Wally%3F`. The browser sees `%27`, knows it means "the byte `0x27`, which is `'`," and treats it as a *literal apostrophe*, not as the start of a string. Crisis averted.

The rule is simple:

> **One byte → one `%xx` triplet,** where `xx` is the byte's value in hex.

Recognition is even simpler. **If a string has `%xx` triplets in it, it is almost certainly URL-encoded.** Nothing else uses `%xx` triplets the same way. You see `%48%69` and your brain should say "URL." Decode it: `0x48` is the ASCII code for `H`, `0x69` is `i`, the answer is `Hi`.

Here's a worked example:

> `Hello, World!` byte by byte:
>
> | Char | ASCII (hex) | Needs encoding? | URL-encoded |
> |---|---|---|---|
> | H, e, l, l, o | normal letters | no | `Hello` |
> | `,` | `0x2C` | yes (sometimes special) | `%2C` |
> | (space) | `0x20` | yes | `%20` |
> | W, o, r, l, d | normal letters | no | `World` |
> | `!` | `0x21` | yes (sometimes special) | `%21` |
>
> Result: `Hello%2C%20World%21`

Letters and digits are usually *not* encoded — they're "safe" — so URL-encoded text often still looks half-readable. That's the giveaway. A string of mostly normal letters with a sprinkling of `%xx` is URL-encoded.

> **Try It (30 seconds):** Decode `%48%69%21` by hand. (You don't need a computer. `0x48` is `H`. `0x69` is `i`. `0x21` is `!`.) What three characters do you get?
>
> *Answer at the bottom of the lesson.*

---

## HTML Entities — The Same Idea, Different Costume

Now here's a string that *looks* almost like URL-encoding but isn't:

```
&#x48;&#x69;&#x21;
```

Notice the differences. Starts with `&` (not `%`). Ends with `;` (URL-encoding has no trailing punctuation). Letters between aren't pure two-digit hex — there's an `#x` prefix.

This is an **HTML entity**. The motive is identical to URL-encoding — some characters have special meaning in the surrounding context, so we replace them with a code that's unambiguous — but the surrounding context is HTML, not URLs, and the syntax is different.

You'll see HTML entities in two flavours:

- **Named:** `&amp;` (the `&` character), `&lt;` (the `<` character), `&gt;` (`>`), `&quot;` (`"`), `&apos;` (`'`).
- **Numeric:** `&#65;` is decimal for `A` (byte `65`); `&#x41;` is hex for the same `A`. Both decode to the same character.

Recognition rule: starts with `&`, ends with `;`. If you see a string with patterns like `&...;` repeating, it's HTML entities. Decode each entity to its character; concatenate.

`&#x48;&#x69;&#x21;` → `Hi!`. Same plaintext as the URL example, different costume.

In a real CTF you'll see HTML entities mostly in the output of a server that escaped data before rendering it. They're less common than URL-encoding, but they do show up — especially in payloads pulled out of HTML pages.

---

## Recognition by Alphabet and Shape

Here is the most important table in this lesson. Print it out. Tape it to your wall. When you see a wrapped payload, run your eye across this:

| Encoding | Alphabet | Shape clue |
|---|---|---|
| **URL-encoding** | digits + `%` + a-fA-F + the original safe chars | `%xx` triplets sprinkled through readable text |
| **Base64** | A-Z, a-z, 0-9, `+`, `/`, with `=` padding | usually long, length divisible by 4, often ends in `=` or `==` |
| **Hex** | 0-9 + a-fA-F only | length divisible by 2, no other chars at all, no spaces (or grouped pairs with spaces) |
| **ROT13** | English letters | reads as garbled English; same letter frequency as plain English |
| **HTML entity** | starts with `&`, ends with `;` | `&...;` patterns |

Two pairs are easily confused. Watch for these:

- **Base64 vs hex.** Both are usually long strings of alphanumerics. The tells: hex has *only* `0-9a-fA-F` (no `g` through `z`, no `+` or `/`, no `=`), while Base64 reaches uppercase, has `+` and `/`, and often ends with `=` padding. If you see a `Z` or a `+` or a `=`, it's Base64, not hex.
- **URL-encoding vs HTML entities.** Both use a marker character + a numeric code. URL-encoding's marker is `%` and the codes are exactly two hex digits. HTML entities use `&...;` and may be named (`&amp;`) or numeric (`&#65;`, `&#x41;`).

Recognizing the encoding is half the battle. The other half is order.

---

## Chain Order — Outside In

Back to the puzzle from the start of the lesson:

```
JTRDJTYxJTcwJTc0JTc1JTcyJTY1JTVm
```

Step one: *what's the outer wrap?* Run your eye across the recognition table.

- `%xx` triplets? No. Not URL-encoded.
- `&...;` patterns? No. Not HTML entity.
- Pure 0-9a-fA-F? No — there's a `J` and a `T`. Not hex.
- A-Z, a-z, 0-9, length 32 (divisible by 4)? **Yes.** And no `+`, `/`, or `=` either, but the alphabet matches Base64. Confidence: high.

Decode it as Base64. (Use the F08 trick — or any decoder.) The result is:

```
%4C%61%70%74%75%72%65%5f
```

Now run the recognition table on *this* string.

- `%xx` triplets, repeating, in a row? **Yes.** URL-encoded, confidence very high.

Decode the URL layer:

```
0x4C = 'L'   0x61 = 'a'   0x70 = 'p'   0x74 = 't'
0x75 = 'u'   0x72 = 'r'   0x65 = 'e'   0x5F = '_'
```

Result: `Lapture_`. Two layers, peeled outside in. The original sender wrapped a readable phrase first in URL-encoding, then in Base64. To unwrap, you started with Base64 (the outer wrap, the last to be applied) and finished with URL-decode (the inner wrap, the first to be applied). The order matters: if you'd tried to URL-decode the Base64 string directly, you'd get gibberish, because there are no `%xx` triplets in `JTRDJTYx...` for URL-decode to act on.

> **Try It (60 seconds):** Decode `Y2QlMmNm` by hand using the chain rule.
>
> 1. Run the recognition table. (Alphabet? Length divisible by 4? Any `=` padding?)
> 2. Decode the outer layer.
> 3. Run the table again on the result.
> 4. Decode the inner layer.
> 5. Stop when the result is plain readable text.
>
> *Answer at the bottom of the lesson.*

---

## Why This Matters For CTFs

Every web challenge in every CTF is a URL-encoding gauntlet. The flag in your browser bar is `FLAG%7Btest%7D`. The cookie set by the server is `session=eyJ1c2VyIjoiYWRhIn0%3D` (Base64 of JSON, then URL-encoded for the cookie). The XSS payload that wins the challenge is `<script>alert(1)</script>` — first HTML-entity-escaped by the broken filter, then URL-encoded by the browser, then your job is to peel both layers and prove the alert fired.

Forensics challenges hide payloads inside packet captures and log files, often Base64-wrapped twice (because the attacker did Base64, then the logging system did Base64 again). Crypto challenges almost always start with "here's a string" and the first hour is just figuring out which encoding it is.

The reason CyberChef, the famous web-based encoding tool, exists at all is *because* chained encodings are everywhere. CyberChef's interface is a stack of decoder blocks you arrange in order — exactly the model in this lesson's challenge. Once you've solved the F17 pipeline puzzle six times, you'll find yourself doing CyberChef's job in your head. That's the goal.

Two future lessons build on this:

- **F18 (Vigenère cipher)** layers a real classical cipher on top of these encodings — the kind of "the flag is hidden behind a Caesar shift inside a Base64 inside a URL-encode" three-layer combo that's the entire genre of intro Crypto challenges.
- **F19 (file skeletons)** zooms in on file *structure* — magic bytes, section tables, how to look at a binary and know which bytes are the format and which are the payload. Some of those payloads will be encoded. Your F17 muscle is what'll handle them.

---

## Your Challenge

Open `challenge/index.html` in your browser. You'll see a decoder pipeline simulator with six puzzles, each one wrapped a little deeper than the last. Pipeline 1 is unlocked at the start; the rest unlock as you solve.

For each puzzle:

1. *Recognize* the outer wrap by alphabet and shape.
2. *Pick* the right decoder block from the four available (URL-decode, Base64-decode, hex-decode, HTML-entity-decode).
3. *Run* the chain and see what falls out.
4. If you got plaintext, the puzzle marks complete. If you got more gibberish, recognize *that* and add another decoder block to the chain.

Each pipeline reveals one piece of the final flag. Six pipelines, six pieces. Concatenate the pieces in order, wrap in `FLAG{...}`, submit.

The challenge runs entirely in your browser from a `file://` URL — nothing to install, nothing to download.

---

## Concept Cards

The recognition table and the chain rule are also on a card you can pull up later: see `concept-cards.md`. The Common Mistakes list there is worth a read *before* you start the challenge — it covers the four ways every kid trips on their first attempt.

---

## Keep Going

After F17 you've met four of the five most common encodings in CTF land. The fifth — Vigenère, a real cipher with a *key* — is F18.

When you can look at a 200-character payload and break it into layers in your head before you've finished reading it, you've graduated from "this looks like garbage" to "I know exactly what this is." That graduation happens somewhere around the third pipeline.

---

## Try-It Answers

- **First Try-It** (`%48%69%21`): `Hi!` — three URL-decoded bytes, three ASCII characters.
- **Second Try-It** (`Y2QlMmNm`): the outer wrap is Base64 (alphabet is `[A-Za-z0-9]`, length is 8, divisible by 4). Base64-decoding gives `cd%2cf`. The recognition table now says URL-encoding (one `%xx` triplet present). URL-decoding gives `cd,f` — a comma between two short strings. Two layers, peeled outside in.

---

[← F16 — The Terminal Is Just A Text Box](../F16-terminal-is-just-a-text-box/README.md) | [Foundation Track](../README.md) | [Concept Cards →](concept-cards.md)
