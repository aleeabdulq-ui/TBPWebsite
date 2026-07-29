(() => {
  "use strict";

  const root = document.documentElement;
  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  const themeButton = document.querySelector("[data-home-theme]");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation?.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const storedTheme = () => {
    try { return localStorage.getItem("theme") || "system"; } catch (_) { return "system"; }
  };

  const themeIsDark = (choice) => choice === "dark" || (choice === "system" && window.matchMedia?.("(prefers-color-scheme: dark)").matches);

  const applyTheme = (choice, persist = true) => {
    const isDark = themeIsDark(choice);
    root.dataset.theme = isDark ? "dark" : "light";
    root.dataset.themeChoice = choice;
    themeButton?.setAttribute("aria-pressed", String(isDark));
    themeButton?.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    if (persist) {
      try {
        localStorage.setItem("theme", choice);
        localStorage.setItem("adminThemePreference", choice);
      } catch (_) {}
    }
  };

  applyTheme(storedTheme(), false);
  themeButton?.addEventListener("click", () => applyTheme(root.dataset.theme === "dark" ? "light" : "dark"));

  const systemTheme = window.matchMedia?.("(prefers-color-scheme: dark)");
  systemTheme?.addEventListener?.("change", () => { if (storedTheme() === "system") applyTheme("system", false); });

  const hero = document.querySelector("[data-hero-slider]");
  const slides = [...document.querySelectorAll(".hero-image")];
  const title = document.querySelector("[data-hero-title]");
  const detail = document.querySelector("[data-hero-detail]");
  const current = document.querySelector("[data-hero-current]");
  const previousButton = document.querySelector("[data-hero-prev]");
  const nextButton = document.querySelector("[data-hero-next]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionClasses = ["transition-fade", "transition-wipe", "transition-zoom", "transition-slide", "transition-focus"];
  let activeIndex = 0;
  let timer;

  const showSlide = (index) => {
    if (!slides.length) return;
    const previousSlide = slides[activeIndex];
    activeIndex = (index + slides.length) % slides.length;
    const activeSlide = slides[activeIndex];
    const transition = transitionClasses[activeIndex % transitionClasses.length];

    slides.forEach((slide) => slide.classList.remove("is-active", "is-leaving", ...transitionClasses));
    if (previousSlide && previousSlide !== activeSlide) {
      previousSlide.classList.add("is-leaving");
      window.setTimeout(() => previousSlide.classList.remove("is-leaving"), 950);
    }
    activeSlide.classList.add("is-active", transition);

    if (title) title.textContent = activeSlide.dataset.title || "Featured project";
    if (detail) detail.textContent = activeSlide.dataset.detail || "";
    if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  const stopSlider = () => { if (timer) window.clearInterval(timer); };
  const startSlider = () => {
    stopSlider();
    if (!reduceMotion && slides.length > 1) timer = window.setInterval(() => showSlide(activeIndex + 1), 3500);
  };

  previousButton?.addEventListener("click", () => { showSlide(activeIndex - 1); startSlider(); });
  nextButton?.addEventListener("click", () => { showSlide(activeIndex + 1); startSlider(); });
  hero?.addEventListener("mouseenter", stopSlider);
  hero?.addEventListener("mouseleave", startSlider);
  hero?.addEventListener("focusin", stopSlider);
  hero?.addEventListener("focusout", startSlider);
  showSlide(0);
  startSlider();

  const marqueeTrack = document.querySelector("[data-project-marquee]");
  const marqueeSet = marqueeTrack?.querySelector(".marquee-set");
  if (marqueeTrack && marqueeSet) {
    const duplicateSet = marqueeSet.cloneNode(true);
    duplicateSet.setAttribute("aria-hidden", "true");
    duplicateSet.querySelectorAll("a").forEach((link) => link.setAttribute("tabindex", "-1"));
    duplicateSet.querySelectorAll("img").forEach((image) => image.setAttribute("alt", ""));
    marqueeTrack.append(duplicateSet);
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: .08, rootMargin: "0px 0px -5%" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
