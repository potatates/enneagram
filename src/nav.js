// Top nav state and the phone menu.
(function () {
  const E = window.ENNEAGRAM;
  const T = E.TYPES;

  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('.menu-button');
  const closeBtn = menu.querySelector('.menu-close');
  const expand = menu.querySelector('.menu-expand');
  const typesList = document.getElementById('menu-types');

  // Gut / Heart / Head with their types, as in the Figma phone menu.
  typesList.innerHTML = Object.values(T.triads).map((triad) =>
    `<a class="triad" href="#understand">${triad.label}</a>` +
    triad.types.map((n) => `<a class="type" href="#type-${n}" data-route="type-${n}">Type ${n}</a>`).join('')
  ).join('');

  function open() {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add('open'));
    openBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
  }

  function close() {
    if (menu.hidden) return;
    menu.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
    const done = () => { menu.hidden = true; };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) done();
    else menu.addEventListener('transitionend', done, { once: true });
  }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', () => { close(); openBtn.focus(); });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !menu.hidden) { close(); openBtn.focus(); } });
  document.addEventListener('click', (e) => {
    if (!menu.hidden && !menu.contains(e.target) && !openBtn.contains(e.target)) close();
  });

  expand.addEventListener('click', () => {
    const on = expand.getAttribute('aria-expanded') !== 'true';
    expand.setAttribute('aria-expanded', String(on));
    typesList.hidden = !on;
  });

  // Mark the current page in both navs. Type pages count as Understand Your Type.
  function setCurrent(route) {
    const section = route.startsWith('type-') ? 'understand' : route;
    document.querySelectorAll('[data-route]').forEach((a) => {
      const match = a.dataset.route === route || (a.closest('.top-nav') && a.dataset.route === section);
      if (match) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    if (route.startsWith('type-')) { expand.setAttribute('aria-expanded', 'true'); typesList.hidden = false; }
  }

  E.nav = { setCurrent, close };
})();
