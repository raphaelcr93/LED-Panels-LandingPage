(function () {
  document.documentElement.classList.add("js-enabled");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const form = document.querySelector("#lead-form");
  const submitButton = document.querySelector("[data-submit-button]");
  const status = document.querySelector("#form-status");
  const mailtoFallback = document.querySelector("#mailto-fallback");
  const pixelCanvases = document.querySelectorAll(".pixel-canvas");
  const cursorTray = document.querySelector(".cursor-tray");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const tiltItems = document.querySelectorAll("[data-tilt]");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

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

  function initPixelCanvas(canvas) {
    const context = canvas.getContext("2d");
    if (!context) return;

    let pixels = [];
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(Math.floor(rect.width), 1);
      height = Math.max(Math.floor(rect.height), 1);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.max(Math.floor(width / 26), 18);
      const rows = Math.max(Math.floor(height / 26), 14);
      const cellX = width / columns;
      const cellY = height / rows;

      pixels = [];
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          if (Math.random() > 0.34) continue;
          pixels.push({
            x: x * cellX + cellX * 0.5,
            y: y * cellY + cellY * 0.5,
            size: Math.random() > 0.82 ? 3 : 2,
            delay: Math.random() * Math.PI * 2,
            speed: 0.45 + Math.random() * 0.95,
            hue: Math.random() > 0.72 ? 206 : 188
          });
        }
      }
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);

      pixels.forEach((pixel) => {
        const pulse = reducedMotionQuery.matches
          ? 0.32
          : (Math.sin(time * 0.001 * pixel.speed + pixel.delay) + 1) / 2;
        const alpha = 0.08 + pulse * 0.62;
        const glow = 5 + pulse * 16;

        context.fillStyle = `hsla(${pixel.hue}, 100%, 72%, ${alpha})`;
        context.shadowBlur = glow;
        context.shadowColor = `hsla(${pixel.hue}, 100%, 66%, ${alpha})`;
        context.fillRect(pixel.x, pixel.y, pixel.size, pixel.size);
      });

      context.shadowBlur = 0;

      if (!reducedMotionQuery.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);

    window.addEventListener("resize", () => {
      window.cancelAnimationFrame(animationFrame);
      resize();
      draw(0);
      if (!reducedMotionQuery.matches) {
        animationFrame = window.requestAnimationFrame(draw);
      }
    });

    if (!reducedMotionQuery.matches) {
      animationFrame = window.requestAnimationFrame(draw);
    }
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
        behavior: reducedMotionQuery.matches ? "auto" : "smooth"
      });

      history.pushState(null, "", targetId);
    });
  });

  if (form) {
    form.setAttribute("novalidate", "");

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

      mailtoFallback.href = `mailto:openair.pixels@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  if (cursorTray && !reducedMotionQuery.matches && window.matchMedia("(pointer: fine)").matches) {
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let orbitX = cursorX;
    let orbitY = cursorY;

    window.addEventListener("pointermove", (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
    });

    function animateCursor() {
      orbitX += (cursorX - orbitX) * 0.15;
      orbitY += (cursorY - orbitY) * 0.15;
      cursorTray.style.transform = `translate3d(${orbitX}px, ${orbitY}px, 0) translate(-50%, -50%)`;
      window.requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  if (revealItems.length) {
    if ("IntersectionObserver" in window && !reducedMotionQuery.matches) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16 });

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  if (tiltItems.length && !reducedMotionQuery.matches && window.matchMedia("(pointer: fine)").matches) {
    tiltItems.forEach((item) => {
      item.addEventListener("pointermove", (event) => {
        const rect = item.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        item.style.setProperty("--tilt-x", `${(-y * 4).toFixed(2)}deg`);
        item.style.setProperty("--tilt-y", `${(x * 5).toFixed(2)}deg`);
        item.style.setProperty("--glow-x", `${((event.clientX - rect.left) / rect.width * 100).toFixed(1)}%`);
        item.style.setProperty("--glow-y", `${((event.clientY - rect.top) / rect.height * 100).toFixed(1)}%`);
      });

      item.addEventListener("pointerleave", () => {
        item.style.setProperty("--tilt-x", "0deg");
        item.style.setProperty("--tilt-y", "0deg");
        item.style.setProperty("--glow-x", "50%");
        item.style.setProperty("--glow-y", "0%");
      });
    });
  }

  pixelCanvases.forEach(initPixelCanvas);
})();
