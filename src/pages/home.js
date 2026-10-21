(function () {
  const E = window.ENNEAGRAM;
  let drawn = false; // only animate the symbol on the first visit

  E.pages = E.pages || {};
  E.pages.home = {
    title: 'The Wisdom of the Enneagram',
    render() {
      const page = document.createElement('section');
      page.className = 'page home';
      page.innerHTML = `
        <h1 class="home-title">
          <span class="t1">The Wisdom</span>
          <span class="t2">of the</span>
          <span class="t3">Enneagram</span>
        </h1>
        <div class="home-orb">
          <div class="home-symbol"></div>
          <div class="glints" aria-hidden="true"></div>
        </div>
        <a class="pill home-cta" href="#test">Find your type</a>
        <p class="home-note">Two quick choices, then fifteen statements. About five minutes.</p>`;
      page.querySelector('.home-symbol').replaceWith(E.enneagram.create({
        draw: !drawn, sheen: true, link: (n) => '#type-' + n,
        label: 'The enneagram. Each number leads to that type.',
      }));
      // A few glints of prism light around the circle, each on its own slow beat.
      const P = E.enneagram.PRISM;
      page.querySelector('.glints').innerHTML = [
        [8, 18], [88, 12], [96, 58], [4, 70], [70, 96], [24, 92], [50, -4],
      ].map(([x, y], i) => `<span class="glint" style="left:${x}%; top:${y}%; --s:${8 + (i % 3) * 4}px; --c:${P[(i * 3) % P.length]}; --t:${5 + (i % 4)}s; --d:${(i * 1.3).toFixed(1)}s"></span>`).join('');
      drawn = true;
      return page;
    },
  };
})();
