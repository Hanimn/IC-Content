# Classroom Setup Guide

---

## Device Requirements

**Minimum:** Any device with a modern web browser (Chrome 90+ or Firefox 88+).
- Chromebooks, Windows laptops, Macs all work
- iPads work for most modules (Modules 06–07 are easier with a keyboard)
- Phones work but are not recommended — DevTools access is limited

**For Module 04 (HTTP Headers):** The instructor's machine needs Python 3 installed, or the module must be deployed to a static host in advance. See [deployment-guide.md](deployment-guide.md).

**No accounts required** for Modules 00–03, 05–08 when run locally.

---

## Session Structures

### Single Period (45–50 min)
Best fit: Modules 00, 01, 05, or 06. These are shorter and self-contained.
- 10 min: Introduce the concept and ethical context
- 15 min: Students read the lesson independently
- 20 min: Challenge time
- 5 min: Debrief — who found the flag? What technique did they use?

### Double Period or 90-Minute Block
Best fit: Modules 02, 03, 04, 07, or 08. These have more depth.
- 10 min: Concept introduction
- 20 min: Lesson reading + guided walkthrough
- 45 min: Challenge time (with instructor circulating)
- 15 min: Full debrief, writeup time, peer explanation

### Multi-Day Unit
For deeper engagement, pair each module with a written reflection:
- Day 1: Lesson + challenge
- Day 2: Complete the CTF notebook writeup template (in solution.md)
- Day 3 (optional): Students explain their solution to a partner

---

## Browser Differences by Module

Chrome and Firefox both work. These are the key differences to know:

| Module | Tool | Chrome | Firefox |
|--------|------|--------|---------|
| 01 | View Source | `Ctrl+U` / Right-click → View Page Source | Same |
| 02 | Inspector | F12 → Elements | F12 → Inspector |
| 03 | Cookies | F12 → Application → Cookies | F12 → Storage → Cookies |
| 04 | Network Tab | F12 → Network | F12 → Network |
| 02–04 | Open DevTools | F12 or `Ctrl+Shift+I` | F12 or `Ctrl+Shift+I` |
| 02 | Inspect Element | Right-click → Inspect | Right-click → Inspect Element |

**Recommendation:** Standardize on Chrome if possible. The Application tab (Module 03) is slightly more accessible in Chrome than Firefox's Storage tab.

---

## Changing Flag Values

Before assigning challenges to students, change the flag values so flags can't be found by looking up the series online.

**How to do it:**
1. Open `modules/[N]-[name]/challenge/index.html` in a text editor
2. Find the line near the bottom: `const FLAG = "FLAG{...}";`
3. Replace the value with your own flag string, e.g. `FLAG{my_class_spring_2026}`
4. Save the file

Flag values can be anything. Using a class-specific flag (with your school name, date, or inside joke) makes it feel more personal and harder to Google.

---

## Assessment Approach

### Grading Breakdown (suggested)
- **Flag capture (40%):** Did they find the flag? Binary — yes or no.
- **Written reflection (40%):** Did they complete the CTF notebook entry (from solution.md template)?
- **Peer explanation (20%):** Can they explain their approach to a classmate in plain English?

### What Good Looks Like
A strong submission explains *why* the technique works, not just the steps taken. A student who writes "I pressed Ctrl+U and saw the flag in a comment" has done less thinking than one who writes "the flag was in an HTML comment, which developers sometimes use to leave notes that they forget to remove before publishing."

### Portfolio Option
For a longer unit, have students maintain a "CTF notebook" — a document collecting all their writeup entries. By Module 08, they'll have documented 8 different vulnerability techniques in their own words. This is directly transferable to real security work.

---

## Discussion Questions (by module)

Use these for class debrief or as writing prompts:

**Module 00:**
- Why would someone hold a Capture the Flag competition? What do participants get out of it?
- Why does the ethical pledge come before any technical content?

**Module 01 (View Source):**
- Why do browsers show you the source code at all? Couldn't they hide it?
- If a developer leaves a password in an HTML comment, whose fault is it if someone finds it?

**Module 02 (Browser Inspector):**
- Is hiding content with CSS (`display:none`) ever a legitimate security measure? Why or why not?
- If you can change what a webpage shows by editing the DOM, why can't you use that to change the price of something you're buying?

**Module 03 (Cookies):**
- A website stores your login status in a cookie on your computer. What's one risk of this approach?
- What's the difference between a cookie and a password?

**Module 04 (HTTP Headers):**
- Why would a server send extra information in response headers? What legitimate uses exist?
- What information should a server *not* put in headers?

**Module 05 (robots.txt):**
- Why does robots.txt exist? What problem was it designed to solve?
- "Security through obscurity" means hiding something instead of securing it. Can you think of a real-world (non-computer) example of this failing?

**Module 06 (URL Parameters):**
- If changing `?user=guest` to `?user=admin` in a URL gives you admin access, is that the user's fault or the developer's fault?
- What is the difference between checking user identity on the client side vs. the server side?

**Module 07 (Hidden Form Fields):**
- Why can't a developer trust any data that comes from a form submission?
- Where should the real validation happen — in the browser or on the server?

**Module 08 (Weak Credentials):**
- What makes a password "weak"? How would you define it?
- If you found a login page with `admin/admin` credentials on a real website you use, what would you do?
