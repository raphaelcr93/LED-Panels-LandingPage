(function () {
  document.documentElement.classList.add("js-enabled");

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  const navLinks = document.querySelectorAll('a[href^="#"]');
  const samePageLinks = document.querySelectorAll('a[href*="#"]');
  const forms = document.querySelectorAll("form");
  const pixelCanvases = document.querySelectorAll(".pixel-canvas");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const carousels = document.querySelectorAll("[data-carousel]");
  const mediaImages = document.querySelectorAll(".media-picture img");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerFineQuery = window.matchMedia("(pointer: fine)");

  function closeMenu() {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  function setActiveNavigation() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) {
        link.setAttribute("aria-current", "page");
      }
    });
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

  function validateForm(form) {
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
      const status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Please check the highlighted fields.";
        status.classList.add("error");
      }
      firstInvalid.focus();
      return false;
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

      const columns = Math.max(Math.floor(width / 30), 18);
      const rows = Math.max(Math.floor(height / 30), 14);
      const cellX = width / columns;
      const cellY = height / rows;

      pixels = [];
      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          if (Math.random() > 0.26) continue;
          pixels.push({
            x: x * cellX + cellX * 0.5,
            y: y * cellY + cellY * 0.5,
            size: Math.random() > 0.85 ? 3 : 2,
            delay: Math.random() * Math.PI * 2,
            speed: 0.35 + Math.random() * 0.7,
            hue: Math.random() > 0.75 ? 206 : 188
          });
        }
      }
    }

    function draw(time) {
      context.clearRect(0, 0, width, height);

      pixels.forEach((pixel) => {
        const pulse = reducedMotionQuery.matches
          ? 0.28
          : (Math.sin(time * 0.001 * pixel.speed + pixel.delay) + 1) / 2;
        const alpha = 0.06 + pulse * 0.46;
        const glow = 3 + pulse * 12;
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

  function initLedTrail() {
    if (reducedMotionQuery.matches || !pointerFineQuery.matches) return;

    const trail = document.createElement("div");
    trail.className = "led-trail";
    trail.setAttribute("aria-hidden", "true");

    const dots = Array.from({ length: 14 }, (_, index) => {
      const dot = document.createElement("span");
      dot.style.setProperty("--i", index);
      trail.appendChild(dot);
      return { element: dot, x: window.innerWidth / 2, y: window.innerHeight / 2 };
    });

    document.body.appendChild(trail);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let hasPointer = false;

    window.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      hasPointer = true;
      trail.classList.add("is-visible");
    });

    window.addEventListener("pointerleave", () => {
      hasPointer = false;
      trail.classList.remove("is-visible");
    });

    function animateTrail() {
      let leadX = targetX;
      let leadY = targetY;

      dots.forEach((dot, index) => {
        const speed = 0.34 - Math.min(index * 0.012, 0.16);
        dot.x += (leadX - dot.x) * speed;
        dot.y += (leadY - dot.y) * speed;
        dot.element.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
        dot.element.style.opacity = hasPointer ? String(Math.max(0.08, 1 - index * 0.065)) : "0";
        leadX = dot.x;
        leadY = dot.y;
      });

      window.requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

  function initCarousel(carousel) {
    const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsWrap = carousel.querySelector(".carousel-dots");
    if (!slides.length) return;

    let activeIndex = 0;
    let timer = 0;
    const dots = dotsWrap
      ? slides.map((_, index) => {
          const dot = document.createElement("button");
          dot.type = "button";
          dot.setAttribute("aria-label", `Show concept preview ${index + 1}`);
          dot.setAttribute("aria-current", index === 0 ? "true" : "false");
          dot.addEventListener("click", () => {
            showSlide(index);
            restartAutoplay();
          });
          dotsWrap.appendChild(dot);
          return dot;
        })
      : [];

    function showSlide(index) {
      activeIndex = (index + slides.length) % slides.length;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === activeIndex);
      });
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeIndex);
        dot.setAttribute("aria-current", dotIndex === activeIndex ? "true" : "false");
      });
    }

    function next() {
      showSlide(activeIndex + 1);
    }

    function restartAutoplay() {
      window.clearInterval(timer);
      if (!reducedMotionQuery.matches) {
        timer = window.setInterval(next, 6500);
      }
    }

    if (prevButton) {
      prevButton.addEventListener("click", () => {
        showSlide(activeIndex - 1);
        restartAutoplay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", () => {
        next();
        restartAutoplay();
      });
    }

    carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
    carousel.addEventListener("mouseleave", restartAutoplay);

    showSlide(0);
    restartAutoplay();
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
    link.addEventListener("click", () => closeMenu());
  });

  samePageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const url = new URL(link.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;

      event.preventDefault();
      closeMenu();
      const targetTop = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();
      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: reducedMotionQuery.matches ? "auto" : "smooth"
      });
      history.pushState(null, "", url.hash);
    });
  });

  forms.forEach((form) => {
    form.setAttribute("novalidate", "");

    form.addEventListener("input", (event) => {
      const field = event.target;
      if (field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement) {
        clearFieldError(field);
        const status = form.querySelector(".form-status");
        if (status) {
          status.textContent = "";
          status.classList.remove("error");
        }
      }
    });

    form.addEventListener("submit", (event) => {
      if (!validateForm(form)) {
        event.preventDefault();
        return;
      }

      const submitButton = form.querySelector("[data-submit-button]");
      const status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "Submitting your enquiry...";
        status.classList.remove("error");
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
      }
    });
  });

  const mailtoFallback = document.querySelector("#mailto-fallback");
  const contactForm = document.querySelector("#contact-form");
  if (mailtoFallback && contactForm) {
    mailtoFallback.addEventListener("click", () => {
      const data = new FormData(contactForm);
      const subject = "OpenAir Pixels expression of interest";
      const fields = [
        ["Full name", data.get("full_name")],
        ["Email", data.get("email")],
        ["Phone", data.get("phone")],
        ["Suburb or city", data.get("suburb_city")],
        ["State", data.get("state")],
        ["Property type", data.get("property_type")],
        ["Package interest", data.get("package_interest")],
        ["Approximate budget", data.get("approximate_budget")],
        ["Main interest", data.get("main_interest")],
        ["Message", data.get("message")]
      ];
      const body = fields.map(([label, value]) => `${label}: ${value || ""}`).join("\n");
      mailtoFallback.href = `mailto:openair.pixels@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
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
      }, { threshold: 0.14 });
      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }
  }

  mediaImages.forEach((image) => {
    const wrapper = image.closest(".concept-media");
    if (wrapper) wrapper.classList.add("has-media-image");

    const markFailed = () => {
      if (wrapper) wrapper.classList.add("media-image-failed");
    };
    image.addEventListener("error", markFailed);
    if (image.complete && image.naturalWidth === 0) markFailed();
  });

  setActiveNavigation();
  initLedTrail();
  carousels.forEach(initCarousel);
  pixelCanvases.forEach(initPixelCanvas);
})();
