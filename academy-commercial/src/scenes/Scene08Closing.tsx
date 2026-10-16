import React from "react";
import { AbsoluteFill } from "remotion";
import { FilmGrain, GoldParticles, LightRays, Vignette } from "../components/Atmosphere";
import { GoldText } from "../components/GoldText";
import { CastLight, IslamicWindow } from "../components/IslamicWindow";
import { MushafSet } from "../components/Mushaf";
import { CLOSING_LINE } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, tween } from "../styles/anim";
import { COLORS } from "../styles/theme";

/** 01:19–01:25 — back to the mushaf, now bathed in full warm light; a gentle pull-back. */
export const Scene08Closing: React.FC = () => {
  const f = useSceneFrame();
  const { width, portrait } = useLayout();
  const pull = tween(f, [-sec(0.75), sec(6)], [1.12, 1], EASE_IN_OUT);
  const book = portrait ? { x: 600, y: 1100, s: 1.0 } : { x: 1250, y: 610, s: 0.86 };
  const win = portrait ? { x: 70, y: 120, w: 280, h: 440 } : { x: 150, y: 70, w: 380, h: 600 };
  return (
    <AbsoluteFill style={{ background: COLORS.abyss, overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(1 + (pull - 1) * 0.5), transformOrigin: `${book.x}px ${book.y}px` }}>
        <AbsoluteFill style={{ background: `radial-gradient(ellipse 75% 85% at ${portrait ? "50% 45%" : "62% 45%"}, #3a3420 0%, #1a2419 40%, #060d0a 100%)` }} />
        <div style={{ position: "absolute", left: portrait ? 260 : 700, top: portrait ? 520 : 60, transform: "skewX(-16deg)" }}>
          <CastLight width={portrait ? 760 : 1050} height={portrait ? 900 : 780} intensity={1.15} tile={portrait ? 130 : 150} />
        </div>
        <div style={{ position: "absolute", left: win.x, top: win.y }}>
          <IslamicWindow width={win.w} height={win.h} glow={1} />
        </div>
      </AbsoluteFill>
      <LightRays x={win.x + win.w * 0.5} y={win.y + win.h * 0.45} angle={portrait ? 62 : 24} spread={portrait ? 26 : 22} intensity={0.45} count={9} length={portrait ? 1900 : 1700} seed="s8-rays" />
      <AbsoluteFill style={{ scale: String(pull), transformOrigin: `${book.x}px ${book.y}px` }}>
        <div style={{ position: "absolute", left: book.x - 320, top: book.y - 540 }}>
          <MushafSet scale={book.s} rotateX={8} rotateY={22} light={1.2} sheen={tween(f, [sec(0.5), sec(5)], [0, 1], EASE_IN_OUT)} />
        </div>
      </AbsoluteFill>
      <GoldParticles count={110} seed="s8-dust" speed={0.2} warm opacity={0.95} />
      <div style={{ position: "absolute", left: portrait ? 0 : 90, width: portrait ? width : 900, top: portrait ? 1500 : 700, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <GoldText text={CLOSING_LINE.first} size={portrait ? 70 : 64} weight={400} color="champagne" reveal={tween(f, [sec(0.6), sec(1.6)], [0, 1], EASE_IN_OUT)} />
        <GoldText text={CLOSING_LINE.second} size={portrait ? 64 : 60} reveal={tween(f, [sec(2.0), sec(3.4)], [0, 1], EASE_IN_OUT)} shine={tween(f, [sec(3.6), sec(5.4)], [0, 1])} />
      </div>
      <Vignette strength={0.72} />
      <FilmGrain />
    </AbsoluteFill>
  );
};
