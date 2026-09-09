# Strona sprzedażowa — agenci głosowi AI

One-pager plus podstrona polityki prywatności. Astro + Tailwind, build statyczny, deploy na Netlify.

## Uruchomienie lokalnie

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build produkcyjny do dist/
npm run preview  # podgląd tego, co poleci na serwer
```

Wymagany Node 20 lub nowszy (build weryfikowany na 22 i 24).

---

## Co podmienić przed startem

Wszystkie dane firmy siedzą w jednym pliku: **`src/config.ts`**. Nigdzie indziej nie są wpisane na sztywno.

| Placeholder | Gdzie widoczny | Co wpisać |
|---|---|---|
| `{{NAZWA_FIRMY}}` | header, stopka, tytuł zakładki | nazwa firmy |
| `{{NIP}}` | stopka, polityka prywatności | NIP |
| `{{EMAIL}}` | stopka, polityka prywatności | adres e-mail |
| `DEMO.wyswietlany` / `DEMO.tel` | hero, header, pasek mobilny, CTA | numer demo — **dwa pola**, patrz niżej |
| `{{IMIE_I_NAZWISKO}}`, `{{ROLA}}`, `{{BIO}}` | sekcja „Kto odbierze” | dane właściciela |
| `WLASCICIEL.zdjecie` | sekcja „Kto odbierze” | ścieżka do zdjęcia |
| `TRANSKRYPT` | sekcja „Nie mam logotypów” | prawdziwy fragment rozmowy |
| `{{TREŚĆ POLITYKI PRYWATNOŚCI}}` | `/polityka-prywatnosci` | treść od prawnika |

### Numer demo

Dwa osobne pola, bo służą do czego innego:

```ts
export const DEMO = {
  wyswietlany: '221 811 286',   // to widzi człowiek
  tel: '+48221811286',          // to trafia do href="tel:", bez spacji, z prefiksem kraju
};
```

Obecnie wpisany jest `123 456 789`. Podmień **obie** wartości.

### Zdjęcie właściciela

Wrzuć plik do `public/` (np. `public/wlasciciel.jpg`) i ustaw `WLASCICIEL.zdjecie = '/wlasciciel.jpg'`.
Proporcje 4:5 w pionie, minimum 480×600 px. Dopóki pole jest puste, w tym miejscu widnieje ramka z opisem.

### Transkrypt rozmowy

Dopóki tablica `TRANSKRYPT` jest pusta, na stronie widnieje placeholder. Uzupełnij realnym zapisem:

```ts
export const TRANSKRYPT: LiniaTranskryptu[] = [
  { mowca: 'dzwoniacy', tekst: 'Dzień dobry, chciałbym zapytać o…' },
  { mowca: 'agent',     tekst: '…' },
];
```

### Polityka prywatności

Treść wkleja się w `src/pages/polityka-prywatnosci.astro`, w miejsce bloku z placeholderem, wewnątrz
`<div class="tresc-polityki">`. Nagłówki `h2`/`h3`, akapity, listy, linki i tabele są już ostylowane
pod resztę strony — czysty HTML od prawnika wystarczy wkleić bez dodawania klas.

---

## Deploy na Netlify

W repozytorium leży `netlify.toml` z gotową konfiguracją (`npm run build` → katalog `dist`),
więc w panelu nic nie trzeba ustawiać ręcznie.

### Przez GitHub (zalecane)

1. Wypchnij repozytorium na GitHub.
2. Netlify → **Add new site** → **Import an existing project** → wskaż repozytorium.
3. Build command i publish directory zaciągną się z `netlify.toml`. Kliknij **Deploy**.

Każdy push na główną gałąź uruchamia nowy deploy.

### Przez CLI

```bash
npm i -g netlify-cli
netlify login
netlify init      # jednorazowo, podłącza katalog do strony
npm run build
netlify deploy --prod
```

### Domena i HTTPS

Netlify → **Domain management** → **Add a domain**, potem ustaw rekordy DNS u swojego rejestratora
zgodnie z instrukcją na ekranie. Certyfikat HTTPS wystawia się automatycznie po propagacji DNS.

---

## Formularze

Na stronie są dwa formularze — w hero i w sekcji końcowej — oba pod jedną nazwą `kontakt`,
więc zgłoszenia wpadają do jednej skrzynki. Ukryte pole `zrodlo` mówi, z której sekcji przyszło
(`hero` albo `cta-koncowe`).

Formularze są zwykłym `<form>` w pliku `.astro`, nie komponentem interaktywnym — Netlify wykrywa je
przy buildzie, skanując statyczny HTML. Ochronę przed botami zapewnia honeypot (`netlify-honeypot="bot-field"`),
bez captchy.

**Po pierwszym deployu:**

1. Netlify → **Forms** → powinien pojawić się formularz `kontakt`. Jeśli go nie ma, wyślij testowe
   zgłoszenie z opublikowanej strony — wykrywanie działa tylko na produkcyjnym HTML.
2. **Forms → Settings → Form notifications** → dodaj powiadomienie e-mail, inaczej zgłoszenia będą
   tylko leżeć w panelu.

Po wysłaniu formularz przekierowuje na `/dziekujemy`.

---

## Cookies i Meta Pixel

Baner zgody jest własny, bez zewnętrznych bibliotek. Wybór zapisuje się w `localStorage`
pod kluczem `zgoda-cookies`. Wycofać zgodę można linkiem **Ustawienia cookies** w stopce.

Skrypty śledzące uruchamiają się dopiero po zgodzie. Żeby podpiąć Meta Pixel:

1. Wpisz `META_PIXEL_ID` w `src/config.ts`.
2. Odkomentuj blok oznaczony `MIEJSCE NA META PIXEL` w `src/components/CookieBanner.astro`.

Dopóki `META_PIXEL_ID` jest puste, żaden skrypt się nie ładuje — nawet po kliknięciu „Zgadzam się”.

---

## Fonty

Archivo (nagłówki), IBM Plex Sans (tekst), IBM Plex Mono (znaczniki czasu, numery, transkrypt).

Pobierane i hostowane lokalnie przez wbudowane Fonts API Astro — przeglądarka użytkownika **nie łączy
się z serwerami Google**, co upraszcza sprawę od strony RODO. Pliki `.woff2` powstają przy buildzie
i lądują w `dist/_astro/fonts/`. Build wymaga dostępu do sieci (Netlify go ma).

Wszystkie trzy kroje mają komplet polskich znaków diakrytycznych w podzbiorach `latin` + `latin-ext`.

---

## Struktura

```
src/
  config.ts                  ← wszystkie dane do podmiany
  layouts/Base.astro         ← <head>, fonty, header, stopka, baner cookies
  components/
    Header.astro             sticky header z numerem
    MobilnyPasek.astro       zielony pasek połączenia przy dolnej krawędzi (tylko mobile)
    Hero.astro
    RejestrPolaczen.astro    wykaz połączeń + numer demo
    LeadForm.astro           formularz Netlify (używany dwa razy)
    Sekcja.astro             wspólna ramka sekcji z numeracją
    Problem.astro, DlaKogo.astro, JakToDziala.astro, Proof.astro,
    Oferta.astro, BezRyzyka.astro, Faq.astro, KimJestem.astro,
    CtaKoncowe.astro, Footer.astro, CookieBanner.astro
  pages/
    index.astro
    polityka-prywatnosci.astro
    dziekujemy.astro         ← strona po wysłaniu formularza
  styles/global.css          ← paleta, skala typograficzna, focus, reduced-motion
```

### Paleta

Zdefiniowana raz, w `src/styles/global.css`:

| Token | Hex | Rola |
|---|---|---|
| `centrala` | `#16212b` | atrament: tekst i ciemne pasy |
| `arkusz` | `#f1f2f0` | tło strony |
| `arkusz-glebszy` | `#e7e8e5` | wydzielone bloki |
| `linia` | `#d4d7d3` | linie i obramowania |
| `notatka` | `#626962` | metadane, znaczniki czasu |
| `sluchawka` | `#12704a` | zieleń „odbierz” — wyłącznie `tel:` i przyciski wysyłki |
| `nieodebrane` | `#b62e26` | czerwień nieodebranego — wyłącznie sekcja Problem i wykaz |

Zieleń i czerwień niosą znaczenie, nie dekorację. Status połączenia zawsze towarzyszy słowu
(`nieodebrane` / `odebrane`), nigdy nie jest niesiony samym kolorem — czerwony i zielony to najgorsza
możliwa para przy daltonizmie.
