# Hint 2 — Tactical hints (per pipeline)

Each section tells you which decoders to try, in what order. You'll still have to **run** the chain in the challenge to discover what the sub-flag piece is — these hints don't reveal the plaintext.

Try each pipeline solo before reading its hint. The point of the lesson is the recognition skill — not the answer key.

---

## Pipeline 1

The encoded payload starts with `%`. There are six `%xx` triplets.

**Chain:** `URL-decode` (one layer).

---

## Pipeline 2

`b25lX2xheWVy` — twelve characters of mixed case. No `%`. No `&...;`. Length 12, divisible by 4. The alphabet matches Base64.

**Chain:** `Base64-decode` (one layer).

(Yes, the underscore-looking character you see in the *output* is real — it's part of the sub-flag piece, not a separator.)

---

## Pipeline 3

`61745f615f74696d65` — eighteen characters. Run your eye across them: every character is in the range `0-9` or `a-f`. No uppercase. No `%`. No `&`. Length is even.

**Chain:** `Hex-decode` (one layer).

---

## Pipeline 4

The payload is full of `&#x` markers ending with `;`. That's the HTML-entity recognition pattern.

**Chain:** `HTML-entity-decode` (one layer).

(There's no `%` in the input, so URL-decode wouldn't do anything here — the `&...;` shape is the giveaway.)

---

## Pipeline 5

`JTY2JTY5JTcyJTczJTc0JTVmJTYyJTM2JTM0` — long, mixed case, no `%`, no `&`, no `=` padding but length 36 (divisible by 4). Looks Base64.

Decode that first. **Then look at the output.** What's its alphabet?

The output will be loaded with `%xx` triplets — that's URL-encoding. So the second decoder is URL-decode.

**Chain:** `Base64-decode` → `URL-decode` (two layers).

---

## Pipeline 6

The longest payload. Look at it carefully: every character is `0-9` or `a-f`. No `J` (which would mean Base64). No uppercase. No `%`. Length is even and large.

**That alphabet is hex.** Hex-decode it first.

The hex output will be longer than you expect — and it'll look like Base64 (mixed case, the right alphabet). Base64-decode that.

The Base64 output will have `%xx` triplets all the way through. URL-decode it.

**Chain:** `Hex-decode` → `Base64-decode` → `URL-decode` (three layers).

---

## Final flag

Once all six pipelines are solved, the discovery panel reads `6 of 6 found` and the flag input unlocks. Concatenate the six revealed pieces in pipeline order (1, 2, 3, 4, 5, 6) with underscores between them, wrap in `FLAG{...}`, paste, submit.

If the shape is right but the contents wrong, you may have concatenated in the wrong order — the panel shows the pieces in the same order as the pipelines.
