const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav a");
const revealItems = document.querySelectorAll(".reveal");
const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const contactForm = document.querySelector(".contact-form");

const projectData = {
  1: {
    title: "EduPeak Coaching",
    text: "A conversion-focused coaching website concept designed to improve inquiries, trust, and premium brand positioning."
  },
  2: {
    title: "Nova Commerce",
    text: "A sleek branding and online store identity concept with modern visuals built for memorability and clarity."
  },
  3: {
    title: "LocalLift Media",
    text: "A social-first growth concept for local businesses wanting better content systems and stronger online presence."
  },
  4: {
    title: "TaskZen Mobile",
    text: "A clean app interface concept focused on usability, modern flow, and product trust through polished visual design."
  }
};

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    document.body.classList.toggle("menu-open");

    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.88;

  revealItems.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top < triggerBottom) {
      item.classList.add("visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

projectCards.forEach((card) => {
  const button = card.querySelector(".project-link");

  button.addEventListener("click", () => {
    const projectId = card.getAttribute("data-project");
    const project = projectData[projectId];

    if (project) {
      modalTitle.textContent = project.title;
      modalText.textContent = project.text;
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("menu-open");
    }
  });
});

const closeModal = () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("menu-open");
};

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    

    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Inquiry Sent";
    submitButton.disabled = true;

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      contactForm.reset();
    }, 1800);
  });
}
