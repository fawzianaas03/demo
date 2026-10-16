import React from "react";
import { AbsoluteFill } from "remotion";
import { JoinCode, LogoMedallion, PaperPlane } from "../components/Brand";
import { GoldDivider } from "../components/Geometry";
import { ArabicLine, GoldText } from "../components/GoldText";
import { EmeraldStage } from "../components/Stage";
import { ACADEMY } from "../data/academy";
import { sceneWindow, sec, useSceneFrame } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { EASE_IN_OUT, EASE_OUT, tween } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

/** 01:25–01:32 — end screen: name, offer, slogan, call to action and the join code; fade to black. */
export const Scene09CallToAction: React.FC = () => {
  const f = useSceneFrame();
  const { portrait } = useLayout();
  const hasCode = Boolean(ACADEMY.telegramUrl || ACADEMY.qrImage);
  const step = (t: number) => ({
    opacity: tween(f, [sec(t), sec(t + 0.7)], [0, 1]),
    translate: `0px ${tween(f, [sec(t), sec(t + 0.9)], [18, 0], EASE_OUT)}px`,
  });
  // Fade to black over the scene's last 0.8 s, wherever timeline.json ends it.
  const { length } = sceneWindow("S09");
  const fadeOut = tween(f, [length - sec(0.8), length], [0, 1], EASE_IN_OUT);
  const pulse = 1 + 0.025 * Math.sin(Math.max(0, f - sec(3)) / 9);

  const column = (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: portrait ? 18 : 8 }}>
      <div style={{ marginBottom: portrait ? 18 : 6 }}>
        <LogoMedallion size={portrait ? 250 : 170} ring={tween(f, [-sec(0.5), sec(1)], [0, 1], EASE_IN_OUT)} reveal={tween(f, [-sec(0.3), sec(0.8)], [0, 1])} glow={0.7} />
      </div>
      {(portrait ? ACADEMY.nameLines : [ACADEMY.name]).map((line, i) => (
        <GoldText key={line} text={line} size={portrait ? 100 : 86} lineHeight={portrait ? 1.3 : 1.45} reveal={tween(f, [sec(0.1 + i * 0.3), sec(1.3 + i * 0.3)], [0, 1], EASE_IN_OUT)} shine={tween(f, [sec(2.4), sec(4.4)], [0, 1])} />
      ))}
      <ArabicLine text={ACADEMY.tagline} size={portrait ? 48 : 40} font={FONTS.heading} weight={600} color={COLORS.champagne} style={step(0.7)} />
      <div dir="rtl" style={{ display: "flex", alignItems: "center", gap: 22, ...step(1.1) }}>
        {ACADEMY.ctaFeatures.map((feat, i) => (
          <React.Fragment key={feat}>
            {i > 0 && <div style={{ width: 2, height: 34, background: COLORS.gold, opacity: 0.7 }} />}
            <div style={{ fontFamily: FONTS.heading, fontWeight: 700, fontSize: portrait ? 46 : 40, color: COLORS.ivory }}>{feat}</div>
          </React.Fragment>
        ))}
      </div>
      <GoldDivider width={portrait ? 620 : 560} progress={tween(f, [sec(1.4), sec(2.3)], [0, 1], EASE_IN_OUT)} />
      <GoldText text={ACADEMY.slogan} size={portrait ? 56 : 50} weight={400} color="ivory" depth reveal={tween(f, [sec(1.6), sec(2.8)], [0, 1], EASE_IN_OUT)} />
      <div
        dir="rtl"
        style={{
          ...step(2.6),
          scale: String(pulse),
          marginTop: portrait ? 24 : 12,
          display: "flex",
          alignItems: "center",
          gap: 18,
          padding: portrait ? "18px 54px" : "14px 48px",
          borderRadius: 999,
          background: "linear-gradient(180deg, #F6E7B0 0%, #D4AF37 55%, #B08A24 100%)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.6), 0 0 40px rgba(212,175,55,0.35)",
        }}
      >
        <span style={{ fontFamily: FONTS.heading, fontWeight: 800, fontSize: portrait ? 56 : 48, color: COLORS.forest, lineHeight: 1.4 }}>{ACADEMY.cta}</span>
        <PaperPlane size={portrait ? 50 : 44} color={COLORS.forest} />
      </div>
    </div>
  );

  return (
    <EmeraldStage seed="s9" pattern={0.12} particles={50}>
      <AbsoluteFill style={{ flexDirection: portrait ? "column" : "row-reverse", alignItems: "center", justifyContent: "center", gap: portrait ? 50 : 120 }}>
        {column}
        {hasCode && (
          <div style={{ ...step(2.2), display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <JoinCode size={portrait ? 300 : 320} />
          </div>
        )}
      </AbsoluteFill>
      <AbsoluteFill style={{ background: "#000", opacity: fadeOut, pointerEvents: "none" }} />
    </EmeraldStage>
  );
};
