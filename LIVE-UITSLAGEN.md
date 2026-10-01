# Live tijden & uitslagen uit liveresults.schaatsen.nl

## Wat er achter de site zit
liveresults.schaatsen.nl is een Angular-app die een **open JSON-API** van de KNSB uitleest: `https://live-api.schaatsen.nl/`. Geen login, geen API-key. Onderzocht op 1 okt 2026.

| Endpoint | Geeft |
|---|---|
| `/events/?orderBy=start&isPublished=1&isLive=1` | evenementen die nú live zijn |
| `/events/?orderBy=start&isPublished=1&season=2025` | kalender per seizoen (bv. `2025_NED_0001` = WCKT nov 2024) |
| `/events/{id}/` | eventgegevens (naam, baan, data) |
| `/events/{id}/schedule/` | tijdschema: per rit `start`, `title` (bv. "Mannen 5000m"), links naar startlijst/uitslag, `isLive` |
| `/events/{id}/competitions/{n}/` | rit-info: afstand, lapCount, referee/starter |
| `/events/{id}/competitions/{n}/results/?inSeconds=1` | uitslag: rang, naam, land, tijd, achterstand, PB-markering, status (DQ) |
| `/events/{id}/competitions/{n}/records/` en `/personal-bests/` | baanrecords en PR's van de rijders in die rit |
| `/skaters/{id}/personal-best/` | PR's per schaatser (incl. foto-URL) |
| `/events/{id}/championships/` | klassementen (allround/sprint) |

Lap-tijden en "analysis" staan ook in de site (rondetijden tijdens de rit), zelfde API-basis.

## Het probleem: CORS
De API stuurt geen `Access-Control-Allow-Origin`-header. Een browser-app op een ander domein (onze PWA op github.io of schaatsen-app.nl) krijgt daardoor **"Failed to fetch"** — getest. Vanaf liveresults.schaatsen.nl zelf werkt het wel.

## Wat we nodig hebben (kies één)

1. **Toestemming + CORS van de KNSB (beste)**
   Vraag via liveresults@schaatsen.nl om ons domein toe te voegen aan de CORS-whitelist (één regel configuratie bij hen) én om formeel akkoord voor hergebruik. Dan leest de app de API direct, live, zonder tussenlaag. Bouwtijd aan onze kant: 1–2 dagen (tijdschema-tab live maken, uitslagen per rit, "LIVE"-badge, lap-tijden).

2. **Eigen tussenlaag (proxy) – werkt zonder hun hulp**
   Een kleine serverfunctie (Cloudflare Worker / Vercel-functie, gratis tier) die de API opvraagt, 10–30 s cachet en met CORS doorgeeft aan de app. Technisch simpel (halve dag), maar: je bouwt op een ongedocumenteerde API die ze zonder aankondiging kunnen wijzigen of afschermen, en je hergebruikt KNSB-data zonder afspraak. Alleen doen als tijdelijke demo of ná een akkoord.

3. **Link naar de site (nu al mogelijk)**
   Per toernooi en per rit een knop "Live uitslagen" naar `liveresults.schaatsen.nl/events/{id}/schedule`. Geen integratie, maar 0 risico en 10 minuten werk. Zet ik erin zodra de event-id's van seizoen 2026/27 bekend zijn (`season=2026`).

## Advies
Doe 3 nu, vraag 1 aan (House of Sports en KNSB werken al samen op de ticketing, dus dit is een logische vraag), bouw ondertussen met 2 een demo zodat je op de meeting kunt laten zien hoe live tijden in de app eruitzien. Bonus: dezelfde API levert **officiële PR's en foto's per schaatser** — dat vult de `[PR]`-placeholders in het Schaatsers-onderdeel en vervangt de initialen door echte portretten.

## Datavoorbeeld (uitslag, ingekort)
```json
{ "rank": 1, "competitor": { "number": 38, "skater": { "firstName": "Chris", "lastName": "Huizinga", "country": "NED",
  "photo": "https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/39.png",
  "personalBestUrl": "https://live-api.schaatsen.nl/skaters/39/personal-best/" } },
  "time": "366.720", "timeBehind": "0.000", "status": 0 }
```
