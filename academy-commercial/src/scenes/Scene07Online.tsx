import React from "react";
import { AbsoluteFill, random } from "remotion";
import { LightRays } from "../components/Atmosphere";
import { PaperPlane } from "../components/Brand";
import { GoldDivider } from "../components/Geometry";
import { ArabicLine, GoldText } from "../components/GoldText";
import { PhoneMockup } from "../components/PhoneMockup";
import { EmeraldStage } from "../components/Stage";
import { ONLINE } from "../data/academy";
import { sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, envelope, tween } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

const FREE_AT = 6.6;

/** 01:08–01:19 — learning from anywhere on Telegram, then the free-enrolment announcement. */
export const Scene07Online: React.FC = () => {
  const f = useSceneFrame();
  const { width, height, portrait } = useLayout();
  const phaseOne = envelope(f, -sec(0.75), 0, sec(5.4), sec(6.2));
  const float = Math.sin(f / 26) * 8;
  const msgs = [1.0, 1.6, 2.2, 2.8].map((t) => tween(f, [sec(t), sec(t + 0.5)], [0, 1], EASE_OUT));
  const freeIn = tween(f, [sec(FREE_AT), sec(FREE_AT + 1.2)], [0, 1], EASE_OUT);

  return (
    <EmeraldStage seed="s7" pattern={0.09}>
      {/* Phase 1: phone + platform */}
      <AbsoluteFill style={{ opacity: phaseOne, flexDirection: portrait ? "column" : "row-reverse", alignItems: "center", justifyContent: portrait ? "flex-start" : "center", paddingTop: portrait ? 170 : 0, gap: portrait ? 40 : 160 }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, order: portrait ? 2 : 0 }}>
          <div style={{ opacity: tween(f, [sec(0.4), sec(1.2)], [0, 1]), scale: String(tween(f, [sec(0.4), sec(1.4)], [0.6, 1], EASE_OUT)), rotate: `${tween(f, [sec(0.4), sec(1.6)], [-20, 0], EASE_OUT)}deg`, marginBottom: 8 }}>
            <PaperPlane size={portrait ? 80 : 104} />
          </div>
          <GoldText text={ONLINE.first} size={portrait ? 104 : 110} reveal={tween(f, [sec(0.8), sec(2.2)], [0, 1], EASE_IN_OUT)} shine={tween(f, [sec(2.6), sec(4.4)], [0, 1])} />
          <GoldDivider width={480} progress={tween(f, [sec(1.8), sec(2.8)], [0, 1], EASE_IN_OUT)} />
          <ArabicLine text={ONLINE.second} size={portrait ? 56 : 54} font={FONTS.heading} weight={600} style={{ opacity: tween(f, [sec(2.2), sec(3)], [0, 1]), translate: `0px ${tween(f, [sec(2.2), sec(3.2)], [20, 0], EASE_OUT)}px` }} />
        </div>
        <div style={{ perspective: 1800, translate: `0px ${float + tween(f, [-sec(0.75), sec(1.2)], [80, 0], EASE_OUT)}px` }}>
          <div style={{ transform: `rotateY(${portrait ? 0 : 14}deg) rotateX(4deg)`, transformStyle: "preserve-3d" }}>
            <PhoneMockup width={portrait ? 360 : 390} messages={msgs} />
          </div>
        </div>
      </AbsoluteFill>
      {/* Phase 2: free for everyone */}
      <AbsoluteFill style={{ opacity: freeIn }}>
        <LightRays x={width / 2} y={height / 2} angle={0} spread={360} count={18} length={portrait ? 1300 : 1200} intensity={0.22} seed="s7-rays" />
      </AbsoluteFill>
      {f > sec(FREE_AT) &&
        new Array(70).fill(0).map((_, i) => {
          const r = (k: string) => random(`burst-${i}-${k}`);
          const t = (f - sec(FREE_AT)) / sec(3.4);
          if (t > 1) return null;
          const a = r("a") * Math.PI * 2;
          const d = EASE_OUT(t) * (200 + r("d") * (portrait ? 520 : 760));
          const size = 3 + r("s") * 7;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: width / 2 + Math.cos(a) * d * (portrait ? 0.8 : 1.3) - size / 2,
                top: height / 2 + Math.sin(a) * d * 0.7 - size / 2,
                width: size,
                height: size,
                borderRadius: "50%",
                background: "radial-gradient(circle, #FFF3D0 0%, rgba(212,175,55,0.6) 45%, rgba(212,175,55,0) 70%)",
                opacity: (1 - t) * 0.9,
              }}
            />
          );
        })}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: freeIn }}>
        <ArabicLine text={ONLINE.freeLead} size={portrait ? 54 : 50} font={FONTS.heading} weight={600} color={COLORS.champagne} style={{ translate: `0px ${(1 - freeIn) * 20}px` }} />
        <div style={{ scale: String(tween(f, [sec(FREE_AT), sec(FREE_AT + 1.6)], [1.12, 1], EASE_OUT)) }}>
          <GoldText text={ONLINE.free} size={portrait ? 160 : 190} reveal={tween(f, [sec(FREE_AT + 0.1), sec(FREE_AT + 1.1)], [0, 1], EASE_IN_OUT)} shine={tween(f, [sec(FREE_AT + 1.4), sec(FREE_AT + 3.2)], [0, 1], EASE_IN_OUT)} />
        </div>
        <GoldDivider width={portrait ? 640 : 760} progress={tween(f, [sec(FREE_AT + 0.8), sec(FREE_AT + 1.8)], [0, 1], EASE_IN_OUT)} />
      </AbsoluteFill>
    </EmeraldStage>
  );
};
