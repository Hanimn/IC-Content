# Solution — The Form's Secret Life

**Flag:** `FLAG{hidden_fields_are_not_hidden}`

---

## The Approach

The checkout form contains two hidden inputs — invisible on screen, but present in the DOM and editable with DevTools. The form's JavaScript reads these values on submission and decides what to show based on them. Editing the values before submitting bypasses the "normal" checkout flow entirely.

---

## Step-by-Step

### Step 1 — Open the challenge

Open `challenge/index.html` in your browser. You'll see the Helix Commerce checkout page: a product summary, an email and name field, and a "Complete Purchase — £49.99" button.

Try clicking the button without changing anything. You get a "Thank you for your purchase" message — no flag.

### Step 2 — Find the hidden inputs

Open DevTools (F12) and click the **Elements** tab.

Press **Ctrl+F** (Windows/Linux) or **Cmd+F** (Mac) to open the search bar inside the Elements panel. Type:

```
type="hidden"
```

The panel highlights two hidden inputs in the form:

```html
<input type="hidden" name="price" value="4999">
<input type="hidden" name="role"  value="customer">
```

`4999` is the price in pence (£49.99). `customer` is the access role.

### Step 3 — Edit the price field

Click on the price input in the Elements panel to select it. Find the `value="4999"` attribute in the tag. **Double-click** on `4999` — it becomes editable. Type `0`. Press **Enter**.

The DOM now shows:
```html
<input type="hidden" name="price" value="0">
```

### Step 4 — Submit and read the result

Click "Complete Purchase." The form reads `price=0` and processes it. A result panel appears:

- "Order processed — Total charged: £0.00"
- The beginning of the flag: `FLAG{hidden_fields_...`
- A hint: *"Look at the other hidden field. What happens if `role` isn't `customer`?"*

### Step 5 — Edit the role field

Back in the Elements panel, find:
```html
<input type="hidden" name="role" value="customer">
```

Double-click `customer`. Change it to `admin`. Press **Enter**.

### Step 6 — Submit again

Click "Complete Purchase" again. The form reads `role=admin`. The admin panel appears with the full flag:

```
FLAG{hidden_fields_are_not_hidden}
```

---

## Why This Works

Hidden inputs are a standard HTML mechanism for passing data with a form — they were never designed to be secret or tamper-proof. They're "hidden" in the sense that they don't render a visual element, but they exist in the DOM exactly like any other input. DevTools shows all DOM elements regardless of how they're displayed (or not displayed).

The JavaScript that processes this form reads the current value of each input at the moment of submission — whatever value is in the DOM at that point. Editing the DOM before submitting changes what the form sends.

In a real application, this pattern is exploited to:
- **Manipulate prices** — change the submitted total to reduce payment
- **Escalate roles** — change `role=customer` to `role=admin` for access to restricted features
- **Bypass feature gates** — change hidden flags that control what the server allows
- **Tamper with IDs** — change a hidden `user_id` to access another user's data (IDOR)

---

## Defender Fix

The rule is the same as every module in this series: **never trust data that came from the browser**.

For price:
- The server should look up the price for the submitted `item_id` in its own database
- It should charge that price — ignoring whatever `price` value arrived in the form
- At most, validate that the submitted price matches the database price and reject the request if not

For role:
- The server should read the user's role from the authenticated session (set at login, stored server-side)
- A `role` field in a form submission should be ignored for access control decisions entirely

The hidden field can still exist for routing or display purposes — but it must never be the source of truth for security-sensitive logic.

---

## Comparing to Previous Modules

| Module | What you changed | Where it was stored |
|--------|-----------------|---------------------|
| 02 — Inspector | CSS `display:none` element | DOM visibility |
| 03 — Cookies | `membership` cookie value | Browser cookie store |
| 06 — URL Params | `?access=` URL parameter | Address bar |
| 07 — Hidden Fields | `<input type="hidden">` value | DOM form element |

Same root vulnerability each time: the application trusted a value that came from the browser without verifying it server-side.

---

## Write Your Own Writeup

1. What made the hidden fields invisible on screen — and what made them visible to you?
2. How is this vulnerability similar to what you found in Module 03 (cookies)? How is it different?
3. The hint about the `role` field appeared after you manipulated the price. Why might a developer have set it up that way — and is that a good approach?
4. If you were reviewing this codebase, what's the one-line fix that would make this form safe?

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Next Module →](../../08-weak-credentials/README.md)*
