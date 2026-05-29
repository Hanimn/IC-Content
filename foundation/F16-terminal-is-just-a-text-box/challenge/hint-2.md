# Hint 2 — F16

(Try Hint 1 first. This one is more direct.)

---

## Pip 1 — readable text inside a binary

Several files on the USB look like binaries (they show as `data` or `ELF executable` when you run `file` on them). One of them has an embedded ASCII string with `FLAG_PIECE_A:` followed by a word.

Run `strings` on each binary you find. The lesson talked about how `strings` walks the bytes and prints any printable runs of length ≥ 4. Try:

```
strings mystery.bin
```

Read the output. Look for `FLAG_PIECE_A:` somewhere in the list of runs.

## Pip 2 — the misnamed file

`ls` shows a file ending in `.exe`. Don't trust the name. Run:

```
file runme.exe
```

It will tell you what the file *actually* is. If `file` says it's text — even though the name suggests an executable — that's your clue. Read it with `cat`.

## Pip 3 — find files by name

Two files have the word "piece" in their names. You don't need to memorize which two. Run:

```
find . -name "*piece*"
```

The `*piece*` pattern matches any filename with "piece" anywhere in it. The output is two filenames. `cat` each one to see the halves. Concatenate them in the order they were numbered.

---

## Once you have all three pieces

The flag is the three pieces, in order (A then B then C), separated by underscores, wrapped in `FLAG{...}`. Don't add extra punctuation or spaces — just literally concatenate.

If you're seeing `FLAG_PIECE_A:strings_in_binaries`, the value is `strings_in_binaries`. The leading `FLAG_PIECE_A:` is the label, not part of the answer.

---

Still stuck? Read `solution.md` — it walks through the entire challenge step by step.
