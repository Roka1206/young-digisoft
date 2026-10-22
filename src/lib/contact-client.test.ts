import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const values = {
  name: "Ana",
  email: "ana@example.com",
  phone: "655087321",
  message: "Quiero una web para mi negocio.",
  consent: true as const,
};

const mockFetch = (implementation: () => Promise<Response>) => {
  const fetchMock = vi.fn(implementation);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

const respondWith = (status: number) => mockFetch(async () => new Response(null, { status }));

// Fresh modules so the stored cookie choice is read again for each test.
async function loadSubmit(cookieChoice?: "accepted" | "rejected") {
  vi.resetModules();
  localStorage.clear();
  if (cookieChoice) localStorage.setItem("cookieConsent", `${cookieChoice}:${Date.now()}`);
  return (await import("./contact-client")).submitContact;
}

describe("submitContact", () => {
  const gtag = vi.fn();

  beforeEach(() => {
    window.gtag = gtag;
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    gtag.mockReset();
    delete window.gtag;
  });

  it("posts the values as JSON to the contact route", async () => {
    const submitContact = await loadSubmit();
    const fetchMock = respondWith(200);
    await submitContact(values);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST", body: JSON.stringify(values) }),
    );
  });

  it("returns success when the route answers ok", async () => {
    const submitContact = await loadSubmit();
    respondWith(200);
    expect(await submitContact(values)).toBe("success");
  });

  it("returns rateLimited when the route answers 429", async () => {
    const submitContact = await loadSubmit();
    respondWith(429);
    expect(await submitContact(values)).toBe("rateLimited");
  });

  it("returns error when the route fails", async () => {
    const submitContact = await loadSubmit();
    respondWith(502);
    expect(await submitContact(values)).toBe("error");
  });

  it("returns error when the network fails", async () => {
    const submitContact = await loadSubmit();
    mockFetch(async () => {
      throw new TypeError("Failed to fetch");
    });
    expect(await submitContact(values)).toBe("error");
  });

  it("sends generate_lead with only the form name and service after a successful send with consent", async () => {
    const submitContact = await loadSubmit("accepted");
    respondWith(200);
    await submitContact({ ...values, service: "Web profesional" });
    expect(gtag).toHaveBeenCalledExactlyOnceWith("event", "generate_lead", {
      form_name: "contact",
      service: "Web profesional",
    });
  });

  it("leaves out the service when none was chosen", async () => {
    const submitContact = await loadSubmit("accepted");
    respondWith(200);
    await submitContact({ ...values, service: "" });
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form_name: "contact" });
  });

  it.each([429, 502])("does not send generate_lead when the route answers %s", async (status) => {
    const submitContact = await loadSubmit("accepted");
    respondWith(status);
    await submitContact(values);
    expect(gtag).not.toHaveBeenCalled();
  });

  it.each([undefined, "rejected" as const])(
    "does not send generate_lead when the cookie choice is %s",
    async (choice) => {
      const submitContact = await loadSubmit(choice);
      respondWith(200);
      await submitContact(values);
      expect(gtag).not.toHaveBeenCalled();
    },
  );

  it("does nothing when consent was given but gtag is not loaded", async () => {
    const submitContact = await loadSubmit("accepted");
    delete window.gtag;
    respondWith(200);
    expect(await submitContact(values)).toBe("success");
  });
});
