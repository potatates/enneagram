// Hash routing: #home, #light, #test, #understand, #type-1 ... #type-9.
(function () {
  const E = window.ENNEAGRAM;
  const view = document.getElementById('view');

  function parse(hash) {
    const h = (hash || '').replace(/^#/, '') || 'home';
    const m = h.match(/^type-([1-9])$/);
    if (m) return { route: h, page: 'type', param: Number(m[1]) };
    const t = h.match(/^test(?:\/([a-z0-9-]+))?$/);
    if (t) return { route: 'test', page: 'test', param: t[1] || null };
    if (E.pages[h] && h !== 'type') return { route: h, page: h, param: null };
    return { route: 'home', page: 'home', param: null };
  }

  function show() {
    const { route, page, param } = parse(location.hash);
    const def = E.pages[page];
    view.replaceChildren(def.render(param));
    document.body.dataset.route = route;
    document.title = typeof def.title === 'function' ? def.title(param) : def.title;
    E.nav.setCurrent(route);
    window.scrollTo(0, 0);
    // Move focus for screen readers, but not on the first load.
    if (show.ran) view.focus({ preventScroll: true });
    show.ran = true;
  }

  window.addEventListener('hashchange', show);
  show();
})();
