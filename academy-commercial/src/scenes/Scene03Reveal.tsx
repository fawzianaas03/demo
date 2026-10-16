import React from "react";
import { AbsoluteFill } from "remotion";
import { LightRays } from "../components/Atmosphere";
import { LogoMedallion } from "../components/Brand";
import { GoldDivider } from "../components/Geometry";
import { ArabicLine, GoldText } from "../components/GoldText";
import { EmeraldStage } from "../components/Stage";
import { ACADEMY } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

/** 00:20–00:31 — lattice draws itself, the emblem rings in, the name is unveiled in gold. */
export const Scene03Reveal: React.FC = () => {
  const f = useSceneFrame();
  const { width, height, portrait } = useLayout();
  const push = tween(f, [0, sec(11)], [1, 1.05], (t) => t);
  const titleReveal = tween(f, [sec(2.0), sec(4.0)], [0, 1], EASE_IN_OUT);
  const shine = tween(f, [sec(5.2), sec(7.4)], [0, 1], EASE_IN_OUT);
  const titleSize = portrait ? 118 : 104;
  const titleLines = portrait ? ACADEMY.nameLines : [ACADEMY.name];
  return (
    <EmeraldStage
      seed="s3"
      pattern={0.2}
      patternDraw={tween(f, [-sec(0.5), sec(3)], [0, 1], EASE_IN_OUT)}
      patternReveal={tween(f, [-sec(0.5), sec(3.2)], [0, 1.2], EASE_OUT)}
    >
      <AbsoluteFill style={{ opacity: tween(f, [0, sec(2)], [0, 1]) }}>
        <LightRays x={width / 2} y={portrait ? 560 : 260} angle={90} spread={360} count={14} length={portrait ? 1400 : 1100} intensity={0.14} seed="s3-rays" />
      </AbsoluteFill>
      <AbsoluteFill style={{ scale: String(push), alignItems: "center", justifyContent: "center", flexDirection: "column", gap: portrait ? 28 : 14 }}>
        <div style={{ marginBottom: portrait ? 40 : 18 }}>
          <LogoMedallion
            size={portrait ? 360 : 270}
            ring={tween(f, [sec(0.2), sec(1.8)], [0, 1], EASE_IN_OUT)}
            reveal={tween(f, [sec(0.8), sec(2.0)], [0, 1], EASE_OUT)}
            glow={tween(f, [sec(0.8), sec(2.4)], [0, 1])}
          />
        </div>
        {titleLines.map((line, i) => (
          <GoldText
            key={line}
            text={line}
            size={titleSize}
            reveal={tween(f, [sec(2.0 + i * 0.5), sec(4.0 + i * 0.5)], [0, 1], EASE_IN_OUT)}
            shine={shine}
            lineHeight={portrait ? 1.35 : 1.5}
            style={{ marginTop: i > 0 ? -20 : 0, opacity: titleReveal > 0 ? 1 : 0 }}
          />
        ))}
        <GoldDivider width={portrait ? 700 : 820} progress={tween(f, [sec(3.8), sec(5.0)], [0, 1], EASE_IN_OUT)} />
        <ArabicLine
          text={ACADEMY.leadership}
          size={portrait ? 50 : 46}
          font={FONTS.heading}
          weight={600}
          color={COLORS.champagne}
          style={{ opacity: tween(f, [sec(4.4), sec(5.4)], [0, 1]), translate: `0px ${tween(f, [sec(4.4), sec(5.6)], [24, 0], EASE_OUT)}px` }}
        />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, rgba(255,240,200,0.9), rgba(255,240,200,0) 60%)", opacity: tween(f, [0, sec(0.25)], [0, 0.55]) * tween(f, [sec(0.25), sec(1.4)], [1, 0]), mixBlendMode: "screen", height }} />
    </EmeraldStage>
  );
};
