/* ==========================================================
   MICRO-INTERACTIONS
   Small, tasteful bits of motion that respond directly to the
   person using the site — magnetic buttons, tilting cards, a
   scroll progress bar, click ripples, and counting stats.
========================================================== */

/* ---------- Scroll progress bar ---------- */

(function () {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = pct + "%";
  }

  if (window.lenis) {
    window.lenis.on("scroll", update);
  } else {
    window.addEventListener("scroll", update, { passive: true });
  }
  update();
})();

/* ---------- Magnetic buttons ---------- */
/* The button drifts a few px toward the cursor while hovered,
   then springs back to rest on leave — a subtle "it noticed you"
   effect rather than a literal magnet. */

(function () {
  const magnets = document.querySelectorAll(".magnetic, .btn-primary, .btn-secondary");
  if (!magnets.length || typeof gsap === "undefined") return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  magnets.forEach(el => {
    const strength = 0.25;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.4,
        ease: "power3.out"
      });
    });

    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    });
  });
})();

/* ---------- Tilt cards ---------- */
/* A gentle 3D tilt that follows the cursor across the card,
   like the card is a little responsive to being looked at. */

(function () {
  const cards = document.querySelectorAll(".tilt-card");
  if (!cards.length) return;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  cards.forEach(card => {
    const maxTilt = 8;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;   // 0 -> 1
      const py = (e.clientY - rect.top) / rect.height;   // 0 -> 1

      const ry = (px - 0.5) * (maxTilt * 2);
      const rx = (0.5 - py) * (maxTilt * 2);

      card.style.setProperty("--rx", rx.toFixed(2) + "deg");
      card.style.setProperty("--ry", ry.toFixed(2) + "deg");
    });

    card.addEventListener("mouseleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
})();

/* ---------- Button ripple ---------- */
/* A quick circular ripple from the exact click point — the kind
   of tactile feedback that makes a click feel registered. */

(function () {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-primary, #say-hello-btn");
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement("span");

    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

    btn.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  });
})();

/* ---------- Animated stat counters ---------- */
/* Numbers count up from 0 the first time they scroll into view —
   more satisfying to watch than a number that's just... there. */

(function () {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);

      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const value = Math.round(target * eased);
        el.textContent = value + suffix;

        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  counters.forEach(el => io.observe(el));
})();
