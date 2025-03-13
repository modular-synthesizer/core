import { ListService } from "./ListService";
import { Generator } from "../../types"
import { GeneratorsRepository } from "../../repositories";
import { Requestable } from "../../network/Api";
import { GeneratorDescription } from "../../types/Generator";

export class GeneratorsService extends ListService<Generator, GeneratorDescription> {
  public constructor(api: Requestable, token: string) {
    super(new GeneratorsRepository(api), token);
  }
}