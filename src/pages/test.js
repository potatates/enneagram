// Test Yourself: intro -> QUEST group I -> group II -> bridge -> TAS -> result.
// Each step has its own address (#test/quest-1 ...) so the browser's back button works.
(function () {
  const E = window.ENNEAGRAM;
  const Q = E.QUESTIONS;
  const T = E.TYPES.types;
  const S = E.state;
  const STEPS = ['intro', 'quest-1', 'quest-2', 'bridge', 'rate', 'result'];
  const SCALE = Object.entries(Q.tas.scale).map(([n, label]) => ({ n: Number(n), label }));
  const WORDS = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

  const go = (step) => { location.hash = '#test/' + step; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const typeName = (n) => 'Type ' + n + ', ' + T[n].name;

  function shell(inner, opts = {}) {
    const page = document.createElement('section');
    page.className = 'page test' + (opts.cls ? ' ' + opts.cls : '');
    page.innerHTML = inner;
    return page;
  }

  // Step 1 of 3 / 2 of 3 / 3 of 3, with a back link.
  function progress(n, back) {
    return `<div class="steps">
      ${back ? `<a class="back" href="${back}"><span aria-hidden="true">←</span> Back</a>` : '<span></span>'}
      <ol class="step-dots" aria-label="Step ${n} of 3">
        ${[1, 2, 3].map((i) => `<li class="${i < n ? 'done' : i === n ? 'now' : ''}"><span class="sr">${i === n ? 'Current: ' : ''}</span>${['Quick test I', 'Quick test II', 'Check'][i - 1]}</li>`).join('')}
      </ol>
    </div>`;
  }

  // ---------- Intro ----------

  function intro() {
    const resume = S.started() && !S.get().done;
    const page = shell(`
      <h1 class="display test-title">Test Yourself</h1>
      <p class="lede">Two quick choices point to your likely type. Then fifteen short statements check it.</p>
      <p class="lede-sub">About five minutes. Nothing you answer leaves this page.</p>
      <details class="how">
        <summary>How to choose</summary>
        <ul>
          <li>Pick the paragraph that fits how you have been <em>most of your life</em>, not just lately.</li>
          <li>You don't have to agree with every word. If 80 to 90 percent fits, that's the one. Don't reject a paragraph over a single phrase.</li>
          <li>Don't overthink it. Go with your gut.</li>
        </ul>
      </details>
      <div class="actions">
        ${resume ? `<a class="pill" href="#test/${resumeStep()}">Continue where you left off</a>
                    <button class="text-button restart" type="button">Start over</button>`
                 : `<button class="pill begin" type="button">Begin</button>`}
      </div>`, { cls: 'test-intro' });
    page.querySelector('.begin')?.addEventListener('click', () => { S.reset(); go('quest-1'); });
    page.querySelector('.restart')?.addEventListener('click', () => { S.reset(); go('quest-1'); });
    return page;
  }

  function resumeStep() {
    const st = S.get();
    if (!st.quest.groupI.length) return 'quest-1';
    if (!st.quest.groupII.length) return 'quest-2';
    if (!st.queue.length) return 'bridge';
    return S.complete() ? 'result' : 'rate';
  }

  // ---------- QUEST ----------

  function quest(groupIndex) {
    const st = S.get();
    const group = Q.quest.groups[groupIndex];
    const field = groupIndex === 0 ? 'groupI' : 'groupII';
    const other = groupIndex === 0 ? 'groupII' : 'groupI';
    const picks = st.quest[field];
    // Two picks are allowed in only one group.
    const canPickTwo = st.quest[other].length < 2;
    let allowTwo = picks.length === 2;

    const page = shell(`
      ${progress(groupIndex + 1, groupIndex === 0 ? '#test' : '#test/quest-1')}
      <h1 class="question">Which paragraph sounds most like you?</h1>
      <p class="hint">Group ${group.id} of II. Pick the one that fits most of your life.</p>
      <div class="options" role="group" aria-label="Group ${group.id}"></div>
      <div class="two-wrap">
        ${canPickTwo ? `<button class="text-button two" type="button" aria-pressed="${allowTwo}">I can't decide between two</button>
          <p class="two-note" ${allowTwo ? '' : 'hidden'}>You can pick two here, but only in one of the two groups.</p>` : ''}
      </div>
      <div class="actions"><button class="pill next" type="button">Continue</button></div>`);

    const list = page.querySelector('.options');
    const next = page.querySelector('.next');

    function draw() {
      list.innerHTML = group.options.map((o) => {
        const on = picks.includes(o.key);
        return `<button class="option${on ? ' on' : ''}" type="button" aria-pressed="${on}" data-key="${o.key}">
          <span class="mark" aria-hidden="true">${on ? '✓' : o.key}</span>
          <span class="text">${esc(o.text)}</span>
          <span class="tag" aria-hidden="true">${on ? 'Selected' : ''}</span>
        </button>`;
      }).join('');
      next.disabled = picks.length === 0;
      next.textContent = groupIndex === 0 ? 'Continue' : 'See what it points to';
    }

    list.addEventListener('click', (e) => {
      const b = e.target.closest('.option');
      if (!b) return;
      const k = b.dataset.key;
      const at = picks.indexOf(k);
      if (at !== -1) picks.splice(at, 1);
      else if (allowTwo && picks.length < 2) picks.push(k);
      else picks.splice(0, picks.length, k);
      S.save();
      draw();
      const sel = list.querySelector(`[data-key="${k}"]`);
      sel && sel.focus();
    });

    page.querySelector('.two')?.addEventListener('click', (e) => {
      allowTwo = !allowTwo;
      e.currentTarget.setAttribute('aria-pressed', String(allowTwo));
      page.querySelector('.two-note').hidden = !allowTwo;
      if (!allowTwo && picks.length > 1) { picks.splice(1); S.save(); }
      draw();
    });

    next.addEventListener('click', () => {
      if (!picks.length) return;
      // Answers changed: anything rated after this point no longer applies.
      st.queue = []; st.tas = {}; st.cursor = 0; st.done = false; S.save();
      go(groupIndex === 0 ? 'quest-2' : 'bridge');
    });

    draw();
    return page;
  }

  // ---------- Bridge ----------

  function bridge() {
    const st = S.get();
    if (!st.quest.groupI.length) { go('quest-1'); return shell(''); }
    if (!st.quest.groupII.length) { go('quest-2'); return shell(''); }
    const types = E.scoring.questTypes(st.quest.groupI, st.quest.groupII);
    const two = types.length === 2;

    const card = (n) => `<div class="type-card">
        <span class="type-num">${n}</span>
        <div><p class="type-name">${esc(T[n].name)}</p><p class="type-traits">${T[n].traits.join(' · ')}</p></div>
      </div>`;

    const page = shell(`
      ${progress(3, '#test/quest-2')}
      <h1 class="eyebrow">Your quick test points to</h1>
      <div class="type-cards">${types.map(card).join('<span class="or">or</span>')}</div>
      <p class="bridge-copy">The quick test is right about 70 percent of the time, so let's check it.
        Next come ${two ? 'thirty' : 'fifteen'} short statements. Rate how true each one is for you.</p>
      <div class="actions"><button class="pill start-rating" type="button">Start the check</button></div>`, { cls: 'test-bridge' });

    page.querySelector('.start-rating').addEventListener('click', () => {
      st.queue = []; st.tas = {}; st.cursor = 0; st.done = false;
      types.forEach(S.queueType);
      S.save();
      go('rate');
    });
    return page;
  }

  // ---------- TAS: rating ----------

  function rate() {
    const st = S.get();
    if (!st.queue.length) { go(S.started() ? 'bridge' : 'quest-1'); return shell(''); }
    const backHref = st.done ? '#test/result' : '#test/bridge';

    const page = shell(`
      ${progress(3, backHref)}
      <h1 class="question">How true is each statement for you?</h1>
      <div class="rate-body"></div>`, { cls: 'test-rate' });

    oneAtATime(page.querySelector('.rate-body'));
    return page;
  }

  const statement = (type, i) => Q.tas.statements[type][i];

  function scaleButtons(type, i) {
    const v = S.get().tas[type][i];
    return `<div class="scale" role="radiogroup" aria-label="How true">
      ${SCALE.map((s) => `<button type="button" role="radio" class="${v === s.n ? 'on' : ''}" aria-checked="${v === s.n}" data-v="${s.n}">
          <span class="n">${s.n}</span><span class="w">${s.label}</span></button>`).join('')}
    </div>`;
  }

  function finish() {
    const st = S.get();
    st.done = true; S.save();
    go('result');
  }

  function oneAtATime(body) {
    const st = S.get();
    const items = S.items();
    let at = Math.min(st.cursor, items.length - 1);
    let timer = null;

    function draw(focus) {
      const { type, i } = items[at];
      const answered = S.answeredCount();
      body.innerHTML = `
        <div class="count">
          <span>Statement ${at + 1} of ${items.length}</span>
          <div class="bar" role="progressbar" aria-label="Statements answered" aria-valuemin="0" aria-valuemax="${items.length}" aria-valuenow="${answered}"><span style="width:${answered / items.length * 100}%"></span></div>
        </div>
        <p class="statement" tabindex="-1">${esc(statement(type, i))}</p>
        ${scaleButtons(type, i)}
        <div class="one-nav">
          <button class="text-button prev" type="button" ${at === 0 ? 'disabled' : ''}>← Previous</button>
          <span class="keys">Tip: keys 1 to 5 work too</span>
          <button class="text-button skip-next" type="button" ${st.tas[type][i] == null || at === items.length - 1 ? 'hidden' : ''}>Next →</button>
        </div>
        ${S.complete() ? '<div class="actions"><button class="pill to-result" type="button">See your result</button></div>' : ''}`;
      // Focus the new statement (not a rating button, which would look chosen).
      if (focus) body.querySelector('.statement').focus({ preventScroll: true });
    }

    function pick(v) {
      const { type, i } = items[at];
      st.tas[type][i] = v; S.save();
      draw(true);
      clearTimeout(timer);
      // Move on by itself after a beat, so the choice is seen before it changes.
      // Always to the very next statement: jumping ahead to the next unanswered
      // one skipped statements whenever some later ones were already answered.
      timer = setTimeout(() => {
        if (at < items.length - 1) at++;
        else if (S.complete()) { finish(); return; }
        else at = items.findIndex((it) => st.tas[it.type][it.i] == null); // last one done, some earlier left
        st.cursor = at; S.save();
        draw(true);
      }, 320);
    }

    body.addEventListener('click', (e) => {
      const b = e.target.closest('.scale button');
      if (b) return pick(Number(b.dataset.v));
      if (e.target.closest('.prev') && at > 0) { clearTimeout(timer); at--; st.cursor = at; S.save(); draw(true); }
      if (e.target.closest('.skip-next') && at < items.length - 1) { clearTimeout(timer); at++; st.cursor = at; S.save(); draw(true); }
      if (e.target.closest('.to-result')) finish();
    });

    function onKey(e) {
      if (!document.body.contains(body)) { document.removeEventListener('keydown', onKey); return; }
      if (e.target.closest('input, textarea') || e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^[1-5]$/.test(e.key)) { e.preventDefault(); pick(Number(e.key)); }
      if (e.key === 'ArrowLeft' && at > 0) { at--; st.cursor = at; S.save(); draw(true); }
    }
    document.addEventListener('keydown', onKey);
    draw(false);
  }

  // ---------- Result ----------

  function result() {
    const st = S.get();
    if (!S.complete()) { go(resumeStep()); return shell(''); }
    const r = E.scoring.result(st.quest, S.finishedTas());
    const lead = r.leading;
    const strongish = lead.score >= 46;
    const questNames = r.candidates.map((n) => 'Type ' + n).join(' or ');

    let headline, sub;
    if (strongish) {
      headline = (lead.verdict.key === 'strong' ? 'You are most likely' : 'You are likely') + (lead.type === 8 ? ' an ' : ' a ') + WORDS[lead.type];
      sub = lead.fromQuest
        ? 'Both tests agree.'
        : `The quick test pointed to ${questNames}, but this check fits better.`;
    } else {
      headline = 'Not confirmed yet';
      sub = `The quick test pointed to ${questNames}, but the check didn't back it up. That's common. The quick test is right about 70 percent of the time. Try checking another type.`;
    }

    const t = T[lead.type];
    const meter = (c) => {
      const pct = (c.score - 15) / 60 * 100;
      return `<div class="meter" aria-hidden="true">
          <span class="zone z1"></span><span class="zone z2"></span><span class="zone z3"></span><span class="zone z4"></span>
          <span class="pin" style="left:${pct}%"></span>
        </div>
        <div class="meter-labels" aria-hidden="true"><span>Doesn't fit</span><span>Not confirmed</span><span>Likely</span><span>Strong</span></div>`;
    };

    const page = shell(`
      <p class="eyebrow">Your result</p>
      <h1 class="display result-head">${headline}</h1>
      <p class="result-sub">${sub}</p>

      <article class="result-card${strongish ? '' : ' muted'}">
        <div class="result-type">
          <span class="type-num big">${lead.type}</span>
          <div>
            <p class="type-name">${esc(t.name)}</p>
            <p class="type-sub">${esc(t.subtitle)}</p>
            <p class="type-traits">${t.traits.join(' · ')}</p>
          </div>
        </div>
        <p class="score-line"><b>${lead.score}</b> out of 75 · <span class="verdict v-${lead.verdict.key}">${lead.verdict.label}</span></p>
        ${meter(lead)}
        <p class="verdict-text">${esc(lead.verdict.text)}</p>
        ${strongish ? `<a class="pill" href="#type-${lead.type}">Read about the ${esc(t.name.replace(/^The /, ''))}</a>` : ''}
      </article>

      ${r.checked.length > 1 ? `<h2 class="small-head">Every type you checked</h2>
        <ul class="checked">${r.checked.map((c) => `<li>
          <a href="#type-${c.type}">${typeName(c.type)}</a>
          <span>${c.score} / 75 · ${c.verdict.label}${c.fromQuest ? ' · from the quick test' : ''}</span></li>`).join('')}</ul>` : ''}

      <h2 class="small-head">Check another type</h2>
      <p class="hint">Fifteen statements for any type. Your best match will rise to the top.</p>
      <div class="other-types">
        ${Array.from({ length: 9 }, (_, k) => k + 1).map((n) => {
          const done = r.checked.find((c) => c.type === n);
          return `<button class="other" type="button" data-type="${n}" ${done ? 'disabled' : ''}>
            <span class="n">${n}</span><span class="nm">${esc(T[n].name.replace(/^The /, ''))}</span>${done ? `<span class="sc">${done.score}</span>` : ''}</button>`;
        }).join('')}
      </div>

      <p class="book-note">From the book: no test is certain. Read the type descriptions and see which one you recognise yourself in. When you find it, you will know.</p>
      <div class="actions"><button class="text-button again" type="button">Take the test again</button></div>`, { cls: 'test-result' });

    page.querySelector('.other-types').addEventListener('click', (e) => {
      const b = e.target.closest('.other');
      if (!b || b.disabled) return;
      const n = Number(b.dataset.type);
      S.queueType(n);
      // Jump straight to the new type's first statement.
      st.cursor = S.items().findIndex((it) => it.type === n);
      S.save();
      go('rate');
    });
    page.querySelector('.again').addEventListener('click', () => { S.reset(); go('quest-1'); });
    return page;
  }

  // ---------- Page ----------

  E.pages = E.pages || {};
  E.pages.test = {
    title: (step) => ({ result: 'Your result', rate: 'Check your type' }[step] || 'Test Yourself') + ' · The Wisdom of the Enneagram',
    render(step) {
      switch (step) {
        case 'quest-1': return quest(0);
        case 'quest-2': return quest(1);
        case 'bridge': return bridge();
        case 'rate': return rate();
        case 'result': return result();
        default: return intro();
      }
    },
    steps: STEPS,
  };
})();
