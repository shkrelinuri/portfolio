const CONTACT_EMAIL = "nurishkreli5@gmail.com";

const projectDetails = {
  music: {
    type: "WEB APP · MUSIC",
    title: "Music Player",
    description: "A browser-based music library with a home view, searchable listening collection, favorites, playlists, and a persistent player. Built as a hands-on exploration of interface design and interaction details.",
    tags: ["HTML / CSS", "JAVASCRIPT", "RESPONSIVE UI"],
    images: [
      "projects/music-app/1.png",
      "projects/music-app/2.png"
    ],
  },
  store: {
    type: "ECOMMERCE · FULL STACK",
    title: "Online Store",
    description: "A full-stack commerce project with a dedicated React client and Node.js server. The work brings the storefront and its supporting application logic together as one product experience.",
    tags: ["REACT", "NODE.JS", "FULL STACK"],
    images: [
      "projects/online-store/1.png",
      "projects/online-store/2.png",
      "projects/online-store/3.png",
      "projects/online-store/4.png",
      "projects/online-store/5.png"
    ],
  },
  resume: {
    type: "AI TOOL · CAREER",
    title: "Resume Score",
    description: "A resume review product built with Next.js. It gives job seekers a focused way to submit a resume and get feedback designed to help them improve their next application.",
    tags: ["NEXT.JS", "REACT", "DOCUMENT WORKFLOW"],
    images: [
      "projects/hireability/1.png",
      "projects/hireability/2.png",
      "projects/hireability/3.png"
    ],
  },
  chess: {
    type: "INTERACTIVE APP · CHESS",
    title: "Chess Talent Estimator",
    description: "A Next.js chess assessment with email sign-in, varied tactical puzzles, instant qualitative results, and an optional paid full breakdown. The interactive board and puzzle experience are powered by chess.js.",
    tags: ["NEXT.JS", "SUPABASE", "CHESS.JS"],
    images: [
      "projects/chess-estimator/1.png",
      "projects/chess-estimator/2.png",
      "projects/chess-estimator/3.png"
    ],
  },
  mog: {
    type: "AI PRODUCT · MOBILE READY",
    title: "Facial Analysis Software",
    description: "A web-first portrait-analysis app built with React, Vite, and Capacitor. It combines account access, explicit photo consent, private uploads, and an AI-generated feedback report in a mobile-ready experience.",
    tags: ["REACT", "CAPACITOR", "AI INTEGRATION"],
    images: [
      "projects/facescore/1.png",
      "projects/facescore/2.png",
      "projects/facescore/3.png",
      "projects/facescore/4.png"
    ],
  },
  endgame: {
    type: "MULTIPLAYER GAME · CROSS-PLATFORM",
    title: "Endgame Chess",
    description: "A chess app for local Stockfish games or live opponents, with online time controls, server-authoritative clocks and move validation, and optional sign-in for account-backed features. The project also supports static web export and Capacitor packaging.",
    tags: ["NEXT.JS", "SOCKET.IO", "STOCKFISH 19"],
    images: [
      "projects/chess-game/1.png",
      "projects/chess-game/2.png",
      "projects/chess-game/3.png",
      "projects/chess-game/4.png"
    ],
  },
  proxy: {
    type: "FULL STACK PLATFORM · INFRASTRUCTURE",
    title: "Proxy Provider Platform",
    description: "A proxy-provider platform with customer and admin dashboards, subscription billing, Redis-metered usage, and 3proxy/Squid integrations. Authentication, usage reporting, and abuse controls are built into the backend and gateway flow.",
    tags: ["REACT", "NODE.JS", "REDIS · STRIPE"],
    images: [
      "projects/proxy-provider/1.png",
      "projects/proxy-provider/2.png",
      "projects/proxy-provider/3.png",
      "projects/proxy-provider/4.png"
    ],
  },
  murlan: {
    type: "IN PROGRESS · MULTIPLAYER CARD GAME",
    title: "Murlan Pro",
    description: "An early cross-platform multiplayer card game inspired by Albanian Murlan rules. The current project has a Flutter app shell and a Node.js/Socket.IO backend scaffold, with game validation intended to remain server-authoritative.",
    tags: ["FLUTTER", "NODE.JS", "SOCKET.IO"],
    images: [],
  },
};

const dialog = document.querySelector("#project-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogType = document.querySelector("#dialog-type");
const dialogDescription = document.querySelector("#dialog-description");
const dialogTags = document.querySelector("#dialog-tags");

const dialogGallery = document.querySelector("#dialog-gallery");
const galleryImg = document.querySelector("#gallery-img");
const galleryPrev = document.querySelector("#gallery-prev");
const galleryNext = document.querySelector("#gallery-next");
const galleryCounter = document.querySelector("#gallery-counter");
const dialogThumbs = document.querySelector("#dialog-thumbs");

let currentGalleryImages = [];
let currentGalleryIndex = 0;

function updateGalleryView() {
  if (!currentGalleryImages.length) {
    dialogGallery.hidden = true;
    return;
  }
  dialogGallery.hidden = false;
  galleryImg.src = currentGalleryImages[currentGalleryIndex];
  galleryImg.alt = `${dialogTitle.textContent} screenshot ${currentGalleryIndex + 1}`;
  galleryCounter.textContent = `${currentGalleryIndex + 1} / ${currentGalleryImages.length}`;
  galleryPrev.style.display = currentGalleryImages.length > 1 ? "grid" : "none";
  galleryNext.style.display = currentGalleryImages.length > 1 ? "grid" : "none";

  dialogThumbs.querySelectorAll(".gallery-thumb-btn").forEach((btn, idx) => {
    btn.classList.toggle("is-active", idx === currentGalleryIndex);
  });
}

function prevImage() {
  if (currentGalleryImages.length <= 1) return;
  currentGalleryIndex = (currentGalleryIndex - 1 + currentGalleryImages.length) % currentGalleryImages.length;
  updateGalleryView();
}

function nextImage() {
  if (currentGalleryImages.length <= 1) return;
  currentGalleryIndex = (currentGalleryIndex + 1) % currentGalleryImages.length;
  updateGalleryView();
}

galleryPrev.addEventListener("click", (e) => {
  e.stopPropagation();
  prevImage();
});

galleryNext.addEventListener("click", (e) => {
  e.stopPropagation();
  nextImage();
});

window.addEventListener("keydown", (event) => {
  if (!dialog.open) return;
  if (event.key === "ArrowLeft") {
    prevImage();
  } else if (event.key === "ArrowRight") {
    nextImage();
  }
});

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

    currentGalleryImages = project.images || [];
    currentGalleryIndex = 0;

    dialogThumbs.replaceChildren(...currentGalleryImages.map((imgSrc, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-thumb-btn" + (index === 0 ? " is-active" : "");
      btn.setAttribute("aria-label", `View screenshot ${index + 1}`);
      const thumb = document.createElement("img");
      thumb.src = imgSrc;
      thumb.alt = "";
      btn.appendChild(thumb);
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        currentGalleryIndex = index;
        updateGalleryView();
      });
      return btn;
    }));

    updateGalleryView();
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

const contactForm = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const submitSpan = submitButton.querySelector("span:first-child");
  const originalText = submitSpan ? submitSpan.textContent : "Send project inquiry";

  submitButton.disabled = true;
  if (submitSpan) submitSpan.textContent = "Sending...";
  formNote.className = "form-note form-sending";
  formNote.textContent = "Sending your message...";

  try {
    const response = await fetch("https://formspree.io/f/mrpeaond", {
      method: "POST",
      body: new FormData(contactForm),
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      contactForm.reset();
      formNote.className = "form-note form-success";
      formNote.textContent = "Your form was submitted and we will get back to you.";
    } else {
      const data = await response.json().catch(() => ({}));
      formNote.className = "form-note form-error";
      if (data && data.errors && data.errors.length) {
        formNote.textContent = data.errors.map((err) => err.message).join(", ");
      } else {
        formNote.textContent = "Oops! There was a problem submitting your form. Please try again.";
      }
    }
  } catch (error) {
    formNote.className = "form-note form-error";
    formNote.textContent = "Oops! There was a network error. Please try again.";
  } finally {
    submitButton.disabled = false;
    if (submitSpan) submitSpan.textContent = originalText;
  }
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