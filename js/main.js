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
  // Detect current page
  const currentPage = getCurrentPage();

  // Define sections to load based on page
  const pageSections = {
    index: [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-hero", file: "sections/hero.html" },
      { id: "section-cases-doctor", file: "sections/cases-doctor.html" },
      { id: "section-about-clinic", file: "sections/about-clinic.html" },
      { id: "section-testimonials", file: "sections/testimonials.html" },
      { id: "section-services", file: "sections/services.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "about-us": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-about-clinic", file: "sections/about-clinic.html" },
      { id: "section-testimonials", file: "sections/testimonials.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    services: [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-services", file: "sections/services.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    cases: [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-cases-doctor", file: "sections/cases-doctor.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "contact-us": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    blogs: [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    // Blog detail pages
    "daily-dental-care": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "laser-teeth-whitening": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "dental-implants-guide": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "veneers-vs-lumineers": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "healthy-foods-for-teeth": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    "children-dental-care": [
      { id: "section-header", file: "sections/header.html" },
      { id: "section-nav", file: "sections/nav.html" },
      { id: "section-footer", file: "sections/footer.html" },
    ],
    // Service detail pages
    "teeth-implants": [
      { id: "header-container", file: "sections/header.html" },
      { id: "nav-container", file: "sections/nav.html" },
      { id: "footer-container", file: "sections/footer.html" },
    ],
    "teeth-beautification": [
      { id: "header-container", file: "sections/header.html" },
      { id: "nav-container", file: "sections/nav.html" },
      { id: "footer-container", file: "sections/footer.html" },
    ],
    "hybrid-veneers": [
      { id: "header-container", file: "sections/header.html" },
      { id: "nav-container", file: "sections/nav.html" },
      { id: "footer-container", file: "sections/footer.html" },
    ],
    "3n-veneers": [
      { id: "header-container", file: "sections/header.html" },
      { id: "nav-container", file: "sections/nav.html" },
      { id: "footer-container", file: "sections/footer.html" },
    ],
  };

  // Get sections for current page
  const sections = pageSections[currentPage] || pageSections["index"];

  // Load all sections in parallel
  await Promise.all(
    sections.map((section) => loadSection(section.id, section.file)),
  );

  // Initialize functionality after sections are loaded
  initializePageFunctionality();

  // Initialize translations after sections are loaded
  initializeTranslations();

  // Highlight active navigation link
  highlightActiveNavLink();
});

// Get current page name from URL
function getCurrentPage() {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace(".html", "");

  // If no page or root, return 'index'
  if (!page || page === "" || page === "/") {
    return "index";
  }

  return page;
}

// Highlight active navigation link based on current page
function highlightActiveNavLink() {
  const currentPage = getCurrentPage();

  // Blog detail pages should highlight the blogs nav item
  const blogDetailPages = [
    "daily-dental-care",
    "laser-teeth-whitening",
    "dental-implants-guide",
    "veneers-vs-lumineers",
    "healthy-foods-for-teeth",
    "children-dental-care",
  ];

  // Service detail pages should highlight the services nav item
  const serviceDetailPages = [
    "teeth-implants",
    "teeth-beautification",
    "hybrid-veneers",
    "3n-veneers",
  ];

  // Determine which nav item to highlight
  let targetPage = currentPage;
  if (blogDetailPages.includes(currentPage)) {
    targetPage = "blogs";
  } else if (serviceDetailPages.includes(currentPage)) {
    targetPage = "services";
  }

  // Map page names to nav link hrefs
  const pageToNav = {
    index: "index.html",
    "about-us": "about-us.html",
    services: "services.html",
    cases: "cases.html",
    blogs: "blogs.html",
    "contact-us": "contact-us.html",
  };

  const targetHref = pageToNav[targetPage];

  // Find and highlight the active link
  const navLinks = document.querySelectorAll(".nav-menu .nav-link");
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === targetHref) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// Initialize translations
function initializeTranslations() {
  // Initialize i18n
  i18n.init();

  // Update language toggle button text
  updateLanguageToggleButton();

  // Add event listener to language toggle button
  const languageToggle = document.getElementById("language-toggle");
  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      i18n.toggleLanguage();
      updateLanguageToggleButton();
    });
  }

  // Listen for language change events to update button text
  window.addEventListener("languageChanged", () => {
    updateLanguageToggleButton();
    // Re-initialize sliders when language changes to handle RTL/LTR switch
    initializeCasesSlider();
  });
}

// Update language toggle button text
function updateLanguageToggleButton() {
  const languageToggleText = document.getElementById("language-toggle-text");
  if (languageToggleText) {
    languageToggleText.textContent = i18n.getLanguageButtonText();
  }
}

// Initialize all page functionality
function initializePageFunctionality() {
  initializeHeroSlider();
  initializeCasesSlider();
  initializeTestimonialsSlider();
  initializeMobileMenu();
  initializeScrollToTop();
}

// Hero Slider Functionality
function initializeHeroSlider() {
  let currentSlide = 0;
  const slides = document.querySelectorAll(".hero-slide");
  const bullets = document.querySelectorAll(".hero-bullet");
  const totalSlides = slides.length;
  let autoSlideInterval = null;
  const autoSlideDelay = 5000; // 5 seconds between slides

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
    resetAutoSlide(); // Reset timer when manually navigating
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
    resetAutoSlide(); // Reset timer when manually navigating
  }

  function startAutoSlide() {
    // Clear any existing interval
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
    }
    // Start auto-sliding
    autoSlideInterval = setInterval(() => {
      nextSlide();
    }, autoSlideDelay);
  }

  function stopAutoSlide() {
    if (autoSlideInterval) {
      clearInterval(autoSlideInterval);
      autoSlideInterval = null;
    }
  }

  function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Arrow navigation
  const arrowLeft = document.querySelector(".hero-arrow-left");
  const arrowRight = document.querySelector(".hero-arrow-right");

  arrowLeft?.addEventListener("click", nextSlide);
  arrowRight?.addEventListener("click", prevSlide);

  // Bullet navigation
  bullets.forEach((bullet, index) => {
    bullet.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoSlide(); // Reset timer when manually navigating
    });
  });

  // Start auto-sliding when page loads
  startAutoSlide();
}

// Premium Cases Slider (images + videos)
function initializeCasesSlider() {
  const sliders = document.querySelectorAll(".premium-cases-slider");
  if (!sliders.length) return;

  // Initialize each slider separately
  sliders.forEach((slider) => {
    const track = slider.querySelector(".cases-track");
    const slides = Array.from(slider.querySelectorAll(".case-slide"));
    const prevBtn = slider.querySelector(".slider-btn.prev");
    const nextBtn = slider.querySelector(".slider-btn.next");
    const dotsContainer = slider.querySelector(".slider-dots");
    const autoDelay = Number(slider.dataset.autoplayDelay || 3000);

    if (!track || !slides.length) return;

    let currentIndex = 0;
    let autoTimer = null;

    const pauseVideos = () => {
      slides.forEach((slide) => {
        const video = slide.querySelector("video");
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      });
    };

    const renderDots = () => {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = "";
      slides.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", `الانتقال إلى الحالة ${index + 1}`);
        dot.addEventListener("click", () => {
          goToSlide(index);
          startAuto();
        });
        dotsContainer.appendChild(dot);
      });
    };

    const updateDots = () => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll("button");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
      });
    };

    const goToSlide = (index) => {
      const total = slides.length;
      currentIndex = (index + total) % total;
      // Use translateX with percentage to move slides horizontally
      // The viewport container has overflow: hidden to prevent horizontal scroll
      // Check if the page is in RTL mode (Arabic)
      const isRTL = document.documentElement.getAttribute("dir") === "rtl";
      // In RTL, we need to use positive translateX values instead of negative
      const translateValue = isRTL ? currentIndex * 100 : -(currentIndex * 100);
      track.style.transform = `translateX(${translateValue}%)`;
      updateDots();
      pauseVideos();
    };

    const nextSlide = () => {
      goToSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      goToSlide(currentIndex - 1);
    };

    const stopAuto = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    const startAuto = () => {
      stopAuto();
      autoTimer = setInterval(() => {
        nextSlide();
      }, autoDelay);
    };

    // Basic touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (event) => {
      touchStartX = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
      touchEndX = event.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      const deltaX = touchEndX - touchStartX;
      const threshold = 50; // minimum swipe distance
      if (Math.abs(deltaX) < threshold) return;
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAuto();
    };

    slider.addEventListener("touchstart", handleTouchStart, { passive: true });
    slider.addEventListener("touchmove", handleTouchMove, { passive: true });
    slider.addEventListener("touchend", handleTouchEnd);

    prevBtn?.addEventListener("click", () => {
      prevSlide();
      startAuto();
    });

    nextBtn?.addEventListener("click", () => {
      nextSlide();
      startAuto();
    });

    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);

    slider.querySelectorAll("video").forEach((video) => {
      video.addEventListener("play", stopAuto);
      video.addEventListener("pause", startAuto);
      video.addEventListener("ended", startAuto);
    });

    renderDots();
    goToSlide(0);
    startAuto();
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
      document.documentElement.style.overflow = "hidden"; // Prevent html scroll when menu is open
      document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
    } else {
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.documentElement.style.overflow = ""; // Restore html scroll
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
    ".nav-link:not(.has-dropdown > .nav-link)",
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      const icon = mobileMenuToggle.querySelector("i");
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.documentElement.style.overflow = ""; // Restore html scroll
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
      document.documentElement.style.overflow = ""; // Restore html scroll
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
      document.documentElement.style.overflow = ""; // Restore html scroll
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
        document.documentElement.style.overflow = ""; // Restore html scroll
        document.body.style.overflow = ""; // Restore body scroll
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

// Testimonials Slider Auto-scroll
function initializeTestimonialsSlider() {
  const slider = document.querySelector(".testimonials-slider");
  if (!slider) return;

  const inputs = slider.querySelectorAll('input[name="testimonial-slide"]');
  if (!inputs.length) return;

  let currentIndex = 0;
  let autoTimer = null;
  const autoDelay = 5000; // 5 seconds between slides

  const goToSlide = (index) => {
    currentIndex = index;
    inputs[index].checked = true;
  };

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % inputs.length;
    goToSlide(currentIndex);
  };

  const stopAuto = () => {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  };

  const startAuto = () => {
    stopAuto();
    autoTimer = setInterval(() => {
      nextSlide();
    }, autoDelay);
  };

  // Add click listeners to navigation arrows and dots
  const arrows = slider.querySelectorAll(".slider-arrow");
  const dots = slider.querySelectorAll(".slider-dots label");

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      stopAuto();
      startAuto(); // Restart auto after manual interaction
    });
  });

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      stopAuto();
      startAuto(); // Restart auto after manual interaction
    });
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopAuto);
  slider.addEventListener("mouseleave", startAuto);

  // Start auto-scrolling
  startAuto();
}
