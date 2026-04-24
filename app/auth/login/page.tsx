import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

type SearchParams = { callbackUrl?: string; reset?: string; error?: string };
type Props = { searchParams: Promise<SearchParams> };

function LoginNotice({ searchParams }: { searchParams: SearchParams }) {
  if (searchParams.error) {
    return (
      <p className="mb-4 text-center text-sm text-destructive" role="alert">
        Connexion impossible, réessayez.
      </p>
    );
  }
  if (searchParams.reset === "1") {
    return (
      <p
        className="mb-4 rounded-2xl bg-emerald-50/90 px-3 py-2 text-center text-sm text-emerald-900 ring-1 ring-emerald-600/15"
        role="status"
      >
        Mot de passe mis à jour, vous pouvez vous connecter.
      </p>
    );
  }
  return null;
}

const loginFooter = (
  <p className="mt-6 text-center text-sm text-text-muted-custom">
    <Link
      href="/"
      className="font-medium text-brand-pink underline-offset-2 transition hover:underline"
    >
      Retour au site
    </Link>
  </p>
);

export default async function AuthLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  return (
    <AuthPageShell
      title="Connexion"
      description=""
      notice={<LoginNotice searchParams={sp} />}
      afterCard={loginFooter}
    >
      <Suspense
        fallback={
          <p className="text-center text-sm text-text-muted-custom" aria-hidden>
            Chargement…
          </p>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthPageShell>
  );
}
