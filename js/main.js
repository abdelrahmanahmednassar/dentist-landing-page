// Load sections dynamically
async function loadSection(sectionId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}`);
    }
    const html = await response.text();
    const container = document.getElementById(sectionId);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error(`Error loading section ${sectionId}:`, error);
  }
}

// Load all sections when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
  const sections = [
    { id: "section-header", file: "sections/header.html" },
    { id: "section-nav", file: "sections/nav.html" },
    { id: "section-hero", file: "sections/hero.html" },
    { id: "section-cases-doctor", file: "sections/cases-doctor.html" },
    { id: "section-about-clinic", file: "sections/about-clinic.html" },
    { id: "section-testimonials", file: "sections/testimonials.html" },
    { id: "section-services", file: "sections/services.html" },
    { id: "section-footer", file: "sections/footer.html" },
  ];

  // Load all sections in parallel
  await Promise.all(
    sections.map((section) => loadSection(section.id, section.file))
  );

  // Initialize functionality after sections are loaded
  initializePageFunctionality();

  // Initialize AOS after sections are loaded
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
    // Ensure newly injected sections are registered
    AOS.refreshHard();
  } else {
    console.warn("AOS failed to load; check CDN/network connectivity.");
  }
});

// Initialize all page functionality
function initializePageFunctionality() {
  initializeHeroSlider();
  initializeBeforeAfterSlider();
  initializeMobileMenu();
  initializeScrollToTop();
  initializeCasesGalleryToggle();
  initializeSliderAutoAnimation();
}

// Hero Slider Functionality
function initializeHeroSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".hero-slide");
  const bullets = document.querySelectorAll(".hero-bullet");
  const totalSlides = slides.length;

  if (totalSlides === 0) return;

  function showSlide(index) {
    // Remove active class from all slides and bullets
    slides.forEach((slide) => slide.classList.remove("active"));
    bullets.forEach((bullet) => bullet.classList.remove("active"));

    // Add active class to current slide and bullet
    slides[index].classList.add("active");
    bullets[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
  }

  // Arrow navigation
  document
    .querySelector(".hero-arrow-left")
    ?.addEventListener("click", nextSlide);
  document
    .querySelector(".hero-arrow-right")
    ?.addEventListener("click", prevSlide);

  // Bullet navigation
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// Before/After Slider Functionality
function initializeBeforeAfterSlider() {
  const sliders = document.querySelectorAll(".before-after-slider");
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const sliderHandle = slider.querySelector(".slider-handle");
    const sliderContainer = slider.querySelector(".slider-container");
    const afterImage = slider.querySelector(".after-image");
    if (!sliderHandle || !sliderContainer || !afterImage) return;

    let isDragging = false;

    const updateSlider = (x) => {
      const rect = sliderContainer.getBoundingClientRect();
      const containerWidth = rect.width;
      let position = x - rect.left;

      position = Math.max(0, Math.min(position, containerWidth));
      const percentage = (position / containerWidth) * 100;

      sliderHandle.style.left = percentage + "%";
      sliderHandle.style.transform = "translateX(-50%)";
      afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    };

    sliderHandle.addEventListener("mousedown", (e) => {
      isDragging = true;
      sliderContainer.classList.add("is-dragging");
      e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        updateSlider(e.clientX);
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      sliderContainer.classList.remove("is-dragging");
    });

    // Touch support for mobile
    sliderHandle.addEventListener("touchstart", (e) => {
      isDragging = true;
      sliderContainer.classList.add("is-dragging");
      e.preventDefault();
    });

    document.addEventListener("touchmove", (e) => {
      if (isDragging && e.touches.length > 0) {
        updateSlider(e.touches[0].clientX);
      }
    });

    document.addEventListener("touchend", () => {
      isDragging = false;
      sliderContainer.classList.remove("is-dragging");
    });
  });
}

// Mobile Menu Toggle
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (!mobileMenuToggle || !navMenu) return;

  mobileMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileMenuToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("bx-menu");
      icon.classList.add("bx-x");
      document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
    } else {
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.body.style.overflow = ""; // Restore body scroll
      // Close all dropdowns when closing menu
      const dropdowns = navMenu.querySelectorAll(".has-dropdown.active");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });

  // Handle dropdown toggle on mobile
  const dropdownToggles = navMenu.querySelectorAll(".has-dropdown > .nav-link");
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      // Only prevent default and toggle on mobile (when menu is in mobile mode)
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = toggle.parentElement;
        const isActive = dropdown.classList.contains("active");

        // Close all other dropdowns
        navMenu.querySelectorAll(".has-dropdown.active").forEach((d) => {
          if (d !== dropdown) {
            d.classList.remove("active");
          }
        });

        // Toggle current dropdown
        dropdown.classList.toggle("active", !isActive);
      }
    });
  });

  // Close menu when clicking on a non-dropdown link
  const navLinks = navMenu.querySelectorAll(
    ".nav-link:not(.has-dropdown > .nav-link)"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.body.style.overflow = ""; // Restore body scroll
      // Close all dropdowns
      navMenu.querySelectorAll(".has-dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    });
  });

  // Close dropdowns when clicking on dropdown links
  const dropdownLinks = navMenu.querySelectorAll(".dropdown-menu a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.body.style.overflow = ""; // Restore body scroll
      // Close all dropdowns
      navMenu.querySelectorAll(".has-dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("active") &&
      !navMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.body.style.overflow = ""; // Restore body scroll
      // Close all dropdowns
      navMenu.querySelectorAll(".has-dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
    }
  });

  // Handle window resize - close dropdowns when switching to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navMenu.querySelectorAll(".has-dropdown.active").forEach((dropdown) => {
        dropdown.classList.remove("active");
      });
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = mobileMenuToggle.querySelector("i");
        icon.classList.remove("bx-x");
        icon.classList.add("bx-menu");
        document.body.style.overflow = "";
      }
    }
  });
}

// Scroll to Top Button
function initializeScrollToTop() {
  const scrollToTopBtn = document.querySelector(".scroll-to-top");

  if (!scrollToTopBtn) return;
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Cases Gallery Toggle
function initializeCasesGalleryToggle() {
  const toggleBtn = document.getElementById("cases-toggle-btn");
  const gallery = document.getElementById("cases-gallery");

  if (!toggleBtn || !gallery) return;

  let expanded = false;

  const updateState = () => {
    if (expanded) {
      gallery.classList.add("is-visible");
      toggleBtn.textContent = "إخفاء الحالات";
    } else {
      gallery.classList.remove("is-visible");
      toggleBtn.textContent = "المزيد من الحالات";
    }
  };

  updateState();

  toggleBtn.addEventListener("click", () => {
    expanded = !expanded;
    updateState();
  });
}

// Auto-animate sliders on scroll
function initializeSliderAutoAnimation() {
  const sliderContainers = document.querySelectorAll(".slider-container");
  if (!sliderContainers.length) return;

  // Initialize all sliders to show "after" state (100% - after image fully visible)
  sliderContainers.forEach((container) => {
    const sliderHandle = container.querySelector(".slider-handle");
    const afterImage = container.querySelector(".after-image");
    
    if (sliderHandle && afterImage) {
      // Set initial state to show "after" (after image fully visible, showing before photo)
      sliderHandle.style.left = "100%";
      afterImage.style.clipPath = "inset(0 0% 0 0)";
    }
  });

  // Create Intersection Observer to detect when sliders come into view
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3, // Trigger when 30% of the slider is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("auto-animate")) {
        // Mark as animated to prevent re-animation
        entry.target.classList.add("auto-animate");
        
        const sliderHandle = entry.target.querySelector(".slider-handle");
        const afterImage = entry.target.querySelector(".after-image");
        
        if (sliderHandle && afterImage) {
          // Animate from "after" (100%) to "before" (0%) - sliding from right to left
          // Use requestAnimationFrame to ensure smooth transition
          requestAnimationFrame(() => {
            setTimeout(() => {
              sliderHandle.style.left = "0%";
              afterImage.style.clipPath = "inset(0 100% 0 0)";
            }, 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all slider containers
  sliderContainers.forEach((container) => {
    observer.observe(container);
  });
}
