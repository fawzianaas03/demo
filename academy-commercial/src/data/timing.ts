import React, { createContext, useContext } from "react";
import { useCurrentFrame } from "remotion";
import timeline from "./timeline.json";

export const FPS = timeline.fps;
export const TOTAL_FRAMES = Math.round(timeline.durationInSeconds * FPS);
/** Cross-dissolve length: each scene starts this many frames before its nominal start. */
export const TRANSITION = Math.round(timeline.transitionSeconds * FPS);

export const sec = (s: number) => Math.round(s * FPS);

export type SceneId = (typeof timeline.scenes)[number]["id"];

export const sceneWindow = (id: string) => {
  const s = timeline.scenes.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown scene ${id}`);
  const lead = s.start === 0 ? 0 : TRANSITION;
  const from = sec(s.start) - lead;
  return { from, lead, durationInFrames: sec(s.end) - from, length: sec(s.end) - sec(s.start) };
};

export const NARRATION = timeline.narration;
export const SCENES = timeline.scenes;

const LeadContext = createContext(TRANSITION);
export const SceneLead = LeadContext.Provider;

/** Frame relative to the scene's nominal start (negative during the incoming dissolve). */
export const useSceneFrame = () => useCurrentFrame() - useContext(LeadContext);

export const withLead = (lead: number, child: React.ReactNode) =>
  React.createElement(SceneLead, { value: lead }, child);
