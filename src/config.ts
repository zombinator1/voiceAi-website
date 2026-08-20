/**
 * Jedyne miejsce, w którym podmieniasz dane firmy.
 * Wszystkie wartości w {{...}} są placeholderami do uzupełnienia.
 */

export const FIRMA = {
  nazwa: '{{NAZWA_FIRMY}}',
  nip: '{{NIP}}',
  email: '{{EMAIL}}',
} as const;

/**
 * Numer demo. `wyswietlany` trafia do treści strony, `tel` do atrybutu href.
 * Po otrzymaniu prawdziwego numeru podmień obie wartości.
 */
export const DEMO = {
  wyswietlany: '123 456 789',
  tel: '+48123456789',
} as const;

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
