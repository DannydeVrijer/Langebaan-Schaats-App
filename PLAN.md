# Plan "next level" – samenvatting (7 okt 2026)

Volledige versie: Claude-doc *Schaatsfan App – plan naar next level*. Dit is de korte, versiebeheerde samenvatting.

## Doelen
- Bezoeker: één plek voor alles, altijd. Organisatie: communicatiekanaal + lead-gen.
- Randvoorwaarden: content via API's (seamless), mobile first, privacy by design, geen verzonnen data, huisstijl MVS 2026.

## Stores (App Store / Google Play)
- Kosten: Apple $99/jr, Google $25 eenmalig, wrapper-tooling gratis; bureau €2.500–7.500 (schatting) voor wrappen + indienen.
- Vereist: D-U-N-S (organisatie-account), privacyverklaring-URL, privacy-labels/Data Safety, leeftijdsclassificatie, screenshots.
- Apple 4.2: pure web-wrapper wordt afgewezen → native push + offline + share erin. Android (TWA) is laagdrempelig.
- Merken (KNSB/ISU/Thialf) en portretrecht (TeamNL/ANP-foto's) schriftelijk regelen. DPIA niet nodig voor push + lokale favorieten; wel bij ticketdata/profilering.
- Doorlooptijd 6–10 weken; Android eerst, iOS daarna.

## Insteek
- Nog niet besloten. Advies: combinatie – gast standaard, account optioneel op het moment dat het iets oplevert (favorieten-melding, tickets, winactie). Magic-link login, Brevo-sync alleen bij marketing-opt-in.
- Web app kan live berichten/push: berichten uit CMS/backend, Web Push (Android direct, iOS na beginscherm) of native push.

## Live data
- Bron: KNSB-tijdwaarneming; uitslagenplatform (liveresults.schaatsen.nl én live.isuresults.eu, waar ook de ISU-app uit leest) is gebouwd door SCG – Sport Computer Graphics (Tynaarlo). Feed aanvragen bij KNSB met SCG als technische partij.
- Refresh: stadionschermen hangen direct aan de tijdwaarneming; app realistisch 1–3 s daarachter met push-verbinding (WebSocket/SSE), 3–5 s met polling. Per ronde updaten is voorwaarde.
- Alles (tijden, snelheid, ranking, voorspelde eindtijd, je rit bijhouden) hangt aan toegang tot de KNSB-feed (`live-api.schaatsen.nl`: CORS-whitelist of tussenlaag + toestemming).
- Thialf-tijdwaarneming levert rondetijden, snelheid per baanvak, positie. Sportity heeft geen API/export → geen bron.

## Koppelingen
- Paylogic-shop: iframe werkt (nu in de app). Mijn Paylogic: alleen deeplink. Ordergegevens: Shopping Service API via accountmanager.
- Playable: iframe-embed + webhooks voor leads; licentie enterprise.
- Brevo: API met attributen bij opt-in. Push: OneSignal/FCM.

## Activaties
- Gedeelde basis: realtime-backend (Supabase/Ably) + activatie-type in berichten-CMS + beheerscherm `/beheer`.
- Groen/rood-telefoon, live quiz, verzoeknummers, win-acties (Playable), je rit bijhouden, voorspel de tijd, fotomuur.

## Fasering
0. Nu: D-U-N-S, privacyverklaring, KNSB mailen (feed + merk), Paylogic (API, parkeer-/mijn-tickets-URL), fotorechten.
1. 30 okt (WCKT): content, KNSB-snapshot programma, berichten-CMS + push, contactformulier, GA4, Android in Play.
2. 4 dec (World Cup): KNSB-feed live, startmelding favoriet, eerste activatie, iOS in App Store.
3. 8 jan (EK): account + Brevo, ticket-in-app, Playable-activaties, groen/rood, EN.
4. 22 jan+: voorspelde tijd/snelheid, je rit bijhouden, fotomuur, loyalty, plattegrond.

## Kosten (indicatie)
Diensten < €2.000/jr; bouw €5.000–20.000 bij bureau (excl. Playable €3.000–10.000); stores $124 jaar 1.

## Changelog & terugdraaien
- `CHANGELOG.md` per versie; Git-commits tonen exact wat erbij/eraf ging; terugdraaien via Revert (GitHub) of op verzoek.

## Paylogic aanleveren
1. Nu: shop-URL's, parkeerproduct-URL, "Mijn tickets"-URL (openbaar, in chat).
2. Later: API-toegang (Merchant ID + refresh token) via accountmanager – alleen als GitHub-secret/wachtwoordkluis, nooit in chat; verwerkersovereenkomst.
3. Daarna: webhooks/exports voor automatische berichten na aankoop.

## Beslissingen nodig
KNSB-feed & merk · Paylogic-API · account ja/nee · stores starten · fotorechten · Playable-licentie · afzender/beheer · content A-items · budget.
