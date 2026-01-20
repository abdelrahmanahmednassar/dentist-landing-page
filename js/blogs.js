// Blog Page Functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeBlogFilters();
});

function initializeBlogFilters() {
  const categoryBtns = document.querySelectorAll(".category-btn");
  const blogCards = document.querySelectorAll(".blog-card");

  if (!categoryBtns.length || !blogCards.length) return;

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryBtns.forEach((b) => b.classList.remove("active"));

      // Add active class to clicked button
      btn.classList.add("active");

      // Get selected category
      const selectedCategory = btn.getAttribute("data-category");

      // Filter blog cards
      blogCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.classList.remove("hidden");
          // Add fade-in animation
          card.style.animation = "fadeIn 0.5s ease";
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// Add fade-in animation
const style = document.createElement("style");
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
