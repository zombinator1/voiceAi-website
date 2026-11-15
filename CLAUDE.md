# zabekdigital: sales one-pager

## Business
zabekdigital (Bartłomiej Ząbek, sole founder, programmer) builds and deploys **AI voice agents that answer phone calls** for small Polish businesses: dental/medical clinics, car workshops, law firms, installers (plumbing, electrical, HVAC), beauty and hair salons, real-estate offices.

- Problem we sell against: a missed call = a client who calls the competitor. They can't afford a full-time receptionist.
- Product: the agent answers 24/7, answers from the firm's knowledge base, collects contact details, emails a call summary. Setup = call forwarding, no operator or PBX change, reversible, live within 2 weeks.
- **Stage: just starting, one client so far: Specjaliści od Wody (Adrian).** His real testimonial (`OPINIA` in `src/config.ts`, published with consent) and the call recording are the only social proof. Never invent other testimonials, logos, client counts, statistics or studies. The other proof is the live demo agent on `telefonAi`.
- This repo is the landing page; its job is to get the visitor to **call the demo number** or **leave their number**.

Original brief with the full section-by-section reasoning: `prompt-claude-code.md`. Sales deck: `Każdy_wartościowy_telefon_powinien_dostać_odpowiedź.pptx`.

## Stack
Astro 7 + Tailwind 4 (via `@tailwindcss/vite`), `output: 'static'`, Netlify. No React or UI framework; JS only where unavoidable.

```bash
npm run dev      # localhost:4321
npm run build    # must pass before calling a change done
npm run preview
```

## Where things are
- `src/config.ts`: **the only place** for company data, phone numbers, owner bio, transcript, Meta Pixel ID. Never hardcode these in components.
  - `telefonAi` = demo agent number, used by every CTA. `myPhone` = private number, footer only, never in agent CTAs.
- `src/pages/index.astro`: section order. Each section is its own component in `src/components/`, file names prefixed with their position on the page (`01-Hero.astro`, `02-Opinia.astro`, ...). When adding, removing or reordering sections, renumber the files to match. Unnumbered files are shared pieces (`Header`, `Footer`, `Sekcja`, `LeadForm`, ...) or sections currently switched off (`DlaKogo`, `Proof`). `Sekcja.astro` is the shared section frame.
- `src/styles/global.css`: palette tokens and type scale. Use tokens (`centrala`, `arkusz`, `linia`, `notatka`, `sluchawka`, `nieodebrane`), never raw hex.
- Forms: `LeadForm.astro` posts natively (no JS) to `/api/kontakt` → `netlify/functions/kontakt.mjs` sends mail via Lettermint. Env: `LETTERMINT_TOKEN`, `LETTERMINT_FROM`, `KONTAKT_ODBIORCA` (set in Netlify, never committed). The README section on Netlify Forms is outdated.
- `src/pages/rodo*`: privacy policy pages.



## Design rules


## Working agreements


## Open items

