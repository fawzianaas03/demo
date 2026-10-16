import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { FPS, NARRATION } from "../data/timing";
import { useLayout } from "../hooks/useLayout";
import { envelope } from "../styles/anim";
import { COLORS, FONTS } from "../styles/theme";

/**
 * Burned-in narration captions for sound-off viewing. Lines already written
 * on screen as typography (onScreen: true) are skipped to avoid doubling.
 */
export const Captions: React.FC = () => {
  const frame = useCurrentFrame();
  const { portrait, width } = useLayout();
  const t = frame / FPS;
  const line = NARRATION.find((l) => !l.onScreen && t >= l.start - 0.3 && t <= l.end + 0.5);
  if (!line) return null;
  const o = envelope(frame, (line.start - 0.3) * FPS, line.start * FPS, line.end * FPS, (line.end + 0.5) * FPS);
  return (
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: portrait ? 150 : 46, pointerEvents: "none" }}>
      <div
        dir="rtl"
        lang="ar"
        style={{
          opacity: o,
          maxWidth: portrait ? width - 140 : 1380,
          padding: portrait ? "14px 28px" : "10px 30px",
          borderRadius: 14,
          background: "linear-gradient(90deg, rgba(3,20,15,0) 0%, rgba(3,20,15,0.62) 12%, rgba(3,20,15,0.62) 88%, rgba(3,20,15,0) 100%)",
          fontFamily: FONTS.body,
          fontWeight: 500,
          fontSize: portrait ? 42 : 36,
          lineHeight: 1.55,
          color: COLORS.ivory,
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.7)",
        }}
      >
        {line.text}
      </div>
    </AbsoluteFill>
  );
};
