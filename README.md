# Langebaan Schaats App – conceptversie

Communicatie-app voor bezoekers van de langebaantoernooien in Thialf (seizoen 2026/2027), in de huisstijl *Beleef de magie van schaatsen*. Geïnspireerd op de Ajax Fan App (CLOSE): kies je toernooien, krijg programma, tickets, praktische info en berichten op het juiste moment.

## Schermen

- **Start** – kies de toernooien die je bezoekt
- **Home** – eerstvolgende toernooi, countdown, tickets, laatste bericht, praktische tegels, upsell
- **Toernooien** – alle 5 NL-toernooien + internationale World Cups (info)
- **Toernooi-detail** – tabs Info · Programma · Tickets · Praktisch · Plattegrond
- **Tickets** – directe links naar tickets.schaatsen.nl per toernooi
- **Berichten** – chat-feed met polls, beeld, CTA's en voorbeeld van de automatische flow
- **Meer** – mijn toernooien, FAQ, contact, socials, partners

Alles tussen `[ ]` is placeholder → zie **[CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md)**.

## Lokaal draaien

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # productie-build in dist/
```

## Online (GitHub Pages)

Bij elke push naar `main` bouwt de workflow `.github/workflows/deploy.yml` de app en zet 'm op
`https://dannydevrijer.github.io/Langebaan-Schaats-App/`.
Eenmalig inschakelen: *Settings → Pages → Source: GitHub Actions*.

Op je telefoon: open de link in Safari/Chrome → *Zet op beginscherm* → de app opent fullscreen (PWA).

## Structuur

```
src/
  data/tournaments.ts   toernooien, programma, praktische info, FAQ, partners
  data/messages.ts      berichtenfeed + voorbeeld-flow
  screens/              Onboarding, Home, Tournaments, TournamentDetail, Tickets, Messages, More
  components/ui.tsx     iconen, merk, TrackRing, kaarten, nav, countdown
  state.tsx             gekozen toernooien & poll-antwoorden (localStorage)
  styles.css            huisstijl-tokens en componenten
public/fonts/           Sportize (display-font)
public/img/             key visuals
```

Stack: Vite · React 19 · TypeScript · react-router (hash) · geen UI-library. Fonts en beelden lokaal.

## Bronnen

- Toernooien & ticketlinks: https://www.schaatsen.nl/schaatsfan/tickets/langebaanschaatstickets/
- Ticketshop: https://tickets.schaatsen.nl
