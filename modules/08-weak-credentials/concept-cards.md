# Module 08 Concept Card: Weak Credentials

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| Default credentials | Username/password combinations that ship with software and are never changed |
| Hardcoded credentials | Credentials written directly into source code — readable by anyone with View Source |
| Credential testing | Manually trying known-common combinations against a login form |
| Authentication bypass | Gaining access without authorisation — often via default or weak credentials |
| Brute force | Automated password guessing (do NOT do this — it's illegal without explicit written permission) |

---

## Common Defaults to Try (Manual Testing Only)

```
admin   / admin
admin   / password
admin   / Password1
admin   / [app name]
admin   / [company name]
root    / root
guest   / guest
user    / user
admin   / 1234
admin   / 123456
```

---

## Finding Hardcoded Credentials

```
1. View Source (Ctrl+U / Cmd+Option+U)
   → Search for: password  pass  passwd  secret  key  cred

2. DevTools → Sources tab
   → Read JavaScript files for credential checks

3. HTML comments <!-- ... -->
   → Developers sometimes leave credentials in setup notes

4. robots.txt → listed paths
   → May lead to config files or setup pages
```

---

## The Credential Testing Workflow

```
Step 1 → Try common defaults (admin/admin, guest/guest, etc.)
Step 2 → Read the page source — search for "password"
Step 3 → Check if a guest/limited account hints at an admin account
Step 4 → Log in with the credentials you found
```

---

## Common Mistakes

- **Trying only one combination** — try several before reading the source
- **Not searching the JS** — a client-side login check must contain the credentials
- **Stopping at limited access** — a guest account often implies an admin account with more
- **Thinking "no link to the login page" = "no one will find it"** — Module 05 taught you about that

---

## Real-World Reference: Mirai (2016)

The Mirai botnet compromised 600,000+ devices using 61 default credential pairs.
No software exploits. No zero-days. Just `admin/admin` at scale.

Default credentials are not a minor oversight — they are a critical vulnerability.

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
