import { Suspense } from "react";
import Link from "next/link";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";

export default function ResetPasswordPage() {
  return (
    <AuthPageShell
      title="Nouveau mot de passe"
      description="Choisissez un mot de passe d’au moins 10 caractères, idéalement unique par rapport à vos comptes courants."
      afterCard={
        <p className="mt-6 text-center text-sm text-text-muted-custom">
          <Link
            href="/auth/login"
            className="font-medium text-brand-pink underline-offset-2 hover:underline"
          >
            Retour à la connexion
          </Link>{" "}
          ·{" "}
          <Link
            href="/"
            className="font-medium text-text-muted-custom underline-offset-2 hover:text-brand-pink hover:underline"
          >
            Accueil
          </Link>
        </p>
      }
    >
      <Suspense
        fallback={
          <p className="text-center text-sm text-text-muted-custom" aria-hidden>
            Chargement…
          </p>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthPageShell>
  );
}
