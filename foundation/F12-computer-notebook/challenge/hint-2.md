# Hint 2

Stuck on a specific panel? Here are pointers per panel.

---

**Panel 1 (Memory Grid)** — There is no puzzle. Just click *any* three different cells and type any three different two-digit hex values into them. `01`, `42`, `FF` all work. The panel is establishing the picture, not testing you. Do three writes; it unlocks.

If your typed value isn't accepted, you might be typing more than two characters or non-hex characters. The valid range is `00` to `FF` — two characters from the set `0-9 A-F`.

---

**Panel 2 (Stack)** — The target shows the stack from bottom to top. Bottom-to-top means: first plate listed = first plate that was placed = lowest in the tower. `main` is always on the bottom and is already there for you.

So if the target is `[main] [A] [C] [B]`, you press:

1. `call A()` — A's plate lands on top of main.
2. `call C()` — C's plate lands on top of A.
3. `call B()` — B's plate lands on top of C.

After three calls your stack should read, top down: `B`, `C`, `A`, `main`. Match the target exactly and the panel reveals fragment 1.

If you make a mistake, the `return` button pops the top plate. You can also press `reset` to start fresh.

---

**Panel 3 (Overflow)** — The input slot is 4 bytes. Type any 4 characters and the slot fills exactly. Type a 5th and it lands in the *first* byte of the return-address slot, replacing the original byte. Each additional character replaces the next byte. After 4 spilled characters (so 8 typed characters total) the entire return address has been overwritten.

When that happens, watch the area below the slots — a faint link appears that wasn't there before. Click it to reveal fragment 2.

Pro tip: each character you type shows up in hex (its ASCII value) inside the slot's bytes. If you type `H`, the byte becomes `48` because `H` is `0x48` in ASCII. You learned this in F08.

---

**Combining the fragments**

Fragment 1 from Panel 2 starts with `FLAG{` and ends with an underscore.
Fragment 2 from Panel 3 ends with `}`.

Glue them together in that order, with no space between, and submit at the bottom.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
