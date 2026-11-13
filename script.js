(function () {
  "use strict";

  const root = document.documentElement;
  const $ = (s) => document.querySelector(s);

  /* ---------- Theme ---------- */
  try {
    const saved = localStorage.getItem("theme");
    if (saved) root.setAttribute("data-theme", saved);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
  } catch (e) { /* storage unavailable */ }

  $("#themeBtn").addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  /* ---------- Mobile menu ---------- */
  const menuBtn = $("#menuBtn");
  const nav = $("#navLinks");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- Profile photo fallback ---------- */
  const img = $("#avatarImg");
  const avatar = img.closest(".avatar");
  const showFallback = () => avatar.classList.add("no-photo");
  img.addEventListener("error", showFallback);
  if (img.complete && img.naturalWidth === 0) showFallback();

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll("[data-count]");
  const co = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      let n = 0;
      const step = () => {
        n += 1;
        el.textContent = n;
        if (n < target) setTimeout(step, 220);
      };
      step();
      co.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => co.observe(c));

  /* ---------- Active nav link ---------- */
  const links = [...nav.querySelectorAll("a")];
  const sections = links.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  const so = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach((s) => so.observe(s));

  /* ---------- Contact form (opens the visitor's email app) ---------- */
  const form = $("#contactForm");
  const msg = $("#formMsg");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const text = $("#message").value.trim();
    msg.className = "form-msg";

    if (!name || !text || !/^\S+@\S+\.\S+$/.test(email)) {
      msg.textContent = "Please fill in all fields with a valid email.";
      msg.classList.add("error");
      return;
    }
    const subject = encodeURIComponent("Portfolio enquiry from " + name);
    const body = encodeURIComponent(text + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:apsanj@gmail.com?subject=" + subject + "&body=" + body;
    msg.textContent = "Opening your email app…";
    msg.classList.add("ok");
    form.reset();
  });

  /* ---------- Footer year ---------- */
  $("#year").textContent = new Date().getFullYear();
})();
