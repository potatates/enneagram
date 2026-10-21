# Case study notes: The Wisdom of the Enneagram

Notes for the portfolio write-up. They cover what changed between the Figma design and the built site, and why. Each point is from the reader's side. Before-and-after images are in `screenshots/before-after/`.

## The brief

Turn a book into a website that helps people find their Enneagram type, using the book's own two-step method: a quick test, then a check. Start from my Figma design, and improve it.

## What stayed

- The feel of the book: warm paper, brown ink, wide-spaced serif headings and Garamond text.
- The enneagram as the center of the site, on Home and on Understand Your Type.
- The three-part top nav, where an underline marks the current page.
- The dark sidebar on the type pages, and the dark slide-in menu on phones.
- Beings of Light: the preface you read by a circle of light.

## What changed, and why

**1. The test asks before it explains.**
The Figma page opened with three paragraphs of rules before the first choice. Now there's one line ("Two quick choices point to your likely type. Then fifteen short statements check it."), a time estimate, and the rules folded under "How to choose".

**2. One decision per screen.**
Six long paragraphs on one 3,000px page made it easy to lose your place. Each group now has its own screen, with a three-step progress row (Quick test I, Quick test II, Check) and a Back link.

**3. You can see what you chose.**
The selected state was a faint fill. Now each option has an A/B/C mark that turns into a gold check, a stronger border, and a "Selected" label.

**4. Left-aligned reading.**
Long centered paragraphs are slow to read. Body text is now left-aligned, and only titles are centered.

**5. "Show Results" leads somewhere honest.**
The book says the quick test is right about 70 percent of the time, so the site doesn't stop there. A bridge screen names the likely type, then 15 statements check it. The result shows the score on the book's bands and says plainly whether the two tests agree. If they don't, the result says so and invites you to check any other type.

**6. No bias while rating.**
While you rate the statements, the page doesn't say which type they belong to, so the type name can't sway your answers.

**7. One statement at a time.**
I built two ways to rate the statements and tested both. *All on one page* was quicker to scan. *One at a time* was calmer and more focused, so I kept it. Each answer moves on by itself after a beat, keys 1 to 5 work, and Previous lets you go back.

**8. Beings of Light explains itself.**
The flame now has a label ("Turn off the light"). In the dark, the light drifts across the first lines by itself so you see what it does, and a one-line hint shows until you move. On phones the flame sits where your thumb is, and you drag a finger to read.

**9. Every page connects back to the quiz.**
- Understand Your Type marks your result.
- Each type page shows your score for that type, or offers to check you against it.
- Pointing at a type lights its point on the circle.

**10. A way home and a reason to start.**
Home gained a "Find your type" button and a time estimate. The desktop nav gained a small enneagram mark that leads back Home.

**11. Readable for everyone.**
Gray and small gold text were darkened slightly to pass contrast checks. The gold from the design stays for fills and large type. Every page passes an automated accessibility check on desktop and phone, and the whole quiz works by keyboard.

## Details worth showing

- The symbol is drawn in code as sharp vector lines that draw themselves in on the first visit.
- The quiz remembers where you were, so a refresh or a closed tab doesn't lose your answers.
- A text mix-up in the Figma file (Group II repeated a Group I paragraph) is fixed, and a test guards against it.
