# Berichten & notificaties – hoe richt je dat in als organisator?

## Huidige staat (v0.4)
- **Notificaties werken nog niet.** De knop "Zet meldingen aan" slaat alleen een voorkeur op in de telefoon. Er wordt niets verstuurd.
- **Berichten** komen uit een vast bestand in de code (`src/data/messages.ts`). Wijzigen = code aanpassen + pushen.

## Doel
Jij (of een collega) typt een bericht in een beheeromgeving → het verschijnt in de app bij alle (of een deel van de) gebruikers, en optioneel als push-notificatie op het toestel.

## Aanbevolen opzet (goedkoop, snel, geen developer per bericht)

| Laag | Tool | Wat het doet | Kosten |
|---|---|---|---|
| **Berichten-CMS** | Supabase (tabel `messages`) of Airtable/Google Sheet | Jij vult: tekst, type (tekst/foto/poll/link), toernooi, verzendmoment, doelgroep. App haalt elke minuut de lijst op. | Gratis tier volstaat |
| **Push** | OneSignal (Web Push voor PWA) | Dashboard: schrijf bericht → kies segment (bv. "gaat naar World Cup") → verstuur of plan in. Werkt op Android en op iPhone zodra de app op het beginscherm staat (iOS 16.4+). | Gratis tot 10k abonnees |
| **Segmentatie** | Tags vanuit de app naar OneSignal: gekozen toernooien, reisvoorkeur (poll), push-aan | Zo stuur je parkeerinfo alleen naar automobilisten | – |
| **Automatische flow** | OneSignal Journeys of n8n/Make | "3 dagen voor toernooi X → bericht Y naar iedereen die X gekozen heeft" | – |

Werkproces voor jou:
1. Open het OneSignal-dashboard (of de Supabase-tabel).
2. Nieuw bericht: titel, tekst, eventueel foto/link/poll, doelgroep, moment.
3. Versturen of inplannen. Klaar — geen developer nodig.

Alternatieven:
- **White-label CLOSE**: alles hierboven kant-en-klaar incl. flow-builder en ticketkoppeling, maar licentiekosten en minder eigen controle.
- **Native app + Firebase**: nodig als je ook iPhone-gebruikers wilt bereiken die de app níét op hun beginscherm zetten.

Bouwtijd indicatie: Supabase + OneSignal koppelen in de app ≈ 1–2 dagen werk.

## Contact / vragen die de app niet kent
Voorstel (nog niet gebouwd): een "Stel je vraag"-formulier in Berichten en onder Meer.
- Velden: naam, e-mail, toernooi (keuze), vraag.
- Verzending naar **schaatsen@houseofsports.nl** via een formulierdienst (Web3Forms of Formspree, gratis; of direct via Brevo/Zendesk zodat het in de klantenservice-inbox landt).
- Bevestiging in de app ("We antwoorden binnen 1 werkdag") + automatische reply.
- Later: eerst FAQ-suggesties tonen op basis van de vraag, pas daarna versturen (scheelt mail).
Bouwtijd ≈ halve dag.
