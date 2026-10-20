import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// A plain element: React 19 hoists real <script async> tags to <head>, outliving each test.
vi.mock("next/script", () => ({
  default: ({ src }: { src?: string }) => <span data-script-src={src} />,
}));

const gaId = "G-TEST123";
const gaScript = () => document.querySelector(`[data-script-src="https://www.googletagmanager.com/gtag/js?id=${gaId}"]`);

// Fresh modules per test so the consent state read from localStorage starts clean.
async function renderSite(envGaId = gaId) {
  vi.stubEnv("NEXT_PUBLIC_GA_ID", envGaId);
  const { GoogleAnalytics } = await import("./GoogleAnalytics");
  const { CookieBanner } = await import("@/components/layout/CookieBanner");
  render(
    <>
      <CookieBanner />
      <GoogleAnalytics />
    </>
  );
}

describe("GoogleAnalytics with the cookie banner", () => {
  beforeEach(() => {
    vi.resetModules();
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("does not load GA4 before the visitor accepts", async () => {
    await renderSite();
    expect(screen.getByRole("region", { name: "Aviso de cookies" })).toBeInTheDocument();
    expect(gaScript()).toBeNull();
  });

  it("loads GA4 after the visitor accepts", async () => {
    await renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Aceptar" }));
    expect(gaScript()).not.toBeNull();
    expect(screen.queryByRole("region", { name: "Aviso de cookies" })).toBeNull();
  });

  it("does not load GA4 after the visitor rejects", async () => {
    await renderSite();
    fireEvent.click(screen.getByRole("button", { name: "Rechazar" }));
    expect(gaScript()).toBeNull();
  });

  it("does not load GA4 without a measurement ID, even after accepting", async () => {
    await renderSite("");
    fireEvent.click(screen.getByRole("button", { name: "Aceptar" }));
    expect(document.querySelector('[data-script-src*="googletagmanager"]')).toBeNull();
  });
});
