# TBP Website — Verified Backlog

Replaces the 11 `TODO-*.md` files, which were stale, duplicated each other and
contradicted themselves (`TODO-BlogEnhance.md` declares "Task Complete ✅"
directly above unchecked items; `TODO-team-update.md` lists 13 files as pending
that are in fact all done).

Every item below was **checked against the code**, not copied from those files.
Verified 2026-09-27.

---

## 🔴 P0 — Security: the admin area is effectively public

This is the most serious issue in the repo and nothing in the old TODO files
mentions it.

**1. The admin password is published to every visitor.**
`pages/admin-login.html` compares the password in client-side JavaScript:

```js
if (pwd === 'admin123') { localStorage.setItem('adminLoggedIn', 'true'); ... }
```

Anyone can read it with View Source. Confirmed served in plaintext over HTTP.

**2. `pages/admin-dashboard.html` has no auth check at all.**
Zero references to `adminLoggedIn`. It loads for anyone who knows the URL.

**3. The guard on `pages/admin-blog.html` is trivially bypassed.**
It checks `localStorage.getItem('blog-auth')`. Typing one line in the browser
console grants access:

```js
localStorage.setItem('adminLoggedIn','true')
```

All four admin routes return `200` to an unauthenticated request:

| Route | Status | Guard |
|---|---|---|
| `/admin-login.html` | 200 | n/a |
| `/admin-dashboard.html` | 200 | **none** |
| `/admin-blog.html` | 200 | localStorage only |
| `/blog-login.html` | 200 | n/a |

**Why this cannot be patched client-side.** A static site served by `server.js`
has no session layer, so *any* browser-side check is cosmetic. Real options:

- **(a)** Put the admin pages behind the host's auth (Netlify Identity,
  Cloudflare Access, or HTTP Basic Auth at the reverse proxy). Least code.
- **(b)** Add a small authenticated API on top of the existing `api/server.js`
  with a server-side session cookie.
- **(c)** Drop the admin pages from the public deploy and run the CMS locally.

Until one is done, treat everything in the admin area as world-readable and
**change `admin123` wherever it is reused**.

---

## 🟠 P1 — Genuinely outstanding work

### Unify the footer (`TODO.md`)
The only item in the old backlog that is both real and unambiguous.
22 pages in `pages/`, three different footer strategies:

- **2** use `assets/footer-loader.js` — the intended approach
- **14** hardcode an inline `<footer>` block
- **6** have no footer

Inline copies: `about`, `blog`, `careers`, `careers-new`, `contact`, `index`,
`projects`, `projects-complete`, `reviews`, `services`, `services-clean`, `team`.

Migrating all of them to the loader means one place to edit. Worth noting the
loader's links are relative to the *including* page, so it only works for pages
in `pages/` — `team/` and `blog/` need a path-aware version.

### Blog post content (`TODO-BlogSingle.md`, `TODO-BlogEnhance.md`)
Slug loading **is already implemented** (`pages/blog-single.html:821` parses
`?post=` via `URLSearchParams`), so those TODOs are out of date. What is
actually missing is the writing: the 10 files in `blog/` are stubs reading
*"Placeholder post for SEO linking. Content to be added."*

This is a content job, not an engineering one.

### Missing team headshots
Five profiles fall back to initials because the images were never committed.
Confirmed absent from `main` throughout history:

`john` · `olumayowa` · `olaosebikan` · `adewunmi` · `uche`

Only visible at runtime — `js/team.js` builds these paths dynamically, so a
static link check cannot catch them. Supply the photos as
`images/team/<name>.jpg`.

---

## 🟡 P2 — Cleanup

### Delete the stale TODO files
All 11 superseded by this document.

### Resolve duplicate/competing pages
Several look like abandoned drafts. Each needs a keep-or-delete decision:

| File | Note |
|---|---|
| `test.html` | 113 KB, root, referenced by nothing, links assume it lives in `pages/` |
| `pages/projects-complete.html` | Orphan. Was truncated mid-file; repaired in PR #2 |
| `pages/projects-original.html` | Orphan, only self-referencing |
| `pages/careers-new.html` | Competes with `careers.html` |
| `pages/services-clean.html` | Competes with `services.html` |
| `js/blog-data-updated.js` | 48 lines vs 534 in `blog-data.js` |
| `js/admin-posts-restore.js` | Purpose unclear |

### Dead assets
- `images/services/civil.png` — mean alpha **0.0**, renders as nothing, referenced nowhere
- `vendor/boxicons.min.css` — referenced as a self-hosted fallback in ~12 pages but never committed. Either commit it or drop the `<link>` (the CDN copy is also loaded)

---

## ⚪ P3 — Blocked or not worth doing

### Philosophy videos (`TODO-Steps.md`)
Steps 1–3 claim completion but `videos/philosophy/` does not exist. The plan is
to download five YouTube videos with `yt-dlp` and commit ~50–100 MB of MP4.

**Recommend not doing this as specified.** Committing video to git is what
produced the 1 GB history problem already. Use YouTube embeds or a CDN/object
store instead. Also confirm the videos are actually TBP's to redistribute.

### Team profile standardisation (`TODO-team-update.md`)
Marked "6/19 complete". **Already done** — all 43 files in `team/` use the
glassmorphism template. Close it out.

### Admin dashboard theme toggle (`TODO-BlogAdmin.md`)
Blocked behind P0. Fixing a dark-mode switch on a page that needs an auth
rewrite is wasted effort — do the security work first.

---

## Suggested order

1. **P0 admin security** — decide (a), (b) or (c); everything admin-related waits on it
2. **Footer unification** — contained, mechanical, removes 14 copies of the same markup
3. **Cleanup** — delete stale TODOs, resolve the 7 duplicate files, drop dead assets
4. **Content** — blog posts and the 5 headshots, needs input from the business
