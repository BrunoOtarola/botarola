/**
 * @fileoverview CV / Portfolio — Bruno David Otárola González
 * @description  Módulo principal de interactividad del portafolio.
 *               Gestiona animaciones de entrada, navegación adaptativa,
 *               efecto de tipeo, barras de habilidades y formulario de contacto.
 *
 * @version      2.0.0
 * @author       Bruno Otárola <bruno.otarola.g@gmail.com>
 * @license      MIT
 */

'use strict';

/* ==========================================================================
   CONSTANTES DE CONFIGURACIÓN
   ========================================================================== */

/**
 * Textos que se ciclan en el efecto de tipeo del hero.
 * @type {string[]}
 */
const TYPED_STRINGS = [
  'Desarrollador Mobile Senior',
  'Flutter & React Native',
  'Ingeniero en Informática',
  'Docente IT & Mentor',
  'Cloud & DevOps Enthusiast',
];

/**
 * Velocidad de escritura en milisegundos por carácter.
 * @type {number}
 */
const TYPING_SPEED = 80;

/**
 * Velocidad de borrado en milisegundos por carácter.
 * @type {number}
 */
const ERASE_SPEED = 40;

/**
 * Pausa antes de comenzar a borrar (ms).
 * @type {number}
 */
const PAUSE_BEFORE_ERASE = 2200;

/**
 * Pausa antes de escribir el siguiente texto (ms).
 * @type {number}
 */
const PAUSE_BEFORE_TYPE = 400;

/* ==========================================================================
   PUNTO DE ENTRADA
   ========================================================================== */

/**
 * Inicializa todos los módulos una vez el DOM está completamente cargado.
 * Se encapsulan en un DOMContentLoaded para evitar efectos secundarios
 * sobre elementos aún no disponibles en el árbol.
 */
document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initNavigation();
  initSmoothScroll();
  initScrollAnimations();
  initTypingEffect();
  initSkillBars();
  initContactForm();
  updateActiveNavOnScroll();
});

/* ==========================================================================
   MÓDULO: BARRA DE PROGRESO DE LECTURA
   ========================================================================== */

/**
 * Crea y actualiza una barra de progreso fija que refleja
 * el porcentaje de desplazamiento vertical de la página.
 *
 * @returns {void}
 */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  /**
   * Calcula el porcentaje de scroll y lo aplica al ancho de la barra.
   * @listens window:scroll
   */
  window.addEventListener('scroll', () => {
    const scrollTop    = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress     = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

    bar.style.width = `${progress}%`;
  }, { passive: true });
}

/* ==========================================================================
   MÓDULO: NAVEGACIÓN
   ========================================================================== */

/**
 * Gestiona el comportamiento de la barra de navegación:
 * - Aplica la clase `.scrolled` con efecto cristal (blur) al hacer scroll.
 * - Controla la apertura/cierre del menú hamburguesa en móvil.
 * - Cierra el menú al seleccionar un enlace de navegación.
 *
 * @returns {void}
 */
function initNavigation() {
  const nav            = document.querySelector('.nav');
  const hamburger      = document.querySelector('.nav__hamburger');
  const navLinks       = document.querySelector('.nav__links');
  const navLinkItems   = document.querySelectorAll('.nav__links a');

  if (!nav) return;

  // ── Efecto cristal al hacer scroll ──────────────────────────────────────
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // ── Menú hamburguesa ─────────────────────────────────────────────────────
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      navLinks.classList.toggle('open', isOpen);

      // Accesibilidad: aria-expanded
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Cierra el menú al hacer clic en cualquier enlace interno
    navLinkItems.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ==========================================================================
   MÓDULO: SCROLL SUAVE
   ========================================================================== */

/**
 * Intercepta los clics sobre enlaces con ancla (`href="#..."``) para
 * desplazar la página de forma suave hasta la sección objetivo.
 * Compensa la altura fija de la barra de navegación.
 *
 * @returns {void}
 */
function initSmoothScroll() {
  const NAV_HEIGHT = 70; // px — altura de la navbar fija

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();

      const offsetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;

      window.scrollTo({
        top:      offsetTop,
        behavior: 'smooth',
      });
    });
  });
}

/* ==========================================================================
   MÓDULO: ANIMACIONES DE ENTRADA (Intersection Observer)
   ========================================================================== */

/**
 * Observa todos los elementos con la clase `.reveal` y les añade
 * `.is-visible` cuando entran en el viewport, disparando su animación CSS.
 * Usa Intersection Observer API para no bloquear el hilo principal.
 *
 * @returns {void}
 */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if (!revealElements.length) return;

  /** @type {IntersectionObserverInit} */
  const options = {
    threshold:  0.12,   // 12 % del elemento visible para disparar
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Una vez animado, ya no es necesario seguir observando
        observer.unobserve(entry.target);
      }
    });
  }, options);

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   MÓDULO: EFECTO DE TIPEO ANIMADO
   ========================================================================== */

/**
 * Produce el efecto de máquina de escribir sobre el elemento `.hero__title`.
 * Cicla por los textos definidos en TYPED_STRINGS de forma indefinida.
 *
 * @returns {void}
 */
function initTypingEffect() {
  const container = document.querySelector('.hero__title');
  if (!container) return;

  // Crea el span de texto y el cursor por separado para mayor control
  const textSpan   = document.createElement('span');
  const cursorSpan = document.createElement('span');
  cursorSpan.className  = 'typed-cursor';
  cursorSpan.textContent = '|';

  container.textContent = '';
  container.appendChild(textSpan);
  container.appendChild(cursorSpan);

  let stringIndex = 0;
  let charIndex   = 0;
  let isErasing   = false;

  /**
   * Loop recursivo que escribe y borra texto carácter a carácter.
   * @returns {void}
   */
  function tick() {
    const current = TYPED_STRINGS[stringIndex];

    if (!isErasing) {
      // ── Fase de escritura ──
      textSpan.textContent = current.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === current.length) {
        // Texto completo → esperar antes de borrar
        isErasing = true;
        setTimeout(tick, PAUSE_BEFORE_ERASE);
        return;
      }
      setTimeout(tick, TYPING_SPEED);
    } else {
      // ── Fase de borrado ──
      textSpan.textContent = current.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        // Texto borrado → pasar al siguiente
        isErasing = false;
        stringIndex = (stringIndex + 1) % TYPED_STRINGS.length;
        setTimeout(tick, PAUSE_BEFORE_TYPE);
        return;
      }
      setTimeout(tick, ERASE_SPEED);
    }
  }

  // Arranque con un pequeño retraso para no competir con otras animaciones
  setTimeout(tick, 800);
}

/* ==========================================================================
   MÓDULO: BARRAS DE HABILIDADES
   ========================================================================== */

/**
 * Anima las barras de habilidades hasta su valor objetivo (`data-level`)
 * cuando entran en el viewport. El valor `data-level` debe ser un entero
 * entre 0 y 100 que representa el porcentaje de dominio.
 *
 * @returns {void}
 */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar__fill[data-level]');

  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar   = entry.target;
        const level = parseInt(bar.dataset.level, 10) || 0;

        // Pequeño retraso para que la transición CSS sea perceptible
        setTimeout(() => {
          bar.style.width = `${level}%`;
        }, 150);

        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach((bar) => observer.observe(bar));
}

/* ==========================================================================
   MÓDULO: RESALTADO DE NAVEGACIÓN AL HACER SCROLL
   ========================================================================== */

/**
 * Detecta qué sección está actualmente visible en el viewport y marca
 * el enlace de navegación correspondiente con la clase `.active`.
 *
 * @returns {void}
 */
function updateActiveNavOnScroll() {
  const sections  = document.querySelectorAll('section[id]');
  const navItems  = document.querySelectorAll('.nav__links a[href^="#"]');

  if (!sections.length || !navItems.length) return;

  const NAV_OFFSET = 100; // px — margen superior para activación

  window.addEventListener('scroll', () => {
    let currentId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - NAV_OFFSET;
      if (window.scrollY >= sectionTop) {
        currentId = section.id;
      }
    });

    navItems.forEach((link) => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${currentId}`,
      );
    });
  }, { passive: true });
}

/* ==========================================================================
   MÓDULO: FORMULARIO DE CONTACTO
   ========================================================================== */

/**
 * Maneja el envío del formulario de contacto con validación básica
 * en el cliente. Muestra retroalimentación visual al usuario sin
 * necesidad de recargar la página.
 *
 * @returns {void}
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const submitBtn = form.querySelector('[type="submit"]');
    const name      = form.querySelector('#name')?.value.trim();
    const email     = form.querySelector('#email')?.value.trim();
    const message   = form.querySelector('#message')?.value.trim();

    // Validación sencilla en cliente
    if (!name || !email || !message) {
      showFormFeedback(form, 'Por favor completa todos los campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormFeedback(form, 'Ingresa un correo electrónico válido.', 'error');
      return;
    }

    // Simulación de envío — reemplazar con fetch() a un endpoint real
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Enviando…';

    setTimeout(() => {
      showFormFeedback(form, '¡Mensaje enviado! Me pondré en contacto pronto.', 'success');
      form.reset();
      submitBtn.disabled    = false;
      submitBtn.textContent = 'Enviar mensaje';
    }, 1500);
  });
}

/**
 * Muestra un mensaje de retroalimentación dentro del formulario.
 *
 * @param {HTMLFormElement} form    - Elemento del formulario.
 * @param {string}          message - Texto a mostrar al usuario.
 * @param {'success'|'error'} type  - Tipo de mensaje para aplicar estilos.
 * @returns {void}
 */
function showFormFeedback(form, message, type) {
  // Elimina cualquier feedback previo
  const existing = form.querySelector('.form-feedback');
  if (existing) existing.remove();

  const feedback = document.createElement('p');
  feedback.className    = `form-feedback form-feedback--${type}`;
  feedback.textContent  = message;
  feedback.style.cssText = `
    margin-top: .5rem;
    padding: .65rem 1rem;
    border-radius: 6px;
    font-size: .875rem;
    font-weight: 500;
    background: ${type === 'success' ? 'rgba(99,179,237,.12)' : 'rgba(248,113,113,.12)'};
    color: ${type === 'success' ? '#63b3ed' : '#f87171'};
    border: 1px solid ${type === 'success' ? 'rgba(99,179,237,.3)' : 'rgba(248,113,113,.3)'};
  `;

  form.appendChild(feedback);

  // Auto-eliminar tras 5 segundos
  setTimeout(() => feedback.remove(), 5000);
}

/**
 * Valida el formato de una dirección de correo electrónico.
 *
 * @param {string} email - Cadena a validar.
 * @returns {boolean} `true` si el formato es válido.
 */
function isValidEmail(email) {
  // Patrón RFC 5322 simplificado — suficiente para validación en cliente
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
