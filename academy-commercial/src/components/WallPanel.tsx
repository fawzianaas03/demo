import React, { useId } from "react";
import { Img, staticFile } from "remotion";
import { COLORS, FONTS } from "../styles/theme";
import { khatam } from "./Geometry";

// A framed illuminated panel (lawha) hanging on the wall: a gilded moulded
// frame around an emerald field with tazhib border, corner pieces and a
// central shamsa carrying the title «القرآن الكريم». No verse is written.

const ART_W = 460;
const ART_H = 620;
const FRAME = 38;
const MAT = 18;

const PanelArt: React.FC<{ id: string }> = ({ id }) => {
  const W = ART_W;
  const H = ART_H;
  const g = COLORS.gold;
  const cx = W / 2;
  const cy = H / 2;
  const corner = (x: number, y: number, rot: number) => (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d="M 0 0 L 74 0 A 74 74 0 0 1 0 74 Z" fill="rgba(212,175,55,0.14)" stroke={`url(#gold-${id})`} strokeWidth={1.8} />
      <path d="M 0 0 L 50 0 A 50 50 0 0 1 0 50 Z" fill="none" stroke={g} strokeWidth={1} />
      {[11, 22.5, 34, 45, 56, 67.5, 79].map((a) => (
        <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * 72} y2={Math.sin((a * Math.PI) / 180) * 72} stroke={g} strokeWidth={0.7} opacity={0.75} />
      ))}
      <polygon points={khatam(24, 24, 9)} fill={g} opacity={0.9} />
    </g>
  );
  const tile = 46;
  const c = tile / 2;
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0 }}>
      <defs>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={COLORS.goldBright} />
          <stop offset="0.45" stopColor={COLORS.gold} />
          <stop offset="1" stopColor={COLORS.goldDeep} />
        </linearGradient>
        <radialGradient id={`field-${id}`} cx="0.5" cy="0.45" r="0.75">
          <stop offset="0" stopColor="#0d5f48" />
          <stop offset="0.6" stopColor="#08402f" />
          <stop offset="1" stopColor="#042419" />
        </radialGradient>
        <radialGradient id={`shamsa-${id}`} cx="0.5" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#106d52" />
          <stop offset="1" stopColor="#052a1e" />
        </radialGradient>
        <pattern id={`lat-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse" x={cx - c} y={cy - c}>
          <polygon points={khatam(c, c, c)} fill="none" stroke={g} strokeWidth={0.8} />
        </pattern>
      </defs>
      <rect width={W} height={H} fill={`url(#field-${id})`} />
      <rect x={34} y={34} width={W - 68} height={H - 68} fill={`url(#lat-${id})`} opacity={0.16} />
      <g filter="drop-shadow(0 1.5px 0 rgba(0,0,0,0.55)) drop-shadow(0 -0.5px 0 rgba(255,240,200,0.3))">
        {/* Tazhib border: double rule with a chain of stars */}
        <rect x={12} y={12} width={W - 24} height={H - 24} fill="none" stroke={`url(#gold-${id})`} strokeWidth={3} />
        <rect x={30} y={30} width={W - 60} height={H - 60} fill="none" stroke={`url(#gold-${id})`} strokeWidth={1.2} />
        {new Array(20).fill(0).map((_, i) => (
          <polygon key={`t${i}`} points={khatam(32 + i * ((W - 64) / 19), 21, 3.4)} fill={g} />
        ))}
        {new Array(20).fill(0).map((_, i) => (
          <polygon key={`b${i}`} points={khatam(32 + i * ((W - 64) / 19), H - 21, 3.4)} fill={g} />
        ))}
        {new Array(28).fill(0).map((_, i) => (
          <polygon key={`l${i}`} points={khatam(21, 32 + i * ((H - 64) / 27), 3.4)} fill={g} />
        ))}
        {new Array(28).fill(0).map((_, i) => (
          <polygon key={`r${i}`} points={khatam(W - 21, 32 + i * ((H - 64) / 27), 3.4)} fill={g} />
        ))}
        {corner(30, 30, 0)}
        {corner(W - 30, 30, 90)}
        {corner(W - 30, H - 30, 180)}
        {corner(30, H - 30, 270)}
        {/* Pendants (salbek) above and below the shamsa */}
        <path d={`M ${cx} ${cy - 214} l 22 32 l -22 32 l -22 -32 Z`} fill="rgba(212,175,55,0.22)" stroke={`url(#gold-${id})`} strokeWidth={1.5} />
        <path d={`M ${cx} ${cy + 214} l 22 -32 l -22 -32 l -22 32 Z`} fill="rgba(212,175,55,0.22)" stroke={`url(#gold-${id})`} strokeWidth={1.5} />
        {/* Shamsa: scalloped sun medallion */}
        {new Array(32).fill(0).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          return <circle key={i} cx={cx + Math.cos(a) * 146} cy={cy + Math.sin(a) * 146} r={9} fill="rgba(212,175,55,0.2)" stroke={g} strokeWidth={1} />;
        })}
        <circle cx={cx} cy={cy} r={138} fill={`url(#shamsa-${id})`} stroke={`url(#gold-${id})`} strokeWidth={3.5} />
        <circle cx={cx} cy={cy} r={124} fill="none" stroke={`url(#gold-${id})`} strokeWidth={1} />
        <polygon points={khatam(cx, cy, 118)} fill="none" stroke={g} strokeWidth={1} opacity={0.4} />
        <polygon points={khatam(cx, cy, 84)} fill="none" stroke={g} strokeWidth={0.8} opacity={0.3} />
      </g>
      <text
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        direction="rtl"
        fontFamily={FONTS.display}
        fontWeight={700}
        fontSize={56}
        fill={`url(#gold-${id})`}
        style={{ filter: "drop-shadow(0 2px 0 rgba(0,0,0,0.6))" }}
      >
        القرآن الكريم
      </text>
    </svg>
  );
};

type Props = {
  /** 0–1 warm window light falling across the panel from the upper left. */
  light?: number;
  /** 0–1 position of a reflection sweeping across the glass. */
  sheen?: number;
};

export const PANEL_WIDTH = ART_W + 2 * (FRAME + MAT);
export const PANEL_HEIGHT = ART_H + 2 * (FRAME + MAT);

/** The framed panel on the wall, with its cast shadow. */
export const WallPanel: React.FC<Props> = ({ light = 1, sheen }) => {
  const id = useId().replace(/:/g, "");
  const frameGold = `linear-gradient(135deg, #F6E7B0 0%, #D4AF37 22%, #8C6A18 48%, #D4AF37 72%, #F6E7B0 100%)`;
  return (
    <div style={{ position: "relative", width: PANEL_WIDTH, height: PANEL_HEIGHT }}>
      {/* Cast shadow on the wall: light comes from the window at the upper left. */}
      <div style={{ position: "absolute", left: 26, top: 30, width: PANEL_WIDTH, height: PANEL_HEIGHT, background: "rgba(0,0,0,0.6)", filter: "blur(26px)" }} />
      {/* Gilded moulded frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: frameGold,
          boxShadow: "inset 0 0 0 2px rgba(255,240,200,0.55), inset 0 0 0 7px rgba(90,64,10,0.55), inset 0 0 0 9px rgba(246,231,176,0.5)",
        }}
      />
      {/* Carved bead along the frame */}
      <svg width={PANEL_WIDTH} height={PANEL_HEIGHT} style={{ position: "absolute", inset: 0 }}>
        <rect x={FRAME / 2} y={FRAME / 2} width={PANEL_WIDTH - FRAME} height={PANEL_HEIGHT - FRAME} fill="none" stroke="rgba(90,64,10,0.7)" strokeWidth={2} strokeDasharray="2 6" />
        {[
          [FRAME / 2, FRAME / 2],
          [PANEL_WIDTH - FRAME / 2, FRAME / 2],
          [FRAME / 2, PANEL_HEIGHT - FRAME / 2],
          [PANEL_WIDTH - FRAME / 2, PANEL_HEIGHT - FRAME / 2],
        ].map(([x, y]) => (
          <polygon key={`${x}-${y}`} points={khatam(x, y, 13)} fill="#B8922B" stroke="#F6E7B0" strokeWidth={1} />
        ))}
      </svg>
      {/* Ivory-gold mat */}
      <div
        style={{
          position: "absolute",
          left: FRAME,
          top: FRAME,
          right: FRAME,
          bottom: FRAME,
          background: "linear-gradient(160deg, #EFE3C0, #D9C793)",
          boxShadow: "inset 3px 3px 8px rgba(0,0,0,0.55), inset -1px -1px 2px rgba(255,255,255,0.4)",
        }}
      />
      {/* The illuminated panel */}
      <div style={{ position: "absolute", left: FRAME + MAT, top: FRAME + MAT, width: ART_W, height: ART_H, overflow: "hidden", boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.6)" }}>
        <PanelArt id={id} />
        <Img src={staticFile("assets/grain.png")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.12, mixBlendMode: "multiply" }} />
      </div>
      {/* Window light across the whole piece, then a reflection on the glass. */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(125deg, rgba(255,214,150,${0.35 * light}) 0%, rgba(255,214,150,${0.1 * light}) 45%, rgba(0,0,0,${0.45 - 0.25 * light}) 100%)`, mixBlendMode: "soft-light" }} />
      {sheen !== undefined && (
        <div style={{ position: "absolute", left: FRAME + MAT, top: FRAME + MAT, width: ART_W, height: ART_H, background: `linear-gradient(120deg, transparent ${sheen * 160 - 40}%, rgba(255,244,215,0.2) ${sheen * 160 - 26}%, transparent ${sheen * 160 - 12}%)`, mixBlendMode: "screen" }} />
      )}
    </div>
  );
};
