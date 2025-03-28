import { Membership } from "./Membership";
import { Identified } from "./utils/Identified"

export interface SynthesizerDescription {
  name: string,
  voices: number,
  x: number,
  y: number,
  scale: number,
  members: Membership[]
}

export type Synthesizer = Identified & SynthesizerDescription;