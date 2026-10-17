import React from "react";
import { AbsoluteFill } from "remotion";
import { GoldText } from "../components/GoldText";
import { EmeraldStage } from "../components/Stage";
import { ArchVignette, VignetteKind } from "../components/Vignette";
import { GENERATIONS } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";

const PEOPLE: VignetteKind[] = ["childWithParent", "youngWomanNotes", "womanOnline", "olderWomanReading"];

/** 00:57–01:08 — women and children of every age, framed with equal dignity, on a slow lateral track. */
export const Scene06Generations: React.FC = () => {
  const f = useSceneFrame();
  const { width, portrait } = useLayout();
  const archW = portrait ? 420 : 340;
  const archH = (archW / 600) * 800;
  const gap = portrait ? 50 : 44;
  const track = tween(f, [-sec(0.75), sec(11)], portrait ? [0, 0] : [110, -110], (t) => t);
  const pos = (i: number) => {
    if (portrait) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      return { x: width / 2 + (col === 0 ? gap / 2 : -gap / 2 - archW), y: 200 + row * (archH + 90) };
    }
    const total = 4 * archW + 3 * gap;
    return { x: (width + total) / 2 - archW - i * (archW + gap), y: 150 };
  };
  return (
    <EmeraldStage seed="s6" pattern={0.08}>
      <AbsoluteFill style={{ translate: `${track}px 0px` }}>
        {PEOPLE.map((k, i) => {
          const a = tween(f, [sec(-0.4 + i * 0.55), sec(1.0 + i * 0.55)], [0, 1], EASE_OUT);
          const p = pos(i);
          return (
            <div key={k} style={{ position: "absolute", left: p.x, top: p.y, opacity: a, translate: `0px ${(1 - a) * 50}px` }}>
              <ArchVignette kind={k} width={archW} push={tween(f, [0, sec(11)], [0, 1], (t) => t)} border={tween(f, [sec(i * 0.55), sec(1.6 + i * 0.55)], [0, 1], EASE_IN_OUT)} />
            </div>
          );
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: portrait ? 190 : 70, gap: 0 }}>
        <GoldText text={GENERATIONS.first} size={portrait ? 80 : 74} reveal={tween(f, [sec(2.2), sec(3.6)], [0, 1], EASE_IN_OUT)} shine={tween(f, [sec(5), sec(7)], [0, 1])} />
        <GoldText text={GENERATIONS.second} size={portrait ? 80 : 74} weight={400} color="champagne" reveal={tween(f, [sec(4.4), sec(5.6)], [0, 1], EASE_IN_OUT)} style={{ marginTop: -14 }} />
      </AbsoluteFill>
    </EmeraldStage>
  );
};
