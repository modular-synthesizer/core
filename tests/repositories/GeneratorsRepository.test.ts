import  { beforeEach, describe, expect, it } from 'vitest'
import { Api, Fetcher, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'
import { mockFetch } from '../utils/mockFetch';

const fetcher: Fetcher = mockFetch([ { id: '1', name: 'FakeGenerator', code: 'foo("bar");' } ])
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
  it('Returns the results of the JSON API when given', async () => {
    expect(await repository.list()).toEqual([
      { id: '1', name: 'FakeGenerator', code: 'foo("bar");' }
    ]);
  })
});