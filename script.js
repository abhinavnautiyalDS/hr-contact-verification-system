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
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            // Hide all content
            introContents.forEach(c => c.classList.remove("active"));
            // Show the selected content
            const targetId = tab.dataset.tab + "-content";
            document.getElementById(targetId)?.classList.add("active");
        });
    });

    // Project filters
    const filters = document.querySelectorAll(".filter");
    const projects = document.querySelectorAll(".project");

    filters.forEach(filter => {
        filter.addEventListener("click", () => {
            // Update active filter
            filters.forEach(f => f.classList.remove("active"));
            filter.classList.add("active");

            const category = filter.dataset.category;
            projects.forEach(project => {
                if (category === "all" || project.dataset.category === category) {
                    project.style.display = "flex"; // restore display
                } else {
                    project.style.display = "none";
                }
            });
        });
    });

    // Ensure all projects are visible initially
    projects.forEach(p => p.style.display = "flex");
});
