# Protecting the admin area

## The problem

The admin pages are currently public. Three separate issues:

1. **The password is published to every visitor.** `pages/admin-login.html`
   compares it in client-side JavaScript:

   ```js
   if (pwd === 'admin123') { localStorage.setItem('adminLoggedIn', 'true'); ... }
   ```

   Anyone can read it with View Source.

2. **`pages/admin-dashboard.html` has no check at all.** It loads for anyone
   who knows the URL.

3. **The check on `pages/admin-blog.html` is trivially bypassed.** It reads
   `localStorage`, so one line in the browser console grants access:

   ```js
   localStorage.setItem('adminLoggedIn','true')
   ```

**No client-side fix can solve this.** The browser is under the visitor's
control, so any check written in page JavaScript is advisory at best. The gate
has to sit in front of the file being served.

Pick whichever option matches where `thebuildingpractice.com` is hosted.

---

## Option A — Cloudflare Access (recommended if you use Cloudflare)

Free for up to 50 users, no code, and it sits in front of the origin so the
HTML is never served to an unauthenticated request.

1. Cloudflare dashboard → **Zero Trust** → **Access** → **Applications** →
   *Add an application* → **Self-hosted**
2. Application domain: `thebuildingpractice.com`, path `pages/admin-*`
3. Add a second application for `pages/blog-login.html` if you want it covered
4. **Policy**: action *Allow*, rule *Emails* → list the staff addresses
   (or *Emails ending in* → `@buildingpractice.biz`)
5. Save. Visiting an admin URL now requires a one-time PIN or SSO login.

Repeat for `www.thebuildingpractice.com` if both hostnames serve the site.

---

## Option B — Netlify

`deploy/netlify.toml` and `deploy/_headers` in this directory are ready to
copy to the repo root.

Netlify's role-based auth needs Identity, but the simplest effective control is
password protection on the admin paths:

```toml
# netlify.toml
[[redirects]]
  from = "/admin-*"
  to = "/admin-:splat"
  status = 200
  force = true
  [redirects.headers]
    Basic-Auth = "admin:CHANGE_ME_STRONG_PASSWORD"
```

For per-user logins instead of a shared password, enable **Identity** and use
role-based access with a gated function. Site-wide Basic Auth is also available
under *Site settings → Access control*.

---

## Option C — Nginx or Apache on your own server

Use `deploy/nginx-admin.conf` or `deploy/.htaccess-admin`.

Generate the password file (never commit it):

```bash
# Debian/Ubuntu: sudo apt install apache2-utils
htpasswd -c /etc/nginx/.htpasswd-tbp-admin admin
```

Then include the relevant config in your server block / directory and reload.

---

## Option D — Real sessions in the existing API

`api/server.js` is already an Express app with a MySQL pool, so this is
plausible if you want per-user accounts and an audit trail.

Sketch:

1. `users` table with `email` and `password_hash` (bcrypt or argon2 — never
   plaintext, never a hardcoded constant)
2. `POST /api/login` verifies the hash and sets an **httpOnly, Secure,
   SameSite=Strict** session cookie. Rate-limit it.
3. Middleware rejects unauthenticated requests to admin routes **and to the
   admin HTML itself**, which means serving those pages through Express rather
   than as static files
4. `POST /api/logout` clears the session

This is the most work and the most flexible. Options A–C are faster and, for a
handful of staff, usually enough.

---

## Regardless of which you choose

- **Change `admin123` everywhere it appears**, and anywhere it has been reused.
  Treat it as public knowledge — it has been in a public repository.
- Remove the hardcoded comparison from `pages/admin-login.html` once the real
  gate is in place, so it cannot mislead anyone into thinking it provides
  security.
- Keep credentials in environment variables or the host's secret store. Nothing
  in this directory should ever contain a real password.
- If the site was ever deployed with the admin pages reachable, assume the
  content behind them was readable and check for unexpected blog posts.
