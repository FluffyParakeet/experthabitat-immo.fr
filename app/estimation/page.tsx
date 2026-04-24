import type { Metadata } from "next";
import Link from "next/link";
import { createCsrfToken } from "@/lib/csrf";
import { EstimationWizard } from "@/components/forms/estimation-wizard";

export const metadata: Metadata = {
  title: "Demande d’estimation | Expert Habitat",
  description:
    "Prix, secteur, état du logement : une base pour une estimation de votre bien en métropole lilloise.",
};

export default async function EstimationPage() {
  const csrf = createCsrfToken();
  return (
    <div className="section-padding-y">
      <div className="page-container">
        <h1 className="text-center font-display text-3xl font-bold text-brand-violet sm:text-4xl">
          Estimer mon bien
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-balance text-center text-base text-text-muted-custom sm:mt-4 sm:text-lg">
          L’essentiel sur le bien suffit pour démarrer. Je m’en sers pour cadrer une fourchette et
          revenir vers vous.
        </p>
        <div className="mx-auto mt-10 max-w-2xl rounded-2xl border p-6 sm:mt-12 sm:p-9">
          <EstimationWizard csrfToken={csrf} />
        </div>
        <p className="mt-8 text-center text-base sm:mt-10">
          <Link href="/contact" className="text-brand-pink">
            Autre demande (contact classique)
          </Link>{" "}
          ·{" "}
          <Link href="/" className="text-brand-pink">
            Accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
