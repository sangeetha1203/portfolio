/* ==========================================================
   PROCESS SECTION — phase tabs + accordion steps
========================================================== */

(function () {
  const tabs = document.querySelectorAll(".phase-tab");
  const panels = document.querySelectorAll(".phase-panel");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`phase-${tab.dataset.phase}`)?.classList.add("active");
    });
  });
})();

(function () {
  const steps = document.querySelectorAll(".process-step");
  if (!steps.length) return;

  steps.forEach(step => {
    step.addEventListener("click", () => {
      const isActive = step.classList.contains("active");
      steps.forEach(s => s.classList.remove("active"));
      if (!isActive) step.classList.add("active");
    });
  });

  // Open the first step by default
  steps[0].classList.add("active");
})();
