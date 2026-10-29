# Beeldbank

Aangeleverde campagnebeelden (HoS, 21 okt 2026). Alle beelden hebben ingebakken tekst + CTA ("Ja, ik wil erbij zijn") en zijn display-banners op lage resolutie; daarom geschikt als **banner/afbeelding in een bericht**, niet als hero/key visual (daarvoor: tekstloze bron ≥ 1200 px breed aanleveren).

| Bestand | Formaat | Gebruik in app |
|---|---|---|
| wckt/wckt-banner-605x265.jpg | 605×265 | Berichtenfeed (m2), Info-tab WCKT (klik → ticketshop) |
| wckt/wckt-banner-950x250.jpg | 950×250 | og:image (link-preview bij delen) |
| wckt/wckt-banner-970x250.jpg | 970×250 | reserve (web) |
| wckt/wckt-banner-720x90.jpg | 720×90 | reserve (leaderboard) |
| wckt/wckt-banner-300x600.jpg | 300×600 | reserve (story/portrait) |
| wckt/wckt-banner-250x575.jpg, 250x500, 200x530 | portrait | reserve |
| wckt/wckt-banner-300x300.jpg | 300×300 | reserve (vierkant, social) |

Gewenst voor volgende levering: per toernooi een key visual zonder tekst (≥ 1600×900 en ≥ 1080×1350), rijdersportretten met rechten, partnerlogo's (SVG/PNG transparant).

## Key visuals (abri-campagne, 21 okt 2026) – `keyvisual/`
Bron: MVS_ABRI_SCHAATSER01–03 (6614×8386, zonder tekst). Per beeld een portrait (1080×1369) en landscape-crop (1600×900).

| Bestand | Gebruik |
|---|---|
| kv-leerdam-portrait.jpg | Onboarding-hero |
| kv-leerdam-landscape.jpg | Hero ISU World Cup |
| kv-reggeborgh-landscape.jpg | Hero EK |
| kv-zaanlander-duo-landscape.jpg | Hero OK NK Allround & Sprint, OK NK Afstanden |
| kv-entree-portrait.jpg / kv-entree-landscape.jpg | Hero WCKT (entreedoek Thialf `MVS_REGULIERE_INGANG_212x317cm`, 29 okt 2026; zelfde beeld als startbeeld ticketshop) |

## Signage (abri-tekstkaarten) – `signage/`
Welkom, Tot ziens, Tribunes (Sven Kramer-bocht / West / Ireen Wüst-bocht), Volgende toernooi + QR. In de app is dezelfde stijl als component beschikbaar (`<Signage lines={[…]} />`, berichttype `sign`), dus elke tekst kan in deze vorm zonder nieuw beeld. `sign-tribunes.jpg` staat als achtergrond bij de plattegrond-placeholder.
