import { describe, expect, it, vi } from 'vitest'
import { Api, Requestable } from '../../src/network/Api';
import { SynthesizersRepository } from '../../src/repositories'
import { SynthesizerDescription, type Synthesizer } from '../../src/types/Synthesizer'
import axios from 'axios';

const payload: SynthesizerDescription = { name: 'FakeGenerator', voices: 1, scale: 1.0, x: 0, y: 0, members: [] };
const synthesizer: Synthesizer = { id: '1', ...payload }

describe('#update', () => {
  const api: Requestable = new Api(axios);
  const repository = new SynthesizersRepository(api);
  const spy = vi.spyOn(axios, 'put');

  it('Only updates the coordinates and scale factor when updating a synthesizer', () => {
    repository.update(synthesizer);
    expect(spy).toBeCalledWith('/proxy/synthesizers/1', { scale: 1.0, x: 0, y: 0 });
  });
});