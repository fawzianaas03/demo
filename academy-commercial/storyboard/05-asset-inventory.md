# Visual & audio asset inventory

| Asset | Path | Source / licence | Status |
|---|---|---|---|
| Academy emblem | `public/assets/academy-logo.jpg` | Supplied by the client (640×640 JPEG) | ✅ used in S03, S07 (phone avatar), S09. A larger or vector original would look sharper in the 4K master. |
| Join QR / Telegram link | `src/data/academy.ts` → `telegramUrl` or `qrImage` | Must come from the academy | ⏳ pending: the end card omits the QR until one is configured |
| Fonts: Amiri, Cairo, Tajawal (Arabic + Latin subsets) | `public/fonts/*.woff2` | Google Fonts, SIL Open Font License 1.1 | ✅ bundled locally (`scripts/fetch-fonts.mjs`) |
| Film grain tile | `public/assets/grain.png` | Generated (`scripts/generate-grain.py`) | ✅ |
| Ambience stem | `public/audio/ambience.wav` | Generated, instrument-free (`scripts/generate-sound-design.py`) | ✅ |
| SFX stem | `public/audio/sfx.wav` | Generated from `timeline.json` cues | ✅ |
| Narration VO01–VO09 | `public/audio/voiceover/` | To be recorded (see 04-voiceover-script.md) | ⏳ pending |
| Live-action footage (8 optional slots) | `public/footage/` + `src/data/footage.ts` | Licensed stock, a shoot, or reviewed AI generations (03-ai-video-prompts.md) | optional: illustrated silhouettes are used meanwhile |

## Built-in illustrated assets (code, fully editable)

| Component | File | Used in |
|---|---|---|
| 3D closed mushaf + carved lectern | `src/components/Mushaf.tsx` | S01, S08 |
| Mashrabiya window + cast lattice light | `src/components/IslamicWindow.tsx` | S01, S08 |
| Star-and-cross lattice, khatam star, rosette, gold divider, pointed arch | `src/components/Geometry.tsx` | throughout |
| Arch vignettes (8 back-lit silhouette scenes / footage slots) | `src/components/Vignette.tsx` | S02, S04, S06 |
| Logo medallion, paper-plane glyph, QR renderer, join block | `src/components/Brand.tsx` | S03, S07, S09 |
| Program icons (letters, sound waves, children's book, manuscript, lantern) | `src/components/ProgramIcons.tsx` | S05 |
| Generic messaging-app phone | `src/components/PhoneMockup.tsx` | S07 |
| Gold particles, light rays, grain, vignette | `src/components/Atmosphere.tsx` | throughout |
| Gold Arabic typography with RTL reveal & shine | `src/components/GoldText.tsx` | throughout |
| Burned-in captions | `src/components/Captions.tsx` | throughout (toggle: `showCaptions`) |

The phone screen uses a generic paper-plane glyph and abstract message rows. No Telegram trademark
artwork, real chats, names or testimonials are reproduced.
