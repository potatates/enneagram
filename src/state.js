// Quiz progress, kept in the browser so a refresh doesn't lose answers.
(function () {
  const E = (window.ENNEAGRAM = window.ENNEAGRAM || {});
  const KEY = 'enneagram-quiz-v1';

  function blank() {
    return {
      quest: { groupI: [], groupII: [] },
      queue: [],      // types to rate, in order
      tas: {},        // { [type]: [15 ratings, null until answered] }
      cursor: 0,      // position in the one-at-a-time layout, across the whole queue
      done: false,    // reached the result
    };
  }

  function read(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v || fallback; }
    catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode: keep going in memory */ }
  }

  let state = Object.assign(blank(), read(KEY, {}));

  E.state = {
    get: () => state,
    save: () => write(KEY, state),
    reset: () => { state = blank(); write(KEY, state); return state; },
    started: () => state.quest.groupI.length > 0,

    // Add a type to rate (from the QUEST or "check another type").
    queueType(type) {
      if (!state.queue.includes(type)) state.queue.push(type);
      if (!state.tas[type]) state.tas[type] = Array(15).fill(null);
    },

    // Every queued statement in order, as { type, i }.
    items() {
      return state.queue.flatMap((type) => Array.from({ length: 15 }, (_, i) => ({ type, i })));
    },

    answeredCount() {
      return E.state.items().filter(({ type, i }) => state.tas[type][i] != null).length;
    },

    complete() {
      return state.queue.length > 0 && E.state.answeredCount() === state.queue.length * 15;
    },

    // The quiz result from every fully rated type, or null before the first
    // result. A type still being checked is left out until it's finished.
    lastResult() {
      const tas = E.state.finishedTas();
      if (!state.done || !Object.keys(tas).length) return null;
      try { return E.scoring.result(state.quest, tas); } catch (e) { return null; }
    },

    // Ratings for fully answered types only, as scoring.result expects.
    finishedTas() {
      const out = {};
      for (const t of state.queue) if (state.tas[t].every((r) => r != null)) out[t] = state.tas[t];
      return out;
    },
  };
})();
