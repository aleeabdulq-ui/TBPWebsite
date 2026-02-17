(function(){
  const KEY = 'theme';
  const html = document.documentElement;

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyFrom(keyVal) {
    if (!keyVal) return;
    if (keyVal === 'dark') {
      html.setAttribute('data-theme', 'dark');
    } else if (keyVal === 'light') {
      html.removeAttribute('data-theme');
    } else if (keyVal === 'system') {
      if (prefersDark()) html.setAttribute('data-theme', 'dark');
      else html.removeAttribute('data-theme');
    }
  }

  // Apply on load
  try {
    const stored = localStorage.getItem(KEY);
    applyFrom(stored);
  } catch (e) {}

  // React to changes from other tabs/pages
  window.addEventListener('storage', (e) => {
    if (e.key !== KEY) return;
    applyFrom(e.newValue);
  });

  // Optional: If a page toggles theme by changing the attribute directly, mirror it back
  // (listen for clicks on known controls and write resulting state)
  document.addEventListener('click', (ev) => {
    const t = ev.target;
    if (!t) return;
    // if the page uses an element with id themeToggle, update storage after short delay
    if (t.id === 'themeToggle' || t.closest && t.closest('.theme-toggle')) {
      setTimeout(()=>{
        // prefer explicit key if present
        const current = html.getAttribute('data-theme') ? 'dark' : 'light';
        try { localStorage.setItem(KEY, current); } catch(e) {}
      }, 0);
    }
  }, true);
})();
