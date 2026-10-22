import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { consentMaxAgeMs, hideChosenBannerScript } from "./cookie-consent-script";

// Fresh module per test: consent is cached in module state after the first read.
const loadConsent = () => import("./cookie-consent");
const reload = vi.fn();

describe("cookie consent", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
    vi.stubGlobal("location", { ...window.location, hostname: "localhost", reload });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    reload.mockReset();
    for (const name of ["_ga", "_ga_TEST", "theme"]) document.cookie = `${name}=; max-age=0; path=/`;
  });

  it("returns no choice on the first visit", async () => {
    expect((await loadConsent()).getConsent()).toBeNull();
  });

  it("returns the stored choice", async () => {
    localStorage.setItem("cookieConsent", `accepted:${Date.now()}`);
    expect((await loadConsent()).getConsent()).toBe("accepted");
  });

  it("treats an unknown stored value as no choice", async () => {
    localStorage.setItem("cookieConsent", "yes");
    expect((await loadConsent()).getConsent()).toBeNull();
  });

  it.each([
    ["a choice saved without date (older format)", "accepted"],
    ["a choice older than 24 months", `accepted:${Date.now() - consentMaxAgeMs - 1}`],
  ])("asks again for %s", async (_, stored) => {
    localStorage.setItem("cookieConsent", stored);
    expect((await loadConsent()).getConsent()).toBeNull();
  });

  it("keeps a choice saved just under 24 months ago", async () => {
    localStorage.setItem("cookieConsent", `rejected:${Date.now() - consentMaxAgeMs + 60_000}`);
    expect((await loadConsent()).getConsent()).toBe("rejected");
  });

  it.each([
    ["hides", `accepted:${Date.now()}`, ""],
    ["keeps", `accepted:${Date.now() - consentMaxAgeMs - 1}`, undefined],
    ["keeps", "accepted", undefined],
  ])("the pre-paint script %s the banner for %s", (_, stored, flag) => {
    localStorage.setItem("cookieConsent", stored);
    delete document.documentElement.dataset.cookieConsent;
    new Function(hideChosenBannerScript)();
    expect(document.documentElement.dataset.cookieConsent).toBe(flag);
  });

  it("treats blocked storage as no choice", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect((await loadConsent()).getConsent()).toBeNull();
  });

  it("stores the choice without reloading when accepting", async () => {
    const { getConsent, saveConsent } = await loadConsent();
    saveConsent("accepted");
    expect(getConsent()).toBe("accepted");
    expect(localStorage.getItem("cookieConsent")).toMatch(/^accepted:\d+$/);
    expect(reload).not.toHaveBeenCalled();
  });

  it("keeps the choice for the visit when storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    const { getConsent, saveConsent } = await loadConsent();
    saveConsent("rejected");
    expect(getConsent()).toBe("rejected");
  });

  it("clears only the _ga cookies and reloads when consent is withdrawn", async () => {
    localStorage.setItem("cookieConsent", `accepted:${Date.now()}`);
    document.cookie = "_ga=1; path=/";
    document.cookie = "_ga_TEST=1; path=/";
    document.cookie = "theme=dark; path=/";
    (await loadConsent()).saveConsent("rejected");
    expect(document.cookie).toBe("theme=dark");
    expect(reload).toHaveBeenCalledOnce();
  });

  it("does not reload when rejecting on the first visit", async () => {
    (await loadConsent()).saveConsent("rejected");
    expect(reload).not.toHaveBeenCalled();
  });

  it("notifies subscribers when the settings open and when a choice closes them", async () => {
    const { renderHook, act } = await import("@testing-library/react");
    const { openCookieSettings, saveConsent, useCookieSettingsOpen } = await loadConsent();
    const { result } = renderHook(() => useCookieSettingsOpen());
    expect(result.current).toBe(false);
    act(() => openCookieSettings());
    expect(result.current).toBe(true);
    act(() => saveConsent("accepted"));
    expect(result.current).toBe(false);
  });
});
