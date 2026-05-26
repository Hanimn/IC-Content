# F12 — Concept Cards: The Computer's Notebook

Quick reference for the key ideas in this module.

---

## Key Terms

---

**Memory**
The "notebook" the computer reads from and writes to while a program runs. Made of numbered pages, each holding a single byte (a value 0–255). Modern computers have billions of pages.

---

**Byte**
A value from 0 to 255. The unit of storage. The thing written on each page of the notebook.

---

**Address**
The page number of a byte. Written in hex (from F06). Every byte has exactly one address. Variables don't have names at runtime — they have addresses.

---

**Pointer**
A value that *is* an address. Pointers point to other bytes. On 32-bit systems they're 4 bytes; on 64-bit systems, 8 bytes.

---

**Stack**
A region of memory the program uses for function-call scratch space. Organised as a stack of plates, where each plate is a stack frame. Plates pile up as functions get called and pop off as functions return.

---

**Stack Frame**
One plate in the stack. Belongs to one running function. Holds that function's local variables, its parameters, and its *return address*. When the function finishes, the frame is popped off and gone.

---

**Return Address**
The bookmark on a stack frame. A pointer to the place in the program the CPU should jump to when the current function finishes. Without it, the program would lose its place. With it overwritten, the CPU jumps wherever the new value points.

---

**Buffer**
A fixed-size slot in memory used to hold variable-length data — usually a string or a chunk of input. Has a size the programmer chose ahead of time. The slot is *exactly* that size; it does not grow.

---

**Buffer Overflow**
What happens when a program writes more data into a buffer than the buffer can hold. The extra bytes don't get magically discarded — they land in whatever happens to sit in memory right after the buffer. On the stack, that's often the return address. The picture: a slot too small spilling into something important next door.

---

**Integer Overflow**
What happens when an arithmetic operation produces a number too big for its storage slot. The number rolls over the same way an odometer rolls from 9999 back to 0000. `255 + 1 = 0` for a 1-byte counter. Not a hack — just math wrapping.

---

## Memory As A Notebook

```
   address      value
   ─────────────────────
   0x1000       0x48      ← page 0x1000 holds the byte 'H'
   0x1001       0x45      ← page 0x1001 holds 'E'
   0x1002       0x4C      ← 'L'
   0x1003       0x4C      ← 'L'
   0x1004       0x4F      ← 'O'
   0x1005       0x00      ← null terminator
   0x1006       ...
```

Every page has a number. Every page holds one byte. Variables span multiple pages — a 4-byte int fills 4 consecutive pages.

---

## A Stack Frame, Up Close

```
   ┌──────────────────────────────┐
   │  saved registers / padding   │
   ├──────────────────────────────┤
   │  return address              │  ← THIS is the bookmark
   ├──────────────────────────────┤
   │  saved frame pointer         │
   ├──────────────────────────────┤
   │  local variable: name[4]     │  ← a 4-byte buffer
   │                              │
   ├──────────────────────────────┤
   │  local variable: counter     │
   └──────────────────────────────┘
       (top of stack)
```

The exact order varies by architecture and compiler. The picture that matters: the return address sits on the same plate as the local buffers, only a short distance away.

---

## The Picture Of A Buffer Overflow

```
   Before (slot empty):
   ┌────────────┬────────────────────┐
   │ name slot  │  return address    │
   │   ____     │     0x00DEAD00     │
   └────────────┴────────────────────┘
        4 bytes        4 bytes

   After typing "ALEX" (4 chars — perfect fit):
   ┌────────────┬────────────────────┐
   │ name slot  │  return address    │
   │   ALEX     │     0x00DEAD00     │  ← unharmed
   └────────────┴────────────────────┘

   After typing "ALEXANDER" (9 chars — 5 spill):
   ┌────────────┬────────────────────┐
   │ name slot  │  return address    │
   │   ALEX     │     ANDER...       │  ← OVERWRITTEN
   └────────────┴────────────────────┘
                 ↑
            CPU will jump to whatever
            "ANDE" (the first 4 bytes)
            is interpreted as.
```

A slot too small. Something important next door. Bytes that spill. That's the whole picture.

---

## The CTF Playbook For Stack-Based Buffer Overflows

```
1. Find a fixed-size buffer that gets filled from user input.
2. Find what sits next to it on the stack — usually a return address.
3. Count the bytes from the start of the buffer to the return address.
4. Type that many filler bytes, then a chosen address, then a payload.
5. When the function returns, the CPU jumps to your chosen address.
```

You don't need this whole playbook for F12 — you'll learn each step in Phase 2. But the picture above is what every one of those steps assumes.

---

## Common Mistakes

- **Mixing up "stack" and "the stack data structure" in code.** Both are real, both work the same way (last-in-first-out), but the *call stack* is a region of memory, not an `std::stack` you wrote in your program.
- **Thinking the return address is somehow protected by the language.** It isn't, in C. C does no bounds checking on arrays. If you write past the end of a buffer, the program writes past the end. That's the whole reason buffer overflows are possible.
- **Confusing buffer overflow and integer overflow.** Both are "overflow" but they're different ideas. Buffer overflow is too many *bytes* spilling into the next *slot* in memory. Integer overflow is a *number* too big to fit in its storage type, rolling over.
- **Picturing memory as "labelled boxes."** Memory has no labels at runtime — only addresses. The compiler erased the labels.

---

## Numbers To Know

| Value | What It Means |
|-------|---------------|
| `0x00`–`0xFF` | The full range a single byte can hold (0–255). |
| `0xFF + 1 = 0x00` | A 1-byte integer rollover. |
| `4 bytes` | A common buffer size used in tiny exploit demos and teaching examples. |
| `4 bytes` | Size of a return address on a 32-bit system. |
| `8 bytes` | Size of a return address (and any pointer) on a 64-bit system. |
| `0x46 0x4C 0x41 0x47 0x7B` | The bytes for `FLAG{` — recognise on sight, from F06. |

---

## Why The Stack Has To Have Return Addresses

If you call a function from three different places in your program, the function has to know which of those places to come back to. The CPU doesn't have telepathy — *something* has to record the answer. That something is the return address, written on the stack frame at call time and read at return time.

This is also why functions can call themselves recursively without losing track: each recursive call gets its own plate with its own return address. The stack of plates *is* the program's record of where it's been.

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
