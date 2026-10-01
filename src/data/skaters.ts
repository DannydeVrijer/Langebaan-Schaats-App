/**
 * Schaatsers & teams – seizoen 2026/2027.
 * Basis: teamoverzicht 2025/26 (liefdevoorschaatsen.nl) + transferoverzicht 2026/27 (schaatsen.nl).
 * Persoonlijke records, geboortedata en foto's: KNSB live-api (live-api.schaatsen.nl/skaters/{id}/personal-best/),
 * geraadpleegd 1 oktober 2026. Jordan Stolz staat in die database zonder PR's → `[PR]`.
 * Foto's zijn hotlinks naar de KNSB-cdn (2020) — rechten/actualiteit checken vóór livegang.
 */

export type Distance = '500m' | '1000m' | '1500m' | '3000m' | '5000m' | '10.000m' | 'Massastart' | 'Teamsprint' | 'Ploegenachtervolging';

export type Team = {
  id: string;
  name: string;
  short: string;
  color: string; // accentkleur voor avatar/chip
  coach?: string;
  note?: string;
};

export type Skater = {
  id: string;
  name: string;
  teamId: string;
  gender: 'v' | 'm';
  nationality?: string; // alleen bij niet-NL
  distances: Distance[];
  pb: Partial<Record<Distance, string>>;
  pbMeta?: Partial<Record<Distance, string>>; // "2025 · Salt Lake City"
  knsbId?: number;
  born?: string;
  photo?: string;
  bio: string;
  highlights?: string[];
  tournaments?: string[]; // id's van toernooien waar deze schaatser (naar verwachting) start — aanleveren
};

export const teams: Team[] = [
  { id: 'reggeborgh', name: 'Team Reggeborgh', short: 'Reggeborgh', color: '#1E4FA0' },
  { id: 'essent', name: 'Team Essent', short: 'Essent', color: '#C8102E' },
  { id: 'x2o', name: 'Team X2O Badkamers', short: 'X2O', color: '#00A0D6', note: 'voorheen Team IKO' },
  { id: 'zaanlander', name: 'Team Albert Heijn Zaanlander', short: 'AH Zaanlander', color: '#00A0E2' },
  { id: 'kafra', name: 'Team Kafra', short: 'Kafra', color: '#111827' },
  { id: 'novus', name: 'Team Novus', short: 'Novus', color: '#F59E0B' },
  { id: 'frysk', name: 'Team Frysk', short: 'Frysk', color: '#2563EB' },
];

const PR = '[PR]';

export const skaters: Skater[] = [
  // --- Reggeborgh
  { id: 'jenning-de-boo', name: 'Jenning de Boo', teamId: 'reggeborgh', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': '33,63', '1000m': '1.06,05', '1500m': '1.47,96' }, pbMeta: { '500m': '2025 · Salt Lake City', '1000m': '2025 · Calgary', '1500m': '2025 · Heerenveen' }, knsbId: 203, born: '2004-01-22',
    bio: 'De snelste man van Nederland op de sprint: 33,63 op de 500 meter (Salt Lake City, 2025). Explosief op de 500, steeds sterker op de 1000.' },
  { id: 'femke-kok', name: 'Femke Kok', teamId: 'reggeborgh', gender: 'v', distances: ['500m', '1000m'], pb: { '500m': '36,09', '1000m': '1.12,36', '1500m': '1.52,69', '3000m': '4.14,33' }, pbMeta: { '500m': '2025 · Salt Lake City', '1000m': '2025 · Calgary', '1500m': '2025 · Heerenveen', '3000m': '2019 · Heerenveen' }, knsbId: 58, born: '2000-10-05', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/58.png',
    bio: 'De snelste sprintster van Nederland: 36,09 op de 500 meter in Salt Lake City (2025). Pure snelheid, rustig in de bocht.' },
  { id: 'kjeld-nuis', name: 'Kjeld Nuis', teamId: 'reggeborgh', gender: 'm', distances: ['1000m', '1500m'], pb: { '500m': '34,79', '1000m': '1.06,18', '1500m': '1.40,17', '3000m': '3.46,18', '5000m': '7.21,30' }, pbMeta: { '500m': '2015 · Calgary', '1000m': '2019 · Salt Lake City', '1500m': '2019 · Salt Lake City', '3000m': '2014 · Inzell', '5000m': '2008 · Groningen' }, knsbId: 8, born: '1989-11-10', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/8.png',
    bio: 'Drievoudig olympisch kampioen en publiekslieveling in Thialf. Reed in 2019 in Salt Lake City 1.40,17 op de 1500 meter.', highlights: ['Olympisch goud 1000m & 1500m (2018)', 'Olympisch goud 1500m (2022)'] },
  { id: 'patrick-roest', name: 'Patrick Roest', teamId: 'reggeborgh', gender: 'm', distances: ['1500m', '5000m', '10.000m'], pb: { '500m': '35,74', '1000m': '1.09,04', '1500m': '1.42,56', '3000m': '3.35,26', '5000m': '6.02,98', '10.000m': '12.35,20' }, pbMeta: { '500m': '2019 · Calgary', '1000m': '2019 · Calgary', '1500m': '2019 · Salt Lake City', '3000m': '2020 · Heerenveen', '5000m': '2024 · Salt Lake City', '10.000m': '2020 · Heerenveen' }, knsbId: 77, born: '1995-12-07', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/77.png',
    bio: 'Meervoudig wereldkampioen allround. Technisch de meest complete stayer van het peloton.' },
  { id: 'marcel-bosker', name: 'Marcel Bosker', teamId: 'reggeborgh', gender: 'm', distances: ['1500m', '5000m', 'Ploegenachtervolging'], pb: { '500m': '36,39', '1000m': '1.09,10', '1500m': '1.44,12', '3000m': '3.36,33', '5000m': '6.08,90', '10.000m': '12.43,14' }, pbMeta: { '500m': '2017 · Calgary', '1000m': '2017 · Calgary', '1500m': '2020 · Calgary', '3000m': '2017 · Calgary', '5000m': '2019 · Salt Lake City', '10.000m': '2025 · Heerenveen' }, knsbId: 28, born: '1997-01-19', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/28.png', bio: 'Allrounder en vaste waarde in de ploegenachtervolging.' },
  { id: 'antoinette-rijpma-de-jong', name: 'Antoinette Rijpma-de Jong', teamId: 'reggeborgh', gender: 'v', distances: ['1500m', '3000m', '5000m'], pb: { '500m': '38,22', '1000m': '1.13,61', '1500m': '1.51,71', '3000m': '3.55,19', '5000m': '6.56,26' }, pbMeta: { '500m': '2024 · Heerenveen', '1000m': '2022 · Calgary', '1500m': '2025 · Salt Lake City', '3000m': '2021 · Salt Lake City', '5000m': '2019 · Calgary' }, knsbId: 13, born: '1995-04-06', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/13.png', bio: 'Allroundkampioene met een sterke 1500 meter.' },
  { id: 'merijn-scheperkamp', name: 'Merijn Scheperkamp', teamId: 'reggeborgh', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': '34,41', '1000m': '1.07,46', '1500m': '1.46,18', '3000m': '3.49,38', '5000m': '7.03,84' }, pbMeta: { '500m': '2025 · Milwaukee', '1000m': '2021 · Salt Lake City', '1500m': '2021 · Heerenveen', '3000m': '2021 · Heerenveen', '5000m': '2019 · Groningen' }, knsbId: 61, born: '2000-03-06', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/61.png', bio: 'Sprinter, nieuw bij Reggeborgh dit seizoen (overgekomen van Essent).' },
  { id: 'kayo-vos', name: 'Kayo Vos', teamId: 'reggeborgh', gender: 'm', distances: ['1000m', '1500m'], pb: { '500m': '34,78', '1000m': '1.08,70', '1500m': '1.47,39', '3000m': '3.54,33', '5000m': '6.52,13' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2025 · Heerenveen', '1500m': '2022 · Heerenveen', '3000m': '2021 · Heerenveen', '5000m': '2022 · Groningen' }, knsbId: 148, born: '2003-06-10', bio: 'Jonge middenafstander, overgekomen van X2O.' },
  { id: 'marrit-fledderus', name: 'Marrit Fledderus', teamId: 'reggeborgh', gender: 'v', distances: ['500m', '1000m'], pb: { '500m': '37,08', '1000m': '1.13,11', '1500m': '2.03,46', '3000m': '4.28,93' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2025 · Salt Lake City', '1500m': '2020 · Inzell', '3000m': '2019 · Heerenveen' }, knsbId: 57, born: '2001-05-15', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/57.png', bio: 'Sprintster.' },
  // --- Essent
  { id: 'joep-wennemars', name: 'Joep Wennemars', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '500m': '34,32', '1000m': '1.06,44', '1500m': '1.42,34', '3000m': '3.47,72', '5000m': '6.44,59' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2025 · Calgary', '1500m': '2025 · Salt Lake City', '3000m': '2025 · Heerenveen', '5000m': '2021 · Inzell' }, knsbId: 150, born: '2002-10-03', bio: 'Wereldkampioen 1000 meter. Snel, slim en altijd goed voor een stunt in Thialf.' },
  { id: 'chris-huizinga', name: 'Chris Huizinga', teamId: 'essent', gender: 'm', distances: ['5000m', '10.000m', 'Massastart'], pb: { '500m': '37,00', '1000m': '1.11,59', '1500m': '1.44,60', '3000m': '3.40,87', '5000m': '6.05,16', '10.000m': '12.39,87' }, pbMeta: { '500m': '2022 · Heerenveen', '1000m': '2022 · Heerenveen', '1500m': '2020 · Calgary', '3000m': '2023 · Heerenveen', '5000m': '2025 · Calgary', '10.000m': '2024 · Heerenveen' }, knsbId: 39, born: '1997-08-11', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/39.png', bio: 'Stayer met een enorme motor; "rijden in Thialf geeft je vleugels".' },
  { id: 'beau-snellink', name: 'Beau Snellink', teamId: 'essent', gender: 'm', distances: ['5000m', '10.000m'], pb: { '500m': '37,61', '1000m': '1.12,82', '1500m': '1.46,82', '3000m': '3.39,91', '5000m': '6.06,99', '10.000m': '12.39,34' }, pbMeta: { '500m': '2024 · Heerenveen', '1000m': '2022 · Heerenveen', '1500m': '2024 · Heerenveen', '3000m': '2021 · Heerenveen', '5000m': '2025 · Calgary', '10.000m': '2025 · Calgary' }, knsbId: 64, born: '2001-05-14', bio: 'Lange afstanden.' },
  { id: 'tijmen-snel', name: 'Tijmen Snel', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '500m': '34,75', '1000m': '1.08,09', '1500m': '1.43,14', '3000m': '3.52,97', '5000m': '6.41,34', '10.000m': '14.12,71' }, pbMeta: { '500m': '2025 · Heerenveen', '1000m': '2023 · Heerenveen', '1500m': '2025 · Salt Lake City', '3000m': '2021 · Heerenveen', '5000m': '2019 · Heerenveen', '10.000m': '2019 · Heerenveen' }, knsbId: 52, born: '1997-12-11', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/52.png', bio: 'Middenafstander.' },
  { id: 'suzanne-schulting', name: 'Suzanne Schulting', teamId: 'essent', gender: 'v', distances: ['1000m', '1500m', 'Massastart'], pb: { '500m': '37,61', '1000m': '1.13,97', '1500m': '1.57,02', '3000m': '4.13,22' }, pbMeta: { '500m': '2025 · Heerenveen', '1000m': '2020 · Heerenveen', '1500m': '2021 · Heerenveen', '3000m': '2025 · Heerenveen' }, knsbId: 90, born: '1997-09-25', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/90.png', bio: 'Olympisch kampioene shorttrack, overgestapt naar de langebaan.' },
  { id: 'angel-daleman', name: 'Angel Daleman', teamId: 'essent', gender: 'v', distances: ['500m', '1000m', '1500m'], pb: { '500m': '37,28', '1000m': '1.14,22', '1500m': '1.52,38', '3000m': '4.11,75' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2025 · Calgary', '1500m': '2025 · Calgary', '3000m': '2023 · Inzell' }, knsbId: 278, born: '2007-03-25', bio: 'Jong talent, meervoudig wereldkampioene bij de junioren.' },
  { id: 'sebas-diniz', name: 'Sebas Diniz', teamId: 'essent', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': '34,11', '1000m': '1.10,13', '1500m': '1.53,43', '3000m': '4.11,31' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2022 · Heerenveen', '1500m': '2021 · Inzell', '3000m': '2018 · Heerenveen' }, knsbId: 72, born: '2002-01-16', bio: 'Sprinter, nieuw bij Essent (van X2O).' },
  { id: 'louis-hollaar', name: 'Louis Hollaar', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '500m': '35,27', '1000m': '1.08,28', '1500m': '1.45,02', '3000m': '3.43,32', '5000m': '6.24,36', '10.000m': '14.13,68' }, pbMeta: { '500m': '2024 · Heerenveen', '1000m': '2023 · Heerenveen', '1500m': '2023 · Heerenveen', '3000m': '2025 · Heerenveen', '5000m': '2025 · Heerenveen', '10.000m': '2020 · Groningen' }, knsbId: 80, born: '1998-09-18', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/80.png', bio: 'Nieuw bij Essent (van Reggeborgh).' },
  // --- X2O (voorheen IKO)
  { id: 'joy-beune', name: 'Joy Beune', teamId: 'x2o', gender: 'v', distances: ['1500m', '3000m', '5000m'], pb: { '500m': '38,69', '1000m': '1.14,21', '1500m': '1.51,05', '3000m': '3.53,69', '5000m': '6.45,76' }, pbMeta: { '500m': '2018 · Salt Lake City', '1000m': '2018 · Salt Lake City', '1500m': '2025 · Salt Lake City', '3000m': '2025 · Salt Lake City', '5000m': '2025 · Calgary' }, knsbId: 43, born: '1999-04-28', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/43.png', bio: 'Wereldkampioene allround. Sterk op de lange afstanden én de 1500.' },
  { id: 'bart-swings', name: 'Bart Swings', teamId: 'x2o', gender: 'm', nationality: 'BEL', distances: ['Massastart', '5000m'], pb: { '500m': '36,46', '1000m': '1.09,28', '1500m': '1.42,48', '3000m': '3.36,98', '5000m': '6.11,54', '10.000m': '12.57,31' }, pbMeta: { '500m': '2015 · Calgary', '1000m': '2015 · Calgary', '1500m': '2015 · Calgary', '3000m': '2020 · Heerenveen', '5000m': '2017 · Salt Lake City', '10.000m': '2015 · Salt Lake City' }, knsbId: 116, born: '1991-02-12', bio: 'Olympisch kampioen massastart (2022).' },
  { id: 'pien-hersman', name: 'Pien Hersman', teamId: 'x2o', gender: 'v', distances: ['1000m', '1500m'], pb: { '500m': '37,76', '1000m': '1.17,42', '1500m': '2.04,84', '3000m': '4.34,57' }, pbMeta: { '500m': '2025 · Heerenveen', '1000m': '2024 · Heerenveen', '1500m': '2023 · Inzell', '3000m': '2022 · Heerenveen' }, knsbId: 155, born: '2004-01-20', bio: 'Middenafstanden.' },
  // --- AH Zaanlander
  { id: 'jordan-stolz', name: 'Jordan Stolz', teamId: 'zaanlander', gender: 'm', nationality: 'USA', distances: ['500m', '1000m', '1500m'], pb: { '500m': PR, '1000m': PR, '1500m': PR }, pbMeta: {}, knsbId: 325, born: '2004-05-21', bio: 'Amerikaans fenomeen, meervoudig wereldkampioen op 500, 1000 en 1500 meter.' },
  { id: 'marijke-groenewoud', name: 'Marijke Groenewoud', teamId: 'zaanlander', gender: 'v', distances: ['1500m', '3000m', 'Massastart'], pb: { '500m': '38,57', '1000m': '1.13,73', '1500m': '1.53,17', '3000m': '3.55,84', '5000m': '6.44,59' }, pbMeta: { '500m': '2020 · Heerenveen', '1000m': '2023 · Heerenveen', '1500m': '2024 · Salt Lake City', '3000m': '2025 · Heerenveen', '5000m': '2025 · Heerenveen' }, knsbId: 49, born: '1999-01-28', bio: 'Wereldkampioene 1500 meter en massastart-specialiste.' },
  { id: 'jorrit-bergsma', name: 'Jorrit Bergsma', teamId: 'zaanlander', gender: 'm', distances: ['5000m', '10.000m', 'Massastart'], pb: { '500m': '38,25', '1000m': '1.14,30', '1500m': '1.47,08', '3000m': '3.39,79', '5000m': '6.06,93', '10.000m': '12.37,72' }, pbMeta: { '500m': '2014 · Heerenveen', '1000m': '2014 · Heerenveen', '1500m': '2013 · Calgary', '3000m': '2013 · Calgary', '5000m': '2013 · Calgary', '10.000m': '2020 · Heerenveen' }, knsbId: 76, born: '1986-02-01', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/76.png', bio: 'Olympisch kampioen 10 km (2014), nog altijd gevaarlijk op de langste afstand.' },
  // --- Kafra
  { id: 'jutta-leerdam', name: 'Jutta Leerdam', teamId: 'kafra', gender: 'v', distances: ['500m', '1000m', '1500m'], pb: { '500m': '37,01', '1000m': '1.11,84', '1500m': '1.53,64', '3000m': '4.05,19' }, pbMeta: { '500m': '2025 · Calgary', '1000m': '2020 · Salt Lake City', '1500m': '2021 · Heerenveen', '3000m': '2018 · Salt Lake City' }, knsbId: 44, born: '1998-12-30', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/44.png', bio: 'Wereldkampioene 1000 meter en olympisch zilver. Het gezicht van het Nederlandse sprintschaatsen.' },
  { id: 'kai-verbij', name: 'Kai Verbij', teamId: 'kafra', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': '34,13', '1000m': '1.06,34', '1500m': '1.45,41', '3000m': '3.53,70', '5000m': '6.56,25' }, pbMeta: { '500m': '2017 · Salt Lake City', '1000m': '2019 · Salt Lake City', '1500m': '2015 · Calgary', '3000m': '2012 · Inzell', '5000m': '2011 · Inzell' }, knsbId: 17, born: '1994-09-25', photo: 'https://d1zwgb741tubdg.cloudfront.net/skater/2020/11/01/17.png', bio: 'Voormalig wereldkampioen sprint.' },
];

export const teamById = (id: string) => teams.find((t) => t.id === id);
export const skaterById = (id: string) => skaters.find((s) => s.id === id);
export const initials = (name: string) => name.split(' ').filter((p) => p[0] === p[0].toUpperCase()).map((p) => p[0]).slice(0, 2).join('');
export const allDistances: Distance[] = ['500m', '1000m', '1500m', '3000m', '5000m', '10.000m', 'Massastart'];
