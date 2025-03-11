import { Identified } from "../../types/utils/Identified";
import { BaseRepository } from "./BaseRepository"
import { omit, pick } from 'lodash';

/**
 * This class is used by most repositories as it provides classic CRUD actions on a resource.
 * It can be parameterized with two generic types, the first one being the actual type that
 * read methods MUST return, representing the resource itsef. The second one being the payload
 * that MUST be sent when creating a resource, sometimes different from the actual form of the
 * resource (for example in case of login sessions), sometimes not.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class Repository<Payload extends Identified, CreationPayload = Payload> extends BaseRepository {
  
  /**
   * Transforms a creation payload in an actual instance of the resource by calling the POST /
   * endpoint on the corresponding API resource.
   * 
   * @param payload The elements needed to create the instance of the resource.
   * @returns The created instance of the resource with all fields duely filled.
   */
  public async create(payload: CreationPayload): Promise<Payload> {
    return (await this.api.post(this.uri(), payload)).json();
  }

  /**
   * List all the instances of a resource respecting a series of criteria. Every instance
   * corresponding to ALL the criterias will be sent in the response from the API.
   * 
   * @param payload The filtering criteria applied to this listing search.
   * @returns an array of results getting the list of elements requested.
   */
  public async list(payload: Record<string, any> = {}): Promise<Array<Payload>> {
    return (await this.api.get(this.uri(), payload)).json();
  }

  /**
   * Gets one instance of the resource on the API, searched by its unique identifier.
   * 
   * @param id The Unique Identifier for this instance of the resource.
   * @returns The whole instance, formatted as returned by the API.
   */
  public async get(id: string): Promise<Payload> {
    return (await this.api.get(this.uri(id), {})).json();
  }

  /**
   * Updates an instance of a model on the API by formatting, limiting, and sending its object representation
   * to the API so that it can be further queried on the backend.
   * 
   * @param payload The instance of the resource to update the fields of.
   * @param keys an array of keys available in the instance of the resource to limit the update to them.
   * @returns the updated version of the record after API request and response.
   */
  public async update(payload: Payload, keys?: Array<keyof Payload>): Promise<Payload> {
    const filtered: Record<keyof Payload, any> = keys ? pick(payload, keys) : payload;
    return (await this.api.put(this.uri(payload.id), omit(filtered, 'id'))).json()
  }
}