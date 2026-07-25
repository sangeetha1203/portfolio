/* ==========================================================
   IDEAS & INSIGHTS — tab switcher (Design Thinking / Articles)
========================================================== */

(function () {
  const tabs = document.querySelectorAll(".ideas-tab");
  const panels = document.querySelectorAll(".ideas-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`ideas-${tab.dataset.ideas}`)?.classList.add("active");
    });
  });
})();

/* Fall back to a plain placeholder box if a design-card cover
   image path is ever missing, instead of a broken-image icon. */
(function () {
  document.querySelectorAll(".design-preview img").forEach(img => {
    img.addEventListener("error", () => {
      img.closest(".design-preview").innerHTML =
        '<div class="img-placeholder"><i class="fas fa-image"></i><span>UI Preview</span></div>';
    }, { once: true });
  });
})();


/* ---------- Design Modal ---------- */

(function () {

    const cards = document.querySelectorAll(".design-card");
    const overlay = document.getElementById("design-modal");

    if (!cards.length || !overlay) return;

    const closeBtn = overlay.querySelector(".modal-close");
    const closeBtn2 = overlay.querySelector(".design-close-btn");

    const title = document.getElementById("dm-title");
    const description = document.getElementById("dm-description");
    const img1 = document.getElementById("dm-img1");
    const img2 = document.getElementById("dm-img2");

    // If an image path is missing or fails to load, hide that slot
    // instead of showing a broken-image icon.
    function setImage(imgEl, src) {
        imgEl.style.display = src ? "" : "none";
        imgEl.onerror = () => { imgEl.style.display = "none"; };
        if (src) imgEl.src = src;
    }

    function open(card){

        title.textContent = card.dataset.title;
        description.textContent = card.dataset.description;

        setImage(img1, card.dataset.img1);
        setImage(img2, card.dataset.img2);

        overlay.classList.add("open");
        document.body.style.overflow = "hidden";

    }

    function close(){

        overlay.classList.remove("open");
        document.body.style.overflow = "";

    }

    cards.forEach(card=>{

        card.querySelector(".explore-btn").addEventListener("click",()=>open(card));

    });

    closeBtn.addEventListener("click",close);
    closeBtn2.addEventListener("click",close);

    overlay.addEventListener("click",(e)=>{

        if(e.target===overlay) close();

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Escape" && overlay.classList.contains("open")) close();

    });

})();


/* ---------- Article preview modal ---------- */

(function () {
  const cards = document.querySelectorAll(".blog-card");
  const overlay = document.getElementById("article-modal");
  if (!cards.length || !overlay) return;

  const closeBtn = overlay.querySelector(".modal-close");

  const tagEl = document.getElementById("am-tag");
  const titleEl = document.getElementById("am-title");
  const dateEl = document.getElementById("am-date");
  const previewEl = document.getElementById("am-preview");
  const readFullEl = document.getElementById("am-read-full");

  const clean = (s) => (s || "").replace(/\s+/g, " ").trim();

  function open(card) {
    tagEl.textContent = card.querySelector(".blog-card-tag")?.textContent || "";
    titleEl.textContent = card.dataset.title || "";
    dateEl.textContent = card.dataset.date || "";
    previewEl.textContent = clean(card.dataset.preview);
    readFullEl.href = card.dataset.url || "#";

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  cards.forEach(card => {
    card.querySelector(".blog-card-link")?.addEventListener("click", () => open(card));
  });

  closeBtn?.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });
})();

/* ==========================================================
   ARTICLE CAROUSEL
========================================================== */

(function () {
  const track = document.querySelector(".blog-carousel");
  const prev = document.querySelector(".blog-nav .prev");
  const next = document.querySelector(".blog-nav .next");

  if (!track || !prev || !next) return;

  function scrollByCard(direction) {
    const card = track.querySelector(".blog-card");
    if (!card) return;
    const gap = 24;
    const distance = card.offsetWidth + gap;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  prev.addEventListener("click", () => scrollByCard(-1));
  next.addEventListener("click", () => scrollByCard(1));
})();
