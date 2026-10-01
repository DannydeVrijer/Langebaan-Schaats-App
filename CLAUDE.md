# Projectregels – Langebaan Schaats App

## Mobile first – altijd
- Ontwerp en bouw **eerst voor een telefoon** (viewport 360–430 px, één kolom, duim-bereik). Desktop is een gecentreerde telefoonweergave (`.app`, max 480 px), nooit een apart layout-pad.
- Nieuwe schermen en componenten: eerst testen op 390×844 (iPhone) en 360×800 (Android) vóór iets anders.
- Tikdoelen minimaal 44×44 px; vaste knoppen onderaan binnen duimbereik; rekening houden met `safe-area-inset` (notch/home-indicator).
- Geen hover-afhankelijke interacties; alles moet met tikken werken.
- Beeld en fonts lokaal; lettergrootte body ≥ 14 px; geen horizontale scroll behalve bewust (tabs, dag-chips).
- Performance: geen zware libraries toevoegen zonder reden; bundel klein houden (nu ~95 kB gzip).

## Huisstijl
- Tokens staan in `src/styles.css` (`:root`). Nieuwe kleuren/afstanden daar toevoegen, niet hardcoden.
- Display-font Sportize (uppercase) voor koppen/knoppen/labels; systeemfont voor lopende tekst.
- Motieven: oval-ring (`TrackRing`), chevrons (`Chevrons`), donker ijsblauw met lichte gloed.
- Toon: "Beleef de magie van schaatsen" – direct, warm, geen jargon. NL, je-vorm.

## Werkwijze
- Placeholder-content markeren met `[ ]` en vermelden in `CONTENT-CHECKLIST.md`.
- Toernooidata en teksten leven in `src/data/`; schermen bevatten geen content.
- Routing via HashRouter (werkt op GitHub Pages); assets via `asset()` i.v.m. base path.
- Na elke wijziging: `npm run build` moet slagen; screenshots op mobiel formaat maken bij visuele wijzigingen.
- Commit-berichten in het Nederlands, kort en beschrijvend.
