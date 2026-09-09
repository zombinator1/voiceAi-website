/**
 * Odbiera zgłoszenie z formularza i wysyła je mailem przez Lettermint.
 *
 * Funkcja istnieje z jednego powodu: token Letterminta nie może trafić do
 * przeglądarki. Strona jest statyczna, więc to jedyne miejsce po stronie
 * serwera, w którym wolno go użyć.
 *
 * Formularz wysyła się natywnie (bez JS), więc odpowiadamy przekierowaniem.
 */

/** Netlify Functions v2 — własna ścieżka zamiast /.netlify/functions/kontakt. */
export const config = { path: '/api/kontakt' };

const LIMITY = { imie: 100, telefon: 32, wiadomosc: 2000, zrodlo: 60 };

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (z) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]
  ));

const przekieruj = (url) => new Response(null, { status: 303, headers: { Location: url } });

const blad = (status, tekst) =>
  new Response(tekst, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

export default async (req) => {
  if (req.method !== 'POST') return blad(405, 'Tylko POST.');

  let dane;
  try {
    dane = await req.formData();
  } catch {
    return blad(400, 'Nieczytelne dane formularza.');
  }

  const pole = (n) => (dane.get(n) ?? '').toString().trim();

  // Pułapka na boty: wypełnione = odsyłamy jak przy sukcesie, żeby nie
  // podpowiadać skryptowi, że został rozpoznany. Nic nie wysyłamy.
  if (pole('bot-field')) return przekieruj('/dziekujemy');

  const imie = pole('imie');
  const telefon = pole('telefon');
  const wiadomosc = pole('wiadomosc');
  const zrodlo = pole('zrodlo').slice(0, LIMITY.zrodlo) || 'nieznane';

  // Zgoda jest warunkiem wysyłki, nie ozdobą. `required` w HTML zatrzymuje
  // przeglądarkę, ale nie curl-a ani bota — dlatego sprawdzamy to jeszcze raz.
  if (pole('zgoda') !== 'tak') {
    return blad(422, 'Bez zgody na kontakt i przetwarzanie danych nie wysyłamy zgłoszenia.');
  }
  if (!imie || imie.length > LIMITY.imie) return blad(422, 'Podaj imię.');
  if (!telefon || telefon.length > LIMITY.telefon) return blad(422, 'Podaj numer telefonu.');
  if ((telefon.match(/\d/g) || []).length < 9) return blad(422, 'Numer telefonu wygląda na niepełny.');
  if (wiadomosc.length > LIMITY.wiadomosc) return blad(422, 'Wiadomość jest za długa.');

  const token = process.env.LETTERMINT_TOKEN;
  const nadawca = process.env.LETTERMINT_FROM;
  const odbiorca = process.env.KONTAKT_ODBIORCA;
  if (!token || !nadawca || !odbiorca) {
    console.error('Brak konfiguracji: LETTERMINT_TOKEN / LETTERMINT_FROM / KONTAKT_ODBIORCA');
    return blad(500, 'Formularz jest chwilowo niedostępny.');
  }

  const kiedy = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });
  const wiersze = [
    ['Imię', imie],
    ['Telefon', telefon],
    ['Wiadomość', wiadomosc || '— (nie podano)'],
    ['Skąd', zrodlo],
    ['Kiedy', kiedy],
  ];

  const tekst = wiersze.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="border-collapse:collapse;font:15px/1.5 system-ui,sans-serif">
${wiersze
  .map(
    ([k, v]) =>
      `<tr><td style="color:#626962;vertical-align:top">${esc(k)}</td><td><strong>${esc(v).replace(/\n/g, '<br>')}</strong></td></tr>`,
  )
  .join('\n')}
</table>`;

  try {
    const odp = await fetch('https://api.lettermint.co/v1/send', {
      method: 'POST',
      headers: {
        'x-lettermint-token': token,
        'Content-Type': 'application/json',
      },
      // `to` i `reply_to` są tablicami — API odrzuca zwykły string.
      body: JSON.stringify({
        from: nadawca,
        to: [odbiorca],
        subject: `Nowy kontakt: ${imie} — ${telefon}`,
        text: tekst,
        html,
        metadata: { zrodlo },
      }),
    });

    if (!odp.ok) {
      console.error('Lettermint odrzucił wysyłkę:', odp.status, await odp.text());
      return blad(
        502,
        'Nie udało się wysłać zgłoszenia. Zadzwoń bezpośrednio — numer jest na stronie głównej.',
      );
    }
  } catch (e) {
    console.error('Lettermint nieosiągalny:', e);
    return blad(
      502,
      'Nie udało się wysłać zgłoszenia. Zadzwoń bezpośrednio — numer jest na stronie głównej.',
    );
  }

  return przekieruj('/dziekujemy');
};
