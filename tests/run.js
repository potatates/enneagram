// Runs the scoring tests in Node: node tests/run.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const ctx = { console };
ctx.window = ctx;
vm.createContext(ctx);
for (const f of ['content/book-questions.js', 'content/types.js', 'content/intro.js', 'src/scoring.js', 'tests/scoring.tests.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), ctx, { filename: f });
}
const results = ctx.ENNEAGRAM_TEST_RESULTS;
for (const r of results) console.log((r.ok ? 'ok   ' : 'FAIL ') + r.name + (r.ok ? '' : ': ' + r.msg));
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
