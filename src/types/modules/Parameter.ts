import { ParameterTemplate } from "../tools/ParameterTemplate"
import { Identified } from "../utils/Identified"

export type ParameterValue = Identified & {
  // The current value of the parameter, reflecting the current value of the AudioParams
  value: number
  // The timestamp of the last update operation on the parameter.
  t: number
}

export type Parameter = ParameterTemplate & ParameterValue