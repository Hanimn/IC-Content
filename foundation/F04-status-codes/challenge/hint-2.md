# F04 Challenge — Hint 2

Still stuck on the matchups? Here's a clue for each situation:

- **"Loaded perfectly"** → 2xx (specifically the most common success code — when something just works, this is what the server sends)

- **"Moved to a new domain" and "will work forever"** → 3xx (the permanent one — browsers will cache this and never ask the old URL again)

- **"Only until your session expires"** → 3xx (the temporary one — not permanent, not cached, just bouncing you to the next page for now)

- **"Not allowed in"** → 4xx (the server knows you're there and says no — this is different from the code that means "doesn't exist")

- **"Deleted years ago"** → 4xx (the classic "this page doesn't exist anymore" code)

- **"Server crashed"** → 5xx (the server tried to process your request and failed internally)

---

**After you match all six:** The flag isn't visible on the page, but it is in the page.

Remember what this module is about — when a server returns **200**, it means the full source is available. The browser shows you a rendered view; the source shows you everything.

Try View Source: press **Ctrl+U** (Windows/Linux) or **Cmd+Option+U** (Mac). Then search for the word **flag**.
