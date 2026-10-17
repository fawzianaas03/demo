// Optional live-action footage. The academy teaches women and children, so
// every vignette shows women or children. Each is drawn as a
// back-lit silhouette inside an arch. To replace one with licensed or filmed
// footage, put the clip in public/footage/ and set its path here, e.g.
//   womanStudying: "footage/woman-studying.mp4",
// The clip is then cropped into the same arch, keeping the art direction.
// Leave a slot as null to keep the illustrated silhouette.

export type FootageSlotId =
  | "womanStudying"
  | "childrenReading"
  | "childWithParent"
  | "womanMemorizing"
  | "tabletLesson"
  | "youngWomanNotes"
  | "olderWomanReading"
  | "womanOnline";

export const FOOTAGE: Record<FootageSlotId, string | null> = {
  womanStudying: null,
  childrenReading: null,
  childWithParent: null,
  womanMemorizing: null,
  tabletLesson: null,
  youngWomanNotes: null,
  olderWomanReading: null,
  womanOnline: null,
};
