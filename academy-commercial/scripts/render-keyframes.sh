#!/usr/bin/env bash
# Renders one representative still per scene (both aspect ratios) into
# storyboard/frames/. Usage: scripts/render-keyframes.sh [out-dir]
set -euo pipefail
cd "$(dirname "$0")/.."
OUT="${1:-storyboard/frames}"
mkdir -p "$OUT"
BROWSER_FLAG=()
if [[ -n "${REMOTION_BROWSER_EXECUTABLE:-}" ]]; then
  BROWSER_FLAG=(--browser-executable="$REMOTION_BROWSER_EXECUTABLE")
fi
npx remotion bundle --log=error >/dev/null
# scene id : frame (24 fps)
FRAMES=(S01:156 S02:396 S03:640 S04:810 S05:1350 S06:1540 S07:1712 S07b:1860 S08:2010 S09:2172)
for ratio in 16x9 9x16; do
  comp=AcademyCommercial
  [[ $ratio == 9x16 ]] && comp=AcademyCommercialVertical
  for entry in "${FRAMES[@]}"; do
    name="${entry%%:*}"; frame="${entry##*:}"
    npx remotion still build "$comp" "$OUT/${name}-${ratio}.jpg" --frame="$frame" --jpeg-quality=88 --log=error "${BROWSER_FLAG[@]}"
  done
done
echo "Keyframes written to $OUT"
