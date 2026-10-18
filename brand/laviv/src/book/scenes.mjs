// Mockup scenes for the Continuum identity: flat, front-on illustrations with
// soft light and shadow. Every brand element is the real vector artwork.
import {
  P, n, W, SCENE_H, INK, REV, ON_GOLD, MONO, L, asL, t, ar, para, rect, footer, shadow,
  symbol, wordmark, arabic, pattern, fit,
} from './kit.mjs';
import { uid } from '../geometry.mjs';

const SYM = (c) => asL(symbol(), c);
const WORD = (c, weight) => asL(wordmark({ weight }), c);
const AR = (c, weight) => asL(arabic({ weight }), c);
const caption = (x, y, s, fill = '#6b6457') => t(x, y, s.toUpperCase(), { size: 12, weight: 500, ls: 3, fill });

// ---------------------------------------------------------------------------
export function storefront() {
  const g = [];
  g.push(`<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9e3d8"/><stop offset="1" stop-color="#d8d0c2"/></linearGradient>`);
  g.push(rect(0, 0, W, SCENE_H, 'url(#sky)'));
  // stone building
  g.push(rect(180, 70, 1440, 950, '#cdc4b5'));
  for (let y = 130; y < 1020; y += 64) g.push(`<line x1="180" y1="${y}" x2="1620" y2="${y}" stroke="#c1b8a8" stroke-width="1.2"/>`);
  for (let y = 70, i = 0; y < 1020; y += 64, i++) for (let x = 180 + (i % 2) * 90; x < 1620; x += 180) g.push(`<line x1="${x}" y1="${y}" x2="${x}" y2="${y + 64}" stroke="#c1b8a8" stroke-width="1.2"/>`);
  g.push(rect(180, 70, 1440, 14, '#bdb3a3'));
  // fascia
  g.push(rect(280, 140, 1240, 160, '#131313'));
  g.push(fit(L('horizontal', REV), 420, 170, 960, 100));
  for (const x of [520, 1280]) {
    g.push(`<radialGradient id="lamp${x}" gradientUnits="userSpaceOnUse" cx="${x}" cy="140" r="230"><stop offset="0" stop-color="#fff3d6" stop-opacity=".2"/><stop offset="1" stop-color="#fff3d6" stop-opacity="0"/></radialGradient>`);
    g.push(rect(280, 140, 1240, 160, `url(#lamp${x})`));
    g.push(`<path d="M${x} 84V104" stroke="#111" stroke-width="4"/><path d="M${x - 26} 124H${x + 26}L${x + 16} 104H${x - 16}Z" fill="#111"/>`);
  }
  // shop front
  g.push(rect(280, 318, 1240, 702, '#151515'));
  g.push(`<linearGradient id="fsh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>`);
  const panes = [[306, 344, 494, 632], [830, 344, 230, 676], [1090, 344, 404, 632]];
  for (const [x, y, w, h] of panes) {
    g.push(rect(x, y, w, h, 'url(#glass)'));
    g.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#warm)"/>`);
  }
  // shelves and stock behind the glass
  const stock = (x0, x1) => {
    let s = '';
    let seed = x0;
    const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
    for (const y of [540, 690, 840]) {
      s += rect(x0 + 20, y, x1 - x0 - 40, 7, '#0e0e0e', 'opacity=".7"');
      for (let x = x0 + 34; x < x1 - 60;) {
        const kind = rnd();
        if (kind < 0.45) { const h = 52 + rnd() * 26; s += rect(x, y - h, 22, h, rnd() < 0.5 ? '#161616' : '#efe8da', 'rx="5" opacity=".75"') + rect(x + 6, y - h - 12, 10, 12, P.gold, 'opacity=".7"'); x += 34; }
        else if (kind < 0.8) { const w = 54 + rnd() * 20; s += rect(x, y - 44, w, 44, rnd() < 0.6 ? '#121212' : P.gold, 'opacity=".75"'); x += w + 12; }
        else { s += rect(x, y - 26, 46, 26, '#efe8da', 'rx="3" opacity=".7"'); x += 58; }
      }
    }
    return s;
  };
  g.push(stock(306, 800), stock(1090, 1494));
  for (const [x, y, w, h] of panes) {
    g.push(`<path d="M${x} ${y}H${x + w * 0.32}L${x} ${y + h * 0.42}Z" fill="#fff" opacity=".06"/>`);
    g.push(`<path d="M${x + w * 0.55} ${y + h}L${x + w} ${y + h * 0.35}V${y + h * 0.62}L${x + w * 0.78} ${y + h}Z" fill="#fff" opacity=".045"/>`);
  }
  g.push(rect(280, 300, 1240, 50, 'url(#fsh)'));
  // window vinyl
  g.push(t(553, 950, 'PROFESSIONAL BARBER SUPPLIES', { size: 15, weight: 400, ls: 5, fill: P.ivory, op: 0.85, anchor: 'middle' }));
  g.push(ar(1292, 952, 'مستلزمات الحلاقة والكوافير والتجميل', { size: 18, weight: 300, fill: P.ivory, op: 0.85, anchor: 'middle' }));
  // door
  g.push(fit(SYM(REV), 905, 410, 80, 80));
  g.push(rect(1034, 610, 8, 210, 'url(#goldMetalV)'));
  g.push(t(945, 905, 'SAT — THU   10:00 – 22:00', { size: 12, ls: 2.5, fill: P.gold, anchor: 'middle' }));
  g.push(ar(945, 932, 'السبت – الخميس', { size: 13, fill: P.gold, anchor: 'middle', weight: 300 }));
  // plaque on the right pier
  g.push(rect(1538, 520, 66, 120, '#131313', 'filter="url(#lift)"'));
  g.push(fit(SYM(REV), 1549, 538, 44, 52));
  g.push(t(1571, 620, 'Nº 12', { size: 11, ls: 1.5, fill: P.gold, anchor: 'middle' }));
  // ground, step, planters
  g.push(rect(0, 1020, W, 110, '#c2baad'), rect(0, 1020, W, 3, '#aea596'));
  g.push(rect(296, 1004, 1208, 16, '#b2a99b'));
  for (const x of [196, 1534]) {
    g.push(shadow(x + 35, 1022, 60, 8, 0.35));
    g.push(`<circle cx="${x + 35}" cy="880" r="52" fill="#3f4a3c"/><circle cx="${x + 5}" cy="910" r="38" fill="#4a5745"/><circle cx="${x + 66}" cy="912" r="36" fill="#36402f"/>`);
    g.push(rect(x, 930, 70, 90, '#141414'), rect(x, 930, 70, 6, P.gold, 'opacity=".8"'));
  }
  return g.join('') + footer('Storefront', 6);
}

// ---------------------------------------------------------------------------
export function packaging() {
  const g = [];
  g.push(`<linearGradient id="wall2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ede7dc"/><stop offset="1" stop-color="#e0d8ca"/></linearGradient>`);
  g.push(`<linearGradient id="tbl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d3cabb"/><stop offset="1" stop-color="#c6bcab"/></linearGradient>`);
  g.push(rect(0, 0, W, 880, 'url(#wall2)'), rect(0, 880, W, SCENE_H - 880, 'url(#tbl)'), rect(0, 880, W, 2, '#bfb5a4'));
  g.push('<g transform="translate(0 70)">');
  // clipper box
  g.push(shadow(590, 812, 330, 20, 0.35));
  g.push(`<path d="M300 370L350 330H860L810 370Z" fill="#2a2a2a"/><path d="M810 370L860 330V770L810 810Z" fill="#0b0b0b"/>`);
  g.push(rect(300, 370, 510, 440, '#141414'));
  g.push(fit(SYM(REV), 465, 420, 180, 175));
  g.push(fit(WORD(REV, 6.5), 435, 640, 240, 34));
  g.push(rect(495, 698, 120, 1, P.gold));
  g.push(t(555, 735, 'PRO CORDLESS CLIPPER', { size: 14, ls: 4, fill: P.gold, anchor: 'middle', weight: 500 }));
  g.push(ar(555, 770, 'ماكينة قص احترافية لاسلكية', { size: 14, fill: P.ivory, op: 0.7, anchor: 'middle', weight: 300 }));
  // tonic bottle
  g.push(shadow(965, 812, 105, 12, 0.35));
  g.push(rect(934, 330, 62, 84, 'url(#goldMetal)', 'rx="4"'));
  for (let y = 340; y < 410; y += 7) g.push(rect(934, y, 62, 1.2, '#8f7445', 'opacity=".5"'));
  g.push(rect(942, 412, 46, 30, '#101010'));
  g.push(`<path d="M942 440C900 446 884 458 884 492V790Q884 810 904 810H1026Q1046 810 1046 790V492C1046 458 1030 446 988 440Z" fill="#151515"/>`);
  g.push(rect(896, 480, 10, 310, '#fff', 'opacity=".07" rx="5"'));
  g.push(rect(900, 560, 130, 190, P.ivory));
  g.push(fit(SYM(INK), 935, 576, 60, 56));
  g.push(t(965, 660, 'AFTERSHAVE', { size: 11, ls: 2.6, anchor: 'middle', weight: 500 }));
  g.push(t(965, 686, 'Tonic', { size: 22, weight: 300, anchor: 'middle' }));
  g.push(ar(965, 712, 'تونيك ما بعد الحلاقة', { size: 10.5, anchor: 'middle', fill: '#8c7445' }));
  g.push(t(965, 738, '100 ml  ·  3.4 fl oz', { size: 9.5, ls: 1, anchor: 'middle', fill: '#6b6457' }));
  // clay jar
  g.push(shadow(1240, 812, 140, 12, 0.32));
  g.push(rect(1120, 690, 240, 120, 'url(#ivoryBody)', 'rx="6"'));
  g.push(rect(1112, 636, 256, 58, '#141414', 'rx="6"'), rect(1112, 684, 256, 3, P.gold, 'opacity=".9"'));
  g.push(fit(SYM(REV), 1222, 644, 36, 34));
  g.push(t(1240, 750, 'MATTE CLAY', { size: 15, ls: 3.5, anchor: 'middle', weight: 500 }));
  g.push(ar(1240, 780, 'طين تصفيف مطفي', { size: 12, anchor: 'middle', fill: '#8c7445' }));
  // blade box
  g.push(shadow(1500, 812, 90, 10, 0.32));
  g.push(`<path d="M1420 660L1442 642H1584L1562 660Z" fill="#d8bf8b"/><path d="M1562 660L1584 642V792L1562 810Z" fill="#a48650"/>`);
  g.push(rect(1420, 660, 142, 150, P.gold));
  g.push(fit(SYM(ON_GOLD), 1456, 678, 70, 66));
  g.push(t(1491, 774, 'PRECISION BLADES', { size: 9.5, ls: 1.8, anchor: 'middle', weight: 500 }));
  g.push(t(1491, 792, '100 × double edge', { size: 9, anchor: 'middle', fill: '#3a362f' }));
  g.push('</g>');
  g.push(caption(300, 960, 'Clipper box · Aftershave tonic · Styling clay · Blades'));
  g.push(para(300, 980, 760, 120, 'Black and ivory carry the range; champagne is kept for caps, rules and the hairpin bowl. The symbol is the hero on every front, so the family reads at shelf distance before any copy does.', { size: 15 }));
  return g.join('') + footer('Packaging', 7);
}

// ---------------------------------------------------------------------------
export function stationery() {
  const g = [];
  g.push(`<linearGradient id="desk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#d6cec1"/><stop offset="1" stop-color="#c9c0b1"/></linearGradient>`);
  g.push(rect(0, 0, W, SCENE_H, 'url(#desk)'));
  // letterhead
  const bars = [440, 470, 455, 300, 0, 460, 430, 470, 380, 0, 210];
  let lh = rect(0, 0, 560, 792, '#FAF7F1') + fit(L('horizontal', INK, { weight: 6 }), 48, 46, 250, 68, { align: 'left' }) +
    rect(48, 140, 464, 0.8, P.gold) + t(48, 182, '18 October 2026', { size: 10.5, fill: '#6b6457' });
  bars.forEach((w, i) => { if (w) lh += rect(48, 222 + i * 24, w, 5, '#e2dccf', 'rx="2"'); });
  lh += rect(48, 560, 140, 5, '#e2dccf', 'rx="2"') + rect(48, 580, 100, 5, '#e2dccf', 'rx="2"');
  lh += rect(48, 726, 464, 0.6, '#d8d0c2') + t(48, 750, 'LAVIV — Professional Barber Supplies', { size: 9, ls: 0.6, fill: '#6b6457' }) +
    ar(512, 752, 'شركة لفيف لمستلزمات الحلاقة والكوافير والتجميل', { size: 8.5, anchor: 'end', fill: '#6b6457' });
  g.push(`<g transform="translate(270 150) rotate(-5 280 396)" filter="url(#soft)">${lh}</g>`);
  // envelope
  const env = rect(0, 0, 640, 320, '#F3EEE5') + `<path d="M0 0L320 172L640 0" fill="none" stroke="#e0d8cb" stroke-width="2"/>` +
    fit(L('inline', INK, { weight: 6 }), 36, 248, 190, 34, { align: 'left' });
  g.push(`<g transform="translate(930 120) rotate(3 320 160)" filter="url(#soft)">${env}</g>`);
  // pen
  g.push(`<g transform="translate(905 430) rotate(24)" filter="url(#lift)">${rect(0, 0, 16, 400, 'url(#goldMetal)', 'rx="8"')}${rect(4, 36, 8, 120, '#141414', 'rx="3"')}<path d="M2 400L8 432L14 400Z" fill="#8f7445"/></g>`);
  // business cards
  const back = rect(0, 0, 420, 260, '#FAF7F1', 'rx="6"') +
    t(32, 70, 'Omar Haddad', { size: 21, weight: 400 }) + t(32, 94, 'SALES DIRECTOR', { size: 9.5, ls: 2.4, weight: 500, fill: '#8c7445' }) +
    ar(388, 72, 'عمر حداد', { size: 18, anchor: 'end', weight: 400 }) + ar(388, 97, 'مدير المبيعات', { size: 10.5, anchor: 'end', fill: '#8c7445' }) +
    rect(32, 150, 356, 0.6, '#d8d0c2') +
    t(32, 184, '+000 00 000 0000', { size: 11, fill: '#3a362f' }) + t(32, 204, 'omar@laviv.com', { size: 11, fill: '#3a362f' }) +
    t(32, 224, 'laviv.com', { size: 11, fill: '#3a362f' }) + fit(SYM(INK), 352, 188, 36, 40);
  const front = rect(0, 0, 420, 260, '#141414', 'rx="6"') + fit(SYM(REV), 165, 52, 90, 90) + fit(WORD(REV, 6.5), 150, 178, 120, 22);
  g.push(`<g transform="translate(1010 640) rotate(-8 210 130)" filter="url(#soft)">${back}</g>`);
  g.push(`<g transform="translate(1230 742) rotate(7 210 130)" filter="url(#soft)">${front}</g>`);
  return g.join('') + footer('Stationery', 8);
}

// ---------------------------------------------------------------------------
export function bags() {
  const g = [];
  g.push(`<linearGradient id="wall3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ece6db"/><stop offset="1" stop-color="#e2dbce"/></linearGradient>`);
  g.push(rect(0, 0, W, 960, 'url(#wall3)'), rect(0, 960, W, SCENE_H - 960, '#d4ccbe'));
  // bag A — ivory, giant cropped symbol
  g.push(shadow(590, 980, 330, 16, 0.32));
  g.push(`<path d="M440 360C448 205 652 205 660 360" fill="none" stroke="#2a2a2a" stroke-width="6"/>`);
  g.push(`<path d="M800 360L866 374V962L800 980Z" fill="#dcd4c5"/>`);
  const ca = uid('ca');
  g.push(`<clipPath id="${ca}"><rect x="280" y="360" width="520" height="620"/></clipPath>`);
  g.push(rect(280, 360, 520, 620, '#F6F2EA'));
  g.push(`<g clip-path="url(#${ca})">${fit(SYM(INK), 430, 470, 560, 600, { align: 'left', valign: 'top' })}</g>`);
  g.push(fit(WORD(INK, 6.5), 320, 404, 150, 22, { align: 'left' }));
  g.push(`<path d="M420 362C420 175 680 175 680 362" fill="none" stroke="#141414" stroke-width="7"/>`);
  g.push(`<circle cx="420" cy="374" r="6" fill="#141414"/><circle cx="680" cy="374" r="6" fill="#141414"/>`);
  // bag B — black, tissue in pattern
  g.push(shadow(1160, 980, 230, 14, 0.38));
  const tissue = 'M972 566L998 482L1046 528L1098 462L1156 520L1214 470L1262 524L1300 488L1308 566Z';
  const ct = uid('ct');
  g.push(`<clipPath id="${ct}"><path d="${tissue}"/></clipPath><g clip-path="url(#${ct})">${pattern({ x: 960, y: 450, w: 360, h: 130, ink: P.gold, accent: P.gold, bg: '#F7F3EA', size: 26, opacity: 0.6 })}</g>`);
  g.push(`<path d="M1062 560C1068 430 1212 430 1218 560" fill="none" stroke="#9c8152" stroke-width="5"/>`);
  g.push(`<path d="M1320 560L1372 572V968L1320 980Z" fill="#090909"/>`);
  g.push(rect(960, 560, 360, 420, '#151515'));
  g.push(fit(L('stacked', REV), 1020, 640, 240, 280));
  g.push(`<path d="M1042 562C1042 405 1238 405 1238 562" fill="none" stroke="url(#goldMetal)" stroke-width="6"/>`);
  g.push(`<circle cx="1042" cy="574" r="5" fill="#2a2a2a"/><circle cx="1238" cy="574" r="5" fill="#2a2a2a"/>`);
  // bag C — champagne gift bag
  g.push(shadow(1540, 980, 110, 10, 0.32));
  g.push(`<path d="M1620 760L1650 766V975L1620 980Z" fill="#a98b55"/>`);
  g.push(rect(1440, 760, 180, 220, P.gold));
  g.push(fit(SYM(ON_GOLD), 1485, 808, 90, 96));
  g.push(`<path d="M1486 762C1486 680 1574 680 1574 762" fill="none" stroke="#141414" stroke-width="3"/>`);
  g.push(caption(280, 1060, 'Shopping bags  ·  Rope handles  ·  Hairpin-pattern tissue'));
  return g.join('') + footer('Shopping bags', 9);
}

// ---------------------------------------------------------------------------
export function uniform() {
  const g = [];
  g.push(`<linearGradient id="wall4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ddd5c8"/><stop offset=".5" stop-color="#ebe5da"/><stop offset="1" stop-color="#ddd5c8"/></linearGradient>`);
  g.push(rect(0, 0, W, SCENE_H, 'url(#wall4)'));
  g.push(rect(0, 120, W, 34, '#5b4733'), rect(0, 152, W, 4, '#3f3122'));
  g.push(`<circle cx="900" cy="172" r="15" fill="#4a3826"/>`);
  // apron
  g.push(`<linearGradient id="canvas" x1="0" x2="1"><stop offset="0" stop-color="#151515"/><stop offset=".22" stop-color="#1f1f1f"/><stop offset=".4" stop-color="#171717"/><stop offset=".62" stop-color="#202020"/><stop offset=".8" stop-color="#161616"/><stop offset="1" stop-color="#1c1c1c"/></linearGradient>`);
  const body = 'M760 322H1040L1050 362Q1062 520 1188 590L1200 1078Q1200 1100 1178 1100H622Q600 1100 600 1078L612 590Q738 520 750 362Z';
  g.push(`<path d="${body}" fill="url(#canvas)" filter="url(#soft)"/>`);
  g.push(`<path d="${body}" fill="none" stroke="#3a3a3a" stroke-width="1.2" stroke-dasharray="5 4" transform="translate(900 711) scale(.975) translate(-900 -711)"/>`);
  // leather straps
  const tan = '#a9855a';
  g.push(`<path d="M900 185L768 330M900 185L1032 330" stroke="${tan}" stroke-width="20" stroke-linecap="round"/>`);
  g.push(`<path d="M614 598C540 612 520 690 532 860M1186 598C1260 612 1280 690 1268 860" fill="none" stroke="${tan}" stroke-width="18" stroke-linecap="round"/>`);
  for (const [x, y] of [[770, 334], [1030, 334], [616, 598], [1184, 598]]) g.push(`<circle cx="${x}" cy="${y}" r="7" fill="url(#goldMetal)"/>`);
  // embroidered symbol (satin-stitch texture)
  const m = uid('em');
  const s = symbol();
  const k = 130 / s.h;
  const sx = 900 - (s.w * k) / 2, sy = 395;
  g.push(`<mask id="${m}"><g transform="translate(${n(sx)} ${sy}) scale(${n(k * 1000) / 1000})">${s.render({ ink: '#fff', accent: '#fff' })}</g></mask>`);
  g.push(`<g transform="translate(${n(sx)} ${sy}) scale(${n(k * 1000) / 1000})">${s.render(REV)}</g>`);
  g.push(`<rect x="780" y="380" width="240" height="160" fill="url(#stitch)" mask="url(#${m})"/>`);
  // pocket and tools
  g.push(rect(757, 610, 6, 80, '#efe8da', 'rx="3"'), rect(744, 686, 32, 60, '#efe8da', 'rx="3"'));
  for (let y = 694; y < 744; y += 5) g.push(rect(744, y, 22, 1.6, '#cfc6b5'));
  g.push(`<circle cx="880" cy="688" r="18" fill="none" stroke="url(#goldMetal)" stroke-width="7"/><circle cx="922" cy="676" r="18" fill="none" stroke="url(#goldMetal)" stroke-width="7"/>`);
  g.push(rect(1012, 660, 34, 100, '#2b2b2b', 'rx="8"'), rect(1012, 660, 34, 12, P.gold, 'rx="5"'));
  g.push(rect(700, 740, 400, 190, '#191919'));
  g.push(`<rect x="708" y="748" width="384" height="174" fill="none" stroke="#7d6740" stroke-width="1.4" stroke-dasharray="6 4"/>`);
  g.push(`<path d="M833 748V922M967 748V922" stroke="#7d6740" stroke-width="1.4" stroke-dasharray="6 4"/>`);
  g.push(fit(WORD(REV, 7), 840, 880, 120, 20));
  g.push(caption(1290, 820, 'Barber apron'));
  g.push(para(1290, 840, 380, 200, 'Black waxed canvas, tan leather straps and brass rivets. The symbol is satin-stitched: ivory for the Latin stroke, champagne for the Arabic. The pocket wordmark is the Regular weight, which holds its shape in thread.', { size: 15 }));
  return g.join('') + footer('Uniform', 10);
}

// ---------------------------------------------------------------------------
export function equipment() {
  const g = [];
  g.push(rect(0, 0, W, SCENE_H, '#191817'));
  g.push(`<radialGradient id="matG" cx=".5" cy=".45" r=".7"><stop offset="0" stop-color="#2b2926"/><stop offset="1" stop-color="#1c1b19"/></radialGradient>`);
  g.push(rect(150, 90, 1500, 960, 'url(#matG)', 'rx="12"'));
  g.push(`<rect x="170" y="110" width="1460" height="920" rx="8" fill="none" stroke="#3b3631" stroke-width="1.6" stroke-dasharray="7 5"/>`);
  // clipper
  const clip = 'M548 300Q548 262 590 262H650Q692 262 692 300L702 820Q702 902 620 902Q538 902 538 820Z';
  g.push(`<path d="${clip}" fill="url(#blackMetal)" filter="url(#soft)"/>`);
  g.push(rect(554, 230, 132, 34, 'url(#goldMetal)', 'rx="3"'));
  for (let x = 558; x < 684; x += 6) g.push(rect(x, 214, 3.6, 18, 'url(#goldMetalV)', 'rx="1.5"'));
  g.push(rect(560, 252, 120, 3, '#6d5935'));
  g.push(rect(549, 330, 142, 3, P.gold, 'opacity=".9"'));
  g.push(fit(SYM(REV), 575, 410, 90, 90));
  g.push(rect(604, 560, 32, 46, '#262626', 'rx="8" stroke="#8f7445" stroke-width=".8"'));
  g.push(`<g transform="translate(620 780) rotate(-90)">${fit(WORD(REV, 7), -100, -14, 200, 28)}</g>`);
  // trimmer
  const trim = 'M862 330Q862 300 892 300H908Q938 300 938 330L946 770Q946 830 900 830Q854 830 854 770Z';
  g.push(`<path d="${trim}" fill="url(#ivoryBody)" filter="url(#soft)"/>`);
  g.push(rect(836, 276, 128, 26, 'url(#goldMetal)', 'rx="3"'));
  for (let x = 839; x < 962; x += 5) g.push(rect(x, 264, 3, 14, 'url(#goldMetalV)', 'rx="1.2"'));
  g.push(fit(SYM(INK), 872, 430, 56, 56));
  g.push(`<g transform="translate(900 690) rotate(-90)">${fit(WORD(INK, 7), -80, -11, 160, 22)}</g>`);
  // guards
  [['1', '3 mm'], ['2', '6 mm'], ['3', '9 mm']].forEach(([num, mm], i) => {
    const x = 1130 + i * 150, y = 260;
    let s = `<path d="M0 0H120V22L110 150H10L0 22Z" fill="#141414" filter="url(#lift)"/>`;
    for (let tx = 16; tx <= 104; tx += 11) s += `<line x1="${tx}" y1="30" x2="${tx}" y2="142" stroke="#262626" stroke-width="3.5"/>`;
    s += rect(0, 0, 120, 14, '#202020') + t(60, 92, `#${num}`, { size: 26, weight: 400, fill: P.gold, anchor: 'middle' }) + t(60, 116, mm, { size: 11, ls: 1.5, fill: P.ivory, op: 0.7, anchor: 'middle' });
    g.push(`<g transform="translate(${x} ${y})">${s}</g>`);
  });
  // comb
  let comb = rect(0, 0, 170, 52, '#141414', 'rx="10"') + rect(150, 0, 420, 30, '#141414', 'rx="4"');
  for (let x = 160; x < 566; x += 9) comb += rect(x, 26, 5, 52, '#141414', 'rx="2"');
  comb += fit(L('inline', REV, { weight: 7 }), 18, 14, 140, 24, { align: 'left' });
  g.push(`<g transform="translate(1060 600) rotate(-6) scale(.88)" filter="url(#lift)">${comb}</g>`);
  g.push(caption(1130, 790, 'Clipper · T-blade trimmer · Guards · Cutting comb', P.gold));
  g.push(para(1130, 810, 460, 200, 'On tools the symbol is laser-etched or pad-printed in ivory or champagne. The inline bilingual wordmark sits on narrow parts such as comb spines and guard edges, where the full lockup would not fit.', { size: 15, color: '#cfc7b9' }));
  return g.join('') + footer('Equipment', 11);
}

// ---------------------------------------------------------------------------
export function digital() {
  const g = [];
  g.push(rect(0, 0, W, SCENE_H, '#E7E2D8'));
  // phone with a social profile
  const sx = 200, sy = 90;
  let ph = rect(0, 0, 430, 900, '#121212', 'rx="58"');
  const sc = uid('sc');
  ph += `<clipPath id="${sc}"><rect x="14" y="14" width="402" height="872" rx="46"/></clipPath><g clip-path="url(#${sc})">`;
  ph += rect(14, 14, 402, 872, '#FBF9F5');
  ph += t(48, 50, '9:41', { size: 13, weight: 600 }) + rect(170, 26, 90, 26, '#121212', 'rx="13"');
  ph += t(215, 96, 'laviv.pro', { size: 16, weight: 500, anchor: 'middle' });
  ph += `<circle cx="82" cy="170" r="50" fill="#141414"/>` + fit(SYM(REV), 57, 143, 50, 54);
  [['248', 'Posts', 196], ['18.4K', 'Followers', 286], ['112', 'Following', 370]].forEach(([a, b, x]) => {
    ph += t(x, 166, a, { size: 17, weight: 500, anchor: 'middle' }) + t(x, 186, b, { size: 11, fill: '#6b6457', anchor: 'middle' });
  });
  ph += t(36, 250, 'LAVIV  ·  لفيف', { size: 14, weight: 500 });
  ph += t(36, 272, 'Professional barber supplies &amp; salon equipment', { size: 12, fill: '#3a362f' });
  ph += ar(394, 296, 'مستلزمات الحلاقة والكوافير والتجميل', { size: 11, anchor: 'end', fill: '#3a362f' });
  ph += t(36, 320, 'Shop the collection →', { size: 12, weight: 500, fill: '#8c7445' });
  ph += rect(36, 338, 170, 34, '#141414', 'rx="8"') + t(121, 360, 'Follow', { size: 13, weight: 500, fill: P.ivory, anchor: 'middle' });
  ph += rect(214, 338, 180, 34, 'none', 'rx="8" stroke="#cfc7b9"') + t(304, 360, 'Message', { size: 13, weight: 500, anchor: 'middle' });
  ['New', 'Clippers', 'Care', 'Salon', 'Academy'].forEach((lbl, i) => {
    const x = 62 + i * 76;
    ph += `<circle cx="${x}" cy="420" r="27" fill="#fff" stroke="${P.gold}" stroke-width="1.5"/>` + fit(SYM(i % 2 ? MONO(P.black) : INK), x - 13, 406, 26, 28) +
      t(x, 466, lbl, { size: 10, anchor: 'middle', fill: '#3a362f' });
  });
  ph += rect(14, 482, 402, 1, '#e5dfd4');
  const tile = 132, gx = 14, gy = 486;
  const tiles = [
    (x, y) => rect(x, y, tile, tile, '#141414') + fit(SYM(REV), x + 36, y + 36, 60, 60),
    (x, y) => pattern({ x, y, w: tile, h: tile, ink: P.gold, accent: P.gold, bg: P.ivory, size: 22, opacity: 0.6 }),
    (x, y) => rect(x, y, tile, tile, P.gold) + t(x + 16, y + 66, 'NEW', { size: 30, weight: 300 }) + t(x + 16, y + 90, 'Pro Clipper', { size: 12 }),
    (x, y) => rect(x, y, tile, tile, '#ece6db') + rect(x + 50, y + 30, 32, 80, '#151515', 'rx="6"') + rect(x + 54, y + 56, 24, 34, P.ivory) + rect(x + 58, y + 18, 16, 14, P.gold),
    (x, y) => rect(x, y, tile, tile, '#141414') + ar(x + tile / 2, y + 62, 'الدقة في', { size: 14, fill: P.ivory, anchor: 'middle' }) + ar(x + tile / 2, y + 88, 'كل تفصيلة', { size: 14, fill: P.gold, anchor: 'middle' }),
    (x, y) => rect(x, y, tile, tile, P.ivory) + fit(L('stacked', INK), x + 26, y + 18, 80, 96),
    (x, y) => pattern({ x, y, w: tile, h: tile, ink: '#262626', accent: '#262626', bg: '#141414', size: 22 }),
    (x, y) => rect(x, y, tile, tile, '#e2dbce') + rect(x + 34, y + 34, 64, 64, '#141414') + fit(SYM(REV), x + 52, y + 50, 28, 30),
    (x, y) => rect(x, y, tile, tile, P.gold) + fit(SYM(ON_GOLD), x + 36, y + 36, 60, 60),
  ];
  tiles.forEach((f, i) => { ph += f(gx + (i % 3) * (tile + 3), gy + Math.floor(i / 3) * (tile + 3)); });
  ph += '</g>';
  g.push(`<g transform="translate(${sx} ${sy})" filter="url(#soft)">${ph}</g>`);
  // post A
  let pa = rect(0, 0, 440, 440, '#141414') + pattern({ x: 0, y: 0, w: 440, h: 440, ink: P.gold, accent: P.gold, size: 40, opacity: 0.07 });
  pa += fit(SYM(REV), 52, 52, 64, 64) + t(52, 250, 'Precision,', { size: 40, weight: 300, fill: P.ivory }) + t(52, 298, 'in every detail.', { size: 40, weight: 300, fill: P.ivory });
  pa += rect(52, 330, 80, 1, P.gold) + ar(388, 384, 'الدقة في كل تفصيلة', { size: 22, weight: 300, fill: P.gold, anchor: 'end' });
  g.push(`<g transform="translate(730 90)" filter="url(#soft)">${pa}</g>`);
  // post B
  const cb = uid('pb');
  let pb = `<clipPath id="${cb}"><rect width="440" height="440"/></clipPath><g clip-path="url(#${cb})">` + rect(0, 0, 440, 440, P.gold) +
    fit(SYM(ON_GOLD), 205, 160, 380, 380, { align: 'left', valign: 'top' }) + '</g>' +
    t(44, 76, 'Salon', { size: 38, weight: 300 }) + t(44, 120, 'Equipment', { size: 38, weight: 300 }) +
    ar(44, 166, 'معدات الصالونات', { size: 18 }) + t(44, 400, 'NOW IN STORE', { size: 12, weight: 500, ls: 3 });
  g.push(`<g transform="translate(1200 90)" filter="url(#soft)">${pb}</g>`);
  // website hero
  let web = rect(0, 0, 910, 470, '#FBF9F5', 'rx="12"') + rect(0, 0, 910, 36, '#ebe5da', 'rx="12"') + rect(0, 24, 910, 12, '#ebe5da');
  web += [22, 42, 62].map((x) => `<circle cx="${x}" cy="18" r="5.5" fill="#cfc7b9"/>`).join('') + rect(320, 9, 270, 18, '#fbf9f5', 'rx="9"') + t(455, 22, 'laviv.com', { size: 11, fill: '#6b6457', anchor: 'middle' });
  web += fit(SYM(INK), 36, 52, 26, 26) + fit(WORD(INK, 7), 72, 57, 90, 16, { align: 'left' });
  web += ['Clippers', 'Care', 'Salon Equipment', 'Academy'].map((s, i) => t(470 + [0, 80, 140, 270][i], 70, s, { size: 12.5, fill: '#3a362f' })).join('') + ar(870, 71, 'عربي', { size: 12.5, fill: '#8c7445', anchor: 'end' });
  web += rect(0, 92, 910, 1, '#e5dfd4');
  const hb = uid('hb');
  web += `<clipPath id="${hb}"><rect x="470" y="93" width="440" height="377" rx="0"/></clipPath><g clip-path="url(#${hb})">` + rect(470, 93, 440, 377, '#141414') +
    pattern({ x: 470, y: 93, w: 440, h: 377, ink: P.gold, accent: P.gold, size: 34, opacity: 0.08 }) + fit(SYM(REV), 590, 170, 200, 220) + '</g>';
  web += t(44, 200, 'Tools for', { size: 44, weight: 300 }) + t(44, 250, 'the craft.', { size: 44, weight: 300 });
  web += ar(424, 296, 'أدوات الحرفة', { size: 18, fill: '#8c7445', anchor: 'end', weight: 300 });
  web += para(44, 312, 400, 60, 'Professional clippers, care and salon equipment, made for the people who cut.', { size: 13 });
  web += rect(44, 384, 190, 44, '#141414') + t(139, 411, 'Shop the collection', { size: 12.5, fill: P.ivory, anchor: 'middle', weight: 500 });
  g.push(`<g transform="translate(730 580)" filter="url(#soft)">${web}</g>`);
  return g.join('') + footer('Digital', 12);
}
