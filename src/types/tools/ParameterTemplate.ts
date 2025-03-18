import { Identified } from "../utils/Identified";

export type ParameterTemplate = Identified & {
  default: number
  field: string
  maximum: number
  minimum: number
  precision: number
  step: number
  targets: string[]
}