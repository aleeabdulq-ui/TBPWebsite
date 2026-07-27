// Legacy admin helper.
// The maintained blog admin lives at pages/admin-blog.html.
(function () {
  'use strict';

  const hasBlogAuth = Boolean(localStorage.getItem('blog-auth'));
  const hasLegacyAuth = localStorage.getItem('adminLoggedIn') === 'true';

  if (hasBlogAuth || hasLegacyAuth) {
    if (!hasBlogAuth && hasLegacyAuth) {
      localStorage.setItem('blog-auth', JSON.stringify({
        email: 'legacy-admin',
        loginTime: new Date().toISOString(),
        sessionId: Math.random().toString(36).slice(2)
      }));
    }
    window.location.href = 'admin-blog.html';
  } else {
    window.location.href = 'blog-login.html';
  }
})();
