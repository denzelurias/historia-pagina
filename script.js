const siteNav = document.querySelector(".site-nav");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");

if (siteNav && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("nav-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("nav-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const timelineButtons = document.querySelectorAll(".timeline-trigger");
const timelinePanels = document.querySelectorAll(".timeline-card");

function activateTimelinePanel(targetId) {
  timelineButtons.forEach((button) => {
    const isActive = button.dataset.target === targetId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  timelinePanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.classList.toggle("is-active", isActive);
    panel.hidden = !isActive;
  });
}

timelineButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTimelinePanel(button.dataset.target);
  });
});

const accordionButtons = document.querySelectorAll(".accordion-trigger");

accordionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");
    const panel = document.getElementById(panelId);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isExpanded));
    if (panel) {
      panel.hidden = isExpanded;
    }
  });
});

const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

if (quizForm && quizResult) {
  const answers = {
    q1: "b",
    q2: "a",
    q3: "b",
  };

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let score = 0;

    Object.entries(answers).forEach(([question, correctValue]) => {
      const selected = quizForm.querySelector(`input[name="${question}"]:checked`);
      if (selected && selected.value === correctValue) {
        score += 1;
      }
    });

    if (score === 3) {
      quizResult.textContent =
        "Resultado: 3 de 3. Le\u00edste el recorrido como un proceso conectado, justo como propone el curso.";
      return;
    }

    if (score === 2) {
      quizResult.textContent =
        "Resultado: 2 de 3. La idea central est\u00e1 clara; vale la pena repasar c\u00f3mo se enlazan la conquista, las rutas globales y la rep\u00fablica.";
      return;
    }

    quizResult.textContent =
      "Resultado: " +
      score +
      " de 3. Vuelve a la l\u00ednea del tiempo y a los bloques de debate: la clave del sitio es relacionar procesos, no memorizar datos sueltos.";
  });
}
