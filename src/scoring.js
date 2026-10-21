// Scoring for the QUEST (quick guess) and the TAS (check).
// Plain script, no modules, so the site opens straight from the file system.

(function () {
  const E = (window.ENNEAGRAM = window.ENNEAGRAM || {});

  const QUEST_KEY = { AX: 7, AY: 8, AZ: 3, BX: 9, BY: 4, BZ: 5, CX: 2, CY: 6, CZ: 1 };
  const GROUP_I = ['A', 'B', 'C'];
  const GROUP_II = ['X', 'Y', 'Z'];

  // The book's bands overlap at their edges (15-30, 30-45, ...); a score on an
  // edge goes to the lower band.
  const VERDICTS = [
    { key: 'doesnt-fit',    min: 15, max: 30, label: "Doesn't fit",
      text: 'The quick test probably missed. Try checking another type.' },
    { key: 'not-confirmed', min: 31, max: 45, label: 'Not confirmed',
      text: "You may carry some of this type's issues, but it is probably not your home base. Try checking another type." },
    { key: 'likely',        min: 46, max: 60, label: 'Likely',
      text: 'You clearly have a strong part of this type in you.' },
    { key: 'strong',        min: 61, max: 75, label: 'Strong match',
      text: 'You are most likely this type.' },
  ];

  // groupI: one or two of 'A','B','C'. groupII: one or two of 'X','Y','Z'.
  // The book allows two picks in only one of the groups.
  // Returns the candidate type numbers, in pick order.
  function questTypes(groupI, groupII) {
    if (!groupI.length || !groupII.length) throw new Error('Pick at least one paragraph in each group.');
    if (groupI.length > 2 || groupII.length > 2) throw new Error('At most two picks in a group.');
    if (groupI.length === 2 && groupII.length === 2) throw new Error('Two picks are allowed in only one group.');
    for (const k of groupI) if (!GROUP_I.includes(k)) throw new Error('Unknown Group I pick: ' + k);
    for (const k of groupII) if (!GROUP_II.includes(k)) throw new Error('Unknown Group II pick: ' + k);
    const types = [];
    for (const a of groupI) for (const b of groupII) types.push(QUEST_KEY[a + b]);
    return types;
  }

  // ratings: 15 numbers from 1 to 5. Returns the sum (15-75).
  function tasScore(ratings) {
    if (ratings.length !== 15) throw new Error('The TAS needs 15 ratings, got ' + ratings.length + '.');
    let sum = 0;
    for (const r of ratings) {
      if (!Number.isInteger(r) || r < 1 || r > 5) throw new Error('Ratings run from 1 to 5, got ' + r + '.');
      sum += r;
    }
    return sum;
  }

  function verdict(score) {
    const v = VERDICTS.find((v) => score >= v.min && score <= v.max);
    if (!v) throw new Error('A TAS score runs from 15 to 75, got ' + score + '.');
    return v;
  }

  // quest: { groupI: [...], groupII: [...] }
  // tas: { [type]: [15 ratings] } for each type the player checked.
  // Returns the candidates, each checked type's score and verdict, and the
  // leading type (highest TAS score; ties go to the QUEST's first pick).
  function result(quest, tas) {
    const candidates = questTypes(quest.groupI, quest.groupII);
    const checked = Object.keys(tas).map(Number).map((type) => {
      const score = tasScore(tas[type]);
      return { type, score, verdict: verdict(score), fromQuest: candidates.includes(type) };
    });
    checked.sort((a, b) => b.score - a.score
      || rank(candidates, a.type) - rank(candidates, b.type));
    const leading = checked[0] || null;
    return {
      candidates,
      checked,
      leading,
      // The two tests agree when a QUEST type scores Likely or better.
      agree: checked.some((c) => c.fromQuest && c.score >= 46),
    };
  }

  function rank(list, type) {
    const i = list.indexOf(type);
    return i === -1 ? Infinity : i;
  }

  E.scoring = { QUEST_KEY, VERDICTS, questTypes, tasScore, verdict, result };
})();
