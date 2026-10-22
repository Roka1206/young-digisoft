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

describe("contact click tracking", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.setItem("cookieConsent", "accepted");
    window.gtag = gtag;
  });

  afterEach(() => {
    gtag.mockReset();
    delete window.gtag;
    localStorage.clear();
    document.body.innerHTML = "";
  });

  it.each([
    ["https://wa.me/34655087321?text=Hola", "whatsapp"],
    ["tel:+34655087321", "phone"],
    ["mailto:info@youngdigisoft.es", "email"],
    ["/contacto", undefined],
    ["https://www.instagram.com/youngdigisoft/", undefined],
  ])("classifies %s as %s", async (href, method) => {
    const { contactMethod } = await import("./analytics");
    expect(contactMethod(href)).toBe(method);
  });

  it("sends contact_click when the click lands inside a WhatsApp link", async () => {
    document.body.innerHTML = '<a href="https://wa.me/34655087321"><svg><path id="icon"></path></svg></a>';
    const { trackContactClick } = await import("./analytics");
    trackContactClick(document.getElementById("icon"));
    expect(gtag).toHaveBeenCalledWith("event", "contact_click", { method: "whatsapp" });
  });

  it("ignores clicks on other links, outside links and without a target", async () => {
    document.body.innerHTML = '<a id="internal" href="/contacto">Contacto</a><p id="text">Texto</p>';
    const { trackContactClick } = await import("./analytics");
    trackContactClick(document.getElementById("internal"));
    trackContactClick(document.getElementById("text"));
    trackContactClick(null);
    expect(gtag).not.toHaveBeenCalled();
  });

  it("sends nothing when the visitor rejected cookies", async () => {
    localStorage.setItem("cookieConsent", "rejected");
    document.body.innerHTML = '<a id="phone" href="tel:+34655087321">Llamar</a>';
    const { trackContactClick } = await import("./analytics");
    trackContactClick(document.getElementById("phone"));
    expect(gtag).not.toHaveBeenCalled();
  });
});
