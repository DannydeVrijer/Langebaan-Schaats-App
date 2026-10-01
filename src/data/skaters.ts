/**
 * Schaatsers & teams – seizoen 2026/2027.
 * Basis: teamoverzicht 2025/26 (liefdevoorschaatsen.nl) + transferoverzicht 2026/27 (schaatsen.nl).
 * Persoonlijke records: alleen ingevuld waar zeker; overal anders `[PR]` → aanleveren/verifiëren
 * (bron: speedskatingresults.com of KNSB). Foto's: nog geen → initialen.
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
  { id: 'jenning-de-boo', name: 'Jenning de Boo', teamId: 'reggeborgh', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': PR, '1000m': PR },
    bio: 'De snelste man van Nederland op de sprint. Explosief op de 500 meter, steeds sterker op de 1000.', highlights: ['[aanleveren: titels]'] },
  { id: 'femke-kok', name: 'Femke Kok', teamId: 'reggeborgh', gender: 'v', distances: ['500m', '1000m'], pb: { '500m': '36,09', '1000m': PR },
    bio: 'Wereldrecordhoudster op de 500 meter. Pure snelheid, rustig in de bocht.', highlights: ['Wereldrecord 500m (36,09)'] },
  { id: 'kjeld-nuis', name: 'Kjeld Nuis', teamId: 'reggeborgh', gender: 'm', distances: ['1000m', '1500m'], pb: { '1000m': '1.05,69', '1500m': '1.40,17' },
    bio: 'Tweevoudig olympisch kampioen en wereldrecordhouder op de 1500 meter. Publiekslieveling in Thialf.', highlights: ['Olympisch goud 1000m & 1500m (2018)', 'Olympisch goud 1500m (2022)', 'Wereldrecord 1500m (1.40,17)'] },
  { id: 'patrick-roest', name: 'Patrick Roest', teamId: 'reggeborgh', gender: 'm', distances: ['1500m', '5000m', '10.000m'], pb: { '1500m': PR, '5000m': PR, '10.000m': PR },
    bio: 'Meervoudig wereldkampioen allround. Technisch de meest complete stayer van het peloton.', highlights: ['[aanleveren: titels]'] },
  { id: 'marcel-bosker', name: 'Marcel Bosker', teamId: 'reggeborgh', gender: 'm', distances: ['1500m', '5000m', 'Ploegenachtervolging'], pb: { '1500m': PR, '5000m': PR }, bio: 'Allrounder en vaste waarde in de ploegenachtervolging.' },
  { id: 'antoinette-rijpma-de-jong', name: 'Antoinette Rijpma-de Jong', teamId: 'reggeborgh', gender: 'v', distances: ['1500m', '3000m', '5000m'], pb: { '1500m': PR, '3000m': PR }, bio: 'Allroundkampioene met een sterke 1500 meter.' },
  { id: 'merijn-scheperkamp', name: 'Merijn Scheperkamp', teamId: 'reggeborgh', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': PR, '1000m': PR }, bio: 'Sprinter, nieuw bij Reggeborgh dit seizoen (overgekomen van Essent).' },
  { id: 'kayo-vos', name: 'Kayo Vos', teamId: 'reggeborgh', gender: 'm', distances: ['1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Jonge middenafstander, overgekomen van X2O.' },
  { id: 'marrit-fledderus', name: 'Marrit Fledderus', teamId: 'reggeborgh', gender: 'v', distances: ['500m', '1000m'], pb: { '500m': PR, '1000m': PR }, bio: 'Sprintster.' },
  // --- Essent
  { id: 'joep-wennemars', name: 'Joep Wennemars', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Wereldkampioen 1000 meter. Snel, slim en altijd goed voor een stunt in Thialf.', highlights: ['[aanleveren: titels]'] },
  { id: 'chris-huizinga', name: 'Chris Huizinga', teamId: 'essent', gender: 'm', distances: ['5000m', '10.000m', 'Massastart'], pb: { '5000m': PR, '10.000m': PR }, bio: 'Stayer met een enorme motor; "rijden in Thialf geeft je vleugels".' },
  { id: 'beau-snellink', name: 'Beau Snellink', teamId: 'essent', gender: 'm', distances: ['5000m', '10.000m'], pb: { '5000m': PR, '10.000m': PR }, bio: 'Lange afstanden.' },
  { id: 'tijmen-snel', name: 'Tijmen Snel', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Middenafstander.' },
  { id: 'suzanne-schulting', name: 'Suzanne Schulting', teamId: 'essent', gender: 'v', distances: ['1000m', '1500m', 'Massastart'], pb: { '1000m': PR, '1500m': PR }, bio: 'Olympisch kampioene shorttrack, overgestapt naar de langebaan.' },
  { id: 'angel-daleman', name: 'Angel Daleman', teamId: 'essent', gender: 'v', distances: ['500m', '1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Jong talent, meervoudig wereldkampioene bij de junioren.' },
  { id: 'sebas-diniz', name: 'Sebas Diniz', teamId: 'essent', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': PR, '1000m': PR }, bio: 'Sprinter, nieuw bij Essent (van X2O).' },
  { id: 'louis-hollaar', name: 'Louis Hollaar', teamId: 'essent', gender: 'm', distances: ['1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Nieuw bij Essent (van Reggeborgh).' },
  // --- X2O (voorheen IKO)
  { id: 'joy-beune', name: 'Joy Beune', teamId: 'x2o', gender: 'v', distances: ['1500m', '3000m', '5000m'], pb: { '1500m': PR, '3000m': PR, '5000m': PR }, bio: 'Wereldkampioene allround. Sterk op de lange afstanden én de 1500.', highlights: ['[aanleveren: titels]'] },
  { id: 'bart-swings', name: 'Bart Swings', teamId: 'x2o', gender: 'm', nationality: 'BEL', distances: ['Massastart', '5000m'], pb: { '5000m': PR }, bio: 'Olympisch kampioen massastart (2022).' },
  { id: 'pien-hersman', name: 'Pien Hersman', teamId: 'x2o', gender: 'v', distances: ['1000m', '1500m'], pb: { '1000m': PR, '1500m': PR }, bio: 'Middenafstanden.' },
  // --- AH Zaanlander
  { id: 'jordan-stolz', name: 'Jordan Stolz', teamId: 'zaanlander', gender: 'm', nationality: 'USA', distances: ['500m', '1000m', '1500m'], pb: { '500m': PR, '1000m': PR, '1500m': PR }, bio: 'Amerikaans fenomeen, meervoudig wereldkampioen op 500, 1000 en 1500 meter.', highlights: ['[aanleveren: titels]'] },
  { id: 'marijke-groenewoud', name: 'Marijke Groenewoud', teamId: 'zaanlander', gender: 'v', distances: ['1500m', '3000m', 'Massastart'], pb: { '1500m': PR, '3000m': PR }, bio: 'Wereldkampioene 1500 meter en massastart-specialiste.', highlights: ['[aanleveren: titels]'] },
  { id: 'jorrit-bergsma', name: 'Jorrit Bergsma', teamId: 'zaanlander', gender: 'm', distances: ['5000m', '10.000m', 'Massastart'], pb: { '5000m': PR, '10.000m': PR }, bio: 'Olympisch kampioen 10 km (2014), nog altijd gevaarlijk op de langste afstand.' },
  // --- Kafra
  { id: 'jutta-leerdam', name: 'Jutta Leerdam', teamId: 'kafra', gender: 'v', distances: ['500m', '1000m', '1500m'], pb: { '500m': PR, '1000m': PR, '1500m': PR }, bio: 'Wereldkampioene 1000 meter en olympisch zilver. Het gezicht van het Nederlandse sprintschaatsen.', highlights: ['[aanleveren: titels]'] },
  { id: 'kai-verbij', name: 'Kai Verbij', teamId: 'kafra', gender: 'm', distances: ['500m', '1000m'], pb: { '500m': PR, '1000m': PR }, bio: 'Voormalig wereldkampioen sprint.' },
];

export const teamById = (id: string) => teams.find((t) => t.id === id);
export const skaterById = (id: string) => skaters.find((s) => s.id === id);
export const initials = (name: string) => name.split(' ').filter((p) => p[0] === p[0].toUpperCase()).map((p) => p[0]).slice(0, 2).join('');
export const allDistances: Distance[] = ['500m', '1000m', '1500m', '3000m', '5000m', '10.000m', 'Massastart'];
