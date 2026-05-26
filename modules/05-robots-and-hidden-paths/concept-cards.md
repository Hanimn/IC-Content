# Module 05 Concept Card: robots.txt & Hidden Paths

*Quick reference — keep this handy during the challenge.*

---

## Key Terms

| Term | What It Means |
|------|---------------|
| `robots.txt` | Plain text file at a website's root listing paths web crawlers should skip |
| `User-agent` | Which crawler the rule applies to — `*` means all crawlers |
| `Disallow` | Tells a crawler not to visit or index a path |
| `Allow` | Explicitly permits a path (used to override a broader `Disallow`) |
| Directory enumeration | Discovering hidden paths on a web server by guessing or reading clues |
| Security through obscurity | Using secrecy of location as protection — not a real security control |

---

## robots.txt Format

```
User-agent: *
Disallow: /admin/
Disallow: /internal/
Disallow: /staging/

User-agent: Googlebot
Disallow: /beta/
```

A `Disallow` rule asks crawlers to skip a path.
It does **not** block humans or tools from accessing that path directly.

---

## Where to Look

| Scenario | URL |
|----------|-----|
| Live website | `https://example.com/robots.txt` |
| Local Python server | `http://localhost:8080/robots.txt` |
| Local file challenge | Open `robots.txt` in the same folder as `index.html` |

---

## Common Mistakes

- **Thinking `Disallow` = blocked.** It's a request, not a lock. The files are still accessible.
- **Only reading the first few lines.** Interesting paths are often near the bottom.
- **Forgetting to check `robots.txt` at all.** It's a standard first step in web recon.
- **Confusing `robots.txt` with authentication.** A path that requires a login is protected. A path in `robots.txt` is not.

---

## What robots.txt Can Reveal

Common discoveries in real `robots.txt` files:
- Admin and dashboard paths (`/admin/`, `/wp-admin/`)
- Internal APIs (`/api/internal/`, `/api/v2/debug/`)
- Staging or test environments (`/staging/`, `/dev/`, `/beta/`)
- Backup files (`/backup-2024.zip`, `/db-export.sql`)
- Forgotten internal tools

---

*Full lesson: [lesson.md](lesson.md) | [Back to Series](../../README.md)*
