# Quality control report

Checked on the rendered files, not just the source. Frames were pulled from the encoded MP4s
with FFmpeg and inspected. The QR code was decoded from the encoded video with OpenCV.

| Check | Result |
|---|---|
| Academy name «الأكاديمية الليبية للقرآن وعلومه» | ✅ matches the brief character for character (S03, S07 phone header, S09) |
| Leadership «تحت قيادة الأستاذة كريمة النعاس» | ✅ verbatim (S03) |
| Program names (القاعدة النورانية، أحكام التجويد، تحفة الأطفال، الشاطبية، التبيان) | ✅ verbatim, plus «وغيرها من علوم القرآن الكريم والمتون العلمية» |
| All 29 on-screen strings vs. brief | ✅ scripted comparison: every string appears verbatim in the brief |
| Narration vs. brief | ✅ VO05 adds «والتبيان» so the narrator names all five programs shown. VO06 and VO07 were revised at the academy's request (women and children only; only Quran courses are free) |
| Arabic shaping & direction | ✅ every string is one run in `dir="rtl"`; reveals are masks, never letter splits; inspected in all scenes, both ratios |
| No fabricated Quranic verses | ✅ no verse, recitation or pseudo-script anywhere; the only text on the wall panel is the title «القرآن الكريم» |
| No invented achievements, accreditation, numbers, testimonials or chats | ✅ the phone shows abstract placeholder rows only |
| "Free" message visible and accurate | ✅ «دورات القرآن الكريم — مجانًا بالكامل» at 190 px with burst (S07, 01:14.6), «دورات القرآن مجانية» on the end card. Only the Quran courses are called free |
| Telegram highlighted | ✅ S07 «التعلم عن بُعد / عبر منصة تيليجرام», end card «عبر تيليجرام» + join QR |
| Join QR | ✅ generated from `https://t.me/+ctoiWdJG_zNkM2Nk`; decodes to exactly that link from the encoded videos. Found and fixed: in 9:16 the VO09 caption covered the QR's lower finder pattern (01:25.6–01:31), so that caption is omitted in 9:16 (`captionHiddenIn`) |
| Audience | ✅ women and children only, as the academy serves them: no male figures anywhere; S02 + S06 show children, young, adult and older women; «للنساء والأطفال / ولجميع الأعمار» |
| Transitions | ✅ 0.75 s dissolves between scenes, match-dissolve S01→S02, right-to-left light wipes inside S04, fade from/to black |
| Narration ↔ picture timing | ✅ captions follow `timeline.json`; each line sits inside its scene, and «مجانية بالكامل» lands with the visual reveal |
| CTA readability | ✅ «انضموا إلينا الآن» fades in from 01:27.6 and is fully opaque 01:28.3–01:31.2 (2.9 s; a three-word button); the name, offer and QR are on screen from ~01:27 until the 0.8 s fade to black |
| Placeholders in final deliverables | ✅ none visible. Narration audio is not yet recorded; the delivered videos are labelled the narration-free edition and carry captions instead |
| Duration / format (16:9) | ✅ 92.1 s, 1920×1080, 24 fps, H.264 + AAC 48 kHz stereo. Master ≈ 7.2 Mbps (82.6 MB), web ≈ 2.9 Mbps (33.2 MB) |
| Audio level | ⚠️ −21.3 LUFS integrated, −1.3 dBFS peak (target for the narration-free edition: −20 LUFS). Linear normalisation is capped by the soft impacts; accepted as ambient-only. With narration the pipeline targets −16 LUFS |
| Lint / types | ✅ `eslint src` and `tsc` clean |

## Known limitations
- **Narration is not recorded.** See `04-voiceover-script.md`. Drop files in and re-render; the bed ducks automatically.
- **People are illustrated silhouettes.** Swap any of the eight arches for real footage via `src/data/footage.ts` (tested with a sample clip).
- **Logo resolution** is 640×640. It is sharp at 1080p but soft in the 4K master; a larger or vector logo is recommended.
