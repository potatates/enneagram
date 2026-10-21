# The Wisdom of the Enneagram

A small website for finding your Enneagram type. It follows the method in Riso and Hudson's *The Wisdom of the Enneagram*: a quick two-choice test points to a likely type, and 15 statements for that type check it. Around the quiz are an introduction you read by your own light, a map of the nine types, and a page for each type.

Designed by Mia (Figma: *Enneagram Book Website*), built in plain HTML, CSS and JavaScript.

## Open it

Live at **https://potatates.github.io/enneagram/** (GitHub Pages, from the `main` branch).

Or double-click `index.html`. It needs no server, no install and no internet connection. The fonts are stored in `vendor/fonts`.

Any static host works (GitHub Pages, Netlify, Vercel). Nothing needs building first. See **Copyright** below.

## Pages

| Address | Page |
|---|---|
| `#home` | Title and the enneagram symbol |
| `#light` | Beings of Light: the book's preface. Turn off the light and read by a circle of light that follows your cursor or finger. |
| `#test` | Test Yourself: intro, quick test (two groups), bridge, check (15 or 30 statements, one at a time), result |
| `#understand` | Understand Your Type: the symbol and the Gut, Heart and Head centers |
| `#type-1` … `#type-9` | One page per type |

## How scoring works

- **Quick test (QUEST).** One paragraph from group I (A, B, C) and one from group II (X, Y, Z) make a two-letter code: AX 7, AY 8, AZ 3, BX 9, BY 4, BZ 5, CX 2, CY 6, CZ 1. You may pick two paragraphs in one group only, which gives two candidate types.
- **Check (TAS).** 15 statements for a type, each rated 1 to 5, added to a score from 15 to 75.
  - 61–75: Strong match
  - 46–60: Likely
  - 31–45: Not confirmed
  - 15–30: Doesn't fit
  - The book's bands overlap at 30, 45 and 60, and those scores go to the lower band.
- **Result.** The highest score leads. A tie goes to the quick test's first pick. The tests "agree" when a quick-test type scores 46 or more. From the result you can check any other type, and the best match rises to the top.

Answers are saved in the browser (localStorage) and never leave the page.

## Files

```
index.html             the single page
content/               all text from the book (plain scripts so the page opens from disk)
  book-questions.js    QUEST paragraphs and all 135 TAS statements
  types.js             names, traits, fears, desires and opening text for the nine types
  intro.js             Beings of Light
src/
  main.js              routing (#home, #test/rate, #type-4 ...)
  nav.js               top nav and phone menu
  state.js             quiz progress, saved in the browser
  scoring.js           QUEST code -> type, TAS sum -> verdict, combined result
  enneagram.js         draws the symbol as SVG
  pages/               one file per page
styles/                tokens.css holds the colors, fonts and spacing from Figma
vendor/fonts/          EB Garamond and Old Standard TT (SIL Open Font License)
tests/
  scoring.test.html    open in a browser: 41 checks of the scoring and content
  run.js               the same checks from a terminal: node tests/run.js
  content.html         every text from the book on one page, for proofreading
figma/                 screenshots of the original design
screenshots/           each build stage, plus before-and-after comparisons
```

## Fonts

The Figma file uses Adobe Garamond Pro and Century Expanded. Those need a paid web license, so the site uses free look-alikes: **EB Garamond** for text and **Old Standard TT** for headings. If you have a web license for the originals, add them to `vendor/fonts` and put their names first in `--font-body` and `--font-display` in `styles/tokens.css`.

## Copyright

The QUEST paragraphs, the TAS statements, the type descriptions and the Beings of Light text are quoted from *The Wisdom of the Enneagram* (Riso and Hudson, Bantam, 1999). The QUEST and TAS are trademarks of the Enneagram Institute. That's fine for a private prototype. For a public site, choose one of these before publishing:

1. Rewrite the questions and descriptions in your own words, based on the book.
2. Ask the Enneagram Institute for permission.
3. Show the site publicly only as video or screenshots.

All the text lives in `content/`, so swapping it doesn't touch any code.

The text was transcribed from an OCR copy. Check `tests/content.html` against the printed book.
