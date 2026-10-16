# Deliverables

| File | What it is |
|---|---|
| `academy-commercial-1080p-web.mp4` | 1920×1080, 24 fps, H.264 + AAC, ~4 Mbps, for upload to YouTube, Facebook, Telegram, etc. |
| `academy-commercial-vertical-1080x1920-web.mp4` | 1080×1920 vertical cut for Reels, Shorts, TikTok, Telegram stories |
| `academy-commercial.ar.srt` | Arabic subtitles (UTF-8) timed to the narration |
| `../storyboard/frames/` | one still per scene for both cuts (also shown in `../storyboard/02-storyboard.md`) |

Both videos carry burned-in Arabic captions of the narration, so they work with the sound off.
Narration audio is not included yet (see `../storyboard/04-voiceover-script.md`). The soundtrack is
the instrument-free ambience and SFX, normalised to −20 LUFS for this narration-free edition.

Higher-bitrate masters (~10 Mbps) and the 3840×2160 version are produced by `npm run render` /
`npm run render:4k` into `out/` (not committed because of their size).
