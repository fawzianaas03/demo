import React from "react";
import { Scene01Light } from "./Scene01Light";
import { Scene02Bridges } from "./Scene02Bridges";
import { Scene03Reveal } from "./Scene03Reveal";
import { Scene04Learning } from "./Scene04Learning";
import { Scene05Programs } from "./Scene05Programs";
import { Scene06Generations } from "./Scene06Generations";
import { Scene07Online } from "./Scene07Online";
import { Scene08Closing } from "./Scene08Closing";
import { Scene09CallToAction } from "./Scene09CallToAction";

export const SCENE_COMPONENTS: { id: string; component: React.FC }[] = [
  { id: "S01", component: Scene01Light },
  { id: "S02", component: Scene02Bridges },
  { id: "S03", component: Scene03Reveal },
  { id: "S04", component: Scene04Learning },
  { id: "S05", component: Scene05Programs },
  { id: "S06", component: Scene06Generations },
  { id: "S07", component: Scene07Online },
  { id: "S08", component: Scene08Closing },
  { id: "S09", component: Scene09CallToAction },
];
