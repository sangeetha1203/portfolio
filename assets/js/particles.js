/* ==========================================================
   PARTICLE NETWORK (hero background)

   Performance notes — this file used to be the single biggest
   cost on the page and the main cause of "stuck" mobile
   scrolling:
     1. ctx.shadowBlur is one of the most expensive Canvas 2D
        operations there is; it was set on every particle, every
        frame, forever. Removed on mobile, capped on desktop.
     2. connectParticles() compares every particle against every
        other particle (O(n^2)) — with 70 mobile particles that's
        ~2,400 distance checks + potential line draws per frame.
        Skipped on mobile entirely; the particles alone still
        read as a network.
     3. The animation loop ran unconditionally forever, even
        after the hero scrolled off-screen or the tab lost
        focus — burning CPU/GPU that competes directly with
        scroll compositing. Now pauses via IntersectionObserver
        and the Page Visibility API.
========================================================== */

(function () {

  const canvas = document.getElementById("particles-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Respect reduced-motion preference: skip the effect entirely.
  if (prefersReducedMotion) return;

  const COLORS = ["#2F6FED", "#EC4899", "#DB2777"];
  const CONNECT_DISTANCE = 120;

  let particles = [];
  let running = false;
  let rafId = null;

  const mouse = { x: null, y: null, radius: 140 };

  /* ---------- Canvas sizing ---------- */

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resizeCanvas();
      createParticles();
    }, 200);
  });

  /* ---------- Mouse (desktop only — mobile has no hover) ---------- */

  if (!isMobile) {
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }, { passive: true });

    window.addEventListener("mouseleave", () => {
      mouse.x = null;
      mouse.y = null;
    });
  }

  /* ---------- Particle ---------- */

  class Particle {
    constructor() {
      this.reset();
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          this.x -= dx * 0.01;
          this.y -= dy * 0.01;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;

      // shadowBlur is very expensive per-particle, per-frame —
      // desktop only, and modest.
      if (!isMobile) {
        ctx.shadowBlur = 8;
        ctx.shadowColor = this.color;
      }

      ctx.fill();
    }
  }

  /* ---------- Create particles ---------- */

  function createParticles() {
    particles = [];
    const count = isMobile ? 28 : 140;

    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  createParticles();

  /* ---------- Connecting lines (desktop only — this is the O(n^2) part) ---------- */

  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECT_DISTANCE) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(47,111,237," + (1 - distance / CONNECT_DISTANCE) * 0.18 + ")";
          ctx.lineWidth = 1;
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  /* ---------- Animation loop ---------- */

  function animate() {
    if (!running) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    if (!isMobile) connectParticles();

    rafId = requestAnimationFrame(animate);
  }

  function start() {
    if (running) return;
    running = true;
    rafId = requestAnimationFrame(animate);
  }

  function stop() {
    running = false;
    if (rafId) cancelAnimationFrame(rafId);
  }

  /* ---------- Only run while the hero is actually visible -----------
     This is the single biggest fix: the loop used to run forever,
     including while scrolled deep into the page or the browser
     tab was in the background, competing with scroll rendering
     the whole time for no visible benefit. */

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && document.visibilityState === "visible") {
        start();
      } else {
        stop();
      }
    });
  }, { threshold: 0 });

  observer.observe(canvas);

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      stop();
    } else if (canvas.getBoundingClientRect().bottom > 0) {
      start();
    }
  });

})();
