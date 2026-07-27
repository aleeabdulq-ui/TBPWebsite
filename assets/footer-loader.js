(function(){
  const NEW_FOOTER_HTML_URL = '../assets/footer.html';
  const NEW_FOOTER_CSS_URL = '../assets/footer.css';
  const loadFooter = async () => {
    try {
      const resp = await fetch(NEW_FOOTER_HTML_URL);
      if (!resp.ok) throw new Error('Footer fetch failed');
      const html = await resp.text();
      replaceFooter(html);
      ensureFooterCSS();
      setYear();
      initFooterForms();
    } catch (e) {
      console.warn('Footer loader failed:', e);
      injectFooterFallback();
      ensureFooterCSS();
      setYear();
      initFooterForms();
    }
  };

  function ensureFooterCSS() {
    if (!document.querySelector('link[data-footer="true"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = NEW_FOOTER_CSS_URL;
      link.setAttribute('data-footer','true');
      document.head.appendChild(link);
    }
  }

  function getFooterTarget() {
    return document.getElementById('footer') || document.querySelector('footer.footer');
  }

  function replaceFooter(html) {
    const oldFooter = getFooterTarget();
    if (oldFooter) {
      oldFooter.outerHTML = html;
      return;
    }

    document.body.insertAdjacentHTML('beforeend', html);
  }

  function injectFooterFallback() {
    const FALLBACK_HTML = `
<footer class="footer" id="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-main">
        <div class="footer-brand">
          <a href="index.html" class="footer-logo">
            <img src="../images/bp.png" alt="TBP Logo">
            <span class="footer-logo-text">The Building Practice</span>
          </a>
          <p>An architectural firm dedicated to shaping spaces that inspire, endure, and connect. Creating thoughtful, sustainable, and contextually relevant designs since 2013.</p>
          <div class="footer-social">
            <a href="https://www.facebook.com/thebuildingpractice" target="_blank" rel="noopener" aria-label="Facebook"><i class="bx bxl-facebook"></i></a>
            <a href="https://x.com/thebplimited" target="_blank" rel="noopener" aria-label="Twitter"><i class="bx bxl-twitter"></i></a>
            <a href="https://www.instagram.com/thebuildingpractice" target="_blank" rel="noopener" aria-label="Instagram"><i class="bx bxl-instagram"></i></a>
            <a href="https://www.linkedin.com/company/the-building-practice-ltd/" target="_blank" rel="noopener" aria-label="LinkedIn"><i class="bx bxl-linkedin"></i></a>
          </div>
        </div>

        <div class="footer-column">
          <h4>Quick Links</h4>
          <ul class="footer-links">
            <li><a href="index.html"><i class="bx bx-chevron-right"></i><span>Home</span></a></li>
            <li><a href="about.html"><i class="bx bx-chevron-right"></i><span>About</span></a></li>
            <li><a href="services.html"><i class="bx bx-chevron-right"></i><span>Services</span></a></li>
            <li><a href="projects.html"><i class="bx bx-chevron-right"></i><span>Projects</span></a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>Our Services</h4>
          <ul class="footer-links">
            <li><a href="services.html"><i class="bx bx-chevron-right"></i><span>Architecture</span></a></li>
            <li><a href="services.html"><i class="bx bx-chevron-right"></i><span>Interior Design</span></a></li>
            <li><a href="services.html"><i class="bx bx-chevron-right"></i><span>Construction</span></a></li>
            <li><a href="services.html"><i class="bx bx-chevron-right"></i><span>Consultancy</span></a></li>
          </ul>
        </div>

        <div class="footer-column footer-main-bottom">
          <h4>Contact Info</h4>
          <ul class="footer-links">
            <li><i class="bx bx-map"></i><span>Plot 6, Remi Olowude, Lekki Phase 1</span></li>
            <li><a href="tel:+2349049721840"><i class="bx bx-phone"></i><span>+234 904 972 1840</span></a></li>
            <li><a href="mailto:info@buildingpractice.biz"><i class="bx bx-envelope"></i><span>info@buildingpractice.biz</span></a></li>
            <li><i class="bx bx-time"></i><span>Mon - Fri: 9AM - 5PM</span></li>
          </ul>
        </div>
      </div>

      <div class="footer-newsletter">
        <h4 class="newsletter-title">Subscribe</h4>
        <p class="newsletter-description">Get the latest updates and insights</p>
        <form class="newsletter-form" id="footerNewsletterForm" novalidate>
          <input type="email" name="email" placeholder="Email address" aria-label="Email address" required>
          <button type="submit" class="btn btn--primary btn--sm">Subscribe</button>
        </form>
        <p class="newsletter-privacy">We respect your privacy.</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p class="footer-copyright">© <span id="currentYear">2024</span> The Building Practice Ltd. All Rights Reserved.</p>
      <div class="footer-legal"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a><a href="#">Sitemap</a></div>
    </div>
  </div>
</footer>`;
    replaceFooter(FALLBACK_HTML);
  }

  function setYear(){
    const el = document.getElementById('currentYear');
    if (el) el.textContent = new Date().getFullYear();
  }

  function showToast(msg){
    let t = document.getElementById('footerToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'footerToast';
      t.style.position = 'fixed';
      t.style.bottom = '20px';
      t.style.left = '50%';
      t.style.transform = 'translateX(-50%)';
      t.style.background = 'rgba(0,0,0,.8)';
      t.style.color = '#fff';
      t.style.padding = '10px 14px';
      t.style.borderRadius = '6px';
      t.style.zIndex = '9999';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 2500);
  }

  function initFooterForms(){
    const f = document.querySelector('#footerNewsletterForm') || document.querySelector('.newsletter-form');
    if (!f) return;
    if (f.dataset.footerBound === 'true') return;

    f.dataset.footerBound = 'true';
    f.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = f.querySelector('input[type="email"]');
      if (email && email.value.includes('@')) {
        showToast("Thank you for subscribing! You'll receive our latest updates.");
        f.reset();
      } else {
        showToast('Please enter a valid email address.');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', loadFooter);
})();
