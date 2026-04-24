import { and, desc, eq, ne } from "drizzle-orm";
import { getDb } from "./db";
import { properties } from "./db/schema";
import { propertyRowToProperty } from "./property-mappers";
import type { Property } from "./types";

export async function getPublishedProperties(): Promise<Property[]> {
  const db = getDb();
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.published, true))
    .orderBy(desc(properties.createdAt), desc(properties.id));
  return rows.map(propertyRowToProperty);
}

export async function getAllPropertiesForAdmin() {
  const db = getDb();
  return db
    .select()
    .from(properties)
    .orderBy(desc(properties.createdAt), desc(properties.id));
}

export async function getPropertyBySlug(
  slug: string,
  opts: { onlyPublished: boolean } = { onlyPublished: true },
): Promise<Property | null> {
  const db = getDb();
  const where = opts.onlyPublished
    ? and(eq(properties.slug, slug), eq(properties.published, true))
    : eq(properties.slug, slug);
  const [row] = await db.select().from(properties).where(where).limit(1);
  return row ? propertyRowToProperty(row) : null;
}

export async function getPropertyRowById(id: string) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(properties)
    .where(eq(properties.id, id))
    .limit(1);
  return row ?? null;
}

export async function getAllSlugs() {
  const db = getDb();
  return db
    .select({ slug: properties.slug })
    .from(properties)
    .where(eq(properties.published, true));
}

export async function slugIsTakenByOther(slug: string, excludeId: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(properties)
    .where(
      and(eq(properties.slug, slug), ne(properties.id, excludeId)),
    )
    .limit(1);
  return rows.length > 0;
}

export async function slugIsTaken(slug: string) {
  const db = getDb();
  const rows = await db
    .select()
    .from(properties)
    .where(eq(properties.slug, slug))
    .limit(1);
  return rows.length > 0;
}
