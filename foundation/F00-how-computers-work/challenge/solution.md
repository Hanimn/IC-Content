# Solution — F00: The Computer Tour

**Flag:** `FLAG{the_machine_is_just_files_and_rules}`

---

## The Approach

There is no hidden flag. The flag is revealed by correctly answering one question in each of the six zones. Every answer is something you read in the lesson.

---

## Zone-by-Zone Walkthrough

### Zone 1 — The File Browser

The folder tree shows: `/`, then `Users/`, then `you/`, then `Pictures/`, then `cat.jpg`.

**Answer:** `/Users/you/Pictures/cat.jpg`

Why: a path is read top-down through the folder hierarchy. The leading slash means "start at the very top of the disk", and each segment after a slash names a folder you go into next. The final segment (no trailing slash) is the file itself.

---

### Zone 2 — The Long File

The scene shows ~220 lines of fake system log text. Buried in the middle is the line:

```
[INFO] config: IMPORTANT_CODE: alpha
```

**Answer:** `alpha`

How to find it: open the browser's Find bar with **Ctrl+F** (Windows/Linux) or **Cmd+F** (Mac), type `IMPORTANT_CODE`, and the browser jumps to the line. This is a deliberate setup for F04 onward, where Find on a long page is one of the most-used skills.

---

### Zone 3 — The Folder Tree

The path is `/home/projects/secret/key.txt`.

**Answer:** `projects`

Why: the segment immediately before `secret` is the folder that contains `secret`. Reading the path: home contains projects, projects contains secret, secret contains key.txt. Each slash is a "step down" into a sub-folder.

---

### Zone 4 — The Browser Window

Three browser windows (Chrome, Safari, Firefox) are shown loading the same page.

**Answer:** "They are three different browsers, all showing the same webpage from the internet."

Why: the internet is the global network. A browser is a program that *visits* the network. Many browsers can be installed on the same machine; they will all show the same webpage because the page lives on a server, not on the browser.

---

### Zone 5 — The Server

The animated diagram shows a laptop sending "HELLO" to a server-shaped box, which responds "HI BACK".

**Answer:** "Just another computer that answers when asked."

Why: the word "server" describes a job, not a special kind of hardware. Your laptop has all the same parts as a server — CPU, memory, disk. What makes a machine a server is that it sits somewhere (often in a data centre, with no screen attached) and answers requests when something on the network asks.

---

### Zone 6 — The Ethics Panel

The scene: your sister's laptop is open, her diary file is on screen, and nobody would know if you read it.

**Answer:** "No. Even though I can, I should not. It is not mine."

Why: this is the core rule of everything in this series. Every skill you'll learn later — reading source code, finding bugs, exploiting flaws in test systems — works the same way on systems you have permission to touch and systems you don't. The only thing keeping a learner on the right side of the line is the choice to apply the rule even when the door is wide open.

---

## After All Six

A "Boot up your hacker journey" button appears at the bottom of the page. Click it. The flag card slides in:

```
FLAG{the_machine_is_just_files_and_rules}
```

The flag captures the two things F00 wanted you to take away:

1. The whole machine is just **files** (data and programs) being read by a CPU. There is no magic underneath.
2. The thing that makes hacking ethical is **rules** — written rules (laws, terms of service) and the personal rule "can is not should."

You are now ready for F01 — the same content, but for the internet itself.

---

## Why This Module Exists

If you came to this series already knowing what a folder is, what a browser is, and what a server is, F00 felt slow. That's fine — it's deliberately the slowest module in the track. The reason F00 exists is that many students arrive having only ever used iPads, school Chromebooks, or phones. They've never opened a file browser. They've never seen a path. They have no idea Chrome and "the internet" are different things.

By F04 the series assumes you know all of this. F00 makes that assumption fair.

---
*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Foundation Track →](../../README.md)*
