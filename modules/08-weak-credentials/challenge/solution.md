# Solution — The Lock With No Key

**Flag:** `FLAG{default_creds_are_no_creds}`

---

## The Approach

The Orion Monitor login form validates credentials using client-side JavaScript. The credentials are hardcoded directly in the source — readable by anyone who opens View Source and searches for `password`. Logging in as the admin account reveals the flag.

---

## Step-by-Step

### Step 1 — Open the challenge

Open `challenge/index.html`. You'll see the Orion Monitor login page: a clean, believable internal admin panel with username and password fields.

### Step 2 — Try obvious credentials (optional but instructive)

Try a few common combinations. They'll all return "Invalid credentials":
- `admin / admin`
- `admin / password`
- `admin / monitor`

This confirms the credentials aren't completely trivial — but they're still in the source.

### Step 3 — Read the JavaScript source

Open View Source: **Ctrl+U** (Windows/Linux) or **Cmd+Option+U** (Mac).

In the source, press **Ctrl+F** and search for `password`.

You'll find the `USERS` object in the JavaScript:

```javascript
const USERS = {
  admin: { password: 'orionadmin', role: 'admin' },
  guest: { password: 'guest',      role: 'guest' },
};
```

Two accounts. Both passwords visible.

### Step 4 — Log in as guest (optional — shows partial flag)

Back on the login page, enter:
- Username: `guest`
- Password: `guest`

The dashboard loads in "limited access" mode. The restricted panel shows a partial flag (`FLAG{default_creds_...`) and a hint: *"There's another account on this system."*

### Step 5 — Log in as admin

Click "Sign Out" to return to the login page. Enter:
- Username: `admin`
- Password: `orionadmin`

The full dashboard loads. The admin panel is unlocked and displays:

```
FLAG{default_creds_are_no_creds}
```

---

## Why This Works

The login form validates credentials in client-side JavaScript. For that check to work, the valid credentials must be present in the JavaScript — which means they're present in the page source, readable by anyone.

This is called **hardcoded credentials**: secrets written directly into code rather than stored in a secure credential store. In a real application:

- Credentials must be stored server-side (hashed and salted in a database)
- The login form submits credentials to a server endpoint over HTTPS
- The server compares the submitted password against the stored hash
- If they match, the server creates a session and returns a session cookie

In that model, the credentials are never in the client-side code. There's nothing to read in View Source.

The additional vulnerability here is that even if the credentials weren't in the source, `orionadmin` is a weak password — it's just the application name with "admin" appended. Real attackers maintain lists of application-specific default passwords and test them systematically.

---

## Series Reflection: The Pattern Across All Eight Modules

| Module | Technique | What could be changed |
|--------|-----------|----------------------|
| 01 — View Source | HTML comments | Source is always readable |
| 02 — Inspector | CSS `display:none` + `data-*` | DOM is always inspectable |
| 03 — Cookies | Cookie value swap + base64 | Cookies are always editable |
| 04 — HTTP Headers | Network tab → JSON response | HTTP is always transparent |
| 05 — robots.txt | Disallow path enumeration | robots.txt is always public |
| 06 — URL Params | Query string manipulation | URLs are always editable |
| 07 — Hidden Fields | `<input type="hidden">` edit | DOM inputs are always editable |
| 08 — Weak Creds | Hardcoded/default credentials | Source is always readable |

The common thread: **trust that comes from the browser side cannot be enforced**. The browser is the user's machine. The user can read everything in it, edit everything in it, and send whatever they like. Security must be enforced by the server — by checking credentials, sessions, and permissions against its own authoritative records, not trusting what the client sends.

---

## Defender Fix

1. **Never hardcode credentials** in client-side code (or any code that ships to users)
2. **Use server-side authentication** — submit credentials to a server endpoint, validate against a hashed password store
3. **Change defaults** — every deployed instance must have unique credentials set before going live
4. **Enforce strong passwords** — minimum length, complexity, rotation policy
5. **Consider multi-factor authentication** for any admin panel
6. **Audit regularly** — know what tools are running on your network and when their credentials were last changed

---

## Write Your Own Writeup

1. How is finding credentials in JavaScript source similar to finding a flag in an HTML comment (Module 01)? What do they have in common?
2. You found two accounts in the source. Why does having a `guest` account matter from a security perspective?
3. `orionadmin` isn't `admin/admin` — it's a slightly stronger password. Does that meaningfully change the security? Why or why not?
4. If this were a real system, what single change would have the biggest impact on its security?

---

**Congratulations — you've completed Phase 1.**

You've worked through eight modules covering the foundational techniques of web security research:
- Reading what browsers receive but don't display
- Manipulating client-side state across every storage mechanism
- Understanding the HTTP protocol layer
- Enumerating hidden paths
- Testing authentication controls

These are real skills used by security professionals every day. The difference between what you've done here and what professionals do is scope (authorised systems only) and depth (Phase 2 covers SQL injection, XSS, and more).

---

*[← Hint 2](hint-2.md) | [Back to Module](../README.md) | [Back to Series →](../../README.md)*
