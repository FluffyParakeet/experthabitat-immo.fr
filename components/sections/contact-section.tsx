import { createCsrfToken } from "@/lib/csrf";
import { siteContact } from "@/lib/types";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeader } from "@/components/ui/section-header";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export async function ContactSection() {
  const csrfToken = createCsrfToken();
  return (
    <section
      className="border-t border-dashed border-brand-violet/15 section-padding-y"
      id="contact"
    >
      <div className="page-container">
        <SectionHeader
          eyebrow="Écrivez-nous"
          title="Parlons de votre projet"
          description="Votre message arrive directement sur ma boîte. En règle générale, j’y réponds le jour même, hors week-end et jours fériés."
        />
        <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-2 lg:gap-14">
          <div className="rounded-3xl border border-brand-violet/10 bg-white/80 p-7 shadow-soft backdrop-blur sm:p-9">
            <ContactForm csrfToken={csrfToken} />
          </div>
          <div className="space-y-6">
            <div className="rounded-3xl border border-brand-pink/15 bg-gradient-to-br from-brand-light/90 to-white p-7 sm:p-9">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-pink sm:text-base">
                Bureaux & accueil
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-brand-violet sm:text-3xl">
                Expert Habitat
              </h3>
              <p className="mt-1.5 text-base text-text-muted-custom">
                Mandataire indépendant, réseau Expertimo
              </p>
              <address className="mt-5 not-italic">
                <p className="inline-flex items-start gap-2 text-base leading-relaxed text-text-primary">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-pink" />
                  {siteContact.address}
                </p>
              </address>
              <div className="mt-5 space-y-3 text-base">
                <a
                  className="flex items-center gap-2 font-medium text-text-primary transition hover:text-brand-pink"
                  href={`tel:${siteContact.phoneE164}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                    <Phone className="h-4 w-4 text-brand-pink" />
                  </span>
                  {siteContact.phone}
                </a>
                <a
                  className="flex items-center gap-2 font-medium text-text-primary transition hover:text-brand-violet"
                  href={`mailto:${siteContact.email}`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm">
                    <Mail className="h-4 w-4 text-brand-violet" />
                  </span>
                  {siteContact.email}
                </a>
              </div>
            </div>
            <div className="rounded-2xl border border-white/80 bg-white/60 p-6 shadow-sm sm:p-7">
              <p className="text-base font-medium text-text-primary sm:text-lg">On reste proches de vous</p>
              <p className="mt-1.5 text-sm text-text-muted-custom sm:text-base">
                Suivez l’actualité du territoire et des mandats
              </p>
              <div className="mt-4 flex flex-wrap gap-3 text-base">
                <a
                  href={siteContact.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-brand-pink transition hover:underline"
                >
                  <AtSign className="h-4 w-4" />
                  @expert.habitat_
                </a>
                <span className="text-text-muted-custom">·</span>
                <a
                  href={siteContact.facebook}
                  className="text-text-muted-custom transition hover:text-brand-violet"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <span className="text-text-muted-custom">·</span>
                <Link
                  className="text-text-muted-custom transition hover:text-brand-violet"
                  href="/blog"
                >
                  Conseils & actus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
