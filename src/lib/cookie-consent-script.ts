export const consentStorageKey = "cookieConsent";
// The AEPD cookie guide recommends asking again after 24 months at most.
export const consentMaxAgeMs = 730 * 24 * 60 * 60 * 1000;

// Runs before the first paint: the banner is server-rendered so it paints early, and this
// hides it straight away for visitors whose choice ("<choice>:<savedAt>") has not expired (see .cookie-banner in globals.css).
export const hideChosenBannerScript = `try{var t=+(localStorage.getItem("${consentStorageKey}")||"").split(":")[1];if(Date.now()-t<${consentMaxAgeMs})document.documentElement.dataset.cookieConsent=""}catch(e){}`;
