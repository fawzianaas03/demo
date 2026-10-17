import React from "react";
import { AbsoluteFill, random } from "remotion";
import { EmeraldStage } from "../components/Stage";
import { ArchVignette, VignetteKind } from "../components/Vignette";
import { HUB_LABEL } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

const HOMES: VignetteKind[] = ["womanStudying", "childrenReading", "childWithParent"];

/** 00:10–00:20 — from one glowing point in Libya, golden bridges reach homes and learners. */
export const Scene02Bridges: React.FC = () => {
  const f = useSceneFrame();
  const { width, portrait } = useLayout();
  const hub = portrait ? { x: 540, y: 380 } : { x: 960, y: 190 };
  const archW = portrait ? 300 : 330;
  const archTop = portrait ? 760 : 400;
  const gap = portrait ? 30 : 110;
  const rowW = archW * 3 + gap * 2;
  const archX = (i: number) => (width - rowW) / 2 + (2 - i) * (archW + gap); // first home on the right (RTL)

  // A constellation of distant nodes the knowledge reaches.
  const nodes = new Array(portrait ? 12 : 16).fill(0).map((_, i) => {
    const a = random(`n-a-${i}`) * Math.PI * 2;
    const d = (portrait ? 200 : 300) + random(`n-d-${i}`) * (portrait ? 220 : 560);
    // Flattened ellipse that stays inside the frame above the arches.
    return { x: hub.x + Math.cos(a) * d * (portrait ? 0.95 : 1.15), y: hub.y + Math.sin(a) * d * (portrait ? 0.5 : 0.17), delay: random(`n-t-${i}`) * 1.6 };
  });

  const hubGlow = tween(f, [-sec(0.8), sec(0.6)], [2.4, 1], EASE_OUT);
  const drift = tween(f, [-sec(0.8), sec(10)], [30, -30], (t) => t);

  return (
    <EmeraldStage seed="s2" pattern={0.08}>
      <AbsoluteFill style={{ translate: `${drift}px 0px` }}>
        <svg width={width} height={portrait ? 1920 : 1080} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <defs>
            <linearGradient id="bridge" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={COLORS.goldBright} />
              <stop offset="1" stopColor={COLORS.gold} stopOpacity={0.3} />
            </linearGradient>
          </defs>
          {nodes.map((n, i) => {
            const p = tween(f, [sec(0.4 + n.delay), sec(1.8 + n.delay)], [0, 1], EASE_IN_OUT);
            const mx = (hub.x + n.x) / 2;
            const my = Math.min(hub.y, n.y) - 60;
            return (
              <g key={i} opacity={0.75}>
                <path d={`M ${hub.x} ${hub.y} Q ${mx} ${my} ${n.x} ${n.y}`} fill="none" stroke={COLORS.gold} strokeWidth={1.4} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
                <circle cx={n.x} cy={n.y} r={4 * p} fill={COLORS.champagne} />
                <circle cx={n.x} cy={n.y} r={14 * p} fill="rgba(231,215,162,0.18)" />
              </g>
            );
          })}
          {HOMES.map((_, i) => {
            const p = tween(f, [sec(2.6 + i * 0.5), sec(4.2 + i * 0.5)], [0, 1], EASE_IN_OUT);
            const tx = archX(i) + archW / 2;
            const ty = archTop - 30;
            return (
              <path
                key={i}
                d={`M ${hub.x} ${hub.y} C ${hub.x} ${(hub.y + ty) / 2}, ${tx} ${(hub.y + ty) / 2}, ${tx} ${ty}`}
                fill="none"
                stroke="url(#bridge)"
                strokeWidth={2.4}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - p}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: "absolute",
            left: hub.x - 120,
            top: hub.y - 120,
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,246,220,1) 0%, rgba(231,215,162,0.8) 10%, rgba(212,175,55,0.3) 32%, rgba(212,175,55,0) 66%)",
            scale: String(hubGlow),
            mixBlendMode: "screen",
          }}
        />
        <div
          dir="rtl"
          style={{
            position: "absolute",
            left: hub.x - 150,
            width: 300,
            top: hub.y + 44,
            textAlign: "center",
            fontFamily: FONTS.heading,
            fontWeight: 700,
            fontSize: 34,
            color: COLORS.champagne,
            opacity: tween(f, [sec(0.8), sec(1.8)], [0, 1]),
            textShadow: "0 2px 12px rgba(0,0,0,0.6)",
          }}
        >
          {HUB_LABEL}
        </div>
        {HOMES.map((k, i) => {
          const a = tween(f, [sec(2.8 + i * 0.5), sec(4.4 + i * 0.5)], [0, 1], EASE_OUT);
          return (
            <div key={k} style={{ position: "absolute", left: archX(i), top: archTop, opacity: a, translate: `0px ${(1 - a) * 60}px` }}>
              <ArchVignette kind={k} width={archW} push={tween(f, [sec(2.8), sec(10.5)], [0, 1], (t) => t)} border={tween(f, [sec(3 + i * 0.5), sec(4.8 + i * 0.5)], [0, 1], EASE_IN_OUT)} />
            </div>
          );
        })}
      </AbsoluteFill>
    </EmeraldStage>
  );
};
