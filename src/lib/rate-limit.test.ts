import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

const windowMs = 1000;
const callTimes = (isAllowed: (key: string, now?: number) => boolean, times: number, now = 0) =>
  Array.from({ length: times }, () => isAllowed("ip", now));

describe("createRateLimiter", () => {
  it("allows requests up to the limit and blocks the next one", () => {
    const isAllowed = createRateLimiter({ limit: 2, windowMs });
    expect(callTimes(isAllowed, 3)).toEqual([true, true, false]);
  });

  it("allows requests again once the window has passed", () => {
    const isAllowed = createRateLimiter({ limit: 1, windowMs });
    isAllowed("ip", 0);
    expect(isAllowed("ip", windowMs - 1)).toBe(false);
    expect(isAllowed("ip", windowMs)).toBe(true);
  });

  it("counts each key separately", () => {
    const isAllowed = createRateLimiter({ limit: 1, windowMs });
    expect(isAllowed("a", 0)).toBe(true);
    expect(isAllowed("b", 0)).toBe(true);
  });

  it("does not let blocked requests extend the window", () => {
    const isAllowed = createRateLimiter({ limit: 1, windowMs });
    isAllowed("ip", 0);
    isAllowed("ip", 500);
    expect(isAllowed("ip", windowMs)).toBe(true);
  });
});
