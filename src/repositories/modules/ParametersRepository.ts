import { Parameter } from "../../types/modules/Parameter";
import { Repository } from "../utils/Repository";

export class ParametersRepository extends Repository<Parameter> {
  /**
   * This override is here to avoid updating any other parameter
   * @param parameter 
   * @param token 
   * @returns 
   */
  public override async update(parameter: Parameter, token: string): Promise<Parameter> {
    return super.update(parameter, token, [ 'id', 't', 'value' ]);
  }
}