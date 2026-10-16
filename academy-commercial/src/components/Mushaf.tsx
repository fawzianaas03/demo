import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONTS } from "../styles/theme";
import { khatam } from "./Geometry";

// A closed mushaf built from six CSS-3D faces. Arabic books are bound on the
// right, so the spine is the right face and the gilded fore-edge the left.

const W = 400;
const H = 560;
const D = 70;

const leather = `linear-gradient(160deg, #0d5a43 0%, #0a4434 40%, #06301f 100%)`;

const CoverArt: React.FC = () => {
  const g = COLORS.gold;
  const corner = (cx: number, cy: number, rot: number) => (
    <g transform={`translate(${cx} ${cy}) rotate(${rot})`}>
      <path d="M 0 0 L 58 0 A 58 58 0 0 1 0 58 Z" fill="rgba(212,175,55,0.16)" stroke={g} strokeWidth={1.6} />
      <path d="M 0 0 L 38 0 A 38 38 0 0 1 0 38 Z" fill="none" stroke={g} strokeWidth={1} />
      {[15, 30, 45, 60, 75].map((a) => (
        <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 56} y2={Math.sin((a * Math.PI) / 180) * 56} stroke={g} strokeWidth={0.7} opacity={0.8} />
      ))}
    </g>
  );
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <radialGradient id="medallion-fill" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#0f6a4f" />
          <stop offset="1" stopColor="#05261b" />
        </radialGradient>
        <linearGradient id="cover-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.goldBright} />
          <stop offset="0.45" stopColor={COLORS.gold} />
          <stop offset="1" stopColor={COLORS.goldDeep} />
        </linearGradient>
      </defs>
      <g filter="drop-shadow(0 1.5px 0 rgba(0,0,0,0.55)) drop-shadow(0 -0.5px 0 rgba(255,240,200,0.35))">
        <rect x={16} y={16} width={W - 32} height={H - 32} fill="none" stroke="url(#cover-gold)" strokeWidth={3} rx={2} />
        <rect x={28} y={28} width={W - 56} height={H - 56} fill="none" stroke="url(#cover-gold)" strokeWidth={1.2} />
        {new Array(22).fill(0).map((_, i) => (
          <polygon key={`t${i}`} points={khatam(36 + i * ((W - 72) / 21), 22, 3.2)} fill={g} opacity={0.85} />
        ))}
        {new Array(22).fill(0).map((_, i) => (
          <polygon key={`b${i}`} points={khatam(36 + i * ((W - 72) / 21), H - 22, 3.2)} fill={g} opacity={0.85} />
        ))}
        {corner(28, 28, 0)}
        {corner(W - 28, 28, 90)}
        {corner(W - 28, H - 28, 180)}
        {corner(28, H - 28, 270)}
        {/* Pendants above and below the medallion */}
        <path d={`M ${W / 2} 112 l 18 26 l -18 26 l -18 -26 Z`} fill="rgba(212,175,55,0.25)" stroke="url(#cover-gold)" strokeWidth={1.4} />
        <path d={`M ${W / 2} ${H - 112} l 18 -26 l -18 -26 l -18 26 Z`} fill="rgba(212,175,55,0.25)" stroke="url(#cover-gold)" strokeWidth={1.4} />
        {/* Central almond medallion (shamsa) */}
        <ellipse cx={W / 2} cy={H / 2} rx={112} ry={122} fill="url(#medallion-fill)" stroke="url(#cover-gold)" strokeWidth={3} />
        <ellipse cx={W / 2} cy={H / 2} rx={100} ry={110} fill="none" stroke="url(#cover-gold)" strokeWidth={1} />
        {new Array(24).fill(0).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          return (
            <circle key={i} cx={W / 2 + Math.cos(a) * 120} cy={H / 2 + Math.sin(a) * 131} r={3.4} fill={g} />
          );
        })}
        <polygon points={khatam(W / 2, H / 2, 92)} fill="none" stroke={g} strokeWidth={1} opacity={0.45} />
      </g>
      <text
        x={W / 2}
        y={H / 2 + 18}
        textAnchor="middle"
        direction="rtl"
        fontFamily={FONTS.display}
        fontWeight={700}
        fontSize={44}
        fill="url(#cover-gold)"
        style={{ filter: "drop-shadow(0 1.5px 0 rgba(0,0,0,0.6))" }}
      >
        القرآن الكريم
      </text>
    </svg>
  );
};

type Props = {
  rotateX?: number;
  rotateY?: number;
  /** 0–1 warm light falling on the cover from the upper left. */
  light?: number;
  /** 0–1 position of a specular sweep across the cover. */
  sheen?: number;
};

export const Mushaf: React.FC<Props> = ({ rotateX = 10, rotateY = 20, light = 1, sheen }) => {
  const face: React.CSSProperties = { position: "absolute", backfaceVisibility: "hidden" };
  const pageEdgeV = `repeating-linear-gradient(90deg, #f3dc95 0px, #d9b75a 1.2px, #f6e4a8 2.4px)`;
  const pageEdgeH = `repeating-linear-gradient(0deg, #f3dc95 0px, #d9b75a 1.2px, #f6e4a8 2.4px)`;
  return (
    <div style={{ width: W, height: H, position: "relative", transformStyle: "preserve-3d", transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }}>
      {/* Front cover */}
      <div style={{ ...face, width: W, height: H, transform: `translateZ(${D / 2}px)`, background: leather, borderRadius: "3px 6px 6px 3px", overflow: "hidden" }}>
        <Img src={staticFile("assets/grain.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18, mixBlendMode: "multiply" }} />
        <CoverArt />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(125deg, rgba(255,214,150,${0.32 * light}) 0%, rgba(255,214,150,${0.08 * light}) 40%, rgba(0,0,0,0.35) 100%)`, mixBlendMode: "soft-light" }} />
        {sheen !== undefined && (
          <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, transparent ${sheen * 160 - 40}%, rgba(255,240,205,0.28) ${sheen * 160 - 25}%, transparent ${sheen * 160 - 10}%)`, mixBlendMode: "screen" }} />
        )}
        <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 18, background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(255,220,160,0.12) 100%)" }} />
      </div>
      {/* Back cover */}
      <div style={{ ...face, width: W, height: H, transform: `rotateY(180deg) translateZ(${D / 2}px)`, background: "#05261b" }} />
      {/* Fore-edge (left): gilded pages framed by the boards */}
      <div style={{ ...face, width: D, height: H, left: (W - D) / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)`, background: pageEdgeV, borderLeft: "5px solid #07382a", borderRight: "5px solid #07382a", boxShadow: `inset 0 0 18px rgba(120,80,10,0.5)`, filter: `brightness(${0.75 + 0.4 * light})` }} />
      {/* Spine (right) with raised bands */}
      <div style={{ ...face, width: D, height: H, left: (W - D) / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)`, background: `linear-gradient(90deg, #04241a, #0b4a37 50%, #04241a)` }}>
        {[0.16, 0.3, 0.7, 0.84].map((p) => (
          <div key={p} style={{ position: "absolute", left: 4, right: 4, top: `${p * 100}%`, height: 3, background: COLORS.gold, opacity: 0.85 }} />
        ))}
      </div>
      {/* Top and bottom page edges */}
      <div style={{ ...face, width: W, height: D, top: (H - D) / 2, transform: `rotateX(90deg) translateZ(${H / 2}px)`, background: pageEdgeH, borderTop: "5px solid #07382a", borderBottom: "5px solid #07382a", filter: `brightness(${0.8 + 0.35 * light})` }} />
      <div style={{ ...face, width: W, height: D, top: (H - D) / 2, transform: `rotateX(-90deg) translateZ(${H / 2}px)`, background: "#3a2a0c" }} />
    </div>
  );
};

/** Carved wooden lectern the mushaf rests on. */
export const WoodenStand: React.FC<{ width?: number }> = ({ width = 640 }) => {
  const h = width * 0.62;
  return (
    <svg width={width} height={h} viewBox="0 0 640 400" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor="#2a170b" />
          <stop offset="0.35" stopColor="#5a361b" />
          <stop offset="0.55" stopColor="#6e4423" />
          <stop offset="1" stopColor="#1f1108" />
        </linearGradient>
        <linearGradient id="wood-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2210" />
          <stop offset="1" stopColor="#140a04" />
        </linearGradient>
      </defs>
      {/* Ledge the book stands on */}
      <rect x={70} y={0} width={500} height={30} rx={6} fill="url(#wood)" />
      <rect x={70} y={2} width={500} height={3} fill="rgba(255,210,150,0.35)" />
      <line x1={90} x2={550} y1={18} y2={18} stroke={COLORS.gold} strokeWidth={1.2} opacity={0.6} />
      {/* Front panel */}
      <path d="M 96 30 L 544 30 L 506 330 L 134 330 Z" fill="url(#wood-dark)" />
      <path d="M 96 30 L 544 30 L 540 46 L 100 46 Z" fill="rgba(0,0,0,0.35)" />
      {/* Carved arch recess with a star inlay */}
      <path d="M 250 300 L 250 160 A 112 112 0 0 1 320 82 A 112 112 0 0 1 390 160 L 390 300 Z" fill="rgba(0,0,0,0.38)" stroke="rgba(212,175,55,0.45)" strokeWidth={2} />
      <polygon points={khatam(320, 196, 34)} fill="none" stroke={COLORS.gold} strokeWidth={1.6} opacity={0.75} />
      <polygon points={khatam(320, 196, 16)} fill="rgba(212,175,55,0.35)" />
      {/* Feet */}
      <rect x={120} y={330} width={60} height={60} rx={4} fill="#140a04" />
      <rect x={460} y={330} width={60} height={60} rx={4} fill="#140a04" />
      <rect x={110} y={326} width={420} height={14} rx={3} fill="url(#wood)" />
    </svg>
  );
};

/** Book + stand + contact shadow, centred on its own box. */
export const MushafSet: React.FC<Props & { scale?: number }> = ({ scale = 1, ...book }) => (
  <div style={{ position: "relative", width: 640, height: 900, scale: String(scale), transformOrigin: "50% 60%" }}>
    <div style={{ position: "absolute", left: 120, top: 40, width: W, height: H, perspective: 2600, perspectiveOrigin: "50% 20%" }}>
      <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
        <Mushaf {...book} />
      </div>
    </div>
    <div style={{ position: "absolute", left: 60, top: 586, filter: "blur(0.6px)" }}>
      <div style={{ position: "absolute", left: 40, top: -14, width: 440, height: 30, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(0,0,0,0.75), rgba(0,0,0,0) 70%)" }} />
      <WoodenStand width={520} />
    </div>
  </div>
);
