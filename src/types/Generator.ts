import { Identified } from "./utils/Identified";

export interface GeneratorDescription {
  name: string, code: string
}

export type Generator = GeneratorDescription & Identified;