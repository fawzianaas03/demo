import {
  PALETTE as P, n, uid, poly, rect, roundRect, roundRectCCW, diamond, place,
  monoCaps, geoWord, geoDiagonal, arabicGeo,
} from './geometry.mjs';
import { symbol as continuumSymbol, LOCKUPS } from './continuum.mjs';

const SUB = 'PROFESSIONAL BARBER SUPPLIES';

// ===========================================================================
// 01 — FADE
// The L is a skin fade: a solid "zero-guard" foot, then the stem dissolves
// upward in bars that thin out — the gradient of a fade built without a gradient.
// ===========================================================================
function fadeSymbol() {
  const stem = 54, foot = 116, H = 156, footH = 50;
  const N = 7, g = 6.5, r = 0.7;
  const avail = H - footH - N * g;
  const sum = (1 - r ** N) / (1 - r);
  const t0 = avail / sum;
  let y = H - footH - g;
  let d = rect(0, H - footH, foot, footH);
  for (let i = 0; i < N; i++) {
    const t = t0 * r ** i;
    d += rect(0, y - t, stem, t);
    y -= t + g;
  }
  return { w: foot, h: H, render: (c) => `<path fill="${c.ink}" d="${d}"/>` };
}

function fadeWord() {
  const s = 15;
  const W = 84, b = 16;
  const g = geoDiagonal(s, W, b, false);
  // parallel diagonals: horizontal gap between A's right leg and V's left leg
  const diagKern = g.cx - b / 2 - 22;
  const wd = geoWord([
    { ch: 'L', W: 56 },
    { ch: 'A', W, b, bar: [64, 64 + s * 0.85], kern: 12 },
    { ch: 'V', W, b, kern: -diagKern },
    { ch: 'I', kern: 22 },
    { ch: 'V', W, b, kern: 22 },
  ], { s, gap: 22 });
  return { w: wd.w, h: 100, render: (c) => `<g fill="${c.ink}">${wd.body}</g>` };
}

function fadeLockup(c) {
  const sym = fadeSymbol();
  const word = fadeWord();
  const ar = arabicGeo({ w: 15, loopW: 42, loopH: 42, toothH: 40, tick: 30, tail: 30, gaps: [20, 20, 24], dot: 13, dotGap: 11, round: 0.55 });
  const sub = monoCaps(SUB, { cap: 11, weight: 1.6, tracking: 0.5 });
  const dividerGap = 40;
  const rowW = word.w + dividerGap * 2 + ar.w;
  const subS = (rowW) / sub.w;
  const W = rowW;
  const symS = 1.3;
  const symW = sym.w * symS, symH = sym.h * symS;
  const rowY = symH + 70;
  const subY = rowY + 100 + 62;
  const H = subY + sub.h * subS;
  const body =
    place(sym, (W - symW) / 2, 0, symS, c) +
    place(word, 0, rowY, 1, c) +
    `<rect x="${n(word.w + dividerGap - 1)}" y="${n(rowY + 6)}" width="2" height="${n(100 + 16)}" fill="${c.accent}"/>` +
    place(ar, word.w + dividerGap * 2, rowY, 1, c) +
    place({ render: () => sub.render(c.accent) }, 0, subY, subS);
  return { w: W, h: H, body };
}

// ===========================================================================
// 02 — OPEN RAZOR
// A straight razor opened to exactly 90° *is* an L: the scale is the stem,
// the blade is the foot, the pivot pin is the one point of gold.
// ===========================================================================
function razorSymbol() {
  // local box ~ 150 x 160
  // The spine runs straight out of the tang; the blade drops below it at the heel.
  const scale = roundRect(0, 0, 30, 160, 15);
  const pin = { cx: 15, cy: 128, r: 6.5 };
  const blade = `M38 118H140Q148 118 148 126L146.5 153Q146 160 139 160H84C73 160 69 138 58 138H38Z`;
  return {
    w: 148, h: 160,
    render: (c) => {
      const id = uid('rz');
      return `<defs><clipPath id="${id}a"><rect x="0" y="0" width="200" height="150.5"/></clipPath>` +
        `<clipPath id="${id}b"><rect x="0" y="153" width="200" height="20"/></clipPath></defs>` +
        `<path fill="${c.ink}" fill-rule="evenodd" d="${scale}M${pin.cx + pin.r} ${pin.cy}A${pin.r} ${pin.r} 0 1 0 ${pin.cx + pin.r} ${pin.cy + 0.01}Z"/>` +
        `<path fill="${c.ink}" clip-path="url(#${id}a)" d="${blade}"/>` +
        `<path fill="${c.accent}" clip-path="url(#${id}b)" d="${blade}"/>` +
        `<circle cx="${pin.cx}" cy="${pin.cy}" r="${pin.r - 1.8}" fill="${c.accent}"/>`;
    },
  };
}

// High-contrast wedge-serif capitals. Serifs are cut like a honed edge.
function razorWord() {
  const T = 19, t = 3.6, sl = 12, sh = 10; // thick, thin, serif length, serif height
  const wedgeL = (x, y, dir, k = 1) => poly([[x, y], [x - sl * k, y], [x, y + dir * sh * k]]);
  const wedgeR = (x, y, dir, k = 1) => poly([[x, y], [x + sl * k, y], [x, y + dir * sh * k]]);
  const glyphs = [];
  let x = sl;
  const add = (d, w, kern = 0) => { x += kern; glyphs.push(`<path transform="translate(${n(x)} 0)" d="${d}"/>`); x += w; };

  // L
  {
    const W = 60;
    let d = rect(0, 0, T, 100) + rect(T - 1, 100 - t, W - T + 1, t);
    d += wedgeL(0, 0, 1) + wedgeR(T, 0, 1) + wedgeL(0, 100, -1);
    d += poly([[W, 100 - t], [W, 100 - 30], [W - 3.4, 100 - t]]);
    add(d, W);
  }
  // A / V share a contrast triangle construction
  const contrastTri = (W, thin, thick, inverted) => {
    // apex at (W/2, -3); legs to baseline. thin leg left (A), thick right.
    const apexY = -3;
    const cx = W / 2;
    const base = W, inner = W - thin - thick;
    const k = inner / base;
    const ay = 100 - k * (100 - apexY);
    const ax = thin + k * cx;
    let outer = [[cx, apexY], [W, 100], [0, 100]];
    let counter = [[ax, ay], [W - thick, 100], [thin, 100]];
    let legL = [[cx, apexY], [ax, ay], [thin, 100], [0, 100]];
    let legR = [[cx, apexY], [W, 100], [W - thick, 100], [ax, ay]];
    const xInL = (y) => thin + k * cx * 0 + (ax - thin) * (100 - y) / (100 - ay);
    const xInR = (y) => (W - thick) + (ax - (W - thick)) * (100 - y) / (100 - ay);
    const flip = (pts) => (inverted ? pts.map(([px, py]) => [W - px, 100 - py]) : pts);
    return { legL: flip(legL), legR: flip(legR), xInL, xInR, outer, counter };
  };
  // A
  {
    const W = 92, thin = 4.2, thick = 21;
    const g = contrastTri(W, thin, thick, false);
    const y1 = 64, y2 = 64 + t;
    let d = poly(g.legL) + poly(g.legR);
    d += poly([[g.xInL(y1), y1], [g.xInR(y1), y1], [g.xInR(y2), y2], [g.xInL(y2), y2]]);
    d += wedgeL(0, 100, -1, 0.7) + wedgeR(thin, 100, -1, 0.7) + wedgeL(W - thick, 100, -1) + wedgeR(W, 100, -1);
    add(d, W, 16);
  }
  // V (thick leg on the left, as the pen would make it)
  const V = () => {
    const W = 92, thin = 4.2, thick = 21;
    const g = contrastTri(W, thin, thick, true);
    let d = poly(g.legL) + poly(g.legR);
    d += wedgeL(0, 0, 1) + wedgeR(thick, 0, 1) + wedgeL(W - thin, 0, 1, 0.6) + wedgeR(W, 0, 1, 0.6);
    return [d, W];
  };
  {
    const [d, W] = V();
    add(d, W, -8);
  }
  // I
  add(rect(0, 0, T, 100) + wedgeL(0, 0, 1) + wedgeR(T, 0, 1) + wedgeL(0, 100, -1) + wedgeR(T, 100, -1), T, 30);
  {
    const [d, W] = V();
    add(d, W, 30);
  }
  x += sl;
  return { w: x, h: 100, render: (c) => `<g fill="${c.ink}">${glyphs.join('')}</g>` };
}

// Arabic with calligraphic (reverse) contrast: heavy horizontals, hairline verticals,
// the same wedge "tarwis" head as the Latin serifs.
function razorArabic() {
  const hT = 12, vT = 4.4, loopW = 42, loopH = 36, tick = 30, wedge = 9;
  const tail = 36, gaps = [20, 20, 26];
  const x0 = 0;
  const fa1 = x0 + vT + tail;
  const tooth = fa1 + loopW + gaps[0];
  const fa2 = tooth + vT + gaps[1];
  const lam = fa2 + loopW + gaps[2];
  const W = lam + vT;
  const toothH = 40;
  let d = rect(0, 100 - hT, W, hT);
  // final fa tail upturn (wedge leans left)
  d += poly([[x0, 100 - hT + 1], [x0, 100 - tick], [x0 + vT, 100 - tick + 4], [x0 + vT, 100 - hT + 1]]);
  d += poly([[x0, 100 - tick], [x0 + vT, 100 - tick + 4], [x0 + vT, 100 - tick - wedge + 4]]);
  // tooth with wedge head
  d += rect(tooth, 100 - toothH, vT, toothH) + poly([[tooth - wedge, 100 - toothH], [tooth, 100 - toothH], [tooth, 100 - toothH + wedge]]);
  // lam with wedge head
  d += rect(lam, 0, vT, 100) + poly([[lam - wedge - 2, 0], [lam, 0], [lam, wedge + 2]]);
  const loop = (x) => roundRect(x, 100 - loopH, loopW, loopH, 17) +
    roundRectCCW(x + vT + 1, 100 - loopH + hT * 0.72, loopW - 2 * vT - 2, loopH - hT * 0.72 - hT, 6);
  d += loop(fa1) + loop(fa2);
  const ds = 13, dg = 12;
  const dots = diamond(fa1 + loopW / 2, 100 - loopH - dg - ds / 2, ds) + diamond(fa2 + loopW / 2, 100 - loopH - dg - ds / 2, ds) +
    diamond(tooth + vT / 2 - ds * 0.72, 100 + dg + ds / 2, ds) + diamond(tooth + vT / 2 + ds * 0.72, 100 + dg + ds / 2, ds);
  return { w: W, h: 100 + dg + ds, render: (c) => `<path fill="${c.ink}" d="${d}"/><path fill="${c.accent}" d="${dots}"/>` };
}

function razorLockup(c) {
  const sym = razorSymbol();
  const word = razorWord();
  const ar = razorArabic();
  const sub = monoCaps(SUB, { cap: 10, weight: 1.3, tracking: 0.62 });
  const W = word.w;
  const symS = 1.35;
  const symW = sym.w * symS, symH = sym.h * symS;
  const wordY = symH + 64;
  const ruleY = wordY + 100 + 36;
  const arS = 0.78;
  const arY = ruleY + 34;
  const subS = (W * 0.86) / sub.w;
  const subY = arY + ar.h * arS + 34;
  const H = subY + sub.h * subS;
  const arX = (W - ar.w * arS) / 2;
  const ruleW = (W - ar.w * arS) / 2 - 30;
  const body =
    place(sym, (W - symW) / 2 + 2, 0, symS, c) +
    place(word, 0, wordY, 1, c) +
    `<rect x="0" y="${n(arY + 100 * arS - 1)}" width="${n(ruleW)}" height="1.4" fill="${c.accent}"/>` +
    `<rect x="${n(W - ruleW)}" y="${n(arY + 100 * arS - 1)}" width="${n(ruleW)}" height="1.4" fill="${c.accent}"/>` +
    place(ar, arX, arY, arS, c) +
    place({ render: () => sub.render(c.ink) }, (W - sub.w * subS) / 2, subY, subS);
  return { w: W, h: H, body };
}

// 03 — CONTINUUM lives in ./continuum.mjs (developed identity system).
const continuumLockup = (c) => LOCKUPS.horizontal(c);

// ===========================================================================
// 04 — KUFIC BLADE
// The Arabic name, drawn in geometric Kufic, *is* the clipper blade:
// the letters' uprights are its teeth, the baseline is its body, and the
// two dots of the ya are punched through it like the blade's screw holes.
// ===========================================================================
function kuficSymbol() {
  const k = 12; // stroke module
  const base = 84; // baseline = spine of the blade
  const bodyB = 106, teethB = 119;
  const W = 208;
  const tip = (x, top) => poly([[x, base + 1], [x, top + k / 2], [x + k / 2, top], [x + k, top + k / 2], [x + k, base + 1]]);
  const loop = (x) => rect(x, base - 3 * k, 3 * k, 3 * k + 1);
  const hole = (x) => rect(x + k, base - 2 * k, k, k);
  const fa1 = 40, fa2 = 136;
  let d = tip(0, 58) + tip(100, 52) + tip(196, 0) + loop(fa1) + loop(fa2);
  d += rect(0, base, W, bodyB - base);
  // fine cutting teeth along the lower edge of the blade
  const pitch = 7, tw = 3.8, count = Math.floor((W - tw) / pitch) + 1;
  const off = (W - ((count - 1) * pitch + tw)) / 2;
  for (let i = 0; i < count; i++) {
    const x = off + i * pitch;
    d += `M${n(x)} ${bodyB - 1}H${n(x + tw)}V${teethB - tw / 2}A${tw / 2} ${tw / 2} 0 0 1 ${n(x)} ${teethB - tw / 2}Z`;
  }
  // the two dots of the ya, punched through the blade like its rivets
  const holes = rect(92, 91, 9, 9) + rect(111, 91, 9, 9) + hole(fa1) + hole(fa2);
  const dotY = base - 3 * k - 17;
  return {
    w: W, h: teethB,
    render: (c) => {
      const id = uid('kb');
      return `<defs><mask id="${id}" maskUnits="userSpaceOnUse" x="-10" y="-10" width="${W + 20}" height="${teethB + 20}">` +
        `<rect x="-10" y="-10" width="${W + 20}" height="${teethB + 20}" fill="#fff"/>` +
        `<path fill="#000" d="${holes}"/></mask></defs>` +
        `<path mask="url(#${id})" fill="${c.ink}" d="${d}"/>` +
        `<path fill="${c.accent}" d="${diamond(fa1 + 1.5 * k, dotY, 15)}${diamond(fa2 + 1.5 * k, dotY, 15)}"/>`;
    },
  };
}

// Latin capitals cut from the same module: tooth-tipped stems, an open Λ and
// pointed V's that set up the zig-zag rhythm of a blade edge.
function kuficWord() {
  const k = 20;
  const glyphs = [];
  let x = 0;
  const add = (d, w, gap) => { x += gap; glyphs.push(`<path transform="translate(${n(x)} 0)" d="${d}"/>`); x += w; };
  const toothStem = (h) => [[0, 100], [0, k / 2], [k / 2, 0], [k, k / 2]];
  add(poly([...toothStem(), [k, 100 - k], [58, 100 - k], [58, 100]]), 58, 0);
  const W = 84;
  const A = geoDiagonal(k, W, 0, true);
  const V = geoDiagonal(k, W, 0, false);
  add(poly(A.pts), W, 18);
  const vk = -(A.cx - 26);
  add(poly(V.pts), W, vk);
  add(poly([[0, 100], [0, k / 2], [k / 2, 0], [k, k / 2], [k, 100]]), k, 26);
  add(poly(V.pts), W, 26);
  return { w: x, h: 100, render: (c) => `<g fill="${c.ink}">${glyphs.join('')}</g>` };
}

function kuficLockup(c) {
  const sym = kuficSymbol();
  const word = kuficWord();
  const sub = monoCaps(SUB, { cap: 10, weight: 1.5, tracking: 0.5 });
  const wordS = 0.72;
  const W = Math.max(sym.w * 1.6, word.w * wordS);
  const symS = 1.6;
  const wordY = sym.h * symS + 58;
  const subS = (word.w * wordS) / sub.w;
  const subY = wordY + 100 * wordS + 30;
  const body =
    place(sym, (W - sym.w * symS) / 2, 0, symS, c) +
    place(word, (W - word.w * wordS) / 2, wordY, wordS, c) +
    place({ render: () => sub.render(c.accent) }, (W - word.w * wordS) / 2, subY, subS);
  return { w: W, h: subY + sub.h * subS, body };
}

export const CONCEPTS = [
  { id: '01', slug: 'fade', name: 'Fade', symbol: fadeSymbol, lockup: fadeLockup },
  { id: '02', slug: 'open-razor', name: 'Open Razor', symbol: razorSymbol, lockup: razorLockup },
  { id: '03', slug: 'continuum', name: 'Continuum', symbol: continuumSymbol, lockup: continuumLockup },
  { id: '04', slug: 'kufic-blade', name: 'Kufic Blade', symbol: kuficSymbol, lockup: kuficLockup },
];
