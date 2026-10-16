import { Easing, interpolate } from "remotion";

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN_OUT = Easing.bezier(0.65, 0, 0.35, 1);
export const EASE_SOFT = Easing.bezier(0.4, 0, 0.2, 1);

const CLAMP = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Clamped, eased interpolation (frame-based). */
export const tween = (
  frame: number,
  input: [number, number],
  output: [number, number],
  easing: (t: number) => number = EASE_OUT,
) => interpolate(frame, input, output, { ...CLAMP, easing });

/** 0 → 1 → 1 → 0 envelope: fades in over [a,b] and out over [c,d]. */
export const envelope = (
  frame: number,
  a: number,
  b: number,
  c: number,
  d: number,
  easing: (t: number) => number = EASE_SOFT,
) => Math.min(tween(frame, [a, b], [0, 1], easing), tween(frame, [c, d], [1, 0], easing));
