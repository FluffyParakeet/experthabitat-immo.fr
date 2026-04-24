import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedProperties } from "@/lib/data";
import { BiensListing } from "@/components/biens/biens-listing";
import { siteContact } from "@/lib/types";

export const metadata: Metadata = {
  title: "Nos biens | Expert Habitat",
  description: `Biens en exclusivité : ${siteContact.tagline} sur la métropole lilloise.`,
};

export const revalidate = 3600;

function BiensFilterSkeleton() {
  return (
    <div
      className="mb-8 h-32 animate-pulse rounded-2xl border border-brand-violet/10 bg-white/50 sm:mb-10"
      role="status"
      aria-label="Chargement des filtres"
    />
  );
}

export default async function BiensPage() {
  const properties = await getPublishedProperties();
  return (
    <div className="bg-gray-soft/40 section-padding-y">
      <div className="page-container">
        <h1 className="text-center font-display text-3xl font-bold text-brand-violet sm:text-4xl">
          Tous nos biens
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-text-muted-custom sm:mt-5 sm:text-lg">
          Sélection actualisée, {siteContact.tagline}
        </p>
        <div className="mt-8 sm:mt-10">
          <Suspense fallback={<BiensFilterSkeleton />}>
            <BiensListing properties={properties} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
