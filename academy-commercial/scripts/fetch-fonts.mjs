// Downloads the Arabic + Latin subsets of Amiri, Cairo and Tajawal from Google Fonts
// into public/fonts and writes src/styles/fonts.generated.json describing each face.
import fs from "node:fs";
import path from "node:path";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36";
const url =
  "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;600;700;800&family=Tajawal:wght@300;400;500;700&display=block";

const css = await (await fetch(url, { headers: { "User-Agent": UA } })).text();
const blocks = [...css.matchAll(/\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*{([^}]*)}/g)];
const faces = [];
for (const [, subset, body] of blocks) {
  if (!["arabic", "latin"].includes(subset)) continue;
  const family = body.match(/font-family:\s*'([^']+)'/)[1];
  const weight = body.match(/font-weight:\s*(\d+)/)[1];
  const src = body.match(/url\(([^)]+)\)/)[1];
  const unicodeRange = body.match(/unicode-range:\s*([^;]+);/)[1].trim();
  const file = `${family}-${weight}-${subset}.woff2`;
  const out = path.join("public/fonts", file);
  if (!fs.existsSync(out)) {
    const buf = Buffer.from(await (await fetch(src)).arrayBuffer());
    fs.writeFileSync(out, buf);
  }
  faces.push({ family, weight, subset, file, unicodeRange });
}
fs.mkdirSync("src/styles", { recursive: true });
fs.writeFileSync("src/styles/fonts.generated.json", JSON.stringify(faces, null, 2));
console.log(`${faces.length} font faces written`);
