# Hint 1

The visible page is just paint and friendly text — none of the flag fragments are actually drawn on screen. That's deliberate. The whole point of this module is that secrets can hide in places the rendered page never shows.

Your first move should be the one you learned in F04 and at the start of this lesson:

> **View Source.** Press `Ctrl+U` (Windows / Linux) or `Cmd+Option+U` (Mac).

A new tab will open with the raw source of the page. Now you can see *everything* the browser received — including the parts that don't render: HTML comments, the entire `<style>` block, and the entire `<script>` block.

Press `Ctrl+F` in the source tab and search for the word `Fragment`. You'll find more than one hit. Each hit is a clue.

The flag is split into three pieces — one in each language. Find all three, and stick them together in the order they appear in the source.

---

*[Back to challenge](index.html) | [Hint 2 →](hint-2.md)*
