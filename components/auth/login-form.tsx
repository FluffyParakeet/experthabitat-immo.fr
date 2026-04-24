"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { safeAppPath } from "@/lib/safe-callback-url";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const search = useSearchParams();
  const callbackUrl = safeAppPath(search.get("callbackUrl"));
  const [err, setErr] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const fieldClass =
    "mt-1.5 h-11 rounded-xl border-brand-violet/20 bg-white/80 text-text-primary transition focus-visible:ring-2 focus-visible:ring-brand-pink/20 focus-visible:ring-offset-0";

  return (
    <form
      className="space-y-5"
      onSubmit={async (e) => {
        e.preventDefault();
        setErr(null);
        setPending(true);
        const form = e.currentTarget;
        const data = new FormData(form);
        const email = String(data.get("email") ?? "");
        const password = String(data.get("password") ?? "");
        const r = await signIn("credentials", {
          email,
          password,
          redirect: false,
          callbackUrl,
        });
        setPending(false);
        if (r?.error) {
          setErr("E-mail ou mot de passe incorrect.");
          return;
        }
        if (r?.url) {
          try {
            const next = new URL(r.url, window.location.origin);
            if (next.origin === window.location.origin) {
              window.location.href = r.url;
            } else {
              window.location.assign(callbackUrl);
            }
          } catch {
            window.location.assign(callbackUrl);
          }
        } else {
          window.location.assign(callbackUrl);
        }
      }}
    >
      <div>
        <Label className="text-text-primary" htmlFor="email">
          E-mail
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={fieldClass}
        />
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="password">
          Mot de passe
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={fieldClass}
        />
      </div>
      {err && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-destructive ring-1 ring-red-200/60" role="alert">
          {err}
        </p>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button
          type="submit"
          className="h-11 w-full rounded-full bg-brand-pink px-8 text-base font-semibold text-white shadow-sm sm:w-auto"
          disabled={pending}
        >
          {pending ? "Connexion…" : "Se connecter"}
        </Button>
        <Link
          href="/auth/forgot-password"
          className={cn("text-sm font-medium text-brand-pink hover:underline")}
        >
          Mot de passe oublié
        </Link>
      </div>
    </form>
  );
}
