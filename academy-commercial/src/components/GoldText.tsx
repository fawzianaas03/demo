import React from "react";
import { COLORS, FONTS, GOLD_GRADIENT } from "../styles/theme";

type Props = {
  text: string;
  size: number;
  font?: string;
  weight?: number;
  /** 0–1 right-to-left reveal (soft-edged mask). Whole words are never split, so letter joining is preserved. */
  reveal?: number;
  /** 0–1 position of the specular sweep; undefined = no sweep. */
  shine?: number;
  depth?: boolean;
  color?: "gold" | "ivory" | "champagne";
  style?: React.CSSProperties;
  lineHeight?: number;
  wrap?: boolean;
  maxWidth?: number;
};

/**
 * Arabic headline with optional gold fill, embossed depth and a moving
 * highlight. The text is always a single run in a dir="rtl" element, so the
 * browser's shaping engine joins the letters correctly.
 */
export const GoldText: React.FC<Props> = ({
  text,
  size,
  font = FONTS.display,
  weight = 700,
  reveal = 1,
  shine,
  depth = true,
  color = "gold",
  style,
  lineHeight = 1.55,
  wrap = false,
  maxWidth,
}) => {
  const feather = 22;
  const p = reveal * (100 + feather);
  const mask =
    reveal >= 1
      ? undefined
      : `linear-gradient(to left, #000 ${p - feather}%, transparent ${p}%)`;
  const fill =
    color === "gold"
      ? { backgroundImage: GOLD_GRADIENT, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
      : { color: color === "ivory" ? COLORS.ivory : COLORS.champagne };
  const common: React.CSSProperties = {
    fontFamily: font,
    fontWeight: weight,
    fontSize: size,
    lineHeight,
    padding: "0.08em 0.12em 0.18em",
    whiteSpace: wrap ? "normal" : "nowrap",
    textAlign: "center",
    maxWidth,
  };
  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        position: "relative",
        display: "inline-block",
        WebkitMaskImage: mask,
        maskImage: mask,
        ...style,
      }}
    >
      <div
        style={{
          ...common,
          ...fill,
          filter: depth
            ? color === "gold"
              ? "drop-shadow(0 2px 0 rgba(92,66,10,0.95)) drop-shadow(0 4px 2px rgba(0,0,0,0.35)) drop-shadow(0 14px 28px rgba(0,0,0,0.55))"
              : "drop-shadow(0 3px 10px rgba(0,0,0,0.55))"
            : undefined,
        }}
      >
        {text}
      </div>
      {shine !== undefined && (
        <div
          aria-hidden
          style={{
            ...common,
            position: "absolute",
            inset: 0,
            backgroundImage: `linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) ${shine * 140 - 30}%, rgba(255,250,230,0.9) ${shine * 140 - 20}%, rgba(255,255,255,0) ${shine * 140 - 10}%, rgba(255,255,255,0) 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            mixBlendMode: "screen",
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

/** Plain supporting Arabic line (Tajawal/Cairo), ivory or champagne. */
export const ArabicLine: React.FC<{
  text: string;
  size: number;
  font?: string;
  weight?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ text, size, font = FONTS.body, weight = 500, color = COLORS.ivory, style }) => (
  <div
    dir="rtl"
    lang="ar"
    style={{
      fontFamily: font,
      fontWeight: weight,
      fontSize: size,
      color,
      lineHeight: 1.6,
      textAlign: "center",
      textShadow: "0 2px 14px rgba(0,0,0,0.55)",
      ...style,
    }}
  >
    {text}
  </div>
);
