// Builds the Concept 03 (Continuum) identity book:
//   - vector lockups for every arrangement and colourway
//   - one PNG per page and a single vector PDF of the whole book
//   node brand/laviv/src/book/build.mjs [pageNumber...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { svgDoc } from '../geometry.mjs';
import { P, LOCKUPS, page } from './kit.mjs';
import { cover, idea, construction, lockups, colour } from './identity.mjs';
import { storefront, packaging, stationery, bags, uniform, equipment, digital } from './scenes.mjs';
import { renderPages, renderPdf } from '../render.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'concept-03-continuum');

const PAGES = [
  ['cover', cover], ['idea', idea], ['construction', construction], ['lockups', lockups], ['colour-type-pattern', colour],
  ['storefront', storefront], ['packaging', packaging], ['stationery', stationery], ['shopping-bags', bags],
  ['uniform', uniform], ['equipment', equipment], ['digital', digital],
];

const only = process.argv.slice(2).map(Number);
const head = `<meta charset="utf-8"><link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600&family=Noto+Kufi+Arabic:wght@300;400;500&display=swap" rel="stylesheet">`;
const html = (body, css = '') => `<!doctype html><html><head>${head}<style>*{margin:0}body{background:#fff}${css}</style></head><body>${body}</body></html>`;

// Vector lockup files for the developed system.
const COLOURWAYS = {
  primary: { ink: P.black, accent: P.gold },
  reversed: { ink: P.ivory, accent: P.gold },
  'on-gold': { ink: P.black, accent: P.ivory },
  'mono-black': { ink: P.black, accent: P.black },
  'mono-white': { ink: '#FFFFFF', accent: '#FFFFFF' },
};
const lockDir = path.join(OUT, 'lockups');
fs.mkdirSync(lockDir, { recursive: true });
for (const kind of ['horizontal', 'stacked', 'arabic', 'inline']) {
  for (const [name, c] of Object.entries(COLOURWAYS)) {
    const L = LOCKUPS[kind](c);
    const pad = 24;
    fs.writeFileSync(path.join(lockDir, `${kind}-${name}.svg`),
      svgDoc(L.w + pad * 2, L.h + pad * 2, `<g transform="translate(${pad} ${pad})">${L.body}</g>`, { title: `LAVIV — ${kind} lockup` }));
  }
}

const pages = PAGES.map(([slug, fn], i) => ({ slug, no: i + 1, svg: page(fn()) }));
const bookDir = path.join(OUT, 'book');
fs.mkdirSync(bookDir, { recursive: true });
const jobs = pages.filter((p) => !only.length || only.includes(p.no)).map((p) => ({
  html: html(p.svg), out: path.join(bookDir, `${String(p.no).padStart(2, '0')}-${p.slug}.png`), width: 1800, height: 1200,
}));
await renderPages(jobs);
if (!only.length) {
  await renderPdf(
    html(pages.map((p) => `<section>${p.svg}</section>`).join(''), '@page{size:1800px 1200px;margin:0}section{width:1800px;height:1200px;page-break-after:always;overflow:hidden}'),
    path.join(OUT, 'LAVIV-Continuum-Identity.pdf'),
  );
}
console.log(`rendered ${jobs.length} page(s)${only.length ? '' : ' + PDF'}`);
