/* ==========================================================
   PROJECTS SECTION
   Renders a single continuous "story" for the active project:
   Header (title, subtitle, inline meta) → Overview →
   Technology Stack → Features → Actions → Previous / Next.
   Driven entirely by PROJECTS (see /projects-data.js).
========================================================== */

(function () {

  const tabsWrap = document.querySelector(".project-tabs");
  const container = document.getElementById("project-container");

  if (!tabsWrap || !container || typeof PROJECTS === "undefined") return;

  let activeIndex = 0;

  /* -------------------------------------------------
     Small helpers
  ------------------------------------------------- */

  function placeholder(label) {
    return `
      <div class="img-placeholder">
        <i class="fas fa-image"></i>
        <span>${label}</span>
      </div>`;
  }

  // Renders a real project image when one is provided in
  // projects-data.js, and falls back to a placeholder — both
  // up front (no path given yet) and gracefully if the image
  // fails to load (path given but file not added yet).
  function mediaHTML(src, label) {
    if (!src) return placeholder(label);
    return `<img src="${src}" alt="${label}" class="story-img" loading="lazy" decoding="async" data-fallback-label="${label}">`;
  }

  function wireImageFallbacks(scope) {
    scope.querySelectorAll(".story-img").forEach(img => {
      img.addEventListener("error", () => {
        img.outerHTML = placeholder(img.dataset.fallbackLabel || "Image");
      }, { once: true });
    });
  }

  function actionButtons(p) {
    const btns = [];

    if (p.repository.type === "private") {
      const mail = `mailto:hello@example.com?subject=${encodeURIComponent(p.repository.emailSubject || p.title)}`;
      btns.push(`<a href="${mail}" class="btn btn-primary"><i class="fas fa-envelope"></i> Contact Me For Source Code</a>`);
    } else {
      btns.push(`<a href="${p.repository.url || '#'}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fab fa-github"></i> GitHub</a>`);
    }

    if (p.repository.type !== "private") {
      btns.push(`<a href="#contact" class="btn btn-primary contact-scroll"><i class="fas fa-comment-dots"></i> Contact Me</a>`);
    }

    return btns.join("");
  }

  /* -------------------------------------------------
     Render one project as a single continuous story
  ------------------------------------------------- */

  function render(index) {

    activeIndex = (index + PROJECTS.length) % PROJECTS.length;
    const p = PROJECTS[activeIndex];

    // sync tabs
    document.querySelectorAll(".project-tab").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.project === p.id);
    });

    const techHTML = p.techStack.map(group => `
      <div class="tech-group">
        <h4>${group.group}</h4>
        <div class="tech-list">
          ${group.items.map(t => `<span>${t}</span>`).join("")}
        </div>
      </div>`).join("");

    const featuresHTML = p.features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join("");

    const images = p.images || {};

    container.innerHTML = `
      <article class="project-story" data-project="${p.id}">

        <!-- Header : title, subtitle, inline metadata -->
        <header class="story-header reveal">
          <span class="project-badge">${p.tag}</span>
          <h3>${p.title}</h3>
          <p>${p.subtitle}</p>

          <div class="story-meta-inline">
            <span><i class="fas fa-circle-dot"></i> ${p.meta.status}</span>
            <span><i class="fas fa-user"></i> ${p.meta.role}</span>
            <span><i class="fas fa-display"></i> ${p.meta.platform}</span>
          </div>
        </header>

        <!-- Overview : Image Left / Text Right -->
        <div class="story-block reveal">
          <div class="story-media">${mediaHTML(images.overview, p.title + " overview")}</div>
          <div class="story-text">
            <span class="story-label">Overview</span>
            <p>${p.overview}</p>
          </div>
        </div>

        <!-- Technology : Text Left / Image Right -->
        <div class="story-block reverse reveal">
          <div class="story-media">${mediaHTML(images.tech, p.title + " architecture")}</div>
          <div class="story-text">
            <span class="story-label">Technology Stack</span>
            <div class="tech-groups">${techHTML}</div>
          </div>
        </div>

        <!-- Features : Image Left / Text Right -->
        <div class="story-block reveal">
          <div class="story-media">${mediaHTML(images.feature, p.title + " features")}</div>
          <div class="story-text">
            <span class="story-label">Key Features</span>
            <ul class="feature-list">${featuresHTML}</ul>
          </div>
        </div>

        <!-- Actions -->
        <div class="story-actions-block reveal">
          <p>Interested in exploring the implementation?</p>
          <div class="story-actions">${actionButtons(p)}</div>
        </div>

        <!-- Previous / Next -->
        <div class="project-flow reveal">
          <button class="flow-btn prev-project" type="button">
            <i class="fas fa-arrow-left"></i>
            <span>${PROJECTS[(activeIndex - 1 + PROJECTS.length) % PROJECTS.length].title}</span>
          </button>
          <button class="flow-btn next-project" type="button">
            <span>${PROJECTS[(activeIndex + 1) % PROJECTS.length].title}</span>
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

      </article>`;

    wireImageFallbacks(container);

    container.querySelector(".prev-project").addEventListener("click", () => goTo(activeIndex - 1));
    container.querySelector(".next-project").addEventListener("click", () => goTo(activeIndex + 1));

    revealOnScroll();
  }

  function goTo(index) {
    render(index);
    const section = document.getElementById("projects");

    if (window.lenis) {
      window.lenis.scrollTo(section, { offset: -90 });
    } else {
      const top = section.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  /* -------------------------------------------------
     Reveal-on-scroll for story blocks
  ------------------------------------------------- */

  function revealOnScroll() {
    const items = container.querySelectorAll(".reveal:not(.in-view)");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    items.forEach(el => io.observe(el));
  }

  /* -------------------------------------------------
     Tab clicks
  ------------------------------------------------- */

  tabsWrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".project-tab");
    if (!btn) return;
    const idx = PROJECTS.findIndex(p => p.id === btn.dataset.project);
    if (idx > -1) render(idx);
  });

  render(0);

})();
