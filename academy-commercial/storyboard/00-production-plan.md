# Production plan — الأكاديمية الليبية للقرآن وعلومه

A ~90-second cinematic commercial for a free, Telegram-based Quranic academy, built as an editable
Remotion (React + TypeScript) project and rendered with FFmpeg.

## Creative approach

| Pillar | Decision |
|---|---|
| Story | Light → bridges → identity → learning → programs → every generation → free & online → light again → invitation. The mushaf by the window opens and closes the film, so the ending reads as a return home. |
| Look | Deep emerald (#064E3B / #062C24) with gold (#D4AF37 / #E7D7A2) and ivory (#F8F5ED). Sunlight through a mashrabiya is the recurring light source; the star-and-cross lattice is the recurring motif. |
| People | Shown as **faceless, back-lit silhouettes** seated before sunlit windows inside pointed arches. Respectful, timeless and free of uncanny AI faces. Each arch is a **footage slot**: drop in licensed or filmed footage and it plays inside the same arch (see `src/data/footage.ts`). |
| Religious text | No verses are shown, synthesised or paraphrased. Open books are shown from behind or defocused. The mushaf cover carries only its title, «القرآن الكريم». |
| Typography | Amiri for display/calligraphic lines, Cairo for headings, Tajawal for supporting text and captions. Every Arabic string is one unbroken run in a `dir="rtl"` element, so letters join correctly. Reveals use soft right-to-left masks, never per-letter splitting. |
| Sound | Instrument-free soundscape: shaped-noise "air", sub-rumble, scene breaths, right-to-left whooshes, synthesised page turns, gold shimmer, soft impacts. No recitation is used. |
| Narration | Modern Standard Arabic, recorded externally (no suitable Arabic TTS was available in the build environment). The film carries burned-in captions so it works muted until narration is added. |

## Timeline (24 fps, 92 s)

| # | Scene | Time | Transition in |
|---|---|---|---|
| 01 | بداية النور | 00:00–00:10 | fade from black |
| 02 | علم بلا حدود | 00:10–00:20 | match-dissolve: cover medallion → glowing hub |
| 03 | الكشف عن الأكاديمية | 00:20–00:31 | dissolve + soft light bloom |
| 04 | تعلم القرآن | 00:31–00:44 | dissolve; internal right-to-left gold light wipes |
| 05 | البرامج التعليمية | 00:44–00:57 | dissolve |
| 06 | لكل الأجيال | 00:57–01:08 | dissolve |
| 07 | تعلم مجاني عن بُعد | 01:08–01:19 | dissolve; internal phase change to the "free" reveal |
| 08 | الخاتمة | 01:19–01:25 | dissolve back to the mushaf |
| 09 | دعوة للانضمام | 01:25–01:32 | dissolve; fade to black at 01:31.2 |

The brief asked for ~90 s with a 5-second end card. The end card was lengthened to 7 s (01:25–01:32)
so the call to action and join code stay readable for over 4 s after the narration ends.

## Pipeline

1. `src/data/timeline.json` is the single source of truth for scene times, narration cues and SFX cues.
2. Remotion renders the picture and mixes the audio stems (`scripts/render.sh`).
3. FFmpeg normalises loudness (two-pass EBU R128, −16 LUFS / −1.5 dBTP) and copies the video untouched.
4. `scripts/generate-srt.mjs` writes the Arabic SRT from the same narration cues.
5. `scripts/generate-sound-design.py` regenerates the ambience and SFX stems from the same cues.

## Outputs

| Deliverable | Status |
|---|---|
| 1920×1080 master | rendered: `out/academy-commercial-1080p.mp4` |
| 1080×1920 vertical | rendered: `out/academy-commercial-vertical-1080x1920.mp4` |
| 3840×2160 master | `scripts/render.sh --4k` (render of the same composition at 2× scale) |
| Arabic SRT | `deliverables/academy-commercial.ar.srt` |
| Narration | script ready (04-voiceover-script.md); audio must be recorded and dropped in |
