import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GeneratorsService } from "../../src/services/lists/GeneratorsService";
import { Api, Requestable } from '../../src/network/Api';
import { type GeneratorDescription, type Generator } from '../../src/types/Generator';
import { mockFetch } from '../setups/fetch';

const fakeFetch = vi.fn();
const api: Requestable = new Api(fakeFetch);
const payload: GeneratorDescription = { name: 'FakeGenerator', code: 'foo("bar");' };
const exampleGenerator: Generator = { ...payload, id: "1" };
let list

beforeEach(() => {
  list = new GeneratorsService(api, '422');
})

describe('#fetch', () => {
  const list = new GeneratorsService(api, '422');
  beforeEach(() => mockFetch(fakeFetch, [ exampleGenerator ]));

  it('Starts with an empty list', () => {
    expect(list.all).toEqual([]);
  });
  it('Has some items when the fetching is done', async () => {
    await list.fetch();
    expect(list.all).toEqual([ exampleGenerator ]);
  });
});

describe('#create', () => {
  it('Creates a new element in the list', async () => {
    mockFetch(fakeFetch, exampleGenerator);
    await list.create(payload);
    expect(list.all).toEqual([ exampleGenerator ])
  });
  it('Does not add the new element if the element is already in the list', async () => {
    mockFetch(fakeFetch, [ exampleGenerator ]);
    await list.fetch();
    mockFetch(fakeFetch, exampleGenerator);
    await list.create(payload)
    expect(list.all).toEqual([ exampleGenerator ]);
  });
  it('Adds another similar item if the UUID is different', async () => {
    mockFetch(fakeFetch, [ exampleGenerator ]);
    await list.fetch();
    mockFetch(fakeFetch, { ... payload, id: '2'});
    await list.create(payload)
    expect(list.all).toEqual([ exampleGenerator, { ...payload, id: '2' } ]);
  });
});

const secondGenerator = { id: '2', name: 'Foobar', code: 'any("code");' };

describe('#update', () => {
  it('Correctly updates the needed element in the list', async () => {
    mockFetch(fakeFetch, [ exampleGenerator, secondGenerator ]);
    await list.fetch();
    mockFetch(fakeFetch, { ... payload, id: '2'});
    await list.update({ id: '2', name: 'NewName' });
    // Check that the update query has been correctly done on the backend.
    expect(fakeFetch).toHaveBeenCalledWith("/proxy/generators/2", {
      method: "put", 
      data: { auth_token: '422', name: "NewName", code: 'any("code");', t: "620430600000" }
    });
    expect(list.all[1].name).toEqual('NewName')
  });
});

describe('#delete', () => {
  it('Correctly deletes a resource item', async () => {
    mockFetch(fakeFetch, [ exampleGenerator, secondGenerator ]);
    await list.fetch();
    mockFetch(fakeFetch, { ... payload, id: '2'});
    await list.delete({ id: '1' });
    expect(fakeFetch).toHaveBeenCalledWith("/proxy/generators/1?auth_token=422&t=620430600000", {
      method: "delete", 
    });
    expect(list.all[0].id).toEqual('2')
  })
  it('Correctly deletes a resource by its UUID', async () => {
    mockFetch(fakeFetch, [ exampleGenerator, secondGenerator ]);
    await list.fetch();
    mockFetch(fakeFetch, { ... payload, id: '2'});
    await list.delete('1');
    expect(fakeFetch).toHaveBeenCalledWith("/proxy/generators/1?auth_token=422&t=620430600000", {
      method: "delete", 
    });
    expect(list.all[0].id).toEqual('2')
  })
})