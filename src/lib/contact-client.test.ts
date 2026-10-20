import { afterEach, describe, expect, it, vi } from "vitest";
import { submitContact } from "./contact-client";

const values = {
  name: "Ana",
  email: "ana@example.com",
  message: "Quiero una web para mi negocio.",
  consent: true as const,
};

const mockFetch = (implementation: () => Promise<Response>) => {
  const fetchMock = vi.fn(implementation);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

describe("submitContact", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts the values as JSON to the contact route", async () => {
    const fetchMock = mockFetch(async () => new Response(null, { status: 200 }));
    await submitContact(values);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST", body: JSON.stringify(values) })
    );
  });

  it("returns success when the route answers ok", async () => {
    mockFetch(async () => new Response(null, { status: 200 }));
    expect(await submitContact(values)).toBe("success");
  });

  it("returns rateLimited when the route answers 429", async () => {
    mockFetch(async () => new Response(null, { status: 429 }));
    expect(await submitContact(values)).toBe("rateLimited");
  });

  it("returns error when the route fails", async () => {
    mockFetch(async () => new Response(null, { status: 502 }));
    expect(await submitContact(values)).toBe("error");
  });

  it("returns error when the network fails", async () => {
    mockFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    expect(await submitContact(values)).toBe("error");
  });
});
