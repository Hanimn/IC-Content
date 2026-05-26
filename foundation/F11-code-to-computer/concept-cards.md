# Concept Cards — F11: From Code to Computer

Quick reference for the key ideas in this module.

---

## Key Terms

| Term | Definition |
|---|---|
| **Source Code** | Human-readable text written in a programming language (Python, C, JavaScript). Programmers write it; compilers translate it. |
| **Compiler** | A tool that translates source code into machine code. `gcc` and `clang` are the most common C compilers. |
| **Binary / Executable** | A file containing machine code that the CPU can run directly. Looks mostly like random bytes. |
| **Machine Code** | The numbered instructions a CPU actually executes. One step below assembly; the lowest practical layer. |
| **Interpreter** | A program that reads source code as it runs, instead of compiling it ahead of time. Python and JavaScript use interpreters. |
| **String** | A run of consecutive printable ASCII bytes embedded inside a binary. Error messages, URLs, flags. |
| **`strings`** | A Unix tool that scans a binary and prints every run of consecutive printable ASCII bytes of a given minimum length. |
| **Printable ASCII** | Bytes in the range 0x20 to 0x7E. Letters, digits, punctuation, space. |
| **Minimum Length** | The threshold for "what counts as a string." Default is 4. Higher values (6, 8, 10) filter out coincidental noise. |

---

## The Compilation Pipeline

```
   source code      compiler         binary executable
    (text file)  ─►  (gcc/clang) ─►  (machine bytes)

       ↑                                ↑
   you can read this              this is what runs
                                  this is what leaks strings
```

Source code is what programmers write. The binary is what gets shipped. In a CTF, you almost always get the binary, not the source.

---

## What `strings` Does — In One Sentence

> Print every run of N or more consecutive printable ASCII bytes (0x20–0x7E), in the order they appear in the file.

That's the whole algorithm. Every reverse-engineering tool ships with this, and it's the *first* thing you run on any unknown binary.

---

## Common Strings That Leak From Binaries

| Type | Example |
|------|---------|
| Error message | `ERROR: file not found` |
| Hardcoded URL | `https://debug.acme.local/api` |
| Format string | `User %s logged in at %d` |
| Help text | `Usage: program [options]` |
| Copyright | `(c) 2024 Acme Corp` |
| Version | `v1.4.2-debug` |
| Library function names | `printf`, `fopen`, `connect` |
| File paths | `/etc/passwd`, `C:\Windows\System32` |
| **CTF flags** | **`FLAG{...}`** |

---

## The CTF Playbook for Any Unknown Binary

```
1. Run strings on it
2. Skim the output for: flags, URLs, suspicious tokens, error messages
3. If the flag is there → submit it, you're done
4. If not → use the strings to plan the next move (what files? what URLs? what behaviour?)
```

This is so common that "did you even run strings?" is a CTF meme. Always run strings first.

---

## Why Strings Survive Compilation

The program *needs* the text to do its job. Error messages have to be displayed. URLs have to be sent. Format strings have to be filled in. The simplest, fastest thing for a compiler to do is store the text as ASCII inside the binary. Most authors don't bother encrypting strings, because there's no business reason to — they want the program to work, not to win a CTF.

---

## Common Mistakes

- **Skipping `strings` and jumping to disassembly.** The flag is often in the strings output. Check there first; spend the heavy effort only when you have to.
- **Using too low a minimum length.** Default is 4, which can drown the real strings in coincidental noise. Bump it to 6 or 8 first; then lower if needed.
- **Confusing source code with binary.** Source is text; you can read it without tools. Binary is bytes; you need `strings` (or a hex editor) to read what's left.
- **Assuming the flag is at the end.** It can be anywhere in the file. Read the full strings output, not just the last lines.

---

## Numbers to Know

| Value | What It Means |
|---|---|
| `0x20` | Lowest printable ASCII byte (space) |
| `0x7E` | Highest printable ASCII byte (`~`) |
| `0x46 0x4C 0x41 0x47 0x7B` | The bytes for `FLAG{` — recognise on sight |
| `4` | Default minimum length for `strings` |
| `6` or `8` | Common bumps to cut noise |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
