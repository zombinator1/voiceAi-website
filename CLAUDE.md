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
Kierunek: **„luksusowy papier”**. Jasna, wydawnicza strona z jedną ciemną sceną w hero i jedną na końcu. Nie robimy ciemnych gradientów, szkła ani fioletów „AI startup”.

- **Fonty**: `Fraunces` (h1, h2, duże liczby, numer demo; waga 400/500, kursywa do akcentów), `Geist` (tekst, h3, przyciski), `IBM Plex Mono` (klasa `.maszynowa`: etykiety, numeracja, znaczniki czasu). Nic mniejszego od h2 nie jest szeryfowe.
- **Powierzchnie**: trzy poziomy papieru: `arkusz-glebszy` (pasy), `arkusz` (tło), `arkusz-jasny` (kartka leżąca na papierze, zawsze z `shadow-kartka`). Ciemne sceny: `noc` z `shadow-scena`. Cienie tylko miękkie, z tokenów; żadnych twardych offsetów.
- **Kształty**: `rounded-[3px]` na kartkach, przyciskach i polach. Okrągłe są tylko kropki statusu i ikonowe przyciski play/strzałka.
- **Układ sekcji** (`Sekcja.astro`): domyślnie `boczny` (numer + tytuł w lewej kolumnie 5/12, przyklejone; treść w prawej 7/12). `pelny` dla szerokiej treści (diagramy, siatki). Hero i CTA końcowe mają własne układy w tej samej siatce.
- **Zieleń** `sluchawka` wyłącznie na `tel:` i submit; na ciemnym tle jej odpowiednik to `sluchawka-swiatlo` (wskaźniki, fala, hover). `nieodebrane` wyłącznie w sekcji Problem i kropce w hero.
- **Ruch**: tylko w hero (`ZywaRozmowa.astro`) i w odtwarzaczu; wszystko respektuje `prefers-reduced-motion` i działa bez JS (pokazuje stan końcowy).
- **Media**: poster filmu i fala nagrania są lokalne (`src/assets/poster-kalendarz.jpg`, `src/fala-nagrania.json`), żeby przeglądarka nie łączyła się z Google/YouTube przed kliknięciem. Nowe nagranie = przelicz falę: `ffmpeg -i plik.mp3 -ac 1 -ar 8000 -f s16le - | python3` (96 szczytów RMS, znormalizowane 0..1).
- **Zrzuty do oceny**: `npm run build && npx astro preview --port 4399`, potem headless Chrome (narzędzie do zrzutów w scratchpadzie sesji); folder `.zrzuty/` jest w `.gitignore`.
- **Node**: projekt wymaga Node ≥ 20 (`nvm use 24`); systemowy Node 10 nie zbuduje Astro.


## Working agreements


## Open items

