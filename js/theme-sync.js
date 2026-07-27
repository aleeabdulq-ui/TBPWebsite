(function () {
  const KEY = 'theme';
  const LEGACY_ADMIN_KEY = 'adminThemePreference';
  const VALID = new Set(['light', 'dark', 'system']);
  const GLOBAL_TOGGLE_ID = 'tbpGlobalThemeToggle';
  const html = document.documentElement;

  function prefersDark() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function normalize(value) {
    return VALID.has(value) ? value : 'system';
  }

  function getStoredTheme() {
    try {
      const theme = localStorage.getItem(KEY);
      if (VALID.has(theme)) return theme;

      const adminTheme = localStorage.getItem(LEGACY_ADMIN_KEY);
      if (VALID.has(adminTheme)) {
        localStorage.setItem(KEY, adminTheme);
        return adminTheme;
      }
    } catch (e) {}

    return normalize(html.dataset.theme || 'system');
  }

  function renderIcons(isDark) {
    const iconTargets = document.querySelectorAll('#themeIcon, [data-theme-icon], [data-theme-global-icon]');
    iconTargets.forEach((icon) => {
      if (icon.hasAttribute('data-theme-global-icon')) {
        icon.innerHTML = isDark
          ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4.5V2m0 20v-2.5M4.5 12H2m20 0h-2.5M5.64 5.64 3.87 3.87m16.26 16.26-1.77-1.77m0-12.72 1.77-1.77M3.87 20.13l1.77-1.77"/><circle cx="12" cy="12" r="4.25"/></svg>'
          : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.25A7.6 7.6 0 0 1 9.75 3.5a8.5 8.5 0 1 0 10.75 10.75Z"/></svg>';
        return;
      }

      if (window.icons8 && typeof window.icons8.sun === 'function' && typeof window.icons8.moon === 'function') {
        icon.innerHTML = isDark ? window.icons8.sun() : window.icons8.moon();
        return;
      }

      if (icon.classList && icon.classList.contains('bx')) {
        icon.classList.toggle('bx-sun', isDark);
        icon.classList.toggle('bx-moon', !isDark);
      }
    });
  }

  function updateControls(theme, isDark) {
    const body = document.body;
    html.dataset.themeChoice = theme;
    if (body) body.dataset.themeChoice = theme;

    document.querySelectorAll('[data-theme-choice]').forEach((button) => {
      button.classList.toggle('active', button.dataset.themeChoice === theme);
    });

    document.querySelectorAll('[data-theme-value]').forEach((button) => {
      button.classList.toggle('active', button.dataset.themeValue === theme);
    });

    document.querySelectorAll('select[data-theme-select], #themePreference').forEach((select) => {
      if (select.value !== theme) select.value = theme;
    });

    const cycleLabel = document.getElementById('themeCycleLabel');
    if (cycleLabel) cycleLabel.textContent = theme === 'system' ? 'Auto' : theme.charAt(0).toUpperCase() + theme.slice(1);

    document.querySelectorAll('#themeToggle, .theme-toggle, [data-theme-toggle]').forEach((toggle) => {
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('title', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    });

    renderIcons(isDark);
  }

  function injectGlobalToggle() {
    if (!document.body || document.getElementById(GLOBAL_TOGGLE_ID)) return;

    const style = document.createElement('style');
    style.id = 'tbp-global-theme-toggle-style';
    style.textContent = `
      #themeToggle,
      .theme-toggle:not(.tbp-global-theme-toggle) {
        display: none !important;
      }

      .tbp-global-theme-toggle {
        position: fixed;
        right: max(18px, env(safe-area-inset-right));
        bottom: max(18px, env(safe-area-inset-bottom));
        width: 46px;
        height: 46px;
        border: 1px solid rgba(148, 163, 184, 0.35);
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.82);
        color: #111827;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 2147483000;
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.18);
        backdrop-filter: blur(18px) saturate(160%);
        -webkit-backdrop-filter: blur(18px) saturate(160%);
        transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease;
      }

      .tbp-global-theme-toggle:hover {
        transform: translateY(-2px);
        border-color: rgba(0, 122, 255, 0.5);
        box-shadow: 0 20px 44px rgba(15, 23, 42, 0.22);
      }

      .tbp-global-theme-toggle:focus-visible {
        outline: 3px solid rgba(0, 122, 255, 0.35);
        outline-offset: 3px;
      }

      .tbp-global-theme-toggle svg {
        width: 21px;
        height: 21px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.9;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      [data-theme="dark"] .tbp-global-theme-toggle {
        background: rgba(17, 24, 39, 0.82);
        color: #f9fafb;
        border-color: rgba(255, 255, 255, 0.16);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
      }

      @media (max-width: 640px) {
        .tbp-global-theme-toggle {
          right: max(14px, env(safe-area-inset-right));
          bottom: max(14px, env(safe-area-inset-bottom));
          width: 44px;
          height: 44px;
        }
      }
    `;
    document.head.appendChild(style);

    const button = document.createElement('button');
    button.id = GLOBAL_TOGGLE_ID;
    button.className = 'tbp-global-theme-toggle';
    button.type = 'button';
    button.setAttribute('data-theme-toggle', '');
    button.setAttribute('aria-label', 'Toggle theme');
    button.innerHTML = '<span data-theme-global-icon></span>';
    button.addEventListener('click', handleToggleEvent);
    document.body.appendChild(button);
  }

  function applyTheme(value, options) {
    const theme = normalize(value);
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark());
    const body = document.body;

    if (isDark) {
      html.setAttribute('data-theme', 'dark');
      if (body) body.setAttribute('data-theme', 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      if (body) body.setAttribute('data-theme', 'light');
    }

    if (theme === 'system') {
      html.dataset.themePreference = 'system';
      if (body) body.dataset.themePreference = 'system';
    } else {
      delete html.dataset.themePreference;
      if (body) delete body.dataset.themePreference;
    }

    updateControls(theme, isDark);

    if (!options || options.persist !== false) {
      try {
        localStorage.setItem(KEY, theme);
        localStorage.setItem(LEGACY_ADMIN_KEY, theme);
      } catch (e) {}
    }

    window.dispatchEvent(new CustomEvent('tbp:themechange', {
      detail: { theme, resolvedTheme: isDark ? 'dark' : 'light' }
    }));
  }

  function cycleTheme() {
    const resolved = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(resolved === 'dark' ? 'light' : 'dark');
  }

  function handleToggleEvent(ev) {
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (typeof ev.stopImmediatePropagation === 'function') {
        ev.stopImmediatePropagation();
      }
    }

    cycleTheme();
  }

  window.TBPTheme = {
    apply: applyTheme,
    set: applyTheme,
    toggle: cycleTheme,
    get preference() {
      return normalize(html.dataset.themeChoice || getStoredTheme());
    },
    get resolved() {
      return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    }
  };

  injectGlobalToggle();
  applyTheme(getStoredTheme(), { persist: false });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectGlobalToggle();
      applyTheme(window.TBPTheme.preference, { persist: false });
    }, { once: true });
  }

  document.addEventListener('click', (ev) => {
    const target = ev.target;
    if (!target || !target.closest) return;

    const choice = target.closest('[data-theme-choice], [data-theme-value]');
    if (choice) {
      applyTheme(choice.dataset.themeChoice || choice.dataset.themeValue);
      return;
    }

    const toggle = target.closest('#themeToggle, .theme-toggle, [data-theme-toggle]');
    if (toggle) {
      handleToggleEvent(ev);
    }
  }, true);

  document.addEventListener('change', (ev) => {
    const target = ev.target;
    if (!target || !target.matches) return;
    if (target.matches('select[data-theme-select], #themePreference')) {
      applyTheme(target.value);
    }
  });

  window.addEventListener('storage', (e) => {
    if (e.key === KEY || e.key === LEGACY_ADMIN_KEY) {
      applyTheme(e.newValue || 'system', { persist: false });
    }
  });

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (normalize(html.dataset.themeChoice || getStoredTheme()) === 'system') {
        applyTheme('system', { persist: false });
      }
    });
  }
})();
