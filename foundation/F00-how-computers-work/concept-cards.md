# Concept Cards — F00: How Computers Actually Work

Quick reference for the key terms and ideas in this module.

---

## Key Terms

| Term | Definition |
|---|---|
| **CPU** | Central Processing Unit — the chip that actually executes instructions; the "cook" following the recipe |
| **Disk** | Long-term storage where files live, even when the computer is off (also called "drive" or "storage") |
| **File** | A bunch of bytes saved on the disk with a name; the only kind of thing the disk holds |
| **Folder / Directory** | A container that holds files and other folders; how the disk stays organised |
| **Path** | The full address of a file, folder by folder, e.g. `/Users/you/Pictures/cat.jpg` |
| **Program** | A type of file whose contents are instructions for the CPU to follow |
| **Source Code** | The human-readable text version of a program's instructions |
| **Running Program / Process** | A program that has been loaded by the CPU and is currently executing |
| **Browser** | A program that talks to the internet and shows you the pages other computers send back |
| **Server** | Another computer, usually with no screen, sitting in a data centre and answering requests |

---

## The Recipe Analogy (Quick Reference)

```
Recipe (on paper)        →   Source code (a file on disk)
Cooking the recipe       →   Running the program
The finished meal        →   The running process on screen
The cook                 →   The CPU
The kitchen counter      →   Memory (RAM)
The pantry / fridge      →   The disk
```

If you remember nothing else, remember the cook (CPU) follows recipes (programs) using ingredients (files) very, very fast.

---

## Path Syntax — Mac / Linux vs Windows

```
Mac and Linux:    /Users/you/Pictures/cat.jpg
                  └── starts at the top of the disk

Windows:          C:\Users\you\Pictures\cat.jpg
                  └── C: is the drive name, then backslashes
```

Read either path right-to-left to make sense of it: "the file `cat.jpg`, inside `Pictures`, inside `you`, inside `Users`."

---

## The Ethics Rule (Memorise This)

> **Just because you can do something, doesn't mean you should.**

The three scenarios from the lesson, summarised:

| Situation | Right move |
|---|---|
| Friend shared their password as a joke | Don't log in. Hand it back. |
| You found a real bug on the school website | Report it privately to a teacher or IT. Don't show friends. |
| You can read your sister's diary file | Don't. *Can* is not *should*. |

This rule is the difference between someone the industry hires and someone the police arrest.

---

## Keyboard Shortcuts (Used Throughout the Series)

| What | Windows / Linux | Mac | First module that uses it |
|---|---|---|---|
| View page source | `Ctrl + U` | `Cmd + Option + U` | F04 |
| Find on page | `Ctrl + F` | `Cmd + F` | F00 (this module) |
| Open DevTools | `Ctrl + Shift + I` | `Cmd + Option + I` | F03 |
| Copy / Paste | `Ctrl + C` / `Ctrl + V` | `Cmd + C` / `Cmd + V` | Always |

---

## Common Mistakes

- **Thinking the browser is the internet.** Chrome is not "the internet." It's a program that *visits* the internet. The internet is the cables and signals connecting all the computers in the world. Multiple browsers can be installed on the same machine and they'll all see the same web.

- **Thinking servers are special hardware.** A server is just a normal computer doing a job. Your laptop could technically be a server. The word describes the role, not the machine.

- **Confusing source code with the running program.** Source code is text in a file you can read. The running program is what happens when the CPU follows that text. Looking at source code does not run it. Running a program does not show you its source.

- **Missing the ethics rule.** Every CTF skill is dual-use. The same trick that wins a challenge can break the law if pointed at the wrong target. Permission is the difference.

---

## Numbers and Names To Know

| Term | What it means |
|---|---|
| **CPU** | The chip that executes instructions |
| **RAM** | Short-term memory; cleared when the computer turns off |
| **Disk** | Long-term storage; survives reboots |
| **OS (Operating System)** | The "manager" program: macOS, Windows, Linux, ChromeOS, iOS, Android |
| **Process** | A program currently running |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
