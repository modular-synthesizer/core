import { expect, test, vi } from 'vitest';
import { Api } from '../../src/network/Api';
import axios from 'axios';

const api = new Api(axios);

test('Call the API correctly with the get method.', () => {
  const spy = vi.spyOn(axios, 'get');
  api.get('/test');
  expect(spy).toHaveBeenCalledOnce();
  expect(spy).toHaveBeenCalledWith('/proxy/test', {})
})