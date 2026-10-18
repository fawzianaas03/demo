// Shared vector construction helpers for the LAVIV identity exploration.
// Every glyph and symbol is drawn from geometry: no fonts are embedded.

export const PALETTE = {
  black: '#111111',
  gold: '#C6A66B',
  ivory: '#F4F0E8',
};

export const n = (v) => Math.round(v * 100) / 100;

// Polygon -> path data, always wound clockwise so overlapping parts union under nonzero fill.
export function poly(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    area += x1 * y2 - x2 * y1;
  }
  const p = area < 0 ? [...pts].reverse() : pts;
  return 'M' + p.map(([x, y]) => `${n(x)} ${n(y)}`).join('L') + 'Z';
}

export const rect = (x, y, w, h) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]]);

export function roundRect(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  return `M${n(x + r)} ${n(y)}H${n(x + w - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w)} ${n(y + r)}` +
    `V${n(y + h - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w - r)} ${n(y + h)}` +
    `H${n(x + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y + h - r)}V${n(y + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}Z`;
}

// Same rounded rect, wound counter-clockwise (used to punch counters under nonzero fill).
export function roundRectCCW(x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  return `M${n(x + r)} ${n(y)}A${n(r)} ${n(r)} 0 0 0 ${n(x)} ${n(y + r)}V${n(y + h - r)}` +
    `A${n(r)} ${n(r)} 0 0 0 ${n(x + r)} ${n(y + h)}H${n(x + w - r)}A${n(r)} ${n(r)} 0 0 0 ${n(x + w)} ${n(y + h - r)}` +
    `V${n(y + r)}A${n(r)} ${n(r)} 0 0 0 ${n(x + w - r)} ${n(y)}Z`;
}

export const diamond = (cx, cy, s) =>
  poly([[cx, cy - s / 2], [cx + s / 2, cy], [cx, cy + s / 2], [cx - s / 2, cy]]);

// An element is { w, h, render(colors) => markup in local coordinates (origin top-left) }.
export function place(el, x, y, s = 1, colors) {
  return `<g transform="translate(${n(x)} ${n(y)})${s !== 1 ? ` scale(${n(s * 10000) / 10000})` : ''}">${el.render(colors)}</g>`;
}

export function svgDoc(w, h, body, { bg, title } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n(w)} ${n(h)}" width="${n(w)}" height="${n(h)}">` +
    (title ? `<title>${title}</title>` : '') +
    (bg ? `<rect width="100%" height="100%" fill="${bg}"/>` : '') +
    body + '</svg>';
}

// ---------------------------------------------------------------------------
// Monoline caps used for the descriptor line "PROFESSIONAL BARBER SUPPLIES".
// Drawn on a 100-unit cap height, stroked centre-lines.
const MONO = {
  P: ['M0 100V0H40A27.5 27.5 0 0 1 40 55H0', 67.5],
  R: ['M0 100V0H40A27.5 27.5 0 0 1 40 55H0M38 55L70 100', 70],
  O: ['M50 0A50 50 0 1 1 49.99 0Z', 100],
  F: ['M0 100V0H58M0 50H48', 58],
  E: ['M60 0H0V100H60M0 50H50', 60],
  S: ['M60 17A29 25 0 1 0 33 50A29 25 0 1 1 6 83', 66],
  I: ['M0 0V100', 0],
  N: ['M0 100V0L72 100V0', 72],
  A: ['M0 100L39 0L78 100M14.8 62H63.2', 78],
  L: ['M0 0V100H56', 56],
  B: ['M0 100V0H38A24 24 0 0 1 38 48H0M38 48H42A26 26 0 0 1 42 100H0', 68],
  U: ['M0 0V60A38 38 0 0 0 76 60V0', 76],
  V: ['M0 0L39 100L78 0', 78],
};

export function monoCaps(text, { cap = 12, weight = 1.2, tracking = 0.45, space = 0.9 } = {}) {
  const k = cap / 100;
  const sw = weight / k;
  let x = sw / 2;
  const parts = [];
  for (const ch of text) {
    if (ch === ' ') { x += space * 100; continue; }
    const [d, w] = MONO[ch];
    parts.push(`<path transform="translate(${n(x)} 0)" d="${d}"/>`);
    x += w + tracking * 100;
  }
  x -= tracking * 100;
  x += sw / 2;
  return {
    w: x * k,
    h: cap,
    render: (c) => `<g transform="scale(${k})" fill="none" stroke="${c}" stroke-width="${n(sw)}" stroke-linejoin="miter" stroke-linecap="butt">` +
      `<g transform="translate(0 0)">${parts.join('')}</g></g>`,
  };
}

// ---------------------------------------------------------------------------
// Geometric sans construction (Concepts 01 and 03).
// Cap height 100. `s` is stem weight. Diagonals are optically compensated.
export function geoDiagonal(s, W, b, invert) {
  const cx = W / 2;
  const ang = Math.atan((cx - b / 2) / 100);
  const sx = s / Math.cos(ang);
  const t = (cx - sx) / (cx - b / 2);
  let pts = [[0, 0], [sx, 0], [cx, 100 * t], [W - sx, 0], [W, 0], [cx + b / 2, 100], [cx - b / 2, 100]];
  if (invert) pts = pts.map(([x, y]) => [x, 100 - y]);
  const xL = (y) => (invert ? sx + (cx - b / 2) * (1 - y / 100) : sx + (cx - b / 2) * (y / 100));
  return { pts, sx, cx, xL, xR: (y) => W - xL(y) };
}

export function geoWord(letters, { s, gap }) {
  // letters: array of { ch, W, ... }
  const shapes = [];
  let x = 0;
  let prev = null;
  for (const L of letters) {
    let d = '';
    const W = L.W ?? s;
    if (L.ch === 'L') {
      if (L.part) {
        d = rect(0, 0, s, 100 - s - L.part) + rect(0, 100 - s, W, s);
      } else {
        d = poly([[0, 0], [s, 0], [s, 100 - s], [W, 100 - s], [W, 100], [0, 100]]);
      }
    } else if (L.ch === 'I') {
      d = rect(0, 0, s, 100);
    } else if (L.ch === 'V' || L.ch === 'A') {
      const g = geoDiagonal(s, W, L.b ?? s, L.ch === 'A');
      d = poly(g.pts);
      if (L.ch === 'A' && L.bar) {
        const [y1, y2] = L.bar;
        d += poly([[g.xL(y1), y1], [g.xR(y1), y1], [g.xR(y2), y2], [g.xL(y2), y2]]);
      }
    }
    // spacing: diagonal pairs are spaced by their parallel edges
    if (prev) x += L.kern ?? gap;
    shapes.push(`<path transform="translate(${n(x)} 0)" d="${d}"/>`);
    x += W;
    prev = L;
  }
  return { w: x, h: 100, body: shapes.join('') };
}

// ---------------------------------------------------------------------------
// Geometric monoline Arabic  لفيف  (Concepts 01 and 03).
// Baseline at y=100, lam ascender reaches y=0 to sit on the Latin cap height.
export function arabicGeo({ w, loopW = 40, loopH = 40, toothH = 36, tick = 26, tail = 34, gaps = [22, 22, 26],
  dot = 11, dotGap = 12, round = 1, lamTop = 0 }) {
  const yb = 100 - w / 2;
  const x0 = w / 2;
  const fa1 = x0 + tail; // left edge of final-fa loop
  const tooth = fa1 + loopW + gaps[0] + w / 2; // centre of ya tooth
  const fa2 = tooth + w / 2 + gaps[1]; // left edge of medial-fa loop
  const lam = fa2 + loopW + gaps[2] + w / 2; // centre of lam stem
  const width = lam + w / 2;
  const loop = (x) => {
    const lx = x + w / 2, ly = 100 - loopH + w / 2, lw = loopW - w, lh = loopH - w;
    return `<rect x="${n(lx)}" y="${n(ly)}" width="${n(lw)}" height="${n(lh)}" rx="${n(round * Math.min(lw, lh) / 2)}"/>`;
  };
  const dotsAbove = (cx) => diamond(cx, 100 - loopH - dotGap - dot / 2, dot);
  const dotsBelow = (cx) => diamond(cx - dot * 0.72, 100 + dotGap + dot / 2, dot) + diamond(cx + dot * 0.72, 100 + dotGap + dot / 2, dot);
  return {
    w: width,
    h: 100 + dotGap + dot,
    top: Math.min(lamTop, 100 - loopH - dotGap - dot),
    render: ({ ink, accent = ink }) =>
      `<g fill="none" stroke="${ink}" stroke-width="${n(w)}" stroke-linejoin="miter" stroke-linecap="butt">` +
      `<path d="M${n(x0)} ${n(yb - tick)}V${n(yb)}H${n(lam)}V${n(lamTop)}"/>` +
      `<path d="M${n(tooth)} ${n(yb)}V${n(100 - toothH)}"/>` +
      loop(fa1) + loop(fa2) + '</g>' +
      `<path fill="${accent}" d="${dotsAbove(fa1 + loopW / 2)}${dotsAbove(fa2 + loopW / 2)}${dotsBelow(tooth)}"/>`,
  };
}
