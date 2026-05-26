# Solution: F12 — The Computer's Notebook

---

> **Wait.** If you haven't spent at least 15–20 minutes trying, go back and try again.
> Getting stuck is how you learn. The struggle is the point.
>
> If you've genuinely tried and you're reading this to understand what you missed — that's completely fine. Keep going.

---

## The Approach

This challenge is not a puzzle to "solve" with a clever insight — it's a guided picture of how memory works, gated so you have to walk through every step. Each panel teaches one idea. Together, they assemble the flag and the mental model behind it.

The three ideas, in order:

1. Every byte has an address. You can read it. You can write to it.
2. When functions are called, plates pile up on the stack. Each plate has a return address.
3. A buffer too small spills into whatever sits next to it — and what sits next to it can be load-bearing.

---

## Step-By-Step Solution

**Step 1: The Memory Grid (Panel 1)**

Click any three different cells in the 16×16 grid. Type any two-digit hex value into each (e.g. `01`, `42`, `FF`).

There is no specific target — the panel is teaching the picture, not testing the answer. Once three distinct cells have distinct non-zero values, the panel marks itself complete and Panel 2 unlocks.

*You see: three cells lit up with custom values; the Panel 1 status flips to "complete".*

**Step 2: The Stack Visualizer (Panel 2)**

The target stack is shown from bottom (oldest) to top (newest). `main` is on the bottom and is placed there for you. You complete the stack by calling functions in the right order — earlier in the target = called earlier.

For the target `[main] [A] [C] [B]`, press:

1. `call A()`
2. `call C()`
3. `call B()`

After three calls the stack tower should read top-to-bottom: `B`, `C`, `A`, `main`. The panel detects the exact match and reveals **flag fragment 1**:

```
FLAG{the_stack_
```

If you mis-pressed, use `return` to pop the top plate (which simulates a function returning) and try again. `reset` clears all plates back to just `main`.

*You see: a tower of plates matching the target, fragment 1 revealed below.*

**Step 3: The Overflow Demo (Panel 3)**

Two slots side by side: a 4-byte input slot, and a 4-byte return-address slot showing `0x00DEAD00`.

Type into the input field. The first 4 characters fill the input slot byte-by-byte. ASCII bytes show in hex inside the slot: `H` → `48`, `e` → `65`, etc.

The 5th character has nowhere to go in a 4-byte slot, so it spills into the first byte of the return-address slot. Each subsequent character spills into the next byte of the return address. After 4 characters have spilled (typing 8 total), the entire return address has been overwritten.

Try typing `OVERFLOW` (or anything 8+ characters long). Watch the return-address slot tint red as bytes spill into it.

When all 4 bytes of the return address have been overwritten, a faint link appears under the slots: `[ secret debug panel ]`. Click it to reveal **flag fragment 2**:

```
remembers_where_to_go_back}
```

*You see: the return-address slot fully overwritten; a hidden link surfaces; fragment 2 revealed.*

**Step 4: Submit the full flag**

Concatenate fragment 1 and fragment 2, in that order, no space:

```
FLAG{the_stack_remembers_where_to_go_back}
```

Type that into the submission box at the bottom and press Submit (or hit Enter).

*You see: input turns green, success banner appears.*

---

## The Flag

```
FLAG{the_stack_remembers_where_to_go_back}
```

---

## What Each Panel Was Really Teaching

**Panel 1** taught you that memory is *just* a numbered grid. Every cell has an address (its position) and a value (the byte). You can read either coordinate; you can write the value; addresses are stable. This is the substrate every other concept builds on.

**Panel 2** taught you that function calls are not free magic. Every call costs a plate. The plate carries a return address. Without that bookkeeping, the program would lose its place. Real computers literally do this — the term *call stack* in any programming language refers to the same tower.

**Panel 3** taught you the picture of a buffer overflow. The slot was 4 bytes. The input could be longer. The "next" slot was the return address. The bytes spilled. There was no malice in the demo — no exploit, no shellcode, no jump-to-attacker-code. Just the spillover. That's the point: in a real binary, the next slot really is the return address, and the bytes that spill really do overwrite it, and the CPU really will jump wherever the new value points. The exploit is just *choosing* which bytes spill.

---

## Why This Was Not An Attack

Nothing in this challenge "exploits" anything. The overflow panel is a DOM simulation — when you type the 5th character, JavaScript updates the displayed value of the next slot. No actual memory corruption happens. No code runs because of your input.

So why does it matter? Because the **picture** is what every binary exploitation challenge will assume you have. Phase 2 modules will hand you a binary and say "find the buffer, count the offset, choose the overwrite." Without the picture, those words are noise. With the picture, the work is mechanical.

The challenge's reward is the flag, but the actual reward is the mental model. You can now read a description like *"a 32-byte buffer is filled with `gets()`, and the saved return pointer sits at offset 40"* and *see* what's being described.

---

## What Happens In A Real Buffer Overflow

In a real C program compiled without protections:

1. A function declares `char name[32]`. The compiler reserves 32 bytes on the stack.
2. The compiler also places a return address near that buffer — typically at offset `+40` or `+72` from the buffer start, depending on architecture and compiler choices.
3. The program reads input into `name` with no length check (`gets`, `strcpy`, sometimes a misused `scanf`).
4. An attacker provides an input longer than 32 bytes. Bytes 33+ overwrite whatever sits next.
5. By carefully choosing the bytes at offset 40, the attacker controls the return address.
6. The function returns. The CPU jumps to the attacker's chosen address.
7. The attacker has put either: (a) an address pointing back to bytes they injected ("shellcode"), or (b) an address of an existing useful function (`system`, etc.).

Modern systems defend against this with stack canaries (a magic value placed between the buffer and the return address — if the canary is corrupted, the program aborts), ASLR (the stack lives at a different address each run, so the attacker can't predict where to jump), and non-executable stacks (you can't run code from the stack region, only data).

Phase 2 will introduce all three. F12 just gave you the picture they're defending.

---

## Write Your Own Writeup

Good CTF players document their solutions. Here's a template — fill it in:

---

**Challenge:** F12 — The Computer's Notebook
**Category:** Binary Exploitation Foundation / Memory Concepts
**Difficulty:** Intermediate
**Tools used:** Web browser

**Approach:**
[How did you walk through the three panels? Was anything not obvious from the lesson?]

**Steps:**
1. [Memory grid: what three cells did you write?]
2. [Stack: how did you decide the call order? Did you make any mistakes?]
3. [Overflow: how many characters did you have to type before the link appeared?]

**Flag:** `FLAG{the_stack_remembers_where_to_go_back}`

**What I learned:**
[In your own words: what is a buffer overflow? Why is the return address the key target?]

---

## Reflection Questions

1. The challenge used a 4-byte input slot and a 4-byte return address. On a real 64-bit system, the return address is 8 bytes. If a buffer is 16 bytes, how many *total* characters does an attacker need to type before they start overwriting the return address? (Think about whether anything else might sit between the buffer and the return address.)

2. The "stack canary" defense places a secret random value between the buffer and the return address. If the canary doesn't match the expected value when the function returns, the program aborts. Why does this stop a naive overflow attack? What can it *not* stop?

3. Integer overflow (`255 + 1 = 0` for a 1-byte counter) and buffer overflow (writing past the end of an array) are both called "overflow" but they're different bugs. Can you describe each one in a single sentence to someone who has never seen either?

4. The lesson said variable names don't survive compilation — only addresses do. What does this mean for someone trying to reverse-engineer a binary? What clues *do* survive? (Hint: F11.)

---

*Great work. You now have the picture every binary exploitation challenge depends on.*

[Back to Module](../README.md) | [Next: F13 — Three Languages, One Page →](../../F13-three-languages/README.md)
