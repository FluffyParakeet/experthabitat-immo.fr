import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, imagePlaceholderBlur } from "@/lib/data";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/seo";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 3600;

export function generateStaticParams() {
  return blogPosts.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = getPostBySlug(slug);
  if (!a) return {};
  const title = `${a.title} | Expert Habitat`;
  const cover = absoluteUrl(a.cover);
  return {
    title,
    description: a.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: a.title,
      description: a.excerpt,
      url: absoluteUrl(`/blog/${slug}`),
      publishedTime: a.date,
      images: [
        { url: cover, width: 1200, height: 630, alt: a.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: a.title,
      description: a.excerpt,
      images: [cover],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const a = getPostBySlug(slug);
  if (!a) notFound();
  const pageUrl = absoluteUrl(`/blog/${slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.excerpt,
    image: [absoluteUrl(a.cover)],
    datePublished: a.date,
    dateModified: a.date,
    author: { "@type": "Person", name: "Aurélien Sabé" },
    publisher: { "@type": "Organization", name: "Expert Habitat" },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };
  return (
    <article
      className={cn(
        "section-padding-y",
        "page-container max-w-3xl",
      )}
    >
      <Link href="/blog" className="text-base font-medium text-brand-pink sm:text-lg">
        ← Tous les articles
      </Link>
      <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl sm:mt-6">
        <Image
          src={a.cover}
          alt={a.title}
          fill
          className="object-cover"
          priority
          placeholder="blur"
          blurDataURL={imagePlaceholderBlur}
        />
      </div>
      <p className="mt-5 text-base text-text-muted-custom sm:text-lg">
        {a.category} · {new Date(a.date).toLocaleDateString("fr-FR", { dateStyle: "long" })} ·{" "}
        {a.readMinutes} min de lecture
      </p>
      <h1 className="mt-3 text-balance font-display text-3xl font-bold text-brand-violet sm:text-4xl">
        {a.title}
      </h1>
      <div className="mt-10 max-w-none whitespace-pre-wrap text-lg leading-[1.75] text-text-primary sm:leading-[1.8]">
        {a.content}
      </div>
      <JsonLd data={articleJsonLd} />
    </article>
  );
}
