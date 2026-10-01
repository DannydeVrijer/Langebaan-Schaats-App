# Kritische review – conceptversie 0.2

> Doorgevoerd in 0.2.1: punt 5 (home ingekort: quotes en delen naar Meer, één countdown), 9 (vier tabs, plattegrond onder Praktisch), 10 (chat-invoer vervangen door FAQ-ingang), 14 deels (meet-events via `src/track.ts` → dataLayer; GA4/GTM nog koppelen).

Eerlijke beoordeling van de app zoals hij nu is. Gesorteerd op impact.

## 1. Fundamenteel

1. **Het is nog een informatie-app, geen communicatiekanaal.** Zonder echte push-notificaties en een flow-tool die berichten op het juiste moment stuurt, blijft de "CLOSE-magie" demo. De berichtenfeed oogt nu goed, maar niets komt daadwerkelijk aan als de app dicht is. → Beslissing: web push + flow-tool (fase 1) of white-label CLOSE.
2. **Geen ticketdata = beperkte personalisatie.** "Ik ga" is een zelfverklaring, geen bestelling. Vak, ingang, QR-ticket en upsell-op-maat kunnen pas met een koppeling. Dit is de belangrijkste productkeuze.
3. **Placeholder-cijfers (fans, schaarste, early-bird) zijn nu verzonnen.** Krachtig als ze echt zijn, schadelijk als ze dat niet zijn. Nooit live zonder echte bron.
4. **Content is dun.** Programma's, prijzen, praktische info en plattegrond zijn placeholders. De app staat of valt met de inhoud; de structuur is klaar.

## 2. UX

5. **Home is lang geworden** (hero + countdown + push + seizoen + berichten + quotes + praktisch + upsell + delen). Mobile first betekent ook: minder. Voorstel: quotes en "Samen naar Thialf" verplaatsen naar detail/Meer, of inklappen. Nu bewust alles getoond om feedback te krijgen.
6. **Twee countdowns op home** (mini op kaart + grote in card) — dubbel. Mini-countdown op kaarten houden, grote alleen op detail? Of andersom.
7. **Beeld hergebruikt**: twee foto's voor vijf toernooien; de WCKT/NK/NK-afstanden delen dezelfde skater. Per toernooi een eigen key visual nodig.
8. **Hero-tekst leesbaarheid**: op de staande foto staat de titel soms over het gezicht. Oplossing: object-position per beeld instellen of foto's met "lege" onderkant aanleveren.
9. **Tabs in detail scrollen horizontaal** ("Plattegron…" afgekapt). 4 tabs i.p.v. 5 (Plattegrond onder Praktisch) is rustiger.
10. **Composer in Berichten** suggereert een echte chat; zonder backend is dat misleidend. Ofwel koppelen aan klantenservice/FAQ-bot, ofwel vervangen door "Stel een vraag → FAQ".
11. **Geen laad-/leeg-/fout-states** (bijv. als ticketshop offline is of voorraad onbekend).

## 3. Techniek

12. **Opslag is lokaal** (localStorage): wissel van telefoon = alles kwijt; geen inzicht voor het team. Backend nodig voor profiel, antwoorden, e-mail.
13. **Service worker is minimaal**: cachet alleen de shell; bij nieuwe versie kan de gebruiker oude bundle zien. Versiebeheer/`skipWaiting`-melding toevoegen.
14. **Geen analytics.** Zonder meting geen conversie-optimalisatie. GA4/Plausible + events (klik ticketshop, opt-in, share, poll).
15. **Toegankelijkheid**: contrast van `--text-faint` is te laag voor lopende tekst; iconen zonder label in header; focus-states ontbreken.
16. **i18n ontbreekt** — voor EK/World Cup met buitenlandse fans relevant; teksten staan al in data-bestanden, dus later te doen.

## 4. Merk & copy

17. **Afzender is onduidelijk** ("Beleef de magie van schaatsen" is een campagneclaim, geen afzender). Fans moeten weten wie er praat: Schaatsen.nl / KNSB / Thialf?
18. **Campagnesite-cijfers zijn van '24/25** (83.000 bezoekers, 8,9). Actualiseren of weglaten.
19. **Logo ontbreekt** — eigen icoon is tijdelijk; officiële #MVS-/Schaatsen.nl-logo's nodig.
20. **Emoji-gebruik** (🧊🚗🌱) past bij chat, maar beslissen of dat bij het merk hoort.

## 5. Wat goed werkt
- Herkenbare huisstijl (donker ijsblauw, oval-ring, Sportize) — oogt als één familie met de campagne-uitingen.
- Onboarding in één stap, zonder account; commitment-mechaniek ("jouw seizoen").
- Directe ticketshop-links overal, één primaire CTA per scherm, sticky ticketknop.
- Berichtenfeed die binnenkomt na aanmelden, met poll → gepersonaliseerd antwoord.
- Alles wat ontbreekt is zichtbaar gemarkeerd, dus de content-vraag is concreet.

## Aanbevolen volgende stap
1. Beslissen: push + flow-tool, en wel/niet ticketkoppeling.
2. Content aanleveren (CONTENT-CHECKLIST.md, prioriteit A).
3. Home inkorten op basis van jouw feedback; 4 tabs in detail.
4. Analytics + backend voor opslag (Supabase of vergelijkbaar).
