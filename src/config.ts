/**
 * Jedyne miejsce, w którym podmieniasz dane firmy.
 * Wszystkie wartości w {{...}} są placeholderami do uzupełnienia.
 */

export const FIRMA = {
  nazwa: 'ZDigital Bartłomiej Ząbek',
  nip: '5273231824',
  email: 'bartek@zabekdigital.pl',
} as const;

/**
 * Numer, pod którym odbiera agent. Jedyna wartość do podmiany —
 * wersja dla `href="tel:"` liczy się z niej sama.
 */
export const telefonAi = '123 456 789';
export const myPhone = '698 358 122';


/** Ten sam numer w E.164. Wyłącznie do atrybutu `href="tel:"`. */
export const telefonAiHref = `+48${telefonAi.replace(/\D/g, '')}`;

/** Właściciel — sekcja „Kim jestem”. */
export const WLASCICIEL = {
  imie: '{{IMIE_I_NAZWISKO}}',
  rola: '{{ROLA — np. założyciel}}',
  /** Ścieżka do zdjęcia w /public. Puste = widoczny placeholder na zdjęcie. */
  zdjecie: '',
  bio: '{{BIO — 2–3 zdania. Kim jesteś, skąd się tu wziąłeś, dlaczego akurat telefony.}}',
} as const;

/**
 * Prawdziwy fragment transkryptu rozmowy z agentem spod numeru demo.
 * Pusta tablica = na stronie widnieje placeholder {{TRANSKRYPT}}.
 * Uzupełnij realnym zapisem — nie wymyślonym.
 */
export type LiniaTranskryptu = {
  mowca: 'agent' | 'dzwoniacy';
  tekst: string;
};

export const TRANSKRYPT: LiniaTranskryptu[] = [];

/** Meta Pixel — wklej ID, żeby aktywować skrypt (ładuje się dopiero po zgodzie). */
export const META_PIXEL_ID = '';
