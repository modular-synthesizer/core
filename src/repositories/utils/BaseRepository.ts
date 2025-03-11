import { Api, Requestable } from "../../network/Api";

/**
 * A repository links a given model to a set of methods on the API. It provides easy methods
 * to create, update, delete or get model instances by infering URLs on the API.
 */
export class BaseRepository {
    // The root of all the APIs concerning this resource, with a leading slash character.
    public readonly resource: string = '';
    // The API object passed as parameter in the constructor to enhance testability.
    public readonly api: Requestable;
  
    /**
     * @param resource The base URI to build all URLs from, designating the resource to manipulate.
     * @param api The Requestable object making requests on the API, used to format and fetch requests.
     */
    public constructor(resource: string = '', api: Requestable = new Api()) {
      this.resource = resource;
      this.api = api;
    }

    /**
     * Formats the URL needed to access the given resource. Either provide an UUID to access
     * a specific instance of the resource, or no URL to get a complete list, or a create URL.
     * 
     * @param appended often times the identifier of the resource you're trying to query.
     * @returns a url to access the resource you're trying to query.
     */
    public uri(appended: string = ''): string {
      const resource: string[] = this.resource === '' ? [] : [ this.resource ];
      const ending: string[] = appended === '' ? [] : [ appended ];
      return [ ...resource, ...ending ].join('/');
    }
}