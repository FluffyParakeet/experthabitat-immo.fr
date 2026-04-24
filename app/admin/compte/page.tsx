import type { Metadata } from "next";
import { createCsrfToken } from "@/lib/csrf";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ChangeEmailForm } from "@/components/admin/change-email-form";
import { ChangePasswordForm } from "@/components/admin/change-password-form";

export const metadata: Metadata = {
  title: "Compte | Administration",
};

export default function AdminComptePage() {
  const csrfToken = createCsrfToken();
  return (
    <>
      <AdminPageHeader
        backHref="/admin"
        backLabel="Tableau de bord"
        title="Mon compte"
        description="E-mail de connexion et mot de passe du back-office."
      />
      <div className="grid w-full min-w-0 grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start lg:gap-10 xl:gap-14">
        <div className="min-w-0">
          <h2 className="sr-only">Adresse e-mail</h2>
          <ChangeEmailForm csrfToken={csrfToken} />
        </div>
        <div className="min-w-0">
          <h2 className="sr-only">Mot de passe</h2>
          <ChangePasswordForm csrfToken={csrfToken} />
        </div>
      </div>
    </>
  );
}
