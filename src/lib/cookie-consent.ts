import { useSyncExternalStore } from "react";
import { consentMaxAgeMs, consentStorageKey as storageKey } from "./cookie-consent-script";

export type Consent = "accepted" | "rejected";

const listeners = new Set<() => void>();
let consent: Consent | null | undefined;
let settingsOpen = false;

const notify = () => listeners.forEach((listener) => listener());

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Stored as "<choice>:<savedAt>"; a missing, unknown or expired value means no choice.
export function parseConsent(stored: string | null, now = Date.now()): Consent | null {
  const [choice, savedAt] = (stored ?? "").split(":");
  const fresh = now - Number(savedAt) < consentMaxAgeMs;
  return fresh && (choice === "accepted" || choice === "rejected") ? choice : null;
}

export function getConsent() {
  if (consent === undefined) {
    try {
      consent = parseConsent(localStorage.getItem(storageKey));
    } catch {
      consent = null;
    }
  }
  return consent;
}

function clearAnalyticsCookies() {
  const names = document.cookie.split("; ").map((cookie) => cookie.split("=")[0]);
  for (const name of names.filter((name) => name.startsWith("_ga"))) {
    for (const domain of ["", `; domain=.${location.hostname}`]) {
      document.cookie = `${name}=; max-age=0; path=/${domain}`;
    }
  }
}

export function saveConsent(choice: Consent) {
  const withdrawn = choice === "rejected" && getConsent() === "accepted";
  consent = choice;
  settingsOpen = false;
  try {
    localStorage.setItem(storageKey, `${choice}:${Date.now()}`);
  } catch {
    // Storage blocked (private mode): the choice lasts for this visit only.
  }
  if (withdrawn) {
    // The Google script is already running: drop its cookies and reload without it.
    clearAnalyticsCookies();
    location.reload();
    return;
  }
  notify();
}

export function openCookieSettings() {
  settingsOpen = true;
  notify();
}

// undefined on the server, so nothing consent-dependent renders before hydration.
export const useConsent = () => useSyncExternalStore(subscribe, getConsent, () => undefined);
export const useCookieSettingsOpen = () =>
  useSyncExternalStore(
    subscribe,
    () => settingsOpen,
    () => false,
  );
