// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Modal handling
    const modal = document.getElementById("cert-modal");
    const openBtn = document.getElementById("open-cert-modal");
    const preview = document.getElementById("open-cert-preview");
    const closeModal = document.querySelector(".close");

    if (modal && openBtn) {
        openBtn.addEventListener("click", () => {
            modal.style.display = "flex";
        });
        if (preview) {
            preview.addEventListener("click", () => {
                modal.style.display = "flex";
            });
        }
        if (closeModal) {
            closeModal.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Introduction tabs
    const tabs = document.querySelectorAll(".tab");
    const introContents = document.querySelectorAll(".intro-content");
    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            introContents.forEach(c => c.classList.remove("active"));
            const targetId = tab.dataset.tab + "-content";
            document.getElementById(targetId)?.classList.add("active");
        });
    });

    // Section filters (show/hide sections)
    const sectionFilters = document.querySelectorAll(".section-filter");
    const sections = {
        skills: document.getElementById("skills-section"),
        experience: document.getElementById("experience-section"),
        education: document.getElementById("education-section"),
        projects: document.getElementById("projects-section")
    };

    function updateSectionVisibility() {
        sectionFilters.forEach(btn => {
            const sectionName = btn.dataset.section;
            const section = sections[sectionName];
            if (section) {
                if (btn.classList.contains("active")) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            }
        });
    }

    sectionFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
            updateSectionVisibility();
        });
    });

    // Initially all sections visible (already set by CSS)
    updateSectionVisibility();

    // Project filters
    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            const category = filter.dataset.category;
            projects.forEach(project => {
                if (category === "all" || project.dataset.category === category) {
                    project.style.display = "flex";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });

    // Ensure all projects are visible initially
    projects.forEach(p => p.style.display = "flex");
});
