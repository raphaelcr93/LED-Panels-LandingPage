(function () {
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.querySelector("#lead-form");
  const submitButton = document.querySelector("[data-submit-button]");
  const status = document.querySelector("#form-status");
  const mailtoFallback = document.querySelector("#mailto-fallback");

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  function clearFieldError(field) {
    const wrapper = field.closest(".field");
    if (!wrapper) return;
    wrapper.classList.remove("has-error");
    const error = wrapper.querySelector(".field-error");
    if (error) error.remove();
    field.removeAttribute("aria-invalid");
    field.removeAttribute("aria-describedby");
  }

  function showFieldError(field, message) {
    const wrapper = field.closest(".field");
    if (!wrapper) return;

    clearFieldError(field);
    const id = `${field.id || field.name}-error`;
    const error = document.createElement("span");
    error.className = "field-error";
    error.id = id;
    error.textContent = message;

    wrapper.classList.add("has-error");
    field.setAttribute("aria-invalid", "true");
    field.setAttribute("aria-describedby", id);
    wrapper.appendChild(error);
  }

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function validateForm() {
    if (!form) return true;

    let firstInvalid = null;
    const requiredFields = form.querySelectorAll("[required]");

    requiredFields.forEach((field) => {
      clearFieldError(field);
      const value = field.value.trim();

      if (!value) {
        showFieldError(field, "Please complete this field.");
        firstInvalid = firstInvalid || field;
        return;
      }

      if (field.type === "email" && !validateEmail(value)) {
        showFieldError(field, "Please enter a valid email address.");
        firstInvalid = firstInvalid || field;
      }
    });

    if (firstInvalid) {
      if (status) {
        status.textContent = "Please check the highlighted fields.";
        status.classList.add("error");
      }
      firstInvalid.focus();
      return false;
    }

    if (status) {
      status.textContent = "";
      status.classList.remove("error");
    }

    return true;
  }

  function getHeaderOffset() {
    return header ? header.getBoundingClientRect().height + 12 : 0;
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      closeMenu();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });

      history.pushState(null, "", targetId);
    });
  });

  if (form) {
    form.addEventListener("input", (event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
        clearFieldError(field);
        if (status) {
          status.textContent = "";
          status.classList.remove("error");
        }
      }
    });

    form.addEventListener("submit", (event) => {
      if (!validateForm()) {
        event.preventDefault();
        return;
      }

      if (status) {
        status.textContent = "Submitting your enquiry...";
        status.classList.remove("error");
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }
    });
  }

  if (mailtoFallback && form) {
    mailtoFallback.addEventListener("click", () => {
      const data = new FormData(form);
      const subject = "OpenAir Pixels expression of interest";
      const fields = [
        ["Full name", data.get("full_name")],
        ["Email", data.get("email")],
        ["Phone", data.get("phone")],
        ["Suburb/city", data.get("suburb_city")],
        ["State", data.get("state")],
        ["Property type", data.get("property_type")],
        ["Interested package", data.get("interested_package")],
        ["Approximate budget", data.get("approximate_budget")],
        ["Message", data.get("message")]
      ];

      const body = fields
        .map(([label, value]) => `${label}: ${value || ""}`)
        .join("\n");

      mailtoFallback.href = `mailto:hello@openairpixels.com.au?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }
})();
