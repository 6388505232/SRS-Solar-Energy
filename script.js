
// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize everything after a short delay to allow for loading animation
  setTimeout(init, 500);
});

function init() {
  // Hide loader
  const loader = document.querySelector('.loader');
  loader.classList.add('hidden');
  
  // Initialize all components
  initNavigation();
  initScrollEffects();
  initAnimations();
  initParticles();
  initFiltering();
  initTestimonials();
  initContactForm();
  initCursor();
  initTypeEffect();
  initCounters();
  initFloatingElements();
}

// Navigation
function initNavigation() {
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

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll effects and animations
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        
        // If element has counter, animate it
        if (entry.target.querySelector('.stat-number')) {
          animateCounters(entry.target);
        }
        
        // If element has animated text, animate it
        if (entry.target.classList.contains('animated-text-left') || 
            entry.target.classList.contains('animated-text-right')) {
          animateText(entry.target);
        }
      }
    });
  }, observerOptions);
  
  // Observe all sections
  document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
  });
  
  // Observe specific elements with animations
  document.querySelectorAll('.stat, .animated-text-left, .animated-text-right').forEach(el => {
    observer.observe(el);
  });
}

// Animations
function initAnimations() {
  // Animate elements on scroll
  window.addEventListener('scroll', throttle(animateOnScroll, 200));
  
  // Initial check
  animateOnScroll();
}

function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .project-card, .feature-card, .equipment-item');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      element.style.transform = 'translateY(0)';
    }
  });
}

// Particles.js initialization
function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: "#ffffff"
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000"
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.4,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          },
          onclick: {
            enable: true,
            mode: "push"
                      },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
}

// Project filtering
function initFiltering() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  
  // Sample project data (in a real scenario, this might come from an API)
  const projects = [
    { category: "residential", image: "img/solarp2.png", title: "Residential Solar", location: "Pune, Maharashtra" },
    { category: "residential", image: "img/solarp3.png", title: "Residential Solar", location: "Delhi, NCR" },
    { Category: "residential", image: "img/solarp4.png", title: "Residential Solar", location: "Jaipur, Rajasthan" },
    { category: "residential", image: "img/solarp5.png", title: "Residential Solar", location: "Bengaluru, Karnataka" },
    { category: "commercial", image: "img/solarp13.png", title: "Commercial Rooftop 1", location: "Mumbai, India" },
    { category: "commercial", image: "img/solarp14.png", title: "Commercial Rooftop 2", location: "Pune, India" },
    { category: "commercial", image: "img/solar12.jpeg", title: "Commercial Rooftop 3", location: "Delhi, India" },
    { category: "industrial", image: "img/solarp16.png", title: "Industrial Solar Plant 1", location: "Ahmedabad, India" },
    { category: "industrial", image: "img/solarp17.png", title: "Industrial Solar Plant 2", location: "Surat, India" },
    { category: "industrial", image: "img/solarp18.png", title: "Industrial Solar Plant 3", location: "Chennai, India" },
    { category: "industrial", image: "img/solarp19.png", title: "Industrial Solar Plant 4", location: "Hyderabad, India" },
    { category: "industrial", image: "img/solarp19.png", title: "Industrial Solar Plant 5", location: "Delhi, India" },
    { category: "industrial", image: "img/solarp20.jpeg", title: "Industrial Solar Plant 6", location: "Mumbai, India" }
  ];

  // Populate projects grid
  const projectsGrid = document.querySelector('.projects-grid');
  projectsGrid.innerHTML = '';
  
  projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.setAttribute('data-category', project.category);
    
    projectCard.innerHTML = `
      <div class="project-img">
        <img src="${project.image}" alt="${project.title}"/>
      </div>
      <div class="project-overlay">
        <h3>${project.title}</h3>
        <p>${project.location}</p>
      </div>
    `;
    
    projectsGrid.appendChild(projectCard);
  });

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach(btn => btn.classList.remove("active"));
      
      // Add active class to clicked button
      btn.classList.add("active");
      
      const filter = btn.getAttribute("data-filter");
      const projectCards = document.querySelectorAll(".project-card");
      
      projectCards.forEach(card => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
          }, 100);
        } else {
          card.style.opacity = 0;
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Testimonial slider
function initTestimonials() {
  const testimonialSlider = document.querySelector('.testimonial-slider');
  const testimonials = document.querySelectorAll('.testimonial');
  let currentIndex = 0;
  
  // Auto-rotate testimonials
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    testimonialSlider.scrollTo({
      left: testimonials[currentIndex].offsetLeft,
      behavior: 'smooth'
    });
  }, 5000);
}

// Contact form handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Simple form validation
      const inputs = contactForm.querySelectorAll('input, textarea');
      let isValid = true;
      
      inputs.forEach(input => {
        if (input.hasAttribute('required') && !input.value.trim()) {
          input.style.borderColor = 'var(--error)';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // In a real application, you would send the form data to a server
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
          // Show success message
          alert("Thank you for your message! We will get back to you soon.");
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }
    });
  }
  
  // Newsletter form
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      
      if (emailInput.value && isValidEmail(emailInput.value)) {
        alert('Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      } else {
        emailInput.style.borderColor = 'var(--error)';
      }
    });
  }
}

// Custom cursor
function initCursor() {
  const cursorDot = document.querySelector('[data-cursor-dot]');
  const cursorOutline = document.querySelector('[data-cursor-outline]');
  
  if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;
      
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Outline with slight delay
      setTimeout(() => {
        cursorOutline.style.left = `${posX}px`;
        cursorOutline.style.top = `${posY}px`;
      }, 80);
    });
    
    // Interactive elements effect
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .project-card, .filter-btn');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'scale(1.5)';
        cursorOutline.style.transform = 'scale(1.5)';
        cursorOutline.style.borderWidth = '1px';
      });
      
      el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'scale(1)';
        cursorOutline.style.transform = 'scale(1)';
        cursorOutline.style.borderWidth = '2px';
      });
    });
  }
}

// Typing effect for hero section
function initTypeEffect() {
  const TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };

  TxtRotate.prototype.tick = function() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    let delta = 200 - Math.random() * 100;

    if (this.isDeleting) {
      delta /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }

    setTimeout(() => {
      this.tick();
    }, delta);
  };

  // Initialize typing effect
  const elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-rotate');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
}

// Animated counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    counter.innerText = '0';
  });
}

function animateCounters(section) {
  const counters = section.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    const count = +counter.innerText;
    const increment = target / 100;
    
    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(() => animateCounter(counter, target, count + increment), 20);
    } else {
      counter.innerText = target;
    }
  });
}

function animateCounter(counter, target, current) {
  const increment = target / 100;
  
  if (current < target) {
    counter.innerText = Math.ceil(current + increment);
    setTimeout(() => animateCounter(counter, target, current + increment), 20);
  } else {
    counter.innerText = target;
  }
}

// Animated text elements
function initFloatingElements() {
  const floatingElements = document.querySelectorAll('.floating-element');
  
  floatingElements.forEach((element, index) => {
    // Each element will have a slightly different animation
    element.style.animationDelay = `${index * 0.5}s`;
  });
}

function animateText(element) {
  const words = element.querySelectorAll('span');
  
  words.forEach((word, index) => {
    word.style.animationDelay = `${index * 0.3}s`;
    word.style.animation = 'fadeInWord 0.6s forwards';
  });
}

// Utility functions
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Show loader initially
  const loader = document.querySelector('.loader');
  
  // Hide loader after everything is loaded
  window.addEventListener('load', function() {
    setTimeout(function() {
      loader.classList.add('hidden');
      init();
    }, 1500); // Show loader for at least 1.5 seconds
  });
});

 const lightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: true
  });



  // Contact form handling
function initContactForm() {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let message = document.getElementById("message").value;

      // Format WhatsApp message
      let whatsappMessage = `Hello, I want to contact you:%0A
*Name:* ${name}%0A
*Email:* ${email}%0A
*Phone:* ${phone}%0A
*Message:* ${message}`;

      // WhatsApp API link
      let whatsappURL = `https://wa.me/7011881895?text=${whatsappMessage}`;

      // Open WhatsApp
      window.open(whatsappURL, "_blank");

      // Optional: reset form after redirect
      contactForm.reset();
    });
  }
}
