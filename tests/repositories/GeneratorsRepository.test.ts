import { describe, expect, it } from 'vitest'
import { Api, Fetcher, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'
import { mockFetch } from '../utils/mockFetch';
import { GeneratorDescription, type Generator } from '../../src/types/Generator'

const payload: GeneratorDescription = { name: 'FakeGenerator', code: 'foo("bar");' };
const exampleGenerator: Generator = { id: '1', ...payload }

describe('#list', () => {
  const fetcher: Fetcher = mockFetch([ exampleGenerator ])
  const api: Requestable = new Api(fetcher);
  const repository = new GeneratorsRepository(api);

  it('Makes only one query on the API', () => {
    repository.list();
    expect(fetcher).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    repository.list();
    expect(fetcher).toBeCalledWith('/proxy/generators', { method: 'get' });
  });
  it('Returns the results of the JSON API when given', async () => {
    expect(await repository.list()).toEqual([
      { id: '1', name: 'FakeGenerator', code: 'foo("bar");' }
    ]);
  });
});

describe('#create', () => {
  const fetcher: Fetcher = mockFetch(exampleGenerator)
  const api: Requestable = new Api(fetcher);
  const repository = new GeneratorsRepository(api);

  it('Makes only one query on the API', () => {
    repository.create(payload);
    expect(fetcher).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    repository.create(payload);
    expect(fetcher).toBeCalledWith('/proxy/generators', {
      method: 'post',
      body: JSON.stringify({ name: 'FakeGenerator', code: 'foo("bar");' })
    });
  });
  it('Returns the results of the JSON API when given', async () => {
    expect(await repository.create(payload)).toEqual(
      { id: '1', name: 'FakeGenerator', code: 'foo("bar");' }
    );
  });
});