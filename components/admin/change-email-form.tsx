"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ChangeEmailFormInner({
  csrfToken,
  initialEmail,
}: {
  csrfToken: string;
  initialEmail: string;
}) {
  const router = useRouter();
  const { update } = useSession();
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setSubmitting(true);
    try {
      const r = await fetch("/api/admin/change-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          csrfToken,
          website: "",
        }),
      });
      const j = (await r.json().catch(() => ({}))) as {
        error?: string;
        ok?: boolean;
        email?: string;
      };
      if (!r.ok) {
        setErr(j.error || "Impossible d’enregistrer. Réessayez.");
        return;
      }
      const newEmail = j.email ?? email.trim().toLowerCase();
      await update({ user: { email: newEmail } });
      setEmail(newEmail);
      setPassword("");
      setOk(true);
      router.refresh();
    } catch {
      setErr("Erreur réseau. Vérifiez votre connexion.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto w-full max-w-md space-y-4 rounded-2xl border border-white/90 bg-white/90 p-6 shadow-card sm:p-8"
      noValidate
    >
      <p className="text-sm text-text-muted-custom sm:text-base">
        Saisissez la nouvelle adresse et votre mot de passe actuel pour confirmer l’opération. La connexion
        s’adapte avec la nouvelle adresse affichée ci-dessus sans vous déconnecter.
      </p>

      {err && (
        <p className="rounded-2xl bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {err}
        </p>
      )}
      {ok && (
        <p
          className="rounded-2xl bg-emerald-50/90 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-600/15"
          role="status"
        >
          Votre e-mail a été mis à jour.
        </p>
      )}

      <div>
        <Label className="text-text-primary" htmlFor="compte-email">
          Adresse e-mail
        </Label>
        <Input
          id="compte-email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="mt-1.5"
        />
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="compte-email-pw">
          Mot de passe actuel (vérification)
        </Label>
        <Input
          id="compte-email-pw"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={submitting}
          className="mt-1.5"
        />
      </div>

      <Button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-pink text-base text-white"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enregistrement…
          </>
        ) : (
          "Enregistrer la nouvelle adresse"
        )}
      </Button>
    </form>
  );
}

export function ChangeEmailForm({ csrfToken }: { csrfToken: string }) {
  const { data: session } = useSession();
  const current = session?.user?.email ?? "";
  return (
    <ChangeEmailFormInner
      key={current || "loading"}
      csrfToken={csrfToken}
      initialEmail={current}
    />
  );
}
