import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useLayout } from "../hooks/useLayout";
import { EMERALD_BG } from "../styles/theme";
import { FilmGrain, GoldParticles, Vignette } from "./Atmosphere";
import { StarPattern } from "./Geometry";

/** Shared emerald set: deep gradient, faint drifting lattice, dust, vignette and grain. */
export const EmeraldStage: React.FC<{
  children?: React.ReactNode;
  pattern?: number;
  patternDraw?: number;
  /** 0–1 radius of a radial reveal mask on the lattice. */
  patternReveal?: number;
  particles?: number;
  seed?: string;
}> = ({ children, pattern = 0.12, patternDraw = 1, patternReveal = 1, particles = 40, seed = "stage" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useLayout();
  const r = patternReveal * 75;
  const mask = patternReveal >= 1 ? undefined : `radial-gradient(circle at 50% 50%, #000 ${r}%, transparent ${r + 18}%)`;
  return (
    <AbsoluteFill style={{ background: EMERALD_BG, overflow: "hidden" }}>
      <AbsoluteFill style={{ WebkitMaskImage: mask, maskImage: mask }}>
        <StarPattern width={width} height={height} tile={180} draw={patternDraw} opacity={pattern} offsetX={-frame * 0.15} offsetY={-frame * 0.08} />
      </AbsoluteFill>
      <GoldParticles count={particles} seed={seed} speed={0.25} opacity={0.6} />
      {children}
      <Vignette strength={0.62} />
      <FilmGrain />
    </AbsoluteFill>
  );
};
