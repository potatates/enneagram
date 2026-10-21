// Beings of Light: the book's preface. Turn the light off and the page goes
// dark; a circle of light follows your pointer or finger and you read by it.
(function () {
  const E = window.ENNEAGRAM;
  const I = E.INTRO;
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  const FLAME = `<svg viewBox="0 0 24 36" aria-hidden="true">
    <path d="M12 1C8 8 3 14 3 23a9 9 0 0 0 18 0c0-9-5-15-9-22Z"/>
    <path class="core" d="M12 15c-2 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2-6-4-10Z"/></svg>`;

  function text() {
    return I.paragraphs.map((p, i) => i === 0
      ? `<p><strong>${esc(p.slice(0, 17))}</strong>${esc(p.slice(17))}</p>`
      : `<p>${esc(p)}</p>`).join('');
  }

  E.pages = E.pages || {};
  E.pages.light = {
    title: 'Beings of Light · The Wisdom of the Enneagram',
    render() {
      const page = document.createElement('section');
      page.className = 'page light';
      page.innerHTML = `
        <h1 class="display light-title">${esc(I.title)}</h1>
        <div class="light-read">
          <div class="light-text">${text()}</div>
          <div class="light-reveal" aria-hidden="true">${text()}</div>
        </div>
        <button class="lamp" type="button" aria-pressed="false">
          ${FLAME}<span class="lamp-label">Turn off the light</span>
        </button>
        <p class="light-hint" aria-live="polite"></p>
        <p class="light-source">From the preface of <em>The Wisdom of the Enneagram</em> by Don Richard Riso and Russ Hudson.</p>`;

      const read = page.querySelector('.light-read');
      const lamp = page.querySelector('.lamp');
      const label = page.querySelector('.lamp-label');
      const hint = page.querySelector('.light-hint');
      const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

      let target = null;        // where the pointer is, in .light-read coordinates
      let pos = null;           // where the light is (it eases toward the target)
      let raf = 0;
      let idle = 0;             // drift start time, until the reader moves

      function place(x, y) {
        read.style.setProperty('--x', x.toFixed(1) + 'px');
        read.style.setProperty('--y', y.toFixed(1) + 'px');
      }

      function tick(t) {
        raf = requestAnimationFrame(tick);
        if (!document.body.contains(page)) { cancelAnimationFrame(raf); off(); return; }
        if (!target) {
          // Before the reader moves: drift slowly over the first lines to show what happens.
          if (!idle) idle = t;
          const w = read.clientWidth;
          const s = (t - idle) / 1000;
          target = null;
          pos = { x: w * (0.5 + 0.32 * Math.sin(s * 0.6)), y: 70 + 36 * Math.sin(s * 0.9) };
          place(pos.x, pos.y);
          return;
        }
        if (!pos || reduced) pos = { ...target };
        pos.x += (target.x - pos.x) * 0.18;
        pos.y += (target.y - pos.y) * 0.18;
        place(pos.x, pos.y);
      }

      function move(e) {
        const r = read.getBoundingClientRect();
        target = { x: e.clientX - r.left, y: e.clientY - r.top };
        if (hint.textContent) hint.textContent = '';
      }

      function onTouch(e) { if (e.touches[0]) move(e.touches[0]); }

      function on() {
        document.body.classList.add('lights-off');
        lamp.setAttribute('aria-pressed', 'true');
        label.textContent = 'Turn the light on';
        hint.textContent = matchMedia('(hover: none)').matches ? 'Drag your finger to read by your own light.' : 'Move your cursor to read by your own light.';
        target = null; pos = null; idle = 0;
        window.addEventListener('pointermove', move);
        window.addEventListener('touchmove', onTouch, { passive: true });
        raf = requestAnimationFrame(tick);
      }

      function off() {
        document.body.classList.remove('lights-off');
        lamp.setAttribute('aria-pressed', 'false');
        label.textContent = 'Turn off the light';
        hint.textContent = '';
        window.removeEventListener('pointermove', move);
        window.removeEventListener('touchmove', onTouch);
        cancelAnimationFrame(raf);
      }

      lamp.addEventListener('click', () => (document.body.classList.contains('lights-off') ? off() : on()));
      // Leaving the page always turns the lights back on.
      window.addEventListener('hashchange', off, { once: true });
      return page;
    },
  };
})();
