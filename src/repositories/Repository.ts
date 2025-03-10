import { BaseRepository } from "./BaseRepository"

/**
 * This class is used by most repositories as it provides classic CRUD actions on a resource.
 * It can be parameterized with two generic types, the first one being the actual type that
 * read methods MUST return, representing the resource itsef. The second one being the payload
 * that MUST be sent when creating a resource, sometimes different from the actual form of the
 * resource (for example in case of login sessions), sometimes not.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class Repository<Payload, CreationPayload = Payload> extends BaseRepository {
  
  /**
   * Transforms a creation payload in an actual instance of the resource by calling the POST /
   * endpoint on the corresponding API resource.
   * 
   * @param payload The elements needed to create the instance of the resource.
   * @returns The created instance of the resource with all fields duely filled.
   */
  public create(payload: CreationPayload): Payload {
    return;
  }

  public async list(payload: Record<string, any> = {}): Promise<Array<Payload>> {
    return (await this.api.get(this.uri('/'), payload)).json() as unknown as Array<Payload>;
  }
}