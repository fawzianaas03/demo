// Builds every LAVIV concept: vector logo files + presentation boards.
//   node brand/laviv/src/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { CONCEPTS } from './concepts.mjs';
import { PALETTE as P, svgDoc, n } from './geometry.mjs';
import { RATIONALE } from './rationale.mjs';
import { renderPages } from './render.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const COLORWAYS = {
  primary: { ink: P.black, accent: P.gold },
  reversed: { ink: P.ivory, accent: P.gold },
  'mono-black': { ink: P.black, accent: P.black },
  'mono-white': { ink: '#FFFFFF', accent: '#FFFFFF' },
};

const lockupSvg = (k, c, pad = 0, bg) => {
  const L = k.lockup(c);
  return svgDoc(L.w + pad * 2, L.h + pad * 2, `<g transform="translate(${pad} ${pad})">${L.body}</g>`, { bg, title: `LAVIV — ${k.name}` });
};
const symbolSvg = (k, c, pad = 0, bg) => {
  const s = k.symbol();
  return svgDoc(s.w + pad * 2, s.h + pad * 2, `<g transform="translate(${pad} ${pad})">${s.render(c)}</g>`, { bg, title: `LAVIV symbol — ${k.name}` });
};
const fluid = (svg, style = '') => svg.replace(/ width="[\d.]+" height="[\d.]+"/, ` style="width:100%;height:100%;${style}"`);

const jobs = [];
fs.mkdirSync(path.join(ROOT, 'boards'), { recursive: true });

for (const k of CONCEPTS) {
  const dir = path.join(ROOT, `concept-${k.id}-${k.slug}`);
  fs.mkdirSync(dir, { recursive: true });
  for (const [name, c] of Object.entries(COLORWAYS)) {
    fs.writeFileSync(path.join(dir, `logo-${name}.svg`), lockupSvg(k, c, 24));
    fs.writeFileSync(path.join(dir, `symbol-${name}.svg`), symbolSvg(k, c, 12));
  }

  const r = RATIONALE[k.id];
  const sym = k.symbol();
  const small = [72, 44, 24].map((h) => Math.min(h, (h * 2.2) * sym.h / sym.w)).map((h) =>
    `<div style="height:${h}px;width:${n(h * sym.w / sym.h)}px">${fluid(symbolSvg(k, COLORWAYS['mono-black']))}</div>`).join('');
  const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1800px;height:1240px;background:#E7E2D8;font-family:Inter,sans-serif;color:${P.black};padding:44px 56px;display:flex;flex-direction:column;gap:28px}
header{display:flex;justify-content:space-between;align-items:baseline;font-size:15px;letter-spacing:.18em;text-transform:uppercase}
header b{font-weight:600}
header .ar{font-family:'Noto Kufi Arabic';letter-spacing:0;text-transform:none;font-size:16px;color:#6b6457}
.grid{display:grid;grid-template-columns:1.62fr 1fr;grid-template-rows:1fr 1fr;gap:20px;height:850px}
.panel{display:flex;align-items:center;justify-content:center;position:relative}
.panel small{position:absolute;left:18px;bottom:14px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;opacity:.55}
.main{grid-row:span 2;background:${P.ivory}}
.dark{background:${P.black};color:${P.ivory}}
.split{display:grid;grid-template-columns:1fr 1fr;gap:20px}
.gold{background:${P.gold}}
.white{background:#fff;gap:30px;align-items:center;padding-bottom:24px}
footer{display:grid;grid-template-columns:1.1fr 1fr 1fr 1fr;gap:40px;font-size:15.5px;line-height:1.55;color:#2a2722}
footer h2{font-size:44px;font-weight:300;letter-spacing:.02em;line-height:1.05}
footer h2 span{display:block;font-size:13px;letter-spacing:.2em;font-weight:600;text-transform:uppercase;color:#8c7445;margin-bottom:10px}
footer h3{font-size:12px;letter-spacing:.18em;text-transform:uppercase;font-weight:600;margin-bottom:8px;color:#8c7445}
</style></head><body>
<header><div><b>LAVIV</b> &nbsp;·&nbsp; Identity Exploration</div><div class="ar">شركة لفيف لمستلزمات الحلاقة والكوافير والتجميل</div><div>Concept <b>${k.id}</b> / 04</div></header>
<div class="grid">
  <div class="panel main"><div style="width:${r.mainW}px;height:${r.mainH}px">${fluid(lockupSvg(k, COLORWAYS.primary), 'overflow:visible')}</div><small>Primary · Matte black / Champagne gold on ivory</small></div>
  <div class="panel dark"><div style="width:${r.revW}px;height:${r.revH}px">${fluid(lockupSvg(k, COLORWAYS.reversed))}</div><small>Reversed</small></div>
  <div class="split">
    <div class="panel gold"><div style="height:150px;width:${n(150 * sym.w / sym.h)}px;max-width:220px">${fluid(symbolSvg(k, { ink: P.black, accent: P.ivory }))}</div><small>Symbol</small></div>
    <div class="panel white">${small}<small>1-colour · small sizes</small></div>
  </div>
</div>
<footer>
  <h2><span>Concept ${k.id}</span>${k.name}</h2>
  <div><h3>The idea</h3>${r.idea}</div>
  <div><h3>Lettering</h3>${r.type}</div>
  <div><h3>In use</h3>${r.use}</div>
</footer></body></html>`;
  jobs.push({ html, out: path.join(ROOT, 'boards', `${k.id}-${k.slug}.png`), width: 1800, height: 1240 });
}

// Overview: the four primaries side by side.
const cells = CONCEPTS.map((k) => {
  const r = RATIONALE[k.id];
  return `<div class="c"><div style="width:${r.ovW}px;height:${r.ovH}px">${fluid(lockupSvg(k, COLORWAYS.primary))}</div><p><b>${k.id}</b>&nbsp;&nbsp;${k.name}</p></div>`;
}).join('');
jobs.push({
  html: `<!doctype html><html><head><meta charset="utf-8"><style>*{margin:0;box-sizing:border-box}
body{width:1800px;height:1240px;background:#E7E2D8;font-family:Inter,sans-serif;padding:40px;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:20px}
.c{background:${P.ivory};display:flex;align-items:center;justify-content:center;position:relative}
p{position:absolute;left:22px;bottom:16px;font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#6b6457}
</style></head><body>${cells}</body></html>`,
  out: path.join(ROOT, 'boards', '00-overview.png'), width: 1800, height: 1240,
});

await renderPages(jobs);
console.log(`built ${CONCEPTS.length} concepts, ${jobs.length} boards`);
