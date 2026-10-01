/**
 * Mock-berichtenstroom, geïnspireerd op de CLOSE-flow (Ajax Fan App):
 * automatische berichten op het juiste moment, met polls, beeld en CTA's.
 * In productie komen deze uit een CMS/flow-builder met triggers
 * (x dagen voor event, op basis van ticketdata, locatie, antwoorden).
 */

import { asset } from './tournaments';

export type Message =
  | { id: string; kind: 'text'; day: string; time: string; text: string }
  | { id: string; kind: 'image'; day: string; time: string; text: string; image: string }
  | { id: string; kind: 'cta'; day: string; time: string; text: string; label: string; href: string }
  | { id: string; kind: 'poll'; day: string; time: string; text: string; options: { id: string; label: string; pct: number }[] }
  | { id: string; kind: 'route'; day: string; time: string; text: string; tournamentId: string };

export const messages: Message[] = [
  {
    id: 'm1', kind: 'text', day: 'Vandaag', time: '09:00',
    text: 'Welkom! 🧊 Fijn dat je erbij bent. In deze app vind je alles over de toernooien die jij bezoekt: programma, tickets, praktische info en op het juiste moment een seintje van ons.',
  },
  {
    id: 'm2', kind: 'image', day: 'Vandaag', time: '09:01',
    text: 'Het seizoen begint over een paar weken met het World Cup Kwalificatie Toernooi. Niets is zeker, alles staat op scherp. Dit is waar het seizoen begint.',
    image: asset('img/hero-skater.png'),
  },
  {
    id: 'm3', kind: 'poll', day: 'Vandaag', time: '09:02',
    text: 'Hoe kom je naar Thialf? Dan sturen we je vlak voor het toernooi de beste route en actuele verkeersinfo.',
    options: [
      { id: 'car', label: 'Met de auto 🚗', pct: 64 },
      { id: 'train', label: 'Trein + bus 🚆', pct: 27 },
      { id: 'bike', label: 'Fiets / lopend 🚲', pct: 9 },
    ],
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
];

/** Voorbeelden van geautomatiseerde berichten die later in de flow komen (ter inspiratie, zie CONTENT-CHECKLIST.md). */
export const plannedFlow = [
  { trigger: '14 dagen voor toernooi', text: 'Nog twee weken! Dit is het programma op jouw dag(en). Welke afstand wil jij niet missen?' },
  { trigger: '3 dagen voor toernooi', text: 'Praktisch: deuren open om [tijd], parkeer op [P], neem je e-ticket mee. Pin-only in Thialf.' },
  { trigger: 'Dag van toernooi, 08:00', text: 'Vandaag is de dag! Actuele verkeersinfo rond Heerenveen: [live]. Tot straks in Thialf 🧡' },
  { trigger: 'Locatie: in Thialf', text: 'Welkom in Thialf! Jouw ingang: [X]. Horeca-tip: [aanbieding]. Doe mee met de tribunewave om 14:00.' },
  { trigger: 'Tijdens sessie', text: 'LIVE: [naam] rijdt zojuist een baanrecord op de 1000m! 🔥' },
  { trigger: 'Direct na afloop', text: 'Bedankt voor je komst! Hoe heb je het ervaren? (sliders: sfeer, zicht, horeca, bereikbaarheid)' },
  { trigger: '1 dag na afloop', text: 'Fotoalbum van jouw dag + highlights-video. En: tickets voor [volgend toernooi] nu met early-bird korting.' },
];
