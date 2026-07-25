/* ==========================================================
   ABOUT SECTION ANIMATIONS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ==========================================
    // SECTION HEADER
    // ==========================================

    gsap.from(".section-header", {

        scrollTrigger: {

            trigger: ".section-header",

            start: "top 80%"

        },

        opacity: 0,

        y: 60,

        duration: 1

    });

    // ==========================================
    // IMAGE
    // ==========================================

    gsap.from(".about-image-card", {

        scrollTrigger: {

            trigger: ".about-image-card",

            start: "top 80%"

        },

        x: -80,

        opacity: 0,

        duration: 1

    });

    // ==========================================
    // RIGHT CONTENT
    // ==========================================

    gsap.from(".about-right", {

        scrollTrigger: {

            trigger: ".about-right",

            start: "top 80%"

        },

        x: 80,

        opacity: 0,

        duration: 1

    });

    // ==========================================
    // INFO CARDS
    // ==========================================

    gsap.from(".info-card", {

        scrollTrigger: {

            trigger: ".about-info",

            start: "top 80%"

        },

        y: 40,

        opacity: 0,

        stagger: 0.15,

        duration: 0.8

    });
    // ==========================================
// EXPERIENCE CARDS
// ==========================================

gsap.from(".experience-card", {

    scrollTrigger: {

        trigger: ".experience-grid",

        start: "top 75%"

    },

    y: 40,

    opacity: 0,

    stagger: 0.2,

    duration: 0.8

});

});



/* ==========================================================
   COUNTER ANIMATION
========================================================== */

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;

        const target = Number(counter.dataset.target);

        let current = 0;

        const step = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {

            current += step;

            if (current >= target) {

                current = target;

                clearInterval(timer);

            }

            counter.textContent = current + "+";

        }, 20);

        observer.unobserve(counter);

    });

}, {

    threshold: 0.5

});

counters.forEach(counter => observer.observe(counter));


/* ==========================================================
   FLOATING IMAGE
========================================================== */

gsap.to(".about-image-card", {

    y: -12,

    duration: 3,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});


/* ==========================================================
   BACKGROUND PARALLAX
========================================================== */

window.addEventListener("mousemove", (e) => {

    const x = (e.clientX / window.innerWidth - 0.5) * 20;

    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    gsap.to(".circle-one", {

        x,

        y,

        duration: 2

    });

    gsap.to(".circle-two", {

        x: -x,

        y: -y,

        duration: 2

    });

});

