"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_STORAGE_KEY, type CookieConsentValue } from "@/lib/cookie-consent";
import { cn } from "@/lib/utils";

type ConsentState = "loading" | "undecided" | "granted" | "denied";

type Ctx = {
  /** Rouvre le bandeau (retrait / changement de choix). */
  openPreferences: () => void;
};

const CookieContext = createContext<Ctx | null>(null);

export function useCookiePreferences() {
  return useContext(CookieContext);
}

function readStorageClient(): ConsentState {
  try {
    const v = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) as CookieConsentValue | null;
    if (v === "granted") return "granted";
    if (v === "denied") return "denied";
    return "undecided";
  } catch {
    return "undecided";
  }
}

function writeStorage(v: CookieConsentValue) {
  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, v);
  } catch {
    /* private mode, etc. */
  }
}

function clearStorage() {
  try {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  } catch {
    /* */
  }
}

function CookieBanner({
  onAccept,
  onRefuse,
}: {
  onAccept: () => void;
  onRefuse: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed z-[500] w-[min(calc(100vw-2rem),24rem)] max-w-md",
        "bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-4",
        "rounded-2xl border border-brand-violet/20 bg-gradient-to-b from-white to-brand-light/30 p-4 shadow-card sm:p-5",
        "text-text-primary",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
    >
      <h2 id="cookie-banner-title" className="font-display text-base font-bold text-brand-violet sm:text-lg">
        Cookies & données
      </h2>
      <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-text-muted-custom sm:text-[0.9375rem]">
        Nous n’utilisons des outils de mesure d’audience (Vercel Analytics, Speed Insights) qu’avec votre
        accord. Ils aident à comprendre l’usage du site. Vous pouvez accepter ou refuser. Les éléments
        strictement nécessaires (sécurité, session de connexion éventuelle) ne sont pas soumis à
        consentement.{" "}
        <Link
          href="/politique-confidentialite#cookies"
          className="font-medium text-brand-pink underline-offset-2 hover:underline"
        >
          Politique de confidentialité
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:justify-stretch sm:gap-3">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full min-h-11 rounded-xl border-2 border-brand-violet/35 bg-white/90",
            "text-sm font-semibold text-text-primary sm:flex-1",
            "hover:bg-brand-light/50",
          )}
          onClick={onRefuse}
        >
          Tout refuser
        </Button>
        <Button
          type="button"
          className="h-11 w-full min-h-11 flex-1 rounded-xl bg-gradient-to-b from-brand-pink to-[#c91d4a] text-sm font-semibold text-white shadow-sm hover:from-brand-pink/95"
          onClick={onAccept}
        >
          Tout accepter
        </Button>
      </div>
    </div>
  );
}

/**
 * Conformité minimale (FR / RGPD / ePrivacy) : pas d’audience Vercel avant choix,
 * refus = même visibilité que l’accord, preuve en localStorage, personnalisation du choix possible via le pied de page.
 */
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConsentState>("loading");

  useEffect(() => {
    // Sync localStorage après hydratation (évite décalage serveur/client sur le choix enregistré).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture navigateur post-SSR
    setState(readStorageClient());
  }, []);

  const persist = useCallback((v: CookieConsentValue) => {
    writeStorage(v);
    setState(v);
  }, []);

  const openPreferences = useCallback(() => {
    clearStorage();
    setState("undecided");
  }, []);

  return (
    <CookieContext.Provider value={{ openPreferences }}>
      {children}
      {state === "undecided" && (
        <CookieBanner onAccept={() => persist("granted")} onRefuse={() => persist("denied")} />
      )}
      {state === "granted" && (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </CookieContext.Provider>
  );
}
