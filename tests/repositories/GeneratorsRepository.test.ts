import  { beforeEach, describe, expect, it, vi } from 'vitest'
import { Api, Fetcher, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'


const mockReturn: Promise<Response> = new Promise(() => ({ json: vi.fn() }));
const fetcher: Fetcher = vi.fn((_1: URL|RequestInfo, _2?: RequestInit) => mockReturn);
const api: Requestable = new Api(fetcher);
const repository = new GeneratorsRepository('generators', api);

describe('#list', () => {
  beforeEach(() => {
    repository.list();
  })
  it('Makes only one query on the API', () => {
    expect(fetcher).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    expect(fetcher).toBeCalledWith('/proxy/generators', { method: 'get' });
  });
});