// Optional live-action footage. Every human vignette in the film is drawn as a
// back-lit silhouette inside an arch. To replace one with licensed or filmed
// footage, put the clip in public/footage/ and set its path here, e.g.
//   womanStudying: "footage/woman-studying.mp4",
// The clip is then cropped into the same arch, keeping the art direction.
// Leave a slot as null to keep the illustrated silhouette.

export type FootageSlotId =
  | "womanStudying"
  | "manReviewing"
  | "childWithParent"
  | "memorization"
  | "tabletLesson"
  | "youngAdultNotes"
  | "olderWomanReading"
  | "adultOnline";

export const FOOTAGE: Record<FootageSlotId, string | null> = {
  womanStudying: null,
  manReviewing: null,
  childWithParent: null,
  memorization: null,
  tabletLesson: null,
  youngAdultNotes: null,
  olderWomanReading: null,
  adultOnline: null,
};
