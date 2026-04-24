"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormSelect } from "@/components/ui/form-select";
import { Textarea } from "@/components/ui/textarea";
import { createProperty, updateProperty, type ActionResult } from "@/app/admin/biens/actions";
import { propertyToFormValues } from "@/lib/property-to-form";
import type { PropertyFormValues } from "@/lib/schemas";
import type { PropertyRow } from "@/lib/db/schema";
import { cn } from "@/lib/utils";

const types = [
  "Maison",
  "Appartement",
  "Studio",
  "Terrain",
  "Local professionnel",
  "Autre",
] as const;
const listings = [
  { v: "vente", l: "Vente" },
  { v: "location", l: "Location" },
] as const;
const badges = [
  { v: "exclusivite", l: "Exclusivité" },
  { v: "nouveau", l: "Nouveau" },
] as const;

function fe(
  s: ActionResult,
  k: string,
) {
  if (s && "fieldErrors" in s && s.fieldErrors?.[k]) {
    return s.fieldErrors[k];
  }
  return null;
}

export function AdminPropertyForm({
  mode,
  id,
  initial,
}: {
  mode: "create" | "edit";
  id?: string;
  initial?: PropertyRow;
}) {
  const defaults: PropertyFormValues = initial
    ? propertyToFormValues(initial)
    : {
        slug: "",
        title: "",
        type: "Appartement",
        price: 0,
        listing: "vente",
        surface: 0,
        rooms: 0,
        city: "",
        badge: "nouveau",
        description: "",
        features: "",
        image: "",
        images: "",
        published: true,
        ref: undefined,
      };

  const [state, formAction, isPending] = useActionState(
    async (prev: ActionResult, formData: FormData) => {
      if (mode === "create") {
        return createProperty(prev, formData);
      }
      if (mode === "edit" && id) {
        return updateProperty(id, prev, formData);
      }
      return { error: "Action invalide" };
    },
    null,
  );

  const d = defaults;
  const inputClass =
    "mt-1.5 h-10 rounded-2xl border border-brand-violet/20 bg-white/90 text-text-primary shadow-sm shadow-brand-violet/[0.06] transition hover:border-brand-violet/30 focus-visible:ring-2 focus-visible:ring-brand-pink/25 focus-visible:border-brand-pink/30 sm:h-11";
  const textAreaClass =
    "mt-1.5 min-h-[4.5rem] rounded-2xl border border-brand-violet/20 bg-white/90 text-text-primary shadow-sm shadow-brand-violet/[0.06] transition hover:border-brand-violet/30 focus-visible:ring-2 focus-visible:ring-brand-pink/25 focus-visible:border-brand-pink/30 sm:min-h-[5rem]";
  const typeOptions = types.map((t) => ({ value: t, label: t }));
  const listingOptions = listings.map((t) => ({ value: t.v, label: t.l }));
  const badgeOptions = badges.map((t) => ({ value: t.v, label: t.l }));

  return (
    <div className="max-w-2xl rounded-3xl border border-white/90 bg-gradient-to-b from-white to-brand-light/20 p-5 shadow-card sm:p-8">
    <form
      key={id ?? "new"}
      action={formAction}
      className="grid gap-5 sm:grid-cols-2"
    >
      {state && "error" in state && state.error && !state.fieldErrors && (
        <p className="text-sm text-destructive sm:col-span-2">{state.error}</p>
      )}

      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-slug">
          Slug d’URL (ex. ref-12345-…)
        </Label>
        <Input
          id="p-slug"
          name="slug"
          required
          defaultValue={d.slug}
          className={cn(inputClass, "font-mono text-sm")}
        />
        {fe(state, "slug") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "slug")}</p>
        )}
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-ref">
          Réf. (optionnel)
        </Label>
        <Input
          id="p-ref"
          name="ref"
          defaultValue={d.ref ?? ""}
          className={inputClass}
        />
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-city">
          Ville
        </Label>
        <Input
          id="p-city"
          name="city"
          required
          defaultValue={d.city}
          className={inputClass}
        />
        {fe(state, "city") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "city")}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-title">
          Titre
        </Label>
        <Input
          id="p-title"
          name="title"
          required
          defaultValue={d.title}
          className={inputClass}
        />
        {fe(state, "title") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "title")}</p>
        )}
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-type">
          Type
        </Label>
        <FormSelect
          id="p-type"
          name="type"
          className="mt-1.5"
          listAriaLabel="Type de bien"
          defaultValue={d.type}
          options={typeOptions}
        />
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-listing">
          Offre
        </Label>
        <FormSelect
          id="p-listing"
          name="listing"
          className="mt-1.5"
          listAriaLabel="Vente ou location"
          defaultValue={d.listing}
          options={listingOptions}
        />
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-price">
          Prix (€) — loyer = € / mois
        </Label>
        <Input
          id="p-price"
          name="price"
          type="number"
          min={0}
          required
          defaultValue={d.price}
          className={inputClass}
        />
        {fe(state, "price") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "price")}</p>
        )}
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-surface">
          Surface (m²)
        </Label>
        <Input
          id="p-surface"
          name="surface"
          type="number"
          min={0}
          required
          defaultValue={d.surface}
          className={inputClass}
        />
        {fe(state, "surface") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "surface")}</p>
        )}
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-rooms">
          Pièces
        </Label>
        <Input
          id="p-rooms"
          name="rooms"
          type="number"
          min={0}
          required
          defaultValue={d.rooms}
          className={inputClass}
        />
        {fe(state, "rooms") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "rooms")}</p>
        )}
      </div>
      <div>
        <Label className="text-text-primary" htmlFor="p-badge">
          Pastille
        </Label>
        <FormSelect
          id="p-badge"
          name="badge"
          className="mt-1.5"
          listAriaLabel="Pastille affichée sur la carte"
          defaultValue={d.badge}
          options={badgeOptions}
        />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-desc">
          Description
        </Label>
        <Textarea
          id="p-desc"
          name="description"
          required
          rows={5}
          defaultValue={d.description}
          className={textAreaClass}
        />
        {fe(state, "description") && (
          <p className="mt-1 text-sm text-destructive">
            {fe(state, "description")}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-feat">
          Atouts / mentions (un par ligne)
        </Label>
        <Textarea
          id="p-feat"
          name="features"
          rows={3}
          defaultValue={d.features}
          className={textAreaClass}
        />
      </div>
      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-image">
          URL image principale
        </Label>
        <Input
          id="p-image"
          name="image"
          type="url"
          required
          defaultValue={d.image}
          className={inputClass}
        />
        {fe(state, "image") && (
          <p className="mt-1 text-sm text-destructive">{fe(state, "image")}</p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Label className="text-text-primary" htmlFor="p-images">
          Galerie (une URL par ligne) — si vide, l’image principale est seule
        </Label>
        <Textarea
          id="p-images"
          name="images"
          rows={3}
          defaultValue={d.images}
          className={textAreaClass}
        />
      </div>
      <div className="flex items-center gap-2 sm:col-span-2">
        <input
          type="checkbox"
          id="p-pub"
          name="published"
          value="on"
          defaultChecked={d.published}
          className="h-4 w-4 cursor-pointer rounded-md border-2 border-brand-violet/35 bg-white text-brand-pink accent-brand-pink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-pink/35"
        />
        <Label htmlFor="p-pub" className="font-normal text-text-primary">
          Annonce publiée sur le site
        </Label>
      </div>
      <div className="sm:col-span-2">
        <Button
          type="submit"
          className="h-11 min-w-[10rem] rounded-full bg-brand-pink px-8 text-base font-semibold text-white shadow-sm"
          disabled={isPending}
        >
          {isPending
            ? "Enregistrement…"
            : mode === "create"
              ? "Créer l’annonce"
              : "Enregistrer"}
        </Button>
        {state && "ok" in state && state.ok && mode === "edit" && (
          <span className="ml-3 text-sm text-green-700">Enregistré.</span>
        )}
      </div>
    </form>
    </div>
  );
}
