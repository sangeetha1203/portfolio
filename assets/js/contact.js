/* ==========================================================
   CONTACT MODAL
========================================================== */

(function () {
  const openBtn = document.getElementById("say-hello-btn");
  const overlay = document.getElementById("contact-modal");
  if (!openBtn || !overlay) return;

  const closeBtn = overlay.querySelector(".modal-close");
  const form = overlay.querySelector("#contact-form");
  const successBox = overlay.querySelector(".form-success");

  function open() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) close();
  });

  /* --------------------------------------------------------
     Form submit
     No backend is wired up yet — this opens the visitor's
     email client pre-filled with their message so nothing
     is lost. Swap this for a real endpoint (Formspree,
     EmailJS, your own API, etc.) when you deploy.
  -------------------------------------------------------- */

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#cf-name").value.trim();
      const email = form.querySelector("#cf-email").value.trim();
      const message = form.querySelector("#cf-message").value.trim();

      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@example.com?subject=${subject}&body=${body}`;

      form.reset();
      form.style.display = "none";
      successBox.classList.add("show");

      setTimeout(() => {
        form.style.display = "";
        successBox.classList.remove("show");
      }, 6000);
    });
  }
})();
