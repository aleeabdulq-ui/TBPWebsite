(function () {
  'use strict';

  const SPLASH_DURATION = 3000;
  const REMOVE_DELAY = 500;
  const logoPath = '../images/bp.png';

  function createRing() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'splash-ring');
    svg.setAttribute('viewBox', '0 0 120 120');
    svg.setAttribute('aria-hidden', 'true');

    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'tbpSplashRingGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '0%');

    const start = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    start.setAttribute('offset', '0%');
    start.setAttribute('stop-color', '#1A5F7A');

    const end = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    end.setAttribute('offset', '100%');
    end.setAttribute('stop-color', '#C9A227');

    gradient.append(start, end);
    defs.appendChild(gradient);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '60');
    circle.setAttribute('cy', '60');
    circle.setAttribute('r', '54');
    circle.setAttribute('stroke', 'url(#tbpSplashRingGradient)');
    circle.setAttribute('fill', 'none');

    svg.append(defs, circle);
    return svg;
  }

  function normalizeSplash(splash) {
    if (!splash || splash.dataset.tbpSplashReady === 'true') return;

    splash.dataset.tbpSplashReady = 'true';
    splash.setAttribute('role', 'status');
    splash.setAttribute('aria-live', 'polite');
    splash.innerHTML = '';

    const logoWrapper = document.createElement('div');
    logoWrapper.className = 'splash-logo-wrapper';
    logoWrapper.appendChild(createRing());

    const logo = document.createElement('img');
    logo.className = 'splash-logo';
    logo.src = logoPath;
    logo.alt = 'TBP Logo';
    logoWrapper.appendChild(logo);

    const title = document.createElement('h1');
    title.className = 'splash-title';
    title.textContent = 'The Building Practice Ltd.';

    const tagline = document.createElement('p');
    tagline.className = 'splash-tagline';
    tagline.textContent = '...Building Spaces that Feel';

    const loader = document.createElement('div');
    loader.className = 'splash-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.append(document.createElement('span'), document.createElement('span'), document.createElement('span'));

    const skip = document.createElement('button');
    skip.className = 'splash-skip';
    skip.id = 'splashSkip';
    skip.type = 'button';
    skip.textContent = 'Tap to skip';

    splash.append(logoWrapper, title, tagline, loader, skip);
  }

  function initSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;

    normalizeSplash(splash);
    document.body.classList.add('no-scroll');

    let hidden = false;
    const hideSplash = () => {
      if (hidden) return;
      hidden = true;
      splash.classList.add('hide');
      document.body.classList.remove('no-scroll');
      window.setTimeout(() => {
        if (splash.parentNode) splash.remove();
      }, REMOVE_DELAY);
    };

    window.TBPSplash = {
      duration: SPLASH_DURATION,
      hide: hideSplash,
      normalize: () => normalizeSplash(splash)
    };

    document.getElementById('splashSkip')?.addEventListener('click', hideSplash);
    window.setTimeout(hideSplash, SPLASH_DURATION);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplash, { once: true });
  } else {
    initSplash();
  }
})();
