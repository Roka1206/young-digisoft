export const consentStorageKey = "cookieConsent";

// Runs before the first paint: the banner is server-rendered so it paints early, and this
// hides it straight away for visitors who already chose (see .cookie-banner in globals.css).
export const hideChosenBannerScript = `try{if(localStorage.getItem("${consentStorageKey}"))document.documentElement.dataset.cookieConsent=""}catch(e){}`;
