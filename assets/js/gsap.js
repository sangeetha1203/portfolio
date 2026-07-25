/* ==========================================================
   GSAP Animations
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    gsap.registerPlugin(ScrollTrigger);

    // ======================================
    // HERO TIMELINE
    // ======================================

    const heroTimeline = gsap.timeline({

        delay: 0.2

    });

    heroTimeline

    .from("#navbar", {

        y: -80,

        opacity: 0,

        duration: 0.8,

        ease: "power3.out"

    })

    .from(".hero-small", {

        y: 40,

        opacity: 0,

        duration: 0.7,

        ease: "power3.out"

    }, "-=0.3")

    .from(".hero-title", {

        y: 60,

        opacity: 0,

        duration: 1,

        ease: "power4.out"

    }, "-=0.4")

    .from(".hero-heading", {

        y: 40,

        opacity: 0,

        duration: 0.8,

        ease: "power3.out"

    }, "-=0.6")

    .from(".typing-wrapper", {

        y: 25,

        opacity: 0,

        duration: 0.6

    }, "-=0.5")

    .from(".hero-description", {

        y: 30,

        opacity: 0,

        duration: 0.8

    }, "-=0.4")

    .from(".hero-buttons .btn", {

        y: 30,

        opacity: 0,

        stagger: 0.2,

        duration: 0.6

    }, "-=0.5")

    .from(".hero-social a", {

        scale: 0,

        opacity: 0,

        stagger: 0.1,

        duration: 0.4,

        ease: "back.out(2)"

    }, "-=0.3")

    .from(".profile-wrapper", {

        scale: 0.7,

        opacity: 0,

        duration: 1,

        ease: "power3.out"

    }, "-=1")

    .from(".floating", {

        opacity: 0,

        scale: 0,

        stagger: 0.15,

        duration: 0.4,

        ease: "back.out(2)"

    }, "-=0.6")

    .from(".scroll-indicator", {

        opacity: 0,

        y: 20,

        duration: 0.8

    }, "-=0.4");

});



/* ==========================================================
   SCROLL REVEALS
========================================================== */

gsap.utils.toArray("section").forEach(section => {

    gsap.from(section, {

        scrollTrigger: {

            trigger: section,

            start: "top 80%"

        },

        y: 60,

        opacity: 0,

        duration: 1,

        ease: "power3.out"

    });

});



/* ==========================================================
   AURORA BLOBS
========================================================== */

gsap.to(".blob1", {

    x: 80,

    y: -40,

    duration: 10,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".blob2", {

    x: -60,

    y: 50,

    duration: 12,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".blob3", {

    x: 40,

    y: 60,

    duration: 14,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});