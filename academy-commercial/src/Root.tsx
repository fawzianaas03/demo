import "./styles/fonts";
import React from "react";
import { Composition, Folder } from "remotion";
import { AcademyCommercial, COMMERCIAL_DURATION } from "./compositions/AcademyCommercial";
import { VignetteSheet } from "./compositions/VignetteSheet";
import { FPS, sceneWindow, withLead } from "./data/timing";
import { SCENE_COMPONENTS } from "./scenes";

const RATIOS = {
  "16x9": { width: 1920, height: 1080 },
  "9x16": { width: 1080, height: 1920 },
} as const;

// Scene wrappers are created once so Studio keeps stable component identities.
const STANDALONE = SCENE_COMPONENTS.map(({ id, component: C }) => {
  const w = sceneWindow(id);
  const Wrapped: React.FC = () => <>{withLead(w.lead, <C />)}</>;
  return { id, Wrapped, durationInFrames: w.durationInFrames };
});

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Master film. 4K: render the 16:9 composition with --scale=2. */}
      <Composition
        id="AcademyCommercial"
        component={AcademyCommercial}
        fps={FPS}
        durationInFrames={COMMERCIAL_DURATION}
        {...RATIOS["16x9"]}
        defaultProps={{ showCaptions: true }}
      />
      <Composition
        id="AcademyCommercialVertical"
        component={AcademyCommercial}
        fps={FPS}
        durationInFrames={COMMERCIAL_DURATION}
        {...RATIOS["9x16"]}
        defaultProps={{ showCaptions: true }}
      />
      {(Object.keys(RATIOS) as (keyof typeof RATIOS)[]).map((ratio) => (
        <Folder key={ratio} name={`Scenes-${ratio}`}>
          {STANDALONE.map(({ id, Wrapped, durationInFrames }) => (
            <Composition key={id} id={`${id}-${ratio}`} component={Wrapped} fps={FPS} durationInFrames={durationInFrames} {...RATIOS[ratio]} />
          ))}
        </Folder>
      ))}
      <Folder name="Dev">
        <Composition id="VignetteSheet" component={VignetteSheet} fps={FPS} durationInFrames={48} width={1920} height={1180} />
      </Folder>
    </>
  );
};
