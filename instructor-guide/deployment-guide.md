# Deployment Guide

How to serve challenge files so students can access them.

---

## Tier A Challenges: Open Directly in Browser

Most challenges in this series (Modules 00–03, 05–08) are **Tier A** — pure JavaScript, no server required. They work by opening the HTML file directly from the filesystem.

**Students open the file like this:**
1. Download or receive the challenge folder
2. Double-click `challenge/index.html`, or
3. In the browser, File → Open → navigate to `index.html`

The URL in the browser will start with `file://...` — that's normal and expected.

**What to give students:** The entire module folder, or just the `challenge/` subfolder if you want to keep the lesson and solution separate.

---

## Tier B Challenges: Require an HTTP Server

**Module 04 (HTTP Headers)** is **Tier B** — it requires a real HTTP server because:
- Custom response headers only exist over HTTP/HTTPS, not `file://`
- The challenge teaches students to read headers, so the headers must actually be sent

### Option 1: Python One-Liner (classroom / local use)

If Python 3 is installed on the instructor's machine:

```bash
cd modules/04-http-headers/challenge
python3 -m http.server 8080
```

Then students visit: `http://localhost:8080`

**Requirements:** Python 3 (free, available at python.org). Pre-install before class.
**Limitation:** Only works on the local machine or local network.

For students to access it over a school network:
```bash
python3 -m http.server 8080 --bind 0.0.0.0
```
Then students visit: `http://[instructor-ip]:8080` (find the IP with `ipconfig` on Windows or `ifconfig` on Mac)

### Option 2: GitHub Pages (permanent hosting)

1. Fork or copy this repository to your GitHub account
2. Go to Settings → Pages → Source: Deploy from branch → `main` → `/` (root)
3. GitHub will give you a URL like `https://yourusername.github.io/IC-Content/`
4. Students open: `https://yourusername.github.io/IC-Content/modules/04-http-headers/challenge/`

**For custom response headers on GitHub Pages**, add a `_headers` file at the repo root:

```
/modules/04-http-headers/challenge/secret-data.json
  X-Secret-Flag: FLAG{your_flag_here}
  Access-Control-Allow-Origin: *
```

**Note:** GitHub Pages does not natively support custom headers. Use Netlify (below) for reliable header support.

### Option 3: Netlify (recommended for Module 04)

1. Create a free Netlify account at netlify.com
2. Drag and drop the entire `IC-Content` folder onto the Netlify deploy area
3. Create a `_headers` file at the repo root (see format above)
4. Netlify will deploy it with custom headers working correctly
5. Students get a public URL like `https://your-site.netlify.app/`

**Cost:** Free tier supports this use case.

---

## Keeping Flags Secret

If you deploy to GitHub Pages or Netlify, the source code is publicly accessible — including the `FLAG` constant in each `challenge/index.html`.

To keep flags meaningful:
1. Change the `FLAG` constant in each challenge *before* deploying (see [classroom-setup.md](classroom-setup.md))
2. Use class-specific flags (e.g., `FLAG{ms_johnson_period3_spring2026}`)
3. Deploy to a private URL or require a login for the deployment (advanced)

For most classroom use, changed flag values are sufficient. Students looking up the flag defeats the purpose anyway — but using custom flags removes the temptation.

---

## File Structure for Deployment

When deploying the full series to a static host, the directory structure maps directly to URLs:

```
IC-Content/                                → https://your-site.com/
  modules/
    01-view-source/
      challenge/
        index.html                         → https://your-site.com/modules/01-view-source/challenge/
    04-http-headers/
      challenge/
        index.html                         → https://your-site.com/modules/04-http-headers/challenge/
        secret-data.json                   → https://your-site.com/modules/04-http-headers/challenge/secret-data.json
```

No build step required — this is entirely static HTML, CSS, and JavaScript.
