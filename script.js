const root = document.documentElement;
const body = document.body;

root.classList.add("js-ready");

const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const THEME_STORAGE_KEY = "site-theme-v2";
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

function applyTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  root.setAttribute("data-theme", nextTheme);

  if (themeToggle) {
    const isDark = nextTheme === "dark";
    themeToggle.setAttribute("aria-pressed", String(isDark));
    if (themeToggleLabel) {
      themeToggleLabel.textContent = isDark ? "Modo oscuro" : "Modo claro";
    }
  }

  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", nextTheme === "dark" ? "#131313" : "#f7f2e8");
  }
}

const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
applyTheme(savedTheme || "light");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const menuClose = document.querySelector(".menu-close");
const menuOverlay = document.querySelector(".menu-overlay");
const menuDrawer = document.querySelector(".menu-drawer");
const menuLinks = document.querySelectorAll(".menu-links a");

function setMenuOpen(isOpen) {
  if (!siteHeader || !menuToggle || !menuDrawer) {
    return;
  }

  siteHeader.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuDrawer.setAttribute("aria-hidden", String(!isOpen));
  body.classList.toggle("has-locked-scroll", isOpen);
}

if (menuToggle && menuDrawer) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader?.classList.contains("menu-open");
    setMenuOpen(!isOpen);
  });
}

if (menuClose) {
  menuClose.addEventListener("click", () => setMenuOpen(false));
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", () => setMenuOpen(false));
}

menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

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

const progressBar = document.querySelector(".reading-progress-bar");
const heroBackdrop = document.querySelector(".hero-backdrop");

function syncScrollEffects() {
  const doc = document.documentElement;
  const scrollableHeight = doc.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

  if (progressBar) {
    progressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }

  if (!reduceMotionQuery.matches && heroBackdrop) {
    const offset = Math.min(window.scrollY * 0.12, 80);
    heroBackdrop.style.transform = `translate3d(0, ${offset}px, 0)`;
  }
}

let scrollTicking = false;

function requestScrollSync() {
  if (scrollTicking) {
    return;
  }

  scrollTicking = true;
  window.requestAnimationFrame(() => {
    syncScrollEffects();
    scrollTicking = false;
  });
}

window.addEventListener("scroll", requestScrollSync, { passive: true });
window.addEventListener("resize", requestScrollSync);
syncScrollEffects();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

function registerReveals(selector, effectClass = "") {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (element.dataset.revealReady === "true") {
      return;
    }

    element.dataset.revealReady = "true";
    element.classList.add("reveal");

    if (effectClass) {
      element.classList.add(effectClass);
    }

    element.style.setProperty("--reveal-delay", `${(index % 6) * 70}ms`);

    if (reduceMotionQuery.matches) {
      element.classList.add("is-visible");
      return;
    }

    revealObserver.observe(element);
  });
}

registerReveals(".hero-copy", "reveal-left");
registerReveals(".hero-panel", "reveal-right");
registerReveals(".intro-grid, .section-heading, .timeline-layout, .section-note, .route-map, .quiz-card, .quiz-shell, .quiz-meta");
registerReveals(".panel-card, .timeline-trigger, .timeline-card, .feature-card, .debate-card, .section-illustration, .accordion-card, .contrast-card, .source-column, .closing-step, .quiz-question", "reveal-scale");

const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

if (quizForm && quizResult) {
  const questionSets = Array.from(quizForm.querySelectorAll("fieldset[data-answer]"));

  quizForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let score = 0;
    let answered = 0;

    questionSets.forEach((question) => {
      const answer = question.dataset.answer;
      const input = question.querySelector('input[type="radio"]');
      const name = input?.name;
      const selected = name ? quizForm.querySelector(`input[name="${name}"]:checked`) : null;

      if (selected) {
        answered += 1;
      }

      if (selected && selected.value === answer) {
        score += 1;
      }
    });

    const total = questionSets.length;
    const unanswered = total - answered;

    if (unanswered > 0) {
      quizResult.textContent =
        "Aún te faltan " +
        unanswered +
        " respuesta" +
        (unanswered === 1 ? "" : "s") +
        ". Puedes enviar así si quieres un tanteo rápido, pero el resultado final será más útil cuando completes todo el cuestionario.";
      return;
    }

    if (score === total) {
      quizResult.textContent =
        "Resultado: " +
        score +
        " de " +
        total +
        ". Leíste el sitio como una red de procesos conectados: exactamente la mirada histórica que propone el recorrido.";
      return;
    }

    if (score >= total - 2) {
      quizResult.textContent =
        "Resultado: " +
        score +
        " de " +
        total +
        ". La comprensión general es muy sólida; conviene repasar las tensiones entre debate moral, vida cotidiana y reforma política.";
      return;
    }

    if (score >= Math.ceil(total / 2)) {
      quizResult.textContent =
        "Resultado: " +
        score +
        " de " +
        total +
        ". Ya está clara la secuencia general, pero vale la pena volver a las secciones de rutas globales, misiones y república temprana para afinar conexiones.";
      return;
    }

    quizResult.textContent =
      "Resultado: " +
      score +
      " de " +
      total +
      ". Conviene releer el recorrido con calma: la clave del sitio es relacionar actores, espacios y cambios de larga duración.";
  });

  quizForm.addEventListener("reset", () => {
    window.requestAnimationFrame(() => {
      quizResult.textContent = "";
    });
  });
}

const routeMapCanvas = document.getElementById("route-map-canvas");
const routeMap = routeMapCanvas?.closest(".route-map");

function initializeRouteMap() {
  if (!routeMapCanvas || !window.L) {
    return;
  }

  const primaryColor = getComputedStyle(root).getPropertyValue("--primary").trim() || "#b1771b";
  const surfaceColor = getComputedStyle(root).getPropertyValue("--surface").trim() || "#f7f2e8";
  const textColor = getComputedStyle(root).getPropertyValue("--text").trim() || "#18130e";

  const map = window.L.map(routeMapCanvas, {
    zoomControl: true,
    scrollWheelZoom: false,
    attributionControl: true,
    worldCopyJump: false,
  });

  map.attributionControl.setPrefix("");

  window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 6,
    minZoom: 2,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const markers = [
    {
      title: "Sevilla",
      coordinates: [37.3891, -5.9845],
      description: "Puerto clave para la Carrera de Indias y la administración comercial atlántica.",
    },
    {
      title: "Veracruz",
      coordinates: [19.1738, -96.1342],
      description: "Entrada atlántica del virreinato y punto de llegada de flotas, mercancías y noticias.",
    },
    {
      title: "Ciudad de México",
      coordinates: [19.4326, -99.1332],
      description: "Centro político, fiscal y simbólico del espacio novohispano.",
    },
    {
      title: "Acapulco",
      coordinates: [16.8531, -99.8237],
      description: "Puerto del Pacífico desde donde se articulaba la conexión con Asia.",
    },
    {
      title: "Manila",
      coordinates: [14.5995, 120.9842],
      description: "Nodo asiático del galeón, ligado a sedas, porcelanas, especias y circulación de plata.",
    },
  ];

  const atlanticRoute = [
    [37.3891, -5.9845],
    [19.1738, -96.1342],
    [19.4326, -99.1332],
    [16.8531, -99.8237],
  ];

  const pacificHintWest = [
    [16.8531, -99.8237],
    [19, -122],
    [22, -150],
  ];

  const pacificHintEast = [
    [14.5995, 120.9842],
    [16, 138],
    [19, 155],
  ];

  window.L.polyline(atlanticRoute, {
    color: primaryColor,
    weight: 3,
    opacity: 0.82,
    dashArray: "12 10",
  }).addTo(map);

  window.L.polyline(pacificHintWest, {
    color: primaryColor,
    weight: 3,
    opacity: 0.55,
    dashArray: "10 12",
  }).addTo(map);

  window.L.polyline(pacificHintEast, {
    color: primaryColor,
    weight: 3,
    opacity: 0.55,
    dashArray: "10 12",
  }).addTo(map);

  markers.forEach((marker) => {
    window.L.circleMarker(marker.coordinates, {
      radius: 7,
      color: surfaceColor,
      weight: 2,
      fillColor: primaryColor,
      fillOpacity: 0.94,
    })
      .addTo(map)
      .bindPopup(
        "<strong>" +
          marker.title +
          "</strong>" +
          "<span style=\"color:" +
          textColor +
          "; display:block;\">" +
          marker.description +
          "</span>"
      );
  });

  map.fitBounds(
    window.L.latLngBounds(markers.map((marker) => marker.coordinates)).pad(0.26)
  );

  routeMap?.classList.add("is-loaded");
}

if (routeMapCanvas) {
  if (window.L) {
    initializeRouteMap();
  } else {
    window.addEventListener("load", initializeRouteMap, { once: true });
  }
}
