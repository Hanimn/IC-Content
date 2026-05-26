# Module 06 Concept Card: URL Parameters

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| Query string | The portion of a URL after `?` — carries key/value pairs |
| URL parameter | A single `name=value` entry in a query string |
| `URLSearchParams` | JavaScript API for reading and writing query string values |
| Parameter tampering | Changing URL parameter values to alter application behaviour |
| IDOR | Insecure Direct Object Reference — accessing resources by manipulating IDs |
| Untrusted input | Any value from the user — must be validated server-side before use |

---

## URL Anatomy

```
https://example.com/page?user=guest&view=limited&debug=false
                        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                        query string
                        └─ starts with ?
                        └─ parameters separated by &
                        └─ each parameter is name=value
```

---

## Reading Parameters in JavaScript

```javascript
// Current URL: index.html?access=guest

const params = new URLSearchParams(window.location.search);
const access = params.get('access');  // → "guest"
```

---

## Editing a URL Parameter

```
Before:  challenge/index.html?access=guest
                                      ^^^^^
                              change this value

After:   challenge/index.html?access=analyst
```

1. Click the address bar
2. Edit the value after `=`
3. Press Enter — the page reloads with the new parameter

---

## Common Patterns Worth Testing

| Parameter | What to try |
|-----------|-------------|
| `?role=user` | Try `admin`, `staff`, `superuser` |
| `?id=42` | Try `1`, `0`, other numbers |
| `?debug=false` | Try `true` |
| `?access=guest` | Try `premium`, `admin`, `internal` |
| `?view=limited` | Try `full`, `all`, `unrestricted` |

---

## Common Mistakes

- **Not reading the URL.** It's the first thing to check — it's user input.
- **Forgetting to reload** after editing the address bar.
- **Not reading the JavaScript.** The JS often names the exact values it accepts.
- **Assuming "no link to it" means "inaccessible."** If the logic runs client-side, any value is reachable.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
