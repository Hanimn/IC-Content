---
title: "The Lock With No Key"
tagline: "The result is a locked door with the key taped to the front."
time: "~35 min reading + ~30 min challenge"
tier: "Tier 3: Authentication"
---
## The most common way in isn't a hack — it's a guess.

**Time:** ~35 min reading + ~30 min challenge
**Tools needed:** Web browser (Chrome or Firefox)

---

## The Story

Every system has a setup phase. A router ships from the factory with the password `admin`. A web application installs with `admin/password`. A database initialises with `root/root`. The documentation says: *change these before you deploy*. And then the chaos of a real deployment begins — there are seventeen other things to fix, the launch is tomorrow, and the password change falls off the list.

The result is a locked door with the key taped to the front.

This is not a theoretical risk. In 2016, a piece of software called Mirai infected over 600,000 internet-connected devices — cameras, home routers, digital video recorders — and used them to knock large parts of the internet offline for a day. Mirai didn't exploit any software vulnerability. It didn't use any clever technique. It logged into devices using a list of 61 default username/password combinations: `admin/admin`, `root/root`, `admin/1234`, and so on. Factory defaults that were never changed. The list fit comfortably in a text file.

No hacking required. Just patience, a list, and the assumption that people are busy.

This module introduces credential testing: finding login forms, trying common credentials, and — when those don't work — reading the source code to see if the credentials were left there by a developer who assumed no one would look.

---

## The Concept

### What are default credentials?

Most software ships with a set of credentials for the initial setup. These are documented in the product's manual, published in the vendor's support articles, and often posted in public forums. Examples:

| System | Common defaults |
|--------|----------------|
| Home routers | `admin / admin`, `admin / password` |
| WordPress | `admin / admin` (first account created) |
| Jenkins CI | `admin / [printed on first-run screen]` |
| MySQL | `root / ` (empty password) |
| Apache Tomcat | `tomcat / tomcat`, `admin / admin` |
| Many IP cameras | `admin / admin`, `admin / 12345` |

The problem isn't that these defaults exist — they have to exist for initial setup. The problem is when they're never changed. An organisation spins up a monitoring tool for internal use, gets it working with `admin/admin`, means to update the password "later," and later never comes. The tool sits on the internal network for three years. Anyone who finds the login page and tries `admin/admin` is in.

### Credential testing

Credential testing means trying known-common username/password combinations against a login form. For ethical security testing (which is what this module is about), that means:

1. Try the application's documented default credentials
2. Try common combinations: `admin/admin`, `admin/password`, `root/root`, `guest/guest`
3. Try the application name or company name as the password: `admin/orion`, `admin/company`
4. Try seasonal patterns: `admin/Winter2024`, `admin/Password1`

This is **not** the same as automated brute force (trying thousands of passwords per second), which is a different technique, carries legal risk without explicit authorisation, and is outside the scope of this series. What we're describing is methodical manual testing — trying the passwords that real administrators actually use when they're being lazy.

### Finding credentials in source code

This is where this module connects back to Module 01. Client-side JavaScript has to contain all the logic the page needs — and for a login form that validates credentials in the browser, that logic must include the credentials themselves.

A developer building a quick internal tool might write:

```javascript
if (username === 'admin' && password === 'orionadmin') {
  showDashboard();
}
```

The `'orionadmin'` is sitting right there in the source. Anyone who opens View Source and searches for `password` will find it in seconds.

This is called **hardcoded credentials** — credentials written directly into code rather than stored in a secure credential store. It's considered a critical vulnerability because:
- The credentials can never be changed without updating the code
- Anyone with access to the source (which in a browser means everyone) can read them
- The credentials are often identical across every installation of the software

### In Practice

When you encounter a login form you want to test:

```
Step 1: Try the obvious defaults
  admin / admin
  admin / password
  admin / [app-name]
  guest / guest
  root  / root

Step 2: Open View Source (Ctrl+U)
  Search for: password, pass, passwd, secret, key, credential
  Look at any JavaScript that handles the login form submission

Step 3: Check the page metadata
  Is there a version number or product name visible?
  Check the page title, footer, HTML comments, robots.txt
  A version number → look up known defaults for that version
```

### Why This Matters (and Why It's a Vulnerability)

Credentials are the most basic security control on most systems. If the credentials are known, weak, or stored insecurely, every other security measure becomes irrelevant — encryption, firewalls, audit logs all assume the person logged in is who they say they are.

Internal tools are disproportionately risky. They're set up by developers under time pressure, often on internal networks where the assumption is "only trusted people can reach this." But internal networks get breached. Employees make mistakes. A single compromised device on the internal network can reach every other internal tool — and if those tools have never had their default credentials changed, an attacker who gets inside has immediate access to everything.

The correct approach: never deploy with default credentials. Use a password manager. Enforce strong password policies. Consider multi-factor authentication for any admin panel. Regularly audit which tools are running and when their credentials were last rotated.

---

## Guided Walkthrough

We'll look at how credentials appear in client-side JavaScript — the pattern you'll encounter in the challenge.

**Step 1: Recognise the pattern**

A login form that validates client-side has JavaScript that runs when you click "Submit." It reads the username and password fields and checks them. Here's the simplest version:

```javascript
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;

  if (user === 'admin' && pass === 'admin') {
    showDashboard();
  } else {
    showError('Invalid credentials');
  }
});
```

The credentials — `'admin'` and `'admin'` — are plainly visible. You don't need any special knowledge to read them; you just need to know to look.

**Step 2: More realistic hardcoding**

Real developers often use a data structure to store multiple users:

```javascript
const USERS = {
  admin: { password: 'deploypassword2024', role: 'admin' },
  guest: { password: 'guest',              role: 'viewer' },
};
```

Same problem. Searching the source for `password` or `USERS` finds it immediately.

**Step 3: Try View Source**

Open any webpage. Press Ctrl+U (Cmd+Option+U on Mac). In the source, press Ctrl+F and search for `password`. You might be surprised what you find — even on real sites, developers sometimes leave credentials in comments or configuration objects.

---

## Your Challenge

Orion Systems built an internal network monitoring panel for their operations team. When it was first installed, the setup guide said to change the default credentials before putting it into production. That was two years ago. The tool is still running on their internal network. No one has touched it since.

You've found the login page. The credentials are somewhere. Find them and get in.

**Open:** `challenge/index.html` in your browser

**Your mission:** Find the credentials to log into the Orion Monitor admin panel and retrieve the flag.

**Rules:**
- You may use any technique covered in this module and all previous modules
- No automated tools or scripts
- Try for at least 10 minutes before opening a hint

<details>
<summary>Hint 1 — open after 10 minutes of trying</summary>

The login form is asking for credentials. You don't have them — or do you? Systems like this are often deployed with default credentials that were never changed. What are the most common default username/password combinations for internal admin panels? Try a few.

</details>

<details>
<summary>Hint 2 — open after 20 minutes of trying</summary>

Common guesses may not work. But the credentials exist somewhere on this page — the login form has to check your input against something. Open View Source (Ctrl+U / Cmd+Option+U) and search for `password`. The JavaScript that handles login must contain the credentials it's checking against.

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
| Default credentials | Username/password combinations that ship with software and are never changed |
| Hardcoded credentials | Credentials written directly into source code rather than stored securely |
| Credential testing | Manually trying known-common combinations against a login form |
| Authentication bypass | Gaining access without proper authorisation — often via default/weak creds |
| Credential stuffing | Using lists of known username/password pairs to attack many services (automated — do not do this) |

### Common Default Combinations to Try

```
admin / admin
admin / password
admin / Password1
admin / [application name]
admin / [company name]
root  / root
guest / guest
user  / user
```

### Where to Find Hardcoded Credentials

```
1. View Source (Ctrl+U) → search for: password, pass, passwd, secret, key
2. DevTools → Sources tab → read any .js files
3. HTML comments (<!-- ... -->) — Module 01 technique
4. robots.txt → listed paths may lead to config files
```

### Common Mistakes

- **Trying only one combination.** Try several before moving to source analysis.
- **Not reading the JavaScript.** The credentials must be there for a client-side login check to work.
- **Stopping at guest access.** A `guest` account with limited access often hints that an `admin` account exists with more.
- **Confusing "locked" with "secure."** A login form is only as strong as the credentials protecting it.

---

## Keep Going

**Practice this skill (ethically!) on:**
- [picoCTF](https://picoctf.org) — search "login" or "credentials" in the web category
- [TryHackMe](https://tryhackme.com) — "OWASP Top 10" room covers broken authentication
- Any home router you own — check its admin panel. Are the credentials still the factory default?

**Extension challenge (optional):** Find three devices or services in your home or school that have login pages (router admin panel, a NAS, a printer web interface). Check if any are using factory default credentials. If they are, report it to the owner — that's responsible disclosure in action.

---

[← Module 07: Hidden Form Fields](../07-hidden-form-fields/README.md) | [Back to Series](../../README.md)
