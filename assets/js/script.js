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
 * Endpoint de Formspree para el formulario de contacto.
 * Pasos para activarlo:
 *   1. Ir a https://formspree.io y crear una cuenta gratuita con tu Gmail.
 *   2. Crear un nuevo formulario → copiar el ID (ej. "xyzabcde").
 *   3. Reemplazar "TU_ID_AQUI" por ese ID.
 * El tier gratuito permite 50 envíos/mes y reenvía directo a tu Gmail.
 *
 * @type {string}
 */
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mqennpve';

/**
 * Textos que se ciclan en el efecto de tipeo del hero.
 * @type {string[]}
 */
const TYPED_STRINGS = [
  'Desarrollador Full Stack',
  'Flutter & React Native',
  'Ingeniero en Informática',
  'Docente IT & Mentor',
  'Cloud & DevOps Enthusiast',
];

/* ==========================================================================
   INTERNACIONALIZACIÓN — Diccionario ES / EN
   ========================================================================== */

const TRANSLATIONS = {
  es: {
    'nav.about':        'Sobre mí',
    'nav.experience':   'Experiencia',
    'nav.skills':       'Habilidades',
    'nav.education':    'Educación',
    'nav.contact':      'Contacto',
    'nav.open':         'Abrir menú de navegación',
    'nav.close':        'Cerrar menú de navegación',
    'hero.greeting':    'Hola, soy',
    'hero.description': 'Ingeniero en Informática con <strong>+5 años</strong> de experiencia como desarrollador Full Stack: web con React, mobile con Flutter y React Native, APIs REST, IoT y arquitecturas cloud escalables, formando a la próxima generación de desarrolladores.',
    'hero.btn.contact':    'Contáctame',
    'hero.btn.experience': 'Ver experiencia',
    'about.label': 'Quién soy',
    'about.title': 'Perfil <span>Profesional</span>',
    'about.p1':    'Soy <strong>Ingeniero en Informática</strong> egresado con distinción de la Universidad Santo Tomás. Me desempeñé como <strong>Desarrollador Full Stack en Correos Chile</strong> hasta el 31 de agosto de 2026, liderando el ciclo de vida de aplicaciones móviles críticas.',
    'about.p2':    'Mi especialidad es el desarrollo mobile con <strong>Flutter (Dart)</strong> y <strong>React Native (TypeScript)</strong>, respaldado por una sólida base en arquitecturas cloud sobre <strong>HuaweiCloud y AWS</strong>, integración de pipelines CI/CD con Jenkins y contenedores Docker.',
    'about.p3':    'Actualmente soy <strong>Docente de Santo Tomás</strong>, donde imparto <strong>IoT</strong>, <strong>Programación Web (React, HTML5)</strong> y <strong>Estructura de Datos y Algoritmos (Python)</strong>, lo que me mantiene en permanente actualización y me da habilidades únicas de comunicación técnica.',
    'stat.years':     'Años de experiencia',
    'stat.apps':      'Apps mobile publicadas',
    'stat.companies': 'Empresas impactadas',
    'stat.students':  'Estudiantes formados',
    'exp.label':        'Trayectoria',
    'exp.title':        'Experiencia <span>Laboral</span>',
    'exp.correos.role': 'Desarrollador Full Stack & Mobile',
    'exp.correos.date': 'Feb 2023 – Ago 2026',
    'exp.correos.desc': 'Responsable del ciclo de vida completo de aplicaciones móviles corporativas: análisis, desarrollo, testing y despliegue. Optimización de infraestructura cloud, implementación de pipelines CI/CD y coordinación de equipos multidisciplinarios para entregas ágiles.',
    'exp.sst.role': 'Docente de Especialidad TI',
    'exp.sst.date': '2024 – Actualidad',
    'exp.sst.desc': 'Actualmente docente en Santo Tomás: IoT, Programación Web (React, HTML5) y Estructura de Datos y Algoritmos (Python). Diseño de material didáctico, evaluaciones por competencias y mentoría personalizada a estudiantes.',
    'exp.llego.date': 'Mayo 2022 – Ene 2023',
    'exp.llego.desc': 'Diseño e implementación de microservicios y APIs REST en Python con arquitectura Serverless. Gestión y optimización de servicios en HuaweiCloud (OBS, FunctionGraph, DMS). Integración con sistemas de terceros y documentación técnica con OpenAPI.',
    'skills.title':   'Habilidades <span>Técnicas</span>',
    'skills.mobile':  'Desarrollo Mobile',
    'skills.backend': 'Backend & Otros',
    'level.expert':       'Experto',
    'level.advanced':     'Avanzado',
    'level.intermediate': 'Intermedio',
    'level.basic':        'Básico',
    'edu.label':               'Formación',
    'edu.title':               'Educación &amp; <span>Certificaciones</span>',
    'edu.badge.distinction':   'Egresado con Distinción',
    'edu.badge.certification': 'Certificación oficial',
    'edu.badge.hours':         '+28 horas',
    'edu.badge.teaching':      'Docencia Superior',
    'cert.label':              'Aprendizaje continuo',
    'cert.title':              'Certificados &amp; <span>IA</span>',
    'cert.intro':              'No paro de aprender: combino mi formación de educación superior con capacitación actualizada en Inteligencia Artificial aplicada al desarrollo de software.',
    'cert.higher.title':       'Certificados de Educación Superior',
    'cert.higher.desc':        'Formación académica y certificaciones de educación superior, desde mi título de Ingeniería en Informática hasta la formación pedagógica para ejercer docencia.',
    'cert.vibe.title':         'Vibe Engineer',
    'cert.vibe.desc':          'Desarrollo de software asistido por IA: diseñar, dirigir y revisar código generado con agentes de IA, con criterio de ingeniería.',
    'cert.prompt.title':       'Generación de Prompts',
    'cert.prompt.desc':        'Técnicas de ingeniería de prompts para obtener resultados precisos, reproducibles y útiles de los modelos de lenguaje.',
    'cert.extra.title':        'Mi sello personal',
    'cert.extra.desc':         'Llevo la IA a la sala de clases y a proyectos reales: enseño a usarla como copiloto y no como muleta, siempre validando, probando y entendiendo lo que se construye.',
    'contact.label':          '¿Hablamos?',
    'contact.title':          'Ponte en <span>Contacto</span>',
    'contact.intro':          'Estoy abierto a nuevas oportunidades, proyectos freelance o colaboraciones académicas. No dudes en escribirme.',
    'contact.phone.label':    'Teléfono',
    'contact.location.label': 'Ubicación',
    'form.name.label':          'Nombre',
    'form.name.placeholder':    'Tu nombre completo',
    'form.email.label':         'Correo electrónico',
    'form.message.label':       'Mensaje',
    'form.message.placeholder': '¿En qué puedo ayudarte?',
    'form.submit':         'Enviar mensaje',
    'form.sending':        'Enviando…',
    'form.error.fields':   'Por favor completa todos los campos.',
    'form.error.email':    'Ingresa un correo electrónico válido.',
    'form.success':        '¡Mensaje enviado! Te responderé a la brevedad.',
    'form.error.send':     'Error al enviar. Intenta de nuevo.',
    'form.error.offline':  'Sin conexión. Escríbeme directamente a bruno.otarola.g@gmail.com',
    'footer.tagline':      'Diseñado y desarrollado con pasión · El Quisco, Chile',
    'lang.switch.label':   'Switch language to English',
    'typed.strings': [
      'Desarrollador Full Stack',
      'Flutter & React Native',
      'Ingeniero en Informática',
      'Docente IT & Mentor',
      'Cloud & DevOps Enthusiast',
    ],
  },
  en: {
    'nav.about':        'About',
    'nav.experience':   'Experience',
    'nav.skills':       'Skills',
    'nav.education':    'Education',
    'nav.contact':      'Contact',
    'nav.open':         'Open navigation menu',
    'nav.close':        'Close navigation menu',
    'hero.greeting':    "Hello, I'm",
    'hero.description': 'Computer Science Engineer with <strong>5+ years</strong> of experience as a Full Stack developer: web with React, mobile with Flutter and React Native, REST APIs, IoT, and scalable cloud architectures, training the next generation of developers.',
    'hero.btn.contact':    'Contact me',
    'hero.btn.experience': 'View experience',
    'about.label': 'Who I am',
    'about.title': 'Professional <span>Profile</span>',
    'about.p1':    'I am a <strong>Computer Science Engineer</strong> graduated with distinction from Universidad Santo Tomás. I worked as <strong>Full Stack Developer at Correos Chile</strong> until August 31, 2026, leading the complete lifecycle of critical mobile applications.',
    'about.p2':    'My specialty is mobile development with <strong>Flutter (Dart)</strong> and <strong>React Native (TypeScript)</strong>, backed by a solid foundation in cloud architectures on <strong>HuaweiCloud and AWS</strong>, CI/CD pipelines with Jenkins, and Docker containers.',
    'about.p3':    'I am currently a <strong>Professor at Santo Tomás</strong>, where I teach <strong>IoT</strong>, <strong>Web Programming (React, HTML5)</strong>, and <strong>Data Structures & Algorithms (Python)</strong> — keeping me in continuous technical evolution and giving me unique communication skills.',
    'stat.years':     'Years of experience',
    'stat.apps':      'Published mobile apps',
    'stat.companies': 'Companies impacted',
    'stat.students':  'Students trained',
    'exp.label':        'Career',
    'exp.title':        'Work <span>Experience</span>',
    'exp.correos.role': 'Full Stack & Mobile Developer',
    'exp.correos.date': 'Feb 2023 – Aug 2026',
    'exp.correos.desc': 'Responsible for the complete lifecycle of corporate mobile applications: analysis, development, testing, and deployment. Cloud infrastructure optimization, CI/CD pipeline implementation, and cross-functional team coordination for agile deliveries.',
    'exp.sst.role': 'IT Specialty Instructor',
    'exp.sst.date': '2024 – Present',
    'exp.sst.desc': 'Currently teaching at Santo Tomás: IoT, Web Programming (React, HTML5), and Data Structures & Algorithms (Python). Curriculum design, competency-based assessments, and personalized student mentorship.',
    'exp.llego.date': 'May 2022 – Jan 2023',
    'exp.llego.desc': 'Design and implementation of microservices and REST APIs in Python with Serverless architecture. Management and optimization of HuaweiCloud services (OBS, FunctionGraph, DMS). Third-party system integration and technical documentation with OpenAPI.',
    'skills.title':   'Technical <span>Skills</span>',
    'skills.mobile':  'Mobile Development',
    'skills.backend': 'Backend & Other',
    'level.expert':       'Expert',
    'level.advanced':     'Advanced',
    'level.intermediate': 'Intermediate',
    'level.basic':        'Basic',
    'edu.label':               'Training',
    'edu.title':               'Education &amp; <span>Certifications</span>',
    'edu.badge.distinction':   'Graduated with Distinction',
    'edu.badge.certification': 'Official Certification',
    'edu.badge.hours':         '+28 hours',
    'edu.badge.teaching':      'Higher Education Teaching',
    'cert.label':              'Continuous learning',
    'cert.title':              'Certificates &amp; <span>AI</span>',
    'cert.intro':              'I never stop learning: I combine my higher education background with up-to-date training in Artificial Intelligence applied to software development.',
    'cert.higher.title':       'Higher Education Certificates',
    'cert.higher.desc':        'Academic training and certifications in higher education, from my Computer Science Engineering degree to pedagogical training for teaching.',
    'cert.vibe.title':         'Vibe Engineer',
    'cert.vibe.desc':          'AI-assisted software development: designing, directing, and reviewing code generated with AI agents, with engineering judgment.',
    'cert.prompt.title':       'Prompt Generation',
    'cert.prompt.desc':        'Prompt engineering techniques to get precise, reproducible, and useful results from language models.',
    'cert.extra.title':        'My own touch',
    'cert.extra.desc':         'I take AI to the classroom and to real projects: I teach students to use it as a copilot, not as a crutch, always validating, testing, and understanding what is built.',
    "contact.label":          "Let's talk?",
    'contact.title':          'Get in <span>Touch</span>',
    'contact.intro':          'I am open to new opportunities, freelance projects, or academic collaborations. Feel free to reach out.',
    'contact.phone.label':    'Phone',
    'contact.location.label': 'Location',
    'form.name.label':          'Name',
    'form.name.placeholder':    'Your full name',
    'form.email.label':         'Email address',
    'form.message.label':       'Message',
    'form.message.placeholder': 'How can I help you?',
    'form.submit':         'Send message',
    'form.sending':        'Sending…',
    'form.error.fields':   'Please fill in all fields.',
    'form.error.email':    'Please enter a valid email address.',
    'form.success':        'Message sent! I will get back to you shortly.',
    'form.error.send':     'Failed to send. Please try again.',
    'form.error.offline':  'No connection. Write to me directly at bruno.otarola.g@gmail.com',
    'footer.tagline':      'Designed and developed with passion · El Quisco, Chile',
    'lang.switch.label':   'Cambiar idioma a Español',
    'typed.strings': [
      'Full Stack Developer',
      'Flutter & React Native',
      'Computer Science Engineer',
      'IT Instructor & Mentor',
      'Cloud & DevOps Enthusiast',
    ],
  },
};

/** @type {'es'|'en'} */
let currentLang = 'es';

/** @type {{cancelled: boolean}|null} */
let _typingToken = null;

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
  initLanguageSwitcher();
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

      // Accesibilidad: aria-expanded y aria-label dinámicos
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.setAttribute(
        'aria-label',
        isOpen ? t('nav.close') : t('nav.open'),
      );
    });

    // Cierra el menú al hacer clic en cualquier enlace interno
    navLinkItems.forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', t('nav.open'));
      });
    });

    // Cierra el menú al hacer clic fuera de él
    document.addEventListener('click', (event) => {
      const nav = document.querySelector('.nav');
      if (nav && !nav.contains(event.target) && navLinks.classList.contains('open')) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.setAttribute('aria-label', t('nav.open'));
      }
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
  // Cancel any currently running typing loop
  if (_typingToken) _typingToken.cancelled = true;
  _typingToken = { cancelled: false };
  const token = _typingToken;

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
    if (token.cancelled) return;
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
      showFormFeedback(form, t('form.error.fields'), 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormFeedback(form, t('form.error.email'), 'error');
      return;
    }

    // ── Envío real vía Formspree (reenvía a tu Gmail) ──────────────────────
    const submitText = submitBtn.querySelector('[data-i18n="form.submit"]') || submitBtn;
    submitBtn.disabled     = true;
    submitText.textContent = t('form.sending');

    fetch(FORMSPREE_ENDPOINT, {
      method:  'POST',
      headers: { 'Accept': 'application/json' },
      body:    new FormData(form),
    })
      .then((response) => {
        if (response.ok) {
          showFormFeedback(form, t('form.success'), 'success');
          form.reset();
        } else {
          return response.json().then((data) => {
            const msg = data?.errors?.map((e) => e.message).join(', ')
              || t('form.error.send');
            showFormFeedback(form, msg, 'error');
          });
        }
      })
      .catch(() => {
        showFormFeedback(form, t('form.error.offline'), 'error');
      })
      .finally(() => {
        submitBtn.disabled     = false;
        submitText.textContent = t('form.submit');
      });
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

/* ==========================================================================
   MÓDULO: INTERNACIONALIZACIÓN
   ========================================================================== */

/**
 * Devuelve el texto traducido para la clave indicada en el idioma activo.
 *
 * @param {string} key - Clave del diccionario TRANSLATIONS.
 * @returns {string}
 */
function t(key) {
  return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || key;
}

/**
 * Aplica las traducciones del idioma indicado a todos los elementos
 * del DOM marcados con data-i18n, data-i18n-html o data-i18n-placeholder.
 *
 * @param {'es'|'en'} lang - Código del idioma destino.
 * @returns {void}
 */
function applyTranslations(lang) {
  const dict = TRANSLATIONS[lang];
  if (!dict) return;

  // Texto plano
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = dict[el.dataset.i18n];
    if (val !== undefined) el.textContent = val;
  });

  // HTML (elementos con etiquetas internas como <strong> o <span>)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const val = dict[el.dataset.i18nHtml];
    if (val !== undefined) el.innerHTML = val;
  });

  // Atributos placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const val = dict[el.dataset.i18nPlaceholder];
    if (val !== undefined) el.placeholder = val;
  });

  // Actualiza el array TYPED_STRINGS y reinicia el efecto de tipeo
  if (Array.isArray(dict['typed.strings'])) {
    TYPED_STRINGS.length = 0;
    dict['typed.strings'].forEach((s) => TYPED_STRINGS.push(s));
    initTypingEffect();
  }

  // Restaura el año dinámico en el footer tras posible innerHTML replacement
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * Inicializa el botón de cambio de idioma (ES ↔ EN).
 * Persiste la preferencia en localStorage.
 *
 * @returns {void}
 */
function initLanguageSwitcher() {
  const btn = document.getElementById('lang-switch');
  if (!btn) return;

  // Restaurar preferencia guardada
  const saved = localStorage.getItem('lang');
  if (saved && saved !== currentLang) {
    currentLang = saved;
    applyTranslations(currentLang);
    document.documentElement.lang = currentLang;
    btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    btn.setAttribute('aria-label', t('lang.switch.label'));
  }

  btn.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    applyTranslations(currentLang);
    document.documentElement.lang = currentLang;
    btn.textContent = currentLang === 'es' ? 'EN' : 'ES';
    btn.setAttribute('aria-label', t('lang.switch.label'));
    localStorage.setItem('lang', currentLang);
  });
}
