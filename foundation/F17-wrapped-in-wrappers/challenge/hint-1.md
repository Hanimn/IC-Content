# Hint 1 — Meta-strategy nudges

> **Try the puzzles before reading this.** Hints get more specific further down.

---

## If you don't know where to start

You're meant to read the **encoded payload** for each pipeline and ask yourself one question: *what's the alphabet?* That alone narrows it to one of four decoders.

- Lots of `%xx` triplets? → URL-decode.
- Plain letters and digits, length divisible by 4, maybe ends in `=`? → Base64-decode.
- Only `0-9` and `a-f`, length even? → Hex-decode.
- `&...;` patterns? → HTML-entity-decode.

Pick the decoder that matches the alphabet. Click it. Click "Run chain." Read the output.

If the output is plain readable text — congratulations, that pipeline was one layer.

If the output is *more* wrapped data — recognise it again, add another decoder block to the chain, click Run again. The chain applies in order from top to bottom, so each new decoder is applied to the previous output.

---

## If a decoder gives you gibberish or "couldn't make sense of the input"

You picked the wrong decoder for that layer. Click the `×` on the decoder block in the chain to remove it, then add a different one.

There are only four decoders. If the first three you try don't work, the fourth is the answer.

---

## If you keep stacking decoders and the output gets weirder

You probably nailed the first decoder and got fooled on the second. Click "Reset chain" and start fresh. Pay closer attention to what the *first* decoder's output looks like — that's the new alphabet you have to recognise.

---

## How many layers should I expect?

The puzzles get harder as you go: roughly 1, 1, 1, 1, 2, 3 layers. Pipeline 6 has the deepest nesting; if you've solved 1–5 already, you have all the muscle you need for it.

---

If you're still stuck after the meta-nudges above, see `hint-2.md` for tactical hints (which decoders to try, what order).
