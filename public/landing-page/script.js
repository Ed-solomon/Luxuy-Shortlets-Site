// Smooth animations on scroll (optional enhancement)
document.addEventListener("DOMContentLoaded", function () {
  console.log("Lagos Luxury Landing Page Loaded");

  // Add smooth hover effects
  const cardLink = document.querySelector(".card-link");

  if (cardLink) {
    cardLink.addEventListener("mouseenter", function () {
      console.log("Card hover - ready to explore!");
    });
  }

  // Track clicks (optional analytics placeholder)
  const exploreButton = document.querySelector(".cta-button");

  if (exploreButton) {
    exploreButton.addEventListener("click", function (e) {
      console.log("User exploring full website");
      // Add analytics tracking here if needed
    });
  }

  // Optional: Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe animated elements
  const animatedElements = document.querySelectorAll(
    ".fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Add smooth scroll for any future anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});
