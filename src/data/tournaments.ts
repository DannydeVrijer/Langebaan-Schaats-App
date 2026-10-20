/**
 * Toernooidata seizoen 2026/2027.
 * Bron: https://www.schaatsen.nl/schaatsfan/tickets/langebaanschaatstickets/
 *
 * Alles met `todo: true` of tekst tussen [ ] is placeholder en moet nog
 * aangeleverd worden — zie CONTENT-CHECKLIST.md.
 */

export type SessionItem = { time: string; what: string; note?: string; kind?: 'rit' | 'pauze' | 'deuren' | 'ceremonie' };
export type ProgramDay = { label: string; date: string; items: SessionItem[] };

export type Tournament = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  subtitle: string;
  start: string; // ISO
  end: string; // ISO
  venue: string;
  city: string;
  country: 'NL' | 'INT';
  ticketUrl?: string;
  ticketStatus: 'onsale' | 'soon' | 'offsale' | 'soldout';
  hero: string;
  description: string;
  highlights: string[];
  program: ProgramDay[];
  todo?: string[];
  /* --- conversie-signalen: alleen vullen met geverifieerde data (zie MARKETING-TECHNIEKEN.md) --- */
  fansGoing?: string;        // sociale bewijskracht, bron: ticketshop
  scarcity?: string;         // schaarste, bron: live beschikbaarheid
  earlyBirdUntil?: string;   // urgentie, bron: prijsplanning
  badge?: 'populair' | 'laatste-kans' | 'nieuw';
  lossFrame?: string;        // één feitelijke zin waarom dit toernooi uniek is
  topSkaters?: string[];     // schaatser-id's (zie skaters.ts) die (naar verwachting) aan de start staan
  liveUrl?: string;          // liveresults.schaatsen.nl event-pagina zodra bekend
  extras?: { partner: string; text: string }[]; // partner-extra's op het event (bron: magievanschaatsen.nl)
  infoUrl?: string;          // eventpagina magievanschaatsen.nl
};

const THIALF = 'Thialf';
export const asset = (p: string) => import.meta.env.BASE_URL + p.replace(/^\//, '');

const stdProgramNote = 'Definitief tijdschema volgt zodra de ISU/KNSB dit publiceert.';

export const tournaments: Tournament[] = [
  {
    id: 'wckt',
    topSkaters: ['jenning-de-boo','femke-kok','kjeld-nuis','patrick-roest','joy-beune','joep-wennemars'],
    liveUrl: 'https://liveresults.schaatsen.nl/events',
    lossFrame: 'Hier worden de startplekken voor het hele seizoen verdeeld.',
    slug: 'wk-kwalificatie-toernooi',
    name: 'World Cup Kwalificatietoernooi',
    shortName: 'WCKT',
    subtitle: 'Wie schaatst dit seizoen voor Oranje?',
    start: '2026-10-30',
    end: '2026-11-01',
    venue: THIALF,
    city: 'Heerenveen',
    country: 'NL',
    ticketUrl: 'https://tickets.schaatsen.nl/7ea4c49ff00f41d3acc549e0fdab376f/tickets',
    infoUrl: 'https://www.magievanschaatsen.nl/worldcupkwalificatietoernooi',
    ticketStatus: 'onsale',
    hero: asset('img/hero-skater.png'),
    description:
      'De seizoensopener in Thialf en dé kwalificatie voor de ISU World Cups. Drie dagen lang strijden de Nederlandse schaatstoppers – inclusief de medaillewinnaars van Milaan-Cortina – om een plek in de World Cup-ploeg. Niets is zeker, alles staat op scherp.',
    highlights: ['Startbewijzen voor de ISU World Cups', 'Alle afstanden, massastart, teamachtervolging én sprintmarathon', 'Nederlandse top compleet'],
    /* Bron: magievanschaatsen.nl/worldcupkwalificatietoernooi (20 okt 2026). Programma kan nog wijzigen. */
    program: [
      { label: 'Vr', date: '2026-10-30', items: [
        { time: '16:30', what: 'Deuren open', kind: 'deuren' },
        { time: '17:00', what: 'Stadionprogramma', kind: 'ceremonie', note: 'Entertainment en opwarmen voor de eerste rit' },
        { time: '18:00', what: '5000m mannen', note: 'Start wedstrijden' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '[ ]', what: '500m mannen (1e omloop)' },
        { time: '[ ]', what: '1500m vrouwen' },
        { time: '[ ]', what: '500m mannen (2e omloop)' },
        { time: '22:15', what: 'Einde programma', kind: 'ceremonie' },
      ]},
      { label: 'Za', date: '2026-10-31', items: [
        { time: '12:40', what: 'Deuren open', kind: 'deuren' },
        { time: '13:10', what: 'Stadionprogramma', kind: 'ceremonie' },
        { time: '14:10', what: '3000m vrouwen', note: 'Start wedstrijden' },
        { time: '[ ]', what: '500m vrouwen (1e omloop)' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '[ ]', what: '1500m mannen' },
        { time: '[ ]', what: '500m vrouwen (2e omloop)' },
        { time: '[ ]', what: 'Sprintmarathon vrouwen & mannen' },
        { time: '17:40', what: 'Einde programma', kind: 'ceremonie' },
      ]},
      { label: 'Zo', date: '2026-11-01', items: [
        { time: '10:30', what: 'Deuren open', kind: 'deuren' },
        { time: '11:00', what: 'Stadionprogramma', kind: 'ceremonie' },
        { time: '12:00', what: '10.000m mannen', note: 'Start wedstrijden' },
        { time: '[ ]', what: '5000m vrouwen' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '[ ]', what: '1000m vrouwen' },
        { time: '[ ]', what: '1000m mannen' },
        { time: '[ ]', what: 'Massastart vrouwen & mannen' },
        { time: '[ ]', what: 'Teamachtervolging vrouwen & mannen' },
        { time: '19:00', what: 'Einde programma', kind: 'ceremonie' },
      ]},
    ],
    extras: [
      { partner: 'X²O', text: 'Gratis Ducky-muts, zolang de voorraad strekt.' },
      { partner: 'Odido', text: 'Gratis laadzuilen voor je telefoon op de omloop.' },
      { partner: 'Schaatsteam Reggeborgh', text: 'Merchandise bij de Sven Kramer-bocht; een deel van de opbrengst gaat naar de Reggeborgh Foundation.' },
      { partner: 'Staatsloterij', text: 'Scan & Win-actie – meer info volgt.' },
      { partner: 'Dweilpauze', text: 'Entertainment tijdens de dweilpauzes wordt later bekendgemaakt.' },
    ],
    todo: ['Starttijden per afstand (nu alleen blokstart/einde)', 'Ticketprijzen & categorieën', 'Deelnemerslijst', 'Dweilpauze-entertainment'],
  },
  {
    id: 'wc-heerenveen',
    topSkaters: ['jordan-stolz','femke-kok','jenning-de-boo','jutta-leerdam','joy-beune','bart-swings'],
    liveUrl: 'https://liveresults.schaatsen.nl/events',
    lossFrame: 'De enige World Cup in Nederland dit seizoen.',
    slug: 'isu-world-cup-heerenveen',
    name: 'ISU World Cup Heerenveen',
    shortName: 'World Cup',
    subtitle: 'De wereldtop in Thialf',
    start: '2026-12-04',
    end: '2026-12-06',
    venue: THIALF,
    city: 'Heerenveen',
    country: 'NL',
    ticketUrl: 'https://tickets.schaatsen.nl/f98606597b26473a9dd75d9747fa8ef7/tickets',
    ticketStatus: 'onsale',
        hero: asset('img/hero-jutta.png'),
    description:
      'De enige World Cup in Nederland dit seizoen. De complete wereldtop komt naar Heerenveen en de Nederlandse ploeg verdedigt de eer op eigen ijs. Drie dagen topsport in het luidste schaatsstadion ter wereld.',
    highlights: ['Wereldtop aanwezig', 'Massastart & teamsprint', 'Fan village'],
    program: [
      { label: 'Vr', date: '2026-12-04', items: [
        { time: '16:30', what: 'Deuren open' },
        { time: '18:00', what: 'Divisie B' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '19:30', what: 'Divisie A – 500m, 1500m', note: stdProgramNote },
      ]},
      { label: 'Za', date: '2026-12-05', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Divisie A – 1000m, 3000/5000m' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '17:00', what: 'Teamsprint' },
      ]},
      { label: 'Zo', date: '2026-12-06', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Divisie A – 500m, 1500m' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:30', what: 'Massastart dames & heren' },
      ]},
    ],
    todo: ['Programma per dag', 'Ticketprijzen', 'Side-events / fan village'],
  },
  {
    id: 'nk-allround-sprint',
    topSkaters: ['patrick-roest','joy-beune','jenning-de-boo','femke-kok','marijke-groenewoud','merijn-scheperkamp'],
    liveUrl: 'https://liveresults.schaatsen.nl/events',
    slug: 'nk-allround-sprint',
    name: 'OK NK Allround & Sprint',
    shortName: 'NK Allround',
    subtitle: 'Wie wordt kampioen van Nederland?',
    start: '2026-12-27',
    end: '2026-12-28',
    venue: THIALF,
    city: 'Heerenveen',
    country: 'NL',
    ticketUrl: 'https://tickets.schaatsen.nl/0a16c472d0284f24bb9a3a1f7d746efa/tickets',
    ticketStatus: 'onsale',
        hero: asset('img/hero-skater.png'),
    description:
      'Tussen Kerst en Oud & Nieuw: het klassieke NK Allround en NK Sprint in één weekend. Vier afstanden, één klassement, één kampioen. Plus de tickets naar het EK.',
    highlights: ['Allround- én sprintkampioen', 'Kwalificatie EK', 'Feestdagen in Thialf'],
    program: [
      { label: 'Zo', date: '2026-12-27', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint: 500m & 1000m (dag 1)' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:00', what: 'Allround: 500m & 3000/5000m' },
      ]},
      { label: 'Ma', date: '2026-12-28', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint: 500m & 1000m (dag 2)' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:00', what: 'Allround: 1500m & 5000/10.000m' },
      ]},
    ],
    todo: ['Programma per dag', 'Ticketprijzen'],
  },
  {
    id: 'ek-allround-sprint',
    topSkaters: ['patrick-roest','joy-beune','kjeld-nuis','femke-kok','antoinette-rijpma-de-jong','joep-wennemars'],
    liveUrl: 'https://liveresults.schaatsen.nl/events',
    lossFrame: 'Een EK in Thialf: dat gebeurt niet elk jaar.',
    slug: 'ek-allround-sprint',
    name: 'ISU EK Allround & Sprint',
    shortName: 'EK',
    subtitle: 'Europees kampioenschap in Thialf',
    start: '2027-01-08',
    end: '2027-01-10',
    venue: THIALF,
    city: 'Heerenveen',
    country: 'NL',
    ticketUrl: 'https://tickets.schaatsen.nl/a1096461a27146138172f9dfc7402c05/tickets',
    ticketStatus: 'onsale',
        hero: asset('img/hero-jutta.png'),
    description:
      'De Europese titelstrijd allround en sprint, in Heerenveen. Drie dagen waarin Nederland, Noorwegen, Italië en de rest van Europa om de titels strijden — en het publiek het verschil maakt.',
    highlights: ['Europese titels', 'Internationale sfeer', 'Oranje thuisvoordeel'],
    program: [
      { label: 'Vr', date: '2027-01-08', items: [
        { time: '16:30', what: 'Deuren open' },
        { time: '18:00', what: 'Sprint 500m & Allround 500m' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '20:00', what: 'Allround 3000/5000m' },
      ]},
      { label: 'Za', date: '2027-01-09', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint 1000m & Allround 1500m' },
      ]},
      { label: 'Zo', date: '2027-01-10', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint 500m & 1000m (dag 2)' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:30', what: 'Allround 5000/10.000m – finale' },
      ]},
    ],
    todo: ['Programma per dag', 'Ticketprijzen', 'EN-content voor buitenlandse fans'],
  },
  {
    id: 'nk-afstanden',
    topSkaters: ['jenning-de-boo','femke-kok','joep-wennemars','marijke-groenewoud','chris-huizinga','jorrit-bergsma'],
    liveUrl: 'https://liveresults.schaatsen.nl/events',
    lossFrame: 'Laatste toernooi in Thialf dit seizoen.',
    slug: 'nk-afstanden',
    name: 'OK NK Afstanden',
    shortName: 'NK Afstanden',
    subtitle: 'De laatste tickets voor het WK',
    start: '2027-01-22',
    end: '2027-01-24',
    venue: THIALF,
    city: 'Heerenveen',
    country: 'NL',
    ticketUrl: 'https://tickets.schaatsen.nl/15b22d2a3f7249ce8a7d77c06bd410a9/tickets',
    ticketStatus: 'onsale',
        hero: asset('img/hero-skater.png'),
    description:
      'Per afstand één Nederlands kampioen én de laatste kans op een WK-ticket. Het NK Afstanden is traditioneel het toernooi waar de grootste verrassingen vallen.',
    highlights: ['Alle afstanden', 'Laatste WK-kwalificatie', 'Nationale titels'],
    program: [
      { label: 'Vr', date: '2027-01-22', items: [
        { time: '17:00', what: 'Deuren open' },
        { time: '18:30', what: '500m dames & heren' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '20:00', what: '5000m heren' },
      ]},
      { label: 'Za', date: '2027-01-23', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: '1000m dames & heren' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:00', what: '3000m dames / 10.000m heren' },
      ]},
      { label: 'Zo', date: '2027-01-24', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: '1500m dames & heren' },
        { time: '[ ]', what: 'Dweilpauze', kind: 'pauze', note: '[aanleveren: dweiltijden per blok]' },
        { time: '16:00', what: 'Massastart & 5000m dames' },
      ]},
    ],
    todo: ['Programma per dag', 'Ticketprijzen'],
  },
];

/** Internationale World Cups – alleen ter info (geen ticketverkoop via schaatsen.nl). */
export const internationalEvents = [
  { name: 'ISU World Cup 1', city: 'Beijing', country: 'CHN', dates: '[datum]' },
  { name: 'ISU World Cup 2', city: 'Obihiro', country: 'JPN', dates: '[datum]' },
  { name: 'ISU World Cup 4', city: 'Stavanger', country: 'NOR', dates: '[datum]' },
  { name: 'ISU World Cup 5', city: 'Salt Lake City', country: 'USA', dates: '[datum]' },
  { name: 'ISU World Cup 6', city: 'Calgary', country: 'CAN', dates: '[datum]' },
  { name: 'WK Afstanden', city: 'Beijing', country: 'CHN', dates: '[datum]' },
];

export const venueInfo = {
  name: 'Thialf',
  address: 'Pim Mulierlaan 1, 8443 DA Heerenveen',
  mapsUrl: 'https://maps.google.com/?q=Thialf,+Pim+Mulierlaan+1,+Heerenveen',
  /* Bron: magievanschaatsen.nl (20 okt 2026) */
  parking: 'Koop vooraf een parkeerticket; parkeren in de woonwijken rond Thialf wordt gecontroleerd. Afzetten kan bij de Kiss & Ride bij P1. Openbare laadpalen voor elektrische auto\'s in de omgeving. [aanleveren: parkeerterreinen en tarieven]',
  parkingTicketUrl: '[aanleveren: link parkeerticket in ticketshop (Paylogic-product)]',
  publicTransport:
    'Stap uit op station Heerenveen en neem de Thialf Express (Qbuzz lijn 815). De bus rijdt vanaf 1,5 uur vóór de eerste wedstrijd tot 1,5 uur na de laatste.',
  bike: 'Fietsenstallingen bij Thialf. [aanleveren: bewaakt/onbewaakt]',
  doorsOpen: 'Deuren open: vr 16:30 · za 12:40 · zo 10:30 (WCKT). Daarna eerst het stadionprogramma, de wedstrijden starten een uur later.',
  bags: 'Tas maximaal A4-formaat. Geen rugzakken, sporttassen, koffers of trolleys – er zijn geen kluisjes. Kinderwagens, buggy\'s, rollators en wandeldriepoten blijven buiten (beperkte ruimte bij de informatiebalie, op eigen risico); een wandelstok mag mee.',
  houseRules: [
    'Eten en drinken van buiten is niet toegestaan; blik, glas, flessen, koelboxen en klapstoelen blijven buiten.',
    'Fotograferen mag vanaf de tribune met een objectief tot 55 mm.',
    'Roken en vapen is verboden.',
    'Op de staantribunes zijn kussens, dekens en eigen stoelen niet toegestaan.',
    'Honden zijn niet welkom, behalve blindengeleide- en hulphonden.',
    'Legitimatie verplicht bij alcoholverkoop (NIX18).',
  ],
  accessibility: 'Mindervaliden hebben eigen tickets en een eigen tribune bij de Sven Kramer-bocht, met één begeleider per bezoeker. Rolstoelen zijn buiten die plek niet toegestaan. Er is geen aparte kolfruimte. [aanleveren: mindervalide parkeren, liften]',
  food: 'Cateringpunten op de omloop achter de Sven Kramer-bocht, bij de West- en Oost-tribune en bij de Ireen Wüst-bocht. Betalen met muntjes van € 4,50 uit de muntautomaten (alleen pin, geen contant). Zitten kan in de Brasserie op de begane grond bij de hoofdentree.',
  cups: 'Bekersysteem: bij de entree krijg je een recycle-token, die ruil je om voor een beker en lever je na afloop weer in. Zonder beker of token betaal je een halve munt extra.',
  lockers: 'Geen kluisjes of garderobe – neem alleen mee wat in een A4-tas past. [aanleveren: toiletten, EHBO, verloren voorwerpen]',
  charging: 'Gratis laadzuilen van Odido voor je telefoon op de omloop. [aanleveren: wifi]',
  familyInfo: '[aanleveren: kinderen t/m x jaar gratis? Kids-activiteiten?]',
  tickets: 'Scan je ticket vanaf je telefoon bij de ingang; printen mag ook als de barcode leesbaar is. Omruilen naar een andere dag kan zolang er plek is; terugbetalen is niet mogelijk. Vragen over je tickets: klantenservice van Paylogic.',
  contact: 'schaatsen@houseofsports.nl',
};

/** Praktische info in reisvolgorde. Teksten tussen [ ] zijn placeholders. */
export const journey = [
  { id: 'aankomst', title: 'Aankomst', items: [
    { icon: 'car', t: 'Met de auto', s: venueInfo.parking },
    { icon: 'ticket', t: 'Parkeerticket vooraf', s: 'Koop je parkeerplek vooraf en rij zonder zoeken naar binnen. [aanleveren: parkeerproduct/link]', to: '/embed/parkeren' },
    { icon: 'train', t: 'Trein + Thialf Express', s: venueInfo.publicTransport },
    { icon: 'skate', t: 'Fiets & elektrisch', s: venueInfo.bike },
  ]},
  { id: 'binnenkomen', title: 'Binnenkomen', items: [
    { icon: 'ticket', t: 'Je ticket', s: venueInfo.tickets },
    { icon: 'calendar', t: 'Deuren open', s: venueInfo.doorsOpen },
    { icon: 'rules', t: 'Wat mag mee', s: venueInfo.bags },
    { icon: 'info', t: 'Huisregels', s: venueInfo.houseRules.join(' ') },
  ]},
  { id: 'binnen', title: 'In Thialf', items: [
    { icon: 'food', t: 'Eten & drinken', s: venueInfo.food },
    { icon: 'ice', t: 'Beker & token', s: venueInfo.cups },
    { icon: 'map', t: 'Kluisjes, toiletten, EHBO', s: venueInfo.lockers },
    { icon: 'info', t: 'Opladen & wifi', s: venueInfo.charging },
  ]},
  { id: 'iedereen', title: 'Kinderen & toegankelijkheid', items: [
    { icon: 'star', t: 'Kinderen & gezin', s: venueInfo.familyInfo },
    { icon: 'access', t: 'Toegankelijkheid', s: venueInfo.accessibility },
  ]},
  { id: 'vertrek', title: 'Vertrek', items: [
    { icon: 'train', t: 'Thialf Express terug', s: 'De bus naar station Heerenveen rijdt tot 1,5 uur na de laatste wedstrijd.' },
    { icon: 'car', t: 'Met de auto', s: '[aanleveren: uitstroom parkeren, verloren voorwerpen]' },
  ]},
] as const;

export const dayChecklist = ['E-ticket op je telefoon (en opgeladen)', 'Pinpas – muntjes alleen met pin, geen contant', 'Tas niet groter dan A4 (geen rugzak)', 'Warme laag: op de tribune is het ±8 °C', 'Oranje aan 🧡', 'Favoriete schaatsers gekozen in de app'];

export const faq = [
  { q: 'Hoe ontvang en gebruik ik mijn tickets?', a: venueInfo.tickets },
  { q: 'Kan ik mijn ticket omruilen of terugkrijgen?', a: 'Omruilen voor een andere dag kan zolang er nog plek is. Je geld terugkrijgen is helaas niet mogelijk. Neem contact op met de klantenservice van Paylogic.' },
  { q: 'Zijn er kortingen voor kinderen, studenten of groepen?', a: '[aanleveren]' },
  { q: 'Welke ingang moet ik gebruiken?', a: '[aanleveren: ingangen per tribune/vak, plattegrond]' },
  { q: 'Wat mag ik meenemen?', a: venueInfo.bags + ' ' + venueInfo.houseRules.slice(0, 2).join(' ') },
  { q: 'Mag ik een vlag of spandoek meenemen?', a: '[aanleveren]' },
  { q: 'Hoe kom ik bij Thialf?', a: venueInfo.publicTransport + ' Met de auto: ' + venueInfo.parking },
  { q: 'Hoe betaal ik in Thialf?', a: venueInfo.food + ' ' + venueInfo.cups },
  { q: 'Ik zit in een rolstoel – waar kan ik zitten?', a: venueInfo.accessibility },
  { q: 'Wat als een sessie wordt afgelast of verplaatst?', a: '[aanleveren: restitutiebeleid]' },
  { q: 'Zijn er arrangementen of lounges?', a: '[aanleveren: hospitality/lounge-aanbod + link]' },
  { q: 'Ik heb een andere vraag', a: 'Mail naar ' + venueInfo.contact + '.' },
];

export const sponsors = ['KNSB', 'Thialf', 'OK', 'X²O', 'Odido', 'Reggeborgh', 'Staatsloterij', 'Daikin', 'Univé'];

export const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/schaatsen.nl' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@schaatsen.nl' },
  { label: 'Facebook', url: 'https://www.facebook.com/schaatsen.nl' },
  { label: 'YouTube', url: 'https://www.youtube.com/@schaatsennl' },
  { label: 'schaatsen.nl', url: 'https://www.schaatsen.nl' },
];

export const byId = (id: string) => tournaments.find((t) => t.id === id);

export const nlDate = (iso: string, opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) =>
  new Date(iso + 'T12:00:00').toLocaleDateString('nl-NL', opts);

export const dateRange = (t: Tournament) => {
  const s = new Date(t.start + 'T12:00:00');
  const e = new Date(t.end + 'T12:00:00');
  const sameMonth = s.getMonth() === e.getMonth();
  const month = (d: Date) => d.toLocaleDateString('nl-NL', { month: 'long' });
  return sameMonth
    ? `${s.getDate()} – ${e.getDate()} ${month(e)} ${e.getFullYear()}`
    : `${s.getDate()} ${month(s)} – ${e.getDate()} ${month(e)} ${e.getFullYear()}`;
};

export const hoursUntil = (iso: string) => Math.max(0, Math.round((new Date(iso + 'T00:00:00').getTime() - Date.now()) / 3_600_000));

export const daysUntil = (iso: string) => {
  const now = new Date();
  const target = new Date(iso + 'T00:00:00');
  return Math.ceil((target.getTime() - now.getTime()) / 86_400_000);
};
