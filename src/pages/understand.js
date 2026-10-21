// Understand Your Type: the symbol, and the nine types grouped by center.
(function () {
  const E = window.ENNEAGRAM;
  const T = E.TYPES;

  // Short notes on the three centers, after the book's Triads.
  const CENTERS = {
    gut: 'Instinct. Types 8, 9 and 1 deal with anger and the need for control and independence.',
    heart: 'Feeling. Types 2, 3 and 4 deal with shame and the need to be valued for who they are.',
    head: 'Thinking. Types 5, 6 and 7 deal with fear and the need for security and guidance.',
  };

  E.pages = E.pages || {};
  E.pages.understand = {
    title: 'Understand Your Type · The Wisdom of the Enneagram',
    render() {
      const result = E.state.lastResult();
      const mine = result && result.leading.score >= 46 ? result.leading.type : null;

      const page = document.createElement('section');
      page.className = 'page understand';
      page.innerHTML = `
        <h1 class="display understand-title">Understand Your Type</h1>
        <p class="understand-lede">Nine types sit around the circle. Pick one to read about it.</p>
        <div class="understand-symbol"></div>
        <div class="centers">
          ${Object.entries(T.triads).map(([key, triad]) => `
            <section class="center" data-center="${key}">
              <h2>${triad.label}</h2>
              <p class="center-note">${CENTERS[key]}</p>
              <ul>
                ${triad.types.map((n) => `<li><a href="#type-${n}" data-type="${n}">
                  <span class="n">Type ${n}</span><span class="nm">${T.types[n].name}</span>
                  ${n === mine ? '<span class="you">Your result</span>' : ''}</a></li>`).join('')}
              </ul>
            </section>`).join('')}
        </div>
        ${mine ? '' : '<p class="understand-cta">Not sure which is yours? <a href="#test">Take the test</a>.</p>'}`;

      const svg = E.enneagram.create({ link: (n) => '#type-' + n, highlight: mine });
      page.querySelector('.understand-symbol').replaceWith(svg);

      // Pointing at a type or a center lights its points on the symbol.
      const light = (types) => svg.querySelectorAll('.pt').forEach((p) => p.classList.toggle('lit', types.includes(Number(p.dataset.type))));
      page.querySelectorAll('.center').forEach((c) => {
        const types = T.triads[c.dataset.center].types;
        c.addEventListener('pointerenter', () => light(types));
        c.addEventListener('pointerleave', () => light([]));
      });
      page.querySelectorAll('.center a').forEach((a) => {
        const n = [Number(a.dataset.type)];
        a.addEventListener('pointerenter', () => light(n));
        a.addEventListener('focus', () => light(n));
        a.addEventListener('blur', () => light([]));
      });
      return page;
    },
  };
})();
