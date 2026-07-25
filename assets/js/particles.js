/* ==========================================================
   PARTICLE NETWORK
   Author : Sangeetha Portfolio
========================================================== */

const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");

let particles = [];
let mouse = {
    x: null,
    y: null,
    radius: 140
};

/* ==========================================================
   CANVAS SIZE
========================================================== */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/* ==========================================================
   MOUSE
========================================================== */

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

window.addEventListener("mouseleave", () => {

    mouse.x = null;
    mouse.y = null;

});

/* ==========================================================
   PARTICLE CLASS
========================================================== */

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

        const colors = [
            "#2F6FED",
            "#EC4899",
            "#DB2777"
        ];

        this.color = colors[Math.floor(Math.random() * colors.length)];

    }

    update() {

        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)
            this.speedX *= -1;

        if (this.y < 0 || this.y > canvas.height)
            this.speedY *= -1;

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

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = this.color;

        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;

        ctx.fill();

    }

}

/* ==========================================================
   CREATE PARTICLES
========================================================== */

function createParticles() {

    particles = [];

    const count = window.innerWidth < 768 ? 70 : 140;

    for (let i = 0; i < count; i++) {

        particles.push(new Particle());

    }

}

createParticles();

/* ==========================================================
   CONNECT PARTICLES
========================================================== */

function connectParticles() {

    for (let a = 0; a < particles.length; a++) {

        for (let b = a + 1; b < particles.length; b++) {

            const dx = particles[a].x - particles[b].x;
            const dy = particles[a].y - particles[b].y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {

                ctx.beginPath();

                ctx.strokeStyle =
                    "rgba(47,111,237," + (1 - distance / 120) * 0.18 + ")";

                ctx.lineWidth = 1;

                ctx.moveTo(
                    particles[a].x,
                    particles[a].y
                );

                ctx.lineTo(
                    particles[b].x,
                    particles[b].y
                );

                ctx.stroke();

            }

        }

    }

}

/* ==========================================================
   ANIMATION
========================================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    particles.forEach((particle) => {

        particle.update();

        particle.draw();

    });

    connectParticles();

    requestAnimationFrame(animate);

}

animate();