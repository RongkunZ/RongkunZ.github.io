document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('motion-ready');

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const progress = document.querySelector('.reading-progress span');
const backToTop = document.querySelector('.back-to-top');
const portraitImage = document.querySelector('.home-hero__portrait img');
const updateScrollUI = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  if (progress) progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 700);
  if (portraitImage && !reduceMotion) {
    const rect = portraitImage.parentElement.getBoundingClientRect();
    const offset = Math.max(-18, Math.min(18, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * .035));
    portraitImage.style.transform = `translate3d(0, ${offset}px, 0) scale(1.06)`;
  }
};
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();
backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

const currentPath = window.location.pathname.replace(/index\.html$/, '');
document.querySelectorAll('[data-nav-link]').forEach((link) => {
  const path = new URL(link.href, window.location.origin).pathname;
  if (path === currentPath || (path !== '/' && currentPath.startsWith(path))) link.setAttribute('aria-current', 'page');
});

const revealItems = document.querySelectorAll('.reveal');
revealItems.forEach((item, index) => item.style.setProperty('--reveal-delay', `${(index % 4) * 55}ms`));
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
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
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
