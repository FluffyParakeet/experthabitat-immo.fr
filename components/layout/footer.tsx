import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { CookiePreferencesLink } from "@/components/cookie-consent/cookie-preferences-link";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "@/components/icons/social-brands";
import { ExpertLogo } from "./logo";
import { siteContact, legal } from "@/lib/types";

const nav = [
  { href: "/", label: "Accueil" },
  { href: "/biens", label: "Nos biens" },
  { href: "/blog", label: "Conseils" },
  { href: "/#services", label: "Services" },
  { href: "/estimation", label: "Estimation" },
  { href: "/contact", label: "Contact" },
];
const serv = [
  { href: "/#services", label: "Vente" },
  { href: "/#services", label: "Achat" },
  { href: "/estimation", label: "Estimation" },
  { href: "/#services", label: "Investissement" },
];
const legalL = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export function Footer() {
  return (
    <footer className="relative">
      <div
        className="footer-top-fade pointer-events-none h-2.5 w-full min-w-0 sm:h-3"
        aria-hidden
      />
      <div className="relative overflow-hidden bg-brand-dark text-white">
        <div className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-brand-pink/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full bg-brand-violet/20 blur-3xl" />
        <div className="page-container relative flex flex-col gap-10 py-16 sm:py-20 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="max-w-sm min-w-0 shrink-0">
            <div className="space-y-5">
              <ExpertLogo variant="onDark" size="lg" />
              <a
                href={`tel:${siteContact.phoneE164}`}
                className="inline-flex w-full min-w-0 max-w-full items-center gap-2 break-words text-base font-semibold text-brand-pink transition hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="min-w-0 break-words">{siteContact.phone}</span>
              </a>
              <p className="flex items-start gap-2 text-sm text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="min-w-0 break-words">{siteContact.address}</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1" role="list" aria-label="Réseaux sociaux">
                <a
                  href={siteContact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/20 hover:text-white"
                  aria-label="Expert Habitat sur Instagram (nouvel onglet)"
                >
                  <InstagramIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={siteContact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/20 hover:text-white"
                  aria-label="Expert Habitat sur LinkedIn (nouvel onglet)"
                >
                  <LinkedInIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={siteContact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 transition hover:bg-white/20 hover:text-white"
                  aria-label="Expert Habitat sur Facebook (nouvel onglet)"
                >
                  <FacebookIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:flex lg:shrink lg:content-start lg:items-start lg:gap-5">
            <div>
              <h3 className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                Navigation
              </h3>
              <ul className="mt-3 space-y-1.5">
                {nav.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/85 transition hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                Services
              </h3>
              <ul className="mt-3 space-y-1.5">
                {serv.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/85 transition hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="whitespace-nowrap font-display text-sm font-bold uppercase tracking-[0.2em] text-white/50">
                Conformité
              </h3>
              <ul className="mt-3 space-y-1.5">
                {legalL.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-balance text-sm text-white/85 transition hover:text-white hover:underline"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <CookiePreferencesLink />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="page-container space-y-4 py-8 sm:space-y-3 sm:py-10">
            <p className="text-sm leading-relaxed text-white/60 sm:text-base">
              Mandataire inscrit au RSAC de Lille Métropole, n° {legal.rsac}, réseau Expertimo.
              Garantie financière, assurance de responsabilité civile, cartes professionnelles CPI
              (références sur simple demande).
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <p className="text-sm text-white/45 sm:text-base">
                © {new Date().getFullYear()} Expert Habitat · Tous droits réservés.
              </p>
              <Link
                href="/auth/login"
                className="shrink-0 text-sm font-medium text-white/50 transition hover:text-white/90 sm:text-right"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
