import React, { useId } from "react";
import { COLORS } from "../styles/theme";
import { archPath, khatam } from "./Geometry";

/** Pointed-arch mashrabiya window glowing with sunlight. */
export const IslamicWindow: React.FC<{ width: number; height: number; glow?: number }> = ({ width, height, glow = 1 }) => {
  const id = useId().replace(/:/g, "");
  const tile = width / 4;
  const c = tile / 2;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={`clip-${id}`}>
          <path d={archPath(width - 24, height - 24, 12, 12)} />
        </clipPath>
        <radialGradient id={`sky-${id}`} cx="0.5" cy="0.38" r="0.75">
          <stop offset="0" stopColor="#FFFBEF" />
          <stop offset="0.35" stopColor="#FFE7B4" />
          <stop offset="0.7" stopColor="#F2B865" />
          <stop offset="1" stopColor="#B4702A" />
        </radialGradient>
        <pattern id={`lat-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#1a1107" strokeWidth={tile * 0.06} strokeLinejoin="round">
            <polygon points={khatam(c, c, c)} />
            <polygon points={khatam(c, c, c * 0.5)} />
          </g>
        </pattern>
      </defs>
      <g clipPath={`url(#clip-${id})`}>
        <rect width={width} height={height} fill={`url(#sky-${id})`} opacity={0.35 + 0.65 * glow} />
        <rect width={width} height={height} fill={`url(#lat-${id})`} />
      </g>
      <path d={archPath(width - 24, height - 24, 12, 12)} fill="none" stroke="#1a1107" strokeWidth={22} />
      <path d={archPath(width, height)} fill="none" stroke="#2c1d0e" strokeWidth={10} />
      <path d={archPath(width - 44, height - 44, 22, 22)} fill="none" stroke={COLORS.gold} strokeWidth={1.5} opacity={0.35 * glow} />
    </svg>
  );
};

/** The lattice's shadow projected onto a wall: a warm patch broken by dark star lines. */
export const CastLight: React.FC<{ width: number; height: number; intensity?: number; tile?: number }> = ({
  width,
  height,
  intensity = 1,
  tile = 150,
}) => {
  const id = useId().replace(/:/g, "");
  const c = tile / 2;
  return (
    <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0, overflow: "visible", mixBlendMode: "screen", filter: "blur(3px)" }}>
      <defs>
        <radialGradient id={`patch-${id}`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFC977" stopOpacity={0.75 * intensity} />
          <stop offset="0.6" stopColor="#E09A45" stopOpacity={0.35 * intensity} />
          <stop offset="1" stopColor="#E09A45" stopOpacity={0} />
        </radialGradient>
        <pattern id={`shadow-${id}`} width={tile} height={tile} patternUnits="userSpaceOnUse">
          <rect width={tile} height={tile} fill="white" />
          <g fill="none" stroke="black" strokeWidth={tile * 0.09}>
            <polygon points={khatam(c, c, c)} />
            <polygon points={khatam(c, c, c * 0.5)} />
          </g>
        </pattern>
        <mask id={`m-${id}`}>
          <rect width={width} height={height} fill={`url(#shadow-${id})`} />
        </mask>
      </defs>
      <ellipse cx={width / 2} cy={height / 2} rx={width / 2} ry={height / 2} fill={`url(#patch-${id})`} mask={`url(#m-${id})`} />
    </svg>
  );
};
