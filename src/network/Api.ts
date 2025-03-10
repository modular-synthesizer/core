export interface Requestable {
  get(url: string, payload: Record<string, any>): Promise<Response>;
}

type Fetcher = typeof fetch;

export class Api implements Requestable {

  private fetcher: Fetcher;

  public constructor(fetcher: Fetcher = fetch)  {
    this.fetcher = fetcher;
  }

  public async get(url: string = '/', payload: Record<string, any> = {}): Promise<Response> {
    const params: URLSearchParams = new URLSearchParams(payload);
    return await this.fetcher(`${url}?${params}`, { method: 'get' });
  }
}
