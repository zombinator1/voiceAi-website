# PROMPT DO CLAUDE CODE

*(wklej wszystko poniżej linii)*

---

Zbuduj jednostronicową stronę sprzedażową (one-pager) dla agencji wdrażającej agentów głosowych AI dla małych i średnich firm w Polsce. Plus osobną podstronę na politykę prywatności.

## STACK

- **Astro** (najnowsza wersja), TypeScript
- **Tailwind CSS**
- Statyczny build (`output: 'static'`), deploy na **Netlify**
- Bez Reacta i bez żadnego frameworka UI — to strona statyczna, JS tylko tam, gdzie naprawdę potrzebny
- Formularz jako **czysty `<form>` w pliku `.astro`** z `data-netlify="true"` i `netlify-honeypot` — NIE w komponencie interaktywnym, bo Netlify nie wykryje go przy buildzie
- Struktura: sekcje jako osobne komponenty `.astro` w `src/components/`

## KONTEKST BIZNESOWY

Firma buduje i wdraża agentów głosowych AI, którzy odbierają telefony w małych firmach. Klient docelowy: gabinety stomatologiczne i lekarskie, warsztaty samochodowe, kancelarie prawne, firmy instalacyjne (hydraulicy, elektrycy, klimatyzacja), salony kosmetyczne i fryzjerskie, biura nieruchomości.

Ich problem: tracą pieniądze na nieodebranych telefonach. Właściciel jest u klienta albo przy pacjencie, telefon dzwoni, nikt nie odbiera, klient dzwoni do konkurencji. Nie stać ich na recepcjonistkę na etacie.

Rozwiązanie: agent AI odbiera każdy telefon 24/7, odpowiada na pytania na podstawie bazy wiedzy firmy, zbiera dane kontaktowe i wysyła podsumowanie rozmowy mailem.

**Firma dopiero startuje — nie ma jeszcze klientów ani case studies.** To nie jest do ukrycia, tylko do rozegrania uczciwie (patrz sekcje Proof i Bez ryzyka).

## KIERUNEK WIZUALNY — NAJWAŻNIEJSZA CZĘŚĆ BRIEFU

Strona **nie może wyglądać jak wygenerowana przez AI**. To wymaganie krytyczne, ważniejsze niż jakiekolwiek inne.

**Bezwzględnie zakazane:**
- Gradienty jako dekoracja, glassmorphism, poświaty, blury, neonowe akcenty
- Abstrakcyjne kule, fale, siatki, „AI-owe" grafiki, generyczne obrazki stockowe
- Sekcje zbudowane z trzech identycznych kafelków z ikonką + nagłówkiem + dwoma zdaniami
- Ikony wstawiane przy każdym punkcie listy „bo pusto"
- Font Inter użyty do wszystkiego
- Animacje wjeżdżające przy scrollu przy każdej sekcji
- Emoji w interfejsie
- Te trzy skompromitowane palety AI: (1) kremowe tło + kontrastowa szeryfowa + terakotowy akcent, (2) prawie-czarne tło + kwaśna zieleń lub cynober, (3) gazetowy layout z włosowymi liniami i zerowym border-radius

**Czego oczekuję zamiast tego:**

Zanim napiszesz kod, **zaproponuj krótki plan projektu** i pokaż mi go: paleta jako 4–6 nazwanych wartości hex, dwa kroje pisma z konkretnym uzasadnieniem, koncepcja layoutu opisana zdaniem, oraz **jeden element sygnaturowy** — rzecz, po której tę stronę się zapamięta. Potem sam skrytykuj ten plan: gdyby ktoś dał Ci brief „strona dla agencji AI", czy wyszedłbyś w tym samym miejscu? Jeśli tak — zmień to i powiedz dlaczego.

Zakotwicz estetykę w świecie telefonii, nie w świecie AI. Materiał do wykorzystania: sam akt rozmowy, transkrypt, log połączeń, wyświetlacz telefonu, nieodebrane połączenie. To jest źródło konkretnych decyzji zamiast generycznych.

**Typografia:** dobierz krój z charakterem do nagłówków i neutralny do tekstu. **KRYTYCZNE: oba muszą mieć pełne polskie znaki diakrytyczne** (ą ć ę ł ń ó ś ź ż) — sprawdź to przed wyborem, wiele krojów displayowych ich nie ma. Ustaw wyraźną skalę typograficzną.

**Element sygnaturowy** — moja propozycja, możesz zaproponować lepszą: numer telefonu demo potraktowany jako główny bohater strony, wyeksponowany jak coś, w co się naprawdę klika i dzwoni, a nie jak zwykły link. Może towarzyszyć mu prawdziwy fragment transkryptu rozmowy z agentem.

Śmiałość wydaj w jednym miejscu. Wszystko dookoła ma być ciche i zdyscyplinowane. Podłoga jakości bez ogłaszania jej: responsywność do 360px, widoczny focus klawiatury, `prefers-reduced-motion`.

## STRUKTURA STRONY GŁÓWNEJ

### 1. Sticky header
Nazwa firmy + numer demo jako element klikalny (`tel:`), widoczny na każdej wysokości scrolla. Na mobile numer musi być kciukiem osiągalny.

### 2. Hero
- Nagłówek uderzający w problem, nie w technologię. Nie zaczynaj od „Sztuczna inteligencja..." — zacznij od nieodebranego telefonu.
- Podtytuł: jedno zdanie, co to jest.
- **Numer demo: 123 456 789** z zaproszeniem: zadzwoń teraz i porozmawiaj z agentem. Podkreśl, że to nie nagranie ani wideo — to działający agent, który odbiera telefony tej firmy.
- Formularz „Zostaw numer, oddzwonię" — dwa pola (imię, telefon) + checkbox zgody RODO z linkiem do polityki prywatności.

### 3. Problem
Nieodebrany telefon to utracony klient. Pokaż to konkretnie i policzalnie, w rachunku, który właściciel małej firmy zrobi sobie w głowie w trzy sekundy. Bez straszenia i bez pustych statystyk — nie wymyślaj żadnych danych ani badań, których nie mam.

### 4. Dla kogo
Konkretne branże wymienione z nazwy: gabinety stomatologiczne i lekarskie, warsztaty samochodowe, kancelarie prawne, firmy instalacyjne, salony kosmetyczne i fryzjerskie, biura nieruchomości. Cel: żeby czytający rozpoznał siebie. Nie rób z tego siatki identycznych kafelków z ikonkami.

### 5. Jak to działa — 3 kroki
1. **Rozmawiam** — poznaję firmę, pytania klientów, sposób obsługi telefonu
2. **Buduję agenta** — bazę wiedzy i scenariusz rozmowy pod konkretną firmę
3. **Przekierowujesz numer** — bez zmiany operatora i bez wymiany centrali; przekierowanie cofniesz w każdej chwili

Punkt 3 rozwiej wprost — największa obawa klienta to „będę musiał coś wymieniać w firmie".

### 6. Proof
**Firma nie ma jeszcze klientów. Nie wymyślaj opinii, logotypów, liczb ani „zaufali nam".** Jedyny uczciwy dowód to działający agent pod numerem demo — i to jest mocniejszy argument niż cudze cytaty. Sformułuj to mniej więcej tak: *„Nie pokażę Ci logotypów firm, bo dopiero startuję. Pokażę Ci działającego agenta — odbiera telefony mojej własnej firmy. Zadzwoń i oceń sam."* Ta szczerość ma być atutem, nie przeprosinami.

### 7. Oferta — dwa kafelki
Nad kafelkami pasek: **„Program pilotażowy — 5 miejsc"** z krótkim wyjaśnieniem, że firma startuje i szuka pierwszych klientów na preferencyjnych warunkach w zamian za szczerą opinię i zgodę na opisanie efektów.

**Kafelek 1 — Standard** (wyróżniony)
- 500 zł / miesiąc
- Bez opłaty wdrożeniowej
- 300 minut rozmów w cenie (około 100 telefonów)
- Powyżej limitu: 1,50 zł za minutę
- Podsumowanie każdej rozmowy na e-mail
- Aktualizacje bazy wiedzy

**Kafelek 2 — Wycena indywidualna**
- Dla firm z większym ruchem, kilkoma numerami lub integracją z CRM albo kalendarzem
- Dedykowany zakres i czas reakcji

### 8. Bez ryzyka
To jest najważniejsza sekcja perswazyjna na tej stronie, bo zastępuje brakujący proof. Ma nieść ciężar, więc nie rób z niej listy odhaczonych ptaszków.
- 30 dni gwarancji zwrotu pieniędzy, bez pytań
- Bez długich umów — minimum 3 miesiące, potem wypowiedzenie w dowolnym momencie
- Bez zmiany operatora i bez wymiany sprzętu — samo przekierowanie numeru, odwracalne w minutę
- Zgodność z RODO — dane przetwarzane zgodnie z przepisami, umowa powierzenia
- Dzwoniący jest informowany, że rozmawia z asystentem AI

### 9. FAQ
Rozwiń te pytania (odpowiedzi krótkie, konkretne, bez marketingowego lania wody):
- Czy dzwoniący pozna, że to nie człowiek?
- Co się stanie, jeśli agent nie będzie znał odpowiedzi?
- Czy muszę zmieniać operatora albo centralę telefoniczną?
- Jak długo trwa wdrożenie?
- Czy agent umie umawiać wizyty?
- Co z RODO i nagrywaniem rozmów?
- Czy mogę zrezygnować?
- Czy agent mówi po polsku naturalnie?
- Co jeśli dzwoniący chce rozmawiać z człowiekiem?

Zaznacz jasno: agent nie diagnozuje, nie doradza specjalistycznie i nie zastępuje eksperta — zbiera sprawę i przekazuje ją zespołowi.

### 10. Kim jestem
Miejsce na zdjęcie i imię właściciela plus 2–3 zdania. W polskim SMB kupuje się od człowieka, nie od marki. Zostaw wyraźny placeholder na zdjęcie i tekst.

### 11. CTA końcowe
Powtórzony formularz i numer demo. To ostatnia szansa strony, więc nie może być słabszy niż hero.

### 12. Stopka
Nazwa firmy, NIP, adres e-mail, link do polityki prywatności. Zostaw placeholdery `{{NAZWA_FIRMY}}`, `{{NIP}}`, `{{EMAIL}}`.

## PODSTRONA /polityka-prywatnosci

**Nie pisz treści polityki** — dostarczy ją prawnik. Zbuduj samą podstronę: layout, typografia dopasowana do reszty, powrót na stronę główną, i wyraźny placeholder `{{TREŚĆ POLITYKI PRYWATNOŚCI — DO UZUPEŁNIENIA PRZEZ PRAWNIKA}}`.

## COOKIES

Prosty baner zgody na cookies (będzie Meta Pixel). Bez zewnętrznych bibliotek — własny, minimalny, z zapisem wyboru w localStorage. Skrypty śledzące ładują się dopiero po zgodzie. Zostaw zakomentowane miejsce na Pixel.

## COPY — ZASADY

Tekst napisz sam, po polsku, i traktuj go tak samo poważnie jak design, bo slop poznaje się po tekście szybciej niż po wyglądzie.

- Formalnie, ale po ludzku. Bez korporacyjnego żargonu.
- **Zakazane frazy:** „rewolucjonizujemy", „innowacyjne rozwiązanie", „moc sztucznej inteligencji", „przenieś swój biznes na wyższy poziom", „w dzisiejszym dynamicznym świecie", „nasze zaawansowane algorytmy".
- Mów o pieniądzach i telefonach klienta, nie o technologii.
- Konkret zamiast ogólnika. „Odbiera telefon o 21:00 w sobotę" bije „dostępny 24/7".
- **Nie wymyślaj żadnych statystyk, badań, procentów ani opinii klientów.** Zero danych, których nie ma w tym briefie.
- Czasownik czynny, zdania krótkie.

## NA KONIEC

Sprawdź: build przechodzi, polskie znaki renderują się poprawnie we wszystkich krojach, formularz jest widoczny w statycznym HTML w `dist/`, strona działa na 360px szerokości, focus klawiatury jest widoczny. Dodaj `README.md` z instrukcją deploya na Netlify.
