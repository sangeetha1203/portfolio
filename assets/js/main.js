/* ==========================================================
   MAIN
   Mobile navigation toggle, smooth scrolling, and the
   generic scroll-reveal observer used by several sections.
========================================================== */

/* ---------- Smooth Scroll (Lenis, synced with GSAP/ScrollTrigger) ---------- */

(function () {
  if (typeof Lenis === "undefined") return;

  const lenis = new Lenis({
    duration: 1.1,
    smoothWheel: true,
    // Lenis owns the scroll position; don't fight with the
    // browser's own smooth-scroll (see global.css).
    autoRaf: false
  });

  window.lenis = lenis;

  // Drive Lenis from GSAP's ticker instead of its own
  // requestAnimationFrame loop, so it stays perfectly in sync
  // with every ScrollTrigger-based animation on the page.
  if (typeof gsap !== "undefined") {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    lenis.on("scroll", () => {
      if (typeof ScrollTrigger !== "undefined") ScrollTrigger.update();
    });
  } else {
    // Fallback if GSAP hasn't loaded for some reason
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Route in-page anchor links (nav, hero buttons, footer, etc.)
  // through Lenis so every jump uses the same smooth scroll —
  // otherwise clicking a link causes an instant native jump that
  // Lenis then has to "catch up" from, which looks like a stutter.
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const id = link.getAttribute("href");
    if (id.length < 2) return;

    const target = document.querySelector(id);
    if (!target) return;

    e.preventDefault();
    lenis.scrollTo(target, { offset: -80 });
  });
})();

/* ---------- ScrollTrigger reliability ----------
   ScrollTrigger calculates each animation's trigger position once,
   early on. If web fonts or anything else shifts page height after
   that (or a tabbed panel changes height), those positions go stale
   and a "reveal on scroll" animation can simply never fire — which
   looks like the content silently disappeared. Refreshing after full
   load and after every tab switch keeps positions accurate. */

(function () {
  if (typeof ScrollTrigger === "undefined") return;

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
    setTimeout(() => ScrollTrigger.refresh(), 500);
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".phase-tab, .ideas-tab, .project-tab")) {
      setTimeout(() => ScrollTrigger.refresh(), 350);
    }
  });
})();

/* ---------- Safety net: never let content stay invisible -----------
   Belt-and-suspenders fallback. If any scroll-reveal animation fails
   to fire for any reason (a mistimed trigger, a slow-loading script,
   etc.), force every such element visible a couple of seconds after
   load so real content is never permanently hidden. */

(function () {
  const revealSelectors = [
    ".skill-card", ".experience-card", ".info-card", ".stat-card",
    ".design-card", ".blog-card", ".internship-card", ".about-right",
    ".reveal", ".reveal-up", ".reveal-fade"
  ].join(", ");

  window.addEventListener("load", () => {
    setTimeout(() => {
      document.querySelectorAll(revealSelectors).forEach(el => {
        if (el.offsetParent === null) return; // inside a hidden panel — leave it
        if (getComputedStyle(el).opacity !== "0") return;

        if (typeof gsap !== "undefined") {
          gsap.to(el, { opacity: 1, y: 0, x: 0, duration: 0.5, clearProps: "transform" });
        } else {
          el.style.opacity = "1";
        }
      });
    }, 2000);
  });
})();

/* ---------- Mobile Navigation ---------- */

(function () {
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuBtn.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });
})();

/* ---------- Generic Reveal-On-Scroll ---------- */

(function () {
  const items = document.querySelectorAll(".reveal-up, .reveal-fade, .reveal-stagger");
  if (!items.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => io.observe(el));
})();

/* ---------- "Contact Me" quick-links jump to the Say Hello modal ---------- */

document.addEventListener("click", (e) => {
  const link = e.target.closest(".contact-scroll");
  if (!link) return;
  e.preventDefault();

  const target = document.getElementById("contact");
  if (window.lenis && target) {
    window.lenis.scrollTo(target, { offset: -80 });
  } else {
    target?.scrollIntoView({ behavior: "smooth" });
  }

  setTimeout(() => document.getElementById("say-hello-btn")?.click(), 600);
});
