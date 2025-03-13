import { isEmpty } from "lodash";

export interface Requestable {
  get(url: string, payload: Record<string, unknown>): Promise<Response>;
  post(url: string, payload: Record<string, unknown>): Promise<Response>;
  put(url: string, payload: Record<string, unknown>): Promise<Response>;
  delete(url: string, payload: Record<string, unknown>): Promise<Response>;
}

export type Fetcher = typeof fetch;

/**
 * The API is capable of querying a proxy route in the frontend to directly query the API in the backend.
 * It automatically puts the prefix to query the proxy route on the frontend so that it does not have to
 * be done in each and every call. It does NOT however handle unknownthing regarding authentication tokens.
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
export class Api implements Requestable {
  // the fetcher function, usually the default fetch function, but unknown function with the same signature.
  private fetcher: Fetcher;
  // The prefix to query the API, pass it to an empty string to call the exact route given in calls.
  private prefix: string;

  public constructor(fetcher: Fetcher, prefix = '/proxy')  {
    this.fetcher = fetcher;
    this.prefix = prefix;
  }

  public async get(url = '', params: Record<string, unknown> = {}): Promise<Response> {
    return await this.makeRequest('get', this.completeWithParams(url, params as Record<string, string>));
  }

  public async post(url = '', data: Record<string, unknown> = {}): Promise<Response> {
    return await this.makeRequest('post', this.complete(url), { data });
  }

  public async put(url = '', data: Record<string, unknown> = {}): Promise<Response> {
    return await this.makeRequest('put', this.complete(url), { data });
  }
  public async delete(url = '', params: Record<string, unknown> = {}): Promise<Response> {
    return await this.makeRequest('delete', this.complete(url), { params });
  }

  private async makeRequest(method: string, url: string, payload: Record<string, unknown> = {}): Promise<Response> {
    return this.fetcher(url, { method, ...payload });
  }

  public complete(url: string): string {
    if (url[0] === '/') url = url.slice(1, url.length);
    return [this.prefix, url].join('/');
  }

  public completeWithParams(url: string, params: Record<string, string>): string {
    let queryString = '';
    if (!isEmpty(params)) queryString += `?${(new URLSearchParams(params)).toString()}`;
    return `${this.complete(url)}${queryString}`
  }
}
