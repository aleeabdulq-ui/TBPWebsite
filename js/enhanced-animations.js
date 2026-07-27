/**
 * Enhanced Animations JavaScript
 * The Building Practice Ltd.
 * iOS-Style Professional Animations
 */

(function() {
  'use strict';

  // ==========================================
  // CONFIGURATION
  // ==========================================
  const CONFIG = {
    splashDuration: 3000,
    scrollOffset: 100,
    counterDuration: 2000,
    toastDuration: 4000,
    particleCount: 30,
    particleColors: ['rgba(255, 255, 255, 0.3)', 'rgba(201, 162, 39, 0.3)', 'rgba(0, 122, 255, 0.2)'],
    tiltStrength: 15,
    magneticStrength: 0.3,
    revealThreshold: 0.1,
    revealRootMargin: '0px 0px -50px 0px'
  };

  // ==========================================
  // DOM HELPERS
  // ==========================================
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => document.querySelectorAll(selector);

  // ==========================================
  // ELEMENT REFERENCES
  // ==========================================
  const elements = {
    splash: $('#splash'),
    splashSkip: $('#splashSkip'),
    header: $('#header'),
    navToggle: $('#navToggle'),
    navMenu: $('#navMenu'),
    themeToggle: $('#themeToggle'),
    themeIcon: $('#themeIcon'),
    backToTop: $('#backToTop'),
    hero: $('.hero')
  };

  // ==========================================
  // UTILITIES
  // ==========================================
  const utils = {
    debounce(fn, delay) {
      let timer;
      return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
      };
    },

    throttle(fn, limit) {
      let inThrottle;
      return function(...args) {
        if (!inThrottle) {
          fn.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    },

    random(min, max) {
      return Math.random() * (max - min) + min;
    },

    prefersReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },

    getScrollProgress() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      return docHeight > 0 ? window.scrollY / docHeight : 0;
    }
  };

  // ==========================================
  // THEME MANAGEMENT (iOS Style)
  // ==========================================
  const theme = {
    current: localStorage.getItem('theme') || 'system',

    apply(themeName) {
      this.current = themeName;
      localStorage.setItem('theme', themeName);

      const isDark = themeName === 'dark' || (themeName === 'system' && utils.prefersDarkMode());

      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }

      this.updateToggleUI();
    },

    updateToggleUI() {
      const toggle = $('.theme-switch');
      if (!toggle) return;

      const isDark = this.current === 'dark' || (this.current === 'system' && utils.prefersDarkMode());
      
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    },

    toggle() {
      const newTheme = this.current === 'dark' ? 'light' : 'dark';
      this.apply(newTheme);
    },

    init() {
      this.apply(this.current);

      // Add click handler for theme toggle
      elements.themeToggle?.addEventListener('click', (e) => {
        // Prevent default and toggle theme
        e.preventDefault();
        this.toggle();
      });

      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.current === 'system') {
          this.apply('system');
        }
      });
    }
  };

  // ==========================================
  // PARTICLE SYSTEM
  // ==========================================
  const particles = {
    container: null,
    particles: [],

    createParticle() {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = utils.random(4, 12);
      const color = CONFIG.particleColors[Math.floor(Math.random() * CONFIG.particleColors.length)];
      const left = utils.random(0, 100);
      const duration = utils.random(15, 30);
      const delay = utils.random(0, 10);
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
      `;
      
      return particle;
    },

    init() {
      if (utils.prefersReducedMotion()) return;
      if (!elements.hero) return;

      // Create container
      this.container = document.createElement('div');
      this.container.className = 'particles-container';
      elements.hero.appendChild(this.container);

      // Create initial particles
      for (let i = 0; i < CONFIG.particleCount; i++) {
        const particle = this.createParticle();
        this.container.appendChild(particle);
        this.particles.push(particle);
      }

      // Add light rays
      this.addLightRays();
    },

    addLightRays() {
      const rays = document.createElement('div');
      rays.className = 'light-rays';
      if (elements.hero) {
        elements.hero.insertBefore(rays, elements.hero.firstChild);
      }
    },

    destroy() {
      if (this.container) {
        this.container.remove();
      }
    }
  };

  // ==========================================
  // SCROLL ANIMATIONS (Reveal on Scroll)
  // ==========================================
  const scrollAnimations = {
    observer: null,
    observed: new WeakSet(),

    observe(el) {
      if (!el || !this.observer || this.observed.has(el)) return;
      this.observer.observe(el);
      this.observed.add(el);
    },

    refresh(root = document) {
      if (!this.observer) return;
      root.querySelectorAll?.('.reveal, .fade-in')?.forEach(el => this.observe(el));
    },

    init() {
      if (utils.prefersReducedMotion()) {
        $$('.reveal, .fade-in').forEach(el => el.classList.add('active'));
        return;
      }

      // Create intersection observer
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Optional: unobserve after reveal
            // this.observer.unobserve(entry.target);
          }
        });
      }, { 
        threshold: CONFIG.revealThreshold, 
        rootMargin: CONFIG.revealRootMargin 
      });

      // Observe all reveal elements (and anything added later via refresh())
      this.refresh(document);

      // Add scroll-based parallax effects
      this.initParallax();
    },

    initParallax() {
      const parallaxElements = $$('[data-parallax]');
      
      if (parallaxElements.length === 0) return;

      window.addEventListener('scroll', utils.throttle(() => {
        const scrollY = window.scrollY;
        
        parallaxElements.forEach(el => {
          const speed = parseFloat(el.dataset.parallax) || 0.5;
          const yPos = scrollY * speed;
          el.style.transform = `translateY(${yPos}px)`;
        });
      }, 16));
    }
  };

  // ==========================================
  // CARD TILT EFFECT
  // ==========================================
  const cardTilt = {
    cards: [],
    bound: new WeakSet(),

    bind(card) {
      if (!card || this.bound.has(card)) return;
      this.bound.add(card);
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    },

    refresh(root = document) {
      root.querySelectorAll?.('.tilt-card, [data-tilt]')?.forEach(card => this.bind(card));
    },

    init() {
      const tiltCards = $$('.tilt-card, [data-tilt]');
      
      tiltCards.forEach(card => {
        this.bind(card);
      });
    },

    handleMouseMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / centerY * -CONFIG.tiltStrength;
      const rotateY = (x - centerX) / centerX * CONFIG.tiltStrength;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    },

    handleMouseLeave(card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
  };

  // ==========================================
  // MAGNETIC HOVER EFFECT
  // ==========================================
  const magneticEffect = {
    init() {
      const magneticElements = $$('.btn, .icon-magnetic, a[data-magnetic]');
      
      magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => this.handleMouseMove(e, el));
        el.addEventListener('mouseleave', () => this.handleMouseLeave(el));
      });
    },

    handleMouseMove(e, el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      el.style.transform = `translate(${x * CONFIG.magneticStrength}px, ${y * CONFIG.magneticStrength}px)`;
    },

    handleMouseLeave(el) {
      el.style.transform = 'translate(0, 0)';
    }
  };

  // ==========================================
  // RIPPLE EFFECT
  // ==========================================
  const rippleEffect = {
    init() {
      const rippleButtons = $$('.btn-ripple, .btn:not(.no-ripple)');
      
      rippleButtons.forEach(btn => {
        btn.addEventListener('click', (e) => this.createRipple(e, btn));
      });
    },

    createRipple(e, btn) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 0;
        height: 0;
        background: rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
      `;
      
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      
      // Animate ripple
      ripple.animate([
        { width: '0px', height: '0px', opacity: 1 },
        { width: '300px', height: '300px', opacity: 0 }
      ], {
        duration: 600,
        easing: 'ease-out'
      }).onfinish = () => ripple.remove();
    }
  };

  // ==========================================
  // SMOOTH SCROLL
  // ==========================================
  const smoothScroll = {
    init() {
      // Add smooth scroll to anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
          const href = anchor.getAttribute('href');
          if (href === '#') return;
          
          const target = $(href);
          if (target) {
            e.preventDefault();
            
            const headerHeight = elements.header?.offsetHeight || 80;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            if (utils.prefersReducedMotion()) {
              window.scrollTo(0, targetPosition);
            } else {
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });
            }
          }
        });
      });

      // Add momentum scrolling feel
      this.addMomentum();
    },

    addMomentum() {
      let isScrolling = false;
      
      window.addEventListener('scroll', () => {
        isScrolling = true;
      });

      setInterval(() => {
        if (isScrolling) {
          isScrolling = false;
          // You could add additional momentum effects here
        }
      }, 50);
    }
  };

  // ==========================================
  // NAVIGATION
  // ==========================================
  const navigation = {
    isOpen: false,

    toggle() {
      this.isOpen = !this.isOpen;
      elements.navToggle?.classList.toggle('active', this.isOpen);
      elements.navMenu?.classList.toggle('active', this.isOpen);
      document.body.classList.toggle('no-scroll', this.isOpen);
    },

    close() {
      this.isOpen = false;
      elements.navToggle?.classList.remove('active');
      elements.navMenu?.classList.remove('active');
      document.body.classList.remove('no-scroll');
    },

    updateActiveLink() {
      const scrollY = window.scrollY + CONFIG.scrollOffset;
      
      $$('section[id]').forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          $$('.nav-link').forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },

    handleScroll() {
      // Header background on scroll
      elements.header?.classList.toggle('scrolled', window.scrollY > 50);
      
      // Update active navigation link
      this.updateActiveLink();
    },

    init() {
      elements.navToggle?.addEventListener('click', () => this.toggle());

      // Close menu on escape
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (this.isOpen && !elements.navMenu?.contains(e.target) && !elements.navToggle?.contains(e.target)) {
          this.close();
        }
      });

      // Scroll handler
      window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 16));
    }
  };

  // ==========================================
  // BACK TO TOP
  // ==========================================
  const backToTop = {
    handleScroll() {
      elements.backToTop?.classList.toggle('visible', window.scrollY > 500);
    },

    init() {
      window.addEventListener('scroll', utils.throttle(() => this.handleScroll(), 100));

      elements.backToTop?.addEventListener('click', () => {
        if (utils.prefersReducedMotion()) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
      });
    }
  };

  // ==========================================
  // SPLASH SCREEN
  // ==========================================
  const splash = {
    hide() {
      if (!elements.splash) return;

      if (utils.prefersReducedMotion()) {
        elements.splash.style.display = 'none';
        document.body.classList.remove('no-scroll');
        return;
      }

      elements.splash.classList.add('hide');
      document.body.classList.remove('no-scroll');

      setTimeout(() => {
        elements.splash.style.display = 'none';
      }, 500);
    },

    init() {
      if (!elements.splash) {
        document.body.classList.remove('no-scroll');
        return;
      }

      setTimeout(() => this.hide(), CONFIG.splashDuration);

      elements.splashSkip?.addEventListener('click', () => this.hide());
    }
  };

  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = {
    animated: false,

    animate() {
      if (this.animated || utils.prefersReducedMotion()) {
        $$('[data-count]').forEach(counter => {
          counter.textContent = counter.dataset.count;
        });
        this.animated = true;
        return;
      }

      this.animated = true;

      $$('[data-count]').forEach(counter => {
        const target = parseInt(counter.dataset.count);
        const duration = CONFIG.counterDuration;
        const startTime = performance.now();

        const update = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(target * easeOut);
          
          counter.textContent = current;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };

        requestAnimationFrame(update);
      });
    },

    init() {
      const statsSection = $('.stats-section');
      if (!statsSection) return;

      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animate();
        }
      }, { threshold: 0.3 });

      observer.observe(statsSection);
    }
  };

  // ==========================================
  // PROJECT FILTERS
  // ==========================================
  const projectFilters = {
    init() {
      const filterBtns = $$('.filter-btn');
      const projectCards = $$('.project-card');

      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          // Update active state
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.dataset.filter;

          projectCards.forEach(card => {
            const category = card.dataset.category;
            const show = filter === 'all' || category === filter;

            if (show) {
              card.style.display = 'block';
              if (!utils.prefersReducedMotion()) {
                card.style.animation = 'fadeIn 0.5s ease forwards';
              }
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }
  };

  // ==========================================
  // TOAST NOTIFICATIONS
  // ==========================================
  const toast = {
    timeout: null,

    show(message, type = 'success') {
      const toastEl = $('#toast');
      const messageEl = $('#toastMessage');
      if (!toastEl || !messageEl) return;

      clearTimeout(this.timeout);

      messageEl.textContent = message;
      toastEl.classList.remove('toast--error');
      
      if (type === 'error') {
        toastEl.classList.add('toast--error');
      }

      toastEl.classList.add('active');

      this.timeout = setTimeout(() => this.hide(), CONFIG.toastDuration);
    },

    hide() {
      const toastEl = $('#toast');
      if (!toastEl) return;

      toastEl.classList.remove('active');
    },

    init() {
      const closeBtn = toastEl?.querySelector('.toast-close');
      closeBtn?.addEventListener('click', () => this.hide());
    }
  };

  // ==========================================
  // FORM HANDLING
  // ==========================================
  const forms = {
    validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    handleSubmit(form, successMessage) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = form.querySelector('input[type="email"]')?.value;
        const name = form.querySelector('input[name="name"]')?.value;
        const message = form.querySelector('textarea[name="message"]')?.value;

        let hasError = false;

        if (name !== undefined && !name.trim()) {
          hasError = true;
        }

        if (email && !this.validateEmail(email)) {
          hasError = true;
        }

        if (message !== undefined && !message.trim()) {
          hasError = true;
        }

        if (hasError) {
          toast.show('Please fill in all required fields correctly.', 'error');
          return;
        }

        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.innerHTML;

        if (submitBtn) {
          submitBtn.innerHTML = '<span>Sending...</span><i class="bx bx-loader-alt bx-spin"></i>';
          submitBtn.disabled = true;
        }

        setTimeout(() => {
          toast.show(successMessage, 'success');
          form.reset();

          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
        }, 1500);
      });
    },

    init() {
      const contactForm = $('#contactForm');
      const newsletterForm = $('#newsletterForm');

      if (contactForm) {
        this.handleSubmit(
          contactForm, 
          'Thank you for your inquiry! We will get back to you within 24 hours.'
        );
      }

      if (newsletterForm) {
        this.handleSubmit(
          newsletterForm, 
          'Thank you for subscribing! You will receive our latest updates.'
        );
      }
    }
  };

  // ==========================================
  // READING PROGRESS BAR
  // ==========================================
  const readingProgress = {
    bar: null,

    init() {
      this.bar = document.createElement('div');
      this.bar.className = 'reading-progress';
      document.body.appendChild(this.bar);

      window.addEventListener('scroll', utils.throttle(() => {
        const progress = utils.getScrollProgress() * 100;
        this.bar.style.width = `${progress}%`;
      }, 16));
    }
  };

  // ==========================================
  // DYNAMIC YEAR
  // ==========================================
  const setCurrentYear = () => {
    const yearEl = $('#currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  };

  // ==========================================
  // KEYBOARD ACCESSIBILITY
  // ==========================================
  const accessibility = {
    init() {
      // Add keyboard support to interactive elements
      $$('.service-card, .project-card, .team-card, .blog-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const link = card.querySelector('a');
            link?.click();
          }
        });
      });

      // Focus visible states
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          document.body.classList.add('keyboard-navigation');
        }
      });

      document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
      });
    }
  };

  // ==========================================
  // CONSOLE BRANDING
  // ==========================================
  const consoleBranding = () => {
    console.log(
      '%c The Building Practice Ltd. ',
      'background: linear-gradient(135deg, #1A5F7A, #134B61); color: white; font-size: 20px; padding: 12px 24px; border-radius: 8px; font-weight: bold;'
    );
    console.log(
      '%c Building Spaces that Feel ',
      'color: #C9A227; font-size: 14px; font-style: italic; padding: 4px 0;'
    );
    console.log(
      '%c Designed with ♥ following iOS design principles ',
      'color: #8E8E93; font-size: 11px;'
    );
  };

  // ==========================================
  // ADD DYNAMIC STYLES
  // ==========================================
  const addDynamicStyles = () => {
    if (document.getElementById('dynamic-animations')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px) scale(0.95); }
        to { opacity: 1; transform: translateY(0) scale(1); }
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .bx-spin {
        animation: spin 1s linear infinite;
      }

      /* Hide splash */
      .splash.hide {
        opacity: 0;
        visibility: hidden;
      }

      /* Reveal active states */
      .reveal.active,
      .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
      }

      /* Back to top visible */
      .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      /* Active nav link */
      .nav-link.active {
        color: var(--primary);
      }

      /* Mobile menu active */
      .nav-menu.active {
        transform: translateX(0);
      }

      /* Toast active */
      .toast.active {
        opacity: 1;
        visibility: visible;
        transform: translateX(-50%) translateY(0);
      }
    `;
    document.head.appendChild(style);
  };

  // ==========================================
  // DOM WATCHER (attach behaviors to new nodes)
  // ==========================================
  const domWatcher = {
    observer: null,

    init() {
      if (!('MutationObserver' in window)) return;
      if (!document.body) return;

      const refresh = utils.debounce(() => {
        scrollAnimations.refresh(document);
        cardTilt.refresh(document);
      }, 80);

      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            refresh();
            return;
          }
        }
      });

      this.observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  const init = () => {
    addDynamicStyles();
    splash.init();
    theme.init();
    particles.init();
    navigation.init();
    backToTop.init();
    scrollAnimations.init();
    cardTilt.init();
    domWatcher.init();
    magneticEffect.init();
    rippleEffect.init();
    smoothScroll.init();
    projectFilters.init();
    counters.init();
    forms.init();
    readingProgress.init();
    accessibility.init();
    setCurrentYear();
    consoleBranding();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();


