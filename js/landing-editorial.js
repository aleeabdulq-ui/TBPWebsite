(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");

  const updateHeader = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 36);
  };

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
    navigation?.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  navigation?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  const heroSlider = document.querySelector("[data-hero-slider]");
  const heroImages = [...document.querySelectorAll(".hero-image")];
  const heroTitle = document.querySelector("[data-hero-title]");
  const heroDetail = document.querySelector("[data-hero-detail]");
  const transitions = ["transition-fade", "transition-wipe", "transition-zoom", "transition-slide", "transition-focus"];
  let activeHeroIndex = 0;

  const showNextHero = () => {
    if (heroImages.length < 2) return;

    const previousImage = heroImages[activeHeroIndex];
    activeHeroIndex = (activeHeroIndex + 1) % heroImages.length;
    const nextImage = heroImages[activeHeroIndex];
    const transitionClass = transitions[activeHeroIndex % transitions.length];

    previousImage.classList.remove("is-active", ...transitions);
    previousImage.classList.add("is-leaving");
    nextImage.classList.remove("is-leaving", ...transitions);
    nextImage.classList.add("is-active", transitionClass);

    if (heroTitle) heroTitle.textContent = nextImage.dataset.title || "Featured project";
    if (heroDetail) heroDetail.textContent = nextImage.dataset.detail || "";

    window.setTimeout(() => previousImage.classList.remove("is-leaving"), 1200);
  };

  if (heroSlider && heroImages.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroImages[0].classList.add(transitions[0]);
    window.setInterval(showNextHero, 3500);
  }

  const observer = new IntersectionObserver((entries, activeObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      activeObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: "0px 0px -6%" });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
