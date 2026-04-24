import Link from "next/link";
import { Building2, BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";

export default function AdminIndexPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Bienvenue"
        title="Tableau de bord"
        description="Gérez ce qui s’affiche sur le site : annonces, textes, visibilité. Un bien en brouillon reste masqué pour le public."
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:max-w-3xl">
        <Card className="group relative overflow-hidden border border-white/90 bg-gradient-to-br from-white to-brand-light/40 p-6 shadow-card transition hover:border-brand-violet/20 hover:shadow-md sm:p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-violet/12 to-brand-pink/8 ring-1 ring-brand-violet/10">
            <Building2 className="h-5 w-5 text-brand-violet" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-text-primary">Annonces</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted-custom">
            Liste, édition, statut publié / brouillon, et suppression. C’est ici que vous pilotez le catalogue.
          </p>
          <div className="mt-5">
            <Button
              asChild
              className="h-11 w-full rounded-full bg-brand-pink px-6 text-base text-white shadow-sm sm:w-auto"
            >
              <Link href="/admin/biens" className="inline-flex items-center justify-center">
                Gérer les annonces
              </Link>
            </Button>
          </div>
        </Card>
        <Card className="border border-white/90 bg-white/80 p-6 shadow-sm sm:p-7">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gray-soft/80 ring-1 ring-gray-200/60">
            <BarChart3 className="h-5 w-5 text-brand-violet/70" aria-hidden />
          </div>
          <h2 className="mt-4 font-display text-xl font-bold text-text-primary">Site public</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-text-muted-custom">
            Aperçu en contexte : ouvrez le site dans un nouvel onglet pour vérifier le rendu pour les visiteurs.
          </p>
          <div className="mt-5">
            <Button
              asChild
              variant="outline"
              className="h-11 w-full rounded-full border-2 border-brand-violet/20 bg-white/80 text-brand-violet hover:bg-brand-light/50 sm:w-auto"
            >
              <Link href="/" target="_blank" rel="noreferrer">
                Ouvrir le site
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
