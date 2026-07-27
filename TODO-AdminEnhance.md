# TBP Website Admin Dashboard Enhancement TODO

## Approved Plan Steps

### 1. ✅ Create this TODO.md (DONE)

### 2. ✅ Confirm admin-login.html exists
- Exists in pages/ with password 'admin123' (verified contents)

### 3. ✅ Enhanced pages/admin-dashboard.html 
- Added login session check (redirects to admin-login.html if not logged in)
- Fixed theme toggle (working dark/light switch)
- Logout now clears both sessions & redirects to login
- Removed redundant theme-sync.js reference (inline handles it)

### 4. ✅ Started local server
- npx live-server pages/ --port=8080 --open=admin-login.html (running)
- Access: http://127.0.0.1:8080/admin-login.html

### 5. Next: Test flow & Chart.js upgrade

### 6. Update TODO files

### 7. Open enhanced dashboard (via server)

**Progress: Steps 3-4 complete. Test: Login with 'admin123' -> Dashboard shows posts/analytics/editor/logout working.**
