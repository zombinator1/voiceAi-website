/**
 * Jedyne miejsce, w którym podmieniasz dane firmy.
 * Wszystkie wartości w {{...}} są placeholderami do uzupełnienia.
 */

import profilowe from './assets/profilowe.jpg';

export const FIRMA = {
  nazwa: 'ZDigital Bartłomiej Ząbek',
  nip: '5273231824',
  email: 'bartek@zabekdigital.pl',
} as const;

/** Numer zapisany „po ludzku” → E.164 do atrybutu `href="tel:"`. */
const doHref = (numer: string) => `+48${numer.replace(/\D/g, '')}`;

/** Numer, pod którym odbiera agent. Wszystkie CTA na stronie. */
export const telefonAi = '123 456 789';
export const telefonAiHref = doHref(telefonAi);

/** Numer prywatny — kontakt bezpośredni w stopce. Nie trafia do CTA agenta. */
export const myPhone = '698 358 122';
export const myPhoneHref = doHref(myPhone);

/** Właściciel — sekcja „Kim jestem”. */
export const WLASCICIEL = {
  imie: '{{IMIE_I_NAZWISKO}}',
  rola: 'Założyciel',
  /**
   * Portret z `src/assets` — importowany, nie jako ścieżka tekstowa.
   * Dzięki temu Astro przy buildzie przeskaluje go i wyda w WebP.
   * `null` = widoczny placeholder na zdjęcie.
   */
  zdjecie: profilowe,
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
