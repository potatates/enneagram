# Enneagram Quiz: Plan (draft)

Status: all 7 stages built, 2026-10-21. See README.md and CASE-STUDY.md. Scope decided: the whole site from the Figma file (Home, Beings of Light, Test Yourself, Understand Your Type, the 9 type pages), with the quiz at its center.

Source: Riso & Hudson, *The Wisdom of the Enneagram*. Questions are in `content/book-questions.js`.

## 1. What the quiz does

It follows the book's own method. First it gives a quick guess (the QUEST), then checks that guess with the 15 statements for that type (the TAS).

## 2. Flow, from the player's side

1. **Welcome.** One sentence on what the quiz is, how long it takes (about 5 minutes) and a Start button.
2. **How to answer.** A short note that covers the book's three rules: pick the paragraph that fits *most of your life*, you don't have to agree with every word, and go with your gut.
3. **QUEST, part 1.** Three paragraphs (A, B, C). Pick one.
4. **QUEST, part 2.** Three paragraphs (X, Y, Z). Pick one.
   - The book allows two picks in *one* of the two groups. The app offers this as a small "I can't decide between two" option, and only in one group.
5. **Bridge.** "Your answers point to Type N, the ___. Let's check it." This also says that 15 short statements are coming.
6. **TAS.** 15 statements for that type, each rated from 1 (Not at all true) to 5 (Very true).
   - If the player picked two paragraphs, they rate both types' statements (30 in all).
7. **Result.** This shows the type number, name and key traits, the TAS score out of 75, and a plain verdict on whether the two quizzes agree (see 3). It also has a "Check another type" option that runs the TAS for any type.

## 3. Scoring

- **QUEST.** The two letters form a code: AX=7, AY=8, AZ=3, BX=9, BY=4, BZ=5, CX=2, CY=6, CZ=1.
- **TAS.** The 15 ratings are added up, giving a score from 15 to 75.
- **Agreement verdict.** This uses the book's score bands:
  - 61–75: **Strong match.** You are most likely this type.
  - 46–60: **Likely.** You clearly have a lot of this type.
  - 31–45: **Not confirmed.** You may have some of this type's issues. Try checking another type.
  - 15–30: **Doesn't fit.** The quick test probably missed. Try another type.
- **Two candidate types.** Both are scored, and the higher score leads the result.
- The result keeps the book's humility: no test is certain, and the type is a starting point.

## 3b. Your Figma design, and what I'd improve

Your Figma file is a whole book website, not just a quiz. It has Home, Beings of Light (the intro text), Test Yourself (the QUEST), Understand Your Type (the enneagram plus Gut, Heart and Head), a page for each type with a sidebar, and phone versions of each. Screenshots are saved in `figma/`.

**What I'll keep, because it works:**
- The warm paper look: cream background `#fff9ed`, brown ink `#4b3f1d`, soft gold for the selected state (`#faeed7` fill, `#b47b00` text) and dark brown for the sidebar.
- Wide-spaced Century Expanded headings over Garamond body text. It feels like the book.
- The top nav, where an underline marks the current page.
- The enneagram drawing on Home and Understand Your Type.
- Beings of Light (dark): a circle of light you move over dark text to read it. This is the strongest idea in the file.

**What I'd improve, from the player's side:**
1. **Too much reading before the first choice.** Three paragraphs of instructions come before you see a single option. I'd use one line ("Pick the paragraph that sounds most like you, most of your life") with "How to choose" folded underneath.
2. **One very long page.** Both groups (six paragraphs) are stacked on a page about 3,000px tall, so you can lose track of which group you're in. I'd show one group at a time, as step 1 of 3 and 2 of 3, with the TAS check as step 3.
3. **The selected answer is hard to see.** It's only a faint fill. I'd add a clear border, a mark, and a short "Selected" label.
4. **Centered body text.** Long centered paragraphs are slow to read. I'd left-align body text and keep only titles centered.
5. **Text mix-up in Figma.** The first paragraph in Group II repeats Group I's "responsible and dedicated" text. The real X paragraph ("positive outlook…") is missing. I'll use the correct text.
6. **"Show Results" has nowhere to go yet.** It will lead to the TAS check, then a result that links to that type's page.
7. **The back arrow floats** halfway down the left edge. I'd put it in a fixed spot next to the progress.
8. **Fonts.** Adobe Garamond Pro and Century Expanded are paid fonts. I'd use free web fonts that look very close (EB Garamond, and Old Standard TT for the headings) unless you have a web license.

## 4. Tech

- Plain HTML, CSS and JavaScript with no build step, like belief-web. It opens by double-clicking `index.html` and can be hosted anywhere static (GitHub Pages, Netlify).
- All text lives in `content/` as plain script files (not JSON), so the site still opens by double-clicking with no local server. Wording can change without touching code.
- Nothing is sent anywhere. Progress can be kept in the browser so a refresh doesn't lose answers.

## 5. File structure

```
enneagram-quiz/
  PLAN.md
  README.md
  index.html               one page; the menu switches sections without reloading
  content/
    book-questions.js      QUEST + TAS, transcribed (done)
    types.js               name, traits, triad, fear/desire, intro text per type (done)
    intro.js               Beings of Light text (done)
  src/
    main.js                starts the app, nav and routing (#home, #test, #type-5 ...)
    state.js               quiz answers, saved in the browser
    scoring.js             QUEST code -> type, TAS sum -> verdict
    pages/
      home.js
      light.js             Beings of Light: circle of light that follows the cursor or finger
      test.js              intro, quest, bridge, rate (one at a time), result
      understand.js        enneagram + Gut / Heart / Head
      type.js              one template for all 9 type pages, with sidebar
  styles/
    tokens.css             colors, type, spacing (from Figma)
    base.css
    nav.css                top nav and phone menu
    pages.css
  vendor/fonts/            EB Garamond + Old Standard TT, stored locally (free license)
  src/enneagram.js         the symbol, drawn as crisp SVG in code (lines draw in on first visit)
  figma/                   screenshots of the original design, for reference
  tests/
    scoring.test.html      checks all 9 codes and every score band (open in a browser)
    run.js                 same tests from the command line: node tests/run.js
    content.html           every text from the book on one page, for proofreading
```

## 6. Stages (check in after each)

1. **Content and scoring.** Data files, scoring logic and a test page that proves every code and band.
2. **Site shell.** Home, nav (desktop and phone menu), routing and the paper look, with fonts and colors from Figma.
3. **The quiz.** Welcome, QUEST one group at a time, bridge, TAS and result, with the improvements from 3b.
4. **Understand Your Type + type pages.** The enneagram, triads, one template for all 9 types with the sidebar, and links from the result.
5. **Beings of Light.** The dark page with the circle of light, by mouse on desktop and touch on phones.
6. **Polish.** Motion and transitions, phone layout, keyboard use and accessibility.
7. **Portfolio-ready.** Hosting, README or case-study notes, and the copyright choice.

## 7. Open questions for Mia

- **TAS layout.** Mia's call (2026-10-21): one statement at a time. The all-on-one-page layout and the switch were removed.
- **Copyright for a public link** (parked by Mia until later). The QUEST paragraphs and TAS statements are the book's text. They're fine for a private prototype. For a public portfolio, the options are: (a) keep the book's text and link to the book, which is a risk, (b) rewrite in your own words based on the book, or (c) show it publicly as a video or screenshots only.
