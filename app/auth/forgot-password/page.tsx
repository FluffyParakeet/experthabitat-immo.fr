import { createCsrfToken } from "@/lib/csrf";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const csrfToken = createCsrfToken();
  return (
    <AuthPageShell
      title="Mot de passe oublié"
      description="Indiquez l’e-mail du compte. Si un compte existe, un lien (valable 1 h) vous est envoyé — vérifiez aussi le dossier spam."
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
      <ForgotPasswordForm csrfToken={csrfToken} />
    </AuthPageShell>
  );
}
