import { Identified } from "./utils/Identified";

export type GeneratorDescription = {
  name: string, code: string
};

export type Generator = GeneratorDescription & Identified;