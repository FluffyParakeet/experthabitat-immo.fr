import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/data-blog";
import { getAllSlugs } from "@/lib/property-db";
import { siteUrl } from "@/lib/metadata";

const base = () => siteUrl.replace(/\/$/, "");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const b = base();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: b, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${b}/biens`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${b}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${b}/estimation`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${b}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${b}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${b}/politique-confidentialite`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${b}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  let propertyEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await getAllSlugs();
    propertyEntries = rows.map((r) => ({
      url: `${b}/biens/${r.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    /* build sans DB : sitemap partiel seulement */
  }

  return [...staticEntries, ...blogEntries, ...propertyEntries];
}
