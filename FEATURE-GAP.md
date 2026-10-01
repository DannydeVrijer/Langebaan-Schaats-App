# Functionaliteiten: Ajax Fan App (CLOSE) vs. deze conceptversie

Gebaseerd op de CLOSE-brochure (Close app / SDK / White label) en de Ajax Fan App-flow. ✅ = aanwezig in concept · 🟡 = deels / mock · ❌ = ontbreekt.

## A. Account & personalisatie

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Account / login (e-mail, social, ticketcode) | ✅ | ❌ | Auth-backend (bijv. Supabase/Firebase) of koppeling met ticketshop-account |
| Koppeling met ticketbestelling (naam, vak, rij, stoel) | ✅ | ❌ | API/export van ticketshop (Paylogic?) + unieke identifier |
| Aanspreken met voornaam, berichten op maat van jouw tickets | ✅ | ❌ | Volgt uit bovenstaande |
| Profielverrijking (vragen beantwoorden → profiel) | ✅ | 🟡 poll lokaal | Centrale opslag van antwoorden |
| Groepen / vrienden (wie gaat er mee, avatars op eventkaart) | ✅ | ❌ | Accounts + uitnodigen/delen |
| "Mijn events" – bezocht & aankomend, meerdere events in één app | ✅ | 🟡 alleen aankomend | Historie bijhouden per account |

## B. Tickets & wallet

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Digitaal ticket met QR-code in de app (wallet) | ✅ | ❌ | Ticketkoppeling + QR-rendering; evt. Apple/Google Wallet-pass |
| Ticket delen / overdragen aan vriend | ✅ | ❌ | Ticketshop-API |
| Upgrades & add-ons kopen in de app (parkeren, lounge, merchandise) | ✅ | 🟡 alleen link naar shop | Deep links per product of in-app checkout |
| Vouchers / kortingscodes uitdelen (bulk én persoonlijk) | ✅ | ❌ | Voucher-systeem gekoppeld aan shop |
| Productaanbiedingen in chat ("A purchase that feels like a present") | ✅ | 🟡 CTA-kaart | Productcatalogus + tracking van conversie |

## C. Communicatie (de kern van CLOSE)

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Push-notificaties (90 % opt-in bij CLOSE) | ✅ | ❌ | Web Push (PWA) of native; push-service + opt-in flow |
| Geautomatiseerde berichtenflow met triggers: tijd voor/na event, vaste tijd, ticketdata, antwoorden, locatie (geofence), externe triggers, live | ✅ | 🟡 statische mock + voorbeeldflow | CMS/flow-builder (CLOSE Builder of eigen: bijv. Braze, OneSignal Journeys, n8n) |
| Live-berichten tijdens event (baanrecord, programma-wijziging) | ✅ | ❌ | Redactie-tool + push |
| Berichttypes: tekst, foto/album, video, artikel, productaanbod, camerafilter, survey, invoerveld, sliders, NPS, externe link | ✅ | 🟡 tekst, foto, poll, CTA, link | Overige types bouwen |
| Tweerichtingschat / vragen stellen (met klantenservice of bot) | ✅ | 🟡 UI zonder backend | Inbox voor team (Zendesk/Intercom) of FAQ-bot |
| Groepschat met vrienden ("Invite contacts") | ✅ | ❌ | Accounts + chat-backend |
| Camerafilters / foto delen | ✅ | ❌ | Nice-to-have |

## D. Event-tab / informatie

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Programma / tijdschema | ✅ | ✅ (placeholder-data) | Definitieve data |
| Praktische info, huisregels, FAQ | ✅ | ✅ (placeholder-data) | Content |
| Interactieve plattegrond (ingangen, vak, horeca, toiletten) | ✅ | 🟡 placeholder | Plattegrond + pins |
| Countdown | ✅ | ✅ | – |
| Nieuws / artikelen | ✅ | 🟡 placeholder | Feed schaatsen.nl of handmatig |
| Sponsorcontent / partnerblokken | ✅ | 🟡 logo-strip | Partnerafspraken + content |
| Reisadvies op maat (auto/OV/fiets) met live verkeersinfo | ✅ | 🟡 poll + statisch antwoord | Koppeling verkeersdata/NS, parkeerstatus |
| Live uitslagen / tijden | n.v.t. (voetbal: score) | ❌ | ISU/KNSB resultatenfeed |
| Spelers-/schaatsersprofielen (selectie, records) | ✅ (Ajax: selectie) | 🟡 teams + toppers, PR's deels | Foto's, PR's, startlijsten |
| Contactformulier naar klantenservice | ✅ | ❌ | Formulierdienst → schaatsen@houseofsports.nl (zie BERICHTEN-EN-NOTIFICATIES.md) |
| Meertalig (NL/DE/EN) | ✅ | ❌ | i18n-laag + EN-content |

## E. Onderzoek & data

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Surveys met sliders / multiple choice, 55 % respons | ✅ | 🟡 1 poll, lokaal | Centrale opslag + dashboard |
| NPS na afloop | ✅ | ❌ | Survey-type + trigger |
| Analytics-dashboard: gebruikers, open rates, antwoorden, conversie | ✅ | ❌ | Analytics (GA4/Mixpanel) + CMS-rapportage |
| 100 % first-party data in eigen beheer | ✅ | ❌ | Database + AVG-grondslag, privacyverklaring |

## F. Platform & beheer

| Functie | Ajax / CLOSE | Concept | Wat nodig is |
|---|---|---|---|
| Native app in App Store / Play Store | ✅ | ❌ (PWA) | Capacitor/Expo-wrap of white-label |
| White-label of SDK in bestaande app | ✅ | n.v.t. | – |
| Beheer-CMS voor content en flows door niet-developers | ✅ | ❌ (data in code) | Headless CMS (Sanity/Strapi/Airtable) of CLOSE Builder |
| 99,9 % uptime, hosting, support | ✅ | GitHub Pages | Hosting-keuze |
| Toegankelijkheid (WCAG), onboarding-permissies (push, locatie) | ✅ | 🟡 basis | Audit + permissieflow |

## Aanbevolen volgorde (impact ÷ moeite)

1. **Push-notificaties + flow-tool** – zonder dit is het een website, geen communicatiekanaal.
2. **Ticketkoppeling + wallet (QR)** – maakt de app onmisbaar op de dag zelf.
3. **CMS voor content & berichten** – anders blijft elke wijziging developerwerk.
4. **Surveys & analytics** – bewijs van waarde richting partners/KNSB.
5. **Accounts, groepen, meertaligheid, native stores** – fase 2.

Alternatief: de app niet zelf bouwen maar als **white-label bij CLOSE** afnemen; dan is 80 % van bovenstaande standaard aanwezig en gaat het alleen om content en flow-ontwerp. Dit concept dient dan als briefing/prototype.
