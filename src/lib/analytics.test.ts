import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const gtag = vi.fn();

async function trackWith(consent: string | null, withGtag = true) {
  if (consent) localStorage.setItem("cookieConsent", consent);
  if (withGtag) window.gtag = gtag;
  const { trackEvent } = await import("./analytics");
  trackEvent("generate_lead", { form_name: "contact" });
}

describe("trackEvent", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  afterEach(() => {
    gtag.mockReset();
    delete window.gtag;
  });

  it("sends the event when the visitor accepted cookies", async () => {
    await trackWith("accepted");
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", { form_name: "contact" });
  });

  it("sends nothing when the visitor rejected cookies", async () => {
    await trackWith("rejected");
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends nothing before the visitor chooses", async () => {
    await trackWith(null);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("does nothing when Google Analytics has not loaded", async () => {
    await expect(trackWith("accepted", false)).resolves.toBeUndefined();
  });
});
