"use client";

import { useCookiePreferences } from "./cookie-consent-provider";
import { cn } from "@/lib/utils";

export function CookiePreferencesLink({ className }: { className?: string }) {
  const ctx = useCookiePreferences();
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={ctx.openPreferences}
      className={cn(
        "text-balance text-sm text-white/85 transition hover:text-white hover:underline",
        "text-left",
        className,
      )}
    >
      Gestion des cookies
    </button>
  );
}
