# Module [N]: [Title]
## [Tagline — one punchy sentence]

<!-- LESSON AUTHOR NOTES
     Replace every [bracketed placeholder] with real content.
     Delete all HTML comment blocks before publishing.
     Keep the section order and headers exactly as they are —
     students will come to expect this structure across modules.
-->

**Time:** ~[X] min reading + ~[Y] min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

<!-- 2–3 paragraphs. Second person ("you are..."). 
     Frame the concept as detective/investigator/spy work.
     Age-appropriate — centers curiosity and cleverness, no violence.
     The story should make the technique feel USEFUL and INTERESTING,
     not just "here's a thing computers do."
     
     Example opening patterns:
     - "You're a digital archaeologist..."
     - "Imagine you're a museum security consultant..."
     - "Every website has two faces..."
-->

[Write the story hook here. Make it feel like the student is about to discover something cool.]

[Second paragraph: connect the story metaphor to the real concept. Don't explain the technique yet — just build the sense of "there's something hidden here that you can find."]

[Optional third paragraph: stakes. Why would a real attacker care about this? Why does a defender need to understand it?]

---

## The Concept

### [Concept Name]

<!-- Clear prose explanation. 2–3 paragraphs.
     No jargon without definition. Use analogies.
     Write for a smart 12-year-old who has never heard this term.
     
     Structure: What it is → How it works → Simple example.
-->

[What this thing is, in plain English.]

[How it works — one level of technical depth. Use an analogy if helpful.]

[A simple, concrete example. Something students can picture.]

### In Practice

<!-- A short code block, URL example, or annotated snippet
     showing the concept in its most minimal form.
     DO NOT use the actual challenge scenario here — use a different example.
-->

```html
<!-- Example: if teaching HTML comments -->
<!-- This is an HTML comment. Browsers don't show it, but it's in the source. -->
<p>This text is visible on the page.</p>
<!-- FLAG{example_only_not_real} -->
```

### Why This Matters (and Why It's a Vulnerability)

<!-- 1 paragraph. Frame from the DEFENDER's perspective:
     "This is why developers need to know about this."
     Not: "Here's how you attack things."
     
     End with: "That's why CTF challenges use this technique — 
     because it teaches you to find what's hiding in plain sight."
-->

[Real-world security implication. What mistake does this technique exploit?
What should a developer do differently to prevent this?]

---

## Guided Walkthrough

<!-- Step-by-step demo of the CONCEPT using a DIFFERENT scenario than the challenge.
     The student follows along with their browser on a site you specify,
     OR you walk through a hypothetical example they can't actually run.
     
     IMPORTANT: Do not use the challenge file here. This section teaches the skill.
     The challenge tests whether they learned it.
     
     Format: numbered steps. Each step says:
     1. What to do (action)
     2. What you should see (expected result)
-->

We'll practice this technique on [example site or hypothetical scenario].

**Step 1: [Action]**
[What to do. Be specific — which menu, which key, which tab.]
You should see: [What appears on screen.]

**Step 2: [Action]**
[What to do.]
You should see: [What appears.]

**Step 3: [Action]**
[What to do.]
You should see: [What appears — ideally the "aha moment" for this technique.]

<!-- Continue as needed. 3–6 steps is typical. -->

---

## Your Challenge

<!-- The actual CTF challenge for this module.
     Keep the narrative going — don't break the story.
-->

> **Flag format:** `FLAG{all_lowercase_with_underscores}`

[2–3 sentences of challenge narrative. Continues the story metaphor from The Story section.
Give the student a reason to care about finding the flag beyond "it's an assignment."]

**Open:** `challenge/index.html` in your browser

**Your mission:** [One sentence. Starts with a verb. Example: "Find the flag hidden in this page."]

**Rules:**
- You may use any browser tool covered in this module and all previous modules
- No automated tools or scripts
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

[Gentle directional hint. Points toward the right area without giving away the method.
Example: "The flag isn't visible on the page — but it IS in the page."]

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

[More specific. Tells them which tool or technique to use, but not exactly where.
Example: "Try pressing Ctrl+U (Windows) or Cmd+Option+U (Mac)."]

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete step-by-step walkthrough.

</details>

---

## Concept Card

<!-- Compact quick-reference. Designed to fit on half a printed page.
     Students can screenshot this or print it for future reference.
     Also lives in its own file: concept-cards.md
-->

### Key Terms

| Term | What It Means |
|------|---------------|
| [Term 1] | [Short definition — one sentence max] |
| [Term 2] | [Short definition] |
| [Term 3] | [Short definition] |

### Keyboard Shortcuts

| Action | Windows / Linux | Mac |
|--------|----------------|-----|
| [Action 1] | `Ctrl+[key]` | `Cmd+[key]` |
| [Action 2] | `[shortcut]` | `[shortcut]` |

### Quick Commands

```
[Any console commands, URL patterns, or code snippets from this module]
```

---

## Keep Going

**Practice this skill (ethically!) on:**
- [Site 1 with link] — [one sentence on what to try there]
- [Site 2 with link] — [one sentence]

<!-- Only link to intentionally vulnerable/educational sites:
     picoCTF, CTFlearn, HackThisSite, OWASP WebGoat, DVWA, TryHackMe, etc.
     Never link to real production sites as practice targets.
-->

**Next module:** [Link] — [one sentence preview of what's next]

**Extension challenge (optional):** [Brief description of a harder variant.
No solution provided — students figure it out or move on.]

---

[← Previous Module]() | [Back to Series](../../README.md) | [Next Module →]()
