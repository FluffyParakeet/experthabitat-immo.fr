/** Stockage local du choix (preuve côté navigateur — pas un cookie serveur ici). */
export const COOKIE_CONSENT_STORAGE_KEY = "eh_consent_cookies_v1" as const;

export type CookieConsentValue = "granted" | "denied";
