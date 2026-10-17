import React from "react";
import { AbsoluteFill } from "remotion";
import { GoldDivider } from "../components/Geometry";
import { GoldText } from "../components/GoldText";
import { EmeraldStage } from "../components/Stage";
import { ArchVignette, VignetteKind } from "../components/Vignette";
import { LEARNING_TITLES } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";

const SHOTS: { kind: VignetteKind; title: string }[] = [
  { kind: "tabletLesson", title: LEARNING_TITLES[0] },
  { kind: "womanMemorizing", title: LEARNING_TITLES[1] },
  { kind: "youngWomanNotes", title: LEARNING_TITLES[2] },
];
const SHOT = 13 / SHOTS.length;
const WIPE = 0.7;

const Shot: React.FC<{ index: number; local: number }> = ({ index, local }) => {
  const { portrait } = useLayout();
  const { kind, title } = SHOTS[index];
  const archW = portrait ? 560 : 470;
  const t0 = index === 0 ? -0.75 : 0;
  return (
    <EmeraldStage seed={`s4-${index}`} pattern={0.1}>
      <AbsoluteFill style={{ flexDirection: portrait ? "column" : "row-reverse", alignItems: "center", justifyContent: "center", gap: portrait ? 70 : 150 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            width: portrait ? 960 : 800,
            order: portrait ? 2 : 0,
          }}
        >
          <GoldText text={title} size={portrait ? 92 : 96} reveal={tween(local, [sec(0.5), sec(1.9)], [0, 1], EASE_IN_OUT)} shine={tween(local, [sec(2), sec(3.6)], [0, 1])} />
          <GoldDivider width={portrait ? 560 : 520} progress={tween(local, [sec(1.2), sec(2.2)], [0, 1], EASE_IN_OUT)} />
        </div>
        <div style={{ opacity: tween(local, [sec(t0), sec(t0 + 0.6)], [0, 1]), translate: `0px ${tween(local, [sec(t0), sec(t0 + 1.2)], [40, 0], EASE_OUT)}px` }}>
          <ArchVignette kind={kind} width={archW} push={tween(local, [0, sec(SHOT + WIPE)], [0, 1], (t) => t)} border={tween(local, [sec(t0 + 0.2), sec(t0 + 1.6)], [0, 1], EASE_IN_OUT)} />
        </div>
      </AbsoluteFill>
    </EmeraldStage>
  );
};

/** 00:31–00:44 — three learning moments joined by right-to-left gold light wipes. */
export const Scene04Learning: React.FC = () => {
  const f = useSceneFrame();
  const { width } = useLayout();
  return (
    <AbsoluteFill>
      {SHOTS.map((_, i) => {
        const start = sec(i * SHOT);
        if (i > 0 && f < start - sec(WIPE)) return null;
        if (i < SHOTS.length - 1 && f > sec((i + 1) * SHOT)) return null;
        const p = i === 0 ? 1 : tween(f, [start - sec(WIPE), start], [0, 1], EASE_IN_OUT);
        return (
          <AbsoluteFill key={i} style={{ clipPath: p >= 1 ? undefined : `inset(0 0 0 ${(1 - p) * 100}%)` }}>
            <Shot index={i} local={f - start} />
          </AbsoluteFill>
        );
      })}
      {SHOTS.slice(1).map((_, k) => {
        const start = sec((k + 1) * SHOT);
        const p = tween(f, [start - sec(WIPE), start], [0, 1], EASE_IN_OUT);
        if (p <= 0 || p >= 1) return null;
        const x = (1 - p) * width;
        return (
          <div
            key={k}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: x - 160,
              width: 320,
              background: "linear-gradient(90deg, rgba(212,175,55,0) 0%, rgba(231,215,162,0.55) 42%, rgba(255,248,226,0.95) 50%, rgba(231,215,162,0.55) 58%, rgba(212,175,55,0) 100%)",
              mixBlendMode: "screen",
              filter: "blur(6px)",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
