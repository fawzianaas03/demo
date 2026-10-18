// Identity pages: cover, idea, construction, lockups, colour/type/pattern.
import {
  P, n, W, H, SCENE_H, BOARD, INK, REV, ON_GOLD, MONO, L, asL, t, ar, para, rect, footer, heading,
  symbol, wordmark, arabic, pattern, fit,
} from './kit.mjs';
import { SYMBOL_SPEC } from '../continuum.mjs';

export function cover() {
  return rect(0, 0, W, H, P.black) +
    pattern({ w: W, h: H, ink: '#1a1a1a', accent: '#1a1a1a', size: 70 }) +
    `<radialGradient id="cv" cx=".5" cy=".46" r=".5"><stop offset="0" stop-color="${P.black}"/><stop offset=".7" stop-color="${P.black}" stop-opacity=".92"/><stop offset="1" stop-color="${P.black}" stop-opacity="0"/></radialGradient>` +
    rect(0, 0, W, H, 'url(#cv)') +
    fit(L('stacked', REV), 620, 250, 560, 600) +
    t(W / 2, 1010, 'IDENTITY DEVELOPMENT  ·  CONCEPT 03 — CONTINUUM', { size: 14, ls: 5, fill: P.ivory, op: 0.6, anchor: 'middle' }) +
    ar(W / 2, 1050, 'شركة لفيف لمستلزمات الحلاقة والكوافير والتجميل', { size: 15, fill: P.gold, anchor: 'middle', weight: 300 });
}

// The idea in three strokes.
export function idea() {
  const { w, sx, foot, bowl, fx, lx } = SYMBOL_SPEC;
  const k = 1.9;
  const r = (bowl - foot) / 2, R = sx - lx;
  const stroke = (d, c, extra = '') => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="butt" ${extra}/>`;
  const step = (x, body, num, title, text) =>
    `<g transform="translate(${x} 300)">${rect(0, 0, 440, 440, P.ivory)}` +
    `<g transform="translate(${n(220 - 81 * k)} ${n(220 - 82 * k)}) scale(${k})">${body}</g></g>` +
    t(x, 800, num, { size: 13, weight: 600, ls: 3, fill: '#8c7445' }) +
    t(x, 836, title, { size: 24, weight: 400 }) +
    para(x, 856, 430, 150, text, { size: 15 });
  const arrow = (x, y, rot, c) => `<path d="M0 -9L14 0L0 9Z" fill="${c}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
  const s1 = stroke(`M${sx} 7V${foot}H${fx - 2.5}`, P.black) + arrow(fx + 10, foot, 0, P.gold);
  const s2 = stroke(`M${sx} 7V${foot}H${fx - 2.5}`, P.black, 'opacity=".25"') +
    stroke(`M${fx} ${foot}A${r} ${r} 0 0 1 ${fx} ${bowl}H${sx}A${R} ${R} 0 0 1 ${lx} ${bowl - R}V72`, P.gold) + arrow(lx, 58, -90, P.black);
  const s3 = `<g transform="translate(0 7)">${symbol().render(INK)}</g>`;
  return rect(0, 0, W, SCENE_H, BOARD) +
    heading(120, 120, 'The idea', 'One stroke. Two scripts.') +
    para(1060, 92, 620, 160, 'Latin <b>L</b> and Arabic <b>ل</b> begin the same way, with a single descending stem. Continuum writes that stem once, then lets each script finish its own letter, so the mark is bilingual by construction rather than by translation.', { size: 17 }) +
    step(120, s1, '01', 'Write the L', 'The stem descends and turns sharply right along the baseline. Square, Latin and architectural, it is drawn in matte black.') +
    step(680, s2, '02', 'Return beneath: complete the ل', 'Without lifting the pen, the stroke hairpins back underneath and sweeps up into the bowl of the Arabic lam, in champagne. The turn is the silhouette of the salon hair pin.') +
    step(1240, s3, '03', 'Cut both ends', 'Both terminals are sliced on one 1:2 razor line. A hairline gap marks where Latin hands over to Arabic, so the mark still reads as two letters in one colour.') +
    footer('The idea', 2);
}

export function construction() {
  const { w, gap, sx, foot, bowl, fx, lx } = SYMBOL_SPEC;
  const sym = symbol();
  const k = 3.6, X0 = 120 + (900 - k * (sym.w + 40)) / 2 + 20 * k, Y0 = 160 + (900 - k * (sym.h + 40)) / 2 + 20 * k;
  const px = (x) => X0 + k * x, py = (y) => Y0 + k * (y - sym.top);
  let grid = '';
  for (let x = -20; x <= 180; x += 10) grid += `<line x1="${n(px(x))}" y1="${n(py(-13))}" x2="${n(px(x))}" y2="${n(py(187))}" stroke="#cfc6b6" stroke-width="${x % 20 ? 0.5 : 1}"/>`;
  for (let y = -13; y <= 187; y += 10) grid += `<line x1="${n(px(-20))}" y1="${n(py(y))}" x2="${n(px(180))}" y2="${n(py(y))}" stroke="#cfc6b6" stroke-width="${(y + 13) % 20 ? 0.5 : 1}"/>`;
  const G = '#8c7445';
  const lbl = (x, y, s, o = {}) => t(x, y, s, { size: 14, weight: 500, fill: G, ...o });
  const line = (x1, y1, x2, y2, extra = '') => `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${G}" stroke-width="1.4" ${extra}/>`;
  const dot = (x, y) => `<circle cx="${n(x)}" cy="${n(y)}" r="4" fill="${G}"/>`;
  // annotations
  let a = '';
  a += line(px(sx - w / 2), py(30), px(sx + w / 2), py(30)) + line(px(sx - w / 2), py(25), px(sx - w / 2), py(35)) + line(px(sx + w / 2), py(25), px(sx + w / 2), py(35));
  a += lbl(px(sx + w / 2) + 12, py(30) + 5, 'm  — stroke = 1 module');
  const hc = [fx, (foot + bowl) / 2];
  a += dot(px(hc[0]), py(hc[1])) + line(px(hc[0]), py(hc[1]), px(hc[0] + 44), py(hc[1])) + lbl(px(hc[0] + 47), py(hc[1]) + 5, 'r = 1.3 m');
  const bc = [sx, bowl - (sx - lx)];
  a += dot(px(bc[0]), py(bc[1])) + line(px(bc[0]), py(bc[1]), px(bc[0] - 53), py(bc[1] + 53)) + lbl(px(bc[0] - 53) - 8, py(bc[1] + 53) + 22, 'R = 2.3 m', { anchor: 'end' });
  a += line(px(fx - gap / 2), py(foot - 16), px(fx - gap / 2) + 40, py(foot - 34)) + lbl(px(fx - gap / 2) + 46, py(foot - 34) + 5, 'gap = m / 8');
  const cut = (x0, y0) => line(px(x0 - 34), py(y0 + 17), px(x0 + 34), py(y0 - 17), 'stroke-dasharray="7 6"');
  a += cut(sx, 12) + cut(lx, 84);
  a += lbl(px(sx + 34) + 10, py(12 - 17) + 5, '1 : 2 razor cut');
  a += lbl(px(lx - 34) - 10, py(84 + 17) + 20, 'parallel', { anchor: 'start' });
  // clear space
  const cs = `<rect x="${n(px(-20))}" y="${n(py(sym.top - 20))}" width="${n(k * (sym.w + 40))}" height="${n(k * (sym.h + 40))}" fill="none" stroke="${P.gold}" stroke-width="1.5" stroke-dasharray="3 5"/>`;
  const sizes = [64, 32, 20].map((h, i) => {
    const x = 1130 + i * 120;
    return fit(asL(sym, INK), x, 820 - h, 100, h, { valign: 'bottom', align: 'left' }) + t(x, 850, `${h} px`, { size: 13, fill: '#6b6457' });
  }).join('');
  return rect(0, 0, W, SCENE_H, BOARD) + rect(120, 160, 900, 900, P.ivory) +
    `<g>${grid}</g><g transform="translate(${X0} ${Y0}) scale(${k})">${sym.render(INK)}</g>${cs}${a}` +
    lbl(px(-20), py(sym.top - 20) - 12, 'CLEAR SPACE = 1 m ON ALL SIDES', { size: 11, ls: 2 }) +
    heading(1130, 200, 'Construction', 'Built on one module') +
    para(1130, 280, 560, 320, 'The whole mark is drawn with a single stroke of weight <b>m</b>. The hairpin turns on a radius of 1.3 m and the Arabic bowl on 2.3 m. Both terminals are cut on parallel 1:2 lines, the same angle used on every stem in the Latin and Arabic wordmarks. The hand-over from L to ل is marked by a gap of m/8.', { size: 16 }) +
    t(1130, 690, 'MINIMUM SIZES', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    t(1130, 720, 'Symbol', { size: 15, fill: '#3a362f' }) + sizes +
    t(1130, 920, 'Primary lockup', { size: 15, fill: '#3a362f' }) +
    fit(L('horizontal', INK, { weight: 8 }), 1130, 945, 240, 70, { align: 'left' }) +
    t(1130, 1040, 'Below 240 px wide, the lockup switches to the Regular wordmark weight (shown).', { size: 13, fill: '#6b6457' }) +
    footer('Construction', 3);
}

export function lockups() {
  return rect(0, 0, W, SCENE_H, BOARD) +
    heading(120, 110, 'Lockups', 'Four arrangements, one system') +
    rect(120, 200, 1000, 430, P.ivory) + fit(L('horizontal', INK), 200, 300, 840, 230) +
    rect(1140, 200, 540, 430, P.black) + fit(L('stacked', REV), 1290, 245, 240, 340) +
    rect(120, 650, 620, 410, P.ivory) + fit(L('arabic', INK), 190, 740, 480, 220) +
    rect(760, 650, 920, 410, P.gold) + fit(L('inline', ON_GOLD), 880, 800, 680, 100) +
    t(140, 610, 'PRIMARY', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    t(1160, 610, 'STACKED  ·  REVERSED', { size: 12, weight: 600, ls: 3, fill: P.gold }) +
    t(140, 1040, 'ARABIC-FIRST  ·  FOR LOCAL SIGNAGE AND RTL LAYOUTS', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    t(780, 1040, 'INLINE WORDMARK  ·  COMBS, PENS, EDGES, FOOTERS', { size: 12, weight: 600, ls: 3, fill: P.black }) +
    para(1160, 110, 520, 80, 'Each lockup is drawn as an outline. None needs a font installed, so every file reproduces exactly in signage, print and embroidery.', { size: 15 }) +
    footer('Lockups', 4);
}

export function colour() {
  const sw = (x, y, w, h, fill, name, hex, rgb, dark) =>
    rect(x, y, w, h, fill) +
    t(x + 28, y + h - 70, name, { size: 22, weight: 400, fill: dark ? P.ivory : P.black }) +
    t(x + 28, y + h - 42, hex, { size: 14, ls: 2, fill: dark ? P.ivory : P.black, op: 0.75 }) +
    t(x + 28, y + h - 20, rgb, { size: 12, ls: 1.5, fill: dark ? P.ivory : P.black, op: 0.55 });
  return rect(0, 0, W, SCENE_H, BOARD) +
    heading(120, 110, 'Colour · Type · Pattern', 'A quiet, warm palette') +
    sw(120, 200, 420, 380, P.ivory, 'Warm Ivory', '#F4F0E8', 'RGB 244 · 240 · 232', false) +
    sw(560, 200, 260, 380, P.black, 'Matte Black', '#111111', 'RGB 17 · 17 · 17', true) +
    sw(840, 200, 200, 380, P.gold, 'Champagne', '#C6A66B', 'RGB 198 · 166 · 107', false) +
    t(120, 620, 'PROPORTION', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    rect(120, 640, 552, 16, P.ivory) + rect(672, 640, 276, 16, P.black) + rect(948, 640, 92, 16, P.gold) +
    t(120, 680, 'Ivory 60  ·  Black 30  ·  Champagne 10. Gold is an accent, never a background for long text.', { size: 14, fill: '#6b6457' }) +
    // typography
    t(1120, 220, 'SUPPORTING TYPEFACES', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    t(1120, 330, 'Aa', { size: 110, weight: 300 }) +
    t(1300, 280, 'Jost', { size: 26, weight: 400 }) + t(1300, 308, 'Light · Regular · Medium', { size: 14, fill: '#6b6457' }) +
    t(1300, 336, 'Geometric sans for Latin text.', { size: 14, fill: '#6b6457' }) +
    ar(1200, 470, 'أب', { size: 92, weight: 300, anchor: 'middle' }) +
    t(1300, 430, 'Noto Kufi Arabic', { size: 26, weight: 400 }) + t(1300, 458, 'Light · Regular · Medium', { size: 14, fill: '#6b6457' }) +
    t(1300, 486, 'Geometric Kufi for Arabic text.', { size: 14, fill: '#6b6457' }) +
    t(1120, 560, 'Tools for the craft.', { size: 30, weight: 300 }) +
    ar(1680, 610, 'أدوات الحرفة', { size: 26, weight: 300, anchor: 'end' }) +
    // pattern
    t(120, 750, 'THE HAIRPIN PATTERN  ·  TISSUE, LININGS, SOCIAL BACKGROUNDS', { size: 12, weight: 600, ls: 3, fill: '#8c7445' }) +
    pattern({ x: 120, y: 770, w: 500, h: 300, ink: P.gold, accent: P.gold, bg: P.ivory, size: 44, opacity: 0.55 }) +
    pattern({ x: 640, y: 770, w: 500, h: 300, ink: '#262626', accent: '#262626', bg: P.black, size: 44 }) +
    pattern({ x: 1160, y: 770, w: 520, h: 300, ink: P.black, accent: P.black, bg: P.gold, size: 44, opacity: 0.16 }) +
    footer('Colour · Type · Pattern', 5);
}
