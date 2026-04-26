"use server";

import { auth } from "@/auth";
import { logServerError } from "@/lib/dev-log";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { properties } from "@/lib/db/schema";
import { propertyFormSchema } from "@/lib/schemas";
import { slugIsTaken, slugIsTakenByOther } from "@/lib/property-db";
import { stripExpertimoAttributionFromFeatures } from "@/lib/property-mappers";

function requireSession() {
  return auth().then((s) => {
    if (!s?.user?.id) {
      throw new Error("Non autorisé");
    }
    return s;
  });
}

function parseFeatures(s: string) {
  const lines = s
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  return stripExpertimoAttributionFromFeatures(lines);
}

function parseImageUrls(s: string, mainImage: string) {
  const list = s
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (list.length > 0) return list;
  return [mainImage];
}

export type ActionResult =
  | { error: string; fieldErrors?: Record<string, string> }
  | { ok: true }
  | null;

function fieldErrors(
  f: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } },
): Record<string, string> {
  const o: Record<string, string> = {};
  const fe = f.flatten().fieldErrors;
  for (const k of Object.keys(fe)) {
    const a = fe[k];
    if (a?.[0]) o[k] = a[0]!;
  }
  return o;
}

export async function createProperty(
  _prev: ActionResult | void,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireSession();
  } catch {
    return { error: "Non autorisé" };
  }

  const values = formDataToObject(formData);
  const parsed = propertyFormSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Vérifiez les champs", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  if (await slugIsTaken(d.slug)) {
    return { error: "Ce slug est déjà utilisé" };
  }

  const features = parseFeatures(d.features);
  const images = parseImageUrls(d.images, d.image);

  const db = getDb();
  try {
    await db.insert(properties).values({
      slug: d.slug,
      ref: d.ref?.trim() || null,
      title: d.title,
      type: d.type,
      price: d.price,
      listing: d.listing,
      surface: d.surface,
      rooms: d.rooms,
      city: d.city,
      badge: d.badge,
      description: d.description,
      features,
      image: d.image,
      images,
      published: d.published,
    });
  } catch (e) {
    logServerError("createProperty", e);
    return { error: "Erreur d’enregistrement. Réessayez." };
  }

  revalidatePaths(d.slug);
  redirect("/admin/biens");
}

export async function updateProperty(
  id: string,
  _prev: ActionResult | void,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireSession();
  } catch {
    return { error: "Non autorisé" };
  }

  const values = formDataToObject(formData);
  const parsed = propertyFormSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Vérifiez les champs", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  if (await slugIsTakenByOther(d.slug, id)) {
    return { error: "Ce slug est déjà utilisé" };
  }

  const features = parseFeatures(d.features);
  const images = parseImageUrls(d.images, d.image);

  const db = getDb();
  try {
    await db
      .update(properties)
      .set({
        slug: d.slug,
        ref: d.ref?.trim() || null,
        title: d.title,
        type: d.type,
        price: d.price,
        listing: d.listing,
        surface: d.surface,
        rooms: d.rooms,
        city: d.city,
        badge: d.badge,
        description: d.description,
        features,
        image: d.image,
        images,
        published: d.published,
        updatedAt: new Date(),
      })
      .where(eq(properties.id, id));
  } catch (e) {
    logServerError("updateProperty", e);
    return { error: "Erreur d’enregistrement. Réessayez." };
  }

  revalidatePaths(d.slug);
  return { ok: true };
}

export async function deleteProperty(
  _prev: ActionResult | void,
  formData: FormData,
): Promise<ActionResult> {
  try {
    await requireSession();
  } catch {
    return { error: "Non autorisé" };
  }
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "");
  if (!id || !slug) return { error: "Données manquantes" };
  const db = getDb();
  try {
    await db.delete(properties).where(eq(properties.id, id));
  } catch (e) {
    logServerError("deleteProperty", e);
    return { error: "Suppression impossible. Réessayez." };
  }
  revalidatePaths(slug);
  redirect("/admin/biens");
}

function formDataToObject(
  formData: FormData,
): Record<string, string | number | boolean> {
  return {
    slug: String(formData.get("slug") ?? ""),
    ref: String(formData.get("ref") ?? ""),
    title: String(formData.get("title") ?? ""),
    type: String(formData.get("type") ?? ""),
    price: Number(formData.get("price")),
    listing: String(formData.get("listing") ?? "vente"),
    surface: Number(formData.get("surface")),
    rooms: Number(formData.get("rooms")),
    city: String(formData.get("city") ?? ""),
    badge: String(formData.get("badge") ?? ""),
    description: String(formData.get("description") ?? ""),
    features: String(formData.get("features") ?? ""),
    image: String(formData.get("image") ?? ""),
    images: String(formData.get("images") ?? ""),
    published: formData.get("published") === "on" || formData.get("published") === "true",
  };
}

function revalidatePaths(slug: string) {
  revalidatePath("/");
  revalidatePath("/biens");
  revalidatePath(`/biens/${slug}`);
}
