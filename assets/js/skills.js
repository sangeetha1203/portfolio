/* ==========================================================
   ENGINEERING TOOLKIT (skill cards inside the Process section)
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".skill-card", {

        scrollTrigger: {

            trigger: ".skills-grid",

            start: "top 80%",

            toggleActions: "play none none none"

        },

        opacity: 0,

        y: 40,

        duration: 0.7,

        stagger: 0.12,

        ease: "power3.out"

    });

});
