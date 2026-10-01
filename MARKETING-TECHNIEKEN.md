# Marketing- en conversietechnieken in de app

> **Status v0.3:** alle signalen zonder geverifieerde bron zijn uit de app gehaald (early-bird, schaarste, fan-aantallen, badges, keuzeladder, oude campagnecijfers). De componenten bestaan nog in `src/components/ui.tsx` (`SocialProof`, `Urgency`, `Badge`, `MiniCountdown`) en gaan pas aan zodra de velden in `src/data/tournaments.ts` met echte data gevuld zijn. Onderstaande tabel is het plan, niet de huidige staat.

Gebaseerd op Cialdini (*Influence*), Wouters & Groen (*Online Invloed* / Fogg-model), Brunson (*DotCom Secrets*: value ladder, hook-story-offer) en het rapport *De Staat van Marketing 2025-2026* (first-party data, community-first, UGC > polish). Plus de campagnesite magievanschaatsen.nl.

| # | Principe | Waar in de app | Status |
|---|---|---|---|
| 1 | **Sociale bewijskracht** (Cialdini) | Stats op startscherm (>83.000 bezoekers, 8,9/10); "[x] fans gaan al" op elke kaart; testimonials van schaatsers én fans; "Populairste keuze"-badge | Cijfers per toernooi zijn placeholders `[ ]` → koppelen aan ticketshop |
| 2 | **Schaarste** | "Zaterdag bijna uitverkocht", "Zondag: nog [x]% beschikbaar" | Alleen gebruiken als het wáár is (ethiek + vertrouwen). Bron: live voorraad |
| 3 | **Urgentie / loss aversion** | Early-bird countdown ("prijs nog t/m …"); loss-frame per toernooi ("De enige World Cup in Nederland dit seizoen") | Early-bird-data aanleveren |
| 4 | **Commitment & consistentie** | Onboarding = kleine eerste keuze (baby-step); "Jouw seizoen 2 van 5" progress bar; "maak je seizoen compleet" (unfinished journey) | Werkt |
| 5 | **Wederkerigheid** | Eerst gratis waarde (programma, route, plattegrond, countdown) vóór de vraag (e-mail, push, tickets); e-mailaanmelding geeft iets terug (pre-sale 24 u eerder) | Pre-sale-belofte bevestigen |
| 6 | **Autoriteit** | "Officieel kanaal" / "Officiële ticketshop · schaatsen.nl"; quotes van Nuis, Leerdam, Huizinga | Logo's KNSB/Schaatsen.nl toevoegen |
| 7 | **Sympathie & eenheid** | Je-vorm, warme toon, "Samen naar Thialf", deel-knop (Web Share) voor vrienden; #MVS-community | UGC-moment toevoegen (foto's uit Thialf) |
| 8 | **Prompt op het juiste moment** (Fogg) | Push-opt-in pas ná onboarding, met reden-waarom en verwachting ("3 berichten per toernooi"); berichten komen één voor één binnen | Echte push-techniek nodig |
| 9 | **Ability / frictie weg** | Eén primaire CTA per scherm; geen account; sticky ticketknop op detailpagina; directe deep link naar shop | Later: deep link naar juiste sessie/vak |
| 10 | **Anchoring / Hobson+1 / decoy** | "Kies je plek": Tribune – Beste zicht (★ meest gekozen) – Lounge; middenoptie uitgelicht | Prijzen aanleveren |
| 11 | **Value ladder** (Brunson) | Gratis app → ticket → beste plek → lounge/arrangement → passe-partout → volgend toernooi | Hospitality-aanbod + combi |
| 12 | **Hook – Story – Offer** | Hero (hook) → beschrijving/manifest-copy (story) → tickets (offer) per toernooi | Copy per toernooi finetunen |
| 13 | **Confettiregen / feedback** | Toast bij "Ik ga", pill "Meldingen staan aan", "Aangemeld" | Bij ticketaankoop: bevestiging in app |
| 14 | **Reasons why** | Elke vraag (push, e-mail, poll) heeft een expliciete reden | Werkt |
| 15 | **First-party data** (rapport) | E-mailcapture, poll-antwoorden, gekozen toernooien = profiel | Centrale opslag + AVG-grondslag nodig |
| 16 | **Cross-/upsell** | "Ook dit seizoen" op home; tickets-tab sorteert eigen toernooien bovenaan, rest eronder; CTA-bericht in chat | Werkt |

## Spelregels
- Schaarste en cijfers alleen tonen als ze echt zijn; placeholder-cijfers staan tussen `[ ]` en gaan nooit live.
- Maximaal één urgentie-element per scherm; anders verliest het kracht.
- Elke vraag om data (push, e-mail) heeft een reden en een belofte over frequentie.
- Toon blijft "warm en direct", nooit schreeuwerig.

## Nog te bouwen (conversie)
- Exit-intent/retour-bericht: "Je keek naar de World Cup — zaterdag bijna vol" (trigger op gedrag).
- Referral met beloning: vriend meenemen = beiden korting/upgrade.
- UGC-moment: foto-upload "jouw plek in Thialf" → social proof van echte fans.
- Post-event: NPS + direct aanbod volgend toernooi met early-bird (hoogste motivatie-moment).
- Meting: events voor klik naar ticketshop, opt-in, share, poll — zonder meting geen optimalisatie.
