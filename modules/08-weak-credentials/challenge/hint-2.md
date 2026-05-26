# Hint 2

Common guesses (`admin/admin`, `admin/password`) may not work immediately — the password is slightly less obvious, but it's still weak.

More importantly: the credentials are right there on this page. The login form validates your input in JavaScript — and the JavaScript has to check what you type against something. That something is visible in the source.

Open **View Source** (Ctrl+U on Windows/Linux, Cmd+Option+U on Mac) and search for `password`. You're looking for the object that stores the valid usernames and passwords.

Once you find the credentials, try logging in with the `guest` account first — then look for the admin account in the same place.

---

*[← Hint 1](hint-1.md) | [Back to challenge](index.html) | [Solution →](solution.md)*
