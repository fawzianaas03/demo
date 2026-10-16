import React, { useId } from "react";
import { COLORS } from "../styles/theme";

// Islamic geometry primitives. The star-and-cross tessellation uses 8-point
// stars whose axis points touch at tile edges, leaving the classic crosses
// between them.

const starPoints = (cx: number, cy: number, outer: number, inner: number) => {
  const pts: string[] = [];
  for (let k = 0; k < 16; k++) {
    const r = k % 2 === 0 ? outer : inner;
    const a = (k * 22.5 * Math.PI) / 180;
    pts.push(`${(cx + Math.cos(a) * r).toFixed(2)},${(cy + Math.sin(a) * r).toFixed(2)}`);
  }
  return pts.join(" ");
};

/** Eight-point star outline (khatam) as a polygon `points` string. */
export const khatam = (cx: number, cy: number, r: number) => starPoints(cx, cy, r, r * 0.7654);

type PatternProps = {
  tile?: number;
  stroke?: string;
  strokeWidth?: number;
  /** 0–1: how much of each line is drawn. */
  draw?: number;
  opacity?: number;
  width: number;
  height: number;
  offsetX?: number;
  offsetY?: number;
  rotate?: number;
  detail?: boolean;
  style?: React.CSSProperties;
};

/** Seamless star-and-cross lattice. */
export const StarPattern: React.FC<PatternProps> = ({
  tile = 160,
  stroke = COLORS.gold,
  strokeWidth = 1.4,
  draw = 1,
  opacity = 1,
  width,
  height,
  offsetX = 0,
  offsetY = 0,
  rotate = 0,
  detail = true,
  style,
}) => {
  const id = useId().replace(/:/g, "");
  const c = tile / 2;
  const dash = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg width={width} height={height} style={{ position: "absolute", left: 0, top: 0, opacity, ...style }}>
      <defs>
        <pattern
          id={`p-${id}`}
          width={tile}
          height={tile}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(${offsetX} ${offsetY}) rotate(${rotate} ${width / 2} ${height / 2})`}
        >
          <g fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
            <polygon points={khatam(c, c, tile / 2)} {...dash} />
            {detail && <polygon points={khatam(c, c, tile * 0.27)} {...dash} />}
            {detail && <circle cx={c} cy={c} r={tile * 0.09} {...dash} />}
            {detail && (
              <polygon points={starPoints(0, 0, tile * 0.16, tile * 0.07)} {...dash} />
            )}
            {detail && (
              <polygon points={starPoints(tile, tile, tile * 0.16, tile * 0.07)} {...dash} />
            )}
            {detail && (
              <polygon points={starPoints(tile, 0, tile * 0.16, tile * 0.07)} {...dash} />
            )}
            {detail && (
              <polygon points={starPoints(0, tile, tile * 0.16, tile * 0.07)} {...dash} />
            )}
          </g>
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#p-${id})`} />
    </svg>
  );
};

/** Pointed (Islamic) arch path for a box of w × h. */
export const archPath = (w: number, h: number, x = 0, y = 0) => {
  const R = w * 0.8;
  const rise = Math.sqrt(w * R - (w * w) / 4);
  return `M ${x} ${y + h} L ${x} ${y + rise} A ${R} ${R} 0 0 1 ${x + w / 2} ${y} A ${R} ${R} 0 0 1 ${x + w} ${y + rise} L ${x + w} ${y + h} Z`;
};

/** A sixteen-petal rosette used as a medallion (shamsa). */
export const Rosette: React.FC<{
  size: number;
  stroke?: string;
  fill?: string;
  draw?: number;
  strokeWidth?: number;
}> = ({ size, stroke = COLORS.gold, fill = "none", draw = 1, strokeWidth = 1.5 }) => {
  const c = size / 2;
  const dash = { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  const petals = new Array(16).fill(0).map((_, k) => {
    const a = (k * 22.5 * Math.PI) / 180;
    const tip = [c + Math.cos(a) * c * 0.96, c + Math.sin(a) * c * 0.96];
    const l = [c + Math.cos(a - 0.2) * c * 0.62, c + Math.sin(a - 0.2) * c * 0.62];
    const rr = [c + Math.cos(a + 0.2) * c * 0.62, c + Math.sin(a + 0.2) * c * 0.62];
    return `M ${l[0]} ${l[1]} Q ${tip[0]} ${tip[1]} ${rr[0]} ${rr[1]}`;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <g fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
        {petals.map((d, i) => (
          <path key={i} d={d} {...dash} fill="none" />
        ))}
        <polygon points={khatam(c, c, c * 0.6)} {...dash} />
        <polygon points={khatam(c, c, c * 0.38)} {...dash} />
        <circle cx={c} cy={c} r={c * 0.16} {...dash} />
      </g>
    </svg>
  );
};

/** Gold hairline with a diamond at its centre, drawing out from the middle. */
export const GoldDivider: React.FC<{ width: number; progress: number; opacity?: number }> = ({
  width,
  progress,
  opacity = 1,
}) => {
  const id = useId().replace(/:/g, "");
  const half = (width / 2 - 14) * progress;
  return (
    <svg width={width} height={20} style={{ overflow: "visible", opacity }}>
      <defs>
        {/* userSpaceOnUse: a bounding-box gradient on a zero-height line would not paint. */}
        <linearGradient id={`divider-${id}`} gradientUnits="userSpaceOnUse" x1={0} x2={width} y1={0} y2={0}>
          <stop offset="0" stopColor={COLORS.gold} stopOpacity={0} />
          <stop offset="0.5" stopColor={COLORS.champagne} stopOpacity={1} />
          <stop offset="1" stopColor={COLORS.gold} stopOpacity={0} />
        </linearGradient>
      </defs>
      <line x1={width / 2 - 14 - half} x2={width / 2 - 14} y1={10} y2={10} stroke={`url(#divider-${id})`} strokeWidth={1.5} />
      <line x1={width / 2 + 14} x2={width / 2 + 14 + half} y1={10} y2={10} stroke={`url(#divider-${id})`} strokeWidth={1.5} />
      <polygon
        points={khatam(width / 2, 10, 8 * Math.min(1, progress * 3))}
        fill={COLORS.gold}
        stroke={COLORS.champagne}
        strokeWidth={0.6}
      />
    </svg>
  );
};
