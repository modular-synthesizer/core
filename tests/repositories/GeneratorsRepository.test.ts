import { describe, expect, it, vi } from 'vitest'
import { Api, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'
import { GeneratorDescription, type Generator } from '../../src/types/Generator'
import axios from 'axios';

const payload: GeneratorDescription = { name: 'FakeGenerator', code: 'foo("bar");' };
const exampleGenerator: Generator = { id: '1', ...payload }

const api: Requestable = new Api(axios);
const repository = new GeneratorsRepository(api);
const token: string = "422";

describe('#list', () => {
  const spy = vi.spyOn(axios, 'get')

  it('Makes only one query on the API', () => {
    repository.list(token);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    repository.list(token);
    expect(spy).toBeCalledWith('/proxy/generators', { params: { auth_token: "422" } });
  });
});

describe('#create', () => {
  const spy = vi.spyOn(axios, 'post')

  it('Makes only one query on the API', () => {
    repository.create(payload, token);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to create a generator', () => {
    repository.create(payload, token);
    expect(spy).toBeCalledWith('/proxy/generators', {
      data: { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" }
    });
  });
});

describe('#update', () => {
  const spy = vi.spyOn(axios, 'put')

  it('Makes only one query on the API', () => {
    repository.update(exampleGenerator, token);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to update a generator', () => {
    repository.update(exampleGenerator, token);
    expect(spy).toBeCalledWith('/proxy/generators/1', {
      data: { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" }
    });
  });
});