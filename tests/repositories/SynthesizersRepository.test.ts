import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Api, Requestable } from '../../src/network/Api';
import { SynthesizersRepository } from '../../src/repositories'
import { SynthesizerDescription, type Synthesizer } from '../../src/types/Synthesizer'
import { mockFetch } from "../setups/fetch"

const payload: SynthesizerDescription = { name: 'FakeGenerator', voices: 1, scale: 1.0, x: 0, y: 0, members: [] };
const synthesizer: Synthesizer = { id: '1', ...payload }

describe('#update', () => {
  const fakeFetch = vi.fn();
  const api: Requestable = new Api(fakeFetch);
  const repository = new SynthesizersRepository(api);
  beforeEach(() => mockFetch(fakeFetch, synthesizer))

  it('Only updates the coordinates and scale factor when updating a synthesizer', () => {
    repository.update(synthesizer, "422");
    const body = JSON.stringify({ auth_token: "422", scale: 1.0, x: 0, y: 0, t: "620430600000" })
    expect(fakeFetch).toBeCalledWith('/proxy/synthesizers/1', {
      method: "put", body
    });
  });
});