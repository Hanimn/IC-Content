# Module 07: The Form's Secret Life
## Forms carry more data than they show.

**Time:** ~30 min reading + ~25 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

You're on a checkout page. The price says £9.99. You click "Buy Now." Your browser sends that purchase to the server.

But here's what's actually happening under the hood: the £9.99 you see on screen is just a label — text in a `<p>` tag. The *real* value your browser submits is stored somewhere else: a hidden field in the form. Something like this, invisible to the naked eye but sitting right there in the HTML:

```html
<input type="hidden" name="price" value="999">
```

That's the value the server receives. Not the label you saw. If the server trusts whatever number arrives in that field without checking it against a price list, then anyone who opens the Inspector and changes `999` to `1` just bought a £9.99 item for a penny.

In 2010, a security researcher discovered that a major UK retailer's checkout stored the order total in a hidden form field. They changed it to £0.01, completed the checkout, and received a confirmation email. The order was processed. The retailer shipped the item.

This is not a sophisticated attack. It requires no tools, no experience, and no special knowledge beyond knowing how to open DevTools. It requires only one insight: hidden fields aren't hidden from the Inspector.

---

## The Concept

### What is `<input type="hidden">`?

HTML forms are built from input elements. Most of them are visible: text boxes, dropdowns, checkboxes. But there's one type that renders nothing on screen:

```html
<input type="hidden" name="price" value="4999">
```

This field doesn't appear. The user never sees it, never types into it, never knows it's there — unless they open DevTools. Developers use hidden fields to pass data along with a form submission that the user shouldn't need to interact with: an item ID, a session token, a price, a role.

The key misconception is this: **hidden from the screen is not the same as hidden from the browser.** The field exists in the DOM, exactly like any other input. The Inspector shows it. You can click it, edit it, change its value — and when the form submits, the new value is what gets sent.

### How forms work

When you click a submit button, the browser collects every `<input>` element inside the `<form>`, including hidden ones, and bundles them into a request. Each field's `name` and current `value` are sent as a pair. The server receives them and processes them.

For the checkout scenario:

```
POST /checkout
...
email=alice@example.com&price=4999&role=customer
```

The server gets `price=4999` and sees £49.99. If it uses that number to charge the card — without checking "is £49.99 actually the right price for this item?" — it will happily charge whatever price the form says.

### Finding and editing hidden inputs

The Inspector in DevTools shows the full DOM — every element, every attribute, including hidden inputs.

**Step 1:** Open DevTools (F12) and go to the Elements tab.

**Step 2:** Use the search function (Ctrl+F inside the Elements panel, or Cmd+F on Mac) and type `type="hidden"`. This highlights every hidden input in the page.

**Step 3:** Click a hidden input in the DOM tree. In the element's opening tag, you'll see the `value` attribute. Double-click it — the value becomes editable. Type a new value and press Enter.

**Step 4:** Submit the form. The form sends the value you typed, not the original value.

That's the entire technique. No tools, no code — just the Inspector you already know from Module 02.

### In Practice

Here's what the DOM looks like for a typical checkout form, as you'd see it in the Inspector:

```html
<form id="checkout-form">
  <input type="email" name="email" placeholder="your@email.com">

  <!-- These two fields are invisible on screen: -->
  <input type="hidden" name="item_id" value="PRO-ANNUAL">
  <input type="hidden" name="price" value="4999">
  <input type="hidden" name="role" value="customer">

  <button type="submit">Complete Purchase</button>
</form>
```

The user sees a single email field and a button. The DOM has five inputs. Three of them are hidden. All three are editable.

### Why This Matters (and Why It's a Vulnerability)

Hidden form fields are not a security feature. They were designed to pass state between pages in a web application — an item ID, a step number, a CSRF token — not to store sensitive values the application trusts without verification.

The mistake developers make is using hidden fields for values that affect access or price and then trusting those values server-side without re-checking them. The rule is the same as every other module in this series: **never trust data that came from the browser**. Form fields, URL parameters, cookies — all of them can be modified by the user. The server must verify them against its own authoritative source.

In a correct checkout implementation, the server would look up the price for `item_id=PRO-ANNUAL` in its own database and charge that price. Whatever number arrived in the `price` field would be ignored — or at most, validated against the database value. The hidden field might be used for routing or display, but never as the source of truth for what to charge.

That's why CTF challenges use this technique — because it teaches you to look at forms as a two-layer object: what the user sees, and what the browser actually sends.

---

## Guided Walkthrough

We'll practice finding and editing a hidden field using a hypothetical form. You can follow along by opening any webpage with a form and exploring its DOM.

**Step 1: Open a page with a form**

Open `challenge/index.html`. You should see a checkout page with a price displayed.

**Step 2: Open DevTools and go to the Elements panel**

Press F12 (or Cmd+Option+I on Mac). Click the **Elements** tab.

**Step 3: Search for hidden inputs**

In the Elements panel, press **Ctrl+F** (or Cmd+F on Mac) to open the search bar within the DOM. Type:

```
type="hidden"
```

The panel will highlight and scroll to every hidden input on the page. You should see at least two.

**Step 4: Inspect the hidden inputs**

Click on one of the highlighted elements. You'll see something like:

```html
<input type="hidden" name="price" value="4999">
```

The `name` tells you what the server will call this field. The `value` is what it will receive.

**Step 5: Edit a value**

Double-click the `value="4999"` part of the tag. It becomes an editable text field. Change `4999` to `0`. Press Enter. The DOM now shows `value="0"`.

**Step 6: Submit the form**

Click the "Complete Purchase" button on the page. The form reads the current value of every input — including the one you just edited. It submits `price=0`.

---

## Your Challenge

Helix Commerce runs a software subscription service. Their checkout page looks polished and professional. But during a security audit, you've been asked to test whether the form's hidden fields are properly validated.

Your suspicion: the form is trusting values that came from the browser. Prove it.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find and manipulate the hidden form fields to retrieve the flag.

**Rules:**
- You may use any technique covered in this module and all previous modules
- No automated tools or scripts
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The checkout page shows a price on screen — but that's just a display label. The actual value being submitted is stored elsewhere in the form. Think about what Module 02 taught you about looking beyond what's visible on the page.

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Open DevTools → Elements panel. Press Ctrl+F (search within the DOM) and search for `type="hidden"`. You'll find hidden inputs. Double-click the `value` attribute on one of them to edit it. Try setting the price to `0` and submitting. Then look for a second hidden field.

</details>

<details>
<summary>Full solution — only after you've genuinely tried</summary>

See `challenge/solution.md` for the complete step-by-step walkthrough.

</details>

---

## Concept Card

### Key Terms

| Term | What It Means |
|------|---------------|
| `<input type="hidden">` | A form field that submits data without rendering anything on screen |
| Hidden field | Shorthand for `<input type="hidden">` — invisible, but present in the DOM |
| Form submission | When a form is submitted, all fields (visible and hidden) are sent as name/value pairs |
| Parameter tampering | Changing submitted values (URL params, form fields, cookies) to alter application behaviour |
| Client-side trust | Relying on data from the browser (forms, cookies, URLs) without server-side verification |

### Finding Hidden Inputs

```
DevTools → Elements tab → Ctrl+F (search in DOM)
Type: type="hidden"
→ Jumps to each hidden input in the page
```

### Editing a Hidden Input

1. Find the `<input type="hidden" ...>` element in the DOM
2. Double-click the `value="..."` attribute text
3. Type the new value
4. Press Enter
5. Submit the form — the new value is what gets sent

### Common Mistakes

- **Editing the visible price label** instead of the hidden input — labels are `<p>` or `<span>` tags and don't affect the form submission.
- **Not pressing Enter** after editing the value in the Inspector — the change won't stick.
- **Not re-submitting the form** after editing — the form has to be submitted for the new value to be read.
- **Confusing `type="hidden"` with `display:none`** — these are different things. `display:none` hides an element visually. `type="hidden"` is a specific input type that never renders at all.

---

## Keep Going

**Practice this skill (ethically!) on:**
- [picoCTF](https://picoctf.org) — search "hidden" or "form" in the web category
- [PentesterLab](https://pentesterlab.com) — form manipulation exercises

**Next module:** [Module 08 — Weak Credentials](../08-weak-credentials/README.md) — Default passwords, manual credential testing, and the most common way systems get broken into.

**Extension challenge (optional):** Find any webpage with a visible form (a login page, a search form, a newsletter signup). Open the Inspector and examine every `<input>` element in the form — both visible and hidden. What hidden fields exist? What do their names suggest about how the application works?

---

[← Module 06: URL Parameters](../06-url-parameters/README.md) | [Back to Series](../../README.md) | [Next Module: Weak Credentials →](../08-weak-credentials/README.md)
