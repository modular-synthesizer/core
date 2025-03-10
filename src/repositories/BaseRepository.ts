/**
 * A repository links a given model to a set of methods on the API. It provides easy methods
 * to create, update, delete or get model instances by infering URLs on the API.
 */
export class BaseRepository {
    // The root of all the APIs concerning this resource, with a leading slash character.
    public readonly resource: string = '';
    // The main URI used in the frontend to define the route forwarding requests to the API.
    public readonly BASE_URI = process?.env?.BASE_API_URI ?? '/proxy';
  
    /**
     * @param resource The base URI to build all URLs from, designating the resource to manipulate.
     */
    public constructor(resource: string = '') {
      this.resource = resource;
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
      return [ this.BASE_URI, ...resource, ...ending ].join('/');
    }
}