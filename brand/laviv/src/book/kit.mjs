// Drawing kit shared by the Continuum identity book pages.
import { PALETTE as P, n } from '../geometry.mjs';
import { LOCKUPS, symbol, wordmark, arabic, pattern, fit } from '../continuum.mjs';

export { P, n, LOCKUPS, symbol, wordmark, arabic, pattern, fit };

export const W = 1800, H = 1200, SCENE_H = 1130;
export const BOARD = '#E7E2D8';
export const INK = { ink: P.black, accent: P.gold };
export const REV = { ink: P.ivory, accent: P.gold };
export const ON_GOLD = { ink: P.black, accent: P.ivory };
export const MONO = (c) => ({ ink: c, accent: c });

export const L = (kind, c, opts) => LOCKUPS[kind](c, opts);
// Wrap a single drawable element ({w,h,render}) as a lockup-like object for fit().
export const asL = (e, c) => ({ w: e.w, h: e.h, body: e.render(c) });

export const t = (x, y, s, { size = 14, font = 'Jost', weight = 400, fill = P.black, ls = 0, anchor = 'start', op = 1, italic = false } = {}) =>
  `<text x="${n(x)}" y="${n(y)}" font-family="${font === 'ar' ? "'Noto Kufi Arabic'" : `'${font}'`}" font-size="${size}" font-weight="${weight}"` +
  ` fill="${fill}" letter-spacing="${ls}" text-anchor="${anchor}"${op !== 1 ? ` opacity="${op}"` : ''}${italic ? ' font-style="italic"' : ''}>${s}</text>`;

export const ar = (x, y, s, o = {}) => t(x, y, s, { font: 'ar', ...o });

// HTML paragraph inside the SVG.
export const para = (x, y, w, h, html, { size = 15, color = '#3a362f', lh = 1.6, font = 'Jost', align = 'left', dir = 'ltr' } = {}) =>
  `<foreignObject x="${x}" y="${y}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" dir="${dir}" style="font-family:'${font}';font-size:${size}px;line-height:${lh};color:${color};text-align:${align}">${html}</div></foreignObject>`;

export const rect = (x, y, w, h, fill, extra = '') => `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" ${extra}/>`;

// Shared filters and gradients.
export const DEFS = `<defs>
<filter id="soft" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#000" flood-opacity=".22"/></filter>
<filter id="lift" x="-30%" y="-30%" width="160%" height="180%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#000" flood-opacity=".25"/></filter>
<filter id="blur12"><feGaussianBlur stdDeviation="12"/></filter>
<filter id="blur6"><feGaussianBlur stdDeviation="6"/></filter>
<linearGradient id="goldMetal" x1="0" x2="1"><stop offset="0" stop-color="#a88a52"/><stop offset=".45" stop-color="#e3cc98"/><stop offset=".6" stop-color="#C6A66B"/><stop offset="1" stop-color="#8f7445"/></linearGradient>
<linearGradient id="goldMetalV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e3cc98"/><stop offset=".5" stop-color="#C6A66B"/><stop offset="1" stop-color="#8f7445"/></linearGradient>
<linearGradient id="blackMetal" x1="0" x2="1"><stop offset="0" stop-color="#0c0c0c"/><stop offset=".38" stop-color="#303030"/><stop offset=".55" stop-color="#1b1b1b"/><stop offset="1" stop-color="#0a0a0a"/></linearGradient>
<linearGradient id="ivoryBody" x1="0" x2="1"><stop offset="0" stop-color="#e3dccf"/><stop offset=".4" stop-color="#fbf8f2"/><stop offset="1" stop-color="#ddd5c6"/></linearGradient>
<linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3133"/><stop offset="1" stop-color="#40494a"/></linearGradient>
<radialGradient id="warm" cx=".5" cy=".55" r=".6"><stop offset="0" stop-color="#d9b77a" stop-opacity=".42"/><stop offset="1" stop-color="#d9b77a" stop-opacity="0"/></radialGradient>
<pattern id="stitch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(55)"><rect width="1.4" height="4" fill="#000" opacity=".28"/></pattern>
</defs>`;

export const shadow = (cx, cy, rx, ry, op = 0.28) =>
  `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="#000" opacity="${op}" filter="url(#blur12)"/>`;

export function footer(title, no) {
  return rect(0, SCENE_H, W, H - SCENE_H, BOARD) +
    t(64, SCENE_H + 43, 'LAVIV', { size: 13, weight: 600, ls: 3 }) +
    t(140, SCENE_H + 43, '·  CONCEPT 03 — CONTINUUM  ·  IDENTITY DEVELOPMENT', { size: 13, ls: 3, fill: '#6b6457' }) +
    t(W - 64, SCENE_H + 43, `${title.toUpperCase()}   <tspan font-weight="600" fill="${P.black}">${String(no).padStart(2, '0')}</tspan>`, { size: 13, ls: 3, fill: '#6b6457', anchor: 'end' });
}

export const page = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${DEFS}${inner}</svg>`;

// Heading block used on the identity pages.
export const heading = (x, y, eyebrow, title, fill = P.black) =>
  t(x, y, eyebrow.toUpperCase(), { size: 12, weight: 600, ls: 3.5, fill: '#8c7445' }) +
  t(x, y + 54, title, { size: 46, weight: 300, fill });
