import { clamp } from "../../functions/maths/clamp";
import { Parameter } from "../../types";
import { PolyphonyVoice } from "../../types/modules/PolyphonyVoice";

export class ParametersService {
  private readonly context: AudioContext;
  public constructor(context: AudioContext) {
    this.context = context;
  }

  public update(parameter: Parameter, value: number) {
    parameter.value = clamp(value, parameter.minimum, parameter.maximum);
    this.getTargettedNodes(parameter).forEach((node: AudioNode) => {
      const audioParam: AudioParam = this.getAudioParam(node, parameter.field);
      audioParam.setValueAtTime(parameter.value, this.context.currentTime);
    });
  }

  /**
   * Gets the nodes targetted by a given synple parameter so that it can update them.
   * @param parameter the parameter targetting the nodes.
   * @returns a set of web audio API AudioNode instances to set the value from the parameter.
   */
  public getTargettedNodes(parameter: Parameter): AudioNode[] {
    const results: AudioNode[] = [];
    parameter.targets.forEach((target: string) => {
      parameter.module.voices.forEach((voice: PolyphonyVoice) => {
        if(voice.nodes.hasOwnProperty(target)) {
          results.push(voice.nodes[target]);
        }
      });
    });
    return results;
  }

  public getAudioParam(node: AudioNode, field: string): AudioParam {
    return (node instanceof AudioWorkletNode) ? node.parameters.get(field) : node[field];
  }
}