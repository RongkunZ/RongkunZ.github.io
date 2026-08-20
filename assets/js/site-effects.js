document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('motion-ready');

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const themeButton = document.querySelector('#theme-toggle button');
const themeIcon = document.querySelector('#theme-icon');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const automaticTheme = () => {
  const hour = new Date().getHours();
  return hour >= 7 && hour < 19 ? 'light' : 'dark';
};
const applyTheme = (mode, persist = false) => {
  const safeMode = ['auto', 'light', 'dark'].includes(mode) ? mode : 'auto';
  const theme = safeMode === 'auto' ? automaticTheme() : safeMode;
  root.dataset.themeMode = safeMode;
  root.dataset.theme = theme;
  if (themeMeta) themeMeta.content = theme === 'dark' ? '#090a0c' : '#f4f1ea';
  if (themeButton) {
    const current = safeMode === 'auto' ? `automatic · ${theme}` : safeMode;
    themeButton.dataset.mode = safeMode;
    themeButton.title = `Theme: ${current}`;
    themeButton.setAttribute('aria-label', `Color theme: ${current}. Activate to change mode.`);
  }
  if (themeIcon) {
    themeIcon.className = safeMode === 'auto'
      ? 'fa-solid fa-circle-half-stroke'
      : theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }
  if (persist) {
    try {
      localStorage.setItem('themeMode', safeMode);
      localStorage.removeItem('theme');
    } catch (error) { /* Storage may be unavailable. */ }
  }
};

let themeMode = root.dataset.themeMode || 'auto';
applyTheme(themeMode);
themeButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  const modes = ['auto', 'light', 'dark'];
  themeMode = modes[(modes.indexOf(themeMode) + 1) % modes.length];
  applyTheme(themeMode, true);
});
window.setInterval(() => { if (themeMode === 'auto') applyTheme('auto'); }, 60000);

const progress = document.querySelector('.reading-progress span');
const backToTop = document.querySelector('.back-to-top');
const hero = document.querySelector('[data-cinema-hero]');
const researchStage = document.querySelector('[data-research-stage]');
let scrollFrame = 0;

const updateScrollUI = () => {
  scrollFrame = 0;
  const viewport = window.innerHeight;
  const max = document.documentElement.scrollHeight - viewport;
  const pageRatio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${clamp(pageRatio)})`;
  if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 700);

  if (hero && !reduceMotion) {
    const ratio = clamp(window.scrollY / Math.max(hero.offsetHeight, 1));
    hero.style.setProperty('--hero-y', `${ratio * -34}px`);
    hero.style.setProperty('--hero-image-y', `${ratio * 42}px`);
    hero.style.setProperty('--hero-scale', String(1.045 + ratio * .035));
  }

  if (researchStage) {
    const rect = researchStage.getBoundingClientRect();
    const entrance = clamp((viewport - rect.top) / (viewport * 1.06));
    const travel = clamp((viewport - rect.top) / Math.max(rect.height + viewport, 1));
    if (!reduceMotion) {
      researchStage.style.setProperty('--research-clip', `${(1 - entrance) * 10}%`);
      researchStage.style.setProperty('--research-image-y', `${(travel - .45) * 54}px`);
      researchStage.style.setProperty('--research-scale', String(1.045 - travel * .045));
    }
    document.body.classList.toggle('research-active', rect.top <= 66 && rect.bottom > 66);
  }
};

const requestScrollUpdate = () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollUI);
};
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate, { passive: true });
updateScrollUI();

if (hero && !reduceMotion && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - .5) * -12;
    hero.style.setProperty('--hero-x', `${x}px`);
  });
  hero.addEventListener('pointerleave', () => hero.style.setProperty('--hero-x', '0px'));
}

window.addEventListener('load', () => document.body.classList.add('hero-ready'), { once: true });
if (document.readyState === 'complete') requestAnimationFrame(() => document.body.classList.add('hero-ready'));

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

const currentPath = window.location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('[data-nav-link]').forEach((link) => {
  const path = new URL(link.href, window.location.origin).pathname;
  if (path === currentPath || (path !== '/' && currentPath.startsWith(path))) link.setAttribute('aria-current', 'page');
});

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item, index) => item.style.setProperty('--reveal-delay', `${(index % 3) * 45}ms`));
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -48px' });
  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll('[data-filter-group]').forEach((group) => {
  const type = group.dataset.filterGroup;
  const selector = type === 'gallery' ? '[data-region]' : '[data-kind]';
  const items = document.querySelectorAll(selector);
  group.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      group.querySelectorAll('[data-filter]').forEach((other) => {
        const active = other === button;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
      items.forEach((item) => {
        const value = type === 'gallery' ? item.dataset.region : item.dataset.kind;
        const show = filter === 'all' || value === filter;
        item.hidden = !show;
        if (show) requestAnimationFrame(() => item.classList.add('is-visible'));
      });
    });
  });
});

const dialog = document.querySelector('#gallery-dialog');
if (dialog) {
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('p');
  document.querySelectorAll('.gallery-button').forEach((button) => {
    button.addEventListener('click', () => {
      image.src = button.dataset.full;
      image.alt = button.querySelector('img')?.alt || '';
      caption.textContent = button.dataset.caption || '';
      dialog.showModal();
    });
  });
  dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
}
