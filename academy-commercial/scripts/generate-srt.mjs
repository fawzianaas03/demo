// Writes Arabic subtitles (SRT, UTF-8 with BOM for broad player support) from
// the narration timings in src/data/timeline.json.
// Usage: node scripts/generate-srt.mjs
import fs from "node:fs";

const timeline = JSON.parse(fs.readFileSync("src/data/timeline.json", "utf8"));
const RLE = "‫"; // right-to-left embedding keeps trailing punctuation on the left in naive players
const PDF = "‬";

const stamp = (s) => {
  const ms = Math.round(s * 1000);
  const h = String(Math.floor(ms / 3600000)).padStart(2, "0");
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, "0");
  const sec = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const milli = String(ms % 1000).padStart(3, "0");
  return `${h}:${m}:${sec},${milli}`;
};

// Break long lines at the narrator's pauses (… or ،) into at most two lines,
// choosing the split that keeps the two lines most balanced.
const wrap = (text) => {
  if (text.length <= 42) return [text];
  const parts = text.split(/(?<=…|،)\s+/);
  if (parts.length < 2) return [text];
  let best = [text];
  let bestLen = Infinity;
  for (let k = 1; k < parts.length; k++) {
    const a = parts.slice(0, k).join(" ");
    const b = parts.slice(k).join(" ");
    const longest = Math.max(a.length, b.length);
    if (longest < bestLen) {
      bestLen = longest;
      best = [a, b];
    }
  }
  return best;
};

const cues = timeline.narration.map((l, i) =>
  [String(i + 1), `${stamp(l.start)} --> ${stamp(l.end + 0.4)}`, ...wrap(l.text).map((t) => `${RLE}${t}${PDF}`)].join("\n"),
);

fs.mkdirSync("deliverables", { recursive: true });
fs.writeFileSync("deliverables/academy-commercial.ar.srt", "﻿" + cues.join("\n\n") + "\n");
console.log(`deliverables/academy-commercial.ar.srt (${cues.length} cues)`);
