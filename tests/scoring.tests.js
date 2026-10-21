// Tests for content and scoring. Runs in the browser (scoring.test.html)
// and in Node (node tests/run.js).

(function () {
  const E = window.ENNEAGRAM;
  const S = E.scoring;
  const results = [];

  function test(name, fn) {
    try { fn(); results.push({ name, ok: true }); }
    catch (e) { results.push({ name, ok: false, msg: e.message }); }
  }
  function eq(a, b) {
    if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error('expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a));
  }
  function throws(fn) {
    try { fn(); } catch (e) { return; }
    throw new Error('expected an error');
  }
  const fill = (n) => Array(15).fill(n);

  // Content
  test('QUEST has two groups of three paragraphs', () => {
    eq(E.QUESTIONS.quest.groups.map((g) => g.options.map((o) => o.key)), [['A', 'B', 'C'], ['X', 'Y', 'Z']]);
  });
  test('No QUEST paragraph is repeated (the Figma mix-up)', () => {
    const texts = E.QUESTIONS.quest.groups.flatMap((g) => g.options.map((o) => o.text));
    eq(new Set(texts).size, 6);
  });
  test('Content key matches scoring key', () => eq(E.QUESTIONS.quest.key, S.QUEST_KEY));
  test('TAS has 15 statements for each of the 9 types', () => {
    for (let t = 1; t <= 9; t++) eq(E.QUESTIONS.tas.statements[t].length, 15);
  });
  test('Every type has a name, triad and intro', () => {
    for (let t = 1; t <= 9; t++) {
      const x = E.TYPES.types[t];
      if (!x.name || !x.triad || !x.intro.length) throw new Error('type ' + t + ' incomplete');
      if (!E.TYPES.triads[x.triad].types.includes(t)) throw new Error('type ' + t + ' not in its triad');
    }
  });
  test('Beings of Light text is there', () => eq(E.INTRO.paragraphs.length, 4));

  // QUEST
  const codes = { AX: 7, AY: 8, AZ: 3, BX: 9, BY: 4, BZ: 5, CX: 2, CY: 6, CZ: 1 };
  for (const [code, type] of Object.entries(codes)) {
    test('QUEST ' + code + ' gives Type ' + type, () => eq(S.questTypes([code[0]], [code[1]]), [type]));
  }
  test('All 9 types are reachable', () => eq(Object.values(S.QUEST_KEY).sort(), [1, 2, 3, 4, 5, 6, 7, 8, 9]));
  test('Two picks in Group I give two types', () => eq(S.questTypes(['A', 'C'], ['Y']), [8, 6]));
  test('Two picks in Group II give two types', () => eq(S.questTypes(['B'], ['X', 'Z']), [9, 5]));
  test('Two picks in both groups is refused', () => throws(() => S.questTypes(['A', 'B'], ['X', 'Y'])));
  test('An empty group is refused', () => throws(() => S.questTypes([], ['X'])));
  test('Unknown letters are refused', () => throws(() => S.questTypes(['Q'], ['X'])));

  // TAS
  test('All 1s score 15', () => eq(S.tasScore(fill(1)), 15));
  test('All 5s score 75', () => eq(S.tasScore(fill(5)), 75));
  test('14 ratings is refused', () => throws(() => S.tasScore(Array(14).fill(3))));
  test('A rating of 0 is refused', () => throws(() => S.tasScore([0, ...Array(14).fill(3)])));
  test('A rating of 6 is refused', () => throws(() => S.tasScore([6, ...Array(14).fill(3)])));

  // Bands, including every edge
  const bands = [[15, 'doesnt-fit'], [30, 'doesnt-fit'], [31, 'not-confirmed'], [45, 'not-confirmed'],
    [46, 'likely'], [60, 'likely'], [61, 'strong'], [75, 'strong']];
  for (const [score, key] of bands) test('Score ' + score + ' is "' + key + '"', () => eq(S.verdict(score).key, key));
  test('Every score from 15 to 75 has exactly one band', () => {
    for (let s = 15; s <= 75; s++) eq(S.VERDICTS.filter((v) => s >= v.min && s <= v.max).length, 1);
  });
  test('Score 14 and 76 are refused', () => { throws(() => S.verdict(14)); throws(() => S.verdict(76)); });

  // Full result
  test('QUEST and TAS agree', () => {
    const r = S.result({ groupI: ['C'], groupII: ['Y'] }, { 6: fill(5) });
    eq([r.leading.type, r.leading.verdict.key, r.agree], [6, 'strong', true]);
  });
  test('QUEST and TAS disagree', () => {
    const r = S.result({ groupI: ['C'], groupII: ['Y'] }, { 6: fill(2) });
    eq([r.leading.verdict.key, r.agree], ['doesnt-fit', false]);
  });
  test('With two candidates, the higher TAS leads', () => {
    const r = S.result({ groupI: ['A', 'C'], groupII: ['Y'] }, { 8: fill(3), 6: fill(4) });
    eq([r.candidates, r.leading.type], [[8, 6], 6]);
  });
  test('A tie goes to the first QUEST pick', () => {
    const r = S.result({ groupI: ['A', 'C'], groupII: ['Y'] }, { 6: fill(4), 8: fill(4) });
    eq(r.leading.type, 8);
  });
  test('Checking another type after a miss', () => {
    const r = S.result({ groupI: ['A'], groupII: ['X'] }, { 7: fill(2), 3: fill(5) });
    eq([r.leading.type, r.leading.fromQuest, r.agree], [3, false, false]);
  });

  // Report
  const failed = results.filter((r) => !r.ok);
  window.ENNEAGRAM_TEST_RESULTS = results;
  if (typeof document !== 'undefined' && document.getElementById) {
    document.getElementById('summary').innerHTML = failed.length
      ? '<span class="fail">' + failed.length + ' of ' + results.length + ' failed</span>'
      : '<span class="pass">All ' + results.length + ' passed</span>';
    document.getElementById('out').innerHTML = results.map((r) =>
      '<li class="' + (r.ok ? 'pass' : 'fail') + '">' + (r.ok ? '✓ ' : '✗ ') + r.name + (r.ok ? '' : ': ' + r.msg) + '</li>').join('');
  }
})();
