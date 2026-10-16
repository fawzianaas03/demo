import React from "react";
import { AbsoluteFill, Img, random, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../styles/theme";

const GRAIN_TILE = 384;

/**
 * Animated film grain: a grid of noise tiles shifted to a new random offset
 * every frame. <Img> (not a CSS background) so rendering waits for the tile.
 */
export const FilmGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const x = Math.floor(random(`grain-x-${frame}`) * GRAIN_TILE);
  const y = Math.floor(random(`grain-y-${frame}`) * GRAIN_TILE);
  const cols = Math.ceil(width / GRAIN_TILE) + 1;
  const rows = Math.ceil(height / GRAIN_TILE) + 1;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none", overflow: "hidden" }}>
      <div style={{ position: "absolute", left: -x, top: -y, width: cols * GRAIN_TILE, display: "flex", flexWrap: "wrap" }}>
        {new Array(cols * rows).fill(0).map((_, i) => (
          <Img key={i} src={staticFile("assets/grain.png")} style={{ width: GRAIN_TILE, height: GRAIN_TILE, display: "block" }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.7 }) => (
  <AbsoluteFill
    style={{
      background: `radial-gradient(ellipse 78% 72% at 50% 50%, rgba(0,0,0,0) 48%, rgba(1,8,6,${strength}) 100%)`,
      pointerEvents: "none",
    }}
  />
);

type ParticleProps = {
  count?: number;
  seed?: string;
  minSize?: number;
  maxSize?: number;
  /** Upward drift in px per frame. */
  speed?: number;
  opacity?: number;
  /** Region as fractions of the frame. */
  area?: { x: number; y: number; w: number; h: number };
  warm?: boolean;
};

/** Slow, twinkling gold dust — deterministic per seed. */
export const GoldParticles: React.FC<ParticleProps> = ({
  count = 60,
  seed = "dust",
  minSize = 2,
  maxSize = 9,
  speed = 0.35,
  opacity = 0.8,
  area = { x: 0, y: 0, w: 1, h: 1 },
  warm = false,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const W = area.w * width;
  const H = area.h * height;
  const core = warm ? "255,226,170" : "255,236,190";
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const size = minSize + (maxSize - minSize) * Math.pow(r("s"), 2.2);
        const v = speed * (0.4 + r("v"));
        const travel = H + 80;
        const y = area.y * height + ((((r("y") * travel - frame * v) % travel) + travel) % travel) - 40;
        const x = area.x * width + r("x") * W + Math.sin(frame / (50 + 70 * r("p")) + r("q") * 6.28) * 18;
        const twinkle = 0.45 + 0.55 * Math.abs(Math.sin(frame / (18 + 30 * r("t")) + r("o") * 6.28));
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              marginLeft: -size / 2,
              marginTop: -size / 2,
              borderRadius: "50%",
              opacity: opacity * twinkle * (size > maxSize * 0.6 ? 0.55 : 1),
              background: `radial-gradient(circle, rgba(${core},1) 0%, rgba(212,175,55,0.55) 38%, rgba(212,175,55,0) 70%)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

type RayProps = {
  /** Source point in px. */
  x: number;
  y: number;
  /** Direction of the beam in degrees (0 = right, 90 = down). */
  angle: number;
  spread?: number;
  length?: number;
  count?: number;
  intensity?: number;
  color?: string;
  seed?: string;
};

/** Soft volumetric light shafts, slowly breathing. */
export const LightRays: React.FC<RayProps> = ({
  x,
  y,
  angle,
  spread = 26,
  length = 2200,
  count = 7,
  intensity = 0.5,
  color = COLORS.warmLight,
  seed = "rays",
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const id = `ray-grad-${seed}`;
  return (
    <svg
      width={width}
      height={height}
      style={{ position: "absolute", inset: 0, mixBlendMode: "screen", filter: "blur(14px)", pointerEvents: "none" }}
    >
      <defs>
        <radialGradient id={id} cx={x} cy={y} r={length} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity={0.95} />
          <stop offset="45%" stopColor={color} stopOpacity={0.35} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </radialGradient>
      </defs>
      {new Array(count).fill(0).map((_, i) => {
        const r = (k: string) => random(`${seed}-${i}-${k}`);
        const a = ((angle + (i / Math.max(1, count - 1) - 0.5) * spread + (r("a") - 0.5) * 4) * Math.PI) / 180;
        const w = ((0.8 + r("w") * 2.2) * Math.PI) / 180;
        const p1 = [x + Math.cos(a - w) * length, y + Math.sin(a - w) * length];
        const p2 = [x + Math.cos(a + w) * length, y + Math.sin(a + w) * length];
        const breathe = 0.55 + 0.45 * Math.sin(frame / (40 + r("f") * 50) + r("p") * 6.28);
        return (
          <polygon
            key={i}
            points={`${x},${y} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`}
            fill={`url(#${id})`}
            opacity={intensity * breathe}
          />
        );
      })}
    </svg>
  );
};
