// Draws the enneagram symbol as crisp SVG: a circle, the inner triangle
// (9-3-6) and the hexad (1-4-2-8-5-7-1), with the numbers around the edge.

(function () {
  const E = (window.ENNEAGRAM = window.ENNEAGRAM || {});
  const NS = 'http://www.w3.org/2000/svg';
  const R = 50;          // circle radius in viewBox units
  const LABEL_R = 58;    // where the numbers sit

  // Point for type n, with 9 at the top and the rest going clockwise.
  function point(n, r) {
    const a = (-90 + (n % 9) * 40) * Math.PI / 180;
    return [r * Math.cos(a), r * Math.sin(a)];
  }

  function path(order) {
    return order.map((n, i) => (i ? 'L' : 'M') + point(n, R).map((v) => v.toFixed(2)).join(' ')).join(' ') + ' Z';
  }

  function el(tag, attrs, parent) {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(node);
    return node;
  }

  // options.draw: animate the lines in.
  // options.link: function(n) returning a URL, which makes each number a link.
  // options.label: accessible name.
  // options.highlight: a type number to mark in gold.
  function create(options = {}) {
    // With links inside, it's a group of links; without, a single image.
    const label = options.label || 'The enneagram symbol, with the nine types around a circle';
    const svg = el('svg', { viewBox: '-66 -66 132 132', class: 'enneagram' + (options.draw ? ' draw' : ''),
      role: options.link ? 'group' : 'img', 'aria-label': label });

    const ring = el('circle', { class: 'ring', cx: 0, cy: 0, r: R }, svg);
    const triangle = el('path', { class: 'figure', d: path([9, 3, 6]) }, svg);
    const hexad = el('path', { class: 'figure', d: path([1, 4, 2, 8, 5, 7]) }, svg);

    for (let n = 1; n <= 9; n++) {
      const [x, y] = point(n, LABEL_R);
      const [px, py] = point(n, R);
      const on = options.highlight === n;
      const parent = options.link
        ? el('a', { href: options.link(n), 'aria-label': 'Type ' + n, 'data-type': n, class: 'pt' + (on ? ' on' : '') }, svg)
        : el('g', { 'data-type': n, class: 'pt' + (on ? ' on' : '') }, svg);
      el('circle', { class: 'dot', cx: px.toFixed(2), cy: py.toFixed(2), r: 2.6 }, parent);
      const t = el('text', { class: 'num', x: x.toFixed(2), y: y.toFixed(2), style: '--i:' + n }, parent);
      t.textContent = n;
    }

    // Path lengths for the draw-in animation.
    ring.style.setProperty('--len', (2 * Math.PI * R).toFixed(1));
    for (const p of [triangle, hexad]) {
      const pts = p.getAttribute('d').match(/-?\d+\.\d+ -?\d+\.\d+/g).map((s) => s.split(' ').map(Number));
      let len = 0;
      for (let i = 0; i < pts.length; i++) {
        const [a, b] = [pts[i], pts[(i + 1) % pts.length]];
        len += Math.hypot(b[0] - a[0], b[1] - a[1]);
      }
      p.style.setProperty('--len', len.toFixed(1));
    }
    return svg;
  }

  E.enneagram = { create, point };
})();
