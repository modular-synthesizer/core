import { expect, test, vi } from 'vitest';
import { Api, Fetcher } from '../../src/network/Api';

const fetcher: Fetcher = vi.fn();
const api = new Api(fetcher);

test('Call the API correctly with the get method.', () => {
  api.get('/test');
  expect(fetcher).toHaveBeenCalledOnce();
  expect(fetcher).toHaveBeenCalledWith('/proxy/test', { method: 'get' })
})