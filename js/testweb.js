/* testweb.js - Full interactivity for pages/testweb.html
   Hero slider, philosophy carousel w/inline YouTube, theme toggle, nav toggle, splash, stats, form, animations */

'use strict';

document.addEventListener('DOMContentLoaded', function() {
  // 1. Splash Screen
  const splash = document.getElementById('splash');
  const splashSkip = document.getElementById('splashSkip');
  
  function hideSplash() {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 500);
  }
  
  // Auto hide after 3s or skip click
  setTimeout(hideSplash, 3000);
  if (splashSkip) splashSkip.addEventListener('click', hideSplash);

  // 2. Theme Toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const html = document.documentElement;
  
  function toggleTheme() {
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.className = newTheme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
  }
  
  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);
  themeIcon.className = savedTheme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
  
  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

  // 3. Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  function toggleNav() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleNav);
    
    // Close on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  // 4. Hero Slider
  const heroSliderTrack = document.getElementById('heroSliderTrack');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroPrev = document.getElementById('heroSliderPrev');
  const heroNext = document.getElementById('heroSliderNext');
  const heroIndicators = document.querySelectorAll('.hero-slider-indicator');
  
  let currentSlide = 0;
  const slideCount = heroSlides.length;
  
  function updateHeroSlider(index) {
    heroSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    heroIndicators.forEach((ind, i) => {
      ind.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }
  
  function nextSlide() {
    const next = (currentSlide + 1) % slideCount;
    updateHeroSlider(next);
  }
  
  function prevSlide() {
    const prev = currentSlide === 0 ? slideCount - 1 : currentSlide - 1;
    updateHeroSlider(prev);
  }
  
  // Navigation
  if (heroPrev) heroPrev.addEventListener('click', prevSlide);
  if (heroNext) heroNext.addEventListener('click', nextSlide);
  
  // Indicators
  heroIndicators.forEach((ind, index) => {
    ind.addEventListener('click', () => updateHeroSlider(index));
  });
  
  // Auto slide
  let autoSlide = setInterval(nextSlide, 5000);
  
  // Pause on hover
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    heroSlider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    heroSlider.addEventListener('mouseleave', () => {
      autoSlide = setInterval(nextSlide, 5000);
    });
  }

  // 5. Philosophy Carousel + Inline YouTube (TODO implementation)
  const philosophyPrinciples = document.querySelectorAll('.philosophy-principle');
  const philosophyTrack = document.getElementById('philosophyTrack');
  const philosophySlides = document.querySelectorAll('.carousel-slide');
  const philosophyPrev = document.getElementById('philosophyPrev');
  const philosophyNext = document.getElementById('philosophyNext');
  
  let philosophyCurrent = 0;
  const philosophyCount = philosophySlides.length;
  
  function updatePhilosophyCarousel(index) {
    if (!philosophyTrack) return;
    
    philosophyPrinciples.forEach((principle, i) => {
      principle.classList.toggle('active', i === index);
    });
    
    philosophyTrack.style.transform = `translateX(-${index * 100}%)`;
    
    // Handle YouTube videos
    philosophySlides.forEach((slide, i) => {
      const videoEmbed = slide.querySelector('.video-embed');
      if (videoEmbed && i === index) {
        const videoId = videoEmbed.dataset.videoId;
        const iframe = videoEmbed.querySelector('iframe');
        if (videoId && iframe) {
          iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1`;
          videoEmbed.classList.add('playing');
        }
      }
    });
    
    philosophyCurrent = index;
  }
  
  // Principle clicks
  philosophyPrinciples.forEach((principle, index) => {
    principle.addEventListener('click', () => updatePhilosophyCarousel(index));
  });
  
  // Nav buttons
  if (philosophyPrev) {
    philosophyPrev.addEventListener('click', () => {
      const prev = philosophyCurrent === 0 ? philosophyCount - 1 : philosophyCurrent - 1;
      updatePhilosophyCarousel(prev);
    });
  }
  
  if (philosophyNext) {
    philosophyNext.addEventListener('click', () => {
      const next = (philosophyCurrent + 1) % philosophyCount;
      updatePhilosophyCarousel(next);
    });
  }
  
  // Auto advance
  let philosophyAuto = setInterval(() => {
    const next = (philosophyCurrent + 1) % philosophyCount;
    updatePhilosophyCarousel(next);
  }, 7000);

  // Pause on hover
  const philosophyCarousel = document.querySelector('.philosophy-carousel');
  if (philosophyCarousel) {
    philosophyCarousel.addEventListener('mouseenter', () => clearInterval(philosophyAuto));
    philosophyCarousel.addEventListener('mouseleave', () => {
      philosophyAuto = setInterval(() => {
        const next = (philosophyCurrent + 1) % philosophyCount;
        updatePhilosophyCarousel(next);
      }, 7000);
    });
  }

  // Video play buttons (fallback)
  document.querySelectorAll('.video-play').forEach(playBtn => {
    playBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const videoEmbed = this.closest('.video-embed');
      const videoId = videoEmbed.dataset.videoId;
      const iframe = videoEmbed.querySelector('iframe');
      
      if (videoId && iframe) {
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1&rel=0`;
        videoEmbed.classList.add('playing');
      }
    });
  });

  // 6. Stats Counters
  const statNumbers = document.querySelectorAll('[data-count]');
  
  function animateCounters() {
    statNumbers.forEach(stat => {
      if (!stat.classList.contains('animated')) {
        const target = parseInt(stat.dataset.count);
        const duration = 3000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current);
          }
        }, 16);
        
        stat.classList.add('animated');
      }
    });
  }
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  // 7. Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = this.querySelector('input[name="email"]').value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate submission
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Subscribing...';
      btn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for subscribing! 🎉');
        this.reset();
        btn.innerHTML = original;
        btn.disabled = false;
      }, 1500);
    });
  }

  // 8. Fade-in Animations
  const fadeElements = document.querySelectorAll('.fade-in');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  // 9. Lazy Loading for Images
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imgObserver.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  // 10. Performance: Smooth Scroll Behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  
  // 11. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      const fullName = this.querySelector('#fullName').value.trim();
      const email = this.querySelector('#email').value.trim();
      const message = this.querySelector('#message').value.trim();
      
      if (!fullName || !email || !message) {
        alert('Please fill in all required fields (Name, Email, Message)');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Simulate submission
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
      btn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you! Your inquiry has been sent. We\'ll contact you within 24 hours. 🎉');
        this.reset();
        btn.innerHTML = original;
        btn.disabled = false;
      }, 2000);
    });
  }

  console.log('🏗️ testweb.js loaded - All interactions active!');
});


