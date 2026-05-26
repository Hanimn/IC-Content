# Hint 2

The page reads an `access` parameter from the URL to decide what tier you're on. Try adding it manually:

```
index.html?access=analyst
```

That unlocks something — and what it shows you contains a clue about a higher tier that exists.

To find the highest tier's name, open DevTools and read the JavaScript (Sources tab), or use View Source. Look for where the page defines its access levels — the keyword you need is named there.

Once you have the right value, change the URL to:
```
index.html?access=KEYWORD
```

Reload the page.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
