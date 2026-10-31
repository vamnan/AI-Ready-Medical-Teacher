// Small helpers shared by the inner pages.
(function () {
  var cfg = window.APP_CONFIG || {};
  var email = String(cfg.CONTACT_EMAIL || "").trim();
  // Fill every [data-contact] element with the contact email from config.js.
  document.querySelectorAll("[data-contact]").forEach(function (el) {
    if (email) {
      var a = document.createElement("a");
      a.href = "mailto:" + email;
      a.textContent = email;
      el.textContent = "";
      el.appendChild(a);
    } else {
      el.textContent = "the contact email shared in the webinar WhatsApp group";
    }
  });
})();

// Header border on scroll, top-edge progress bar, and blur-to-sharp reveal for below-the-fold content.
(function () {
  var bar = document.querySelector(".progress");
  var top = document.querySelector(".topbar");
  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(window.scrollY / h, 1) : 0) + ")";
    if (top) top.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  var targets = document.querySelectorAll(".section-head, section h2, .card, .next-card, .agenda tbody tr, .timeline li, details.faq, .facilitator-photo");
  targets.forEach(function (el, i) {
    // Elements already on screen at load stay as they are, so nothing flashes.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    if (el.parentElement && el.parentElement.closest(".reveal")) return;
    el.classList.add("reveal");
    el.addEventListener("transitionend", function () { el.style.transitionDelay = ""; }, { once: true });
    el.style.transitionDelay = (i % 4) * 70 + "ms";
    io.observe(el);
  });
})();
