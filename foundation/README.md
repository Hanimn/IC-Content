# Foundation Track

**16 modules · Prerequisites for CTF challenges across all five categories**

Before diving into CTF challenges, you need to know how computers work, how the internet works, how data is stored, and how secrets are kept and broken. This track covers all of it — no experience required.

---

## What's in This Track

| Module | Title | Topic | Unlocks |
|--------|-------|-------|---------|
| [F00](F00-how-computers-work/) | How Computers Actually Work | Files, programs, browsers, ethics | Everything (start here if new to IT) |
| [F01](F01-internet-works/) | The Postman Problem | DNS, packets, TCP | Web (all) |
| [F02](F02-address-book/) | The Address Book | IP addresses, ports | Web (all) |
| [F03](F03-request-response/) | The Request and the Response | HTTP requests/responses | Web (especially HTTP Headers) |
| [F04](F04-status-codes/) | The Status Code Switchboard | HTTP status codes (200/404/403…) | Web vocabulary |
| [F05](F05-number-systems/) | Everything Is a Number | Binary, hex, ASCII | Crypto, Forensics, Binary Exploitation |
| [F06](F06-thinking-in-hex/) | Thinking in Hex | Bytes, hex dumps, hex editor | Forensics, Crypto, Binary |
| [F07](F07-whats-in-a-file/) | What's in a File? | Magic bytes, file formats | Forensics |
| [F08](F08-ascii-and-encoding/) | ASCII All the Way Down | ASCII table, Base64 | Crypto, RE, Forensics |
| [F09](F09-shifting-secrets/) | Shifting Secrets | Caesar cipher, ROT13, frequency analysis | Cryptography |
| [F10](F10-xor-key/) | The XOR Key | XOR operation, XOR encryption | Crypto, Binary, Forensics |
| [F11](F11-code-to-computer/) | From Code to Computer | Source code, compilation, strings | Reverse Engineering |
| [F12](F12-computer-notebook/) | The Computer's Notebook | Memory, the stack, overflow concepts | Binary Exploitation |
| [F13](F13-three-languages/) | Three Languages, One Page | HTML / CSS / JavaScript | Phase 1 Web Modules |
| [F14](F14-one-way-door/) | The One-Way Door | Hashing, SHA-256, file integrity | Crypto, Forensics |
| [F15](F15-picture-knew-too-much/) | The Picture That Knew Too Much | EXIF metadata, LSB steganography | Forensics |

---

## Choose Your Learning Path

You don't have to do all 16 modules before starting challenges. Pick the path that matches your goal.

### Brand New to Computers? Start at F00
If you've used iPads, Chromebooks, and websites but have never thought about what's underneath — start at F00. It introduces files, programs, the browser, servers, source code, and the keyboard shortcuts every later module assumes you know.

```
F00 → (then any path below)
```

If you're already comfortable with files, folders, browsers, and the difference between source code and a running program, skip F00 and start at F01 or F05.

---

### Web Security
The fastest path to the web challenges:

```
F00 → F01 → F02 → F03 → F04 → F13 → Module 00 → Module 01
```

F01–F04 cover DNS, IP addresses, HTTP, and status codes. F13 covers HTML/CSS/JavaScript — the three languages every webpage is built from. With F13 in your toolkit, Phase 1 Module 01 (View Source) and Module 02 (DOM Inspector) make sense from the first paragraph.

---

### Forensics
Forensics challenges involve digging through files, images, and data to find hidden information:

```
F00 → F05 → F06 → F07 → F08 → F14 → F15
```

Build up from number systems and hex (F05–F06), file formats (F07), encoding (F08), then add file integrity verification (F14) and metadata + steganography (F15).

---

### Cryptography
Crypto challenges involve decoding ciphers, breaking encryption, and working with hashes:

```
F00 → F05 → F06 → F08 → F09 → F10 → F14
```

Build from binary/hex (F05–F06), encoding (F08), classical ciphers (F09), XOR (F10), then hashing (F14) — the one cryptographic primitive that doesn't have a reverse function.

---

### Reverse Engineering
RE challenges involve reading code, understanding compiled programs, and extracting information from binaries:

```
F00 → F05 → F06 → F08 → F11
```

Number systems and encoding are the foundation. F11 then connects them to actual programs — what compilation produces, why strings still survive, and how to find them.

---

### Binary Exploitation
Binary exploitation involves manipulating how programs execute — overflows, shellcode, memory corruption:

```
F00 → F05 → F06 → F10 → F11 → F12
```

You need binary arithmetic, hex, XOR, the source-vs-binary distinction (F11), and a memory model with the stack (F12) before any real BinExp module makes sense.

---

### Everything (Recommended for Beginners)
Go straight through in order:

```
F00 → F01 → F02 → F03 → F04 → F05 → F06 → F07 → F08 → F09 → F10 → F11 → F12 → F13 → F14 → F15
```

Takes roughly 8–10 hours total. After this, every CTF category is open.

---

## Dependency Map

The modules build on each other. This diagram shows what each module requires:

```
F00 ──┬──→ F01 ──→ F02 ──→ F03 ──→ F04 ──→ F13          (Group A: Web → Phase 1)
      │
      └──→ F05 ──→ F06 ─┬──→ F07 ──→ F15                (Group C: Files / Forensics)
                        │
                        ├──→ F08 ─┬──→ F09 ──→ F10      (Group D: Secrets)
                        │         │              │
                        │         └──→ F14       │
                        │                        │
                        └──→ F11 ──→ F12  ←──────┘     (Group E: Programs / BinExp)
```

F00 has no prerequisites — it's the universal entry point for anyone new to IT.
F01 and F05 each have F00 as their only prerequisite (or none, if you already have the basics).

---

## Module Groups

### Group Z — Pre-flight
*Aesthetic: Soft slate (`#1a1d24`) with cool blue (`#a0c4e8`) — clean, explanatory, system sans-serif. Feels like onboarding, not a puzzle yet.*

| | |
|---|---|
| **F00** | Before you can take something apart, you need to know what it's made of. Files, programs, browsers, servers, source code, ethics — the universal entry point. |

---

### Group A — How the Internet Works
*Aesthetic: Deep navy (`#060d1a`) with cyan (`#00d4ff`) — the feeling of data moving through the network.*

| | |
|---|---|
| **F01** | Every website visit starts with your browser asking "where does this domain live?" — then sending packets to the answer. |
| **F02** | Every device on the internet has a numeric address. Some are private. Some are public. One always points home. |
| **F03** | Every page you've ever loaded started with a question (request) and an answer (response). Both have structure. |
| **F04** | 200 means yes. 404 means lost. 403 means no. The server is always talking — learn its language. |
| **F13** | Every webpage is three languages stacked: bones (HTML), paint (CSS), brain (JavaScript). If you only see one, you only see a third of the story. |

---

### Group B — How Computers Think
*Aesthetic: Retro terminal green (`#0a0f0a` / `#33ff33`) — the original hacker aesthetic.*

| | |
|---|---|
| **F05** | Computers don't know what "A" is. They only know 65. And 65 is `01000001` in binary. |
| **F06** | Two hex digits can represent any byte (0–255). That's why everyone in security reads hex. |

---

### Group C — How Files Work
*Aesthetic: Warm amber (`#100c04` / `#e8a820`) — the color of old filing cabinets.*

| | |
|---|---|
| **F07** | Your computer doesn't trust filenames. It reads the first few bytes instead. Those bytes identify the format. |
| **F08** | Every letter is a number. Groups of numbers become Base64 — binary data disguised as printable text. |
| **F15** | A photo isn't just pixels. There's a notebook of metadata behind it, and sometimes a hidden message inside the pixels themselves. |

---

### Group D — The Language of Secrets
*Aesthetic: Parchment dark (`#0e0a06` / `#c8a870`) — aged paper, spy dossiers, hidden messages.*

| | |
|---|---|
| **F09** | Julius Caesar encrypted his battle plans with a shift. Modern computers crack it in milliseconds. Let's learn why. |
| **F10** | XOR is the Swiss Army knife of cryptography. Apply it twice and you're back where you started. That's either a superpower or a fatal flaw. |
| **F14** | Encryption is a door with a key. Hashing is a door with no door. Hashes are fingerprints — same input always gives the same output, change one byte and the output changes everywhere. |

---

### Group E — Programs and Memory
*Aesthetic: Graphite (`#0d0d12`) with steel blue (`#7fb8ff`) — the inside of a machine.*

| | |
|---|---|
| **F11** | A program is words you can read. A binary is the same words after a translator gets done with them — but pieces always slip through. |
| **F12** | Every byte the computer remembers lives at a numbered desk. Sometimes the wrong byte ends up at the wrong desk. That's how memory bugs happen. |

---

## Aesthetics Summary

| Group | Modules | Palette | Font |
|-------|---------|---------|------|
| Z (Pre-flight) | F00 | `#1a1d24` slate / `#a0c4e8` soft blue | sans-serif |
| A (Web) | F01–F04, F13 | `#060d1a` / `#00d4ff` cyan | Courier |
| B (Numbers) | F05, F06 | `#0a0f0a` / `#33ff33` green | Courier |
| C (Files) | F07, F08, F15 | `#100c04` / `#e8a820` amber | Courier |
| D (Secrets) | F09, F10, F14 | `#0e0a06` / `#c8a870` gold | Georgia serif |
| E (Programs) | F11, F12 | `#0d0d12` graphite / `#7fb8ff` steel | Courier |

---

## Flags

Each module has a challenge with a flag. Collect them all.

| Module | Flag |
|--------|------|
| F00 | `FLAG{the_machine_is_just_files_and_rules}` |
| F01 | `FLAG{packets_find_the_way}` |
| F02 | `FLAG{localhost_is_home_127}` |
| F03 | `FLAG{headers_tell_the_story}` |
| F04 | `FLAG{200_ok_youre_in}` |
| F05 | `FLAG{b1n4ry_1s_b4s1c}` |
| F06 | `FLAG{0x_bytes_everywhere}` |
| F07 | `FLAG{magic_bytes_never_lie}` |
| F08 | `FLAG{ascii_and_base64_decoded}` |
| F09 | `FLAG{rotate_and_reveal_13}` |
| F10 | `FLAG{xor_undoes_itself_0x21}` |
| F11 | `FLAG{strings_survive_compilation}` |
| F12 | `FLAG{the_stack_remembers_where_to_go_back}` |
| F13 | `FLAG{html_css_js_three_layers}` |
| F14 | `FLAG{75236d9b9eb82460}` (derived at runtime from `sha256("orion-gui-binary")[:16]`) |
| F15 | `FLAG{look_in_the_metadata_and_below_the_pixels}` |

---

## After This Track

Once you've completed the Foundation modules relevant to your path, you're ready for the main curriculum:

- **[Module 00 — Orientation](../modules/00-orientation/)** — Start here before Module 01
- **[Modules 01–08](../modules/)** — Phase 1: Web Security fundamentals

---

*All challenges in this track run directly in your browser via `file://` — no server, no installation, no account required.*
