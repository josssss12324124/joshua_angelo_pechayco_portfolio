// Mobile navigation and accessible scroll-reveal animation.
const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Animated professional title
const typingRole = document.getElementById("typing-role");

if (typingRole) {
  const roles = [
    "Web Developer",
    "Full-Stack Developer",
    "Software Solutions Developer",
    "Application Developer",
    "AI & Software Developer",
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function animateRole() {
    const currentRole = roles[roleIndex];

    typingRole.textContent = deleting
      ? currentRole.substring(0, charIndex--)
      : currentRole.substring(0, charIndex++);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex > currentRole.length) {
      deleting = true;
      delay = 1500;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      charIndex = 0;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(animateRole, delay);
  }

  animateRole();
}

document.querySelectorAll("[data-gallery]").forEach((gallery) => {
  const slides = gallery.querySelectorAll(".gallery-slide");
  const prev = gallery.querySelector(".gallery-prev");
  const next = gallery.querySelector(".gallery-next");
  const counter = gallery.querySelector(".gallery-count");

  if (!slides.length) {
    return;
  }

  let currentIndex = 0;

  function showSlide(index) {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    if (counter) {
      counter.textContent = `${currentIndex + 1} / ${slides.length}`;
    }
  }

  if (prev) {
    prev.addEventListener("click", () => {
      showSlide(currentIndex - 1);
    });
  }

  if (next) {
    next.addEventListener("click", () => {
      showSlide(currentIndex + 1);
    });
  }

  showSlide(0);
});
