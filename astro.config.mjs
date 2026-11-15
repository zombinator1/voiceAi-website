// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  site: 'https://example.netlify.app',
  vite: {
    plugins: [tailwindcss()],
    server: {
      /* Tunele ngrok — bez tego Vite odrzuca żądania z obcego hosta. */
      allowedHosts: ['.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
    },
  },
  fonts: [
    /* Nagłówki: szeryf wydawniczy, ciepły. Jedna waga + kursywa wystarczą. */
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-fraunces',
      weights: [400, 500],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
    /* Tekst i interfejs. */
    {
      provider: fontProviders.google(),
      name: 'Geist',
      cssVariable: '--font-geist',
      weights: [400, 500, 600],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
    /* Etykiety maszynowe, numery, znaczniki czasu. */
    {
      provider: fontProviders.google(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-plex-mono',
      weights: [400, 500],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
    },
  ],
});
