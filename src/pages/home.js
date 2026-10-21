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
        <div class="home-symbol"></div>
        <a class="pill home-cta" href="#test">Find your type</a>
        <p class="home-note">Two quick choices, then fifteen statements. About five minutes.</p>`;
      page.querySelector('.home-symbol').replaceWith(E.enneagram.create({ draw: !drawn }));
      drawn = true;
      return page;
    },
  };
})();
