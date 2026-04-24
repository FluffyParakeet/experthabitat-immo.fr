"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PwField({
  id,
  name,
  autoComplete,
  value,
  onChange,
  disabled,
  label,
}: {
  id: string;
  name: string;
  autoComplete: string;
  value: string;
  onChange: (v: string) => void;
  disabled: boolean;
  label: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label className="text-text-primary" htmlFor={id}>
        {label}
      </Label>
      <div className="relative mt-1.5">
        <Input
          id={id}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          disabled={disabled}
          className="pr-11"
        />
        <button
          type="button"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-text-muted-custom transition hover:bg-brand-light/50 hover:text-text-primary"
          onClick={() => setShow((s) => !s)}
          tabIndex={-1}
          aria-label={show ? "Masquer" : "Afficher"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

export function ChangePasswordForm({ csrfToken }: { csrfToken: string }) {
  const [current, setCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setOk(false);
    setSubmitting(true);
    try {
      const r = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: current,
          password,
          confirm,
          csrfToken,
          website: "",
        }),
      });
      const j = (await r.json().catch(() => ({}))) as { error?: string; ok?: boolean };
      if (!r.ok) {
        setErr(j.error || "Impossible d’enregistrer. Réessayez.");
        return;
      }
      setOk(true);
      setCurrent("");
      setPassword("");
      setConfirm("");
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
        Choisissez un mot de passe d’au moins 10 caractères, différent de l’actuel.
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
          Votre mot de passe a été mis à jour.
        </p>
      )}

      <PwField
        id="current-password"
        name="currentPassword"
        autoComplete="current-password"
        label="Mot de passe actuel"
        value={current}
        onChange={setCurrent}
        disabled={submitting}
      />
      <PwField
        id="new-password"
        name="password"
        autoComplete="new-password"
        label="Nouveau mot de passe"
        value={password}
        onChange={setPassword}
        disabled={submitting}
      />
      <PwField
        id="confirm"
        name="confirm"
        autoComplete="new-password"
        label="Confirmer le mot de passe"
        value={confirm}
        onChange={setConfirm}
        disabled={submitting}
      />

      <Button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-pink text-base text-white"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Enregistrement…
          </>
        ) : (
          "Enregistrer le nouveau mot de passe"
        )}
      </Button>
    </form>
  );
}
