const state = {
  lang: localStorage.getItem('preferredLang') || (navigator.language?.startsWith('tr') ? 'tr' : 'en'),
  theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'),
  translations: null
};

const elements = {
  langToggle: document.getElementById('lang-toggle'),
  themeButton: document.getElementById('theme-toggle'),
  navLinks: document.getElementById('nav-links'),
  menuToggle: document.getElementById('menu-toggle'),
  year: document.getElementById('year'),
  aboutLocation: document.getElementById('about-location'),
  aboutEmail: document.getElementById('about-email'),
  aboutDetailLocation: document.getElementById('about-detail-location'),
  aboutDetailEmail: document.getElementById('about-detail-email'),
  contactLocation: document.getElementById('contact-location'),
  contactEmail: document.getElementById('contact-email'),
  skillsList: document.getElementById('skills-list'),
  experienceList: document.getElementById('experience-list'),
  projectsList: document.getElementById('projects-list'),
  educationList: document.getElementById('education-list'),
  certificateList: document.getElementById('certificate-list')
};

const getValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}[char]));

async function loadTranslations() {
  if (state.translations) return state.translations;
  const response = await fetch('data/i18n.json');
  state.translations = await response.json();
  return state.translations;
}

function setTheme(theme) {
  state.theme = theme;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
}

function updateThemeButton(theme) {
  elements.themeButton.setAttribute('aria-label', theme === 'dark' ? 'Açık temaya geç' : 'Koyu temaya geç');
}

function toggleTheme() {
  const next = state.theme === 'dark' ? 'light' : 'dark';
  setTheme(next);
  updateThemeButton(next);
}

function setReducedMotion() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.body.dataset.reducedMotion = prefersReduced;
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem('preferredLang', lang);
  document.documentElement.lang = lang;
  elements.langToggle.textContent = lang.toUpperCase();
  elements.langToggle.setAttribute('aria-label', lang === 'tr' ? 'İngilizceye geç' : 'Türkçeye geç');
}

function toggleLanguage() {
  setLanguage(state.lang === 'tr' ? 'en' : 'tr');
  render();
}

function updateMeta(meta) {
  document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');

  if (description) description.setAttribute('content', meta.description);
  if (ogTitle) ogTitle.setAttribute('content', meta.ogTitle);
  if (ogDescription) ogDescription.setAttribute('content', meta.ogDescription);
}

function applyTextContent(translations) {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = getValue(translations, key);
    if (typeof value === 'string') {
      el.textContent = value;
    }
  });
}

function renderSkills(skills) {
  elements.skillsList.innerHTML = '';
  skills.categories.forEach((category) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="section-header">
        <h3 class="section-title">${escapeHtml(category.name)}</h3>
      </div>
      <div class="tag-row">
        ${category.items.map((item) => `<span class="skill-badge">${escapeHtml(item)}</span>`).join('')}
      </div>
    `;
    elements.skillsList.appendChild(card);
  });
}

function renderExperience(experience) {
  elements.experienceList.innerHTML = '';
  experience.entries.forEach((entry) => {
    const item = document.createElement('div');
    item.className = 'card timeline-item';
    item.innerHTML = `
      <div class="timeline-head">
        <div>
          <h3 class="section-title">${escapeHtml(entry.role)}</h3>
          <p class="muted">${escapeHtml(entry.company)} · ${escapeHtml(entry.location)}</p>
        </div>
        <span class="badge">${escapeHtml(entry.period)}</span>
      </div>
      <ul class="list">
        ${entry.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join('')}
      </ul>
    `;
    elements.experienceList.appendChild(item);
  });
}

function renderProjects(projects) {
  elements.projectsList.innerHTML = '';
  projects.items.forEach((project) => {
    const card = document.createElement('div');
    card.className = 'card project-card';
    const repoLink = project.links?.repo
      ? `<a class="link-btn" href="${escapeHtml(project.links.repo)}" target="_blank" rel="noreferrer">Repo</a>`
      : '';
    const demoLink = project.links?.demo
      ? `<a class="link-btn" href="${escapeHtml(project.links.demo)}" target="_blank" rel="noreferrer">Demo</a>`
      : '';
    card.innerHTML = `
      <div class="section-header">
        <h3 class="section-title">${escapeHtml(project.name)}</h3>
        ${project.tech?.length ? `<span class="badge">${escapeHtml(project.tech[0])}</span>` : ''}
      </div>
      <p class="muted">${escapeHtml(project.description)}</p>
      <div class="tag-row">${project.tech.map((t) => `<span class="skill-badge">${escapeHtml(t)}</span>`).join('')}</div>
      <div class="project-actions">${repoLink}${demoLink}</div>
    `;
    elements.projectsList.appendChild(card);
  });
}

function renderEducation(education) {
  elements.educationList.innerHTML = '';
  education.entries.forEach((entry) => {
    const item = document.createElement('div');
    item.className = 'card timeline-item';
    item.innerHTML = `
      <div class="timeline-head">
        <div>
          <h3 class="section-title">${escapeHtml(entry.institution)}</h3>
          <p class="muted">${escapeHtml(entry.degree)} · ${escapeHtml(entry.location)}</p>
        </div>
        <span class="badge">${escapeHtml(entry.period)}</span>
      </div>
      <p class="muted">${escapeHtml(entry.details)}</p>
    `;
    elements.educationList.appendChild(item);
  });
}

function renderCertificates(certificates) {
  elements.certificateList.innerHTML = '';
  certificates.items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    elements.certificateList.appendChild(li);
  });
}

function renderContact(contact, about) {
  elements.contactLocation.textContent = contact.location;
  elements.contactEmail.href = `mailto:${about.details.email}`;
}

function renderAboutDetails(details) {
  const { location, email } = details;
  [elements.aboutLocation, elements.aboutDetailLocation, elements.contactLocation].forEach((el) => {
    el.textContent = location;
  });
  [elements.aboutEmail, elements.aboutDetailEmail].forEach((el) => {
    el.textContent = email;
  });
  if (elements.contactEmail) {
    elements.contactEmail.href = `mailto:${email}`;
  }
}

function setActiveNav() {
  const links = Array.from(elements.navLinks.querySelectorAll('a'));
  const fromTop = window.scrollY + 120;
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute('href'));
    if (!section) return;
    const offsetTop = section.offsetTop;
    const offsetBottom = offsetTop + section.offsetHeight;
    const isActive = fromTop >= offsetTop && fromTop < offsetBottom;
    link.classList.toggle('active', isActive);
  });
}

async function render() {
  const translations = await loadTranslations();
  const langData = translations[state.lang] || translations.tr;

  setLanguage(state.lang);
  applyTextContent(langData);
  renderSkills(langData.skills);
  renderExperience(langData.experience);
  renderProjects(langData.projects);
  renderEducation(langData.education);
  renderCertificates(langData.certificates);
  renderAboutDetails(langData.about.details);
  renderContact(langData.contact, langData.about);
  updateMeta(langData.meta);
}

function bindEvents() {
  elements.langToggle.addEventListener('click', toggleLanguage);

  elements.themeButton.addEventListener('click', toggleTheme);

  elements.menuToggle.addEventListener('click', () => {
    const isOpen = elements.navLinks.classList.toggle('open');
    elements.menuToggle.setAttribute('aria-expanded', isOpen);
  });

  elements.navLinks.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' && elements.navLinks.classList.contains('open')) {
      elements.navLinks.classList.remove('open');
      elements.menuToggle.setAttribute('aria-expanded', false);
    }
  });

  window.addEventListener('scroll', () => {
    requestAnimationFrame(setActiveNav);
  });
}

(function init() {
  setTheme(state.theme);
  setReducedMotion();
  updateThemeButton(state.theme);
  elements.year.textContent = new Date().getFullYear();
  bindEvents();
  render();
})();
