/* ==========================================================
   CUSTOM CURSOR
   Dot follows the pointer instantly, the outline trails with
   a little lag, and both react when hovering anything clickable
   — small touches that make the site feel alive under the hand.
========================================================== */

(function () {
  const glow = document.querySelector(".mouse-glow");
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");

  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  if (typeof gsap === "undefined") return;

  // quickTo reuses one tween instead of spawning a new one on every
  // mousemove event (mousemove can fire 60-120+ times a second) —
  // far cheaper and keeps the main thread free while scrolling.
  const glowX = gsap.quickTo(glow, "x", { duration: 0.35, ease: "power2.out" });
  const glowY = gsap.quickTo(glow, "y", { duration: 0.35, ease: "power2.out" });

  const dotX = dot ? gsap.quickTo(dot, "x", { duration: 0.08, ease: "power2.out" }) : null;
  const dotY = dot ? gsap.quickTo(dot, "y", { duration: 0.08, ease: "power2.out" }) : null;

  const outlineX = outline ? gsap.quickTo(outline, "x", { duration: 0.35, ease: "power3.out" }) : null;
  const outlineY = outline ? gsap.quickTo(outline, "y", { duration: 0.35, ease: "power3.out" }) : null;

  window.addEventListener("mousemove", e => {
    glowX(e.clientX);
    glowY(e.clientY);
    dotX && dotX(e.clientX);
    dotY && dotY(e.clientY);
    outlineX && outlineX(e.clientX);
    outlineY && outlineY(e.clientY);
  }, { passive: true });

  // Grow the outline / hide the dot over anything clickable
  const hoverTargets = "a, button, .btn, .project-tab, .phase-tab, .ideas-tab, [role='button']";

  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverTargets)) {
      outline?.classList.add("cursor-hover");
      dot?.classList.add("cursor-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverTargets)) {
      outline?.classList.remove("cursor-hover");
      dot?.classList.remove("cursor-hover");
    }
  });

  // A quick little "squeeze" on click for tactile feedback
  window.addEventListener("mousedown", () => outline?.classList.add("cursor-click"));
  window.addEventListener("mouseup", () => outline?.classList.remove("cursor-click"));
})();
