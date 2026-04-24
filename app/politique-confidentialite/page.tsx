import type { Metadata } from "next";
import Link from "next/link";
import { legalCopy } from "@/lib/legal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Expert Habitat",
  description:
    "Politique de confidentialité et protection des données personnelles — Expert Habitat, mandataire immobilier.",
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="section-padding-y">
      <div className={cn("page-container", "max-w-3xl")}>
        <h1 className="font-display text-3xl font-bold text-brand-violet sm:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-2 text-sm text-text-muted-custom">
          Dernière mise à jour :{" "}
          {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mt-10 space-y-10 text-text-primary">
          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">1. Responsable du traitement</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le responsable du traitement des données collectées via le site{" "}
              <a href={legalCopy.siteUrl} className="font-medium text-brand-pink underline-offset-2 hover:underline">
                {legalCopy.siteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>{" "}
              est :{" "}
            </p>
            <ul className="mt-3 list-none space-y-1 text-base sm:text-lg">
              <li>
                <strong className="text-brand-violet">{legalCopy.editor}</strong> — {legalCopy.role} ({legalCopy.brand})
              </li>
              <li>{legalCopy.address}</li>
              <li>
                E-mail :{" "}
                <a className="text-brand-pink underline-offset-2 hover:underline" href={`mailto:${legalCopy.email}`}>
                  {legalCopy.email}
                </a>
              </li>
            </ul>
            <p className="mt-3 text-base leading-[1.75] text-text-muted-custom sm:text-lg sm:leading-[1.8]">
              Nous ne désignons pas de délégué à la protection des données (DPO). Pour toute question relative à
              cette politique, vous pouvez nous écrire à l’adresse indiquée ci-dessus.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">2. Données collectées</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">Nous pouvons collecter notamment :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base sm:text-lg">
              <li>
                <strong>Données d’identification et de contact</strong> transmises via le formulaire de contact ou
                par e-mail (nom, prénom, adresse e-mail, numéro de téléphone, contenu de votre message, nature de
                votre projet lorsque vous la précisez).
              </li>
              <li>
                <strong>Données techniques de navigation</strong> (adresse IP, type de terminal, pages consultées,
                horodatage, logs), dans la mesure permise par l’hébergeur et des outils de mesure d’audience.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">3. Finalités</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">Les données sont traitées pour :</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base sm:text-lg">
              <li>répondre à vos demandes, vous recontacter dans le cadre d’un projet immobilier (vente, achat, estimation, autre) ;</li>
              <li>assurer la gestion, la maintenance et la sécurité du site (logs techniques, prévention d’abus) ;</li>
              <li>produire des statistiques d’audience anonymisées afin d’améliorer l’ergonomie et le contenu du site.</li>
            </ul>
            <p className="mt-3 text-base leading-[1.75] text-text-muted-custom sm:text-lg sm:leading-[1.8]">
              Aucun profilage automatisé à des fins de décision n’ayant d’effet juridique sur la personne n’est mis
              en œuvre par nos soins.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">4. Bases juridiques</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le traitement repose sur l’<strong>exécution de mesures précontractuelles</strong> ou sur votre{" "}
              <strong>consentement</strong> lorsqu’il est recueilli (case à cocher sur le formulaire, cookies non
              strictement nécessaires s’il y a lieu) ; et, pour certaines opérations techniques, sur l’
              <strong>intérêt légitime</strong> d’exploiter un site sécurisé et fiable, dans le respect de vos droits
              et libertés.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">5. Destinataires</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Les données sont accessibles à {legalCopy.editor} et, le cas échéant, à des prestataires de confiance
              (notamment hébergeur et, si activés, services de statistiques) strictement autorisés à des fins
              d’hébergement, de maintien en condition opérationnelle et d’anonymisation des mesures d’audience, et
              soumis à des obligations contractuelles de confidentialité.{" "}
              {legalCopy.hosting.name} héberge le site. Les données peuvent être hébergées en Union européenne
              et/ou aux États-Unis, avec les garanties appropriées (clauses types de la Commission européenne ou
              équivalent) lorsqu’un transfert hors EEE est effectué.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">6. Durée de conservation</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-base sm:text-lg">
              <li>messages et échanges en lien avec le formulaire de contact : jusqu’à 3 ans à compter du dernier contact, sauf obligation légale contraire ou besoin d’archivage limité (ex. suivi d’un dossier) ;</li>
              <li>données de journalisation (logs) : durée limitée aux besoins de sécurité, généralement de quelques semaines à quelques mois selon l’hébergeur ;</li>
              <li>données d’audience : selon la durée d’exploitation de l’outil, souvent 14 mois maximum à compter de la dernière action pour les outils d’anonymisation courants.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">7. Vos droits</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi « Informatique et Libertés », vous disposez
              d’un droit d’accès, de rectification, d’effacement, de limitation, de portabilité (lorsqu’il s’applique)
              et d’opposition au traitement de vos données, ainsi que du droit de retirer votre consentement quand
              le traitement en repose. Vous pouvez adresser votre demande, accompagnée d’une preuve d’identité, à
              l’e-mail {legalCopy.email}. Vous pouvez formuler une réclamation auprès de l’
              <a
                className="text-brand-pink underline-offset-2 hover:underline"
                href="https://www.cnil.fr"
                target="_blank"
                rel="noreferrer"
              >
                autorité de contrôle
              </a>{" "}
              (en France, la CNIL, www.cnil.fr).
            </p>
          </section>

          <section id="cookies">
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">8. Cookies et traceurs</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Le site peut utiliser des cookies ou technologies similaires pour le fonctionnement technique,
              d’éventuels comptes connectés, et des traceurs d’<strong>audience</strong> (Vercel Web Analytics, Vercel
              Speed Insights) pour comprendre la fréquentation. Ces outils d’audience ne sont chargés <strong>
                qu’après votre acceptation
              </strong>{" "}
              via le bandeau d’information en bas d’écran. Si vous refusez, ils ne sont pas activés. Lorsqu’un
              traceur n’est pas strictement nécessaire, votre accord est requis. Vous pouvez modifier ce choix à
              tout moment (lien « Gestion des cookies » en pied de page) ou paramétrer votre navigateur. Les
              cookies / traceurs dits strictement nécessaires (sécurité, bon fonctionnement du service) ne sont
              pas soumis à consentement au sens de la règlementation applicable, mais le sont décrits ici pour
              transparence.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">9. Sécurité</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              {legalCopy.editor} met en œuvre des mesures techniques et organisationnelles appropriées afin d’assurer
              un niveau de sécurité adapté au risque, sans qu’il soit possible d’en garantir l’absolue infailibilité
              (notamment compte tenu d’Internet).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-bold text-brand-violet sm:text-2xl">10. Modification de la politique</h2>
            <p className="mt-3 text-base leading-[1.75] sm:text-lg sm:leading-[1.8]">
              Cette page peut être mise à jour. La version affichée sur le site fait foi. Nous vous invitons à la
              consulter régulièrement.
            </p>
          </section>

          <p className="pt-2">
            <Link href="/mentions-legales" className="text-base font-medium text-brand-pink hover:underline">
              Mentions légales
            </Link>
            <span className="text-text-muted-custom"> · </span>
            <Link href="/" className="text-base font-medium text-brand-pink hover:underline">
              Accueil
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
