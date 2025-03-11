import axios, { AxiosResponse } from "axios";

export interface Requestable {
  get(url: string, payload: Record<string, any>): Promise<AxiosResponse>;
  post(url: string, payload: Record<string, any>): Promise<AxiosResponse>;
  put(url: string, payload: Record<string, any>): Promise<AxiosResponse>;
}

export type Fetcher = typeof axios;

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

  public constructor(fetcher: Fetcher = axios, prefix: string = '/proxy')  {
    this.fetcher = fetcher;
    this.prefix = prefix;
  }

  public async get(url: string = '', params: Record<string, any> = {}): Promise<AxiosResponse> {
    return await this.fetcher.get(this.complete(url), params);
  }

  public async post(url: string = '', data: Record<string, any> = {}): Promise<AxiosResponse> {
    return await this.fetcher.post(this.complete(url), data);
  }

  public async put(url: string = '', data: Record<string, any> = {}): Promise<AxiosResponse> {
    return await this.fetcher.put(this.complete(url), data);
  }

  public complete(url: string): string {
    if (url[0] === '/') url = url.slice(1, url.length);
    return [this.prefix, url].join('/');
  }
}
