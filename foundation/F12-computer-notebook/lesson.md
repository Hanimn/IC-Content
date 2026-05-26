# F12 — The Computer's Notebook: Lesson

> Every byte the computer remembers lives at a numbered desk. Sometimes the wrong byte ends up at the wrong desk.

---

## A Notebook With Numbered Pages

Imagine a notebook the size of a building. Every page is numbered. Every page holds a single tiny number — a value between 0 and 255. The pages are in order: page 0, page 1, page 2, page 3, all the way up to billions.

That is computer memory.

The pages are called *bytes*. The page numbers are called *addresses*. The values written on the pages are also bytes. So a byte is both *what you store* and *the thing being addressed*. The whole notebook is just numbered desks holding numbered slips.

When a CPU does anything — runs a program, plays a video, opens a website — it spends almost all its time reading bytes off these pages and writing bytes back. "Read page 0x1004. Add 1. Write the result back to page 0x1004." Hundreds of millions of those operations per second. That's the whole machine.

You learned in F11 that a binary is just bytes. Memory is the place those bytes live while the program is running. The binary on disk is a frozen snapshot. The memory while it runs is the program *moving*.

---

## Every Byte Has An Address

The address is just the page number. By convention we write addresses in hex (the skill from F06), because hex is compact and aligns nicely with how computers think.

Some examples:

- `0x0000` — the very first page in some imaginary tiny memory
- `0x1004` — page 4100 in decimal
- `0x7FFF` — page 32767, the top of a 32 KB region
- `0x7FFFFFFFEFA0` — a real address you might see in a 64-bit program; the top bits identify the stack region

When you write a variable in your code:

```c
int x = 42;
```

…the compiler picks an address for `x` and remembers it. The compiler might say "I'll put `x` at address `0x1004`." From then on, anywhere your code says `x`, the compiled instructions actually say *"the value at page 0x1004."*

Variables don't have names at runtime. They have addresses. The names are gone the second the compiler is done. The CPU has no idea what "x" is. It only knows `0x1004`.

This is part of why F11's `strings` trick works: variable names don't survive compilation, but the *strings* the program uses do, because those are data the program needs at runtime.

---

## Sizes — Some Things Take More Pages

A single byte holds a number 0–255. That's enough for one ASCII character (F08) or one pixel's red channel. But a lot of values need more room.

| Type | Bytes | What it holds |
|------|-------|---------------|
| `char` | 1 | One character / a small number |
| `short` | 2 | A number up to ~65,000 |
| `int` (32-bit) | 4 | A number up to ~4 billion |
| `long` (64-bit) | 8 | A number up to ~18 quintillion |
| pointer (64-bit) | 8 | An address |

When a 4-byte int lives at address `0x1004`, it actually occupies pages `0x1004`, `0x1005`, `0x1006`, and `0x1007`. The CPU reads all four pages together to reconstruct the number.

This matters more than it sounds. A "variable" isn't a single page — it's a *range* of pages. When you write a value into a 4-byte slot, you're writing 4 pages. Anything that lived in those 4 pages before is gone. And whatever lives in pages `0x1008` and beyond is *next door*.

Hold on to that idea: *variables sit next to each other in memory*. Their addresses are consecutive. There is no fence between them.

---

## The Stack — A Tower Of Plates

When a function runs, it needs scratch space. Local variables. Bookkeeping. The computer doesn't pick random addresses for those — that would be chaos. Instead, it uses a special, well-organised region of memory called the **stack**.

The stack works exactly like a stack of cafeteria plates.

When a function gets called, the computer slides a fresh plate onto the top of the stack. That plate holds:

- The function's *local variables* — anything declared inside the function
- The *return address* — where to jump back to when the function finishes
- Sometimes the function's *parameters* — the values it was called with

This plate is called a **stack frame**. One frame per running function.

When function `A` calls function `B`, a new plate for `B` lands on top of `A`'s plate. When `B` finishes, its plate gets popped off and thrown away — and the CPU jumps to the return address that was stored on `B`'s plate, landing back inside `A` exactly where it left off.

Picture three nested calls — `main` calls `A`, `A` calls `B`, `B` calls `C`:

```
   ┌──────────────────────────────┐
   │  C's frame   (top, current)  │
   ├──────────────────────────────┤
   │  B's frame                   │
   ├──────────────────────────────┤
   │  A's frame                   │
   ├──────────────────────────────┤
   │  main's frame  (bottom)      │
   └──────────────────────────────┘
```

When `C` returns, its plate is gone and we're back inside `B`. When `B` returns, we're back inside `A`. The stack always knows exactly where to go back to, because every plate carries a return address.

The stack actually grows *downward* in memory on most real computers — newer frames have lower addresses. That's a detail. The picture of "plates on a tower" is what matters. Top means "most recently called."

---

## The Return Address — The Bookmark That Must Survive

Out of everything on a stack frame, the return address is the most important value. Without it, the function couldn't get back to its caller. The whole program would lose its place.

A return address is just a number — typically 4 bytes on a 32-bit system, 8 bytes on a 64-bit one. It points to a page somewhere in the program's instructions, the next instruction after the call site. When the function finishes, the CPU loads that number out of the frame and jumps there.

A return address is a *bookmark*. The book is the program, the page being read is the function that was running, and the bookmark says "after I'm done with this digression, resume here."

Now ask: what would happen if someone scribbled over the bookmark?

The CPU is a very obedient piece of silicon. It does not check whether a bookmark is "real." When a function returns, the CPU reads the bookmark — *whatever is currently written there* — and jumps. If the bookmark was overwritten with garbage, the CPU jumps to garbage. If the bookmark was overwritten with a *deliberate* address, the CPU jumps to that.

Whoever controls the return address controls the program. Hold on to this thought. We're about to see how it gets controlled by accident — and on purpose.

---

## The Picture Of A Buffer Overflow

Imagine a function that takes a name from the user and saves it. The programmer reserves a *4-byte slot* on the stack for the name. Right next to that slot, also on this same plate, sits the 4-byte return address.

```
   stack frame:
   ┌─────────────────┬──────────────────────┐
   │   name slot     │    return address    │
   │    4 bytes      │       4 bytes        │
   └─────────────────┴──────────────────────┘
       0x1000              0x1004
```

The user types `Sam` (3 letters plus a hidden zero byte to mark the end of the string). 4 bytes total. The slot fills perfectly. The return address sits untouched at `0x1004`. Everything works. The function returns to wherever it should.

Now the user types `Alexander` (10 characters). The function tries to save all 10 bytes into the 4-byte slot. The first 4 bytes (`A`, `l`, `e`, `x`) fill the slot. The 5th byte (`a`) has nowhere to go inside the slot — but the program writes it anyway. It lands at address `0x1004`. The 6th byte at `0x1005`. The 7th at `0x1006`. The 8th at `0x1007`.

`0x1004 → 0x1007` was the return address.

It is no longer the return address. It now spells `ander` — well, the first 4 bytes of `ander` — interpreted as a number. The original bookmark is gone. When the function tries to return, the CPU obediently reads the new value and jumps to "the address that happens to be the bytes for `ande`."

That's almost certainly garbage and the program crashes. But notice what really happened: *the user's input controlled the return address.* The CPU jumped wherever the input said.

This is the **picture of a buffer overflow**. It is not a magic spell. It is not a clever exploit, yet. It is the most obvious thing in the world: a slot too small was overrun, and what spilled out landed in the slot next door, and the slot next door was load-bearing.

```
  4-byte slot          ┌── return address ──┐
  ┌────┐               ┌────┐
  │Alex│ ander         │ander│  ← overwritten
  └────┘               └────┘
```

A real attacker isn't named Alexander. A real attacker types exactly the right bytes to make the return address point to the address of their choice. Code they smuggled in. A library function they want to abuse. The exact mechanism varies by attack — and you'll learn those in Phase 2 — but the *picture* is always this one.

A slot too small. Something important next door. Bytes that spill.

---

## Integer Overflow — The Odometer

The other kind of "overflow" you'll meet has nothing to do with memory and everything to do with arithmetic.

A single byte holds 0 to 255. What happens at 256?

The same thing that happens to a 4-digit odometer at 9999 + 1: it rolls over. 9999 → 0000. 255 → 0. A byte cannot hold 256, so it stores the result *modulo 256*. Whatever is left after subtracting 256.

```
  254 + 1 = 255
  255 + 1 = 0    ← rollover
  0 - 1   = 255  ← rollover the other way
```

Two-byte counters roll over at 65536. Four-byte counters roll over at about 4 billion. The math is exactly the same.

Real-world story: in old video games, a unit's health was stored as a 2-byte unsigned number — 0 to 65535. Healing an enemy that was already at 65535 HP would roll it over to 0, instantly killing it. Players figured this out and used it as a strategy. The game wasn't hacked. The game was doing exactly what the math said.

Real-world security story: a banking application stored deposit amounts as a 4-byte signed integer. Someone deposited the largest possible value plus one. The number rolled over to a huge *negative* value. The "balance after deposit" became deeply negative. This is not a thought experiment — versions of this bug have shown up in real systems, repeatedly.

Integer overflow isn't a hack. It's just numbers running out of room and counting again from zero.

---

## Why This Matters For CTFs

Real binary exploitation CTF challenges almost always boil down to one or more of:

1. **Find the slot that's too small.** Look at the source code (or the disassembly) for any place a fixed-size buffer is filled from input.
2. **Count the distance from the slot to something important.** How many bytes of padding sit between the buffer and the return address? The answer tells you exactly how much to type before your "payload" starts.
3. **Decide what should land at that address.** A function you want to call. A piece of shellcode. Whatever the challenge sets up.

If you don't have the memory picture, none of those steps make sense. You can't see what's happening. The challenge looks like wizardry — type 76 garbage characters and suddenly the program prints the flag? How?

With the picture, the steps are obvious. The buffer is small. The return address is `n` bytes past the start of the buffer. The first `n` bytes are filler. The next bytes are the new return address. The rest is the payload. Simple. Mechanical.

You're not yet ready to do those steps. That's Phase 2. What you're doing today is *seeing the slots*. Once you can see them — once you can picture a stack frame with a buffer next to a return address — every binary exploitation challenge will start to look like the same shape with different details.

---

## Guided Walkthrough — A Tiny Overflow

Let's walk through one tiny example, then go to the challenge.

A function reserves two 4-byte slots: an input slot and a return address slot, sitting next to each other in memory:

```
   [ input: ____ ] [ return_addr: 0x00DEAD00 ]
        4 bytes              4 bytes
```

The user types `H`, `E`, `L`, `L`, `O` — five characters. ASCII bytes: `48 45 4C 4C 4F`.

Step by step:

- Char 1, `H` (`0x48`) — fills byte 1 of the input slot. Input is `H___`.
- Char 2, `E` (`0x45`) — fills byte 2. Input is `HE__`.
- Char 3, `L` (`0x4C`) — fills byte 3. Input is `HEL_`.
- Char 4, `L` (`0x4C`) — fills byte 4. Input is `HELL`. Slot full.
- Char 5, `O` (`0x4F`) — slot is already full. The byte spills into the *next* slot. The first byte of the return address is now `0x4F` instead of `0x00`. Return address is `0x4FDEAD00` (or whatever — the layout depends on the system, but the point is one byte has been overwritten).

Type more characters and more bytes spill, until the entire return address is gone.

That's it. That's the whole picture.

In the challenge you'll do exactly this — three panels, in order:

1. **The Memory Grid.** A 16×16 grid of bytes. Click any cell to write a value to that address. Establishes the picture: every byte has an address, you can read it, you can write to it.
2. **The Stack Visualizer.** Three function-call buttons. Each `call` pushes a plate; `return` pops one. A target stack is shown — match it by calling the functions in the right order. This earns flag fragment 1.
3. **The Overflow Demo.** A 4-byte input slot next to a 4-byte return-address slot. Type into the input. Watch what happens past the 4th character. After the entire return address has been overwritten, a hidden link appears revealing flag fragment 2.

Glue the two fragments together — fragment 1 first, fragment 2 second — to get the full flag. Submit at the bottom.

The overflow panel is a picture, not an attack. You aren't hacking anything. You're seeing why a slot too small is dangerous.

---

## Concept Card

**Key Terms**

| Term | Definition |
|------|-----------|
| Memory | The "notebook" of numbered bytes the computer can read and write while running. |
| Address | The page number in the notebook. Written in hex. Every byte has one. |
| Byte | A value 0–255. The unit of storage. Also the size of one address. |
| Stack | A region of memory used for function-call scratch space. Plates of frames stacked up. |
| Stack Frame | One plate. Holds a function's local variables and its return address. |
| Return Address | The bookmark on a frame. Where the CPU jumps when the function finishes. |
| Buffer | A fixed-size slot in memory used to hold variable-length data. |
| Buffer Overflow | Writing more data into a buffer than it can hold — the extra bytes land in whatever sits next to the buffer. |
| Integer Overflow | A counter rolling over because the value exceeded what its slot can store. |

See [`concept-cards.md`](concept-cards.md) for the full quick reference.

---

## Your Challenge

Open [`challenge/index.html`](challenge/index.html). Walk through the three panels in order. Read the briefing on each one before clicking.

When the full flag has been assembled from both fragments, submit it at the bottom.

---

## Keep Going

- Try writing a tiny C program that copies a long string into a small array. Compile with `gcc -fno-stack-protector`. Run it with a long argument. Watch it crash. (Don't run this on a system that matters — and don't try it without permission on anyone else's machine.)
- The "real" defenses against buffer overflows are stack canaries, ASLR, and non-executable stacks. You'll meet all three in Phase 2.

**Next:** [F13 — Three Languages, One Page](../F13-three-languages/README.md)

F12 gave you the picture of memory and the stack — the prerequisite for binary exploitation. F13 swings back to the web side of the world: the three languages of every webpage, and how each one can hide a flag.
