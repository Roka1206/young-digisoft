import { describe, expect, it } from "vitest";
import { isSameOrigin, readJson } from "./request-guards";

const request = (headers: Record<string, string> = {}, body = "{}") =>
  new Request("https://youngdigisoft.es/api/contact", { method: "POST", headers, body });

describe("isSameOrigin", () => {
  it("accepts a request from the same host", () => {
    expect(isSameOrigin(request({ origin: "https://youngdigisoft.es" }))).toBe(true);
  });

  it("rejects a request from another host", () => {
    expect(isSameOrigin(request({ origin: "https://evil.example" }))).toBe(false);
  });

  it("rejects a request without Origin", () => {
    expect(isSameOrigin(request())).toBe(false);
  });

  it("rejects an opaque Origin", () => {
    expect(isSameOrigin(request({ origin: "null" }))).toBe(false);
  });
});

describe("readJson", () => {
  it("parses a JSON body within the limit", async () => {
    expect(await readJson(request({}, '{"a":1}'), 100)).toEqual({ tooLarge: false, data: { a: 1 } });
  });

  it("returns no data for a body that is not JSON", async () => {
    expect(await readJson(request({}, "{not json"), 100)).toEqual({ tooLarge: false, data: null });
  });

  it("flags a body over the limit counting bytes, not characters", async () => {
    expect((await readJson(request({}, JSON.stringify("ñ".repeat(60))), 100)).tooLarge).toBe(true);
  });
});
