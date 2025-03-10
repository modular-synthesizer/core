import { Identified } from "./utils/Identified";

export type GeneratorDescription = {
  name: string, description: string
};

export type Generator = GeneratorDescription & Identified;