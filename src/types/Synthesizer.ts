import { Membership } from "./Membership";
import { Identified } from "./utils/Identified"

export type SynthesizerDescription = {
  name: string,
  voices: number,
  x: number,
  y: number,
  scale: number,
  members: Array<Membership>
};

export type Synthesizer = Identified & SynthesizerDescription;