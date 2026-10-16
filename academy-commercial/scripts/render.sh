#!/usr/bin/env bash
# Renders the deliverables into out/ and loudness-normalises their audio.
#
#   scripts/render.sh            # 1080p 16:9 + 1080×1920 vertical
#   scripts/render.sh --4k       # also the 3840×2160 master
#   CAPTIONS=false scripts/render.sh   # without burned-in narration captions
#   ONLY=vertical scripts/render.sh    # just one cut (horizontal | vertical)
#
# Audio target: -16 LUFS integrated / -1.5 dBTP once narration is in. The
# narration-free edition (voiceoverMode "none") is an ambient soundscape and is
# normalised to -20 LUFS so the air bed never becomes a loud hiss.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out
WITH_4K=false
[[ "${1:-}" == "--4k" ]] && WITH_4K=true
CAPTIONS="${CAPTIONS:-true}"
if grep -q 'voiceoverMode: "none"' src/data/audio.ts; then DEFAULT_LUFS=-20; else DEFAULT_LUFS=-16; fi
LUFS="${LUFS:-$DEFAULT_LUFS}"
PROPS="{\"showCaptions\": $CAPTIONS}"
BROWSER_FLAG=()
if [[ -n "${REMOTION_BROWSER_EXECUTABLE:-}" ]]; then
  BROWSER_FLAG=(--browser-executable="$REMOTION_BROWSER_EXECUTABLE")
fi
CONCURRENCY="${CONCURRENCY:-}"
CONC_FLAG=()
[[ -n "$CONCURRENCY" ]] && CONC_FLAG=(--concurrency="$CONCURRENCY")

render() { # composition output [extra flags...]
  local comp="$1" out="$2"; shift 2
  npx remotion render "$comp" "out/.raw-$out" --codec=h264 --crf=18 --pixel-format=yuv420p \
    --audio-codec=aac --audio-bitrate=320k --props="$PROPS" "${BROWSER_FLAG[@]}" "${CONC_FLAG[@]}" "$@"
  normalise "out/.raw-$out" "out/$out"
  rm -f "out/.raw-$out"
}

web() { # in out — lighter H.264 for upload/sharing (~4 Mbps), audio copied
  ffmpeg -hide_banner -loglevel error -y -i "out/$1" -c:v libx264 -preset slow -crf 21 -maxrate 4M -bufsize 8M \
    -pix_fmt yuv420p -c:a copy -movflags +faststart "out/$2"
  echo "✔ out/$2"
}

# A transparent peak limiter first, so linear loudnorm can reach -16 LUFS
# without the soft impacts hitting the -1.5 dBTP ceiling.
LIMITER="alimiter=limit=0.5:attack=5:release=80:level=false"

normalise() { # in out — two-pass EBU R128 loudnorm, video stream copied untouched
  local in="$1" out="$2"
  local stats
  stats=$(ffmpeg -hide_banner -nostats -i "$in" -af "$LIMITER,loudnorm=I=$LUFS:TP=-1.5:LRA=20:print_format=json" -f null - 2>&1 | sed -n '/^{/,/^}/p')
  local mi mtp mlra mth off
  mi=$(echo "$stats" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_i"])')
  mtp=$(echo "$stats" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_tp"])')
  mlra=$(echo "$stats" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_lra"])')
  mth=$(echo "$stats" | python3 -c 'import json,sys;print(json.load(sys.stdin)["input_thresh"])')
  off=$(echo "$stats" | python3 -c 'import json,sys;print(json.load(sys.stdin)["target_offset"])')
  ffmpeg -hide_banner -loglevel error -y -i "$in" -c:v copy \
    -af "$LIMITER,loudnorm=I=$LUFS:TP=-1.5:LRA=20:measured_I=$mi:measured_TP=$mtp:measured_LRA=$mlra:measured_thresh=$mth:offset=$off:linear=true,aresample=48000" \
    -c:a aac -b:a 320k -movflags +faststart "$out"
  echo "✔ $out"
}

ONLY="${ONLY:-all}" # all | horizontal | vertical
if [[ $ONLY == all || $ONLY == horizontal ]]; then
  render AcademyCommercial "academy-commercial-1080p.mp4"
  web "academy-commercial-1080p.mp4" "academy-commercial-1080p-web.mp4"
fi
if [[ $ONLY == all || $ONLY == vertical ]]; then
  render AcademyCommercialVertical "academy-commercial-vertical-1080x1920.mp4"
  web "academy-commercial-vertical-1080x1920.mp4" "academy-commercial-vertical-1080x1920-web.mp4"
fi
if $WITH_4K; then
  render AcademyCommercial "academy-commercial-4k.mp4" --scale=2
fi
