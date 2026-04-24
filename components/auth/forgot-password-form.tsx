"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ForgotPasswordForm({ csrfToken }: { csrfToken: string }) {
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fieldClass =
    "mt-1.5 h-11 rounded-xl border-brand-violet/20 bg-white/80 text-text-primary focus-visible:ring-2 focus-visible:ring-brand-pink/20";

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        const form = e.currentTarget;
        const data = new FormData(form);
        const r = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: data.get("email"),
            website: data.get("website") ?? "",
            csrfToken,
          }),
        });
        setLoading(false);
        if (!r.ok) {
          const j = (await r.json().catch(() => ({}))) as { error?: string };
          setErr(j.error ?? "Une erreur est survenue");
          return;
        }
        setOk(true);
      }}
    >
      <input
        name="website"
        type="text"
        tabIndex={-1}
        className="absolute left-[-2000px] w-px h-px opacity-0"
        autoComplete="off"
        aria-hidden
      />
      <div>
        <Label className="text-text-primary" htmlFor="forgot-email">
          E-mail
        </Label>
        <Input
          id="forgot-email"
          name="email"
          type="email"
          required
          className={fieldClass}
        />
      </div>
      {err && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive ring-1 ring-red-200/60" role="alert">
          {err}
        </p>
      )}
      {ok && (
        <p
          className={cn(
            "rounded-2xl bg-emerald-50/90 px-3 py-3 text-sm leading-relaxed text-emerald-900 ring-1 ring-emerald-600/15",
          )}
          role="status"
        >
          Si cette adresse correspond à un compte, un e-mail a été envoyé avec un lien
          (vérifiez le dossier spam / courrier indésirable). Le lien est valide
          1 h.
        </p>
      )}
      {!ok && (
        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-brand-pink px-8 text-base font-semibold text-white shadow-sm sm:w-auto"
          disabled={loading}
        >
          {loading ? "Envoi…" : "Envoyer le lien"}
        </Button>
      )}
    </form>
  );
}
