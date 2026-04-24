import type { Metadata } from "next";
import { createCsrfToken } from "@/lib/csrf";
import { ContactForm } from "@/components/forms/contact-form";
import { siteContact } from "@/lib/types";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Expert Habitat",
  description: `Contactez Aurélien Sabé, ${siteContact.address}`,
};

const projets = ["vendre", "acheter", "estimer", "autre"] as const;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ projet?: string; bien?: string }>;
}) {
  const sp = await searchParams;
  const csrf = createCsrfToken();
  const defaultProjet = projets.includes(sp.projet as (typeof projets)[number])
    ? (sp.projet as (typeof projets)[number])
    : "acheter";
  return (
    <div className="section-padding-y">
      <div className="page-container">
        <h1 className="text-center font-display text-3xl font-bold text-brand-violet sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-center text-base text-text-muted-custom sm:mt-4 sm:text-lg">
          {siteContact.hours} · {siteContact.phone} · {siteContact.email}
        </p>
        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border p-7 sm:mt-14 sm:p-9">
          <ContactForm csrfToken={csrf} defaultProjet={defaultProjet} />
        </div>
        <p className="mt-8 text-center text-base sm:mt-10">
          <Link href="/" className="text-brand-pink">
            Accueil
          </Link>
        </p>
      </div>
    </div>
  );
}
