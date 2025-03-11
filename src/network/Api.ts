export interface Requestable {
  get(url: string, payload: Record<string, any>): Promise<Response>;
}

export type Fetcher = typeof fetch;

/**
 * The API is capable of querying a proxy route in the frontend to directly query the API in the backend.
 * It automatically puts the prefix to query the proxy route on the frontend so that it does not have to
 * be done in each and every call. It does NOT however handle anything regarding authentication tokens.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class Api implements Requestable {
  // the fetcher function, usually the default fetch function, but any function with the same signature.
  private fetcher: Fetcher;
  // The prefix to query the API, pass it to an empty string to call the exact route given in calls.
  private prefix: string;

  public constructor(fetcher: Fetcher = fetch, prefix: string = '/proxy')  {
    this.fetcher = fetcher;
    this.prefix = prefix;
  }

  public async get(url: string = '/', payload: Record<string, any> = {}): Promise<Response> {
    const params: URLSearchParams = new URLSearchParams(payload);
    const fullUrl: string = this.complete(url);
    const urlWithParams: string = `${fullUrl}${params.toString() === '' ? '' : `?${params}`}`;
    return await this.fetcher(urlWithParams, { method: 'get' });
  }

  public complete(url: string): string {
    return `${this.prefix}${url}`
  }
}
