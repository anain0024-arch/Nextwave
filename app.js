/* ========= Nextwave Technologies Website JS ========= */

// Wait for DOM
document.addEventListener("DOMContentLoaded", () => {
  // ======= Mobile Menu Toggle =======
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", !expanded);
      mobileNav.hidden = expanded;
    });
  }

  // ======= Sticky Header Shadow =======
  const header = document.querySelector("header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ======= Smooth Scroll =======
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // ======= Active Link Highlighting =======
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("header nav a");

  function setActiveLink() {
    let index = sections.length;
    while (--index && window.scrollY + 120 < sections[index].offsetTop) {}
    navLinks.forEach(link => link.classList.remove("active"));
    if (navLinks[index]) navLinks[index].classList.add("active");
  }
  setActiveLink();
  window.addEventListener("scroll", setActiveLink);

  // ======= Form Validation =======
  const form = document.querySelector("#contact form");
  if (form) {
    form.addEventListener("submit", e => {
      const name = form.querySelector("#name");
      const email = form.querySelector("#email");
      const message = form.querySelector("#message");
      let valid = true;

      // Clear old errors
      form.querySelectorAll(".error").forEach(el => el.remove());

      function showError(input, msg) {
        valid = false;
        const err = document.createElement("small");
        err.className = "error";
        err.style.color = "red";
        err.textContent = msg;
        input.insertAdjacentElement("afterend", err);
      }

      if (!name.value.trim()) showError(name, "Name is required.");
      if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
        showError(email, "Enter a valid email.");
      if (!message.value.trim()) showError(message, "Message cannot be empty.");

      if (!valid) e.preventDefault();
    });
  }

  // ======= Back to Top Button =======
  const backTop = document.createElement("button");
  backTop.textContent = "↑";
  backTop.setAttribute("aria-label", "Back to top");
  backTop.id = "backTop";
  Object.assign(backTop.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    padding: "10px 15px",
    borderRadius: "50%",
    background: "#0ea5e9",
    color: "#fff",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
    display: "none",
    boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
    zIndex: "1000"
  });
  document.body.appendChild(backTop);

  window.addEventListener("scroll", () => {
    backTop.style.display = window.scrollY > 300 ? "block" : "none";
  });
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  // ======= Reveal Animations (Intersection Observer) =======
  const revealElements = document.querySelectorAll(
    ".card, .work-item, .plan, blockquote, details, .post"
  );
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  revealElements.forEach(el => observer.observe(el));
});
// ======= Dark/Light Mode Toggle =======
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const logo = document.getElementById("site-logo");

// Load saved theme (if any)
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  themeToggle.textContent = "☀️";
}

// Toggle theme on click
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");

    // Change button icon
    themeToggle.textContent = isDark ? "☀️" : "🌙";

    // Optional: Switch logo if you have dark version
    if (isDark) {
      // logo.src = "assets/logo-dark.png";   // dark logo
    } else {
      // logo.src = "assets/logo.png";        // light logo
    }

    // Save preference
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
