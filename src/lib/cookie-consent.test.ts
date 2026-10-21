import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
    localStorage.setItem("cookieConsent", "accepted");
    expect((await loadConsent()).getConsent()).toBe("accepted");
  });

  it("treats an unknown stored value as no choice", async () => {
    localStorage.setItem("cookieConsent", "yes");
    expect((await loadConsent()).getConsent()).toBeNull();
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
    expect(localStorage.getItem("cookieConsent")).toBe("accepted");
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
    localStorage.setItem("cookieConsent", "accepted");
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
