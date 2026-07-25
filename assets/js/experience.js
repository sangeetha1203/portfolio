/* ==========================================================
   EXPERIENCE ANIMATIONS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.from("#experience .section-header",{

        scrollTrigger:{

            trigger:"#experience",

            start:"top 80%"

        },

        opacity:0,

        y:50,

        duration:.8,

        ease:"power3.out"

    });

    gsap.from(".experience-card",{

        scrollTrigger:{

            trigger:".experience-grid",

            start:"top 75%"

        },

        opacity:0,

        y:40,

        duration:.7,

        stagger:.15,

        ease:"power3.out"

    });

});
/* ==========================================================
   INTERNSHIP DETAIL MODAL
========================================================== */

(function () {
  const cards = document.querySelectorAll(".internship-card");
  const overlay = document.getElementById("internship-modal");
  if (!cards.length || !overlay) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const closeBtn2 = overlay.querySelector(".internship-close-btn");

  const iconEl = document.getElementById("im-icon");
  const roleEl = document.getElementById("im-role");
  const companyEl = document.getElementById("im-company");
  const domainEl = document.getElementById("im-domain");
  const durationEl = document.getElementById("im-duration");
  const gainedEl = document.getElementById("im-gained");

  function open(card) {
    iconEl.textContent = card.querySelector(".internship-icon")?.textContent || "💼";
    roleEl.textContent = card.dataset.role || "";
    companyEl.textContent = card.dataset.company || "";
    domainEl.textContent = card.dataset.domain || "";
    durationEl.textContent = card.dataset.duration || "";
    gainedEl.textContent = (card.dataset.gained || "").replace(/\s+/g, " ").trim();

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  cards.forEach(card => card.addEventListener("click", () => open(card)));

  closeBtn?.addEventListener("click", close);
  closeBtn2?.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });
})();
