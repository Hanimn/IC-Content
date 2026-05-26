# Hint 1

The challenge has three panels and they unlock in order. You have to finish each one before the next one becomes interactive.

**Panel 1 — Memory Grid:** Click any cell. A small input pops up. Type two hex digits (`00` to `FF`) and press Enter. The cell updates. Do this on three different cells with three different values. The panel will mark itself complete and Panel 2 will unlock.

**Panel 2 — Stack:** A target sequence is shown at the top, like `[main] [A] [C] [B]`. The bottom of the target (`main`) is already on the stack for you. Press the `call` buttons in the order shown — left to right, top to bottom — to push plates that match. When your stack matches the target exactly, the panel unlocks flag fragment 1.

**Panel 3 — Overflow:** Type into the input box. The first 4 characters fill the input slot. The 5th and beyond *spill into the next slot*. Keep typing until the entire return-address slot has been overwritten. A hidden link will appear — click it to reveal flag fragment 2.

The full flag is fragment 1 followed by fragment 2, glued together with no spaces.

---

*[Back to challenge](index.html) | [Hint 2 →](hint-2.md)*
