import React from "react";
import { AbsoluteFill } from "remotion";
import { FilmGrain, GoldParticles, LightRays, Vignette } from "../components/Atmosphere";
import { GoldText } from "../components/GoldText";
import { CastLight, IslamicWindow } from "../components/IslamicWindow";
import { MushafSet } from "../components/Mushaf";
import { OPENING_LINE } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, envelope, tween } from "../styles/anim";
import { COLORS } from "../styles/theme";

/** 00:00–00:10 — a dark room warms with sunrise; slow dolly toward the closed mushaf. */
export const Scene01Light: React.FC = () => {
  const f = useSceneFrame();
  const { width, portrait } = useLayout();

  const sunrise = tween(f, [sec(0.3), sec(5)], [0, 1], EASE_IN_OUT);
  const dolly = tween(f, [0, sec(8.4)], [1, 1.14], (t) => t) * tween(f, [sec(8.4), sec(10.6)], [1, 1.9], EASE_IN_OUT);
  const bgDolly = 1 + (dolly - 1) * 0.45;

  const book = portrait ? { x: 600, y: 1100, s: 1.0 } : { x: 1250, y: 610, s: 0.86 };
  const win = portrait ? { x: 70, y: 120, w: 280, h: 440 } : { x: 150, y: 70, w: 380, h: 600 };
  // The final push-in lands on the cover medallion, which match-cuts to the glowing point of scene 2.
  const origin = `${book.x}px ${book.y - 150 * book.s}px`;
  const medallionGlow = tween(f, [sec(8.6), sec(10.4)], [0, 1]);

  return (
    <AbsoluteFill style={{ background: COLORS.abyss, overflow: "hidden" }}>
      <AbsoluteFill style={{ scale: String(bgDolly), transformOrigin: origin }}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse 70% 80% at ${portrait ? "50% 45%" : "62% 45%"}, #1b2a20 0%, #0d1913 45%, #050c09 100%)`,
          }}
        />
        <div style={{ position: "absolute", left: portrait ? 260 : 700, top: portrait ? 520 : 60, width: portrait ? 760 : 1050, height: portrait ? 900 : 780, transform: "skewX(-16deg)", opacity: sunrise }}>
          <CastLight width={portrait ? 760 : 1050} height={portrait ? 900 : 780} intensity={0.85} tile={portrait ? 130 : 150} />
        </div>
        <div style={{ position: "absolute", left: win.x, top: win.y }}>
          <IslamicWindow width={win.w} height={win.h} glow={sunrise} />
        </div>
        <div
          style={{
            position: "absolute",
            left: win.x - win.w * 0.6,
            top: win.y - win.h * 0.2,
            width: win.w * 2.2,
            height: win.h * 1.4,
            background: "radial-gradient(ellipse, rgba(255,214,150,0.45), rgba(255,214,150,0) 65%)",
            opacity: sunrise,
            mixBlendMode: "screen",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: sunrise }}>
        <LightRays x={win.x + win.w * 0.5} y={win.y + win.h * 0.45} angle={portrait ? 62 : 24} spread={portrait ? 22 : 18} intensity={0.32} count={8} length={portrait ? 1900 : 1700} />
      </AbsoluteFill>
      <AbsoluteFill style={{ scale: String(dolly), transformOrigin: origin }}>
        <div style={{ position: "absolute", left: book.x - 320, top: book.y - 540 }}>
          <MushafSet scale={book.s} rotateX={8} rotateY={22} light={0.25 + 0.75 * sunrise} sheen={tween(f, [sec(3), sec(8)], [0, 1], EASE_IN_OUT)} />
        </div>
        <div
          style={{
            position: "absolute",
            left: book.x - 300,
            top: book.y - 150 * book.s - 300,
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,240,200,1) 0%, rgba(231,215,162,0.7) 18%, rgba(212,175,55,0.25) 40%, rgba(212,175,55,0) 70%)",
            opacity: medallionGlow,
            scale: String(0.3 + medallionGlow * 1.2),
            mixBlendMode: "screen",
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: sunrise }}>
        <GoldParticles count={portrait ? 70 : 80} seed="s1-dust" speed={0.18} area={portrait ? { x: 0.05, y: 0.15, w: 0.9, h: 0.6 } : { x: 0.12, y: 0.1, w: 0.7, h: 0.8 }} warm />
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: portrait ? 0 : 90,
          width: portrait ? width : 900,
          top: portrait ? 1520 : 720,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <GoldText
          text={OPENING_LINE.first}
          size={portrait ? 64 : 58}
          weight={400}
          color="champagne"
          reveal={tween(f, [sec(2.2), sec(3.6)], [0, 1], EASE_IN_OUT)}
          style={{ opacity: envelope(f, sec(2.2), sec(2.6), sec(8.6), sec(9.4)) }}
        />
        <GoldText
          text={OPENING_LINE.second}
          size={portrait ? 64 : 58}
          weight={700}
          reveal={tween(f, [sec(4.4), sec(6.2)], [0, 1], EASE_IN_OUT)}
          shine={tween(f, [sec(6.2), sec(8.2)], [0, 1])}
          style={{ opacity: envelope(f, sec(4.4), sec(4.8), sec(8.6), sec(9.4)) }}
        />
      </div>
      <Vignette strength={0.8} />
      <FilmGrain />
      <AbsoluteFill style={{ background: "#000", opacity: tween(f, [0, sec(1.6)], [1, 0]), pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};
