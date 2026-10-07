/**
 * Uitleg voor (nieuwe) fans: toernooitypen, basisregels, begrippen.
 * Algemene, controleerbare schaatskennis. Specifieke reglementsdetails (ISU/KNSB)
 * zijn bewust algemeen gehouden; alles tussen [ ] moet nog door de KNSB
 * worden gecheckt – zie CONTENT-CHECKLIST.md.
 */

export type ExplainTopic = {
  id: string;
  title: string;
  teaser: string;
  icon: 'trophy' | 'calendar' | 'speed' | 'flag' | 'rules' | 'ice' | 'users' | 'globe';
  sections: { h: string; p: string }[];
};

export const explainTopics: ExplainTopic[] = [
  {
    id: 'worldcup',
    title: 'World Cup-serie',
    teaser: 'Hoe de wereldbeker werkt en wat Heerenveen daarin is.',
    icon: 'globe',
    sections: [
      { h: 'Wat is het?', p: 'De ISU World Cup is een serie wedstrijden op verschillende ijsbanen in de wereld, verspreid over het seizoen (november t/m maart). Per afstand verzamelen schaatsers punten; wie aan het einde de meeste punten heeft, wint de World Cup op die afstand.' },
      { h: 'Hoe kom je aan de start?', p: 'Elk land heeft per afstand een beperkt aantal startplekken. In Nederland worden die verdeeld op het World Cup Kwalificatietoernooi (WCKT) in Thialf: wie daar bij de besten eindigt, mag naar de World Cups. Daarom staat er in oktober al zoveel op het spel.' },
      { h: 'Divisie A en B', p: 'Op de World Cup rijden de sterkste rijders in divisie A, de rest in divisie B. Wie in B wint, promoveert; de onderste van A degraderen. Zo blijft het seizoen spannend.' },
      { h: 'Wat zie je in Heerenveen?', p: 'Tijdens de World Cup in Thialf rijden de beste schaatsers ter wereld alle afstanden, inclusief massastart en teamsprint/ploegenachtervolging [check: programma per editie].' },
    ],
  },
  {
    id: 'allround',
    title: 'Allround',
    teaser: 'Vier afstanden, één klassement: het oudste schaatsformat.',
    icon: 'trophy',
    sections: [
      { h: 'Het principe', p: 'Bij allround rijdt iedereen vier afstanden: een korte, twee middellange en een lange. Elke tijd wordt omgerekend naar een 500 meter-gemiddelde (punten). Wie het laagste puntentotaal heeft, is kampioen.' },
      { h: 'De afstanden', p: 'Vrouwen: 500 – 3000 – 1500 – 5000 meter. Mannen: 500 – 5000 – 1500 – 10.000 meter. De lange slotafstand rijden alleen de beste rijders na drie afstanden.' },
      { h: 'Waarom spannend', p: 'Een sprinter kan op de 500 meter een voorsprong pakken, een stayer wint die terug op de lange afstanden. Het klassement kan tot de laatste ronde kantelen.' },
      { h: 'Rekenvoorbeeld', p: '1500 meter in 1.45,00 = 105 seconden ÷ 3 = 35,000 punten (1500 m is 3 × 500 m). 5000 meter in 6.10,00 = 370 seconden ÷ 10 = 37,000 punten.' },
    ],
  },
  {
    id: 'sprint',
    title: 'Sprint',
    teaser: 'Twee keer 500 en twee keer 1000 meter.',
    icon: 'speed',
    sections: [
      { h: 'Het principe', p: 'Het sprinttoernooi bestaat uit twee dagen met telkens een 500 en een 1000 meter. Ook hier worden tijden omgerekend naar punten (1000 m ÷ 2) en wint het laagste totaal.' },
      { h: 'Waar let je op', p: 'Op de 500 meter telt de start: de eerste 100 meter beslissen vaak de rit. Op de 1000 meter gaat het om snelheid vasthouden in de laatste ronde.' },
      { h: 'Binnen en buiten', p: 'Omdat de laatste bocht op de 500 m in de binnenbaan zwaarder is, rijdt iedereen de tweede 500 meter in de andere baan dan de eerste.' },
    ],
  },
  {
    id: 'afstanden',
    title: 'NK Afstanden',
    teaser: 'Per afstand een kampioen én tickets voor de WK.',
    icon: 'calendar',
    sections: [
      { h: 'Het principe', p: 'Geen klassement over meerdere afstanden, maar per afstand een Nederlands kampioen: 500, 1000, 1500, 3000/5000, 5000/10.000 meter en de massastart.' },
      { h: 'Waarom het telt', p: 'Het NK Afstanden is vaak het selectiemoment voor de WK Afstanden (en in olympische jaren het OKT). Een goede dag kan een rijder een WK-ticket opleveren.' },
    ],
  },
  {
    id: 'massastart',
    title: 'Massastart',
    teaser: 'Zestien ronden, tussensprints en een peloton op het ijs.',
    icon: 'users',
    sections: [
      { h: 'Het principe', p: 'Alle rijders starten tegelijk en rijden 16 ronden. Na ronde 4, 8 en 12 is er een tussensprint die punten oplevert (3-2-1); de eindsprint levert de meeste punten op (60-40-20). De rijder met de meeste punten wint – dus meestal de winnaar van de eindsprint.' },
      { h: 'Tactiek', p: 'Rijders schuilen in de wind, ploeggenoten helpen elkaar en soms gaat een groepje vroeg op avontuur. De eerste ronde wordt rustig gereden (geen inhalen).' },
    ],
  },
  {
    id: 'regels',
    title: 'Basisregels',
    teaser: 'Binnen- en buitenbaan, de wissel, de start en wat de vlaggen betekenen.',
    icon: 'rules',
    sections: [
      { h: 'Twee rijders per rit', p: 'Op de individuele afstanden rijden telkens twee rijders tegelijk: één start in de binnenbaan (witte band), één in de buitenbaan (rode band). Ze rijden tegen de klok, niet alleen tegen elkaar: de tijd telt.' },
      { h: 'De wissel', p: 'Elke ronde wisselen de rijders van baan op het rechte stuk tegenover de finish, zodat beiden dezelfde afstand afleggen. Wie van de buitenbaan komt, heeft voorrang bij de wissel.' },
      { h: 'De start', p: 'Commando\'s: "Go to the start" – "Ready" – schot. Wie beweegt voor het schot maakt een valse start. Sinds een aantal seizoenen betekent een valse start bij de eigen rijder directe diskwalificatie [check actuele ISU-regel per seizoen].' },
      { h: 'Vlaggen & signalen', p: 'Een rode vlag (of rood licht) langs de baan betekent: rit afgebroken – bijvoorbeeld na een val in de eerste bocht of een probleem met het ijs. De rijders mogen dan opnieuw starten. Een gele vlag/geel licht wordt gebruikt om aan te geven dat de rit doorgaat of om rijders te waarschuwen [check: exacte signalering in Thialf].' },
      { h: 'Diskwalificatie', p: 'Redenen zijn onder meer: binnendoor rijden over de blokjes, de wissel niet uitvoeren, de tegenstander hinderen of een valse start.' },
    ],
  },
  {
    id: 'dweil',
    title: 'Dweilpauze',
    teaser: 'Waarom de ijsmachines rijden en wanneer je het beste even wegloopt.',
    icon: 'ice',
    sections: [
      { h: 'Wat gebeurt er', p: 'Na een aantal ritten komen de dweilmachines het ijs vlak maken: schaatsen snijden groeven en die kosten snelheid. In Thialf duurt een dweilpauze meestal zo\'n 10 tot 15 minuten [check].' },
      { h: 'Slim plannen', p: 'Dit is hét moment voor een drankje, de toiletten of de fanshop. In het programma in deze app zie je waar de dweilpauzes zitten, zodat je geen rit van je favoriet mist.' },
    ],
  },
  {
    id: 'tijden',
    title: 'Tijden lezen',
    teaser: 'Rondetijden, PR en wat "1.06,18" betekent.',
    icon: 'speed',
    sections: [
      { h: 'Notatie', p: 'Schaatstijden lees je als minuten.seconden,honderdsten: 1.06,18 is 1 minuut, 6 seconden en 18 honderdsten. Op de 500 meter zie je alleen seconden: 34,50.' },
      { h: 'Rondetijden', p: 'Een ronde is 400 meter. Op het scorebord zie je per ronde de tijd én het verschil met de vorige ronde of met het baanrecord. Een rondetijd onder de 29 seconden is extreem snel (bijna 50 km/u).' },
      { h: 'PR, NR, WR', p: 'PR = persoonlijk record, NR = nationaal record, TR/BR = baanrecord van Thialf, WR = wereldrecord. In deze app staan de officiële PR\'s van de rijders.' },
    ],
  },
];
