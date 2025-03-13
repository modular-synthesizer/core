import { expect, test, vi } from 'vitest';
import { Api } from '../../src/network/Api';

const fakeFetch = vi.fn();
const api = new Api(fakeFetch);

test('Call the API correctly with the get method.', () => {
  api.get('/test');
  expect(fakeFetch).toHaveBeenCalledOnce();
  expect(fakeFetch).toHaveBeenCalledWith('/proxy/test', { method: 'get' })
})