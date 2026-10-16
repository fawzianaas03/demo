import React from "react";
import { ProgramIconName } from "../data/academy";
import { COLORS, FONTS } from "../styles/theme";
import { khatam } from "./Geometry";

/** Gold line icons for the program cards (64×64 grid). */
export const ProgramIcon: React.FC<{ name: ProgramIconName; size: number; draw?: number }> = ({ name, size, draw = 1 }) => {
  const s = { fill: "none", stroke: COLORS.gold, strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw };
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" style={{ overflow: "visible" }}>
      {name === "letters" && (
        <>
          <rect x={6} y={10} width={52} height={44} rx={6} {...s} />
          <text x={32} y={42} textAnchor="middle" direction="rtl" fontFamily={FONTS.display} fontWeight={700} fontSize={24} fill={COLORS.champagne} opacity={draw}>
            أ ب ت
          </text>
        </>
      )}
      {name === "tajweed" && (
        <>
          <circle cx={18} cy={32} r={6} {...s} />
          <path d="M 30 22 Q 36 32 30 42" {...s} />
          <path d="M 38 16 Q 48 32 38 48" {...s} />
          <path d="M 46 10 Q 60 32 46 54" {...s} />
        </>
      )}
      {name === "children" && (
        <>
          <path d="M 32 50 L 10 44 L 10 18 L 32 24 Z M 32 50 L 54 44 L 54 18 L 32 24 Z" {...s} />
          <polygon points={khatam(32, 10, 7)} {...s} />
        </>
      )}
      {name === "manuscript" && (
        <>
          <path d="M 14 12 L 46 12 Q 52 12 52 18 L 52 52 L 20 52 Q 14 52 14 46 Z" {...s} />
          <path d="M 14 12 Q 8 12 8 18 Q 8 22 14 22" {...s} />
          <path d="M 22 24 L 44 24 M 22 32 L 44 32 M 22 40 L 38 40" {...s} />
        </>
      )}
      {name === "lamp" && (
        <>
          <path d="M 32 4 L 32 10 M 22 18 L 32 10 L 42 18 Z" {...s} />
          <path d="M 22 18 L 18 40 L 32 54 L 46 40 L 42 18" {...s} />
          <path d="M 26 42 L 32 48 L 38 42 L 36 26 L 28 26 Z" {...s} />
          <path d="M 24 58 L 40 58" {...s} />
        </>
      )}
    </svg>
  );
};
