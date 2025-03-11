import { describe, expect, it } from 'vitest'
import { Api, Fetcher, Requestable } from '../../src/network/Api';
import { SynthesizersRepository } from '../../src/repositories'
import { mockFetch } from '../utils/mockFetch';
import { SynthesizerDescription, type Synthesizer } from '../../src/types/Synthesizer'

const payload: SynthesizerDescription = { name: 'FakeGenerator', voices: 1, scale: 1.0, x: 0, y: 0, members: [] };
const synthesizer: Synthesizer = { id: '1', ...payload }

describe('#update', () => {
  const fetcher: Fetcher = mockFetch(synthesizer)
  const api: Requestable = new Api(fetcher);
  const repository = new SynthesizersRepository(api);

  it('Only updates the coordinates and scale factor when updating a synthesizer', () => {
    repository.update(synthesizer);
    expect(fetcher).toBeCalledWith('/proxy/synthesizers/1', {
      method: 'put',
      body: JSON.stringify({ scale: 1.0, x: 0, y: 0 })
    });
  });
});