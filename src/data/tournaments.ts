/**
 * Toernooidata seizoen 2026/2027.
 * Bron: https://www.schaatsen.nl/schaatsfan/tickets/langebaanschaatstickets/
 *
 * Alles met `todo: true` of tekst tussen [ ] is placeholder en moet nog
 * aangeleverd worden — zie CONTENT-CHECKLIST.md.
 */

export type SessionItem = { time: string; what: string; note?: string };
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
    ticketStatus: 'onsale',
        hero: asset('img/hero-skater.png'),
    description:
      'De seizoensopener in Thialf. Drie dagen lang strijden de beste Nederlandse schaatsers om de felbegeerde startplekken voor de ISU World Cups en kampioenschappen. Niets is zeker, alles staat op scherp.',
    highlights: ['Startbewijzen World Cup & EK', 'Alle afstanden', 'Nederlandse top compleet'],
    program: [
      { label: 'Vr', date: '2026-10-30', items: [
        { time: '17:00', what: 'Deuren open', note: '[aanleveren: exacte tijd]' },
        { time: '18:30', what: '500m dames & heren', note: stdProgramNote },
        { time: '20:00', what: '3000m dames / 5000m heren' },
      ]},
      { label: 'Za', date: '2026-10-31', items: [
        { time: '13:00', what: 'Deuren open' },
        { time: '14:30', what: '1000m dames & heren' },
        { time: '16:30', what: '1500m dames & heren' },
      ]},
      { label: 'Zo', date: '2026-11-01', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: '500m (2e omloop) & massastart' },
        { time: '16:00', what: '5000m dames / 10.000m heren' },
      ]},
    ],
    todo: ['Programma per dag', 'Ticketprijzen & categorieën', 'Deelnemerslijst'],
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
        { time: '19:30', what: 'Divisie A – 500m, 1500m', note: stdProgramNote },
      ]},
      { label: 'Za', date: '2026-12-05', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Divisie A – 1000m, 3000/5000m' },
        { time: '17:00', what: 'Teamsprint' },
      ]},
      { label: 'Zo', date: '2026-12-06', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Divisie A – 500m, 1500m' },
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
    name: 'NK Allround & Sprint',
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
        { time: '16:00', what: 'Allround: 500m & 3000/5000m' },
      ]},
      { label: 'Ma', date: '2026-12-28', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint: 500m & 1000m (dag 2)' },
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
        { time: '20:00', what: 'Allround 3000/5000m' },
      ]},
      { label: 'Za', date: '2027-01-09', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint 1000m & Allround 1500m' },
      ]},
      { label: 'Zo', date: '2027-01-10', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: 'Sprint 500m & 1000m (dag 2)' },
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
    name: 'NK Afstanden',
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
        { time: '20:00', what: '5000m heren' },
      ]},
      { label: 'Za', date: '2027-01-23', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: '1000m dames & heren' },
        { time: '16:00', what: '3000m dames / 10.000m heren' },
      ]},
      { label: 'Zo', date: '2027-01-24', items: [
        { time: '12:00', what: 'Deuren open' },
        { time: '13:30', what: '1500m dames & heren' },
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
  parking: '[aanleveren: parkeerterreinen P1/P2/P3, tarieven, voorverkoop parkeerticket, invalidenparkeren]',
  publicTransport:
    'Station Heerenveen ligt op ca. 2 km van Thialf. [aanleveren: pendelbus/looproute, buslijnen, laatste trein-advies]',
  bike: '[aanleveren: fietsenstalling, bewaakt/onbewaakt]',
  doorsOpen: '[aanleveren: standaard tijd deuren open per sessie]',
  houseRules: [
    'Legitimatie verplicht bij alcoholverkoop (NIX18).',
    'Geen eigen eten/drinken, glas of professionele camera\'s. [bevestigen]',
    'Vuurwerk, toeters en vlaggenstokken: [beleid aanleveren]',
    'Rookvrij stadion.',
  ],
  accessibility: '[aanleveren: rolstoelplaatsen, begeleiderstickets, liften, mindervalide parkeren]',
  food: '[aanleveren: horeca-aanbod, betaalwijze (pin only?), munten/cashless]',
  lockers: '[aanleveren: garderobe/kluisjes]',
  familyInfo: '[aanleveren: kinderen t/m x jaar gratis? Kids-activiteiten?]',
};

/** Praktische info in reisvolgorde. Teksten tussen [ ] zijn placeholders. */
export const journey = [
  { id: 'aankomst', title: 'Aankomst', items: [
    { icon: 'car', t: 'Met de auto', s: venueInfo.parking },
    { icon: 'train', t: 'Trein + bus', s: venueInfo.publicTransport },
    { icon: 'skate', t: 'Fiets', s: venueInfo.bike },
  ]},
  { id: 'binnenkomen', title: 'Binnenkomen', items: [
    { icon: 'ticket', t: 'Ingang per vak', s: '[aanleveren: welke ingang bij welk vak/tribune; toon je e-ticket (QR) op je telefoon]' },
    { icon: 'calendar', t: 'Deuren open', s: venueInfo.doorsOpen },
    { icon: 'rules', t: 'Wat mag mee', s: '[aanleveren: tassenbeleid, eten/drinken, camera\'s, vlaggen/spandoeken, toeters]' },
  ]},
  { id: 'binnen', title: 'In Thialf', items: [
    { icon: 'food', t: 'Eten & drinken', s: venueInfo.food },
    { icon: 'map', t: 'Toiletten, EHBO, garderobe', s: venueInfo.lockers },
    { icon: 'info', t: 'Wifi & opladen', s: '[aanleveren: gratis wifi? netwerknaam; oplaadpunten]' },
  ]},
  { id: 'iedereen', title: 'Kinderen & toegankelijkheid', items: [
    { icon: 'star', t: 'Kinderen & gezin', s: venueInfo.familyInfo },
    { icon: 'access', t: 'Toegankelijkheid', s: venueInfo.accessibility },
  ]},
  { id: 'vertrek', title: 'Vertrek', items: [
    { icon: 'car', t: 'Na afloop', s: '[aanleveren: uitstroom parkeren, laatste bus/trein, verloren voorwerpen]' },
  ]},
] as const;

export const dayChecklist = ['E-ticket op je telefoon (en opgeladen)', 'Pinpas – Thialf is cashless [bevestigen]', 'Warme laag: op de tribune is het ±8 °C', 'Oranje aan 🧡', 'Favoriete schaatsers gekozen in de app'];

export const faq = [
  { q: 'Hoe ontvang ik mijn tickets?', a: '[aanleveren] Bijv.: Je tickets ontvang je per e-mail als e-ticket. Toon de QR-code op je telefoon bij de ingang.' },
  { q: 'Kan ik mijn tickets doorverkopen of overdragen?', a: '[aanleveren: beleid resale/overdracht via ticketshop]' },
  { q: 'Zijn er kortingen voor kinderen, studenten of groepen?', a: '[aanleveren]' },
  { q: 'Welke ingang moet ik gebruiken?', a: '[aanleveren: ingangen per tribune/vak, plattegrond]' },
  { q: 'Mag ik een vlag of spandoek meenemen?', a: '[aanleveren]' },
  { q: 'Waar parkeer ik?', a: venueInfo.parking },
  { q: 'Wat als een sessie wordt afgelast of verplaatst?', a: '[aanleveren: restitutiebeleid]' },
  { q: 'Zijn er arrangementen of lounges?', a: '[aanleveren: hospitality/lounge-aanbod + link]' },
];

export const sponsors = ['KNSB', 'Thialf', 'Daikin', 'Univé', '[sponsor]', '[sponsor]'];

export const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/schaatsen.nl' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@schaatsen.nl' },
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
