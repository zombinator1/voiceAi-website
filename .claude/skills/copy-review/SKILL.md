---
name: copy-review
description: Review or rewrite Polish sales copy on the landing page against the project's copy rules. Use when asked to check, improve or write text for a section (Hero, Problem, Oferta, FAQ, etc.).
---

# Copy review

1. Read `CLAUDE.md` (Business + Copy rules) and the target component(s). If needed, read the matching section in `prompt-claude-code.md` for what that section is supposed to do.
2. Check each piece of text against:
   - **Truthfulness:** no invented clients, testimonials, logos, statistics or studies. Flag any claim we can't back up.
   - **Problem-first:** speaks about missed calls and lost clients, not about AI or technology.
   - **Reader:** a busy, non-technical owner (dentist, mechanic, plumber). Would they understand it in 3 seconds? Is it informal "Ty", first person from Bartek?
   - **Objections:** does the section remove a fear (changing operator, cost, risk, "a robot will scare my clients")?
   - **One goal:** does it lead toward calling the demo number or leaving a number?
   - **Polish:** grammar, diacritics, `„…”` quotes, `—` dashes, no calques from English marketing.
   - **Consistency:** facts (timelines, prices, what's included) match other sections and `src/config.ts`.
3. Report findings as a short list: quote → problem → proposed Polish rewrite.
4. Don't edit files unless the user asked for edits; when editing, change only text, not markup or classes.
