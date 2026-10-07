/**
 * Externe diensten die in de app (iframe) worden getoond.
 * URL's tussen [ ] zijn nog niet aangeleverd – zie CONTENT-CHECKLIST.md.
 * Paylogic: officiële integratie is een iframe van de shop-URL (Event dashboard → "URLs of online sales").
 * Playable: iframe-script of campagne-URL uit de Publishing-tab; eigen domein moet in Playable whitelisted zijn.
 */
export type EmbedDef = { id: string; title: string; url: string; note?: string };

export const embeds: EmbedDef[] = [
  { id: 'mijn-tickets', title: 'Mijn tickets', url: '[aanleveren: Paylogic "Mijn tickets"-URL (deeplink; embed niet gedocumenteerd)]' },
  { id: 'game', title: 'Speel & win', url: '[aanleveren: Playable campagne-URL + domein-whitelist]' },
  { id: 'parkeren', title: 'Parkeerticket', url: '[aanleveren: parkeerproduct in Paylogic of Thialf-parkeerpagina]' },
];
