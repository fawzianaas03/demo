import React from "react";
import { AbsoluteFill } from "remotion";
import { ArchVignette, VignetteKind } from "../components/Vignette";
import { EMERALD_BG } from "../styles/theme";

const KINDS: VignetteKind[] = [
  "womanStudying",
  "manReviewing",
  "childWithParent",
  "memorization",
  "tabletLesson",
  "youngAdultNotes",
  "olderWomanReading",
  "adultOnline",
];

/** Dev contact sheet: every vignette side by side, for reviewing the illustrations. */
export const VignetteSheet: React.FC = () => (
  <AbsoluteFill style={{ background: EMERALD_BG, flexDirection: "row", flexWrap: "wrap", gap: 40, padding: 50, justifyContent: "center", alignContent: "center" }}>
    {KINDS.map((k) => (
      <ArchVignette key={k} kind={k} width={380} push={0.5} />
    ))}
  </AbsoluteFill>
);
