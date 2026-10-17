# Voice-over script — Arabic narration with timestamps

**Language:** Modern Standard Arabic (الفصحى) · **Voice:** warm, calm, clear, sincere; formal but approachable. No theatrical emphasis.
**Gender:** either works; a mature, resonant voice suits the film best.

> No Arabic speech synthesis of acceptable quality was available in the build environment, so
> the narration must be recorded by a professional narrator (or a TTS voice you approve).
> The film is timed to the windows below and already carries burned-in captions.

## Recording spec
- 48 kHz, 24-bit WAV, mono or stereo, dry (no music, no reverb), −23 to −18 LUFS per line is fine (the render normalises the final mix).
- Record each line as its own file, trimmed to the first and last syllable with ~100 ms of air:
  `VO01.wav` … `VO09.wav` in `public/audio/voiceover/`.
- Then set `voiceoverMode: "lines"` in `src/data/audio.ts` and re-run `scripts/render.sh`.
  Each file starts at its line's start time; the ambience ducks automatically under narration.
- A single continuous take also works: name it `full.wav` (starting at 00:00.000) and set `voiceoverMode: "full"`.
- If a take runs long, nudge `start`/`end` for that line in `src/data/timeline.json`; captions and SRT follow.

## Lines

`…` = a deliberate pause of ~0.6 s. `،` = a short breath.

| ID | Window | Max length | Line |
|---|---|---|---|
| VO01 | 00:02.2 – 00:07.8 | 5.6 s | حين يكونُ القرآنُ رفيقًا… تصبحُ كلُّ خطوةٍ في طلبِ العلمِ نورًا. |
| VO02 | 00:11.0 – 00:18.4 | 7.4 s | من ليبيا… وإلى كلِّ قلبٍ يتوقُ إلى تعلُّمِ كتابِ الله… تمتدُّ جسورُ العلمِ والمعرفة. |
| VO03 | 00:24.0 – 00:29.2 | 5.2 s | الأكاديميةُ الليبيةُ للقرآنِ وعلومِه، تحتَ قيادةِ الأستاذةِ كريمة النعاس. |
| VO04 | 00:32.0 – 00:39.6 | 7.6 s | رحلةٌ تعليميةٌ تجمعُ بينَ حفظِ القرآنِ الكريم، وإتقانِ تلاوتِه، والتعمُّقِ في علومِه. |
| VO05 | 00:45.0 – 00:55.2 | 10.2 s | من القاعدةِ النُّورانيَّة، إلى أحكامِ التَّجويد، وتُحفةِ الأطفال، والشَّاطبيَّة، والتِّبيان، وغيرِها من علومِ القرآنِ الكريم. |
| VO06 | 00:59.2 – 01:04.0 | 4.8 s | للنساءِ والأطفال… ولكلِّ الأعمار. |
| VO07 | 01:09.0 – 01:17.6 | 8.6 s | أينما كنتم، يمكنُكم التعلُّمُ عن بُعدٍ عبرَ تيليجرام… ودوراتُ القرآنِ الكريمِ مجانيةٌ بالكامل. |
| VO08 | 01:19.8 – 01:24.4 | 4.6 s | فالعلمُ نور… وخيرُ ما نتعلَّمُه ونُعلِّمُه كتابُ الله. |
| VO09 | 01:25.6 – 01:30.6 | 5.0 s | الأكاديميةُ الليبيةُ للقرآنِ وعلومِه… انضمُّوا إلينا، وابدؤوا رحلتَكم مع كتابِ الله. |

Diacritics are a reading aid on the words narrators most often stumble on; full vocalisation is not required.

## Pronunciation and delivery notes
- **النعاس** — confirm the family name's exact pronunciation with the academy before recording.
- **الشَّاطبيَّة** (ash-Shāṭibiyyah), **تُحفة الأطفال** (Tuḥfat al-Aṭfāl), **القاعدة النُّورانيَّة** (an-Nūrāniyyah), **التِّبيان** (at-Tibyān).
- **تيليجرام**: pronounce as the brand is commonly said in Arabic (tīlījrām).
- VO05 is the densest line. Keep an even pace and let the list breathe on each «،».
- VO07: lift slightly on «مجانيةٌ بالكامل». The visual «مجانًا بالكامل» lands at 01:14.6.
- VO09 is the sign-off: warmer and slower, finishing by 01:30.6 so the end card holds in silence.

## Optional addition to VO05
The brief's VO05 did not mention «التبيان», which appears on screen. It was added so narration and
picture match. To revert, delete «والتِّبيان،» and shorten the window to end at 54.0 s.
