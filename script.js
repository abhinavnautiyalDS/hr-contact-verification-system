document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // NAVBAR scroll effect
    // ========================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    // Active nav link highlight on scroll
    const navLinks = document.querySelectorAll(".nav-links a");
    const allSections = document.querySelectorAll("section[id], header[id], footer[id]");
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + entry.target.id) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, { rootMargin: "-40% 0px -55% 0px" });
    allSections.forEach(s => sectionObserver.observe(s));

    // ========================
    // MOBILE NAV
    // ========================
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");

    hamburger.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileNav.classList.toggle("open");
    });
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target)) mobileNav.classList.remove("open");
    });

    // ========================
    // CERTIFICATES MODAL
    // ========================
    const modal    = document.getElementById("cert-modal");
    const openBtn  = document.getElementById("open-cert-modal");
    const closeBtn = document.querySelector(".close");

    if (modal && openBtn) {
        openBtn.addEventListener("click", () => modal.classList.add("open"));
        closeBtn?.addEventListener("click", () => modal.classList.remove("open"));
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("open");
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") modal.classList.remove("open");
        });
    }

    // ========================
    // INTRODUCTION TABS
    // Written is active by default (set in HTML), just handle clicks
    // ========================
    const tabs = document.querySelectorAll(".tab");
    const introContents = document.querySelectorAll(".intro-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            introContents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            const target = document.getElementById(tab.dataset.tab + "-content");
            if (target) target.classList.add("active");
        });
    });

    // ========================
    // SECTION VISIBILITY FILTERS
    // ========================
    const sectionFilters = document.querySelectorAll(".section-filter");
    const sectionMap = {
        skills:     document.getElementById("skills-section"),
        experience: document.getElementById("experience-section"),
        education:  document.getElementById("education-section"),
        projects:   document.getElementById("projects-section")
    };

    function updateSections() {
        sectionFilters.forEach(btn => {
            const sec = sectionMap[btn.dataset.section];
            if (sec) sec.style.display = btn.classList.contains("active") ? "block" : "none";
        });
    }
    sectionFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            updateSections();
        });
    });
    updateSections(); // apply on load

    // ========================
    // PROJECT CATEGORY FILTERS
    // ========================
    const projectFilters = document.querySelectorAll(".filter");
    const projectCards   = document.querySelectorAll(".project");

    projectFilters.forEach(filter => {
        filter.addEventListener("click", () => {
            projectFilters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");
            const cat = filter.dataset.category;
            projectCards.forEach(card => {
                const show = cat === "all" || card.dataset.category === cat;
                card.style.display = show ? "flex" : "none";
                if (show) {
                    card.classList.remove("visible");
                    requestAnimationFrame(() => {
                        setTimeout(() => card.classList.add("visible"), 30);
                    });
                }
            });
        });
    });
    projectCards.forEach(p => (p.style.display = "flex"));

    // ========================
    // SCROLL REVEAL
    // ========================
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings slightly
                const siblings = Array.from(entry.target.parentNode.children)
                    .filter(el => el.classList.contains("reveal"));
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, idx * 55);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));

    // Hero reveal on load
    const heroReveal = document.querySelector(".hero .reveal");
    if (heroReveal) {
        setTimeout(() => heroReveal.classList.add("visible"), 150);
    }

    // ========================
    // SMOOTH SCROLL (offset for navbar height)
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                const offset = navbar.offsetHeight + 16;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        });
    });



    // ========================
    // PARTICLE CANVAS (floating blue dots)
    // ========================
    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let particles = [];
    let W, H;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", () => { resize(); initParticles(); });

    function initParticles() {
        particles = [];
        const count = Math.min(Math.floor((W * H) / 18000), 80);
        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.2 + 0.3,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                alpha: Math.random() * 0.45 + 0.15
            });
        }
    }
    initParticles();

    

    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 194, 255, ${p.alpha})`;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        requestAnimationFrame(drawParticles);
    }
    drawParticles();

});

    function copyEmail() {
    const email = "abhinavnautiyal96@gmail.com";

    navigator.clipboard.writeText(email).then(() => {
        alert("Mail ID copied!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}
