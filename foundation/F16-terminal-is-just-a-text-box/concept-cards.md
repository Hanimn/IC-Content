# Concept Cards — F16: The Terminal Is Just A Text Box

Quick reference for the seven commands and the syntax around them. Flip back to this any time a command name escapes you mid-challenge.

---

## The Seven Commands

| Command | Question it answers | Typical shape |
|---|---|---|
| `cat` | What's in this file? | `cat <file>` |
| `ls` | What files are here? | `ls` or `ls -l` |
| `file` | What KIND of file is this, really? | `file <file>` |
| `strings` | What readable text is hiding inside this binary? | `strings <file>` |
| `grep` | Find this word in any of these files. | `grep <pattern> <file>` or `grep -i <pattern> <file>` |
| `find` | Where on disk is the file with this name? | `find <path> -name "<pattern>"` |
| `xxd` | Show me the raw bytes. | `xxd <file>` |

---

## Anatomy Of A Shell Prompt

```
ada@laptop:~/Documents$
│   │      │           │
│   │      │           └─ $ means "ready for command"
│   │      └─ current directory ("~" is your home folder)
│   └─ computer name
└─ your username
```

When you `cd` into a different folder, the path part changes — but `$` always sits at the end, and what you type still goes to the right of it.

---

## Pipes In One Sentence

The output of the command on the LEFT becomes the input to the command on the RIGHT.

```
strings mystery.bin | grep FLAG
└────── command 1 ──────┘   └─── command 2 ────┘
```

| Pipeline | Reads as |
|---|---|
| `cat log.txt \| grep ERROR` | "Read the log, then keep only the lines with ERROR." |
| `strings binary \| head` | "Extract the readable runs, then keep only the first 10." |
| `ls \| grep .txt` | "List files, then keep only the ones with `.txt` in the name." |
| `find . -name '*.png' \| head` | "Find every PNG, show me the first 10." |

The lite-cut challenge does NOT support pipes — you'll run commands one at a time. Real shells (your school's Linux lab, picoCTF's web shell, every CTF VM) do.

---

## When To Reach For Which Command

You found a mystery file. You don't know anything about it. Run these in order:

1. **`file mystery`** — What kind of file is it? Trust the bytes, not the name.
2. **`xxd mystery | head`** — What do the first few rows of bytes look like? Spot magic bytes from F07.
3. **`strings mystery`** — Are there any readable runs inside? Your eye is great at spotting `FLAG{` patterns.
4. **`grep -i flag mystery`** — Even shorter: just look for `flag` directly. Combine with `strings` for binaries.
5. **`cat mystery`** — Only AFTER step 1 said it was text. Otherwise the terminal fills with garbage.

For "find files by name pattern": `find . -name "*piece*"` — case-sensitive by default. Use `-iname` for case-insensitive.

For "find a word inside any file in this directory": `grep -r FLAG .` — the `-r` makes it recurse into subfolders.

---

## Common Mistakes

- **Typing `file` with no argument.** Just `file` shows you the usage line, not file types. You need a filename: `file mystery.bin`.
- **Forgetting that `grep` is case-sensitive by default.** `grep FLAG` finds `FLAG{...}` but not `flag{...}`. Use `grep -i FLAG` to match either case.
- **Trying to `cat` a binary file.** The terminal fills with garbage characters that can sometimes mess up your prompt's display. Use `xxd` (to read bytes) or `strings` (to extract readable runs) for binaries.
- **Confusing what `find` searches.** `find` looks at file *names*. To search inside file *contents*, use `grep -r <pattern> .` instead.
- **Running `strings` on a text file.** It works — but it just prints the file. `strings` is for binaries, where you want the readable bits without the unreadable garbage. Use `cat` on text files.
- **Forgetting to quote the pattern in `find`.** `find . -name *piece*` will sometimes break if the shell tries to expand `*piece*` itself. Always quote: `find . -name "*piece*"`. The simulator in the lite-cut challenge handles either way, but real bash is picky.

---

## Quick Recognition

Stuck mid-challenge? This is the question to ask, and the command that answers it.

| Question | Command |
|---|---|
| What files are here? | `ls` |
| What's in this file? | `cat <file>` |
| What KIND of file is this? | `file <file>` |
| Is there readable text hiding in this binary? | `strings <file>` |
| Is the word `FLAG` in this file? | `grep FLAG <file>` |
| Where is the file named `*piece*`? | `find . -name "*piece*"` |
| Show me the raw bytes. | `xxd <file>` |
| I'm stuck. | `help` |
| Too much output. | `clear` |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
