import type { ParameterTemplate } from "../tools/ParameterTemplate";
import { AudioModule } from "./AudioModule";

export type Parameter = ParameterTemplate & {
  // The current value of the parameter to be edited by the user when turning knobs for example.
  value: number;

  module: AudioModule
}