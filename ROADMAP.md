# Roadmap Schaatsfan-app – alle paden, ontbrekende info en aanbevelingen

Doel: dé plek waar een bezoeker van Thialf alles vindt en voelt dat hij erbij hoort. Vóór, tijdens en na het toernooi. Elke functie hieronder is beoordeeld op: wat levert het de fan op, wat is ervoor nodig, wat is de privacy-impact, hoeveel werk (S = dagen, M = 1–2 weken, L = meer), en wanneer.

Status 7 okt 2026: conceptversie 0.6 (PWA). Alles tussen `[ ]` in de app is placeholder.

> **Totaalplan "next level"** (stores, insteek gast/account, live data, koppelingen Paylogic/Playable/Sportity, activaties, ISU-benchmark, kosten, fasering, beslissingen) staat in het Claude-doc *Schaatsfan App – plan naar next level* (7 okt 2026) en samengevat in `PLAN.md`.

---

## 1. De bezoekersreis als ruggengraat

Alles wat we bouwen hangt aan een moment in de reis. Dit is wat een fan per fase wil weten/doen — en wat de app daar nu voor heeft.

| Fase | Wat de fan wil | Nu in app | Ontbreekt |
|---|---|---|---|
| **Oriënteren** (weken–maanden vooraf) | Welke toernooien, wanneer, wie rijdt, wat kost het, is het leuk voor kinderen | Toernooien, countdown, ticketlinks, schaatsers, quotes | Prijzen/categorieën, kids-info, sfeerbeelden/video per toernooi, "welke dag kies ik?"-hulp |
| **Gekocht** (direct na aankoop) | Bevestiging, wat nu, hoe kom ik er, met wie ga ik | Welkomstberichten, poll "hoe kom je?", delen | Ticket in app, agenda-item (.ics), "nodig je gezelschap uit" met kortingscode |
| **Aanloop** (2 weken – 1 dag) | Programma op mijn dag, favoriete rijders, praktisch, weer | Programma (concept), praktisch (placeholders), berichten (demo) | Definitief programma, startlijsten, parkeren/OV concreet, deuren open, weer, favorieten |
| **Reisdag** (ochtend) | Verkeer/OV nu, parkeren vol?, ingang, deuren open, wat mag mee | – | Live verkeersinfo, parkeerstatus, ingang per vak, bagageregels, "dag-modus" op home |
| **In Thialf** | Waar is wat, programma nu, live tijden, wie start zo, horeca, activaties, wifi, EHBO | Plattegrond (placeholder), programma | Live tijden, startmeldingen, interactieve plattegrond, horeca-aanbod/cashless, activaties, wifi |
| **Na afloop** | Uitslagen, foto's/video, hoe was het, volgend toernooi | – | Uitslagen, fotoalbum/highlights, enquête/NPS, early-bird volgend toernooi |

De grootste gaten zitten in **reisdag** en **in Thialf** — precies de momenten waarop een app onmisbaar wordt.

---

## 2. Huidige functies (v0.6)

- Start: toernooikeuze zonder account · Home: eerstvolgend toernooi, countdown met seconden, koopknop, meldingen-opt-in (voorkeur), jouw seizoen, laatste bericht, praktisch, overige toernooien
- Toernooien: 5 Thialf-toernooien + koopknop; internationale World Cups (info)
- Toernooi-detail: Programma (mijn dag, deuren open, dweilpauzes, nu/volgende) · Info · Praktisch (reisvolgorde, parkeerticket, plattegrond, checklist); agenda/delen; sticky koopknop → Paylogic-shop **in de app** (iframe)
- Zo werkt schaatsen: World Cup-serie, allround, sprint, NK Afstanden, massastart, basisregels, dweilpauze, tijden lezen
- Embed-scherm: ticketshop, mijn tickets, speel & win (Playable), parkeerticket – URL's deels nog aan te leveren
- Berichten: ook video (mp4/YouTube/Vimeo)
- Schaatsers: 8 teams, 47 rijders, TeamNL-foto's, officiële PR's (KNSB), medailles, favorieten, smoelenboek/lijst, filters
- Berichten: feed die na aanmelden binnenkomt; poll met vervolgantwoord; CTA; opt-in; delen; FAQ-ingang
- Meer: toernooien aanpassen, meldingen, delen, quotes, FAQ, contact, socials, partners
- Techniek: PWA, GitHub Pages, meet-events → dataLayer, alles lokaal opgeslagen

---

## 3. Alle paden (opdrachten) – uitgewerkt

### A. Basisinformatie compleet maken — *fundament*
**Fan:** geen vraag meer onbeantwoord vóór het bezoek.
**Nodig (aanleveren):** zie §5. **Privacy:** geen. **Werk:** S (invoeren) zodra content er is. **Wanneer:** nu.

### B. Programma automatisch uit de KNSB-API — *snelle winst*
**Fan:** altijd het officiële tijdschema, per dag, met "deuren open" en starttijden; geen verouderde PDF.
**Hoe:** `live-api.schaatsen.nl/events/{id}/schedule/` geeft per toernooi alle ritten met starttijd. Twee varianten:
1. *Snapshot* — ik lees het schema één keer uit (via browser, geen CORS-probleem) en zet het als data in de app. Herhalen bij wijziging. Werkt vandaag al; alleen nog wachten tot de 2026/27-events in hun kalender staan.
2. *Live* — app leest de API zelf (CORS-whitelist van KNSB of eigen tussenlaag, zie LIVE-UITSLAGEN.md).
**Privacy:** geen. **Werk:** S (snapshot) / M (live). **Wanneer:** snapshot zodra de kalender gepubliceerd is.

### C. Live tijden & uitslagen — *de reden om de app in Thialf open te hebben*
**Fan:** rituitslag, rondetijden, klassement en "wie rijdt nu" zonder scorebord te hoeven zien.
**Nodig:** CORS-toestemming KNSB of tussenlaag (Cloudflare Worker, cache 10–30 s). **Privacy:** geen. **Werk:** M. **Wanneer:** na akkoord KNSB; demo kan eerder.

### D. Favoriete schaatsers + startmelding — *de meest "magische" functie*
**Fan:** "Femke Kok start over 5 minuten — let op in het stadion / zet de tv aan." Werkt voor bezoekers én thuisfans.
**Hoe:** favoriet-ster bij elke schaatser (lokaal of in account) → bij live event: startlijst per rit (API) + rit-starttijd → push 5 min vooraf. Vereist push (F) en live data (C). Thuisfans: zelfde melding met "kijk live op NOS/…".
**Privacy:** favorieten zijn persoonsgegevens zodra ze aan een account/push-token hangen → in privacyverklaring; opt-in per melding-type. **Werk:** M (na C en F). **Wanneer:** fase 2.

### E. Berichten-CMS + automations voor de organisator — *de CLOSE-kern*
**Fan:** relevante, persoonlijke berichten op het juiste moment.
**Organisator:** zelf berichten schrijven en plannen; automations met vraag → antwoord-takken ("Kom je met de auto?" → parkeerinfo; "Trein?" → pendelbus); triggers op tijd (x dagen voor), gedrag (klikte op tickets), antwoord, favoriet, locatie.
**Hoe:** een Supabase-tabel (berichten, triggers, takken) + eenvoudig beheerscherm (/beheer, met wachtwoord), of OneSignal Journeys voor de push-kant. App haalt berichten op in plaats van uit code.
**Privacy:** antwoorden opslaan = persoonsgegevens → grondslag (gerechtvaardigd belang/toestemming), bewaartermijn (einde seizoen). **Werk:** M. **Wanneer:** fase 1 — zonder dit blijft het een demo.

### F. Push-notificaties — *randvoorwaarde voor D en E*
**Hoe:** Web Push via OneSignal (gratis tot 10k). Werkt op Android direct; iPhone na "zet op beginscherm". Native app pas als dat te veel fans uitsluit.
**Privacy:** push-token + segmenttags; opt-in met reden; uitzetten in Meer. **Werk:** S–M. **Wanneer:** fase 1.

### G. Smoelenboek — *gezichten bij namen*
**Fan:** herkent de rijders in het stadion en op tv; "wie is dat in rit 7?".
**Hoe:** per team alle rijders met portret, afstanden, PR's (API), 1 zin bio, favoriet-ster. Foto's: KNSB-cdn (2020, verouderd), beter: teams/KNSB vragen om actuele portretten (rechtenvrij voor app), uniforme uitsnede.
**Privacy:** portretrecht → toestemming via teams/KNSB. **Werk:** S (structuur bestaat) + content. **Wanneer:** fase 1.

### H. Tickets in de app — *optioneel, hoog rendement, gevoelig*
**Fan:** e-ticket met QR in de app, vak en ingang, "jouw dag" automatisch in programma, groepstickets delen.
**Hoe:** koppeling met ticketshop (Paylogic): bezoeker voert ordernummer + e-mail in → app haalt tickets op. Vereist API/toestemming Paylogic en verwerkersafspraken.
**Privacy:** naam, e-mail, ordergegevens = persoonsgegevens; alleen ophalen op verzoek van de fan, alleen tonen, zo kort mogelijk bewaren, verwerkersovereenkomst HoS–Paylogic, DPIA-light. Nooit tickets van anderen zichtbaar. **Werk:** L. **Wanneer:** fase 2–3, besluit nodig.

### I. Account + fanprofiel → Brevo — *optioneel, strategisch*
**Fan:** voorkeuren bewaard over toestellen; persoonlijke mails over zijn/haar toernooien en favorieten.
**Organisator:** first-party data: welke toernooien, favoriete rijders, reisvoorkeur, bezoekhistorie → segmenten in Brevo.
**Hoe:** magic-link login (e-mail, geen wachtwoord) via Supabase Auth; profiel = keuzes die nu lokaal staan; sync naar Brevo-lijst met attributen (toernooien, favorieten) alleen met expliciete marketing-opt-in (apart vinkje, double opt-in).
**Privacy:** toestemming per doel, privacyverklaring, verwerkersovereenkomst Brevo (bestaat waarschijnlijk al), recht op inzage/verwijderen (knop "verwijder mijn account"), geen koppeling met ticketdata zonder apart akkoord. **Werk:** M. **Wanneer:** fase 2, ná E/F zodat de data meteen bruikbaar is.

### J. Activaties & partnercontent — *beleving + commercie*
**In het stadion:** quiz tijdens de dweilpauze, "voorspel de winnende tijd" (dichtstbij wint), wave-timer, foto-opdracht (#MVS), spot-de-code op het scorebord, partner-winactie (bijv. Daikin: raad de temperatuur van het ijs).
**Thuis:** voorspel het podium, stemmen op "rit van de dag", meekijk-poll tijdens de uitzending.
**Hoe:** activatie = berichttype met formulier/keuze + (optioneel) winnaar-selectie; aan partner te hangen met logo/branding. Vereist E (CMS) en voor winacties naam/e-mail van deelnemer.
**Privacy:** actievoorwaarden, bewaartermijn deelnemersdata, geen doorgifte aan partner zonder opt-in. **Werk:** M. **Wanneer:** fase 2, eerste activatie bij World Cup.

### K. Contactformulier → schaatsen@houseofsports.nl — *service*
**Fan:** vraag stellen zonder de app te verlaten; eerst FAQ-suggesties.
**Hoe:** formulier (naam, e-mail, toernooi, vraag) via Web3Forms/Brevo/Zendesk. **Privacy:** minimaal, in privacyverklaring. **Werk:** S. **Wanneer:** fase 1.

### L. Dag-modus op Home — *de app verandert op de wedstrijddag*
**Fan:** op de dag zelf ziet Home: programma van vandaag, "nu op het ijs", volgende rit, ingang/parkeren, live-link, activatie van het moment. Geen countdown meer.
**Werk:** S–M (na B/C). **Wanneer:** fase 1–2.

### M. Agenda & delen — *kleine, zekere winst*
"Zet in je agenda" (.ics per toernooi/dag), "stuur naar je gezelschap". **Werk:** S. **Wanneer:** nu.

### N. Meten — *zonder dit geen optimalisatie*
GA4/Plausible op de bestaande dataLayer-events; dashboard: installaties, opt-in, kliks naar shop, favorieten, activatie-deelname. **Werk:** S. **Wanneer:** fase 1.

### O. Later / optioneel
Meertalig (EN voor EK/World Cup) · native app in stores · interactieve plattegrond met routing · cashless/horeca-bestellen vanaf je stoel · AR-selfie met schaatser · seizoenskaart/loyalty (punten per bezoek) · fan-chat per vak · live videoclips (rechten!) · integratie Thialf-wifi/parkeerstatus.

---

## 4. Voorgestelde volgorde

| Fase | Wat | Resultaat |
|---|---|---|
| **1 — "Echt werkend" (okt–nov, vóór WCKT 30 okt)** | A content, B programma-snapshot, F push, E berichten-CMS basis, G smoelenboek, K contact, M agenda, N meten, toernooipagina optimaliseren (§6) | Fans krijgen echte berichten en het echte programma; organisator stuurt zelf |
| **2 — "Live & persoonlijk" (dec, World Cup)** | C live tijden, D favorieten + startmelding, L dag-modus, J eerste activatie, I account + Brevo | De app is onmisbaar in het stadion en levert data op |
| **3 — "Alles in één" (jan, EK/NK Afstanden)** | H tickets in app, meer activaties, meertalig | Ticket, info en beleving in één app |

Beslissingen die jij/HoS moet nemen: (1) toestemming KNSB voor API, (2) wel/geen ticketkoppeling met Paylogic, (3) accounts + Brevo ja/nee en wie is verwerkingsverantwoordelijke (HoS, KNSB?), (4) afzendernaam van de app, (5) budget voor OneSignal/Supabase (vrijwel nihil) en bouwuren.

---

## 5. Ontbrekende informatie (geconsolideerd, prioriteit A = vóór 30 okt)

**Per toernooi (A):** definitief tijdschema (of groen licht voor API-snapshot), deuren open per sessie, prijzen & categorieën, kortingen, key visual, side-events, deelnemers/startlijsten, nieuws.
**Thialf (A):** parkeren (terreinen, tarieven, voorverkoop, invaliden), OV/pendelbus, fiets, ingang per vak, plattegrond, huisregels (tassen, eten, camera's, vlaggen), horeca & betaalwijze, toegankelijkheid, garderobe, gezinsinfo, wifi, EHBO, verloren voorwerpen, roken.
**Service (A):** klantenservice-contact, FAQ-antwoorden, privacyverklaring, restitutie/overdrachtsbeleid.
**Merk (A):** logo's #MVS/Schaatsen.nl/KNSB, partnerlogo's, afzendernaam, tone of voice akkoord.
**Schaatsers (B):** definitieve teams 2026/27, actuele portretten met toestemming, bio-check, PR's Stolz.
**Berichten (B):** momenten en feiten per toernooi; wie beheert; antwoord-takken per poll.
**Commercie (B):** hospitality-aanbod, upsell-momenten, partneractivaties, actievoorwaarden.
**Techniek (B):** GA4-property, OneSignal-account, Supabase-project, domein (schaatsen-app.nl?), Brevo-lijst/attributen, Paylogic-contact.

---

## 6. Kritische review & aanbevelingen

> **Doorgevoerd in v0.5 (2 okt):** 1 t/m 15. Punt 16 (echte afzender + logo) wacht op aanlevering. Dag-modus (10/L) en favorieten (11) werken lokaal; de startmelding zelf vereist push (F) en live data (C).

### Toernooipagina
1. **Van 4 naar 3 tabs**: Programma · Info · Praktisch. "Tickets" is al de sticky knop; de tab is dubbel.
2. **Programma als standaardtab** zodra het toernooi binnen 14 dagen is; daarvoor Info.
3. **"Mijn dag"**: fan kiest welke dag(en) hij gaat → programma, berichten en home filteren daarop. Later automatisch via ticket.
4. **Per dag: "deuren open" apart bovenaan, ritten eronder, "nu bezig/volgende" markering op de dag zelf**, knop "Live uitslagen" (link, later in-app).
5. **Agenda-knop** (.ics) en **deel-knop** in één rij onder de hero; "Ik ga" blijft.
6. **Info-tab toernooi-specifiek maken**: nu staan bij alle 5 dezelfde quotes. Vervangen door: "Wat staat er op het spel" (1 alinea), "Toppers aan de start" (3–6 schaatsers → smoelenboek), "Dit maakt dit toernooi anders" (3 bullets), side-events. Quotes alleen op Meer.
7. **Praktisch in reisvolgorde**: Aankomst (parkeren/OV/fiets) → Binnenkomen (ingang per vak, deuren open, wat mag mee) → Binnen (plattegrond, horeca, toiletten, EHBO, wifi) → Kinderen & toegankelijkheid → Vertrek. Plus een "Op de dag"-checklist (e-ticket, pinpas, warme laag, …).
8. **Hero lager** (minder schermruimte vóór de inhoud) en countdown-kaart compacter.
9. **Lege-staat-teksten** vervangen: "[aanleveren: …]" wordt voor fans "Volgt binnenkort" met een datum, intern blijft de checklist.

### App-breed
10. **Home dag-modus** (zie L) en op gewone dagen home nog korter: hero + countdown/knop + jouw seizoen + laatste bericht + praktisch. "Ook dit seizoen" naar Toernooien.
11. **Schaatsers**: favoriet-ster nu al toevoegen (lokaal), sortering "mijn favorieten eerst", filter "rijdt op [toernooi]" zodra startlijsten er zijn.
12. **Berichten**: bij elke poll direct het vervolgantwoord tonen (nu alleen bij "hoe kom je"), timestamps realistisch spreiden, "Geplande berichten"-blok verbergen voor fans (alleen in demo-modus).
13. **Meer**: "reset demo" en conceptversie-regel verbergen in productie.
14. **Toegankelijkheid**: contrast van de lichtgrijze tekst verhogen; focus-states; labels bij icoonknoppen.
15. **Offline**: service worker versie-melding ("nieuwe versie beschikbaar – vernieuwen").
16. **Afzender & logo**: bovenin echte afzender + logo zodra bekend.

Zeg welke nummers ik mag doorvoeren; 1, 2, 4, 5, 7, 9, 11 kan ik direct zonder nieuwe content.
