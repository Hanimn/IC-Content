# Solution — F17 Wrapped in Wrappers

Spoiler-heavy. Read this only after you have solved the puzzle, or have genuinely given up.

---

## Pipeline 1

Recognition: six `%xx` triplets only. URL-encoding.

Chain: `URL-decode`.

Decoded byte by byte: 0x75=u, 0x6e=n, 0x77=w, 0x72=r, 0x61=a, 0x70=p.

Sub-flag piece: `unwrap`

---

## Pipeline 2

Recognition: mixed-case letters and digits, no markers, length 12 (divisible by 4). Base64.

Chain: `Base64-decode`.

Output: `one_layer` (the underscore is part of the plaintext, not a Base64 alphabet character).

Sub-flag piece: `one_layer`

---

## Pipeline 3

Recognition: alphabet is exactly 0-9 and a-f, length 18 (even), no other characters. Hex.

Chain: `Hex-decode`.

Decoded byte by byte: 61=a, 74=t, 5f=_, 61=a, 5f=_, 74=t, 69=i, 6d=m, 65=e.

Sub-flag piece: `at_a_time`

---

## Pipeline 4

Recognition: every fragment is the shape `&#xNN;` — HTML hex numeric entity.

Chain: `HTML-entity-decode`.

Decoded byte by byte: 6D=m, 65=e, 65=e, 74=t, 5F=_, 65=e, 6E=n, 74=t, 69=i, 74=t, 79=y.

Sub-flag piece: `meet_entity`

---

## Pipeline 5

Recognition (outer): mixed case, no markers, length 36 (divisible by 4), alphabet matches Base64.

Step 1: `Base64-decode` produces a string full of `%xx` triplets.

Recognition (inner): nine `%xx` triplets. URL-encoding.

Step 2: `URL-decode` produces plaintext.

Full chain: `Base64-decode` then `URL-decode`.

Sub-flag piece: `first_b64`

---

## Pipeline 6

Recognition (outermost): alphabet is 0-9 and a-f only, length is even and large. Hex.

Step 1: `Hex-decode` produces a long mixed-case alphanumeric string that looks Base64.

Step 2: `Base64-decode` produces a string full of `%xx` triplets.

Step 3: `URL-decode` produces plaintext.

Full chain: `Hex-decode` then `Base64-decode` then `URL-decode`.

Sub-flag piece: `always_peel_outside`

---

## Final flag

Concatenate the six sub-flag pieces in pipeline order, separated by underscores, wrapped in `FLAG{...}`:

`FLAG{unwrap_one_layer_at_a_time_meet_entity_first_b64_always_peel_outside}`

---

## Why these particular layers?

The puzzle progression is deliberate.

- Pipelines 1–4 each isolate ONE encoding so you can practice recognition without confusion.
- Pipeline 5 introduces the chain rule with two layers.
- Pipeline 6 combines all three single-layer encodings into a stack — the same shape as a real-world CTF payload from a forensics challenge.

The four sub-flag pieces from the single-layer puzzles spell `unwrap_one_layer_at_a_time_meet_entity` — itself a memorable mnemonic for the chain rule. Pipelines 5 and 6 add `first_b64` and `always_peel_outside`, which reinforce the lesson's "Base64 is often the outer wrap" and "peel outside in" takeaways.
