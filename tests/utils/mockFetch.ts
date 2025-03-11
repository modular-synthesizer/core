import { vi } from "vitest";
import { Fetcher } from "../../src/network/Api";

export function mockFetch(expectedResult: any): Fetcher {  
  const promised: Promise<any> = new Promise((resolve) => {
    resolve({
      json() { return expectedResult }
    });
  })
  
  return vi.fn((_1: URL|RequestInfo, _2?: RequestInit) => promised);
}