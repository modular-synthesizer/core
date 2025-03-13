import { ListService } from "./ListService";
import { Generator } from "../../types"
import { GeneratorsRepository } from "../../repositories";
import { Requestable } from "../../network/Api";

export class GeneratorsService extends ListService<Generator> {
  public constructor(api: Requestable, token: string) {
    super(new GeneratorsRepository(api), token);
  }
}