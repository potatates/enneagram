// One page per type (#type-1 ... #type-9), with the Gut / Heart / Head sidebar.
(function () {
  const E = window.ENNEAGRAM;
  const T = E.TYPES;
  const WORDS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const PLURAL = ['', 'Ones', 'Twos', 'Threes', 'Fours', 'Fives', 'Sixes', 'Sevens', 'Eights', 'Nines'];
  const G = E.enneagram.GROWTH, St = E.enneagram.STRESS;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  function sidebar(current) {
    return `<button class="sb-open" type="button" aria-controls="type-sidebar" aria-expanded="false"><span>All types</span></button>
      <nav class="type-sidebar" id="type-sidebar" aria-label="All types">
      <button class="sb-close" type="button" aria-controls="type-sidebar" aria-expanded="true">Close <span aria-hidden="true">«</span></button>
      ${Object.values(T.triads).map((triad) => `
        <p class="sb-center"><a href="#understand">${triad.label}</a></p>
        <ul>${triad.types.map((n) => `<li><a href="#type-${n}" ${n === current ? 'aria-current="page"' : ''}>Type ${n}</a></li>`).join('')}</ul>`).join('')}
    </nav>`;
  }

  // Where this type stands in the reader's quiz, if anywhere.
  function quizNote(n) {
    const st = E.state.get();
    const result = E.state.lastResult();
    const checked = result && result.checked.find((c) => c.type === n);
    if (checked) {
      const lead = result.leading.type === n && checked.score >= 46;
      return `<div class="quiz-note${lead ? ' lead' : ''}">
        <p>${lead ? 'This is your result.' : 'You checked this type.'} Score <b>${checked.score}</b> out of 75 · ${checked.verdict.label}.</p>
        <a class="text-button" href="#test/result">See your full result</a></div>`;
    }
    const canCheck = result && st.quest.groupII.length;
    return `<div class="quiz-note">
      <p>Does this sound like you? Fifteen statements from the book will tell you how well it fits.</p>
      ${canCheck ? `<button class="pill check-this" type="button" data-type="${n}">Check yourself against Type ${n}</button>`
                 : `<a class="pill" href="#test">Take the test</a>`}</div>`;
  }

  E.pages = E.pages || {};
  E.pages.type = {
    title: (n) => 'Type ' + n + ', ' + T.types[n].name + ' · The Wisdom of the Enneagram',
    render(n) {
      const t = T.types[n];
      const prev = n === 1 ? 9 : n - 1;
      const next = n === 9 ? 1 : n + 1;
      const page = document.createElement('div');
      page.className = 'type-layout';
      page.innerHTML = `
        ${sidebar(n)}
        <article class="page type-page">
          <nav class="type-pager" aria-label="Neighbouring types">
            <a href="#type-${prev}" rel="prev"><span aria-hidden="true">←</span> Type ${prev}</a>
            <a href="#type-${next}" rel="next">Type ${next} <span aria-hidden="true">→</span></a>
          </nav>
          <div class="type-grid">
            <header class="type-header">
              <p class="type-kicker">${T.triads[t.triad].label} center</p>
              <h1 class="display">Type ${n}</h1>
              <p class="type-title">${esc(t.name)}</p>
              <p class="type-sub">${esc(t.subtitle)}</p>
              <div class="type-symbol"></div>
              <ul class="paths">
                <li class="growth"><span class="key" aria-hidden="true"></span><span><b>In growth</b>, ${PLURAL[n]} move toward <a href="#type-${G[n]}">${T.types[G[n]].name.replace(/^The /, 'the ')}</a> (${G[n]}).</span></li>
                <li class="stress"><span class="key" aria-hidden="true"></span><span><b>Under stress</b>, toward <a href="#type-${St[n]}">${T.types[St[n]].name.replace(/^The /, 'the ')}</a> (${St[n]}).</span></li>
              </ul>
              <dl class="facts">
                <div><dt>Traits</dt><dd>${t.traits.join(', ')}</dd></div>
                <div><dt>Basic fear</dt><dd>${esc(t.basicFear)}</dd></div>
                <div><dt>Basic desire</dt><dd>${esc(t.basicDesire)}</dd></div>
                <div><dt>Inner message</dt><dd>“${esc(t.superego)}”</dd></div>
              </dl>
            </header>
            <div class="type-body">
              ${t.motto ? `<p class="motto">“${esc(t.motto)}”</p>` : ''}
              ${t.intro.map((p, i) => `<p${i === 0 ? ' class="drop"' : ''}>${esc(p)}</p>`).join('')}
              ${quizNote(n)}
              <p class="source">From <em>The Wisdom of the Enneagram</em> by Don Richard Riso and Russ Hudson, the opening of the chapter on Type ${WORDS[n]}.</p>
            </div>
          </div>
        </article>`;

      page.querySelector('.type-symbol').replaceWith(E.enneagram.create({
        link: (k) => '#type-' + k, highlight: n, paths: n,
        label: `The enneagram, with Type ${n} marked and arrows to Type ${G[n]} (growth) and Type ${St[n]} (stress)`,
      }));

      // Open or close the sidebar, and remember the choice for the next type page.
      const setSidebar = (open) => {
        document.body.classList.toggle('sidebar-closed', !open);
        page.querySelector('.sb-open').setAttribute('aria-expanded', String(open));
        page.querySelector('.sb-close').setAttribute('aria-expanded', String(open));
        try { localStorage.setItem('enneagram-sidebar', open ? 'open' : 'closed'); } catch (e) { /* keep it for this visit only */ }
      };
      let saved = null;
      try { saved = localStorage.getItem('enneagram-sidebar'); } catch (e) { /* no storage */ }
      setSidebar(saved !== 'closed');
      page.querySelector('.sb-close').addEventListener('click', () => { setSidebar(false); page.querySelector('.sb-open').focus(); });
      page.querySelector('.sb-open').addEventListener('click', () => { setSidebar(true); page.querySelector('.sb-close').focus(); });

      page.querySelector('.check-this')?.addEventListener('click', () => {
        const st = E.state.get();
        E.state.queueType(n);
        st.cursor = E.state.items().findIndex((it) => it.type === n);
        E.state.save();
        location.hash = '#test/rate';
      });
      return page;
    },
  };
})();
