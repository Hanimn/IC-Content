---
title: "From Code to Computer"
tagline: "A program is words you can read. A binary is the same words after a translator gets done with them — but pieces always slip through."
time: ""
tier: "Code & Logic"
---
> A program is words you can read. A binary is the same words after a translator gets done with them — but pieces always slip through.

---

## The Field Interrogator's First Question

Imagine a captured device lands on your desk. A small black box. Your job is to figure out what it does, what it talked to, and what it knows.

You could break out the soldering iron. You could disassemble the chip. You could attach a debugger and trace every instruction it executes. All of that takes hours, and it's where most beginners want to start because it sounds dramatic.

A senior agent walks past your bench, looks at the device, and asks one question first:

> "What does it say if you just *read* it?"

Before the locksmith opens the safe, before the cryptographer breaks the cipher, the field interrogator just listens. Most prisoners aren't silent. Most safes have labels. Most binaries — most compiled programs you'll ever face in a CTF — have English words sitting right inside them, in plain ASCII, waiting for someone to bother looking.

This module is about that first question. Before you do anything sophisticated to a binary, you read what's lying around inside it. The technique is so reliable, so often the entire solution, that experienced players have a phrase for it: *just run strings*. By the end of this module you'll know what `strings` does, why it works, and how to do it by hand.

---

## Source Code Is Human-Readable

When a programmer writes a program, they write *source code* — text in a programming language. Source code is just a file. You can open it in any text editor. You can read it. Three small programs, all printing the word `Hello`:

**Python:**
```python
print("Hello")
```

**C:**
```c
#include <stdio.h>
int main(void) {
    printf("Hello\n");
    return 0;
}
```

**JavaScript:**
```javascript
console.log("Hello");
```

Three different languages. Three different syntaxes. They each say the same thing in slightly different grammars, the same way a French speaker, a German speaker, and an English speaker can all order coffee. The program is *words*. A human can read it without any tools.

Source code is also where security secrets get accidentally written down: hardcoded passwords, internal URLs, debug flags, snarky comments about coworkers. If a developer leaks source code, you can read every line of it. That's bad for them and very good for you.

But programs don't *run* as source code. They have to be turned into something the CPU understands.

---

## Compilation Is Translation

A CPU doesn't speak Python or C. It speaks one language: numbers — specifically, sequences of bytes called *machine code*. Each byte (or small group of bytes) tells the CPU to do one tiny thing: move this number, add these two, jump to that address. Hundreds of millions of these tiny instructions per second add up to a running program.

The process of turning source code into machine code is called **compilation**. The tool that does it is called a **compiler**.

Picture it as a conveyor belt:

```
   source code        compiler           binary executable
   (human text)  ─►   (translator)  ─►   (machine bytes)

   printf("Hello\n")   ┌──────────┐      4F 65 89 38 ...
   int main(...)       │   gcc    │      E5 48 83 EC ...
   #include <stdio.h>  └──────────┘      48 8D 35 9E ...
```

You feed C source in one end. A binary executable comes out the other end. The compiler reads your code, figures out what each line is supposed to do, and writes the corresponding machine instructions to a file. That file — the binary — is what actually runs.

A quick footnote on the three languages above: only C is *traditionally compiled* in this strict sense. Python and JavaScript are usually *interpreted* — a program called the interpreter reads the source code as the program runs and executes it directly, no separate translation step. Modern Python and JavaScript engines blur the line with techniques called *just-in-time compilation*, but those are details. For everything in this module, picture C: source goes in, a binary comes out, the binary is what you analyse.

The binary is the thing that gets shipped, sold, downloaded, captured, and reverse-engineered. You almost never get the source code. You get the bytes.

---

## The Binary Is Mostly Opaque

If you open a real compiled binary in a hex editor, your first impression is panic. It looks like garbage:

```
00000000  7F 45 4C 46 02 01 01 00  00 00 00 00 00 00 00 00  .ELF............
00000010  03 00 3E 00 01 00 00 00  D0 06 00 00 00 00 00 00  ..>.............
00000020  40 00 00 00 00 00 00 00  C8 19 00 00 00 00 00 00  @...............
00000030  00 00 00 00 40 00 38 00  0B 00 40 00 1D 00 1C 00  ....@.8...@.....
```

Pages and pages of bytes that don't seem to mean anything. There's no `for` loop in there, no `printf`, no `return`. The compiler ground up the source code and rebuilt it as CPU instructions. You can decode those instructions if you know the architecture's instruction set, but that's a long road. You're going to learn that road later. Today is not that day.

So far this looks bad: the binary is opaque, the source is gone. How do you find anything?

Look closer.

---

## But Strings Survive

A program doesn't only contain instructions. It also contains data — and a huge amount of that data is *text*. Text the program needs to display, log, send, parse, or compare. The compiler can't translate that text into instructions, because it isn't a command. It's a *value*. So the compiler does the only sensible thing: it copies the text, byte-for-byte, into the binary.

Open enough binaries and you start to spot the pattern. English islands inside the byte ocean:

- Error messages: `"File not found"`, `"Permission denied"`, `"Connection refused"`
- Function and library names: `"printf"`, `"connect"`, `"fopen"`
- Hardcoded URLs: `"https://api.example.com/v1/users"`
- Version strings: `"v1.4.2-debug"`
- Format strings: `"User %s logged in at %d"`
- Copyright notices: `"(c) 2024 Acme Corp."`
- File paths: `"/etc/passwd"`, `"C:\\Windows\\System32"`
- Flags. Yes — actual CTF flags, hardcoded into the binary by whoever made the challenge.

These bytes are stored as ASCII. The same ASCII you learned in F08. The same `46 4C 41 47 7B` you trained your eye on in F06. They sit inside the binary, surrounded by machine instructions that look like noise, easy to spot once you know they're there.

---

## The `strings` Tool

Reading a million-byte binary one row at a time is not realistic. So Unix has a tool called `strings`. Here's what it does, in plain English:

> Walk through every byte of the binary in order. Whenever you find a run of four or more printable ASCII bytes in a row (anything from 0x20 to 0x7E), print that run. Skip everything else.

That's the entire algorithm. Four bytes is the default minimum length, because shorter runs happen by coincidence in random binary data. Set the minimum to 6 or 8 and the noise drops further; only intentional, meaningful strings remain.

Used in the real world, it looks like this:

```
$ strings ./mystery_binary
/lib64/ld-linux-x86-64.so.2
__libc_start_main
printf
puts
fopen
Usage: mystery [options]
ERROR: file not found
https://debug.acme.local/api
(c) 2024 Acme Industries
FLAG{strings_are_a_gift}
GLIBC_2.2.5
```

Look at the second-last line. The flag was right there.

In CTF reverse engineering, this happens often enough that "did you run strings on it?" is a meme. It's also genuinely the first thing you do, every time. Even when the flag isn't sitting in the output, the strings list tells you what kind of binary you're looking at — what libraries it uses, what URLs it talks to, what error messages it might print. It's a free preview of the program's vocabulary.

---

## Why Strings Survive

Why doesn't the compiler do something clever and hide the text? Because the program needs the text to actually *do its job*. When the program prints `"File not found"`, those characters have to exist somewhere in memory at runtime. The simplest, fastest, and most common thing for the compiler to do is store them right inside the binary, in a section reserved for read-only data, and have the instructions point to that section when they need to print something.

Could a programmer encrypt or obfuscate the strings? Yes. Some malware does. Some CTF challenges do, as a deliberate twist. But the vast majority of normal programs leave their strings naked, because there's no business reason to hide them. The author isn't trying to win a CTF — they're trying to ship a working product.

This is one of those happy accidents where being practical leaks information. The programmer wanted their error message to display correctly. The compiler stored it as ASCII. The reverse engineer reads it. Everyone gets what they wanted.

---

## Why This Matters for CTFs

A compiled program is not a black box. It has windows.

Concretely, here's the playbook for any unknown binary:

1. Run `strings` on it.
2. Look for things that obviously stand out: words that look like flags, suspicious URLs, password-shaped tokens, debug messages.
3. If the flag is there: you're done. Go submit.
4. If it isn't there directly but the strings reveal the program's behaviour — what files it reads, what server it contacts, what error messages it prints — use that to plan the next attack.

This is so foundational that every reverse-engineering toolchain ships with `strings` or something equivalent. Disassemblers (Ghidra, IDA, radare2) let you jump straight to the strings list. Forensics tools run `strings` automatically as a first pass. Even file-viewer browser extensions often include a "show printable text" mode.

You will use this in:

- **Reverse Engineering** — first move on every binary, every time.
- **Forensics** — `strings` on a memory dump or disk image often reveals what was happening on the machine: filenames, URLs visited, chat fragments, leftover credentials.
- **Malware Analysis** — strings reveal command-and-control servers, hardcoded encryption keys, mocking comments by the author.
- **Web** — minified JavaScript bundles and compiled WebAssembly modules also leak strings; the same trick applies.

---

## Today's Challenge: Be the Tool

We don't have a real compiler or a real binary in this lesson. What we have is something better for *learning*: a fake compiled program rendered as a hex dump, plus filter controls that let you do exactly what `strings` does — only by hand, with full control over the threshold, watching the noise drop away as you tighten it.

You'll be the tool. The binary is roughly 700 bytes. Most of those bytes are random noise — the kind of stuff that looks like CPU instructions and pointer values. Scattered through that noise are runs of printable ASCII: a welcome message, an error message, a URL, a copyright line, some short fragments — and one flag.

The challenge has two filters:

- **Show only printable runs** — when on, the hex dump dims everything that isn't a run of consecutive printable bytes, so the English islands stand out visually.
- **Minimum length** — the threshold for "what counts as a string." At 4, you'll see lots of short fragments — including coincidental noise like `OK`-style runs. At 6 or 8, the noise filters out and only the real, intentional strings remain. The flag is somewhere in the middle of the blob, hiding among other long strings.

Your job: bump the minimum length until the field thins out to a few clear strings, then read the one that looks like a flag.

This is the exact mental motion a reverse engineer makes when running `strings -n 8` on a binary they've never seen before. You are practising the move that opens every CTF binary you'll ever touch.

---

## Guided Walkthrough — Reading Strings From Bytes

Here's a short example. Suppose you saw this run of bytes in a hex dump:

```
68 74 74 70 73 3A 2F 2F 65 78 61 6D 70 6C 65 2E 63 6F 6D
```

Each byte is in the printable range 0x20–0x7E. Decoding via the ASCII table you learned in F05 and F08:

| Hex | Char | Hex | Char | Hex | Char |
|-----|------|-----|------|-----|------|
| 68 | h | 73 | s | 65 | e |
| 74 | t | 3A | : | 78 | x |
| 74 | t | 2F | / | 61 | a |
| 70 | p | 2F | / | 6D | m |

Reading straight through: `https://example.com`. Nineteen consecutive printable bytes — a URL hardcoded into the binary. The `strings` tool would print it. Your eyes do the same thing once you know what to look for.

Now suppose this run sits between a chunk of bytes like `D2 8A 4F 91 AC 33` and another chunk like `B7 22 06 EE`. None of those are in the printable range. They show as dots in the ASCII column. The URL stands out as a clean readable island in a sea of noise. That's the picture you're hunting for.

---

## Concept Card

**Key Terms**

| Term | Definition |
|------|-----------|
| Source Code | Human-readable text written in a programming language (Python, C, JavaScript). |
| Compiler | A tool that translates source code into machine code (a binary). `gcc` and `clang` are common C compilers. |
| Binary / Executable | A file containing machine code the CPU can run directly. Mostly opaque bytes. |
| String | A run of printable ASCII bytes embedded inside a binary — error messages, URLs, flags. |
| `strings` | A Unix tool that scans a binary and prints every run of consecutive printable ASCII bytes (default: 4 or longer). |
| Printable ASCII | Bytes in the range 0x20 to 0x7E. Includes all letters, digits, punctuation, and space. |

See [`concept-cards.md`](concept-cards.md) for the full quick reference.

---

## Your Challenge

Open [`challenge/index.html`](challenge/index.html) in your browser.

You'll see a fake compiled binary as a hex dump, plus filters that let you act as the `strings` tool. Find the flag.

When you've done it, submit the flag in the input box at the bottom.

---

## Keep Going

- Try `strings /bin/ls` on a Linux or Mac terminal sometime. Page through the output. You'll recognise function names, error messages, and locale strings — pieces of the program's English vocabulary leaking out.
- The `-n` flag controls the minimum length. `strings -n 8 /bin/ls` cuts the noise.

**Next:** [F12 — The Computer's Notebook](../F12-computer-notebook/README.md)

F11 taught you that compiled programs leak readable strings. F12 looks at the *other* place a running program leaks information: memory. Same principle — values stored as bytes, hiding in plain sight.
