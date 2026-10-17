import React, { useId } from "react";
import { Video } from "@remotion/media";
import { random, staticFile, useCurrentFrame } from "remotion";
import { FOOTAGE, FootageSlotId } from "../data/footage";
import { COLORS } from "../styles/theme";
import { archPath, khatam } from "./Geometry";

// Back-lit, faceless silhouettes seated before a sunlit mashrabiya, framed in
// a pointed arch. Every vignette is a footage slot: set a clip for it in
// src/data/footage.ts and the arch shows that footage instead.

const VW = 600;
const VH = 800;
const DESK = 640;
const SIL = "#06100c";

type FigureKind = "woman" | "child" | "elder";

const FIGURE_PATHS: Record<FigureKind, { body: string; head?: { cx: number; cy: number; rx: number; ry: number }; face?: boolean }> = {
  woman: {
    body: "M -138 0 C -138 -90 -120 -140 -78 -158 C -64 -166 -62 -190 -64 -230 C -66 -290 -34 -316 0 -316 C 34 -316 66 -290 64 -230 C 62 -190 64 -166 78 -158 C 120 -140 138 -90 138 0 Z",
    face: true,
  },
  elder: {
    body: "M -146 0 C -146 -96 -126 -142 -84 -156 C -68 -162 -64 -186 -66 -226 C -68 -286 -36 -310 0 -310 C 36 -310 68 -286 66 -226 C 64 -186 68 -162 84 -156 C 126 -142 146 -96 146 0 Z",
    face: true,
  },
  child: {
    body: "M -84 0 C -84 -50 -76 -80 -54 -92 C -38 -100 -24 -102 -16 -104 L -14 -122 L 14 -122 L 16 -104 C 24 -102 38 -100 54 -92 C 76 -80 84 -50 84 0 Z",
    head: { cx: 0, cy: -162, rx: 42, ry: 47 },
  },
};

const Figure: React.FC<{ kind: FigureKind; x: number; scale?: number; rim: string; screenGlow?: boolean }> = ({
  kind,
  x,
  scale = 1,
  rim,
  screenGlow,
}) => {
  const p = FIGURE_PATHS[kind];
  const rimStyle = { stroke: rim, strokeWidth: 2.6 / scale, strokeOpacity: 0.75, paintOrder: "stroke" } as const;
  return (
    <g transform={`translate(${x} ${DESK}) scale(${scale})`}>
      <g style={{ filter: "drop-shadow(0 0 10px rgba(255,200,120,0.55))" }}>
        <path d={p.body} fill={SIL} {...rimStyle} />
        {p.head && <ellipse {...p.head} fill={SIL} {...rimStyle} />}
      </g>
      {p.face && <ellipse cx={0} cy={-236} rx={36} ry={48} fill="#0e1c16" opacity={0.85} />}
      {kind === "elder" && (
        <g stroke={COLORS.champagne} strokeWidth={2} fill="none" opacity={0.55}>
          <ellipse cx={-15} cy={-240} rx={12} ry={9} />
          <ellipse cx={15} cy={-240} rx={12} ry={9} />
          <line x1={-3} x2={3} y1={-241} y2={-241} />
        </g>
      )}
      {screenGlow && <ellipse cx={0} cy={-226} rx={70} ry={80} fill="rgba(210,235,255,0.16)" style={{ mixBlendMode: "screen" }} />}
    </g>
  );
};

/** Wooden rehal (X-stand) holding an open book, seen from across the desk. */
const RehalWithBook: React.FC<{ x: number; scale?: number }> = ({ x, scale = 1 }) => (
  <g transform={`translate(${x} ${DESK}) scale(${scale})`}>
    <path d="M -74 0 L -62 0 L 70 -120 L 58 -124 Z M 74 0 L 62 0 L -70 -120 L -58 -124 Z" fill="#1d1208" stroke={COLORS.gold} strokeWidth={1.2} strokeOpacity={0.5} />
    <path d="M 0 -64 L 92 -132 L 96 -120 L 4 -54 Z" fill="#0a2a1f" />
    <path d="M 0 -64 L -92 -132 L -96 -120 L -4 -54 Z" fill="#0a2a1f" />
    <path d="M 2 -66 L 90 -134 M -2 -66 L -90 -134" stroke={COLORS.goldBright} strokeWidth={2.2} opacity={0.85} />
  </g>
);

const Lantern: React.FC<{ x: number; glow: number }> = ({ x, glow }) => (
  <g transform={`translate(${x} ${DESK})`}>
    <circle cx={0} cy={-58} r={70} fill="rgba(255,200,110,0.35)" opacity={glow} style={{ filter: "blur(14px)" }} />
    <path d="M -22 0 L 22 0 L 26 -14 L 18 -80 L 0 -104 L -18 -80 L -26 -14 Z" fill="#160d05" stroke={COLORS.gold} strokeWidth={1.5} />
    <path d="M -12 -18 L 12 -18 L 10 -72 L 0 -86 L -10 -72 Z" fill="#FFD487" opacity={0.6 + 0.4 * glow} />
    <line x1={0} x2={0} y1={-104} y2={-118} stroke={COLORS.gold} strokeWidth={2} />
  </g>
);

const Laptop: React.FC<{ x: number; tablet?: boolean }> = ({ x, tablet }) => {
  const w = tablet ? 80 : 120;
  const h = tablet ? 120 : 150;
  return (
    <g transform={`translate(${x} ${DESK})`}>
      <rect x={-w * 1.3} y={-h - 40} width={w * 2.6} height={h + 60} fill="rgba(200,230,255,0.10)" style={{ filter: "blur(16px)" }} />
      <path d={`M ${-w} -4 L ${w} -4 L ${w - 8} ${-h} L ${-w + 8} ${-h} Z`} fill="#0b1411" stroke={COLORS.champagne} strokeWidth={1.4} strokeOpacity={0.55} />
      <polygon points={khatam(0, -h / 2 - 2, 12)} fill="none" stroke={COLORS.gold} strokeWidth={1.2} opacity={0.6} />
      {tablet ? <path d="M -10 -4 L -30 0 L 30 0 L 10 -4 Z" fill="#0b1411" /> : <rect x={-w - 14} y={-6} width={2 * w + 28} height={8} rx={3} fill="#121c18" />}
    </g>
  );
};

const HeldBook: React.FC<{ x: number; y: number; glowing?: boolean; rotate?: number }> = ({ x, y, glowing, rotate = 0 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    {glowing && <rect x={-90} y={-70} width={180} height={140} fill="rgba(255,230,180,0.35)" style={{ filter: "blur(18px)" }} />}
    <path d="M 0 0 L -86 -22 L -86 52 L 0 70 Z" fill={glowing ? "#f3e2b8" : "#0a2a1f"} opacity={glowing ? 0.9 : 1} />
    <path d="M 0 0 L 86 -22 L 86 52 L 0 70 Z" fill={glowing ? "#efdcae" : "#0a2a1f"} opacity={glowing ? 0.9 : 1} />
    {glowing &&
      [0, 1, 2, 3, 4].map((i) => (
        <g key={i} stroke="#9b8456" strokeWidth={3} opacity={0.35} style={{ filter: "blur(1.2px)" }}>
          <line x1={-76} x2={-12} y1={-6 + i * 12} y2={8 + i * 12} />
          <line x1={12} x2={76} y1={8 + i * 12} y2={-6 + i * 12} />
        </g>
      ))}
    <path d="M -86 -22 L 0 0 L 86 -22" stroke={COLORS.goldBright} strokeWidth={2} fill="none" opacity={0.8} />
  </g>
);

const BookStack: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${DESK})`}>
    {[
      [70, 22, "#0a2a1f"],
      [62, 18, "#1d1208"],
      [66, 20, "#0c3326"],
    ].map(([w, h, c], i, arr) => {
      const y = -arr.slice(0, i + 1).reduce((s, a) => s + (a[1] as number), 0);
      return (
        <g key={i}>
          <rect x={-(w as number)} y={y} width={(w as number) * 2} height={h as number} rx={2} fill={c as string} />
          <line x1={-(w as number) + 4} x2={(w as number) - 4} y1={y + 2} y2={y + 2} stroke={COLORS.gold} strokeWidth={1.2} opacity={0.6} />
        </g>
      );
    })}
  </g>
);

const Teacup: React.FC<{ x: number }> = ({ x }) => (
  <g transform={`translate(${x} ${DESK})`}>
    <path d="M -22 -2 L 22 -2 L 18 -34 L -18 -34 Z" fill="#0b1411" stroke={COLORS.gold} strokeWidth={1.2} strokeOpacity={0.6} />
    <ellipse cx={0} cy={-1} rx={30} ry={4} fill="#0b1411" />
  </g>
);

export type VignetteKind =
  | "womanStudying"
  | "childrenReading"
  | "childWithParent"
  | "womanMemorizing"
  | "tabletLesson"
  | "youngWomanNotes"
  | "olderWomanReading"
  | "womanOnline";

const Contents: React.FC<{ kind: VignetteKind; glow: number }> = ({ kind, glow }) => {
  const rim = COLORS.champagne;
  switch (kind) {
    case "womanStudying":
      return (
        <>
          <Figure kind="woman" x={300} rim={rim} />
          <RehalWithBook x={300} />
          <Lantern x={480} glow={glow} />
        </>
      );
    case "childrenReading":
      return (
        <>
          <Figure kind="child" x={200} scale={1.12} rim={rim} />
          <Figure kind="child" x={400} scale={1.02} rim={rim} />
          <RehalWithBook x={300} scale={0.78} />
          <Lantern x={530} glow={glow} />
        </>
      );
    case "childWithParent":
      return (
        <>
          <Figure kind="woman" x={210} scale={0.96} rim={rim} />
          <Figure kind="child" x={410} rim={rim} />
          <RehalWithBook x={318} scale={0.82} />
        </>
      );
    case "womanMemorizing":
      return (
        <>
          <Figure kind="woman" x={300} rim={rim} />
          <HeldBook x={300} y={DESK - 70} />
          <Lantern x={110} glow={glow} />
        </>
      );
    case "tabletLesson":
      return (
        <>
          <Figure kind="woman" x={300} rim={rim} screenGlow />
          <Laptop x={300} tablet />
          <Teacup x={470} />
        </>
      );
    case "youngWomanNotes":
      return (
        <>
          <Figure kind="woman" x={300} scale={0.92} rim={rim} />
          <HeldBook x={300} y={DESK - 66} glowing rotate={-4} />
          <BookStack x={490} />
        </>
      );
    case "olderWomanReading":
      return (
        <>
          <Figure kind="elder" x={300} rim={rim} />
          <HeldBook x={300} y={DESK - 70} />
          <Teacup x={110} />
        </>
      );
    case "womanOnline":
      return (
        <>
          <Figure kind="woman" x={300} rim={rim} screenGlow />
          <Laptop x={300} />
          <BookStack x={500} />
        </>
      );
  }
};

type VignetteProps = {
  kind: VignetteKind;
  width: number;
  /** 0–1 slow push-in progress within the shot. */
  push?: number;
  /** 0–1 draw-on progress of the gold arch border. */
  border?: number;
  glow?: number;
};

/** One arch-framed vignette (or its footage replacement). */
export const ArchVignette: React.FC<VignetteProps> = ({ kind, width, push = 0, border = 1, glow = 1 }) => {
  const id = useId().replace(/:/g, "");
  const frame = useCurrentFrame();
  const footage = FOOTAGE[kind as FootageSlotId];
  const height = (width / VW) * VH;
  const path = archPath(VW, VH);
  const zoomBg = 1 + 0.04 * push;
  const zoomFg = 1 + 0.09 * push;
  const tile = 110;
  const c = tile / 2;
  return (
    <div style={{ position: "relative", width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${VW} ${VH}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <defs>
          <clipPath id={`arch-${id}`}>
            <path d={path} />
          </clipPath>
          <radialGradient id={`wall-${id}`} cx="0.5" cy="0.42" r="0.8">
            <stop offset="0" stopColor="#24382e" />
            <stop offset="1" stopColor="#07120d" />
          </radialGradient>
          <radialGradient id={`sky-${id}`} cx="0.5" cy="0.45" r="0.62">
            <stop offset="0" stopColor="#FFF6DD" />
            <stop offset="0.4" stopColor="#FFDB9A" />
            <stop offset="0.8" stopColor="#E09A45" />
            <stop offset="1" stopColor="#8A4E18" />
          </radialGradient>
          <pattern id={`lat-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse" x={95} y={0}>
            <g fill="none" stroke="#2a1a08" strokeWidth={7}>
              <polygon points={khatam(c, c, c)} />
              <polygon points={khatam(c, c, c * 0.5)} />
            </g>
          </pattern>
          <linearGradient id={`desk-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1a0c" />
            <stop offset="1" stopColor="#080503" />
          </linearGradient>
        </defs>
        <g clipPath={`url(#arch-${id})`}>
          {footage ? null : (
            <>
              <g transform={`translate(${VW / 2} ${VH * 0.45}) scale(${zoomBg}) translate(${-VW / 2} ${-VH * 0.45})`}>
                <rect width={VW} height={VH} fill={`url(#wall-${id})`} />
                <path d={archPath(330, 520, 135, 70)} fill={`url(#sky-${id})`} opacity={0.4 + 0.6 * glow} />
                <path d={archPath(330, 520, 135, 70)} fill={`url(#lat-${id})`} />
                <path d={archPath(330, 520, 135, 70)} fill="none" stroke="#1a1006" strokeWidth={14} />
                <ellipse cx={300} cy={330} rx={300} ry={330} fill="rgba(255,210,140,0.22)" style={{ filter: "blur(30px)", mixBlendMode: "screen" }} opacity={glow} />
              </g>
              <g transform={`translate(${VW / 2} ${VH * 0.7}) scale(${zoomFg}) translate(${-VW / 2} ${-VH * 0.7})`}>
                <Contents kind={kind} glow={glow} />
                <rect x={-20} y={DESK} width={VW + 40} height={VH - DESK} fill={`url(#desk-${id})`} />
                <line x1={0} x2={VW} y1={DESK + 1} y2={DESK + 1} stroke={COLORS.champagne} strokeWidth={2} opacity={0.5} />
              </g>
              {new Array(14).fill(0).map((_, i) => {
                const r = (k: string) => random(`${kind}-mote-${i}-${k}`);
                const y = ((r("y") * 520 - frame * (0.2 + r("v") * 0.3)) % 520 + 520) % 520 + 80;
                return <circle key={i} cx={150 + r("x") * 300 + Math.sin(frame / 40 + i) * 8} cy={y} r={1 + r("s") * 2.4} fill="#FFE8B8" opacity={0.35 + 0.5 * r("o")} />;
              })}
            </>
          )}
        </g>
      </svg>
      {footage && (
        <div style={{ position: "absolute", inset: 0, clipPath: `path('${archPath(width, height)}')`, overflow: "hidden" }}>
          <Video src={staticFile(footage)} muted objectFit="cover" style={{ width: "100%", height: "100%", scale: String(zoomFg) }} />
        </div>
      )}
      <svg width={width} height={height} viewBox={`0 0 ${VW} ${VH}`} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
        <path d={path} fill="none" stroke={COLORS.gold} strokeWidth={3} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - border} />
        <path d={archPath(VW + 28, VH + 14, -14, -14)} fill="none" stroke={COLORS.champagne} strokeWidth={1.2} opacity={0.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - border} />
        <polygon points={khatam(VW / 2, -30, 12 * border)} fill={COLORS.gold} />
      </svg>
    </div>
  );
};
