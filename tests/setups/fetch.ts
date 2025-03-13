import { Mock } from "vitest";

export function mockFetch(mockedFetch: Mock, expectedResult) {
  mockedFetch.mockResolvedValue({ json: () => expectedResult })
}