# Solution — F16

**Flag:** `FLAG{strings_in_binaries_trust_bytes_not_names_and_pipes_chain_them}`

This is the three discovered pieces concatenated (`piece_a + "_" + piece_b + "_" + piece_c`), wrapped in `FLAG{...}`. The literal flag string never appears in the page's JavaScript — it's assembled at submit time from the values the kid earned by running commands.

---

## Step-by-step walkthrough

### 1. Get oriented

```
$ ls
README.md            archive.zip          avatar.png
cat-photo.txt        config.cfg           data.bin
fragments-of-piece-1.dat  fragments-of-piece-2.dat
index.txt            log.txt              mystery.bin
notes.txt            photo.png            runme.exe
todo.md
```

15 files. Some are clearly binaries (`mystery.bin`, `archive.zip`, etc.). Some are text. One looks suspicious (`runme.exe` — that's a Windows executable extension on a USB stick that otherwise contains markdown and text files). And two of them share a word: "piece."

### 2. Read README.md to set the scene

```
$ cat README.md
# Mystery USB

Whoever you are, you found this drive. There are 15 files here.
Three of them, between them, hold the flag.

I left clues. Read them carefully.

  - The "binary" files have readable text inside them. Use strings.
  - One file lies about what it is. Use file to check, then cat.
  - Two files have a word in common. Use find.

-- A Friend
```

The README literally tells you which command to use for each hide. (In real CTFs the briefing isn't usually this generous — but F16 is the introductory lesson on these tools, not a hard challenge. The teaching is in the *running of the commands*, not in figuring out which to run.)

### 3. Hide A — `strings` on a binary

The likely target is `mystery.bin` because the README's `notes.txt` literally mentions it.

```
$ strings mystery.bin
ELF
FLAG_PIECE_A:strings_in_binaries
...
```

There's the first piece: `strings_in_binaries`.

The right pip on the panel turns green. **Discoveries: 1/3.**

### 4. Hide B — `file` then `cat` on the misnamed file

```
$ file runme.exe
runme.exe: ASCII text
```

`runme.exe` claims to be an executable but `file` says it's plain text. The filename was a misdirection — `file` reads the bytes themselves.

```
$ cat runme.exe
Don't run this. It's not a real executable.

I named it `runme.exe` so anyone who saw it would either:
  (a) panic and skip it, or
  (b) try to "run" it and get nothing useful.

But you ran `file runme.exe` and it told you the truth:
this is plain ASCII text. So you ran `cat` and now you can read it.

Trust the bytes, not the names.

FLAG_PIECE_B:trust_bytes_not_names
```

Second piece: `trust_bytes_not_names`. **Discoveries: 2/3.**

### 5. Hide C — `find -name` then `cat` on the two halves

```
$ find . -name "*piece*"
./fragments-of-piece-1.dat
./fragments-of-piece-2.dat
```

`find` walks the filesystem looking for filenames matching the pattern. Two files match. Read both:

```
$ cat fragments-of-piece-1.dat
piece 1 of 2

concat with piece 2 in order to recover this part of the flag.

FLAG_PIECE_C_HALF1:and_pipes_

$ cat fragments-of-piece-2.dat
piece 2 of 2

piece 1 ended with an underscore. Add this onto the end.

FLAG_PIECE_C_HALF2:chain_them
```

Concatenate: `and_pipes_` + `chain_them` = `and_pipes_chain_them`.

Third piece: `and_pipes_chain_them`. **Discoveries: 3/3.**

The flag input box and submit button unlock.

### 6. Submit the flag

Concatenate the three pieces in order (A, B, C) with underscores:

```
FLAG{strings_in_binaries_trust_bytes_not_names_and_pipes_chain_them}
```

Paste into the box, press Enter. **Flag accepted.**

---

## What you just did

The three pieces of the flag map exactly to the three commands the lesson taught:

- **Hide A** → `strings` (find readable text inside a binary)
- **Hide B** → `file` + `cat` (verify what a file actually is, then read it)
- **Hide C** → `find -name` + `cat` (locate files by name pattern, then read them)

This is the entire shape of beginner Forensics CTFs. You'll do this exact pattern — sometimes with a fourth or fifth command (`xxd`, `grep -r`, `head`) — on every CTF challenge in the Forensics or Reverse Engineering category for the rest of your time at it.

---

## Things to try after solving

- Run `xxd mystery.bin` and look for the `FLAG_PIECE_A:` text in the ASCII column. You can find piece A that way too — `strings` is just doing the eye-strain part of `xxd` for you.
- Run `grep -r FLAG .` to search every file at once. You should see all three pieces (and the "FLAG_PIECE" labels) appear in the output. That's the same flag-hunt approach but using a different combination of commands.
- Run `xxd` on a binary that DOES NOT have an embedded run (like `archive.zip`). Compare to `mystery.bin` — you should see ASCII letters in the right column for `mystery.bin`, mostly dots for `archive.zip`. Trained eye = pattern recognition.
