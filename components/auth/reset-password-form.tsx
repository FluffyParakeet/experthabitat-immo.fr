"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function ResetPasswordForm() {
  const search = useSearchParams();
  const token = search.get("token");
  const router = useRouter();
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const fieldClass =
    "mt-1.5 h-11 rounded-xl border-brand-violet/20 bg-white/80 text-text-primary focus-visible:ring-2 focus-visible:ring-brand-pink/20";

  if (!token) {
    return (
      <p
        className="rounded-lg bg-amber-50 px-3 py-2.5 text-sm text-amber-950 ring-1 ring-amber-200/80"
        role="alert"
      >
        Lien incomplet. Ouvrez le message reçu par e-mail et utilisez le bouton de réinitialisation.
      </p>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null);
        const form = e.currentTarget;
        const data = new FormData(form);
        setLoading(true);
        const r = await fetch("/api/auth/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            token,
            password: data.get("password"),
            confirm: data.get("confirm"),
            website: data.get("website") ?? "",
          }),
        });
        setLoading(false);
        if (!r.ok) {
          const j = (await r.json().catch(() => ({}))) as { error?: string };
          setErr(j.error ?? "La réinitialisation a échoué");
          return;
        }
        setOk(true);
        setTimeout(() => {
          router.push("/auth/login?reset=1");
        }, 1200);
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
        <Label className="text-text-primary" htmlFor="npw">
          Nouveau mot de passe
        </Label>
        <Input
          id="npw"
          name="password"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          className={fieldClass}
        />
        <p className="mt-1 text-xs text-text-muted-custom">Au moins 10 caractères.</p>
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="npw2">
          Confirmer
        </Label>
        <Input
          id="npw2"
          name="confirm"
          type="password"
          required
          minLength={10}
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>
      {err && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive ring-1 ring-red-200/60" role="alert">
          {err}
        </p>
      )}
      {ok && (
        <p className={cn("rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-600/15")} role="status">
          Mot de passe mis à jour. Redirection vers la connexion…
        </p>
      )}
      {!ok && (
        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-brand-pink px-8 text-base font-semibold text-white shadow-sm sm:w-auto"
          disabled={loading}
        >
          {loading ? "Enregistrement…" : "Définir le mot de passe"}
        </Button>
      )}
    </form>
  );
}
