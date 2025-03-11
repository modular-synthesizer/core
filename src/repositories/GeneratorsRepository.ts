import { Generator, GeneratorDescription } from "../types/Generator";
import { Repository } from "./Repository";

/**
 * Repositories allowing you to obtain informations about the node generators used to create
 * inner nodes in tools, and thus sound schema in the corresponding modules.
 * @author vincent Courtois <courtois.vincent@outlook.com>
 */
export class GeneratorsRepository extends Repository<Generator, GeneratorDescription> { };