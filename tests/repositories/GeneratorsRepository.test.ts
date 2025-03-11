import { describe, expect, it, vi } from 'vitest'
import { Api, Requestable } from '../../src/network/Api';
import { GeneratorsRepository } from '../../src/repositories'
import { GeneratorDescription, type Generator } from '../../src/types/Generator'
import axios from 'axios';
import { SessionHandler } from '../../src/repositories/utils/BaseRepository';

const handler: SessionHandler = { session: { id: "42", token: "422" }, reset() {} }

const payload: GeneratorDescription = { name: 'FakeGenerator', code: 'foo("bar");' };
const exampleGenerator: Generator = { id: '1', ...payload }

const api: Requestable = new Api(axios);
const repository = new GeneratorsRepository(handler, api);

describe('#list', () => {
  const spy = vi.spyOn(axios, 'get')

  it('Makes only one query on the API', () => {
    repository.list();
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly queries for the list of generators', () => {
    repository.list();
    expect(spy).toBeCalledWith('/proxy/generators', { auth_token: "422" });
  });
});

describe('#create', () => {
  const spy = vi.spyOn(axios, 'post')

  it('Makes only one query on the API', () => {
    repository.create(payload);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to create a generator', () => {
    repository.create(payload);
    expect(spy).toBeCalledWith('/proxy/generators', { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" });
  });
});

describe('#update', () => {
  const spy = vi.spyOn(axios, 'put')

  it('Makes only one query on the API', () => {
    repository.update(exampleGenerator);
    expect(spy).toHaveBeenCalledOnce();
  });
  it('Correctly formats the query to update a generator', () => {
    repository.update(exampleGenerator);
    expect(spy).toBeCalledWith('/proxy/generators/1', { name: 'FakeGenerator', code: 'foo("bar");', auth_token: "422" });
  });
});