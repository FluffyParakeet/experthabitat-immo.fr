import type { Metadata } from "next";
import Link from "next/link";
import { legalCopy } from "@/lib/legal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentions légales | Expert Habitat",
  description: "Mentions légales du site Expert Habitat, mandataire immobilier sur la métropole lilloise.",
  robots: { index: true, follow: true },
};

const displayUrl = legalCopy.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

export default function MentionsLegalesPage() {
  return (
    <div className="section-padding-y">
      <div className={cn("page-container", "max-w-3xl")}>
        <h1 className="font-display text-3xl font-bold text-brand-violet sm:text-4xl">Mentions légales</h1>
        <p className="mt-2 text-sm text-text-muted-custom">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-10 text-text-primary">
          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">1. Éditeur du site</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le site{" "}
              <a
                href={legalCopy.siteUrl}
                className="font-medium text-brand-pink underline-offset-2 hover:underline"
              >
                {displayUrl}
              </a>{" "}
              (ci-après « le Site ») est édité par :
            </p>
            <ul className="mt-4 list-none space-y-1.5 text-base leading-relaxed sm:text-lg">
              <li>
                <span className="font-semibold text-brand-violet">{legalCopy.editor}</span> — {legalCopy.role}
              </li>
              <li>Agissant sous la marque {legalCopy.brand}</li>
              <li>Siège : {legalCopy.address}</li>
              <li>
                Téléphone :{" "}
                <a
                  className="text-brand-pink underline-offset-2 hover:underline"
                  href={`tel:${legalCopy.phoneE164}`}
                >
                  {legalCopy.phone}
                </a>
              </li>
              <li>
                E-mail :{" "}
                <a className="text-brand-pink underline-offset-2 hover:underline" href={`mailto:${legalCopy.email}`}>
                  {legalCopy.email}
                </a>
              </li>
              <li>
                Immatriculation au Registre Spécial des Agents Commerciaux (RSAC) de Lille Métropole : n°{" "}
                {legalCopy.rsac}
              </li>
            </ul>
            <p className="mt-4 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              {legalCopy.editor} est le <strong>directeur de la publication</strong> au sens de l’article 6, I, 2° de
              la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l’économie numérique.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">2. Hébergement</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le Site est hébergé par :
            </p>
            <ul className="mt-3 list-none space-y-1 text-base sm:text-lg">
              <li className="font-semibold text-brand-violet">{legalCopy.hosting.name}</li>
              <li>{legalCopy.hosting.address}</li>
              <li>
                Site :{" "}
                <a
                  href={legalCopy.hosting.site}
                  className="text-brand-pink underline-offset-2 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {legalCopy.hosting.site.replace(/^https?:\/\//, "")}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">3. Propriété intellectuelle</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              L’ensemble des éléments du Site (notamment textes, visuels, graphismes, logo, structure) sont, sauf
              mention contraire, la propriété exclusive d’{legalCopy.editor} ou de ses partenaires, et sont protégés
              par le droit d’auteur, des marques et le droit des bases de données. Toute reproduction, représentation,
              adaptation ou exploitation non autorisée, même partielle, est interdite sans accord préalable
              écrit, sous réserve des exceptions prévues par le Code de la propriété intellectuelle.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">4. Contenu et responsabilité</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Les informations présentées sur le Site le sont à titre <strong>indicatif</strong> et n’ont pas
              vocation à se substituer à un acte, à une offre ou à un document contractuel.{" "}
              {legalCopy.editor} s’efforce d’assurer l’exactitude des informations, sans garantie d’exhaustivité, et
              se réserve le droit d’y apporter toute modification à tout moment. L’utilisation du Site se fait sous
              la seule responsabilité de l’utilisateur.{" "}
              {legalCopy.editor} ne saurait être tenu responsable d’un dommage lié à l’usage du Site ou d’une
              indisponibilité temporaire.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">5. Liens hypertextes</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le Site peut renvoyer vers des sites tiers. {legalCopy.editor} n’exerce aucun contrôle sur le contenu
              de ces sites et décline toute responsabilité quant à leur contenu, leur publicité ou leurs produits
              proposés.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">6. Données personnelles</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le traitement des données à caractère personnel mis en œuvre via le Site (formulaires, cookies) est
              détaillé dans la{" "}
              <Link href="/politique-confidentialite" className="font-medium text-brand-pink underline-offset-2 hover:underline">
                politique de confidentialité
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">7. Médiation</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Conformément aux articles L. 616-1 et R. 616-1 du Code de la consommation, le consommateur a le droit
              de recourir gratuitement à un médiateur de la consommation en vue de la résolution amiable d’un
              litige. Les coordonnées d’un éventuel médiateur compétent peuvent vous être communiquées sur simple
              demande à l’adresse indiquée ci-dessus.
            </p>
          </section>

          <p className="pt-4">
            <Link href="/" className="text-base font-medium text-brand-pink hover:underline">
              ← Retour à l’accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
