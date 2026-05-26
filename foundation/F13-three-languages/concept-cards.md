# Concept Cards — F13: Three Languages, One Page

Quick reference for the key terms and ideas in this module.

---

## The Three Layers

| Layer | Language | Job | Analogy |
|---|---|---|---|
| 1 | **HTML** | Structure: what elements exist, in what order | Bones |
| 2 | **CSS** | Appearance: colours, sizes, spacing, what's hidden | Paint |
| 3 | **JavaScript** | Behaviour: what happens on click, load, key press | Brain |

A complete webpage uses all three. A CTF flag can hide in any of them.

---

## HTML — Key Terms

| Term | Definition |
|---|---|
| **Tag** | Code in angle brackets that labels a piece of content. Most come in pairs: `<p>...</p>` |
| **Element** | A complete tag plus its content. `<p>Hello</p>` is one paragraph element |
| **Attribute** | Extra info on an opening tag, written `name="value"`. Example: `<a href="...">` |
| **Self-closing tag** | A tag that doesn't wrap content. Examples: `<img>`, `<br>`, `<input>` |
| **Nesting** | Putting tags inside other tags. `<div><p>Hi</p></div>` |
| **HTML comment** | `<!-- ignored by the browser -->` — invisible on screen, visible in source |
| **`<head>`** | The top section of an HTML page. Holds title, styles, scripts. Not visible content |
| **`<body>`** | The visible content of the page |

### Common HTML Tags

```html
<h1>Title</h1>            <!-- biggest heading -->
<h2>Subtitle</h2>         <!-- second-level heading -->
<p>Paragraph text</p>     <!-- a paragraph -->
<a href="url">link</a>    <!-- a clickable link -->
<img src="..." alt="...">  <!-- an image -->
<button>Click</button>    <!-- a button -->
<div>...</div>            <!-- a generic container -->
<span>...</span>          <!-- a generic inline marker -->
<input type="text">       <!-- a text box -->
<!-- a comment -->
```

---

## CSS — Key Terms

| Term | Definition |
|---|---|
| **Selector** | The thing on the left of a rule — picks which elements get styled |
| **Property** | The thing being changed (e.g. `color`, `font-size`, `background`) |
| **Value** | What you're changing it to (e.g. `red`, `18px`, `blue`) |
| **`<style>` block** | A `<style>...</style>` tag that holds CSS inside an HTML page |
| **CSS comment** | `/* ignored by the browser */` — different syntax from HTML comments |
| **Pseudo-element** | `::before` or `::after`. Lets CSS create content not in the HTML |
| **`content:`** | A CSS property used with pseudo-elements to inject text |

### Selector Syntax (Memorise These)

| Selector | Means |
|---|---|
| `p` | every `<p>` element |
| `.login` | every element with `class="login"` |
| `#title` | the (one) element with `id="title"` |
| `div p` | every `<p>` inside a `<div>` |
| `.warning::before` | the `::before` pseudo-element of every `.warning` |

### Ways CSS Can Hide Content

| Trick | What it does |
|---|---|
| `display: none;` | Removes element from layout entirely |
| `visibility: hidden;` | Element takes up space but is invisible |
| `opacity: 0;` | Element is fully transparent |
| `color: white;` (on white bg) | Text is the same colour as the background |
| `position: absolute; left: -9999px;` | Element is shoved off-screen |

All of these hide visually but the content remains in the source.

---

## JavaScript — Key Terms

| Term | Definition |
|---|---|
| **Variable** | A named box that holds a value: `let name = "value";` |
| **Function** | A reusable block of code: `function doIt() { ... }` |
| **Event listener** | Code that runs when something happens (click, keypress, etc.) |
| **`<script>` block** | A `<script>...</script>` tag holding JavaScript inside an HTML page |
| **`document`** | The JavaScript object representing the whole page (the DOM) |
| **DOM** | Document Object Model — the live tree of elements the browser keeps in memory |

### Syntax to Recognise

```javascript
let secret = "abc";              // declare a variable
const FLAG = "FLAG{...}";        // const = a variable that can't be reassigned

function reveal() {              // define a function
  console.log(secret);
}
reveal();                        // call (run) the function

document.getElementById('btn')   // find element by id
  .addEventListener('click', function() {
    // this code runs when btn is clicked
  });

// single-line comment
/* multi-line
   comment */
```

---

## The Three Comment Syntaxes (DON'T MIX THESE UP)

| Language | Comment syntax |
|---|---|
| HTML | `<!-- comment -->` |
| CSS | `/* comment */` |
| JavaScript | `// single line` or `/* multi line */` |

If you put `<!-- -->` inside CSS or JS, it breaks. If you put `//` inside HTML, it does nothing.

---

## View Source vs DevTools

| Tool | Shortcut | What it shows |
|---|---|---|
| **View Source** | `Ctrl+U` (Win/Linux) / `Cmd+Option+U` (Mac) | The original HTML the server sent. Static |
| **DevTools** | `F12` or `Ctrl+Shift+I` | The live DOM, current state, including JS changes |

For F13 you only need View Source. DevTools is the next module (Phase 1 Module 02).

---

## DOM — One Sentence

> The DOM is the live tree of elements the browser keeps in memory; JavaScript can change it after the page has loaded, which means **what View Source shows you may differ from the page you're currently looking at**.

---

## Common Mistakes

- **Confusing HTML and CSS comments.** `<!-- -->` only works in HTML. Inside `<style>` or `<script>`, you need `/* */`.

- **Thinking `display: none` deletes content.** It doesn't. The text is still in the HTML source — it just isn't drawn on screen.

- **Assuming View Source = the current page.** It doesn't. View Source shows the original HTML; JavaScript may have changed the page since then. (For static pages with no JS, they match.)

- **Looking for CSS-injected text in the HTML.** Text added by `content: "..."` in a CSS rule isn't in the HTML at all — it lives only in the `<style>` block. You have to read the CSS to find it.

- **Forgetting that JS can run later.** A flag might only be set when a button is clicked. Reading the variable's initial value won't show the flag — you have to find the click handler and read what it assigns.

---

## Numbers and Shortcuts to Know

| Action | Windows / Linux | Mac |
|---|---|---|
| View Page Source | `Ctrl+U` | `Cmd+Option+U` |
| Find in page | `Ctrl+F` | `Cmd+F` |
| Open DevTools (later) | `F12` | `Cmd+Option+I` |
| New tab | `Ctrl+T` | `Cmd+T` |

---

*[← Back to Lesson](lesson.md) | [Challenge →](challenge/index.html)*
