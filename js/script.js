/*=================================
  Table of Contents
===================================
  1. AOS Initialization
  2. Navbar Functions
  3. Smooth Scrolling
  4. Active Navigation
  5. Project Filtering
  6. Counter Animation
  7. Form Handling
  8. Scroll to Top
  9. Lazy Loading
  10. Performance Optimization
===================================*/

'use strict';

/*=================================
  1. AOS Initialization
===================================*/
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
      delay: 100,
      anchorPlacement: 'top-bottom'
    });
  }
});

/*=================================
  2. Navbar Functions
===================================*/
// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add/remove scrolled class
  if (scrollTop > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
  
  // Hide/show navbar on scroll (optional)
  // Uncomment below to enable auto-hide navbar
  /*
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  */
  
  lastScrollTop = scrollTop;
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
  const navbarCollapse = document.querySelector('.navbar-collapse');
  const navbarToggler = document.querySelector('.navbar-toggler');
  
  if (navbarCollapse && navbarCollapse.classList.contains('show')) {
    if (!navbarCollapse.contains(event.target) && !navbarToggler.contains(event.target)) {
      navbarCollapse.classList.remove('show');
    }
  }
});

/*=================================
  3. Smooth Scrolling
===================================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    
    // Skip if href is just "#"
    if (href === '#') {
      e.preventDefault();
      return;
    }
    
    const target = document.querySelector(href);
    
    if (target) {
      e.preventDefault();
      
      const navbarHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Close mobile menu if open
      const navbarCollapse = document.querySelector('.navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
      }
      
      // Update URL hash without jumping
      if (history.pushState) {
        history.pushState(null, null, href);
      }
    }
  });
});

/*=================================
  4. Active Navigation Highlighting
===================================*/
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
  const scrollPosition = window.pageYOffset + navbar.offsetHeight + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
  
  // Remove active class if at top of page
  if (window.pageYOffset < 100) {
    navLinks.forEach(link => link.classList.remove('active'));
    const homeLink = document.querySelector('a[href="#home"]');
    if (homeLink) homeLink.classList.add('active');
  }
}

window.addEventListener('scroll', activateNavLink);
window.addEventListener('load', activateNavLink);

/*=================================
  5. Project Filtering
===================================*/
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

if (filterButtons.length > 0 && projectItems.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          
          // Animate in
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          // Animate out
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // Reinitialize AOS for filtered items
      if (typeof AOS !== 'undefined') {
        setTimeout(() => {
          AOS.refresh();
        }, 400);
      }
    });
  });
}

/*=================================
  6. Counter Animation
===================================*/
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-count'));
  const duration = 3000;
  const increment = target / (duration / 16); // 60fps
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for counter animation
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach(counter => {
        if (!counter.classList.contains('animated')) {
          counter.classList.add('animated');
          animateCounter(counter);
        }
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const counterSection = document.querySelector('.counter-section');
if (counterSection) {
  counterObserver.observe(counterSection);
}

/*=================================
  7. Form Handling
===================================*/
const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formObject = {};
    
    formData.forEach((value, key) => {
      formObject[key] = value;
    });
    
    // Validate form
    const inputs = this.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
    
    if (!isValid) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      // Success
      showNotification('Thank you! Your message has been sent successfully.', 'success');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // You can add actual form submission here
      // Example: 
      // fetch('/api/contact', {
      //   method: 'POST',
      //   body: JSON.stringify(formObject),
      //   headers: { 'Content-Type': 'application/json' }
      // }).then(response => response.json())
      //   .then(data => console.log(data))
      //   .catch(error => console.error(error));
      
    }, 1500);
  });
  
  // Real-time validation
  const formInputs = contactForm.querySelectorAll('input, textarea');
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.hasAttribute('required') && !this.value.trim()) {
        this.classList.add('is-invalid');
      } else {
        this.classList.remove('is-invalid');
      }
      
      // Email validation
      if (this.type === 'email' && this.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
          this.classList.add('is-invalid');
        } else {
          this.classList.remove('is-invalid');
        }
      }
    });
  });
}

// Notification function
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} notification-toast`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    z-index: 9999;
    padding: 15px 25px;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slideInRight 0.5s ease;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = 'fadeOut 0.5s ease';
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 5000);
}

/*=================================
  8. Scroll to Top Button
===================================*/
// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
scrollTopBtn.className = 'scroll-to-top';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1000;
  box-shadow: 0 5px 20px rgba(231, 76, 60, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 500) {
    scrollTopBtn.style.opacity = '1';
    scrollTopBtn.style.visibility = 'visible';
  } else {
    scrollTopBtn.style.opacity = '0';
    scrollTopBtn.style.visibility = 'hidden';
  }
});

// Scroll to top functionality
scrollTopBtn.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Hover effect
scrollTopBtn.addEventListener('mouseenter', function() {
  this.style.transform = 'translateY(-5px) scale(1.1)';
  this.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.5)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
  this.style.transform = 'translateY(0) scale(1)';
  this.style.boxShadow = '0 5px 20px rgba(231, 76, 60, 0.4)';
});

/*=================================
  9. Lazy Loading Images
===================================*/
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

/*=================================
  10. Performance Optimization
===================================*/
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Use debounce for scroll events
window.addEventListener('scroll', debounce(activateNavLink, 10));

// Preload critical images
window.addEventListener('load', function() {
  const criticalImages = [
    'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1920&h=1080&fit=crop'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
});

// Add smooth reveal animation to elements
const revealElements = document.querySelectorAll('.scroll-reveal');
if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => revealObserver.observe(el));
}

// Page load animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Video Player Enhancements (Local + Sticky)
let currentLocalVideo = null;
let philosophyVideos = [
  {id: '01-innovation', path: '../videos/philosophy/01-innovation.mp4', youtube: 'YEFR-Ay9BX8'},
  {id: '02-sustainability', path: '../videos/philosophy/02-sustainability.mp4', youtube: 'beUzEqtOAUc'},
  {id: '03-human-centric', path: '../videos/philosophy/03-human-centric.mp4', youtube: 'jV1v2NNEdVw'},
  {id: '04-craftsmanship', path: '../videos/philosophy/04-craftsmanship.mp4', youtube: '8bKffrD0Q0k'},
  {id: '05-legacy', path: '../videos/philosophy/05-legacy.mp4', youtube: '7KMM5gD6eG4'}
];

async function checkVideoExists(videoPath) {
  try {
    const response = await fetch(videoPath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function initLocalVideos() {
  const videoEmbeds = document.querySelectorAll('.video-embed');
  
  for (let video of philosophyVideos) {
    const embed = document.querySelector(`[data-video-id="${video.youtube}"]`);
    if (!embed) continue;
    
    const hasLocal = await checkVideoExists(video.path);
    
    if (hasLocal) {
      embed.classList.add('local-video-ready');
      
      // Create video element
      const videoEl = document.createElement('video');
      videoEl.src = video.path;
      videoEl.preload = 'metadata';
      videoEl.muted = true;
      videoEl.playsInline = true;
      videoEl.className = 'video-player-local';
      embed.appendChild(videoEl);
      
      // Update play button
      const playBtn = embed.querySelector('.video-play');
      playBtn.textContent = '🎥';
      playBtn.title = 'Play Local Video';
    }
  }
  
  // Local toggle button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'local-video-toggle';
  toggleBtn.innerHTML = '🎬';
  toggleBtn.title = 'Toggle Local Videos';
  document.body.appendChild(toggleBtn);
  
  toggleBtn.addEventListener('click', toggleLocalMode);
}

// Toggle local vs YouTube mode
function toggleLocalMode() {
  const isLocal = document.body.classList.toggle('local-video-mode');
  toggleBtn.classList.toggle('active', isLocal);
  toggleBtn.title = isLocal ? 'Switch to YouTube' : 'Play Local Videos';
  
  if (isLocal) {
    document.querySelectorAll('.video-embed.playing iframe').forEach(iframe => {
      iframe.pause();
    });
  }
}

// Sticky video player
function initStickyPlayer() {
  const stickyPlayer = document.createElement('div');
  stickyPlayer.className = 'video-sticky-player';
  stickyPlayer.innerHTML = `
    <button class="video-sticky-close" aria-label="Close video player">
      <i class='bx bx-x'></i>
    </button>
    <div class="video-player-local" id="stickyVideoPlayer"></div>
    <div class="video-controls-overlay">
      <div class="video-title-sticky" id="stickyVideoTitle"></div>
      <button id="stickyNextVideo" style="background:none;border:none;color:white;font-size:1.2rem;margin-top:0.25rem;cursor:pointer;">⏭️ Next</button>
    </div>
  `;
  
  document.body.appendChild(stickyPlayer);
  
  const closeBtn = stickyPlayer.querySelector('.video-sticky-close');
  const nextBtn = stickyPlayer.querySelector('#stickyNextVideo');
  const playerContainer = stickyPlayer.querySelector('#stickyVideoPlayer');
  const titleEl = stickyPlayer.querySelector('#stickyVideoTitle');
  
  closeBtn.addEventListener('click', () => {
    stickyPlayer.classList.remove('active');
    if (currentLocalVideo) {
      currentLocalVideo.pause();
      currentLocalVideo.currentTime = 0;
    }
  });
  
  nextBtn.addEventListener('click', playNextVideo);
}

// Play video with sticky support
function playPhilosophyVideo(index) {
  const videoData = philosophyVideos[index];
  const embed = document.querySelector(`[data-video-id="${videoData.youtube}"]`);
  
  if (!embed) return;
  
  // Pause current video
  if (currentLocalVideo) {
    currentLocalVideo.pause();
    currentLocalVideo.currentTime = 0;
  }
  
  // Get or create video element
  let videoEl = embed.querySelector('video');
  const hasLocal = videoEl && videoEl.src.includes(videoData.path);
  
  if (hasLocal && videoEl) {
    currentLocalVideo = videoEl;
    videoEl.play();
    
    // Sticky mode
    const stickyPlayer = document.querySelector('.video-sticky-player');
    const playerContainer = stickyPlayer?.querySelector('#stickyVideoPlayer');
    
    if (playerContainer && stickyPlayer) {
      playerContainer.innerHTML = '';
      playerContainer.appendChild(videoEl.cloneNode(true));
      
      const clonedVideo = playerContainer.querySelector('video');
      clonedVideo.play();
      
      document.querySelector('#stickyVideoTitle').textContent = videoData.youtube.replace(/-/g, ' ').toUpperCase();
      stickyPlayer.classList.add('active');
    }
    
    // Auto-advance setup
    videoEl.onended = () => {
      setTimeout(() => {
        const nextIndex = (index + 1) % philosophyVideos.length;
        playPhilosophyVideo(nextIndex);
      }, 500);
    };
  } else {
    // Fallback to YouTube (existing logic)
    const iframe = embed.querySelector('iframe');
    const params = '?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3';
    iframe.src = `https://www.youtube.com/embed/${videoData.youtube}${params}`;
    embed.classList.add('playing');
  }
}

// Enhanced video play handler
document.addEventListener('click', async (e) => {
  const playBtn = e.target.closest('.video-play');
  if (!playBtn) return;
  
  e.preventDefault();
  
  const embed = playBtn.closest('.video-embed');
  const videoId = embed.dataset.videoId;
  const index = philosophyVideos.findIndex(v => v.youtube === videoId);
  
  if (index !== -1) {
    playPhilosophyVideo(index);
  }
});

function playNextVideo() {
  if (!currentLocalVideo) return;
  
  const currentSrc = currentLocalVideo.src;
  const currentIndex = philosophyVideos.findIndex(v => v.path === currentSrc);
  
  if (currentIndex !== -1) {
    const nextIndex = (currentIndex + 1) % philosophyVideos.length;
    playPhilosophyVideo(nextIndex);
  }
}

// Initialize videos on load
document.addEventListener('DOMContentLoaded', () => {
  initLocalVideos();
  initStickyPlayer();
});

// Update video mode on toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.local-video-toggle')) {
    toggleLocalMode();
  }
});

// Console message
console.log('%c🏗️ Arcadia Architecture Studio', 'font-size: 20px; font-weight: bold; color: #e74c3c;');
console.log('%cWebsite designed with ❤️', 'font-size: 14px; color: #2c3e50;');

// Prevent console errors in production
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  console.log = function() {};
  console.warn = function() {};
  console.error = function() {};
}

