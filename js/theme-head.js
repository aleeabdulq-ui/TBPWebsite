(function () {
  try {
    var stored = localStorage.getItem('theme') || localStorage.getItem('adminThemePreference') || 'system';
    var isDark = stored === 'dark' || (
      stored === 'system' &&
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    document.documentElement.dataset.themeChoice = stored;
  } catch (e) {}
})();
