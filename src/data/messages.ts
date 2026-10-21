/**
 * Mock-berichtenstroom, geïnspireerd op de CLOSE-flow (Ajax Fan App):
 * automatische berichten op het juiste moment, met polls, beeld en CTA's.
 * In productie komen deze uit een CMS/flow-builder met triggers
 * (x dagen voor event, op basis van ticketdata, locatie, antwoorden).
 */

import { asset } from './tournaments';

export type Message =
  | { id: string; kind: 'text'; day: string; time: string; text: string }
  | { id: string; kind: 'optin'; day: string; time: string; text: string }
  | { id: string; kind: 'share'; day: string; time: string; text: string }
  | { id: string; kind: 'image'; day: string; time: string; text: string; image: string }
  /** Tekstkaart in abri-stijl (eigen component, elke tekst mogelijk) */
  | { id: string; kind: 'sign'; day: string; time: string; text: string; lines: string[]; sub?: string; chevrons?: boolean }
  | { id: string; kind: 'video'; day: string; time: string; text: string; video: string; poster?: string }
  | { id: string; kind: 'cta'; day: string; time: string; text: string; label: string; href: string }
  | { id: string; kind: 'poll'; day: string; time: string; text: string; options: { id: string; label: string; pct: number }[]; followUps: Record<string, string> }
  | { id: string; kind: 'route'; day: string; time: string; text: string; tournamentId: string }
  /** Partner-activatie "Most OK Game": schattingsvraag, het antwoord dat het dichtst bij zit ("meest OK") wint. `answer` pas invullen bij de onthulling. */
  | { id: string; kind: 'estimate'; day: string; time: string; text: string; partner: string; game: string; question: string; unit: string; placeholder?: string; answer?: number; answerNote?: string; prize?: string; revealAt?: string; revealNow?: boolean };

export const messages: Message[] = [
  {
    id: 'm1', kind: 'sign', day: 'Vandaag', time: '09:00', lines: ['Welkom'], sub: 'Beleef de magie van schaatsen',
    text: 'Welkom! 🧊 Fijn dat je erbij bent. In deze app vind je alles over de toernooien die jij bezoekt: programma, tickets, praktische info en op het juiste moment een seintje van ons.',
  },
  {
    id: 'm2', kind: 'image', day: 'Vandaag', time: '09:01',
    text: 'Het seizoen begint over een paar weken met het World Cup Kwalificatietoernooi. Niets is zeker, alles staat op scherp. Dit is waar het seizoen begint.',
    image: asset('img/beeldbank/wckt/wckt-banner-605x265.jpg'),
  },
  {
    id: 'm3', kind: 'poll', day: 'Vandaag', time: '09:02',
    text: 'Hoe kom je naar Thialf? Dan sturen we je vlak voor het toernooi de beste route en actuele verkeersinfo.',
    options: [
      { id: 'car', label: 'Met de auto 🚗', pct: 64 },
      { id: 'train', label: 'Trein + bus 🚆', pct: 27 },
      { id: 'bike', label: 'Fiets / lopend 🚲', pct: 9 },
    ],
    followUps: {
      car: 'Top! Drie dagen voor het toernooi sturen we je de parkeerinfo en actuele verkeersinfo rond Heerenveen. Tip: koop je parkeerticket vooraf, dan sta je niet in de rij. [link aanleveren]',
      train: 'Goed bezig 🌱 Vanaf station Heerenveen is het ca. 25 min lopen of een korte busrit. We sturen je op de dag zelf de actuele reisinfo. [pendelbus bevestigen]',
      bike: 'Lekker fris! Bij Thialf is een fietsenstalling. We houden het weer voor je in de gaten ☀️',
    },
  },
  {
    id: 'm4', kind: 'cta', day: 'Vandaag', time: '09:03',
    text: 'Nog geen tickets voor de World Cup in december? De wereldtop komt naar Heerenveen — en de beste plekken gaan het eerst.',
    label: 'Bekijk tickets',
    href: 'https://tickets.schaatsen.nl/f98606597b26473a9dd75d9747fa8ef7/tickets',
  },
  {
    id: 'm5', kind: 'route', day: 'Vandaag', time: '09:04',
    text: 'Wil je het programma van het WCKT alvast bekijken?',
    tournamentId: 'wckt',
  },
  {
    id: 'm6', kind: 'optin', day: 'Vandaag', time: '09:05',
    text: 'Zet meldingen aan, dan hoor je het als eerste bij programma-wijzigingen, verkeersinfo op de dag zelf en als er extra kaarten vrijkomen. Gemiddeld 3 berichten per toernooi, geen spam.',
  },
  {
    id: 'm8', kind: 'estimate', day: 'Vandaag', time: '09:07',
    text: 'Tijd voor de Most OK Game van OK! Geen kennisvraag maar een schattingsvraag: wie het dichtst bij het juiste antwoord zit, geeft het meest OK antwoord – en wint.',
    partner: 'OK', game: 'Most OK Game',
    question: 'Hoeveel zitplaatsen heeft Thialf?',
    unit: 'stoelen', placeholder: 'bijv. 10.000',
    answer: 12500, answerNote: 'Thialf biedt plek aan 12.500 toeschouwers. [check: exact aantal zitplaatsen bij KNSB/Thialf]',
    prize: '[aanleveren: prijs OK, bijv. tankpas]', revealAt: 'in de dweilpauze',
  },
  {
    id: 'm9', kind: 'estimate', day: 'Vandaag', time: '09:08',
    text: 'Nog eentje voor de Most OK Game: dit weet bijna niemand precies, dus schat maar raak.',
    partner: 'OK', game: 'Most OK Game',
    question: 'Hoeveel liter water is er nodig om de 400 meter-baan van Thialf op te bouwen?',
    unit: 'liter', placeholder: 'bijv. 50.000',
    answerNote: '[aanleveren: juiste antwoord van Thialf (ijsmeester)]',
    prize: '[aanleveren: prijs OK]', revealAt: 'in de dweilpauze',
  },
  {
    id: 'm7', kind: 'share', day: 'Vandaag', time: '09:06',
    text: 'Schaatsen is leuker samen. Wie neem jij mee naar Thialf? Stuur deze app door, dan plannen jullie samen.',
  },
];

/** Minuten na aanmelden waarop elk bericht ‘binnenkomt’ (demo; in productie bepaalt de flow-tool dit). */
export const arrivalOffsetsMin: Record<string, number> = { m1: 0, m2: 2, m3: 5, m4: 9, m5: 14, m6: 20, m8: 24, m9: 26, m7: 30 };

/** Voorbeelden van geautomatiseerde berichten die later in de flow komen (ter inspiratie, zie CONTENT-CHECKLIST.md). */
export const plannedFlow = [
  { trigger: '14 dagen voor toernooi', text: 'Nog twee weken! Dit is het programma op jouw dag(en). Welke afstand wil jij niet missen?' },
  { trigger: '3 dagen voor toernooi', text: 'Praktisch: deuren open om [tijd], parkeer op [P], neem je e-ticket mee. Pin-only in Thialf.' },
  { trigger: 'Dag van toernooi, 08:00', text: 'Vandaag is de dag! Actuele verkeersinfo rond Heerenveen: [live]. Tot straks in Thialf 🧡' },
  { trigger: 'Locatie: in Thialf', text: 'Welkom in Thialf! Jouw ingang: [X]. Horeca-tip: [aanbieding]. Doe mee met de tribunewave om 14:00.' },
  { trigger: 'Tijdens sessie', text: 'LIVE: [naam] rijdt zojuist een baanrecord op de 1000m! 🔥' },
  { trigger: 'Partner-activatie OK – 1 uur voor dweilpauze', text: 'Most OK Game: schattingsvraag (bijv. "Hoeveel liter water zit er in de ijsvloer?"). Antwoorden tot de dweilpauze.' },
  { trigger: 'Partner-activatie OK – in de dweilpauze', text: 'Onthulling op het scorebord + in de app: het juiste antwoord, jouw afwijking en de winnaar met het meest OK antwoord. Prijs: [OK].' },
  { trigger: 'Direct na afloop', text: 'Bedankt voor je komst! Hoe heb je het ervaren? (sliders: sfeer, zicht, horeca, bereikbaarheid)' },
  { trigger: '1 dag na afloop', text: 'Fotoalbum van jouw dag + highlights-video. En: tickets voor [volgend toernooi] nu met early-bird korting.' },
];
