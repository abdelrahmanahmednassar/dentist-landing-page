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
  initializeCasesSlider();
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
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
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
      document.body.style.overflow = "hidden"; // Prevent body scroll when menu is open
      document.body.style.overflowX = "hidden"; // Prevent horizontal scroll
      document.documentElement.style.overflowX = "hidden"; // Prevent horizontal scroll on html
    } else {
      icon.classList.remove("bx-x");
      icon.classList.add("bx-menu");
      document.body.style.overflow = ""; // Restore body scroll
      document.body.style.overflowX = ""; // Restore horizontal scroll
      document.documentElement.style.overflowX = ""; // Restore horizontal scroll on html
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
      document.body.style.overflowX = ""; // Restore horizontal scroll
      document.documentElement.style.overflowX = ""; // Restore horizontal scroll on html
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
      document.body.style.overflowX = ""; // Restore horizontal scroll
      document.documentElement.style.overflowX = ""; // Restore horizontal scroll on html
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
      document.body.style.overflowX = ""; // Restore horizontal scroll
      document.documentElement.style.overflowX = ""; // Restore horizontal scroll on html
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
        document.body.style.overflowX = ""; // Restore horizontal scroll
        document.documentElement.style.overflowX = ""; // Restore horizontal scroll on html
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
