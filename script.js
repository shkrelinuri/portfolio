const CONTACT_EMAIL = "nurishkreli5@gmail.com";

const projectDetails = {
  music: {
    type: "WEB APP · MUSIC",
    title: "Music Player",
    description: "A browser-based music library with a home view, searchable listening collection, favorites, playlists, and a persistent player. Built as a hands-on exploration of interface design and interaction details.",
    tags: ["HTML / CSS", "JAVASCRIPT", "RESPONSIVE UI"],
  },
  store: {
    type: "ECOMMERCE · FULL STACK",
    title: "Online Store",
    description: "A full-stack commerce project with a dedicated React client and Node.js server. The work brings the storefront and its supporting application logic together as one product experience.",
    tags: ["REACT", "NODE.JS", "FULL STACK"],
  },
  resume: {
    type: "AI TOOL · CAREER",
    title: "Resume Score",
    description: "A resume review product built with Next.js. It gives job seekers a focused way to submit a resume and get feedback designed to help them improve their next application.",
    tags: ["NEXT.JS", "REACT", "DOCUMENT WORKFLOW"],
  },
  chess: {
    type: "INTERACTIVE APP · CHESS",
    title: "Chess Talent Estimator",
    description: "A Next.js chess assessment with email sign-in, varied tactical puzzles, instant qualitative results, and an optional paid full breakdown. The interactive board and puzzle experience are powered by chess.js.",
    tags: ["NEXT.JS", "SUPABASE", "CHESS.JS"],
  },
  mog: {
    type: "AI PRODUCT · MOBILE READY",
    title: "Facial Analysis Software",
    description: "A web-first portrait-analysis app built with React, Vite, and Capacitor. It combines account access, explicit photo consent, private uploads, and an AI-generated feedback report in a mobile-ready experience.",
    tags: ["REACT", "CAPACITOR", "AI INTEGRATION"],
  },
  endgame: {
    type: "MULTIPLAYER GAME · CROSS-PLATFORM",
    title: "Endgame Chess",
    description: "A chess app for local Stockfish games or live opponents, with online time controls, server-authoritative clocks and move validation, and optional sign-in for account-backed features. The project also supports static web export and Capacitor packaging.",
    tags: ["NEXT.JS", "SOCKET.IO", "STOCKFISH 19"],
  },
  proxy: {
    type: "FULL STACK PLATFORM · INFRASTRUCTURE",
    title: "Proxy Provider Platform",
    description: "A proxy-provider platform with customer and admin dashboards, subscription billing, Redis-metered usage, and 3proxy/Squid integrations. Authentication, usage reporting, and abuse controls are built into the backend and gateway flow.",
    tags: ["REACT", "NODE.JS", "REDIS · STRIPE"],
  },
  murlan: {
    type: "IN PROGRESS · MULTIPLAYER CARD GAME",
    title: "Murlan Pro",
    description: "An early cross-platform multiplayer card game inspired by Albanian Murlan rules. The current project has a Flutter app shell and a Node.js/Socket.IO backend scaffold, with game validation intended to remain server-authoritative.",
    tags: ["FLUTTER", "NODE.JS", "SOCKET.IO"],
  },
};

const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogType = document.querySelector("#dialog-type");
const dialogDescription = document.querySelector("#dialog-description");
const dialogTags = document.querySelector("#dialog-tags");

document.querySelectorAll("[data-project]").forEach((card) => {
  card.querySelector(".project-open").addEventListener("click", () => {
    const project = projectDetails[card.dataset.project];
    dialogType.textContent = project.type;
    dialogTitle.textContent = project.title;
    dialogDescription.textContent = project.description;
    dialogTags.replaceChildren(...project.tags.map((tag) => {
      const chip = document.createElement("span");
      chip.textContent = tag;
      return chip;
    }));
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});

function closeDialog() {
  dialog.close();
  document.body.classList.remove("dialog-open");
}

dialog.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
dialog.querySelector(".dialog-cta").addEventListener("click", closeDialog);

const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
  mobileNav.hidden = expanded;
});
mobileNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}));

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = `${formData.get("projectType")} inquiry from ${formData.get("name")}`;
  const body = [
    `Project type: ${formData.get("projectType")}`,
    `Name: ${formData.get("name")}`,
    `Email: ${formData.get("email")}`,
    "",
    "Project details:",
    formData.get("project"),
  ].join("\n");
  const composeUrl = new URL("https://mail.google.com/mail/");
  composeUrl.search = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: CONTACT_EMAIL,
    su: subject,
    body,
  });
  const fallbackLink = document.querySelector("#gmail-fallback");
  fallbackLink.href = composeUrl.toString();
  fallbackLink.hidden = false;
  document.querySelector("#form-note").textContent = "Gmail draft opened. Review it and press Send to deliver your inquiry.";
  window.open(composeUrl.toString(), "_blank", "noopener,noreferrer");
});

document.querySelector("#year").textContent = new Date().getFullYear();
const footerEmail = document.querySelector("#footer-email");
footerEmail.href = `mailto:${CONTACT_EMAIL}`;
footerEmail.textContent = CONTACT_EMAIL;
footerEmail.setAttribute("aria-label", "Email Nuri Shkreli");

const revealTargets = document.querySelectorAll(".section-heading, .project-card, .service-row, .about-content, .contact-grid");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((target) => target.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}