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

  // The book's lines: under stress each type moves along the hexad and the
  // triangle (1-4-2-8-5-7-1, 9-6-3-9); in growth it moves the other way.
  const STRESS = { 1: 4, 4: 2, 2: 8, 8: 5, 5: 7, 7: 1, 9: 6, 6: 3, 3: 9 };
  const GROWTH = {};
  for (const k in STRESS) GROWTH[STRESS[k]] = Number(k);

  // Light through a prism: the one place the site uses color.
  const PRISM = ['#d4517a', '#e0892a', '#c9a417', '#5fa84a', '#2b9bb3', '#5a6fd6', '#9a5cc8'];
  let uid = 0;
  const still = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  // options.sheen: small prism glints that twinkle now and then on the circle.
  // options.paths: a type number whose growth and stress lines are drawn as arrows.
  function create(options = {}) {
    const id = 'prism-' + (++uid);
    // With links inside, it's a group of links; without, a single image.
    const label = options.label || 'The enneagram symbol, with the nine types around a circle';
    const svg = el('svg', { viewBox: '-66 -66 132 132', class: 'enneagram' + (options.draw ? ' draw' : ''),
      role: options.link ? 'group' : 'img', 'aria-label': label });

    const defs = el('defs', {}, svg);
    const grad = el('linearGradient', { id, gradientUnits: 'userSpaceOnUse', x1: -55, y1: -55, x2: 55, y2: 55 }, defs);
    PRISM.forEach((c, i) => el('stop', { offset: (i / (PRISM.length - 1)).toFixed(3), 'stop-color': c }, grad));
    if (!still()) el('animateTransform', { attributeName: 'gradientTransform', type: 'rotate', from: '0', to: '360', dur: '24s', repeatCount: 'indefinite' }, grad);
    const arrow = (name, cls) => {
      const m = el('marker', { id: id + '-' + name, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: 'auto-start-reverse' }, defs);
      el('path', { d: 'M0 1 L9 5 L0 9 Z', class: 'arrowhead ' + cls }, m);
    };

    const ring = el('circle', { class: 'ring', cx: 0, cy: 0, r: R }, svg);
    const triangle = el('path', { class: 'figure', d: path([9, 3, 6]) }, svg);
    const hexad = el('path', { class: 'figure', d: path([1, 4, 2, 8, 5, 7]) }, svg);

    if (options.sheen) {
      // Now and then a small star of prism light glints where the lines meet the circle, one at a time.
      [9, 4, 2, 7, 5, 1].forEach((n, i) => {
        const [x, y] = point(n, R), k = 5;
        const d = `M${x} ${y - k} Q${x} ${y} ${x + k} ${y} Q${x} ${y} ${x} ${y + k} Q${x} ${y} ${x - k} ${y} Q${x} ${y} ${x} ${y - k} Z`;
        el('path', { class: 'glint-star', d, fill: `url(#${id})`, style: `--delay:${(i * 1.6).toFixed(1)}s` }, svg);
      });
    }

    if (options.paths) {
      const n = options.paths;
      arrow('g', 'growth'); arrow('s', 'stress');
      // Stop short of the far point so the arrowhead doesn't cover its number.
      const line = (to, cls, m) => {
        const [x1, y1] = point(n, R), [x2, y2] = point(to, R);
        const len = Math.hypot(x2 - x1, y2 - y1), k = (len - 5) / len, j = 4 / len;
        el('line', { class: 'path-line ' + cls, x1: (x1 + (x2 - x1) * j).toFixed(2), y1: (y1 + (y2 - y1) * j).toFixed(2),
          x2: (x1 + (x2 - x1) * k).toFixed(2), y2: (y1 + (y2 - y1) * k).toFixed(2),
          stroke: cls === 'growth' ? `url(#${id})` : '', 'marker-end': `url(#${id}-${m})` }, svg);
      };
      line(STRESS[n], 'stress', 's');
      line(GROWTH[n], 'growth', 'g');
    }

    for (let n = 1; n <= 9; n++) {
      const [x, y] = point(n, LABEL_R);
      const [px, py] = point(n, R);
      const on = options.highlight === n;
      const end = options.paths && (STRESS[options.paths] === n || GROWTH[options.paths] === n);
      const parent = options.link
        ? el('a', { href: options.link(n), 'aria-label': 'Type ' + n, 'data-type': n, class: 'pt' + (on ? ' on' : '') + (end ? ' end' : '') }, svg)
        : el('g', { 'data-type': n, class: 'pt' + (on ? ' on' : '') + (end ? ' end' : '') }, svg);
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

  E.enneagram = { create, point, STRESS, GROWTH, PRISM };
})();
