/**
 * Merkcontent, overgenomen van magievanschaatsen.nl (campagnesite).
 * Cijfers en quotes dateren van seizoen '24/25 → bevestigen/actualiseren (zie CONTENT-CHECKLIST.md).
 */

export const usps = [
  { t: 'Schaatsen zit in ons DNA', s: 'Van de Elfstedentocht tot natuurijs: zodra het vriest, gaan de schaatsen aan. Vrijheid, sport en plezier in één.' },
  { t: 'Het schaatshart van de wereld', s: 'Thialf is dé plek waar topschaatsers geschiedenis schrijven en fans samenkomen voor spannende races.' },
  { t: 'Nederlandse topprestaties', s: 'Nederland domineert het schaatsen al jaren: talloze wereldtitels en olympische medailles.' },
  { t: 'Groot oranjefeest 🧡', s: 'Alle tribunes kleuren oranje. Fans moedigen hun schaatsers aan in de luidste schaatstempel ter wereld.' },
];

export type Testimonial = { quote: string; name: string; role: 'schaatser' | 'fan' };
export const testimonials: Testimonial[] = [
  { quote: 'Als schaatser is het zo bijzonder om voor een vol Thialf te mogen rijden. Echt een tunnel van kabaal waar je doorheen gaat!', name: 'Kjeld Nuis', role: 'schaatser' },
  { quote: 'De ambiance in Thialf is altijd magisch. Het publiek tilt je echt naar een hoger niveau.', name: 'Jutta Leerdam', role: 'schaatser' },
  { quote: 'Rijden in Thialf voelt alsof je voor een thuispubliek speelt. Dat geeft je vleugels.', name: 'Chris Huizinga', role: 'schaatser' },
  { quote: 'We staan altijd met vrienden uit Dirkshorn in de Ireen Wüst-bocht, zodat iedereen ons op tv weet te vinden.', name: 'Bianca & Mariëlle', role: 'fan' },
  { quote: 'Ik kom voor de sfeer en de ambiance. En het is mooi om persoonlijke records van dichtbij te zien.', name: 'Robert', role: 'fan' },
  { quote: 'De gezelligheid en de sfeer, dat maakt Thialf zo magisch.', name: 'Linda en Fily', role: 'fan' },
];

/** Campagnecopy – korte regels voor hero’s, berichten en CTA’s. */
export const copy = {
  manifest: ['Het betoverende theater waar helden opstaan.', 'Grootheden op het ijs. Fans op de banken.', 'Dichterbij ga je niet komen. Meer ga je niet voelen.'],
  ctaPrimary: 'Ja, dit wil ik live meemaken',
  ctaSecondary: 'Bekijk beschikbaarheid',
  closing: 'Boek je tickets en juich je favoriete schaatsers naar de overwinning.',
};
