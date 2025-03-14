import { Parameter } from "./Parameter"
import { PolyphonyVoice } from "./PolyphonyVoice"

export type AudioModule = {
  parameter: Parameter[]
  voices: PolyphonyVoice[]
}