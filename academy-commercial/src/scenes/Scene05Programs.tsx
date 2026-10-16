import React from "react";
import { AbsoluteFill } from "remotion";
import { GoldDivider } from "../components/Geometry";
import { ArabicLine, GoldText } from "../components/GoldText";
import { ProgramIcon } from "../components/ProgramIcons";
import { EmeraldStage } from "../components/Stage";
import { PROGRAMS, PROGRAMS_FOOTER, PROGRAMS_TITLE } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

const FIRST = 1.0;
const STEP = 2.2;

/** 00:44–00:57 — each program is presented centre stage, then settles into the collection. */
export const Scene05Programs: React.FC = () => {
  const f = useSceneFrame();
  const { width, height, portrait } = useLayout();
  const card = portrait ? { w: 420, h: 300 } : { w: 304, h: 300 };
  const slot = (i: number) => {
    if (portrait) {
      const row = Math.floor(i / 2);
      const col = i % 2;
      const cx = i === 4 ? width / 2 : width / 2 + (col === 0 ? 1 : -1) * (card.w / 2 + 20);
      return { x: cx, y: 560 + row * (card.h + 40) };
    }
    const gap = 34;
    const total = PROGRAMS.length * card.w + (PROGRAMS.length - 1) * gap;
    return { x: width / 2 + total / 2 - card.w / 2 - i * (card.w + gap), y: 500 };
  };
  const centre = { x: width / 2, y: portrait ? height * 0.5 : 500 };
  const float = Math.sin(f / 30) * 6;

  return (
    <EmeraldStage seed="s5" pattern={0.1} particles={50}>
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div style={{ marginTop: portrait ? 230 : 120, opacity: tween(f, [0, sec(1)], [0, 1]), display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <ArabicLine text={PROGRAMS_TITLE} size={portrait ? 52 : 44} font={FONTS.heading} weight={700} color={COLORS.champagne} />
          <GoldDivider width={420} progress={tween(f, [sec(0.2), sec(1.4)], [0, 1], EASE_IN_OUT)} />
        </div>
      </AbsoluteFill>
      {PROGRAMS.map((p, i) => {
        const t = FIRST + i * STEP;
        const appear = tween(f, [sec(t - 0.2), sec(t + 0.5)], [0, 1], EASE_OUT);
        const settle = tween(f, [sec(t + 1.3), sec(t + 2.1)], [0, 1], EASE_IN_OUT);
        const s = slot(i);
        const x = centre.x + (s.x - centre.x) * settle;
        const y = centre.y + (s.y - centre.y) * settle;
        const scale = (1.35 - 0.35 * settle) * (0.9 + 0.1 * appear);
        if (appear <= 0) return null;
        return (
          <div
            key={p.name}
            style={{
              position: "absolute",
              left: x - card.w / 2,
              top: y - card.h / 2 + float * (i % 2 ? 1 : -1),
              width: card.w,
              height: card.h,
              scale: String(scale),
              opacity: appear,
              filter: `blur(${(1 - appear) * 8}px)`,
              borderRadius: 26,
              background: "linear-gradient(160deg, rgba(14,96,72,0.72) 0%, rgba(6,44,36,0.86) 60%, rgba(3,20,15,0.9) 100%)",
              boxShadow: `0 24px 50px rgba(0,0,0,0.45), inset 0 0 0 1.5px rgba(212,175,55,${0.35 + 0.4 * (1 - settle)}), inset 0 1px 0 rgba(255,240,200,0.25)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 14,
              zIndex: 10 - settle * 5,
            }}
          >
            <ProgramIcon name={p.icon} size={portrait ? 84 : 78} draw={tween(f, [sec(t), sec(t + 1)], [0, 1], EASE_IN_OUT)} />
            <GoldText text={p.name} size={portrait ? 58 : 50} lineHeight={1.4} />
          </div>
        );
      })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-end", paddingBottom: portrait ? 420 : 230 }}>
        <GoldText
          text={PROGRAMS_FOOTER}
          size={portrait ? 50 : 50}
          weight={400}
          color="champagne"
          wrap={portrait}
          maxWidth={portrait ? 900 : undefined}
          reveal={tween(f, [sec(11.6), sec(12.8)], [0, 1], EASE_IN_OUT)}
        />
      </AbsoluteFill>
    </EmeraldStage>
  );
};
