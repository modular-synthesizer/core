import { afterEach, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(1989, 7, 29, 23, 50, 0, 0))
})

afterEach(() => {
  vi.useRealTimers();
})