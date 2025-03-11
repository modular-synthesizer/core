import { beforeEach, vi } from "vitest";


const promised: Promise<any> = new Promise((resolve) => {
  resolve({ data: {}, status: 200 });
})

beforeEach(() => {
  const mockedAxios = vi.hoisted(() => ({
    default: {
      post: vi.fn(() => promised),
      get: vi.fn(() => promised),
      delete: vi.fn(() => promised),
      put: vi.fn(() => promised),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          eject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          eject: vi.fn(),
        },
      },
    },
  }));
  
  vi.mock('axios', () => mockedAxios)
})