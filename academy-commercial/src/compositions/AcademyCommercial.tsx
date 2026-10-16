import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, interpolate, Sequence, staticFile, useCurrentFrame } from "remotion";
import { Captions } from "../components/Captions";
import { AUDIO } from "../data/audio";
import { FPS, NARRATION, sceneWindow, TOTAL_FRAMES, withLead } from "../data/timing";
import { SCENE_COMPONENTS } from "../scenes";

export type CommercialProps = { showCaptions: boolean };
// Remotion requires composition props to be a plain record type.
export type CommercialRecord = CommercialProps & Record<string, unknown>;

const SceneFadeIn: React.FC<{ frames: number; children: React.ReactNode }> = ({ frames, children }) => {
  const frame = useCurrentFrame();
  const opacity = frames === 0 ? 1 : interpolate(frame, [0, frames], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return <AbsoluteFill style={{ opacity }}>{children}</AbsoluteFill>;
};

const voiced = AUDIO.voiceoverMode !== "none";

/** Ambience/SFX bed, ducked under narration when narration is present. */
const bedVolume = (frame: number) => {
  if (!voiced) return AUDIO.bedVolumeNoVoice;
  const t = frame / FPS;
  const near = NARRATION.some((l) => t >= l.start - 0.4 && t <= l.end + 0.4);
  const fade = NARRATION.reduce((v, l) => {
    const d = Math.min(Math.abs(t - (l.start - 0.4)), Math.abs(t - (l.end + 0.4)));
    return Math.min(v, d);
  }, 1);
  const base = near ? AUDIO.bedVolumeUnderVoice : AUDIO.bedVolumeNoVoice;
  const other = near ? AUDIO.bedVolumeNoVoice : AUDIO.bedVolumeUnderVoice;
  return interpolate(Math.min(fade, 0.4), [0, 0.4], [(base + other) / 2, base]);
};

export const AcademyCommercial: React.FC<CommercialRecord> = ({ showCaptions }) => (
  <AbsoluteFill style={{ background: "#000" }}>
    {SCENE_COMPONENTS.map(({ id, component: Scene }) => {
      const w = sceneWindow(id);
      return (
        <Sequence key={id} name={id} from={w.from} durationInFrames={w.durationInFrames}>
          <SceneFadeIn frames={w.lead}>{withLead(w.lead, <Scene />)}</SceneFadeIn>
        </Sequence>
      );
    })}
    {showCaptions && <Captions />}
    <Audio src={staticFile(AUDIO.ambience)} volume={bedVolume} />
    <Audio src={staticFile(AUDIO.sfx)} volume={bedVolume} />
    {AUDIO.voiceoverMode === "full" && <Audio src={staticFile(`audio/voiceover/full.${AUDIO.voiceoverExtension}`)} />}
    {AUDIO.voiceoverMode === "lines" &&
      NARRATION.map((l) => (
        <Sequence key={l.id} name={l.id} from={Math.round(l.start * FPS)}>
          <Audio src={staticFile(`audio/voiceover/${l.id}.${AUDIO.voiceoverExtension}`)} />
        </Sequence>
      ))}
  </AbsoluteFill>
);

export const COMMERCIAL_DURATION = TOTAL_FRAMES;
