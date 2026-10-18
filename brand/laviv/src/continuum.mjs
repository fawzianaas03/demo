// Concept 03 — CONTINUUM: the developed identity system.
// One unbroken stroke writes both names: down the shared stem, out along the
// foot of the Latin L, then a hairpin turn back beneath it to complete the bowl
// of the Arabic ل. Every terminal in the system is cut at the same 1:2 razor angle.
import { n, uid, diamond, place, monoCaps, geoWord, geoDiagonal } from './geometry.mjs';

export const SUB = 'PROFESSIONAL BARBER SUPPLIES';

// The razor cut: a line of slope 1:2 rising to the right, placed so that the
// highest point of a stem of weight w centred on x0 lands exactly on `top`.
const cutLine = (x0, top, w) => (x) => top + w / 4 - 0.5 * (x - x0);

// ---------------------------------------------------------------------------
// Symbol. Module m = stroke weight = 20 units.
export const SYMBOL_SPEC = { w: 20, gap: 2.5, sx: 56, foot: 104, bowl: 156, fx: 126, lx: 10 };

export function symbol() {
  const { w, gap, sx, foot, bowl, fx, lx } = SYMBOL_SPEC;
  const L = `M${sx} -20V${foot}H${fx - gap}`;
  const r = (bowl - foot) / 2, R = sx - lx;
  const ret = `M${fx} ${foot}A${r} ${r} 0 0 1 ${fx} ${bowl}H${sx}A${R} ${R} 0 0 1 ${lx} ${bowl - R}V50`;
  const up = (x) => 84 - 0.5 * (x - lx), st = (x) => 12 - 0.5 * (x - sx);
  const clip = `M-30 220V${n(up(-30))}L34 ${n(up(34))}V${n(st(34))}L90 ${n(st(90))}H220V220Z`;
  const top = st(sx + w / 2);
  return {
    w: fx + r + w / 2, h: bowl + w / 2 - top, top,
    render: (c) => {
      const id = uid('ct');
      return `<defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs>` +
        `<g transform="translate(0 ${n(-top)})"><g clip-path="url(#${id})" fill="none" stroke-width="${w}" stroke-linecap="butt" stroke-linejoin="miter">` +
        `<path stroke="${c.ink}" d="${L}"/><path stroke="${c.accent}" d="${ret}"/></g></g>`;
    },
  };
}

// ---------------------------------------------------------------------------
// Latin wordmark. Two weights: Hairline for display, Regular for small sizes.
export function wordmark({ weight = 5.2 } = {}) {
  const s = weight, W = 92 + (weight - 5.2) * 0.8;
  const space = 64 - (weight - 5.2) * 1.2;
  const g = geoDiagonal(s, W, 0, false);
  const wd = geoWord([
    { ch: 'L', W: 62, cut: true },
    { ch: 'A', W, b: 0, bar: [66, 66 + s], kern: 16 },
    { ch: 'V', W, b: 0, kern: -(g.cx - space) + 18 },
    { ch: 'I', cut: true, kern: space },
    { ch: 'V', W, b: 0, kern: space },
  ], { s, gap: space });
  return { w: wd.w, h: 100, render: (c) => `<g fill="${c.ink}">${wd.body}</g>` };
}

// ---------------------------------------------------------------------------
// Arabic wordmark  لفيف  — monoline, round counters, the final-fa tail turns up
// on the same curve as the symbol's bowl, and every terminal takes the razor cut.
export function arabic({ weight = 5.6 } = {}) {
  const w = weight;
  const D = 36 + w * 0.3, toothH = 34, tickH = 32, tail = 40, gaps = [24, 24, 30], R = 15;
  const dot = 9 + w * 0.35, dotGap = 10;
  const yb = 100 - w / 2;
  const xt = w / 2;
  const fa1 = xt + tail;
  const tooth = fa1 + D + gaps[0] + w / 2;
  const fa2 = tooth + w / 2 + gaps[1];
  const lam = fa2 + D + gaps[2] + w / 2;
  const width = lam + w / 2;
  const cT = cutLine(xt, 100 - tickH, w), cY = cutLine(tooth, 100 - toothH, w), cL = cutLine(lam, 0, w);
  const e = w / 2 + 0.6;
  const clip = `M-60 300V${n(cT(-60))}L${n(xt + e)} ${n(cT(xt + e))}V-200H${n(tooth - e)}V${n(cY(tooth - e))}` +
    `L${n(tooth + e)} ${n(cY(tooth + e))}V-200H${n(lam - e)}V${n(cL(lam - e))}L${n(lam + 60)} ${n(cL(lam + 60))}V300Z`;
  const ring = (x) => `<circle cx="${n(x + D / 2)}" cy="${n(100 - D / 2)}" r="${n(D / 2 - w / 2)}"/>`;
  const above = (x) => diamond(x + D / 2, 100 - D - dotGap - dot / 2, dot);
  const below = diamond(tooth - dot * 0.72, 100 + dotGap + dot / 2, dot) + diamond(tooth + dot * 0.72, 100 + dotGap + dot / 2, dot);
  return {
    w: width, h: 100, depth: dotGap + dot,
    render: (c) => {
      const id = uid('ar');
      return `<defs><clipPath id="${id}"><path d="${clip}"/></clipPath></defs>` +
        `<g clip-path="url(#${id})" fill="none" stroke="${c.ink}" stroke-width="${n(w)}" stroke-linecap="butt">` +
        `<path d="M${n(xt)} 40V${n(yb - R)}A${R} ${R} 0 0 0 ${n(xt + R)} ${n(yb)}H${n(lam)}V-20"/>` +
        `<path d="M${n(tooth)} ${n(yb)}V40"/>${ring(fa1)}${ring(fa2)}</g>` +
        `<path fill="${c.dots ?? c.accent}" d="${above(fa1)}${above(fa2)}${below}"/>`;
    },
  };
}

// ---------------------------------------------------------------------------
// Lockups. Each returns { w, h, body } in its own units; colours { ink, accent }.
const sub = (weight = 1.15) => monoCaps(SUB, { cap: 10, weight, tracking: 0.55 });
const descriptor = (el, c) => ({ render: () => el.render(c.ink) });

export const LOCKUPS = {
  // Primary: symbol left, Latin over a gold rule, descriptor and Arabic beneath.
  horizontal(c, { weight = 5.2 } = {}) {
    const sym = symbol(), word = wordmark({ weight }), ar = arabic({ weight: weight * 1.08 + 0.1 }), d = sub();
    const symS = 1.25, symH = sym.h * symS;
    const textX = sym.w * symS + 72;
    const wordS = 0.92, textW = word.w * wordS, arS = 0.66;
    const subS = (textW - ar.w * arS - 40) / d.w;
    const top = (symH - (100 * wordS + 44 + 100 * arS)) / 2 + 4;
    const ruleY = top + 100 * wordS + 22;
    const base = ruleY + 22 + 100 * arS;
    return {
      w: textX + textW, h: symH,
      body: place(sym, 0, 0, symS, c) + place(word, textX, top, wordS, c) +
        `<rect x="${n(textX)}" y="${n(ruleY)}" width="${n(textW)}" height="1" fill="${c.accent}"/>` +
        place(descriptor(d, c), textX, base - d.h * subS, subS) +
        place(ar, textX + textW - ar.w * arS, base - 100 * arS, arS, c),
    };
  },

  // Stacked: for bags, fascia panels, square formats.
  stacked(c, { weight = 5.2 } = {}) {
    const sym = symbol(), word = wordmark({ weight }), ar = arabic({ weight: weight * 1.15 }), d = sub();
    const wordS = 0.8, W = word.w * wordS;
    const symS = 1.15, symW = sym.w * symS, symH = sym.h * symS;
    const wordY = symH + 64;
    const arS = 0.62, arW = ar.w * arS;
    const arY = wordY + 100 * wordS + 44;
    const ruleW = (W - arW) / 2 - 34;
    const subS = (W * 0.9) / d.w;
    const subY = arY + 100 * arS + ar.depth * arS + 34;
    const ry = arY + 100 * arS - 1;
    return {
      w: W, h: subY + d.h * subS,
      body: place(sym, (W - symW) / 2 + 6, 0, symS, c) + place(word, 0, wordY, wordS, c) +
        `<rect x="0" y="${n(ry)}" width="${n(ruleW)}" height="1" fill="${c.accent}"/>` +
        `<rect x="${n(W - ruleW)}" y="${n(ry)}" width="${n(ruleW)}" height="1" fill="${c.accent}"/>` +
        place(ar, (W - arW) / 2, arY, arS, c) +
        place(descriptor(d, c), (W - d.w * subS) / 2, subY, subS),
    };
  },

  // Arabic-first (RTL): symbol on the right, Arabic leads, Latin follows.
  arabic(c, { weight = 5.2 } = {}) {
    const sym = symbol(), word = wordmark({ weight }), ar = arabic({ weight: weight * 0.95 });
    const symS = 1.25, symW = sym.w * symS, symH = sym.h * symS;
    const arS = 1.18, arW = ar.w * arS;
    const wordS = 0.36, wordW = word.w * wordS;
    const textW = Math.max(arW, wordW);
    const top = (symH - (100 * arS + ar.depth * arS + 30 + 100 * wordS)) / 2;
    const ruleY = top + 100 * arS + ar.depth * arS + 15;
    return {
      w: textW + 72 + symW, h: symH,
      body: place(ar, textW - arW, top, arS, c) +
        `<rect x="${n(textW - wordW)}" y="${n(ruleY)}" width="${n(wordW)}" height="1" fill="${c.accent}"/>` +
        place(word, textW - wordW, ruleY + 15, wordS, c) +
        place(sym, textW + 72, 0, symS, c),
    };
  },

  // Bilingual wordmark only: for narrow spaces (combs, pens, edges, footers).
  inline(c, { weight = 5.2 } = {}) {
    const word = wordmark({ weight }), ar = arabic({ weight: weight * 1.12 });
    const arS = 0.92, gap = 46;
    return {
      w: word.w + gap * 2 + ar.w * arS, h: 100 + ar.depth * arS,
      body: place(word, 0, 0, 1, c) +
        `<rect x="${n(word.w + gap - 0.75)}" y="6" width="1.5" height="94" fill="${c.accent}"/>` +
        place(ar, word.w + gap * 2, 100 - 100 * arS, arS, c),
    };
  },

  symbol(c) {
    const s = symbol();
    return { w: s.w, h: s.h, body: s.render(c) };
  },
};

// ---------------------------------------------------------------------------
// The hairpin pattern: the symbol on an open half-drop grid, every mark upright.
export function pattern({ x = 0, y = 0, w, h, ink, accent = ink, bg, size = 60, opacity = 1 }) {
  const s = symbol();
  const k = size / s.h;
  const cw = s.w * k * 2.1, ch = s.h * k * 1.25;
  const id = uid('pt');
  let marks = '';
  for (let r = -1; r * ch < h + ch; r++) {
    for (let col = -1; col * cw < w + cw; col++) {
      const px = col * cw + (r % 2 ? cw / 2 : 0), py = r * ch;
      marks += `<g transform="translate(${n(px)} ${n(py)}) scale(${n(k * 1000) / 1000})">${s.render({ ink, accent })}</g>`;
    }
  }
  return `<defs><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath></defs>` +
    `<g clip-path="url(#${id})">${bg ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bg}"/>` : ''}` +
    `<g transform="translate(${x} ${y})" opacity="${opacity}">${marks}</g></g>`;
}

// Place a lockup scaled to fit a box (centred by default).
export function fit(L, x, y, w, h, { align = 'center', valign = 'middle' } = {}) {
  const k = Math.min(w / L.w, h / L.h);
  const dx = align === 'left' ? 0 : align === 'right' ? w - L.w * k : (w - L.w * k) / 2;
  const dy = valign === 'top' ? 0 : valign === 'bottom' ? h - L.h * k : (h - L.h * k) / 2;
  return `<g transform="translate(${n(x + dx)} ${n(y + dy)}) scale(${n(k * 10000) / 10000})">${L.body}</g>`;
}
