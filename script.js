// Navigation toggle
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");
        const header = document.querySelector("header");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll(".nav-links a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navLinks.classList.remove("active");
        }));

        // Header scroll effect
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });

        // Scroll animation
        const sections = document.querySelectorAll("section");
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            observer.observe(section);
        });

        // Project filter
        const filterBtns = document.querySelectorAll(".filter-btn");
        const projectCards = document.querySelectorAll(".project-card");

        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove("active"));
                
                // Add active class to clicked button
                btn.classList.add("active");
                
                const filter = btn.getAttribute("data-filter");
                
                projectCards.forEach(card => {
                    if (filter === "all" || card.getAttribute("data-category") === filter) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });

        // Form submission
        const contactForm = document.getElementById("contactForm");
        
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for your message! We will get back to you soon.");
            contactForm.reset();
        });


        