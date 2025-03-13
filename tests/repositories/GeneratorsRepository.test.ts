import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Api, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'
import { GeneratorDescription, type Generator } from '../../src/types/Generator'
import { mockFetch } from "../setups/fetch"

const payload: GeneratorDescription = { name: 'FakeGenerator', code: 'foo("bar");' };
const exampleGenerator: Generator = { ...payload, id: "1" };
const fakeFetch = vi.fn();
const api: Requestable = new Api(fakeFetch);
const repository = new GeneratorsRepository(api);
const token = "422";

describe('#list', () => {
  beforeEach(() => mockFetch(fakeFetch, []))

  it('Makes only one query on the API', () => {
    repository.list(token);
    expect(fakeFetch).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    repository.list(token);
    expect(fakeFetch).toBeCalledWith('/proxy/generators?auth_token=422', { method: 'get' });
  });
});

describe('#create', () => {
  beforeEach(() => mockFetch(fakeFetch, exampleGenerator))

  it('Makes only one query on the API', () => {
    repository.create(payload, token);
    expect(fakeFetch).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to create a generator', () => {
    repository.create(payload, token);
    expect(fakeFetch).toBeCalledWith('/proxy/generators', {
      method: "post",
      data: { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" }
    });
  });
});

describe('#update', () => {
  beforeEach(() => mockFetch(fakeFetch, exampleGenerator))

  it('Makes only one query on the API', () => {
    repository.update(exampleGenerator, token);
    expect(fakeFetch).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to update a generator', () => {
    repository.update(exampleGenerator, token);
    expect(fakeFetch).toBeCalledWith('/proxy/generators/1', {
      method: "put",
      data: { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" }
    });
  });
});