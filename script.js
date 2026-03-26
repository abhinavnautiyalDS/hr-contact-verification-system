document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // NAVBAR: scroll effect + active link
    // ========================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 40);
    });

    // Active nav link on scroll
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id], header[id], footer[id]");
    const observer = new IntersectionObserver((entries) => {
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
    sections.forEach(s => observer.observe(s));

    // ========================
    // MOBILE NAV
    // ========================
    const hamburger = document.getElementById("hamburger");
    const mobileNav = document.getElementById("mobile-nav");
    hamburger.addEventListener("click", () => {
        mobileNav.classList.toggle("open");
    });
    document.querySelectorAll(".mobile-link").forEach(link => {
        link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
    // Close on outside click
    document.addEventListener("click", (e) => {
        if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
            mobileNav.classList.remove("open");
        }
    });

    // ========================
    // MODAL
    // ========================
    const modal = document.getElementById("cert-modal");
    const openBtn = document.getElementById("open-cert-modal");
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
    // ========================
    const tabs = document.querySelectorAll(".tab");
    const introContents = document.querySelectorAll(".intro-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            introContents.forEach(c => c.classList.remove("active"));
            tab.classList.add("active");
            document.getElementById(tab.dataset.tab + "-content")?.classList.add("active");
        });
    });

    // ========================
    // SECTION FILTERS (show/hide sections)
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
    updateSections();

    // ========================
    // PROJECT FILTERS
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
                // re-trigger reveal animation
                if (show) {
                    card.classList.remove("visible");
                    setTimeout(() => card.classList.add("visible"), 50);
                }
            });
        });
    });
    // Init all visible
    projectCards.forEach(p => (p.style.display = "flex"));

    // ========================
    // SCROLL REVEAL
    // ========================
    const revealEls = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // stagger sibling reveals slightly
                const delay = Array.from(entry.target.parentNode.children)
                    .filter(el => el.classList.contains("reveal"))
                    .indexOf(entry.target) * 60;
                setTimeout(() => entry.target.classList.add("visible"), delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealEls.forEach(el => revealObserver.observe(el));

    // ========================
    // PARTICLE CANVAS (subtle background dots)
    // ========================
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
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
            const count = Math.floor((W * H) / 18000);
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * W,
                    y: Math.random() * H,
                    r: Math.random() * 1.2 + 0.3,
                    vx: (Math.random() - 0.5) * 0.15,
                    vy: (Math.random() - 0.5) * 0.15,
                    alpha: Math.random() * 0.5 + 0.2
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
    }

    // ========================
    // SMOOTH ANCHOR SCROLL (accounts for fixed navbar height)
    // ========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
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
    // HERO REVEAL on load
    // ========================
    const heroReveal = document.querySelector(".hero .reveal");
    if (heroReveal) {
        setTimeout(() => heroReveal.classList.add("visible"), 200);
    }

});
