# Projectregels – Langebaan Schaats App

## Mobile first – altijd
- Ontwerp en bouw **eerst voor een telefoon** (viewport 360–430 px, één kolom, duim-bereik). Desktop is een gecentreerde telefoonweergave (`.app`, max 480 px), nooit een apart layout-pad.
- Nieuwe schermen en componenten: eerst testen op 390×844 (iPhone) en 360×800 (Android) vóór iets anders.
- Tikdoelen minimaal 44×44 px; vaste knoppen onderaan binnen duimbereik; rekening houden met `safe-area-inset` (notch/home-indicator).
- Geen hover-afhankelijke interacties; alles moet met tikken werken.
- Beeld en fonts lokaal; lettergrootte body ≥ 14 px; geen horizontale scroll behalve bewust (tabs, dag-chips).
- Performance: geen zware libraries toevoegen zonder reden; bundel klein houden (nu ~95 kB gzip).

## Huisstijl (bron: MVS Stylesheet Typo/Color 2026)
- Tokens staan in `src/styles.css` (`:root`). Nieuwe kleuren/afstanden daar toevoegen, niet hardcoden.
- Kleuren: lichtblauw `#A8CFFD` (`--mvs-ice`), middenblauw `#2B4F85` (`--mvs-blue`), navy `#13233A` (`--mvs-navy`), wit, zwart. Alle andere tinten zijn afgeleiden van deze vijf.
- Typografie: **headlines** Sportize Extra Bold (800, uppercase, wit) → `.display`; **sublines** Sportize Regular (400, uppercase, lichtblauw) → `.subline` / `.eyebrow`; **bodytekst** Hanken Grotesk (lokaal in `public/fonts/`, SIL OFL).
- Knoppen/CTA: witte trapeziumvorm (breder boven, schuine zijkanten via `clip-path`, `--cta-slant`) met zwarte Sportize Extra Bold-tekst → `.btn-primary`; `.btn-secondary` is dezelfde vorm in middenblauw.
- Motieven: oval-ring verticaal/horizontaal (`TrackRing`, prop `horizontal`), gestapelde pijlen omhoog (`Chevrons`), wit → lichtblauw verloop; donkere navy-achtergrond met ijsblauwe gloed.
- Toon: "Beleef de magie van schaatsen" – direct, warm, geen jargon. NL, je-vorm.

## Werkwijze
- Placeholder-content markeren met `[ ]` en vermelden in `CONTENT-CHECKLIST.md`.
- Toernooidata en teksten leven in `src/data/`; schermen bevatten geen content.
- Routing via HashRouter (werkt op GitHub Pages); assets via `asset()` i.v.m. base path.
- Na elke wijziging: `npm run build` moet slagen; screenshots op mobiel formaat maken bij visuele wijzigingen.
- Commit-berichten in het Nederlands, kort en beschrijvend.
- **Changelog verplicht:** elke wijziging (code én content) als regel in `CHANGELOG.md` onder de actuele versie: Toegevoegd/Gewijzigd/Verwijderd/Teruggedraaid + commit-code. Versienummer ook in `src/screens/More.tsx` ("Conceptversie x.y"). Terugdraaien gebeurt altijd met `git revert` (nooit history herschrijven) en krijgt een regel "Teruggedraaid".
