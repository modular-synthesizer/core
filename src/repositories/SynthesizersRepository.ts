import type { Requestable } from "../network/Api";
import type { Synthesizer, SynthesizerDescription } from "../types/Synthesizer";
import { Repository } from "./utils/Repository";

/**
 * This repository allows the querying of synthesizers. It does NOT however link any other resource
 * (eg cables or modules) to the provided synthesizer as it is supposed to be done in another layer
 * of services orchestrating the repositories correctly.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class SynthesizersRepository extends Repository<Synthesizer, SynthesizerDescription> {
  public constructor(api: Requestable) {
    super('synthesizers', api);
  }
  
  /**
   * This method forbids any further user to update unnecessary fields on the synthesizer other than
   * its coordinates and zoom factor.
   * 
   * @param synthesizer The synthesizer to update the coordinates from.
   * @returns the updated synthesizer after API query.
   */
  public async update(synthesizer: Synthesizer, token: string): Promise<Synthesizer> {
    return super.update(synthesizer, token, ['scale', 'x', 'y']);
  }
}